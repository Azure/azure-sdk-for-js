// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { extractReceiverArguments } from "../../src/serviceBusClient";
import chai from "chai";
import { GetSessionReceiverOptions } from "../../src/models";
const assert = chai.assert;

const allLockModes: ("peekLock" | "receiveAndDelete")[] = ["peekLock", "receiveAndDelete"];

describe("serviceBusClient unit tests", () => {
  // the options type is used for our tests but it's not _hugely_ important, only
  // that it can and does get returned verbatim from whatever options slot
  // we pass.
  // So if we add other options types there's no need to generate a whole
  // new set of tests for it. :)
  const sessionReceiverOptions: GetSessionReceiverOptions = {
    sessionId: "session-id"
  };

  describe("extractReceiverArguments", () => {
    // valid cases

    // basically, getReceiver/getDeadLetterReceiver which don't currently have
    // any options
    allLockModes.forEach((lockMode) => {
      it(`queue, no options, ${lockMode}`, () => {
        const result = extractReceiverArguments("queue", lockMode, undefined, undefined);
        assert.deepEqual(result, {
          entityPath: "queue",
          receiveMode: lockMode,
          options: undefined
        });
      });
    });

    allLockModes.forEach((lockMode) => {
      it(`queue, with options, ${lockMode}`, () => {
        const result = extractReceiverArguments(
          "queue",
          lockMode,
          sessionReceiverOptions,
          undefined
        );
        assert.deepEqual(result, {
          entityPath: "queue",
          receiveMode: lockMode,
          options: sessionReceiverOptions
        });
      });
    });

    // basically, getSessionReceiver which does take options (although this method just returns them verbatim with no interpretation)
    allLockModes.forEach((lockMode) => {
      it(`topic and subscription, no options, ${lockMode}`, () => {
        const result = extractReceiverArguments("topic", "subscription", lockMode, undefined);

        assert.deepEqual(result, {
          entityPath: "topic/Subscriptions/subscription",
          receiveMode: lockMode,
          options: undefined
        });
      });
    });

    allLockModes.forEach((lockMode) => {
      it(`topic and subscription, with options, ${lockMode}`, () => {
        const result = extractReceiverArguments(
          "topic",
          "subscription",
          lockMode,
          sessionReceiverOptions
        );

        assert.deepEqual(result, {
          entityPath: "topic/Subscriptions/subscription",
          receiveMode: lockMode,
          options: sessionReceiverOptions
        });
      });
    });
  });
});
