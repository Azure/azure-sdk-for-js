// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  type CloseInfo,
  type ConnectionManager,
  type ReliableConnectionClient,
  type RetryOptions,
  createReliableConnectionClient,
} from "../../src/index.js";
import { describe, it } from "vitest";
import { assert } from "../utils/vitest.js";
import { createFullRetryOptions } from "../utils/mockRretryOptions.js";

function createMockClient(
  options: {
    retryOptions?: RetryOptions;
    identifier?: string;
  } = {},
): ReliableConnectionClient<string, string> {
  const { retryOptions: inputRetryOptions, identifier = "test" } = options;
  const retryOptions = createFullRetryOptions(inputRetryOptions);
  let openHandler: (() => void) | undefined = undefined;
  let closeHandler: ((info: CloseInfo) => void) | undefined = undefined;
  let onMessageHandler: ((data: string) => void) | undefined = undefined;
  const connection: ConnectionManager<string, string> = {
    open: async () => {
      setTimeout(() => {
        if (!openHandler) {
          assert.fail("open handler not set");
        }
        openHandler();
      }, 0);
    },
    close: async () => {
      setTimeout(() => {
        if (!closeHandler) {
          assert.fail("close handler not set");
        }
        closeHandler({ code: "1000", reason: "normal closure" });
      }, 0);
    },
    send: async (item) => {
      onMessageHandler?.(item);
    },
    isOpen: async () => true,
    onclose: (fn) => {
      closeHandler = fn;
    },
    onerror: () => {},
    onmessage: (fn) => {
      onMessageHandler = fn;
    },
    onopen: (fn) => {
      openHandler = fn;
    },
    canReconnect: () => false,
  };
  const clientFactory = createReliableConnectionClient<string, string>(connection);
  return clientFactory({ retryOptions, identifier });
}

describe("ReliableConnectionClient", () => {
  it("can be opened, can send, and can be closed", async () => {
    const client = createMockClient();
    assert.isFalse(await client.isOpen());
    await assert.isFulfilled(client.open());
    assert.isTrue(await client.isOpen());
    let receivedCount = 0;
    const messages = ["Hello", "World"];
    const received: string[] = [];
    client.onmessage((data) => {
      receivedCount++;
      received.push(data);
    });
    await assert.isFulfilled(client.send("Hello"));
    await assert.isFulfilled(client.send("World"));
    assert.equal(receivedCount, 2);
    assert.deepEqual(received, messages);
    await assert.isFulfilled(client.close());
    assert.isFalse(await client.isOpen());
  });

  it("close is a no-op if the client wasn't opened first", async () => {
    const client = createMockClient();
    assert.isFalse(await client.isOpen());
    await assert.isFulfilled(client.close());
  });

  it("send forces opening", async () => {
    const client = createMockClient();
    assert.isFalse(await client.isOpen());
    await assert.isFulfilled(client.send("test"));
    assert.isTrue(await client.isOpen());
    await assert.isFulfilled(client.close());
  });
});
