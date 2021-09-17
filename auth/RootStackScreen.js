import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import Register from './Register';


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="Register" component={Register}/>
    </RootStack.Navigator>
);

export default RootStackScreen;