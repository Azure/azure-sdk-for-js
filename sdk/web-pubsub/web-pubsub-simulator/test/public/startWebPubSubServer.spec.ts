// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeAll, afterAll, expect } from "vitest";
import { WebSocket } from "ws";
import { startWebPubSubServer } from "../../src/index.js";
import { getAvailablePort } from "../utils/utils.js";
import { getClient } from "@azure-rest/core-client";
import https from "node:https";

describe("WebSocket Server Simulator", () => {
  let server: Awaited<ReturnType<typeof startWebPubSubServer>>;
  let adminClient: ReturnType<typeof getClient>;

  beforeAll(async () => {
    server = await startWebPubSubServer({ port: await getAvailablePort() });
    const agent = new https.Agent({ rejectUnauthorized: false });
    adminClient = getClient(server.httpsUrl, { agent, retryOptions: { maxRetries: 0 } });
  });

  afterAll(() => {
    server.close();
  });

  it("should send a connected message on client connection", () => {
    const ws = new WebSocket(server.webPubSubClientUrl, "json.webpubsub.azure.v1", {
      rejectUnauthorized: false,
    });
    return new Promise<void>((resolve, reject) => {
      ws.on("message", (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.event === "connected") {
          ws.close();
          resolve();
        }
      });
      ws.on("error", (err) => reject(err));
    });
  });

  it("should respond with pong when receiving ping", () => {
    const ws = new WebSocket(server.webPubSubClientUrl, "json.webpubsub.azure.v1", {
      rejectUnauthorized: false,
    });
    return new Promise<void>((resolve, reject) => {
      let connectedReceived = false;
      ws.on("message", (data) => {
        const msg = JSON.parse(data.toString());
        if (!connectedReceived && msg.event === "connected") {
          connectedReceived = true;
          ws.send(JSON.stringify({ type: "ping" }));
        } else if (msg.type === "pong") {
          ws.close();
          resolve();
        }
      });
      ws.on("error", (err) => reject(err));
    });
  });

  it("should force reconnect clients via REST /admin/force-reconnect", async () => {
    const ws = new WebSocket(server.webPubSubClientUrl, "json.webpubsub.azure.v1", {
      rejectUnauthorized: false,
    });

    const connectedPromise = new Promise<void>((resolve, reject) => {
      ws.on("message", (data) => {
        const msg = JSON.parse(data.toString());
        if (msg.event === "connected") {
          ws.close();
          resolve();
        }
      });
      ws.on("error", (err) => reject(err));
    });

    const res = await adminClient.pathUnchecked("/admin/force-reconnect").post();
    expect(res.body.status).toBe("Force reconnect initiated");

    await connectedPromise;
  });

  it("should send a message to clients via REST /admin/send-message", async () => {
    const ws = new WebSocket(server.webPubSubClientUrl, "json.webpubsub.azure.v1", {
      rejectUnauthorized: false,
    });
    const adminMessagePayload = { text: "Hello from admin" };

    const messageReceivedPromise = new Promise<void>((resolve, reject) => {
      ws.on("message", (data) => {
        const msg = JSON.parse(data.toString());
        if (
          msg.type === "message" &&
          msg.from === "server" &&
          msg.dataType === "json" &&
          msg.data &&
          msg.data.text === adminMessagePayload.text
        ) {
          ws.close();
          resolve();
        }
      });
      ws.on("error", (err) => reject(err));
    });

    const res = await adminClient
      .pathUnchecked("/admin/send-message")
      .post({ body: adminMessagePayload, contentType: "application/json" });
    expect(res.body.status).toBe("succeeded");

    await messageReceivedPromise;
  });

  it("should send a reliable message to clients via REST /admin/send-message (reliable protocol)", async () => {
    const ws = new WebSocket(server.webPubSubClientUrl, "json.reliable.webpubsub.azure.v1", {
      rejectUnauthorized: false,
    });
    const adminMessagePayload = { text: "Hello reliable" };

    const messageReceivedPromise = new Promise<void>((resolve, reject) => {
      ws.on("message", (data) => {
        const msg = JSON.parse(data.toString());
        if (
          msg.type === "message" &&
          msg.from === "server" &&
          msg.dataType === "json" &&
          msg.data &&
          msg.data.text === adminMessagePayload.text &&
          typeof msg.sequenceId === "number" &&
          msg.sequenceId > 0
        ) {
          ws.close();
          resolve();
        }
      });
      ws.on("error", (err) => reject(err));
    });

    const res = await adminClient
      .pathUnchecked("/admin/send-message")
      .post({ body: adminMessagePayload, contentType: "application/json" });
    expect(res.body.status).toBe("succeeded");

    await messageReceivedPromise;
  });
});
