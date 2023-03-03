<template>
  <main>
    <a-card :loading="state.hotArtistsLoading" title="热门歌手">
      <div class="avatar-layout">
        <div class="avatar-wrapper" v-for="artist in artistList" :key="artist.picId">
          <a-avatar class="avatar-item" shape="square" :size="120" :src="artist.picUrl" @click="gotoArtist(artist)">
          </a-avatar>
          <span @click="gotoArtist(artist)">{{ artist.name }}</span>
        </div>

      </div>
    </a-card>
    <a-card title="榜单">
      <a-card-grid v-for="(item,index) in topData" :key="index" style="width: 33.3%; text-align: center">
        <TopMusicList :top-data="item"/>
      </a-card-grid>
    </a-card>
  </main>
</template>
<script setup lang="ts">
import {getPlaylistDetail, getTopArtists, getTopList} from "@/api/home/home"
import {onMounted, reactive} from "vue";
import {useRouter} from "vue-router";
import TopMusicList from "@/views/home/TopMusicList.vue";

const router = useRouter()
const state = reactive({
  hotArtistsLoading: true
})

interface ArtistProps {
  picId: number,
  picUrl: string,
  name: string
}

let artistList = reactive<Array<ArtistProps>>([]);

function gotoArtist(artist: any) {
  router.push(`/artist/${artist.id}`)
}

const topData = reactive([]);

function get10SongTopData(item) {
  return {
    name: item.playlist.name,
    cover: item.playlist.coverImgUrl,
    musics: item.playlist.tracks.slice(0, 11)
  }
}

onMounted(() => {
  getTopArtists(0, 10).then((res: any) => {
    artistList = res.artists
    state.hotArtistsLoading = false
  })

  getTopList().then((res: any) => {
    let headThree = res.list.slice(0, 3);
    Promise.all([getPlaylistDetail(headThree[0]['id']),
      getPlaylistDetail(headThree[1]['id']),
      getPlaylistDetail(headThree[2]['id'])]).then((res: any) => {
      res.forEach((item: any) => {
        topData.push(get10SongTopData(item));
      })
    })
  })
})
</script>

<style scoped>

.avatar-layout {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.avatar-wrapper {
  width: 20%;
  margin-bottom: 20px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;

}

.avatar-wrapper > span {
  display: block;
  width: 100%;
  cursor: pointer;
}

.avatar-wrapper > span:hover {
  text-decoration: underline
}

.avatar-item {
  cursor: pointer;
}

.ant-card {
  margin-bottom: 20px;
  min-width: 1100px;
}

</style>