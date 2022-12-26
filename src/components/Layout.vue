<!-- 我的页面 -->
<template>
   <div>
      <div>
         <div :style="{ padding: 0 }" class="layout-header-bar">
            <Nav></Nav>
         </div>
         <div class="main-wrap">
            <router-view></router-view>
         </div>
      </div>
   </div>
</template>

<script>
// 这里可以导入其他文件（比如：组件，工具js，第三方插件js，json文件，图片文件等等）
// 例如：import 《组件名称》 from '《组件路径》'
import Nav from "./Nav.vue";
export default {
   // import引入的组件需要注入到对象中才能使用
   components: { Nav },
   data() {
      // 这里存放数据
      return {
        
      };
   },
   // 监听属性 类似于data概念
   computed: {
   },
   // 监控data中的数据变化
   watch: {},
   // 生命周期 - 创建完成（可以访问当前this实例）
   created() {},
   // 生命周期 - 挂载完成（可以访问DOM元素）
   async mounted() {
   },
   beforeCreate() {}, // 生命周期 - 创建之前
   beforeMount() {}, // 生命周期 - 挂载之前
   beforeUpdate() {}, // 生命周期 - 更新之前
   updated() {}, // 生命周期 - 更新之后
   beforeDestroy() {}, // 生命周期 - 销毁之前
   destroyed() {}, // 生命周期 - 销毁完成
   activated() {}, // 如果页面有keep-alive缓存功能，这个函数会触发
   // 方法集合
   methods: {
     
   },
};
</script>

<style lang="less" scope></style>
