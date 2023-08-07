import {ServerStateUtils} from '@src/modules/StateManagement/Core/StateUtils';
import fetchCategoryData from '../fetch/service/fetchCategoryData';
import fetchPopularData from '../fetch/service/fetchPopularData';
import getCompanyList from '../fetch/service/getCompanyList';

export default class DashboardCategoriesAction extends ServerStateUtils<Dashboard.State> {
  async fetchAllCategories() {
    const res = await this.handleAsync('fetchCatData', () =>
      fetchCategoryData(),
    );
    if (res) {
      const data = res.data;
      // console.log(data)
      this.mutateState(p => {
        p.categoryList = data;
      });
    }
  }

  async fetchPopular(userId: string) {
    const res = await this.handleAsync('fetchPopular', () =>
      fetchPopularData(userId),
    );

    if (res) {
      this.mutateState(p => {
        p.popularListData = res.data;
      });
    }
  }

  async fetchAllCompany() {
    const res = await this.handleAsync('fetchCompany', () => getCompanyList());

    if (res) {
      this.mutateState(p => {
        p.companyList = res.data;
      });
    }
  }

  setSelectedEntity(entity: 'category' | 'company') {
    this.mutateState(p => {
      p.selectedEntity = entity;
    });
  }
}
