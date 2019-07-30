// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:partitionPump");
import {
  EventPosition,
  EventHubClient,
  EventData,
  EventProcessor,
  PartitionContext,
  delay,
  PartitionProcessorFactory,
  CloseReason
} from "../src";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
const env = getEnvVars();

describe("Event Processor", function(): void {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  const client: EventHubClient = new EventHubClient(service.connectionString, service.path);
  before("validate environment", async function(): Promise<void> {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
  });

  after("close the connection", async function(): Promise<void> {
    await client.close();
  });

  it("should treat consecutive start invocations as idempotent", async function(): Promise<void> {
    const partitionIds = await client.getPartitionIds();

    // ensure we have at least 2 partitions
    partitionIds.length.should.gte(2);

    const partitionResultsMap = new Map<
      string,
      { events: string[]; initialized: boolean; closeReason?: CloseReason }
    >();
    partitionIds.forEach((id) => partitionResultsMap.set(id, { events: [], initialized: false }));
    let didError = false;

    // The partitionProcess will need to add events to the partitionResultsMap as they are received
    const factory: PartitionProcessorFactory = (context) => {
      return {
        async initialize() {
          partitionResultsMap.get(context.partitionId)!.initialized = true;
        },
        async close(reason) {
          partitionResultsMap.get(context.partitionId)!.closeReason = reason;
        },
        async processEvents(events) {
          const existingEvents = partitionResultsMap.get(context.partitionId)!.events;
          events.forEach((event) => existingEvents.push(event.body));
        },
        async processError() {
          didError = true;
        }
      };
    };

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      factory,
      undefined as any,
      {
        initialEventPosition: EventPosition.fromEnqueuedTime(new Date())
      }
    );

    processor.start();
    processor.start();
    processor.start();

    // create messages
    const expectedMessagePrefix = "EventProcessor test - multiple partitions - ";
    for (const partitionId of partitionIds) {
      const producer = client.createProducer({ partitionId });
      await producer.send({ body: expectedMessagePrefix + partitionId });
      await producer.close();
    }

    // shutdown the processor
    await processor.stop();

    didError.should.be.false;
    // validate correct events captured for each partition
    for (const partitionId of partitionIds) {
      const results = partitionResultsMap.get(partitionId)!;
      const events = results.events;
      events.length.should.equal(1);
      events[0].should.equal(expectedMessagePrefix + partitionId);
      results.initialized.should.be.true;
      (results.closeReason === CloseReason.Shutdown).should.be.true;
    }
  });

  it("should not throw if stop is called without start", async function(): Promise<void> {
    let didPartitionProcessorStart = false;

    // The partitionProcess will need to add events to the partitionResultsMap as they are received
    const factory: PartitionProcessorFactory = (context) => {
      return {
        async initialize() {
          didPartitionProcessorStart = true;
        },
        async close() {
          didPartitionProcessorStart = true;
        },
        async processEvents(events) {
          didPartitionProcessorStart = true;
        },
        async processError() {
          didPartitionProcessorStart = true;
        }
      };
    };

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      factory,
      undefined as any,
      {
        initialEventPosition: EventPosition.fromEnqueuedTime(new Date())
      }
    );

    // shutdown the processor
    await processor.stop();

    didPartitionProcessorStart.should.be.false;
  });

  it("should support start after stopping", async function(): Promise<void> {
    const partitionIds = await client.getPartitionIds();

    // ensure we have at least 2 partitions
    partitionIds.length.should.gte(2);

    const partitionResultsMap = new Map<
      string,
      { events: string[]; initialized: boolean; closeReason?: CloseReason }
    >();
    partitionIds.forEach((id) => partitionResultsMap.set(id, { events: [], initialized: false }));
    let didError = false;

    // The partitionProcess will need to add events to the partitionResultsMap as they are received
    const factory: PartitionProcessorFactory = (context) => {
      return {
        async initialize() {
          partitionResultsMap.get(context.partitionId)!.initialized = true;
        },
        async close(reason) {
          partitionResultsMap.get(context.partitionId)!.closeReason = reason;
        },
        async processEvents(events) {
          const existingEvents = partitionResultsMap.get(context.partitionId)!.events;
          events.forEach((event) => existingEvents.push(event.body));
        },
        async processError() {
          didError = true;
        }
      };
    };

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      factory,
      undefined as any,
      {
        initialEventPosition: EventPosition.fromEnqueuedTime(new Date())
      }
    );

    processor.start();

    // create messages
    const expectedMessagePrefix = "EventProcessor test - multiple partitions - ";
    for (const partitionId of partitionIds) {
      const producer = client.createProducer({ partitionId });
      await producer.send({ body: expectedMessagePrefix + partitionId });
      await producer.close();
    }

    // set a delay to give a consumers a chance to receive a message
    await delay(1000);

    // shutdown the processor
    await processor.stop();

    didError.should.be.false;
    // validate correct events captured for each partition
    for (const partitionId of partitionIds) {
      const results = partitionResultsMap.get(partitionId)!;
      const events = results.events;
      events.length.should.equal(1);
      events[0].should.equal(expectedMessagePrefix + partitionId);
      results.initialized.should.be.true;
      (results.closeReason === CloseReason.Shutdown).should.be.true;
      // reset fields
      results.initialized = false;
      results.closeReason = undefined;
      results.events = [];
    }

    // start it again
    // note: since checkpointing isn't implemented yet,
    // EventProcessor will retrieve events from the initialEventPosition.
    processor.start();

    // set a delay to give a consumers a chance to receive a message
    await delay(1000);

    await processor.stop();

    didError.should.be.false;
    // validate correct events captured for each partition
    for (const partitionId of partitionIds) {
      const results = partitionResultsMap.get(partitionId)!;
      const events = results.events;
      events.length.should.equal(1);
      events[0].should.equal(expectedMessagePrefix + partitionId);
      results.initialized.should.be.true;
      (results.closeReason === CloseReason.Shutdown).should.be.true;
    }
  });

  describe("Partition processor", function(): void {
    it("should support processing events across multiple partitions", async function(): Promise<
      void
    > {
      const partitionIds = await client.getPartitionIds();

      // ensure we have at least 2 partitions
      partitionIds.length.should.gte(2);

      const partitionResultsMap = new Map<
        string,
        { events: string[]; initialized: boolean; closeReason?: CloseReason }
      >();
      partitionIds.forEach((id) => partitionResultsMap.set(id, { events: [], initialized: false }));
      let didError = false;

      // The partitionProcess will need to add events to the partitionResultsMap as they are received
      const factory: PartitionProcessorFactory = (context) => {
        return {
          async initialize() {
            partitionResultsMap.get(context.partitionId)!.initialized = true;
          },
          async close(reason) {
            partitionResultsMap.get(context.partitionId)!.closeReason = reason;
          },
          async processEvents(events) {
            const existingEvents = partitionResultsMap.get(context.partitionId)!.events;
            events.forEach((event) => existingEvents.push(event.body));
          },
          async processError() {
            didError = true;
          }
        };
      };

      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        factory,
        undefined as any,
        {
          initialEventPosition: EventPosition.fromEnqueuedTime(new Date())
        }
      );

      processor.start();

      // create messages
      const expectedMessagePrefix = "EventProcessor test - multiple partitions - ";
      for (const partitionId of partitionIds) {
        const producer = client.createProducer({ partitionId });
        await producer.send({ body: expectedMessagePrefix + partitionId });
        await producer.close();
      }

      // set a delay to give a consumers a chance to receive a message
      await delay(1000);

      // shutdown the processor
      await processor.stop();

      didError.should.be.false;
      // validate correct events captured for each partition
      for (const partitionId of partitionIds) {
        const results = partitionResultsMap.get(partitionId)!;
        const events = results.events;
        events.length.should.equal(1);
        events[0].should.equal(expectedMessagePrefix + partitionId);
        results.initialized.should.be.true;
        (results.closeReason === CloseReason.Shutdown).should.be.true;
      }
    });

    it("should support processing events across multiple partitions without initialize or close", async function(): Promise<
      void
    > {
      const partitionIds = await client.getPartitionIds();

      // ensure we have at least 2 partitions
      partitionIds.length.should.gte(2);

      const partitionResultsMap = new Map<string, string[]>();
      partitionIds.forEach((id) => partitionResultsMap.set(id, []));
      let didError = false;

      // The partitionProcess will need to add events to the partitionResultsMap as they are received
      const factory: PartitionProcessorFactory = (context) => {
        return {
          async processEvents(events) {
            const existingEvents = partitionResultsMap.get(context.partitionId)!;
            events.forEach((event) => existingEvents.push(event.body));
          },
          async processError() {
            didError = true;
          }
        };
      };

      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        factory,
        undefined as any,
        {
          initialEventPosition: EventPosition.fromEnqueuedTime(new Date())
        }
      );

      processor.start();

      // create messages
      const expectedMessagePrefix = "EventProcessor test - multiple partitions - ";
      for (const partitionId of partitionIds) {
        const producer = client.createProducer({ partitionId });
        await producer.send({ body: expectedMessagePrefix + partitionId });
        await producer.close();
      }

      // set a delay to give a consumers a chance to receive a message
      await delay(1000);

      // shutdown the processor
      await processor.stop();

      didError.should.be.false;
      // validate correct events captured for each partition
      for (const partitionId of partitionIds) {
        const events = partitionResultsMap.get(partitionId)!;
        events.length.should.equal(1);
        events[0].should.equal(expectedMessagePrefix + partitionId);
      }
    });

    it("should call methods on a PartitionProcessor ", async function(): Promise<void> {
      const receivedEvents: EventData[] = [];
      let isinitializeCalled = false;
      let isCloseCalled = false;
      class SimpleEventProcessor {
        async initialize() {
          isinitializeCalled = true;
          debug(`Started processing`);
        }
        async processEvents(events: EventData[]) {
          for (const event of events) {
            receivedEvents.push(event);
            debug("Received event", event.body);
          }
        }

        async processError(error: Error) {
          debug(`Encountered an error: ${error.message}`);
        }

        async close() {
          isCloseCalled = true;
          debug(`Stopped processing`);
        }
      }
      const eventProcessorFactory = (context: PartitionContext) => {
        return new SimpleEventProcessor();
      };
      const partitionInfo = await client.getPartitionProperties("0");
      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        eventProcessorFactory,
        "partitionManager" as any,
        {
          initialEventPosition: EventPosition.fromSequenceNumber(
            partitionInfo.lastEnqueuedSequenceNumber
          ),
          maxBatchSize: 1,
          maxWaitTimeInSeconds: 5
        }
      );
      const producer = client.createProducer({ partitionId: "0" });
      await producer.send({ body: "Hello world!!!" });

      await processor.start();
      // after 2 seconds, stop processing
      await delay(2000);
      await processor.stop();
      await producer.close();
      isinitializeCalled.should.equal(true);
      receivedEvents.length.should.equal(1);
      receivedEvents[0].body.should.equal("Hello world!!!");
      isCloseCalled.should.equal(true);
    });
  });
}).timeout(90000);
