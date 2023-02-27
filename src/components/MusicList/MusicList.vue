<template>
  <a-list size="small" bordered :data-source="props.musicList">
    <template #renderItem="{ item,index }">
      <a-list-item>
        <span id="music-index">{{ index + 1 }}</span>
        <PlayCircleOutlined id="play-one-btn" @click="playOneMusic(item)"/>
        {{ item.name }}
      </a-list-item>
    </template>
    <template #header>
      <div>
        <a-button type="primary">
          <template #icon>
            <PlayCircleOutlined/>
          </template>
          播放
        </a-button>
        <a-button style="margin-left: 10px" type="primary">
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
import {useMusicPlayerStore} from "@/store/MusicPlayer"
import {getMusicUrl} from "@/api/music";

const musicPlayerStore = useMusicPlayerStore();

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
#play-one-btn {
  font-size: 18px;
  color: grey;
  margin-right: 20px;
  cursor: pointer;
}

#play-one-btn:hover {
  color: black;
}

#music-index {
  display: inline-block;
  width: 20px;
  margin-right: 20px;
}
</style>