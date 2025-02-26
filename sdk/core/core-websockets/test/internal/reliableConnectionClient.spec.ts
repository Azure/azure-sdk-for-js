// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterEach, beforeEach, describe, it } from "vitest";
import { assert } from "../utils/vitest.js";
import {
  type ClientWithHandlers,
  createMockClient,
} from "../utils/reliableConnectionClientMocks.js";
import { createTestFullName } from "@azure-tools/test-utils-vitest";
import { delay } from "@azure/core-util";
import { createFullRetryOptions } from "../utils/mockRretryOptions.js";

describe("ReliableConnectionClient", () => {
  let identifier: string;
  let obj: ClientWithHandlers;
  let skipClose = false;

  beforeEach(async (test) => {
    identifier = createTestFullName(test);
  });

  afterEach(async () => {
    if (!skipClose) {
      await obj.client.close();
    }
  });

  it("can be opened, can send, and can be closed", async () => {
    obj = createMockClient({ identifier });
    assert.equal(obj.client.status, "disconnected");
    await assert.isFulfilled(obj.client.open());
    assert.equal(obj.client.status, "connected");
    let receivedCount = 0;
    const messages = ["Hello", "World"];
    const received: string[] = [];
    obj.client.on("message", (data) => {
      receivedCount++;
      received.push(data);
    });
    await assert.isFulfilled(obj.client.send("Hello"));
    await assert.isFulfilled(obj.client.send("World"));
    assert.equal(receivedCount, 2);
    assert.deepEqual(received, messages);
    await assert.isFulfilled(obj.client.close());
    assert.equal(obj.client.status, "disconnected");
  });

  describe("open", () => {
    it("second open call is a no-op", async () => {
      obj = createMockClient({ identifier });
      assert.equal(obj.client.status, "disconnected");
      await assert.isFulfilled(obj.client.open());
      await assert.isFulfilled(obj.client.open());
      assert.equal(obj.client.status, "connected");
    });

    it("fails if open throws", async () => {
      const errMsg = "open failed";
      obj = createMockClient({
        identifier,
        open: () => {
          throw new Error(errMsg);
        },
      });
      await assert.isRejected(obj.client.open(), errMsg);
      assert.equal(obj.client.status, "disconnected");
    });

    it("fails if the server refuses to connect", async () => {
      obj = createMockClient({
        identifier,
        open: () => {
          setTimeout(() => {
            if (obj.closeHandlers.length === 0) {
              throw new Error("no handler");
            }
            for (const handler of obj.closeHandlers) {
              handler({});
            }
          }, 0);
        },
      });
      await assert.isRejected(obj.client.open(), /Disconnected/);
      assert.equal(obj.client.status, "disconnected");
    });

    it("fails if an error is received", async () => {
      const errMsg = "server error";
      obj = createMockClient({
        identifier,
        open: () => {
          setTimeout(() => {
            if (obj.errorHandlers.length === 0) {
              throw new Error("no handler");
            }
            for (const handler of obj.errorHandlers) {
              handler(new Error(errMsg));
            }
          }, 0);
        },
      });
      await assert.isRejected(obj.client.open(), errMsg);
      assert.equal(obj.client.status, "disconnected");
    });

    it("throws when raced with close", async () => {
      obj = createMockClient({ identifier });
      for (let i = 0; i < 10; i++) {
        try {
          await Promise.race([obj.client.open(), obj.client.close()]);
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
      assert.equal(obj.client.status, "disconnected");
    });

    it("is abortable", async () => {
      obj = createMockClient({ identifier });
      const aborter = new AbortController();
      const openPromise = obj.client.open({ abortSignal: aborter.signal });
      aborter.abort();
      await assert.isRejected(openPromise, /The operation was aborted./);
      assert.equal(obj.client.status, "disconnected");
    });
  });

  describe("close", () => {
    it("is a no-op if the client wasn't opened first", async () => {
      obj = createMockClient({ identifier });
      assert.equal(obj.client.status, "disconnected");
      await assert.isFulfilled(obj.client.close());
      assert.equal(obj.client.status, "disconnected");
    });

    it("second close call is a no-op", async () => {
      obj = createMockClient({ identifier });
      await obj.client.open();
      await assert.isFulfilled(obj.client.close());
      await assert.isFulfilled(obj.client.close());
      assert.equal(obj.client.status, "disconnected");
    });

    it("is abortable", async () => {
      obj = createMockClient({ identifier });
      const aborter = new AbortController();
      await obj.client.open();
      const closePromise = obj.client.close({ abortSignal: aborter.signal });
      aborter.abort();
      await assert.isRejected(closePromise, /The operation was aborted./);
      assert.equal(obj.client.status, "disconnected");
    });
  });

  describe("send", () => {
    it("send forces opening", async () => {
      obj = createMockClient({ identifier });
      assert.equal(obj.client.status, "disconnected");
      await assert.isFulfilled(obj.client.send("test"));
      assert.equal(obj.client.status, "connected");
    });

    it("is abortable", async () => {
      obj = createMockClient({ identifier });
      const aborter = new AbortController();
      await obj.client.open();
      aborter.abort();
      const sendPromise = obj.client.send("test", { abortSignal: aborter.signal });
      await assert.isRejected(sendPromise, /The operation was aborted./);
      assert.equal(obj.client.status, "connected");
    });
  });

  describe("onError", () => {
    it("doesn't close the connection", async () => {
      obj = createMockClient({
        identifier,
      });
      await obj.client.open();
      if (obj.errorHandlers.length === 0) {
        assert.fail("no handler");
      }
      for (const handler of obj.errorHandlers) {
        handler(new Error("test"));
      }
      assert.equal(obj.client.status, "connected");
    });
  });

  describe("reconnectOnDisconnect", () => {
    it("reconnect when returns true", async () => {
      let retries = 0;
      obj = createMockClient({
        identifier,
        reconnectOnDisconnect: () => true,
        isRetryable: () => {
          ++retries;
          return true;
        },
        retryOptions: { maxRetries: 0 },
      });
      await obj.client.open();
      assert.equal(obj.client.status, "connected");
      await delay(200);
      if (obj.closeHandlers.length === 0) {
        assert.fail("no handler");
      }
      obj.closeHandlers?.[0]({ code: "1000" });
      await delay(200);
      assert.equal(obj.client.status, "connected");
      assert.equal(retries, 0);
    });

    it("doesn't reconnect when returns false", async () => {
      let retries = 0;
      obj = createMockClient({
        identifier,
        reconnectOnDisconnect: () => false,
        isRetryable: () => {
          ++retries;
          return true;
        },
        retryOptions: { maxRetries: 1 },
      });
      await obj.client.open();
      assert.equal(obj.client.status, "connected");
      if (obj.closeHandlers.length === 0) {
        assert.fail("no handler");
      }
      obj.closeHandlers?.[0]({ code: "1000" });
      await delay(200);
      assert.equal(obj.client.status, "disconnected");
      assert.equal(retries, 0);
    });

    it("reconnect can be aborted", async () => {
      let opened = false;
      let retries = 0;
      obj = createMockClient({
        identifier,
        isRetryable: () => {
          ++retries;
          return true;
        },
        reconnectOnDisconnect: () => true,
        retryOptions: { maxRetries: 1 },
        open: () => {
          if (!opened) {
            setTimeout(() => {
              if (obj.openHandlers.length === 0) {
                assert.fail("no handler");
              }
              obj.openHandlers?.[0]();
              opened = true;
            }, 0);
          } else {
            throw new Error("failed");
          }
        },
      });
      const aborter = new AbortController();
      await obj.client.open({ abortSignal: aborter.signal });
      assert.equal(obj.client.status, "connected");
      if (obj.closeHandlers.length === 0) {
        assert.fail("no handler");
      }
      await Promise.all([
        new Promise<void>((resolve) => {
          obj.closeHandlers?.[0]({ code: "1000" });
          resolve();
        }),
        new Promise<void>((resolve) => {
          aborter.abort();
          resolve();
        }),
      ]);
      await delay(200);
      assert.equal(obj.client.status, "disconnected");
      assert.equal(retries, 1);
    });
  });
  describe("retry", () => {
    describe("open", () => {
      it("retries when fails", async () => {
        let openCount = 0;
        obj = createMockClient({
          identifier,
          open: () => {
            if (++openCount === 1) {
              throw new Error("failed");
            } else {
              setTimeout(() => {
                if (obj.openHandlers.length === 0) {
                  assert.fail("open handler not set");
                }
                for (const handler of obj.openHandlers) {
                  handler();
                }
              }, 0);
            }
          },
          retryOptions: { maxRetries: 1 },
        });
        await assert.isFulfilled(obj.client.open());
        assert.equal(openCount, 2);
      });

      it("retries when server refuses to connect", async () => {
        let openCount = 0;
        obj = createMockClient({
          identifier,
          open: () => {
            if (++openCount === 1) {
              setTimeout(() => {
                if (obj.closeHandlers.length === 0) {
                  assert.fail("open handler not set");
                }
                for (const handler of obj.closeHandlers) {
                  handler({});
                }
              }, 0);
            } else {
              setTimeout(() => {
                if (obj.openHandlers.length === 0) {
                  assert.fail("open handler not set");
                }
                for (const handler of obj.openHandlers) {
                  handler();
                }
              }, 0);
            }
          },
          close: () => {
            setTimeout(() => {
              if (obj.closeHandlers.length === 0) {
                assert.fail("close handler not set");
              }
              for (const handler of obj.closeHandlers) {
                handler({});
              }
            }, 0);
          },
          reconnectOnDisconnect: () => true,
          retryOptions: { maxRetries: 1 },
        });
        await assert.isFulfilled(obj.client.open());
        assert.equal(openCount, 2);
      });

      it("retries when timeouts", async () => {
        const timeoutInMs = createFullRetryOptions().timeoutInMs;
        let openCount = 0;
        obj = createMockClient({
          identifier,
          open: () => {
            openCount++;
            setTimeout(
              () => {
                if (obj.openHandlers.length === 0) {
                  assert.fail("open handler not set");
                }
                for (const handler of obj.openHandlers) {
                  handler();
                }
              },
              openCount === 2 ? 0 : timeoutInMs * 2,
            );
          },
          retryOptions: { maxRetries: 1, timeoutInMs },
        });
        await assert.isFulfilled(obj.client.open());
        assert.equal(openCount, 2);
      });

      it("doesn't retry when succeeds", async () => {
        let openCount = 0;
        obj = createMockClient({
          identifier,
          open: () => {
            openCount++;
            setTimeout(() => {
              if (obj.openHandlers.length === 0) {
                assert.fail("handler not set");
              }
              for (const handler of obj.openHandlers) {
                handler();
              }
            }, 0);
          },
          retryOptions: { maxRetries: 1 },
        });
        await assert.isFulfilled(obj.client.open());
        assert.equal(openCount, 1);
      });

      it("doesn't retry when can't reconnect", async () => {
        let openCount = 0;
        obj = createMockClient({
          identifier,
          open: () => {
            openCount++;
            setTimeout(() => {
              if (obj.closeHandlers.length === 0) {
                assert.fail("handler not set");
              }
              for (const handler of obj.closeHandlers) {
                handler({});
              }
            }, 0);
          },
          retryOptions: { maxRetries: 1 },
        });
        await assert.isRejected(obj.client.open(), /Disconnected/);
        assert.equal(openCount, 1);
      });
    });

    describe("close", () => {
      it("retries when fails", async () => {
        let closeCount = 0;
        obj = createMockClient({
          identifier,
          close: () => {
            if (++closeCount === 1) {
              throw new Error("failed");
            } else {
              setTimeout(() => {
                if (obj.closeHandlers.length === 0) {
                  assert.fail("handler not set");
                }
                for (const handler of obj.closeHandlers) {
                  handler({});
                }
              }, 0);
            }
          },
          retryOptions: { maxRetries: 1 },
          isRetryable: () => true,
        });
        await obj.client.open();
        await assert.isFulfilled(obj.client.close());
        assert.equal(closeCount, 2);
      });

      it("retries when timeouts", async () => {
        const timeoutInMs = createFullRetryOptions().timeoutInMs;
        let closeCount = 0;
        obj = createMockClient({
          identifier,
          close: () => {
            closeCount++;
            setTimeout(
              () => {
                if (obj.closeHandlers.length === 0) {
                  assert.fail("handler not set");
                }
                for (const handler of obj.closeHandlers) {
                  handler({});
                }
              },
              closeCount === 2 ? 0 : timeoutInMs * 2,
            );
          },

          retryOptions: { maxRetries: 1, timeoutInMs },
          isRetryable: () => true,
        });
        await obj.client.open();
        await assert.isFulfilled(obj.client.close());
        assert.equal(closeCount, 2);
      });

      it("doesn't retry when succeeds", async () => {
        let closeCount = 0;
        obj = createMockClient({
          identifier,
          close: () => {
            closeCount++;
            setTimeout(() => {
              if (obj.closeHandlers.length === 0) {
                assert.fail("handler not set");
              }
              for (const handler of obj.closeHandlers) {
                handler({});
              }
            }, 0);
          },
          retryOptions: { maxRetries: 1 },
        });
        await obj.client.open();
        await assert.isFulfilled(obj.client.close());
        assert.equal(closeCount, 1);
      });
    });
  });

  describe("listeners", () => {
    describe("open", () => {
      it("supports initial handler", async () => {
        let openCount = 0;
        obj = createMockClient({
          identifier,
          listeners: {
            open: () => {
              openCount++;
            },
          },
        });
        await obj.client.open();
        assert.equal(openCount, 1);
      });

      it("supports both initial handler and ones registered later on", async () => {
        let openCount = 0;
        obj = createMockClient({
          identifier,
          listeners: {
            open: () => {
              openCount++;
            },
          },
        });
        obj.client.on("open", () => {
          openCount++;
        });
        await obj.client.open();
        assert.equal(openCount, 2);
      });

      it("supports multiple handlers", async () => {
        let openCount = 0;
        obj = createMockClient({
          identifier,
        });
        obj.client.on("open", () => {
          openCount++;
        });
        obj.client.on("open", () => {
          openCount++;
        });
        await obj.client.open();
        assert.equal(openCount, 2);
      });
    });

    describe("message", () => {
      it("supports initial handler", async () => {
        let messageCount = 0;
        obj = createMockClient({
          identifier,
          listeners: {
            message: () => {
              messageCount++;
            },
          },
        });
        await obj.client.open();
        await obj.client.send("test");
        assert.equal(messageCount, 1);
      });

      it("supports both initial handler and ones registered later on", async () => {
        let messageCount = 0;
        obj = createMockClient({
          identifier,
          listeners: {
            message: () => {
              messageCount++;
            },
          },
        });
        obj.client.on("message", () => {
          messageCount++;
        });
        await obj.client.open();
        await obj.client.send("test");
        assert.equal(messageCount, 2);
      });

      it("supports multiple handlers", async () => {
        let messageCount = 0;
        obj = createMockClient({
          identifier,
        });
        obj.client.on("message", () => {
          messageCount++;
        });
        obj.client.on("message", () => {
          messageCount++;
        });
        await obj.client.open();
        await obj.client.send("test");
        assert.equal(messageCount, 2);
      });
    });

    describe("error", () => {
      it("supports initial handler", async () => {
        let errorCount = 0;
        obj = createMockClient({
          identifier,
          listeners: {
            error: () => {
              errorCount++;
            },
          },
        });
        await obj.client.open();
        for (const handler of obj.errorHandlers) {
          handler(new Error("test"));
        }
        assert.equal(errorCount, 1);
      });

      it("supports both initial handler and ones registered later on", async () => {
        let errorCount = 0;
        obj = createMockClient({
          identifier,
          listeners: {
            error: () => {
              errorCount++;
            },
          },
        });
        obj.client.on("error", () => {
          errorCount++;
        });
        await obj.client.open();
        for (const handler of obj.errorHandlers) {
          handler(new Error("test"));
        }
        assert.equal(errorCount, 2);
      });

      it("supports multiple handlers", async () => {
        let errorCount = 0;
        obj = createMockClient({
          identifier,
        });
        obj.client.on("error", () => {
          errorCount++;
        });
        obj.client.on("error", () => {
          errorCount++;
        });
        await obj.client.open();
        for (const handler of obj.errorHandlers) {
          handler(new Error("test"));
        }
        assert.equal(errorCount, 2);
      });
    });

    describe("close", () => {
      it("supports initial handler", async () => {
        let closeCount = 0;
        obj = createMockClient({
          identifier,
          listeners: {
            close: () => {
              closeCount++;
            },
          },
        });
        await obj.client.open();
        for (const handler of obj.closeHandlers) {
          handler({});
        }
        assert.equal(closeCount, 1);
      });

      it("supports both initial handler and ones registered later on", async () => {
        let closeCount = 0;
        obj = createMockClient({
          identifier,
          listeners: {
            close: () => {
              closeCount++;
            },
          },
        });
        obj.client.on("close", () => {
          closeCount++;
        });
        await obj.client.open();
        for (const handler of obj.closeHandlers) {
          handler({});
        }
        assert.equal(closeCount, 2);
      });

      it("supports multiple handlers", async () => {
        let closeCount = 0;
        obj = createMockClient({
          identifier,
        });
        obj.client.on("close", () => {
          closeCount++;
        });
        obj.client.on("close", () => {
          closeCount++;
        });
        await obj.client.open();
        for (const handler of obj.closeHandlers) {
          handler({});
        }
        assert.equal(closeCount, 2);
      });
    });
  });

  describe("destroy", () => {
    it("calls the provided destroy method", async () => {
      let called = false;
      obj = createMockClient({
        identifier,
        destroy: () => {
          called = true;
        },
      });
      await obj.client.open();
      obj.client.destroy();
      assert.equal(called, true);
      assert.equal(obj.client.status, "disconnected");
      await assert.isRejected(obj.client.send("test"), /destroyed/);
      await assert.isRejected(obj.client.open(), /destroyed/);
      await assert.isRejected(obj.client.close(), /destroyed/);
      skipClose = true;
    });
  });
});
