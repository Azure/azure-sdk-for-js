// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventHubProducerClient, Subscription } from "../src";
import { EventHubClient } from "../src/impl/eventHubClient";
import { EventHubConsumerClient, isCheckpointStore } from "../src/eventHubConsumerClient";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import chai from "chai";
import { ReceivedMessagesTester } from "./utils/receivedMessagesTester";
import * as log from "../src/log";
import { LogTester } from "./utils/logHelpers";
import { InMemoryCheckpointStore } from '../src/inMemoryCheckpointStore';

const should = chai.should();
const env = getEnvVars();

describe("EventHubConsumerClient", () => {
  describe("unit tests", () => {
    it("isCheckpointStore", () => {
      isCheckpointStore({
        processEvents: async () => { },
        processClose: async () => {}
      }).should.not.ok;

      isCheckpointStore("hello").should.not.ok;

      isCheckpointStore(new InMemoryCheckpointStore()).should.ok;
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

      client = new EventHubConsumerClient(
        EventHubClient.defaultConsumerGroup,
        service.connectionString!,
        service.path);

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
      const inMemoryCheckpointStore = new InMemoryCheckpointStore();

      const logTester = new LogTester([
        "Subscribing to all partitions, coordinating using a partition manager.",
        "FairPartitionLoadBalancer created with owner ID"
      ],
        [log.consumerClient,
        log.partitionLoadBalancer]);

      const tester = new ReceivedMessagesTester(partitionIds, true);

      const subscriber1 = await client.subscribe(
        inMemoryCheckpointStore,
        tester
      );

      subscriptions.push(subscriber1);

      const subscriber2 = await client.subscribe(
         inMemoryCheckpointStore,
        tester
      );

      subscriptions.push(subscriber2);

      await tester.runTestAndPoll(producerClient);
      
      logTester.assert();
    });
  });
});
