<template>
  <div class="playbar" @mouseenter="onMouseEnter" @mouseleave="onMouseLeave ">
    <div :class="{'playbar-wrapper':true,'wrapper-show':barState.isWrapperShow}">
      <div class="music-controller">
        <StepBackwardOutlined class="ctrl-icon"/>
        <PauseCircleOutlined @click="isPlayingToggle" v-show="playerState.isPlaying" class="ctrl-icon"/>
        <PlayCircleOutlined @click="isPlayingToggle" v-show="!playerState.isPlaying" class="ctrl-icon"/>
        <StepForwardOutlined class="ctrl-icon"/>
        <div class="slider-box">
          <img alt="唱片" style="height: 30px;width: 30px" src="~assets/image/R-C.png">

          <a-slider
              @afterChange="changePlayerProgress"
              id="music-slider" v-model:value="playerState.currentTime" :min="0" :max="playerState.maxTime"
              :tip-formatter="()=>realFormatSecond(playerState.currentTime)"/>
          <span id="progress-text">{{ realFormatSecond(playerState.currentTime) }}/
            {{ realFormatSecond(playerState.maxTime) }}
          </span>
          <text id="music-title">{{ MusicPlayerStore.getCurrentMusic ? MusicPlayerStore.getCurrentMusic.name : "--" }}
          </text>
        </div>

      </div>
      <div class="lock-wrapper">
        <LockOutlined @click="isLockToggle" v-if="barState.isLock" class="lock-icon"/>
        <UnlockOutlined @click="isLockToggle" v-else class="lock-icon"/>
      </div>
    </div>
    <audio ref="audio"
           @loadedmetadata="onLoadedmetadata"
           @timeupdate="onTimeupdate"
           @pause="onPause"
           @play="onPlay" controls="controls" style="display: none" id="music-player" autoplay
           :src="MusicPlayerStore.getCurrentMusic?MusicPlayerStore.getCurrentMusic.url:''">
      Your browser does not support the audio element.
    </audio>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import {useMusicPlayerStore} from "@/store/MusicPlayer"
import {
  LockOutlined,
  PauseCircleOutlined,
  PlayCircleOutlined,
  StepBackwardOutlined,
  StepForwardOutlined,
  UnlockOutlined
} from '@ant-design/icons-vue';


const MusicPlayerStore = useMusicPlayerStore();
const audio = ref()
const barState = reactive({
  isWrapperShow: false,
  isLock: false
})
const playerState = reactive({
  //是否播放中
  isPlaying: false,
  // 音频当前播放时长
  currentTime: 0,
  // 音频最大播放时长
  maxTime: 0
})

function changePlayerProgress(time: any) {
  audio.value.currentTime = time
}

// 当timeupdate事件大概每秒一次，用来更新音频流的当前播放时间
function onTimeupdate(res: any) {
  playerState.currentTime = parseInt(res.target.currentTime)
}

function onLoadedmetadata(res: any) {
  playerState.maxTime = parseInt(res.target.duration)
}

function showBarInSeconds(seconds: number) {
  if (barState.isWrapperShow === false) {
    barState.isWrapperShow = true;
    setTimeout(() => {
      barState.isWrapperShow = false;
    }, seconds * 1000)
  }
}

function onPlay() {
  playerState.isPlaying = true
  showBarInSeconds(5)
}

function onPause() {
  playerState.isPlaying = false
}

//播放暂停状态切换
function isPlayingToggle() {
  if (playerState.isPlaying === true) {
    audio.value.pause()
  } else {
    audio.value.play()
  }
}

function onMouseLeave() {
  if (barState.isLock === false) {
    barState.isWrapperShow = false
  }
}

function onMouseEnter() {
  barState.isWrapperShow = true
}

function isLockToggle() {
  barState.isLock = !barState.isLock
}

// 将整数转换成 时：分：秒的格式
function realFormatSecond(second: number) {
  var hours = Math.floor(second / 3600)
  second = second - hours * 3600
  var mimute = Math.floor(second / 60)
  second = second - mimute * 60

  return hours > 0 ? (hours + ':') : '' + ('0' + mimute).slice(-2) + ':' + ('0' + second).slice(-2)
}
</script>

<style scoped>
#progress-text {
  font-size: 5px;
  padding-top: 11px;
  color: #f8f8f8;
  width: 100px;
}

#music-title {
  position: absolute;
  top: -4px;
  font-size: 5px;
  color: #f8f8f8;
  left: 36px;
}

.slider-box {
  display: flex;
  position: relative;
}

#music-slider {
  width: 350px;
  padding-top: 10px;
}

.ctrl-icon {
  color: #f2f2f2;
  cursor: pointer;
  font-size: 30px;
  margin: 0 5px;
  cursor: pointer;
}

.music-controller {
  display: flex;
  align-items: center;
  width: 500px;
  height: 53px;
  margin: auto;
}

.lock-wrapper {
  background: #282828;
  width: 50px;
  height: 20px;
  position: absolute;
  right: 10px;
  top: -20px;
  border-radius: 10% 10% 0 0;
}

.lock-icon {
  margin: 3px auto;
  display: block;
  cursor: pointer;
  color: #f2f2f2;
}

.playbar-wrapper {
  background: #282828;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 53px;
  transition: top 250ms;
}

.wrapper-show {
  top: 0;
}

.playbar {
  position: fixed;
  zoom: 1;
  bottom: 0;
  width: 100%;
  height: 53px;
}
</style>