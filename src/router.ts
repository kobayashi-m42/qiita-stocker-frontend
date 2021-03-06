import Vue from "vue";
import Router from "vue-router";
import SignUp from "./pages/SignUp.vue";
import Login from "./pages/Login.vue";
import Stocks from "./pages/Stocks.vue";
import StockCategories from "./pages/StockCategories.vue";
import OAuthCallback from "./pages/oAuth/callback/OAuthCallback.vue";
import Cancel from "./pages/cencel/Cancel.vue";
import CancelComplete from "./pages/cencel/complete/CancelComplete.vue";
import Error from "./pages/Error.vue";
import Terms from "./pages/Terms.vue";
import Privacy from "./pages/Privacy.vue";
import NotFound from "./pages/NotFound.vue";
import Home from "./pages/Home.vue";
import { STORAGE_KEY_SESSION_ID } from "@/domain/qiita";
import LocalStorageFactory from "@/factory/repository/LocalStorageFactory";
declare global {
  interface Window {
    dataLayer: Array<any>;
    gtag: (...args: any[]) => void;
  }
}

const localStorage = LocalStorageFactory.create();

Vue.use(Router);

export const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUp
    },
    {
      path: "/stocks/all",
      name: "stocks",
      component: Stocks,
      meta: { requiresAuth: true }
    },
    {
      path: "/stocks/categories/:id",
      name: "stockCategories",
      component: StockCategories,
      meta: { requiresAuth: true }
    },
    {
      path: "/oauth/callback",
      name: "oAuthCallback",
      component: OAuthCallback
    },
    {
      path: "/cancel",
      name: "cancel",
      component: Cancel,
      meta: { requiresAuth: true }
    },
    {
      path: "/cancel/complete",
      name: "cancelComplete",
      component: CancelComplete,
      meta: { requiresAuth: true }
    },
    {
      path: "/error",
      name: "error",
      component: Error,
      props: true
    },
    {
      path: "/terms",
      name: "terms",
      component: Terms
    },
    {
      path: "/privacy",
      name: "privacy",
      component: Privacy
    },
    {
      path: "*",
      name: "notFound",
      component: NotFound
    }
  ]
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = localStorage.load(STORAGE_KEY_SESSION_ID) || "";

  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    isLoggedIn === ""
  ) {
    next({ path: "/", query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

router.afterEach(to => {
  const trackingId = process.env.VUE_APP_TRACKING_ID;
  function gtag(...args: any[]) {
    const dataLayer = (window.dataLayer = window.dataLayer || []);
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", trackingId, { page_path: to.path });
});
