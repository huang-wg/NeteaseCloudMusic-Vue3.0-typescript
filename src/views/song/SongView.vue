<template>
  <a-badge-ribbon text="单曲">
    <a-card :title="songData['name']" size="default">
      <div class="song-content">
        <img class="song-pic" :src="songData['al']?songData['al']['picUrl']:''">

        <text><pre>{{LyricData['lyric']}}</pre></text>
      </div>

    </a-card>
  </a-badge-ribbon>
</template>

<script setup lang="ts">
import {onMounted, reactive} from "vue";
import {getMusicDetail, getMusicLyric} from "@/api/music";
import {useRoute} from "vue-router";

const route = useRoute()

const songData = reactive({})
const LyricData= reactive({})
onMounted(() => {
  getMusicDetail(route.params.id as string).then((res: any) => {
    Object.assign(songData, res.songs[0])
  })
  getMusicLyric(route.params.id as string).then((res: any)=>{
    Object.assign(LyricData,res.lrc)
  })
})
</script>

<style scoped>
.song-content {
  margin: 0 auto;
  width: 800px;
  text-align: center;
}

.song-pic {
  width: 150px;
  height: 150px;
}

.ant-card {
  margin-bottom: 20px;
  min-width: 1100px;
}
</style>