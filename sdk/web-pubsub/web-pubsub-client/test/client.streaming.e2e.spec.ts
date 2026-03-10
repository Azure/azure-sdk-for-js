// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createServer, type Server as HttpServer } from "node:http";
import type { AddressInfo } from "node:net";
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
  const promise = new Promise<T>((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  return { promise, resolve, reject };
}

function withTimeout<T>(promise: Promise<T>, timeoutInMs: number, message: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(message)), timeoutInMs);
    void (async (): Promise<void> => {
      try {
        const value = await promise;
        clearTimeout(timer);
        resolve(value);
      } catch (err) {
        clearTimeout(timer);
        reject(err);
      }
    })();
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

async function waitForNoServerMessage(socket: WebSocket, timeoutInMs = 300): Promise<void> {
  return withTimeout(
    new Promise<void>((resolve, reject) => {
      const onMessage = (data: unknown): void => {
        socket.off("message", onMessage);
        reject(new Error(`Unexpected client message: ${String(data)}`));
      };

      socket.on("message", onMessage);
      setTimeout(() => {
        socket.off("message", onMessage);
        resolve();
      }, timeoutInMs);
    }),
    timeoutInMs + 200,
    "Timed out while validating no additional client messages.",
  );
}

async function waitForCollectedMessages(
  collected: unknown[],
  expectedCount: number,
  timeoutInMs = 2000,
): Promise<void> {
  await withTimeout(
    new Promise<void>((resolve) => {
      const check = (): void => {
        if (collected.length >= expectedCount) {
          resolve();
          return;
        }
        setTimeout(check, 10);
      };
      check();
    }),
    timeoutInMs,
    `Timed out waiting for ${expectedCount} collected client messages.`,
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

  it("cleans up activeStreamHandlers when endOfStream with error is received", async () => {
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

    const streamErrorViaOnStream = withTimeout(
      new Promise<{ streamId: string; group: string; error: any }>((resolve) => {
        client!.onStream("g1", () => ({
          onError: (args) => {
            resolve({ streamId: args.streamId, group: args.group, error: args.error });
          },
        }));
      }),
      2000,
      "Timed out waiting for endOfStream error to trigger onStream.onError.",
    );

    // First message creates the active handler
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

    // endOfStream message with error triggers onError and cleans up handler
    socket.send(
      JSON.stringify({
        type: "message",
        from: "group",
        group: "g1",
        fromUserId: "u1",
        dataType: "text",
        data: "",
        stream: {
          streamId: "s-closed",
          streamSequenceId: 2,
          endOfStream: true,
          error: { name: "StreamNotFound", message: "not found" },
        },
      }),
    );

    await expect(streamErrorViaOnStream).resolves.toEqual({
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

  it("triggers stream idle timeout on receiver without requiring a new message", async () => {
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

    const timeoutResult = withTimeout(
      new Promise<{ messageCount: number; errorName?: string }>((resolve) => {
        let messageCount = 0;
        client!.onStream(
          "g1",
          () => ({
            onMessage: () => {
              messageCount++;
            },
            onError: (args) => {
              resolve({ messageCount, errorName: args.error?.name });
            },
          }),
          { ttlInMs: 120, handleFromStart: true },
        );
      }),
      2000,
      "Timed out waiting for stream idle timeout callback.",
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
          streamId: "s-timeout-no-new-message",
          streamSequenceId: 1,
          endOfStream: false,
        },
      }),
    );

    await expect(timeoutResult).resolves.toEqual({
      messageCount: 1,
      errorName: "IdleTimeout",
    });
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
        const check = (): void => {
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

  it("fails stream keepalive when disconnected", async () => {
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

    const stream = client.stream("g1", { streamId: "keepalive-best-effort-s1" });
    await stream.publish("chunk-1", "text");
    await waitForCollectedMessages(sent, 2);

    socket.close();
    await new Promise<void>((resolve) => setTimeout(resolve, 50));

    await expect(stream.keepalive()).rejects.toThrow(
      "cannot send keepalive while connection is unavailable",
    );
  });

  it("replays only unacked streamData after recovery reconnect", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: true,
      reconnectRetryOptions: {
        mode: "Fixed",
        retryDelayInMs: 10,
        maxRetryDelayInMs: 10,
      },
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const startPromise = client.start();
    const firstSocket = await waitForSocketConnection(wss);
    firstSocket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn-recovery-1",
        reconnectionToken: "token-recovery-1",
      }),
    );
    await startPromise;

    const firstSent: Record<string, unknown>[] = [];
    firstSocket.on("message", (data) => {
      firstSent.push(JSON.parse(data.toString()) as Record<string, unknown>);
    });

    const stream = client.stream("g1", { streamId: "recovery-replay-s1" });
    await stream.publish("chunk-1", "text");
    await stream.publish("chunk-2", "text");

    await waitForCollectedMessages(firstSent, 3);
    expect(firstSent[0]).toEqual({
      type: "streamStart",
      streamId: "recovery-replay-s1",
      target: "group",
      group: "g1",
    });
    expect(firstSent[1]).toEqual({
      type: "streamData",
      streamId: "recovery-replay-s1",
      streamSequenceId: 1,
      dataType: "text",
      data: "chunk-1",
    });
    expect(firstSent[2]).toEqual({
      type: "streamData",
      streamId: "recovery-replay-s1",
      streamSequenceId: 2,
      dataType: "text",
      data: "chunk-2",
    });

    firstSocket.send(
      JSON.stringify({
        type: "streamAck",
        streamId: "recovery-replay-s1",
        expectedSequenceId: 2,
      }),
    );

    firstSocket.close();

    const secondSocket = await waitForSocketConnection(wss);
    const secondSent: Record<string, unknown>[] = [];
    secondSocket.on("message", (data) => {
      secondSent.push(JSON.parse(data.toString()) as Record<string, unknown>);
    });

    secondSocket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn-recovery-2",
        reconnectionToken: "token-recovery-2",
      }),
    );

    await waitForCollectedMessages(secondSent, 1);
    expect(secondSent[0]).toEqual({
      type: "streamData",
      streamId: "recovery-replay-s1",
      streamSequenceId: 2,
      dataType: "text",
      data: "chunk-2",
    });
    await waitForNoServerMessage(secondSocket);
  });

  it("aborts old stream session after non-recoverable reconnect", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: true,
      reconnectRetryOptions: {
        mode: "Fixed",
        retryDelayInMs: 10,
        maxRetryDelayInMs: 10,
      },
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const startPromise = client.start();
    const firstSocket = await waitForSocketConnection(wss);
    firstSocket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn-restart-1",
        reconnectionToken: "",
      }),
    );
    await startPromise;

    const firstSent: Record<string, unknown>[] = [];
    firstSocket.on("message", (data) => {
      firstSent.push(JSON.parse(data.toString()) as Record<string, unknown>);
    });

    const stream = client.stream("g1", { streamId: "restart-replay-s1" });
    await stream.publish("chunk-1", "text");
    await stream.publish("chunk-2", "text");

    await waitForCollectedMessages(firstSent, 3);
    expect(firstSent[0]).toEqual({
      type: "streamStart",
      streamId: "restart-replay-s1",
      target: "group",
      group: "g1",
    });
    expect(firstSent[1]).toEqual({
      type: "streamData",
      streamId: "restart-replay-s1",
      streamSequenceId: 1,
      dataType: "text",
      data: "chunk-1",
    });
    expect(firstSent[2]).toEqual({
      type: "streamData",
      streamId: "restart-replay-s1",
      streamSequenceId: 2,
      dataType: "text",
      data: "chunk-2",
    });

    firstSocket.send(
      JSON.stringify({
        type: "streamAck",
        streamId: "restart-replay-s1",
        expectedSequenceId: 2,
      }),
    );

    firstSocket.close();

    const secondSocket = await waitForSocketConnection(wss);
    const secondSent: Record<string, unknown>[] = [];
    secondSocket.on("message", (data) => {
      secondSent.push(JSON.parse(data.toString()) as Record<string, unknown>);
    });

    secondSocket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn-restart-2",
        reconnectionToken: "",
      }),
    );

    await waitForNoServerMessage(secondSocket);
    await expect(stream.publish("after-reconnect", "text")).rejects.toThrow("is completed");

    const fresh = client.stream("g1", { streamId: "restart-replay-s2" });
    await fresh.publish("fresh-1", "text");
    await waitForCollectedMessages(secondSent, 2);
    expect(secondSent[0]).toEqual({
      type: "streamStart",
      streamId: "restart-replay-s2",
      target: "group",
      group: "g1",
    });
    expect(secondSent[1]).toEqual({
      type: "streamData",
      streamId: "restart-replay-s2",
      streamSequenceId: 1,
      dataType: "text",
      data: "fresh-1",
    });
    await waitForNoServerMessage(secondSocket);
  });

  it("does not replay streamData after stream is ended", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: true,
      reconnectRetryOptions: {
        mode: "Fixed",
        retryDelayInMs: 10,
        maxRetryDelayInMs: 10,
      },
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const startPromise = client.start();
    const firstSocket = await waitForSocketConnection(wss);
    firstSocket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn-complete-1",
        reconnectionToken: "",
      }),
    );
    await startPromise;

    const firstSent: Record<string, unknown>[] = [];
    firstSocket.on("message", (data) => {
      firstSent.push(JSON.parse(data.toString()) as Record<string, unknown>);
    });

    const stream = client.stream("g1", { streamId: "ended-no-replay-s1" });
    await stream.publish("chunk-1", "text");
    await stream.complete();

    await waitForCollectedMessages(firstSent, 3);
    expect(firstSent[0]).toEqual({
      type: "streamStart",
      streamId: "ended-no-replay-s1",
      target: "group",
      group: "g1",
    });
    expect(firstSent[1]).toEqual({
      type: "streamData",
      streamId: "ended-no-replay-s1",
      streamSequenceId: 1,
      dataType: "text",
      data: "chunk-1",
    });
    expect(firstSent[2]).toEqual({
      type: "streamEnd",
      streamId: "ended-no-replay-s1",
    });

    firstSocket.close();

    const secondSocket = await waitForSocketConnection(wss);
    secondSocket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn-complete-2",
        reconnectionToken: "",
      }),
    );

    await waitForNoServerMessage(secondSocket);
  });

  it("does not skip unacked pending fragments when ack trims buffer during replay", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: true,
      reconnectRetryOptions: {
        mode: "Fixed",
        retryDelayInMs: 10,
        maxRetryDelayInMs: 10,
      },
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const startPromise = client.start();
    const firstSocket = await waitForSocketConnection(wss);
    firstSocket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn-skip-1",
        reconnectionToken: "token-skip-1",
      }),
    );
    await startPromise;

    const stream = client.stream("g1", { streamId: "replay-no-skip-s1" });
    await stream.publish("chunk-1", "text");
    await stream.publish("chunk-2", "text");
    await stream.publish("chunk-3", "text");
    await stream.publish("chunk-4", "text");

    // Leave seq 2/3/4 pending.
    firstSocket.send(
      JSON.stringify({
        type: "streamAck",
        streamId: "replay-no-skip-s1",
        expectedSequenceId: 2,
      }),
    );
    firstSocket.close();

    const secondSocket = await waitForSocketConnection(wss);
    const replayed: Record<string, unknown>[] = [];
    secondSocket.on("message", (data) => {
      const parsed = JSON.parse(data.toString()) as Record<string, unknown>;
      replayed.push(parsed);
      if (
        parsed.type === "streamData" &&
        parsed.streamId === "replay-no-skip-s1" &&
        parsed.streamSequenceId === 2
      ) {
        // Ack seq2 and seq3 while replay loop is in-flight, seq4 must still be replayed.
        secondSocket.send(
          JSON.stringify({
            type: "streamAck",
            streamId: "replay-no-skip-s1",
            expectedSequenceId: 4,
          }),
        );
      }
    });

    secondSocket.send(
      JSON.stringify({
        type: "system",
        event: "connected",
        userId: "user1",
        connectionId: "conn-skip-2",
        reconnectionToken: "token-skip-2",
      }),
    );

    await withTimeout(
      new Promise<void>((resolve, reject) => {
        const check = (): void => {
          const hasSeq4 = replayed.some(
            (m) =>
              m.type === "streamData" &&
              m.streamId === "replay-no-skip-s1" &&
              m.streamSequenceId === 4,
          );
          if (hasSeq4) {
            resolve();
            return;
          }
          if (replayed.length >= 6) {
            reject(new Error("Did not observe replayed seq=4 after in-flight ack trimming."));
            return;
          }
          setTimeout(check, 10);
        };
        check();
      }),
      2000,
      "Timed out waiting for replay seq=4 after in-flight ack trimming.",
    );
  });
});
