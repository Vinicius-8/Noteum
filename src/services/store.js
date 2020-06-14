import * as SecureStore from 'expo-secure-store'

const Store = async (key, value)=>{
    
    if (value != null) {
        SecureStore.setItemAsync(key, JSON.stringify(value))
    }else {
        json = null
        try{
            json = await SecureStore.getItemAsync(key)
        }catch (error) {
            json = {
                email: 'invalid@email.com',
                token: 'invalid_token'
            }
              return json
        }
        return JSON.parse(json)
    }
}

export default Store;