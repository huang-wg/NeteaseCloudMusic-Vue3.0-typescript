<template>
  <a-list size="small" bordered :data-source="props.musicList">
    <template #renderItem="{ item,index }">
      <a-list-item>
        <span class="music-index">{{ index + 1 }}</span>
        <PlayCircleOutlined class="play-one-btn" @click="playOneMusic(item)"/>
        <span class="music-name" @click="gotoSongDetail(item)">{{ item.name }}</span>
      </a-list-item>
    </template>
    <template #header>
      <div>
        <a-button type="primary" @click="replaceMusicList">
          <template #icon>
            <PlayCircleOutlined/>
          </template>
          播放
        </a-button>
        <a-button style="margin-left: 10px" type="primary" @click="pushMusicList">
          <template #icon>
            <PlusOutlined/>
          </template>
          添加
        </a-button>
      </div>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
/**
 * 展示多首音乐，并且能加入到播放队列中
 */
import {PlayCircleOutlined, PlusOutlined} from "@ant-design/icons-vue";
import type {Music} from "@/store/MusicPlayer";
import {useMusicPlayerStore} from "@/store/MusicPlayer"
import {getMusicUrl} from "@/api/music";
import {useRouter} from "vue-router";

const musicPlayerStore = useMusicPlayerStore();
const router = useRouter()

function gotoSongDetail(song) {
  router.push(`/song/${song.id}`)
}

async function getManyMusicParams() {
  let musicIds = props.musicList.map((item: any) => item.id).join(",")

  let res = await getMusicUrl(musicIds)
  let musicList: Array<Music> = res.data.map((item, index) => {
    return {
      id: props.musicList[index]['id'],
      name: props.musicList[index]['name'],
      url: item.url
    }
  })
  return musicList;
}

function pushMusicList() {
  getManyMusicParams().then(res => {
    musicPlayerStore.pushMusicsIntoList(res)
  })
}

function replaceMusicList() {
  getManyMusicParams().then(res => {
    musicPlayerStore.replaceMusicList(res)
  })
}

const props = defineProps({
  musicList: Array
})

function playOneMusic(music: any) {
  getMusicUrl(music.id).then(res => {
    let param = {
      id: music.id,
      name: music.name,
      url: res.data[0].url
    }
    musicPlayerStore.playAndAddOneSong(param);
  })
}
</script>

<style scoped>
.music-name{
  cursor: pointer;
}
.music-name:hover {
  text-decoration: underline
}

.play-one-btn {
  font-size: 18px;
  color: grey;
  margin-right: 20px;
  cursor: pointer;
}

.play-one-btn:hover {
  color: black;
}

.music-index {
  display: inline-block;
  width: 20px;
  margin-right: 20px;
}

:deep(.ant-list-item) {
  text-align: left;
  justify-content: flex-start;
}
</style>