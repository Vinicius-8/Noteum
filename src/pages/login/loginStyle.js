import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#0c0f1f',
        backgroundColor:'#0d0d0d',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },

    middleBox: {
        backgroundColor: '#262C38',
        width: 300,
        height: 135,
        borderRadius: 10,
    },
    image:{
        width: 100,
        height: 100,
        marginTop: -100,
        marginBottom: -180,
    },

    text:{
        color: 'snow',
        fontSize: 20,
        marginTop: 10,
        marginLeft: 48,
        alignSelf:'flex-start'
    },
    loginBox: {
        backgroundColor: 'snow',
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        height: 50,
        margin: 20,
        borderRadius: 5,
        marginLeft: 48,
    }

});