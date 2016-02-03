# AIDeeplink
AIDeeplink(Android iOS deep link) is a java script library for deep link on android and iOS9


# Support Android & iOS9
| Browsers/Platform         | Application Installed  | Application not installed |
| --------------------------|:----------------------:|:-------------------------:|
| Firefox/Android           |          /             |             X             |
| Default Browser/Android   |          /             |             X             |
| Chrome/Android            |          /             |             /             |
| Firefox/iOS               |          X             |             X             |
| Safari/iOS                |          /             |             /|
| Chrome/iOS                |          /             |             /             |
             

# Usage

### Setup
```js
AIDeeplink.setup(
        {
            iOS: {
                appName: "App name",
                appId: "appId",
                storeUrl: "your store url" // https://itunes.apple.com/us/app/apple-store/id<your_app_id>?mt=8 or itms-apps://itunes.apple.com/app/<appName>/id<appId>?mt=8
            },
            android: {
                appName: "App name",
                appId: "app.package.name",
                storeUrl: "your store url" // http://play.google.com/store/apps/details?id=<package_name> or market://details?id=<package_name> 
            },
    		timeout: 2000, // (milli seconds) timeout after try to open your application.
            delay: 2000 // (milli seconds) delay time before try to launch your mobile aplication.
        }
)
```

### Open native app store
```js
AIDeeplink.openNativeStore();
```

### Open native app
```js
AIDeeplink.openNativeApp("intent://schema");
```

### Open native app with callback
```js
AIDeeplink.openNativeAppWithCallback(
			"intent://schema", 
			function (msg) {
                alert("callback " + msg);
            });
```

### get store url
```js
AIDeeplink.getStoreURL();
```

### get platform
```js
AIDeeplink.platform(); // ios, android, desktop
```
