import { shallowMount } from "@vue/test-utils";
import CategorizedStock from "@/components/CategorizedStock.vue";
import { ICategorizedStock } from "@/domain/qiita";

describe("CategorizedStock.vue", () => {
  const stock: ICategorizedStock = {
    id: 1,
    article_id: "c0a2609ae61a72dcc60f",
    title: "title1",
    user_id: "test-user1",
    profile_image_url: "https://test.com/test/image",
    article_created_at: "2018/09/30",
    tags: ["laravel", "php"],
    isChecked: true
  };

  const propsData: {
    stock: ICategorizedStock;
    isCategorizing: boolean;
    isCancelingCategorization: boolean;
  } = {
    stock,
    isCategorizing: false,
    isCancelingCategorization: false
  };

  it("props", () => {
    const wrapper = shallowMount(CategorizedStock, { propsData });
    expect(wrapper.props()).toEqual(propsData);
  });

  describe("methods", () => {
    it("should emit clickCheckStock on onClickCheckStock()", () => {
      const wrapper = shallowMount(CategorizedStock, { propsData });

      // @ts-ignore
      wrapper.vm.onClickCheckStock();

      expect(wrapper.emitted("clickCheckStock")).toBeTruthy();
      expect(wrapper.emitted("clickCheckStock")[0][0]).toEqual(stock);
    });

    it("should emit clickCancelCategorization on onClickCancelCategorization()", () => {
      const wrapper = shallowMount(CategorizedStock, { propsData });

      // @ts-ignore
      wrapper.vm.onClickCancelCategorization();

      expect(wrapper.emitted("clickCancelCategorization")).toBeTruthy();
      expect(wrapper.emitted("clickCancelCategorization")[0][0]).toEqual(
        stock.id
      );
    });
  });

  describe("template", () => {
    it("should call onClickCheckStock when input is changed", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(CategorizedStock, { propsData });

      wrapper.setMethods({
        onClickCheckStock: mock
      });

      wrapper.find("input").trigger("change");
      expect(mock).toHaveBeenCalled();
    });

    it("should call onClickCancelCategorization when icon is clicked", () => {
      const mock = jest.fn();
      const wrapper = shallowMount(CategorizedStock, { propsData });

      wrapper.setMethods({
        onClickCancelCategorization: mock
      });

      wrapper
        .findAll("p")
        .at(1)
        .trigger("click");
      expect(mock).toHaveBeenCalled();
    });
  });
});
