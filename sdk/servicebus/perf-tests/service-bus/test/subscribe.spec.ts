// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ProcessErrorArgs,
  ServiceBusReceivedMessage,
  ServiceBusReceiver,
} from "@azure/service-bus";
import { PerfOptionDictionary, EventPerfTest } from "@azure/test-utils-perf";
import { sendMessages } from "./receiveBatch.spec";
import { ServiceBusTest } from "./sbBase.spec";

interface ReceiverOptions {
  "number-of-messages": number;
  "message-body-size-in-bytes": number;
  "max-concurrent-calls": number;
}

export class SubscribeTest extends EventPerfTest<ReceiverOptions> {
  receiver: ServiceBusReceiver;
  subscriber: { close: () => Promise<void> } | undefined;

  options: PerfOptionDictionary<ReceiverOptions> = {
    "number-of-messages": {
      required: true,
      description: "Total number of messages to send",
      shortName: "messages",
      longName: "messages",
      defaultValue: 100000,
    },
    "message-body-size-in-bytes": {
      required: true,
      description: "Size of each message body in bytes",
      shortName: "size",
      longName: "size-in-bytes",
      defaultValue: 2000,
    },
    "max-concurrent-calls": {
      required: true,
      description: "max concurrent calls",
      shortName: "mcc",
      longName: "max-concurrent-calls",
      defaultValue: 10,
    },
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
          this.eventRaised();
        },
        processError: async (args: ProcessErrorArgs) => {
          this.errorRaised(args.error);
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
