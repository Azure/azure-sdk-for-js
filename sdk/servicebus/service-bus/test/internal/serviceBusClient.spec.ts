// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { extractReceiverArguments } from "../../src/serviceBusClient";
import chai from "chai";
import { CreateSessionReceiverOptions } from "../../src/models";
const assert = chai.assert;

const allLockModes: ("peekLock" | "receiveAndDelete")[] = ["peekLock", "receiveAndDelete"];

describe("serviceBusClient unit tests", () => {
  // the options type is used for our tests but it's not _hugely_ important, only
  // that it can and does get returned verbatim from whatever options slot
  // we pass.
  // So if we add other options types there's no need to generate a whole
  // new set of tests for it. :)
  const sessionReceiverOptions:
    | CreateSessionReceiverOptions<"peekLock">
    | CreateSessionReceiverOptions<"receiveAndDelete"> = {
    sessionId: "session-id"
  };

  describe("extractReceiverArguments", () => {
    // basically, getReceiver/getDeadLetterReceiver which don't currently have
    // any options
    allLockModes.forEach((lockMode) => {
      it(`queue, no options, ${lockMode}`, () => {
        const result = extractReceiverArguments("queue", { receiveMode: lockMode });
        assert.deepEqual(result, {
          entityPath: "queue",
          receiveMode: lockMode,
          options: {}
        });
      });
    });

    // basically, getReceiver/getDeadLetterReceiver which don't currently have
    // any options
    allLockModes.forEach((lockMode) => {
      it(`queue, with options, ${lockMode}`, () => {
        const result = extractReceiverArguments("queue", {
          ...sessionReceiverOptions,
          receiveMode: lockMode
        });
        assert.deepEqual(result, {
          entityPath: "queue",
          receiveMode: lockMode,
          options: sessionReceiverOptions
        });
      });
    });

    // basically, simulating getSessionReceiver which does take options (although this method just returns them verbatim with no interpretation)
    allLockModes.forEach((lockMode) => {
      it(`topic and subscription, no options, ${lockMode}`, () => {
        const result = extractReceiverArguments("topic", "subscription", { receiveMode: lockMode });

        assert.deepEqual(result, {
          entityPath: "topic/Subscriptions/subscription",
          receiveMode: lockMode,
          options: {}
        });
      });
    });

    // basically, simulating getSessionReceiver which does take options (although this method just returns them verbatim with no interpretation)
    allLockModes.forEach((lockMode) => {
      it(`topic and subscription, with options, ${lockMode}`, () => {
        const result = extractReceiverArguments("topic", "subscription", {
          ...sessionReceiverOptions,
          receiveMode: lockMode
        });

        assert.deepEqual(result, {
          entityPath: "topic/Subscriptions/subscription",
          receiveMode: lockMode,
          options: sessionReceiverOptions
        });
      });
    });

    it("failures", () => {
      assert.throws(
        () =>
          extractReceiverArguments("topic", "subscription", {
            ...sessionReceiverOptions,
            receiveMode: "WOW THIS ISN'T A RECEIVE MODE" as "peekLock"
          }),
        /Invalid receiveMode provided/
      );
    });
  });
});
