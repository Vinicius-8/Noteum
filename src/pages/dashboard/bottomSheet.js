import React, {useState} from 'react';
import { View, TouchableOpacity, Text, FlatList, ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import api from '../../services/api'
import RBSheet from "react-native-raw-bottom-sheet";

import style from './dashboardStyle'
import { useNavigation } from '@react-navigation/native';

const BottomSheet = (props) => { 
    const ITEM = props.item
    const [showLists, setShowLists] = useState(false)
    const navigation = useNavigation()
    //console.log('[BottomSheet]-> ', navigation);
    const changetList = props.userData.user.lists.slice(1)         
    
    
    function detailItem(){
      navigation.navigate('Detail', {item: ITEM}); 
      props.refere.current.close();
    }

    function moveItem(list){
      if(ITEM !== null){
        api.put('items', {}, // esse corpo é fundamental para o backend
        {
          headers:{
           "Owner-id": props.userData.user.id,
            "Item-id": ITEM.id,
            "List-id":  list.id,
            "Authorization": "Bearer "+ props.userData.token
          }
        })
        .then(resp => {
          console.log(resp.status) 
          ToastAndroid.show('Item moved', ToastAndroid.SHORT) 
          setTimeout(()=>{
            navigation.navigate('Dashboard', {list_id:list.id});  
          }, 300);         
          }
        )
        .catch(err => {
          console.log(err.response.status)
          if(err.response.status == 401){
            navigation.navigate('Login', {tokenExpired:true})
          }
        })
      }
    }

    function deleteItem(){
      if(ITEM !== null){
        api.delete('items', // a falta desse corpo é fundamental para o backend
        {
          headers:{
           "Owner-id": props.userData.user.id,
            "Item-id": ITEM.id,
            "Authorization": "Bearer "+ props.userData.token
          }
        })
        .then(resp => {
          //console.log('[deleteItem]->', resp)
          setTimeout(()=>{
            navigation.navigate('Dashboard', {list_id:resp.data.list_id});  
          }, 200);         
          }
        )
        .catch(err => {
          console.log(err.response.status)
          if(err.response.status == 401){
            navigation.navigate('Login', {tokenExpired:true})
          }
        })
      }
    }

    const ListToSaveMenu =()=> (<View style={style.MNIBox} >
      <Text style={[style.BSCTitle, {backgroundColor:'#596180'}]}>Move to: </Text>
      <FlatList
        data={changetList}
        showsVerticalScrollIndicator={false}
        keyExtractor={data => String(data.id)}
        
        renderItem={(
          ({item}) =>
                       
            <TouchableOpacity style={style.BSCListContainer} onPress={
               ()=> {
                moveItem(item);
                props.refere.current.close();                                        
               }                   
            }>
              <Text numberOfLines={2}  style={style.BSCListText}>{item.title}</Text>
            </TouchableOpacity>
          )
        }
      />
    </View>)

    function ContentBottomSheet(){
        return(
          
            <View style={style.BSCContainer}>
              {!showLists ? <View>
                <TouchableOpacity style={style.BSCButton}  // info
                    onPress={ ()=> {                      
                        detailItem()
                      }                    
                    }
                >
                    <MaterialCommunityIcons name="information" style={style.BSCIcon} />
                    <Text style={style.BSCText}>Detail</Text>
                </TouchableOpacity>

                {props.listTitle != "All" ? <TouchableOpacity style={style.BSCButton}  // move
                    onPress={ ()=> {                      
                      setShowLists(true)
                      }                    
                    }
                >
                    <MaterialCommunityIcons name="file-move" style={style.BSCIcon} />
                    <Text style={style.BSCText}>Move</Text>
                </TouchableOpacity> : <View/>}
                
                <TouchableOpacity style={style.BSCButton}    // delete
                    onPress={ ()=> {          
                      deleteItem()                      
                      props.refere.current.close();                        
                    }}
                >
                    <MaterialCommunityIcons name="trash-can-outline" style={style.BSCIcon} />
                    <Text style={style.BSCText}>Delete</Text>
                </TouchableOpacity>
              </View> : <ListToSaveMenu />}
            </View>
          
        );
    }

    return (
        <RBSheet
          ref={props.refere}
          closeOnDragDown={true}
          closeOnPressMask={true}
          onClose={()=> setShowLists(false)}
          //height={!showLists ? 130: 300}        
          closeOnPressBack={true}
          duration={380}
          customStyles={{
            wrapper: {
              //backgroundColor: "transparent"
            },
            draggableIcon: {
              backgroundColor: "rgba(0,0,0,.4)"
            },
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              backgroundColor:'#6A7291'
            }
          }}
        >
          <ContentBottomSheet />
        </RBSheet>
    );
}

export default BottomSheet;