import {api} from '../api';
import {dashboardInstance} from '../instance';

interface PopularListData {
  id: string;
  name: string;
  type: string;
  views: number;
}

export default async function getPopularData(id: string) {
  return await dashboardInstance.get<PopularListData[]>(api.getPopularList(id));
}
