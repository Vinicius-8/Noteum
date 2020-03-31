import { StyleSheet } from 'react-native';
import Constants from 'expo-constants'


export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#262C38',
        paddingTop: Constants.statusBarHeight, 
    },
    header:{
        height: 55,
        flexDirection: 'row',
        borderBottomWidth: .3,
        borderBottomColor: '#43485C',
        
    },
    hambBox:{
        justifyContent: 'center',
        //backgroundColor: 'red',
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
    }
});