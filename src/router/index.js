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
      path: '/article/:id/:node',
      name: 'Article',
      component: Article,
      meta: { requiresAuth: true },
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   if (to.matched.some(record => record.meta.requiresAuth)) {
//     if (!store.state.user.isLogged) {
//       store.commit('layout/toggleLoginShow');
//       next({
//         path: '/',
//       });
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// });

export default router;
