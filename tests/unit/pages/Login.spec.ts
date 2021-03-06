import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import Login from "@/pages/Login.vue";
import { QiitaModule } from "@/store/modules/qiita";

import { IQiitaState } from "@/types/qiita";
import VueRouter from "vue-router";

const localVue = createLocalVue();

localVue.use(Vuex);
localVue.use(VueRouter);

const router = new VueRouter();

describe("Login.vue", () => {
  let store: any;
  let state: IQiitaState;
  let actions: any;

  it('calls store action "login" when button is clicked', () => {
    state = {
      authorizationCode: "",
      accessToken: "",
      qiitaAccountId: "",
      permanentId: "",
      sessionId: "",
      categories: [],
      stocks: [],
      categorizedStocks: [],
      currentPage: 1,
      paging: [],
      displayCategoryId: 0,
      isCategorizing: false,
      isCancelingCategorization: false,
      isLoading: false
    };

    actions = {
      login: jest.fn()
    };

    store = new Vuex.Store({
      modules: {
        QiitaModule: {
          namespaced: true,
          state,
          actions,
          getters: QiitaModule.getters
        }
      }
    });

    const wrapper = shallowMount(Login, { store, localVue, router });
    const button = wrapper.find("button");

    button.trigger("click");
    expect(actions.login).toHaveBeenCalled();
  });
});
