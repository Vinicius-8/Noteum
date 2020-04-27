import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262C38',        
        //paddingTop: 5    
    }, 
    body:{
        flex: 1,
        alignItems:'center'
    },
    //bottomSheetContent
    BSCContainer:{
        flex: 1,
        //backgroundColor: 'red'
    },
    BSCButton:{
        height: 30,
        margin: 10,
        //borderBottomWidth: .3,
        borderBottomColor:'#262C38',
        flexDirection:'row',
    },
    BSCText:{
        fontSize: 16,
        color:'snow',
        marginLeft: 10
    },
    BSCIcon:{
      fontSize:20,
      color:'snow',
      marginLeft: 30
    },
    BSCTitle:{
        marginTop: 5,
        paddingLeft: 15,
        paddingBottom: 3,
        color: 'snow',
        fontSize: 19,
        fontWeight:'bold',
        //backgroundColor: '#596180'
        borderBottomWidth: 1,
        borderBottomColor: '#596180'
    },
    BSCDescription:{
        marginTop: 5,
        paddingLeft: 10,
        color: '#e5e5e5',
        fontSize: 14,
        //backgroundColor: '#596180',        
        borderBottomColor: '#596180',
    },
    BSCButtonsBar:{
        //position:'absolute',
        //bottom:-2,
        //right:0,
        flexDirection:'row',
        justifyContent:'flex-end', 
        marginBottom: -4       
    },
    BSCListContainer:{
        justifyContent:'center',    
        alignItems:  'center',    
        padding: 10,
        borderBottomColor:'#43485C',
        borderBottomWidth: .6,
    },
    BSCListText:{
        fontSize: 20,
        color:'snow',
    },

});