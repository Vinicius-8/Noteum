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
  TextInput,
} from 'react-native'

import api from '../../services/api'

import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import DashBoard from './dashboard'
import style from './indexStyle'


const Index = (props) => {
    const drawerRef = useRef();
    const [currentList, setCurrentList] = useState({id:0, name:'Todos'});
    const [isModalVisible, setIsModalVisible] = useState(false);
    //console.log('-[dashboard]-> datauser: ',props.route.params);
    /*
    var data = [ // dados do menu drawer
      {id:0,name:'Todos'},
      {id:1,name:'Noticias'},
      {id:2,name:'Eventos'},
      {id:3,name:'Memes'},
      {id:4,name:'Receitas'},
    ];*/

    const [drawerLists, setDrawerLists] = useState(props.route.params.lists)

    useEffect(() => { // leave the app
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



    function selectDrawerItem({item}){
      setCurrentList(item)
      drawerRef.current.closeDrawer();
    }

    function createNewDrawerList(){
      drawerRef.current.closeDrawer();
      setIsModalVisible(true)
    }

    const ModalScreen = () =>{
      const [newDrawerListText, setNewDrawerListText] = useState('');

      function saveNewList(){
        if(!newDrawerListText)
          return
        try {
          // criar nova lista
          api.post('lists', {
            title: newDrawerListText,       
          },{
          headers:{
            'User-id': props.route.params.id,
          }}
            )
            .then(response => {//console.log(response);
          });
        } catch (error) {
          
        }
        setIsModalVisible(false);
        drawerLists.push({id:drawerLists.length, title: newDrawerListText});
        setDrawerLists(drawerLists);
        drawerRef.current.openDrawer();
      }

      return(
        <Modal animationType='fade' transparent={true} visible={isModalVisible}>
          <TouchableWithoutFeedback
            onPress={ ()=>{ setIsModalVisible(false) } }
          >
          
            <View style={style.modalContainer} >
              <TouchableWithoutFeedback>
                  <View style={style.modalBox} >
                    <Text style={ style.modalTitle } >Nova lista:</Text>
                    
                    <TextInput numberOfLines={2} maxLength={50} multiline={true}
                      placeholder="Nome da lista" selectionColor={'snow'}
                      style={style.inputModal}
                      onChangeText={
                        text => setNewDrawerListText(text)
                      }
                      autoFocus={true}                  
                      />
                    
                    <View style={style.buttonsBar}>
                      <TouchableOpacity onPress={ ()=> setIsModalVisible(false) }
                        style={style.barButton}>

                        <Text style={style.barButtonText}>Cancelar</Text>
                      </TouchableOpacity>
          
                      <TouchableOpacity style={style.barButton} onPress={saveNewList} >
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
          data={drawerLists}
          showsVerticalScrollIndicator={false}
          keyExtractor={data => String(data.id)}
          
          renderItem={(
            ({item}) => 
              <TouchableOpacity style={currentList === item ? style.drawerItemSelected :style.drawerItem } onPress={
                ()=> selectDrawerItem({item})            
                
              }>
                <Text numberOfLines={2}  style={style.drawerItemText}>{item.title}</Text>
              </TouchableOpacity>
            )
          }
        />
        <TouchableOpacity style={[style.drawerItem, {backgroundColor:'#262C38'}]} 
        onPress={
          createNewDrawerList
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
        <View style={style.headerContainer}>
          <View style={style.header}>
              <TouchableOpacity style={style.hambBox}
                  onPress={()=> drawerRef.current.openDrawer()}
              >
                  <SimpleLineIcons name="menu" size={28} color="white"/>
              </TouchableOpacity>
              <View style={style.titleBox}>
                  <Text style={style.title}>{currentList.title}</Text>
              </View>
              <TouchableOpacity style={style.plusBox}
                  
              >
                  <AntDesign name="plus" size={28} color="white"/>
              </TouchableOpacity>

          </View>
        </View>
        <DashBoard mode="large" data={currentList}/>
       </DrawerLayoutAndroid>
    );

}

export default Index;
