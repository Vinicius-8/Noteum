# Noteum
A note saver for your links
 
## Requirements  
* Create a file called credentials.js at src folder and put your OAUTH client ID to use the google API for authentication, as follows:  
```js
const ANDROID_CLIENT_ID = "<yourid>";
const IOS_CLIENT_ID = "<yourid>";

export default {
    androidId: ANDROID_CLIENT_ID,
    iosId: IOS_CLIENT_ID
};
```
