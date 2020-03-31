import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator();

import Login from './pages/login'

const Routes = () => {
    return(
        <NavigationContainer >
            <AppStack.Navigator 
                initialRouteName="Login"
                screenOptions={{ gestureEnabled: false }}>
                <AppStack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>

        
            </AppStack.Navigator>
        
        </NavigationContainer>
    );
}

export default Routes;