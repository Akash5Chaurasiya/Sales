namespace CategoryListing{
  interface SearchedCategoryListingData {
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

  interface State{
    categoryList:SearchedCategoryListingData[]
    loading:{[key:string]:AsyncState}
  }
}