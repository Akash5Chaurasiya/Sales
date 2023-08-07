import React from 'react';
import {View, Text, Slider} from 'react-native';
import GrouppedButton from '../../components/GrouppedButton';

export interface RIOnline {
  margin: string;
  taxableValue: string;
  gst: string;
  netTotal: string;
}

export namespace PIOnline {}

export default function Online(props: RIOnline) {
  const {margin, taxableValue, gst, netTotal} = props;

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
