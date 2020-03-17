// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { SendableMessageInfo } from "../src";
import { TestClientType } from "./utils/testUtils";
import { Receiver } from "../src/receivers/receiver";
import { ServiceBusClientForTests, createServiceBusClientForTests } from "./utils/testutils2";
import { Sender } from "../src/sender";

describe("Send Batch", () => {
  let senderClient: Sender;
  let receiverClient: Receiver<{}>;
  let serviceBusClient: ServiceBusClientForTests;
  interface EntityName {
    queue?: string | undefined;
    topic?: string | undefined;
    subscription?: string | undefined;
  }
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
  }

  async function afterEachTest(): Promise<void> {
    await senderClient.close();
  }

  async function receiveAllMessages(
    entityNames: EntityName,
    useSessions: boolean,
    sentMessages: SendableMessageInfo[]
  ): Promise<void> {
    if (!useSessions) {
      if (entityNames.queue) {
        receiverClient = serviceBusClient.getReceiver(entityNames.queue, "receiveAndDelete");
      } else {
        receiverClient = serviceBusClient.getReceiver(
          entityNames.topic!,
          entityNames.subscription!,
          "receiveAndDelete"
        );
      }
      const receivedMsgs = await receiverClient.receiveBatch(
        sentMessages.length,
        sentMessages.length
      );
      receivedMsgs.messages.forEach((receivedMessage) => {
        sentMessages = sentMessages.filter(
          (sentMessage) => sentMessage.messageId !== receivedMessage.messageId
        );
      });
      receiverClient.close();
    } else {
      for (const message of sentMessages) {
        if (entityNames.queue) {
          receiverClient = serviceBusClient.getSessionReceiver(
            entityNames.queue,
            "receiveAndDelete",
            { sessionId: message.sessionId }
          );
        } else {
          receiverClient = serviceBusClient.getSessionReceiver(
            entityNames.topic!,
            entityNames.subscription!,
            "receiveAndDelete",
            { sessionId: message.sessionId }
          );
        }
        const receivedMsgs = await receiverClient.receiveBatch(1, 5);
        sentMessages = sentMessages.filter(
          (sentMessage) => sentMessage.messageId !== receivedMsgs.messages[0].messageId
        );
        receiverClient.close();
      }
    }
    should.equal(sentMessages.length, 0, "Unexpected number of messages received.");
  }

  describe("Send single message", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    function prepareMessages(useSessions: boolean): SendableMessageInfo[] {
      const messagesToSend: SendableMessageInfo[] = [];
      for (let i = 0; i < 1000; i++) {
        messagesToSend.push({
          body: Buffer.alloc(2000),
          messageId: `message ${i}`,
          sessionId: useSessions ? `someSession ${i}` : undefined
        });
      }
      return messagesToSend;
    }

    async function testSimpleSendBatch(
      useSessions: boolean,
      // Max batch size
      maxSizeInBytes?: number
    ): Promise<void> {
      /// Prepare messages to send
      const messagesToSend = prepareMessages(useSessions);
      const sentMessages: SendableMessageInfo[] = [];
      const batchMessage = await senderClient.createBatch({ maxSizeInBytes });
      // let numberOfMessagesInBatch = 0;

      for (const messageToSend of messagesToSend) {
        const batchHasCapacity = batchMessage.tryAdd(messageToSend);
        if (!batchHasCapacity) {
          break;
        } else {
          // numberOfMessagesInBatch++;
          sentMessages.push(messageToSend);
        }
      }
      await senderClient.sendBatch2(batchMessage);
      /// receive all the messages in receive and delete mode
      await receiveAllMessages(entityNames, useSessions, sentMessages);
    }

    it("Partitioned Queue: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSimpleSendBatch(false);
    });

    it("Partitioned Topic: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSimpleSendBatch(false);
    });

    it("Unpartitioned Queue: Simple SendBatch #RunInBrowser", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testSimpleSendBatch(false);
    });

    it("Unpartitioned Topic: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testSimpleSendBatch(false);
    });

    it("Partitioned Queue with Sessions: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSimpleSendBatch(true);
    });

    it("Partitioned Topic with Sessions: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSimpleSendBatch(true);
    });

    it("Unpartitioned Queue with Sessions: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSimpleSendBatch(true);
    });

    it("Unpartitioned Topic with Sessions: Simple SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSimpleSendBatch(true);
    });
  });
});
