import React, {useState} from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'

import style from './dashboardStyle'
import Shimmer from '../../Shimmer'

const DashBoard = () => {
    const [loading, setLoading] = useState(true);
    
    if(loading){
        return(
            <View style={style.container}>
                <View style={style.header}>
                    <TouchableOpacity style={style.hambBox}>
                        <SimpleLineIcons name="menu" size={28} color="white"/>
                    </TouchableOpacity>
                    <View style={[style.titleBox, {marginLeft: -40,}]}>
                       <Shimmer width={130} height={18}/>
                    </View>
                </View>
                <View style={style.body}>
                    <View style={style.item}>
                        <View style={style.shimmer}>
                            <Shimmer width={200} height={20}/>
                        </View>
                        <View style={style.shimmer}>
                            <Shimmer width={200} height={20}/>
                        </View>
                    </View>
                </View>
            </View>
        );
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
                    <View style={style.item}>
                        <View style={style.shimmer}>
                            <Shimmer width={200} height={20}/>
                        </View>
                        <View style={style.shimmer}>
                            <Shimmer width={200} height={20}/>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}


export default DashBoard;