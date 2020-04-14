import React, {useState} from 'react';
import { Text, View, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import * as Google from "expo-google-app-auth";

import * as Credentials from '../../credentials'
import api from '../../services/api'


import style from './loginStyle'
import logoImg from '../../../assets/icon.png'


const Login = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    
    async function loginWithGoogle(){
        var googleData = await signInWithGoogle()
        if(googleData.cancelled === true){
          return Alert.alert("Falha", 'Não foi possível realizar o login')
        }else{
          await api.post('login', googleData)
            .then(response => {
                console.log(response.data);
            })
        
            /*
          await api.get('/')
          .then(response => {
              console.log(response.data);
          })*/
      }
    }

    signInWithGoogle = async () => {
        try {
          const result = await Google.logInAsync({
            androidClientId: Credentials.default.androidId,
            scopes: ["profile", "email"]
          });

          if (result.type === "success") {                                                      
              var response = {
                email: result.user.email,
                id: result.user.id,
                name: result.user.name,
                photo_url: result.user.photoUrl,
                token: result.idToken            
              }
              return response;
          } else {
              return { cancelled: true };
          }
        } catch (e) {
          console.log('LoginScreen.js 60 | Error with login', e);
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
                        //signInWithGoogle()
                        loginWithGoogle()
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