import * as SecureStore from 'expo-secure-store'

const Store = async (key, value)=>{
    
    if (value != null) {
        SecureStore.setItemAsync(key, JSON.stringify(value))
    }else {
        json = await SecureStore.getItemAsync(key)
        return JSON.parse(json)
    }
}

export default Store;