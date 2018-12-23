"use strict";

/* global chrome:false */

var polling = true;
var path, user = "";
var getPath = browser.storage.sync.get("path");
var getUser = browser.storage.sync.get("user");

getPath.then(function onPath(result) {
    path = result.path;
    console.log("Info: Path is " + result.path)
});

getUser.then(function onUser(result) {
    user = result.user;
    console.log("Info: User is " + result.user)
});

function getTime() {
    var date = new Date();
    var time = " (" + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds() + ")";
    return time;
}

browser.browserAction.onClicked.addListener(function(aTab) {
    if (!polling) {
        polling = true;
        browser.browserAction.setBadgeBackgroundColor({color: "#ff0000"}); 
        browser.browserAction.setBadgeText({text: ""});        
        onStart();
    }
    else {
        polling = false;
        browser.browserAction.setBadgeBackgroundColor({color: "#366cfe"});        
        browser.browserAction.setBadgeText({text: "Off"});        
        onClear()
    }
});

function onInstalled() {
    browser.alarms.create("trigger", { when: Date.now() + 1000, periodInMinutes: 0.05 });
}

function onStart() {
    browser.alarms.create("trigger", { when: Date.now() + 1000, periodInMinutes: 0.05 });
}

function onClear() {
    chrome.alarms.clear("trigger");
}

function onResponse () {
    var obj = JSON.parse(this.responseText);
    if (obj.type == "success" && obj.status == "unread") {
        browser.browserAction.setBadgeText({text: "New"});
        console.log("Info: New messages for " + user + getTime());
    }
    else if (obj.type == "success" && obj.status == "read") {
        browser.browserAction.setBadgeText({text: ""});
        console.log("Info: Nothing for " + user + getTime());
    }    
    else if (obj.type == "error") {
        browser.browserAction.setBadgeText({text: "Error"});
        console.log("Error: " + obj.status + getTime());
    }
    else {
        console.log("Warning: Unknown Response " + getTime());
    }
}

function onAlarm(alarm) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", onResponse);
    xhr.open("GET", path + "?user=" + user);
    xhr.send();
}

browser.browserAction.setBadgeBackgroundColor({color: "#ff0000"});
browser.runtime.onInstalled.addListener(onInstalled);
browser.runtime.onStartup.addListener(onStart);
browser.alarms.onAlarm.addListener(onAlarm);
