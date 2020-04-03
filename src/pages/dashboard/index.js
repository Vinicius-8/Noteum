import React, {useState} from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';


import DashBoard from './dashboard'

const Index = () => {
    const DrawerNav = createDrawerNavigator();
    return(
        <DrawerNav.Navigator>
            <DrawerNav.Screen name="lista1" component={DashBoard} />
            <DrawerNav.Screen name="lista2" component={DashBoard} />

        </DrawerNav.Navigator>
    );

}


export default Index;
