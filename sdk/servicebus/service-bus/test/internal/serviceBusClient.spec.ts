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
    // basically, getReceiver/getDeadLetterReceiver which don't currently have
    // any options
    allLockModes.forEach((lockMode) => {
      it(`queue, no options, ${lockMode}`, () => {
        const result = extractReceiverArguments(
          undefined, // simulate a connection string without an EntityPath in it
          "queue",
          lockMode,
          undefined,
          undefined
        );
        assert.deepEqual(result, {
          entityPath: "queue",
          receiveMode: lockMode,
          options: undefined
        });
      });
    });

    // basically, getReceiver/getDeadLetterReceiver which don't currently have
    // any options
    allLockModes.forEach((lockMode) => {
      it(`queue, with options, ${lockMode}`, () => {
        const result = extractReceiverArguments(
          "queue", // simulate a connection string with an EntityPath in it
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

    // basically, simulating getSessionReceiver which does take options (although this method just returns them verbatim with no interpretation)
    allLockModes.forEach((lockMode) => {
      it(`topic and subscription, no options, ${lockMode}`, () => {
        const result = extractReceiverArguments(
          undefined, // simulate a connection string without an EntityPath in it
          "topic",
          "subscription",
          lockMode,
          undefined
        );

        assert.deepEqual(result, {
          entityPath: "topic/Subscriptions/subscription",
          receiveMode: lockMode,
          options: undefined
        });
      });
    });

    // basically, simulating getSessionReceiver which does take options (although this method just returns them verbatim with no interpretation)
    allLockModes.forEach((lockMode) => {
      it(`topic and subscription, with options, ${lockMode}`, () => {
        const result = extractReceiverArguments(
          "topic", // simulate a connection string with an EntityPath in it
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

    it("failures", () => {
      assert.throws(
        () =>
          extractReceiverArguments(
            "totally non-matching topic",
            "topic",
            "subscription",
            "receiveAndDelete",
            sessionReceiverOptions
          ),
        /The connection string this client had an EntityPath of totally non-matching topic which doesn't match the name of the topic for this receiver \(topic\)/
      );

      assert.throws(
        () =>
          extractReceiverArguments(
            "totally non-matching queue",
            "queue",
            "peekLock",
            sessionReceiverOptions,
            undefined
          ),
        /The connection string this client had an EntityPath of totally non-matching queue which doesn't match the name of the queue for this receiver \(queue\)/
      );

      assert.throws(
        () =>
          extractReceiverArguments(
            undefined,
            "topic",
            "subscription",
            "WOW THIS ISN'T A RECEIVE MODE" as "peekLock",
            sessionReceiverOptions
          ),
        /Invalid receiveMode provided/
      );
    });
  });
});
