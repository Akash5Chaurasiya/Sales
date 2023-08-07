import React from 'react';
import MarginComponent from './MarginComponent';
import {Text, View} from 'react-native';
import Clickable from '@src/components/Interaction/Clickable/Clickable';

export interface RIDisplayFlop {
  labels: {type: string; value: string}[];
  currentSelected: number;
  setCurrentSelected: (index: number) => void;
}

export namespace PIDisplayFlop {}

export default function DisplayFlop(props: RIDisplayFlop) {
  const {labels, currentSelected, setCurrentSelected} = props;

  return (
    <>
      {labels.map((val, index) => {
        if (index == currentSelected) {
          return (
            <View
              className="items-center"
              style={{width: '33.33%'}}
              key={index}>
              <Clickable onPress={() => setCurrentSelected(index)} width={'100%'}>
                <MarginComponent
                  type={val.type}
                  value={val.value}
                  ind={index}
                />
              </Clickable>
            </View>
          );
        } else {
          return (
            <View className="items-center" style={{width: '33.33%'}} key={index}>
              <Clickable onPress={() => setCurrentSelected(index)}>
                <View className="items-center" style={{width: '100%'}}>
                  <Text
                    style={{
                      color: '#9797AA',
                      marginVertical: 9,
                      fontFamily: 'Inter-Medium',
                    }}>
                    {val.type}
                  </Text>
                </View>
                {/* <View style={{flexGrow:1}}/> */}
              </Clickable>
            </View>
          );
        }
      })}
    </>
  );
}
