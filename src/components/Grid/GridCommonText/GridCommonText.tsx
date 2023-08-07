import React from 'react';
import {Text} from 'react-native';

export interface RIGridCommonText {
  children?: string;
  color?: string;
}

export namespace PIGridCommonText {}

export default function GridCommonText(props: RIGridCommonText) {
  const {children, color} = props;

  return (
    <Text
      style={{
        color: props.color ? props.color : '#5F6D7E',
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
      }}>
      {props.children}
    </Text>
  );
}
