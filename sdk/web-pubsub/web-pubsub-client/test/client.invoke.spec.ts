// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, expect, vi } from "vitest";
import type { MockInstance } from "vitest";
import { WebPubSubClient } from "../src/webPubSubClient.js";
import { TestWebSocketClient } from "./testWebSocketClient.js";
import { getConnectedPayload } from "./utils.js";
import { InvocationError } from "../src/errors/index.js";

describe("WebPubSubClient invoke support", () => {
  it("invokeEvent resolves with invokeResponse payload", async () => {
    const client = new WebPubSubClient("wss://service.com");
    const testWs = new TestWebSocketClient(client);
    makeStartable(testWs);

    await client.start();
    testWs.invokemessage(JSON.stringify(getConnectedPayload("conn")));

    const invokePromise = client.invokeEvent("echo", "ping", "text", {
      invocationId: "invoke-id",
    });

    testWs.invokemessage(
      JSON.stringify({
        type: "invokeResponse",
        invocationId: "invoke-id",
        success: true,
        dataType: "text",
        data: "pong",
      }),
    );

    const result = await invokePromise;
    expect(result).toMatchObject({
      invocationId: "invoke-id",
      dataType: "text",
      data: "pong",
    });

    client.stop();
  });

  it("invokeEvent rejects when service returns an error", async () => {
    const client = new WebPubSubClient("wss://service.com");
    const testWs = new TestWebSocketClient(client);
    makeStartable(testWs);

    await client.start();
    testWs.invokemessage(JSON.stringify(getConnectedPayload("conn")));

    const invokePromise = client.invokeEvent("echo", "ping", "text", {
      invocationId: "invoke-error",
    });

    testWs.invokemessage(
      JSON.stringify({
        type: "invokeResponse",
        invocationId: "invoke-error",
        success: false,
        error: {
          name: "BadRequest",
          message: "oops",
        },
      }),
    );

    await expect(invokePromise).rejects.toThrow(InvocationError);
    client.stop();
  });

  it("invokeEvent sends cancelInvocation when aborted", async () => {
    const client = new WebPubSubClient("wss://service.com");
    const testWs = new TestWebSocketClient(client);
    makeStartable(testWs);

    const sendSpy = vi.spyOn(testWs, "send");

    await client.start();
    testWs.invokemessage(JSON.stringify(getConnectedPayload("conn")));

    const abortController = new AbortController();
    const invokePromise = client.invokeEvent("echo", "ping", "text", {
      invocationId: "invoke-abort",
      abortSignal: abortController.signal,
    });

    abortController.abort();

    await expect(invokePromise).rejects.toThrow(InvocationError);

    // Verify cancelInvocation message is sent
    // The last call should be cancelInvocation.
    // Note: send might be called multiple times (e.g. for invoke message).
    // We need to find the cancelInvocation message.
    const calls = sendSpy.mock.calls;
    const cancelMessage = calls
      .map((args) => JSON.parse(args[0] as string))
      .find((msg) => msg.type === "cancelInvocation");

    expect(cancelMessage).toMatchObject({
      type: "cancelInvocation",
      invocationId: "invoke-abort",
    });

    client.stop();
  });

  it("invokeEvent removes abort listener when send fails", async () => {
    const client = new WebPubSubClient("wss://service.com", {
      messageRetryOptions: {
        maxRetries: 0,
      },
    });
    const testWs = new TestWebSocketClient(client);
    makeStartable(testWs);

    const sendSpy = vi.spyOn(testWs, "send");
    sendSpy.mockRejectedValueOnce(new Error("send failed"));

    await client.start();
    testWs.invokemessage(JSON.stringify(getConnectedPayload("conn")));

    const abortController = new AbortController();
    const addSpy = vi.spyOn(abortController.signal, "addEventListener");
    const removeSpy = vi.spyOn(abortController.signal, "removeEventListener");

    const invokePromise = client.invokeEvent("echo", "ping", "text", {
      invocationId: "invoke-send-fail",
      abortSignal: abortController.signal,
    });

    await expect(invokePromise).rejects.toThrow(InvocationError);
    await expect(invokePromise).rejects.toThrow("send failed");

    expect(addSpy).toHaveBeenCalledWith("abort", expect.any(Function));
    expect(removeSpy).toHaveBeenCalledWith("abort", expect.any(Function));

    client.stop();
  });
});

function makeStartable(ws: TestWebSocketClient): MockInstance<(fn: () => void) => void> {
  const onOpen = ws.onopen.bind(ws);
  const stub = vi.spyOn(ws, "onopen");
  stub.mockImplementationOnce((...args) => {
    setTimeout(() => {
      onOpen(...args);
      ws.invokeopen.call(ws);
    });
  });
  return stub;
}
