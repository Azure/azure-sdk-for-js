// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InMemoryPartitionManager, EventHubProducerClient, SubscriptionOptions, Subscription } from "../src";
import { EventHubClient } from "../src/eventHubClient";
import { EventHubConsumerClient, isPartitionManager } from "../src/eventHubConsumerClient";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import chai from "chai";
import { ReceivedMessagesTester } from "./utils/receivedMessagesTester";
import * as log from "../src/log";
import { LogTester } from "./utils/logTester";

const should = chai.should();
const env = getEnvVars();

// setting these to be really small since our tests deal with a
// very low volume of messages.
const defaultSubscriptionOptions: SubscriptionOptions = {
  maxBatchSize: 1,
  maxWaitTimeInSeconds: 10
};

describe("EventHubConsumerClient", () => {
  describe("unit tests", () => {
    it("isPartitionManager", () => {
      isPartitionManager({
        ...defaultSubscriptionOptions,
        onClose: async () => {}
      }).should.not.ok;

      isPartitionManager(undefined).should.not.ok;
      isPartitionManager(["hello"]).should.not.ok;

      isPartitionManager(new InMemoryPartitionManager()).should.ok;
    });
  });

  describe("functional tests", () => {
    const service = {
      connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      path: env[EnvVarKeys.EVENTHUB_NAME]
    };

    let client: EventHubConsumerClient;
    let producerClient: EventHubProducerClient;
    let partitionIds: string[];
    let subscriptions: Subscription[] = [];

    beforeEach(async () => {
      should.exist(
        env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarKeys.EVENTHUB_NAME],
        "define EVENTHUB_NAME in your environment before running integration tests."
      );

      client = new EventHubConsumerClient(service.connectionString!, service.path);

      producerClient = new EventHubProducerClient(service.connectionString!, service.path!, {});

      partitionIds = await client.getPartitionIds();

      // ensure we have at least 2 partitions
      partitionIds.length.should.gte(2);
    });

    afterEach(async () => {
      for (const subscription of subscriptions) {
        await subscription.close();
      }

      await client.close();
      await producerClient.close();
    });

    it("Receive from specific partitions, no coordination #RunnableInBrowser", async function(): Promise<
      void
    > {
      const logTester = new LogTester(
        [
          "Subscribing to specific partition (0), no coordination.",
          "GreedyPartitionLoadBalancer created. Watching (0)."
        ],
        [log.consumerClient, log.partitionLoadBalancer]
      );

      const tester = new ReceivedMessagesTester(["0"], false);

      const subscription = await client.subscribe(
        EventHubClient.defaultConsumerGroupName,
        (events, context) => tester.onReceivedEvents(events, context),
        "0",
        tester
      );

      subscriptions.push(subscription);

      await tester.runTestAndPoll(producerClient);
      logTester.assert();
    });

    it("Receive from all partitions, no coordination #RunnableInBrowser", async function(): Promise<
      void
    > {
      const logTester = new LogTester(
        [
          "Subscribing to all partitions, don't coordinate.",
          "GreedyPartitionLoadBalancer created. Watching all."
        ],
        [log.consumerClient, log.partitionLoadBalancer]
      );

      const tester = new ReceivedMessagesTester(partitionIds, false);

      const subscription = await client.subscribe(
        EventHubClient.defaultConsumerGroupName,
        (events, context) => tester.onReceivedEvents(events, context),
        tester
      );

      await tester.runTestAndPoll(producerClient);
      subscriptions.push(subscription);

      logTester.assert();
    });

    it("Receive from all partitions, coordinating with the same partition manager #RunnableInBrowser", async function(): Promise<
      void
    > {
      // fast forward our partition manager so it starts reading from the latest offset
      // instead of the beginning of time.
      const inMemoryPartitionManager = new InMemoryPartitionManager();

      const logTester = new LogTester([
        "Subscribing to all partitions, coordinating using a partition manager.",
        "FairPartitionLoadBalancer created with owner ID"
      ],
        [log.consumerClient,
        log.partitionLoadBalancer]);

      const tester = new ReceivedMessagesTester(partitionIds, true, 1, 60);

      const subscriber1 = await client.subscribe(
        EventHubClient.defaultConsumerGroupName,
        (events, context) => tester.onReceivedEvents(events, context),
        inMemoryPartitionManager,
        tester
      );

      subscriptions.push(subscriber1);

      const subscriber2 = await client.subscribe(
         EventHubClient.defaultConsumerGroupName,
         (events, context) => tester.onReceivedEvents(events, context),
         inMemoryPartitionManager,
         tester
      );

      subscriptions.push(subscriber2);

      await tester.runTestAndPoll(producerClient);
      
      logTester.assert();
    });
  });
});
