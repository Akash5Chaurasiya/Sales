import { ServerStateUtils } from "@src/modules/StateManagement/Core/StateUtils";
import fetchSearchData from "../../fetch/service/FetchSearchBar";

export default class FetchSearchBarAction extends ServerStateUtils<SearchBar.State>{
   async fetchSearchData(query:string){
    const res= await this.handleAsync("fetchSearchData",()=>fetchSearchData(query))
    if(res){
      const data = res.data
      // console.log(data)
      this.mutateState((p)=>{
        p.searchedData=data
      })
    }
   }
}