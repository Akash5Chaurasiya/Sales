import Clickable from '@src/components/Interaction/Clickable/Clickable';
import React from 'react';
import {Text, View} from 'react-native';

export interface RIMarginComponent {
  type: string;
  value: string;
  ind: number;
}

export namespace PIMarginComponent {}

export default function MarginComponent(props: RIMarginComponent) {
  const {type, value, ind} = props;

  return (
    <>
      <View
        className="items-center"
        style={{width: '100%', backgroundColor: '#4B4DED'}}>
        <Text
          style={{
            color: 'white',
            marginVertical: 9,
            fontFamily: 'Inter-Medium',
          }}>
          {type}
        </Text>
      </View>
      <View
        className="items-center"
        style={{
          borderBottomEndRadius: 8,
          borderBottomStartRadius: 8,
          borderBottomWidth: 1,
          borderRightWidth: 1,
          borderLeftWidth: 1,
          borderColor: '#9797AA',
          width: '100%',
          backgroundColor: '#EDEEF1',
        }}>
        <Text
          style={{
            color: 'black',
            marginVertical: 9,
            fontFamily: 'Inter-Medium',
          }}>
          {value}
        </Text>
      </View>
    </>
  );
}
