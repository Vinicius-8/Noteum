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
        //borderBottomWidth: .3,
        borderBottomColor: '#43485C',
        shadowColor: 'black',
        elevation: 2
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
    item:{
        width: 300,
        height: 150,
        borderRadius: 8,
        backgroundColor: '#43485C',
        margin: 20,
    },
    shimmer:{
        margin: 10,
    }
});