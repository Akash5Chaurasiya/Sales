import Clickable from '@src/components/Interaction/Clickable/Clickable';
import VirtualizedList from '@src/components/List/VirtualizedList/VirtualizedList';
import React from 'react';
import {View} from 'react-native';
import {Text} from 'react-native';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

export interface RIGrouppedButton {
  labels: string[];
  currentedSelected: number;
  setCurrentSelected: (index: number) => void;
}

export namespace PIGrouppedButton {}

export default function GrouppedButton(props: RIGrouppedButton) {
  const {labels, currentedSelected, setCurrentSelected} = props;

  return (
    <ScrollView horizontal>
      {labels.map((val, index) => {
        if (index == currentedSelected) {
          return (
            <View style={{flexGrow: 1}} key={index}>
              <Clickable key={index} onPress={() => setCurrentSelected(index)}>
                <View
                  className="items-center"
                  style={{
                    backgroundColor: '#4B4DED',
                    paddingVertical: 12,
                    paddingHorizontal: 22,
                    borderColor: '#4B4DED',
                    borderWidth: 1,
                  }}>
                  <Text style={{color: 'white', fontFamily: 'Inter-Regular'}}>
                    {val + ' days'}
                  </Text>
                </View>
              </Clickable>
            </View>
          );
        } else {
          return (
            <View style={{flexGrow: 1}} key={index}>
              <Clickable key={index} onPress={() => setCurrentSelected(index)}>
                <View
                  className="items-center"
                  style={{
                    paddingVertical: 12,
                    borderColor: '#D4D4D4',
                    borderWidth: 1,
                    paddingHorizontal: 22,
                  }}>
                  <Text style={{color: '#0E0E2C', fontFamily: 'Inter-Regular'}}>
                    {val + ' days'}
                  </Text>
                </View>
              </Clickable>
            </View>
          );
        }
      })}
    </ScrollView>
  );
}
