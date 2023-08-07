import {useNavigation} from '@react-navigation/native';
import AssetIndex, {ImageIndex} from '@src/assets/AssetIndex';
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import SearchBar from '@src/components/Project/SearchBar/SearchBar';
import AsyncStateFactory from '@src/modules/StateManagement/AsyncState/AsyncStateFactory';
import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import CategoryListingAction from './management/actions/CategoryListingAction';
import {ScreenIndex} from '@src/globals/screenNames/ScreenName.constant';
import ScreenLoadingBoundary from '@src/components/loading/ScreenLoadingBoundary/ScreenLoadingBoundary';
import VirtualizedList from '@src/components/List/VirtualizedList/VirtualizedList';
import {FlatList} from 'react-native-gesture-handler';
import Navbar from '@src/components/Project/Navbar/Navbar';

export interface RICategoryListing {}

export namespace PICategoryListing {}

export default function CategoryListing({route, navigation}: any) {
  const {params} = route;
  console.log(route, params.itemname, params.CategoryId);

  const [state, setState] = React.useState<CategoryListing.State>({
    categoryList: [],
    loading: {fetchCategoryListing: AsyncStateFactory()},
  });

  const categoryListingAction = new CategoryListingAction(state, setState);

  React.useEffect(() => {
    categoryListingAction.fetchCategoryListing(params.CategoryId);
  }, []);

  return (
    <ScreenLoadingBoundary loadingState={state.loading.fetchCategoryListing}>
      <VirtualizedList style={styles.container}>
        {/* header */}
        <View style={{zIndex: 300000}}>
          <Navbar
            screenName={'Category'}
            goBack={function (): void {
              navigation.goBack();
            }}
          />
        </View>

        {/* body */}
        <View style={styles.body}>
          <View style={{marginBottom: 32, zIndex: 5000}}>
            <SearchBar navigation={navigation} />
          </View>

          <View>
            <View style={styles.cardBody}>
              <View style={styles.cardHeader} className="bg-neutral-100">
                <Text style={styles.cardHeadingText} className="text-slate-800">
                  {params.itemname}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: 'Inter-Regular',
                    color: '#5F6D7E',
                  }}>
                  Category Items Listed
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
                        Category
                      </Text>
                    </View>
                    <View style={styles.tableData}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'white',
                          fontFamily: 'Inter-Medium',
                        }}>
                        Item Name
                      </Text>
                    </View>
                    <View style={styles.tableData}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'white',
                          fontFamily: 'Inter-Medium',
                        }}>
                        Active Company
                      </Text>
                    </View>
                    <View style={styles.tableData}>
                      <Text
                        style={{
                          fontSize: 13,
                          color: 'white',
                          fontFamily: 'Inter-Medium',
                        }}>
                        Cash Net Price
                      </Text>
                    </View>
                  </View>

                  {/* body */}

                  <FlatList
                    data={state.categoryList}
                    renderItem={({item: v, index}) => (
                      <Clickable
                        key={index}
                        onPress={() => {
                          navigation.navigate(ScreenIndex.ITEM_LISTING, {
                            itemId: v.id,
                            itemCode: v.itemCode,
                            itemName: v.itemName,
                          });
                        }}>
                        <View className="flex-row items-center">
                          <View style={styles.tableData}>
                            <View className="flex flex-row items-center">
                              <Image
                                style={{
                                  width: 32,
                                  height: 32,
                                  resizeMode: 'cover',
                                  borderRadius: 4,
                                  marginRight: 10,
                                }}
                                source={
                                  v.categoryName.imageUrl == ''
                                    ? ImageIndex.DefaultCategoryImage
                                    : {uri: v.categoryName.imageUrl}
                                }
                              />
                              <View style={{flexShrink: 1, flexBasis: '100%'}}>
                                <Text
                                  style={{
                                    color: 'black',
                                    fontFamily: 'Inter-Medium',
                                  }}>
                                  {v.categoryName.name}
                                </Text>
                              </View>
                            </View>
                          </View>
                          <View style={styles.tableData}>
                            <View style={{flexShrink: 1}}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontFamily: 'Inter-Medium',
                                }}>
                                {v.itemName}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.tableData}>
                            <View style={{flexShrink: 1}}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontFamily: 'Inter-Medium',
                                }}>
                                {v.activeCompany}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.tableData}>
                            <View style={{flexShrink: 1, flexBasis: '100%'}}>
                              <Text
                                style={{
                                  color: 'black',
                                  fontFamily: 'Inter-Medium',
                                }}>
                                {v.cashNetPrice}
                              </Text>
                            </View>
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
      </VirtualizedList>
    </ScreenLoadingBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: '100%',
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
    width: 160,
  },
});
