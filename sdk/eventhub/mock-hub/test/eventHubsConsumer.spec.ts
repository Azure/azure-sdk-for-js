// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EventHubConsumerClient,
  EventHubProducerClient,
  MessagingError,
  PartitionContext,
  ReceivedEventData,
  earliestEventPosition,
} from "@azure/event-hubs";
import { getEnvVars } from "./utils/mockService";
import { createMockServer } from "./utils/mockService";
import { checkWithTimeout } from "./utils/checkWithTimeout";

describe("Client receiver test", () => {
  const env = getEnvVars();
  let service: ReturnType<typeof createMockServer>;
  before("Starting mock service", () => {
    service = createMockServer();
    return service.start();
  });

  after("Stopping mock service", () => {
    return service?.stop();
  });

  describe.only("EventHubConsumerClient", () => {
    let producerClient: EventHubProducerClient;
    let consumerClient: EventHubConsumerClient;
    let partitionIds: string[];

    beforeEach("Creating the clients", async () => {
      producerClient = new EventHubProducerClient(env.EVENTHUB_CONNECTION_STRING, env.EVENTHUB_NAME);
      consumerClient = new EventHubConsumerClient(
        EventHubConsumerClient.defaultConsumerGroupName,
        env.EVENTHUB_CONNECTION_STRING, env.EVENTHUB_NAME
      );
      partitionIds = await producerClient.getPartitionIds({});
    });

    afterEach("Closing the clients", () => {
      return Promise.all([producerClient.close(), consumerClient.close()]);
    });

    describe("functional tests", () => {

      beforeEach(() => {
        // ensure we have at least 2 partitions
        // partitionIds.length.should.gte(2);
        console.log("partitionIds: ", partitionIds);

      });
      afterEach(async () => {
        await producerClient.close();
      })

      it("Receive from all partitions", async function (): Promise<void> {
        const generateEvent = (): { body: Buffer } => {
          return { body: Buffer.alloc(1024), }
        };
        const totalEventsToSend = 100;
        for (const partitionId of partitionIds) {
          const eventBatch = Array.from({ length: totalEventsToSend / 4 }, () => generateEvent());
          await producerClient.sendBatch(eventBatch, { partitionId });
          console.log("Sent 100 events");
        }

        let receivedCount = 0;
        for (const partitionId of partitionIds) {
          consumerClient.subscribe(partitionId,
            {
              processEvents: async (events: ReceivedEventData[], _context: PartitionContext) => {
                // for (const _event of events) {
                // console.log("Received event from partition: ", partitionId, _event.sequenceNumber);
                // }
                console.log("Received events from partition: ", partitionId, events.length);
                receivedCount += events.length;
                if (receivedCount >= totalEventsToSend) {
                  await consumerClient.close();
                }
              },
              processError: async (error: Error | MessagingError, _context: PartitionContext) => {
                console.log("Error from partition: ", partitionId, error);
              },
            }, { startPosition: earliestEventPosition });
        }
        await checkWithTimeout(() => receivedCount >= totalEventsToSend, 1000, 10000);
      });
    })
  })
});
