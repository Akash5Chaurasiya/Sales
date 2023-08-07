namespace ItemListing{
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
  
  interface State{
    itemListing: ListingData[],
    loading:{[key:string]:AsyncState}
  }
}