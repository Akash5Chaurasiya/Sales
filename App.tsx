import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthGuard from '@src/auth/AuthGuard';
import SearchBar from '@src/components/Project/SearchBar/SearchBar';
import CategoryListing from '@src/screens/CategoryListing/CategoryListing';
import Dashboard from '@src/screens/Dashboard/Dashboard';
import ItemListing from '@src/screens/ItemListing/ItemListing';
import Login from '@src/screens/Login/Login';
import PriceCalculation from '@src/screens/PriceCalculation/PriceCalculation';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const Stack = createNativeStackNavigator();
function Root() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SearchBar" component={SearchBar} />
    </Stack.Navigator>
  );
}
function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <AuthGuard>
          <Stack.Navigator initialRouteName="dashboard">
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="priceCalculation"
              component={PriceCalculation}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="login"
              component={CategoryListing}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="dashboard"
              component={Dashboard}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="categoryListing"
              component={CategoryListing}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="itemListing"
              component={ItemListing}
            />

            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="searchBar"
              component={SearchBar}
            />
          </Stack.Navigator>
        </AuthGuard>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}

export default App;
