// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
const assert = chai.assert;
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { OperationOptions, ServiceBusMessage } from "../../src";
import { TestClientType } from "../public/utils/testUtils";
import {
  EntityName,
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  getRandomTestClientTypeWithSessions,
  getRandomTestClientTypeWithNoSessions
} from "../public/utils/testutils2";
import { ServiceBusSender, ServiceBusSenderImpl } from "../../src/sender";

describe("Send Batch", () => {
  let sender: ServiceBusSender;
  let serviceBusClient: ServiceBusClientForTests;

  let entityNames: EntityName;
  const noSessionTestClientType = getRandomTestClientTypeWithNoSessions();
  const withSessionTestClientType = getRandomTestClientTypeWithSessions();

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    entityNames = await serviceBusClient.test.createTestEntities(entityType);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
  }

  async function afterEachTest(): Promise<void> {
    await sender.close();
  }

  describe("Send multiple homogeneous messages - size > max_batch_size_allowed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    function prepareMessages(): ServiceBusMessage[] {
      const messagesToSend: ServiceBusMessage[] = [];
      for (let i = 0; i < 1000; i++) {
        messagesToSend.push({
          body: Buffer.alloc(2000),
          messageId: `message ${i}`,
          sessionId: entityNames.usesSessions ? `someSession` : undefined
        });
      }
      return messagesToSend;
    }

    async function testSendBatch(
      // Max batch size
      maxSizeInBytes?: number
    ): Promise<void> {
      // Prepare messages to send
      const messagesToSend = prepareMessages();
      const sentMessages: ServiceBusMessage[] = [];
      const batchMessage = await sender.createMessageBatch({ maxSizeInBytes });

      for (const messageToSend of messagesToSend) {
        const batchHasCapacity = batchMessage.tryAddMessage(messageToSend);
        if (!batchHasCapacity) {
          break;
        } else {
          sentMessages.push(messageToSend);
        }
      }
      await sender.sendMessages(batchMessage);
      // receive all the messages in receive and delete mode
      await serviceBusClient.test.verifyAndDeleteAllSentMessages(entityNames, sentMessages);
    }

    it(`${noSessionTestClientType}: SendBatch`, async function(): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testSendBatch();
    });

    it(`${withSessionTestClientType}: SendBatch`, async function(): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      await testSendBatch();
    });
  });

  describe("Send multiple homogeneous messages - Multiple Sessions - size > max_batch_size_allowed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testSendBatch(
      // Max batch size
      maxSizeInBytes?: number
    ): Promise<void> {
      // Prepare messages to send
      const sentMessages: ServiceBusMessage[] = [];
      const batchMessage = await sender.createMessageBatch({ maxSizeInBytes });

      // Size of each message will be > 20000 bytes, maxMessageSize/20000 would exceed the limit
      const numberOfMessagesToSend =
        (await (sender as ServiceBusSenderImpl)["_sender"].getMaxMessageSize()) / 20000;

      for (let i = 0; i < numberOfMessagesToSend; i++) {
        const messageToSend = {
          body: Buffer.alloc(20000),
          messageId: `message ${i}`,
          sessionId: entityNames.usesSessions ? `someSession ${i}` : undefined,
          partitionKey: entityNames.usesSessions ? `someSession ${i}` : undefined
        };
        const batchHasCapacity = batchMessage.tryAddMessage(messageToSend);
        if (!batchHasCapacity) {
          break;
        } else {
          sentMessages.push(messageToSend);
        }
      }
      await sender.sendMessages(batchMessage);
      // receive all the messages in receive and delete mode
      await serviceBusClient.test.verifyAndDeleteAllSentMessages(entityNames, sentMessages);
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
      await testSendBatch();
    });

    it("Unpartitioned Topic with Sessions: SendBatch", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSendBatch();
    });
  });

  describe("Send multiple homogeneous messages - size < max_batch_size_allowed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    function prepareMessages(): ServiceBusMessage[] {
      const messagesToSend: ServiceBusMessage[] = [];
      messagesToSend.push({
        body: Buffer.alloc(2000),
        messageId: `message-1`,
        sessionId: entityNames.usesSessions ? `someSession` : undefined
      });
      messagesToSend.push({
        body: Buffer.alloc(2000),
        messageId: `message-2`,
        sessionId: entityNames.usesSessions ? `someSession` : undefined
      });
      messagesToSend.push({
        body: Buffer.alloc(2000),
        messageId: `message-3`,
        sessionId: entityNames.usesSessions ? `someSession` : undefined
      });
      return messagesToSend;
    }

    async function testSendBatch(
      // Max batch size
      maxSizeInBytes?: number
    ): Promise<void> {
      // Prepare messages to send
      const messagesToSend = prepareMessages();
      const sentMessages: ServiceBusMessage[] = [];
      const batchMessage = await sender.createMessageBatch({ maxSizeInBytes });

      for (const messageToSend of messagesToSend) {
        const batchHasCapacity = batchMessage.tryAddMessage(messageToSend);
        if (!batchHasCapacity) {
          break;
        } else {
          sentMessages.push(messageToSend);
        }
      }
      await sender.sendMessages(batchMessage);
      // receive all the messages in receive and delete mode
      await serviceBusClient.test.verifyAndDeleteAllSentMessages(entityNames, sentMessages);
    }

    it(`${noSessionTestClientType}: SendBatch`, async function(): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testSendBatch();
    });

    it(`${withSessionTestClientType}: SendBatch`, async function(): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      await testSendBatch();
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

    async function testSendBatch(): Promise<void> {
      // Prepare messages to send
      const messagesToSend = prepareMessages(entityNames.usesSessions);
      const sentMessages: ServiceBusMessage[] = [];
      const batchMessage = await sender.createMessageBatch();

      for (const messageToSend of messagesToSend) {
        const batchHasCapacity = batchMessage.tryAddMessage(messageToSend);
        if (!batchHasCapacity) {
          break;
        } else {
          sentMessages.push(messageToSend);
        }
      }
      await sender.sendMessages(batchMessage);
      // receive all the messages in receive and delete mode
      await serviceBusClient.test.verifyAndDeleteAllSentMessages(entityNames, sentMessages);
    }

    it(`${noSessionTestClientType}: SendBatch`, async function(): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testSendBatch();
    });

    it(`${withSessionTestClientType}: SendBatch`, async function(): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      await testSendBatch();
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
      const batchMessage = await sender.createMessageBatch({ maxSizeInBytes });

      for (const messageToSend of messagesToSend) {
        const batchHasCapacity = batchMessage.tryAddMessage(messageToSend);
        if (!batchHasCapacity) {
          break;
        } else {
          sentMessages.push(messageToSend);
        }
      }
      await sender.sendMessages(batchMessage);
      // receive all the messages in receive and delete mode
      await serviceBusClient.test.verifyAndDeleteAllSentMessages(entityNames, sentMessages);
    }

    it(`${noSessionTestClientType}: SendBatch`, async function(): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testSendBatch(false);
    });

    it(`${withSessionTestClientType}: SendBatch`, async function(): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
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
      // Max batch size
      maxSizeInBytes?: number
    ): Promise<void> {
      // Prepare messages to send
      const messagesToSend = prepareMessages(entityNames.usesSessions);
      const batchMessage = await sender.createMessageBatch({ maxSizeInBytes });

      should.equal(
        batchMessage.tryAddMessage(messagesToSend[0]),
        true,
        "tryAdd should not have failed for the first message"
      );
      should.equal(
        batchMessage.tryAddMessage(messagesToSend[1]),
        false,
        "tryAdd should have failed for the second message"
      );
      should.equal(
        batchMessage.tryAddMessage(messagesToSend[2]),
        false,
        "tryAdd should have failed for the third message"
      );
      should.equal(
        batchMessage.tryAddMessage(messagesToSend[3]),
        false,
        "tryAdd should have failed for the fourth message"
      );
      await sender.sendMessages(batchMessage);
      // receive all the messages in receive and delete mode
      await serviceBusClient.test.verifyAndDeleteAllSentMessages(entityNames, [messagesToSend[0]]);
    }

    it(`${noSessionTestClientType}: SendBatch`, async function(): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testSendBatch(5000);
    });

    it(`${withSessionTestClientType}: SendBatch`, async function(): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      await testSendBatch(5000);
    });
  });

  describe("CreateBatch should throw error - parameter maxSizeInBytes > max_batch_size_allowed", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });
    const maxSizeInBytes = 30000000;

    async function testSendBatch(): Promise<void> {
      let errorIsThrown = false;
      try {
        await sender.createMessageBatch({ maxSizeInBytes });
      } catch (error) {
        const maxSize = await (sender as ServiceBusSenderImpl)["_sender"].getMaxMessageSize();
        should.equal(
          error.message,
          `Max message size (${maxSizeInBytes} bytes) is greater than maximum message size (${maxSize} bytes) on the AMQP sender link.`,
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

    it(`${noSessionTestClientType}: SendBatch`, async function(): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testSendBatch();
    });

    it(`${withSessionTestClientType}: SendBatch`, async function(): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      await testSendBatch();
    });
  });

  it("send(messages[]) overload throws an error if the size exceeds a single batch", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue);
    try {
      await sender.sendMessages(
        [{ body: "ignored since anything will be bigger than the batch size I passed" }],
        {
          // this isn't a documented option for send(batch) but we do pass it through to the underlying
          // createBatch call.
          maxSizeInBytes: 1
        } as OperationOptions
      );
      should.fail("Should have thrown - the batch is too big");
    } catch (err) {
      should.equal(
        "Messages were too big to fit in a single batch. Remove some messages and try again or create your own batch using createBatch(), which gives more fine-grained control.",
        err.message
      );
      should.equal(err.code, "MessageSizeExceeded");
      should.equal(err.name, "ServiceBusError");
    }
  });

  it("send() with a fixed batch", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    const messagesToSend = [{ body: "hello" }];

    const batch = await sender.createMessageBatch();

    for (const message of messagesToSend) {
      if (!batch.tryAddMessage(message)) {
        throw new Error("We do actually want to send all the events.");
      }
    }

    await sender.sendMessages(batch);
    await serviceBusClient.test.verifyAndDeleteAllSentMessages(entityNames, messagesToSend);
  });

  it("send() with null/undefined properties", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue);

    const messageId = `null/undefined properties: ${Date.now()}`;

    await sender.sendMessages({
      messageId,
      body: undefined,
      applicationProperties: {
        nullProperty: null,
        // the type definition hasn't opened up to allow undefined (we do allow)
        // null, however.
        undefinedProperty: undefined as any,
        canary: "hello"
      }
    });

    // round trip documentation
    const receiver = await serviceBusClient.test.createReceiveAndDeleteReceiver(entityNames);
    const messageWithNullProperties = await receiver.receiveMessages(1);
    const receivedMessage = messageWithNullProperties[0]!;

    assert.deepEqual(
      {
        messageId: receivedMessage.messageId,
        applicationProperties: {
          nullProperty: receivedMessage.applicationProperties?.nullProperty,
          undefinedProperty: receivedMessage.applicationProperties?.undefinedProperty,
          canary: receivedMessage.applicationProperties?.canary
        }
      },
      {
        messageId,
        applicationProperties: {
          nullProperty: null,
          undefinedProperty: null, // NOTE, undefined just gets squashed to null,
          canary: "hello"
        }
      }
    );
  });
});
