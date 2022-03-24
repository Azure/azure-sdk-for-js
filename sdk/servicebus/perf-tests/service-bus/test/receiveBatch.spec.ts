// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceBusReceiver, ServiceBusSender } from "@azure/service-bus";
import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { ServiceBusTest } from "./sbBase.spec";

interface ReceiverOptions {
  "max-message-count": number;
  "number-of-messages": number;
  "message-body-size-in-bytes": number;
}

export class BatchReceiveTest extends ServiceBusTest<ReceiverOptions> {
  receiver: ServiceBusReceiver;
  public options: PerfOptionDictionary<ReceiverOptions> = {
    "number-of-messages": {
      required: true,
      description: "Total number of messages to send",
      shortName: "send",
      defaultValue: 10000,
    },
    "message-body-size-in-bytes": {
      required: true,
      description: "Size of each message body in bytes",
      shortName: "size",
      longName: "size-in-bytes",
      defaultValue: 2000,
    },
    "max-message-count": {
      required: true,
      description: "Max number of messages to receive",
      shortName: "max-receive",
      defaultValue: 50,
    },
  };

  constructor() {
    super();
    this.receiver = ServiceBusTest.sbClient.createReceiver(BatchReceiveTest.queueName, {
      receiveMode: "receiveAndDelete",
    });
  }

  /**
   * Sends the messages to be received later.
   */
  public async globalSetup(): Promise<void> {
    await super.globalSetup();
    const sender = ServiceBusTest.sbClient.createSender(BatchReceiveTest.queueName);

    const {
      "number-of-messages": { value: numberOfMessages },
      "message-body-size-in-bytes": { value: messageBodySize },
    } = this.parsedOptions;

    await sendMessages(sender, numberOfMessages, messageBodySize);
  }

  public async runBatch(): Promise<number> {
    const messages = await this.receiver.receiveMessages(
      this.parsedOptions["max-message-count"].value,
      { maxWaitTimeInMs: 500 }
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ in messages) {
      // This is to represent the bare minimum user scenario where one would
      // iterate over the messages and process them
    }
    return messages.length;
  }
}

export async function sendMessages(
  sender: ServiceBusSender,
  numberOfMessages: number,
  messageBodySize: number
) {
  let count = 0;
  while (count <= numberOfMessages) {
    const currentBatch = await sender.createMessageBatch();
    while (
      currentBatch.tryAddMessage({ body: Buffer.alloc(messageBodySize) }) &&
      count + currentBatch.count <= numberOfMessages
    );
    await sender.sendMessages(currentBatch);
    count = count + currentBatch.count;
    console.log(`${count} messages sent so far`);
  }
}
