// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventHubProducerClient, MessagingError } from "../../src/index.js";
import { should } from "../utils/chai.js";
import debugModule from "debug";
import { describe, it, beforeEach, afterEach } from "vitest";
import { createBufferedProducer, createConsumer, createProducer } from "../utils/clients.js";

const debug = debugModule("azure:event-hubs:hubruntime-spec");

type ClientCommonMethods = Pick<
  EventHubProducerClient,
  "close" | "getEventHubProperties" | "getPartitionIds" | "getPartitionProperties"
>;

describe("RuntimeInformation", function () {
  const clientTypes = [
    "EventHubBufferedProducerClient",
    "EventHubConsumerClient",
    "EventHubProducerClient",
  ] as const;
  const clientMap = new Map<(typeof clientTypes)[number], ClientCommonMethods>();
  let eventhubName: string;

  beforeEach(async function () {
    debug("Creating the clients..");
    const bufferedProducer = createBufferedProducer();
    eventhubName = bufferedProducer.eventhubName;
    clientMap.set("EventHubBufferedProducerClient", bufferedProducer.producer);
    clientMap.set("EventHubConsumerClient", createConsumer().consumer);
    clientMap.set("EventHubProducerClient", createProducer().producer);
  });

  afterEach(async function () {
    for (const client of clientMap.values()) {
      await client.close();
    }
  });

  function arrayOfIncreasingNumbersFromZero(length: any): Array<string> {
    const result = new Array(length);
    for (let i = 0; i < length; i++) {
      result[i] = `${i}`;
    }
    return result;
  }

  clientTypes.forEach((clientType) => {
    describe(`${clientType}.getPartitionIds`, function () {
      it("returns an array of partition ids", async function () {
        const client = clientMap.get(clientType)!;
        const ids = await client.getPartitionIds({});
        ids.should.have.members(arrayOfIncreasingNumbersFromZero(ids.length));
      });
    });

    describe(`${clientType}.getEventHubProperties`, function () {
      it("gets the Event Hub runtime information", async function () {
        const client = clientMap.get(clientType)!;
        const hubRuntimeInfo = await client.getEventHubProperties();
        hubRuntimeInfo.name.should.equal(eventhubName);

        hubRuntimeInfo.partitionIds.should.have.members(
          arrayOfIncreasingNumbersFromZero(hubRuntimeInfo.partitionIds.length),
        );
        hubRuntimeInfo.createdOn.should.be.instanceof(Date);
      });
    });

    describe(`${clientType}.getPartitionProperties`, function () {
      it("gets the partition runtime information with partitionId as a string", async function () {
        const client = clientMap.get(clientType)!;
        const partitionRuntimeInfo = await client.getPartitionProperties("0");
        partitionRuntimeInfo.partitionId.should.equal("0");
        partitionRuntimeInfo.eventHubName.should.equal(eventhubName);
        partitionRuntimeInfo.lastEnqueuedOnUtc.should.be.instanceof(Date);
        should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
        should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
      });

      it("gets the partition runtime information with partitionId as a number", async function () {
        const client = clientMap.get(clientType)!;
        const partitionRuntimeInfo = await client.getPartitionProperties(0 as any);
        partitionRuntimeInfo.partitionId.should.equal("0");
        partitionRuntimeInfo.eventHubName.should.equal(eventhubName);
        partitionRuntimeInfo.lastEnqueuedOnUtc.should.be.instanceof(Date);
        should.exist(partitionRuntimeInfo.lastEnqueuedSequenceNumber);
        should.exist(partitionRuntimeInfo.lastEnqueuedOffset);
      });

      it("bubbles up error from service for invalid partitionId", async function () {
        try {
          const client = clientMap.get(clientType)!;
          await client.getPartitionProperties("boo");
          throw new Error("Test failure");
        } catch (err: any) {
          should.exist(err);
          should.equal((err as MessagingError).code, "ArgumentOutOfRangeError");
        }
      });
    });
  });
});
