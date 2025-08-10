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
import { StreamHandler, WebPubSubClient, WebPubSubJsonProtocol } from "@azure/web-pubsub-client";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import "dotenv/config";

async function main(): Promise<void> {
  const hubName = "sample_chat";
  const groupName = "testGroup";
  const serviceClient = new WebPubSubServiceClient(
    "Endpoint=http://localhost;Port=8080;AccessKey=ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789ABCDEFGH;Version=1.0;",
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
  } as WebPubSubClientCredential, {
    protocol: WebPubSubJsonProtocol(),
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
        `Received message from ${e.message.group} ${Buffer.from(e.message.data).toString(
          "base64",
        )}`,
      );
    } else {
      console.log(`Received message from ${e.message.group} ${JSON.stringify(e.message.data)}`);
    }
  });


  client.onStream(groupName, (streamId: string) => {
    const streamHandler = new StreamHandler();
    streamHandler.onComplete = () => {
      console.log("Stream completed successfully", streamId);
    };
    streamHandler.onMessage = (streamMessage: JSONTypes) => {
      console.log("Message received for stream: " + streamId + " " + streamMessage);
    };
    streamHandler.onError = (error) => {
      console.log("Error found: ", error);
    };
    return streamHandler;
  });

  await client.start();


  await client.joinGroup(groupName);
  
  // Test the new streaming API
  console.log("\n=== Testing Stream API ===");
  
  // Create a stream
  const stream = client.stream(groupName, 60000); // 60 second TTL
  
  // Send stream messages using the new streaming API
  console.log("Publishing stream messages...");
  await stream.publish("Hello", "text");
  await stream.publish("World", "text");
  await stream.complete("!", "text");
  
  console.log("Stream completed!");

  // Test the raw sendToStream method
  console.log("\n=== Testing Raw sendToStream API ===");
}

main().catch((e) => {
  console.error("Sample encountered an error", e);
  process.exit(1);
});
