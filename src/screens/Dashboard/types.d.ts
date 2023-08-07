namespace Dashboard {
  interface DashboardCategoryData {
    id: string;
    name: string;
    itemCount: number;
    image: string;
    companyCount: number;
  }
  interface PopularListData {
    id: string;
    name: string;
    type: string;
    views: number;
  }
  interface CompanyRateList {
    id: string;
    name: string;
    image: string;
    basicRate: number | null;
    productCount: number;
  }
  interface State {
    categoryList: DashboardCategoryData[];
    companyList: CompanyRateList[];
    selectedEntity: 'category' | 'company';
    popularListData: PopularListData[];
    loading: {[key: string]: AsyncState};
  }
}
