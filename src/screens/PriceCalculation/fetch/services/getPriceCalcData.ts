import apiIndex from '../apis';
import PriceCalculationInstance from '../instance';
interface PriceFields {
  name: string;
  value: number;
  operation: OpType;
  type: PercNum;
  position: number;
}
interface Credits {
  days: number;
  value: number;
  type: PercNum;
}
interface CalculationData {
  images: string[];
  itemName: string;
  categoryName: string;
  description: string;
  descriptionLabels: {key: string; value: string}[];
  productName: string;
  companyName: string;
  productImage: string;
  priceStructureUnit: string;
  priceField: PriceFields[];
  margin: {
    cash: number;
    online: number;
  };
  negotiation: number;
  creditMargin: Credits[];
  GST: {
    type: string;
    value: number;
  };
}
export default async function getPriceCalcData(id: string) {
  return PriceCalculationInstance.get<CalculationData>(
    apiIndex.getPriceCalculationData(id),
  );
}
