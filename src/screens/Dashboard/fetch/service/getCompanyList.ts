import {api} from '../api';
import {dashboardInstance} from '../instance';

interface CompanyRateList {
  id: string;
  name: string;
  image: string;
  basicRate: number | null;
  productCount: number;
}

export default async function getCompanyList() {
  return dashboardInstance.get<CompanyRateList[]>(api.getCompanyList);
}
