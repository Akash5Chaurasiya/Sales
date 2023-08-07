import Dashboard from "../../Dashboard";
import { api } from "../api";
import { dashboardInstance } from "../instance";

interface DashboardCategoryData{
  id:string,
  name:string;
  itemCount:number,
  image:string,
  companyCount:number
}

export default async function fetchCategoryData(){
  return await dashboardInstance.get<DashboardCategoryData[]>(api.getAllCategories)
}

