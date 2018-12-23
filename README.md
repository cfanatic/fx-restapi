# fx-restapi
This repository features a toolbar extension for Firefox which periodically monitors system states over a [**REST API**](https://www.slimframework.com).

It evaluates JSON responses sent from the server and sets the toolbar badge text to either "New", "Error" or "Unknown". 

Run this add-on if you automatically want to be informed in the browser when a system state has changed.

## Installation
Mozilla requires add-ons to be verified. You have to run the [**Developer Edition**](https://www.mozilla.org/en-US/firefox/developer/) for Firefox in order to test this add-on.

Make sure that the right URL for the HTTP GET request is used:
```javascript
function onAlarm(alarm) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", onResponse);
    xhr.open("GET", path + "?user=" + user);
    xhr.send();
}
```

Run the following command in the terminal to build the add-on:
```
zip fxaddon.xpi manifest.json img/icon.png js/polling.js js/options.js html/options.html
```
Drag _fxaddon.xpi_ into the browser and confirm both notifications.

Configure the add-on with parameters to call the REST API with:
![Default](https://github.com/cfanatic/fx-restapi/blob/master/misc/5_Settings.png)

Restart the browser.

## Usage
Depending on the current system state, you get one of the following notifications:

![Default](https://github.com/cfanatic/fx-restapi/blob/master/misc/1_Default.png)
![New](https://github.com/cfanatic/fx-restapi/blob/master/misc/2_New.png)
![Off](https://github.com/cfanatic/fx-restapi/blob/master/misc/3_Off.png)
![Error](https://github.com/cfanatic/fx-restapi/blob/master/misc/4_Error.png)
