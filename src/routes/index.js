import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Splash,
  Home,
  Login,
  Register,
  Account,
  AccountEdit,
  GetStarted,
  BrandDetail,
  Perhitungan,
  Hasil



} from '../pages';
import { colors } from '../utils';
import { Icon } from 'react-native-elements'

const Stack = createStackNavigator();

export default function Router() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="GetStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />






      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
          // headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />




      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: false,
          headerTitle: 'Daftar Pengguna',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#fff',
        }}
      />





      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: true,
          headerTitle: 'Akun',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#FFF',


        }}
      />
      <Stack.Screen
        name="AccountEdit"
        component={AccountEdit}
        options={{
          headerShown: true,
          headerTitle: 'Edit Profile',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#FFF',
        }}
      />


      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="BrandDetail"
        component={BrandDetail}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Perhitungan"
        component={Perhitungan}
        options={{
          headerShown: true,
          headerTitle: 'Perhitungan Metode SAW',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#FFF',
        }}
      />

      <Stack.Screen
        name="Hasil"
        component={Hasil}
        options={{
          headerShown: true,
          headerTitle: 'Hasil Penilaian',
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: '#FFF',
        }}
      />






    </Stack.Navigator>
  );
}
