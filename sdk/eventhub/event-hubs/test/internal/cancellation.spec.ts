// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { createReceiver, PartitionReceiver } from "../../src/partitionReceiver.js";
import { EventHubSender } from "../../src/eventHubSender.js";
import { ConnectionContext } from "../../src/connectionContext.js";
import { createContext } from "../utils/clients.js";
import { expect } from "../utils/chai.js";
import { describe, it, beforeEach, afterEach } from "vitest";

const cancellationCases = [
  {
    type: "pre-aborted",
    getSignal() {
      const controller = new AbortController();
      controller.abort();
      return controller.signal;
    },
  },
  {
    type: "aborted after timeout",
    getSignal() {
      const controller = new AbortController();
      setTimeout(() => {
        controller.abort();
      }, 0);
      return controller.signal;
    },
  },
];

function expectAbortError(promise: Promise<unknown>): Chai.PromisedAssertion {
  return expect(promise).to.eventually.be.rejected.and.has.property("name", "AbortError");
}

describe("Cancellation via AbortSignal", function () {
  let context: ConnectionContext;
  beforeEach(async function () {
    context = createContext().context;
  });

  afterEach(async function () {
    await context.close();
  });

  describe("EventHubReceiver", function () {
    let client: PartitionReceiver;
    const timeoutInMs = 60000;
    beforeEach(async function () {
      client = createReceiver(
        context,
        "$default", // consumer group
        "ID",
        "0", // partition id
        {
          enqueuedOn: Date.now(),
        },
      );
    });

    afterEach(async function () {
      await client.close();
    });

    for (const { type: caseType, getSignal } of cancellationCases) {
      it(`initialize supports cancellation (${caseType})`, async function () {
        await expectAbortError(client.connect({ abortSignal: getSignal(), timeoutInMs }));
      });

      it(`receiveBatch supports cancellation (${caseType})`, async function () {
        await expectAbortError(client.receiveBatch(10, undefined, getSignal()));
      });

      it(`receiveBatch supports cancellation when connection already exists (${caseType})`, async function () {
        // Open the connection.
        await client.connect({ abortSignal: undefined, timeoutInMs });
        await expectAbortError(client.receiveBatch(10, undefined, getSignal()));
      });
    }
  });

  describe("EventHubSender", function () {
    let client: EventHubSender;
    beforeEach(async function () {
      client = new EventHubSender(context, "Sender1", { enableIdempotentProducer: false });
    });

    afterEach(async function () {
      await client.close();
    });

    for (const { type: caseType, getSignal } of cancellationCases) {
      it(`_getLink supports cancellation (${caseType})`, async function () {
        await expectAbortError(client["_getLink"]({ abortSignal: getSignal() }));
      });

      it(`getMaxMessageSize supports cancellation (${caseType})`, async function () {
        await expectAbortError(client.getMaxMessageSize({ abortSignal: getSignal() }));
      });

      it(`send supports cancellation (${caseType})`, async function () {
        await expectAbortError(
          client.send([{ body: "unsung hero" }], { abortSignal: getSignal() }),
        );
      });
    }
  });
});
