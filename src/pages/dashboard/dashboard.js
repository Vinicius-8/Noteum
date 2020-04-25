import React, {useState, useRef} from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import style from './dashboardStyle'
import data from '../../dataTests/data'
import ItemDash from './ItemDashboard'


const Dashboard = (props) => {  
    console.log('[dashboard]-> ', props.loading);
    const data = props.data.items
    const exibitionMode = props.mode

    function touched(item){
        console.log('tocou no item: ', item.title);
    }        

    if(props.loading){ // loading screen
        return(//-------- loading
            <View style={style.container}>        
                <View style={style.body}>
                    <ItemDash size={exibitionMode} isLoading={props.loading}/>
                    <ItemDash size={exibitionMode} isLoading={props.loading}/>
                    <ItemDash size={exibitionMode} isLoading={props.loading}/>
                    <ItemDash size={exibitionMode} isLoading={props.loading}/>
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
                                    isLoading={props.loading} 
                                    item={item} 
                                    onPress={touched} 
                                    //bottomSheet={bottomSheetRef}
                                    />
                            </TouchableOpacity>
                        )}
                     />
                     
                </View>
            </View>
        );
    }
}



export default Dashboard;