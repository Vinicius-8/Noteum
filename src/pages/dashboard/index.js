import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons'

import style from './dashboardStyle'

const DashBoard = () => {
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
        </View>
    );
}


export default DashBoard;