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
import { AbortController } from "@azure/abort-controller";
import { EventHubReceiver } from "../../src/eventHubReceiver";
import { translate } from "@azure/core-amqp";
const env = getEnvVars();

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
    it("should support being cancelled", async function(): Promise<void> {
      const partitionId = partitionIds[0];
      const time = Date.now();

      // send a message that can be received
      await producerClient.sendBatch([{ body: "batchReceiver cancellation - timeout 0" }], {
        partitionId
      });

      const receiver = new EventHubReceiver(
        consumerClient["_context"],
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        {
          enqueuedOn: time
        }
      );

      try {
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        await receiver.receiveBatch(1, 60, abortSignal);
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
      }

      await receiver.close();
    });

    it("should support being cancelled from an already aborted AbortSignal", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const time = Date.now();

      // send a message that can be received
      await producerClient.sendBatch([{ body: "batchReceiver cancellation - immediate" }], {
        partitionId
      });

      const receiver = new EventHubReceiver(
        consumerClient["_context"],
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        {
          enqueuedOn: time
        }
      );

      try {
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortController = new AbortController();
        abortController.abort();
        await receiver.receiveBatch(1, 60, abortController.signal);
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
      }

      await receiver.close();
    });

    it("should support cancellation when a connection already exists", async function(): Promise<
      void
    > {
      const partitionId = partitionIds[0];
      const time = Date.now();

      // send a message that can be received
      await producerClient.sendBatch([{ body: "batchReceiver cancellation - timeout 0" }], {
        partitionId
      });

      const receiver = new EventHubReceiver(
        consumerClient["_context"],
        EventHubConsumerClient.defaultConsumerGroupName,
        partitionId,
        {
          enqueuedOn: time
        }
      );

      try {
        // call receiveBatch once to establish a connection
        await receiver.receiveBatch(1, 60);
        // abortSignal event listeners will be triggered after synchronous paths are executed
        const abortSignal = AbortController.timeout(0);
        await receiver.receiveBatch(1, 60, abortSignal);
        throw new Error(`Test failure`);
      } catch (err) {
        err.name.should.equal("AbortError");
        err.message.should.equal("The receive operation has been cancelled by the user.");
      }

      await receiver.close();
    });

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
