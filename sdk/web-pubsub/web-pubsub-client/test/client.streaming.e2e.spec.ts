// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createServer, type Server as HttpServer } from "node:http";
import { AddressInfo } from "node:net";
import { WebSocketServer, type WebSocket } from "ws";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { WebPubSubClient } from "../src/webPubSubClient.js";

function withTimeout<T>(promise: Promise<T>, timeoutInMs: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), timeoutInMs);
    promise.then(
      (value) => {
        clearTimeout(timer);
        resolve(value);
      },
      (err) => {
        clearTimeout(timer);
        reject(err);
      },
    );
  });
}

async function waitForSocketConnection(wss: WebSocketServer): Promise<WebSocket> {
  return withTimeout(
    new Promise<WebSocket>((resolve) => {
      wss.once("connection", (socket) => resolve(socket));
    }),
    2000,
    "Timed out waiting for WebSocket connection.",
  );
}

async function waitForServerMessage(socket: WebSocket): Promise<string> {
  return withTimeout(
    new Promise<string>((resolve) => {
      socket.once("message", (data) => resolve(data.toString()));
    }),
    2000,
    "Timed out waiting for client message.",
  );
}

describe("WebPubSubClient streaming e2e compatibility", () => {
  let httpServer: HttpServer;
  let wss: WebSocketServer;
  let client: WebPubSubClient | undefined;
  let port = 0;

  beforeEach(async () => {
    httpServer = createServer();
    wss = new WebSocketServer({ server: httpServer });
    await new Promise<void>((resolve) => httpServer.listen(0, resolve));
    port = (httpServer.address() as AddressInfo).port;
  });

  afterEach(async () => {
    try {
      client?.stop();
    } finally {
      await new Promise<void>((resolve, reject) => {
        wss.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      await new Promise<void>((resolve, reject) => {
        httpServer.close((err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      client = undefined;
    }
  });

  it("handles stream ack/nack internally while keeping normal ack flow", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const startPromise = client.start();
    const socket = await waitForSocketConnection(wss);

    socket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn1",
        reconnectionToken: "token1",
      }),
    );

    await startPromise;

    // Client sends joinGroup and waits for ack.
    const joinPromise = client.joinGroup("g1", { ackId: 101 });
    const joinPayload = JSON.parse(await waitForServerMessage(socket));
    expect(joinPayload).toEqual({ type: "joinGroup", group: "g1", ackId: 101 });

    socket.send(JSON.stringify({ type: "streamAck", streamId: "s1", expectedSequenceId: 2 }));
    socket.send(
      JSON.stringify({
        type: "streamNack",
        streamId: "s1",
        name: "InvalidSequenceId",
        message: "out of order",
        expectedSequenceId: 2,
      }),
    );
    socket.send(
      JSON.stringify({
        type: "streamClosed",
        streamId: "s1",
        error: { name: "StreamNotFound", message: "not found" },
      }),
    );

    // Normal ack path still works.
    socket.send(JSON.stringify({ type: "ack", ackId: 101, success: true }));
    await expect(joinPromise).resolves.toEqual({ ackId: 101, isDuplicated: false });
  });

  it("maps streamClosed to onStream lifecycle callbacks", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const startPromise = client.start();
    const socket = await waitForSocketConnection(wss);
    socket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn1",
        reconnectionToken: "token1",
      }),
    );
    await startPromise;

    const streamClosedViaOnStream = withTimeout(
      new Promise<{ streamId: string; group: string; error: any }>((resolve) => {
        client!.onStream("g1", () => ({
          onError: (args) => {
            resolve({ streamId: args.streamId, group: args.group, error: args.error });
          },
        }));
      }),
      2000,
      "Timed out waiting for streamClosed to trigger onStream.onError.",
    );

    socket.send(
      JSON.stringify({
        type: "message",
        from: "group",
        group: "g1",
        fromUserId: "u1",
        dataType: "text",
        data: "chunk-1",
        stream: {
          streamId: "s-closed",
          streamSequenceId: 1,
          endOfStream: false,
        },
      }),
    );

    socket.send(
      JSON.stringify({
        type: "streamClosed",
        streamId: "s-closed",
        error: { name: "StreamNotFound", message: "not found" },
      }),
    );

    await expect(streamClosedViaOnStream).resolves.toEqual({
      streamId: "s-closed",
      group: "g1",
      error: { name: "StreamNotFound", message: "not found" },
    });
  });

  it("surfaces streamClosed/streamNack to stream publisher onError", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const startPromise = client.start();
    const socket = await waitForSocketConnection(wss);
    socket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn1",
        reconnectionToken: "token1",
      }),
    );
    await startPromise;

    const stream = client.stream("g1", { streamId: "publisher-s1" });

    const firstErrorPromise = withTimeout(
      new Promise<any>((resolve) => {
        stream.onError((error) => resolve(error));
      }),
      2000,
      "Timed out waiting for stream publisher onError callback.",
    );

    socket.send(
      JSON.stringify({
        type: "streamNack",
        streamId: "publisher-s1",
        expectedSequenceId: 1,
        name: "InvalidSequenceId",
        message: "out of order",
      }),
    );

    await expect(firstErrorPromise).resolves.toEqual({
      name: "InvalidSequenceId",
      message: "out of order",
    });

    const secondErrorPromise = withTimeout(
      new Promise<any>((resolve) => {
        stream.onError((error) => resolve(error));
      }),
      2000,
      "Timed out waiting for stream publisher streamClosed callback.",
    );

    socket.send(
      JSON.stringify({
        type: "streamClosed",
        streamId: "publisher-s1",
        error: { name: "StreamNotFound", message: "stream closed" },
      }),
    );

    await expect(secondErrorPromise).resolves.toEqual({
      name: "StreamNotFound",
      message: "stream closed",
    });
  });

  it("provides a user-facing stream handler API for whole-stream processing", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const startPromise = client.start();
    const socket = await waitForSocketConnection(wss);

    socket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn1",
        reconnectionToken: "token1",
      }),
    );

    await startPromise;

    const streamDone = withTimeout(
      new Promise<{ result: string; error?: any }>((resolve) => {
        const chunks: string[] = [];
        client!.onStream(
          "g1",
          () => ({
            onMessage: (args) => {
              chunks.push(args.data as string);
            },
            onComplete: () => {
              resolve({ result: chunks.join("") });
            },
            onError: (args) => {
              resolve({ result: chunks.join(""), error: args.error });
            },
          }),
          { handleFromStart: true, ttlInMs: 2000 },
        );
      }),
      2000,
      "Timed out waiting for stream completion.",
    );

    socket.send(
      JSON.stringify({
        type: "message",
        from: "group",
        group: "g1",
        fromUserId: "u1",
        dataType: "text",
        data: "chunk-1",
        stream: {
          streamId: "s1",
          streamSequenceId: 1,
          endOfStream: false,
        },
      }),
    );
    socket.send(
      JSON.stringify({
        type: "message",
        from: "group",
        group: "g1",
        fromUserId: "u1",
        dataType: "text",
        data: "chunk-2",
        stream: {
          streamId: "s1",
          streamSequenceId: 2,
          endOfStream: true,
        },
      }),
    );

    await expect(streamDone).resolves.toEqual({ result: "chunk-1chunk-2" });
  });

  it("supports handleFromStart=false so late-join fragments can be ignored", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const startPromise = client.start();
    const socket = await waitForSocketConnection(wss);
    socket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn1",
        reconnectionToken: "token1",
      }),
    );
    await startPromise;

    let called = false;
    client.onStream(
      "g1",
      () => ({
        onMessage: () => {
          called = true;
        },
      }),
      { handleFromStart: false },
    );

    socket.send(
      JSON.stringify({
        type: "message",
        from: "group",
        group: "g1",
        fromUserId: "u1",
        dataType: "text",
        data: "late-fragment",
        stream: {
          streamId: "late-stream",
          streamSequenceId: 5,
          endOfStream: false,
        },
      }),
    );

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(called).toBe(false);
  });

  it("sends streamStart, streamData, keepalive and streamEnd payloads via stream publisher", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const startPromise = client.start();
    const socket = await waitForSocketConnection(wss);
    socket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn1",
        reconnectionToken: "token1",
      }),
    );
    await startPromise;

    const sent: any[] = [];
    socket.on("message", (data) => {
      sent.push(JSON.parse(data.toString()));
    });

    const stream = client.stream("g1", { streamId: "s1", idleTimeoutMs: 15000 });
    await stream.publish("chunk-1", "text");
    await stream.keepalive();
    await stream.complete(undefined, undefined, {
      error: { message: "detail", userErrorCode: "app" },
    });

    await withTimeout(
      new Promise<void>((resolve) => {
        const check = () => {
          if (sent.length >= 4) {
            resolve();
            return;
          }
          setTimeout(check, 10);
        };
        check();
      }),
      2000,
      "Timed out waiting for stream publisher payloads.",
    );

    expect(sent[0]).toEqual({
      type: "streamStart",
      streamId: "s1",
      target: "group",
      group: "g1",
      idleTimeoutMs: 15000,
    });
    expect(sent[1]).toEqual({
      type: "streamData",
      streamId: "s1",
      streamSequenceId: 1,
      dataType: "text",
      data: "chunk-1",
    });
    expect(sent[2]).toEqual({
      type: "streamData",
      streamId: "s1",
    });
    expect(sent[3]).toEqual({
      type: "streamEnd",
      streamId: "s1",
      error: { message: "detail", userErrorCode: "app" },
    });
  });
});
