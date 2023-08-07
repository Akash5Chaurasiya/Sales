import AxiosFactory from "@src/modules/axios/AxiosFactory";

export const CategoryListingInstance = AxiosFactory.createInstance({
  baseURL:"sales/pages/searchedCategory/"
})