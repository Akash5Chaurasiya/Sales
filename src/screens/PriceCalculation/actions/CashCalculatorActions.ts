import {FieldDataService, Validators} from '@src/modules/FieldData/FieldData';
import FieldDataClass from '@src/modules/FieldData/FieldDataClass';
import StateUtils from '@src/modules/StateManagement/Core/StateUtils';
import {getRoundedNumber} from '@src/modules/Utils/getRoundedVal';

export default class CashCalcuclatorActions
  extends StateUtils<PriceCalculation.State>
  implements PriceCalculation.CashCalculatorActions
{
  getSliderStart(): number {
    const netTotal = this.state.numericTotal;
    const marginPercentage = this.state.calculationData.margin.cash;
    const margin = (netTotal * marginPercentage) / 100;
    const negotiationPercentage = this.state.calculationData.negotiation;
    const negotiation = (margin * negotiationPercentage) / 100;
    return getRoundedNumber(margin - negotiation);
  }
  getSliderCurrent(): number {
    return this.state.cashCalculation.currentSliderVal;
  }
  getSliderEnd(): number {
    const netTotal = this.state.numericTotal;
    const marginPercentage = this.state.calculationData.margin.cash;
    const margin = (netTotal * marginPercentage) / 100;
    const negotiationPercentage = this.state.calculationData.negotiation;
    const negotiation = (margin * negotiationPercentage) / 100;
    return getRoundedNumber(margin + negotiation);
  }
  getTaxableValue(): number {
    const totalValue =
      this.state.numericTotal + this.state.cashCalculation.currentSliderVal;
    return getRoundedNumber(totalValue);
  }
  getGst(): string {
    let gstString = '';
    const gst = this.state.calculationData.GST;

    if (gst.type === 'numeric') {
      gstString = 'Rs ' + getRoundedNumber(gst.value);
    } else {
      const taxableValue = this.getTaxableValue();
      const gstShare = getRoundedNumber((gst.value * taxableValue) / 100);
      gstString =
        getRoundedNumber(gst.value) +
        '% ' +
        '(Rs ' +
        getRoundedNumber(gstShare) +
        ')';
    }

    return gstString;
  }
  getNetTotal(): string {
    const taxableValue = this.getTaxableValue();
    let gstShare = 0;
    const gst = this.state.calculationData.GST;

    if (gst.type === 'numeric') {
      gstShare = getRoundedNumber(gst.value);
    } else {
      gstShare = getRoundedNumber((gst.value * taxableValue) / 100);
    }

    const netTotal = gstShare + taxableValue;
    return 'Rs ' + getRoundedNumber(netTotal);
  }

  //* setters
  setSliderCurrent(val: number): void {
    this.mutateState(p => {
      p.cashCalculation.currentSliderVal = val;
    });
  }
  setMarginValue(val: number): void {
    this.mutateState(p => {
      p.cashCalculation.inputValue.value = val.toString();
    });
  }
  validateMarginValue() {
    const verdict = {
      isValid: true,
    };
    this.mutateState(p => {
      const input = p.cashCalculation.inputValue;
      input.error = FieldDataService.registerValidator(
        input.value,
        verdict,
        Validators.validateNull,
        d => Validators.max(d, this.getSliderEnd()),
        d => Validators.min(d, this.getSliderStart()),
      );
    });
  }
}
