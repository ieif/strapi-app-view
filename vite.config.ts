import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

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

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue(), myHttpServerPlugin()],
   server: {
      port: 8080,
      proxy: {
         // 字符串简写写法：http://localhost:5173/foo -> http://localhost:4567/foo
         //"/foo": "http://localhost:4567",
         // 带选项写法：http://localhost:5173/api/bar -> http://jsonplaceholder.typicode.com/bar
         /*       "/api": {
            target: "http://jsonplaceholder.typicode.com",
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ""),
         }, */
      },
   },
});
