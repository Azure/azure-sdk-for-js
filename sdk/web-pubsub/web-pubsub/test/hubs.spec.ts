// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { env, Recorder, record } from "@azure/test-utils-recorder";
import { HubAdminClient, AzureKeyCredential } from "../src";
import { assert } from "chai";
import environmentSetup from "./testEnv";

describe("HubClient", () => {
  describe("Constructing a HubClient", () => {
    const cred = new AzureKeyCredential(env.WPS_API_KEY);

    it("takes a connection string", () => {
      assert.doesNotThrow(() => {
        new HubAdminClient(env.WPS_CONNECTION_STRING);
      });
    });

    it("takes a connection string and options", () => {
      assert.doesNotThrow(() => {
        new HubAdminClient(env.WPS_CONNECTION_STRING, {
          retryOptions: { maxRetries: 2 }
        });
      });
    });

    it("takes a connection string, hub name, and options", () => {
      assert.doesNotThrow(() => {
        new HubAdminClient(env.WPS_CONNECTION_STRING, "test-hub", {
          retryOptions: { maxRetries: 2 }
        });
      });
    });

    it("takes an endpoint and an API key", () => {
      assert.doesNotThrow(() => {
        new HubAdminClient(env.ENDPOINT as string, cred);
      });
    });

    it("takes an endpoint, an API key, and options", () => {
      assert.doesNotThrow(() => {
        new HubAdminClient(env.ENDPOINT, cred, {
          retryOptions: { maxRetries: 2 }
        });
      });
    });

    it("takes an endpoint, an API key, a hub name, and options", () => {
      assert.doesNotThrow(() => {
        new HubAdminClient(env.ENDPOINT, cred, "test-hub", {
          retryOptions: { maxRetries: 2 }
        });
      });
    });
  });

  describe("Working with a hub", function() {
    let recorder: Recorder;
    let client: HubAdminClient;
    this.timeout(30000);

    beforeEach(function() {
      recorder = record(this, environmentSetup);
      client = new HubAdminClient(env.WPS_CONNECTION_STRING, "simplechat");
    });

    it("can broadcast", async () => {
      let res = await client.broadcast("hello");
      assert.equal(res._response.status, 202);

      const binaryMessage = new Uint8Array(10);
      res = await client.broadcast(binaryMessage.buffer);
      assert.equal(res._response.status, 202);
    });

    it("can send messages to a user", async () => {
      let res = await client.sendToUser("brian", "hello");
      assert.equal(res._response.status, 202);

      const binaryMessage = new Uint8Array(10);
      res = await client.sendToUser("brian", binaryMessage.buffer);
      assert.equal(res._response.status, 202);
    });

    it("can send messages to a connection", async () => {
      let res = await client.sendToConnection("xxxx", "hello");
      assert.equal(res._response.status, 202);

      const binaryMessage = new Uint8Array(10);
      res = await client.sendToConnection("xxxx", binaryMessage.buffer);
      assert.equal(res._response.status, 202);
    });

    it("can manage users", async () => {
      const res = await client.hasUser("foo");
      assert.isFalse(res);

      const res2 = await client.removeUserFromAllGroups("brian");
      assert.equal(res2._response.status, 200);
    });

    it("can check if a connection exists", async () => {
      const res = await client.hasConnection("xxx");
      assert.isFalse(res);
    });

    it("can check if the service is health", async () => {
      const res = await client.isServiceHealthy();
      assert.isTrue(res);
    });

    afterEach(async function() {
      if (recorder) {
        recorder.stop();
      }
    });
  });
});
