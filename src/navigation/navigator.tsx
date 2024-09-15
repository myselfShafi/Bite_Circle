import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {Fragment, useState} from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Avatar} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import {dummyImg} from '../components/FoodCard';
import {ChatListData} from '../configs/types';
import {useAppTheme} from '../context/Theme';
import {Conversation, Profile, UpdatePassword, Welcome} from '../screens';
import VerifyEmail from '../screens/(auth)/register/verifyEmail';
import {useStatusBar} from '../utils/hooks';
import {ChatStack, HomeStack, ReelStack, SearchStack} from './stacks';

export type StackParamList = {
  auth: undefined;
  forgotPwd: undefined;
  verifyEmail: undefined;
  app: undefined;
  conversation: {
    data: ChatListData; // temp passing whole static data. Pass user id to fetch chat
  };
  profile: undefined;
};

type RootTabParamList = {
  homeTab: undefined;
  searchTab: undefined;
  reelTab: undefined;
  chatTab: undefined;
  profileTab: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();
const Tab = createMaterialBottomTabNavigator<RootTabParamList>();

const TabNavigator = (): JSX.Element => {
  const {theme} = useAppTheme();
  const [activeTab, setActiveTab] = useState('homeTab');
  useStatusBar(
    theme.colors.background,
    theme.dark ? 'light-content' : 'dark-content',
  );

  const ComponentPlaceholder = () => <View></View>;
  return (
    <Tab.Navigator
      labeled={false}
      keyboardHidesNavigationBar
      initialRouteName="homeTab"
      activeIndicatorStyle={[styles.activeIndicator]}
      barStyle={activeTab === 'reelTab' && styles.barStyle}
      screenListeners={({route}) => ({
        focus: () => setActiveTab(route.name),
      })}>
      <Tab.Screen
        name="homeTab"
        component={HomeStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'home-sharp' : 'home-outline'}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="searchTab"
        component={SearchStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'search' : 'search-outline'}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="reelTab"
        component={ReelStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'film' : 'film-outline'}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="chatTab"
        component={ChatStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon
              name={focused ? 'chatbubbles-sharp' : 'chatbubbles-outline'}
              color={color}
              size={25}
            />
          ),
        }}
      />
      <Tab.Screen
        name="profileTab"
        component={ComponentPlaceholder}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Avatar.Image size={40} source={{uri: dummyImg}} />
          ),
        }}
        listeners={({navigation}) => ({
          tabPress: e => {
            e.preventDefault();
            navigation.getParent()?.navigate('profile');
          },
        })}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = (): JSX.Element => {
  const {theme} = useAppTheme();

  return (
    <Fragment>
      <Stack.Navigator
        initialRouteName={'auth'}
        screenOptions={{
          headerShown: false,
          navigationBarColor: theme.colors.elevation.level2,
        }}>
        <Stack.Screen
          name={'auth'}
          component={Welcome}
          options={{
            navigationBarColor: theme.colors.background,
            animation: 'slide_from_left',
          }}
        />
        <Stack.Screen
          name={'forgotPwd'}
          component={UpdatePassword}
          options={{
            navigationBarColor: theme.colors.background,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen
          name={'verifyEmail'}
          component={VerifyEmail}
          options={{
            navigationBarColor: theme.colors.background,
            animation: 'slide_from_right',
          }}
        />
        <Stack.Screen name={'app'} component={TabNavigator} />
        <Stack.Screen
          name="conversation"
          component={Conversation}
          options={{animation: 'slide_from_right'}}
        />
        <Stack.Screen
          name="profile"
          component={Profile}
          options={{
            animation: 'slide_from_right',
          }}
        />
      </Stack.Navigator>
    </Fragment>
  );
};

export default AppNavigator;

interface Style {
  barStyle: ViewStyle;
  activeIndicator: ViewStyle;
}

const styles: Style = StyleSheet.create<Style>({
  barStyle: {
    backgroundColor: 'transparent',
    position: 'absolute',
  },
  activeIndicator: {
    width: 40,
    height: 40,
  },
});
