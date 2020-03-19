// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { ServiceBusMessage } from "../src";
import { TestClientType } from "./utils/testUtils";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  EntityName
} from "./utils/testutils2";
import { Sender } from "../src/sender";

describe("Send Batch", () => {
  let senderClient: Sender;
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
  }

  async function afterEachTest(): Promise<void> {
    await senderClient.close();
  }

  describe("Send multiple homogeneous messages - size > max_batch_size_allowed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    function prepareMessages(useSessions: boolean): ServiceBusMessage[] {
      const messagesToSend: ServiceBusMessage[] = [];
      for (let i = 0; i < 1000; i++) {
        messagesToSend.push({
          body: Buffer.alloc(2000),
          messageId: `message ${i}`,
          sessionId: useSessions ? `someSession` : undefined
        });
      }
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
      // receive all the messages in receive and delete mode
      await serviceBusClient.test.verifyAndDeleteAllSentMessages(
        entityNames,
        useSessions,
        sentMessages
      );
    }

    it("Partitioned Queue: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSendBatch(false);
    });

    it("Partitioned Topic: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSendBatch(false);
    });

    it("Unpartitioned Queue: SendBatch #RunInBrowser", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testSendBatch(false);
    });

    it("Unpartitioned Topic: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testSendBatch(false);
    });

    it("Partitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSendBatch(true);
    });

    it("Partitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSendBatch(true);
    });

    it("Unpartitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSendBatch(true);
    });

    it("Unpartitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSendBatch(true);
    });
  });

  describe("Send multiple homogeneous messages - Multiple Sessions - size > max_batch_size_allowed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    function prepareMessages(useSessions: boolean): ServiceBusMessage[] {
      const messagesToSend: ServiceBusMessage[] = [];
      for (let i = 0; i < 1000; i++) {
        messagesToSend.push({
          body: Buffer.alloc(2000),
          messageId: `message ${i}`,
          sessionId: useSessions ? `someSession ${i}` : undefined
        });
      }
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
      // receive all the messages in receive and delete mode
      await serviceBusClient.test.verifyAndDeleteAllSentMessages(
        entityNames,
        useSessions,
        sentMessages
      );
    }

    // Not allowed for partitioned entities
    /*
    it("Partitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSendBatch(true);
    });

    it("Partitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSendBatch(true);
    });
    */

    it("Unpartitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSendBatch(true);
    });

    it("Unpartitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSendBatch(true);
    });
  });

  describe("Send multiple homogeneous messages - size < max_batch_size_allowed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    function prepareMessages(useSessions: boolean): ServiceBusMessage[] {
      const messagesToSend: ServiceBusMessage[] = [];
      messagesToSend.push({
        body: Buffer.alloc(2000),
        messageId: `message-1`,
        sessionId: useSessions ? `someSession` : undefined
      });
      messagesToSend.push({
        body: Buffer.alloc(2000),
        messageId: `message-2`,
        sessionId: useSessions ? `someSession` : undefined
      });
      messagesToSend.push({
        body: Buffer.alloc(2000),
        messageId: `message-3`,
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
      // receive all the messages in receive and delete mode
      await serviceBusClient.test.verifyAndDeleteAllSentMessages(
        entityNames,
        useSessions,
        sentMessages
      );
    }

    it("Partitioned Queue: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSendBatch(false);
    });

    it("Partitioned Topic: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSendBatch(false);
    });

    it("Unpartitioned Queue: SendBatch #RunInBrowser", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testSendBatch(false);
    });

    it("Unpartitioned Topic: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testSendBatch(false);
    });

    it("Partitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSendBatch(true);
    });

    it("Partitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSendBatch(true);
    });

    it("Unpartitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSendBatch(true);
    });

    it("Unpartitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSendBatch(true);
    });
  });

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
      // receive all the messages in receive and delete mode
      await serviceBusClient.test.verifyAndDeleteAllSentMessages(
        entityNames,
        useSessions,
        sentMessages
      );
    }

    it("Partitioned Queue: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSendBatch(false);
    });

    it("Partitioned Topic: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSendBatch(false);
    });

    it("Unpartitioned Queue: SendBatch #RunInBrowser", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testSendBatch(false);
    });

    it("Unpartitioned Topic: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testSendBatch(false);
    });

    it("Partitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSendBatch(true);
    });

    it("Partitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSendBatch(true);
    });

    it("Unpartitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSendBatch(true);
    });

    it("Unpartitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSendBatch(true);
    });
  });

  describe("Send multiple heterogenous messages - size > max_batch_size_allowed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    function prepareMessages(useSessions: boolean): ServiceBusMessage[] {
      const messagesToSend: ServiceBusMessage[] = [];
      messagesToSend.push({
        body: Buffer.alloc(2000),
        messageId: `message-1`,
        sessionId: useSessions ? `someSession` : undefined
      });
      messagesToSend.push({
        body: Buffer.alloc(200000),
        messageId: `message-2`,
        sessionId: useSessions ? `someSession` : undefined
      });
      messagesToSend.push({
        body: Buffer.alloc(40000),
        messageId: `message-2`,
        sessionId: useSessions ? `someSession` : undefined
      });
      messagesToSend.push({
        body: Buffer.alloc(20000),
        messageId: `message-3`,
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
      // receive all the messages in receive and delete mode
      await serviceBusClient.test.verifyAndDeleteAllSentMessages(
        entityNames,
        useSessions,
        sentMessages
      );
    }

    it("Partitioned Queue: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSendBatch(false);
    });

    it("Partitioned Topic: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSendBatch(false);
    });

    it("Unpartitioned Queue: SendBatch #RunInBrowser", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testSendBatch(false);
    });

    it("Unpartitioned Topic: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testSendBatch(false);
    });

    it("Partitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSendBatch(true);
    });

    it("Partitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSendBatch(true);
    });

    it("Unpartitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSendBatch(true);
    });

    it("Unpartitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSendBatch(true);
    });
  });

  describe("CreateBatch - parameter maxSizeInBytes > max_batch_size_allowed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    function prepareMessages(useSessions: boolean): ServiceBusMessage[] {
      const messagesToSend: ServiceBusMessage[] = [];
      messagesToSend.push({
        body: Buffer.alloc(2000),
        messageId: `message-1`,
        sessionId: useSessions ? `someSession` : undefined
      });
      messagesToSend.push({
        body: Buffer.alloc(200000),
        messageId: `message-2`,
        sessionId: useSessions ? `someSession` : undefined
      });
      messagesToSend.push({
        body: Buffer.alloc(40000),
        messageId: `message-3`,
        sessionId: useSessions ? `someSession` : undefined
      });
      messagesToSend.push({
        body: Buffer.alloc(20000),
        messageId: `message-4`,
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
      const batchMessage = await senderClient.createBatch({ maxSizeInBytes });

      should.equal(
        batchMessage.tryAdd(messagesToSend[0]),
        true,
        "tryAdd should not have failed for the first message"
      );
      should.equal(
        batchMessage.tryAdd(messagesToSend[1]),
        false,
        "tryAdd should have failed for the second message"
      );
      should.equal(
        batchMessage.tryAdd(messagesToSend[2]),
        false,
        "tryAdd should have failed for the third message"
      );
      should.equal(
        batchMessage.tryAdd(messagesToSend[3]),
        false,
        "tryAdd should have failed for the fourth message"
      );
      await senderClient.sendBatch(batchMessage);
      // receive all the messages in receive and delete mode
      await serviceBusClient.test.verifyAndDeleteAllSentMessages(entityNames, useSessions, [
        messagesToSend[0]
      ]);
    }

    it("Partitioned Queue: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSendBatch(false, 5000);
    });

    it("Partitioned Topic: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSendBatch(false, 5000);
    });

    it("Unpartitioned Queue: SendBatch #RunInBrowser", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testSendBatch(false, 5000);
    });

    it("Unpartitioned Topic: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testSendBatch(false, 5000);
    });

    it("Partitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSendBatch(true, 5000);
    });

    it("Partitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSendBatch(true, 5000);
    });

    it("Unpartitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSendBatch(true, 5000);
    });

    it("Unpartitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSendBatch(true, 5000);
    });
  });

  describe("CreateBatch should throw error - parameter maxSizeInBytes > max_batch_size_allowed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });
    const maxSizeInBytes = 30000000;

    async function testSendBatch(maxSizeInBytes?: number): Promise<void> {
      let errorIsThrown = false;
      try {
        await senderClient.createBatch({ maxSizeInBytes });
      } catch (error) {
        should.equal(
          error.message,
          `Max message size (${maxSizeInBytes} bytes) is greater than maximum message size (262144 bytes) on the AMQP sender link.`,
          "Unexpected error message when tried to create a batch of size > maximum message size."
        );
        errorIsThrown = true;
      }
      should.equal(
        errorIsThrown,
        true,
        "Error is not thrown when tried to create a batch of size > maximum message size."
      );
    }

    it("Partitioned Queue: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSendBatch(maxSizeInBytes);
    });

    it("Partitioned Topic: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSendBatch(maxSizeInBytes);
    });

    it("Unpartitioned Queue: SendBatch #RunInBrowser", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testSendBatch(maxSizeInBytes);
    });

    it("Unpartitioned Topic: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testSendBatch(maxSizeInBytes);
    });

    it("Partitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSendBatch(maxSizeInBytes);
    });

    it("Partitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSendBatch(maxSizeInBytes);
    });

    it("Unpartitioned Queue with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSendBatch(maxSizeInBytes);
    });

    it("Unpartitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSendBatch(maxSizeInBytes);
    });
  });
});
