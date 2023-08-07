import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import fetchCategoryListingData from "../../fetch/service/FetchCategoryListing";

export default class CategoryListingAction extends ServerStateUtils<CategoryListing.State>{
  async fetchCategoryListing(id:string){
    const res = await this.handleAsync("fetchCategoryListing",()=>fetchCategoryListingData(id))
    if(res){
      const data = res.data
      console.log("categoryListing Data:",data)
      this.mutateState((p)=>{
        p.categoryList=data
      })
    }
  }
}