import React, {useState, useEffect, } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, ProgressBarAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import * as Google from "expo-google-app-auth";

import * as Credentials from '../../credentials'
import api from '../../services/api'
import Secure from '../../services/store'

import style from './loginStyle'
import logoImg from '../../../assets/icon.png'


const Login = () => {
    const navigation = useNavigation();    
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);
    
    // buscar dados locais 
    // tentar logar
    // logado

    //não conseguiu logar
    // login com o google
    // salva dados locais
    // tenta logar
    // logado

    async function loginWithAllData(){
        setLoading(true)
        var googleData = await signInWithGoogle()
        if(googleData.cancelled === true){
          return Alert.alert("Falha", 'Não foi possível realizar o login')
        }else{
            Secure('credentials', {
              email: googleData.email,
              token: googleData.token
            })
          await api.post('users', googleData,
          {
            headers:{
              'Authorization': "Bearer "+ googleData.token,
            }
          }
          )
            .then(response => {
                if(response.status == 201){
                  //login sucess
                  //console.log('[loginAllData]-> dados user: ', response.data); 
                  //console.log('[loginAllData]-> 201 success');                  
                  goDashboard(response.data)                                   
                }else {
                  //não falhou mas foi diferente de 200
                  console.log('[loginAllData][>200] a response foi:  ', response.status);    
                }
                
            }).catch(err => {
              //fail
              console.log('Alldata: ', err.response.status)
              
                // login falhou
                setLoading(false)
            
            });
                  
      }
    }

    async function simpleLogin(){
  
      var data = {
        "email": userData.email,
        "token": userData.token
      }
      
      await api.post('login',{ "email": data.email}, {
        headers:{
          'Authorization': "Bearer "+ data.token,
        }
      })
      .then(res => {
        //success
        //console.log('200>>>>', res.data)
        //res.data.push({'token': data.token})
        goDashboard(res.data, data.token)
      })
      .catch(err => {
        //fail
        console.log('Login: ', err.response.status)
        setLoading(false)
      });

    }

    var signInWithGoogle = async () => {
        try {
          const result = await Google.logInAsync({
            androidClientId: Credentials.default.androidId,
            scopes: ["profile", "email"]
          });
          //console.log('-idtoken-->'+ result.idToken);
          //console.log('-refreshToken-->'+ result.refreshToken);
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

    function goDashboard(data, token) {
        var datas = {
          user: data,
          token: token 
        } 
        navigation.navigate('Dashboard', datas);
    }
    
    useEffect(()=>{
      Secure('credentials', null).then(
        json => setUserData(json)
      )
    }, []);
    useEffect(()=>{
      if(userData!=null){
        //console.log('partindo para o login...', userData); 
        simpleLogin()       
      }
    },[userData])


    return(
        <View style={style.container}>
            <Image source={logoImg} style={style.image}/>
            { !loading ? 
              <View style={style.middleBox}>
                
                <Text style={style.text}>Login: </Text>
                <TouchableOpacity onPress={async ()=>{
                      loginWithAllData();
                      //console.log(userData);
                    }}>
                    
                      <View style={style.loginBox}>
                          <Text>Logar com o Google+</Text>
                      </View> 
                </TouchableOpacity>
              </View>
          :
            <ProgressBarAndroid styleAttr="Normal"/>
        }  
        </View>
    );
}


export default Login;