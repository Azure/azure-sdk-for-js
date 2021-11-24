// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ServiceBusReceiver, ServiceBusSender } from "@azure/service-bus";
import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { ServiceBusTest } from "./sbBase.spec";
import { AbortController } from "@azure/abort-controller";

interface ReceiverOptions {
  "max-message-count": number;
  "number-of-messages": number;
  "message-body-size-in-bytes": number;
}

export class BatchReceiveTest extends ServiceBusTest<ReceiverOptions> {
  static controller: AbortController;
  static timer: NodeJS.Timeout;
  receiver: ServiceBusReceiver;
  public options: PerfOptionDictionary<ReceiverOptions> = {
    "number-of-messages": {
      required: true,
      description: "Total number of messages to send",
      shortName: "max",
      longName: "maximum",
      defaultValue: 10000
    },
    "message-body-size-in-bytes": {
      required: true,
      description: "Size of each message body in bytes",
      shortName: "size",
      longName: "size-in-bytes",
      defaultValue: 2000
    },
    "max-message-count": {
      required: true,
      description: "Max number of messages to receive",
      shortName: "max",
      longName: "maximum",
      defaultValue: 50
    }
  };

  constructor() {
    super();
    this.receiver = ServiceBusTest.sbClient.createReceiver(BatchReceiveTest.queueName, {
      receiveMode: "receiveAndDelete"
    });
  }

  /**
   * sends the messages to be received later
   */
  public async globalSetup() {
    await super.globalSetup();
    const sender = ServiceBusTest.sbClient.createSender(BatchReceiveTest.queueName);

    const {
      "number-of-messages": { value: numberOfMessages },
      "message-body-size-in-bytes": { value: messageBodySize },
      warmup: { value: warmup },
      iterations: { value: iterations },
      duration: { value: duration }
    } = this.parsedOptions;

    // Send messages to be able to receive as part of the test
    await sendMessages(sender, numberOfMessages, messageBodySize);

    // AbortSignal to make sure the test ends
    BatchReceiveTest.controller = new AbortController();
    BatchReceiveTest.timer = createTimer(warmup, iterations, duration);
  }

  public async runBatch(): Promise<number> {
    const messages = await this.receiver.receiveMessages(
      this.parsedOptions["max-message-count"].value,
      { maxWaitTimeInMs: 500, abortSignal: BatchReceiveTest.controller.signal }
    );
    for (const _ in messages) {
    }
    return messages.length;
  }

  public run(): Promise<void> {
    throw new Error("run not defined - not needed");
  }

  public async globalCleanup() {
    await super.globalCleanup();
    clearTimeout(BatchReceiveTest.timer);
  }
}

function createTimer(warmup: number, iterations: number, duration: number) {
  // Timer being created for one iteration more than the duration of the test
  return setTimeout(() => {
    BatchReceiveTest.controller.abort();
  }, (warmup + (1 + iterations) * duration) * 1000);
}

async function sendMessages(
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
