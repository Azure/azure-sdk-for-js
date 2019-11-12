// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:partitionPump");
import {
  EventData,
  InMemoryPartitionManager,
  PartitionOwnership,
  CloseReason,
  ReceivedEventData,
  LastEnqueuedEventInfo
} from "../src";
import { EventHubClient } from "../src/eventHubClient";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { generate_uuid, Dictionary } from "rhea-promise";
import { EventProcessor, FullEventProcessorOptions } from '../src/eventProcessor';
import { PartitionProcessor, Checkpoint } from '../src/partitionProcessor';
import { delay } from '@azure/core-amqp';
const env = getEnvVars();

describe("Event Processor", function (): void {
  const defaultOptions : FullEventProcessorOptions = {
    maxBatchSize: 1,
    maxWaitTimeInSeconds: 60
  };
  
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  let client: EventHubClient;
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

  beforeEach("create the client", function() {
    client = new EventHubClient(service.connectionString, service.path, {});
  });

  afterEach("close the connection", async function(): Promise<void> {
    await client.close();
  });

  it("should expose an id #RunnableInBrowser", async function (): Promise<void> {
    const partitionManager = new InMemoryPartitionManager();

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      PartitionProcessor,
      partitionManager,
      partitionManager,
      defaultOptions
    );

    const id = processor.id;
    id.length.should.be.gt(1);
  });

  it("should match the fullyQualifiedNamespace, eventHubName and consumerGroupName of partition processor with respective EventHubClient's properties #RunnableInBrowser", async function(): Promise<
    void
  > {
    const producer = client.createProducer({ partitionId: `0` });
    await producer.send({ body: `Hello world - ${0}` });
    await producer.close();

    let partitionProcessorInfo: string[] = [];
    let receivedEvents = [];
    class SimpleEventProcessor extends PartitionProcessor {
      async processEvents(events: ReceivedEventData[]) {
        for (const event of events) {
          receivedEvents.push(event);
        }
        partitionProcessorInfo.push(this.fullyQualifiedNamespace);
        partitionProcessorInfo.push(this.eventHubName);
        partitionProcessorInfo.push(this.consumerGroupName);
      }
    }

    const partitionManager = new InMemoryPartitionManager();

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      SimpleEventProcessor,
      partitionManager,
      partitionManager,
      {
        ...defaultOptions,
        trackLastEnqueuedEventInfo: false
      }
    );
    processor.start();

    while (receivedEvents.length === 0) {
      await delay(1000);
    }
    await processor.stop();

    partitionProcessorInfo[0].should.equals(client.fullyQualifiedNamespace);
    partitionProcessorInfo[1].should.equals(client.eventHubName);
    partitionProcessorInfo[2].should.equals(EventHubClient.defaultConsumerGroupName);
  });

  it("should treat consecutive start invocations as idempotent #RunnableInBrowser", async function(): Promise<void> {
    const partitionIds = await client.getPartitionIds({});

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
      async initialize() {
        partitionResultsMap.get(this.partitionId)!.initialized = true;
      }
      async close(reason: CloseReason) {
        partitionResultsMap.get(this.partitionId)!.closeReason = reason;
      }
      async processEvents(events: ReceivedEventData[]) {
        partitionOwnerShip.add(this.partitionId);
        const existingEvents = partitionResultsMap.get(this.partitionId)!.events;
        events.forEach((event) => existingEvents.push(event.body));
      }
      async processError() {
        didError = true;
      }
    }

    const partitionManager = new InMemoryPartitionManager();

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      FooPartitionProcessor,
      partitionManager,
      partitionManager,
      defaultOptions
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

  it("should not throw if stop is called without start #RunnableInBrowser", async function(): Promise<void> {
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

    const partitionManager = new InMemoryPartitionManager();

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      FooPartitionProcessor,
      partitionManager, 
      partitionManager,
      defaultOptions
    );

    // shutdown the processor
    await processor.stop();

    didPartitionProcessorStart.should.be.false;
  });

  it("should support start after stopping #RunnableInBrowser", async function(): Promise<void> {
    const partitionIds = await client.getPartitionIds({});
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
      async initialize() {
        partitionResultsMap.get(this.partitionId)!.initialized = true;
      }
      async close(reason: CloseReason) {
        partitionResultsMap.get(this.partitionId)!.closeReason = reason;
      }
      async processEvents(events: ReceivedEventData[]) {
        partitionOwnerShip.add(this.partitionId);
        const existingEvents = partitionResultsMap.get(this.partitionId)!.events;
        events.forEach((event) => existingEvents.push(event.body));
      }
      async processError() {
        didError = true;
      }
    }

    const partitionManager = new InMemoryPartitionManager();

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      FooPartitionProcessor,
      partitionManager,
      partitionManager,
      defaultOptions
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

  describe("Partition processor #RunnableInBrowser", function(): void {
    it("should support processing events across multiple partitions", async function(): Promise<
      void
    > {
      const partitionIds = await client.getPartitionIds({});
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
        async initialize() {
          partitionResultsMap.get(this.partitionId)!.initialized = true;
        }
        async close(reason: CloseReason) {
          partitionResultsMap.get(this.partitionId)!.closeReason = reason;
        }
        async processEvents(events: ReceivedEventData[]) {
          partitionOwnerShip.add(this.partitionId);
          const existingEvents = partitionResultsMap.get(this.partitionId)!.events;
          events.forEach((event) => existingEvents.push(event.body));
        }
        async processError() {
          didError = true;
        }
      }

      const partitionManager = new InMemoryPartitionManager();

      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        FooPartitionProcessor,
        partitionManager,
        partitionManager,
        defaultOptions
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

    it("should support processing events across multiple partitions without initialize or close", async function(): Promise<
      void
    > {
      const partitionIds = await client.getPartitionIds({});
      const partitionOwnerShip = new Set();

      // ensure we have at least 2 partitions
      partitionIds.length.should.gte(2);

      const partitionResultsMap = new Map<string, string[]>();
      partitionIds.forEach((id) => partitionResultsMap.set(id, []));
      let didError = false;

      // The partitionProcess will need to add events to the partitionResultsMap as they are received
      class FooPartitionProcessor extends PartitionProcessor {
        async processEvents(events: ReceivedEventData[]) {
          partitionOwnerShip.add(this.partitionId);
          const existingEvents = partitionResultsMap.get(this.partitionId)!;
          events.forEach((event) => existingEvents.push(event.body));
        }
        async processError() {
          didError = true;
        }
      }

      const partitionManager = new InMemoryPartitionManager();

      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        FooPartitionProcessor,
        partitionManager,
        partitionManager,
        defaultOptions
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

    it("should call methods on a PartitionProcessor ", async function(): Promise<void> {
      const receivedEvents: EventData[] = [];
      let isinitializeCalled = false;
      let isCloseCalled = false;
      let didError = false;
      class SimpleEventProcessor extends PartitionProcessor {
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

      const partitionManager = new InMemoryPartitionManager();

      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        SimpleEventProcessor,
        partitionManager,
        partitionManager,
        defaultOptions
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

  describe("InMemory Partition Manager #RunnableInBrowser", function(): void {
    it("should claim ownership, get a list of ownership and update checkpoint", async function(): Promise<
      void
    > {
      const inMemoryPartitionManager = new InMemoryPartitionManager();
      const partitionOwnership1: PartitionOwnership = {
        fullyQualifiedNamespace: "myNamespace.servicebus.windows.net",
        eventHubName: "myEventHub",
        consumerGroupName: EventHubClient.defaultConsumerGroupName,
        ownerId: generate_uuid(),
        partitionId: "0",
        ownerLevel: 10
      };
      const partitionOwnership2: PartitionOwnership = {
        fullyQualifiedNamespace: "myNamespace.servicebus.windows.net",
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
        "myNamespace.servicebus.windows.net",
        "myEventHub",
        EventHubClient.defaultConsumerGroupName
      );
      ownershiplist.length.should.equals(2);

      const checkpoint: Checkpoint = {
        fullyQualifiedNamespace: "myNamespace.servicebus.windows.net",
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
        "myNamespace.servicebus.windows.net",
        "myEventHub",
        EventHubClient.defaultConsumerGroupName
      );
      partitionOwnershipList[0].partitionId.should.equals(checkpoint.partitionId);
      partitionOwnershipList[0].sequenceNumber!.should.equals(checkpoint.sequenceNumber);
      partitionOwnershipList[0].offset!.should.equals(checkpoint.offset);
      partitionOwnershipList[0].fullyQualifiedNamespace!.should.equals(
        "myNamespace.servicebus.windows.net"
      );
      partitionOwnershipList[0].eventHubName!.should.equals("myEventHub");
      partitionOwnershipList[0].consumerGroupName!.should.equals(
        EventHubClient.defaultConsumerGroupName
      );
    });

    it("should receive events from the checkpoint", async function(): Promise<void> {
      const partitionIds = await client.getPartitionIds({});

      // ensure we have at least 2 partitions
      partitionIds.length.should.gte(2);

      let checkpointMap = new Map<string, ReceivedEventData[]>();
      partitionIds.forEach((id) => checkpointMap.set(id, []));
      let didError = false;
      let partitionOwnerShip = new Set();

      let partionCount: { [x: string]: number } = {};
      class FooPartitionProcessor extends PartitionProcessor {
        async processEvents(events: ReceivedEventData[]) {
          partitionOwnerShip.add(this.partitionId);
          !partionCount[this.partitionId]
            ? (partionCount[this.partitionId] = 1)
            : partionCount[this.partitionId]++;
          const existingEvents = checkpointMap.get(this.partitionId)!;
          for (const event of events) {
            debug("Received event: '%s' from partition: '%s'", event.body, this.partitionId);
            if (partionCount[this.partitionId] <= 50) {
              await this.updateCheckpoint(event);
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
        inMemoryPartitionManager,
        inMemoryPartitionManager,
        defaultOptions
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
        inMemoryPartitionManager,
        inMemoryPartitionManager,
        defaultOptions
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

  describe("Load balancing", function(): void {
    beforeEach("validate partitions", async function(): Promise<void> {
      const partitionIds = await client.getPartitionIds({});
      // ensure we have at least 3 partitions
      partitionIds.length.should.gte(
        3,
        "The load balancing tests must be ran on an Event Hub with at least 3 partitions"
      );
    });

    it("should 'steal' partitions until all the  processors have reached a steady-state", async function(): Promise<
      void
    > {
      const processorByName: Dictionary<EventProcessor> = {};
      const partitionManager = new InMemoryPartitionManager();
      const partitionIds = await client.getPartitionIds({});
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
        async initialize() {
          partitionResultsMap.get(this.partitionId)!.initialized = true;
        }
        async close(reason: CloseReason) {
          partitionResultsMap.get(this.partitionId)!.closeReason = reason;
        }
        async processEvents(events: ReceivedEventData[]) {
          partitionOwnershipArr.add(this.partitionId);
          const existingEvents = partitionResultsMap.get(this.partitionId)!.events;
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
        partitionManager,
        partitionManager,
        defaultOptions
      );

      processorByName[`processor-1`].start();

      while (partitionOwnershipArr.size !== partitionIds.length) {
        await delay(5000);
      }

      processorByName[`processor-2`] = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        FooPartitionProcessor,
        partitionManager,
        partitionManager,
        defaultOptions
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
        client.fullyQualifiedNamespace,
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
        results.events.length.should.be.gte(1);
        results.initialized.should.be.true;
        (results.closeReason === CloseReason.Shutdown).should.be.true;
      }
    });

    it("should ensure that all the processors reach a steady-state where all partitions are being processed", async function(): Promise<
      void
    > {
      const processorByName: Dictionary<EventProcessor> = {};
      const partitionIds = await client.getPartitionIds({});
      const partitionManager = new InMemoryPartitionManager();
      const partitionOwnershipArr = new Set();
      let didError = false;

      // The partitionProcess will need to add events to the partitionResultsMap as they are received
      class FooPartitionProcessor extends PartitionProcessor {
        async processEvents(events: ReceivedEventData[]) {
          partitionOwnershipArr.add(this.partitionId);
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
          partitionManager,
          partitionManager,
          defaultOptions
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
        client.fullyQualifiedNamespace,
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

  describe("with trackLastEnqueuedEventInfo #RunnableInBrowser", function(): void {
    it("should have lastEnqueuedEventInfo populated when trackLastEnqueuedEventInfo is set to true", async function(): Promise<
      void
    > {
      const partitionIds = await client.getPartitionIds({});
      for (const partitionId of partitionIds) {
        const producer = client.createProducer({ partitionId: `${partitionId}` });
        await producer.send({ body: `Hello world - ${partitionId}` });
        await producer.close();
      }

      let partitionIdsSet = new Set();
      const lastEnqueuedEventInfoMap: Map<string, LastEnqueuedEventInfo> = new Map();
      class SimpleEventProcessor extends PartitionProcessor {
        async processEvents(events: ReceivedEventData[]) {
          partitionIdsSet.add(this.partitionId);
          lastEnqueuedEventInfoMap.set(this.partitionId, this.lastEnqueuedEventInfo);
        }
      }

      const partitionManager = new InMemoryPartitionManager();

      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        SimpleEventProcessor,
        partitionManager,
        partitionManager,
        {
          ...defaultOptions,
          trackLastEnqueuedEventInfo: true
        }
      );

      processor.start();

      while (partitionIdsSet.size !== partitionIds.length) {
        await delay(1000);
      }
      await processor.stop();

      for (const partitionId of partitionIds) {
        debug("Getting the partition information");
        const patitionInfo = await client.getPartitionProperties(partitionId);
        debug("partition info: ", patitionInfo);
        const results = lastEnqueuedEventInfoMap.get(partitionId)!;
        should.exist(results);
        results!.offset!.should.equal(patitionInfo.lastEnqueuedOffset);
        results!.sequenceNumber!.should.equal(patitionInfo.lastEnqueuedSequenceNumber);
        results!.enqueuedTime!.getTime().should.equal(patitionInfo.lastEnqueuedTimeUtc.getTime());
        results!.retrievalTime!.getTime().should.be.greaterThan(Date.now() - 60000);
      }
    });

    it("should not have lastEnqueuedEventInfo populated when trackLastEnqueuedEventInfo is set to false", async function(): Promise<
      void
    > {
      const partitionIds = await client.getPartitionIds({});
      for (const partitionId of partitionIds) {
        const producer = client.createProducer({ partitionId: `${partitionId}` });
        await producer.send({ body: `Hello world - ${partitionId}` });
        await producer.close();
      }

      let partitionIdsSet = new Set();
      const lastEnqueuedEventInfoMap: Map<string, LastEnqueuedEventInfo> = new Map();
      class SimpleEventProcessor extends PartitionProcessor {
        async processEvents(events: ReceivedEventData[]) {
          partitionIdsSet.add(this.partitionId);
          lastEnqueuedEventInfoMap.set(this.partitionId, this.lastEnqueuedEventInfo);
        }
      }

      const partitionManager = new InMemoryPartitionManager();

      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        SimpleEventProcessor,
        partitionManager,
        partitionManager,
        {
          ...defaultOptions,
          trackLastEnqueuedEventInfo: false
        }
      );
      processor.start();

      while (partitionIdsSet.size !== partitionIds.length) {
        await delay(1000);
      }
      await processor.stop();

      for (const partitionId of partitionIds) {
        const results = lastEnqueuedEventInfoMap.get(partitionId)!;
        should.not.exist(results);
      }
    });
  });
}).timeout(90000);
