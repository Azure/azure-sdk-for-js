// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PerfStressOptionDictionary } from "@azure/test-utils-perfstress";
import { SendableMessageInfo, Sender } from "@azure/service-bus";
import { ServiceBusTest } from "./sbBase.spec";

interface SendTestOptions {
  messageBodySize: number;
  numberOfMessages: number;
}

export class BatchSendTest extends ServiceBusTest<SendTestOptions> {
  sender: Sender;
  sbMessage: SendableMessageInfo;
  public options: PerfStressOptionDictionary<SendTestOptions> = {
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
    this.sender = this.sbClient.createQueueClient(BatchSendTest.queueName).createSender();
    this.sbMessage = {
      body: Buffer.alloc(this.parsedOptions.messageBodySize.value!)
    };
  }

  async runAsync(): Promise<void> {
    await this.sender.sendBatch(
      new Array(this.parsedOptions.numberOfMessages.value!).fill(this.sbMessage)
    );
  }
}
