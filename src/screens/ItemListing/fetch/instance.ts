import AxiosFactory from "@src/modules/axios/AxiosFactory";

export const ItemListingInstance = AxiosFactory.createInstance({
  baseURL:"sales/pages/searchedItem/"
})