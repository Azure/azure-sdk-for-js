// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PartitionReceiver } from "$internal/partitionReceiver.js";
import { createReceiver } from "$internal/partitionReceiver.js";
import { EventHubSender } from "$internal/eventHubSender.js";
import type { ConnectionContext } from "$internal/connectionContext.js";
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

describe("Cancellation via AbortSignal", () => {
  let context: ConnectionContext;
  beforeEach(async () => {
    context = createContext().context;
  });

  afterEach(async () => {
    await context.close();
  });

  describe("EventHubReceiver", () => {
    let client: PartitionReceiver;
    const timeoutInMs = 60000;
    beforeEach(async () => {
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

    afterEach(async () => {
      await client.close();
    });

    for (const { type: caseType, getSignal } of cancellationCases) {
      it(`initialize supports cancellation (${caseType})`, async () => {
        await expectAbortError(client.connect({ abortSignal: getSignal(), timeoutInMs }));
      });

      it(`receiveBatch supports cancellation (${caseType})`, async () => {
        await expectAbortError(client.receiveBatch(10, undefined, getSignal()));
      });

      it(`receiveBatch supports cancellation when connection already exists (${caseType})`, async () => {
        // Open the connection.
        await client.connect({ abortSignal: undefined, timeoutInMs });
        await expectAbortError(client.receiveBatch(10, undefined, getSignal()));
      });
    }
  });

  describe("EventHubSender", () => {
    let client: EventHubSender;
    beforeEach(async () => {
      client = new EventHubSender(context, "Sender1", { enableIdempotentProducer: false });
    });

    afterEach(async () => {
      await client.close();
    });

    for (const { type: caseType, getSignal } of cancellationCases) {
      it(`_getLink supports cancellation (${caseType})`, async () => {
        await expectAbortError(client["_getLink"]({ abortSignal: getSignal() }));
      });

      it(`getMaxMessageSize supports cancellation (${caseType})`, async () => {
        await expectAbortError(client.getMaxMessageSize({ abortSignal: getSignal() }));
      });

      it(`send supports cancellation (${caseType})`, async () => {
        await expectAbortError(
          client.send([{ body: "unsung hero" }], { abortSignal: getSignal() }),
        );
      });
    }
  });
});
