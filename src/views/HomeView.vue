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
    </a-card>
  </main>
</template>
<script setup lang="ts">
import {getTopArtists} from "@/api/home/home"
import {onMounted, reactive} from "vue";
import {useRouter} from "vue-router";

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

onMounted(() => {
  getTopArtists(0, 10).then((res: any) => {
    artistList = res.artists
    state.hotArtistsLoading = false
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
  min-width: 1200px;
}

</style>