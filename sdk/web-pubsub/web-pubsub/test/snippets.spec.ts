// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureKeyCredential, odata, WebPubSubServiceClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_ConnectionString", async () => {
    const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");
  });

  it("ReadmeSampleCreateClient_KeyCredential", async () => {
    const key = new AzureKeyCredential("<Key>");
    const serviceClient = new WebPubSubServiceClient("<Endpoint>", key, "<hubName>");
  });

  it("ReadmeSampleCreateClient_TokenCredential", async () => {
    const key = new DefaultAzureCredential();
    const serviceClient = new WebPubSubServiceClient("<Endpoint>", key, "<hubName>");
  });

  it("ReadmeSampleGetClientAccessToken", async () => {
    const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");
    // @ts-preserve-whitespace
    // Get the access token for the WebSocket client connection to use
    let token = await serviceClient.getClientAccessToken();
    // @ts-preserve-whitespace
    // Or get the access token and assign the client a userId
    token = await serviceClient.getClientAccessToken({ userId: "user1" });
    // @ts-preserve-whitespace
    // Or get the access token that the client will join group GroupA when it connects using the access token
    token = await serviceClient.getClientAccessToken({ userId: "user1", groups: ["GroupA"] });
    // @ts-preserve-whitespace
    // return the token to the WebSocket client
  });

  it("ReadmeSampleSendToAll", async () => {
    const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");
    // @ts-preserve-whitespace
    // Send a JSON message
    await serviceClient.sendToAll({ message: "Hello world!" });
    // @ts-preserve-whitespace
    // Send a plain text message
    await serviceClient.sendToAll("Hi there!", { contentType: "text/plain" });
    // @ts-preserve-whitespace
    // Send a binary message
    const payload = new Uint8Array(10);
    await serviceClient.sendToAll(payload.buffer);
  });

  it("ReadmeSampleSendToAllWithFilter", async () => {
    const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");
    // @ts-preserve-whitespace
    // Send a JSON message to anonymous connections
    await serviceClient.sendToAll({ message: "Hello world!" }, { filter: "userId eq null" });
    // @ts-preserve-whitespace
    // Send a text message to connections in groupA but not in groupB
    const groupA = "groupA";
    const groupB = "groupB";
    await serviceClient.sendToAll("Hello world!", {
      contentType: "text/plain",
      // use plain text "'groupA' in groups and not('groupB' in groups)"
      // or use the odata helper method
      filter: odata`${groupA} in groups and not(${groupB} in groups)`,
    });
  });

  it("ReadmeSampleSendToGroup", async () => {
    const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");
    // @ts-preserve-whitespace
    const groupClient = serviceClient.group("<groupName>");
    // @ts-preserve-whitespace
    // Add user to the group
    await groupClient.addUser("user1");
    // @ts-preserve-whitespace
    // Send a JSON message
    await groupClient.sendToAll({ message: "Hello world!" });
    // @ts-preserve-whitespace
    // Send a plain text message
    await groupClient.sendToAll("Hi there!", { contentType: "text/plain" });
    // @ts-preserve-whitespace
    // Send a binary message
    const payload = new Uint8Array(10);
    await groupClient.sendToAll(payload.buffer);
  });

  it("ReadmeSampleSendToUser", async () => {
    const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");
    // @ts-preserve-whitespace
    // Send a JSON message
    await serviceClient.sendToUser("user1", { message: "Hello world!" });
    // @ts-preserve-whitespace
    // Send a plain text message
    await serviceClient.sendToUser("user1", "Hi there!", { contentType: "text/plain" });
    // @ts-preserve-whitespace
    // Send a binary message
    const payload = new Uint8Array(10);
    await serviceClient.sendToUser("user1", payload.buffer);
  });

  it("ReadmeSampleCheckGroup", async () => {
    const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");
    // @ts-preserve-whitespace
    const groupClient = serviceClient.group("<groupName>");
    // @ts-preserve-whitespace
    // close all the connections in the group
    await groupClient.closeAllConnections({ reason: "<closeReason>" });
    // @ts-preserve-whitespace
    // check if the group has any connections
    const hasConnections = await serviceClient.groupExists("<groupName>");
  });

  it("ReadmeSampleRawResponse", async () => {
    const serviceClient = new WebPubSubServiceClient("<ConnectionString>", "<hubName>");
    // @ts-preserve-whitespace
    function onResponse(rawResponse) {
      console.log(rawResponse);
    }
    // @ts-preserve-whitespace
    await serviceClient.sendToAll({ message: "Hello world!" }, { onResponse });
  });

  it("ReadmeSampleOdata", async () => {
    const userId = "vic's";
    const anonymous = null;
    const length = 3;
    const filter = odata`userId eq ${anonymous} or userId eq ${userId} or length(userId) > ${length}`;
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
