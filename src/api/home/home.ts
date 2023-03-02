import http from '@/utils/request/request'

/**
 * 热门歌单分类
 */
export function getPlaylistHot() {
    return http.request({
        url: '/playlist/hot',
        method: 'post'
    })
}

/**
 * 调用此接口 , 可获取热门歌手数据
 * @param offset 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0
 * @param limit 取出数量 , 默认为 50
 */
export function getTopArtists(offset: number, limit: number) {
    return http.request({
        url: `/top/artists`,
        params: {offset, limit},
        method: 'post'
    })
}

/**
 * 所获取有榜单
 */
export function getTopList() {
    return http.request({
        url: `/toplist`,
        method: 'post'
    })
}

/**
 * 获取歌单详情,(榜单也是一种歌单)
 * @param id
 */
export function getPlaylistDetail(id: number) {
    return http.request({
        url: `/playlist/detail`,
        params: {id},
        method: 'post'
    })
}