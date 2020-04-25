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
  Clipboard,
  ProgressBarAndroid,
  Image,
} from 'react-native'

import api from '../../services/api'
import Secure from '../../services/store'

import { SimpleLineIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import DashBoard from './dashboard'
import style from './indexStyle'


const Index = (props) => {
    const drawerRef = useRef();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalNewItemVisible, setIsModalNewItemVisible] = useState(false);
    const [drawerLists, setDrawerLists] = useState(props.route.params.user.lists)
    const [currentList, setCurrentList] = useState(drawerLists[0]);
    const [isLoadingItem, setIsLoadingItem] = useState(true)
    const USER = props.route.params.user
    const TOKEN = props.route.params.token
    //console.log('t: ', TOKEN);
    
    //console.log('-[dashboard]-> datauser: ',props.route.params);
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

    function loadItemData(id_list){
      api.get('items',           
      {
        headers:{
          "Owner-id": USER.id,
          "Owner-list-id":  id_list,
          "Authorization": "Bearer "+ TOKEN
        }
      })
      .then(res=> {
        //console.log('[loaditemdata]>>resp: ',res.data)
        setCurrentList(res.data)
        
      })
      .catch(err => console.log('erro: ', err))
      
    }
    
    useEffect(
      () =>{        
        loadItemData(1)
      }
      ,[]);

    
    function selectDrawerItem({item}){      
      loadItemData(item.id)
      setCurrentList(item)
      drawerRef.current.closeDrawer();
    }

    function createNewDrawerList(){
      drawerRef.current.closeDrawer();
      setIsModalVisible(true)
    }

    const ModalNewListScreen = () =>{
      const [newDrawerListText, setNewDrawerListText] = useState('');

      function saveNewList(){
        if(!newDrawerListText)
          return
        try {
          // criar nova lista
          //console.log('[saveNewList]-> ', props.route.params);
          
          api.post('lists', {
            title: newDrawerListText,       
          },{
          headers:{
            'User-id': USER.id,
            'Authorization': "Bearer "+ TOKEN
          }}
            )
            .then(response => {//console.log(response);
          });
        } catch (error) {
            console.log('-[saveNewList]-> ', error);
            
        }
        setIsModalVisible(false);
        drawerLists.push({id:drawerLists.length+1, title: newDrawerListText});
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
                    <Text style={ style.modalTitle }>Nova lista:</Text>
                    
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

    const ModalNewItem = () => {
      const [newUrl, setNewUrl] = useState('');
      const [loading, setLoading] = useState(isModalNewItemVisible)
      const [isLoaded, setIsLoaded] = useState(true)
      const [openGraphData, setOpenGraphData] = useState({})
     
      function validURL(str) {
        var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
          '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
          '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
          '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
          '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
          '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
        return !!pattern.test(str);
      }

      async function readFromClipboard(){
        const clipboardContent = await Clipboard.getString();
        
        var lastlink = await Secure('lastLink')  
        if (lastlink !== clipboardContent){            
          setNewUrl(clipboardContent)        
        }                
        return clipboardContent.toString()
      }
      async function loadData (){   
        var clipboardContent = await readFromClipboard()        
        setLoading(true)
        if(validURL(clipboardContent) && loading){
          //console.log('validou como url');
          
          api.get('/api?url='+clipboardContent,
          {
            headers:{
              "Authorization": "Bearer "+ TOKEN
            }
          })
          .then(response=> {
            //console.log(response.data); 
            d = response.data
            d.s = 'Salvar'
            d.c = 'Cancelar'

            //setOpenGraphData(response.data)                        
            setOpenGraphData(d)
            //console.log('ogdata: ',d); 
            setIsLoaded(true)  
            setLoading(false)       
          })
          .catch(err=>{
            console.log(err.response.status);
            setIsLoaded(false)
          })
        }else{
          setLoading(false)
          setIsLoaded(false)
        }
      };
    
      function saveLinkLocally(){
        Secure('lastLink', newUrl)
      }
    
      const InputContainer = () =>{
        return(
          <TouchableWithoutFeedback
            onPress={()=> setIsModalNewItemVisible(false)}
          >
           <View style={style.modalContainer} >
             
            <TouchableWithoutFeedback>
                <View style={style.modalBox} >
                {!loading ?   
                <View>
                    <Text style={ style.modalTitle }>Link:</Text>
                            
                    <TextInput maxLength={50}  multiline={false}
                      //selection={{start: 0, end: 0}}
                      
                      placeholder="link copiado" selectionColor={'snow'}
                      style={style.inputModal}
                      onChangeText={
                        text => setNewUrl(text)
                      }
                      defaultValue={ newUrl }
                      autoFocus={true}                  
                      />
                    
                    <View style={style.buttonsBar}>
                      <TouchableOpacity onPress={ ()=> {setIsModalNewItemVisible(false);setLoading(false)} }
                        style={style.barButton}>
    
                        <Text style={style.barButtonText}>Cancelar</Text>
                      </TouchableOpacity>
          
                      <TouchableOpacity style={style.barButton}
                        onPress={()=> {
                          saveLinkLocally()
                          setIsModalNewItemVisible(false)
                          setLoading(false)
                          }
                        }
                      >
                        <Text style={style.barButtonText}>Salvar</Text>
                      </TouchableOpacity>
                    </View>     
                  </View>
                : <ProgressBarAndroid styleAttr="Normal" color={'#fff'}/>} 
                </View>
              </TouchableWithoutFeedback>
              
          </View>
          </TouchableWithoutFeedback>
        );
      }

      
    
      const ItemContainer = () =>{
        const [isListVisible, setIsListVisible] = useState(false);

        async function createItem(lista){        
          if(lista != null && openGraphData!=null){
            api.post('items', {
              title: openGraphData.title,
              description: openGraphData.description,
              img_url: openGraphData.image,
              url: openGraphData.url
            },
            
            {
              headers:{
                "Owner-id": USER.id,
                "Owner-list-id": lista.id,
                "Authorization": "Bearer "+TOKEN
              }
            })
            .then(response =>  {
              //console.log('[createItem] response: ', response)
              Alert.alert("Salvo", "Seu item foi salvo na lista ", lista.title)            
            })
            .catch(err => console.log('[createItem] error : ',err))
          }else{
            Alert.alert("Erro", "O item não pode ser criado")            
          }                  
          setIsModalNewItemVisible(false)
          
        }


        const ListToSaveMenu =()=> (<View style={style.MNIBox} >
          <Text style={[style.MNITitle, {backgroundColor:'#596180'}]}>Salvar em: </Text>
          <FlatList
            data={drawerLists}
            showsVerticalScrollIndicator={false}
            keyExtractor={data => String(data.id)}
            
            renderItem={(
              ({item}) => 
                <TouchableOpacity style={style.MNIListContainer} onPress={
                  ()=> {
                    createItem(item); 
                    setCurrentList(item);  
                    loadItemData(item.id);                
                   }                   
                }>
                  <Text numberOfLines={2}  style={style.MNIListText}>{item.title}</Text>
                </TouchableOpacity>
              )
            }
          />
        </View>)
        
        return(
          <TouchableWithoutFeedback
            onPress={()=> setIsModalNewItemVisible(false)}
          >
          <View style={style.modalContainer}>
            <TouchableWithoutFeedback>
                {!isListVisible ?
                <View style={style.MNIBox} >
                  {!loading ?
                    <Image  style={style.MNIImage} 
                    source={{uri: openGraphData.image}}                                                           
                    />
                    : <View style={{paddingTop: 100}}>
                        <ProgressBarAndroid
                        styleAttr="Normal" color={'#fff'}/> 
                      </View>}
                    <View style={style.MNITextBox}>
                      <Text style={style.MNITitle} numberOfLines={2}>
                        {openGraphData.title}
                      </Text> 
                      <Text style={style.MNIDescription} numberOfLines={3}>
                        {openGraphData.description}
                      </Text> 
                    </View>
                    
                    <View style={style.MNIButtonsBar}>                      
                      <TouchableOpacity onPress={ ()=> setIsModalNewItemVisible(false) }
                        style={style.barButton}>
      
                        <Text style={style.barButtonText}>{openGraphData.c}</Text>
                      </TouchableOpacity>
          
                      <TouchableOpacity style={style.barButton} 
                        onPress={
                          ()=>{
                            saveLinkLocally()
                            //setIsModalNewItemVisible(false)
                            setIsListVisible(true)
                          }
                        }
                      >
                        <Text style={style.barButtonText}>{openGraphData.s}</Text>
                      </TouchableOpacity>
                    </View>
                </View> : <ListToSaveMenu/>}
              </TouchableWithoutFeedback>
          </View>
          </TouchableWithoutFeedback>
        );
      }
    
      useEffect(()=>{
        loadData()
        setLoading(false)
      },[]);
    
      return(

        
          <Modal animationType='fade' transparent={true} visible={isModalNewItemVisible}>
            
              {!isLoaded ? <InputContainer/> : <ItemContainer/>}
          </Modal>
        );
    }

    const navigationView = ( // gera os itens no menu drawer
      <View style={style.drawerContainer}>
        <ModalNewListScreen />
        <ModalNewItem/>

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
        onPress={ createNewDrawerList }>
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
                  onPress={()=> setIsModalNewItemVisible(true)
                  } // code for new item
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
