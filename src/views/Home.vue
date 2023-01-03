<template>
   <article>
      <!--lbox begin-->
      <div class="lbox">
         <Banner></Banner>
      </div>
   </article>
</template>

<script>
import { ref } from "vue";
import Banner from "@coms/Banner.vue";
export default {
   components: { Banner },
   data: () => {
      return {};
   },
   watch: {
      count(n, o) {
         this.msg = "xx " + n;
      },
   },
};
</script>

<style scoped></style>
