import React, {useRef} from 'react';
import { DrawerLayoutAndroid, View, Text, StyleSheet} from 'react-native'
import Constants from 'expo-constants'  

import DashBoard from './dashboard'

const Index = () => {
    const drawerRef = useRef(null)

    const navigationView = (
      <View style={style.drawerContainer}>
        <Text style={style.drawerItem}>I'm in the Drawer!</Text>
      </View>
    );
  
    return (
      <DrawerLayoutAndroid
        drawerWidth={200} 
        drawerPosition="left"
        ref={drawerRef}
        renderNavigationView={() => navigationView}
       
      >
        <DashBoard mode="small" context={drawerRef.current}/>
      </DrawerLayoutAndroid>
    );

}

const style = StyleSheet.create({
    drawerContainer: {
        flex:1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor:'#43485C'
    },
    drawerItem:{
        backgroundColor:'red'
    }
});

export default Index;
