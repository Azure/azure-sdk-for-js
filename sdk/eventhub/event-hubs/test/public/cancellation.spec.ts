// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { EventHubConsumerClient, EventHubProducerClient } from "../../src/index.js";
import { describe, it, beforeEach, afterEach } from "vitest";
import { createConsumer, createProducer } from "../utils/clients.js";
import { expect } from "../utils/chai.js";

function expectAbortError(promise: Promise<unknown>): Chai.PromisedAssertion {
  return expect(promise).to.eventually.be.rejected.and.has.property("name", "AbortError");
}

describe("Cancellation via AbortSignal", function () {
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

  describe("EventHubConsumerClient", function () {
    let consumerClient: EventHubConsumerClient;
    beforeEach(async function () {
      consumerClient = createConsumer().consumer;
    });

    afterEach(async function () {
      await consumerClient.close();
    });

    for (const { type: caseType, getSignal } of cancellationCases) {
      it(`getEventHubProperties supports cancellation (${caseType})`, async function () {
        await expectAbortError(consumerClient.getEventHubProperties({ abortSignal: getSignal() }));
      });

      it(`getPartitionIds supports cancellation (${caseType})`, async function () {
        await expectAbortError(consumerClient.getPartitionIds({ abortSignal: getSignal() }));
      });

      it(`getPartitionProperties supports cancellation (${caseType})`, async function () {
        await expectAbortError(
          consumerClient.getPartitionProperties("0", { abortSignal: getSignal() }),
        );
      });
    }
  });

  describe("EventHubProducerClient", function () {
    let producerClient: EventHubProducerClient;
    beforeEach(async function () {
      producerClient = createProducer().producer;
    });

    afterEach(async function () {
      await producerClient.close();
    });

    for (const { type: caseType, getSignal } of cancellationCases) {
      it(`getEventHubProperties supports cancellation (${caseType})`, async function () {
        await expectAbortError(producerClient.getEventHubProperties({ abortSignal: getSignal() }));
      });

      it(`getPartitionIds supports cancellation (${caseType})`, async function () {
        await expectAbortError(producerClient.getPartitionIds({ abortSignal: getSignal() }));
      });

      it(`getPartitionProperties supports cancellation (${caseType})`, async function () {
        await expectAbortError(
          producerClient.getPartitionProperties("0", { abortSignal: getSignal() }),
        );
      });

      it(`createBatch supports cancellation (${caseType})`, async function () {
        await expectAbortError(producerClient.createBatch({ abortSignal: getSignal() }));
      });

      it(`sendBatch supports cancellation (${caseType})`, async function () {
        await expectAbortError(
          producerClient.sendBatch([{ body: "unsung hero" }], { abortSignal: getSignal() }),
        );
      });
    }
  });
});
