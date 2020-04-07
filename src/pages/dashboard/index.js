import React, {useRef, useState, useEffect} from 'react';
import { 
  DrawerLayoutAndroid,
  View, 
  Text, 
  TouchableOpacity,
  FlatList,
  Modal,
  BackHandler,
  Alert,
  TouchableWithoutFeedback,
  Button
} from 'react-native'
import { SimpleLineIcons } from '@expo/vector-icons';
import Constants from 'expo-constants'

import DashBoard from './dashboard'
import style from './indexStyle'
import styleDash from './dashboardStyle'


const Index = () => {
    const drawerRef = useRef();
    const [currentList, setCurrentList] = useState({id:0, name:'Todos'});
    const [isVisible, setIsVisible] = useState(false);
    
    const data = [ // dados do menu drawer
      {id:0,name:'Todos'},
      {id:1,name:'Noticias'},
      {id:2,name:'Pornozaum'},
      {id:3,name:'Memes'},
      {id:4,name:'Todos'},
      {id:5,name:'Noticias'},
      {id:6,name:'Pornozaum'},
      {id:7,name:'Memes'},
      {id:8,name:'Todos'},
      {id:9,name:'Noticias'},
      {id:10,name:'Pornozaum'},
      {id:12,name:'Memes'},
    ];

    useEffect(() => { // leave the app
      console.log('-ref-> ', drawerRef);
      
      const backAction = () => {
        Alert.alert("Atenção!", "Tem certeza que quer sair?", [
          {
            text: "Cancelar",
            onPress: () => null,
            style: "cancel"
          },
          { text: "Sim", onPress: () => BackHandler.exitApp() }
        ]);
        return true;
      };
  
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
            backAction
        
      );
      return () => backHandler.remove();
    }, []);



    function selectItem({item}){
      setCurrentList(item)
      drawerRef.current.closeDrawer();
    }

    function createNewList(){
      drawerRef.current.closeDrawer();
      setIsVisible(true)
    }

    const ModalScreen = () =>{
      return(
        <Modal
          animationType='fade'
          transparent={true}
          visible={isVisible}>
          <TouchableWithoutFeedback
            onPress={
              ()=>{
                setIsVisible(false)
              }
            }
          >
          <View style={style.modalContainer} >
          <TouchableWithoutFeedback>
            <View style={style.modalBox} >
              
                <View style={style.buttonsBar}>
                  <TouchableOpacity 
                    onPress={
                      ()=> setIsVisible(false)
                    }
                    style={style.barButton}>
                    <Text style={style.barButtonText}>Cancelar</Text>
                  
                  </TouchableOpacity>
                  
                  <TouchableOpacity style={style.barButton}>
                    <Text style={style.barButtonText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              
            </View>
            </TouchableWithoutFeedback>
          </View>
          </TouchableWithoutFeedback>
        </Modal>
      );
    } 


    const navigationView = ( // gera os itens no menu drawer
      <View style={style.drawerContainer}>
        <ModalScreen />
        
        <FlatList
          data={data}
          showsVerticalScrollIndicator={false}
          keyExtractor={data => String(data.id)}
          renderItem={(
            ({item}) => 
              <TouchableOpacity style={style.drawerItem} onPress={
                ()=> selectItem({item})
              }>
                <Text style={style.drawerItemText}>{item.name}</Text>
              </TouchableOpacity>
            )
          }
        />
        <TouchableOpacity style={[style.drawerItem, {backgroundColor:'#262C38'}]} 
        onPress={
          createNewList
        }>
            <Text style={style.drawerItemText}>+ Nova lista</Text>
        </TouchableOpacity>
      </View>
    );
  
    return (
      <DrawerLayoutAndroid
        drawerWidth={270} 
        drawerPosition="left"
        ref={drawerRef}
        renderNavigationView={() => navigationView}
      >
        <View style={{
          paddingTop: Constants.statusBarHeight, 
          backgroundColor: '#262C38',
        }}>
          <View style={styleDash.header}>
              <TouchableOpacity style={styleDash.hambBox}
                  onPress={()=> drawerRef.current.openDrawer()}
              >
                  <SimpleLineIcons name="menu" size={28} color="white"/>
              </TouchableOpacity>
              <View style={styleDash.titleBox}>
                  <Text style={styleDash.title}>{currentList.name}</Text>
              </View>
          </View>
          </View>
        <DashBoard mode="large" context={drawerRef.current} data={currentList}/>
      </DrawerLayoutAndroid>
    );

}


export default Index;
