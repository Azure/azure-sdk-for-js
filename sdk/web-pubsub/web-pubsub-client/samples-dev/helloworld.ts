// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Basic usage of web-pubsub-client
 */

import type {
  WebPubSubClientCredential,
  GetClientAccessUrlOptions,
  WebPubSubClientOptions,
} from "@azure/web-pubsub-client";
import { WebPubSubClient } from "@azure/web-pubsub-client";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function main(): Promise<void> {
  const hubName = "sample_chat";
  const groupName = "testGroup";
  const options: WebPubSubClientOptions = {
    keepAliveTimeoutInMs: 500,
    keepAliveIntervalInMs: 100,
  };
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
  const client = new WebPubSubClient(
    {
      getClientAccessUrl: fetchClientAccessUrl,
    } as WebPubSubClientCredential,
    options,
  );

  client.on("connected", (e) => {
    console.log(`Connection ${e.connectionId} is connected.`);
  });

  client.on("disconnected", (e) => {
    console.log(`Connection disconnected: ${e.message}`);
  });

  client.on("server-message", (e) => {
    console.log(`Received message ${formatPayload(e.message.data)}`);
  });

  client.on("group-message", (e) => {
    console.log(`Received message from ${e.message.group} ${formatPayload(e.message.data)}`);
  });

  const streamSubscription = client.onStream(groupName, (streamId) => {
    return {
      onMessage: (args) => {
        console.log(
          `[stream:${streamId}] seq=${args.stream.streamSequenceId} ${formatPayload(args.data)}`,
        );
      },
      onComplete: () => {
        console.log(`[stream:${streamId}] completed`);
      },
      onError: (args) => {
        console.log(
          `[stream:${streamId}] failed: ${args.error?.name}${args.error?.message ? ` - ${args.error.message}` : ""}`,
        );
      },
    };
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
  await client.sendToGroup(groupName, "hello world after ping/pong", "text", {
    fireAndForget: true,
  });

  const stream = await client.stream(groupName);
  stream.onError((error) => {
    console.log(
      `[publisher:${stream.streamId}] failed: ${error.name}${error.message ? ` - ${error.message}` : ""}`,
    );
  });
  await stream.publish("stream part 1", "text");
  await stream.publish({ part: 2, text: "stream part 2" }, "json");
  await stream.complete();

  await delay(200);
  streamSubscription.close();
  client.stop();
  console.log("Client stopped");
}

main().catch((e) => {
  console.error("Sample encountered an error", e);
  process.exit(1);
});

function delay(ms: number): Promise<unknown> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function formatPayload(payload: unknown): string {
  if (payload instanceof ArrayBuffer) {
    return Buffer.from(payload).toString("base64");
  }
  return JSON.stringify(payload);
}
