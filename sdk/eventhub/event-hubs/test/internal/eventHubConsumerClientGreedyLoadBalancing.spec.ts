// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EventHubProducerClient, Subscription, latestEventPosition, logger } from "../../src";
import { EventHubConsumerClient } from "../../src";
import { EnvVarKeys, getEnvVars } from "../public/utils/testUtils";
import chai from "chai";
import { ReceivedMessagesTester } from "../public/utils/receivedMessagesTester";
import { LogTester } from "../public/utils/logHelpers";
import { InMemoryCheckpointStore } from "../../src/inMemoryCheckpointStore";

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
      it("Receive from all partitions, coordinating with the same partition manager and using the GreedyLoadBalancingStrategy", async function(): Promise<
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

        const checkpointStore = new InMemoryCheckpointStore();

        clients.push(
          new EventHubConsumerClient(
            EventHubConsumerClient.defaultConsumerGroupName,
            service.connectionString!,
            service.path,
            // specifying your own checkpoint store activates the "production ready" code path that
            {
              loadBalancingOptions: {
                strategy: "greedy"
              }
            }
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
            checkpointStore,
            {
              loadBalancingOptions: {
                strategy: "greedy"
              }
            }
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
    });
  });
});
