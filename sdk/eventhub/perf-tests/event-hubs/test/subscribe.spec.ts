// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ProcessErrorHandler,
  EventData,
  EventHubConsumerClient,
  EventHubProducerClient,
} from "@azure/event-hubs";
import { PerfOptionDictionary, EventPerfTest, getEnvVar } from "@azure/test-utils-perf";

interface ReceiverOptions {
  "number-of-events": number;
  "event-size-in-bytes": number;
}


const connectionString = getEnvVar("EVENTHUB_CONNECTION_STRING");
const eventHubName = getEnvVar("EVENTHUB_NAME");
const consumerGroup = getEnvVar("CONSUMER_GROUP_NAME");

const producer = new EventHubProducerClient(connectionString, eventHubName);
const consumer = new EventHubConsumerClient(consumerGroup, connectionString)

export class SubscribeTest extends EventPerfTest<ReceiverOptions> {
  receiver: EventHubConsumerClient;
  subscriber: { close: () => Promise<void> } | undefined;

  options: PerfOptionDictionary<ReceiverOptions> = {
    "number-of-events": {
      required: true,
      description: "Total number of events to send",
      shortName: "events",
      longName: "events",
      defaultValue: 100000,
    },
    "event-size-in-bytes": {
      required: true,
      description: "Size of each event in bytes",
      shortName: "size",
      longName: "size-in-bytes",
      defaultValue: 2000,
    }
  };

  constructor() {
    super();
    this.receiver = ServiceBusTest.sbClient.createReceiver(ServiceBusTest.queueName, {
      receiveMode: "receiveAndDelete",
    });
  }

  /**
   * Sends the messages to be received later.
   */
  async globalSetup(): Promise<void> {
    await ServiceBusTest.sbAdminClient.createQueue(ServiceBusTest.queueName);
    const sender = ServiceBusTest.sbClient.createSender(ServiceBusTest.queueName);

    const {
      "number-of-messages": { value: numberOfMessages },
      "message-body-size-in-bytes": { value: messageBodySize },
    } = this.parsedOptions;

    await sendMessages(sender, numberOfMessages, messageBodySize);
  }

  setup() {
    this.subscriber = this.receiver.subscribe(
      {
        processMessage: async (_message: ServiceBusReceivedMessage) => {
          // { event: _message }
          await this.eventRaised();
        },
        processError: async (args: ProcessErrorArgs) => {
          await this.errorRaised(args.error);
        },
      },
      { maxConcurrentCalls: this.parsedOptions["max-concurrent-calls"].value }
    );
  }

  async cleanup() {
    this.subscriber && (await this.subscriber.close());
    await this.receiver.close();
  }

  async globalCleanup(): Promise<void> {
    await ServiceBusTest.sbClient.close();
    await ServiceBusTest.sbAdminClient.deleteQueue(ServiceBusTest.queueName);
  }
}
