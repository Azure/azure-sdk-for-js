// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InMemoryPartitionManager, EventHubProducerClient } from "../src";
import { EventHubClient } from "../src/eventHubClient";
import { EventHubConsumerClient, isPartitionManager } from "../src/eventHubConsumerClient";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import chai from "chai";
import { ReceivedMessagesTester } from "./utils/receivedMessagesTester";
import * as log from "../src/log";

const should = chai.should();
const env = getEnvVars();

describe.only("EventHubConsumerClient", () => {
  describe("unit tests", () => {
    it("isPartitionManager", () => {
      isPartitionManager({
        onClose: async () => { }
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
    let logMessages: string[] = [];

    let consumerClientWasEnabled: boolean;
    let partitionLoadBalancerWasEnabled: boolean;

    beforeEach(async () => {
      should.exist(
        env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarKeys.EVENTHUB_NAME],
        "define EVENTHUB_NAME in your environment before running integration tests."
      );

      consumerClientWasEnabled = log.consumerClient.enabled;
      log.consumerClient.enabled = true;
      log.consumerClient.log = (message) => {
        logMessages.push(message);
      };

      partitionLoadBalancerWasEnabled = log.partitionLoadBalancer.enabled;
      log.partitionLoadBalancer.enabled = true;
      log.partitionLoadBalancer.log = (message) => {
        logMessages.push(message);
      };

      client = new EventHubConsumerClient(
        service.connectionString!,
        service.path
      );

      producerClient = new EventHubProducerClient(service.connectionString!, service.path!, {});

      partitionIds = await client.getPartitionIds();

      // ensure we have at least 2 partitions
      partitionIds.length.should.gte(2);
    });

    afterEach(() => {
      client.close();
      producerClient.close();

      if (!consumerClientWasEnabled) {
        log.consumerClient.enabled = false;
      }

      if (!partitionLoadBalancerWasEnabled) {
        log.partitionLoadBalancer.enabled = false;
      }      

      logMessages = [];
    });

    it("Receive from specific partitions, no coordination #RunnableInBrowser", async function(): Promise<void> {
      const tester = new ReceivedMessagesTester(["0"], false);

      const subscriber = await client.subscribe(
        EventHubClient.defaultConsumerGroupName,
        (events, context) => tester.onReceivedEvents(events, context),
        ["0"],
        tester
      );

      await tester.runTestAndPoll(producerClient);
      await subscriber.close();

      hasLogMessage("Creating client with connection string and event hub name");
      hasLogMessage("Subscribing to specific partitions (0), no coordination.");
      hasLogMessage("GreedyPartitionLoadBalancer created. Watching (0).");
    });

    it("Receive from all partitions, no coordination #RunnableInBrowser", async function(): Promise<
      void
    > {
      const tester = new ReceivedMessagesTester(partitionIds, false);

      const subscriber = await client.subscribe(
        EventHubClient.defaultConsumerGroupName,
        (events, context) => tester.onReceivedEvents(events, context),
        tester
      );

      await tester.runTestAndPoll(producerClient);
      await subscriber.close();

      hasLogMessage("Subscribing to all partitions, don't coordinate.");
      hasLogMessage("GreedyPartitionLoadBalancer created. Watching all.");
    });

    it("Receive from all partitions, coordinating with the same partition manager #RunnableInBrowser", async function(): Promise<
      void
    > {
      // fast forward our partition manager so it starts reading from the latest offset
      // instead of the beginning of time.
      const inMemoryPartitionManager = new InMemoryPartitionManager();

      const tester = new ReceivedMessagesTester(partitionIds, true);

      const subscriber1 = await client.subscribe(
        EventHubClient.defaultConsumerGroupName,
        (events, context) => tester.onReceivedEvents(events, context),
        inMemoryPartitionManager,
        tester
      );

      const subscriber2 = await client.subscribe(
        EventHubClient.defaultConsumerGroupName,
        (events, context) => tester.onReceivedEvents(events, context),
        inMemoryPartitionManager,
        tester
      );

      await tester.runTestAndPoll(producerClient);
      await subscriber1.close();
      await subscriber2.close();

      hasLogMessage("Subscribing to all partitions, coordinating using a partition manager.");
      hasLogMessage("FairPartitionLoadBalancer created with owner ID");
    });

    function hasLogMessage(message: string) {
      const value = logMessages.find(val => val.indexOf(message) >= 0); 
      should.exist(value, `Looking for ${message}`);
    }
  });
});
