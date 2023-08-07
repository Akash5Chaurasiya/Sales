import React from 'react';
import {View} from 'react-native';

export interface RIGridTableCell {
  children: React.ReactNode;
}

export namespace PIGridTableCell {}

export default function GridTableCell(props: RIGridTableCell) {
  const {children} = props;

  return (
    <View
      style={{
        paddingVertical: 16,
        paddingLeft: 24,
        width: 144,
      }}>
      {children}
    </View>
  );
}
