import http from '@/utils/request/request'

/**
 * 获取音乐 url
 * @param id 音乐 id
 */
export function getMusicUrl(id: string | number) {
    return http.request({
        url: `/song/url/v1`,
        params: {id, level: "standard"},
        method: 'post'
    })
}

/**
 * 获取歌曲详情
 * @param id 歌曲id
 */
export function getMusicDetail(ids: string | number) {
    return http.request({
        url: `/song/detail`,
        params: {ids},
        method: 'post'
    })
}
/**
 * 获取歌曲详情
 * @param id 歌曲id
 */
export function getMusicLyric(id: string | number) {
    return http.request({
        url: `/lyric`,
        params: {id},
        method: 'post'
    })
}