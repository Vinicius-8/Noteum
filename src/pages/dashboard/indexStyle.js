import { StyleSheet, } from 'react-native'
import Constants from 'expo-constants' 


const indexStyle = StyleSheet.create({
    // Moldal new Item
    MNIBox:{
        width: 330,
        minHeight:  280,
        maxHeight: 320,
        borderRadius: 5,
        backgroundColor:'#6A7291',
        flexDirection:'column',
        //justifyContent:'space-around',    
    },
    MNIImage:{
        marginTop: 2,
        alignSelf:'center',
        width: 320, 
        height: 180,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
    },
    MNITextBox:{
        //backgroundColor: 'black'
    },
    MNITitle:{
        marginTop: 5,
        paddingLeft: 10,
        paddingBottom: 3,
        color: 'snow',
        fontSize: 19,
        fontWeight:'bold',
        //backgroundColor: '#596180'
        borderBottomWidth: 1,
        borderBottomColor: '#596180'
    },
    MNIDescription:{
        marginTop: 5,
        paddingLeft: 10,
        color: '#e5e5e5',
        fontSize: 14,
        //backgroundColor: '#596180',        
        borderBottomColor: '#596180',
    },
    MNIButtonsBar:{
        //position:'absolute',
        //bottom:-2,
        //right:0,
        flexDirection:'row',
        justifyContent:'flex-end', 
        marginBottom: -4       
    },
    MNIListContainer:{
        justifyContent:'center',    
        alignItems:  'center',    
        padding: 10,
        borderBottomColor:'#43485C',
        borderBottomWidth: .6,
    },
    MNIListText:{
        fontSize: 20,
        color:'snow',
    },
    //drawer    drawer  drawer  drawer
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
    drawerItemSelected:{
        height:50,
        borderBottomWidth: .2,
        borderBottomColor:'#262C38',
        backgroundColor: '#575E78',
        alignItems:'flex-start',
        justifyContent:'center',
        paddingLeft: 20
    },
    drawerItemText:{
      color:'snow',
      fontSize: 17,
    },

    // modal    modal   modal   modal   
    modalContainer:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: 'rgba(0,0,0, 0.5)',
        //backgroundColor:'green'
    },
    modalBox:{
        width: 300,
        height: 180,
        borderRadius: 5,
        backgroundColor:'#6A7291',
        justifyContent:'space-around'
    },
    buttonsBar:{
        //position:'absolute',
        //bottom:0,
        //right:0,
        flexDirection:'row',
        justifyContent:'flex-end'
    },
    barButton:{
        marginBottom: 8,
        marginRight: 5,
        width: 80,
        height: 35,
        alignItems:'center',
        justifyContent:'center',
        //backgroundColor:'#080808',
        borderRadius: 2,
    },
    barButtonText:{
        color:'snow',
        fontSize: 17,
    },
    barButtonTextPaste:{
        color:'snow',
        fontSize: 17,
    },
    inputModal: {
        margin: 15,
        height: 40,
        paddingLeft: 12,
        fontSize: 18,
        color:'snow',
        borderBottomWidth: 2,
        borderBottomColor: '#262C38',
     },
     modalTitle:{
        color: 'snow',
        fontSize: 20,
        marginLeft: 20,
        marginTop: 10,
     },

     // header  header  header  header 
     headerContainer:{
        paddingTop: Constants.statusBarHeight, 
        backgroundColor: '#262C38',
        shadowColor: "#000",
        shadowRadius: 1,
        elevation: 2,
     },
     header:{
        height: 55,
        flexDirection: 'row',
        shadowColor: 'black',
        backgroundColor: '#262C38',
        
    },
    hambBox:{
        justifyContent: 'center',
        marginLeft: 15,
    },
    plusBox:{
        justifyContent: 'center',
        marginRight: 15
    },
    titleBox:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        
    },
    title:{
        
        color:'snow',
        fontSize: 20,
        fontWeight: 'bold'
    },

});
export default indexStyle;
