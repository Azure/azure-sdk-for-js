// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import Long from "long";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { delay, ServiceBusMessage } from "../src";
import { TestMessage, TestClientType } from "./utils/testUtils";
import { Receiver } from "../src/receivers/receiver";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength
} from "./utils/testutils2";
import { Sender } from "../src/sender";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";
import { AbortController } from "@azure/abort-controller";

describe("send scheduled messages", () => {
  let senderClient: Sender;
  let receiverClient: Receiver<ReceivedMessageWithLock>;
  let serviceBusClient: ServiceBusClientForTests;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);
    receiverClient = serviceBusClient.test.getPeekLockReceiver(entityNames);

    senderClient = serviceBusClient.test.addToCleanup(
      serviceBusClient.getSender(entityNames.queue ?? entityNames.topic!)
    );
  }

  async function afterEachTest(): Promise<void> {
    await senderClient.close();
    await receiverClient.close();
  }

  describe("Simple Send", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testSimpleSend(useSessions: boolean, usePartitions: boolean): Promise<void> {
      const testMessage = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      await senderClient.send(testMessage);
      const msgs = await receiverClient.receiveBatch(1);

      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs.length, 1, "Unexpected number of messages");
      should.equal(msgs[0].deliveryCount, 0, "DeliveryCount is different than expected");

      TestMessage.checkMessageContents(testMessage, msgs[0], useSessions, usePartitions);

      await msgs[0].complete();

      await testPeekMsgsLength(receiverClient, 0);
    }

    it("Partitioned Queue: Simple Send", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSimpleSend(false, true);
    });

    it("Partitioned Topic: Simple Send", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSimpleSend(false, true);
    });

    it("Unpartitioned Queue: Simple Send #RunInBrowser", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testSimpleSend(false, false);
    });

    it("Unpartitioned Topic: Simple Send", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testSimpleSend(false, false);
    });

    it("Partitioned Queue with Sessions: Simple Send", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSimpleSend(true, true);
    });

    it("Partitioned Topic with Sessions: Simple Send", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSimpleSend(true, true);
    });

    it("Unpartitioned Queue with Sessions: Simple Send", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testSimpleSend(true, false);
    });

    it("Unpartitioned Topic with Sessions: Simple Send", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testSimpleSend(true, false);
    });
  });

  // sendBatch(<Array of messages>) - Commented
  // describe("Simple Send Batch", function(): void {
  //   afterEach(async () => {
  //     await afterEachTest();
  //   });

  //   async function testSimpleSendBatch(
  //     useSessions: boolean,
  //     usePartitions: boolean
  //   ): Promise<void> {
  //     const testMessages = [];
  //     testMessages.push(useSessions ? TestMessage.getSessionSample() : TestMessage.getSample());
  //     testMessages.push(useSessions ? TestMessage.getSessionSample() : TestMessage.getSample());

  //     await senderClient.sendBatch(testMessages);
  //     const msgs = await receiverClient.receiveBatch(2);

  //     should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
  //     should.equal(msgs.length, 2, "Unexpected number of messages");

  //     if (testMessages[0].messageId === msgs[0].messageId) {
  //       TestMessage.checkMessageContents(testMessages[0], msgs[0], useSessions, usePartitions);
  //       TestMessage.checkMessageContents(testMessages[1], msgs[1], useSessions, usePartitions);
  //     } else {
  //       TestMessage.checkMessageContents(testMessages[1], msgs[0], useSessions, usePartitions);
  //       TestMessage.checkMessageContents(testMessages[0], msgs[1], useSessions, usePartitions);
  //     }

  //     await msgs[0].complete();
  //     await msgs[1].complete();

  //     await testPeekMsgsLength(receiverClient, 0);
  //   }

  //   it("Partitioned Queue: Simple SendBatch", async function(): Promise<void> {
  //     await beforeEachTest(TestClientType.PartitionedQueue);
  //     await testSimpleSendBatch(false, true);
  //   });

  //   it("Partitioned Topic: Simple SendBatch", async function(): Promise<void> {
  //     await beforeEachTest(TestClientType.PartitionedSubscription);
  //     await testSimpleSendBatch(false, true);
  //   });

  //   it("Unpartitioned Queue: Simple SendBatch #RunInBrowser", async function(): Promise<void> {
  //     await beforeEachTest(TestClientType.UnpartitionedQueue);
  //     await testSimpleSendBatch(false, false);
  //   });

  //   it("Unpartitioned Topic: Simple SendBatch", async function(): Promise<void> {
  //     await beforeEachTest(TestClientType.UnpartitionedSubscription);
  //     await testSimpleSendBatch(false, false);
  //   });

  //   it("Partitioned Queue with Sessions: Simple SendBatch", async function(): Promise<void> {
  //     await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
  //     await testSimpleSendBatch(true, true);
  //   });

  //   it("Partitioned Topic with Sessions: Simple SendBatch", async function(): Promise<void> {
  //     await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
  //     await testSimpleSendBatch(true, true);
  //   });

  //   it("Unpartitioned Queue with Sessions: Simple SendBatch", async function(): Promise<void> {
  //     await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
  //     await testSimpleSendBatch(true, false);
  //   });

  //   it("Unpartitioned Topic with Sessions: Simple SendBatch", async function(): Promise<void> {
  //     await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
  //     await testSimpleSendBatch(true, false);
  //   });
  // });

  describe("Schedule single message", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    /**
     * Schedules a test message message to be sent at a later time, waits and then receives it
     * @param useSessions Set to true if using session enabled queues or subscriptions
     * @param useScheduleMessages Boolean to indicate whether to use `scheduleMessage` or
     * `scheduleMessages` to ensure both get code coverage
     */
    async function testScheduleMessage(
      useSessions: boolean,
      useScheduleMessages: boolean
    ): Promise<void> {
      const testMessage = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      const scheduleTime = new Date(Date.now() + 10000); // 10 seconds from

      // Randomly choose scheduleMessage/scheduleMessages as the latter is expected to convert single
      // input to array and then use it
      if (useScheduleMessages) {
        await senderClient.scheduleMessages(scheduleTime, testMessage as any);
      } else {
        await senderClient.scheduleMessage(scheduleTime, testMessage);
      }

      const msgs = await receiverClient.receiveBatch(1);
      const msgEnqueueTime = msgs[0].enqueuedTimeUtc ? msgs[0].enqueuedTimeUtc.valueOf() : 0;

      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs.length, 1, "Unexpected number of messages");
      should.equal(
        msgEnqueueTime - scheduleTime.valueOf() >= 0,
        true,
        "Enqueued time must be greater than scheduled time"
      ); // checking received message enqueue time is greater or equal to the scheduled time.
      should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
      should.equal(
        msgs[0].messageId,
        testMessage.messageId,
        "MessageId is different than expected"
      );

      await msgs[0].complete();

      await testPeekMsgsLength(receiverClient, 0);
    }

    it("Partitioned Queue: Schedule single message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testScheduleMessage(false, true);
    });

    it("Partitioned Topic: Schedule single message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testScheduleMessage(false, false);
    });

    it("Unpartitioned Queue: Schedule single message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testScheduleMessage(false, false);
    });

    it("Unpartitioned Topic: Schedule single message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testScheduleMessage(false, true);
    });

    it("Partitioned Queue with Sessions: Schedule single message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testScheduleMessage(true, true);
    });

    it("Partitioned Topic with Sessions: Schedule single message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testScheduleMessage(true, true);
    });

    it("Unpartitioned Queue with Sessions: Schedule single message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testScheduleMessage(true, false);
    });

    it("Unpartitioned Topic with Sessions: Schedule single message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testScheduleMessage(true, false);
    });
  });

  describe("Schedule multiple messages", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    const messages: ServiceBusMessage[] = [
      {
        body: "hello1",
        messageId: `test message ${Math.random()}`,
        partitionKey: "dummy" // partitionKey is only for partitioned queue/subscrption, Unpartitioned queue/subscrption do not care about partitionKey.
      },
      {
        body: "hello2",
        messageId: `test message ${Math.random()}`,
        partitionKey: "dummy" // partitionKey is only for partitioned queue/subscrption, Unpartitioned queue/subscrption do not care about partitionKey.
      }
    ];
    const messageWithSessions: ServiceBusMessage[] = [
      {
        body: "hello1",
        messageId: `test message ${Math.random()}`,
        sessionId: TestMessage.sessionId
      },
      {
        body: "hello2",
        messageId: `test message ${Math.random()}`,
        sessionId: TestMessage.sessionId
      }
    ];

    async function testScheduleMessages(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? messageWithSessions : messages;
      const scheduleTime = new Date(Date.now() + 10000); // 10 seconds from now
      await senderClient.scheduleMessages(scheduleTime, testMessages);

      const msgs = await receiverClient.receiveBatch(2);
      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs.length, 2, "Unexpected number of messages");

      const msgEnqueueTime1 = msgs[0].enqueuedTimeUtc ? msgs[0].enqueuedTimeUtc.valueOf() : 0;
      const msgEnqueueTime2 = msgs[1].enqueuedTimeUtc ? msgs[1].enqueuedTimeUtc.valueOf() : 0;

      // checking received message enqueue time is greater or equal to the scheduled time.
      should.equal(
        msgEnqueueTime1 - scheduleTime.valueOf() >= 0,
        true,
        "msgEnqueueTime1 time must be greater than scheduled time"
      );
      should.equal(
        msgEnqueueTime2 - scheduleTime.valueOf() >= 0,
        true,
        "msgEnqueueTime2 time must be greater than scheduled time"
      );
      should.equal(
        testMessages.some((x) => x.messageId === msgs[0].messageId),
        true,
        "MessageId of first message is different than expected"
      );
      should.equal(
        testMessages.some((x) => x.messageId === msgs[1].messageId),
        true,
        "MessageId of second message is different than expected"
      );

      await msgs[0].complete();
      await msgs[1].complete();

      await testPeekMsgsLength(receiverClient, 0);
    }

    it("Partitioned Queue: Schedule multiple messages", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testScheduleMessages();
    });

    it("Partitioned Topic: Schedule multiple messages", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testScheduleMessages();
    });

    it("UnPartitioned Queue: Schedule multiple messages #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testScheduleMessages();
    });

    it("UnPartitioned Topic: Schedule multiple messages", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testScheduleMessages();
    });

    it("Partitioned Queue with Sessions: Schedule multiple messages", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testScheduleMessages(true);
    });

    it("Partitioned Topic with Sessions: Schedule multiple messages", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testScheduleMessages(true);
    });

    it("Unpartitioned Queue with Sessions: Schedule multiple messages #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testScheduleMessages(true);
    });

    it("Unpartitioned Topic with Sessions: Schedule multiple messages", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testScheduleMessages(true);
    });
  });

  describe("Cancel single Scheduled message", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testCancelScheduleMessage(useSessions?: boolean): Promise<void> {
      const testMessage = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now as anything less gives inconsistent results for cancelling
      const sequenceNumber = await senderClient.scheduleMessage(scheduleTime, testMessage);

      await delay(2000);

      await senderClient.cancelScheduledMessage(sequenceNumber);

      // Wait until we are sure we have passed the schedule time
      await delay(30000);
      await testReceivedMsgsLength(receiverClient, 0);
    }

    it("Partitioned Queue: Cancel single Scheduled message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testCancelScheduleMessage();
    });

    it("Partitioned Topic: Cancel single Scheduled message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testCancelScheduleMessage();
    });

    it("Unpartitioned Queue: Cancel single Scheduled message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testCancelScheduleMessage();
    });

    it("Unpartitioned Topic: Cancel single Scheduled message", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testCancelScheduleMessage();
    });

    it("Partitioned Queue with Sessions: Cancel single Scheduled message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testCancelScheduleMessage(true);
    });

    it("Partitioned Topic with Sessions: Cancel single Scheduled message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testCancelScheduleMessage(true);
    });

    it("Unpartitioned Queue with Sessions: Cancel single Scheduled message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testCancelScheduleMessage(true);
    });

    it("Unpartitioned Topic with Sessions: Cancel single Scheduled message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testCancelScheduleMessage(true);
    });
  });

  describe("Cancel multiple Scheduled messages", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function testCancelScheduleMessages(useSessions?: boolean): Promise<void> {
      const testMessage = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();

      const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now as anything less gives inconsistent results for cancelling
      const sequenceNumber1 = await senderClient.scheduleMessage(scheduleTime, testMessage);
      const sequenceNumber2 = await senderClient.scheduleMessage(scheduleTime, testMessage);

      await delay(2000);

      await senderClient.cancelScheduledMessages([sequenceNumber1, sequenceNumber2]);

      // Wait until we are sure we have passed the schedule time
      await delay(30000);
      await testReceivedMsgsLength(receiverClient, 0);
    }

    it("Partitioned Queue: Cancel scheduled messages", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testCancelScheduleMessages(false);
    });

    it("Partitioned Topic: Cancel scheduled messages", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testCancelScheduleMessages(false);
    });

    it("Unpartitioned Queue: Cancel scheduled messages #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await testCancelScheduleMessages(false);
    });

    it("Unpartitioned Topic: Cancel scheduled messages", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
      await testCancelScheduleMessages(false);
    });

    it("Partitioned Queue with Sessions: Cancel scheduled messages", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testCancelScheduleMessages(true);
    });

    it("Partitioned Topic with Sessions: Cancel scheduled messages", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testCancelScheduleMessages(true);
    });

    it("Unpartitioned Queue with Sessions: Cancel scheduled messages #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testCancelScheduleMessages(true);
    });

    it("Unpartitioned Topic with Sessions: Cancel scheduled messages", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testCancelScheduleMessages(true);
    });
  });

  describe("ServiceBusMessage validations #RunInBrowser", function(): void {
    const longString =
      "A very very very very very very very very very very very very very very very very very very very very very very very very very long string.";
    after(async () => {
      await afterEachTest();
    });

    before(async () => {
      await beforeEachTest(TestClientType.PartitionedQueue);
    });

    const testInputs: {
      message: ServiceBusMessage;
      expectedErrorMessage: string;
      title?: string;
    }[] = [
      {
        message: { body: "", contentType: 1 as any },
        expectedErrorMessage: "The property 'contentType' on the message must be of type 'string'",
        title: "contenType is of invalid type"
      },
      {
        message: { body: "", label: 1 as any },
        expectedErrorMessage: "The property 'label' on the message must be of type 'string'",
        title: "label is of invalid type"
      },
      {
        message: { body: "", to: 1 as any },
        expectedErrorMessage: "The property 'to' on the message must be of type 'string'",
        title: "to is of invalid type"
      },
      {
        message: { body: "", replyToSessionId: 1 as any },
        expectedErrorMessage:
          "The property 'replyToSessionId' on the message must be of type 'string'",
        title: "replyToSessionId is of invalid type"
      },
      {
        message: { body: "", sessionId: 1 as any },
        expectedErrorMessage: "The property 'sessionId' on the message must be of type 'string'",
        title: "sessionId is of invalid type"
      },
      {
        message: { body: "", replyTo: 1 as any },
        expectedErrorMessage: "The property 'replyTo' on the message must be of type 'string'",
        title: "replyTo is of invalid type"
      },
      {
        message: { body: "", timeToLive: "" as any },
        expectedErrorMessage: "The property 'timeToLive' on the message must be of type 'number'",
        title: "timeToLive is of invalid type"
      },
      {
        message: { body: "", partitionKey: longString },
        expectedErrorMessage:
          "Length of 'partitionKey' property on the message cannot be greater than 128 characters.",
        title: "partitionKey is longer than 128 characters"
      },
      {
        message: { body: "", viaPartitionKey: longString },
        expectedErrorMessage:
          "Length of 'viaPartitionKey' property on the message cannot be greater than 128 characters.",
        title: "viaPartitionKey is longer than 128 characters"
      },
      {
        message: { body: "", sessionId: longString },
        expectedErrorMessage:
          "Length of 'sessionId' property on the message cannot be greater than 128 characters.",
        title: "sessionId is longer than 128 characters"
      },
      {
        message: { body: "", messageId: longString },
        expectedErrorMessage:
          "Length of 'messageId' property on the message cannot be greater than 128 characters.",
        title: "messageId is longer than 128 characters"
      },
      {
        message: { body: "", messageId: {} as any },
        expectedErrorMessage:
          "The property 'messageId' on the message must be of type string, number or Buffer",
        title: "messageId is of invalid type"
      },
      {
        message: { body: "", correlationId: {} as any },
        expectedErrorMessage:
          "The property 'correlationId' on the message must be of type string, number or Buffer",
        title: "correlationId is of invalid type"
      }
    ];

    testInputs.forEach(function(testInput: any): void {
      it("Send() throws if " + testInput.title, async function(): Promise<void> {
        let actualErrorMsg = "";
        await senderClient.send(testInput.message).catch((err) => {
          actualErrorMsg = err.message;
        });
        should.equal(
          actualErrorMsg,
          testInput.expectedErrorMessage,
          "Error not thrown as expected"
        );
      });

      // sendBatch(<Array of messages>) - Commented
      // it(
      //   "SendBatch() throws if in the first message, " + testInput.title,
      //   async function(): Promise<void> {
      //     let actualErrorMsg = "";
      //     await senderClient.sendBatch([testInput.message, { body: "random" }]).catch((err) => {
      //       actualErrorMsg = err.message;
      //     });
      //     should.equal(
      //       actualErrorMsg,
      //       testInput.expectedErrorMessage,
      //       "Error not thrown as expected"
      //     );
      //   }
      // );

      // it(
      //   "SendBatch() throws if in the subsequent message, " + testInput.title,
      //   async function(): Promise<void> {
      //     let actualErrorMsg = "";
      //     await senderClient.sendBatch([{ body: "random" }, testInput.message]).catch((err) => {
      //       actualErrorMsg = err.message;
      //     });
      //     should.equal(
      //       actualErrorMsg,
      //       testInput.expectedErrorMessage,
      //       "Error not thrown as expected"
      //     );
      //   }
      // );

      it("ScheduleMessage() throws if " + testInput.title, async function(): Promise<void> {
        let actualErrorMsg = "";
        let actualErr;
        await senderClient.scheduleMessage(new Date(), testInput.message).catch((err) => {
          actualErr = err;
          actualErrorMsg = err.message;
        });
        should.equal(actualErrorMsg, testInput.expectedErrorMessage, actualErr);
      });
    });
  });

  async function testReceivedMsgsLength(
    receiverClient: Receiver<ReceivedMessageWithLock>,
    expectedReceivedMsgsLength: number
  ): Promise<void> {
    const receivedMsgs = await receiverClient.receiveBatch(expectedReceivedMsgsLength + 1, {
      maxWaitTimeInMs: 5000
    });

    should.equal(
      receivedMsgs.length,
      expectedReceivedMsgsLength,
      "Unexpected number of msgs found when receiving"
    );
  }

  describe("Cancel operations on the sender", function(): void {
    it("Abort scheduleMessage request on the sender", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await senderClient.scheduleMessage(new Date(), TestMessage.getSample(), {
          abortSignal: controller.signal
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal("The scheduleMessage operation has been cancelled by the user.");
      }
    });

    it("Abort scheduleMessages request on the sender", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await senderClient.scheduleMessages(new Date(), [TestMessage.getSample()], {
          abortSignal: controller.signal
        });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal("The scheduleMessages operation has been cancelled by the user.");
      }
    });

    it("Abort cancelScheduledMessage request on the sender", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await senderClient.cancelScheduledMessage(Long.ZERO, { abortSignal: controller.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal(
          "The cancelScheduledMessage operation has been cancelled by the user."
        );
      }
    });

    it("Abort cancelScheduledMessages request on the sender", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await senderClient.cancelScheduledMessages([Long.ZERO], { abortSignal: controller.signal });
        throw new Error(`Test failure`);
      } catch (err) {
        err.message.should.equal(
          "The cancelScheduledMessages operation has been cancelled by the user."
        );
      }
    });
  });
});
