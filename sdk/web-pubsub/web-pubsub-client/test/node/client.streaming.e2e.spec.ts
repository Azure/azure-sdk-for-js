// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createServer, type Server as HttpServer } from "node:http";
import type { AddressInfo } from "node:net";
import { WebSocketServer, type WebSocket } from "ws";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { WebPubSubClient } from "../../src/webPubSubClient.js";
import type { OnGroupStreamArgs, GroupStreamHandler } from "../../src/models/index.js";
import { createDeferred, withTimeout } from "../testUtils.js";

async function waitForSocketConnection(wss: WebSocketServer): Promise<WebSocket> {
  return withTimeout(
    new Promise<WebSocket>((resolve) => {
      wss.once("connection", (socket) => resolve(socket));
    }),
    2000,
    "Timed out waiting for WebSocket connection.",
  );
}

interface ConnectOptions {
  userId?: string;
  connectionId?: string;
  reconnectionToken?: string;
}

interface StreamErrorPayload {
  name: string;
  message?: string;
  userErrorCode?: string;
}

interface GroupStreamMessageOptions {
  group?: string;
  fromUserId?: string;
  dataType?: "text" | "json" | "binary" | "protobuf";
  data: unknown;
  streamId: string;
  streamSequenceId: number;
  endOfStream: boolean;
  error?: StreamErrorPayload;
}

function sendJson(socket: WebSocket, payload: Record<string, unknown>): void {
  socket.send(JSON.stringify(payload));
}

function sendSystemConnected(socket: WebSocket, options?: ConnectOptions): void {
  sendJson(socket, {
    type: "system",
    event: "connected",
    userId: options?.userId ?? "user1",
    connectionId: options?.connectionId ?? "conn1",
    reconnectionToken: options?.reconnectionToken ?? "token1",
  });
}

function sendAck(socket: WebSocket, ackId: number, success = true): void {
  sendJson(socket, { type: "ack", ackId, success });
}

function sendStreamAck(socket: WebSocket, streamId: string, expectedSequenceId: number): void {
  sendJson(socket, { type: "streamAck", streamId, expectedSequenceId });
}

function sendStreamNack(
  socket: WebSocket,
  options: {
    streamId: string;
    expectedSequenceId: number;
    name: string;
    message?: string;
  },
): void {
  sendJson(socket, {
    type: "streamNack",
    streamId: options.streamId,
    expectedSequenceId: options.expectedSequenceId,
    name: options.name,
    message: options.message,
  });
}

function sendStreamClosed(socket: WebSocket, streamId: string, error?: StreamErrorPayload): void {
  if (error == null) {
    sendJson(socket, { type: "streamClosed", streamId });
    return;
  }
  sendJson(socket, { type: "streamClosed", streamId, error });
}

function sendGroupStreamMessage(socket: WebSocket, options: GroupStreamMessageOptions): void {
  sendJson(socket, {
    type: "message",
    from: "group",
    group: options.group ?? "g1",
    fromUserId: options.fromUserId ?? "u1",
    dataType: options.dataType ?? "text",
    data: options.data,
    stream: {
      streamId: options.streamId,
      streamSequenceId: options.streamSequenceId,
      endOfStream: options.endOfStream,
      error: options.error,
    },
  });
}

async function startClientAndConnect(
  client: WebPubSubClient,
  wss: WebSocketServer,
  options?: ConnectOptions,
): Promise<WebSocket> {
  const startPromise = client.start();
  const socket = await acceptSocketAndSendConnected(wss, options);
  await startPromise;
  return socket;
}

async function acceptSocketAndSendConnected(
  wss: WebSocketServer,
  options?: ConnectOptions,
): Promise<WebSocket> {
  const socket = await waitForSocketConnection(wss);
  sendSystemConnected(socket, options);
  return socket;
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

function enableAutoStartAck(socket: WebSocket): void {
  socket.on("message", (data) => {
    try {
      const parsed = JSON.parse(data.toString()) as {
        type?: string;
        stream?: { streamId?: string };
      };
      if (parsed.type === "sendToGroup" && typeof parsed.stream?.streamId === "string") {
        sendStreamAck(socket, parsed.stream.streamId, 1);
      }
    } catch {
      /** empty */
    }
  });
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

    const socket = await startClientAndConnect(client, wss);

    // Client sends joinGroup and waits for ack.
    const joinPromise = client.joinGroup("g1", { ackId: 101 });
    const joinPayload = JSON.parse(await waitForServerMessage(socket));
    expect(joinPayload).toEqual({ type: "joinGroup", group: "g1", ackId: 101 });

    sendStreamAck(socket, "s1", 2);
    sendStreamNack(socket, {
      streamId: "s1",
      expectedSequenceId: 2,
      name: "ProtocolViolation",
      message: "out of order",
    });
    sendStreamClosed(socket, "s1", { name: "StreamNotFound", message: "not found" });

    // Normal ack path still works.
    sendAck(socket, 101);
    await expect(joinPromise).resolves.toEqual({ ackId: 101, isDuplicated: false });
  });

  it("cleans up activeStreamHandlers when endOfStream with error is received", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    const streamErrorViaGroupStream = withTimeout(
      new Promise<{ streamId: string; group: string; error: any }>((resolve) => {
        client!.onGroupStream(
          (_stream): GroupStreamHandler => ({
            onError: (args) => {
              resolve({ streamId: args.streamId, group: args.group, error: args.error });
            },
          }),
        );
      }),
      2000,
      "Timed out waiting for endOfStream error to trigger group-stream onError.",
    );

    // First message creates the active handler
    sendGroupStreamMessage(socket, {
      streamId: "s-closed",
      streamSequenceId: 1,
      endOfStream: false,
      data: "chunk-1",
    });

    // endOfStream message with error triggers onError and cleans up handler
    sendGroupStreamMessage(socket, {
      streamId: "s-closed",
      streamSequenceId: 2,
      endOfStream: true,
      data: "",
      error: { name: "StreamNotFound", message: "not found" },
    });

    await expect(streamErrorViaGroupStream).resolves.toEqual({
      streamId: "s-closed",
      group: "g1",
      error: { name: "StreamNotFound", message: "not found" },
    });
  });

  it("surfaces streamClosed to group stream onError while keeping streamNack internal", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    enableAutoStartAck(socket);
    const stream = await client.openGroupStream("g1", { streamId: "stream-s1" });
    const receivedErrors: Array<{ name: string; message?: string }> = [];
    const streamClosedError = createDeferred<{ name: string; message?: string }>();
    stream.onError((error) => {
      receivedErrors.push(error);
      if (receivedErrors.length === 1) {
        streamClosedError.resolve(error);
      }
    });

    sendStreamNack(socket, {
      streamId: "stream-s1",
      expectedSequenceId: 1,
      name: "ProtocolViolation",
      message: "out of order",
    });
    await new Promise<void>((resolve) => setTimeout(resolve, 50));
    expect(receivedErrors).toEqual([]);

    sendStreamClosed(socket, "stream-s1", { name: "StreamNotFound", message: "stream closed" });

    await expect(
      withTimeout(
        streamClosedError.promise,
        2000,
        "Timed out waiting for group stream streamClosed callback.",
      ),
    ).resolves.toEqual({
      name: "StreamNotFound",
      message: "stream closed",
    });
  });

  it("closes outbound stream and sends streamEnd when service sends invalid streamAck", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);
    const sent: Record<string, unknown>[] = [];
    socket.on("message", (data) => {
      sent.push(JSON.parse(data.toString()) as Record<string, unknown>);
    });

    enableAutoStartAck(socket);
    const stream = await client.openGroupStream("g1", { streamId: "invalid-ack-s1" });
    const protocolError = createDeferred<{ name: string; message?: string }>();
    stream.onError((error) => {
      protocolError.resolve(error);
    });

    sendStreamAck(socket, "invalid-ack-s1", 999);

    await waitForCollectedMessages(sent, 2);
    expect(sent[0]).toEqual({
      type: "sendToGroup",
      group: "g1",
      noEcho: false,
      stream: {
        streamId: "invalid-ack-s1",
      },
    });
    expect(sent[1]).toEqual({
      type: "streamEnd",
      streamId: "invalid-ack-s1",
      error: {
        message: "Invalid sequence id 999 for ack. Expected range [1, 1].",
        userErrorCode: "ProtocolViolation",
      },
    });

    await expect(
      withTimeout(
        protocolError.promise,
        2000,
        "Timed out waiting for invalid stream ack protocol error callback.",
      ),
    ).resolves.toEqual({
      name: "ProtocolViolation",
      message: "Invalid sequence id 999 for ack. Expected range [1, 1].",
    });

    await expect(stream.write("after-invalid-ack", "text")).rejects.toThrow("is completed");
  });

  it("provides a user-facing stream handler API for whole-stream processing", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    const streamDone = withTimeout(
      new Promise<{ result: string; error?: any }>((resolve) => {
        client!.onGroupStream(
          (_stream): GroupStreamHandler => {
            const chunks: string[] = [];
            return {
              onMessage: (args) => {
                chunks.push(args.data as string);
              },
              onComplete: () => {
                resolve({ result: chunks.join("") });
              },
              onError: (args) => {
                resolve({ result: chunks.join(""), error: args.error });
              },
            };
          },
          { handleFromStart: true, idleTimeoutInMs: 2000 },
        );
      }),
      2000,
      "Timed out waiting for stream completion.",
    );

    sendGroupStreamMessage(socket, {
      streamId: "s1",
      streamSequenceId: 1,
      endOfStream: false,
      data: "chunk-1",
    });
    sendGroupStreamMessage(socket, {
      streamId: "s1",
      streamSequenceId: 2,
      endOfStream: true,
      data: "chunk-2",
    });

    await expect(streamDone).resolves.toEqual({ result: "chunk-1chunk-2" });
  });

  it("supports handleFromStart=true so late-join fragments can be ignored", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    let called = false;
    client.onGroupStream(
      (_stream): GroupStreamHandler => ({
        onMessage: () => {
          called = true;
        },
      }),
      { handleFromStart: true },
    );

    sendGroupStreamMessage(socket, {
      streamId: "late-stream",
      streamSequenceId: 5,
      endOfStream: false,
      data: "late-fragment",
    });

    await new Promise((resolve) => setTimeout(resolve, 50));
    expect(called).toBe(false);
  });

  it("triggers stream idle timeout on receiver without requiring a new message", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    const timeoutResult = withTimeout(
      new Promise<{ messageCount: number; errorName?: string }>((resolve) => {
        client!.onGroupStream(
          (_stream): GroupStreamHandler => {
            let messageCount = 0;
            return {
              onMessage: () => {
                messageCount++;
              },
              onError: (args) => {
                resolve({ messageCount, errorName: args.error?.name });
              },
            };
          },
          { idleTimeoutInMs: 120, handleFromStart: true },
        );
      }),
      2000,
      "Timed out waiting for stream idle timeout callback.",
    );

    sendGroupStreamMessage(socket, {
      streamId: "s-timeout-no-new-message",
      streamSequenceId: 1,
      endOfStream: false,
      data: "chunk-1",
    });

    await expect(timeoutResult).resolves.toEqual({
      messageCount: 1,
      errorName: "IdleTimeout",
    });
  });

  it("applies handleFromStart independently per stream within one handler", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    const delivered: Record<string, string> = {};
    const fromStartCompleted = createDeferred<void>();
    client.onGroupStream(
      (stream): GroupStreamHandler => {
        const chunks: string[] = [];
        return {
          onMessage: (args) => {
            chunks.push(args.data as string);
          },
          onComplete: () => {
            delivered[stream.streamId] = chunks.join("");
            if (stream.streamId === "s-from-start") {
              fromStartCompleted.resolve();
            }
          },
        };
      },
      { handleFromStart: true },
    );

    // Same group, two different streams. One joins mid-stream (seq 5) and must be
    // ignored, while the other starts at seq 1 and must be handled. This proves the
    // handleFromStart gate is tracked per (group, streamId) — not per handler and
    // not per group.
    sendGroupStreamMessage(socket, {
      group: "g1",
      streamId: "s-late-join",
      streamSequenceId: 5,
      endOfStream: false,
      data: "late",
    });
    sendGroupStreamMessage(socket, {
      group: "g1",
      streamId: "s-from-start",
      streamSequenceId: 1,
      endOfStream: false,
      data: "fresh-1",
    });
    sendGroupStreamMessage(socket, {
      group: "g1",
      streamId: "s-from-start",
      streamSequenceId: 2,
      endOfStream: true,
      data: "fresh-2",
    });

    await withTimeout(
      fromStartCompleted.promise,
      3000,
      "Timed out waiting for from-start stream completion.",
    );

    expect(delivered).toEqual({ "s-from-start": "fresh-1fresh-2" });
  });

  it("uses an independent idle timer per stream within one handler", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    const idleErrored = createDeferred<string | undefined>();
    const aliveCompleted = createDeferred<string>();
    let aliveErrorName: string | undefined;

    client.onGroupStream(
      (stream): GroupStreamHandler => {
        const chunks: string[] = [];
        return {
          onMessage: (args) => {
            chunks.push(args.data as string);
          },
          onComplete: () => {
            if (stream.streamId === "s-alive") {
              aliveCompleted.resolve(chunks.join(""));
            }
          },
          onError: (args) => {
            if (stream.streamId === "s-idle") {
              idleErrored.resolve(args.error?.name);
            } else if (stream.streamId === "s-alive") {
              aliveErrorName = args.error?.name;
            }
          },
        };
      },
      { idleTimeoutInMs: 400 },
    );

    // Both streams start in the same group at seq 1.
    sendGroupStreamMessage(socket, {
      group: "g1",
      streamId: "s-idle",
      streamSequenceId: 1,
      endOfStream: false,
      data: "idle-1",
    });
    sendGroupStreamMessage(socket, {
      group: "g1",
      streamId: "s-alive",
      streamSequenceId: 1,
      endOfStream: false,
      data: "alive-1",
    });

    // Keep only s-alive active, well within its ttl. A per-handler (shared) timer
    // would be reset by this fragment and would prevent s-idle from ever timing out.
    await new Promise((resolve) => setTimeout(resolve, 200));
    sendGroupStreamMessage(socket, {
      group: "g1",
      streamId: "s-alive",
      streamSequenceId: 2,
      endOfStream: false,
      data: "alive-2",
    });

    // s-idle received nothing after its first fragment, so its own timer fires even
    // though s-alive is still active — proving timers are per (group, streamId).
    await expect(
      withTimeout(idleErrored.promise, 3000, "Timed out waiting for idle stream timeout."),
    ).resolves.toBe("IdleTimeout");
    expect(aliveErrorName).toBeUndefined();

    // s-alive is unaffected by its sibling timing out and still completes normally.
    sendGroupStreamMessage(socket, {
      group: "g1",
      streamId: "s-alive",
      streamSequenceId: 3,
      endOfStream: true,
      data: "alive-3",
    });
    await expect(
      withTimeout(aliveCompleted.promise, 3000, "Timed out waiting for alive stream completion."),
    ).resolves.toBe("alive-1alive-2alive-3");
  });

  it("triggers onMessage then onError when endOfStream frame carries data and error", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    const sequence = withTimeout(
      new Promise<string[]>((resolve) => {
        client!.onGroupStream((_stream): GroupStreamHandler => {
          const order: string[] = [];
          return {
            onMessage: (args) => {
              order.push(`message:${args.data as string}`);
            },
            onError: (args) => {
              order.push(`error:${args.error?.name}`);
              resolve(order);
            },
          };
        });
      }),
      2000,
      "Timed out waiting for endOfStream error callbacks.",
    );

    sendGroupStreamMessage(socket, {
      streamId: "s-err-final",
      streamSequenceId: 1,
      endOfStream: true,
      data: "final-chunk",
      error: { name: "UserError", message: "failed", userErrorCode: "E1" },
    });

    await expect(sequence).resolves.toEqual(["message:final-chunk", "error:UserError"]);
  });

  it("triggers onComplete without onMessage when endOfStream frame has empty payload", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    const result = withTimeout(
      new Promise<{ messageCount: number; completed: boolean }>((resolve) => {
        client!.onGroupStream((_stream): GroupStreamHandler => {
          let messageCount = 0;
          return {
            onMessage: () => {
              messageCount++;
            },
            onComplete: () => {
              resolve({ messageCount, completed: true });
            },
          };
        });
      }),
      2000,
      "Timed out waiting for endOfStream completion callback.",
    );

    sendGroupStreamMessage(socket, {
      streamId: "s-empty-final",
      streamSequenceId: 1,
      endOfStream: true,
      data: "",
    });

    await expect(result).resolves.toEqual({ messageCount: 0, completed: true });
  });

  it("supports streamId reuse after ignored late-join stream ends when handleFromStart=true", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    const done = withTimeout(
      new Promise<string>((resolve) => {
        client!.onGroupStream(
          (_stream): GroupStreamHandler => {
            const chunks: string[] = [];
            return {
              onMessage: (args) => chunks.push(args.data as string),
              onComplete: () => resolve(chunks.join("")),
            };
          },
          { handleFromStart: true },
        );
      }),
      3000,
      "Timed out waiting for reused streamId to complete.",
    );

    // First streamId appearance starts late, should be ignored.
    sendGroupStreamMessage(socket, {
      streamId: "reused-stream",
      streamSequenceId: 5,
      endOfStream: false,
      data: "late",
    });
    sendGroupStreamMessage(socket, {
      streamId: "reused-stream",
      streamSequenceId: 6,
      endOfStream: true,
      data: "late-end",
    });

    // Same streamId reused from start should now be handled.
    sendGroupStreamMessage(socket, {
      streamId: "reused-stream",
      streamSequenceId: 1,
      endOfStream: false,
      data: "fresh-1",
    });
    sendGroupStreamMessage(socket, {
      streamId: "reused-stream",
      streamSequenceId: 2,
      endOfStream: true,
      data: "fresh-2",
    });

    await expect(done).resolves.toBe("fresh-1fresh-2");
  });

  it("does not keep ignored state when first late fragment is already endOfStream", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    const done = withTimeout(
      new Promise<string>((resolve) => {
        client!.onGroupStream(
          (_stream): GroupStreamHandler => {
            const chunks: string[] = [];
            return {
              onMessage: (args) => chunks.push(args.data as string),
              onComplete: () => resolve(chunks.join("")),
            };
          },
          { handleFromStart: true },
        );
      }),
      3000,
      "Timed out waiting for stream completion after late terminal fragment.",
    );

    sendGroupStreamMessage(socket, {
      streamId: "terminal-reuse-stream",
      streamSequenceId: 9,
      endOfStream: true,
      data: "late-terminal",
    });

    sendGroupStreamMessage(socket, {
      streamId: "terminal-reuse-stream",
      streamSequenceId: 1,
      endOfStream: false,
      data: "fresh-1",
    });
    sendGroupStreamMessage(socket, {
      streamId: "terminal-reuse-stream",
      streamSequenceId: 2,
      endOfStream: true,
      data: "fresh-2",
    });

    await expect(done).resolves.toBe("fresh-1fresh-2");
  });

  it("supports removing group stream onError handler", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    enableAutoStartAck(socket);
    const stream = await client.openGroupStream("g1", { streamId: "stream-dispose-s1" });
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

    sendStreamClosed(socket, "stream-dispose-s1", {
      name: "StreamNotFound",
      message: "stream closed",
    });

    await expect(activeHandlerError).resolves.toEqual({
      name: "StreamNotFound",
      message: "stream closed",
    });
    expect(removedHandlerCalled).toBe(false);
  });

  it("stops delivering stream lifecycle callbacks after group-stream listener is removed", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    const observedGroupMessage = createDeferred<void>();
    const onGroupMessage = (): void => observedGroupMessage.resolve();
    client.on("group-message", onGroupMessage);

    let invoked = false;
    const groupStreamFactory = (_stream: OnGroupStreamArgs): GroupStreamHandler => ({
      onMessage: () => {
        invoked = true;
      },
      onComplete: () => {
        invoked = true;
      },
      onError: () => {
        invoked = true;
      },
    });
    client.onGroupStream(groupStreamFactory);
    client.offGroupStream(groupStreamFactory);

    sendGroupStreamMessage(socket, {
      streamId: "disposed-stream",
      streamSequenceId: 1,
      endOfStream: false,
      data: "chunk-1",
    });

    await withTimeout(
      observedGroupMessage.promise,
      2000,
      "Timed out waiting for group message after disposer.",
    );
    client.off("group-message", onGroupMessage);
    expect(invoked).toBe(false);
  });

  it("sends sendToGroup stream-start, streamData, and streamEnd payloads via group stream", async () => {
    client = new WebPubSubClient(`ws://127.0.0.1:${port}`, {
      autoReconnect: false,
      keepAliveIntervalInMs: 0,
      keepAliveTimeoutInMs: 0,
    });

    const socket = await startClientAndConnect(client, wss);

    const sent: any[] = [];
    socket.on("message", (data) => {
      sent.push(JSON.parse(data.toString()));
    });

    enableAutoStartAck(socket);
    const stream = await client.openGroupStream("g1", { streamId: "s1", idleTimeoutInMs: 15000 });
    await stream.write("chunk-1", "text");
    await stream.abort({ message: "detail", userErrorCode: "app" });

    await withTimeout(
      new Promise<void>((resolve) => {
        const check = (): void => {
          if (sent.length >= 3) {
            resolve();
            return;
          }
          setTimeout(check, 10);
        };
        check();
      }),
      2000,
      "Timed out waiting for group stream payloads.",
    );

    expect(sent[0]).toEqual({
      type: "sendToGroup",
      group: "g1",
      noEcho: false,
      stream: {
        streamId: "s1",
        idleTimeoutMs: 15000,
      },
    });
    expect(sent[1]).toEqual({
      type: "streamData",
      streamId: "s1",
      streamSequenceId: 1,
      dataType: "text",
      data: "chunk-1",
    });
    expect(sent[2]).toEqual({
      type: "streamEnd",
      streamId: "s1",
      error: { message: "detail", userErrorCode: "app" },
    });
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

    const firstSocket = await startClientAndConnect(client, wss, {
      connectionId: "conn-recovery-1",
      reconnectionToken: "token-recovery-1",
    });

    const firstSent: Record<string, unknown>[] = [];
    firstSocket.on("message", (data) => {
      firstSent.push(JSON.parse(data.toString()) as Record<string, unknown>);
    });

    enableAutoStartAck(firstSocket);
    const stream = await client.openGroupStream("g1", { streamId: "recovery-replay-s1" });
    await stream.write("chunk-1", "text");
    await stream.write("chunk-2", "text");

    await waitForCollectedMessages(firstSent, 3);
    expect(firstSent[0]).toEqual({
      type: "sendToGroup",
      group: "g1",
      noEcho: false,
      stream: {
        streamId: "recovery-replay-s1",
      },
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

    sendStreamAck(firstSocket, "recovery-replay-s1", 2);

    firstSocket.close();

    const secondSocket = await acceptSocketAndSendConnected(wss, {
      connectionId: "conn-recovery-2",
      reconnectionToken: "token-recovery-2",
    });
    const secondSent: Record<string, unknown>[] = [];
    secondSocket.on("message", (data) => {
      secondSent.push(JSON.parse(data.toString()) as Record<string, unknown>);
    });

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

    const firstSocket = await startClientAndConnect(client, wss, {
      connectionId: "conn-restart-1",
      reconnectionToken: "",
    });

    const firstSent: Record<string, unknown>[] = [];
    firstSocket.on("message", (data) => {
      firstSent.push(JSON.parse(data.toString()) as Record<string, unknown>);
    });

    enableAutoStartAck(firstSocket);
    const stream = await client.openGroupStream("g1", { streamId: "restart-replay-s1" });
    await stream.write("chunk-1", "text");
    await stream.write("chunk-2", "text");

    await waitForCollectedMessages(firstSent, 3);
    expect(firstSent[0]).toEqual({
      type: "sendToGroup",
      group: "g1",
      noEcho: false,
      stream: {
        streamId: "restart-replay-s1",
      },
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

    sendStreamAck(firstSocket, "restart-replay-s1", 2);

    firstSocket.close();

    const secondSocket = await acceptSocketAndSendConnected(wss, {
      connectionId: "conn-restart-2",
      reconnectionToken: "",
    });
    const secondSent: Record<string, unknown>[] = [];
    secondSocket.on("message", (data) => {
      secondSent.push(JSON.parse(data.toString()) as Record<string, unknown>);
    });

    await waitForNoServerMessage(secondSocket);
    await expect(stream.write("after-reconnect", "text")).rejects.toThrow("is completed");

    enableAutoStartAck(secondSocket);
    const fresh = await client.openGroupStream("g1", { streamId: "restart-replay-s2" });
    await fresh.write("fresh-1", "text");
    await waitForCollectedMessages(secondSent, 2);
    expect(secondSent[0]).toEqual({
      type: "sendToGroup",
      group: "g1",
      noEcho: false,
      stream: {
        streamId: "restart-replay-s2",
      },
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

    const firstSocket = await startClientAndConnect(client, wss, {
      connectionId: "conn-complete-1",
      reconnectionToken: "",
    });

    const firstSent: Record<string, unknown>[] = [];
    firstSocket.on("message", (data) => {
      firstSent.push(JSON.parse(data.toString()) as Record<string, unknown>);
    });

    enableAutoStartAck(firstSocket);
    const stream = await client.openGroupStream("g1", { streamId: "ended-no-replay-s1" });
    await stream.write("chunk-1", "text");
    await stream.end();

    await waitForCollectedMessages(firstSent, 3);
    expect(firstSent[0]).toEqual({
      type: "sendToGroup",
      group: "g1",
      noEcho: false,
      stream: {
        streamId: "ended-no-replay-s1",
      },
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

    const secondSocket = await acceptSocketAndSendConnected(wss, {
      connectionId: "conn-complete-2",
      reconnectionToken: "",
    });

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

    const firstSocket = await startClientAndConnect(client, wss, {
      connectionId: "conn-skip-1",
      reconnectionToken: "token-skip-1",
    });

    enableAutoStartAck(firstSocket);
    const stream = await client.openGroupStream("g1", { streamId: "replay-no-skip-s1" });
    await stream.write("chunk-1", "text");
    await stream.write("chunk-2", "text");
    await stream.write("chunk-3", "text");
    await stream.write("chunk-4", "text");

    // Leave seq 2/3/4 pending.
    sendStreamAck(firstSocket, "replay-no-skip-s1", 2);
    firstSocket.close();

    const secondSocket = await acceptSocketAndSendConnected(wss, {
      connectionId: "conn-skip-2",
      reconnectionToken: "token-skip-2",
    });
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
        sendStreamAck(secondSocket, "replay-no-skip-s1", 4);
      }
    });

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
