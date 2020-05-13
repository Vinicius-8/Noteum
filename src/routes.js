import React from 'react';

import { NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

const AppStack = createStackNavigator();

import Login from './pages/login'
import Dashboard from './pages/dashboard'
import Detail from './pages/detail'

const Routes = () => {
    return(        
        <NavigationContainer >
            <AppStack.Navigator 
                initialRouteName="Login"
                screenOptions={{ gestureEnabled: false }}>
                <AppStack.Screen name="Login" component={Login}  options={{ headerShown: false }}/>
                <AppStack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />
                <AppStack.Screen name="Detail" component={Detail} options={{ headerShown: false,
                headerStyle: {backgroundColor: '#262C38',}, title: false, headerTintColor: 'snow' }} />
                
            </AppStack.Navigator>
        
        </NavigationContainer>
    );
}

export default Routes;