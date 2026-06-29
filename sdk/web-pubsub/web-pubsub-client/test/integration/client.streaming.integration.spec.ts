// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, describe, expect, it } from "vitest";
import { WebPubSubServiceClient } from "@azure/web-pubsub";
import { WebPubSubClient } from "../../src/webPubSubClient.js";
import type { WebPubSubClientOptions } from "../../src/models/index.js";
import { createDeferred, sleep, withTimeout } from "../testUtils.js";

async function waitForStreamIdReusable(
  client: WebPubSubClient,
  group: string,
  streamId: string,
  timeoutInMs = 5000,
): Promise<Awaited<ReturnType<WebPubSubClient["openGroupStream"]>>> {
  const start = Date.now();
  while (true) {
    try {
      return await client.openGroupStream(group, { streamId });
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

const DEFAULT_SENDER_ROLES = ["webpubsub.sendToGroup", "webpubsub.joinLeaveGroup"];
const DEFAULT_RECEIVER_ROLES = ["webpubsub.joinLeaveGroup"];

async function createAuthedClient(
  serviceClient: WebPubSubServiceClient,
  userId: string,
  roles: string[],
  clients: WebPubSubClient[],
  options?: WebPubSubClientOptions,
): Promise<WebPubSubClient> {
  const token = await serviceClient.getClientAccessToken({ userId, roles });
  const client = new WebPubSubClient(token.url, options);
  clients.push(client);
  return client;
}

async function createSenderReceiver(
  serviceClient: WebPubSubServiceClient,
  ts: number,
  clients: WebPubSubClient[],
  receiverOptions?: WebPubSubClientOptions,
): Promise<{ sender: WebPubSubClient; receiver: WebPubSubClient }> {
  const sender = await createAuthedClient(
    serviceClient,
    `sender-${ts}`,
    DEFAULT_SENDER_ROLES,
    clients,
  );
  const receiver = await createAuthedClient(
    serviceClient,
    `receiver-${ts}`,
    DEFAULT_RECEIVER_ROLES,
    clients,
    receiverOptions,
  );
  return { sender, receiver };
}

async function startSenderReceiverInGroup(
  sender: WebPubSubClient,
  receiver: WebPubSubClient,
  group: string,
): Promise<void> {
  await receiver.start();
  await sender.start();
  await receiver.joinGroup(group);
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

    const { sender, receiver } = await createSenderReceiver(serviceClient, ts, clients);

    const completed = createDeferred<{ streamId: string; text: string }>();
    receiver.onGroupStream(async (stream) => {
      const chunks: string[] = [];
      for await (const message of stream) {
        chunks.push(message.data as string);
      }
      completed.resolve({ streamId: stream.streamId, text: chunks.join("") });
    });

    await startSenderReceiverInGroup(sender, receiver, group);

    const stream = await sender.openGroupStream(group, { streamId: `s-text-${ts}` });
    await stream.write("hello ", "text");
    await stream.write("world", "text");
    await stream.end();

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

    const { sender, receiver } = await createSenderReceiver(serviceClient, ts, clients);

    const completed = createDeferred<{ streamId: string; messageCount: number }>();
    receiver.onGroupStream(async (stream) => {
      let messageCount = 0;
      for await (const _message of stream) {
        messageCount++;
      }
      completed.resolve({ streamId: stream.streamId, messageCount });
    });

    await startSenderReceiverInGroup(sender, receiver, group);

    const stream = await sender.openGroupStream(group, { streamId: `s-terminal-nodata-${ts}` });
    await stream.end();

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

    const { sender, receiver } = await createSenderReceiver(serviceClient, ts, clients);

    const completed = createDeferred<Array<{ index: number; payload: string }>>();
    receiver.onGroupStream(async (stream) => {
      const records: Array<{ index: number; payload: string }> = [];
      for await (const message of stream) {
        const data = message.data as unknown;
        if (
          data != null &&
          typeof data === "object" &&
          "index" in (data as object) &&
          "payload" in (data as object)
        ) {
          records.push(data as { index: number; payload: string });
        }
      }
      completed.resolve(records);
    });

    await startSenderReceiverInGroup(sender, receiver, group);

    const stream = await sender.openGroupStream(group, { streamId: `s-json-${ts}` });
    await stream.write({ index: 1, payload: "A" }, "json");
    await stream.write({ index: 2, payload: "B" }, "json");
    await stream.end();

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

    const { sender, receiver } = await createSenderReceiver(serviceClient, ts, clients);

    const completed = createDeferred<Uint8Array>();
    receiver.onGroupStream(async (stream) => {
      let latest = new Uint8Array();
      for await (const message of stream) {
        const current = new Uint8Array(message.data as ArrayBuffer);
        if (current.length > 0) {
          latest = current;
        }
      }
      completed.resolve(latest);
    });

    await startSenderReceiverInGroup(sender, receiver, group);

    const stream = await sender.openGroupStream(group, { streamId: `s-binary-${ts}` });
    await stream.write(new Uint8Array([9, 8, 7, 6]).buffer, "binary");
    await stream.end();

    await expect(
      withTimeout(completed.promise, 10000, "Timed out waiting for binary stream completion."),
    ).resolves.toEqual(new Uint8Array([9, 8, 7, 6]));
  });

  it("routes parallel streams in same group by streamId", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `stream-parallel-${ts}`;

    const { sender, receiver } = await createSenderReceiver(serviceClient, ts, clients);

    const allDone = createDeferred<Record<string, string>>();
    const result: Record<string, string> = {};
    receiver.onGroupStream(async (stream) => {
      const chunks: string[] = [];
      for await (const message of stream) {
        chunks.push(message.data as string);
      }
      result[stream.streamId] = chunks.join("");
      if (Object.keys(result).length === 2) {
        allDone.resolve(result);
      }
    });

    await startSenderReceiverInGroup(sender, receiver, group);

    const streamA = await sender.openGroupStream(group, { streamId: `sA-${ts}` });
    const streamB = await sender.openGroupStream(group, { streamId: `sB-${ts}` });

    await streamA.write("A1", "text");
    await streamB.write("B1", "text");
    await streamA.write("A2", "text");
    await streamB.write("B2", "text");
    await streamA.end();
    await streamB.end();

    await expect(
      withTimeout(allDone.promise, 10000, "Timed out waiting for parallel streams completion."),
    ).resolves.toEqual({
      [`sA-${ts}`]: "A1A2",
      [`sB-${ts}`]: "B1B2",
    });
  });

  it("closes group stream after service-side stream idle timeout", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `stream-service-expire-${ts}`;

    const sender = await createAuthedClient(
      serviceClient,
      `sender-${ts}`,
      DEFAULT_SENDER_ROLES,
      clients,
    );

    const senderError = createDeferred<{ name: string; message?: string }>();
    await sender.start();

    const stream = await sender.openGroupStream(group, {
      streamId: `s-service-expire-${ts}`,
      idleTimeoutInMs: 300,
    });
    stream.onError((error) => senderError.resolve({ name: error.name, message: error.message }));

    await stream.write("before-timeout", "text");
    await sleep(2500);
    const terminal = await withTimeout(
      senderError.promise,
      10000,
      "Timed out waiting for stream terminal error after timeout.",
    );
    expect(["IdleTimeout", "StreamNotFound"]).toContain(terminal.name);

    await expect(stream.write("after-timeout", "text")).rejects.toThrow("is completed");
  });

  it("treats messages after receiver ttl expiry as a new stream when handleFromStart=false", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `stream-receiver-expire-start-${ts}`;

    const { sender, receiver } = await createSenderReceiver(serviceClient, ts, clients);

    const firstMessage = createDeferred<void>();
    const firstExpired = createDeferred<void>();
    const secondCompleted = createDeferred<{ generation: number; chunks: string[] }>();
    let generation = 0;

    receiver.onGroupStream(
      async (stream) => {
        generation++;
        const currentGeneration = generation;
        const chunks: string[] = [];
        try {
          for await (const message of stream) {
            chunks.push(message.data as string);
            if (currentGeneration === 1 && message.stream.streamSequenceId === 1) {
              firstMessage.resolve();
            }
          }
          if (currentGeneration === 2) {
            secondCompleted.resolve({ generation: currentGeneration, chunks: [...chunks] });
          }
        } catch (err) {
          if (currentGeneration === 1 && (err as { name?: string }).name === "IdleTimeout") {
            firstExpired.resolve();
          }
        }
      },
      { idleTimeoutInMs: 200, handleFromStart: false },
    );

    await startSenderReceiverInGroup(sender, receiver, group);

    const stream = await sender.openGroupStream(group, {
      streamId: `s-receiver-expire-start-${ts}`,
    });
    await stream.write("chunk-1", "text");
    await withTimeout(firstMessage.promise, 10000, "Timed out waiting for first stream message.");

    await sleep(350);
    await stream.write("chunk-2", "text");
    await withTimeout(firstExpired.promise, 10000, "Timed out waiting for receiver ttl expiry.");

    await stream.write("chunk-3", "text");
    await stream.write("chunk-4", "text");
    await stream.end();

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

  it("requires a fresh seq=1 stream after receiver ttl expiry when handleFromStart=true", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `stream-receiver-expire-strict-${ts}`;
    const streamId = `s-receiver-expire-strict-${ts}`;

    const { sender, receiver } = await createSenderReceiver(serviceClient, ts, clients);

    const firstMessage = createDeferred<void>();
    const firstExpired = createDeferred<void>();
    const freshCompleted = createDeferred<{ generation: number; chunks: string[] }>();
    let generation = 0;

    receiver.onGroupStream(
      async (stream) => {
        generation++;
        const currentGeneration = generation;
        const chunks: string[] = [];
        try {
          for await (const message of stream) {
            chunks.push(message.data as string);
            if (currentGeneration === 1 && message.stream.streamSequenceId === 1) {
              firstMessage.resolve();
            }
          }
          if (currentGeneration === 2) {
            freshCompleted.resolve({ generation: currentGeneration, chunks: [...chunks] });
          }
        } catch (err) {
          if (currentGeneration === 1 && (err as { name?: string }).name === "IdleTimeout") {
            firstExpired.resolve();
          }
        }
      },
      { idleTimeoutInMs: 200, handleFromStart: true },
    );

    await startSenderReceiverInGroup(sender, receiver, group);

    const original = await sender.openGroupStream(group, { streamId });
    await original.write("old-1", "text");
    await withTimeout(
      firstMessage.promise,
      10000,
      "Timed out waiting for first strict stream message.",
    );

    await sleep(350);
    await original.write("old-2", "text");
    await withTimeout(firstExpired.promise, 10000, "Timed out waiting for strict ttl expiry.");

    // Continues old stream (seq > 1) and should stay ignored when handleFromStart=true.
    await original.write("old-3", "text");
    await original.write("old-4", "text");
    await original.end();

    // Reuse streamId with a fresh stream (seq starts from 1), this should be handled.
    const fresh = await waitForStreamIdReusable(sender, group, streamId);
    await fresh.write("fresh-1", "text");
    await fresh.end();

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

    const { sender, receiver } = await createSenderReceiver(serviceClient, ts, clients);

    const errored = createDeferred<{ name: string; message?: string; userErrorCode?: string }>();
    receiver.onGroupStream(async (stream) => {
      try {
        for await (const _message of stream) {
          /** empty */
        }
      } catch (err) {
        const error = err as { name: string; message?: string; userErrorCode?: string };
        errored.resolve({
          name: error.name,
          message: error.message,
          userErrorCode: error.userErrorCode,
        });
      }
    });

    await startSenderReceiverInGroup(sender, receiver, group);

    const stream = await sender.openGroupStream(group, { streamId: `s-error-${ts}` });
    await stream.abort({ message: "stream failed", userErrorCode: "APP_42" });

    const terminal = await withTimeout(
      errored.promise,
      10000,
      "Timed out waiting for stream onError.",
    );
    expect(terminal.name).toBe("UserError");
    expect(terminal.message).toBe("stream failed");
    expect(terminal.userErrorCode).toBe("APP_42");
  });
});
