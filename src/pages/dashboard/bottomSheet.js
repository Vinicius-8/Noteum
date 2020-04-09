import React, {useRef} from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import RBSheet from "react-native-raw-bottom-sheet";

import style from './dashboardStyle'

const BottomSheet = (props) => {    
    function ContentBottomSheet(){
        return(
            <View style={style.BSCContainer}>
                <TouchableOpacity style={style.BSCButton} 
                    onPress={ ()=> console.log('movendo: ', props.item.title)}
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
            </View>
        );
    }

    return (
        <RBSheet
          ref={props.refere}
          closeOnDragDown={true}
          closeOnPressMask={true}
          height={130}
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