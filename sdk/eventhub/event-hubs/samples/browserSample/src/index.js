// Copyright (c) Microsoft Corporation.
// Licensed under the MIT Licence.

/**
 * This file hooks up the "Send" and "Receive" buttons on the web page to the
 * "sendEvents.js" and "receiveEvents.js" samples.
 */
const { send } = require("./sendEvents");
const { receive } = require("./receiveEvents");

const sendElement = document.getElementById("send");
const receiveElement = document.getElementById("receive");

sendElement.addEventListener("click", () => {
  send();
});

receiveElement.addEventListener("click", () => {
  receive();
});
