import {FieldDataService, Validators} from '@src/modules/FieldData/FieldData';
import StateUtils from '@src/modules/StateManagement/Core/StateUtils';
import {getRoundedNumber} from '@src/modules/Utils/getRoundedVal';

export default class CreditCalculatorActions
  extends StateUtils<PriceCalculation.State>
  implements PriceCalculation.CreditCalculatorActions
{
  getCurrentCredit(): string {
    const creditList = this.state.calculationData.creditMargin;
    const selectedCredit =
      creditList[this.state.creditCalculation.selectedCredit];
    const cashMargin = this.state.calculationData.margin.cash;
    if (selectedCredit.type === 'numeric') {
      return 'Rs ' + selectedCredit.value + ' + ' + cashMargin + '%';
    } else {
      const netMarginPercentage = selectedCredit.value + cashMargin;
      return netMarginPercentage + '%';
    }
  }
  getSliderStart(): number {
    const netTotal = this.state.numericTotal;
    const creditList = this.state.calculationData.creditMargin;
    const selectedCredit =
      creditList[this.state.creditCalculation.selectedCredit];
    const cashMarginPercentage = this.state.calculationData.margin.cash;
    const cashMarginValue = (netTotal * cashMarginPercentage) / 100;
    const negotiationPercentage = this.state.calculationData.negotiation;

    let start = 0;
    let margin = 0;

    if (selectedCredit.type === 'numeric') {
      margin = selectedCredit.value + cashMarginValue;
    } else {
      const totalPercentage = selectedCredit.value + cashMarginPercentage;
      margin = (totalPercentage * netTotal) / 100;
    }

    const negotiationValue = (negotiationPercentage * margin) / 100;

    start = margin - negotiationValue;

    return getRoundedNumber(start);
  }
  getSliderEnd(): number {
    const netTotal = this.state.numericTotal;
    const creditList = this.state.calculationData.creditMargin;
    const selectedCredit =
      creditList[this.state.creditCalculation.selectedCredit];
    const cashMarginPercentage = this.state.calculationData.margin.cash;
    const cashMarginValue = (netTotal * cashMarginPercentage) / 100;
    const negotiationPercentage = this.state.calculationData.negotiation;

    let end = 0;
    let margin = 0;

    if (selectedCredit.type === 'numeric') {
      margin = selectedCredit.value + cashMarginValue;
    } else {
      const totalPercentage = selectedCredit.value + cashMarginPercentage;
      margin = (totalPercentage * netTotal) / 100;
    }

    const negotiationValue = (negotiationPercentage * margin) / 100;

    end = margin + negotiationValue;

    return getRoundedNumber(end);
  }
  getSliderCurrent(): number {
    return this.state.creditCalculation.currentSliderValue;
  }
  getTaxableValue(): number {
    return getRoundedNumber(this.state.numericTotal + this.getSliderCurrent());
  }
  getGST(): string {
    const taxableValue = this.getTaxableValue();
    const gst = this.state.calculationData.GST;
    let gstString = '';

    if (gst.type === 'numeric') {
      gstString = 'Rs ' + getRoundedNumber(gst.value);
    } else {
      gstString =
        getRoundedNumber(gst.value) +
        '% (Rs ' +
        getRoundedNumber((gst.value * taxableValue) / 100) +
        ')';
    }

    return gstString;
  }
  getNetTotal(): string {
    const taxableValue = this.getTaxableValue();
    const gst = this.state.calculationData.GST;
    let total = '';

    if (gst.type === 'numeric') {
      total = 'Rs ' + getRoundedNumber(gst.value + taxableValue);
    } else {
      total =
        'Rs ' + getRoundedNumber(((100 + gst.value) * taxableValue) / 100);
    }

    return total;
  }

  setCurrentCredit(val: number) {
    const netTotal = this.state.numericTotal;
    const creditList = this.state.calculationData.creditMargin;
    const selectedCredit =
      creditList[val];
    const cashMarginPercentage = this.state.calculationData.margin.cash;
    const cashMarginValue = (netTotal * cashMarginPercentage) / 100;
    const negotiationPercentage = this.state.calculationData.negotiation;

    let margin = 0;

    if (selectedCredit.type === 'numeric') {
      margin = selectedCredit.value + cashMarginValue;
    } else {
      const totalPercentage = selectedCredit.value + cashMarginPercentage;
      margin = (totalPercentage * netTotal) / 100;
    }

    this.mutateState(p => {
      p.creditCalculation.selectedCredit = val;
      p.creditCalculation.currentSliderValue = margin;
    });
  }
  setSliderCurrent(val: number) {
    this.mutateState(p => {
      p.creditCalculation.currentSliderValue = val;
      p.creditCalculation.inputValue.value = val.toString();
    });
  }
  setNetMargin(val: number) {
    const verdict = {isValid: true};
    this.mutateState(p => {
      p.creditCalculation.inputValue.value = val.toString();
      p.creditCalculation.inputValue.error = FieldDataService.registerValidator(
        p.creditCalculation.inputValue.value,
        verdict,
        Validators.validateNull,
        d => Validators.max(d, this.getSliderEnd()),
        d => Validators.min(d, this.getSliderStart()),
      );
      if (verdict.isValid) {
        p.creditCalculation.currentSliderValue = val;
      }
    });
  }
  validateNetMargin(): void {}
}
