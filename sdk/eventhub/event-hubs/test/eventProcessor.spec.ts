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
  PartitionOwnership,
  CloseReason,
  ReceivedEventData,
  LastEnqueuedEventProperties,
  SubscriptionEventHandlers,
  EventPosition,
  CheckpointStore,
} from "../src";
import { EventHubClient } from "../src/impl/eventHubClient";
import { EnvVarKeys, getEnvVars, loopUntil } from "./utils/testUtils";
import { generate_uuid, Dictionary } from "rhea-promise";
import { EventProcessor, FullEventProcessorOptions } from "../src/eventProcessor";
import { Checkpoint } from "../src/partitionProcessor";
import { delay } from "@azure/core-amqp";
import { InitializationContext, PartitionContext } from "../src/eventHubConsumerClientModels";
import { InMemoryCheckpointStore } from "../src/inMemoryCheckpointStore";
import { loggerForTest } from "./utils/logHelpers";
import {
  SubscriptionHandlerForTests,
  sendOneMessagePerPartition
} from "./utils/subscriptionHandlerForTests";
import { GreedyPartitionLoadBalancer } from "../src/partitionLoadBalancer";
import { AbortError } from "@azure/abort-controller";
const env = getEnvVars();

describe("Event Processor", function(): void {
  const defaultOptions: FullEventProcessorOptions = {
    maxBatchSize: 1,
    maxWaitTimeInSeconds: 60,
    ownerLevel: 0
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

  it("_getStartPosition", async () => {
    let checkpoints: Checkpoint[] = [
      {
        fullyQualifiedNamespace: "not-used-for-this-test",
        consumerGroup: "not-used-for-this-test",
        eventHubName: "not-used-for-this-test",
        offset: 1009,
        sequenceNumber: 1010,
        partitionId: "0"
      },
      {
        fullyQualifiedNamespace: "not-used-for-this-test",
        consumerGroup: "not-used-for-this-test",
        eventHubName: "not-used-for-this-test",
        // this caused a bug for us before - it's a perfectly valid offset
        // but we were thrown off by its falsy-ness. (actually it was 
        // sequence number before but the concept is the same)
        offset: 0,        
        sequenceNumber: 0,
        partitionId: "1"
      },
    ];

    const checkpointStore: CheckpointStore = {
      claimOwnership: async () => { return [] },
      listCheckpoints: async () => { return checkpoints },
      listOwnership: async () => { return [] },
      updateCheckpoint: async () => { }      
    };

    // we're not actually going to start anything here so there's nothing
    // to stop
    const processor = new EventProcessor(EventHubClient.defaultConsumerGroupName, client, {
      processEvent: async () => { }
    }, checkpointStore, {
        maxBatchSize: 1,
      maxWaitTimeInSeconds: 1
    });

    // checkpoint is available for partition 0
    let eventPosition = await processor['_getStartPosition']("0");
    eventPosition!.offset!.should.equal(1009);
    should.not.exist(eventPosition!.sequenceNumber);

    //checkpoint is available for partition 1
    eventPosition = await processor['_getStartPosition']("1");
    eventPosition!.offset!.should.equal(0);
    should.not.exist(eventPosition!.sequenceNumber);

    // no checkpoint available for partition 2
    eventPosition = await processor['_getStartPosition']("2");
    should.not.exist(eventPosition);
  });

  describe("_handleSubscriptionError", () => {
    let eventProcessor: EventProcessor;
    let userCallback: (() => void) | undefined;
    let errorFromCallback: Error | undefined;
    let contextFromCallback: PartitionContext | undefined;

    beforeEach(() => {
      userCallback = undefined;
      errorFromCallback = undefined;
      contextFromCallback = undefined;

      // note: we're not starting this event processor so there's nothing to stop()
      // it's only here so we can call a few private methods on it.
      eventProcessor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        {
          processEvent: async () => {},
          processError: async (err, context) => {
            // simulate the user messing up and accidentally throwing an error
            // we should just log it and not kill anything.
            errorFromCallback = err;
            contextFromCallback = context;

            if (userCallback) {
              userCallback();
            }
          }
        },
        new InMemoryCheckpointStore(),
        defaultOptions
      );
    });

    it("error thrown from user's processError handler", async () => {
      // the user's error handler will throw an error - won't escape from this function
      userCallback = () => {
        throw new Error("Error thrown from the user's error handler");
      };

      await eventProcessor["_handleSubscriptionError"](new Error("test error"));

      errorFromCallback!.message.should.equal("test error");
      contextFromCallback!.partitionId.should.equal("");
    });

    it("non-useful errors are filtered out", async () => {
      // the user's error handler will throw an error - won't escape from this function

      await eventProcessor["_handleSubscriptionError"](new AbortError("test error"));

      // we don't call the user's handler for abort errors
      should.not.exist(errorFromCallback);
      should.not.exist(contextFromCallback);
    });
  });

  it("should expose an id #RunnableInBrowser", async function(): Promise<void> {
    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      {
        processEvent: async () => {},
        processInitialize: async (context) => context.setStartPosition(EventPosition.latest())
      },
      new InMemoryCheckpointStore(),
      defaultOptions
    );

    const id = processor.id;
    id.length.should.be.gt(1);
  });

  it("should treat consecutive start invocations as idempotent #RunnableInBrowser", async function(): Promise<
    void
  > {
    const partitionIds = await client.getPartitionIds({});

    // ensure we have at least 2 partitions
    partitionIds.length.should.gte(2);

    const subscriptionEventHandler = await SubscriptionHandlerForTests.startingFromHere(client);

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      subscriptionEventHandler,
      new InMemoryCheckpointStore(),
      { ...defaultOptions, partitionLoadBalancer: new GreedyPartitionLoadBalancer() }
    );

    processor.start();
    processor.start();
    processor.start();

    const expectedMessages = await sendOneMessagePerPartition(partitionIds, client);
    const receivedEvents = await subscriptionEventHandler.waitForEvents(partitionIds);

    // shutdown the processor
    await processor.stop();

    receivedEvents.should.deep.equal(expectedMessages);

    subscriptionEventHandler.hasErrors(partitionIds).should.be.false;
    subscriptionEventHandler.allShutdown(partitionIds).should.be.true;
  });

  it("should not throw if stop is called without start #RunnableInBrowser", async function(): Promise<
    void
  > {
    let didPartitionProcessorStart = false;

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      {
        processInitialize: async (context) => {
          didPartitionProcessorStart = true;
          context.setStartPosition(EventPosition.latest());
        },
        processEvent: async (event, context) => {}
      },
      new InMemoryCheckpointStore(),
      defaultOptions
    );

    // shutdown the processor
    await processor.stop();

    didPartitionProcessorStart.should.be.false;
  });

  it("should support start after stopping #RunnableInBrowser", async function(): Promise<void> {
    const partitionIds = await client.getPartitionIds({});

    // ensure we have at least 2 partitions
    partitionIds.length.should.gte(2);

    let subscriptionEventHandler = await SubscriptionHandlerForTests.startingFromHere(client);
    const partitionLoadBalancer = new GreedyPartitionLoadBalancer();

    const processor = new EventProcessor(
      EventHubClient.defaultConsumerGroupName,
      client,
      subscriptionEventHandler,
      new InMemoryCheckpointStore(),
      {
        partitionLoadBalancer,
        ...defaultOptions
      }
    );

    loggerForTest(`Starting processor for the first time`);
    processor.start();

    const expectedMessages = await sendOneMessagePerPartition(partitionIds, client);
    const receivedEvents = await subscriptionEventHandler.waitForEvents(partitionIds);

    loggerForTest(`Stopping processor for the first time`);
    await processor.stop();

    receivedEvents.should.deep.equal(expectedMessages);

    subscriptionEventHandler.hasErrors(partitionIds).should.be.false;
    subscriptionEventHandler.allShutdown(partitionIds).should.be.true;

    // validate correct events captured for each partition

    // start it again
    loggerForTest(`Starting processor again`);
    subscriptionEventHandler.clear();
    partitionLoadBalancer.expireAll();

    processor.start();

    await subscriptionEventHandler.waitUntilInitialized(partitionIds);

    loggerForTest(`Stopping processor again`);
    await processor.stop();

    subscriptionEventHandler.hasErrors(partitionIds).should.be.false;
    subscriptionEventHandler.allShutdown(partitionIds).should.be.true;
  });

  describe("Partition processor #RunnableInBrowser", function(): void {
    it("should support processing events across multiple partitions", async function(): Promise<
      void
    > {
      const partitionIds = await client.getPartitionIds({});
      const subscriptionEventHandler = await SubscriptionHandlerForTests.startingFromHere(client);

      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        subscriptionEventHandler,
        new InMemoryCheckpointStore(),
        {
          ...defaultOptions,
          partitionLoadBalancer: new GreedyPartitionLoadBalancer()
        }
      );

      processor.start();

      const expectedMessages = await sendOneMessagePerPartition(partitionIds, client);
      const receivedEvents = await subscriptionEventHandler.waitForEvents(partitionIds);

      // shutdown the processor
      await processor.stop();

      subscriptionEventHandler.hasErrors(partitionIds).should.be.false;
      subscriptionEventHandler.allShutdown(partitionIds).should.be.true;

      receivedEvents.should.deep.equal(expectedMessages);
    });
  });

  describe("InMemory Partition Manager #RunnableInBrowser", function(): void {
    it("should claim ownership, get a list of ownership and update checkpoint", async function(): Promise<
      void
    > {
      const inMemoryCheckpointStore = new InMemoryCheckpointStore();
      const partitionOwnership1: PartitionOwnership = {
        fullyQualifiedNamespace: "myNamespace.servicebus.windows.net",
        eventHubName: "myEventHub",
        consumerGroup: EventHubClient.defaultConsumerGroupName,
        ownerId: generate_uuid(),
        partitionId: "0"
      };
      const partitionOwnership2: PartitionOwnership = {
        fullyQualifiedNamespace: "myNamespace.servicebus.windows.net",
        eventHubName: "myEventHub",
        consumerGroup: EventHubClient.defaultConsumerGroupName,
        ownerId: generate_uuid(),
        partitionId: "1"
      };
      const partitionOwnership = await inMemoryCheckpointStore.claimOwnership([
        partitionOwnership1,
        partitionOwnership2
      ]);
      partitionOwnership.length.should.equals(2);
      const ownershiplist = await inMemoryCheckpointStore.listOwnership(
        "myNamespace.servicebus.windows.net",
        "myEventHub",
        EventHubClient.defaultConsumerGroupName
      );
      ownershiplist.length.should.equals(2);

      const checkpoint: Checkpoint = {
        fullyQualifiedNamespace: "myNamespace.servicebus.windows.net",
        eventHubName: "myEventHub",
        consumerGroup: EventHubClient.defaultConsumerGroupName,
        partitionId: "0",
        sequenceNumber: 10,
        offset: 50
      };

      await inMemoryCheckpointStore.updateCheckpoint(checkpoint);
      const partitionOwnershipList = await inMemoryCheckpointStore.listOwnership(
        "myNamespace.servicebus.windows.net",
        "myEventHub",
        EventHubClient.defaultConsumerGroupName
      );
      partitionOwnershipList[0].partitionId.should.equals(checkpoint.partitionId);
      partitionOwnershipList[0].fullyQualifiedNamespace!.should.equals(
        "myNamespace.servicebus.windows.net"
      );
      partitionOwnershipList[0].eventHubName!.should.equals("myEventHub");
      partitionOwnershipList[0].consumerGroup!.should.equals(EventHubClient.defaultConsumerGroupName);
    });

    it("should receive events from the checkpoint", async function(): Promise<void> {
      const partitionIds = await client.getPartitionIds({});

      // ensure we have at least 2 partitions
      partitionIds.length.should.gte(2);

      let checkpointMap = new Map<string, ReceivedEventData[]>();
      partitionIds.forEach((id) => checkpointMap.set(id, []));

      let didError = false;
      let processedAtLeastOneEvent = new Set();
      let checkpointSequenceNumbers: Map<string, number> = new Map();

      let partionCount: { [x: string]: number } = {};

      class FooPartitionProcessor {
        async processInitialize(context: InitializationContext) {
          context.setStartPosition(EventPosition.earliest());
        }

        async processEvent(event: ReceivedEventData, context: PartitionContext) {
          processedAtLeastOneEvent.add(context.partitionId);

          !partionCount[context.partitionId]
            ? (partionCount[context.partitionId] = 1)
            : partionCount[context.partitionId]++;

          const existingEvents = checkpointMap.get(context.partitionId)!;

          debug("Received event: '%s' from partition: '%s'", event.body, context.partitionId);

          if (partionCount[context.partitionId] <= 50) {
            checkpointSequenceNumbers.set(context.partitionId, event.sequenceNumber);
            await context.updateCheckpoint(event);
            existingEvents.push(event);
          }
        }
        async processError(err: Error) {
          didError = true;
        }
      }

      const inMemoryCheckpointStore = new InMemoryCheckpointStore();
      const processor1 = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        new FooPartitionProcessor(),
        inMemoryCheckpointStore,
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
      while (checkpointSequenceNumbers.size !== partitionIds.length) {
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
      processedAtLeastOneEvent = new Set();

      const processor2 = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        new FooPartitionProcessor(),
        inMemoryCheckpointStore,
        defaultOptions
      );

      const checkpoints = await inMemoryCheckpointStore.listCheckpoints(
        client.fullyQualifiedNamespace,
        client.eventHubName,
        EventHubClient.defaultConsumerGroupName
      );

      checkpoints.sort((a, b) => a.partitionId.localeCompare(b.partitionId));

      for (const checkpoint of checkpoints) {
        const expectedSequenceNumber = checkpointSequenceNumbers.get(checkpoint.partitionId);
        should.exist(expectedSequenceNumber);

        expectedSequenceNumber!.should.equal(checkpoint.sequenceNumber);
      }

      // start second processor
      processor2.start();

      // set a delay to give a consumers a chance to receive a message
      while (processedAtLeastOneEvent.size !== partitionIds.length) {
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

    it("should 'steal' partitions until all the processors have reached a steady-state", async function(): Promise<
      void
    > {
      loggerForTest("starting up the stealing test");

      const processorByName: Dictionary<EventProcessor> = {};
      const checkpointStore = new InMemoryCheckpointStore();
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
      class FooPartitionProcessor implements Required<SubscriptionEventHandlers> {
        async processInitialize(context: InitializationContext) {
          loggerForTest(`processInitialize(${context.partitionId})`);
          partitionResultsMap.get(context.partitionId)!.initialized = true;
          context.setStartPosition(EventPosition.earliest());
        }
        async processClose(reason: CloseReason, context: PartitionContext) {
          loggerForTest(`processClose(${context.partitionId})`);
          partitionResultsMap.get(context.partitionId)!.closeReason = reason;
        }
        async processEvent(event: ReceivedEventData, context: PartitionContext) {
          partitionOwnershipArr.add(context.partitionId);
          const existingEvents = partitionResultsMap.get(context.partitionId)!.events;
          existingEvents.push(event.body);
        }
        async processError(err: Error, context: PartitionContext) {
          loggerForTest(`processError(${context.partitionId})`);
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
        new FooPartitionProcessor(),
        checkpointStore,
        { ...defaultOptions }
      );

      processorByName[`processor-1`].start();

      while (partitionOwnershipArr.size !== partitionIds.length) {
        loggerForTest("Waiting for partition ownership");
        await delay(5000);
      }

      processorByName[`processor-2`] = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        new FooPartitionProcessor(),
        checkpointStore,
        defaultOptions
      );

      partitionOwnershipArr.size.should.equal(partitionIds.length);
      processorByName[`processor-2`].start();

      loggerForTest(`Just before the big arbitrary delay`);
      await delay(12000);
      loggerForTest(`Just after the big arbitrary delay`);

      for (const processor in processorByName) {
        await processorByName[processor].stop();
      }

      // map of ownerId as a key and partitionIds as a value
      const partitionOwnershipMap: Map<string, string[]> = new Map();

      const partitionOwnership = await checkpointStore.listOwnership(
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
      const checkpointStore = new InMemoryCheckpointStore();
      const partitionOwnershipArr = new Set();
      let didError = false;

      // The partitionProcess will need to add events to the partitionResultsMap as they are received
      class FooPartitionProcessor {
        async processInitialization(context: InitializationContext) {
          context.setStartPosition(EventPosition.earliest());
        }
        async processEvent(event: ReceivedEventData, context: PartitionContext) {
          partitionOwnershipArr.add(context.partitionId);
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
          new FooPartitionProcessor(),
          checkpointStore,
          defaultOptions
        );
        processorByName[processorName].start();
        await delay(12000);
      }

      await loopUntil({
        name: "partitionownership",
        timeBetweenRunsMs: 5000,
        maxTimes: 10,
        until: async () => partitionOwnershipArr.size === partitionIds.length
      });

      partitionOwnershipArr.size.should.equal(partitionIds.length);
      for (const processor in processorByName) {
        await processorByName[processor].stop();
      }

      // map of ownerId as a key and partitionIds as a value
      const partitionOwnershipMap: Map<string, string[]> = new Map();

      const partitionOwnership = await checkpointStore.listOwnership(
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

  describe("with trackLastEnqueuedEventProperties #RunnableInBrowser", function(): void {
    it("should have lastEnqueuedEventProperties populated when trackLastEnqueuedEventProperties is set to true", async function(): Promise<
      void
      > {
      const partitionIds = await client.getPartitionIds({});
      for (const partitionId of partitionIds) {
        const producer = client.createProducer({ partitionId: `${partitionId}` });
        await producer.send({ body: `Hello world - ${partitionId}` });
        await producer.close();
      }

      let partitionIdsSet = new Set();
      const lastEnqueuedEventPropertiesMap: Map<string, LastEnqueuedEventProperties> = new Map();
      class SimpleEventProcessor implements SubscriptionEventHandlers {
        async processInitialization(context: InitializationContext) {
          context.setStartPosition(EventPosition.latest());
        }
        async processEvent(event: ReceivedEventData, context: PartitionContext) {
          partitionIdsSet.add(context.partitionId);
          lastEnqueuedEventPropertiesMap.set(
            context.partitionId,
            context.lastEnqueuedEventProperties!
          );
        }
      }

      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        new SimpleEventProcessor(),
        new InMemoryCheckpointStore(),
        {
          ...defaultOptions,
          trackLastEnqueuedEventProperties: true,
          partitionLoadBalancer: new GreedyPartitionLoadBalancer()
        }
      );

      processor.start();

      while (partitionIdsSet.size !== partitionIds.length) {
        await delay(1000);
      }

      await processor.stop();

      for (const partitionId of partitionIds) {
        debug("Getting the partition information");
        const partitionInfo = await client.getPartitionProperties(partitionId);
        debug("partition info: ", partitionInfo);

        // sanity check - no partition should report being empty since we've sent messages
        // to each one
        partitionInfo.isEmpty.should.be.false;

        const results = lastEnqueuedEventPropertiesMap.get(partitionId)!;
        should.exist(results);

        results!.offset!.should.equal(partitionInfo.lastEnqueuedOffset);
        results!.sequenceNumber!.should.equal(partitionInfo.lastEnqueuedSequenceNumber);
        results!.enqueuedOn!.getTime().should.equal(partitionInfo.lastEnqueuedOnUtc.getTime());
        results!.retrievedOn!.getTime().should.be.greaterThan(Date.now() - 60000);
      }
    });
  });
}).timeout(90000);
