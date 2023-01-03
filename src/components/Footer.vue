<template>
   <footer>
      <div class="box">
         <div class="wxbox">
            <ul>
               <li>Links</li>
               <li v-for="(item) in info.links">
                  <a :href="item.url" target="_blank">{{ item.label }} </a>
               </li>
            </ul>
         </div>

         <div class="endnav">
            <p>
               Copyright © <a href="#" target="_blank">{{ info.domain  }}</a>
               All Rights Reserved. 
               <span v-if="info.recordNo">备案号：<a>{{ info.recordNo }}</a></span>
            </p>
         </div>
      </div>
      <a href="#">
         <div class="top"></div>
      </a>
   </footer>
</template>

<script>
export default {
   name: "",
   components: {},
   props: {},
   data() {
      return {
          info: {
              recordNo: "",
              links: [],

          }
      };
   },
   computed: {},
   created() {},
   mounted() {},
   watch: {},
   methods: {},
};
</script>

<style scoped lang="less"></style>
