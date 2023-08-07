import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, Image, StyleSheet, View} from 'react-native';
import {Text} from 'react-native';
import DisplayFlop from './components/DisplayFlop';
import AssetIndex, {ImageIndex} from '@src/assets/AssetIndex';
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import {FieldDataService} from '@src/modules/FieldData/FieldData';
import ServerActions from './actions/ServerActions';
import CashCalcuclatorActions from './actions/CashCalculatorActions';
import CreditCalculatorActions from './actions/CreditCalculatorActions';
import getPriceList from './services/getPriceList';
import VirtualizedList from '@src/components/List/VirtualizedList/VirtualizedList';
import Cash from './calculators/Cash/Cash';
import Credit from './calculators/Credit/Credit';
import Online from './calculators/Online/Online';
import {getRoundedNumber} from '@src/modules/Utils/getRoundedVal';
import OnlineCalculatorActions from './actions/OnlineCalculatorActions';
import AsyncStateFactory from '@src/modules/StateManagement/AsyncState/AsyncStateFactory';
import ScreenLoadingBoundary from '@src/components/loading/ScreenLoadingBoundary/ScreenLoadingBoundary';
import Navbar from '@src/components/Project/Navbar/Navbar';

export interface RIPriceCalculation {}

export namespace PIPriceCalculation {}

export default function PriceCalculation(
  {route, navigation}: any,
  props: RIPriceCalculation,
) {
  const {params} = route;
  console.log(params);

  const [marginSeleted, setMarginSeleted] = useState(0);
  const [state, setState] = useState<PriceCalculation.State>({
    calculationData: {
      images: [],
      itemName: '',
      categoryName: '',
      description: '',
      descriptionLabels: [],
      productName: '',
      companyName: '',
      productImage: '',
      priceStructureUnit: '',
      priceField: [],
      margin: {
        cash: 0,
        online: 0,
      },
      negotiation: 0,
      creditMargin: [],
      GST: {
        type: '',
        value: 0,
      },
    },
    numericTotal: 0,
    cashCalculation: {
      currentSliderVal: 0,
      inputValue: FieldDataService.getDefaultField(),
    },
    creditCalculation: {
      selectedCredit: 0,
      currentSliderValue: 0,
      inputValue: FieldDataService.getDefaultField(),
    },
    loading: {
      fetchCalcSpec: AsyncStateFactory(),
    },
  });

  //* actions
  const serverActions = new ServerActions(state, setState);
  const cashCalcActions = new CashCalcuclatorActions(state, setState);
  const creditCalcActions = new CreditCalculatorActions(state, setState);
  const onlineCalcActions = new OnlineCalculatorActions(state, setState);

  useEffect(() => {
    serverActions.fetchCalcData(params.priceId);
  }, []);

  const priceList = useMemo(
    () => getPriceList(state.calculationData.priceField),
    [state],
  );

  return (
    <ScreenLoadingBoundary loadingState={state.loading.fetchCalcSpec}>
      <VirtualizedList>
        <Navbar
          screenName={'Price Calculation'}
          goBack={function (): void {
            navigation.goBack();
          }}
        />

        <View className="items-center bg-white" style={{paddingHorizontal: 20}}>
          {/* title */}
          <View
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(151, 151, 170, 0.22)',
              marginVertical: 10,
              marginHorizontal: 20,
              padding: 12,
              borderRadius: 10,
              flexDirection: 'row',
            }}
            className="items-center">
            <View style={{paddingHorizontal: 16}}>
              <Image
                source={
                  state.calculationData.productImage.length === 0
                    ? ImageIndex.DefaultCategoryImage
                    : {
                        uri: state.calculationData.productImage,
                      }
                }
                style={{
                  height: 64,
                  aspectRatio: 1,
                  borderRadius: 200,
                  resizeMode: 'cover',
                }}
              />
            </View>
            <View style={{flexGrow: 1, flexShrink: 1}}>
              <Text
                style={{
                  color: 'black',
                  fontSize: 20,
                  fontFamily: 'Inter-Bold',
                  overflow: 'hidden',
                  flexGrow: 1,
                  flexShrink: 1,
                  flexWrap: 'wrap',
                }}>
                {state.calculationData.productName}
              </Text>
              <View className="flex flex-row items-center grow overflow-clip">
                <Text style={{color: '#5C5C77', fontFamily: 'Inter-SemiBold'}}>
                  {state.calculationData.companyName}
                </Text>
                <View
                  style={{
                    marginHorizontal: 11,
                    width: 1,
                    height: 37,
                    backgroundColor: '#9797AA',
                  }}></View>
                <Text style={{color: '#5C5C77', fontFamily: 'Inter-Medium'}}>
                  {state.calculationData.categoryName}
                </Text>
              </View>
            </View>
          </View>
          {/* title */}

          {/* price fields */}
          <View
            style={{
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(151, 151, 170, 0.22)',
              borderRadius: 10,
            }}>
            <View style={{paddingTop: 16, paddingStart: 20}}>
              <View style={{flexGrow: 1, flexShrink: 1}}>
                <Text
                  style={{
                    color: '#1E293B',
                    fontFamily: 'Inter-Bold',
                    fontSize: 16,
                  }}>
                  {state.calculationData.productName}
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: 'Inter-Regular',
                  marginBottom: 16,
                  color: '#5F6D7E',
                  fontSize: 14,
                }}>
                Price structure
              </Text>
            </View>

            <View className="flex-row">
              <View style={{width: '50%', backgroundColor: '#2A333E'}}>
                <Text
                  style={{
                    marginVertical: 16,
                    marginStart: 24,
                    fontFamily: 'Inter-Medium',
                    color: 'white',
                  }}>
                  Data
                </Text>
              </View>
              <View style={{width: '50%', backgroundColor: '#2A333E'}}>
                <Text
                  style={{
                    marginVertical: 16,
                    marginStart: 24,
                    fontFamily: 'Inter-Medium',
                    color: 'white',
                  }}>
                  {'Price(Rs)'}
                </Text>
              </View>
            </View>

            <FlatList
              renderItem={v => (
                <View className="flex-row" key={v.index}>
                  <View
                    style={{
                      borderColor: '#D1D9E2',
                      borderRightWidth: 1,
                      borderTopWidth: 1,
                      paddingHorizontal: 24,
                      paddingVertical: 12,
                      width: '50%',
                    }}>
                    <Text
                      style={{
                        width: '100%',
                        color: '#2E3646',
                        fontFamily: 'Inter-SemiBold',
                        fontSize: 14,
                      }}>
                      {v.item.key}
                    </Text>
                  </View>

                  <View
                    style={{
                      borderColor: '#D1D9E2',
                      borderTopWidth: 1,
                      paddingHorizontal: 24,
                      paddingVertical: 12,
                      width: '50%',
                    }}>
                    <Text
                      style={{
                        color: '#5F6D7E',
                        fontFamily: 'Inter-Bold',
                        fontSize: 14,
                      }}>
                      {v.item.value}
                    </Text>
                  </View>
                </View>
              )}
              data={priceList}
            />
          </View>

          {/* //* PRICE FIELDS END */}

          <View
            style={{
              marginTop: 12,
              padding: 14,
              width: '100%',
              borderWidth: 1,
              borderColor: 'rgba(151, 151, 170, 0.22)',
              borderRadius: 10,
            }}>
            <View className="flex-row">
              <View>
                <Text
                  style={{
                    color: 'black',
                    marginStart: 14,
                    marginVertical: 7,
                    fontSize: 20,
                    fontFamily: 'Inter-Medium',
                  }}>
                  Margin
                </Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'rgba(92, 92, 119, 0.22)',
                height: 1,
                width: '100%',
                marginVertical: 14,
              }}
            />

            <View className="flex-row" style={{flexGrow: 1}}>
              <DisplayFlop
                labels={
                  state.calculationData.creditMargin.length
                    ? [
                        {
                          type: 'Cash',
                          value: state.calculationData.margin.cash + '%',
                        },
                        {
                          type: 'Credit',
                          value: (() => {
                            const selectedCredit =
                              state.calculationData.creditMargin[
                                state.creditCalculation.selectedCredit
                              ];
                            if (selectedCredit.type === 'numeric')
                              return (
                                selectedCredit.value +
                                ' Rs +' +
                                state.calculationData.margin.cash +
                                '%'
                              );
                            else
                              return (
                                selectedCredit.value +
                                '% + ' +
                                state.calculationData.margin.cash +
                                '%'
                              );
                          })(),
                        },
                        {
                          type: 'Online',
                          value: state.calculationData.margin.online + '%',
                        },
                      ]
                    : [
                        {
                          type: 'Cash',
                          value: state.calculationData.margin.cash + '',
                        },
                        {
                          type: 'Online',
                          value: state.calculationData.margin.online + '%',
                        },
                      ]
                }
                currentSelected={marginSeleted}
                setCurrentSelected={index => setMarginSeleted(index)}
              />
            </View>

            {marginSeleted === 0 && (
              <Cash
                startRange={cashCalcActions.getSliderStart()}
                endRange={cashCalcActions.getSliderEnd()}
                currentValue={cashCalcActions.getSliderCurrent()}
                setCurrentValue={function (n: number): void {
                  cashCalcActions.setSliderCurrent(n);
                }}
                margin={cashCalcActions.getSliderCurrent().toFixed(2) + ' Rs'}
                taxableValue={
                  cashCalcActions.getTaxableValue().toFixed(2) + 'Rs'
                }
                gst={cashCalcActions.getGst()}
                netTotal={cashCalcActions.getNetTotal()}
              />
            )}
            {marginSeleted === 1 && (
              <Credit
                credits={state.calculationData.creditMargin}
                currentSelected={state.creditCalculation.selectedCredit}
                setCurrentSelected={function (v: number): void {
                  creditCalcActions.setCurrentCredit(v);
                }}
                startRange={creditCalcActions.getSliderStart()}
                endRange={creditCalcActions.getSliderEnd()}
                currentValue={creditCalcActions.getSliderCurrent()}
                margin={
                  getRoundedNumber(creditCalcActions.getSliderCurrent()) + ' Rs'
                }
                taxableValue={creditCalcActions.getTaxableValue() + ' Rs'}
                netTotal={creditCalcActions.getNetTotal()}
                setCurrentValue={function (v: number): void {
                  creditCalcActions.setSliderCurrent(v);
                }}
                gst={creditCalcActions.getGST()}
              />
            )}
            {marginSeleted === 2 && (
              <Online
                margin={onlineCalcActions.getMarginValue()}
                taxableValue={onlineCalcActions.getTaxableValue()}
                gst={onlineCalcActions.getGST()}
                netTotal={onlineCalcActions.getNetTotal()}
              />
            )}
          </View>
        </View>
      </VirtualizedList>
    </ScreenLoadingBoundary>
  );
}

const styles = StyleSheet.create({
  navbar: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 200,
    objectFit: 'cover',
  },
});
