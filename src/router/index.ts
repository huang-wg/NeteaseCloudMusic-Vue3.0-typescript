import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/home/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/artist/:id',
            name: 'artist',
            component: () => import('@/views/artists/ArtistsView.vue')
        },
        {
            path: '/song/:id',
            name: 'song',
            component: () => import('@/views/song/SongView.vue')
        },
        {
            path: '/playlist',
            name: 'playlist',
            component: () => import('@/views/playlist/PlaylistView.vue')
        }
    ]
})

export default router
