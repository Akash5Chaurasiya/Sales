import React from 'react';
import {View, Text} from 'react-native';
import Slider from '@react-native-community/slider';
import GrouppedButton from '../../components/GrouppedButton';

export interface RICredit {
  credits: PriceCalculation.Credits[];
  currentSelected: number;
  setCurrentSelected: (v: number) => void;
  setCurrentValue: (v: number) => void;
  startRange: number;
  endRange: number;
  currentValue: number;
  margin: string;
  taxableValue: string;
  gst: string;
  netTotal: string;
}

export namespace PICredit {}

export default function Credit(props: RICredit) {
  const {
    credits,
    currentSelected,
    setCurrentSelected,
    setCurrentValue,
    startRange,
    endRange,
    currentValue,
    margin,
    taxableValue,
    gst,
    netTotal,
  } = props;

  console.log(props);

  return (
    <View
      style={{
        width: '100%',
        borderWidth: 1,
        borderRadius: 7,
        marginTop: 10,
        marginBottom: 20,
        borderColor: 'rgba(151, 151, 170, 0.25)',
      }}>
      <View className="flex-row" style={{marginStart: 14, marginTop: 13}}>
        <Text
          style={{
            color: 'black',
            fontSize: 16,
            fontFamily: 'Inter-Bold',
          }}>
          Net Total
        </Text>
        <Text
          style={{
            color: '#9797AA',
            fontSize: 16,
            fontFamily: 'Inter-Regular',
          }}>
          {'  (Taxable)'}
        </Text>
      </View>

      <View
        className="flex-row"
        style={{
          marginHorizontal: 20,
          marginVertical: 10,
          borderRadius: 7,
          overflow: 'hidden',
        }}>
        <GrouppedButton
          labels={credits.map(v => v.days + '')}
          currentedSelected={currentSelected}
          setCurrentSelected={n => {
            setCurrentSelected(n);
          }}
        />
      </View>

      <View style={{marginTop: 10, marginStart: 20}}>
        <Text style={{fontFamily: 'Inter-Medium', color: '#9797AA'}}>
          Select Margin
        </Text>
      </View>

      <View
        className="flex-row justify-between"
        style={{marginTop: 6, marginHorizontal: 20}}>
        <View>
          <Text style={{color: 'black'}}>{startRange}</Text>
        </View>

        <View>
          <Text style={{color: 'black'}}>{endRange}</Text>
        </View>
      </View>

      <View style={{marginTop: -2}}>
        <Slider
          value={currentValue}
          minimumValue={startRange}
          maximumValue={endRange}
          onValueChange={v => {
            setCurrentValue(v);
          }}
          thumbTintColor={'#4B4DED'}
          minimumTrackTintColor={'black'}
          maximumTrackTintColor={'black'}
        />
      </View>

      <View className="flex-row w-full" style={{marginTop: 13, opacity: 1}}>
        <View style={{marginStart: 20, width: '50%'}}>
          <Text style={{color: 'black', fontFamily: 'Inter-Bold'}}>Margin</Text>
        </View>
        <View style={{marginStart: 30, width: '50%'}}>
          <Text style={{color: 'black', fontFamily: 'Inter-Bold'}}>
            {margin}
          </Text>
        </View>
      </View>

      <View className="flex-row w-full" style={{marginTop: 13, opacity: 1}}>
        <View style={{marginStart: 20, width: '50%'}}>
          <Text style={{color: 'black', fontFamily: 'Inter-Bold'}}>
            Taxable Value
          </Text>
        </View>
        <View style={{marginStart: 30, width: '50%'}}>
          <Text style={{color: 'black', fontFamily: 'Inter-Bold'}}>
            {taxableValue}
          </Text>
        </View>
      </View>

      <View className="flex-row w-full" style={{marginTop: 13, opacity: 1}}>
        <View style={{marginStart: 20, width: '50%'}}>
          <Text style={{color: 'black', fontFamily: 'Inter-Bold'}}>GST</Text>
        </View>
        <View style={{marginStart: 30, width: '50%'}}>
          <Text style={{color: 'black', fontFamily: 'Inter-Bold'}}>{gst}</Text>
        </View>
      </View>

      <View
        style={{
          marginVertical: 14,
          width: '100%',
          height: 1,
          backgroundColor: 'rgba(92, 92, 119, 0.22)',
        }}
      />

      <View className="flex-row w-full" style={{marginBottom: 20, opacity: 1}}>
        <View style={{marginStart: 14, width: '50%'}}>
          <Text style={{color: 'black', fontFamily: 'Inter-Bold'}}>
            NET TOTAL
          </Text>
        </View>
        <View style={{marginStart: 30, width: '50%'}}>
          <Text style={{color: 'black', fontFamily: 'Inter-Bold'}}>
            {netTotal}
          </Text>
        </View>
      </View>
    </View>
  );
}
