import {useNavigation} from '@react-navigation/native';
import {ImageIndex} from '@src/assets/AssetIndex';
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import {ScreenIndex} from '@src/globals/screenNames/ScreenName.constant';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ScreenContext} from 'react-native-screens';

export interface RIEntityCard {
  name: string;
  textList: string[];
  imageUrl: string;
}

export namespace PIEntityCard {}

export default function EntityCard(props: RIEntityCard) {
  const {name, textList, imageUrl} = props;

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={
          imageUrl == '' ? ImageIndex.DefaultCategoryImage : {uri: imageUrl}
        }
      />
      <View style={{flexShrink: 1}}>
        <Text className="text-black" style={styles.heading}>
          {name}
        </Text>
        {textList.map((v, i) => (
          <Text style={styles.subheading} key={i}>
            {v}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'row',
    columnGap: 16,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  image: {
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 4,
  },
  heading: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    flexGrow: 1,
  },
  subheading: {
    fontSize: 14,
    color: '#5C5C77',
    fontFamily: 'Inter-Regular',
  },
});
