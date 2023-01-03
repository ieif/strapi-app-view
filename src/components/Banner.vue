<template>
   <div>
      <!--banbox begin-->
      <div class="banbox">
         <div class="banner">
            <div id="banner" class="fader">
               <li v-for="item in banners" class="slide">
                  <a :href="item.url" target="_blank" :title="item.title">
                     <img :src="item.image" :alt="item.title" />
                  </a>
               </li>
               <div class="fader_controls">
                  <div class="page prev" data-target="prev"></div>
                  <div class="page next" data-target="next"></div>
                  <ul class="pager_list"></ul>
               </div>
            </div>
         </div>
      </div>
      <!--banbox end-->
      <!--headline begin-->
      <div class="headline">
         <ul>
            <li v-for="item in news">
               <a :href="detailUrl(item.id)" :title="item.title">
                  <img :src="item.image" :alt="item.title" />
                  <span>{{ item.title }}</span>
               </a>
            </li>
         </ul>
      </div>
      <!--headline end-->
      <div class="clearblank"></div>
   </div>
</template>

<script>
export default {
   name: "",
   components: {},
   props: {},
   data() {
      return {
         banners: [
            {
               title: "a",
               image: "/image/1.jpg",
            },
         ],
         news: [],
      };
   },
   computed: {},
   created() {},
   mounted() {},
   watch: {},
   methods: {
      detailUrl(id) {
         return `/detail.html?id=${id}`;
      },
   },
};
</script>

<style scoped lang="less"></style>
