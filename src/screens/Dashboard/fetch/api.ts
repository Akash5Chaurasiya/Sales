const apiIndex = {};

export const api = {
  getAllCategories: 'getCategories',
  getPopularList: (id: string) => `getPopular/${id}`,
  getCompanyList: 'getCompanyList',
};
