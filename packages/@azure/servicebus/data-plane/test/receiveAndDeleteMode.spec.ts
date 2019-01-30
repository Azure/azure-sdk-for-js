// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  Namespace,
  QueueClient,
  TopicClient,
  SubscriptionClient,
  SessionReceiver,
  ServiceBusMessage,
  delay,
  SendableMessageInfo,
  ReceiveMode
} from "../lib";

import { DispositionType } from "../lib/serviceBusMessage";

import {
  testSimpleMessages,
  testMessagesWithSessions,
  testSessionId,
  getSenderClient,
  getReceiverClient,
  ClientType,
  purge
} from "./testUtils";

import { Receiver } from "../lib/receiver";
import { Sender } from "../lib/sender";

async function testPeekMsgsLength(
  client: QueueClient | SubscriptionClient,
  expectedPeekLength: number
): Promise<void> {
  const peekedMsgs = await client.peek(expectedPeekLength + 1);
  should.equal(
    peekedMsgs.length,
    expectedPeekLength,
    "Unexpected number of msgs found when peeking"
  );
}

let ns: Namespace;

let errorWasThrown: boolean;

let senderClient: QueueClient | TopicClient;
let receiverClient: QueueClient | SubscriptionClient;
let sender: Sender;
let receiver: Receiver | SessionReceiver;

async function beforeEachTest(
  senderType: ClientType,
  receiverType: ClientType,
  useSessions?: boolean
): Promise<void> {
  // The tests in this file expect the env variables to contain the connection string and
  // the names of empty queue/topic/subscription that are to be tested

  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }

  ns = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

  senderClient = getSenderClient(ns, senderType);
  receiverClient = getReceiverClient(ns, receiverType);

  await purge(receiverClient, useSessions);
  const peekedMsgs = await receiverClient.peek();
  const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }

  sender = senderClient.getSender();
  receiver = useSessions
    ? await receiverClient.getSessionReceiver({
        sessionId: testSessionId,
        receiveMode: ReceiveMode.receiveAndDelete
      })
    : receiverClient.getReceiver({ receiveMode: ReceiveMode.receiveAndDelete });

  errorWasThrown = false;
}

async function afterEachTest(): Promise<void> {
  await ns.close();
}

describe("ReceiveBatch from Queue/Subscription", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function sendReceiveMsg(testMessages: SendableMessageInfo[]): Promise<void> {
    await sender.send(testMessages[0]);
    const msgs = await receiver.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgs[0].messageId, testMessages[0].messageId);
    should.equal(msgs[0].deliveryCount, 0);
  }

  async function testNoSettlement(useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    await sendReceiveMsg(testMessages);

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queues: No settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testNoSettlement();
  });

  it("Partitioned Topics and Subscription: No settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testNoSettlement();
  });

  /*it("Unpartitioned Queues: No settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testNoSettlement();
  });

  it("Unpartitioned Topics and Subscription: No settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testNoSettlement();
  });*/

  it("Partitioned Queues with Sessions: No settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testNoSettlement(true);
  });

  it("Partitioned Topics and Subscription with Sessions: No settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testNoSettlement(true);
  });

  it("Unpartitioned Queues with Sessions: No settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testNoSettlement(true);
  });

  it("Unpartitioned Topics and Subscription with Sessions: No settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testNoSettlement(true);
  });
});

describe("Streaming Receiver from Queue/Subscription", function(): void {
  let errorFromErrorHandler: Error | undefined;

  afterEach(async () => {
    await afterEachTest();
  });

  async function sendReceiveMsg(
    testMessages: SendableMessageInfo[],
    autoCompleteFlag: boolean,
    useSessions?: boolean
  ): Promise<void> {
    await sender.send(testMessages[0]);
    const receivedMsgs: ServiceBusMessage[] = [];

    receiver.receive(
      (msg: ServiceBusMessage) => {
        receivedMsgs.push(msg);
        return Promise.resolve();
      },
      (err: Error) => {
        if (err) {
          errorFromErrorHandler = err;
        }
      },
      { autoComplete: autoCompleteFlag }
    );

    await delay(2000);

    should.equal(receivedMsgs.length, 1);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);
    should.equal(receivedMsgs[0].body, testMessages[0].body);
    should.equal(receivedMsgs[0].messageId, testMessages[0].messageId);

    should.equal(
      errorFromErrorHandler,
      undefined,
      errorFromErrorHandler && errorFromErrorHandler.message
    );

    await testPeekMsgsLength(receiverClient, 0);
  }

  async function testNoSettlement(autoCompleteFlag: boolean, useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    await sendReceiveMsg(testMessages, autoCompleteFlag, useSessions);

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queues: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testNoSettlement(true);
  });

  it("Partitioned Topics and Subscription: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testNoSettlement(true);
  });

  /* it("Unpartitioned Queues: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testNoSettlement(true);
  });

  it("Unpartitioned Topics and Subscription: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testNoSettlement(true);
  });*/

  it("Partitioned Queues with Sessions: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testNoSettlement(true, true);
  });

  it("Partitioned Topics and Subscription with Sessions: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testNoSettlement(true, true);
  });

  it("Unpartitioned Queues with Sessions: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testNoSettlement(true, true);
  });

  it("Unpartitioned Topics and Subscription with Sessions: With auto-complete enabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testNoSettlement(true, true);
  });

  it("Partitioned Queues: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testNoSettlement(false);
  });

  it("Partitioned Topics and Subscription: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testNoSettlement(false);
  });

  /* it("Unpartitioned Queues: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testNoSettlement(false);
  });

  it("Unpartitioned Topics and Subscription: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testNoSettlement(false);
  });*/

  it("Partitioned Queues with Sessions: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testNoSettlement(false, true);
  });

  it("Partitioned Topics and Subscription with Sessions: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testNoSettlement(false, true);
  });

  it("Unpartitioned Queues with Sessions: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testNoSettlement(false, true);
  });

  it("Unpartitioned Topics and Subscription with Sessions: With auto-complete disabled, no settlement of the message removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testNoSettlement(false, true);
  });
});

describe("Throws error when Complete/Abandon/Defer/Deadletter/RenewLock of message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });
  async function sendReceiveMsg(testMessages: SendableMessageInfo[]): Promise<ServiceBusMessage> {
    await sender.send(testMessages[0]);
    const msgs = await receiver.receiveBatch(1);

    should.equal(Array.isArray(msgs), true);
    should.equal(msgs.length, 1);
    should.equal(msgs[0].body, testMessages[0].body);
    should.equal(msgs[0].messageId, testMessages[0].messageId);
    should.equal(msgs[0].deliveryCount, 0);

    return msgs[0];
  }

  const testError = (err: Error) => {
    should.equal(err.message, "The operation is only supported in 'PeekLock' receive mode.");
    errorWasThrown = true;
  };

  async function testSettlement(operation: DispositionType, useSessions?: boolean): Promise<void> {
    const testMessages = useSessions ? testMessagesWithSessions : testSimpleMessages;
    const msg = await sendReceiveMsg(testMessages);

    if (operation === DispositionType.complete) {
      await msg.complete().catch((err) => testError(err));
    } else if (operation === DispositionType.abandon) {
      await msg.abandon().catch((err) => testError(err));
    } else if (operation === DispositionType.deadletter) {
      await msg.deadLetter().catch((err) => testError(err));
    } else if (operation === DispositionType.defer) {
      await msg.defer().catch((err) => testError(err));
    }

    should.equal(errorWasThrown, true);

    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queues: complete() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testSettlement(DispositionType.complete);
  });

  it("Partitioned Topics and Subscription: complete() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testSettlement(DispositionType.complete);
  });

  /* it("Unpartitioned Queues: complete() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.complete);
  });

  it("Unpartitioned Topics and Subscription: complete() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testSettlement(DispositionType.complete);
  });*/

  it("Partitioned Queues with Sessions: complete() throws error", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testSettlement(DispositionType.complete, true);
  });

  it("Partitioned Topics and Subscription with Sessions: complete() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testSettlement(DispositionType.complete, true);
  });

  it("Unpartitioned Queues with Sessions: complete() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testSettlement(DispositionType.complete, true);
  });

  it("Unpartitioned Topics and Subscription with Sessions: complete() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testSettlement(DispositionType.complete, true);
  });

  it("Partitioned Queues: abandon() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testSettlement(DispositionType.abandon);
  });

  it("Partitioned Topics and Subscription: abandon() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testSettlement(DispositionType.abandon);
  });

  /* it("Unpartitioned Queues: abandon() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.abandon);
  });

  it("Unpartitioned Topics and Subscription: abandon() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testSettlement(DispositionType.abandon);
  });*/

  it("Partitioned Queues with Sessions: abandon() throws error", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testSettlement(DispositionType.abandon, true);
  });

  it("Partitioned Topics and Subscription with Sessions: abandon() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testSettlement(DispositionType.abandon, true);
  });

  it("Unpartitioned Queues with Sessions: abandon() throws error", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testSettlement(DispositionType.abandon, true);
  });

  it("Unpartitioned Topics and Subscription with Sessions: abandon() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testSettlement(DispositionType.abandon, true);
  });

  it("Partitioned Queues: defer() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testSettlement(DispositionType.defer);
  });

  it("Partitioned Topics and Subscription: defer() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testSettlement(DispositionType.defer);
  });

  /* it("Unpartitioned Queues: defer() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.defer);
  });

  it("Unpartitioned Topics and Subscription: defer() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testSettlement(DispositionType.defer);
  });*/

  it("Partitioned Queues with Sessions: defer() throws error", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testSettlement(DispositionType.defer, true);
  });

  it("Partitioned Topics and Subscription with Sessions: defer() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testSettlement(DispositionType.defer, true);
  });

  it("Unpartitioned Queues with Sessions: defer() throws error", async function(): Promise<void> {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testSettlement(DispositionType.defer, true);
  });

  it("Unpartitioned Topics and Subscription with Sessions: defer() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testSettlement(DispositionType.defer, true);
  });

  it("Partitioned Queues: deadLetter() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testSettlement(DispositionType.deadletter);
  });

  it("Partitioned Topics and Subscription: deadLetter() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testSettlement(DispositionType.deadletter);
  });

  /* it("Unpartitioned Queues: deadLetter() throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.deadletter);
  });

  it("Unpartitioned Topics and Subscription: deadLetter() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testSettlement(DispositionType.deadletter);
  });*/

  it("Partitioned Queues with Sessions: deadLetter() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );
    await testSettlement(DispositionType.deadletter, true);
  });

  it("Partitioned Topics and Subscription with Sessions: deadLetter() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );
    await testSettlement(DispositionType.deadletter, true);
  });

  it("Unpartitioned Queues with Sessions: deadLetter() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );
    await testSettlement(DispositionType.deadletter, true);
  });

  it("Unpartitioned Topics and Subscription with Sessions: deadLetter() throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );
    await testSettlement(DispositionType.deadletter, true);
  });

  async function testRenewLock(): Promise<void> {
    const msg = await sendReceiveMsg(testSimpleMessages);

    await receiver.renewLock(msg).catch((err) => testError(err));

    should.equal(errorWasThrown, true);
  }

  it("Partitioned Queue: Renew message lock throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);
    await testRenewLock();
  });

  it("Partitioned Subscription: Renew message lock throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);
    await testRenewLock();
  });

  /* it("Unpartitioned Queues: Renew message lock throws error", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);
    await testRenewLock();
  });

  it("Unpartitioned Topics and Subscription: Renew message lock throws error", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);
    await testRenewLock();
  });*/
});
