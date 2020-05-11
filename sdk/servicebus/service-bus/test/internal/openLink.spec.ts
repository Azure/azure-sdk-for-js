// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { openLink, OpenArgs } from "../../src/shared/openLink";
import * as log from "../../src/log";
import { AbortController } from "@azure/abort-controller";
import { Receiver as RheaReceiver } from "rhea-promise";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe("openLink", () => {
  let isConnecting = false;

  beforeEach(() => {
    isConnecting = false;
  });

  afterEach(() => {
    assert.isFalse(isConnecting, "isConnecting should always be cleared when we exit open");
  });

  // sync: ie, checks that run before we do any async work (early-early-termination)
  // withinlock: stuff that runs within the openLock
  it("sync: abortSignal is checked before async", () => {
    try {
      // note that I'm not awaiting on the promise - the
      // abortError will come before any async code.
      const ac = new AbortController();
      ac.abort();

      openLink({
        create: NOTUSEDFORTEST,
        isOpen: NOTUSEDFORTEST,
        ensureTokenRenewal: NOTUSEDFORTEST,
        isConnecting: NOTUSEDFORTEST,
        setIsConnecting: NOTUSEDFORTEST,
        logPrefix: "log prefix",
        logger: log.receiver,
        openLock: "a lock value",
        negotiateClaim: () => {
          throw new Error("Won't get called");
        },
        abortSignal: ac.signal
      });
      assert.fail("Should have thrown");
    } catch (err) {
      assert.equal(err.name, "AbortError");
    }
  });

  it("sync: don't create a link entity if we're already open or are connecting", async () => {
    let result = await openLink({
      isOpen: () => true,
      create: NOTUSEDFORTEST,
      ensureTokenRenewal: NOTUSEDFORTEST,
      isConnecting: NOTUSEDFORTEST,
      setIsConnecting: NOTUSEDFORTEST,
      logPrefix: "log prefix",
      logger: log.receiver,
      openLock: "a lock value",
      negotiateClaim: () => {
        throw new Error("Won't get called");
      }
    });

    // connection is already open, not bothering to create a new receiver.
    assert.notExists(result, "Connection is already open");

    result = await openLink({
      // and if we're in the middle of connecting (ie, isConnecting == true)
      // we also don't bother creating a new receiver.
      isOpen: () => false,
      isConnecting: () => true,
      setIsConnecting: NOTUSEDFORTEST,
      create: NOTUSEDFORTEST,
      ensureTokenRenewal: NOTUSEDFORTEST,
      logPrefix: "log prefix",
      logger: log.receiver,
      openLock: "a lock value",
      negotiateClaim: () => {
        throw new Error("Won't get called");
      }
    });

    // connection is not open but we're in the middle of connecting, not bothering to create a new receiver.
    assert.notExists(
      result,
      "Connection isn't open _but_ we are connecting (this.isConnecting === true)"
    );
  });

  it("withinlock: critical calls are protected by the lock", async () => {
    const callsWithinLock: string[] = [];
    let isConnecting = false;

    await openLink({
      isOpen: () => false,
      isConnecting: () => isConnecting,
      setIsConnecting: (value) => {
        if (value != null) {
          callsWithinLock.push(value ? "isConnecting=true" : "isConnecting=false");
          isConnecting = value;
        }
        return isConnecting;
      },
      create: async () => {
        callsWithinLock.push("create");
        return {} as RheaReceiver;
      },
      ensureTokenRenewal: async () => {
        callsWithinLock.push("ensureTokenRenewal");
      },
      logPrefix: "log prefix",
      logger: log.receiver,
      openLock: "a lock value",
      negotiateClaim: async () => {
        callsWithinLock.push("negotiateClaim");
      }
    });

    assert.deepEqual(callsWithinLock, [
      "isConnecting=true",
      "negotiateClaim",
      "create",
      "ensureTokenRenewal",
      "isConnecting=false"
    ]);
  });

  it("withinlock: was opened just before the lock was taken", async () => {
    let openWasCalled = false;

    const prm = openLink({
      ...setupIsConnecting(),
      isOpen: () => {
        // pretend to NOT be open when we do the open check
        // in the sync part of the function. The next call to open
        // will happen in the async block (inside of the lock).
        if (openWasCalled) {
          return true;
        } else {
          openWasCalled = true;
          return false;
        }
      },
      create: NOTUSEDFORTEST,
      ensureTokenRenewal: NOTUSEDFORTEST,
      logPrefix: "log prefix",
      logger: log.receiver,
      openLock: "a lock value",
      negotiateClaim: async () => {
        return;
      }
    });

    const receiver = await prm;
    assert.notExists(receiver, "No receiver is created if the connection is already open");
  });

  it("withinlock: link entity is closed if there's an error or AbortError", async () => {
    let receiverWasClosed = false;

    const prm = openLink({
      ...skipToAsyncPortionOfOpen(),
      setIsConnecting: (value) => (isConnecting = value),
      create: async () => {
        return {
          close: async () => {
            receiverWasClosed = true;
          }
        } as RheaReceiver;
      },
      ensureTokenRenewal: async () => {
        throw new Error("Error after receiver is created will cause the receiver to be closed.");
      },
      logPrefix: "log prefix",
      logger: log.receiver,
      openLock: "a lock value",
      negotiateClaim: async () => {
        return;
      }
    });

    try {
      await prm;
      assert.fail("Should have thrown");
    } catch (err) {
      assert.equal(
        err.message,
        "Error after receiver is created will cause the receiver to be closed."
      );
    }

    assert.isTrue(receiverWasClosed);
  });

  it("withinlock: link entity was never opened and we had an error", async () => {
    const prm = openLink({
      ...skipToAsyncPortionOfOpen(),
      negotiateClaim: async () => {
        throw new Error("Early failure trying to negotiate claim!");
      },
      create: async () => {
        return {} as RheaReceiver;
      },
      logPrefix: "log prefix",
      logger: log.receiver,
      openLock: "a lock value",
      ensureTokenRenewal: NOTUSEDFORTEST
    });

    try {
      await prm;
      assert.fail("Should have thrown");
    } catch (err) {
      assert.equal(err.message, "Early failure trying to negotiate claim!");
    }
  });

  function setupIsConnecting(): Pick<OpenArgs<RheaReceiver>, "isConnecting" | "setIsConnecting"> {
    isConnecting = false;

    return {
      isConnecting: () => isConnecting,
      setIsConnecting: (value) => (isConnecting = value)
    };
  }

  function skipToAsyncPortionOfOpen(): Pick<
    OpenArgs<RheaReceiver>,
    "isOpen" | "isConnecting" | "setIsConnecting"
  > {
    return {
      isOpen: () => false,
      ...setupIsConnecting()
    };
  }
});

function NOTUSEDFORTEST<T>(): T {
  throw new Error("Won't get called");
}
