import router from './router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Route } from 'vue-router';

NProgress.configure({ showSpinner: false });

const whiteList = ['/login'];

router.beforeEach((to: Route, from: Route, next: any) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});
