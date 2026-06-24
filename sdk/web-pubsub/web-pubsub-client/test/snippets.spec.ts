// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  SendMessageError,
  WebPubSubClient,
  WebPubSubJsonProtocol,
  WebPubSubJsonReliableProtocol,
} from "../src/index.js";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
// @ts-ignore
import express from "express";
import { WebPubSubServiceClient } from "@azure/web-pubsub";

describe("snippets", () => {
  it("ReadmeSampleCreateClient", async () => {
    // Instantiates the client object
    const client = new WebPubSubClient("<client-access-url>");
    // @ts-preserve-whitespace
    // Starts the client connection with your Web PubSub resource
    await client.start();
  });

  it("ReadmeSampleJoinGroups", async () => {
    const client = new WebPubSubClient("<client-access-url>");
    // @ts-preserve-whitespace
    // Registers a listener for the event 'group-message' early before joining a group to not miss messages
    client.on("group-message", (e) => {
      console.log(`Received message: ${e.message.data}`);
    });
    // @ts-preserve-whitespace
    // Starts the client connection with your Web PubSub resource
    await client.start();
    // @ts-preserve-whitespace
    // A client needs to join the group it wishes to receive messages from it
    const groupName = "group1";
    await client.joinGroup(groupName);
  });

  it("ReadmeSampleSendMessage", async () => {
    const client = new WebPubSubClient("<client-access-url>");
    await client.start();
    // @ts-preserve-whitespace
    const groupName = "group1";
    await client.joinGroup(groupName);
    // @ts-preserve-whitespace
    // Send a message to a joined group
    await client.sendToGroup(groupName, "hello world", "text");
  });

  it("ReadmeSampleInvokeEvent", async () => {
    const client = new WebPubSubClient("<client-access-url>");
    await client.start();
    // @ts-preserve-whitespace
    const result = await client.invokeEvent("processOrder", { orderId: 1 }, "json");
    console.log(`Invocation result: ${JSON.stringify(result.data)}`);
  });

  it("ReadmeSampleStreaming", async () => {
    const client = new WebPubSubClient("<client-access-url>");
    // @ts-preserve-whitespace
    // Receiving side: subscribe once, then consume each inbound stream with for-await.
    client.onGroupStream(
      async (stream) => {
        const parts: string[] = [];
        try {
          for await (const message of stream) {
            parts.push(message.data as string);
          }
          console.log(`Stream ${stream.streamId} completed: ${parts.join("")}`);
        } catch (err) {
          console.log(`Stream ${stream.streamId} failed: ${(err as { name?: string }).name}`);
        }
      },
      { handleFromStart: true },
    );
    // @ts-preserve-whitespace
    await client.start();
    const groupName = "group1";
    await client.joinGroup(groupName);
    // @ts-preserve-whitespace
    // Sending side: write a logical stream in ordered fragments, then end it.
    const stream = await client.openGroupStream(groupName);
    await stream.write("hello ", "text");
    await stream.write("world", "text");
    await stream.end();
  });

  it("ReadmeSampleNegotiateServer", async () => {
    const app = express();
    const port = 8080;
    // @ts-preserve-whitespace
    // Imports the server library, which is different from the client library
    const hubName = "sample_chat";
    const serviceClient = new WebPubSubServiceClient("<web-pubsub-connectionstring>", hubName);
    // @ts-preserve-whitespace
    // Note that the token allows the client to join and send messages to any groups. It is specified with the "roles" option.
    app.get("/negotiate", async (_req: unknown, res: { json: (body: { url: string }) => void }) => {
      const token = await serviceClient.getClientAccessToken({
        roles: ["webpubsub.joinLeaveGroup", "webpubsub.sendToGroup"],
      });
      res.json({
        url: token.url,
      });
    });
    // @ts-preserve-whitespace
    app.listen(port, () =>
      console.log(`Application server listening at http://localhost:${port}/negotiate`),
    );
  });

  it("ReadmeSampleNegotiateClient", async () => {
    const client = new WebPubSubClient({
      getClientAccessUrl: async () => {
        const negotiate = await fetch("/negotiate");
        const { url } = (await negotiate.json()) as { url: string };
        return url;
      },
    });
    // @ts-preserve-whitespace
    await client.start();
  });

  it("ReadmeSampleRejoinGroupFailed", async () => {
    // By default autoRejoinGroups=true. You can disable it by setting to false.
    const client = new WebPubSubClient("<client-access-url>", { autoRejoinGroups: true });
    // @ts-preserve-whitespace
    // Registers a listener to handle "rejoin-group-failed" event
    client.on("rejoin-group-failed", (e) => {
      console.log(`Rejoin group ${e.group} failed: ${e.error}`);
    });
  });

  it("ReadmeSampleRetry", async () => {
    const client = new WebPubSubClient("<client-access-url>");
    await client.start();
    // @ts-preserve-whitespace
    const groupName = "group1";
    // @ts-preserve-whitespace
    try {
      await client.joinGroup(groupName);
    } catch (err) {
      let id: number | undefined;
      if (err instanceof SendMessageError) {
        id = err.ackId;
      }
      await client.joinGroup(groupName, { ackId: id });
    }
  });

  it("ReadmeSampleSubprotocol", async () => {
    // Change to use json.webpubsub.azure.v1
    const client = new WebPubSubClient("<client-access-url>", {
      protocol: WebPubSubJsonProtocol(),
    });
  });

  it("ReadmeSampleSubprotocolReliable", async () => {
    // Change to use json.reliable.webpubsub.azure.v1
    const client = new WebPubSubClient("<client-access-url>", {
      protocol: WebPubSubJsonReliableProtocol(),
    });
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
