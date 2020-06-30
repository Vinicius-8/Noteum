
<img src="https://user-images.githubusercontent.com/33498293/81240788-c2af4700-8fde-11ea-99e6-d994bec8c43c.gif" width="1080" alt="Noteum GiF">

# Noteum
A note saver for your links, made with React Native and Expo

## Getting Started
* Clone the repo:

```bash
$ git clone https://github.com/Vinicius-8/Noteum.git

```

* Create a file called credentials.js at src folder and put your [OAUTH client ID](https://docs.expo.io/versions/latest/sdk/google/) to use the google API for authentication with Expo, as follows (use the same client ID in the [server-side](https://github.com/Vinicius-8/Noteum_Server)):  
```js
const ANDROID_CLIENT_ID = "<yourid>";

export default {
    androidId: ANDROID_CLIENT_ID,
};
```

* Install and run:
```bash
$ yarn
$ expo start

```
> You can download the app on [Google Play Store](https://play.google.com/store/apps/details?id=com.oytu.noteum) 
