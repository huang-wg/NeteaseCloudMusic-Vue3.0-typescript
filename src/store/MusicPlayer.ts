import {defineStore} from 'pinia'
import {computed, reactive, ref} from "vue";

export interface Music {
    id: number,
    name: string,
    url: string
}

/**
 * 储存音乐播放器的全局变量
 */
export const useMusicPlayerStore = defineStore('MusicPlayer', () => {
    // 音乐列表
    const musicList = reactive<Array<Music>>([])
    // 当前播放音乐的Index
    const currentIndex = ref(0);
    // 获取当前播放音乐信息
    const getCurrentMusic = computed(() => {
        if (musicList.length > 0) {
            return musicList[currentIndex.value]
        }
        return null;
    })

    /**
     * 插入一首歌到当前队列中，并播放
     * @param music 歌曲
     */
    function playAndAddOneSong(music: Music) {
        musicList.splice(currentIndex.value, 0, music);
    }

    /**
     * 播放指定歌曲
     * @param index 歌曲的索引
     */
    function playMusicByIndex(index: number) {
        currentIndex.value = index
    }

    /**
     * 播放下一首音乐
     */
    function playNextMusic() {
        if (currentIndex.value + 1 < musicList.length) {
            currentIndex.value += 1
        }
    }

    /**
     * 播放上一首音乐
     */
    function playLastMusic() {
        if (currentIndex.value - 1 >= 0) {
            currentIndex.value -= 1
        }
    }

    /**
     * 将音乐加入到队列中
     * @param musics
     */
    function pushMusicsIntoList(musics: Array<Music>) {
        musicList.push(...musics);
    }

    /**
     * 用新的音乐队列替换原队列
     * @param musics
     */
    function replaceMusicList(musics: Array<Music>) {
        musicList.splice(0, musicList.length);
        musicList.push(...musics)
        currentIndex.value = 0
    }

    return {
        playNextMusic,
        playLastMusic,
        musicList,
        playAndAddOneSong,
        pushMusicsIntoList,
        replaceMusicList,
        getCurrentMusic,
        playMusicByIndex
    }
})