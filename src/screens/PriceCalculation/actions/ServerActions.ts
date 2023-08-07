import {ServerStateUtils} from '@src/modules/StateManagement/Core/StateUtils';
import getPriceCalcData from '../fetch/services/getPriceCalcData';
import {getRoundedNumber} from '@src/modules/Utils/getRoundedVal';

export default class ServerActions
  extends ServerStateUtils<PriceCalculation.State>
  implements PriceCalculation.ServerActions
{
  async fetchCalcData(id: string) {
    const res = await this.handleAsync('fetchCalcSpec', () =>
      getPriceCalcData(id),
    );
    if (res) {
      const data = res.data;

      // getting the net total
      let netTotal = 0;
      for (let pf of data.priceField) {
        if (pf.type === 'numeric') {
          if (pf.operation === 'add') {
            netTotal += pf.value;
          } else {
            netTotal -= pf.value;
          }
        }
      }

      let percSum = 0;

      for (let pf of data.priceField) {
        if (pf.type === 'percentage') {
          if (pf.operation === 'add') {
            percSum += (pf.value * netTotal) / 100;
          } else {
            percSum -= (pf.value * netTotal) / 100;
          }
        }
      }

      netTotal += percSum;

      // cash calculator start range
      const cashMargin = data.margin.cash;
      const cashMarginValue = (netTotal * cashMargin) / 100;
      const negotiation = data.negotiation;
      const negotiationValue = (cashMarginValue * negotiation) / 100;
      const cashCaclSliderRange = {
        start: cashMarginValue - negotiationValue,
        end: cashMarginValue + negotiationValue,
        current: cashMarginValue,
      };
      let creditCalcSliderRange = {
        start: 0,
        current: 0,
        end: 0,
      };

      if (data.creditMargin.length) {
        const selectedCredit = data.creditMargin[0];
        let netMargin = 0;

        if (selectedCredit.type === 'numeric') {
          netMargin = cashMarginValue + selectedCredit.value;
        } else {
          netMargin = cashMarginValue + (selectedCredit.value * netTotal) / 100;
        }

        const negotiationValue = (netMargin * negotiation) / 100;
        creditCalcSliderRange = {
          start: netMargin - negotiationValue,
          current: netMargin,
          end: netMargin + negotiationValue,
        };
      }

      this.mutateState(p => {
        p.numericTotal = getRoundedNumber(netTotal);
        p.calculationData = res.data;
        p.cashCalculation.currentSliderVal = getRoundedNumber(
          cashCaclSliderRange.current,
        );
        p.cashCalculation.inputValue.value =
          cashCaclSliderRange.current.toFixed(2);
        p.creditCalculation.currentSliderValue = getRoundedNumber(
          creditCalcSliderRange.current,
        );
        p.creditCalculation.inputValue.value =
          creditCalcSliderRange.current.toFixed(2);
        p.creditCalculation.selectedCredit = 0;
      });
    }
  }
}
