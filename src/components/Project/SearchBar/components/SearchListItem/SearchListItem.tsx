import Clickable from '@src/components/Interaction/Clickable/Clickable';
import React from 'react';
import {Text, View} from 'react-native';

export interface RISearchListItem {
  navigateTo: () => void;
  assistText: string;
}

export namespace PISearchListItem {}

export default function SearchListItem(props: RISearchListItem) {
  const {navigateTo, assistText} = props;

  return (
    <Clickable
      onPress={() => {
        navigateTo();
      }}>
      <View
        style={{
          paddingVertical: 8,
          borderBottomColor: '#F8FAFC',
          borderBottomWidth: 1,
        }}>
        <Text
          style={{
            fontFamily: 'Inter-SemiBold',
            color: 'black',
          }}>
          {assistText}
        </Text>
      </View>
    </Clickable>
  );
}
