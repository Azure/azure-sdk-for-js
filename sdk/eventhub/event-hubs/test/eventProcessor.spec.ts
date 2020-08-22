// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:partitionPump");
import {
  CheckpointStore,
  CloseReason,
  EventData,
  PartitionOwnership,
  ReceivedEventData,
  SubscriptionEventHandlers,
  earliestEventPosition,
  latestEventPosition,
  EventHubConsumerClient,
  EventHubProducerClient
} from "../src";
import { EnvVarKeys, getEnvVars, loopUntil } from "./utils/testUtils";
import { Dictionary, generate_uuid } from "rhea-promise";
import { EventProcessor, FullEventProcessorOptions } from "../src/eventProcessor";
import { Checkpoint } from "../src/partitionProcessor";
import { delay } from "@azure/core-amqp";
import { PartitionContext } from "../src/eventHubConsumerClientModels";
import { InMemoryCheckpointStore } from "../src/inMemoryCheckpointStore";
import { loggerForTest } from "./utils/logHelpers";
import {
  SubscriptionHandlerForTests,
  sendOneMessagePerPartition
} from "./utils/subscriptionHandlerForTests";
import { AbortError, AbortSignal } from "@azure/abort-controller";
import { FakeSubscriptionEventHandlers } from "./utils/fakeSubscriptionEventHandlers";
import { isLatestPosition } from "../src/eventPosition";
import { AbortController } from "@azure/abort-controller";
import { UnbalancedLoadBalancingStrategy } from "../src/loadBalancerStrategies/unbalancedStrategy";
import { BalancedLoadBalancingStrategy } from "../src/loadBalancerStrategies/balancedStrategy";
import { GreedyLoadBalancingStrategy } from "../src/loadBalancerStrategies/greedyStrategy";
const env = getEnvVars();

describe("Event Processor", function(): void {
  const defaultOptions: FullEventProcessorOptions = {
    maxBatchSize: 1,
    maxWaitTimeInSeconds: 60,
    ownerLevel: 0,
    loopIntervalInMs: 10000,
    loadBalancingStrategy: new UnbalancedLoadBalancingStrategy()
  };

  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  let producerClient: EventHubProducerClient;
  let consumerClient: EventHubConsumerClient;

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
    producerClient = new EventHubProducerClient(service.connectionString, service.path);
    consumerClient = new EventHubConsumerClient(
      EventHubConsumerClient.defaultConsumerGroupName,
      service.connectionString,
      service.path
    );
  });

  afterEach("close the connection", async function(): Promise<void> {
    await producerClient.close();
    await consumerClient.close();
  });

  describe("unit tests", () => {
    describe("_getStartingPosition", () => {
      before(() => {
        consumerClient["_context"].managementSession!.getEventHubProperties = async () => {
          return Promise.resolve({
            name: "boo",
            createdOn: new Date(),
            partitionIds: ["0", "1"]
          });
        };
      });

      it("no checkpoint or user specified default", async () => {
        const processor = createEventProcessor(emptyCheckpointStore);

        const eventPosition = await processor["_getStartingPosition"]("0");
        isLatestPosition(eventPosition).should.be.ok;
      });

      it("has a checkpoint", async () => {
        const checkpointStore = createCheckpointStore([
          {
            offset: 1009,
            sequenceNumber: 1010,
            partitionId: "0"
          }
        ]);

        const processor = createEventProcessor(
          checkpointStore,
          // checkpoints always win over the user's specified position
          latestEventPosition
        );

        const eventPosition = await processor["_getStartingPosition"]("0");
        eventPosition!.offset!.should.equal(1009);
        should.not.exist(eventPosition!.sequenceNumber);
      });

      it("checkpoint with falsy values", async () => {
        // this caused a bug for us before - it's a perfectly valid offset
        // but we were thrown off by its falsy-ness. (actually it was
        // sequence number before but the concept is the same)
        const checkpointStore = createCheckpointStore([
          {
            offset: 0,
            sequenceNumber: 0,
            partitionId: "0"
          }
        ]);

        const processor = createEventProcessor(checkpointStore);

        const eventPosition = await processor["_getStartingPosition"]("0");
        eventPosition!.offset!.should.equal(0);
        should.not.exist(eventPosition!.sequenceNumber);
      });

      it("using a single default event position for any partition", async () => {
        const processor = createEventProcessor(emptyCheckpointStore, { offset: 1009 });

        const eventPosition = await processor["_getStartingPosition"]("0");
        eventPosition!.offset!.should.equal(1009);
        should.not.exist(eventPosition!.sequenceNumber);
      });

      it("using a fallback map", async () => {
        const fallbackPositions = { "0": { offset: 2001 } };
        // we'll purposefully omit "1" which should act as "fallback to the fallback" which is earliest()

        const processor = createEventProcessor(emptyCheckpointStore, fallbackPositions);

        const eventPositionForPartitionZero = await processor["_getStartingPosition"]("0");
        eventPositionForPartitionZero!.offset!.should.equal(2001);
        should.not.exist(eventPositionForPartitionZero!.sequenceNumber);

        const eventPositionForPartitionOne = await processor["_getStartingPosition"]("1");
        isLatestPosition(eventPositionForPartitionOne).should.be.ok;
      });

      function createEventProcessor(
        checkpointStore: CheckpointStore,
        startPosition?: FullEventProcessorOptions["startPosition"]
      ) {
        return new EventProcessor(
          EventHubConsumerClient.defaultConsumerGroupName,
          consumerClient["_context"],
          {
            processEvents: async () => {},
            processError: async () => {}
          },
          checkpointStore,
          {
            startPosition,
            maxBatchSize: 1,
            maxWaitTimeInSeconds: 1,
            loadBalancingStrategy: defaultOptions.loadBalancingStrategy,
            loopIntervalInMs: defaultOptions.loopIntervalInMs
          }
        );
      }

      const emptyCheckpointStore = createCheckpointStore([]);

      function createCheckpointStore(
        checkpointsForTest: Pick<Checkpoint, "offset" | "sequenceNumber" | "partitionId">[]
      ): CheckpointStore {
        return {
          claimOwnership: async () => {
            return [];
          },
          listCheckpoints: async () => {
            return checkpointsForTest.map((cp) => {
              return {
                fullyQualifiedNamespace: "not-used-for-this-test",
                consumerGroup: "not-used-for-this-test",
                eventHubName: "not-used-for-this-test",
                offset: cp.offset,
                sequenceNumber: cp.sequenceNumber,
                partitionId: cp.partitionId
              };
            });
          },
          listOwnership: async () => {
            return [];
          },
          updateCheckpoint: async () => {}
        };
      }
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
          EventHubConsumerClient.defaultConsumerGroupName,
          consumerClient["_context"],
          {
            processEvents: async () => {},
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

    it("if we fail to claim partitions we don't start up new processors", async () => {
      const checkpointStore = {
        claimOwnershipCalled: false,

        // the important thing is that the EventProcessor won't be able to claim
        // any partitions, causing it to go down the "I tried but failed" path.
        async claimOwnership(_: PartitionOwnership[]): Promise<PartitionOwnership[]> {
          checkpointStore.claimOwnershipCalled = true;
          return [];
        },

        // (these aren't used for this test)
        async listOwnership(): Promise<PartitionOwnership[]> {
          return [];
        },
        async updateCheckpoint(): Promise<void> {},
        async listCheckpoints(): Promise<Checkpoint[]> {
          return [];
        }
      };

      const pumpManager = {
        createPumpCalled: false,

        async createPump() {
          pumpManager.createPumpCalled = true;
        },

        async removeAllPumps() {},

        isReceivingFromPartition() {
          return false;
        },

        receivingFromPartitions() {
          return [];
        }
      };

      const eventProcessor = new EventProcessor(
        EventHubConsumerClient.defaultConsumerGroupName,
        consumerClient["_context"],
        {
          processEvents: async () => {},
          processError: async () => {}
        },
        checkpointStore,
        {
          ...defaultOptions,
          pumpManager: pumpManager
        }
      );

      await eventProcessor["_claimOwnership"](
        {
          consumerGroup: "cgname",
          eventHubName: "ehname",
          fullyQualifiedNamespace: "fqdn",
          ownerId: "owner",
          partitionId: "0"
        },
        new AbortController().signal
      );

      // when we fail to claim a partition we should _definitely_
      // not attempt to start a pump.
      pumpManager.createPumpCalled.should.be.false;

      // we'll attempt to claim a partition (but won't succeed)
      checkpointStore.claimOwnershipCalled.should.be.true;
    });

    it("abandoned claims are treated as unowned claims", async () => {
      const commonFields = {
        fullyQualifiedNamespace: "irrelevant namespace",
        eventHubName: "irrelevant eventhub name",
        consumerGroup: "irrelevant consumer group"
      };

      const handlers = new FakeSubscriptionEventHandlers();
      const checkpointStore = new InMemoryCheckpointStore();

      const originalClaimedPartitions = await checkpointStore.claimOwnership([
        // abandoned claim
        { ...commonFields, partitionId: "1001", ownerId: "", etag: "abandoned etag" },
        // normally owned claim
        { ...commonFields, partitionId: "1002", ownerId: "owned partition", etag: "owned etag" }
        // 1003 - completely unowned
      ]);

      originalClaimedPartitions.sort((a, b) => a.partitionId.localeCompare(b.partitionId));

      const partitionIds = ["1001", "1002", "1003"];

      const fakeConnectionContext = {
        managementSession: {
          getEventHubProperties: async () => {
            return {
              partitionIds
            };
          }
        },
        config: {
          entityPath: commonFields.eventHubName,
          host: commonFields.fullyQualifiedNamespace
        }
      };

      const ep = new EventProcessor(
        commonFields.consumerGroup,
        fakeConnectionContext as any,
        handlers,
        checkpointStore,
        {
          maxBatchSize: 1,
          loopIntervalInMs: 1,
          maxWaitTimeInSeconds: 1,
          pumpManager: {
            async createPump() {},
            async removeAllPumps(): Promise<void> {},
            isReceivingFromPartition() {
              return false;
            }
          },
          loadBalancingStrategy: new BalancedLoadBalancingStrategy(60000)
        }
      );

      // allow three iterations through the loop - one for each partition that
      // we expect to be claimed
      //
      // we'll let one more go through just to make sure we're not going to
      // pick up an extra surprise partition
      //
      // There are 6 places where the abort signal is checked during the loop:
      // - while condition
      // - getEventHubProperties
      // - _performLoadBalancing (start)
      // - _performLoadBalancing (after listOwnership)
      // - _performLoadBalancing (passed to _claimOwnership)
      // - delay
      const numTimesAbortedIsCheckedInLoop = 6;
      await ep["_runLoopWithLoadBalancing"](
        ep["_loadBalancingStrategy"],
        triggerAbortedSignalAfterNumCalls(partitionIds.length * numTimesAbortedIsCheckedInLoop)
      );

      handlers.errors.should.be.empty;

      const currentOwnerships = await checkpointStore.listOwnership(
        commonFields.fullyQualifiedNamespace,
        commonFields.eventHubName,
        commonFields.consumerGroup
      );
      currentOwnerships.sort((a, b) => a.partitionId.localeCompare(b.partitionId));

      currentOwnerships.should.deep.equal([
        {
          ...commonFields,
          partitionId: "1001",
          ownerId: ep.id,
          etag: currentOwnerships[0].etag,
          lastModifiedTimeInMs: currentOwnerships[0].lastModifiedTimeInMs
        },
        // 1002 is not going to be claimed since it's already owned so it should be untouched
        originalClaimedPartitions[1],
        {
          ...commonFields,
          partitionId: "1003",
          ownerId: ep.id,
          etag: currentOwnerships[2].etag,
          lastModifiedTimeInMs: currentOwnerships[2].lastModifiedTimeInMs
        }
      ]);

      // now let's "unclaim" everything by stopping our event processor
      await ep.stop();

      // sanity check - we were previously modifying the original instances
      // in place which...isn't right.
      currentOwnerships.should.deep.equal([
        {
          ...commonFields,
          partitionId: "1001",
          ownerId: ep.id,
          etag: currentOwnerships[0].etag,
          lastModifiedTimeInMs: currentOwnerships[0].lastModifiedTimeInMs
        },
        // 1002 is not going to be claimed since it's already owned so it should be untouched
        originalClaimedPartitions[1],
        {
          ...commonFields,
          partitionId: "1003",
          ownerId: ep.id,
          etag: currentOwnerships[2].etag,
          lastModifiedTimeInMs: currentOwnerships[2].lastModifiedTimeInMs
        }
      ]);

      const ownershipsAfterStop = await checkpointStore.listOwnership(
        commonFields.fullyQualifiedNamespace,
        commonFields.eventHubName,
        commonFields.consumerGroup
      );
      ownershipsAfterStop.sort((a, b) => a.partitionId.localeCompare(b.partitionId));

      ownershipsAfterStop.should.deep.equal([
        {
          ...commonFields,
          partitionId: "1001",
          ownerId: "",
          etag: ownershipsAfterStop[0].etag,
          lastModifiedTimeInMs: ownershipsAfterStop[0].lastModifiedTimeInMs
        },
        // 1002 is not going to be claimed since it's already owned so it should be untouched
        originalClaimedPartitions[1],
        {
          ...commonFields,
          partitionId: "1003",
          ownerId: "",
          etag: ownershipsAfterStop[2].etag,
          lastModifiedTimeInMs: ownershipsAfterStop[2].lastModifiedTimeInMs
        }
      ]);
    });
  });

  it("claimOwnership throws and is reported to the user", async () => {
    const errors = [];
    const partitionIds = await consumerClient.getPartitionIds();

    const faultyCheckpointStore: CheckpointStore = {
      listOwnership: async () => [],
      claimOwnership: async () => {
        throw new Error("Some random failure!");
      },
      updateCheckpoint: async () => {},
      listCheckpoints: async () => []
    };

    const eventProcessor = new EventProcessor(
      EventHubConsumerClient.defaultConsumerGroupName,
      consumerClient["_context"],
      {
        processEvents: async () => {},
        processError: async (err, _) => {
          errors.push(err);
        }
      },
      faultyCheckpointStore,
      {
        ...defaultOptions
      }
    );

    // claimOwnership() calls that fail in the runloop of eventProcessor
    // will get directed to the user's processError handler.
    eventProcessor.start();

    try {
      await loopUntil({
        name: "waiting for checkpoint store errors to show up",
        timeBetweenRunsMs: 1000,
        maxTimes: 30,
        until: async () => errors.length !== 0
      });

      errors.length.should.equal(partitionIds.length);
    } finally {
      // this will also fail - we "abandon" all claimed partitions at
      // when a processor is stopped (which requires us to claim them
      // with an empty owner ID).
      //
      // Note that this one gets thrown directly from stop(), rather
      // than reporting to processError() since we have a direct
      // point of contact with the user.
      await eventProcessor.stop().should.be.rejectedWith(/Some random failure!/);
    }
  });

  it("errors thrown from the user's handlers are reported to processError()", async () => {
    const errors = new Set<Error>();
    const partitionIds = await consumerClient.getPartitionIds();

    const processCloseErrorMessage = "processClose() error";
    const processEventsErrorMessage = "processEvents() error";
    const processInitializeErrorMessage = "processInitialize() error";
    const expectedErrorMessages: string[] = [];
    for (let i = 0; i < partitionIds.length; i++) {
      expectedErrorMessages.push(
        processCloseErrorMessage,
        processEventsErrorMessage,
        processInitializeErrorMessage
      );
    }
    expectedErrorMessages.sort();

    const eventProcessor = new EventProcessor(
      EventHubConsumerClient.defaultConsumerGroupName,
      consumerClient["_context"],
      {
        processClose: async () => {
          throw new Error(processCloseErrorMessage);
        },
        processEvents: async () => {
          throw new Error(processEventsErrorMessage);
        },
        processInitialize: async () => {
          throw new Error(processInitializeErrorMessage);
        },
        processError: async (err, _) => {
          errors.add(err);
          throw new Error("These are logged but ignored");
        }
      },
      new InMemoryCheckpointStore(),
      {
        ...defaultOptions,
        startPosition: earliestEventPosition
      }
    );

    // errors that occur within the user's own event handlers will get
    // routed to their processError() handler
    eventProcessor.start();

    try {
      await loopUntil({
        name: "waiting for errors thrown from user's handlers",
        timeBetweenRunsMs: 1000,
        maxTimes: 30,
        until: async () => errors.size >= partitionIds.length * 3
      });

      const messages = [...errors].map((e) => e.message);
      messages.sort();

      messages.should.deep.equal(expectedErrorMessages);
    } finally {
      await eventProcessor.stop();
    }
  });

  it("should expose an id", async function(): Promise<void> {
    const processor = new EventProcessor(
      EventHubConsumerClient.defaultConsumerGroupName,
      consumerClient["_context"],
      {
        processEvents: async () => {},
        processError: async () => {}
      },
      new InMemoryCheckpointStore(),
      {
        ...defaultOptions,
        startPosition: latestEventPosition
      }
    );

    const id = processor.id;
    id.length.should.be.gt(1);
  });

  it("id can be forced to be a specific value", async function(): Promise<void> {
    const processor = new EventProcessor(
      EventHubConsumerClient.defaultConsumerGroupName,
      consumerClient["_context"],
      {
        processEvents: async () => {},
        processError: async () => {}
      },
      new InMemoryCheckpointStore(),
      { ...defaultOptions, ownerId: "hello", startPosition: latestEventPosition }
    );

    processor.id.should.equal("hello");
  });

  it("should treat consecutive start invocations as idempotent", async function(): Promise<void> {
    const partitionIds = await producerClient.getPartitionIds();

    // ensure we have at least 2 partitions
    partitionIds.length.should.gte(2);

    const {
      subscriptionEventHandler,
      startPosition
    } = await SubscriptionHandlerForTests.startingFromHere(producerClient);

    const processor = new EventProcessor(
      EventHubConsumerClient.defaultConsumerGroupName,
      consumerClient["_context"],
      subscriptionEventHandler,
      new InMemoryCheckpointStore(),
      {
        ...defaultOptions,
        startPosition: startPosition
      }
    );

    processor.start();
    processor.start();
    processor.start();

    const expectedMessages = await sendOneMessagePerPartition(partitionIds, producerClient);
    const receivedEvents = await subscriptionEventHandler.waitForEvents(partitionIds);

    // shutdown the processor
    await processor.stop();

    receivedEvents.should.deep.equal(expectedMessages);

    subscriptionEventHandler.hasErrors(partitionIds).should.be.false;
    subscriptionEventHandler.allShutdown(partitionIds).should.be.true;
  });

  it("should not throw if stop is called without start", async function(): Promise<void> {
    let didPartitionProcessorStart = false;

    const processor = new EventProcessor(
      EventHubConsumerClient.defaultConsumerGroupName,
      consumerClient["_context"],
      {
        processInitialize: async () => {
          didPartitionProcessorStart = true;
        },
        processEvents: async () => {},
        processError: async () => {}
      },
      new InMemoryCheckpointStore(),
      {
        ...defaultOptions,
        startPosition: latestEventPosition
      }
    );

    // shutdown the processor
    await processor.stop();

    didPartitionProcessorStart.should.be.false;
  });

  it("should support start after stopping", async function(): Promise<void> {
    const partitionIds = await producerClient.getPartitionIds();

    // ensure we have at least 2 partitions
    partitionIds.length.should.gte(2);

    const {
      subscriptionEventHandler,
      startPosition
    } = await SubscriptionHandlerForTests.startingFromHere(producerClient);

    const processor = new EventProcessor(
      EventHubConsumerClient.defaultConsumerGroupName,
      consumerClient["_context"],
      subscriptionEventHandler,
      new InMemoryCheckpointStore(),
      {
        ...defaultOptions,
        startPosition: startPosition
      }
    );

    loggerForTest(`Starting processor for the first time`);
    processor.start();

    const expectedMessages = await sendOneMessagePerPartition(partitionIds, producerClient);
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

    processor.start();

    await subscriptionEventHandler.waitUntilInitialized(partitionIds);

    loggerForTest(`Stopping processor again`);
    await processor.stop();

    subscriptionEventHandler.hasErrors(partitionIds).should.be.false;
    subscriptionEventHandler.allShutdown(partitionIds).should.be.true;
  });

  describe("Partition processor", function(): void {
    it("should support processing events across multiple partitions", async function(): Promise<
      void
    > {
      const partitionIds = await producerClient.getPartitionIds();
      const {
        subscriptionEventHandler,
        startPosition
      } = await SubscriptionHandlerForTests.startingFromHere(producerClient);

      const processor = new EventProcessor(
        EventHubConsumerClient.defaultConsumerGroupName,
        consumerClient["_context"],
        subscriptionEventHandler,
        new InMemoryCheckpointStore(),
        {
          ...defaultOptions,
          startPosition: startPosition
        }
      );

      processor.start();

      const expectedMessages = await sendOneMessagePerPartition(partitionIds, producerClient);
      const receivedEvents = await subscriptionEventHandler.waitForEvents(partitionIds);

      // shutdown the processor
      await processor.stop();

      subscriptionEventHandler.hasErrors(partitionIds).should.be.false;
      subscriptionEventHandler.allShutdown(partitionIds).should.be.true;

      receivedEvents.should.deep.equal(expectedMessages);
    });
  });

  describe("InMemory Partition Manager", function(): void {
    it("should claim ownership, get a list of ownership and update checkpoint", async function(): Promise<
      void
    > {
      const inMemoryCheckpointStore = new InMemoryCheckpointStore();
      const partitionOwnership1: PartitionOwnership = {
        fullyQualifiedNamespace: "myNamespace.servicebus.windows.net",
        eventHubName: "myEventHub",
        consumerGroup: EventHubConsumerClient.defaultConsumerGroupName,
        ownerId: generate_uuid(),
        partitionId: "0"
      };
      const partitionOwnership2: PartitionOwnership = {
        fullyQualifiedNamespace: "myNamespace.servicebus.windows.net",
        eventHubName: "myEventHub",
        consumerGroup: EventHubConsumerClient.defaultConsumerGroupName,
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
        EventHubConsumerClient.defaultConsumerGroupName
      );
      ownershiplist.length.should.equals(2);

      const checkpoint: Checkpoint = {
        fullyQualifiedNamespace: "myNamespace.servicebus.windows.net",
        eventHubName: "myEventHub",
        consumerGroup: EventHubConsumerClient.defaultConsumerGroupName,
        partitionId: "0",
        sequenceNumber: 10,
        offset: 50
      };

      await inMemoryCheckpointStore.updateCheckpoint(checkpoint);
      const partitionOwnershipList = await inMemoryCheckpointStore.listOwnership(
        "myNamespace.servicebus.windows.net",
        "myEventHub",
        EventHubConsumerClient.defaultConsumerGroupName
      );
      partitionOwnershipList[0].partitionId.should.equals(checkpoint.partitionId);
      partitionOwnershipList[0].fullyQualifiedNamespace!.should.equals(
        "myNamespace.servicebus.windows.net"
      );
      partitionOwnershipList[0].eventHubName!.should.equals("myEventHub");
      partitionOwnershipList[0].consumerGroup!.should.equals(
        EventHubConsumerClient.defaultConsumerGroupName
      );
    });

    it("should receive events from the checkpoint", async function(): Promise<void> {
      const partitionIds = await producerClient.getPartitionIds();

      // ensure we have at least 2 partitions
      partitionIds.length.should.gte(2);

      let checkpointMap = new Map<string, ReceivedEventData[]>();
      partitionIds.forEach((id) => checkpointMap.set(id, []));

      let didError = false;
      let processedAtLeastOneEvent = new Set();
      const checkpointSequenceNumbers: Map<string, number> = new Map();

      let partionCount: { [x: string]: number } = {};

      class FooPartitionProcessor {
        async processEvents(events: ReceivedEventData[], context: PartitionContext) {
          processedAtLeastOneEvent.add(context.partitionId);

          !partionCount[context.partitionId]
            ? (partionCount[context.partitionId] = 1)
            : partionCount[context.partitionId]++;

          const existingEvents = checkpointMap.get(context.partitionId)!;

          for (const event of events) {
            debug("Received event: '%s' from partition: '%s'", event.body, context.partitionId);

            if (partionCount[context.partitionId] <= 50) {
              checkpointSequenceNumbers.set(context.partitionId, event.sequenceNumber);
              await context.updateCheckpoint(event);
              existingEvents.push(event);
            }
          }
        }
        async processError() {
          didError = true;
        }
      }

      const inMemoryCheckpointStore = new InMemoryCheckpointStore();
      const processor1 = new EventProcessor(
        EventHubConsumerClient.defaultConsumerGroupName,
        consumerClient["_context"],
        new FooPartitionProcessor(),
        inMemoryCheckpointStore,
        {
          ...defaultOptions,
          startPosition: earliestEventPosition
        }
      );

      // start first processor
      processor1.start();

      // create messages
      const expectedMessagePrefix = "EventProcessor test - checkpoint - ";
      const events: EventData[] = [];

      for (const partitionId of partitionIds) {
        for (let index = 1; index <= 100; index++) {
          events.push({ body: `${expectedMessagePrefix} ${index} ${partitionId}` });
        }
        await producerClient.sendBatch(events, { partitionId });
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
        EventHubConsumerClient.defaultConsumerGroupName,
        consumerClient["_context"],
        new FooPartitionProcessor(),
        inMemoryCheckpointStore,
        { ...defaultOptions, startPosition: earliestEventPosition }
      );

      const checkpoints = await inMemoryCheckpointStore.listCheckpoints(
        consumerClient.fullyQualifiedNamespace,
        consumerClient.eventHubName,
        EventHubConsumerClient.defaultConsumerGroupName
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

    it("makes copies and never returns internal instances directly", async () => {
      const checkpointStore = new InMemoryCheckpointStore();
      const allObjects = new Set();

      const assertUnique = (...objects: any[]) => {
        const size = allObjects.size;

        for (const obj of objects) {
          allObjects.add(obj);
          size.should.be.lessThan(allObjects.size);
        }
      };

      const basicProperties = {
        consumerGroup: "initial consumer group",
        eventHubName: "initial event hub name",
        fullyQualifiedNamespace: "initial fully qualified namespace"
      };

      const originalPartitionOwnership = {
        ...basicProperties,
        ownerId: "initial owner ID",
        partitionId: "1001"
      };

      const copyOfPartitionOwnership = {
        ...originalPartitionOwnership
      };

      assertUnique(originalPartitionOwnership);

      for (let i = 0; i < 2; ++i) {
        const ownerships = await checkpointStore.claimOwnership([originalPartitionOwnership]);

        // second sanity check - we were also modifying the input parameter
        // (which was also bad)
        copyOfPartitionOwnership.should.deep.equal(originalPartitionOwnership);

        assertUnique(...ownerships);
      }

      for (let i = 0; i < 2; ++i) {
        const ownerships = await checkpointStore.listOwnership(
          basicProperties.fullyQualifiedNamespace,
          basicProperties.eventHubName,
          basicProperties.consumerGroup
        );
        assertUnique(...ownerships);
      }

      const originalCheckpoint: Checkpoint = {
        ...basicProperties,
        sequenceNumber: 1,
        partitionId: "1",
        offset: 101
      };

      const copyOfOriginalCheckpoint = {
        ...originalCheckpoint
      };

      await checkpointStore.updateCheckpoint(originalCheckpoint);

      // checking that we don't modify input parameters
      copyOfOriginalCheckpoint.should.deep.equal(originalCheckpoint);

      for (let i = 0; i < 2; ++i) {
        const checkpoints = await checkpointStore.listCheckpoints(
          basicProperties.fullyQualifiedNamespace,
          basicProperties.eventHubName,
          basicProperties.consumerGroup
        );
        assertUnique(...checkpoints);
      }
    });
  });

  describe("Load balancing", function(): void {
    beforeEach("validate partitions", async function(): Promise<void> {
      const partitionIds = await producerClient.getPartitionIds();
      // ensure we have at least 3 partitions
      partitionIds.length.should.gte(
        3,
        "The load balancing tests must be ran on an Event Hub with at least 3 partitions"
      );
    });

    it("should 'steal' partitions until all the processors have reached a steady-state (BalancedLoadBalancingStrategy)", async function(): Promise<
      void
    > {
      loggerForTest("starting up the stealing test");

      const processorByName: Dictionary<EventProcessor> = {};
      const checkpointStore = new InMemoryCheckpointStore();
      const partitionIds = await producerClient.getPartitionIds();
      const partitionOwnershipArr = new Set();

      const partitionResultsMap = new Map<
        string,
        { events: string[]; initialized: boolean; closeReason?: CloseReason }
      >();
      partitionIds.forEach((id) => partitionResultsMap.set(id, { events: [], initialized: false }));
      let didGetReceiverDisconnectedError = false;

      // The partitionProcess will need to add events to the partitionResultsMap as they are received
      class FooPartitionProcessor implements Required<SubscriptionEventHandlers> {
        async processInitialize(context: PartitionContext) {
          loggerForTest(`processInitialize(${context.partitionId})`);
          partitionResultsMap.get(context.partitionId)!.initialized = true;
        }
        async processClose(reason: CloseReason, context: PartitionContext) {
          loggerForTest(`processClose(${context.partitionId})`);
          partitionResultsMap.get(context.partitionId)!.closeReason = reason;
        }
        async processEvents(events: ReceivedEventData[], context: PartitionContext) {
          partitionOwnershipArr.add(context.partitionId);
          const existingEvents = partitionResultsMap.get(context.partitionId)!.events;
          existingEvents.push(...events.map((event) => event.body));
        }
        async processError(err: Error, context: PartitionContext) {
          loggerForTest(`processError(${context.partitionId})`);
          const errorName = (err as any).code;
          if (errorName === "ReceiverDisconnectedError") {
            didGetReceiverDisconnectedError = true;
          }
        }
      }

      // create messages
      const expectedMessagePrefix = "EventProcessor test - multiple partitions - ";
      for (const partitionId of partitionIds) {
        await producerClient.sendBatch([{ body: expectedMessagePrefix + partitionId }], {
          partitionId
        });
      }

      const processor1LoadBalancingInterval = {
        loopIntervalInMs: 1000
      };

      // working around a potential deadlock - this allows `processor-2` to more
      // aggressively pursue getting its required partitions and avoid being in
      // lockstep with `processor-1`
      const processor2LoadBalancingInterval = {
        loopIntervalInMs: processor1LoadBalancingInterval.loopIntervalInMs / 2
      };

      processorByName[`processor-1`] = new EventProcessor(
        EventHubConsumerClient.defaultConsumerGroupName,
        consumerClient["_context"],
        new FooPartitionProcessor(),
        checkpointStore,
        {
          ...defaultOptions,
          startPosition: earliestEventPosition,
          ...processor1LoadBalancingInterval,
          loadBalancingStrategy: new BalancedLoadBalancingStrategy(60000)
        }
      );

      processorByName[`processor-1`].start();

      await loopUntil({
        name: "All partitions are owned",
        maxTimes: 60,
        timeBetweenRunsMs: 1000,
        until: async () => partitionOwnershipArr.size === partitionIds.length,
        errorMessageFn: () => `${partitionOwnershipArr.size}/${partitionIds.length}`
      });

      processorByName[`processor-2`] = new EventProcessor(
        EventHubConsumerClient.defaultConsumerGroupName,
        consumerClient["_context"],
        new FooPartitionProcessor(),
        checkpointStore,
        {
          ...defaultOptions,
          startPosition: earliestEventPosition,
          ...processor2LoadBalancingInterval,
          loadBalancingStrategy: new BalancedLoadBalancingStrategy(60000)
        }
      );

      partitionOwnershipArr.size.should.equal(partitionIds.length);
      processorByName[`processor-2`].start();

      await loopUntil({
        name: "Processors are balanced",
        maxTimes: 60,
        timeBetweenRunsMs: 1000,
        until: async () => {
          // it should be impossible for 'processor-2' to have obtained the number of
          // partitions it needed without having stolen some from 'processor-1'
          // so if we haven't see any `ReceiverDisconnectedError`'s then that stealing
          // hasn't occurred yet.
          if (!didGetReceiverDisconnectedError) {
            return false;
          }

          const partitionOwnership = await checkpointStore.listOwnership(
            consumerClient.fullyQualifiedNamespace,
            consumerClient.eventHubName,
            EventHubConsumerClient.defaultConsumerGroupName
          );

          // map of ownerId as a key and partitionIds as a value
          const partitionOwnershipMap: Map<string, string[]> = ownershipListToMap(
            partitionOwnership
          );

          // if stealing has occurred we just want to make sure that _all_
          // the stealing has completed.
          const isBalanced = (friendlyName: string) => {
            const n = Math.floor(partitionIds.length / 2);
            const numPartitions = partitionOwnershipMap.get(processorByName[friendlyName].id)!
              .length;
            return numPartitions == n || numPartitions == n + 1;
          };

          if (!isBalanced(`processor-1`) || !isBalanced(`processor-2`)) {
            return false;
          }

          return true;
        }
      });

      for (const processor in processorByName) {
        await processorByName[processor].stop();
      }

      // now that all the dust has settled let's make sure that
      // a. we received some events from each partition (doesn't matter which processor)
      //    did the work
      // b. each partition was initialized
      // c. each partition should have received at least one shutdown event
      for (const partitionId of partitionIds) {
        const results = partitionResultsMap.get(partitionId)!;
        results.events.length.should.be.gte(1);
        results.initialized.should.be.true;
        (results.closeReason === CloseReason.Shutdown).should.be.true;
      }
    });

    it("should 'steal' partitions until all the processors have reached a steady-state (GreedyLoadBalancingStrategy)", async function(): Promise<
      void
    > {
      loggerForTest("starting up the stealing test");

      const processorByName: Dictionary<EventProcessor> = {};
      const checkpointStore = new InMemoryCheckpointStore();
      const partitionIds = await producerClient.getPartitionIds();
      const partitionOwnershipArr = new Set();

      const partitionResultsMap = new Map<
        string,
        { events: string[]; initialized: boolean; closeReason?: CloseReason }
      >();
      partitionIds.forEach((id) => partitionResultsMap.set(id, { events: [], initialized: false }));
      let didGetReceiverDisconnectedError = false;

      // The partitionProcess will need to add events to the partitionResultsMap as they are received
      class FooPartitionProcessor implements Required<SubscriptionEventHandlers> {
        async processInitialize(context: PartitionContext) {
          loggerForTest(`processInitialize(${context.partitionId})`);
          partitionResultsMap.get(context.partitionId)!.initialized = true;
        }
        async processClose(reason: CloseReason, context: PartitionContext) {
          loggerForTest(`processClose(${context.partitionId})`);
          partitionResultsMap.get(context.partitionId)!.closeReason = reason;
        }
        async processEvents(events: ReceivedEventData[], context: PartitionContext) {
          partitionOwnershipArr.add(context.partitionId);
          const existingEvents = partitionResultsMap.get(context.partitionId)!.events;
          existingEvents.push(...events.map((event) => event.body));
        }
        async processError(err: Error, context: PartitionContext) {
          loggerForTest(`processError(${context.partitionId})`);
          const errorName = (err as any).code;
          if (errorName === "ReceiverDisconnectedError") {
            didGetReceiverDisconnectedError = true;
          }
        }
      }

      // create messages
      const expectedMessagePrefix = "EventProcessor test - multiple partitions - ";
      for (const partitionId of partitionIds) {
        await producerClient.sendBatch([{ body: expectedMessagePrefix + partitionId }], {
          partitionId
        });
      }

      const processor1LoadBalancingInterval = {
        loopIntervalInMs: 1000
      };

      // working around a potential deadlock - this allows `processor-2` to more
      // aggressively pursue getting its required partitions and avoid being in
      // lockstep with `processor-1`
      const processor2LoadBalancingInterval = {
        loopIntervalInMs: processor1LoadBalancingInterval.loopIntervalInMs / 2
      };

      processorByName[`processor-1`] = new EventProcessor(
        EventHubConsumerClient.defaultConsumerGroupName,
        consumerClient["_context"],
        new FooPartitionProcessor(),
        checkpointStore,
        {
          ...defaultOptions,
          startPosition: earliestEventPosition,
          ...processor1LoadBalancingInterval,
          loadBalancingStrategy: new GreedyLoadBalancingStrategy(60000)
        }
      );

      processorByName[`processor-1`].start();

      await loopUntil({
        name: "All partitions are owned",
        maxTimes: 60,
        timeBetweenRunsMs: 1000,
        until: async () => partitionOwnershipArr.size === partitionIds.length,
        errorMessageFn: () => `${partitionOwnershipArr.size}/${partitionIds.length}`
      });

      processorByName[`processor-2`] = new EventProcessor(
        EventHubConsumerClient.defaultConsumerGroupName,
        consumerClient["_context"],
        new FooPartitionProcessor(),
        checkpointStore,
        {
          ...defaultOptions,
          startPosition: earliestEventPosition,
          ...processor2LoadBalancingInterval,
          loadBalancingStrategy: new GreedyLoadBalancingStrategy(60000)
        }
      );

      partitionOwnershipArr.size.should.equal(partitionIds.length);
      processorByName[`processor-2`].start();

      await loopUntil({
        name: "Processors are balanced",
        maxTimes: 60,
        timeBetweenRunsMs: 1000,
        until: async () => {
          // it should be impossible for 'processor-2' to have obtained the number of
          // partitions it needed without having stolen some from 'processor-1'
          // so if we haven't see any `ReceiverDisconnectedError`'s then that stealing
          // hasn't occurred yet.
          if (!didGetReceiverDisconnectedError) {
            return false;
          }

          const partitionOwnership = await checkpointStore.listOwnership(
            consumerClient.fullyQualifiedNamespace,
            consumerClient.eventHubName,
            EventHubConsumerClient.defaultConsumerGroupName
          );

          // map of ownerId as a key and partitionIds as a value
          const partitionOwnershipMap: Map<string, string[]> = ownershipListToMap(
            partitionOwnership
          );

          // if stealing has occurred we just want to make sure that _all_
          // the stealing has completed.
          const isBalanced = (friendlyName: string) => {
            const n = Math.floor(partitionIds.length / 2);
            const numPartitions = partitionOwnershipMap.get(processorByName[friendlyName].id)!
              .length;
            return numPartitions == n || numPartitions == n + 1;
          };

          if (!isBalanced(`processor-1`) || !isBalanced(`processor-2`)) {
            return false;
          }

          return true;
        }
      });

      for (const processor in processorByName) {
        await processorByName[processor].stop();
      }

      // now that all the dust has settled let's make sure that
      // a. we received some events from each partition (doesn't matter which processor)
      //    did the work
      // b. each partition was initialized
      // c. each partition should have received at least one shutdown event
      for (const partitionId of partitionIds) {
        const results = partitionResultsMap.get(partitionId)!;
        results.events.length.should.be.gte(1);
        results.initialized.should.be.true;
        (results.closeReason === CloseReason.Shutdown).should.be.true;
      }
    });

    it("should ensure that all the processors reach a steady-state where all partitions are being processed (BalancedLoadBalancingStrategy)", async function(): Promise<
      void
    > {
      const processorByName: Dictionary<EventProcessor> = {};
      const partitionIds = await producerClient.getPartitionIds();
      const checkpointStore = new InMemoryCheckpointStore();
      const partitionOwnershipArr = new Set();
      let didError = false;

      // The partitionProcess will need to add events to the partitionResultsMap as they are received
      class FooPartitionProcessor {
        async processEvents(_events: ReceivedEventData[], context: PartitionContext) {
          partitionOwnershipArr.add(context.partitionId);
        }
        async processError() {
          didError = true;
        }
      }

      // create messages
      const expectedMessagePrefix = "EventProcessor test - multiple partitions - ";
      for (const partitionId of partitionIds) {
        await producerClient.sendBatch([{ body: expectedMessagePrefix + partitionId }], {
          partitionId
        });
      }

      for (let i = 0; i < 2; i++) {
        const processorName = `processor-${i}`;
        processorByName[processorName] = new EventProcessor(
          EventHubConsumerClient.defaultConsumerGroupName,
          consumerClient["_context"],
          new FooPartitionProcessor(),
          checkpointStore,
          {
            ...defaultOptions,
            startPosition: earliestEventPosition,
            loadBalancingStrategy: new BalancedLoadBalancingStrategy(60000)
          }
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

      // map of ownerId as a key and partitionIds as a value
      const partitionOwnershipMap: Map<string, string[]> = new Map();

      const partitionOwnership = await checkpointStore.listOwnership(
        consumerClient.fullyQualifiedNamespace,
        consumerClient.eventHubName,
        EventHubConsumerClient.defaultConsumerGroupName
      );

      partitionOwnershipArr.size.should.equal(partitionIds.length);
      for (const processor in processorByName) {
        await processorByName[processor].stop();
      }

      for (const ownership of partitionOwnership) {
        if (!partitionOwnershipMap.has(ownership.ownerId)) {
          partitionOwnershipMap.set(ownership.ownerId, [ownership.partitionId]);
        } else {
          const arr = partitionOwnershipMap.get(ownership.ownerId);
          arr!.push(ownership.partitionId);
          partitionOwnershipMap.set(ownership.ownerId, arr!);
        }
      }

      didError.should.be.false;
      const n = Math.floor(partitionIds.length / 2);
      partitionOwnershipMap.get(processorByName[`processor-0`].id)!.length.should.oneOf([n, n + 1]);
      partitionOwnershipMap.get(processorByName[`processor-1`].id)!.length.should.oneOf([n, n + 1]);
    });

    it("should ensure that all the processors reach a steady-state where all partitions are being processed (GreedyLoadBalancingStrategy)", async function(): Promise<
      void
    > {
      const processorByName: Dictionary<EventProcessor> = {};
      const partitionIds = await producerClient.getPartitionIds();
      const checkpointStore = new InMemoryCheckpointStore();
      const partitionOwnershipArr = new Set();

      // The partitionProcess will need to add events to the partitionResultsMap as they are received
      class FooPartitionProcessor {
        async processEvents(_events: ReceivedEventData[], context: PartitionContext) {
          partitionOwnershipArr.add(context.partitionId);
        }
        async processError() {}
      }

      // create messages
      const expectedMessagePrefix = "EventProcessor test - multiple partitions - ";
      for (const partitionId of partitionIds) {
        await producerClient.sendBatch([{ body: expectedMessagePrefix + partitionId }], {
          partitionId
        });
      }

      for (let i = 0; i < 2; i++) {
        const processorName = `processor-${i}`;
        processorByName[processorName] = new EventProcessor(
          EventHubConsumerClient.defaultConsumerGroupName,
          consumerClient["_context"],
          new FooPartitionProcessor(),
          checkpointStore,
          {
            ...defaultOptions,
            startPosition: earliestEventPosition,
            loadBalancingStrategy: new GreedyLoadBalancingStrategy(60000)
          }
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

      // map of ownerId as a key and partitionIds as a value
      const partitionOwnershipMap: Map<string, string[]> = new Map();

      const partitionOwnership = await checkpointStore.listOwnership(
        consumerClient.fullyQualifiedNamespace,
        consumerClient.eventHubName,
        EventHubConsumerClient.defaultConsumerGroupName
      );

      partitionOwnershipArr.size.should.equal(partitionIds.length);
      for (const processor in processorByName) {
        await processorByName[processor].stop();
      }

      for (const ownership of partitionOwnership) {
        if (!partitionOwnershipMap.has(ownership.ownerId)) {
          partitionOwnershipMap.set(ownership.ownerId, [ownership.partitionId]);
        } else {
          const arr = partitionOwnershipMap.get(ownership.ownerId);
          arr!.push(ownership.partitionId);
          partitionOwnershipMap.set(ownership.ownerId, arr!);
        }
      }

      const n = Math.floor(partitionIds.length / 2);
      partitionOwnershipMap.get(processorByName[`processor-0`].id)!.length.should.oneOf([n, n + 1]);
      partitionOwnershipMap.get(processorByName[`processor-1`].id)!.length.should.oneOf([n, n + 1]);
    });

    it("should ensure that all the processors maintain a steady-state when all partitions are being processed (BalancedLoadBalancingStrategy)", async function(): Promise<
      void
    > {
      const partitionIds = await producerClient.getPartitionIds();
      const checkpointStore = new InMemoryCheckpointStore();
      const claimedPartitionsMap = {} as { [eventProcessorId: string]: Set<string> };

      const partitionOwnershipHistory: string[] = [];

      let allPartitionsClaimed = false;
      let thrashAfterSettling = false;
      const handlers: SubscriptionEventHandlers = {
        async processInitialize(context) {
          const eventProcessorId: string = (context as any).eventProcessorId;
          const partitionId = context.partitionId;

          partitionOwnershipHistory.push(`${eventProcessorId}: init ${partitionId}`);

          loggerForTest(`[${eventProcessorId}] Claimed partition ${partitionId}`);
          if (allPartitionsClaimed) {
            thrashAfterSettling = true;
            return;
          }

          const claimedPartitions = claimedPartitionsMap[eventProcessorId] || new Set();
          claimedPartitions.add(partitionId);
          claimedPartitionsMap[eventProcessorId] = claimedPartitions;
        },
        async processEvents() {},
        async processError() {},
        async processClose(reason, context) {
          const eventProcessorId: string = (context as any).eventProcessorId;
          const partitionId = context.partitionId;
          const claimedPartitions = claimedPartitionsMap[eventProcessorId];
          claimedPartitions.delete(partitionId);
          loggerForTest(
            `[${(context as any).eventProcessorId}] processClose(${reason}) on partition ${
              context.partitionId
            }`
          );
          if (reason === CloseReason.OwnershipLost && allPartitionsClaimed) {
            loggerForTest(
              `[${(context as any).eventProcessorId}] Lost partition ${context.partitionId}`
            );
            thrashAfterSettling = true;
          }
        }
      };

      const eventProcessorOptions: FullEventProcessorOptions = {
        maxBatchSize: 1,
        maxWaitTimeInSeconds: 5,
        loopIntervalInMs: 1000,
        inactiveTimeLimitInMs: 3000,
        ownerLevel: 0,
        // For this test we don't want to actually checkpoint, just test ownership.
        startPosition: latestEventPosition,
        loadBalancingStrategy: new BalancedLoadBalancingStrategy(60000)
      };

      const processor1 = new EventProcessor(
        EventHubConsumerClient.defaultConsumerGroupName,
        consumerClient["_context"],
        handlers,
        checkpointStore,
        eventProcessorOptions
      );

      const processor2 = new EventProcessor(
        EventHubConsumerClient.defaultConsumerGroupName,
        consumerClient["_context"],
        handlers,
        checkpointStore,
        eventProcessorOptions
      );

      processor1.start();
      processor2.start();

      // loop until all partitions are claimed
      try {
        let lastLoopError: Record<string, any> = {};

        await loopUntil({
          name: "partitionOwnership",
          maxTimes: 30,
          timeBetweenRunsMs: 10000,

          errorMessageFn: () => JSON.stringify(lastLoopError, undefined, "  "),
          until: async () => {
            // Ensure the partition ownerships are balanced.
            const eventProcessorIds = Object.keys(claimedPartitionsMap);

            // There are 2 processors, so we should see 2 entries.
            if (eventProcessorIds.length !== 2) {
              lastLoopError = {
                reason: "Not all event processors have shown up",
                eventProcessorIds,
                partitionOwnershipHistory
              };
              return false;
            }

            const aProcessorPartitions = claimedPartitionsMap[eventProcessorIds[0]];
            const bProcessorPartitions = claimedPartitionsMap[eventProcessorIds[1]];

            // The delta between number of partitions each processor owns can't be more than 1.
            if (Math.abs(aProcessorPartitions.size - bProcessorPartitions.size) > 1) {
              lastLoopError = {
                reason: "Delta between partitions is greater than 1",
                a: Array.from(aProcessorPartitions),
                b: Array.from(bProcessorPartitions),
                partitionOwnershipHistory
              };
              return false;
            }

            // All partitions must be claimed.
            const allPartitionsClaimed =
              aProcessorPartitions.size + bProcessorPartitions.size === partitionIds.length;

            if (!allPartitionsClaimed) {
              lastLoopError = {
                reason: "All partitions not claimed",
                partitionIds,
                a: Array.from(aProcessorPartitions),
                b: Array.from(bProcessorPartitions),
                partitionOwnershipHistory
              };
            }

            return allPartitionsClaimed;
          }
        });
      } catch (err) {
        // close processors
        await Promise.all([processor1.stop(), processor2.stop()]);
        throw err;
      }

      loggerForTest(`All partitions have been claimed.`);
      allPartitionsClaimed = true;

      try {
        // loop for some time to see if thrashing occurs
        await loopUntil({
          name: "partitionThrash",
          maxTimes: 4,
          timeBetweenRunsMs: 1000,
          until: async () => thrashAfterSettling
        });
      } catch (err) {
        // swallow error, check trashAfterSettling for the condition in finally
      } finally {
        await Promise.all([processor1.stop(), processor2.stop()]);
        should.equal(
          thrashAfterSettling,
          false,
          "Detected PartitionOwnership thrashing after load-balancing has settled."
        );
      }
    });

    it("should ensure that all the processors maintain a steady-state when all partitions are being processed (GreedyLoadBalancingStrategy)", async function(): Promise<
      void
    > {
      const partitionIds = await producerClient.getPartitionIds();
      const checkpointStore = new InMemoryCheckpointStore();
      const claimedPartitionsMap = {} as { [eventProcessorId: string]: Set<string> };

      const partitionOwnershipHistory: string[] = [];

      let allPartitionsClaimed = false;
      let thrashAfterSettling = false;
      const handlers: SubscriptionEventHandlers = {
        async processInitialize(context) {
          const eventProcessorId: string = (context as any).eventProcessorId;
          const partitionId = context.partitionId;

          partitionOwnershipHistory.push(`${eventProcessorId}: init ${partitionId}`);

          loggerForTest(`[${eventProcessorId}] Claimed partition ${partitionId}`);
          if (allPartitionsClaimed) {
            thrashAfterSettling = true;
            return;
          }

          const claimedPartitions = claimedPartitionsMap[eventProcessorId] || new Set();
          claimedPartitions.add(partitionId);
          claimedPartitionsMap[eventProcessorId] = claimedPartitions;
        },
        async processEvents() {},
        async processError() {},
        async processClose(reason, context) {
          const eventProcessorId: string = (context as any).eventProcessorId;
          const partitionId = context.partitionId;
          const claimedPartitions = claimedPartitionsMap[eventProcessorId];
          claimedPartitions.delete(partitionId);
          loggerForTest(
            `[${(context as any).eventProcessorId}] processClose(${reason}) on partition ${
              context.partitionId
            }`
          );
          if (reason === CloseReason.OwnershipLost && allPartitionsClaimed) {
            loggerForTest(
              `[${(context as any).eventProcessorId}] Lost partition ${context.partitionId}`
            );
            thrashAfterSettling = true;
          }
        }
      };

      const eventProcessorOptions: FullEventProcessorOptions = {
        maxBatchSize: 1,
        maxWaitTimeInSeconds: 5,
        loopIntervalInMs: 1000,
        inactiveTimeLimitInMs: 3000,
        ownerLevel: 0,
        // For this test we don't want to actually checkpoint, just test ownership.
        startPosition: latestEventPosition,
        loadBalancingStrategy: new GreedyLoadBalancingStrategy(60000)
      };

      const processor1 = new EventProcessor(
        EventHubConsumerClient.defaultConsumerGroupName,
        consumerClient["_context"],
        handlers,
        checkpointStore,
        eventProcessorOptions
      );

      const processor2 = new EventProcessor(
        EventHubConsumerClient.defaultConsumerGroupName,
        consumerClient["_context"],
        handlers,
        checkpointStore,
        eventProcessorOptions
      );

      processor1.start();
      processor2.start();

      // loop until all partitions are claimed
      try {
        let lastLoopError: Record<string, any> = {};

        await loopUntil({
          name: "partitionOwnership",
          maxTimes: 30,
          timeBetweenRunsMs: 10000,

          errorMessageFn: () => JSON.stringify(lastLoopError, undefined, "  "),
          until: async () => {
            // Ensure the partition ownerships are balanced.
            const eventProcessorIds = Object.keys(claimedPartitionsMap);

            // There are 2 processors, so we should see 2 entries.
            if (eventProcessorIds.length !== 2) {
              lastLoopError = {
                reason: "Not all event processors have shown up",
                eventProcessorIds,
                partitionOwnershipHistory
              };
              return false;
            }

            const aProcessorPartitions = claimedPartitionsMap[eventProcessorIds[0]];
            const bProcessorPartitions = claimedPartitionsMap[eventProcessorIds[1]];

            // The delta between number of partitions each processor owns can't be more than 1.
            if (Math.abs(aProcessorPartitions.size - bProcessorPartitions.size) > 1) {
              lastLoopError = {
                reason: "Delta between partitions is greater than 1",
                a: Array.from(aProcessorPartitions),
                b: Array.from(bProcessorPartitions),
                partitionOwnershipHistory
              };
              return false;
            }

            // All partitions must be claimed.
            const allPartitionsClaimed =
              aProcessorPartitions.size + bProcessorPartitions.size === partitionIds.length;

            if (!allPartitionsClaimed) {
              lastLoopError = {
                reason: "All partitions not claimed",
                partitionIds,
                a: Array.from(aProcessorPartitions),
                b: Array.from(bProcessorPartitions),
                partitionOwnershipHistory
              };
            }

            return allPartitionsClaimed;
          }
        });
      } catch (err) {
        // close processors
        await Promise.all([processor1.stop(), processor2.stop()]);
        throw err;
      }

      loggerForTest(`All partitions have been claimed.`);
      allPartitionsClaimed = true;

      try {
        // loop for some time to see if thrashing occurs
        await loopUntil({
          name: "partitionThrash",
          maxTimes: 4,
          timeBetweenRunsMs: 1000,
          until: async () => thrashAfterSettling
        });
      } catch (err) {
        // swallow error, check trashAfterSettling for the condition in finally
      } finally {
        await Promise.all([processor1.stop(), processor2.stop()]);
        should.equal(
          thrashAfterSettling,
          false,
          "Detected PartitionOwnership thrashing after load-balancing has settled."
        );
      }
    });
  });
}).timeout(90000);

function ownershipListToMap(partitionOwnership: PartitionOwnership[]): Map<string, string[]> {
  const partitionOwnershipMap: Map<string, string[]> = new Map();

  for (const ownership of partitionOwnership) {
    if (!partitionOwnershipMap.has(ownership.ownerId)) {
      partitionOwnershipMap.set(ownership.ownerId, [ownership.partitionId]);
    } else {
      const arr = partitionOwnershipMap.get(ownership.ownerId);
      arr!.push(ownership.partitionId);
      partitionOwnershipMap.set(ownership.ownerId, arr!);
    }
  }

  return partitionOwnershipMap;
}

function triggerAbortedSignalAfterNumCalls(maxCalls: number): AbortSignal {
  let count = 0;

  const abortSignal: AbortSignal = {
    get aborted(): boolean {
      ++count;

      if (count >= maxCalls) {
        return true;
      }

      return false;
    },
    addEventListener: () => {},
    removeEventListener: () => {},
    onabort: () => {},
    dispatchEvent: () => true
  };

  return abortSignal;
}
