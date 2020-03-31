import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'


import style from './loginStyle'
import logoImg from '../../../assets/icon.png'

const Login = () => {
    const navigation = useNavigation();

    function goDashboard() {
        navigation.navigate('Dashboard');
    }    

    return(
        <View style={style.container}>
            <Image source={logoImg} style={style.image}/>
            <View style={style.middleBox}>
                
                <Text style={style.text}>Login: </Text>
                <TouchableOpacity onPress={()=>{
                        goDashboard()
                    }}>
                    <View style={style.loginBox}>
                        <Text>Logar com o Google+</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}


export default Login;