// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import Long from "long";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { ServiceBusMessage, delay } from "../../src";
import { TestClientType, TestMessage } from "./utils/testUtils";
import { ServiceBusReceiver } from "../../src";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength,
  getRandomTestClientTypeWithNoSessions,
  getRandomTestClientTypeWithSessions,
  EntityName,
  getRandomTestClientType,
} from "./utils/testutils2";
import { ServiceBusSender } from "../../src";
import { AbortController } from "@azure/abort-controller";
import { StandardAbortMessage } from "@azure/core-amqp";

const noSessionTestClientType = getRandomTestClientTypeWithNoSessions();
const withSessionTestClientType = getRandomTestClientTypeWithSessions();
const anyRandomTestClientType = getRandomTestClientType();
export const TRACEPARENT_PROPERTY = "Diagnostic-Id";

describe("Sender Tests", () => {
  let sender: ServiceBusSender;
  let receiver: ServiceBusReceiver;
  let serviceBusClient: ServiceBusClientForTests;
  let entityName: EntityName;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    entityName = await serviceBusClient.test.createTestEntities(entityType);
    receiver = await serviceBusClient.test.createPeekLockReceiver(entityName);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityName.queue ?? entityName.topic!)
    );
  }

  afterEach(async () => {
    await sender.close();
    await receiver.close();
  });

  async function testSimpleSend(): Promise<void> {
    const testMessage = entityName.usesSessions
      ? TestMessage.getSessionSample()
      : TestMessage.getSample();
    await sender.sendMessages(testMessage);
    const msgs = await receiver.receiveMessages(1);
    const receivedMessage = msgs[0];
    // remove message first in case any assertion fails to ensure we don't have lingering message
    await receiver.completeMessage(receivedMessage);
    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(receivedMessage.deliveryCount, 0, "DeliveryCount is different than expected");
    should.equal(receivedMessage.messageId, testMessage.messageId);

    TestMessage.checkMessageContents(
      testMessage,
      receivedMessage,
      entityName.usesSessions,
      entityName.isPartitioned
    );

    await testPeekMsgsLength(receiver, 0);
  }

  it(noSessionTestClientType + ": Send single message", async function (): Promise<void> {
    await beforeEachTest(noSessionTestClientType);
    await testSimpleSend();
  });

  it(withSessionTestClientType + ": Send single message", async function (): Promise<void> {
    await beforeEachTest(withSessionTestClientType);
    await testSimpleSend();
  });

  it(
    withSessionTestClientType + ": Received message has active state",
    async function (): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      const testMessage = entityName.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      // Ensure the message is not scheduled.
      delete testMessage.scheduledEnqueueTimeUtc;
      await sender.sendMessages(testMessage);
      const msgs = await receiver.receiveMessages(1);
      // remove message first in case any assertion fails to ensure we don't have lingering message
      await receiver.completeMessage(msgs[0]);
      msgs[0].state.should.equal("active");
    }
  );

  async function testSimpleSendArray(): Promise<void> {
    const testMessages = [];
    testMessages.push(
      entityName.usesSessions ? TestMessage.getSessionSample() : TestMessage.getSample()
    );
    testMessages.push(
      entityName.usesSessions ? TestMessage.getSessionSample() : TestMessage.getSample()
    );

    await sender.sendMessages(testMessages);
    const msgs = await receiver.receiveMessages(2);

    // remove messages first in case any assertion fails to ensure we don't have lingering messages
    await receiver.completeMessage(msgs[0]);
    await receiver.completeMessage(msgs[1]);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 2, "Unexpected number of messages");

    should.equal(
      msgs[0].messageId === testMessages[0].messageId ||
        msgs[0].messageId === testMessages[1].messageId,
      true,
      `Unexpected message with id ${msgs[0].messageId}`
    );
    should.equal(
      msgs[1].messageId === testMessages[0].messageId ||
        msgs[1].messageId === testMessages[1].messageId,
      true,
      `Unexpected message with id ${msgs[1].messageId}`
    );

    if (testMessages[0].messageId === msgs[0].messageId) {
      TestMessage.checkMessageContents(
        testMessages[0],
        msgs[0],
        entityName.usesSessions,
        entityName.isPartitioned
      );
      TestMessage.checkMessageContents(
        testMessages[1],
        msgs[1],
        entityName.usesSessions,
        entityName.isPartitioned
      );
    } else {
      TestMessage.checkMessageContents(
        testMessages[1],
        msgs[0],
        entityName.usesSessions,
        entityName.isPartitioned
      );
      TestMessage.checkMessageContents(
        testMessages[0],
        msgs[1],
        entityName.usesSessions,
        entityName.isPartitioned
      );
    }

    await testPeekMsgsLength(receiver, 0);
  }

  it(noSessionTestClientType + ": Send Array of messages", async function (): Promise<void> {
    await beforeEachTest(noSessionTestClientType);
    await testSimpleSendArray();
  });

  it(withSessionTestClientType + ": Send Array of messages", async function (): Promise<void> {
    await beforeEachTest(withSessionTestClientType);
    await testSimpleSendArray();
  });

  async function testScheduleSingleMessage(): Promise<void> {
    const testMessage = entityName.usesSessions
      ? TestMessage.getSessionSample()
      : TestMessage.getSample();
    const scheduleTime = new Date(Date.now() + 10000); // 10 seconds from

    await sender.scheduleMessages(testMessage, scheduleTime);

    const msgs = await receiver.receiveMessages(1);
    const msgEnqueueTime = msgs[0].enqueuedTimeUtc ? msgs[0].enqueuedTimeUtc.valueOf() : 0;

    should.equal(msgs[0].state, "scheduled");
    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(
      msgEnqueueTime - scheduleTime.valueOf() >= 0,
      true,
      "Enqueued time must be greater than scheduled time"
    ); // checking received message enqueue time is greater or equal to the scheduled time.
    should.equal(msgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessage.messageId, "MessageId is different than expected");

    await receiver.completeMessage(msgs[0]);

    await testPeekMsgsLength(receiver, 0);
  }

  async function testScheduleMultipleMessages(): Promise<void> {
    const testMessages = entityName.usesSessions
      ? [TestMessage.getSessionSample(), TestMessage.getSessionSample()]
      : [TestMessage.getSample(), TestMessage.getSample()];
    const scheduleTime = new Date(Date.now() + 10000); // 10 seconds from now
    await sender.scheduleMessages(testMessages, scheduleTime);

    const msgs = await receiver.receiveMessages(2);
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

    await receiver.completeMessage(msgs[0]);
    await receiver.completeMessage(msgs[1]);

    await testPeekMsgsLength(receiver, 0);
  }

  it(
    anyRandomTestClientType + ": Schedule with empty input does not throw error",
    async function (): Promise<void> {
      await beforeEachTest(anyRandomTestClientType);
      const sequenceNumbers = await sender.scheduleMessages([], new Date());
      should.equal(sequenceNumbers.length, 0);
    }
  );

  it(anyRandomTestClientType + ": Schedule single message", async function (): Promise<void> {
    await beforeEachTest(anyRandomTestClientType);
    await testScheduleSingleMessage();
  });

  it(anyRandomTestClientType + ": Schedule multiple messages", async function (): Promise<void> {
    await beforeEachTest(anyRandomTestClientType);
    await testScheduleMultipleMessages();
  });

  async function testCancelSingleScheduledMessage(): Promise<void> {
    const testMessage = entityName.usesSessions
      ? TestMessage.getSessionSample()
      : TestMessage.getSample();
    const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now as anything less gives inconsistent results for cancelling
    const [sequenceNumber] = await sender.scheduleMessages(testMessage, scheduleTime);

    await delay(2000);

    await sender.cancelScheduledMessages(sequenceNumber);

    // Wait until we are sure we have passed the schedule time
    await delay(30000);
    await testReceivedMsgsLength(0);
  }

  async function testCancelMultipleScheduleMessages(): Promise<void> {
    const getTestMessage = entityName.usesSessions
      ? TestMessage.getSessionSample
      : TestMessage.getSample;

    const scheduleTime = new Date(Date.now() + 30000); // 30 seconds from now as anything less gives inconsistent results for cancelling
    const [sequenceNumber1, sequenceNumber2] = await sender.scheduleMessages(
      [getTestMessage(), getTestMessage()],
      scheduleTime
    );

    await delay(2000);

    await sender.cancelScheduledMessages([sequenceNumber1, sequenceNumber2]);

    // Wait until we are sure we have passed the schedule time
    await delay(30000);
    await testReceivedMsgsLength(0);
  }

  it(
    anyRandomTestClientType + ": Cancel Scheduled message with empty input does not throw error",
    async function (): Promise<void> {
      await beforeEachTest(anyRandomTestClientType);
      await sender.cancelScheduledMessages([]);
    }
  );

  it(
    anyRandomTestClientType + ": Cancel single Scheduled message",
    async function (): Promise<void> {
      await beforeEachTest(anyRandomTestClientType);
      await testCancelSingleScheduledMessage();
    }
  );

  it(
    anyRandomTestClientType + ": Cancel multiple Scheduled messages",
    async function (): Promise<void> {
      await beforeEachTest(anyRandomTestClientType);
      await testCancelMultipleScheduleMessages();
    }
  );

  // This test occasionally fails on macOS.
  // Issue - https://github.com/Azure/azure-sdk-for-js/issues/9912
  // Failure - The queue is initially empty, we schedule 3 messages and get their sequence numbers, receive the 3 messages,
  //           the error is that one of the sequence numbers do not have a counterpart in the received messages.
  // To be un-skipped once the root cause is found, the bug is fixed.
  // Being investigated at https://github.com/Azure/azure-sdk-for-js/pull/10053.
  it.skip(anyRandomTestClientType + ": Schedule messages in parallel", async () => {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    const date = new Date();
    const messages = [
      { body: "Hello!" },
      { body: "Hello, again!" },
      { body: "Hello, again and again!!" },
    ];
    const [result1, result2, result3] = await Promise.all([
      // Schedule messages in parallel
      sender.scheduleMessages(messages[0], date),
      sender.scheduleMessages(messages[1], date),
      sender.scheduleMessages(messages[2], date),
    ]);
    const sequenceNumbers = [result1[0], result2[0], result3[0]];
    compareSequenceNumbers(sequenceNumbers[0], sequenceNumbers[1]);
    compareSequenceNumbers(sequenceNumbers[0], sequenceNumbers[2]);
    compareSequenceNumbers(sequenceNumbers[1], sequenceNumbers[2]);

    function compareSequenceNumbers(sequenceNumber1: Long, sequenceNumber2: Long): void {
      should.equal(
        sequenceNumber1.compare(sequenceNumber2) !== 0,
        true,
        "Returned sequence numbers for parallel requests are the same"
      );
    }

    const receivedMsgs = await receiver.receiveMessages(3);
    should.equal(receivedMsgs.length, 3, "Unexpected number of messages");
    for (const seqNum of sequenceNumbers) {
      const msgWithSeqNum = receivedMsgs.find(
        ({ sequenceNumber }) => sequenceNumber?.comp(seqNum) === 0
      );
      should.equal(
        msgWithSeqNum === undefined,
        false,
        `Sequence number ${seqNum} is not found in the received messages!`
      );
      should.equal(
        msgWithSeqNum?.body,
        messages[sequenceNumbers.indexOf(seqNum)].body,
        "Message body did not match though the sequence numbers matched!"
      );
      await receiver.completeMessage(msgWithSeqNum!);
    }

    await testPeekMsgsLength(receiver, 0);
  });

  async function testReceivedMsgsLength(expectedReceivedMsgsLength: number): Promise<void> {
    const receivedMsgs = await receiver.receiveMessages(expectedReceivedMsgsLength + 1, {
      maxWaitTimeInMs: 5000,
    });

    should.equal(
      receivedMsgs.length,
      expectedReceivedMsgsLength,
      "Unexpected number of msgs found when receiving"
    );
  }

  it(
    anyRandomTestClientType + ": Abort scheduleMessages request on the sender",
    async function (): Promise<void> {
      await beforeEachTest(anyRandomTestClientType);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await sender.scheduleMessages([TestMessage.getSample()], new Date(), {
          abortSignal: controller.signal,
        });
        throw new Error(`Test failure`);
      } catch (err: any) {
        err.message.should.equal(StandardAbortMessage);
      }
    }
  );

  it(
    anyRandomTestClientType + ": Abort cancelScheduledMessages request on the sender",
    async function (): Promise<void> {
      await beforeEachTest(anyRandomTestClientType);
      const controller = new AbortController();
      setTimeout(() => controller.abort(), 1);
      try {
        await sender.cancelScheduledMessages([Long.ZERO], { abortSignal: controller.signal });
        throw new Error(`Test failure`);
      } catch (err: any) {
        err.message.should.equal(StandardAbortMessage);
      }
    }
  );
});

describe("ServiceBusMessage validations", function (): void {
  let sbClient: ServiceBusClientForTests;
  let sender: ServiceBusSender;

  before(async () => {
    sbClient = createServiceBusClientForTests();
    const entityName = await sbClient.test.createTestEntities(TestClientType.UnpartitionedQueue);
    sender = sbClient.createSender(entityName.queue!);
  });

  after(async () => {
    await sbClient.close();
  });

  const longString =
    "A very very very very very very very very very very very very very very very very very very very very very very very very very long string.";

  const testInputs: {
    message: ServiceBusMessage;
    expectedErrorMessage: string;
    title?: string;
  }[] = [
    {
      message: { body: "", contentType: 1 as any },
      expectedErrorMessage: "The property 'contentType' on the message must be of type 'string'",
      title: "contentType is of invalid type",
    },
    {
      message: { body: "", subject: 1 as any },
      expectedErrorMessage: "The property 'label' on the message must be of type 'string'",
      title: "label is of invalid type",
    },
    {
      message: { body: "", to: 1 as any },
      expectedErrorMessage: "The property 'to' on the message must be of type 'string'",
      title: "to is of invalid type",
    },
    {
      message: { body: "", replyToSessionId: 1 as any },
      expectedErrorMessage:
        "The property 'replyToSessionId' on the message must be of type 'string'",
      title: "replyToSessionId is of invalid type",
    },
    {
      message: { body: "", sessionId: 1 as any },
      expectedErrorMessage: "The property 'sessionId' on the message must be of type 'string'",
      title: "sessionId is of invalid type",
    },
    {
      message: { body: "", replyTo: 1 as any },
      expectedErrorMessage: "The property 'replyTo' on the message must be of type 'string'",
      title: "replyTo is of invalid type",
    },
    {
      message: { body: "", timeToLive: "" as any },
      expectedErrorMessage: "The property 'timeToLive' on the message must be of type 'number'",
      title: "timeToLive is of invalid type",
    },
    {
      message: { body: "", partitionKey: longString },
      expectedErrorMessage:
        "Length of 'partitionKey' property on the message cannot be greater than 128 characters.",
      title: "partitionKey is longer than 128 characters",
    },
    // {
    //   message: { body: "", viaPartitionKey: longString },
    //   expectedErrorMessage:
    //     "Length of 'viaPartitionKey' property on the message cannot be greater than 128 characters.",
    //   title: "viaPartitionKey is longer than 128 characters"
    // },
    {
      message: { body: "", sessionId: longString },
      expectedErrorMessage:
        "Length of 'sessionId' property on the message cannot be greater than 128 characters.",
      title: "sessionId is longer than 128 characters",
    },
    {
      message: { body: "", messageId: longString },
      expectedErrorMessage:
        "Length of 'messageId' property on the message cannot be greater than 128 characters.",
      title: "messageId is longer than 128 characters",
    },
    {
      message: { body: "", messageId: {} as any },
      expectedErrorMessage:
        "The property 'messageId' on the message must be of type string, number or Buffer",
      title: "messageId is of invalid type",
    },
    {
      message: { body: "", correlationId: {} as any },
      expectedErrorMessage:
        "The property 'correlationId' on the message must be of type string, number or Buffer",
      title: "correlationId is of invalid type",
    },
  ];

  testInputs.forEach(function (testInput: {
    message: ServiceBusMessage;
    expectedErrorMessage: string;
    title?: string;
  }): void {
    it("SendMessages() throws if (" + testInput.title + ")", async function (): Promise<void> {
      let actualErrorMsg = "";

      await sender.sendMessages(testInput.message).catch((err) => {
        actualErrorMsg = err.message;
      });

      should.equal(actualErrorMsg, testInput.expectedErrorMessage, "Error not thrown as expected");
    });

    // sendBatch(<Array of messages>) - Commented
    // it(
    //   "SendBatch() throws if in the first message, " + testInput.title,
    //   async function(): Promise<void> {
    //     let actualErrorMsg = "";
    //     await sender.sendBatch([testInput.message, { body: "random" }]).catch((err) => {
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
    //     await sender.sendBatch([{ body: "random" }, testInput.message]).catch((err) => {
    //       actualErrorMsg = err.message;
    //     });
    //     should.equal(
    //       actualErrorMsg,
    //       testInput.expectedErrorMessage,
    //       "Error not thrown as expected"
    //     );
    //   }
    // );

    it("ScheduleMessages() throws if " + testInput.title, async function (): Promise<void> {
      let actualErrorMsg = "";
      let actualErr;
      await sender.scheduleMessages(testInput.message, new Date()).catch((err) => {
        actualErr = err;
        actualErrorMsg = err.message;
      });
      should.equal(actualErrorMsg, testInput.expectedErrorMessage, actualErr);
    });
  });
});
