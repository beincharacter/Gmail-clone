import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EmailView from '../views/template/EmailView.vue';
import MessageView from '../views/MessageView.vue';
import LoginView from '../views/LoginView.vue';
import StarredView from '../views/StarredView.vue';
import SentView from '../views/SentView.vue';
import { useUserStore } from '@/store/UserStore';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: LoginView
  },
  {
    path: '/email',
    beforeEnter: (to, from, next) => {
      useUserStore().email ? next() : next('/')
    },
    component: EmailView,
    children: [
      {
        path: '',
        component: HomeView
      },
      {
        path: 'message/:id',
        component: MessageView
      }
    ]
  },
  {
    path: '/starred',
    beforeEnter: (to, from, next) => {
      useUserStore().email ? next() : next('/')
    },
    component: EmailView,
    children: [
      {
        path: '',
        component: StarredView
      },
      {
        path: 'message/:id',
        component: MessageView
      }
    ]
  },
  {
    path: '/sent',
    beforeEnter: (to, from, next) => {
      useUserStore().email ? next() : next('/')
    },
    component: EmailView,
    children: [
      {
        path: '',
        component: SentView
      },
      {
        path: 'message/:id',
        component: MessageView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
