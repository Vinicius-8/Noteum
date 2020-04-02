import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons'

import Shimmer from '../../Shimmer'


const ItemDashboard = (props) => {
    if(props.size === 'small'){
        return(//item small
            <View style={styleSmall.item}>
                <View style={styleSmall.imgBox}>
                    <Shimmer width={100} height={100} borderRadius={8}/>
                </View>
            
                <View style={styleSmall.textBox}>
                    <Shimmer width={130} height={20} borderRadius={4}/>
                    <Shimmer width={130} height={20} borderRadius={4}/>
                    <Shimmer width={130} height={20} borderRadius={4}/>
                </View>
            
            </View>
        );
    }else if(props.size === 'large'){
            return(//item small
                <View style={styleLarge.item}>
                    <View style={styleLarge.imgBox}>
                        
                        <Shimmer width={340} height={180}  borderRadius={5}
                         borderBottomLeftRadius={0}
                         borderBottomRightRadius={0}/>
                    </View>
                
                    <View style={styleLarge.textBox}>
                       <View style={styleLarge.titleBox}>
                            <Shimmer width={290} height={21}  borderRadius={5}/>
                       </View>
                       <View style={styleLarge.subTitleBox}>
                            <Shimmer width={290} height={6}  borderRadius={5}/>
                       </View>
                       <View style={styleLarge.subTitleBox}>
                            <Shimmer width={290} height={6}  borderRadius={5}/>
                       </View>
                    </View>
                
                </View>
            );
    }
}

const styleLarge = StyleSheet.create({
    item:{
        flexDirection:'column',
        backgroundColor: '#43485C',
        margin: 5,
        borderRadius: 5,
        width: 340,
        height: 250,
    },
    imgBox:{
        width: 340,
        height: 180,
        backgroundColor:'gray',
        borderRadius:5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    textBox:{
        flex:1,
        alignItems:'center',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent:'center'
    },
    titleBox:{
        width: 290,
        height: 21,
        borderRadius: 4,
        backgroundColor:'#8A8B8F',
        marginBottom: 8
    }, 
    subTitleBox:{
        width: 290,
        height: 6,
        backgroundColor:'#8A8B8F',
        borderRadius: 4,
        margin: 2
    },
});


const styleSmall = StyleSheet.create({
    item:{
        flexDirection:'row',
        width: 300,
        height: 150,
        borderRadius: 8,
        backgroundColor: '#43485C',
        margin: 5,
        justifyContent:'flex-start',
        alignItems:'center',
        paddingLeft: 20
    },
    imgBox:{
        width: 109,
        marginRight: 15
    },
    textBox:{        
        width: 100,
        height: 90,
        justifyContent: 'space-around'
    },
});

export default ItemDashboard;