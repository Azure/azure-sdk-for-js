// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Basic usage of web-pubsub-client
 */

import {WebPubSubClient} from "@azure/web-pubsub-client"

const groupName = "sample-group";

let messages = document.querySelector('#messages');
let id = prompt('Please input your user name');

let client = new WebPubSubClient({
  getClientAccessUrl: async _ => {
    let value = await (await fetch(`/negotiate?id=${id}`)).json();
    return value.url;
  }
});

let message = document.querySelector('#message');
message.addEventListener('keypress', async e => {
  if (e.charCode !== 13) return;
  await client.sendToGroup(groupName, message.value, "text");
  message.value = '';
});

(async function () {
  try {
    client.on("connected", (e) => {
      console.log(`Connection ${e.connectionId} is connected.`);
    });
    
    client.on("group-message", (e) => {
      let m = document.createElement('p');
      m.innerText = `[${e.message.fromUserId}] ${e.message.data}`;
      messages.appendChild(m);
    });

    await client.start();
    await client.joinGroup(groupName);
    
    console.log("started");
  } catch(e) {
    console.log(e);
  }
})();
