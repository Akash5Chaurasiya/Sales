import React from 'react';
import LoadingScreen from '../LoadingScreen/LoadingScreen';
import ErrorPage from '../ErrorPage/ErrorPage';

export interface RIScreenLoadingBoundary {
  loadingState?: AsyncState;
  children: React.ReactNode;
}

export namespace PIScreenLoadingBoundary {}

export default function ScreenLoadingBoundary(props: RIScreenLoadingBoundary) {
  const {loadingState, children} = props;

  if (loadingState === undefined) return <>{children}</>;

  if (loadingState.status === 'initialized') return <LoadingScreen />;
  else if (loadingState.status === 'failed') return <ErrorPage />;
  else return <>{children}</>;

  return <>{children}</>;
}
