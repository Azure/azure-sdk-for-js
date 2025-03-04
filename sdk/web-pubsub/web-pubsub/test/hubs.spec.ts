// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  Recorder,
  isLiveMode,
  assertEnvironmentVariable,
  isPlaybackMode,
  env,
} from "@azure-tools/test-recorder";
import { WebPubSubServiceClient, AzureKeyCredential } from "../src/index.js";
import recorderOptions from "./testEnv.js";
import type { FullOperationResponse, OperationOptions } from "@azure/core-client";
import { createTestCredential } from "@azure-tools/test-credential";
import { describe, it, assert, expect, beforeEach, afterEach, beforeAll } from "vitest";
import { toSupportTracing } from "@azure-tools/test-utils-vitest";
import { parseJwt } from "./testUtils.js";

expect.extend({ toSupportTracing });

describe("HubClient", () => {
  describe("Constructing a HubClient", () => {
    beforeAll(() => {
      if (isPlaybackMode()) {
        env.WPS_CONNECTION_STRING = recorderOptions.envSetupForPlayback.WPS_CONNECTION_STRING;
        env.WPS_ENDPOINT = recorderOptions.envSetupForPlayback.WPS_ENDPOINT;
        env.WPS_API_KEY = recorderOptions.envSetupForPlayback.WPS_API_KEY;
      }
    });
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
          },
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
          },
        );
      });
    });
  });

  describe("Working with a hub", () => {
    let recorder: Recorder;
    let client: WebPubSubServiceClient;
    let lastResponse: FullOperationResponse | undefined;
    const credential = createTestCredential();
    function onResponse(response: FullOperationResponse): void {
      lastResponse = response;
    }
    beforeEach(async (ctx) => {
      recorder = new Recorder(ctx);
      await recorder.start(recorderOptions);

      client = new WebPubSubServiceClient(
        assertEnvironmentVariable("WPS_CONNECTION_STRING"),
        "simplechat",
        recorder.configureClientOptions({}),
      );
    });

    afterEach(async () => {
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

    it("can broadcast with filter", async () => {
      await client.sendToAll("hello", {
        contentType: "text/plain",
        filter: "userId ne 'user1'",
        messageTtlSeconds: 60,
        onResponse,
      });
      assert.equal(lastResponse?.status, 202);

      let error;
      try {
        await client.sendToAll("hello", {
          contentType: "text/plain",
          filter: "invalid filter",
        });
      } catch (e: any) {
        if (e.name !== "RestError") {
          throw e;
        }

        error = e;
      }
      assert.equal(error.statusCode, 400);
      assert.equal(
        JSON.parse(error.message).message,
        "Invalid syntax for 'invalid filter': Syntax error at position 14 in 'invalid filter'. (Parameter 'filter')",
      );
    });

    it("can broadcast using the DAC", async () => {
      const dacClient = new WebPubSubServiceClient(
        assertEnvironmentVariable("WPS_ENDPOINT"),
        credential,
        "simplechat",
        recorder.configureClientOptions({}),
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
        }),
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

    it("can send to a user with filter", async () => {
      await client.sendToUser("vic", "hello", {
        contentType: "text/plain",
        filter: "userId ne 'user1'",
        onResponse,
      });
      assert.equal(lastResponse?.status, 202);

      let error;
      try {
        await client.sendToUser("brian", "hello", {
          contentType: "text/plain",
          filter: "invalid filter",
        });
      } catch (e: any) {
        if (e.name !== "RestError") {
          throw e;
        }

        error = e;
      }
      assert.equal(error.statusCode, 400);
      assert.equal(
        JSON.parse(error.message).message,
        "Invalid syntax for 'invalid filter': Syntax error at position 14 in 'invalid filter'. (Parameter 'filter')",
      );
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

    it("can manage users", async () => {
      const res = await client.userExists("foo");
      assert.ok(!res);
      await client.removeUserFromAllGroups("brian", { onResponse });
      assert.equal(lastResponse?.status, 204);
    });

    it("can manage connections", async () => {
      await client.removeConnectionFromAllGroups("xxx", { onResponse });
      assert.equal(lastResponse?.status, 204);
    });

    // likely bug in recorder for this test - recording not generating properly
    it("can check if a connection exists", { skip: !isLiveMode() }, async () => {
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

    // likely bug in recorder for this test - recording not generating properly
    it("can revoke permissions from connections", { skip: !isLiveMode() }, async () => {
      await client.revokePermission("invalid-id", "joinLeaveGroup", { targetName: "x" });
      // Service doesn't throw error for invalid connection-ids
    });

    it("can trace through the various options", async () => {
      await expect(async (options: OperationOptions) => {
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
      }).toSupportTracing([
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
      ]);
    });

    it("can generate client tokens", async () => {
      const res = await client.getClientAccessToken({
        userId: "brian",
        groups: ["group1"],
      });
      const url = new URL(res.url);
      const tokenPayload = parseJwt(res.token!);
      assert.ok(url.searchParams.has("access_token"));
      assert.equal(url.host, new URL(client.endpoint).host);
      assert.equal(url.pathname, `/client/hubs/${client.hubName}`);
      assert.equal(tokenPayload.aud, client.endpoint + `client/hubs/${client.hubName}`);
    });

    it("can generate default client tokens", async () => {
      const res = await client.getClientAccessToken({
        userId: "brian",
        groups: ["group1"],
        clientProtocol: "default",
      });
      const url = new URL(res.url);
      const tokenPayload = parseJwt(res.token!);
      assert.ok(url.searchParams.has("access_token"));
      assert.equal(url.host, new URL(client.endpoint).host);
      assert.equal(url.pathname, `/client/hubs/${client.hubName}`);
      assert.equal(tokenPayload.aud, client.endpoint + `client/hubs/${client.hubName}`);
    });

    it("can generate client MQTT tokens", async () => {
      const res = await client.getClientAccessToken({
        userId: "brian",
        groups: ["group1"],
        clientProtocol: "mqtt",
      });
      const url = new URL(res.url);
      const tokenPayload = parseJwt(res.token!);
      assert.ok(url.searchParams.has("access_token"));
      assert.equal(url.host, new URL(client.endpoint).host);
      assert.equal(url.pathname, `/clients/mqtt/hubs/${client.hubName}`);
      assert.equal(tokenPayload.aud, client.endpoint + `clients/mqtt/hubs/${client.hubName}`);
    });

    // Recording not generated properly, so only run in live mode
    it("can generate default client tokens with DAC", { skip: !isLiveMode() }, async () => {
      const dacClient = new WebPubSubServiceClient(
        assertEnvironmentVariable("WPS_ENDPOINT"),
        credential,
        "simplechat",
        recorder.configureClientOptions({}),
      );
      const res = await dacClient.getClientAccessToken({
        userId: "brian",
        groups: ["group1"],
        clientProtocol: "default",
      });
      const url = new URL(res.url);
      const tokenPayload = parseJwt(res.token!);
      assert.ok(url.searchParams.has("access_token"));
      assert.equal(url.host, new URL(client.endpoint).host);
      assert.equal(url.pathname, `/client/hubs/${client.hubName}`);
      assert.equal(tokenPayload.aud, client.endpoint + `client/hubs/${client.hubName}`);
    });

    it("can generate client MQTT tokens with DAC", { skip: !isLiveMode() }, async () => {
      const dacClient = new WebPubSubServiceClient(
        assertEnvironmentVariable("WPS_ENDPOINT"),
        credential,
        "simplechat",
        recorder.configureClientOptions({}),
      );
      const res = await dacClient.getClientAccessToken({
        userId: "brian",
        groups: ["group1"],
        clientProtocol: "mqtt",
      });
      const url = new URL(res.url);
      const tokenPayload = parseJwt(res.token!);
      assert.ok(url.searchParams.has("access_token"));
      assert.equal(url.host, new URL(client.endpoint).host);
      assert.equal(url.pathname, `/clients/mqtt/hubs/${client.hubName}`);
      assert.equal(tokenPayload.aud, client.endpoint + `clients/mqtt/hubs/${client.hubName}`);
    });

    it("can generate client socketIO tokens with DAC", { skip: !isLiveMode() }, async () => {
      const dacClient = new WebPubSubServiceClient(
        assertEnvironmentVariable("WPS_SOCKETIO_ENDPOINT"),
        credential,
        "simplechat",
        recorder.configureClientOptions({}),
      );
      const res = await dacClient.getClientAccessToken({
        userId: "brian",
        clientProtocol: "socketio",
      });
      const url = new URL(res.url);
      const tokenPayload = parseJwt(res.token!);
      assert.ok(url.searchParams.has("access_token"));
      assert.equal(url.host, new URL(dacClient.endpoint).host);
      assert.equal(url.pathname, `/clients/socketio/hubs/${dacClient.hubName}`);
      assert.equal(
        tokenPayload.aud,
        dacClient.endpoint + `/clients/socketio/hubs/${dacClient.hubName}`,
      );
    });
  });
});
