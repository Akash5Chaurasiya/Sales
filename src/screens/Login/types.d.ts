namespace Login {
  type Tabs = 'login' | 'signup';

  interface State {
    selectedTab: Tabs;
    email: FieldDataClass;
    password: FieldDataClass;
    showPassword: boolean;
    loading: Record<string, AsyncState>
  }
}
