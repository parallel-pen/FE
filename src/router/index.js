import Vue from 'vue';
import Router from 'vue-router';
import store from '@/store';
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
    {
      path: '*',
      redirect: '/',
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    }
    return { x: 0, y: 0 };
  },
});

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (store.state.user.isLogged) {
      next();
    } else {
      next({
        path: '/',
        query: { redirect: to.fullPath }, // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  } else {
    next();
  }
});

export default router;
