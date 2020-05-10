
<img src="https://user-images.githubusercontent.com/33498293/81240788-c2af4700-8fde-11ea-99e6-d994bec8c43c.gif" width="1080" alt="Noteum GiF">

# Noteum
A note saver for your links, made with React Native and Expo

## Getting Started
* Clone the repo:

```bash
$ git clone https://github.com/Vinicius-8/Noteum.git

```

* Create a file called credentials.js at src folder and put your OAUTH client ID to use the google API for authentication, as follows:  
```js
const ANDROID_CLIENT_ID = "<yourid>";
const IOS_CLIENT_ID = "<yourid>";

export default {
    androidId: ANDROID_CLIENT_ID,
    iosId: IOS_CLIENT_ID
};
```
* install and run:
```bash
$ yarn
$ expo start

```
