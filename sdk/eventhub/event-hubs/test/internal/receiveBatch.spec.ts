// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);

import {
  EventData,
  MessagingError,
  EventHubConsumerClient,
  EventHubProducerClient,
  EventPosition
} from "../../src";
import { EnvVarKeys, getEnvVars } from "../public/utils/testUtils";
import { EventHubReceiver } from "../../src/eventHubReceiver";
import { translate } from "@azure/core-amqp";
import { testWithServiceTypes } from "../public/utils/testWithServiceTypes";
import { createMockServer } from "../public/utils/mockService";

testWithServiceTypes((serviceVersion) => {
  const env = getEnvVars();
  if (serviceVersion === "mock") {
    let service: ReturnType<typeof createMockServer>;
    before("Starting mock service", () => {
      service = createMockServer();
      return service.start();
    });

    after("Stopping mock service", () => {
      return service?.stop();
    });
  }

  describe("EventHubConsumerClient", function(): void {
    const service = {
      connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      path: env[EnvVarKeys.EVENTHUB_NAME]
    };
    let producerClient: EventHubProducerClient;
    let consumerClient: EventHubConsumerClient;
    let partitionIds: string[];
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

    beforeEach("Creating the clients", async () => {
      producerClient = new EventHubProducerClient(service.connectionString, service.path);
      consumerClient = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        service.connectionString,
        service.path
      );
      partitionIds = await producerClient.getPartitionIds({});
    });

    afterEach("Closing the clients", async () => {
      await producerClient.close();
      await consumerClient.close();
    });

    describe("EventHubConsumer receiveBatch", function(): void {
      it("should not lose messages on error", async () => {
        const partitionId = partitionIds[0];
        const { lastEnqueuedSequenceNumber } = await producerClient.getPartitionProperties(
          partitionId
        );

        // Ensure the receiver only looks at new messages.
        const startPosition: EventPosition = {
          sequenceNumber: lastEnqueuedSequenceNumber,
          isInclusive: false
        };

        // Send a message we expect to receive.
        const message: EventData = { body: "remember me!" };
        await producerClient.sendBatch([message], { partitionId });

        // Disable retries to make it easier to test scenario.
        const receiver = new EventHubReceiver(
          consumerClient["_context"],
          EventHubConsumerClient.defaultConsumerGroupName,
          partitionId,
          startPosition,
          {
            retryOptions: {
              maxRetries: 0
            }
          }
        );

        // Periodically check that the receiver's checkpoint has been updated.
        const checkpointInterval = setInterval(() => {
          if (receiver.checkpoint > -1) {
            clearInterval(checkpointInterval);
            const error = translate(new Error("I break receivers for fun."));
            receiver["_onError"]!(error);
          }
        }, 50);

        try {
          // There is only 1 message.
          // We expect to see an error.
          await receiver.receiveBatch(2, 60);
          throw new Error(`Test failure`);
        } catch (err) {
          err.message.should.not.equal("Test failure");
          receiver.checkpoint.should.be.greaterThan(-1, "Did not see a message come through.");
        } finally {
          clearInterval(checkpointInterval);
        }

        const events = await receiver.receiveBatch(1);
        events.length.should.equal(1, "Unexpected number of events received.");
        events[0].body.should.equal(message.body, "Unexpected message received.");
      });

      it("should not lose messages between retries", async () => {
        const partitionId = partitionIds[0];
        const { lastEnqueuedSequenceNumber } = await producerClient.getPartitionProperties(
          partitionId
        );

        // Ensure the receiver only looks at new messages.
        const startPosition: EventPosition = {
          sequenceNumber: lastEnqueuedSequenceNumber,
          isInclusive: false
        };

        // Send a message we expect to receive.
        const message: EventData = { body: "remember me!" };
        await producerClient.sendBatch([message], { partitionId });

        // Disable retries to make it easier to test scenario.
        const receiver = new EventHubReceiver(
          consumerClient["_context"],
          EventHubConsumerClient.defaultConsumerGroupName,
          partitionId,
          startPosition,
          {
            retryOptions: {
              maxRetries: 1
            }
          }
        );

        // Periodically check that the receiver's checkpoint has been updated.
        const checkpointInterval = setInterval(() => {
          if (receiver.checkpoint > -1) {
            clearInterval(checkpointInterval);
            const error = translate(new Error("I break receivers for fun.")) as MessagingError;
            error.retryable = true;
            receiver["_onError"]!(error);
          }
        }, 50);

        // There is only 1 message.
        const events = await receiver.receiveBatch(2, 20);

        events.length.should.equal(1, "Unexpected number of events received.");
        events[0].body.should.equal(message.body, "Unexpected message received.");
      });
    });
  }).timeout(90000);
});
