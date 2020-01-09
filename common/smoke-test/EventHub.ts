// ------------------------------------
// Copyright(c) Microsoft Corporation.
// Licensed under the MIT License.
// ------------------------------------
import {
  EventHubProducerClient,
  EventHubConsumerClient,
  ReceivedEventData,
  SubscribeOptions,
  earliestEventPosition
} from "@azure/event-hubs";

export class EventHubs {
  private static producer: EventHubProducerClient;
  private static consumer: EventHubConsumerClient;
  private static partitionIds: string[];

  static async Run() {
    console.log(EventHubs.dedent`
        ------------------------
        Event Hubs
        ------------------------
        1) Get partitions ID
        2) Send a batch of 3 events
        3) Get a batch of events
        `);

    let connectionString =
      process.env["EVENT_HUBS_CONNECTION_STRING"] || "<YourConnectionString>";

    EventHubs.consumer = new EventHubConsumerClient(
      EventHubConsumerClient.defaultConsumerGroupName,
      connectionString
    );

    EventHubs.producer = new EventHubProducerClient(connectionString);

    try {
      await EventHubs.getPartitionsIds();
      await EventHubs.SendAndReceiveEvents();
    } finally {
      //At the end the client must be closed.
      await EventHubs.consumer.close();
      await EventHubs.producer.close();
    }
  }

  private static async getPartitionsIds() {
    console.log("getting partitions id");

    //In this sample, all the events are gonna be send and received from the first partition of the Event Hub.
    //This can be changed since it is not necessary to specify the partitionID when calling a method of the SDK.
    EventHubs.partitionIds = await EventHubs.producer.getPartitionIds();
    console.log("\tdone");
  }

  private static async SendAndReceiveEvents() {
    console.log("sending events...");
    const producerOptions = {
      partitionId: EventHubs.partitionIds[0]
    };

    const events = [
      { body: "JS Event Test 1" },
      { body: "JS Event Test 2" },
      { body: "JS Event Test 3" }
    ];

    const batch = await EventHubs.producer.createBatch(producerOptions);

    for (let event of events) {
      if (!batch.tryAdd(event)) {
        throw "Could not add event";
      }
    }

    await EventHubs.producer.sendBatch(batch);
    await EventHubs.producer.close();
    console.log("\tdone");

    console.log("receiving events...");
    const subscribeOptions: SubscribeOptions = {
      maxBatchSize: events.length,
      maxWaitTimeInSeconds: 5,
      startPosition: earliestEventPosition
    };

    let numEventsReceived = 0;

    await new Promise(async (res, rej) => {
      const subscription = await EventHubs.consumer.subscribe(
        {
          processEvents: async (receivedEvents: ReceivedEventData[]) => {
            numEventsReceived += receivedEvents.length;
            receivedEvents.forEach((event: ReceivedEventData) =>
              console.log(`Event received: ${event.body}`)
            );

            // Close subscription and client when expected amount of events
            // has been received.
            if (numEventsReceived >= events.length) {
              await subscription.close();
              await EventHubs.consumer.close();
              console.log("\tdone");
              res();
            }
          },
          processError: async (error: Error) => {
            await subscription.close();
            await EventHubs.consumer.close();
            rej(error);
          }
        },
        subscribeOptions
      );
    });
  }

  private static dedent(str: ReadonlyArray<string>) {
    return str[0].replace(/^\ */gm, "");
  }
}
