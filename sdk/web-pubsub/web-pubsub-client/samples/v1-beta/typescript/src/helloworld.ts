// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Basic usage of web-pubsub-client
 */

import {
  WebPubSubClient,
  WebPubSubClientCredential,
  SendToGroupOptions,
  GetClientAccessUrlOptions,
} from "@azure/web-pubsub-client";
import { WebPubSubServiceClient } from "@azure/web-pubsub";

require("dotenv").config();

const hubName = "sample_chat";
const groupName = "testGroup";
const serviceClient = new WebPubSubServiceClient(process.env.WPS_CONNECTION_STRING!, hubName);

const fetchClientAccessUrl = async (_: GetClientAccessUrlOptions) => {
  return (
    await serviceClient.getClientAccessToken({
      roles: [`webpubsub.joinLeaveGroup.${groupName}`, `webpubsub.sendToGroup.${groupName}`],
    })
  ).url;
};

async function main() {
  let client = new WebPubSubClient({
    getClientAccessUrl: fetchClientAccessUrl,
  } as WebPubSubClientCredential);

  client.on("connected", (e) => {
    console.log(`Connection ${e.connectionId} is connected.`);
  });

  client.on("disconnected", (e) => {
    console.log(`Connection disconnected: ${e.message}`);
  });

  client.on("server-message", (e) => {
    if (e.message.data instanceof ArrayBuffer) {
      console.log(`Received message ${Buffer.from(e.message.data).toString("base64")}`);
    } else {
      console.log(`Received message ${e.message.data}`);
    }
  });

  client.on("group-message", (e) => {
    if (e.message.data instanceof ArrayBuffer) {
      console.log(
        `Received message from ${e.message.group} ${Buffer.from(e.message.data).toString("base64")}`
      );
    } else {
      console.log(`Received message from ${e.message.group} ${e.message.data}`);
    }
  });

  await client.start();

  await client.joinGroup(groupName);
  await client.sendToGroup(groupName, "hello world", "text", {
    fireAndForget: true,
  } as SendToGroupOptions);
  await client.sendToGroup(groupName, { a: 12, b: "hello" }, "json");
  await client.sendToGroup(groupName, "hello json", "json");
  var buf = Buffer.from("aGVsbG9w", "base64");
  await client.sendToGroup(
    groupName,
    buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
    "binary"
  );
  await delay(1000);
  await client.stop();
}

main().catch((e) => {
  console.error("Sample encountered an error", e);
  process.exit(1);
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
