// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  CheckpointStore,
  EventHubProducerClient,
  Subscription,
  SubscriptionEventHandlers,
  latestEventPosition,
  logger
} from "../src";
import { EventHubClient } from "../src/impl/eventHubClient";
import { EventHubConsumerClient, isCheckpointStore } from "../src/eventHubConsumerClient";
import { EnvVarKeys, getEnvVars, loopUntil } from "./utils/testUtils";
import chai from "chai";
import { ReceivedMessagesTester } from "./utils/receivedMessagesTester";
import { LogTester } from "./utils/logHelpers";
import { InMemoryCheckpointStore } from "../src/inMemoryCheckpointStore";
import { EventProcessor, FullEventProcessorOptions } from "../src/eventProcessor";
import { SinonStubbedInstance, createStubInstance } from "sinon";

const should = chai.should();
const env = getEnvVars();

describe("EventHubConsumerClient", () => {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };

  before(() => {
    should.exist(
      env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
    );
    should.exist(
      env[EnvVarKeys.EVENTHUB_NAME],
      "define EVENTHUB_NAME in your environment before running integration tests."
    );
  });

  describe("unit tests", () => {
    it("isCheckpointStore", () => {
      isCheckpointStore({
        processEvents: async () => {},
        processClose: async () => {}
      }).should.not.ok;

      isCheckpointStore("hello").should.not.ok;

      isCheckpointStore(new InMemoryCheckpointStore()).should.ok;
    });

    describe("subscribe() overloads route properly", () => {
      let client: EventHubConsumerClient;
      let clientWithCheckpointStore: EventHubConsumerClient;
      let subscriptionHandlers: SubscriptionEventHandlers;
      let fakeEventProcessor: SinonStubbedInstance<EventProcessor>;

      let validateOptions: (options: FullEventProcessorOptions) => void;

      beforeEach(() => {
        fakeEventProcessor = createStubInstance(EventProcessor);

        client = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path
        );

        clientWithCheckpointStore = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path,
          // it doesn't actually matter _what_ checkpoint store gets passed in
          new InMemoryCheckpointStore()
        );

        subscriptionHandlers = {
          processEvents: async () => {},
          processError: async () => {}
        };

        const fakeEventProcessorConstructor = (
          consumerGroup: string,
          eventHubClient: EventHubClient,
          subscriptionEventHandlers: SubscriptionEventHandlers,
          checkpointStore: CheckpointStore,
          options: FullEventProcessorOptions
        ) => {
          consumerGroup.should.equal(EventHubConsumerClient.defaultConsumerGroupName);
          subscriptionEventHandlers.should.equal(subscriptionHandlers);
          (typeof eventHubClient.createConsumer).should.equal("function");
          isCheckpointStore(checkpointStore).should.be.ok;

          validateOptions(options);

          return fakeEventProcessor;
        };

        (client as any)["_createEventProcessor"] = fakeEventProcessorConstructor;
        (clientWithCheckpointStore as any)["_createEventProcessor"] = fakeEventProcessorConstructor;
      });

      it("conflicting subscribes", () => {
        validateOptions = () => {};

        client.subscribe(subscriptionHandlers);
        // invalid - we're already subscribed to a conflicting partition
        should.throw(
          () => client.subscribe("0", subscriptionHandlers),
          /Partition already has a subscriber/
        );

        clientWithCheckpointStore.subscribe("0", subscriptionHandlers);
        // invalid - we're already subscribed to a conflicting partition
        should.throw(
          () => clientWithCheckpointStore.subscribe(subscriptionHandlers),
          /Partition already has a subscriber/
        );
      });

      it("subscribe to single partition, no checkpoint store", () => {
        validateOptions = (options) => {
          // when the user doesn't pass a checkpoint store we give them a really simple set of
          // defaults: InMemoryCheckpointStore and the GreedyLoadBalancer.

          // So we don't set an ownerlevel here - it's all in-memory and you can have as many
          // as you want (the user still has the option to pass their own via SubscribeOptions).
          should.not.exist(options.ownerLevel);

          // and if you don't specify a CheckpointStore we also assume you just want to read all partitions
          // immediately so we bypass the FairPartitionLoadBalancer entirely
          options.processingTarget!.constructor.name.should.equal("GreedyPartitionLoadBalancer");
        };

        const subscription = client.subscribe(subscriptionHandlers);

        subscription.close();
        fakeEventProcessor.stop.callCount.should.equal(1);
      });

      it("subscribe to single partition, WITH checkpoint store", () => {
        validateOptions = (options) => {
          // when the user gives us a checkpoint store we treat their consumer client as
          // a "production" ready client - they use their checkpoint store and
          // the FairPartitionLoadBalancer

          // To coordinate properly we set an owner level - this lets us
          // cooperate properly with other consumers within this group.
          options.ownerLevel!.should.equal(0);

          // We're falling back to the actual production load balancer
          // (which means we just don't override the partition load balancer field)
          should.not.exist(options.processingTarget);
        };

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, no checkpoint store", () => {
        validateOptions = (options) => {
          should.not.exist(options.ownerLevel);
          options.processingTarget!.constructor.name.should.equal("GreedyPartitionLoadBalancer");
        };

        client.subscribe(subscriptionHandlers);
      });

      it("subscribe to all partitions, WITH checkpoint store", () => {
        validateOptions = (options) => {
          options.ownerLevel!.should.equal(0);
          should.not.exist(options.processingTarget);
        };

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });

      it("multiple subscribe calls from the same eventhubconsumerclient use the same owner ID", async () => {
        let ownerId: string | undefined = undefined;

        validateOptions = (options) => {
          should.exist(options.ownerId);

          if (ownerId) {
            options.ownerId!.should.equal(ownerId);
            ownerId = options.ownerId;
          } else {
            ownerId = options.ownerId;
          }
        };

        clientWithCheckpointStore.subscribe(subscriptionHandlers);
      });
    });
  });

  describe("functional tests", () => {
    let clients: EventHubConsumerClient[];
    let producerClient: EventHubProducerClient;
    let partitionIds: string[];
    const subscriptions: Subscription[] = [];

    beforeEach(async () => {
      producerClient = new EventHubProducerClient(service.connectionString!, service.path!, {});

      partitionIds = await producerClient.getPartitionIds();

      // ensure we have at least 2 partitions
      partitionIds.length.should.gte(2);

      clients = [];
    });

    afterEach(async () => {
      for (const subscription of subscriptions) {
        await subscription.close();
      }

      for (const client of clients) {
        await client.close();
      }

      clients = [];
      await producerClient.close();
    });

    describe("Reinitialize partition processing after error", function(): void {
      it("when subscribed to single partition", async function(): Promise<void> {
        const partitionId = "0";
        const consumerClient1 = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString,
          service.path
        );
        const consumerClient2 = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString,
          service.path
        );

        clients.push(consumerClient1, consumerClient2);

        // keep track of the handlers called on subscription 1
        const handlerCalls = {
          initialize: 0,
          close: 0
        };
        const subscriptionHandlers1: SubscriptionEventHandlers = {
          async processError() {},
          async processEvents() {
            if (!handlerCalls.close) {
              // start the 2nd subscription that will kick the 1st subscription off
              subscription2 = consumerClient2.subscribe(partitionId, subscriptionHandlers2, {
                ownerLevel: 1,
                maxBatchSize: 1,
                maxWaitTimeInSeconds: 1
              });
            } else {
              // stop this subscription, we know close was called so we've restarted
              await subscription1.close();
            }
          },
          async processClose() {
            handlerCalls.close++;
          },
          async processInitialize() {
            handlerCalls.initialize++;
          }
        };
        const subscriptionHandlers2: SubscriptionEventHandlers = {
          async processError() {},
          async processEvents() {
            // stop this subscription since it already should have forced the 1st subscription to have an error.
            await subscription2!.close();
          }
        };
        let subscription2: Subscription | undefined;
        const subscription1 = consumerClient1.subscribe(partitionId, subscriptionHandlers1, {
          maxBatchSize: 1,
          maxWaitTimeInSeconds: 1
        });

        await loopUntil({
          maxTimes: 10,
          name: "Wait for subscription1 to recover",
          timeBetweenRunsMs: 5000,
          async until() {
            return !subscription1.isRunning && !subscription2!.isRunning;
          }
        });

        // Initialize may be called multiple times while the 2nd subscription is running.
        // We want to make sure it has been called at least twice to verify that subscription1
        // attempts to recover.
        handlerCalls.initialize.should.be.greaterThan(1);
        handlerCalls.close.should.be.greaterThan(1);
      });

      it("when subscribed to multiple partitions", async function(): Promise<void> {
        const consumerClient1 = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString,
          service.path
        );
        const consumerClient2 = new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString,
          service.path
        );

        clients.push(consumerClient1, consumerClient2);

        const partitionIds = await consumerClient1.getPartitionIds();

        const partitionHandlerCalls: {
          [partitionId: string]: {
            initialize: number;
            processEvents: boolean;
            close: number;
          };
        } = {};

        // keep track of the handlers called on subscription 1
        for (const id of partitionIds) {
          partitionHandlerCalls[id] = { initialize: 0, processEvents: false, close: 0 };
        }

        const subscriptionHandlers1: SubscriptionEventHandlers = {
          async processError() {},
          async processEvents(_, context) {
            partitionHandlerCalls[context.partitionId].processEvents = true;
          },
          async processClose(_, context) {
            partitionHandlerCalls[context.partitionId].close++;
            // reset processEvents count
            partitionHandlerCalls[context.partitionId].processEvents = false;
          },
          async processInitialize(context) {
            partitionHandlerCalls[context.partitionId].initialize++;
          }
        };

        const subscription1 = consumerClient1.subscribe(subscriptionHandlers1, {
          maxBatchSize: 1,
          maxWaitTimeInSeconds: 1
        });

        await loopUntil({
          maxTimes: 10,
          name: "Wait for subscription1 to read from all partitions",
          timeBetweenRunsMs: 1000,
          async until() {
            // wait until we've seen processEvents invoked for each partition.
            return (
              partitionIds.filter((id) => {
                return partitionHandlerCalls[id].processEvents;
              }).length === partitionIds.length
            );
          }
        });

        const partitionsReadFromSub2 = new Set<string>();
        const subscriptionHandlers2: SubscriptionEventHandlers = {
          async processError() {},
          async processEvents(_, context) {
            partitionsReadFromSub2.add(context.partitionId);
          }
        };

        // start 2nd subscription with an ownerLevel so it triggers the close handlers on the 1st subscription.
        const subscription2 = consumerClient2.subscribe(subscriptionHandlers2, {
          maxBatchSize: 1,
          maxWaitTimeInSeconds: 1,
          ownerLevel: 1
        });

        await loopUntil({
          maxTimes: 10,
          name:
            "Wait for subscription2 to read from all partitions and subscription1 to invoke close handlers",
          timeBetweenRunsMs: 1000,
          async until() {
            const sub1CloseHandlersCalled = Boolean(
              partitionIds.filter((id) => {
                return partitionHandlerCalls[id].close > 0;
              }).length === partitionIds.length
            );
            return partitionsReadFromSub2.size === partitionIds.length && sub1CloseHandlersCalled;
          }
        });

        // close subscription2 so subscription1 can recover.
        await subscription2.close();

        await loopUntil({
          maxTimes: 10,
          name: "Wait for subscription1 to recover",
          timeBetweenRunsMs: 1000,
          async until() {
            // wait until we've seen an additional processEvent for each partition.
            return (
              partitionIds.filter((id) => {
                return partitionHandlerCalls[id].processEvents;
              }).length === partitionIds.length
            );
          }
        });

        await subscription1.close();

        for (const id of partitionIds) {
          partitionHandlerCalls[id].initialize.should.be.greaterThan(
            1,
            `Initialize on partition ${id} was not called more than 1 time.`
          );
          partitionHandlerCalls[id].close.should.be.greaterThan(
            1,
            `Close on partition ${id} was not called more than 1 time.`
          );
        }
      });
    });

    it("Receive from specific partitions, no coordination", async function(): Promise<void> {
      const logTester = new LogTester(
        [
          "EventHubConsumerClient subscribing to specific partition (0), no checkpoint store.",
          "Single partition target: 0",
          "No partitions owned, skipping abandoning."
        ],
        [
          logger.verbose as debug.Debugger,
          logger.verbose as debug.Debugger,
          logger.verbose as debug.Debugger
        ]
      );

      const tester = new ReceivedMessagesTester(["0"], false);

      clients.push(
        new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path
        )
      );

      const subscription = clients[0].subscribe("0", tester, {
        startPosition: latestEventPosition
      });

      subscriptions.push(subscription);

      await tester.runTestAndPoll(producerClient);
      await subscription.close(); // or else we won't see the partition abandoning messages

      logTester.assert();
    });

    it("Receive from all partitions, no coordination", async function(): Promise<void> {
      const logTester = new LogTester(
        [
          "EventHubConsumerClient subscribing to all partitions, no checkpoint store.",
          "GreedyPartitionLoadBalancer created. Watching all."
        ],
        [
          logger.verbose as debug.Debugger,
          logger.verbose as debug.Debugger,
          logger.verbose as debug.Debugger
        ]
      );

      const tester = new ReceivedMessagesTester(partitionIds, false);

      clients.push(
        new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path
        )
      );

      const subscription = clients[0].subscribe(tester, {
        startPosition: latestEventPosition
      });

      await tester.runTestAndPoll(producerClient);
      subscriptions.push(subscription);

      logTester.assert();
    });

    it("Receive from all partitions, no coordination but through multiple subscribe() calls", async function(): Promise<
      void
    > {
      const logTester = new LogTester(
        [
          ...partitionIds.map(
            (partitionId) =>
              `EventHubConsumerClient subscribing to specific partition (${partitionId}), no checkpoint store.`,
            `Abandoning owned partitions`
          ),
          ...partitionIds.map((partitionId) => `Single partition target: ${partitionId}`)
        ],
        [
          logger.verbose as debug.Debugger,
          logger.verbose as debug.Debugger,
          logger.verbose as debug.Debugger
        ]
      );

      const tester = new ReceivedMessagesTester(partitionIds, false);

      clients.push(
        new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path
        )
      );

      for (const partitionId of await partitionIds) {
        const subscription = clients[0].subscribe(partitionId, tester, {
          startPosition: latestEventPosition
        });
        subscriptions.push(subscription);
      }

      await tester.runTestAndPoll(producerClient);

      logTester.assert();
    });

    it("Receive from all partitions, coordinating with the same partition manager and using the FairPartitionLoadBalancer", async function(): Promise<
      void
    > {
      // fast forward our partition manager so it starts reading from the latest offset
      // instead of the beginning of time.
      const logTester = new LogTester(
        [
          "EventHubConsumerClient subscribing to all partitions, using a checkpoint store.",
          /Starting event processor with ID /,
          "Abandoning owned partitions"
        ],
        [
          logger.verbose as debug.Debugger,
          logger.verbose as debug.Debugger,
          logger.verbose as debug.Debugger
        ]
      );

      clients.push(
        new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path,
          // specifying your own checkpoint store activates the "production ready" code path that
          // also uses the FairPartitionLoadBalancer
          new InMemoryCheckpointStore()
        )
      );

      const tester = new ReceivedMessagesTester(partitionIds, true);

      const subscriber1 = clients[0].subscribe(tester, {
        startPosition: latestEventPosition
      });
      subscriptions.push(subscriber1);

      clients.push(
        new EventHubConsumerClient(
          EventHubConsumerClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path,
          // specifying your own checkpoint store activates the "production ready" code path that
          // also uses the FairPartitionLoadBalancer
          new InMemoryCheckpointStore()
        )
      );

      const subscriber2 = clients[1].subscribe(tester, {
        startPosition: latestEventPosition
      });
      subscriptions.push(subscriber2);

      await tester.runTestAndPoll(producerClient);

      // or else we won't see the abandoning message
      for (const subscription of subscriptions) {
        await subscription.close();
      }
      logTester.assert();
    });

    it("Stops receiving events if close is immediately called, single partition.", async function(): Promise<
      void
    > {
      const partitionId = "0";
      const client = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        service.connectionString,
        service.path
      );

      clients.push(client);

      let initializeCalled = 0;
      let closeCalled = 0;

      const subscription = client.subscribe(partitionId, {
        async processError() {},
        async processEvents() {},
        async processClose() {
          closeCalled++;
        },
        async processInitialize() {
          initializeCalled++;
        }
      });

      await subscription.close();

      await loopUntil({
        maxTimes: 10,
        name: "Wait for the subscription to stop running.",
        timeBetweenRunsMs: 100,
        async until() {
          return !subscription.isRunning;
        }
      });

      // If `processInitialize` is called, then `processClose` should be called as well.
      // Otherwise, we shouldn't see either called.
      initializeCalled.should.equal(
        closeCalled,
        "processClose was not called the same number of times as processInitialize."
      );
    });

    it("Stops receiving events if close is immediately called, multiple partitions.", async function(): Promise<
      void
    > {
      const client = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        service.connectionString,
        service.path
      );

      clients.push(client);

      let initializeCalled = 0;
      let closeCalled = 0;

      const subscription = client.subscribe({
        async processError() {},
        async processEvents() {},
        async processClose() {
          closeCalled++;
        },
        async processInitialize() {
          initializeCalled++;
        }
      });

      await subscription.close();

      await loopUntil({
        maxTimes: 10,
        name: "Wait for the subscription to stop running.",
        timeBetweenRunsMs: 100,
        async until() {
          return !subscription.isRunning;
        }
      });

      // If `processInitialize` is called, then `processClose` should be called as well.
      // Otherwise, we shouldn't see either called.
      initializeCalled.should.equal(
        closeCalled,
        "processClose was not called the same number of times as processInitialize."
      );
    });
  });
});
