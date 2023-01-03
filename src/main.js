import * as vue from "vue";
import * as pinia from "pinia";
import "./style.less";
import App from "./App.vue";
import { createRouter } from "./router";
import * as apollo from "./apollo";
import config from "./config";

//Vue.config.productionTip = false;

/* const app = vue.createApp(App, {
   router,
});

app.use(apollo.provider);
app.use(router);

app.mount("#app"); */

export function createApp() {
   const app = import.meta.env.SSR ? vue.createSSRApp(App) : vue.createApp(App);
   app.use(pinia.createPinia());
   app.use(apollo.provider);
   app.config.globalProperties.$config = config;
   const router = createRouter();
   app.use(router);
   return { app, router };
}
