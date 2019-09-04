// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:partitionPump");
import {
  EventHubClient,
  EventData,
  EventProcessor,
  PartitionContext,
  delay,
  InMemoryPartitionManager,
  PartitionOwnership,
  Checkpoint,
  CloseReason,
  ReceivedEventData,
  PartitionProcessor
} from "../src";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { generate_uuid, Dictionary } from "rhea-promise";
const env = getEnvVars();

describe("Event Processor", function (): void {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  let client: EventHubClient;
  before("validate environment", async function (): Promise<void> {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
  });

  beforeEach("create the client", function () {
    client = new EventHubClient(service.connectionString, service.path);
  });

  afterEach("close the connection", async function (): Promise<void> {
    await client.close();
  });

  it("should expose an id", async function (): Promise<void> {
    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      PartitionProcessor,
      new InMemoryPartitionManager()
    );

    const id = processor.id;
    id.length.should.be.gt(1);
  });

  it("should treat consecutive start invocations as idempotent", async function (): Promise<void> {
    const partitionIds = await client.getPartitionIds();

    // ensure we have at least 2 partitions
    partitionIds.length.should.gte(2);

    const partitionResultsMap = new Map<
      string,
      { events: string[]; initialized: boolean; closeReason?: CloseReason }
    >();
    partitionIds.forEach((id) => partitionResultsMap.set(id, { events: [], initialized: false }));
    let didError = false;
    const partitionOwnerShip = new Set();

    // The partitionProcess will need to add events to the partitionResultsMap as they are received
    class FooPartitionProcessor extends PartitionProcessor {
      async initialize(partitionContext: PartitionContext) {
        partitionResultsMap.get(partitionContext.partitionId)!.initialized = true;
      }
      async close(reason: CloseReason, partitionContext: PartitionContext) {
        partitionResultsMap.get(partitionContext.partitionId)!.closeReason = reason;
      }
      async processEvents(events: ReceivedEventData[], partitionContext: PartitionContext) {
        partitionOwnerShip.add(partitionContext.partitionId);
        const existingEvents = partitionResultsMap.get(partitionContext.partitionId)!.events;
        events.forEach((event) => existingEvents.push(event.body));
      }
      async processError() {
        didError = true;
      }
    }

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      FooPartitionProcessor,
      new InMemoryPartitionManager()
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

    while (partitionOwnerShip.size !== partitionIds.length) {
      await delay(1000);
    }

    // wait until all partitions have received at least 1 event
    while (true) {
      const emptyPartition = [];
      for (const results of partitionResultsMap.values()) {
        if (!results.events.length) {
          emptyPartition.push(results);
        }
      }
      if (emptyPartition.length) {
        await delay(100);
      } else {
        break;
      }
    }
    // shutdown the processor
    await processor.stop();

    didError.should.be.false;
    // validate correct events captured for each partition
    for (const partitionId of partitionIds) {
      const results = partitionResultsMap.get(partitionId)!;
      const events = results.events;
      events.length.should.gte(1);
      results.initialized.should.be.true;
      (results.closeReason === CloseReason.Shutdown).should.be.true;
    }
  });

  it("should not throw if stop is called without start", async function (): Promise<void> {
    let didPartitionProcessorStart = false;

    class FooPartitionProcessor extends PartitionProcessor {
      async initialize() {
        didPartitionProcessorStart = true;
      }
      async close() {
        didPartitionProcessorStart = true;
      }
      async processEvents() {
        didPartitionProcessorStart = true;
      }
      async processError() {
        didPartitionProcessorStart = true;
      }
    }

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      FooPartitionProcessor,
      new InMemoryPartitionManager()
    );

    // shutdown the processor
    await processor.stop();

    didPartitionProcessorStart.should.be.false;
  });

  it("should support start after stopping", async function (): Promise<void> {
    const partitionIds = await client.getPartitionIds();
    let partitionOwnerShip = new Set();

    // ensure we have at least 2 partitions
    partitionIds.length.should.gte(2);

    const partitionResultsMap = new Map<
      string,
      { events: string[]; initialized: boolean; closeReason?: CloseReason }
    >();
    partitionIds.forEach((id) => partitionResultsMap.set(id, { events: [], initialized: false }));
    let didError = false;

    // The partitionProcess will need to add events to the partitionResultsMap as they are received
    class FooPartitionProcessor extends PartitionProcessor {
      async initialize(partitionContext: PartitionContext) {
        partitionResultsMap.get(partitionContext.partitionId)!.initialized = true;
      }
      async close(reason: CloseReason, partitionContext: PartitionContext) {
        partitionResultsMap.get(partitionContext.partitionId)!.closeReason = reason;
      }
      async processEvents(events: ReceivedEventData[], partitionContext: PartitionContext) {
        partitionOwnerShip.add(partitionContext.partitionId);
        const existingEvents = partitionResultsMap.get(partitionContext.partitionId)!.events;
        events.forEach((event) => existingEvents.push(event.body));
      }
      async processError() {
        didError = true;
      }
    }

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      FooPartitionProcessor,
      new InMemoryPartitionManager()
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
    while (partitionOwnerShip.size !== partitionIds.length) {
      await delay(1000);
    }

    // wait until all partitions have received at least 1 event
    while (true) {
      const emptyPartition = [];
      for (const results of partitionResultsMap.values()) {
        if (!results.events.length) {
          emptyPartition.push(results);
        }
      }
      if (emptyPartition.length) {
        await delay(100);
      } else {
        break;
      }
    }

    // shutdown the processor
    await processor.stop();

    didError.should.be.false;
    // validate correct events captured for each partition
    for (const partitionId of partitionIds) {
      const results = partitionResultsMap.get(partitionId)!;
      const events = results.events;
      events.length.should.gte(1);
      results.initialized.should.be.true;
      (results.closeReason === CloseReason.Shutdown).should.be.true;
      // reset fields
      results.initialized = false;
      results.closeReason = undefined;
      results.events = [];
    }
    partitionOwnerShip = new Set();

    // start it again
    // note: since checkpointing isn't implemented yet,
    // EventProcessor will retrieve events from the initialEventPosition.
    processor.start();

    // set a delay to give a consumers a chance to receive a message
    while (partitionOwnerShip.size !== partitionIds.length) {
      await delay(1000);
    }

    // wait until all partitions have received at least 1 event
    while (true) {
      const emptyPartition = [];
      for (const results of partitionResultsMap.values()) {
        if (!results.events.length) {
          emptyPartition.push(results);
        }
      }
      if (emptyPartition.length) {
        await delay(100);
      } else {
        break;
      }
    }

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

  describe("Partition processor", function (): void {
    it("should support processing events across multiple partitions", async function (): Promise<
      void
    > {
      const partitionIds = await client.getPartitionIds();
      const partitionOwnerShip = new Set();
      // ensure we have at least 2 partitions
      partitionIds.length.should.gte(2);

      const partitionResultsMap = new Map<
        string,
        { events: string[]; initialized: boolean; closeReason?: CloseReason }
      >();
      partitionIds.forEach((id) => partitionResultsMap.set(id, { events: [], initialized: false }));
      let didError = false;

      // The partitionProcess will need to add events to the partitionResultsMap as they are received
      class FooPartitionProcessor extends PartitionProcessor {
        async initialize(partitionContext: PartitionContext) {
          partitionResultsMap.get(partitionContext.partitionId)!.initialized = true;
        }
        async close(reason: CloseReason, partitionContext: PartitionContext) {
          partitionResultsMap.get(partitionContext.partitionId)!.closeReason = reason;
        }
        async processEvents(events: ReceivedEventData[], partitionContext: PartitionContext) {
          partitionOwnerShip.add(partitionContext.partitionId);
          const existingEvents = partitionResultsMap.get(partitionContext.partitionId)!.events;
          events.forEach((event) => existingEvents.push(event.body));
        }
        async processError() {
          didError = true;
        }
      }

      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        FooPartitionProcessor,
        new InMemoryPartitionManager()
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
      while (partitionOwnerShip.size !== partitionIds.length) {
        await delay(1000);
      }

      // wait until all partitions have received at least 1 event
      while (true) {
        const emptyPartition = [];
        for (const results of partitionResultsMap.values()) {
          if (!results.events.length) {
            emptyPartition.push(results);
          }
        }
        if (emptyPartition.length) {
          await delay(100);
        } else {
          break;
        }
      }

      // shutdown the processor
      await processor.stop();

      didError.should.be.false;
      // validate correct events captured for each partition
      for (const partitionId of partitionIds) {
        const results = partitionResultsMap.get(partitionId)!;
        const events = results.events;
        events.length.should.gte(1);
        results.initialized.should.be.true;
        (results.closeReason === CloseReason.Shutdown).should.be.true;
      }
    });

    it("should support processing events across multiple partitions without initialize or close", async function (): Promise<
      void
    > {
      const partitionIds = await client.getPartitionIds();
      const partitionOwnerShip = new Set();

      // ensure we have at least 2 partitions
      partitionIds.length.should.gte(2);

      const partitionResultsMap = new Map<string, string[]>();
      partitionIds.forEach((id) => partitionResultsMap.set(id, []));
      let didError = false;

      // The partitionProcess will need to add events to the partitionResultsMap as they are received
      class FooPartitionProcessor extends PartitionProcessor {
        async processEvents(events: ReceivedEventData[], partitionContext: PartitionContext) {
          partitionOwnerShip.add(partitionContext.partitionId);
          const existingEvents = partitionResultsMap.get(partitionContext.partitionId)!;
          events.forEach((event) => existingEvents.push(event.body));
        }
        async processError() {
          didError = true;
        }
      }

      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        FooPartitionProcessor,
        new InMemoryPartitionManager()
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
      while (partitionOwnerShip.size !== partitionIds.length) {
        await delay(1000);
      }

      // wait until all partitions have received at least 1 event
      while (true) {
        const emptyPartition = [];
        for (const results of partitionResultsMap.values()) {
          if (!results.length) {
            emptyPartition.push(results);
          }
        }
        if (emptyPartition.length) {
          await delay(100);
        } else {
          break;
        }
      }

      // shutdown the processor
      await processor.stop();

      didError.should.be.false;
      // validate correct events captured for each partition
      for (const partitionId of partitionIds) {
        const events = partitionResultsMap.get(partitionId)!;
        events.length.should.gte(1);
      }
    });

    it("should call methods on a PartitionProcessor ", async function (): Promise<void> {
      const receivedEvents: EventData[] = [];
      let isinitializeCalled = false;
      let isCloseCalled = false;
      let didError = false;
      class SimpleEventProcessor {
        async initialize() {
          isinitializeCalled = true;
          debug(`Started processing`);
        }
        async processEvents(events: ReceivedEventData[]) {
          for (const event of events) {
            receivedEvents.push(event);
            debug("Received event", event.body);
          }
        }

        async processError(error: Error) {
          didError = true;
          debug(`Encountered an error: ${error.message}`);
        }

        async close() {
          isCloseCalled = true;
          debug(`Stopped processing`);
        }
      }

      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        SimpleEventProcessor,
        new InMemoryPartitionManager()
      );
      processor.start();

      const producer = client.createProducer({ partitionId: "0" });
      await producer.send({ body: "Hello world!!!" });
      await producer.close();

      while (receivedEvents.length === 0) {
        await delay(1000);
      }

      await processor.stop();

      didError.should.be.false;
      isinitializeCalled.should.equal(true);
      receivedEvents.length.should.gte(1);
      isCloseCalled.should.equal(true);
    });
  });

  describe("InMemory Partition Manager", function (): void {
    it("should claim ownership, get a list of ownership and update checkpoint", async function (): Promise<
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

    it("should receive events from the checkpoint", async function (): Promise<void> {
      const partitionIds = await client.getPartitionIds();

      // ensure we have at least 2 partitions
      partitionIds.length.should.gte(2);

      let checkpointMap = new Map<string, ReceivedEventData[]>();
      partitionIds.forEach((id) => checkpointMap.set(id, []));
      let didError = false;
      let partitionOwnerShip = new Set();

      let partionCount: { [x: string]: number } = {};
      class FooPartitionProcessor extends PartitionProcessor {
        async processEvents(events: ReceivedEventData[], partitionContext: PartitionContext) {
          partitionOwnerShip.add(partitionContext.partitionId);
          !partionCount[partitionContext.partitionId]
            ? (partionCount[partitionContext.partitionId] = 1)
            : partionCount[partitionContext.partitionId]++;
          const existingEvents = checkpointMap.get(partitionContext.partitionId)!;
          for (const event of events) {
            debug("Received event: '%s' from partition: '%s'", event.body, partitionContext.partitionId);
            if (partionCount[partitionContext.partitionId] <= 50) {
              await partitionContext.updateCheckpoint(event);
              existingEvents.push(event);
            }
          }
        }
        async processError() {
          didError = true;
        }
      }

      const inMemoryPartitionManager = new InMemoryPartitionManager();
      const processor1 = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        FooPartitionProcessor,
        inMemoryPartitionManager
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
      while (partitionOwnerShip.size !== partitionIds.length) {
        await delay(5000);
      }

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
      partitionOwnerShip = new Set();

      const processor2 = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        FooPartitionProcessor,
        inMemoryPartitionManager
      );
      // start second processor
      processor2.start();

      // set a delay to give a consumers a chance to receive a message
      while (partitionOwnerShip.size !== partitionIds.length) {
        await delay(5000);
      }

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

  describe("Load balancing", function (): void {
    beforeEach("validate partitions", async function (): Promise<void> {
      const partitionIds = await client.getPartitionIds();
      // ensure we have at least 3 partitions
      partitionIds.length.should.gte(
        3,
        "The load balancing tests must be ran on an Event Hub with at least 3 partitions"
      );
    });

    it("should 'steal' partitions until all the  processors have reached a steady-state", async function (): Promise<
      void
    > {
      const processorByName: Dictionary<EventProcessor> = {};
      const partitionManager = new InMemoryPartitionManager();
      const partitionIds = await client.getPartitionIds();
      const partitionOwnershipArr = new Set();

      const partitionResultsMap = new Map<
        string,
        { events: string[]; initialized: boolean; closeReason?: CloseReason }
      >();
      partitionIds.forEach((id) => partitionResultsMap.set(id, { events: [], initialized: false }));
      let didError = false;
      let errorName = "";

      // The partitionProcess will need to add events to the partitionResultsMap as they are received
      class FooPartitionProcessor extends PartitionProcessor {
        async initialize(partitionContext: PartitionContext) {
          partitionResultsMap.get(partitionContext.partitionId)!.initialized = true;
        }
        async close(reason: CloseReason, partitionContext: PartitionContext) {
          partitionResultsMap.get(partitionContext.partitionId)!.closeReason = reason;
        }
        async processEvents(events: ReceivedEventData[], partitionContext: PartitionContext) {
          partitionOwnershipArr.add(partitionContext.partitionId);
          const existingEvents = partitionResultsMap.get(partitionContext.partitionId)!.events;
          events.forEach((event) => {
            existingEvents.push(event.body);
          });
        }
        async processError(err: Error) {
          didError = true;
          errorName = err.name;
        }
      }

      // create messages
      const expectedMessagePrefix = "EventProcessor test - multiple partitions - ";
      for (const partitionId of partitionIds) {
        const producer = client.createProducer({ partitionId });
        await producer.send({ body: expectedMessagePrefix + partitionId });
        await producer.close();
      }

      processorByName[`processor-1`] = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        FooPartitionProcessor,
        partitionManager
      );

      processorByName[`processor-1`].start();

      while (partitionOwnershipArr.size !== partitionIds.length) {
        await delay(5000);
      }

      processorByName[`processor-2`] = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        FooPartitionProcessor,
        partitionManager
      );

      partitionOwnershipArr.size.should.equal(partitionIds.length);
      processorByName[`processor-2`].start();

      await delay(12000);

      for (const processor in processorByName) {
        await processorByName[processor].stop();
      }

      // map of ownerId as a key and partitionIds as a value
      const partitionOwnershipMap: Map<string, string[]> = new Map();

      const partitionOwnership = await partitionManager.listOwnership(
        client.eventHubName,
        EventHubClient.defaultConsumerGroupName
      );

      for (const ownership of partitionOwnership) {
        if (!partitionOwnershipMap.has(ownership.ownerId)) {
          partitionOwnershipMap.set(ownership.ownerId, [ownership.partitionId]);
        } else {
          let arr = partitionOwnershipMap.get(ownership.ownerId);
          arr!.push(ownership.partitionId);
          partitionOwnershipMap.set(ownership.ownerId, arr!);
        }
      }

      didError.should.be.true;
      errorName.should.equal("ReceiverDisconnectedError");
      const n = Math.floor(partitionIds.length / 2);
      partitionOwnershipMap.get(processorByName[`processor-1`].id)!.length.should.oneOf([n, n + 1]);
      partitionOwnershipMap.get(processorByName[`processor-2`].id)!.length.should.oneOf([n, n + 1]);

      for (const partitionId of partitionIds) {
        const results = partitionResultsMap.get(partitionId)!;
        const events = results.events;
        events[0].should.equal(expectedMessagePrefix + partitionId);
        results.initialized.should.be.true;
        (results.closeReason === CloseReason.Shutdown).should.be.true;
      }
    });

    it("should ensure that all the processors reach a steady-state where all partitions are being processed", async function (): Promise<
      void
    > {
      const processorByName: Dictionary<EventProcessor> = {};
      const partitionIds = await client.getPartitionIds();
      const partitionManager = new InMemoryPartitionManager();
      const partitionOwnershipArr = new Set();
      let didError = false;

      // The partitionProcess will need to add events to the partitionResultsMap as they are received
      class FooPartitionProcessor extends PartitionProcessor {
        async processEvents(events: ReceivedEventData[], partitionContext: PartitionContext) {
          partitionOwnershipArr.add(partitionContext.partitionId);
        }
        async processError() {
          didError = true;
        }
      }

      // create messages
      const expectedMessagePrefix = "EventProcessor test - multiple partitions - ";
      for (const partitionId of partitionIds) {
        const producer = client.createProducer({ partitionId });
        await producer.send({ body: expectedMessagePrefix + partitionId });
        await producer.close();
      }

      for (let i = 0; i < 2; i++) {
        const processorName = `processor-${i}`;
        processorByName[processorName] = new EventProcessor(
          EventHubClient.defaultConsumerGroupName,
          client,
          FooPartitionProcessor,
          partitionManager
        );
        processorByName[processorName].start();
        await delay(12000);
      }

      while (partitionOwnershipArr.size !== partitionIds.length) {
        await delay(5000);
      }

      partitionOwnershipArr.size.should.equal(partitionIds.length);
      for (const processor in processorByName) {
        await processorByName[processor].stop();
      }

      // map of ownerId as a key and partitionIds as a value
      const partitionOwnershipMap: Map<string, string[]> = new Map();

      const partitionOwnership = await partitionManager.listOwnership(
        client.eventHubName,
        EventHubClient.defaultConsumerGroupName
      );
      for (const ownership of partitionOwnership) {
        if (!partitionOwnershipMap.has(ownership.ownerId)) {
          partitionOwnershipMap.set(ownership.ownerId, [ownership.partitionId]);
        } else {
          let arr = partitionOwnershipMap.get(ownership.ownerId);
          arr!.push(ownership.partitionId);
          partitionOwnershipMap.set(ownership.ownerId, arr!);
        }
      }

      didError.should.be.false;
      const n = Math.floor(partitionIds.length / 2);
      partitionOwnershipMap.get(processorByName[`processor-0`].id)!.length.should.oneOf([n, n + 1]);
      partitionOwnershipMap.get(processorByName[`processor-1`].id)!.length.should.oneOf([n, n + 1]);
    });
  });
}).timeout(90000);
