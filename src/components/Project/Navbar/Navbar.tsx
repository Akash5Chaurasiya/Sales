import AssetIndex, {ImageIndex} from '@src/assets/AssetIndex';
import {useAuthContext} from '@src/auth/AuthGuard';
import Clickable from '@src/components/Interaction/Clickable/Clickable';
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import {Dimensions} from 'react-native';

export interface RINavbar {
  goBack: () => void;
  screenName: string;
}

export namespace PINavbar {}

export default function Navbar({goBack, ...props}: RINavbar) {
  const {screenName} = props;
  const auth = useAuthContext();

  const [height, setHeight] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);
  const [viewableHeight, setViewableHeight] = useState<number>(
    Dimensions.get('window').height,
  );

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({window}) => {
      setViewableHeight(window.height);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View
      onLayout={e => {
        setHeight(e.nativeEvent.layout.height);
      }}
      className="flex flex-row justify-between items-center relative z-50"
      style={styles.navbar}>
      <Clickable
        onPress={() => {
          goBack();
        }}>
        <View>
          <AssetIndex.ArrowLeft />
        </View>
      </Clickable>
      <View>
        <Text
          className="text-lg text-slate-600"
          style={{fontFamily: 'Inter-Bold'}}>
          {screenName}
        </Text>
      </View>
      <View>
        <Clickable
          compressAmount={0.9}
          onPress={() => {
            setShowSidebar(p => !p);
          }}>
          <AssetIndex.MenuBar />
        </Clickable>
      </View>
      {showSidebar && (
        <View
          className="absolute border-slate-200 border"
          style={{
            top: height + 2,
            right: 0,
            height: viewableHeight - height - 2,
            width: '90%',
            backgroundColor: 'white',
            borderTopLeftRadius: 3,
            borderBottomLeftRadius: 3,
            zIndex: 30000000,
          }}>
          <View
            style={{padding: 24}}
            className=" border-b border-b-slate-300 bg-slate-50 flex-row justify-between">
            <Text
              className="text-slate-800"
              style={{
                fontSize: 18,
                fontFamily: 'Inter-SemiBold',
              }}>
              Lohawalla
            </Text>
            <Clickable
              onPress={() => {
                setShowSidebar(false);
              }}>
              <View style={{transform: [{rotate: '180deg'}]}}>
                <AssetIndex.ArrowLeft />
              </View>
            </Clickable>
          </View>
          <View style={{padding: 24}}>
            <View
              style={{marginBottom: 24, borderRadius: 4}}
              className=" flex-row items-center">
              <View className="mr-2">
                <Image
                  source={
                    auth.authData.loginData.image.trim().length
                      ? {uri: auth.authData.loginData.image}
                      : ImageIndex.DefaultUser
                  }
                  style={styles.image}
                />
              </View>
              <View>
                <Text
                  className="text-black"
                  style={{
                    fontFamily: 'Inter-SemiBold',
                    fontSize: 16,
                    marginBottom: -2,
                  }}>
                  {auth.authData.loginData.name}
                </Text>
                <Text
                  className="text-slate-500"
                  style={{
                    fontFamily: 'Inter-Regular',
                    fontSize: 14,
                    textTransform: 'lowercase',
                  }}>
                  {auth.authData.loginData.role}
                </Text>
              </View>
            </View>
            <View
              style={{marginBottom: 15}}
              className="border-b border-b-slate-100 pb-3">
              <View className="flex-start flex-row mb-1">
                <Text
                  style={{fontFamily: 'Inter-Medium', fontSize: 14}}
                  className="text-indigo-500 py-1">
                  Email
                </Text>
              </View>
              <Text
                className="text-black"
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 16,
                  marginBottom: -2,
                }}>
                {auth.authData.loginData.email}
              </Text>
            </View>
            <View
              style={{marginBottom: 15}}
              className="border-b border-b-slate-100 pb-3">
              <View className="flex-start flex-row mb-1">
                <Text
                  style={{fontFamily: 'Inter-Medium', fontSize: 14}}
                  className="text-indigo-500 py-1">
                  Phone Number
                </Text>
              </View>
              <Text
                className="text-black"
                style={{
                  fontFamily: 'Inter-Regular',
                  fontSize: 16,
                  marginBottom: -2,
                }}>
                {auth.authData.loginData.phoneNumber}
              </Text>
            </View>
            <View style={{height: 63}} />
            <Clickable
              onPress={() => {
                auth.actions.logout();
              }}>
              <View
                style={{
                  width: '100%',
                  paddingVertical: 16,
                  alignItems: 'center',
                  borderRadius: 8,
                }}
                className="bg-indigo-500">
                <Text
                  className="text-md text-white"
                  style={{fontFamily: 'Inter-SemiBold'}}>
                  Log Out
                </Text>
              </View>
            </Clickable>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 40,
    height: 40,
    borderRadius: 200,
    objectFit: 'cover',
  },
  navbar: {
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    zIndex: 100000,
  },
});

interface DimensionsMetrics {
  window: {
    height: number;
    width: number;
    scale: number;
    fontScale: number;
  };
  screen: {
    height: number;
    width: number;
    scale: number;
    fontScale: number;
  };
}
