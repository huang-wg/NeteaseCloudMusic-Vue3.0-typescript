import {defineStore} from 'pinia'
import {computed, reactive, ref} from "vue";

interface Music {
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
     * 播放队列中增加需要播放的音乐
     * @param musics
     */
    function addMusicsIntoList(musics: Array<Music>) {

    }

    return {musicList, playAndAddOneSong, addMusicsIntoList, getCurrentMusic, playMusicByIndex}
})