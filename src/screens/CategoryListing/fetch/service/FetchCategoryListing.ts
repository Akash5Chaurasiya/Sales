import { api } from "../apis";
import { CategoryListingInstance } from "../instance";

export interface SearchedCategoryListingData {
  id: string;
  srNO: number;
  categoryName: {
    imageUrl: string;
    name: string;
  };
  itemName: string;
  itemCode: string;
  graph: null;
  time: string;
  activeCompany: string;
  cashNetPrice: number;
}

export default async function fetchCategoryListingData(id:string){
  return await CategoryListingInstance.get<SearchedCategoryListingData[]>(api.getAllCategoryListingData(id))
}