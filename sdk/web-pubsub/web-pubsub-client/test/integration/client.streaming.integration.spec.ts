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
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

async function withTimeout<T>(promise: Promise<T>, timeoutInMs: number, errorMessage: string): Promise<T> {
  const timeout = createDeferred<never>();
  const handle = setTimeout(() => timeout.reject(new Error(errorMessage)), timeoutInMs);
  try {
    return await Promise.race([promise, timeout.promise]);
  } finally {
    clearTimeout(handle);
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
