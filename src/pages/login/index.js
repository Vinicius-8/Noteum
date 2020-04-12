import React,{ useEffect } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import * as Google from "expo-google-app-auth";

import * as Credentials from '../../credentials'
import api from '../../services/api'


import style from './loginStyle'
import logoImg from '../../../assets/icon.png'


const Login = () => {
    const navigation = useNavigation();

    async function loginWithGoogle(){
        /*await api.post('register', {email:'vini@fkic.com', password:'222'})
        .then(response => {
            console.log(response.data);
        })
        await api.get('/')
        .then(response => {
            console.log(response.data);
        })*/
    }

    signInWithGoogle = async () => {
        try {
          const result = await Google.logInAsync({
            androidClientId: Credentials.default.androidId,
            scopes: ["profile", "email"]
          });
    
          if (result.type === "success") {
           
            console.log('------------------------------------');
            
            console.log('dados do user: ', result.user);
            console.log('token: ', result.accessToken);
            
            return result.accessToken;
          } else {
            return { cancelled: true };
          }
        } catch (e) {
          console.log('LoginScreen.js.js 50 | Error with login', e);
          return { error: true };
        }
      };

    
    
    
    
    
    
    function goDashboard() {
        navigation.navigate('Dashboard');
    }    

    return(
        <View style={style.container}>
            <Image source={logoImg} style={style.image}/>
            <View style={style.middleBox}>
                
                <Text style={style.text}>Login: </Text>
                <TouchableOpacity onPress={()=>{
                        signInWithGoogle()
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