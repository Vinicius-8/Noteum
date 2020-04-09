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
    }

});