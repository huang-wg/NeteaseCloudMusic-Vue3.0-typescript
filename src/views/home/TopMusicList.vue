<template>
  <div>
    <img class="cover" :src="topData['cover']"/>
    <MusicList :music-list="topData['musics']"/>
  </div>
</template>

<script setup lang="ts">
import MusicList from "@/components/MusicList/MusicList.vue";

const props = defineProps({
  topData: Object
})

</script>

<style scoped>
.cover{
  height: 80px;
  width: 80px;
  margin-bottom: 10px;
}
</style>