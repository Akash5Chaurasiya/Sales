import {ImageIndex} from '@src/assets/AssetIndex';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export interface RIStreakChip {
  name: string;
  count?: number;
}

export namespace PIStreakChip {}

export default function StreakChip(props: RIStreakChip) {
  const {name, count} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <View style={styles.chipContainer}>
        <Text style={styles.chipText}>{count ? count : 0}</Text>
        <Image source={ImageIndex.Flame} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
    paddingLeft: 8,
    borderRadius: 200,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#9797AA',
  },
  chipContainer: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    backgroundColor: '#4B4DED',
    flexDirection: 'row',
    display: 'flex',
    gap: 4,
    alignItems: 'center',
    borderRadius: 200,
  },
  chipText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: 'white',
  },
});
