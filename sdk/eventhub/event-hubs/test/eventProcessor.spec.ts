// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import debugModule from "debug";
const debug = debugModule("azure:event-hubs:partitionPump");
import {
  EventPosition,
  EventHubClient,
  EventData,
  EventProcessor,
  PartitionContext,
  delay,
  InMemoryPartitionManager,
  PartitionOwnership,
  Checkpoint
} from "../src";
import { EnvVarKeys, getEnvVars } from "./utils/testUtils";
import { generate_uuid } from "rhea-promise";
const env = getEnvVars();

describe("Event Processor", function(): void {
  const service = {
    connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
    path: env[EnvVarKeys.EVENTHUB_NAME]
  };
  const client: EventHubClient = new EventHubClient(service.connectionString, service.path);
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

  after("close the connection", async function(): Promise<void> {
    await client.close();
  });

  describe("Partition processor", function(): void {
    it("should call methods on a PartitionProcessor ", async function(): Promise<void> {
      const receivedEvents: EventData[] = [];
      let isinitializeCalled = false;
      let isCloseCalled = false;
      class SimpleEventProcessor {
        async initialize() {
          isinitializeCalled = true;
          debug(`Started processing`);
        }
        async processEvents(events: EventData[]) {
          for (const event of events) {
            receivedEvents.push(event);
            debug("Received event", event.body);
          }
        }

        async processError(error: Error) {
          debug(`Encountered an error: ${error.message}`);
        }

        async close() {
          isCloseCalled = true;
          debug(`Stopped processing`);
        }
      }
      const eventProcessorFactory = (context: PartitionContext) => {
        return new SimpleEventProcessor();
      };
      const partitionInfo = await client.getPartitionProperties("0");
      const processor = new EventProcessor(
        EventHubClient.defaultConsumerGroupName,
        client,
        eventProcessorFactory,
        "partitionManager" as any,
        {
          initialEventPosition: EventPosition.fromSequenceNumber(
            partitionInfo.lastEnqueuedSequenceNumber
          ),
          maxBatchSize: 1,
          maxWaitTimeInSeconds: 5
        }
      );
      const producer = client.createProducer({ partitionId: "0" });
      await producer.send({ body: "Hello world!!!" });

      await processor.start();
      // after 2 seconds, stop processing
      await delay(2000);
      await processor.stop();
      await producer.close();
      isinitializeCalled.should.equal(true);
      receivedEvents.length.should.equal(1);
      receivedEvents[0].body.should.equal("Hello world!!!");
      isCloseCalled.should.equal(true);
    });
  });

  describe("InMemory Partition Manager", function(): void {
    it("should claim ownership, get a list of ownership and update checkpoint", async function(): Promise<void> {
      const inMemoryPartitionManager = new InMemoryPartitionManager();
      const partitionOwnership1: PartitionOwnership = {
        eventHubName: "myEventHub",
        consumerGroupName: EventHubClient.defaultConsumerGroupName,
        instanceId: generate_uuid(),
        partitionId: "0",
        ownerLevel: 10
      };
      const partitionOwnership2: PartitionOwnership = {
        eventHubName: "myEventHub",
        consumerGroupName: EventHubClient.defaultConsumerGroupName,
        instanceId: generate_uuid(),
        partitionId: "1",
        ownerLevel: 10
      };
      const partitionOwnership = await inMemoryPartitionManager.claimOwnerships([
        partitionOwnership1,
        partitionOwnership2
      ]);
      partitionOwnership.length.should.equals(2);
   
      const Ownershipslist = await inMemoryPartitionManager.listOwnerships(
        "myEventHub",
        EventHubClient.defaultConsumerGroupName
      );
      Ownershipslist.length.should.equals(2);
    
      const checkpoint: Checkpoint = {
        eventHubName: "myEventHub",
        consumerGroupName: EventHubClient.defaultConsumerGroupName,
        instanceId: generate_uuid(),
        partitionId: "0",
        sequenceNumber: 10,
        offset: 50
      };

      await inMemoryPartitionManager.updateCheckpoint(checkpoint);
      const partitionOwnershipList = await inMemoryPartitionManager.listOwnerships(
        "myEventHub",
        EventHubClient.defaultConsumerGroupName
      );
      partitionOwnershipList[0].partitionId.should.equals("0");
      partitionOwnershipList[0].sequenceNumber!.should.equals(checkpoint.sequenceNumber);
      partitionOwnershipList[0].offset!.should.equals(checkpoint.offset);
    });
  });
}).timeout(90000);
