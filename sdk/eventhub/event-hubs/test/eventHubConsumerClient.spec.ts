import { EventHubClient, InMemoryPartitionManager } from "../src";
import { EventHubConsumerClient } from "../src/eventHubConsumerClient";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import chai from "chai";
import { ReceivedMessagesTester } from "./utils/receivedMessagesTester";

const should = chai.should();
const env = getEnvVars();

describe("EventHubConsumerClient", () => {
    describe("functional tests", () => {
      const service = {
        connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        path: env[EnvVarKeys.EVENTHUB_NAME]
      };

      let client: EventHubConsumerClient;
      let eventHubClient: EventHubClient;
      let partitionIds: string[];

      before(async () => {
        should.exist(
          env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
          "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
        );
        should.exist(
          env[EnvVarKeys.EVENTHUB_NAME],
          "define EVENTHUB_NAME in your environment before running integration tests."
        );

        client = new EventHubConsumerClient(
          EventHubClient.defaultConsumerGroupName,
          service.connectionString!,
          service.path
        );

        eventHubClient = new EventHubClient(service.connectionString!, service.path!, {});

        partitionIds = await client.getPartitionIds();

        // ensure we have at least 2 partitions
        partitionIds.length.should.gte(2);
      });

      after(() => {
        client.close();
        eventHubClient.close();
      });

      it("Receive from a single partition #RunnableInBrowser", async function (): Promise<
        void
      > {
        const tester = new ReceivedMessagesTester(["0"], false);

        const subscriber = await client.subscribe(
          (events, context) => tester.onReceivedEvents(events, context),
          ["0"],
          tester
        );

        await tester.runTestAndPoll(eventHubClient);
        await subscriber.stop();
      });

      it("Receive from all partitions with no coordination #RunnableInBrowser", async function (): Promise<
        void
      > {
        const tester = new ReceivedMessagesTester(partitionIds, false);

        const subscriber = await client.subscribe(
          (events, context) => tester.onReceivedEvents(events, context),
          tester
        );

        await tester.runTestAndPoll(eventHubClient);
        await subscriber.stop();
      });

      it("Receive from all partitions, coordinating with the same partition manager #RunnableInBrowser", async function (): Promise<
        void
        > {
        // fast forward our partition manager so it starts reading from the latest offset
        // instead of the beginning of time.
        const inMemoryPartitionManager = new InMemoryPartitionManager();

        const tester = new ReceivedMessagesTester(partitionIds, true);

        const subscriber1 = await client.subscribe(
          (events, context) => tester.onReceivedEvents(events, context),
          inMemoryPartitionManager,
          tester          
        );

        const subscriber2 = await client.subscribe(
          (events, context) => tester.onReceivedEvents(events, context),
          inMemoryPartitionManager,
          tester
        );

        await tester.runTestAndPoll(eventHubClient);
        await subscriber1.stop();
        await subscriber2.stop();
      });
    });
});
