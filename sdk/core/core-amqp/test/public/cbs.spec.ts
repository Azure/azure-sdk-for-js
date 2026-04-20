// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it, assert, expect, vi } from "vitest";
import { CbsClient, TokenType, defaultCancellableLock } from "../../src/index.js";
import { Connection, SenderEvents, ReceiverEvents } from "rhea-promise";
import type { Message as RheaMessage, Session } from "rhea-promise";
import {
  createConnectionStub,
  createFullConnectionStub,
  createMockSender,
  createMockReceiver,
  createMockSession,
} from "../utils/createConnectionStub.js";
import { RequestResponseLink } from "../../src/requestResponseLink.js";

type CbsClientPrivate = { _cbsSenderReceiverLink: RequestResponseLink };

/** Accessor to reach the private CBS link inside CbsClient. */
function getCbsLink(cbsClient: CbsClient): RequestResponseLink {
  return (cbsClient as unknown as CbsClientPrivate)._cbsSenderReceiverLink;
}

describe("CbsClient", function () {
  const TEST_FAILURE = "Test failure";

  describe("init", function () {
    it("honors already aborted abortSignal during init", async function () {
      const cbsClient = new CbsClient(new Connection(), "lock");

      // Create an abort signal that is already aborted.
      const controller = new AbortController();
      controller.abort();
      const signal = controller.signal;

      try {
        await cbsClient.init({ abortSignal: signal });
        throw new Error(TEST_FAILURE);
      } catch (err) {
        assert.instanceOf(err, Error);
        assert.equal(err.name, "AbortError");
      }
    });

    it("honors abortSignal inside locking code", async function () {
      const lock = "lock";
      const cbsClient = new CbsClient(new Connection(), "lock");

      // Create an abort signal that will be aborted on a future tick of the event loop.
      const controller = new AbortController();
      const signal = controller.signal;

      // Make the existing `init` invocation wait until the abortSignal
      // is aborted before acquiring it's lock.
      await defaultCancellableLock.acquire(
        lock,
        () => {
          return new Promise<void>((resolve) => {
            setTimeout(() => {
              controller.abort();
              resolve();
            }, 0);
          });
        },
        { abortSignal: undefined, timeoutInMs: undefined },
      );

      try {
        await cbsClient.init({ abortSignal: signal });
        throw new Error(TEST_FAILURE);
      } catch (err) {
        assert.instanceOf(err, Error);
        assert.equal(err.name, "AbortError");
      }
    });

    it("honors abortSignal during init", async function () {
      const connectionStub = new Connection();
      // Stub 'open' because creating a real connection will fail.
      vi.spyOn(connectionStub, "open").mockResolvedValue(
        undefined as unknown as Awaited<ReturnType<Connection["open"]>>,
      );

      const cbsClient = new CbsClient(connectionStub, "lock");

      // Create an abort signal that will be aborted on a future tick of the event loop.
      const controller = new AbortController();
      const signal = controller.signal;
      setTimeout(() => controller.abort(), 0);

      try {
        await cbsClient.init({ abortSignal: signal });
        throw new Error(TEST_FAILURE);
      } catch (err) {
        assert.instanceOf(err, Error);
        assert.equal(err.name, "AbortError");
      }
    });
  });

  describe("negotiateClaim", function () {
    it("throws an error if the cbs link doesn't exist.", async function () {
      const connectionStub = createConnectionStub();
      const cbsClient = new CbsClient(connectionStub, "lock");

      try {
        await cbsClient.negotiateClaim("audience", "token", TokenType.CbsTokenTypeSas);
        throw new Error(TEST_FAILURE);
      } catch (err) {
        assert.instanceOf(err, Error);
        assert.equal(
          err.message,
          "Attempted to negotiate a claim but the CBS link does not exist.",
        );
      }
    });

    describe("cancellation", function () {
      it("honors already aborted abortSignal during negotiateClaim", async function () {
        const connectionStub = createConnectionStub();
        const cbsClient = new CbsClient(connectionStub, "lock");

        // Create an abort signal that is already aborted.
        const controller = new AbortController();
        controller.abort();
        const signal = controller.signal;

        try {
          // Pass the already aborted abortSignal to make sure negotiateClaim will exit quickly.
          await cbsClient.negotiateClaim("audience", "token", TokenType.CbsTokenTypeSas, {
            abortSignal: signal,
          });
          throw new Error(TEST_FAILURE);
        } catch (err) {
          assert.instanceOf(err, Error);
          assert.equal(err.name, "AbortError");
        }
      });

      it("honors abortSignal during negotiateClaim", async function () {
        const connectionStub = createConnectionStub();
        const cbsClient = new CbsClient(connectionStub, "lock");

        // Call `init()` to ensure the CbsClient has a RequestResponseLink.
        await cbsClient.init();

        // Create an abort signal that will be aborted on a future tick of the event loop.
        const controller = new AbortController();
        const signal = controller.signal;
        setTimeout(() => controller.abort(), 0);

        try {
          await cbsClient.negotiateClaim("audience", "token", TokenType.CbsTokenTypeSas, {
            abortSignal: signal,
          });
          throw new Error(TEST_FAILURE);
        } catch (err) {
          assert.instanceOf(err, Error);
          assert.equal(err.name, "AbortError");
        }
      });
    });
  });
});

describe("CbsClient - close, remove, isOpen", () => {
  it("close() when not open is a no-op", async () => {
    const cbsClient = new CbsClient(new Connection(), "lock");
    // Should not throw when not open
    await cbsClient.close();
  });

  it("close() when open closes the link", async () => {
    const connectionStub = createFullConnectionStub();
    const cbsClient = new CbsClient(connectionStub, "lock");
    await cbsClient.init();
    assert.isTrue(cbsClient.isOpen());
    await cbsClient.close();
    assert.isFalse(cbsClient.isOpen());
  });

  it("close() wraps errors from link.close()", async () => {
    const connectionStub = createFullConnectionStub();
    const cbsClient = new CbsClient(connectionStub, "lock");
    await cbsClient.init();
    // Make the underlying link's close throw
    const link = getCbsLink(cbsClient);
    vi.spyOn(link, "close").mockRejectedValue(new Error("close failed"));
    await expect(cbsClient.close()).rejects.toThrow(/An error occurred while closing the cbs link/);
  });

  it("close() wraps non-Error with stack from link.close()", async () => {
    const connectionStub = createFullConnectionStub();
    const cbsClient = new CbsClient(connectionStub, "lock");
    await cbsClient.init();
    const link = getCbsLink(cbsClient);
    vi.spyOn(link, "close").mockRejectedValue({ something: "not an error" });
    await expect(cbsClient.close()).rejects.toThrow(/An error occurred while closing the cbs link/);
  });

  it("remove() when not open is a no-op", () => {
    const cbsClient = new CbsClient(new Connection(), "lock");
    // Should not throw
    cbsClient.remove();
  });

  it("remove() when open removes the link", async () => {
    const connectionStub = createFullConnectionStub();
    const cbsClient = new CbsClient(connectionStub, "lock");
    await cbsClient.init();
    assert.isTrue(cbsClient.isOpen());
    cbsClient.remove();
    assert.isFalse(cbsClient.isOpen());
  });

  it("remove() wraps errors from link.remove()", async () => {
    const connectionStub = createFullConnectionStub();
    const cbsClient = new CbsClient(connectionStub, "lock");
    await cbsClient.init();
    const link = getCbsLink(cbsClient);
    vi.spyOn(link, "remove").mockImplementation(() => {
      throw new Error("remove failed");
    });
    expect(() => cbsClient.remove()).toThrow(/An error occurred while removing the cbs link/);
  });

  it("remove() wraps non-Error from link.remove()", async () => {
    const connectionStub = createFullConnectionStub();
    const cbsClient = new CbsClient(connectionStub, "lock");
    await cbsClient.init();
    const link = getCbsLink(cbsClient);
    vi.spyOn(link, "remove").mockImplementation(() => {
      throw { something: "not an error" };
    });
    expect(() => cbsClient.remove()).toThrow(/An error occurred while removing the cbs link/);
  });

  it("isOpen() returns false when no link", () => {
    const cbsClient = new CbsClient(new Connection(), "lock");
    assert.isFalse(cbsClient.isOpen());
  });

  it("negotiateClaim succeeds when link is open", async () => {
    const connectionStub = createFullConnectionStub();
    const cbsClient = new CbsClient(connectionStub, "lock");
    await cbsClient.init();
    // Mock sendRequest on the underlying link
    const link = getCbsLink(cbsClient);
    vi.spyOn(link, "sendRequest").mockResolvedValue({
      body: "",
      correlation_id: "test-id",
      application_properties: {
        "status-code": 200,
        "status-description": "OK",
      },
    } as unknown as RheaMessage);
    const response = await cbsClient.negotiateClaim("audience", "token", TokenType.CbsTokenTypeSas);
    assert.strictEqual(response.statusCode as string | number, 200);
    assert.equal(response.statusDescription, "OK");
  });

  it("negotiateClaim propagates errors from sendRequest", async () => {
    const connectionStub = createFullConnectionStub();
    const cbsClient = new CbsClient(connectionStub, "lock");
    await cbsClient.init();
    const link = getCbsLink(cbsClient);
    vi.spyOn(link, "sendRequest").mockRejectedValue(new Error("send failed"));
    await expect(
      cbsClient.negotiateClaim("audience", "token", TokenType.CbsTokenTypeSas),
    ).rejects.toThrow("send failed");
  });

  it("negotiateClaim propagates non-Error throws", async () => {
    const connectionStub = createFullConnectionStub();
    const cbsClient = new CbsClient(connectionStub, "lock");
    await cbsClient.init();
    const link = getCbsLink(cbsClient);
    vi.spyOn(link, "sendRequest").mockRejectedValue("string error");
    await expect(
      cbsClient.negotiateClaim("audience", "token", TokenType.CbsTokenTypeSas),
    ).rejects.toBe("string error");
  });
});

describe("CbsClient - init already open branch and error handlers", () => {
  it("init when already open reuses existing link", async () => {
    const connectionStub = createFullConnectionStub();
    const cbsClient = new CbsClient(connectionStub, "lock");
    await cbsClient.init();
    assert.isTrue(cbsClient.isOpen());
    // Call init again - should hit the "already open" branch
    await cbsClient.init();
    assert.isTrue(cbsClient.isOpen());
  });

  it("sender error handler on cbs link fires without throwing", async () => {
    const connectionStub = createFullConnectionStub();
    const cbsClient = new CbsClient(connectionStub, "lock");
    await cbsClient.init();
    const link = getCbsLink(cbsClient);
    // Trigger sender error event - the handler registered in cbs.ts init()
    link.sender.emit(SenderEvents.senderError, {
      connection: { options: { id: "connection-1" } },
      sender: { error: new Error("sender error") },
    });
    // Should not throw, just logs
    assert.isTrue(cbsClient.isOpen());
  });

  it("receiver error handler on cbs link fires without throwing", async () => {
    const connectionStub = createFullConnectionStub();
    const cbsClient = new CbsClient(connectionStub, "lock");
    await cbsClient.init();
    const link = getCbsLink(cbsClient);
    // Trigger receiver error event - the handler registered in cbs.ts init()
    link.receiver.emit(ReceiverEvents.receiverError, {
      connection: { options: { id: "connection-1" } },
      receiver: { error: new Error("receiver error") },
    });
    // Should not throw, just logs
    assert.isTrue(cbsClient.isOpen());
  });
});

describe("cbs.ts - onSessionError callback", () => {
  it("onSessionError handler fires without throwing", async () => {
    // Create a connection stub that captures receiverOptions
    let capturedRxOpt: Record<string, (...args: unknown[]) => unknown> | null = null;
    const connectionStub = new Connection();
    vi.spyOn(connectionStub, "open").mockResolvedValue(
      undefined as unknown as Awaited<ReturnType<Connection["open"]>>,
    );
    vi.spyOn(connectionStub, "createSession").mockResolvedValue(
      createMockSession({
        isOpen: () => true,
        remove: vi.fn(),
        close: vi.fn(),
        createSender: () => {
          return Promise.resolve(
            createMockSender({
              isOpen: () => true,
              remove: vi.fn(),
              close: vi.fn(),
              name: "cbs-sender",
            }),
          );
        },
        createReceiver: (opts: Record<string, (...args: unknown[]) => unknown>) => {
          capturedRxOpt = opts;
          return Promise.resolve(
            createMockReceiver({
              isOpen: () => true,
              remove: vi.fn(),
              close: vi.fn(),
              name: "cbs-receiver",
            }),
          );
        },
      } as Partial<Session>),
    );
    vi.spyOn(connectionStub, "id", "get").mockReturnValue("connection-1");

    const cbsClient = new CbsClient(connectionStub, "lock");
    await cbsClient.init();

    // Now call the captured onSessionError handler
    assert.isDefined(capturedRxOpt, "Receiver options should have been captured");
    assert.isFunction(capturedRxOpt!.onSessionError, "onSessionError should be a function");

    // Call the handler - should not throw
    capturedRxOpt!.onSessionError({
      connection: { options: { id: "connection-1" } },
      session: { error: { condition: "amqp:internal-error", description: "test error" } },
    });
  });
});
