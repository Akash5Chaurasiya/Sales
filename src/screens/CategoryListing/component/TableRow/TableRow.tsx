import {ImageIndex} from '@src/assets/AssetIndex';
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

export interface RITableRow {}

export namespace PITableRow {}

const CommonText = (props: {children?: string; color?: string}) => (
  <Text
    style={{
      color: props.color ? props.color : '#5F6D7E',
      fontFamily: 'Inter-SemiBold',
      fontSize: 14,
    }}>
    {props.children}
  </Text>
);

export default function TableRow(props: RITableRow) {
  const {} = props;

  return (
    <Clickable compressAmount={0.995}>
      <View className="flex-row">
        <View style={styles.tableData} className="flex-row items-center">
          <View style={{marginRight: 12}}>
            <Image
              source={ImageIndex.DefaultCategoryImage}
              style={styles.image}
            />
          </View>
          <View>
            <CommonText color="#2E3646">TMT Bar</CommonText>
          </View>
        </View>
        <View style={styles.tableData}>
          <CommonText>8mm tmt</CommonText>
          <CommonText color="#3B82F6">654162</CommonText>
        </View>
        <View style={styles.tableData}>
          <CommonText>JSW Ltd.</CommonText>
        </View>
        <View style={styles.tableData}>
          <CommonText>Rs 866.0815</CommonText>
        </View>
      </View>
    </Clickable>
  );
}

const styles = StyleSheet.create({
  tableData: {
    paddingVertical: 16,
    paddingLeft: 24,
    width: 144,
  },
  image: {
    height: 32,
    width: 32,
    borderRadius: 32,
    resizeMode: 'cover',
  },
});
