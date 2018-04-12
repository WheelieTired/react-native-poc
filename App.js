import React, {Component} from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';
import { Stack, Scene, Tabs, Router, Actions, Drawer} from 'react-native-router-flux';


import Login from './app/components/login';
import Registration from './app/components/registration';
import TabView from './app/components/TabView';
import TabIcon from './app/components/TabIcon';
import DrawerContent from './app/components/drawer/DrawerContent';
import Map from './app/components/map';
import ChangePassword from './app/components/changePassword'
import MenuIcon from './app/images/menu_burger.png';
import Point from './app/components/point';

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'transparent', justifyContent: 'center',
    alignItems: 'center',
  },
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd',
  },
});

const RouterComponent = () => {

  return (
    <Router>
      <Stack key="root">

          <Drawer
            hideNavBar
            key="drawer"
            contentComponent={DrawerContent}
            drawerImage={MenuIcon}
            drawerWidth={300}
          >
          <Scene hideNavBar panHandlers={null}>

            <Stack
               key="tab_1"
               initial
               title="Tab #1"
               tabBarLabel="TAB #1"
               inactiveBackgroundColor="#FFF"
               activeBackgroundColor="#DDD"
               icon={TabIcon}
               navigationBarStyle={{ backgroundColor: 'green' }}
               titleStyle={{ color: 'white', alignSelf: 'center' }}
            >
            <Scene
               key="tab_1_1"
               component={Map}
               title="Home"
            />



            </Stack>

            <Stack
              key="tab_2"
              title="Tab #2"
              icon={TabIcon}
            >
            <Scene
              key="tab_2_1"
              component={Registration}
              title="Registration"
            />

            </Stack>

            <Stack
              key="tab_3"
              title="Tab #3"
              icon={TabIcon}
            >
            <Scene
              key="tab_3_1"
              component={ChangePassword}
              title="Change Password"
            />
            </Stack>

            <Stack
              key="tab_4"
              title="Tab #4"
              icon={TabIcon}
            >
            <Scene
              key="tab_4_1"
              component={Login}
              title="Login"

            />
            </Stack>
          </Scene>
        </Drawer>
      </Stack>
    </Router>
  );
};

export default RouterComponent
