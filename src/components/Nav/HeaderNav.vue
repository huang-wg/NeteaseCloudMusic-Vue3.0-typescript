<template>
  <a-menu theme="dark" mode="horizontal" :selectedKeys="state.current" @click="gotoPage">
    <a-menu-item v-for="(route) in routerConfig" :key="route.url">
      {{ route.name }}
    </a-menu-item>
    <a-menu-item key="/about">
      我的音乐
    </a-menu-item>
  </a-menu>
</template>

<script setup lang="ts">
/**
 * 头部的导航栏组件
 */
import {useRoute, useRouter} from "vue-router";
import {reactive, watch} from "vue";

const routerConfig = [{
  name: "发现音乐",
  url: "/"
}, {
  name: "最热歌单",
  url: "/playlist"
}]
const router = useRouter()
const route = useRoute()
const state = reactive({
  current: [""]
})

watch(() => router.currentRoute.value.path, (newPath) => {
  state.current[0] = newPath;
}, {immediate: true, deep: true})


function gotoPage(menu: any) {
  state.current[0] = menu.key;
  router.push(menu.key);
}
</script>

<style scoped>

</style>