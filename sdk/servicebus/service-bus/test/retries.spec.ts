// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { ServiceBusMessage, Receiver, ReceivedMessageWithLock } from "../src";
import { TestClientType } from "./utils/testUtils";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  EntityName
} from "./utils/testutils2";
import { Sender } from "../src/sender";
import { AmqpMessage, SendRequestOptions, MessagingError } from "@azure/core-amqp";
import Long from "long";

describe("Send Batch", () => {
  let senderClient: Sender;
  let receiverClient: Receiver<ReceivedMessageWithLock>;
  let serviceBusClient: ServiceBusClientForTests;

  let entityNames: EntityName;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    entityNames = await serviceBusClient.test.createTestEntities(entityType);

    senderClient = serviceBusClient.test.addToCleanup(
      serviceBusClient.getSender(entityNames.queue ?? entityNames.topic!)
    );
    receiverClient = serviceBusClient.test.addToCleanup(
      serviceBusClient.getReceiver(entityNames.queue ?? entityNames.topic!, "peekLock", {})
    );
  }

  async function afterEachTest(): Promise<void> {
    await senderClient.close();
  }

  describe("Send single message - size < max_batch_size_allowed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    function prepareMessages(useSessions: boolean): ServiceBusMessage[] {
      const messagesToSend: ServiceBusMessage[] = [];
      messagesToSend.push({
        body: Buffer.alloc(20000),
        messageId: `random-message-id`,
        sessionId: useSessions ? `someSession` : undefined
      });
      return messagesToSend;
    }

    async function testSendBatch(
      useSessions: boolean,
      // Max batch size
      maxSizeInBytes?: number
    ): Promise<void> {
      // Prepare messages to send
      const messagesToSend = prepareMessages(useSessions);
      const sentMessages: ServiceBusMessage[] = [];
      const batchMessage = await senderClient.createBatch({ maxSizeInBytes });

      for (const messageToSend of messagesToSend) {
        const batchHasCapacity = batchMessage.tryAdd(messageToSend);
        if (!batchHasCapacity) {
          break;
        } else {
          sentMessages.push(messageToSend);
        }
      }
      await senderClient.sendBatch(batchMessage);

      (receiverClient as any)._context.managementClient._acquireLockAndSendRequest = async function(
        request: AmqpMessage,
        retryTimeoutInMs: number,
        sendRequestOptions: SendRequestOptions
      ) {
        request;
        retryTimeoutInMs;
        sendRequestOptions;
        throw new MessagingError("Hello there, I'm an error");
      };
      await receiverClient.receiveDeferredMessage(new Long(0));
      // receive all the messages in receive and delete mode
      await serviceBusClient.test.verifyAndDeleteAllSentMessages(
        entityNames,
        useSessions,
        sentMessages
      );
    }

    it.only("Unpartitioned Queue: SendBatch #RunInBrowser", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testSendBatch(false);
    });

    it("Unpartitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSendBatch(true);
    });
  });
});
