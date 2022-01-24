// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReceiveMode, Receiver, Sender } from "@azure/service-bus";
import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { ServiceBusTest } from "./sbBase.spec";

interface ReceiverOptions {
  "max-message-count": number;
  "number-of-messages": number;
  "message-body-size-in-bytes": number;
}

/**
 * An underestimate of the true maximum size of a batch send message in bytes.
 * This number is used to split up the send requests into small enough chunks
 * to be accepted.
 */
const MAX_SEND_BATCH_SIZE_BYTES = 200000;

export class BatchReceiveTest extends ServiceBusTest<ReceiverOptions> {
  receiver: Receiver;
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
    this.receiver = ServiceBusTest.sbClient
      .createQueueClient(BatchReceiveTest.queueName)
      .createReceiver(ReceiveMode.receiveAndDelete);
  }

  /**
   * Sends the messages to be received later.
   */
  public async globalSetup(): Promise<void> {
    await super.globalSetup();
    const sender = ServiceBusTest.sbClient
      .createQueueClient(BatchReceiveTest.queueName)
      .createSender();

    const {
      "number-of-messages": { value: numberOfMessages },
      "message-body-size-in-bytes": { value: messageBodySize },
    } = this.parsedOptions;

    await sendMessages(sender, numberOfMessages, messageBodySize);
  }

  public async runBatch(): Promise<number> {
    const messages = await this.receiver.receiveMessages(
      this.parsedOptions["max-message-count"].value,
      0.5
    );

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const _ in messages) {
      // This is to represent the bare minimum user scenario where one would
      // iterate over the messages and process them
    }
    return messages.length;
  }
}

async function sendMessages(sender: Sender, numberOfMessages: number, messageBodySize: number) {
  let messagesSent = 0;

  while (messagesSent < numberOfMessages) {
    let messagesThisBatch = Math.min(
      numberOfMessages - messagesSent,
      Math.floor(MAX_SEND_BATCH_SIZE_BYTES / messageBodySize)
    );
    await sender.sendBatch(Array(messagesThisBatch).fill({ body: Buffer.alloc(messageBodySize) }));
    messagesSent += messagesThisBatch;
    console.log(`${messagesSent} messages sent so far`);
  }
}
