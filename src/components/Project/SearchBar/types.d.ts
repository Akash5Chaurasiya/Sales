namespace SearchBar{
  
interface SearchBarData {
  category: SearchAssists[];
  item: SearchAssists[];
  product: SearchAssists[];
}

interface SearchAssists {
  _id: string;
  name: string;
  type: 'category' | 'item' | 'product';
}

interface State{
  searchedData:SearchBarData,
  loading:{[key:string]:AsyncState}
}
}