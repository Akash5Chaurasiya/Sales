import StateUtils from '@src/modules/StateManagement/Core/StateUtils';
import {getRoundedNumber} from '@src/modules/Utils/getRoundedVal';

export default class OnlineCalculatorActions
  extends StateUtils<PriceCalculation.State>
  implements PriceCalculation.OnlineCalculatorActions
{
  getOnlineMargin(): string {
    return this.state.calculationData.margin.online + '%';
  }
  getMarginValue(): string {
    const netTotal = this.state.numericTotal;
    const onlineMarginPercentage = this.state.calculationData.margin.online;
    const onlineMargin = (netTotal * onlineMarginPercentage) / 100;

    return 'Rs ' + getRoundedNumber(onlineMargin);
  }
  getTaxableValue(): string {
    const netTotal = this.state.numericTotal;
    const onlineMarginPercentage = this.state.calculationData.margin.online;
    const onlineMargin = (netTotal * onlineMarginPercentage) / 100;
    return 'Rs ' + netTotal + onlineMargin;
  }
  getGST(): string {
    const netTotal = this.state.numericTotal;
    const onlineMarginPercentage = this.state.calculationData.margin.online;
    const onlineMargin = (netTotal * onlineMarginPercentage) / 100;
    const taxableValue = netTotal + onlineMargin;

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
    const netTotal = this.state.numericTotal;
    const onlineMarginPercentage = this.state.calculationData.margin.online;
    const onlineMargin = (netTotal * onlineMarginPercentage) / 100;
    const taxableValue = netTotal + onlineMargin;

    const gst = this.state.calculationData.GST;
    let gstValue = 0;
    let total = '';

    if (gst.type === 'numeric') {
      gstValue = gst.value;
    } else {
      gstValue = (gst.value * taxableValue) / 100;
    }

    total = 'Rs ' + getRoundedNumber(taxableValue + gstValue);

    return total;
  }
}
