// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { assert } from "../utils/vitest.js";
import { createIdentifier, createMockClient } from "../utils/reliableConnectionClientMocks.js";
import type { CloseInfo } from "../../src/index.js";
import { delay } from "@azure/core-util";
import { createFullRetryOptions } from "../utils/mockRretryOptions.js";

describe("ReliableConnectionClient", () => {
  it("can be opened, can send, and can be closed", async (test) => {
    const client = createMockClient({ identifier: createIdentifier(test) });
    assert.equal(client.status, "disconnected");
    await assert.isFulfilled(client.open());
    assert.equal(client.status, "connected");
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
    assert.equal(client.status, "disconnected");
  });

  describe("open", () => {
    it("second open call is a no-op", async (test) => {
      const client = createMockClient({ identifier: createIdentifier(test) });
      assert.equal(client.status, "disconnected");
      await assert.isFulfilled(client.open());
      await assert.isFulfilled(client.open());
      assert.equal(client.status, "connected");
    });

    it("fails if open throws", async (test) => {
      const errMsg = "open failed";
      const client = createMockClient({
        identifier: createIdentifier(test),
        open: () => {
          throw new Error(errMsg);
        },
      });
      await assert.isRejected(client.open(), errMsg);
      assert.equal(client.status, "disconnected");
    });

    it("fails if the server refuses to connect", async (test) => {
      let handler: ((info: CloseInfo) => void) | undefined = undefined;
      const client = createMockClient({
        identifier: createIdentifier(test),
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
      assert.equal(client.status, "disconnected");
    });

    it("fails if an error is received", async (test) => {
      let handler: ((err: unknown) => void) | undefined = undefined;
      const errMsg = "server error";
      const client = createMockClient({
        identifier: createIdentifier(test),
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
      assert.equal(client.status, "disconnected");
    });

    it("throws when raced with close", async (test) => {
      const client = createMockClient({ identifier: createIdentifier(test) });
      for (let i = 0; i < 10; i++) {
        try {
          await Promise.race([client.open(), client.close()]);
          // The race is non-deterministic, and there are two possible outcomes:
          // 1. open wins but the concurrent close causes open to fail.
          // 2. close wins and the promise fulfills.
        } catch (err) {
          assert.match(
            (err as Error).message,
            /Unexpected open event when the client is disconnecting/,
          );
        }
      }
      assert.equal(client.status, "disconnected");
    });

    it("is abortable", async (test) => {
      const client = createMockClient({ identifier: createIdentifier(test) });
      const aborter = new AbortController();
      const openPromise = client.open({ abortSignal: aborter.signal });
      aborter.abort();
      await assert.isRejected(openPromise, /The operation was aborted./);
      assert.equal(client.status, "disconnected");
    });
  });

  describe("close", () => {
    it("is a no-op if the client wasn't opened first", async (test) => {
      const client = createMockClient({ identifier: createIdentifier(test) });
      assert.equal(client.status, "disconnected");
      await assert.isFulfilled(client.close());
      assert.equal(client.status, "disconnected");
    });

    it("second close call is a no-op", async (test) => {
      const client = createMockClient({ identifier: createIdentifier(test) });
      await client.open();
      await assert.isFulfilled(client.close());
      await assert.isFulfilled(client.close());
      assert.equal(client.status, "disconnected");
    });

    it("is abortable", async (test) => {
      const client = createMockClient({ identifier: createIdentifier(test) });
      const aborter = new AbortController();
      await client.open();
      const closePromise = client.close({ abortSignal: aborter.signal });
      aborter.abort();
      await assert.isRejected(closePromise, /The operation was aborted./);
      assert.equal(client.status, "disconnected");
    });
  });

  describe("send", () => {
    it("send forces opening", async (test) => {
      const client = createMockClient({ identifier: createIdentifier(test) });
      assert.equal(client.status, "disconnected");
      await assert.isFulfilled(client.send("test"));
      assert.equal(client.status, "connected");
      await assert.isFulfilled(client.close());
    });

    it("is abortable", async (test) => {
      const client = createMockClient({ identifier: createIdentifier(test) });
      const aborter = new AbortController();
      await client.open();
      aborter.abort();
      const sendPromise = client.send("test", { abortSignal: aborter.signal });
      await assert.isRejected(sendPromise, /The operation was aborted./);
      assert.equal(client.status, "connected");
    });
  });

  describe("onError", () => {
    it("doesn't close the connection", async (test) => {
      let handler: ((err: unknown) => void) | undefined;
      const client = createMockClient({
        identifier: createIdentifier(test),
        onError: (fn) => {
          handler = fn;
        },
      });
      await client.open();
      if (!handler) {
        assert.fail("no handler");
      }
      handler(new Error("test"));
      assert.equal(client.status, "connected");
      await assert.isFulfilled(client.close());
    });
  });

  describe("canReconnect", () => {
    it("reconnect when returns true", async (test) => {
      let closeHandler: ((info: CloseInfo) => void) | undefined;
      const client = createMockClient({
        identifier: createIdentifier(test),
        canReconnect: () => true,
        onClose: (fn) => {
          closeHandler = fn;
        },
        retryOptions: { maxRetries: 1 },
      });
      await client.open();
      assert.equal(client.status, "connected");
      if (!closeHandler) {
        assert.fail("no handler");
      }
      closeHandler({ code: "1000" });
      await delay(200);
      assert.equal(client.status, "connected");
    });

    it("doesn't reconnect when returns false", async (test) => {
      let closeHandler: ((info: CloseInfo) => void) | undefined;
      const client = createMockClient({
        identifier: createIdentifier(test),
        canReconnect: () => false,
        onClose: (fn) => {
          closeHandler = fn;
        },
        retryOptions: { maxRetries: 1 },
      });
      await client.open();
      assert.equal(client.status, "connected");
      if (!closeHandler) {
        assert.fail("no handler");
      }
      closeHandler({ code: "1000" });
      await delay(200);
      assert.equal(client.status, "disconnected");
    });

    it("reconnect can be aborted", async (test) => {
      let closeHandler: ((info: CloseInfo) => void) | undefined;
      const client = createMockClient({
        identifier: createIdentifier(test),
        canReconnect: () => true,
        onClose: (fn) => {
          closeHandler = fn;
        },
        retryOptions: { maxRetries: 1 },
      });
      const aborter = new AbortController();
      await client.open({ abortSignal: aborter.signal });
      assert.equal(client.status, "connected");
      if (!closeHandler) {
        assert.fail("no handler");
      }
      aborter.abort();
      closeHandler({ code: "1000" });
      await delay(200);
      assert.equal(client.status, "disconnected");
    });
  });
  describe("retry", () => {
    describe("open", () => {
      it("retries when fails", async (test) => {
        let openCount = 0;
        let openHandler: (() => void) | undefined;
        const client = createMockClient({
          identifier: createIdentifier(test),
          open: () => {
            if (++openCount === 1) {
              throw new Error("failed");
            } else {
              setTimeout(() => {
                if (!openHandler) {
                  assert.fail("open handler not set");
                }
                openHandler();
              }, 0);
            }
          },
          onOpen: (fn) => {
            openHandler = fn;
          },
          retryOptions: { maxRetries: 1 },
        });
        await assert.isFulfilled(client.open());
        assert.equal(openCount, 2);
      });

      it("retries when server refuses to connect", async (test) => {
        let openCount = 0;
        let openHandler: (() => void) | undefined;
        let closeHandler: ((info: CloseInfo) => void) | undefined;
        const client = createMockClient({
          identifier: createIdentifier(test),
          open: () => {
            if (++openCount === 1) {
              setTimeout(() => {
                if (!closeHandler) {
                  assert.fail("open handler not set");
                }
                closeHandler({});
              }, 0);
            } else {
              setTimeout(() => {
                if (!openHandler) {
                  assert.fail("open handler not set");
                }
                openHandler();
              }, 0);
            }
          },
          close: () => {
            setTimeout(() => {
              if (!closeHandler) {
                assert.fail("close handler not set");
              }
              closeHandler({});
            }, 0);
          },
          onOpen: (fn) => {
            openHandler = fn;
          },
          onClose: (fn) => {
            closeHandler = fn;
          },
          retryOptions: { maxRetries: 1 },
          canReconnect: () => true,
        });
        await assert.isFulfilled(client.open());
        assert.equal(openCount, 2);
        await client.close();
      });

      it("retries when timeouts", async (test) => {
        let openHandler: (() => void) | undefined;
        const timeoutInMs = createFullRetryOptions().timeoutInMs;
        let openCount = 0;
        const client = createMockClient({
          identifier: createIdentifier(test),
          open: () => {
            openCount++;
            setTimeout(
              () => {
                if (!openHandler) {
                  assert.fail("open handler not set");
                }
                openHandler();
              },
              openCount === 2 ? 0 : timeoutInMs * 2,
            );
          },
          onOpen: (fn) => {
            openHandler = fn;
          },
          retryOptions: { maxRetries: 1, timeoutInMs },
        });
        await assert.isFulfilled(client.open());
        assert.equal(openCount, 2);
      });

      it("doesn't retry when succeeds", async (test) => {
        let openHandler: (() => void) | undefined;
        let openCount = 0;
        const client = createMockClient({
          identifier: createIdentifier(test),
          open: () => {
            openCount++;
            setTimeout(() => {
              if (!openHandler) {
                assert.fail("handler not set");
              }
              openHandler();
            }, 0);
          },
          onOpen: (fn) => {
            openHandler = fn;
          },
          retryOptions: { maxRetries: 1 },
        });
        await assert.isFulfilled(client.open());
        assert.equal(openCount, 1);
      });

      it("doesn't retry when can't reconnect", async (test) => {
        let closeHandler: ((info: CloseInfo) => void) | undefined;
        let openCount = 0;
        const client = createMockClient({
          identifier: createIdentifier(test),
          open: () => {
            openCount++;
            setTimeout(() => {
              if (!closeHandler) {
                assert.fail("handler not set");
              }
              closeHandler({});
            }, 0);
          },
          onClose: (fn) => {
            closeHandler = fn;
          },
          retryOptions: { maxRetries: 1 },
          canReconnect: () => false,
        });
        await assert.isRejected(client.open(), /Disconnected/);
        assert.equal(openCount, 1);
      });
    });

    describe("close", () => {
      it("retries when fails", async (test) => {
        let closeCount = 0;
        let closeHandler: ((info: CloseInfo) => void) | undefined;
        const client = createMockClient({
          identifier: createIdentifier(test),
          close: () => {
            if (++closeCount === 1) {
              throw new Error("failed");
            } else {
              setTimeout(() => {
                if (!closeHandler) {
                  assert.fail("handler not set");
                }
                closeHandler({});
              }, 0);
            }
          },
          onClose: (fn) => {
            closeHandler = fn;
          },
          retryOptions: { maxRetries: 1 },
          isRetryable: () => true,
        });
        await client.open();
        await assert.isFulfilled(client.close());
        assert.equal(closeCount, 2);
      });

      it("retries when timeouts", async (test) => {
        let closeHandler: ((info: CloseInfo) => void) | undefined;
        const timeoutInMs = createFullRetryOptions().timeoutInMs;
        let closeCount = 0;
        const client = createMockClient({
          identifier: createIdentifier(test),
          close: () => {
            closeCount++;
            setTimeout(
              () => {
                if (!closeHandler) {
                  assert.fail("handler not set");
                }
                closeHandler({});
              },
              closeCount === 2 ? 0 : timeoutInMs * 2,
            );
          },
          onClose: (fn) => {
            closeHandler = fn;
          },
          retryOptions: { maxRetries: 1, timeoutInMs },
          isRetryable: () => true,
        });
        await client.open();
        await assert.isFulfilled(client.close());
        assert.equal(closeCount, 2);
      });

      it("doesn't retry when succeeds", async (test) => {
        let closeHandler: ((info: CloseInfo) => void) | undefined;
        let closeCount = 0;
        const client = createMockClient({
          identifier: createIdentifier(test),
          close: () => {
            closeCount++;
            setTimeout(() => {
              if (!closeHandler) {
                assert.fail("handler not set");
              }
              closeHandler({});
            }, 0);
          },
          onClose: (fn) => {
            closeHandler = fn;
          },
          retryOptions: { maxRetries: 1 },
        });
        await client.open();
        await assert.isFulfilled(client.close());
        assert.equal(closeCount, 1);
      });
    });
  });
});
