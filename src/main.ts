import * as vue from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import * as apollo from "./apollo"

//Vue.config.productionTip = false;

const app = vue.createApp(App, {
   router
});

app.use(apollo.provider);
app.use(router);

app.mount("#app");
