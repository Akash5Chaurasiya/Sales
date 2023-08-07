import React from 'react';
import {ActivityIndicator, Text, View} from 'react-native';

export interface RILoadingBoundary {
  loadingState?: AsyncState;
  children: React.ReactNode;
}

export namespace PILoadingBoundary {}

export default function LoadingBoundary(props: RILoadingBoundary) {
  const {loadingState, children} = props;

  if (loadingState === undefined) return <>{children}</>;

  if (loadingState.status === 'initialized') {
    return (
      <View style={{width: '100%'}} className="items-center">
        <ActivityIndicator />
      </View>
    );
  } else if (loadingState.status === 'failed') {
    return (
      <View style={{width: '100%'}} className="items-center">
        <Text
          style={{
            color: 'red',
            fontSize: 14,
            fontFamily: 'Inter-Medium',
          }}>
          {loadingState.message}
        </Text>
      </View>
    );
  } else {
    return <>{children}</>;
  }
  return <>{children}</>;
}
