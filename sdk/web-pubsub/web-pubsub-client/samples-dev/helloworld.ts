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
  const credential = {
    getClientAccessUrl: fetchClientAccessUrl,
  } as WebPubSubClientCredential;
  const client = new WebPubSubClient(credential, options);
  const streamReceiver = new WebPubSubClient(credential, options);

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

  streamReceiver.on("connected", (e) => {
    console.log(`Stream receiver connection ${e.connectionId} is connected.`);
  });

  streamReceiver.on("disconnected", (e) => {
    console.log(`Stream receiver disconnected: ${e.message}`);
  });

  const groupStreamSubscription = streamReceiver.onGroupStream(
    async (stream) => {
      const receivedParts: string[] = [];
      try {
        for await (const message of stream) {
          receivedParts.push(formatStreamPart(message.data));
          console.log(
            `[stream:${stream.groupName}/${stream.streamId}] seq=${message.stream.streamSequenceId} ${formatPayload(message.data)}`,
          );
        }
        console.log(
          `[stream:${stream.groupName}/${stream.streamId}] completed with ${receivedParts.length} part(s): ${receivedParts.join("")}`,
        );
      } catch (err) {
        const error = err as { name?: string; message?: string };
        console.log(
          `[stream:${stream.groupName}/${stream.streamId}] failed: ${error.name}${error.message ? ` - ${error.message}` : ""}`,
        );
      }
    },
    { handleFromStart: true },
  );
  // Options are scoped to this subscription; their effects (idle
  // timeout, handleFromStart gate) apply independently to each observed stream.

  await client.start();
  await streamReceiver.start();

  await client.joinGroup(groupName);
  await streamReceiver.joinGroup(groupName);
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

  const firstStream = await client.openGroupStream(groupName, { noEcho: true });
  const secondStream = await client.openGroupStream(groupName, { noEcho: true });
  for (const stream of [firstStream, secondStream]) {
    stream.onError((error) => {
      console.log(
        `[stream:${stream.streamId}] failed: ${error.name}${error.message ? ` - ${error.message}` : ""}`,
      );
    });
  }
  await firstStream.write("first stream part 1; ", "text");
  await secondStream.write("second stream part 1; ", "text");
  await firstStream.write("first stream part 2", "text");
  await secondStream.write("second stream part 2", "text");
  await secondStream.end();
  await firstStream.end();

  await delay(1000);
  await groupStreamSubscription.close();
  streamReceiver.stop();
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

function formatStreamPart(payload: unknown): string {
  if (typeof payload === "string") {
    return payload;
  }
  return formatPayload(payload);
}
