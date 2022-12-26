import * as vue from "vue";
import VueRouter from "vue-router";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import VueApollo from "vue-apollo";
import * as apollo from "./apollo"

//Vue.config.productionTip = false;

const app = vue.createApp(App, {
   router
});

//app.use(VueApollo);
app.use(apollo.provider);
app.use(router);

app.mount("#app");

/* 
new Vue({
    apolloProvider,
    router,
   
  }).$mount("#app");
 */
