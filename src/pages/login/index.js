import React, {useState, useEffect, } from 'react';
import { Text, View, Image, TouchableOpacity, Alert, ProgressBarAndroid } from 'react-native';
import { useNavigation } from '@react-navigation/native'

import * as Google from "expo-google-app-auth";
import * as GoogleSignIn from 'expo-google-sign-in';

import * as Credentials from '../../credentials'
import api from '../../services/api'
import Secure from '../../services/store'

import style from './loginStyle'
import logoImg from '../../../assets/icon.png'
import { AntDesign } from '@expo/vector-icons';

const Login = (props) => {
  
    const navigation = useNavigation();    
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState(null);    

    if (props.route.params != undefined){
      if(props.route.params.tokenExpired){
        try {
          logoutUser()
          setLoading(false)
        } catch ({ message }) {
          console.log('logout: ' + message);
        }
        
      }
    }
    
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
        //var googleData = await signInWithGoogle() //dev
        var googleData = await googleSignIn()   //web      
        console.log('[loginWithAllData, googleData] ->', googleData.token);
        console.log('\n');
        
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
                  goDashboard(response.data, googleData.token) //acredito que o token nao esta indo junto 
                }else {
                  //não falhou mas foi diferente de 200
                  console.log('[loginAllData][>200] a response foi:  ', response.status);    
                }
                
            }).catch(err => {
              //fail
              
              if(err){
                console.log('[loginWithAllData, error]: ', err.response.status)
              }else{
                console.log('[loginWithAllData, error]: ', err)
              }              
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
      
      console.log('[simpleLogin, data] ->', userData.token);
      console.log('\n');
      
      await api.post('login',{ "email": data.email}, {
        headers:{
          'Authorization': "Bearer "+ data.token,
        }
      })
      .then(res => {
        //success
        //console.log('[simpleLogin]200>>>>', res.data)        
        
        //res.data.push({'token': data.token})
        //res.data.token = data.token
        goDashboard(res.data, data.token)
      })
      .catch(err => {        
        console.log('errrrrrrr> ', err);
        
        if(err){
            try{
            
              if(err.response){
                console.log('[simpleLogin, error]: ', err.response)
              }else if(err.response.status){
                console.log('[simpleLogin, error]: ', err.response.status)
              }              
              console.log('[simpleLogin, error]: ', err)
            }catch(e){
              console.log('[simpleLogin, error]', e);
              
            }
        }      
        setLoading(false)
      });

    }

    var signInWithGoogle = async () => {                      
        //authsauce https://docs.expo.io/versions/latest/sdk/google/#using-it-inside-of-the-expo-app        
        try {
          const result = await Google.logInAsync({
            //androidClientId: Credentials.default.androidId, 
            //behavior: "web", 
            clientId: Credentials.default.androidId,             
            //androidStandaloneAppClientId: Credentials.default.androidId,
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
              setLoading(false)
              return { cancelled: true };
          }
        } catch (e) {
          console.log('LoginScreen.js 60 | Error with login', e);
          return { error: true };
        }
      };

    async function initGoogleSignIn(){
      try {
        await GoogleSignIn.initAsync({
          // You may ommit the clientId when the firebase `googleServicesFile` is configured
          clientId: Credentials.default.androidId,          

          // Provide other custom options...
        });
      } catch ({ message }) {
        console.log('init GoogleSignIn.initAsync(): ' + message);
      }        
    }

    async function googleSignIn(){//standalone app
      try{
        initGoogleSignIn()
        const { type, user } = await GoogleSignIn.signInAsync();
        
        if (type === 'success') {          
          var response = {
            email: user.email,
            id: user.uid,
            name: user.displayName,
            photo_url: user.photoURL,
            token: user.auth.idToken           
          }                   
          return response;
        } else {          
          setLoading(false)
          return { cancelled: true };
      }
      }catch ({ message }) {
        console.log('GoogleSignIn.initAsync(): ' + message);
        return { error: true };
      }
    }

    async function logoutUser(){
      await GoogleSignIn.signOutAsync()
    }

    function goDashboard(data, token) {
        var datas = {
          user: data,
          token: token 
        } 
        navigation.navigate('Dashboard', datas);
    }
    
    useEffect(()=>{                          
        Secure('credentials', null).then(
          json => {setUserData(json)}          
        )            
                  
    }, []);
    useEffect(()=>{   
      if(userData!=null){
        simpleLogin()       
      }else{
        setTimeout(()=>{         
          setLoading(false)
        }, 4500);
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
                    }}>
                    
                      <View style={style.loginBox}>
                          <AntDesign name="google" size={29} color="black"/>
                          <Text>Login with Google</Text>
                      </View> 
                </TouchableOpacity>
              </View>
          :
            <ProgressBarAndroid styleAttr="Normal" color="snow"/>
        }  
        </View>
    );
}


export default Login;