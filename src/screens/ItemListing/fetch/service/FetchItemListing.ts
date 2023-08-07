import ItemListing from "../../ItemListing";
import { api } from "../api";
import { ItemListingInstance } from "../instance";

interface ListingData {
  id: string;
  srNo: number;
  company: { companyName: string; imageURL: string };
  time: string;
  basicDifference: number;
  difference: number;
  margin: number;
  taxableValue: number;
  rate: number;
  status: boolean;
}

export default async function fetchItemListingData(id:string){
  return await ItemListingInstance.get<ListingData[]>(api.getAllItemListingData(id))
}