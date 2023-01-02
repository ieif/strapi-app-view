<template>
   <div>
      <input :id="tagId" type="hidden" style="display: none" :value="info.title" />
      <h1>detail {{ info.title || "" }}</h1>
   </div>
</template>
<script>
import fetch from "@/utils/fetch";
import { useSSRContext } from "vue";
export default {
   setup(props, context) {
      //context.emit("hello", "你好");
      //console.info("-===>setup", props, context);
   },
   data() {
      return {
         tagId: "id-" + Math.random().toString(36).slice(2, 8),
         info: {},
      };
   },
   created() {
      if (import.meta.env.SSR) {
         let ctx = useSSRContext();
         ctx && Object.assign(this.info, ctx.data);
         this.detailTag = this.info.title;
      }
   },

   mounted() {
      let dom = document.querySelector(`#${this.tagId}`);
      if (!dom || !dom.value) this.getx();
   },
   methods: {
      async getx() {
         let id = this.$route.params.id;
         let res = await fetch("http://localhost:80/api/articles/" + id).then((res) => res.data);
         Object.assign(this.info, res.data);
      },
   },
};
</script>
