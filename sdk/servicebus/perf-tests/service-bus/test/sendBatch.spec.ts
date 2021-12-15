// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfOptionDictionary } from "@azure/test-utils-perf";
import { ServiceBusMessage, ServiceBusSender } from "@azure/service-bus";
import { ServiceBusTest } from "./sbBase.spec";

interface SendTestOptions {
  messageBodySize: number;
  numberOfMessages: number;
}

export class BatchSendTest extends ServiceBusTest<SendTestOptions> {
  static sender: ServiceBusSender = ServiceBusTest.sbClient.createSender(BatchSendTest.queueName);
  batch: ServiceBusMessage[];
  public options: PerfOptionDictionary<SendTestOptions> = {
    messageBodySize: {
      required: true,
      description: "Size in bytes",
      shortName: "sz",
      longName: "size",
      defaultValue: 1024
    },
    numberOfMessages: {
      required: true,
      description: "Number of messages per send",
      shortName: "num",
      longName: "numberOfMessages",
      defaultValue: 10
    }
  };

  constructor() {
    super();
    const sbMessage = {
      body: Buffer.alloc(this.parsedOptions.messageBodySize.value)
    };
    this.batch = new Array(this.parsedOptions.numberOfMessages.value).fill(sbMessage);
  }

  async runBatch(): Promise<number> {
    await BatchSendTest.sender.sendMessages(this.batch);
    return this.batch.length;
  }
}
