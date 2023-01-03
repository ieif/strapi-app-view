<template>
   <header id="header">
      <div class="navbox">
         <h2 id="mnavh">
            <span class="navicon"></span>
         </h2>
         <div class="logo">
            <a href="/">{{ info.title }} <img :src="info.logo" /> </a>
         </div>
         <nav>
            <ul id="starlist">
               <li>
                  <a href="/">首页</a>
               </li>
               <li v-for="item in info.list" class="menu">
                  <a :href="`/cate/` + item.id + '.html'">{{ item.title }}</a>
                  <ul class="sub">
                     <li v-for="sub in item.children">
                        <a :href="'/cate/' + sub.id + '.html'">{{ sub.title }}</a>
                     </li>
                  </ul>
               </li>
            </ul>
         </nav>
         <div style="display: none">
            <div class="searchico"></div>
            <input class="q" name="q" />
         </div>
      </div>
   </header>
</template>

<script>
import * as vue from "vue";

export default {
   name: "",
   components: {},
   props: {},
   data() {
      return {
         info: {
            title: "",
            logo: "",
            list: [],
         },
      };
   },
   computed: {},
   created() {
      console.info("config", this.$config);
      if (import.meta.env.SSR) {
         let ctx = vue.useSSRContext();
         ctx && Object.assign(this.info, ctx.data);
         this.detailTag = this.info.title;
      }
      this.load();
   },
   mounted() {},
   watch: {},
   methods: {
      async load() {
         let res = await this.$config.api({ url: "http://localhost/api/menus/1?nested&populate=*" }).then((res) => res.data);
         this.info.list = res.data.items || [];
         console.info("menu", res);
      },
   },
};
</script>

<style scoped lang="less"></style>
