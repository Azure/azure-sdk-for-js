// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { env, Recorder, record } from "@azure/test-utils-recorder";
import { WebPubSubServiceClient, AzureKeyCredential } from "../src";
import * as assert from "assert";
import environmentSetup from "./testEnv";

describe("HubClient", () => {
  describe("Constructing a HubClient", () => {
    const cred = new AzureKeyCredential(env.WPS_API_KEY);

    it("takes a connection string, hub name, and options", () => {
      assert.doesNotThrow(() => {
        new WebPubSubServiceClient(env.WPS_CONNECTION_STRING, "test-hub", {
          retryOptions: { maxRetries: 2 }
        });
      });
    });

    it("takes an endpoint, an API key, a hub name, and options", () => {
      assert.doesNotThrow(() => {
        new WebPubSubServiceClient(env.ENDPOINT, cred, "test-hub", {
          retryOptions: { maxRetries: 2 }
        });
      });
    });
  });

  describe("Working with a hub", function() {
    let recorder: Recorder;
    let client: WebPubSubServiceClient;
    this.timeout(30000);

    beforeEach(function() {
      recorder = record(this, environmentSetup);
      client = new WebPubSubServiceClient(env.WPS_CONNECTION_STRING, "simplechat");
    });

    it("can broadcast", async () => {
      let res = await client.sendToAll("hello", { contentType: "text/plain" });
      assert.equal(res._response.status, 202);

      res = await client.sendToAll({ x: 1, y: 2 });
      assert.equal(res._response.status, 202);

      const binaryMessage = new Uint8Array(10);
      res = await client.sendToAll(binaryMessage.buffer);
      assert.equal(res._response.status, 202);
    });

    it("can send messages to a user", async () => {
      let res = await client.sendToUser("brian", "hello", { contentType: "text/plain" });
      assert.equal(res._response.status, 202);

      res = await client.sendToUser("brian", { x: 1, y: 2 });
      assert.equal(res._response.status, 202);

      const binaryMessage = new Uint8Array(10);
      res = await client.sendToUser("brian", binaryMessage.buffer);
      assert.equal(res._response.status, 202);
    });

    it("can send messages to a connection", async () => {
      let res = await client.sendToConnection("xxxx", "hello", { contentType: "text/plain" });
      assert.equal(res._response.status, 202);

      res = await client.sendToConnection("xxxx", { x: 1, y: 2 });
      assert.equal(res._response.status, 202);
      const binaryMessage = new Uint8Array(10);

      res = await client.sendToConnection("xxxx", binaryMessage.buffer);
      assert.equal(res._response.status, 202);
    });

    it("can manage users", async () => {
      const res = await client.hasUser("foo");
      assert.ok(!res);

      const res2 = await client.removeUserFromAllGroups("brian");
      assert.equal(res2._response.status, 200);
    });

    it("can check if a connection exists", async () => {
      const res = await client.hasConnection("xxx");
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

    it("can revoke permissions from connections", async () => {
      let error;
      try {
        await client.revokePermission("xxx", "joinLeaveGroup", { targetName: "x" });
      } catch (e) {
        error = e;
      }
      // grantPermission validates connection ids, so we expect an error here.
      assert.equal(error.statusCode, 404);
    });

    afterEach(async function() {
      if (recorder) {
        recorder.stop();
      }
    });
  });
});
