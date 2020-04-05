import React, {useRef} from 'react';
import { 
  DrawerLayoutAndroid,
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  FlatList
} from 'react-native'
import Constants from 'expo-constants'  

import DashBoard from './dashboard'

const Index = () => {
    const drawerRef = useRef(null);
    
    const data = [ // dados do menu drawer
      {id:1,name:'Noticias'},
      {id:2,name:'Pornozaum'},
      {id:3,name:'Memes'},
    ];

    function onItem({item}){
      console.log('tocou', item.name);
      drawerRef.current.closeDrawer();
    }

    const navigationView = ( // gera os itens no menu drawer
      <View style={style.drawerContainer}>
        
        <FlatList
          data={data}
          keyExtractor={data => String(data.id)}
          renderItem={(
            ({item}) => 
              <TouchableOpacity style={style.drawerItem} onPress={
                ()=> onItem({item})
              }>
                <Text style={style.drawerItemText}>{item.name}</Text>
              </TouchableOpacity>
            )
          }
        />
      </View>
    );
  
    return (
      <DrawerLayoutAndroid
        drawerWidth={270} //deve ficar primeiro se não não acontece a ref
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
        height:50,
        borderBottomWidth: .2,
        borderBottomColor:'#262C38',
        alignItems:'flex-start',
        justifyContent:'center',
        paddingLeft: 20
    },
    drawerItemText:{
      color:'snow',
      fontSize: 17,
      textShadowColor: '#262C38',
      textShadowRadius: 20,
    }
});

export default Index;
