import React from 'react';
import { Text, View, Image,ScrollView, TouchableOpacity, Clipboard,ToastAndroid } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import style from './indexStyle'


const Detail = (props) => {
    const ITEM = props.route.params.item
    const navigation = useNavigation()

    function copylink(){
        Clipboard.setString(ITEM.url)
        ToastAndroid.show('Copied to clipboard', ToastAndroid.SHORT)
    }
    function goBack(){
        navigation.goBack()
    }
    return(
        <>
        <View style={style.container}>
            <ScrollView 
                showsVerticalScrollIndicator={true}                
            >
            <Image source={{uri: ITEM.img_url}} style={style.img}/> 
            <Text  style={style.title}>{ITEM.title}</Text>  
            <Text  style={style.description}>{ITEM.description}</Text>        
                             
            </ScrollView>
        </View>
        <View style={style.clipboardBox}>
                <Text numberOfLines={1} style={style.url}>{ITEM.url}</Text>
                <TouchableOpacity
                    onPress={copylink}
                >
                    <MaterialCommunityIcons name="content-copy" size={24} color="snow" />
                </TouchableOpacity>
            </View> 
        <View style={style.container2}>
            <TouchableOpacity style={style.returnButton}
                onPress={goBack}
            >
                <Text style={style.returnText}>Return</Text>    
            </TouchableOpacity>        
        </View>
        </>
    );
}


export default Detail;