/**
 * Created by AbdulrohimS on 2016/1/29.
 */
AIDeeplink = window.AIDeeplink || {};

AIDeeplink = function () {

    var notSupportAndroidBrowserUA = [
        'MicroMessenger', // it's show page not found when user not installed your application, but showing good when user installed your app
        'Firefox'  // it's show page not found when user not installed your application, but showing good when user installed your app
    ];
    var timeout = 2000;
    var settingDefaults = {
        delay: timeout,
        timeout: timeout,
        iOS: {},
        android: {}
    };
    var settings = settingDefaults;

    var androidURLStore = "market://details?id=";
    var iOSURLStore = "itms-apps://itunes.apple.com/app/";

    isSupport = function (notSupportBrowserUA) {
        var ua = navigator.userAgent;
        for (var i = 0; i < notSupportBrowserUA.length; ++i) {
            if (ua.toString().toLowerCase().indexOf(notSupportBrowserUA[i].toString().toLowerCase()) > -1) {
                return false;
            }
        }
        return true;
    };

    setupSettings = function (defaults, options) {
        var setting = {};
        for (var key in defaults) {
            setting[key] = defaults[key];
        }
        for (var key in options) {
            setting[key] = options[key];
        }
        return setting;
    };

    setup = function (setting) {
        settings = setupSettings(settingDefaults, setting);
        if (isAndroid()) settings.platform = "android";
        if (isIOS()) settings.platform = "ios";
    };


    getAndroidURLStore = function () {
        var appId = settings.android.appId;
        return appId ? (androidURLStore + appId) : null;
    };

    getIOSURLStore = function () {
        var appName = settings.iOS.appName;
        var appId = settings.iOS.appId;
        return (appId && appName) ? (iOSURLStore + appName + "/id" + appId + "?mt=8") : null;
    };

    getStoreURL = function () {
        var linkmap = {
            "ios": settings.iOS.storeUrl || getIOSURLStore(),
            "android": settings.android.storeUrl || getAndroidURLStore()
        };

        return linkmap[settings.platform];
    };

    isAndroid = function () {
        return navigator.userAgent.match(/Android/i);
    };

    isIOS = function () {
        return navigator.userAgent.match(/iPad|iPhone|iPod/i);
    };

    isMobile = function () {
        return isAndroid() || isIOS();
    };

    platform = function () {
        if (isAndroid()) {
            return 'android';
        } else if (isIOS()) {
            return 'ios';
        }
        return 'desktop';
    };

    openNativeStore = function (ts) {
        return function () {
            var link = getStoreURL();
            var wait = settings.delay;
            if (typeof link === "string" && (Date.now() - ts) < wait) {
                window.location.href = link;
            }
        }
    };

    openNativeApp = function (uri) {
        if (!isMobile()) {
            return false;
        }

        if (isIOS()) {
            setTimeout(function () {
                window.location = uri;
            }, settings.delay);
        }
        else if (isAndroid()) {
            if (!isSupport(notSupportAndroidBrowserUA)) {
                return false;
            }
            else {
                var iframe = document.createElement('iframe');
                iframe.onload = function () {
                    clearTimeout(timeout);
                    iframe.parentNode.removeChild(iframe);
                    window.location.href = uri;
                };
                iframe.src = uri;
                iframe.setAttribute('style', 'display:none;');
                document.body.appendChild(iframe);
            }
        }
        return true;
    };

    openNativeAppWithCallback = function (uri, callback) {
        if (!isMobile()) {
            callback("Support only mobile.");
            return false;
        }

        if (isIOS()) {
            window.location = uri;
            setTimeout(function () {
                callback("iOS time out");
            }, settings.delay);
        }
        else if (isAndroid()) {
            if (!isSupport(notSupportAndroidBrowserUA)) {
                callback("Not support on firefox and default browser android.");
                return false;
            }
            else {
                timeout = setTimeout(function () {
                    callback("android time out");
                }, settings.delay);
                var iframe = document.createElement('iframe');
                iframe.onload = function () {
                    clearTimeout(timeout);
                    iframe.parentNode.removeChild(iframe);
                    window.location.href = uri;
                };
                iframe.src = uri;
                iframe.setAttribute('style', 'display:none;');
                document.body.appendChild(iframe);
            }
        }
        return true;
    };


    return {
        setup: setup,
        openNativeStore: openNativeStore,
        openNativeApp: openNativeApp,
        openNativeAppWithCallback: openNativeAppWithCallback,
        platform: platform,
        getStoreURL: getStoreURL
    }
}();