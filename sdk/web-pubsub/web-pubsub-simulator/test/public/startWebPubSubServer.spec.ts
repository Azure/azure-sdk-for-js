// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, beforeAll, afterAll, expect } from "vitest";
import { WebSocket } from "ws";
import { startWebPubSubServer } from "../../src/index.js";
import { getAvailablePort } from "../utils/utils.js";
import { getClient } from "@azure-rest/core-client";
import https from "node:https";

/**
 * Waits for a WebSocket event message that satisfies the given predicate.
 * @param ws - The WebSocket instance.
 * @param predicate - A function that returns true if the received message matches our criteria.
 */
function waitForEvent(ws: WebSocket, predicate: (msg: any) => boolean): Promise<any> {
  return new Promise((resolve, reject) => {
    const handler = (data: any): void => {
      try {
        const msg = JSON.parse(data.toString());
        if (predicate(msg)) {
          ws.removeListener("message", handler);
          resolve(msg);
        }
      } catch (err) {
        reject(err);
      }
    };
    ws.on("message", handler);
    ws.on("error", reject);
  });
}

/**
 * Creates a connected WebSocket client.
 * @param url - The URL to connect to.
 * @param protocol - The sub-protocol, for example "json.webpubsub.azure.v1".
 * @returns A promise that resolves with the WebSocket and connectionId (if available).
 */
async function createConnectedClient(
  url: string,
  protocol: string,
): Promise<{ ws: WebSocket; connectionId?: string }> {
  const ws = new WebSocket(url, protocol, { rejectUnauthorized: false });
  const connectedMsg = await waitForEvent(ws, (msg) => msg.event === "connected");
  return { ws, connectionId: connectedMsg.connectionId };
}

/**
 * Joins the given group using a WebSocket client.
 * @param ws - The WebSocket instance.
 * @param groupName - The name of the group to join.
 */
function joinGroup(ws: WebSocket, groupName: string): Promise<void> {
  ws.send(JSON.stringify({ type: "joinGroup", group: groupName, ackId: 1 }));
  return waitForEvent(ws, (msg) => msg.type === "ack" && msg.success);
}

describe("WebSocket Server Simulator", () => {
  let server: Awaited<ReturnType<typeof startWebPubSubServer>>;
  let restClient: ReturnType<typeof getClient>;
  let url: string;
  const testHub = "testhub";
  const apiVersion = "1";

  beforeAll(async () => {
    server = await startWebPubSubServer({ port: await getAvailablePort(), hubs: [testHub] });
    const agent = new https.Agent({ rejectUnauthorized: false });
    restClient = getClient(server.httpsUrl, { agent, retryOptions: { maxRetries: 0 } });
    url = `${server.webPubSubClientUrl}/client/hubs/${testHub}?access_token=dummy_val`;
  });

  afterAll(() => {
    server.close();
  });

  it("should send a connected message on client connection", async () => {
    const { ws } = await createConnectedClient(url, "json.webpubsub.azure.v1");
    ws.close();
  });

  it("should respond with pong when receiving ping", async () => {
    const { ws } = await createConnectedClient(url, "json.webpubsub.azure.v1");
    ws.send(JSON.stringify({ type: "ping" }));
    const pongMsg = await waitForEvent(ws, (msg) => msg.type === "pong");
    expect(pongMsg.type).toBe("pong");
    ws.close();
  });

  it("should force reconnect clients via REST /admin/force-reconnect", async () => {
    const { ws } = await createConnectedClient(url, "json.webpubsub.azure.v1");
    const connectedPromise = waitForEvent(ws, (msg) => msg.event === "connected");
    const res = await restClient.pathUnchecked("/admin/force-reconnect").post();
    expect(res.body.status).toBe("Force reconnect initiated");
    await connectedPromise;
    ws.close();
  });

  it("should send a message to clients via REST /api/hubs/:hub/:send", async () => {
    const { ws } = await createConnectedClient(url, "json.webpubsub.azure.v1");
    const payload = { message: "Hello from admin" };
    const messagePromise = waitForEvent(
      ws,
      (msg) =>
        msg.type === "message" &&
        msg.from === "server" &&
        msg.dataType === "json" &&
        msg.data === payload.message,
    );
    const res = await restClient
      .pathUnchecked(`/api/hubs/${testHub}/:send?api-version=${apiVersion}`)
      .post({ body: payload, contentType: "application/json" });
    expect(res.status).toBe("202");
    await messagePromise;
    ws.close();
  });

  it("should send a reliable message to clients via REST /api/hubs/:hub/:send (reliable protocol)", async () => {
    const { ws } = await createConnectedClient(url, "json.reliable.webpubsub.azure.v1");
    const payload = { message: "Hello reliable" };
    const messagePromise = waitForEvent(
      ws,
      (msg) =>
        msg.type === "message" &&
        msg.from === "server" &&
        msg.dataType === "json" &&
        msg.data === payload.message &&
        typeof msg.sequenceId === "number" &&
        msg.sequenceId > 0,
    );
    const res = await restClient
      .pathUnchecked(`/api/hubs/${testHub}/:send?api-version=${apiVersion}`)
      .post({ body: payload, contentType: "application/json" });
    expect(res.status).toBe("202");
    await messagePromise;
    ws.close();
  });

  it("should generate a token for a hub via REST /api/hubs/:hub/:generateToken", async () => {
    const res = await restClient
      .pathUnchecked(`/api/hubs/${testHub}/:generateToken?api-version=${apiVersion}`)
      .post();
    expect(res.body.token).toBeDefined();
    expect(res.body.token).toContain(`dummy-token-for-${testHub}-`);
  });

  it("should send a message to a specific connection via REST /api/hubs/:hub/connections/:connectionId/:send", async () => {
    const { ws, connectionId } = await createConnectedClient(url, "json.webpubsub.azure.v1");
    if (!connectionId) throw new Error("Connection ID not received");
    const payload = { message: "Direct message to connection" };
    const restUrl = `/api/hubs/${testHub}/connections/${connectionId}/:send?api-version=${apiVersion}`;
    const res = await restClient
      .pathUnchecked(restUrl)
      .post({ body: payload, contentType: "application/json" });
    expect(res.status).toBe("202");
    await waitForEvent(
      ws,
      (msg) => msg.type === "message" && msg.from === "server" && msg.data === payload.message,
    );
    ws.close();
  });

  it("should send a message to a group via REST /api/hubs/:hub/groups/:group/:send", async () => {
    const { ws } = await createConnectedClient(url, "json.webpubsub.azure.v1");
    const groupName = "testGroup";
    const payload = { message: "Hello group" };

    await joinGroup(ws, groupName);
    const restUrl = `/api/hubs/${testHub}/groups/${groupName}/\\:send?api-version=${apiVersion}`;
    const res = await restClient
      .pathUnchecked(restUrl)
      .post({ body: payload, contentType: "application/json" });
    expect(res.status).toBe("202");
    await waitForEvent(
      ws,
      (msg) => msg.type === "message" && msg.from === "server" && msg.data === payload.message,
    );
    ws.close();
  });

  it("should close connections via REST /api/hubs/:hub/:closeConnections", async () => {
    const { ws } = await createConnectedClient(url, "json.webpubsub.azure.v1");
    const reason = "Maintenance";
    const closeUrl = `/api/hubs/${testHub}/:closeConnections?api-version=${apiVersion}&reason=${encodeURIComponent(reason)}`;
    const res = await restClient.pathUnchecked(closeUrl).post();
    expect(res.status).toBe("204");
    await new Promise<void>((resolve, reject) => {
      ws.on("close", resolve);
      ws.on("error", reject);
    });
  });

  it("should delete a connection via REST DELETE /api/hubs/:hub/connections/:connectionId", async () => {
    const { ws, connectionId } = await createConnectedClient(url, "json.webpubsub.azure.v1");
    if (!connectionId) throw new Error("Connection ID not received");
    const reason = "Testing deletion";
    const deleteUrl = `/api/hubs/${testHub}/connections/${connectionId}?api-version=${apiVersion}&reason=${encodeURIComponent(reason)}`;
    const res = await restClient.pathUnchecked(deleteUrl).delete();
    expect(res.status).toBe("204");
    await new Promise<void>((resolve, reject) => {
      ws.on("close", resolve);
      ws.on("error", reject);
    });
  });

  it("should close group connections via REST /api/hubs/:hub/groups/:group/:closeConnections", async () => {
    const { ws } = await createConnectedClient(url, "json.webpubsub.azure.v1");
    const groupName = "closeGroupTest";
    await joinGroup(ws, groupName);
    const reason = "Group maintenance";
    const restUrl = `/api/hubs/${testHub}/groups/${groupName}/:closeConnections?api-version=${apiVersion}&reason=${encodeURIComponent(reason)}`;
    const res = await restClient.pathUnchecked(restUrl).post();
    expect(res.status).toBe("204");
    await new Promise<void>((resolve, reject) => {
      ws.on("close", resolve);
      ws.on("error", reject);
    });
  });
});
