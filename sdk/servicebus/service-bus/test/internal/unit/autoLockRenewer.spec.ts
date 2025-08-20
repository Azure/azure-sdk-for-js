// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MessagingError } from "@azure/core-amqp";
import { LockRenewer } from "$internal/core/autoLockRenewer.js";
import type {
  ManagementClient,
  SendManagementRequestOptions,
} from "$internal/core/managementClient.js";
import { getPromiseResolverForTest } from "./unittestUtils.js";
import { describe, it, vi, beforeEach, afterEach, beforeAll, afterAll } from "vitest";
import { assert, expect } from "../../public/utils/chai.js";

describe("autoLockRenewer unit tests", () => {
  let autoLockRenewer: LockRenewer;
  let renewLockSpy: ReturnType<typeof vi.spyOn<ManagementClient, any>>;
  let onErrorFake: ReturnType<typeof vi.fn>;

  const limits = {
    maxAdditionalTimeToRenewLock: 7,
    nextLockExpirationTime: 10,
    msToNextRenewal: 5,
  };

  const testLinkEntity = {
    name: "linkName",
    logPrefix: "this is my log prefix",
    entityPath: "entity path",
  };

  let stopTimerPromise: Promise<void>;

  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  beforeEach(() => {
    // just to avoid any errors where we're dealing with absolute times
    // vs just offsets.
    vi.advanceTimersByTime(100);

    const managementClient = {
      async renewLock(_lockToken: string, _options?: SendManagementRequestOptions): Promise<Date> {
        return new Date(Date.now() + limits.nextLockExpirationTime);
      },
    } as ManagementClient;

    renewLockSpy = vi.spyOn(managementClient, "renewLock");
    onErrorFake = vi.fn(async (_err: Error | MessagingError) => {
      /** Nothing to do here */
    });

    autoLockRenewer = LockRenewer.create(
      {
        getManagementClient: (entityPath) => {
          assert.equal(entityPath, "entity path");
          return managementClient;
        },
      },
      limits.maxAdditionalTimeToRenewLock,
      "peekLock",
    )!;

    // always just start the next auto-renew timer after 5 milliseconds to keep things simple.
    autoLockRenewer["_calculateRenewAfterDuration"] = () => limits.msToNextRenewal;

    let stopTimerResolve: () => void;
    ({ resolve: stopTimerResolve, promise: stopTimerPromise } = getPromiseResolverForTest());

    const origStop = autoLockRenewer["stop"].bind(autoLockRenewer);

    autoLockRenewer["stop"] = (linkEntity, message) => {
      origStop(linkEntity, message);
      stopTimerResolve();
    };
  });

  afterEach(() => {
    // each test should properly end "clean" as far as removing any
    // message timers.
    let lockRenewalTimersTotal = 0;
    for (const value of autoLockRenewer["_messageRenewLockTimers"].values()) {
      lockRenewalTimersTotal += value.size;
    }

    assert.equal(
      lockRenewalTimersTotal,
      0,
      "Should be no active lock timers after test have completed.",
    );

    // the per-link map is not cleaned up automatically - you must
    // stopAll() to remove it.
    autoLockRenewer.stopAll(testLinkEntity);
    assert.equal(
      autoLockRenewer["_messageRenewLockTimers"].size,
      0,
      "The auto lock renewal timers should be removed",
    );

    vi.restoreAllMocks();
  });

  it("standard renewal", async () => {
    autoLockRenewer.start(
      testLinkEntity,
      {
        lockToken: "lock token",
        lockedUntilUtc: new Date(),
        messageId: "message id",
      },
      onErrorFake,
    );

    vi.advanceTimersByTime(limits.msToNextRenewal - 1); // right before the renew timer would run

    assert.exists(
      autoLockRenewer["_messageRenewLockTimers"].get(testLinkEntity.name)?.get("message id"),
      "auto-renew timer should be set up",
    );

    expect(renewLockSpy).not.toHaveBeenCalled();

    vi.advanceTimersByTime(1); // tick 1 more ms - timeout for the renewal should now fire.

    await stopTimerPromise;

    expect(renewLockSpy).toHaveBeenCalledOnce(); // Lock should be renewed a single time
    expect(renewLockSpy).toHaveBeenCalledWith("lock token", { associatedLinkName: "linkName" });
    expect(onErrorFake).not.toHaveBeenCalled();
  });

  it("delete multiple times", () => {
    // no lock renewal for this message
    autoLockRenewer.stop(testLinkEntity, {
      messageId: "hello",
    });

    // no locks have been setup
    autoLockRenewer.stopAll(testLinkEntity);

    assert.isEmpty(autoLockRenewer["_messageRenewLockTimers"]);
  });

  it("renewal timer not scheduled: message is already locked for longer than our renewal would extend it", () => {
    autoLockRenewer.start(
      testLinkEntity,
      {
        lockToken: "lock token",
        // this date exceeds the max time we would renew for so we don't need to do anything.
        lockedUntilUtc: new Date(Date.now() + limits.maxAdditionalTimeToRenewLock + 1),
        messageId: "message id",
      },
      onErrorFake,
    );

    // No lock renewal - the lockedUntilUtc of this message is longer than the current time + our max auto renewal time
    expect(renewLockSpy).not.toHaveBeenCalledOnce();
    // No errors
    expect(onErrorFake).not.toHaveBeenCalled();
  });

  it("renewal timer is not (re)scheduled: the current date has passed our max lock renewal time", async () => {
    autoLockRenewer.start(
      testLinkEntity,
      {
        lockToken: "lock token",
        lockedUntilUtc: new Date(),
        messageId: "message id",
      },
      onErrorFake,
    );

    // force one tick - we'll renew the lock, which will extend it's lifetime by limits.nextLockExpirationTime
    vi.advanceTimersByTime(limits.msToNextRenewal + 1);

    expect(renewLockSpy).toHaveBeenCalledOnce(); // You always get one lock renewal

    // now we'll pretend that we somehow warped into the future - we've exceeded our max time for
    // renewal so we should just stop scheduling timers.

    renewLockSpy.mockReset();

    // let's set the time to after our max lock renewal time.
    vi.advanceTimersByTime(limits.maxAdditionalTimeToRenewLock + 1000);
    await stopTimerPromise;

    expect(renewLockSpy).not.toHaveBeenCalledOnce(); // No lock renewal. We exceeded the max allowed lock time.
    expect(onErrorFake).not.toHaveBeenCalled(); // No errors
  });

  it("invalid message can't renew", () => {
    autoLockRenewer.start(
      testLinkEntity,
      {
        messageId: "my message id",
      },
      onErrorFake,
    );

    assert.equal(
      (onErrorFake.mock.calls[0][0] as Error).message,
      "Can't start auto lock renewal for message with message id 'my message id' since it does not have a lock token.",
    );

    expect(onErrorFake).toHaveBeenCalledOnce(); // Should only have a single error
  });

  describe("AutoLockRenewer.create() does not create an AutoLockRenewer", () => {
    /** Used for tests where the mgmt client doesn't get used. */
    const unusedMgmtClient = {
      getManagementClient: () => {
        throw new Error("Not used for this test");
      },
    };

    it("doesn't support receiveAndDelete mode", () => {
      const autoLockRenewer2 = LockRenewer.create(
        unusedMgmtClient,
        1, // this is okay,
        "receiveAndDelete", // this is not okay - there aren't any locks to renew in receiveAndDelete mode.
      );

      assert.notExists(
        autoLockRenewer2,
        "Shouldn't create an autolockRenewer in receiveAndDelete mode",
      );
    });

    [0, -1].forEach((invalidMaxAutoRenewLockDurationInMs) => {
      it(`Invalid maxAutoRenewLockDurationInMs duration: ${invalidMaxAutoRenewLockDurationInMs}`, () => {
        const autoLockRenewer2 = LockRenewer.create(
          unusedMgmtClient,
          invalidMaxAutoRenewLockDurationInMs,
          "peekLock", // this is okay
        );

        assert.notExists(
          autoLockRenewer2,
          "Shouldn't create an autolockRenewer when the auto lock duration is invalid",
        );
      });
    });
  });
});
