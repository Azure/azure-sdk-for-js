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

async function expectNotResolved<T>(promise: Promise<T>, timeoutInMs: number): Promise<void> {
  const timer = createDeferred<void>();
  const handle = setTimeout(() => timer.resolve(), timeoutInMs);
  try {
    const result = await Promise.race([
      promise.then(() => "resolved" as const),
      timer.promise.then(() => "timeout" as const),
    ]);
    expect(result).toBe("timeout");
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

describe.skipIf(skipIntegration)("WebPubSubClient integration", () => {
  const clients: WebPubSubClient[] = [];

  afterEach(() => {
    while (clients.length > 0) {
      clients.pop()?.stop();
    }
  });

  it("connects and emits connected event", async () => {
    const serviceClient = createServiceClient();
    const receiverToken = await serviceClient.getClientAccessToken({
      userId: `receiver-${Date.now()}`,
      roles: ["webpubsub.joinLeaveGroup"],
    });

    const client = new WebPubSubClient(receiverToken.url);
    clients.push(client);

    const connected = createDeferred<{ connectionId: string; userId: string }>();
    client.on("connected", (args) => connected.resolve(args));

    await client.start();
    const result = await withTimeout(
      connected.promise,
      10000,
      "Timed out waiting for connected event.",
    );

    expect(result.connectionId).toBeTruthy();
    expect(result.userId.startsWith("receiver-")).toBe(true);
  });

  it("joins a group and receives group message", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `integration-group-${ts}`;
    const senderUser = `sender-${ts}`;
    const receiverUser = `receiver-${ts}`;

    const senderToken = await serviceClient.getClientAccessToken({
      userId: senderUser,
      roles: ["webpubsub.joinLeaveGroup", "webpubsub.sendToGroup"],
    });
    const receiverToken = await serviceClient.getClientAccessToken({
      userId: receiverUser,
      roles: ["webpubsub.joinLeaveGroup"],
    });

    const sender = new WebPubSubClient(senderToken.url);
    const receiver = new WebPubSubClient(receiverToken.url);
    clients.push(sender, receiver);

    const received = createDeferred<{ data: unknown; fromUserId: string; group: string }>();
    receiver.on("group-message", (args) => {
      if (args.message.group === group) {
        received.resolve({
          data: args.message.data,
          fromUserId: args.message.fromUserId,
          group: args.message.group,
        });
      }
    });

    await receiver.start();
    await sender.start();
    await receiver.joinGroup(group);
    await sender.sendToGroup(group, "hello-integration", "text", { noEcho: false });

    const message = await withTimeout(
      received.promise,
      10000,
      "Timed out waiting for group message.",
    );

    expect(message.group).toBe(group);
    expect(message.data).toBe("hello-integration");
    expect(message.fromUserId).toBe(senderUser);
  });

  it("does not echo group message back to sender when noEcho=true", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `integration-noecho-${ts}`;
    const senderUser = `sender-${ts}`;
    const receiverUser = `receiver-${ts}`;

    const senderToken = await serviceClient.getClientAccessToken({
      userId: senderUser,
      roles: ["webpubsub.joinLeaveGroup", "webpubsub.sendToGroup"],
    });
    const receiverToken = await serviceClient.getClientAccessToken({
      userId: receiverUser,
      roles: ["webpubsub.joinLeaveGroup"],
    });

    const sender = new WebPubSubClient(senderToken.url);
    const receiver = new WebPubSubClient(receiverToken.url);
    clients.push(sender, receiver);

    const senderGotMessage = createDeferred<void>();
    const receiverGotMessage = createDeferred<string>();

    sender.on("group-message", (args) => {
      if (args.message.group === group) {
        senderGotMessage.resolve();
      }
    });
    receiver.on("group-message", (args) => {
      if (args.message.group === group) {
        receiverGotMessage.resolve(args.message.data as string);
      }
    });

    await sender.start();
    await receiver.start();
    await sender.joinGroup(group);
    await receiver.joinGroup(group);
    await sender.sendToGroup(group, "no-echo-message", "text", { noEcho: true });

    await expect(
      withTimeout(
        receiverGotMessage.promise,
        10000,
        "Timed out waiting for receiver group message.",
      ),
    ).resolves.toBe("no-echo-message");
    await expectNotResolved(senderGotMessage.promise, 1500);
  });

  it("does not receive group message after leaving group", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `integration-leave-${ts}`;
    const senderUser = `sender-${ts}`;
    const receiverUser = `receiver-${ts}`;

    const senderToken = await serviceClient.getClientAccessToken({
      userId: senderUser,
      roles: ["webpubsub.joinLeaveGroup", "webpubsub.sendToGroup"],
    });
    const receiverToken = await serviceClient.getClientAccessToken({
      userId: receiverUser,
      roles: ["webpubsub.joinLeaveGroup"],
    });

    const sender = new WebPubSubClient(senderToken.url);
    const receiver = new WebPubSubClient(receiverToken.url);
    clients.push(sender, receiver);

    const receiverGotMessage = createDeferred<void>();
    receiver.on("group-message", (args) => {
      if (args.message.group === group) {
        receiverGotMessage.resolve();
      }
    });

    await sender.start();
    await receiver.start();
    await receiver.joinGroup(group);
    await receiver.leaveGroup(group);
    await sender.sendToGroup(group, "should-not-receive", "text");

    await expectNotResolved(receiverGotMessage.promise, 1500);
  });

  it("receives server-message when service sends to all", async () => {
    const serviceClient = createServiceClient();
    const clientToken = await serviceClient.getClientAccessToken({
      userId: `server-msg-${Date.now()}`,
    });

    const client = new WebPubSubClient(clientToken.url);
    clients.push(client);

    const received = createDeferred<{ kind: string; value: number }>();
    client.on("server-message", (args) => {
      const data = args.message.data as { kind: string; value: number };
      if (data.kind === "server-broadcast") {
        received.resolve(data);
      }
    });

    await client.start();
    await serviceClient.sendToAll({ kind: "server-broadcast", value: 7 });

    await expect(
      withTimeout(received.promise, 10000, "Timed out waiting for server-message."),
    ).resolves.toEqual({ kind: "server-broadcast", value: 7 });
  });

  it("receives binary group message sent by service", async () => {
    const serviceClient = createServiceClient();
    const ts = Date.now();
    const group = `integration-binary-${ts}`;

    const receiverToken = await serviceClient.getClientAccessToken({
      userId: `binary-receiver-${ts}`,
      roles: ["webpubsub.joinLeaveGroup"],
    });

    const receiver = new WebPubSubClient(receiverToken.url);
    clients.push(receiver);

    const received = createDeferred<Uint8Array>();
    receiver.on("group-message", (args) => {
      if (args.message.group === group && args.message.dataType === "binary") {
        received.resolve(new Uint8Array(args.message.data as ArrayBuffer));
      }
    });

    await receiver.start();
    await receiver.joinGroup(group);

    const payload = new Uint8Array([1, 2, 3, 4]).buffer;
    await serviceClient.group(group).sendToAll(payload);

    await expect(
      withTimeout(received.promise, 10000, "Timed out waiting for binary group-message."),
    ).resolves.toEqual(new Uint8Array([1, 2, 3, 4]));
  });
});
