// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it } from "vitest";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { WebPubSubClient } from "../../src/webPubSubClient.js";

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

async function withTimeout<T>(
  promise: Promise<T>,
  timeoutInMs: number,
  errorMessage: string,
): Promise<T> {
  const timeout = createDeferred<never>();
  const handle = setTimeout(() => timeout.reject(new Error(errorMessage)), timeoutInMs);
  try {
    return await Promise.race([promise, timeout.promise]);
  } finally {
    clearTimeout(handle);
  }
}

async function sleep(timeoutInMs: number): Promise<void> {
  await new Promise<void>((resolve) => setTimeout(resolve, timeoutInMs));
}

async function waitForStreamIdReusable(
  client: WebPubSubClient,
  group: string,
  streamId: string,
  timeoutInMs = 5000,
): Promise<ReturnType<WebPubSubClient["stream"]>> {
  const start = Date.now();
  while (true) {
    try {
      return client.stream(group, { streamId });
    } catch (err) {
      if (!(err instanceof Error) || !err.message.includes("already exists")) {
        throw err;
      }

      if (Date.now() - start > timeoutInMs) {
        throw new Error(`Timed out waiting to reuse streamId '${streamId}'.`);
      }

      await sleep(20);
    }
  }
}

const connectionString = process.env["WEB_PUBSUB_CONNECTION_STRING"];
const hub = process.env["WEB_PUBSUB_HUB"] ?? "integration";
const skipIntegration = !connectionString;
const allowInsecureConnection = connectionString?.includes("Endpoint=http://") ?? false;

function createServiceClient(): WebPubSubServiceClient {
  return new WebPubSubServiceClient(connectionString!, hub, { allowInsecureConnection });
}

describe.skipIf(skipIntegration)("WebPubSubClient streaming integration", () => {
  const clients: WebPubSubClient[] = [];

  afterEach(() => {
    while (clients.length > 0) {
      clients.pop()?.stop();
    }
  });

  it("receives text stream and completes", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `stream-text-${ts}`;

    const senderToken = await serviceClient.getClientAccessToken({
      userId: `sender-${ts}`,
      roles: ["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"],
    });
    const receiverToken = await serviceClient.getClientAccessToken({
      userId: `receiver-${ts}`,
      roles: ["webpubsub.joinLeaveGroup"],
    });

    const sender = new WebPubSubClient(senderToken.url);
    const receiver = new WebPubSubClient(receiverToken.url);
    clients.push(sender, receiver);

    const completed = createDeferred<{ streamId: string; text: string }>();
    receiver.onStream(group, (streamId) => {
      const chunks: string[] = [];
      return {
        onMessage: (args) => {
          chunks.push(args.data as string);
        },
        onComplete: () => {
          completed.resolve({ streamId, text: chunks.join("") });
        },
      };
    });

    await receiver.start();
    await sender.start();
    await receiver.joinGroup(group);

    const stream = sender.stream(group, { streamId: `s-text-${ts}` });
    await stream.publish("hello ", "text");
    await stream.complete("world", "text");

    await expect(
      withTimeout(completed.promise, 10000, "Timed out waiting for text stream completion."),
    ).resolves.toEqual({
      streamId: `s-text-${ts}`,
      text: "hello world",
    });
  });

  it("triggers onComplete without onMessage when terminal frame has no data", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `stream-terminal-nodata-${ts}`;

    const senderToken = await serviceClient.getClientAccessToken({
      userId: `sender-${ts}`,
      roles: ["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"],
    });
    const receiverToken = await serviceClient.getClientAccessToken({
      userId: `receiver-${ts}`,
      roles: ["webpubsub.joinLeaveGroup"],
    });

    const sender = new WebPubSubClient(senderToken.url);
    const receiver = new WebPubSubClient(receiverToken.url);
    clients.push(sender, receiver);

    const completed = createDeferred<{ streamId: string; messageCount: number }>();
    receiver.onStream(group, (streamId) => {
      let messageCount = 0;
      return {
        onMessage: () => {
          messageCount++;
        },
        onComplete: () => {
          completed.resolve({ streamId, messageCount });
        },
      };
    });

    await receiver.start();
    await sender.start();
    await receiver.joinGroup(group);

    const stream = sender.stream(group, { streamId: `s-terminal-nodata-${ts}` });
    await stream.complete();

    await expect(
      withTimeout(completed.promise, 10000, "Timed out waiting for terminal stream completion."),
    ).resolves.toEqual({
      streamId: `s-terminal-nodata-${ts}`,
      messageCount: 0,
    });
  });

  it("receives json stream fragments and keeps order", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `stream-json-${ts}`;

    const senderToken = await serviceClient.getClientAccessToken({
      userId: `sender-${ts}`,
      roles: ["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"],
    });
    const receiverToken = await serviceClient.getClientAccessToken({
      userId: `receiver-${ts}`,
      roles: ["webpubsub.joinLeaveGroup"],
    });

    const sender = new WebPubSubClient(senderToken.url);
    const receiver = new WebPubSubClient(receiverToken.url);
    clients.push(sender, receiver);

    const completed = createDeferred<Array<{ index: number; payload: string }>>();
    receiver.onStream(group, (streamId) => {
      const records: Array<{ index: number; payload: string }> = [];
      return {
        onMessage: (args) => {
          const data = args.data as unknown;
          if (
            data != null &&
            typeof data === "object" &&
            "index" in (data as object) &&
            "payload" in (data as object)
          ) {
            records.push(data as { index: number; payload: string });
          }
        },
        onComplete: (args) => {
          if (args.streamId === streamId) {
            completed.resolve(records);
          }
        },
      };
    });

    await receiver.start();
    await sender.start();
    await receiver.joinGroup(group);

    const stream = sender.stream(group, { streamId: `s-json-${ts}` });
    await stream.publish({ index: 1, payload: "A" }, "json");
    await stream.complete({ index: 2, payload: "B" }, "json");

    await expect(
      withTimeout(completed.promise, 10000, "Timed out waiting for json stream completion."),
    ).resolves.toEqual([
      { index: 1, payload: "A" },
      { index: 2, payload: "B" },
    ]);
  });

  it("receives binary stream payload", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `stream-binary-${ts}`;

    const senderToken = await serviceClient.getClientAccessToken({
      userId: `sender-${ts}`,
      roles: ["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"],
    });
    const receiverToken = await serviceClient.getClientAccessToken({
      userId: `receiver-${ts}`,
      roles: ["webpubsub.joinLeaveGroup"],
    });

    const sender = new WebPubSubClient(senderToken.url);
    const receiver = new WebPubSubClient(receiverToken.url);
    clients.push(sender, receiver);

    const completed = createDeferred<Uint8Array>();
    receiver.onStream(group, () => {
      let latest = new Uint8Array();
      return {
        onMessage: (args) => {
          const current = new Uint8Array(args.data as ArrayBuffer);
          if (current.length > 0) {
            latest = current;
          }
        },
        onComplete: () => {
          completed.resolve(latest);
        },
      };
    });

    await receiver.start();
    await sender.start();
    await receiver.joinGroup(group);

    const stream = sender.stream(group, { streamId: `s-binary-${ts}` });
    await stream.complete(new Uint8Array([9, 8, 7, 6]).buffer, "binary");

    await expect(
      withTimeout(completed.promise, 10000, "Timed out waiting for binary stream completion."),
    ).resolves.toEqual(new Uint8Array([9, 8, 7, 6]));
  });

  it("routes parallel streams in same group by streamId", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `stream-parallel-${ts}`;

    const senderToken = await serviceClient.getClientAccessToken({
      userId: `sender-${ts}`,
      roles: ["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"],
    });
    const receiverToken = await serviceClient.getClientAccessToken({
      userId: `receiver-${ts}`,
      roles: ["webpubsub.joinLeaveGroup"],
    });

    const sender = new WebPubSubClient(senderToken.url);
    const receiver = new WebPubSubClient(receiverToken.url);
    clients.push(sender, receiver);

    const allDone = createDeferred<Record<string, string>>();
    const result: Record<string, string> = {};
    receiver.onStream(group, (streamId) => {
      const chunks: string[] = [];
      return {
        onMessage: (args) => {
          chunks.push(args.data as string);
        },
        onComplete: () => {
          result[streamId] = chunks.join("");
          if (Object.keys(result).length === 2) {
            allDone.resolve(result);
          }
        },
      };
    });

    await receiver.start();
    await sender.start();
    await receiver.joinGroup(group);

    const streamA = sender.stream(group, { streamId: `sA-${ts}` });
    const streamB = sender.stream(group, { streamId: `sB-${ts}` });

    await streamA.publish("A1", "text");
    await streamB.publish("B1", "text");
    await streamA.complete("A2", "text");
    await streamB.complete("B2", "text");

    await expect(
      withTimeout(allDone.promise, 10000, "Timed out waiting for parallel streams completion."),
    ).resolves.toEqual({
      [`sA-${ts}`]: "A1A2",
      [`sB-${ts}`]: "B1B2",
    });
  });

  it("closes publisher stream after service-side stream idle timeout", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `stream-service-expire-${ts}`;

    const senderToken = await serviceClient.getClientAccessToken({
      userId: `sender-${ts}`,
      roles: ["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"],
    });

    const sender = new WebPubSubClient(senderToken.url);
    clients.push(sender);

    const senderError = createDeferred<{ name: string; message?: string }>();
    await sender.start();

    const stream = sender.stream(group, {
      streamId: `s-service-expire-${ts}`,
      idleTimeoutMs: 300,
    });
    stream.onError((error) => senderError.resolve({ name: error.name, message: error.message }));

    await stream.publish("before-timeout", "text");
    await sleep(2500);
    const terminal = await withTimeout(
      senderError.promise,
      10000,
      "Timed out waiting for stream terminal error after timeout.",
    );
    expect(["IdleTimeout", "StreamNotFound"]).toContain(terminal.name);

    await expect(stream.publish("after-timeout", "text")).rejects.toThrow("is completed");
  });

  it("treats messages after receiver ttl expiry as a new stream when handleFromStart=true", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `stream-receiver-expire-start-${ts}`;

    const senderToken = await serviceClient.getClientAccessToken({
      userId: `sender-${ts}`,
      roles: ["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"],
    });
    const receiverToken = await serviceClient.getClientAccessToken({
      userId: `receiver-${ts}`,
      roles: ["webpubsub.joinLeaveGroup"],
    });

    const sender = new WebPubSubClient(senderToken.url);
    const receiver = new WebPubSubClient(receiverToken.url);
    clients.push(sender, receiver);

    const firstMessage = createDeferred<void>();
    const firstExpired = createDeferred<void>();
    const secondCompleted = createDeferred<{ generation: number; chunks: string[] }>();
    let generation = 0;

    receiver.onStream(
      group,
      () => {
        generation++;
        const currentGeneration = generation;
        const chunks: string[] = [];
        return {
          onMessage: (args) => {
            chunks.push(args.data as string);
            if (currentGeneration === 1 && args.stream.streamSequenceId === 1) {
              firstMessage.resolve();
            }
          },
          onError: (args) => {
            if (currentGeneration === 1 && args.error?.name === "IdleTimeout") {
              firstExpired.resolve();
            }
          },
          onComplete: () => {
            if (currentGeneration === 2) {
              secondCompleted.resolve({ generation: currentGeneration, chunks: [...chunks] });
            }
          },
        };
      },
      { ttlInMs: 200, handleFromStart: true },
    );

    await receiver.start();
    await sender.start();
    await receiver.joinGroup(group);

    const stream = sender.stream(group, { streamId: `s-receiver-expire-start-${ts}` });
    await stream.publish("chunk-1", "text");
    await withTimeout(firstMessage.promise, 10000, "Timed out waiting for first stream message.");

    await sleep(350);
    await stream.publish("chunk-2", "text");
    await withTimeout(firstExpired.promise, 10000, "Timed out waiting for receiver ttl expiry.");

    await stream.publish("chunk-3", "text");
    await stream.complete("chunk-4", "text");

    await expect(
      withTimeout(
        secondCompleted.promise,
        10000,
        "Timed out waiting for new stream handler completion after ttl expiry.",
      ),
    ).resolves.toEqual({
      generation: 2,
      chunks: ["chunk-2", "chunk-3", "chunk-4"],
    });
  });

  it("requires a fresh seq=1 stream after receiver ttl expiry when handleFromStart=false", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `stream-receiver-expire-strict-${ts}`;
    const streamId = `s-receiver-expire-strict-${ts}`;

    const senderToken = await serviceClient.getClientAccessToken({
      userId: `sender-${ts}`,
      roles: ["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"],
    });
    const receiverToken = await serviceClient.getClientAccessToken({
      userId: `receiver-${ts}`,
      roles: ["webpubsub.joinLeaveGroup"],
    });

    const sender = new WebPubSubClient(senderToken.url);
    const receiver = new WebPubSubClient(receiverToken.url);
    clients.push(sender, receiver);

    const firstMessage = createDeferred<void>();
    const firstExpired = createDeferred<void>();
    const freshCompleted = createDeferred<{ generation: number; chunks: string[] }>();
    let generation = 0;

    receiver.onStream(
      group,
      () => {
        generation++;
        const currentGeneration = generation;
        const chunks: string[] = [];
        return {
          onMessage: (args) => {
            chunks.push(args.data as string);
            if (currentGeneration === 1 && args.stream.streamSequenceId === 1) {
              firstMessage.resolve();
            }
          },
          onError: (args) => {
            if (currentGeneration === 1 && args.error?.name === "IdleTimeout") {
              firstExpired.resolve();
            }
          },
          onComplete: () => {
            if (currentGeneration === 2) {
              freshCompleted.resolve({ generation: currentGeneration, chunks: [...chunks] });
            }
          },
        };
      },
      { ttlInMs: 200, handleFromStart: false },
    );

    await receiver.start();
    await sender.start();
    await receiver.joinGroup(group);

    const original = sender.stream(group, { streamId });
    await original.publish("old-1", "text");
    await withTimeout(
      firstMessage.promise,
      10000,
      "Timed out waiting for first strict stream message.",
    );

    await sleep(350);
    await original.publish("old-2", "text");
    await withTimeout(firstExpired.promise, 10000, "Timed out waiting for strict ttl expiry.");

    // Continues old stream (seq > 1) and should stay ignored when handleFromStart=false.
    await original.publish("old-3", "text");
    await original.complete("old-4", "text");

    // Reuse streamId with a fresh stream (seq starts from 1), this should be handled.
    const fresh = await waitForStreamIdReusable(sender, group, streamId);
    await fresh.complete("fresh-1", "text");

    await expect(
      withTimeout(
        freshCompleted.promise,
        10000,
        "Timed out waiting for fresh seq=1 stream after strict ttl expiry.",
      ),
    ).resolves.toEqual({
      generation: 2,
      chunks: ["fresh-1"],
    });
  });

  it("delivers stream end error to receiver onError with userErrorCode/message", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `stream-error-${ts}`;

    const senderToken = await serviceClient.getClientAccessToken({
      userId: `sender-${ts}`,
      roles: ["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"],
    });
    const receiverToken = await serviceClient.getClientAccessToken({
      userId: `receiver-${ts}`,
      roles: ["webpubsub.joinLeaveGroup"],
    });

    const sender = new WebPubSubClient(senderToken.url);
    const receiver = new WebPubSubClient(receiverToken.url);
    clients.push(sender, receiver);

    const errored = createDeferred<{ name: string; message?: string; userErrorCode?: string }>();
    receiver.onStream(group, () => ({
      onError: (args) => {
        if (args.error != null) {
          errored.resolve({
            name: args.error.name,
            message: args.error.message,
            userErrorCode: args.error.userErrorCode,
          });
        }
      },
    }));

    await receiver.start();
    await sender.start();
    await receiver.joinGroup(group);

    const stream = sender.stream(group, { streamId: `s-error-${ts}` });
    await stream.complete(undefined, undefined, {
      error: { message: "publisher failed", userErrorCode: "APP_42" },
    });

    const terminal = await withTimeout(
      errored.promise,
      10000,
      "Timed out waiting for stream onError.",
    );
    expect(terminal.name).toBe("UserError");
    expect(terminal.message).toBe("publisher failed");
    expect(terminal.userErrorCode).toBe("APP_42");
  });
});
