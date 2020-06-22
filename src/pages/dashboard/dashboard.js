import React from 'react';
import { View, TouchableOpacity, FlatList, Linking } from 'react-native';

import style from './dashboardStyle'
import ItemDash from './ItemDashboard'


const Dashboard = (props) => {  
    //console.log('[dashboard]-> ', props);
    const data = props.data.items
    const exibitionMode = props.mode
    

    function openLinkInWebBrowser(item){
        console.log('tocou no item: ', item.title);
        Linking.openURL(item.url)
        .catch((err) => console.error('An error occurred', err));
    }        

    if(props.loading){ // loading screen
        return(//-------- loading
            <View style={style.container}>        
                <View style={style.body}>
                    <ItemDash size={exibitionMode} isLoading={props.loading}/>
                    <ItemDash size={exibitionMode} isLoading={props.loading}/>
                    <ItemDash size={exibitionMode} isLoading={props.loading}/>
                    <ItemDash size={exibitionMode} isLoading={props.loading}/>
                </View>
            </View>
        );//-------- loading
    }else{        
        return(
            <View style={style.container}>
        
                <View style={style.body}>
                    <FlatList 
                        data={data}                    
                        keyExtractor={data => String(data.id)}
                        style={{ paddingTop: 5}}
                        renderItem={(
                            ({item}) => 
                            <TouchableOpacity onPress={()=>{
                                openLinkInWebBrowser(item)
                            }}>
                                <ItemDash 
                                    size={props.mode} 
                                    isLoading={props.loading} 
                                    item={item} 
                                    onPress={openLinkInWebBrowser} 
                                    userData={props.userData}
                                    listTitle={props.data.title}
                                    />
                            </TouchableOpacity>
                        )}
                     />
                     
                </View>
            </View>
        );
    }
}



export default Dashboard;