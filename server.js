import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import Koa from "koa";
import connect from "koa-connect";
//import koaCompress from "koa-compress";
import koaStatic from "koa-static";
import * as vite from "vite";

//const isTest = process.env.VITEST;
export async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === "production", hmrPort) {
   const __dirname = path.dirname(fileURLToPath(import.meta.url));
   const resolve = (p) => path.resolve(__dirname, p);

   const indexProd = isProd ? fs.readFileSync(resolve("dist/client/index.html"), "utf-8") : "";

   const manifest = isProd ? JSON.parse(fs.readFileSync(resolve("dist/client/ssr-manifest.json"), "utf-8")) : {};

   const app = new Koa();

   /**
    * @type {import('vite').ViteDevServer}
    */
   let viteServer;
   if (isProd) {
      /* app.use(
         koaCompress({
            filter(content_type) {
               return /text/i.test(content_type);
            },
            threshold: 2048,
            gzip: {
               flush: require("zlib").constants.Z_SYNC_FLUSH,
            },
            deflate: {
               flush: require("zlib").constants.Z_SYNC_FLUSH,
            },
            br: false, // disable brotli
         }),
      ); */
      app.use(koaStatic("./dist/client/", {}));
      //app.use((await import("compression")).default());
      /*     app.use(
         (await import("koa-static")).default(resolve("dist/client"), {
            index: false,
         }),
      ); */
   } else {
      viteServer = await vite.createServer({
         base: "/",
         root,
         logLevel: "info",
         server: {
            middlewareMode: true,
            watch: {
               // During tests we edit the files too fast and sometimes chokidar
               // misses change events, so enforce polling for consistency
               usePolling: true,
               interval: 100,
            },
            hmr: {
               port: hmrPort,
            },
         },
         appType: "custom",
      });
      // use vite's connect instance as middleware
      app.use(connect(viteServer.middlewares));
   }

   app.use(async (ctx, next) => {
      try {
         const url = ctx.url; //.replace(/\/[a-z0-9_-]+\.html/, "/index.html");
         let template, render;
         console.info("req", url, isProd);
         if (isProd) {
            //生产环境
            template = indexProd;
            // @ts-ignore
            render = (await import("./dist/server/js/server.js")).render;
         } else {
            // always read fresh template in dev
            template = fs.readFileSync(resolve("index.html"), "utf-8");
            template = await viteServer.transformIndexHtml(url, template);
            render = (await viteServer.ssrLoadModule("/src/server.js")).render;
         }
         const [appHtml, preloadLinks] = await render(url, manifest);
         //console.info("render", url, appHtml);
         let html = template.replace(`<!--ssr-outlet-->`, appHtml);
         html = html.replace(`<!--preload-links-->`, preloadLinks);
         ctx.status = 200;
         ctx.set({ "Content-Type": "text/html" });
         ctx.body = html;
      } catch (e) {
         //vite && vite.ssrFixStacktrace(e);
         //console.log(e.stack);
         ctx.status = 500;
         ctx.body = e.stack;
      }
   });

   return { app, vite: viteServer };
}

createServer().then(({ app }) =>
   app.listen(8080, () => {
      console.log("http://localhost:8080");
   }),
);
