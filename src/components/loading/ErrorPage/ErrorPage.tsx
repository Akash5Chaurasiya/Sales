import React from 'react';
import {Text, View} from 'react-native';

export interface RIErrorPage {}

export namespace PIErrorPage {}

export default function ErrorPage(props: RIErrorPage) {
  const {} = props;

  return (
    <View
      style={{width: '100%', height: '100%'}}
      className="items-center justify-center">
      <Text style={{fontSize: 14, color: 'red', fontFamily: 'Inter-SemiBold'}}>
        Oops, Some Error Occured
      </Text>
    </View>
  );
}
