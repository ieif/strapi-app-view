import { createRouter, createWebHistory} from "vue-router"
//import cookies from "js-cookie";
import config from "../config";
import routes from "./routes";
const baseUrl = ("/" + config.baseUrl + "/").replace(/[\/]{2,}/, "/"); //config.isDev ? "/" : "/admin-view/";
//const viewUrls = routes[0].children?.map((item) => ({ title: item.title, path: baseUrl + item.path.replace(/^\/+/, "") }));
//Vue.prototype.$viewUrls = viewUrls;

function getRouter(path: string, routes: any): any {
  for (let v of routes) {
    if (path == v.path || path == v.name) return v;
    if (v.children && v.children.length > 0) {
      let ret = getRouter(path, v.children);
      if (ret) return ret;
    }
  }
  return undefined;
}

let router = createRouter({
  history: createWebHistory(),
  routes: routes
});

router.beforeEach(async (to, from, next) => {
  let isLogin = false;// = !!cookies.get("token-admin");
  console.info("isLogin===", isLogin, to.name);
/*   if (to.name == "login") {
    return isLogin ? next("/home.html") : next();
  }
  if (isLogin) {
    next();
  } else {
    // 未登录且要跳转的页面不是登录页
    next({
      name: "login", // 跳转到登录页
    });
  } */
  next();
});

router.afterEach((route) => {});

//if (location.pathname.startsWith("/admin-view/index.html")) location.href = "/admin-view/home.html";
//console.info("-----", location.pathname == "/admin-view/index.html", location.pathname);

export default router;
