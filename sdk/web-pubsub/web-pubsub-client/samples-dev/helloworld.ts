// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Basic usage of web-pubsub-client
 */

import type {
  WebPubSubClientCredential,
  GetClientAccessUrlOptions,
  JSONTypes,
} from "@azure/web-pubsub-client";
import { StreamHandler, WebPubSubClient } from "@azure/web-pubsub-client";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function main(): Promise<void> {
  const hubName = "sample_chat";
  const groupName = "testGroup";
  const serviceClient = new WebPubSubServiceClient(
    process.env.WPS_ENDPOINT!,
    new DefaultAzureCredential(),
    hubName,
  );

  const fetchClientAccessUrl = async (_: GetClientAccessUrlOptions): Promise<string> => {
    return (
      await serviceClient.getClientAccessToken({
        roles: [`webpubsub.joinLeaveGroup.${groupName}`, `webpubsub.sendToGroup.${groupName}`],
      })
    ).url;
  };
  const client = new WebPubSubClient({
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
      console.log(`Received message ${JSON.stringify(e.message.data)}`);
    }
  });

  client.on("group-message", (e) => {
    if (e.message.data instanceof ArrayBuffer) {
      console.log(
        `Received message from ${e.message.group} ${Buffer.from(e.message.data).toString(
          "base64",
        )}`,
      );
    } else {
      console.log(`Received message from ${e.message.group} ${JSON.stringify(e.message.data)}`);
    }
  });

  client.onStream(groupName, (streamId) => {
    const streamHandler = new StreamHandler();
    const data: JSONTypes[] = [];

    streamHandler.onMessage((message: JSONTypes) => {
      data.push(message);
    });

    streamHandler.onComplete(() => {
      console.log(`Stream ${streamId} completed with data: ${data.join(" ")}`);
    });

    streamHandler.onError((error: any) => {
      console.error(`Stream error: ${error.message}`);
    });

    return streamHandler;
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

  const stream = client.stream(groupName);
  stream.onError((error) => {
    console.error(`Stream publish error: ${error.message}`);
  });
  console.log("Publishing stream messages!");
  await stream.publish("Hello", "text");
  await stream.publish("World", "text");
  await stream.complete("!", "text");

  await delay(1000);
  client.stop();
}

main().catch((e) => {
  console.error("Sample encountered an error", e);
  process.exit(1);
});

function delay(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
