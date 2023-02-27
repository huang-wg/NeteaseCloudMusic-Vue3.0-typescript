<script setup lang="ts">
/**
 * 音乐网站的主要页面，由头部导航栏控制路由跳转
 */
import {RouterView} from "vue-router";
import HeaderNav from "@/components/Nav/HeaderNav.vue";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer.vue";</script>

<template>
  <a-layout class="layout">
    <a-layout-header class="layout-header">
      <img class="logo" src="@/assets/logo.svg">
      <HeaderNav/>
    </a-layout-header>
    <a-layout-content class="content">
      <div :style="{ minHeight: '380px' }">
        <RouterView/>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      vue3.0网易云 Created by hwg
    </a-layout-footer>
    <keep-alive>
      <MusicPlayer/>
    </keep-alive>

  </a-layout>

</template>

<style scoped>
.layout {
  padding-bottom: 60px;
}

.layout-header {
  display: flex;
  align-items: center;
}

.content {
  padding: 24px 50px
}

.logo {
  width: 40px;
  height: 40px;
  margin-right: 40px;
}
</style>
