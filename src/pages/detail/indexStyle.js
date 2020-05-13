import { StyleSheet, } from 'react-native'
import Constants from 'expo-constants' 

const indexStyle = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor:'#262C38',
        paddingTop: Constants.statusBarHeight + 10,
    },
    img:{
        width: 330,
        height:250,
        backgroundColor:'gray',
        borderRadius:5,
        alignSelf:'center',
        //borderBottomLeftRadius: 0,
        //borderBottomRightRadius: 0,
    },
    title:{
        marginTop: 20,
        marginLeft: 15,
        fontSize: 20,
        color:'snow'
    },
    description:{
        margin: 20,
        marginLeft: 15,
        fontSize: 15,
        color:'snow',
    },
    clipboardBox:{
        flexDirection: 'row',
        alignItems:'center',
        backgroundColor:'#43485C',
    },
    url:{
        color:'snow',
        width: 280,
        margin: 15,
        fontSize:18,         
    }, 
    returnButton:{
        margin: 10,
        width: 300,
        height: 50,
        backgroundColor:'#43485C',
        justifyContent:'center',
        alignSelf:'center',
        borderRadius: 4,        
        elevation: 2
    },
    returnText:{
        fontSize:20,
        color:'snow',
        alignSelf:'center',
    }
});

export default indexStyle;
