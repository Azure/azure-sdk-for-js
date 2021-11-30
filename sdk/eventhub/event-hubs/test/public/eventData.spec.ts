// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import chaiExclude from "chai-exclude";
import { v4 } from "uuid";
import { EnvVarKeys, getEnvVars, getStartingPositionsForTests } from "./utils/testUtils";
import {
  EventData,
  EventHubConsumerClient,
  EventHubProducerClient,
  EventPosition,
  ReceivedEventData,
  Subscription
} from "../../src";
import { testWithServiceTypes } from "./utils/testWithServiceTypes";
import { createMockServer } from "./utils/mockService";

const should = chai.should();
chai.use(chaiAsPromised);
chai.use(chaiExclude);

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

  describe("EventData", function(): void {
    let producerClient: EventHubProducerClient;
    let consumerClient: EventHubConsumerClient;
    const service = {
      connectionString: env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
      path: env[EnvVarKeys.EVENTHUB_NAME]
    };

    before("validate environment", function(): void {
      should.exist(
        env[EnvVarKeys.EVENTHUB_CONNECTION_STRING],
        "define EVENTHUB_CONNECTION_STRING in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarKeys.EVENTHUB_NAME],
        "define EVENTHUB_NAME in your environment before running integration tests."
      );
    });

    beforeEach(async () => {
      producerClient = new EventHubProducerClient(service.connectionString, service.path);
      consumerClient = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        service.connectionString,
        service.path
      );
    });

    afterEach("close the connection", async function(): Promise<void> {
      await producerClient.close();
      await consumerClient.close();
    });

    function getSampleEventData(): EventData {
      const randomTag = Math.random().toString();

      return {
        body: `message body ${randomTag}`,
        contentEncoding: "application/json; charset=utf-8",
        correlationId: randomTag,
        messageId: v4()
      } as EventData;
    }

    /**
     * Helper function that will receive a single event that comes after the starting positions.
     *
     * Note: Call this after sending a single event to Event Hubs to validate
     * @internal
     */
    async function receiveEvent(startingPositions: {
      [partitionId: string]: EventPosition;
    }): Promise<ReceivedEventData> {
      return new Promise<ReceivedEventData>((resolve, reject) => {
        const subscription: Subscription = consumerClient.subscribe(
          {
            async processError(err) {
              reject(err);
              return subscription.close();
            },
            async processEvents(events) {
              if (events.length) {
                resolve(events[0]);
                return subscription.close();
              }
            }
          },
          {
            startPosition: startingPositions
          }
        );
      });
    }

    describe("round-tripping AMQP encoding/decoding", () => {
      it(`props`, async () => {
        const startingPositions = await getStartingPositionsForTests(consumerClient);
        const testEvent = getSampleEventData();
        await producerClient.sendBatch([testEvent]);

        const event = await receiveEvent(startingPositions);
        should.equal(event.body, testEvent.body, "Unexpected body on the received event.");
        should.equal(
          event.contentType,
          testEvent.contentType,
          "Unexpected contentType on the received event."
        );
        should.equal(
          event.correlationId,
          testEvent.correlationId,
          "Unexpected correlationId on the received event."
        );
        should.equal(
          event.messageId,
          testEvent.messageId,
          "Unexpected messageId on the received event."
        );
      });

      it(`null body`, async () => {
        const startingPositions = await getStartingPositionsForTests(consumerClient);
        const testEvent: EventData = { body: null };
        await producerClient.sendBatch([testEvent]);

        const event = await receiveEvent(startingPositions);
        should.equal(event.body, testEvent.body, "Unexpected body on the received event.");
      });
    });
  });
});
