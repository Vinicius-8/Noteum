import React from 'react';
import {FlatList} from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer';

import DashBoard from './dashboard'

const Index = () => {
    const DrawerNav = createDrawerNavigator();
    const data =[
        {name:'lista1', param:'small'},
        {name:'lista2', param:'large'}
    ]
    const arr = ["lista1", "lista2"]

    console.log(arr[0]);
    
    return(
        <DrawerNav.Navigator edgeWidth={300} 
            drawerContentOptions={{
                activeTintColor:'snow',  
                inactiveTintColor:'gray',
                labelStyle: {
                    fontSize: 15
                }
            }}
            drawerStyle={{
                backgroundColor: '#43485C',
            }}
        >
            <DrawerNav.Screen name="lista1" component={DashBoard} 
            initialParams={{mode:"small"}}/>
            <DrawerNav.Screen name="lista2" component={DashBoard} 
            initialParams={{mode:"large"}}/>
        </DrawerNav.Navigator>
    );

}


export default Index;
