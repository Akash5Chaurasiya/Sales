import AssetIndex from '@src/assets/AssetIndex';
import Input from '@src/components/UserInput/Input/Input';
import AsyncStateFactory from '@src/modules/StateManagement/AsyncState/AsyncStateFactory';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  ScrollViewComponent,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import FetchSearchBarAction from './management/actions/FetchSearchBarAction';
import {Text} from 'react-native';
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import {ScreenIndex} from '@src/globals/screenNames/ScreenName.constant';
import Tab from './components/Tab/Tab';
import SearchListItem from './components/SearchListItem/SearchListItem';

export interface RISearchBar {
  navigator: any;
}

export namespace PISearchBar {}

export default function SearchBar({navigation}: any) {
  const intialState: SearchBar.State = {
    searchedData: {
      category: [],
      item: [],
      product: [],
    },
    loading: {fetchSearchData: AsyncStateFactory()},
  };

  const [state, setState] = React.useState(intialState);
  const [text, setText] = React.useState('');
  const [selected, setSelected] = React.useState(false);
  const [type, setType] = React.useState<'item' | 'category' | 'product'>(
    'item',
  );
  const fetchSearchDataAction = new FetchSearchBarAction(state, setState);
  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: selected ? '#fff' : '',
            elevation: selected ? 1 : 0,
          },
        ]}>
        <AssetIndex.SearchMagnifier />
        <TextInput
          onFocus={() => {
            setSelected(true);
          }}
          onBlur={() => setSelected(false)}
          onChangeText={text => {
            setText(text);
            fetchSearchDataAction.fetchSearchData(text);
          }}
          className="text-base text-slate-700"
          placeholder="Search"
          placeholderTextColor={'#64748B'}
          style={styles.input}
        />
        {text && (
          <Clickable
            style={{paddingHorizontal: 8}}
            onPress={() => {
              setText('');
            }}>
            <AssetIndex.SearchBarCrossIcon />
          </Clickable>
        )}
        {text && (
          <View style={styles.searchAssistContainer}>
            <View
              className="flex flex-row bg-slate-50"
              style={{borderRadius: 8}}>
              <Tab
                isActive={type === 'item'}
                text="item"
                onPress={() => {
                  setType('item');
                }}
                tabItemCounts={state.searchedData.item.length}
              />
              <Tab
                isActive={type === 'category'}
                text="category"
                onPress={() => {
                  setType('category');
                }}
                tabItemCounts={state.searchedData.category.length}
              />
              <Tab
                isActive={type === 'product'}
                text="product"
                onPress={() => {
                  setType('product');
                }}
                tabItemCounts={state.searchedData.product.length}
              />
            </View>
            <SafeAreaView style={{flex: 1}}>
              {type === 'item' && (
                <FlatList
                  nestedScrollEnabled={true}
                  style={{maxHeight: 300}}
                  renderItem={v => (
                    <SearchListItem
                      navigateTo={function () {
                        navigation.navigate(ScreenIndex.ITEM_LISTING, {
                          itemId: v.item._id + '',
                          itemcode: 516,
                          itemName: v.item.name,
                        });
                      }}
                      assistText={v.item.name}
                    />
                  )}
                  data={state.searchedData.item}
                />
              )}
            </SafeAreaView>
            <SafeAreaView style={{flex: 1}}>
              {type === 'category' && (
                <FlatList
                  style={{maxHeight: 350}}
                  renderItem={v => (
                    <SearchListItem
                      navigateTo={function () {
                        navigation.navigate(ScreenIndex.CATEGORY_LISTING, {
                          CategoryId:v.item._id,
                          itemname:v.item.name
                        });
                      }}
                      assistText={v.item.name}
                    />
                  )}
                  data={state.searchedData.category}
                />
              )}
            </SafeAreaView>

            <SafeAreaView style={{flex: 1}}>
              {type === 'product' && (
                <FlatList
                  style={{maxHeight: 350}}
                  renderItem={v => (
                    <SearchListItem
                      navigateTo={function () {
                        navigation.navigate(ScreenIndex.PRICE_CALCULATION, {
                          priceId:v.item._id
                        });
                      }}
                      assistText={v.item.name}
                    />
                  )}
                  data={state.searchedData.product}
                />
              )}
            </SafeAreaView>
          </View>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    borderWidth: 1,
    borderColor: '#CFD3D4',
    borderRadius: 4,
    gap: 10,
    padding: 8,
    alignItems: 'center',
    position: 'relative',
    zIndex: 9999,
  },
  input: {
    flexGrow: 1,
    flexShrink: 1,
    fontFamily: 'Inter-Regular',
    padding: 0,
  },
  searchAssistContainer: {
    backgroundColor: 'white',
    zIndex: 999,
    position: 'absolute',
    top: '180%',
    left: 0,
    right: 0,
    padding: 8,
    borderRadius: 4,
    elevation: 3,
  },
});
