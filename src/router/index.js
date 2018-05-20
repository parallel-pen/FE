import Vue from 'vue';
import Router from 'vue-router';
// import store from '@/store';
import Index from '@/components/Index';
import Recent from '@/components/Recent';
import Article from '@/components/Article';
// import Login from '@/components/Login';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      // beforeEnter: (to, from, next) => {
      //   if (store.state.user.isLogged) {
      //     next({
      //       path: '/recent',
      //     });
      //   } else {
      //     next();
      //   }
      // },
    },
    {
      path: '/recent',
      name: 'Recent',
      component: Recent,
      meta: { requiresAuth: true },
    },
    {
      path: '/article/beta/:node',
      name: 'Article',
      component: Article,
      meta: { requiresAuth: true },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

export default router;
