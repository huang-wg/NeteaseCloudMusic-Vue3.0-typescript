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