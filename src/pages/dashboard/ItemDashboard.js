import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text,  } from 'react-native';
import { Entypo } from '@expo/vector-icons'

import Shimmer from '../../Shimmer'

const ItemDashboard = (props) => {
    
    if(props.isLoading){
        if(props.size === 'small'){
            return(//item small loading
                <View style={styleSmallLoading.item}>
                    <View style={styleSmallLoading.imgBox}>
                        <Shimmer width={100} height={100} borderRadius={8}/>
                    </View>
                
                    <View style={styleSmallLoading.textBox}>
                        <Shimmer width={150} height={20} borderRadius={4}/>
                        <Shimmer width={150} height={20} borderRadius={4}/>
                        <Shimmer width={150} height={20} borderRadius={4}/>
                    </View>
                
                </View>
            );
        }else if(props.size === 'large'){
                return(//item large loading
                    <View style={styleLargeLoading.item}>
                        <View style={styleLargeLoading.imgBox}>
                            
                            <Shimmer width={340} height={180}  borderRadius={5}
                            borderBottomLeftRadius={0}
                            borderBottomRightRadius={0}/>
                        </View>
                    
                        <View style={styleLargeLoading.textBox}>
                        <View style={styleLargeLoading.titleBox}>
                                <Shimmer width={290} height={21}  borderRadius={5}/>
                        </View>
                        <View style={styleLargeLoading.subTitleBox}>
                                <Shimmer width={290} height={6}  borderRadius={5}/>
                        </View>
                        <View style={styleLargeLoading.subTitleBox}>
                                <Shimmer width={290} height={6}  borderRadius={5}/>
                        </View>
                        </View>
                    
                    </View>
                );
        }
    }else{ // no
        if(props.size === 'small'){
            return(//item small not loading
                <View style={styleSmall.item}>
                
                    <Image source={props.item.image} style={styleSmall.image} />
                
                    <View style={styleSmall.textBox}>
                        <Text style={styleSmall.title}>{props.item.title}</Text>
                        <Text ellipsizeMode='tail' numberOfLines={6} style={styleSmall.text}>{props.item.text}</Text>
                    </View>
                    
                </View>
            );
        }else if(props.size === 'large'){
                return(//item small not loading
                    <View style={styleLarge.item} >
                        
                        <Image source={props.item.image} style={styleLarge.image} />
                    
                        <View style={styleLarge.textBox}>
                            <View style={styleLarge.titleBox}>
                                <Text style={styleSmall.title}>{props.item.title}</Text>
                            </View>
                            <View style={styleLarge.subTitleBox}>
                                <Text ellipsizeMode='tail' numberOfLines={2} style={styleLarge.text}>{props.item.text}</Text>  
                            </View>
                            
                        </View>
                    
                    </View>
                );
        }
    }
}

const styleLarge = StyleSheet.create({
    item:{
        flexDirection:'column',
        backgroundColor: '#43485C',
        margin: 5,
        borderRadius: 5,
        width: 340,
        height: 254,
    },
    image:{
        width: 340,
        height: 180,
        backgroundColor:'gray',
        borderRadius:5,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        resizeMode: 'cover'
    },
    textBox:{
        flex:1,
        alignItems:'center',
        borderBottomRightRadius: 5,
        borderBottomLeftRadius: 5,
        justifyContent:'flex-start',
    },
    titleBox:{
        width: 290,
        height: 21,
        borderRadius: 4,
        marginTop:3,
        //backgroundColor:'#8A8B8F',
        marginBottom: 8
    },
    title:{
        color:'snow',
        fontWeight:'bold',
        fontSize:20
    }, 
    subTitleBox:{
        justifyContent:'flex-start',
        width: 290,
        height: 12,
        //backgroundColor:'#8A8B8F',
        borderRadius: 4,
        margin: 1
    },
    text:{
        color:'white'
    }
});


const styleSmall = StyleSheet.create({
    item:{
        flexDirection:'row',
        width: 340,
        height: 150,
        borderRadius: 8,
        backgroundColor: '#43485C',
        margin: 5,
        justifyContent:'flex-start',
        alignItems:'center',
        paddingLeft: 10
    },
    image:{
        width: 130,
        height: 130,
        borderRadius: 4,
    },
    textBox:{      
        width: 190,
        height: 130,
        marginLeft:2,
        paddingLeft: 8,
        justifyContent: 'flex-start',
        //backgroundColor:'red',
        overflow:'hidden'
    },
    title:{
        color:'snow',
        fontWeight:'bold',
        fontSize:20
    },
    text:{
        marginTop:5,
        color:'white',
        //backgroundColor:'gray',
    }
});

const styleLargeLoading = StyleSheet.create({
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


const styleSmallLoading = StyleSheet.create({
    item:{
        flexDirection:'row',
        width: 340,
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
        marginRight: 25,
    },
    textBox:{        
        width: 100,
        height: 90,
        justifyContent: 'space-around'
    },
});

export default ItemDashboard;