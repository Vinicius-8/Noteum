import React, {useState, useRef} from 'react';
import { View, TouchableOpacity, FlatList, Text } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import style from './dashboardStyle'
import data from '../../dataTests/data'
import ItemDash from './ItemDashboard'


const Dashboard = (props) => {  
    const [loading, setLoading] = useState(false);

    

    function touched(item){
        console.log('tocou no item: ', item.title);
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