// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PerfOptionDictionary } from "@azure-tools/test-perf";
import { SendableMessageInfo } from "@azure/service-bus";
import { ServiceBusTest } from "./sbBase.spec";

interface SendTestOptions {
  messageBodySize: number;
  numberOfMessages: number;
}

export class BatchSendTest extends ServiceBusTest<SendTestOptions> {
  static sender = ServiceBusTest.sbClient.createQueueClient(BatchSendTest.queueName).createSender();
  batch: SendableMessageInfo[];
  public options: PerfOptionDictionary<SendTestOptions> = {
    messageBodySize: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024,
    },
    numberOfMessages: {
      required: true,
      description: "Number of messages per send",
      shortName: "num",
      longName: "numberOfMessages",
      defaultValue: 10,
    },
  };

  constructor() {
    super();
    const sbMessage = {
      body: Buffer.alloc(this.parsedOptions.messageBodySize.value!),
    };
    this.batch = new Array(this.parsedOptions.numberOfMessages.value!).fill(sbMessage);
  }

  async runBatch(): Promise<number> {
    await BatchSendTest.sender.sendBatch(this.batch);
    return this.batch.length;
  }
}
