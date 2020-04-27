import React, {useState} from 'react';
import { View, TouchableOpacity, Text, FlatList } from 'react-native';
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
          setTimeout(()=>{
            navigation.navigate('Dashboard', {list_id:list.id});  
          }, 300);         
          }
        )
        .catch(err => console.log(err.response.status))
      }
    }

    const ListToSaveMenu =()=> (<View style={style.MNIBox} >
      <Text style={[style.BSCTitle, {backgroundColor:'#596180'}]}>Mover para: </Text>
      <FlatList
        data={props.userData.user.lists}
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
                <TouchableOpacity style={style.BSCButton} 
                    onPress={ ()=> {                      
                      setShowLists(true)
                      }                    
                    }
                >
                    <MaterialCommunityIcons name="file-move" style={style.BSCIcon} />
                    <Text style={style.BSCText}>Mover</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={style.BSCButton}
                    onPress={ ()=> console.log('Apagando: ', props.item.title)}
                >
                    <MaterialCommunityIcons name="trash-can-outline" style={style.BSCIcon} />
                    <Text style={style.BSCText}>Apagar</Text>
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