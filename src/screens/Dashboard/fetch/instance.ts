import AxiosFactory from "@src/modules/axios/AxiosFactory";

export const dashboardInstance = AxiosFactory.createInstance({
  baseURL:"sales/pages/dashboard/"
})