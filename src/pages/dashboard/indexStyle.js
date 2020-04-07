import { StyleSheet, } from 'react-native'
import Constants from 'expo-constants' 


const indexStyle = StyleSheet.create({
    drawerContainer: {
        flex:1,
        paddingTop: Constants.statusBarHeight,
        backgroundColor:'#43485C'
    },
    drawerItem:{
        height:50,
        borderBottomWidth: .2,
        borderBottomColor:'#262C38',
        alignItems:'flex-start',
        justifyContent:'center',
        paddingLeft: 20
    },
    drawerItemText:{
      color:'snow',
      fontSize: 17,
    },
    modalContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0,0,0, 0.5)',
        //backgroundColor:'green'
    },
    modalBox:{
        width: 300,
        height: 200,
        borderRadius: 5,
        backgroundColor:'#6A7291'
    },
    buttonsBar:{
        position:'absolute',
        bottom:0,
        right:0,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    barButton:{
        margin: 10,
        marginBottom: 12,
        marginLeft: 1,
        marginRight: 8,
        width: 80,
        height: 30,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#080808',
        borderRadius: 2
    },
    barButtonText:{
        color:'snow',
        fontSize: 17
    }

});
export default indexStyle;
