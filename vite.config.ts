import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";

const myHttpServerPlugin = () => ({
   name: "http-server",
   configureServer(server) {
      // 返回一个在内部中间件安装后
      // 被调用的后置钩子
      return () => {
         server.middlewares.use((req, res, next) => {
            if (/^\/index\.html/i.test(req.url)) return next();
            req.url = req.url.replace(/^\/.*\.html/, "/index.html");
            return next();
         });
      };
   },
});

export default defineConfig(async ({ command, mode, ssrBuild }) => {
   const env = loadEnv(mode, process.cwd(), "");
   console.info("env", mode);
   let config: any = {
      define: {
         __APP_ENV__: mode,
      },
      plugins: [vue(), myHttpServerPlugin()],
      server: {
         port: 8080,
      },
      resolve: {
         // seems first matched alias is used, so handle case where using @ alias and vue file has a .vue.js extension
         alias: {
            "@": path.resolve("src"),
            "@coms": path.resolve("src/components"),
         },
      },
      build: {
         rollupOptions: {
            output: {
               assetFileNames: (assetInfo) => {
                  var info = assetInfo.name.split(".");
                  var extType = info[info.length - 1];
                  if (/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/i.test(assetInfo.name)) {
                     extType = "media";
                  } else if (/\.(png|jpe?g|gif|svg)(\?.*)?$/.test(assetInfo.name)) {
                     extType = "img";
                  } else if (/\.(woff2?|eot|ttf|otf)(\?.*)?$/i.test(assetInfo.name)) {
                     extType = "fonts";
                  }
                  return `${extType}/[name]-[hash][extname]`;
               },
               chunkFileNames: "js/[name]-[hash].js",
               entryFileNames: (a)=>{
                  return "js/[name]-[hash].js";
               },
            },
         },
      },
   };
   if (command === "serve") {
   } else {
   }
   return config;
});
// https://vitejs.dev/config/
/* defineConfig({
   plugins: [vue(), myHttpServerPlugin()],
   server: {
      port: 8080,
      proxy: {
 
      },
   },
}); */
