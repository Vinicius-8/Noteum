import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'


import style from './dashboardStyle'
import ItemDash from './ItemDashboard'
import data from '../../dataTests/data'

const DashBoard = () => {
    const [loading, setLoading] = useState(false);
    const [exibitionMode, setExibitionMode] = useState("small");
    console.log();
    
        


    if(loading){ // loading screen
        return(//--------
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
        );//--------
    }else{
        return(
            <View style={style.container}>
                <View style={style.header}>
                    <TouchableOpacity style={style.hambBox}>
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
                            ({item}) => <ItemDash size={exibitionMode} isLoading={loading} item={item}/>
                        )}
                    />
                    
                </View>
            </View>
        );
    }
}


export default DashBoard;