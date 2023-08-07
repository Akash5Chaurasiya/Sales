import {useNavigation} from '@react-navigation/native';
import AssetIndex, {ImageIndex} from '@src/assets/AssetIndex';
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import SearchBar from '@src/components/Project/SearchBar/SearchBar';
import AsyncStateFactory from '@src/modules/StateManagement/AsyncState/AsyncStateFactory';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import ItemListingAction from './management/actions/ItemListingAction';
import ScreenLoadingBoundary from '@src/components/loading/ScreenLoadingBoundary/ScreenLoadingBoundary';
import VirtualizedList from '@src/components/List/VirtualizedList/VirtualizedList';
import Navbar from '@src/components/Project/Navbar/Navbar';
import {FlatList} from 'react-native-gesture-handler';
import {getRoundedNumber} from '@src/modules/Utils/getRoundedVal';
import {ScreenIndex} from '@src/globals/screenNames/ScreenName.constant';

export interface RICategoryListing {}

export namespace PICategoryListing {}

export default function ItemListing({route, navigation}: any) {
  const {params} = route;
  console.log(route, params.itemName, params.itemId);

  const intialState: ItemListing.State = {
    itemListing: [],
    loading: {fetchItemListing: AsyncStateFactory()},
  };
  const [state, setState] = React.useState(intialState);

  const itemListingAction = new ItemListingAction(state, setState);

  React.useEffect(() => {
    itemListingAction.fetchItemData(params.itemId);
  }, []);

  return (
    <ScreenLoadingBoundary loadingState={state.loading.fetchItemListing}>
      <VirtualizedList style={styles.container}>
        <View>
          {/* header */}
          <Navbar
            screenName={'Item Product Listing'}
            goBack={function (): void {
              navigation.goBack();
            }}
          />

          {/* body */}
          <View style={styles.body}>
            <View style={{marginBottom: 32, zIndex: 2000}}>
              <SearchBar navigation={navigation} />
            </View>

            <View>
              <View style={styles.cardBody}>
                <View style={styles.cardHeader} className="bg-neutral-100">
                  <Text
                    style={styles.cardHeadingText}
                    className="text-slate-800">
                    {params.itemName}
                  </Text>
                  <Text
                    style={{
                      fontSize: 14,
                      fontFamily: 'Inter-Regular',
                      color: '#5F6D7E',
                    }}>
                    Company Listed
                  </Text>
                </View>

                <ScrollView
                  nestedScrollEnabled
                  style={{overflow: 'scroll'}}
                  horizontal={true}>
                  {/* header */}
                  <View>
                    <View style={styles.tableHeader}>
                      <View style={styles.tableData}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: 'white',
                            fontFamily: 'Inter-Medium',
                          }}>
                          Company
                        </Text>
                      </View>
                      <View style={styles.tableData}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: 'white',
                            fontFamily: 'Inter-Medium',
                          }}>
                          Item Rate
                        </Text>
                      </View>
                      <View style={styles.tableData}>
                        <Text
                          style={{
                            fontSize: 13,
                            color: 'white',
                            fontFamily: 'Inter-Medium',
                          }}>
                          status
                        </Text>
                      </View>
                    </View>

                    {/* body */}
                    <FlatList
                      data={state.itemListing}
                      renderItem={({item: v, index}) => (
                        <Clickable
                          onPress={() => {
                            navigation.navigate(ScreenIndex.PRICE_CALCULATION, {
                              priceId: v.id,
                            });
                          }}>
                          <View className="flex-row items-center" key={index}>
                            <View style={styles.tableData}>
                              <View className="flex flex-row items-center w-full">
                                <Image
                                  style={{
                                    width: 32,
                                    height: 32,
                                    resizeMode: 'cover',
                                    borderRadius: 4,
                                    marginRight: 10,
                                  }}
                                  source={
                                    v.company.imageURL == ''
                                      ? ImageIndex.DefaultCategoryImage
                                      : {uri: v.company.imageURL}
                                  }
                                />
                                <View style={{flexShrink: 1}}>
                                  <Text
                                    style={{
                                      color: 'black',
                                      fontFamily: 'Inter-Medium',
                                      maxWidth: '80%',
                                    }}>
                                    {v.company.companyName}
                                  </Text>
                                </View>
                              </View>
                            </View>
                            <View style={styles.tableData}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontFamily: 'Inter-Medium',
                                }}>
                                {getRoundedNumber(v.rate)}
                              </Text>
                            </View>
                            <View style={styles.tableData}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontFamily: 'Inter-Medium',
                                }}>
                                {v.status == true ? 'active' : 'inactive'}
                              </Text>
                            </View>
                          </View>
                        </Clickable>
                      )}
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
        </View>
      </VirtualizedList>
    </ScreenLoadingBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa',
  },
  navbar: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  image: {
    width: 32,
    height: 32,
    borderRadius: 200,
  },
  body: {
    padding: 20,
  },
  cardBody: {
    borderWidth: 1,
    borderColor: '#D1D9E2',
    borderRadius: 10,
  },
  cardHeader: {
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardHeadingText: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
  },
  tableHeader: {
    backgroundColor: '#2A333E',
    flexDirection: 'row',
  },
  tableData: {
    paddingVertical: 16,
    paddingLeft: 24,
    width: 144,
  },
});
