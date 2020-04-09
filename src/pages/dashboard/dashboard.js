import React, {useState, useRef} from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import RBSheet from "react-native-raw-bottom-sheet";

import style from './dashboardStyle'
import data from '../../dataTests/data'
import ItemDash from './ItemDashboard'


const Dashboard = (props) => {  
    const [loading, setLoading] = useState(false);
    const bottomSheetRef = useRef();
    

    function touched(item){
        console.log('tocou no item: ', item.title);
    }
    
    const ContentBottomSheet = () =>{
        return(
            <View style={style.BSCContainer}>
                <TouchableOpacity style={style.BSCButton}>
                    <MaterialCommunityIcons name="file-move" style={style.BSCIcon} />
                    <Text style={style.BSCText}>Mover</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={style.BSCButton}>
                    <MaterialCommunityIcons name="trash-can-outline" style={style.BSCIcon} />
                    <Text style={style.BSCText}>Apagar</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
    const BottomSheet = () => {
        return (
            <RBSheet
              ref={bottomSheetRef}
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

    if(loading){ // loading screen
        return(//-------- loading
            <View style={style.container}>
                <View style={style.header}>
                    <TouchableOpacity style={style.hambBox}>
                        <SimpleLineIcons name="menu" size={28} color="white"/>
                    </TouchableOpacity>
                    <View style={[style.titleBox, {marginLeft: -40,}]}>
                      
                    </View>
                </View>
                <View style={style.body}>
                    <ItemDash size={exibitionMode} isLoading={loading}/>
                    <ItemDash size={exibitionMode} isLoading={loading}/>
                </View>
            </View>
        );//-------- loading
    }else{        
        return(
            <View style={style.container}>
        
                <View style={style.body}>
                    <FlatList 
                        data={data}                    
                        keyExtractor={data => String(data.id)}
                        style={{ paddingTop: 5}}
                        renderItem={(
                            ({item}) => 
                            <TouchableOpacity onPress={()=>{
                                touched(item)
                            }}>
                                <ItemDash 
                                    size={props.mode} 
                                    isLoading={loading} 
                                    item={item} 
                                    onPress={touched} 
                                    bottomSheet={bottomSheetRef}/>
                            </TouchableOpacity>
                        )}
                     />
                     
                </View>
                <BottomSheet/>
            </View>
        );
    }
}



export default Dashboard;