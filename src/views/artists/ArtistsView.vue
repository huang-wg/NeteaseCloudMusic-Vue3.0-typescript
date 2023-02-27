<script lang="ts" setup>
import {useRoute} from "vue-router";
import {getArtistsDetail, getArtistsTopSongs} from "@/api/artists"
import {onMounted, reactive} from "vue";
import MusicList from "@/components/MusicList/MusicList.vue";


const route = useRoute()

const state = reactive({
  artistLoading: true,
  artist: {},
  tabKey: "1",
  songList: [],
})
onMounted(() => {

  getArtistsDetail(route.params.id as string).then((res: any) => {
    state.artist = res.data.artist
    state.artistLoading = false
  })

  getArtistsTopSongs(route.params.id as string).then((res: any) => {
    state.songList = res.songs
  })

})
</script>
<template>
  <main>
    <a-card :loading="state.artistLoading" :title="state.artist.name||''">
      <a-image
          :preview="false"
          height="300px"
          :src="state.artist.cover+'?param=800y300'"
      />
      <a-tabs v-model:activeKey="state.tabKey" centered>
        <a-tab-pane key="1" tab="热门作品">
          <MusicList :musicList="state.songList"/>
        </a-tab-pane>
        <a-tab-pane key="2" tab="所有专辑">Todo</a-tab-pane>
        <a-tab-pane key="3" tab="相关MV">Todo</a-tab-pane>
        <a-tab-pane key="4" tab="艺人介绍">{{ state.artist.briefDesc }}</a-tab-pane>
      </a-tabs>

    </a-card>
  </main>
</template>
<style scoped>
.ant-card {
  margin-bottom: 20px;
  width: 800px;
}
</style>