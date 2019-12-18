// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  EventHubProducerClient,
  Subscription,
  SubscriptionEventHandlers,
  CheckpointStore
} from "../src";
import { EventHubClient } from "../src/impl/eventHubClient";
import { EventHubConsumerClient, isCheckpointStore } from "../src/eventHubConsumerClient";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import chai from "chai";
import { ReceivedMessagesTester } from "./utils/receivedMessagesTester";
import * as log from "../src/log";
import { LogTester } from "./utils/logHelpers";
import { InMemoryCheckpointStore } from "../src/inMemoryCheckpointStore";
import { FullEventProcessorOptions, EventProcessor } from "../src/eventProcessor";
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
          EventHubClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path
        );

        clientWithCheckpointStore = new EventHubConsumerClient(
          EventHubClient.defaultConsumerGroupName,
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
          consumerGroup.should.equal(EventHubClient.defaultConsumerGroupName);
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
    let subscriptions: Subscription[] = [];

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

    it("Receive from specific partitions, no coordination #RunnableInBrowser", async function(): Promise<
      void
    > {
      const logTester = new LogTester(
        [
          "Subscribing to specific partition (0), no checkpoint store.",
          "Single partition target: 0",
          "No partitions owned, skipping abandoning."
        ],
        [log.consumerClient, log.partitionLoadBalancer, log.eventProcessor]
      );

      const tester = new ReceivedMessagesTester(["0"], false);

      clients.push(
        new EventHubConsumerClient(
          EventHubClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path
        )
      );

      const subscription = clients[0].subscribe("0", tester);

      subscriptions.push(subscription);

      await tester.runTestAndPoll(producerClient);
      await subscription.close();   // or else we won't see the partition abandoning messages

      logTester.assert();
    });

    it("Receive from all partitions, no coordination #RunnableInBrowser", async function(): Promise<
      void
    > {
      const logTester = new LogTester(
        [
          "Subscribing to all partitions, no checkpoint store.",
          "GreedyPartitionLoadBalancer created. Watching all."
        ],
        [log.consumerClient, log.partitionLoadBalancer, log.eventProcessor]
      );

      const tester = new ReceivedMessagesTester(partitionIds, false);

      clients.push(
        new EventHubConsumerClient(
          EventHubClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path
        )
      );

      const subscription = clients[0].subscribe(tester);

      await tester.runTestAndPoll(producerClient);
      subscriptions.push(subscription);

      logTester.assert();
    });

    it("Receive from all partitions, no coordination but through multiple subscribe() calls #RunnableInBrowser", async function(): Promise<
      void
    > {
      const logTester = new LogTester(
        [
          ...partitionIds.map(
            (partitionId) =>
              `Subscribing to specific partition (${partitionId}), no checkpoint store.`,
            `Abandoning owned partitions`
          ),
          ...partitionIds.map((partitionId) => `Single partition target: ${partitionId}`)
        ],
        [log.consumerClient, log.partitionLoadBalancer, log.eventProcessor]
      );

      const tester = new ReceivedMessagesTester(partitionIds, false);

      clients.push(
        new EventHubConsumerClient(
          EventHubClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path
        )
      );

      for (const partitionId of await partitionIds) {
        const subscription = clients[0].subscribe(partitionId, tester);
        subscriptions.push(subscription);
      }

      await tester.runTestAndPoll(producerClient);

      logTester.assert();
    });

    it("Receive from all partitions, coordinating with the same partition manager and using the FairPartitionLoadBalancer #RunnableInBrowser", async function(): Promise<
      void
    > {
      // fast forward our partition manager so it starts reading from the latest offset
      // instead of the beginning of time.
      const logTester = new LogTester(
        [
          "Subscribing to all partitions, using a checkpoint store.",
          /Starting event processor with ID /,
          "Abandoning owned partitions"
        ],
        [log.consumerClient, log.eventProcessor, log.eventProcessor]
      );

      clients.push(
        new EventHubConsumerClient(
          EventHubClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path,
          // specifying your own checkpoint store activates the "production ready" code path that
          // also uses the FairPartitionLoadBalancer
          new InMemoryCheckpointStore()
        )
      );

      const tester = new ReceivedMessagesTester(partitionIds, true);

      const subscriber1 = clients[0].subscribe(tester);
      subscriptions.push(subscriber1);

      clients.push(
        new EventHubConsumerClient(
          EventHubClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path,
          // specifying your own checkpoint store activates the "production ready" code path that
          // also uses the FairPartitionLoadBalancer
          new InMemoryCheckpointStore()
        )
      );

      const subscriber2 = clients[1].subscribe(tester);
      subscriptions.push(subscriber2);

      await tester.runTestAndPoll(producerClient);

      // or else we won't see the abandoning message
      for (const subscription of subscriptions) {
        await subscription.close();
      }
      logTester.assert();
    });
  });
});
