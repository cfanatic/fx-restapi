"use strict";

/* global chrome:false */

function saveOptions(e) {
    e.preventDefault();
    browser.storage.sync.set({
        path: document.querySelector("#path").value,
    });
    browser.storage.sync.set({
        user: document.querySelector("#user").value
    });    
    console.log("Info: Set path to " + document.querySelector("#path").value);
    console.log("Info: Set user to " + document.querySelector("#user").value);
}

function restoreOptions() {

    function setPath(result) {
        document.querySelector("#path").value = result.path;
        console.log("Info: Restore path to " + result.path);
    }
    
    function setUser(result) {
        document.querySelector("#user").value = result.user;
        console.log("Info: Restore user to " + result.user);
    }    

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var path, user;
    path = browser.storage.sync.get("path");
    user = browser.storage.sync.get("user");
    path.then(setPath, onError);
    user.then(setUser, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
