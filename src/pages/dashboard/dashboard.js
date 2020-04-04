import React, {useState} from 'react';
import { Text, View, TouchableOpacity, FlatList } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';

import style from './dashboardStyle'
import data from '../../dataTests/data'
import ItemDash from './ItemDashboard'

const Dashboard = (props) => {
    const [exibitionMode, setExibitionMode] = useState(props.route.params.mode);    
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
                <View style={style.header}>
                    <TouchableOpacity style={style.hambBox}
                        onPress={()=> props.navigation.openDrawer()}
                    >
                        <SimpleLineIcons name="menu" size={28} color="white"/>
                    </TouchableOpacity>
                    <View style={style.titleBox}>
                        <Text style={style.title}>Noticias</Text>
                    </View>
                </View>
                <View style={style.body}>
                    <FlatList 
                        data={data}                    
                        keyExtractor={data => String(data.id)}
                        renderItem={(
                            ({item}) => 
                            <TouchableOpacity onPress={()=>{
                                touched(item)
                            }}>
                                <ItemDash size={exibitionMode} isLoading={loading} item={item} onPress={touched}/>
                            </TouchableOpacity>
                        )}
                    />
                    
                </View>
            </View>
        );
    }
}


export default Dashboard;