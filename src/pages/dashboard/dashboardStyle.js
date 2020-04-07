import { StyleSheet } from 'react-native';


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262C38',        
        
        //paddingTop: 5
        
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
    titleBox:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center'
    },
    title:{
        marginLeft: -35,
        color:'snow',
        fontSize: 20,
        fontWeight: 'bold'
    },
    body:{
        flex: 1,
        alignItems:'center'
    },

});