<script setup lang="ts">
import {getTopArtists} from "@/api/home/home"
import {onMounted, reactive} from "vue";
import {useRouter} from "vue-router";

const router = useRouter()
const state = reactive({
  artistList: [],
  hotArtistsLoading: true
})

function gotoArtist(artist: any) {
  router.push(`/artist/${artist.id}`)
}

onMounted(() => {

  getTopArtists(0, 10).then((res: any) => {
    state.artistList = res.artists
    state.hotArtistsLoading = false
  })
})
</script>

<template>
  <main>
    <a-card :loading="state.hotArtistsLoading" title="热门歌手">
      <div class="avatar-layout">
        <div class="avatar-wrapper" v-for="artist in state.artistList" :key="artist.picId">
          <a-avatar class="avatar-item" shape="square" :size="120"
                    :src="artist.picUrl"
                    @click="gotoArtist(artist)"
          >
          </a-avatar>
          <span @click="gotoArtist(artist)">{{ artist.name }}</span>
        </div>

      </div>
    </a-card>
    <a-card title="榜单">
    </a-card>
  </main>
</template>
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