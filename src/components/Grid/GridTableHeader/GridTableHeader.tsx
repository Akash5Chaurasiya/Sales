import React from 'react';
import {Text, View} from 'react-native';

export interface RIGridTableHeader {
  children?: React.ReactNode;
}

export namespace PIGridTableHeader {}

export default function GridTableHeader(props: RIGridTableHeader) {
  const {children} = props;

  return (
    <View
      style={{
        backgroundColor: '#2A333E',
        flexDirection: 'row',
      }}>
      {children}
    </View>
  );
}

export function GridTableHeaderText(props: {children?: string}) {
  return (
    <Text
      style={{
        fontSize: 13,
        color: 'white',
        fontFamily: 'Inter-Medium',
      }}>
      {props.children}
    </Text>
  );
}
