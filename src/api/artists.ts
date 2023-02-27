import http from '@/utils/request/request'

/**
 * 获取歌手详细
 * @param id 歌手id
 */
export function getArtistsDetail(id: string | number ) {
    return http.request({
        url: `/artist/detail`,
        params: {id},
        method: 'post'
    })
}

/**
 * 获取歌手热门50首歌
 * @param id 歌手id
 */
export function getArtistsTopSongs(id: string | number) {
    return http.request({
        url: `/artist/top/song`,
        params: {id},
        method: 'post'
    })
}