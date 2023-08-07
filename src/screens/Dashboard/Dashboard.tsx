import Clickable from '@src/components/Interaction/Clickable/Clickable';
import SearchBar from '@src/components/Project/SearchBar/SearchBar';
import React, {useEffect} from 'react';
import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
import StreakChip from './components/StreakChip/StreakChip';
import EntityCard from './components/EntityCard/EntityCard';
import AsyncStateFactory from '@src/modules/StateManagement/AsyncState/AsyncStateFactory';
import DashboardCategoriesAction from './management/DashBoardCategoriesAction';
import LoadingBoundary from '@src/components/loading/LoadingBoundary/LoadingBoundary';
import {useAuthContext} from '@src/auth/AuthGuard';
import Navbar from '@src/components/Project/Navbar/Navbar';

export interface RIDashboard {}

export namespace PIDashboard {}

const VirtualizedList = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style: object;
}) => {
  return (
    <FlatList
      data={[]}
      style={style}
      keyExtractor={() => 'key'}
      renderItem={null}
      ListHeaderComponent={<>{children}</>}
    />
  );
};

export default function Dashboard({navigation}: any) {
  const [state, setState] = React.useState<Dashboard.State>({
    categoryList: [],
    companyList: [],
    loading: {
      fetchCatData: AsyncStateFactory(),
      fetchPopular: AsyncStateFactory(),
      fetchCompany: AsyncStateFactory(),
    },
    popularListData: [],
    selectedEntity: 'category',
  });

  const DashBoardCategoriesAction = new DashboardCategoriesAction(
    state,
    setState,
  );

  const auth = useAuthContext();

  useEffect(() => {
    DashBoardCategoriesAction.fetchPopular(auth.authData.loginData.userId);
  }, []);

  useEffect(() => {
    if (state.categoryList.length === 0) {
      DashBoardCategoriesAction.fetchAllCategories();
    }
    if (state.companyList.length === 0) {
      DashBoardCategoriesAction.fetchAllCompany();
    }
  }, [state.selectedEntity]);

  return (
    <>
      {/* header */}
      <View style={{zIndex: 2000000}}>
        <Navbar
          screenName={'Dashboard'}
          goBack={function (): void {
            navigation.goBack();
          }}
        />
      </View>
      <VirtualizedList style={styles.container}>
        {/* body */}
        <View style={styles.body}>
          <View style={{marginBottom: 20}}>
            <Text
              className="text-xl text-slate-700 "
              style={{fontFamily: 'Inter-Medium'}}>
              Welcome Back!
            </Text>
            <Text
              className="text-xs"
              style={{fontFamily: 'Inter-Regular', color: '#969393'}}>
              Hello {auth.authData.loginData.name}
            </Text>
          </View>

          <View style={{marginBottom: 32, zIndex: 2000}}>
            <SearchBar navigation={navigation} />
          </View>

          {/* popular card */}
          <View style={styles.popularSearchCard} className="bg-slate-800">
            <Text
              className="text-base text-white mb-5"
              style={{fontFamily: 'Inter-Bold'}}>
              Popular Searches
            </Text>
            <ScrollView style={{maxHeight: 200}} nestedScrollEnabled={true}>
              <LoadingBoundary loadingState={state.loading.fetchPopular}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                  {state.popularListData.map((v, i) => (
                    <Clickable
                      onPress={() => {
                        navigation.navigate('categoryListing', {
                          itemname: v.name,
                          CategoryId: v.id,
                        });
                      }}
                      key={i}>
                      <View
                        className="flex-row flex flex-wrap"
                        style={{margin: 4}}>
                        <StreakChip name={v.name} count={v.views} />
                      </View>
                    </Clickable>
                  ))}
                </View>
              </LoadingBoundary>
            </ScrollView>
          </View>

          {/* categories */}
          <View className="flex-row" style={{marginBottom: 10}}>
            <View className="p-2">
              <Clickable
                onPress={() => {
                  DashBoardCategoriesAction.setSelectedEntity('category');
                }}>
                <Text
                  className={`rounded-md text-base ${
                    state.selectedEntity === 'category'
                      ? 'text-white bg-slate-800'
                      : 'text-slate-600 bg-transparent'
                  } p-3 `}
                  style={{fontFamily: 'Inter-Bold'}}>
                  Categories
                </Text>
              </Clickable>
            </View>
            <View className="p-2">
              <Clickable
                onPress={() => {
                  DashBoardCategoriesAction.setSelectedEntity('company');
                }}>
                <Text
                  className={`rounded-md text-base ${
                    !(state.selectedEntity === 'category')
                      ? 'text-white bg-slate-800'
                      : 'text-slate-600 bg-transparent'
                  } p-3 `}
                  style={{fontFamily: 'Inter-Bold'}}>
                  Companies
                </Text>
              </Clickable>
            </View>
          </View>
          {state.selectedEntity === 'category' ? (
            <LoadingBoundary loadingState={state.loading.fetchCatData}>
              <FlatList
                data={state.categoryList}
                renderItem={p => {
                  const v = p.item;
                  return (
                    <Clickable
                      key={p.index}
                      onPress={() => {
                        navigation.navigate('categoryListing', {
                          itemname: v.name,
                          CategoryId: v.id,
                        });
                      }}>
                      <EntityCard
                        name={v.name}
                        textList={[
                          `${v.itemCount} items`,
                          `${v.companyCount} company products`,
                        ]}
                        imageUrl={v.image}
                      />
                    </Clickable>
                  );
                }}
              />
            </LoadingBoundary>
          ) : (
            <LoadingBoundary loadingState={state.loading.fetchCompany}>
              <View>
                <FlatList
                  data={state.companyList}
                  renderItem={p => {
                    const v = p.item;

                    return (
                      <Clickable key={p.index}>
                        <EntityCard
                          name={v.name}
                          textList={[
                            `${
                              v.basicRate ? v.basicRate + '(₹)' : '-'
                            } basic rate`,
                            `${v.productCount} products`,
                          ]}
                          imageUrl={v.image}
                        />
                      </Clickable>
                    );
                  }}
                />
              </View>
            </LoadingBoundary>
          )}
        </View>
      </VirtualizedList>
    </>
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
    objectFit: 'cover',
  },
  body: {
    padding: 20,
  },
  popularSearchCard: {
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
});
