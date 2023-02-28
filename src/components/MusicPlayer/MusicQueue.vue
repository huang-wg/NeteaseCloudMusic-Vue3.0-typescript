<template>
  <a-list id="music-queue" size="small" bordered :data-source="MusicPlayerStore.musicList">
    <template #renderItem="{ item,index }">
      <a-list-item class="list-item"><span>{{ item.name }}</span>
        <div>
          <PlayCircleOutlined @click="MusicPlayerStore.playMusicByIndex(index)"/>
        </div>
      </a-list-item>
    </template>
    <template #header>
      <div class="header-div">播放列表({{ MusicPlayerStore.musicList.length }})
        <CloseOutlined class="close-icon" @click="$emit('close')"/>
      </div>
    </template>
  </a-list>
</template>

<script setup lang="ts">
import {useMusicPlayerStore} from "@/store/MusicPlayer";
import {CloseOutlined, PlayCircleOutlined} from '@ant-design/icons-vue';

const MusicPlayerStore = useMusicPlayerStore();

</script>

<style scoped>
:deep(.ant-list-items) {
  overflow-y: scroll;
  height: 150px;
}
:deep(.ant-list-items)::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
:deep(.ant-list-items)::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  background-color: skyblue;
  background-image: -webkit-linear-gradient(
      45deg,
      rgba(255, 255, 255, 0.2) 25%,
      transparent 25%,
      transparent 50%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.2) 75%,
      transparent 75%,
      transparent
  );
}
:deep(.ant-list-items)::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}


.close-icon {
  cursor: pointer;
  margin: auto 0;
}

.header-div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.list-item {
  color: #ccc;
}

.list-item:hover {
  color: #fff;
}

#music-queue {
  position: absolute;
  bottom: 53px;
  height: 200px;
  width: 600px;
  transform: translateX(-300px);
  left: 50%;
  background: #282828;
  color: #f2f2f2;
}
</style>