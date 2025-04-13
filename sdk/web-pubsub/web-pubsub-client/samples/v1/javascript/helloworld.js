// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Basic usage of web-pubsub-client
 */

const { WebPubSubClient } = require("@azure/web-pubsub-client");
const { WebPubSubServiceClient } = require("@azure/web-pubsub");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

async function main() {
  const hubName = "sample_chat";
  const groupName = "testGroup";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_ENDPOINT,
    new DefaultAzureCredential(),
    hubName,
  );

  const fetchClientAccessUrl = async (_) => {
    return (
      await serviceClient.getClientAccessToken({
        roles: [`webpubsub.joinLeaveGroup.${groupName}`, `webpubsub.sendToGroup.${groupName}`],
      })
    ).url;
  };
  const client = new WebPubSubClient({
    getClientAccessUrl: fetchClientAccessUrl,
  });

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
      console.log(`Received message ${JSON.stringify(e.message.data)}`);
    }
  });

  client.on("group-message", (e) => {
    if (e.message.data instanceof ArrayBuffer) {
      console.log(
        `Received message from ${e.message.group} ${Buffer.from(e.message.data).toString("base64")}`,
      );
    } else {
      console.log(`Received message from ${e.message.group} ${JSON.stringify(e.message.data)}`);
    }
  });

  await client.start();

  await client.joinGroup(groupName);
  await client.sendToGroup(groupName, "hello world", "text", {
    fireAndForget: true,
  });
  await client.sendToGroup(groupName, { a: 12, b: "hello" }, "json");
  await client.sendToGroup(groupName, "hello json", "json");
  const buf = Buffer.from("aGVsbG9w", "base64");
  await client.sendToGroup(
    groupName,
    buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength),
    "binary",
  );
  await delay(1000);
  client.stop();
}

main().catch((e) => {
  console.error("Sample encountered an error", e);
  process.exit(1);
});

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
