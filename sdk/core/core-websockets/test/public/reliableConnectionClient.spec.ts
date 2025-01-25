// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { assert } from "../utils/vitest.js";
import { createMockClient } from "../utils/reliableConnectionClientMocks.js";
import { CloseInfo } from "../../src/index.js";

describe("ReliableConnectionClient", () => {
  it("can be opened, can send, and can be closed", async () => {
    const client = createMockClient();
    assert.isFalse(await client.isOpen());
    await assert.isFulfilled(client.open());
    assert.isTrue(await client.isOpen());
    let receivedCount = 0;
    const messages = ["Hello", "World"];
    const received: string[] = [];
    client.onMessage((data) => {
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

  describe("open", () => {
    it("second open call is a no-op", async () => {
      const client = createMockClient();
      assert.isFalse(await client.isOpen());
      await assert.isFulfilled(client.open());
      await assert.isFulfilled(client.open());
    });

    it("fails if open throws", async () => {
      const errMsg = "open failed";
      const client = createMockClient({
        open: () => {
          throw new Error(errMsg);
        },
      });
      await assert.isRejected(client.open(), errMsg);
    });

    it("fails if the server refuses to connect", async () => {
      let handler: ((info: CloseInfo) => void) | undefined = undefined;
      const client = createMockClient({
        open: () => {
          setTimeout(() => {
            if (!handler) {
              throw new Error("no handler");
            }
            handler({});
          }, 0);
        },
        onClose: (fn) => {
          handler = fn;
        },
      });
      await assert.isRejected(client.open(), /Disconnected/);
      assert.isFalse(await client.isOpen());
    });

    it("fails if an error is received", async () => {
      let handler: ((err: unknown) => void) | undefined = undefined;
      const errMsg = "server error";
      const client = createMockClient({
        open: () => {
          setTimeout(() => {
            if (!handler) {
              throw new Error("no handler");
            }
            handler(new Error(errMsg));
          }, 0);
        },
        onError: (fn) => {
          handler = fn;
        },
      });
      await assert.isRejected(client.open(), errMsg);
      assert.isFalse(await client.isOpen());
    });

    it("throws when raced with close", async () => {
      const client = createMockClient({ retryOptions: { timeoutInMs: 100 } });
      for (let i = 0; i < 10; i++) {
        try {
          await Promise.race([client.open(), client.close()]);
          // The race may fulfill if the `close` promise wins because
          // close doesn't throw when the client is connecting.
        } catch (err) {
          assert.match(
            (err as Error).message,
            /Unexpected open event when the client is disconnecting/,
          );
        }
        assert.isFalse(await client.isOpen());
      }
    });
  });

  describe("close", () => {
    it("is a no-op if the client wasn't opened first", async () => {
      const client = createMockClient();
      assert.isFalse(await client.isOpen());
      await assert.isFulfilled(client.close());
    });

    it("second close call is a no-op", async () => {
      const client = createMockClient();
      await client.open();
      await assert.isFulfilled(client.close());
      await assert.isFulfilled(client.close());
    });
  });

  describe("send", () => {
    it("send forces opening", async () => {
      const client = createMockClient();
      assert.isFalse(await client.isOpen());
      await assert.isFulfilled(client.send("test"));
      assert.isTrue(await client.isOpen());
      await assert.isFulfilled(client.close());
    });
  });
});
