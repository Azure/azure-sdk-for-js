// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createServer, type Server as HttpServer } from "node:http";
import { AddressInfo } from "node:net";
import { WebSocketServer, type WebSocket } from "ws";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { WebPubSubClient } from "../src/webPubSubClient.js";

interface Deferred<T> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

function createDeferred<T>(): Deferred<T> {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

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

  it("triggers onMessage then onError when endOfStream frame carries data and error", async () => {
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

    const sequence = withTimeout(
      new Promise<string[]>((resolve) => {
        const order: string[] = [];
        client!.onStream("g1", () => ({
          onMessage: (args) => {
            order.push(`message:${args.data as string}`);
          },
          onError: (args) => {
            order.push(`error:${args.error?.name}`);
            resolve(order);
          },
        }));
      }),
      2000,
      "Timed out waiting for endOfStream error callbacks.",
    );

    socket.send(
      JSON.stringify({
        type: "message",
        from: "group",
        group: "g1",
        fromUserId: "u1",
        dataType: "text",
        data: "final-chunk",
        stream: {
          streamId: "s-err-final",
          streamSequenceId: 1,
          endOfStream: true,
          error: { name: "UserError", message: "failed", userErrorCode: "E1" },
        },
      }),
    );

    await expect(sequence).resolves.toEqual(["message:final-chunk", "error:UserError"]);
  });

  it("triggers onComplete without onMessage when endOfStream frame has empty payload", async () => {
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

    const result = withTimeout(
      new Promise<{ messageCount: number; completed: boolean }>((resolve) => {
        let messageCount = 0;
        client!.onStream("g1", () => ({
          onMessage: () => {
            messageCount++;
          },
          onComplete: () => {
            resolve({ messageCount, completed: true });
          },
        }));
      }),
      2000,
      "Timed out waiting for endOfStream completion callback.",
    );

    socket.send(
      JSON.stringify({
        type: "message",
        from: "group",
        group: "g1",
        fromUserId: "u1",
        dataType: "text",
        data: "",
        stream: {
          streamId: "s-empty-final",
          streamSequenceId: 1,
          endOfStream: true,
        },
      }),
    );

    await expect(result).resolves.toEqual({ messageCount: 0, completed: true });
  });

  it("triggers onMessage then onComplete when endOfStream frame carries json null payload", async () => {
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

    const result = withTimeout(
      new Promise<string[]>((resolve) => {
        const order: string[] = [];
        client!.onStream("g1", () => ({
          onMessage: (args) => {
            order.push(`message:${String(args.data)}`);
          },
          onComplete: () => {
            order.push("complete");
            resolve(order);
          },
        }));
      }),
      2000,
      "Timed out waiting for json null terminal callbacks.",
    );

    socket.send(
      JSON.stringify({
        type: "message",
        from: "group",
        group: "g1",
        fromUserId: "u1",
        dataType: "json",
        data: null,
        stream: {
          streamId: "s-json-null-final",
          streamSequenceId: 1,
          endOfStream: true,
        },
      }),
    );

    await expect(result).resolves.toEqual(["message:null", "complete"]);
  });

  it("supports streamId reuse after ignored late-join stream ends when handleFromStart=false", async () => {
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

    const done = withTimeout(
      new Promise<string>((resolve) => {
        const chunks: string[] = [];
        client!.onStream(
          "g1",
          () => ({
            onMessage: (args) => chunks.push(args.data as string),
            onComplete: () => resolve(chunks.join("")),
          }),
          { handleFromStart: false },
        );
      }),
      3000,
      "Timed out waiting for reused streamId to complete.",
    );

    // First streamId appearance starts late, should be ignored.
    socket.send(
      JSON.stringify({
        type: "message",
        from: "group",
        group: "g1",
        fromUserId: "u1",
        dataType: "text",
        data: "late",
        stream: {
          streamId: "reused-stream",
          streamSequenceId: 5,
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
        data: "late-end",
        stream: {
          streamId: "reused-stream",
          streamSequenceId: 6,
          endOfStream: true,
        },
      }),
    );

    // Same streamId reused from start should now be handled.
    socket.send(
      JSON.stringify({
        type: "message",
        from: "group",
        group: "g1",
        fromUserId: "u1",
        dataType: "text",
        data: "fresh-1",
        stream: {
          streamId: "reused-stream",
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
        data: "fresh-2",
        stream: {
          streamId: "reused-stream",
          streamSequenceId: 2,
          endOfStream: true,
        },
      }),
    );

    await expect(done).resolves.toBe("fresh-1fresh-2");
  });

  it("does not keep ignored state when first late fragment is already endOfStream", async () => {
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

    const done = withTimeout(
      new Promise<string>((resolve) => {
        const chunks: string[] = [];
        client!.onStream(
          "g1",
          () => ({
            onMessage: (args) => chunks.push(args.data as string),
            onComplete: () => resolve(chunks.join("")),
          }),
          { handleFromStart: false },
        );
      }),
      3000,
      "Timed out waiting for stream completion after late terminal fragment.",
    );

    socket.send(
      JSON.stringify({
        type: "message",
        from: "group",
        group: "g1",
        fromUserId: "u1",
        dataType: "text",
        data: "late-terminal",
        stream: {
          streamId: "terminal-reuse-stream",
          streamSequenceId: 9,
          endOfStream: true,
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
        data: "fresh-1",
        stream: {
          streamId: "terminal-reuse-stream",
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
        data: "fresh-2",
        stream: {
          streamId: "terminal-reuse-stream",
          streamSequenceId: 2,
          endOfStream: true,
        },
      }),
    );

    await expect(done).resolves.toBe("fresh-1fresh-2");
  });

  it("supports removing stream publisher onError handler", async () => {
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

    const stream = client.stream("g1", { streamId: "publisher-dispose-s1" });
    let removedHandlerCalled = false;
    const remove = stream.onError(() => {
      removedHandlerCalled = true;
    });
    remove();

    const activeHandlerError = withTimeout(
      new Promise<any>((resolve) => {
        stream.onError((error) => resolve(error));
      }),
      2000,
      "Timed out waiting for active stream onError callback.",
    );

    socket.send(
      JSON.stringify({
        type: "streamNack",
        streamId: "publisher-dispose-s1",
        expectedSequenceId: 1,
        name: "InvalidSequenceId",
        message: "out of order",
      }),
    );

    await expect(activeHandlerError).resolves.toEqual({
      name: "InvalidSequenceId",
      message: "out of order",
    });
    expect(removedHandlerCalled).toBe(false);
  });

  it("stops delivering stream lifecycle callbacks after onStream disposer is called", async () => {
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

    const observedGroupMessage = createDeferred<void>();
    const onGroupMessage = (): void => observedGroupMessage.resolve();
    client.on("group-message", onGroupMessage);

    let invoked = false;
    const dispose = client.onStream("g1", () => ({
      onMessage: () => {
        invoked = true;
      },
      onComplete: () => {
        invoked = true;
      },
      onError: () => {
        invoked = true;
      },
    }));
    dispose();

    socket.send(
      JSON.stringify({
        type: "message",
        from: "group",
        group: "g1",
        fromUserId: "u1",
        dataType: "text",
        data: "chunk-1",
        stream: {
          streamId: "disposed-stream",
          streamSequenceId: 1,
          endOfStream: false,
        },
      }),
    );

    await withTimeout(
      observedGroupMessage.promise,
      2000,
      "Timed out waiting for group message after disposer.",
    );
    client.off("group-message", onGroupMessage);
    expect(invoked).toBe(false);
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
