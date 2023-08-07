namespace PriceCalculation {
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
  interface State {
    calculationData: CalculationData;
    numericTotal: number;
    cashCalculation: {
      currentSliderVal: number;
      inputValue: FieldData;
    };
    creditCalculation: {
      selectedCredit: number;
      currentSliderValue: number;
      inputValue: FieldData;
    };
    loading: Record<string, AsyncState>;
  }

  interface ServerActions {
    fetchCalcData(id: string);
  }

  interface CashCalculatorActions {
    /**
     * function to get the start of the slider range
     */
    getSliderStart(): number;
    getSliderCurrent(): number;
    getSliderEnd(): number;
    getTaxableValue(): number;
    getGst(): string;
    getNetTotal(): string;

    //* setters
    setSliderCurrent(val: number): void;
    setMarginValue(val: number): void;
    validateMarginValue(): void;
  }

  interface CreditCalculatorActions {
    getCurrentCredit(): string;
    getSliderStart(): number;
    getSliderEnd(): number;
    getSliderCurrent(): number;
    getTaxableValue(): number;
    getGST(): string;
    getNetTotal(): string;

    //* setters
    setCurrentCredit(val: number);
    setSliderCurrent(val: number);
    setNetMargin(val: number);
    validateNetMargin(): void;
  }

  interface OnlineCalculatorActions {
    getOnlineMargin(): string;
    getMarginValue(): string;
    getTaxableValue(): string;
    getGST(): string;
    getNetTotal(): string;
  }
}
