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
  InMemoryPartitionManager,
  PartitionOwnership,
  Checkpoint,
  PartitionProcessorFactory,
  CloseReason,
  ReceivedEventData
} from "../src";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { generate_uuid } from "rhea-promise";
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

  it("should expose an id", async function(): Promise<void> {
    const factory: PartitionProcessorFactory = (context) => {
      return {
        async processEvents() {},
        async processError() {}
      };
    };

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      factory,
      new InMemoryPartitionManager(),
      {
        initialEventPosition: EventPosition.fromEnqueuedTime(new Date())
      }
    );

    const id = processor.id;
    id.length.should.be.gt(1);
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
      new InMemoryPartitionManager(),
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
      new InMemoryPartitionManager(),
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
      new InMemoryPartitionManager(),
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
    await delay(3000);

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
    await delay(3000);

    await processor.stop();

    didError.should.be.false;
    // validate that partitionProcessor methods were called
    // do not check events until checkpointing is implemented
    for (const partitionId of partitionIds) {
      const results = partitionResultsMap.get(partitionId)!;
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
        new InMemoryPartitionManager(),
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
        new InMemoryPartitionManager(),
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

      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        eventProcessorFactory,
        new InMemoryPartitionManager(),
        {
          initialEventPosition: EventPosition.fromEnqueuedTime(new Date()),
          maxBatchSize: 1,
          maxWaitTimeInSeconds: 5
        }
      );
      const producer = client.createProducer({ partitionId: "0" });
      await producer.send({ body: "Hello world!!!" });
      await producer.close();

      await processor.start();
      // after 2 seconds, stop processing
      await delay(2000);
      await processor.stop();
      isinitializeCalled.should.equal(true);
      receivedEvents.length.should.equal(1);
      receivedEvents[0].body.should.equal("Hello world!!!");
      isCloseCalled.should.equal(true);
    });
  });

  describe("InMemory Partition Manager", function(): void {
    it("should claim ownership, get a list of ownership and update checkpoint", async function(): Promise<
      void
    > {
      const inMemoryPartitionManager = new InMemoryPartitionManager();
      const partitionOwnership1: PartitionOwnership = {
        eventHubName: "myEventHub",
        consumerGroupName: EventHubClient.defaultConsumerGroupName,
        ownerId: generate_uuid(),
        partitionId: "0",
        ownerLevel: 10
      };
      const partitionOwnership2: PartitionOwnership = {
        eventHubName: "myEventHub",
        consumerGroupName: EventHubClient.defaultConsumerGroupName,
        ownerId: generate_uuid(),
        partitionId: "1",
        ownerLevel: 10
      };
      const partitionOwnership = await inMemoryPartitionManager.claimOwnership([
        partitionOwnership1,
        partitionOwnership2
      ]);
      partitionOwnership.length.should.equals(2);
      const ownershiplist = await inMemoryPartitionManager.listOwnership(
        "myEventHub",
        EventHubClient.defaultConsumerGroupName
      );
      ownershiplist.length.should.equals(2);

      const checkpoint: Checkpoint = {
        eventHubName: "myEventHub",
        consumerGroupName: EventHubClient.defaultConsumerGroupName,
        ownerId: generate_uuid(),
        partitionId: "0",
        sequenceNumber: 10,
        offset: 50,
        eTag: generate_uuid()
      };

      await inMemoryPartitionManager.updateCheckpoint(checkpoint);
      const partitionOwnershipList = await inMemoryPartitionManager.listOwnership(
        "myEventHub",
        EventHubClient.defaultConsumerGroupName
      );
      partitionOwnershipList[0].partitionId.should.equals(checkpoint.partitionId);
      partitionOwnershipList[0].sequenceNumber!.should.equals(checkpoint.sequenceNumber);
      partitionOwnershipList[0].offset!.should.equals(checkpoint.offset);
    });

    it("should receive events from the checkpoint", async function(): Promise<void> {
      const partitionIds = await client.getPartitionIds();

      // ensure we have at least 2 partitions
      partitionIds.length.should.gte(2);

      let checkpointMap = new Map<string, ReceivedEventData[]>();
      partitionIds.forEach((id) => checkpointMap.set(id, []));
      let didError = false;

      let partionCount: { [x: string]: number } = {};
      const factory: PartitionProcessorFactory = (context, checkpointManager) => {
        return {
          async processEvents(events: ReceivedEventData[]) {
            !partionCount[context.partitionId]
              ? (partionCount[context.partitionId] = 1)
              : partionCount[context.partitionId]++;
            const existingEvents = checkpointMap.get(context.partitionId)!;
            for (const event of events) {
              debug("Received event: '%s' from partition: '%s'", event.body, context.partitionId);
              if (partionCount[context.partitionId] <= 50) {
                await checkpointManager.updateCheckpoint(event);
                existingEvents.push(event);
              }
            }
          },
          async processError() {
            didError = true;
          }
        };
      };

      const inMemoryPartitionManager = new InMemoryPartitionManager();
      const processor1 = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        factory,
        inMemoryPartitionManager,
        {
          initialEventPosition: EventPosition.fromEnqueuedTime(new Date())
        }
      );

      // start first processor
      processor1.start();

      // create messages
      const expectedMessagePrefix = "EventProcessor test - checkpoint - ";
      const events: EventData[] = [];

      for (const partitionId of partitionIds) {
        const producer = client.createProducer({ partitionId });
        for (let index = 1; index <= 100; index++) {
          events.push({ body: `${expectedMessagePrefix} ${index} ${partitionId}` });
        }
        await producer.send(events);
        await producer.close();
      }

      // set a delay to give a consumers a chance to receive a message
      await delay(5000);

      // shutdown the first processor
      await processor1.stop();

      const lastEventsReceivedFromProcessor1: ReceivedEventData[] = [];
      let index = 0;

      for (const partitionId of partitionIds) {
        const receivedEvents = checkpointMap.get(partitionId)!;
        lastEventsReceivedFromProcessor1[index++] = receivedEvents[receivedEvents.length - 1];
      }

      checkpointMap = new Map<string, ReceivedEventData[]>();
      partitionIds.forEach((id) => checkpointMap.set(id, []));
      partionCount = {};

      const processor2 = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        factory,
        inMemoryPartitionManager
      );
      // start second processor
      processor2.start();

      // set a delay to give a consumers a chance to receive a message
      await delay(5000);

      // shutdown the second processor
      await processor2.stop();

      index = 0;
      const firstEventsReceivedFromProcessor2: ReceivedEventData[] = [];
      for (const partitionId of partitionIds) {
        const receivedEvents = checkpointMap.get(partitionId)!;
        firstEventsReceivedFromProcessor2[index++] = receivedEvents[0];
      }

      didError.should.be.false;
      index = 0;
      // validate correct events captured for each partition using checkpoint
      for (const partitionId of partitionIds) {
        debug(`Validate events for partition: ${partitionId}`);
        lastEventsReceivedFromProcessor1[index].sequenceNumber.should.equal(
          firstEventsReceivedFromProcessor2[index].sequenceNumber - 1
        );
        index++;
      }
    });
  });
}).timeout(90000);
