import React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import style from './loginStyle'
import logoImg from '../../../assets/icon.png'

const Login = () => {
    return(
        <View style={style.container}>
            <Image source={logoImg} style={style.image}/>
            <View style={style.middleBox}>
                
                <Text style={style.text}>Login: </Text>
            </View>
        </View>
    );
}


export default Login;