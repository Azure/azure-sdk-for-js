// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
const expect = chai.expect;
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { ReceivedMessage, Receiver, ServiceBusMessage } from "../src";

import { TestClientType, TestMessage, checkWithTimeout } from "./utils/testUtils";

import { getErrorMessageNotSupportedInReceiveAndDeleteMode } from "../src/util/errors";
import { Sender } from "../src/sender";
import {
  EntityName,
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength
} from "./utils/testutils2";
import { DispositionType, ReceivedMessageWithLock } from "../src/serviceBusMessage";

let errorWasThrown: boolean;

describe("receive and delete", () => {
  let sender: Sender;
  let receiver: Receiver<ReceivedMessage>;
  let serviceBusClient: ServiceBusClientForTests;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(
    entityType: TestClientType,
    receiveMode?: "peekLock" | "receiveAndDelete"
  ): Promise<EntityName> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
    if (receiveMode === "peekLock") {
      receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);
    } else {
      receiver = await serviceBusClient.test.getReceiveAndDeleteReceiver(entityNames);
    }

    errorWasThrown = false;
    return entityNames;
  }

  function afterEachTest(): Promise<void> {
    return serviceBusClient.test.afterEach();
  }

  describe("Batch Receiver in ReceiveAndDelete mode", function(): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function sendReceiveMsg(testMessages: ServiceBusMessage): Promise<void> {
      await sender.sendMessages(testMessages);
      const msgs = await receiver.receiveMessages(1);

      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs.length, 1, "Unexpected number of messages");
      should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
      should.equal(
        msgs[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );
      should.equal(msgs[0].deliveryCount, 0, "DeliveryCount is different than expected");
    }

    async function testNoSettlement(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      await sendReceiveMsg(testMessages);

      await testPeekMsgsLength(receiver, 0);
    }

    it("Partitioned Queue: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testNoSettlement();
    });

    it("Partitioned Subscription: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testNoSettlement();
    });

    /* it("Unpartitioned Queue: No settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testNoSettlement();
  });

  it("Unpartitioned Subscription: No settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testNoSettlement();
  });*/

    it("Partitioned Queue with Sessions: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testNoSettlement(true);
    });

    it("Partitioned Subscription with Sessions: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testNoSettlement(true);
    });

    it("Unpartitioned Queue with Sessions: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testNoSettlement(true);
    });

    it("Unpartitioned Subscription with Sessions: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testNoSettlement(true);
    });
  });

  describe("Streaming Receiver in ReceiveAndDelete mode", function(): void {
    let errorFromErrorHandler: Error | undefined;

    afterEach(async () => {
      await afterEachTest();
    });

    async function sendReceiveMsg(
      testMessages: ServiceBusMessage,
      autoCompleteFlag: boolean
    ): Promise<void> {
      await sender.sendMessages(testMessages);

      const errors: string[] = [];
      const receivedMsgs: ReceivedMessage[] = [];

      receiver.subscribe(
        {
          async processMessage(message: ReceivedMessage): Promise<void> {
            receivedMsgs.push(message);
          },
          async processError(err: Error): Promise<void> {
            errors.push(err.message);
          }
        },
        { autoComplete: autoCompleteFlag }
      );

      const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
      should.equal(msgsCheck, true, "Could not receive the messages in expected time.");

      should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
      should.equal(
        receivedMsgs[0].body,
        testMessages.body,
        "MessageBody is different than expected"
      );
      should.equal(
        receivedMsgs[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );

      should.equal(
        errorFromErrorHandler,
        undefined,
        errorFromErrorHandler && errorFromErrorHandler.message
      );

      await testPeekMsgsLength(receiver, 0);
    }

    async function testNoSettlement(
      autoCompleteFlag: boolean,
      useSessions?: boolean
    ): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      await sendReceiveMsg(testMessages, autoCompleteFlag);

      await testPeekMsgsLength(receiver, 0);
    }

    it("Partitioned Queue: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testNoSettlement(true);
    });

    it("Partitioned Subscription: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testNoSettlement(true);
    });

    /* it("Unpartitioned Queue: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testNoSettlement(true);
  });

  it("Unpartitioned Subscription: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testNoSettlement(true);
  });*/

    it("Partitioned Queue with Sessions: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testNoSettlement(true, true);
    });

    it("Partitioned Subscription with Sessions: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testNoSettlement(true, true);
    });

    it("Unpartitioned Queue with Sessions: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testNoSettlement(true, true);
    });

    it("Unpartitioned Subscription with Sessions: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testNoSettlement(true, true);
    });

    it("Partitioned Queue: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testNoSettlement(false);
    });

    it("Partitioned Subscription: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testNoSettlement(false);
    });

    /* it("Unpartitioned Queue: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testNoSettlement(false);
  });

  it("Unpartitioned Subscription: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testNoSettlement(false);
  });*/

    it("Partitioned Queue with Sessions: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testNoSettlement(false, true);
    });

    it("Partitioned Subscription with Sessions: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testNoSettlement(false, true);
    });

    it("Unpartitioned Queue with Sessions: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await testNoSettlement(false, true);
    });

    it("Unpartitioned Subscription with Sessions: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions);
      await testNoSettlement(false, true);
    });
  });

  describe("Settlement with ReceiveAndDelete mode", () => {
    afterEach(async () => {
      await afterEachTest();
    });

    async function sendReceiveMsg(testMessages: ServiceBusMessage): Promise<ReceivedMessage> {
      await sender.sendMessages(testMessages);
      const msgs = await receiver.receiveMessages(1);

      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs.length, 1, "Unexpected number of messages");
      should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
      should.equal(
        msgs[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );
      should.equal(msgs[0].deliveryCount, 0, "DeliveryCount is different than expected");

      return msgs[0];
    }

    const testError = (err: Error, operation: DispositionType): void => {
      expect(err.message.toLowerCase(), "ErrorMessage is different than expected").includes(
        `failed to ${operation} the message as the operation is only supported in \'peeklock\' receive mode.`
      );
    };

    async function testSettlement(
      operation: DispositionType,
      useSessions?: boolean
    ): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      // we have to force this cast - the type system doesn't allow this if you've chosen receiveAndDelete
      // as your lock mode.
      const msg = (await sendReceiveMsg(testMessages)) as ReceivedMessageWithLock;

      try {
        if (operation === DispositionType.complete) {
          await msg.complete();
        } else if (operation === DispositionType.abandon) {
          await msg.abandon();
        } else if (operation === DispositionType.deadletter) {
          await msg.deadLetter();
        } else if (operation === DispositionType.defer) {
          await msg.defer();
        }
      } catch (err) {
        errorWasThrown = true;
        testError(err, operation);
      }

      should.equal(errorWasThrown, true, "Error thrown flag must be true");

      await testPeekMsgsLength(receiver, 0);
    }

    it("Partitioned Queue: complete() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSettlement(DispositionType.complete);
    });

    it("Partitioned Subscription: complete() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSettlement(DispositionType.complete);
    });

    /* it("Unpartitioned Queue: complete() throws error", async function(): Promise<void> {
      await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
      await testSettlement(DispositionType.complete);
    });

    it("Unpartitioned Subscription: complete() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
      await testSettlement(DispositionType.complete);
    });*/

    it("Partitioned Queue with Sessions: complete() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSettlement(DispositionType.complete, true);
    });

    it("Partitioned Subscription with Sessions: complete() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSettlement(DispositionType.complete, true);
    });

    it("Partitioned Queue: abandon() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSettlement(DispositionType.abandon);
    });

    it("Partitioned Subscription: abandon() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSettlement(DispositionType.abandon);
    });

    /* it("Unpartitioned Queue: abandon() throws error", async function(): Promise<void> {
      await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
      await testSettlement(DispositionType.abandon);
    });

    it("Unpartitioned Subscription: abandon() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
      await testSettlement(DispositionType.abandon);
    });*/

    it("Partitioned Queue with Sessions: abandon() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSettlement(DispositionType.abandon, true);
    });

    it("Partitioned Subscription with Sessions: abandon() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSettlement(DispositionType.abandon, true);
    });

    it("Partitioned Queue: defer() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSettlement(DispositionType.defer);
    });

    it("Partitioned Subscription: defer() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSettlement(DispositionType.defer);
    });

    /* it("Unpartitioned Queue: defer() throws error", async function(): Promise<void> {
      await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
      await testSettlement(DispositionType.defer);
    });

    it("Unpartitioned Subscription: defer() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
      await testSettlement(DispositionType.defer);
    });*/

    it("Partitioned Queue with Sessions: defer() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSettlement(DispositionType.defer, true);
    });

    it("Partitioned Subscription with Sessions: defer() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSettlement(DispositionType.defer, true);
    });

    it("Partitioned Queue: deadLetter() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSettlement(DispositionType.deadletter);
    });

    it("Partitioned Subscription: deadLetter() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSettlement(DispositionType.deadletter);
    });

    /* it("Unpartitioned Queue: deadLetter() throws error", async function(): Promise<void> {
      await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
      await testSettlement(DispositionType.deadletter);
    });

    it("Unpartitioned Subscription: deadLetter() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
      await testSettlement(DispositionType.deadletter);
    });*/

    it("Partitioned Queue with Sessions: deadLetter() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSettlement(DispositionType.deadletter, true);
    });

    it("Partitioned Subscription with Sessions: deadLetter() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSettlement(DispositionType.deadletter, true);
    });

    it("Partitioned Subscription: complete() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSettlement(DispositionType.complete);
    });

    /* it("Unpartitioned Queue: complete() throws error", async function(): Promise<void> {
      await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
      await testSettlement(DispositionType.complete);
    });

    it("Unpartitioned Subscription: complete() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
      await testSettlement(DispositionType.complete);
    });*/

    it("Partitioned Queue with Sessions: complete() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSettlement(DispositionType.complete, true);
    });

    it("Partitioned Subscription with Sessions: complete() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSettlement(DispositionType.complete, true);
    });

    it("Partitioned Queue: abandon() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSettlement(DispositionType.abandon);
    });

    it("Partitioned Subscription: abandon() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSettlement(DispositionType.abandon);
    });

    /* it("Unpartitioned Queue: abandon() throws error", async function(): Promise<void> {
      await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
      await testSettlement(DispositionType.abandon);
    });

    it("Unpartitioned Subscription: abandon() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
      await testSettlement(DispositionType.abandon);
    });*/

    it("Partitioned Queue with Sessions: abandon() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSettlement(DispositionType.abandon, true);
    });

    it("Partitioned Subscription with Sessions: abandon() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSettlement(DispositionType.abandon, true);
    });

    it("Partitioned Queue: defer() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSettlement(DispositionType.defer);
    });

    it("Partitioned Subscription: defer() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSettlement(DispositionType.defer);
    });

    /* it("Unpartitioned Queue: defer() throws error", async function(): Promise<void> {
      await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
      await testSettlement(DispositionType.defer);
    });

    it("Unpartitioned Subscription: defer() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
      await testSettlement(DispositionType.defer);
    });*/

    it("Partitioned Queue with Sessions: defer() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSettlement(DispositionType.defer, true);
    });

    it("Partitioned Subscription with Sessions: defer() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSettlement(DispositionType.defer, true);
    });

    it("Partitioned Queue: deadLetter() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testSettlement(DispositionType.deadletter);
    });

    it("Partitioned Subscription: deadLetter() throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testSettlement(DispositionType.deadletter);
    });

    /* it("Unpartitioned Queue: deadLetter() throws error", async function(): Promise<void> {
      await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
      await testSettlement(DispositionType.deadletter);
    });

    it("Unpartitioned Subscription: deadLetter() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
      await testSettlement(DispositionType.deadletter);
    });*/

    it("Partitioned Queue with Sessions: deadLetter() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedQueueWithSessions);
      await testSettlement(DispositionType.deadletter, true);
    });

    it("Partitioned Subscription with Sessions: deadLetter() throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscriptionWithSessions);
      await testSettlement(DispositionType.deadletter, true);
    });

    async function testRenewLock(): Promise<void> {
      const msg = await sendReceiveMsg(TestMessage.getSample());

      // have to cast it - the type system doesn't allow us to call into this method otherwise.
      await (msg as ReceivedMessageWithLock).renewLock().catch((err) => {
        should.equal(
          err.message,
          getErrorMessageNotSupportedInReceiveAndDeleteMode("renew the lock on the message"),
          "ErrorMessage is different than expected"
        );
        errorWasThrown = true;
      });

      should.equal(errorWasThrown, true, "Error thrown flag must be true");
    }

    it("Partitioned Queue: Renew message lock throws error", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue);
      await testRenewLock();
    });

    it("Partitioned Subscription: Renew message lock throws error", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.PartitionedSubscription);
      await testRenewLock();
    });
  });

  /* it("Unpartitioned Queue: Renew message lock throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testRenewLock();
  });

  it("Unpartitioned Subscription: Renew message lock throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testRenewLock();
  });*/

  describe("Receive Deferred messages in ReceiveAndDelete mode", function(): void {
    let sequenceNumber: Long;

    afterEach(async () => {
      await afterEachTest();
    });
    async function deferMessage(useSessions?: boolean): Promise<void> {
      const testMessages = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
      await sender.sendMessages(testMessages);
      const batch = await receiver.receiveMessages(1);
      const msgs = batch;

      should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
      should.equal(msgs.length, 1, "Unexpected number of messages");
      should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
      should.equal(
        msgs[0].messageId,
        testMessages.messageId,
        "MessageId is different than expected"
      );
      should.equal(msgs[0].deliveryCount, 0, "DeliveryCount is different than expected");

      sequenceNumber = msgs[0].sequenceNumber!;
      await (msgs[0] as ReceivedMessageWithLock).defer();
    }

    async function receiveDeferredMessage(): Promise<void> {
      const [deferredMsg] = await receiver.receiveDeferredMessages(sequenceNumber);
      if (!deferredMsg) {
        throw `No message received for sequence number ${sequenceNumber}`;
      }

      should.equal(deferredMsg!.deliveryCount, 1, "DeliveryCount is different than expected");
      await testPeekMsgsLength(receiver, 0);
    }

    /* it("Partitioned Queue: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedQueue,
        TestClientType.PartitionedQueue,
        undefined,
        ReceiveMode.peekLock
      );
      await deferMessage();
      await receiver.close();
      receiver = receiver.createReceiver(ReceiveMode.receiveAndDelete);
      await receiveDeferredMessage();
    });

    it("Partitioned Subscription: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.PartitionedTopic,
        TestClientType.PartitionedSubscription,
        undefined,
        ReceiveMode.peekLock
      );
      await deferMessage();
      await receiver.close();
      receiver = receiver.createReceiver(ReceiveMode.receiveAndDelete);
      await receiveDeferredMessage();
    }); */

    async function deferAndReceiveMessage(testClientType: TestClientType) {
      const entityNames = await beforeEachTest(testClientType, "peekLock");
      await deferMessage(entityNames.usesSessions);
      await receiver.close();
      receiver = await serviceBusClient.test.getReceiveAndDeleteReceiver(entityNames);
      await receiveDeferredMessage();
    }

    it("Unpartitioned Queue: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await deferAndReceiveMessage(TestClientType.UnpartitionedQueue);
    });

    it("Unpartitioned Subscription: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await deferAndReceiveMessage(TestClientType.UnpartitionedSubscription);
    });

    it("Partitioned Queue with Sessions: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await deferAndReceiveMessage(TestClientType.PartitionedQueueWithSessions);
    });

    it("Partitioned Subscription with Sessions: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await deferAndReceiveMessage(TestClientType.PartitionedSubscriptionWithSessions);
    });

    it("Unpartitioned Queue with Sessions: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await deferAndReceiveMessage(TestClientType.UnpartitionedQueueWithSessions);
    });

    it("Unpartitioned Subscription with Sessions: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await deferAndReceiveMessage(TestClientType.UnpartitionedSubscriptionWithSessions);
    });
  });
});
