// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { env, Recorder, record, isLiveMode } from "@azure-tools/test-recorder";
import { WebPubSubServiceClient, AzureKeyCredential } from "../src";
import { assert } from "chai";
import environmentSetup from "./testEnv";
import { FullOperationResponse } from "@azure/core-client";
import { DefaultAzureCredential } from "@azure/identity";
/* eslint-disable @typescript-eslint/no-invalid-this */

describe("HubClient", function() {
  let recorder: Recorder;
  beforeEach(function() {
    recorder = record(this, environmentSetup);
  });

  afterEach(async function() {
    if (recorder) {
      await recorder.stop();
    }
  });

  describe("Constructing a HubClient", () => {
    it("takes a connection string, hub name, and options", () => {
      assert.doesNotThrow(() => {
        new WebPubSubServiceClient(env.WPS_CONNECTION_STRING, "test-hub", {
          retryOptions: { maxRetries: 2 }
        });
      });
    });

    it("takes an endpoint, an API key, a hub name, and options", () => {
      assert.doesNotThrow(() => {
        new WebPubSubServiceClient(
          env.ENDPOINT,
          new AzureKeyCredential(env.WPS_API_KEY),
          "test-hub",
          {
            retryOptions: { maxRetries: 2 }
          }
        );
      });
    });

    it("takes an endpoint, DefaultAzureCredential, a hub name, and options", () => {
      assert.doesNotThrow(() => {
        new WebPubSubServiceClient(env.ENDPOINT, new DefaultAzureCredential(), "test-hub", {
          retryOptions: { maxRetries: 2 }
        });
      });
    });
  });

  describe("Working with a hub", function() {
    let client: WebPubSubServiceClient;
    let lastResponse: FullOperationResponse | undefined;
    function onResponse(response: FullOperationResponse) {
      lastResponse = response;
    }
    beforeEach(function() {
      client = new WebPubSubServiceClient(env.WPS_CONNECTION_STRING, "simplechat");
    });

    it("can broadcast", async () => {
      await client.sendToAll("hello", { contentType: "text/plain", onResponse });
      assert.equal(lastResponse?.status, 202);

      await client.sendToAll({ x: 1, y: 2 }, { onResponse });
      assert.equal(lastResponse?.status, 202);

      const binaryMessage = new Uint8Array(10);
      await client.sendToAll(binaryMessage.buffer, { onResponse });
      assert.equal(lastResponse?.status, 202);
    });

    it("can broadcast using the DAC", async () => {
      const dacClient = new WebPubSubServiceClient(
        env.ENDPOINT,
        new DefaultAzureCredential(),
        "simplechat"
      );

      await dacClient.sendToAll("hello", { contentType: "text/plain", onResponse });
      assert.equal(lastResponse?.status, 202);

      await dacClient.sendToAll({ x: 1, y: 2 }, { onResponse });
      assert.equal(lastResponse?.status, 202);

      const binaryMessage = new Uint8Array(10);
      await dacClient.sendToAll(binaryMessage.buffer, { onResponse });
      assert.equal(lastResponse?.status, 202);
    });

    it("can broadcast using APIM", async () => {
      const apimClient = new WebPubSubServiceClient(env.WPS_CONNECTION_STRING, "simplechat", {
        reverseProxyEndpoint: env.REVERSE_PROXY_ENDPOINT
      });

      await apimClient.sendToAll("hello", { contentType: "text/plain", onResponse });
      assert.equal(lastResponse?.status, 202);

      await apimClient.sendToAll({ x: 1, y: 2 }, { onResponse });
      assert.equal(lastResponse?.status, 202);

      const binaryMessage = new Uint8Array(10);
      await apimClient.sendToAll(binaryMessage.buffer, { onResponse });
      assert.equal(lastResponse?.status, 202);
    });

    it("can send messages to a user", async () => {
      await client.sendToUser("brian", "hello", {
        contentType: "text/plain",
        onResponse
      });
      assert.equal(lastResponse?.status, 202);

      await client.sendToUser("brian", { x: 1, y: 2 }, { onResponse });
      assert.equal(lastResponse?.status, 202);

      const binaryMessage = new Uint8Array(10);
      await client.sendToUser("brian", binaryMessage.buffer, { onResponse });
      assert.equal(lastResponse?.status, 202);
    });

    it("can send messages to a connection", async () => {
      await client.sendToConnection("xxxx", "hello", { contentType: "text/plain", onResponse });
      assert.equal(lastResponse?.status, 202);

      await client.sendToConnection("xxxx", { x: 1, y: 2 }, { onResponse });
      assert.equal(lastResponse?.status, 202);
      const binaryMessage = new Uint8Array(10);

      await client.sendToConnection("xxxx", binaryMessage.buffer, { onResponse });
      assert.equal(lastResponse?.status, 202);
    });

    // `removeUserFromAllGroups` always times out.
    it.skip("can manage users", async () => {
      this.timeout(Infinity);
      const res = await client.userExists("foo");
      assert.ok(!res);
      await client.removeUserFromAllGroups("brian", { onResponse });
      assert.equal(lastResponse?.status, 200);
    });

    it("can check if a connection exists", async function() {
      // likely bug in recorder for this test - recording not generating properly
      if (!isLiveMode()) this.skip();
      const res = await client.connectionExists("xxx");
      assert.ok(!res);
    });

    it("can grant permissions to connections", async () => {
      let error;
      try {
        await client.grantPermission("xxx", "joinLeaveGroup", { targetName: "x" });
      } catch (e) {
        error = e;
      }
      // grantPermission validates connection ids, so we expect an error here.
      assert.equal(error.statusCode, 404);
    });

    it("can revoke permissions from connections", async function() {
      // likely bug in recorder for this test - recording not generating properly
      if (!isLiveMode()) this.skip();
      let error;
      try {
        await client.revokePermission("xxx", "joinLeaveGroup", { targetName: "x" });
      } catch (e) {
        error = e;
      }
      // grantPermission validates connection ids, so we expect an error here.
      assert.equal(error.statusCode, 404);
    });

    // service API doesn't work yet.
    it.skip("can generate client tokens", async () => {
      await client.getClientAccessToken({
        userId: "brian"
      });
    });
  });
});
