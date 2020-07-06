import React from 'react';
import Screen from './Screen'
import Home from './home'


export const ProfileScreen = ({navigation}) => <Screen navigation={navigation} name="Profile" />
export const HomeScreen = ({navigation}) => <Home navigation={navigation} component={Home} />

export const MessageScreen = ({navigation}) => <Screen navigation={navigation} name="Message" />
export const ActivityScreen = ({navigation}) => <Screen navigation={navigation} name="Activity" />
export const ListScreen = ({navigation}) => <Screen navigation={navigation} name="List" />
export const ReportScreen = ({navigation}) => <Screen navigation={navigation} name="Report" />
export const StatisticScreen = ({navigation}) => <Screen navigation={navigation} name="Statistic" />
export const SignOutScreen = ({navigation}) => <Screen navigation={navigation} name="SignOut" />