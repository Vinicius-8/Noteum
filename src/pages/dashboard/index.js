import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'


import style from './dashboardStyle'
import ItemDash from './ItemDashboard'

const DashBoard = () => {
    const [loading, setLoading] = useState(true);
    const [exibitionMode, setExibitionMode] = useState("large");
    
    if(loading){ // loading screen
        return(
            <View style={style.container}>
                <View style={style.header}>
                    <TouchableOpacity style={style.hambBox}>
                        <SimpleLineIcons name="menu" size={28} color="white"/>
                    </TouchableOpacity>
                    <View style={[style.titleBox, {marginLeft: -40,}]}>
                       
                    </View>
                </View>
                <View style={style.body}>
                    <ItemDash size={exibitionMode}/>
                    <ItemDash size={exibitionMode}/>
                </View>
            </View>
        );
    }else{
        return(
            <View style={style.container}>
                <View style={style.header}>
                    <TouchableOpacity style={style.hambBox}>
                       
                    </TouchableOpacity>
                    <View style={style.titleBox}>
                        <Text style={style.title}>Noticias</Text>
                    </View>
                </View>
                <View style={style.body}>
                    
                </View>
            </View>
        );
    }
}


export default DashBoard;