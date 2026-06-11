// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Basic usage of web-pubsub-client
 */

import type {
  WebPubSubClientCredential,
  GetClientAccessUrlOptions,
  WebPubSubClientOptions,
  OnGroupStreamArgs,
  GroupStreamHandler,
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

  const groupStreamFactory = (stream: OnGroupStreamArgs): GroupStreamHandler => {
    const receivedParts: string[] = [];

    return {
      onMessage: (args) => {
        receivedParts.push(formatStreamPart(args.data));

        console.log(
          `[stream:${stream.group}/${stream.streamId}] seq=${args.stream.streamSequenceId} ${formatPayload(args.data)}`,
        );
      },
      onComplete: () => {
        console.log(
          `[stream:${stream.group}/${stream.streamId}] completed with ${receivedParts.length} part(s): ${receivedParts.join("")}`,
        );
      },
      onError: (args) => {
        console.log(
          `[stream:${stream.group}/${stream.streamId}] failed: ${args.error?.name}${args.error?.message ? ` - ${args.error.message}` : ""}`,
        );
      },
    };
  };
  // Options are scoped to this registration (per handler); their effects (idle
  // timeout, handleFromStart gate) apply independently to each observed stream.
  streamReceiver.onGroupStream(groupStreamFactory, { handleFromStart: true });

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

  const firstStream = await client.streamToGroup(groupName, {
    noEcho: true,
    streamId: "sample-stream-1",
  });
  const secondStream = await client.streamToGroup(groupName, {
    noEcho: true,
    streamId: "sample-stream-2",
  });
  for (const publisher of [firstStream, secondStream]) {
    publisher.onError((error) => {
      console.log(
        `[publisher:${publisher.streamId}] failed: ${error.name}${error.message ? ` - ${error.message}` : ""}`,
      );
    });
  }
  await firstStream.publish("first stream part 1; ", "text");
  await secondStream.publish("second stream part 1; ", "text");
  await firstStream.publish("first stream part 2", "text");
  await secondStream.publish("second stream part 2", "text");
  await secondStream.complete();
  await firstStream.complete();

  await delay(1000);
  streamReceiver.offGroupStream(groupStreamFactory);
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
