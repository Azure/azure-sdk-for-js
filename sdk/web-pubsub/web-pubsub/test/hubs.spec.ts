// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
/* eslint-disable no-invalid-this */
import { Recorder, isLiveMode, assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { WebPubSubServiceClient, AzureKeyCredential } from "../src";
import { assert } from "@azure/test-utils";
import recorderOptions from "./testEnv";
import { FullOperationResponse } from "@azure/core-client";
import { createTestCredential } from "@azure-tools/test-credential";
/* eslint-disable @typescript-eslint/no-invalid-this */

describe("HubClient", function () {
  describe("Constructing a HubClient", () => {
    const credential = createTestCredential();
    it("takes a connection string, hub name, and options", () => {
      assert.doesNotThrow(() => {
        new WebPubSubServiceClient(assertEnvironmentVariable("WPS_CONNECTION_STRING"), "test-hub", {
          retryOptions: { maxRetries: 2 },
        });
      });
    });

    it("takes an endpoint, an API key, a hub name, and options", () => {
      assert.doesNotThrow(() => {
        new WebPubSubServiceClient(
          assertEnvironmentVariable("WPS_ENDPOINT"),
          new AzureKeyCredential(assertEnvironmentVariable("WPS_API_KEY")),
          "test-hub",
          {
            retryOptions: { maxRetries: 2 },
          }
        );
      });
    });

    it("takes an endpoint, DefaultAzureCredential, a hub name, and options", () => {
      assert.doesNotThrow(() => {
        new WebPubSubServiceClient(
          assertEnvironmentVariable("WPS_ENDPOINT"),
          credential,
          "test-hub",
          {
            retryOptions: { maxRetries: 2 },
          }
        );
      });
    });
  });

  describe("Working with a hub", function () {
    let recorder: Recorder;
    let client: WebPubSubServiceClient;
    let lastResponse: FullOperationResponse | undefined;
    const credential = createTestCredential();
    function onResponse(response: FullOperationResponse) {
      lastResponse = response;
    }
    beforeEach(async function () {
      recorder = new Recorder(this.currentTest);
      await recorder.start(recorderOptions);

      client = new WebPubSubServiceClient(
        assertEnvironmentVariable("WPS_CONNECTION_STRING"),
        "simplechat",
        recorder.configureClientOptions({})
      );
    });

    afterEach(async function () {
      await recorder.stop();
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
        assertEnvironmentVariable("WPS_ENDPOINT"),
        credential,
        "simplechat",
        recorder.configureClientOptions({})
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
      const apimClient = new WebPubSubServiceClient(
        assertEnvironmentVariable("WPS_CONNECTION_STRING"),
        "simplechat",
        recorder.configureClientOptions({
          reverseProxyEndpoint: assertEnvironmentVariable("WPS_REVERSE_PROXY_ENDPOINT"),
        })
      );

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
        onResponse,
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

    it("can check if a connection exists", async function () {
      // likely bug in recorder for this test - recording not generating properly
      if (!isLiveMode()) this.skip();
      const res = await client.connectionExists("xxx");
      assert.ok(!res);
    });

    it("can grant permissions to connections", async () => {
      let error;
      try {
        await client.grantPermission("xxx", "joinLeaveGroup", { targetName: "x" });
      } catch (e: any) {
        if (e.name !== "RestError") {
          throw e;
        }

        error = e;
      }
      // grantPermission validates connection ids, so we expect an error here.
      assert.equal(error.statusCode, 404);
    });

    it("can revoke permissions from connections", async function () {
      // likely bug in recorder for this test - recording not generating properly
      if (!isLiveMode()) this.skip();
      await client.revokePermission("invalid-id", "joinLeaveGroup", { targetName: "x" });
      // Service doesn't throw error for invalid connection-ids
    });

    it("can trace through the various options", async function () {
      await assert.supportsTracing(
        async (options) => {
          const promises: Promise<any>[] = [
            client.sendToAll("hello", { contentType: "text/plain", onResponse, ...options }),
            client.sendToUser("brian", "hello", {
              contentType: "text/plain",
              onResponse,
              ...options,
            }),
            client.sendToConnection("xxxx", "hello", {
              contentType: "text/plain",
              onResponse,
              ...options,
            }),
            client.connectionExists("xxxx", options),
            client.closeConnection("xxxx", options),
            client.closeAllConnections(options),
            client.closeUserConnections("xxxx", options),
            client.removeUserFromAllGroups("foo", options),
            client.groupExists("foo", options),
            client.userExists("foo", options),
            client.grantPermission("xxxx", "joinLeaveGroup", { targetName: "x", ...options }),
            client.hasPermission("xxxx", "joinLeaveGroup", { targetName: "x", ...options }),
            client.revokePermission("xxxx", "joinLeaveGroup", options),
            client.getClientAccessToken(options),
          ];
          // We don't care about errors, only that we created (and closed) the appropriate spans.
          await Promise.all(promises.map((p) => p.catch(() => undefined)));
        },
        [
          "WebPubSubServiceClient.sendToAll",
          "WebPubSubServiceClient.sendToUser",
          "WebPubSubServiceClient.sendToConnection",
          "WebPubSubServiceClient.connectionExists",
          "WebPubSubServiceClient.closeConnection",
          "WebPubSubServiceClient.closeAllConnections",
          "WebPubSubServiceClient.closeUserConnections",
          "WebPubSubServiceClient.removeUserFromAllGroups",
          "WebPubSubServiceClient.groupExists",
          "WebPubSubServiceClient.userExists",
          "WebPubSubServiceClient.grantPermission",
          "WebPubSubServiceClient.hasPermission",
          "WebPubSubServiceClient.revokePermission",
          "WebPubSubServiceClient.getClientAccessToken",
        ]
      );
    });

    // service API doesn't work yet.
    it.skip("can generate client tokens", async () => {
      await client.getClientAccessToken({
        userId: "brian",
      });
    });
  });
});
