import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import fetchItemListingData from "../../fetch/service/FetchItemListing";

export default class ItemListingAction extends ServerStateUtils<ItemListing.State>{
  async fetchItemData(id:string){
    const res = await this.handleAsync("fetchItemListing",()=>fetchItemListingData(id))
    if(res){
      const data = res.data
      console.log("itemListing Data:",data)
      this.mutateState((p)=>{
        p.itemListing=data
      })
    }
  }
}