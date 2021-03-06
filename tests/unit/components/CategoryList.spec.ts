import { shallowMount, mount, config } from "@vue/test-utils";
import CategoryList from "@/components/CategoryList.vue";
import Category from "@/components/Category.vue";
import { ICategory } from "@/domain/qiita";
import { IUpdateCategoryPayload } from "@/store/modules/actions";

config.logModifiedComponents = false;

describe("CategoryList.vue", () => {
  const propsData: { categories: ICategory[] } = {
    categories: [{ categoryId: 1, name: "テストカテゴリ" }]
  };

  describe("methods", () => {
    it("should emit clickCategory on onClickCategory()", () => {
      const wrapper = shallowMount(CategoryList, { propsData });

      // @ts-ignore
      wrapper.vm.onClickCategory();

      expect(wrapper.emitted("clickCategory")).toBeTruthy();
    });

    it("should emit clickUpdateCategory on onClickUpdateCategory()", () => {
      const wrapper = shallowMount(CategoryList, { propsData });
      const editedCategory = "編集されたカテゴリ名";

      const updateCategoryPayload: IUpdateCategoryPayload = {
        stateCategory: propsData.categories[0],
        categoryName: editedCategory
      };

      // @ts-ignore
      wrapper.vm.onClickUpdateCategory(updateCategoryPayload);

      expect(wrapper.emitted("clickUpdateCategory")).toBeTruthy();
      expect(wrapper.emitted("clickUpdateCategory")[0][0]).toEqual(
        updateCategoryPayload
      );
    });

    it("should emit clickDestroyCategory on onClickDestroyCategory()", () => {
      const wrapper = shallowMount(CategoryList, { propsData });
      const categoryId = 1;

      // @ts-ignore
      wrapper.vm.onClickDestroyCategory(categoryId);

      expect(wrapper.emitted("clickDestroyCategory")).toBeTruthy();
      expect(wrapper.emitted("clickDestroyCategory")[0][0]).toEqual(categoryId);
    });
  });

  // mountによる結合テスト
  describe("template", () => {
    const $route = {
      path: "/stocks/categories",
      params: { id: 1 }
    };
    const $router = {
      push: () => {}
    };

    it("should call onClickCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(CategoryList, {
        propsData,
        mocks: { $route, $router }
      });

      wrapper.setMethods({
        onClickCategory: mock
      });

      const category = wrapper.find(Category);

      // @ts-ignore
      category.vm.onClickCategory();

      expect(mock).toHaveBeenCalledWith();
    });

    it("should call onClickUpdateCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(CategoryList, {
        propsData,
        mocks: { $route, $router }
      });

      wrapper.setMethods({
        onClickUpdateCategory: mock
      });

      const category = wrapper.find(Category);
      const editedCategory = "編集されたカテゴリ名";

      // @ts-ignore
      category.vm.editCategoryName = editedCategory;

      // @ts-ignore
      category.vm.onClickUpdateCategory();

      const updateCategoryPayload: IUpdateCategoryPayload = {
        stateCategory: propsData.categories[0],
        categoryName: editedCategory
      };

      expect(mock).toHaveBeenCalledWith(updateCategoryPayload);
    });

    it("should call onClickDestroyCategory when button is clicked", () => {
      const mock = jest.fn();
      const wrapper = mount(CategoryList, {
        propsData,
        mocks: { $route, $router }
      });

      wrapper.setMethods({
        onClickDestroyCategory: mock
      });

      const category = wrapper.find(Category);
      // @ts-ignore
      category.vm.confirmDestroy();

      expect(mock).toHaveBeenCalledWith(propsData.categories[0].categoryId);
    });
  });
});
