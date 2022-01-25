// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { MessagingError } from "@azure/core-amqp";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;
import * as sinon from "sinon";
import { LockRenewer } from "../../../src/core/autoLockRenewer";
import { ManagementClient, SendManagementRequestOptions } from "../../../src/core/managementClient";
import { getPromiseResolverForTest } from "./unittestUtils";

describe("autoLockRenewer unit tests", () => {
  let clock: ReturnType<typeof sinon.useFakeTimers>;

  let autoLockRenewer: LockRenewer;

  let renewLockSpy: sinon.SinonSpy<
    Parameters<ManagementClient["renewLock"]>,
    ReturnType<ManagementClient["renewLock"]>
  >;

  let onErrorFake: sinon.SinonSpy;

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

  beforeEach(() => {
    clock = sinon.useFakeTimers();

    // just to avoid any errors where we're dealing with absolute times
    // vs just offsets.
    clock.tick(100);

    const managementClient = {
      async renewLock(_lockToken: string, _options?: SendManagementRequestOptions): Promise<Date> {
        return new Date(Date.now() + limits.nextLockExpirationTime);
      },
    } as ManagementClient;

    renewLockSpy = sinon.spy(managementClient, "renewLock");
    onErrorFake = sinon.fake(async (_err: Error | MessagingError) => {
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
      "peekLock"
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
      "Should be no active lock timers after test have completed."
    );

    // the per-link map is not cleaned up automatically - you must
    // stopAll() to remove it.
    autoLockRenewer.stopAll(testLinkEntity);
    assert.equal(
      autoLockRenewer["_messageRenewLockTimers"].size,
      0,
      "The auto lock renewal timers should be removed"
    );

    clock.restore();
  });

  it("standard renewal", async () => {
    autoLockRenewer.start(
      testLinkEntity,
      {
        lockToken: "lock token",
        lockedUntilUtc: new Date(),
        messageId: "message id",
      },
      onErrorFake
    );

    clock.tick(limits.msToNextRenewal - 1); // right before the renew timer would run

    assert.exists(
      autoLockRenewer["_messageRenewLockTimers"].get(testLinkEntity.name)?.get("message id"),
      "auto-renew timer should be set up"
    );

    assert.isFalse(
      renewLockSpy.calledOnce,
      "Our timeout duration should not fire yet and so we shouldn't renew anything."
    );

    clock.tick(1); // tick 1 more ms - timeout for the renewal should now fire.

    await stopTimerPromise;

    const actualLockToken = renewLockSpy.args[0][0] as string;

    assert.equal(actualLockToken, "lock token", "should renew with the proper lock token");
    assert.isTrue(renewLockSpy.calledOnce, "Lock should be renewed a single time");
    assert.isFalse(onErrorFake.called, "no errors");
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
      onErrorFake
    );

    assert.isFalse(
      renewLockSpy.calledOnce,
      "No lock renewal - the lockedUntilUtc of this message is longer than the current time + our max auto renewal time"
    );

    assert.isFalse(onErrorFake.called, "no errors");
  });

  it("renewal timer is not (re)scheduled: the current date has passed our max lock renewal time", async () => {
    autoLockRenewer.start(
      testLinkEntity,
      {
        lockToken: "lock token",
        lockedUntilUtc: new Date(),
        messageId: "message id",
      },
      onErrorFake
    );

    // force one tick - we'll renew the lock, which will extend it's lifetime by limits.nextLockExpirationTime
    clock.tick(limits.msToNextRenewal + 1);

    assert.isTrue(renewLockSpy.calledOnce, "You always get one lock renewal");

    // now we'll pretend that we somehow warped into the future - we've exceeded our max time for
    // renewal so we should just stop scheduling timers.

    renewLockSpy.resetHistory();

    // let's set the time to after our max lock renewal time.
    clock.tick(limits.maxAdditionalTimeToRenewLock + 1000);
    await stopTimerPromise;

    assert.isFalse(
      renewLockSpy.calledOnce,
      "No lock renewal. We exceeded the max allowed lock time."
    );
    assert.isFalse(onErrorFake.called, "no errors");
  });

  it("invalid message can't renew", () => {
    autoLockRenewer.start(
      testLinkEntity,
      {
        messageId: "my message id",
      },
      onErrorFake
    );

    assert.equal(
      (onErrorFake.args[0][0] as Error).message,
      "Can't start auto lock renewal for message with message id 'my message id' since it does not have a lock token."
    );

    assert.isTrue(onErrorFake.calledOnce, "Should only have a single error");
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
        "receiveAndDelete" // this is not okay - there aren't any locks to renew in receiveAndDelete mode.
      );

      assert.notExists(
        autoLockRenewer2,
        "Shouldn't create an autolockRenewer in receiveAndDelete mode"
      );
    });

    [0, -1].forEach((invalidMaxAutoRenewLockDurationInMs) => {
      it(`Invalid maxAutoRenewLockDurationInMs duration: ${invalidMaxAutoRenewLockDurationInMs}`, () => {
        const autoLockRenewer2 = LockRenewer.create(
          unusedMgmtClient,
          invalidMaxAutoRenewLockDurationInMs,
          "peekLock" // this is okay
        );

        assert.notExists(
          autoLockRenewer2,
          "Shouldn't create an autolockRenewer when the auto lock duration is invalid"
        );
      });
    });
  });
});
