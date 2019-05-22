// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import * as dotenv from "dotenv";
import long from "long";
import {
  delay,
  QueueClient,
  ReceiveMode,
  Receiver,
  Sender,
  ServiceBusClient,
  SessionReceiver,
  SubscriptionClient,
  TopicClient,
  ServiceBusMessage
} from "../../src";
import {
  getClientClosedErrorMsg,
  getOpenReceiverErrorMsg,
  getOpenSenderErrorMsg,
  getReceiverClosedErrorMsg,
  getSenderClosedErrorMsg
} from "../../src/util/errors";
import { TestClientType, getSenderReceiverClients, purge, TestMessage } from "./testUtils";
import { ClientType } from "../../src/client";
import { throwIfMessageCannotBeSettled, DispositionType } from "../../src/serviceBusMessage";
const should = chai.should();
dotenv.config();
chai.use(chaiAsPromised);

describe("Create ServiceBusClient and Queue/Topic/Subscription Clients", function(): void {
  let namespace: ServiceBusClient;

  afterEach(async () => {
    if (namespace) {
      await namespace.close();
    }
  });

  it("Creates an Namespace from a connection string", function(): void {
    namespace = ServiceBusClient.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
    namespace.should.be.an.instanceof(ServiceBusClient);
    should.equal(namespace.name, "sb://a/", "Name of the namespace is different than expected");
  });

  it("Creates clients after coercing name to string", function(): void {
    namespace = ServiceBusClient.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
    const queueClient = namespace.createQueueClient(1 as any);
    should.equal(queueClient.entityPath, "1");

    const topicClient = namespace.createTopicClient(1 as any);
    should.equal(topicClient.entityPath, "1");

    const subscriptionClient = namespace.createSubscriptionClient(1 as any, 2 as any);
    should.equal(subscriptionClient.entityPath, "1/Subscriptions/2");
  });

  it("Missing tokenProvider in createFromTokenProvider", function(): void {
    let caughtError: Error | undefined;
    try {
      namespace = ServiceBusClient.createFromTokenProvider("somestring", undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "tokenProvider"`);
  });

  it("Coerces input to string for host in createFromTokenProvider", function(): void {
    namespace = ServiceBusClient.createFromTokenProvider(123 as any, {} as any);
    should.equal(namespace.name, "sb://123/", "Name of the namespace is different than expected");
  });
});

describe("Errors with non existing Namespace", function(): void {
  let namespace: ServiceBusClient;
  let errorWasThrown: boolean;
  beforeEach(() => {
    namespace = ServiceBusClient.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
    errorWasThrown = false;
  });
  afterEach(() => {
    return namespace.close();
  });

  const testError = (err: Error) => {
    should.equal(err.name, "ServiceCommunicationError", "ErrorName is different than expected");
    errorWasThrown = true;
  };

  it("throws error when sending data via a queueClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending data via a topicClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createTopicClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending batch data via a queueClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch(testError);
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending batch data via a topicClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createTopicClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving batch data via a queueClient from a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    const receiver = await client.createReceiver(ReceiveMode.peekLock);
    await receiver.receiveMessages(10).catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving batch data via a subscriptionClient from a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createSubscriptionClient("some-topic-name", "some-subscription-name");
    const receiver = await client.createReceiver(ReceiveMode.peekLock);
    await receiver.receiveMessages(10).catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving streaming data via a queueClient from a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    const onMessage = async () => {
      throw "onMessage should not have been called when receive call is made from a non existing namespace";
    };

    const receiver = await client.createReceiver(ReceiveMode.peekLock);
    receiver.registerMessageHandler(onMessage, testError);

    await delay(3000);
    await client.close();
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });
});

describe("Errors with non existing Queue/Topic/Subscription", async function(): Promise<void> {
  let namespace: ServiceBusClient;
  let errorWasThrown: boolean;
  beforeEach(() => {
    // @ts-ignore
    if (!window.__env__["SERVICEBUS_CONNECTION_STRING"]) {
      throw "define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests.";
    }

    namespace = ServiceBusClient.createFromConnectionString(
      // @ts-ignore
      window.__env__["SERVICEBUS_CONNECTION_STRING"]
    );
    errorWasThrown = false;
  });
  afterEach(() => {
    return namespace.close();
  });

  const testError = (err: Error, entityPath: string) => {
    should.equal(err.name, "MessagingEntityNotFoundError", "ErrorName is different than expected");
    should.equal(
      err.message.startsWith(
        `The messaging entity '${namespace.name}${entityPath}' could not be found.`
      ),
      true
    );
    errorWasThrown = true;
  };

  it("throws error when sending data to a non existing queue", async function(): Promise<void> {
    const client = namespace.createQueueClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending data to a non existing topic", async function(): Promise<void> {
    const client = namespace.createTopicClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending batch data to a non existing queue", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending batch data to a non existing topic", async function(): Promise<
    void
  > {
    const client = namespace.createTopicClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receiving batch data from a non existing queue", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    const receiver = await client.createReceiver(ReceiveMode.peekLock);
    await receiver.receiveMessages(1).catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receiving batch data from a non existing subscription", async function(): Promise<
    void
  > {
    const client = namespace.createSubscriptionClient("some-topic-name", "some-subscription-name");
    const receiver = await client.createReceiver(ReceiveMode.peekLock);
    await receiver
      .receiveMessages(1)
      .catch((err) => testError(err, "some-topic-name/Subscriptions/some-subscription-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving streaming data from a non existing queue", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    const receiver = await client.createReceiver(ReceiveMode.peekLock);
    const onMessage = async () => {
      throw "onMessage should not have been called when receive call is made from a non existing namespace";
    };
    receiver.registerMessageHandler(onMessage, (err) => testError(err, "some-name"));

    await delay(3000);
    await client.close();
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving streaming data from a non existing subscription", async function(): Promise<
    void
  > {
    const client = namespace.createSubscriptionClient("some-topic-name", "some-subscription-name");
    const receiver = await client.createReceiver(ReceiveMode.peekLock);
    const onMessage = async () => {
      throw "onMessage should not have been called when receive call is made from a non existing namespace";
    };
    receiver.registerMessageHandler(onMessage, (err) =>
      testError(err, "some-topic-name/Subscriptions/some-subscription-name")
    );

    await delay(3000);
    await client.close();
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });
});

describe("Errors after close()", function(): void {
  let namespace: ServiceBusClient;
  let senderClient: QueueClient | TopicClient;
  let receiverClient: QueueClient | SubscriptionClient;
  let sender: Sender;
  let receiver: Receiver | SessionReceiver;
  let receivedMessage: ServiceBusMessage;

  afterEach(() => {
    return namespace.close();
  });

  async function beforeEachTest(
    senderType: TestClientType,
    receiverType: TestClientType,
    entityToClose: string,
    useSessions?: boolean
  ): Promise<void> {
    // @ts-ignore
    if (!window.__env__["SERVICEBUS_CONNECTION_STRING"]) {
      throw new Error(
        "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
      );
    }

    namespace = ServiceBusClient.createFromConnectionString(
      // @ts-ignore
      window.__env__["SERVICEBUS_CONNECTION_STRING"]
    );

    const clients = await getSenderReceiverClients(namespace, senderType, receiverType);
    senderClient = clients.senderClient;
    receiverClient = clients.receiverClient;

    await purge(receiverClient, useSessions ? TestMessage.sessionId : undefined);
    const peekedMsgs = await receiverClient.peek();
    const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
    if (peekedMsgs.length) {
      chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
    }

    sender = senderClient.createSender();
    if (useSessions) {
      receiver = receiverClient.createReceiver(ReceiveMode.peekLock, {
        sessionId: TestMessage.sessionId
      });
    } else {
      receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
    }

    // Normal send/receive
    const testMessage = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    await sender.send(testMessage);
    const receivedMsgs = await receiver.receiveMessages(1, 3);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages received");
    receivedMessage = receivedMsgs[0];

    // close(), so that we can then test the resulting error.
    switch (entityToClose) {
      case "namespace":
        await namespace.close();
        break;
      case "senderClient":
        await senderClient.close();
        break;
      case "receiverClient":
        await receiverClient.close();
        break;
      case "sender":
        await sender.close();
        break;
      case "receiver":
        await receiver.close();
        break;
      default:
        break;
    }
  }

  /**
   * Tests the error from settling a message after the receiver is closed
   */
  async function testAllDispositions(): Promise<void> {
    await testDisposition(DispositionType.complete);
    await testDisposition(DispositionType.abandon);
    await testDisposition(DispositionType.defer);
    await testDisposition(DispositionType.deadletter);
  }

  async function testDisposition(operation: DispositionType): Promise<void> {
    let caughtError: Error | undefined;
    let expectedError: Error | undefined;

    try {
      switch (operation) {
        case DispositionType.complete:
          await receivedMessage.complete();
          break;
        case DispositionType.abandon:
          await receivedMessage.abandon();
          break;
        case DispositionType.defer:
          await receivedMessage.defer();
          break;
        case DispositionType.deadletter:
          await receivedMessage.deadLetter();
          break;

        default:
          break;
      }
    } catch (error) {
      caughtError = error;
    }

    try {
      throwIfMessageCannotBeSettled(
        undefined,
        operation,
        receivedMessage.isSettled,
        receivedMessage.sessionId
      );
    } catch (error) {
      expectedError = error;
    }

    should.equal(caughtError && caughtError.message, expectedError && expectedError.message);
  }

  /**
   * Tests that each feature of the sender throws expected error
   */
  async function testSender(expectedErrorMsg: string): Promise<void> {
    should.equal(sender.isClosed, true, "Sender is not marked as closed.");

    const testMessage = TestMessage.getSample();
    let errorSend: string = "";
    await sender.send(testMessage).catch((err) => {
      errorSend = err.message;
    });
    should.equal(errorSend, expectedErrorMsg, "Expected error not thrown for send()");

    let errorSendBatch: string = "";
    await sender.sendBatch([testMessage]).catch((err) => {
      errorSendBatch = err.message;
    });
    should.equal(errorSendBatch, expectedErrorMsg, "Expected error not thrown for sendBatch()");

    let errorScheduleMsg: string = "";
    await sender.scheduleMessage(new Date(Date.now() + 30000), testMessage).catch((err) => {
      errorScheduleMsg = err.message;
    });
    should.equal(
      errorScheduleMsg,
      expectedErrorMsg,
      "Expected error not thrown for scheduleMessage()"
    );

    let errorScheduleMsgs: string = "";
    await sender.scheduleMessages(new Date(Date.now() + 30000), [testMessage]).catch((err) => {
      errorScheduleMsgs = err.message;
    });
    should.equal(
      errorScheduleMsgs,
      expectedErrorMsg,
      "Expected error not thrown for scheduleMessages()"
    );

    let errorCancelMsg: string = "";
    await sender.cancelScheduledMessage(long.ZERO).catch((err) => {
      errorCancelMsg = err.message;
    });
    should.equal(
      errorCancelMsg,
      expectedErrorMsg,
      "Expected error not thrown for cancelScheduledMessage()"
    );

    let errorCancelMsgs: string = "";
    await sender.cancelScheduledMessages([long.ZERO]).catch((err) => {
      errorCancelMsgs = err.message;
    });
    should.equal(
      errorCancelMsgs,
      expectedErrorMsg,
      "Expected error not thrown for cancelScheduledMessages()"
    );
  }

  /**
   * Tests creating new sender throws expected error
   */
  async function testCreateSender(expectedErrorMsg: string): Promise<void> {
    let errorNewSender: string = "";
    try {
      senderClient.createSender();
    } catch (err) {
      errorNewSender = err.message;
    }
    should.equal(errorNewSender, expectedErrorMsg, "Expected error not thrown for createSender()");
  }

  /**
   * Tests that each feature of the receiver throws expected error
   */
  async function testReceiver(expectedErrorMsg: string, useSessions?: boolean): Promise<void> {
    should.equal(receiver.isClosed, true, "Receiver is not marked as closed.");

    let errorReceiveBatch: string = "";
    await receiver.receiveMessages(1, 1).catch((err) => {
      errorReceiveBatch = err.message;
    });
    should.equal(
      errorReceiveBatch,
      expectedErrorMsg,
      "Expected error not thrown for receiveMessages()"
    );

    let errorReceiveStream: string = "";
    try {
      receiver.registerMessageHandler(() => Promise.resolve(), (e) => console.log(e));
    } catch (err) {
      errorReceiveStream = err.message;
    }
    should.equal(
      errorReceiveStream,
      expectedErrorMsg,
      "Expected error not thrown for registerMessageHandler()"
    );

    let errorDeferredMsg: string = "";
    await receiver.receiveDeferredMessage(long.ZERO).catch((err) => {
      errorDeferredMsg = err.message;
    });
    should.equal(
      errorDeferredMsg,
      expectedErrorMsg,
      "Expected error not thrown for receiveDeferredMessage()"
    );

    let errorDeferredMsgs: string = "";
    await receiver.receiveDeferredMessage(long.ZERO).catch((err) => {
      errorDeferredMsgs = err.message;
    });
    should.equal(
      errorDeferredMsgs,
      expectedErrorMsg,
      "Expected error not thrown for receiveDeferredMessages()"
    );

    if (!useSessions) {
      let errorRenewLock: string = "";
      await (<Receiver>receiver).renewMessageLock("randomLockToken").catch((err) => {
        errorRenewLock = err.message;
      });
      should.equal(errorRenewLock, expectedErrorMsg, "Expected error not thrown for renewLock()");
    }
  }

  /**
   * Tests that each feature of the receiverClient throws expected error
   */
  async function testReceiverClient(
    expectedErrorMsg: string,
    useSessions?: boolean
  ): Promise<void> {
    await testCreateReceiver(expectedErrorMsg, useSessions);

    let errorPeek: string = "";
    await receiverClient.peek().catch((err) => {
      errorPeek = err.message;
    });
    should.equal(
      errorPeek,
      expectedErrorMsg,
      "Expected error not thrown for peek() from receiverClient"
    );

    let errorPeekBySequence: string = "";
    await receiverClient.peekBySequenceNumber(long.ZERO).catch((err) => {
      errorPeekBySequence = err.message;
    });
    should.equal(
      errorPeekBySequence,
      expectedErrorMsg,
      "Expected error not thrown for peekBySequenceNumber() from receiverClient"
    );
  }

  /**
   * Tests creating new receiver throws expected error
   */
  async function testCreateReceiver(
    expectedErrorMsg: string,
    useSessions?: boolean
  ): Promise<void> {
    let errorNewReceiver: string = "";
    try {
      if (useSessions) {
        receiver = receiverClient.createReceiver(ReceiveMode.peekLock, {
          sessionId: TestMessage.sessionId
        });
      } else {
        receiver = receiverClient.createReceiver(ReceiveMode.peekLock);
      }
    } catch (err) {
      errorNewReceiver = err.message;
    }
    should.equal(
      errorNewReceiver,
      expectedErrorMsg,
      "Expected error not thrown for createReceiver()"
    );
  }

  /**
   * Tests that each feature of the receiver client with sessions throws expected error
   */
  async function testSessionReceiver(expectedErrorMsg: string): Promise<void> {
    await testReceiver(expectedErrorMsg, true);
    const sessionReceiver = receiver as SessionReceiver;

    let errorPeek: string = "";
    await sessionReceiver.peek().catch((err) => {
      errorPeek = err.message;
    });
    should.equal(
      errorPeek,
      expectedErrorMsg,
      "Expected error not thrown for peek() from sessionReceiver"
    );

    let errorPeekBySequence: string = "";
    await sessionReceiver.peekBySequenceNumber(long.ZERO).catch((err) => {
      errorPeekBySequence = err.message;
    });
    should.equal(
      errorPeekBySequence,
      expectedErrorMsg,
      "Expected error not thrown for peekBySequenceNumber() from sessionReceiver"
    );

    let errorGetState: string = "";
    await sessionReceiver.getState().catch((err) => {
      errorGetState = err.message;
    });
    should.equal(errorGetState, expectedErrorMsg, "Expected error not thrown for getState()");

    let errorSetState: string = "";
    await sessionReceiver.setState("state!!").catch((err) => {
      errorSetState = err.message;
    });
    should.equal(errorSetState, expectedErrorMsg, "Expected error not thrown for setState()");
  }

  describe("Errors after close() on namespace", function(): void {
    const entityToClose = "namespace";
    const expectedErrorMsg = "The underlying AMQP connection is closed.";

    it("Unpartitioned Queue: errors after close() on namespace", async function(): Promise<void> {
      await beforeEachTest(
        TestClientType.UnpartitionedQueue,
        TestClientType.UnpartitionedQueue,
        entityToClose
      );

      await testSender(expectedErrorMsg);
      await testCreateSender(expectedErrorMsg);
      await testReceiver(expectedErrorMsg);
      await testReceiverClient(expectedErrorMsg);
    });

    it("Unpartitioned Queue with sessions: errors after close() on namespace", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        TestClientType.UnpartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSender(expectedErrorMsg);
      await testCreateSender(expectedErrorMsg);
      await testSessionReceiver(expectedErrorMsg);
      await testReceiverClient(expectedErrorMsg, true);
    });
  });

  describe("Errors after close() on senderClient", function(): void {
    const entityToClose = "senderClient";

    it("Unpartitioned Queue: errors after close() on senderClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueue,
        TestClientType.UnpartitionedQueue,
        entityToClose
      );

      await testSender(
        getSenderClosedErrorMsg(senderClient.entityPath, ClientType.QueueClient, true)
      );
      await testCreateSender(getClientClosedErrorMsg(senderClient.entityPath));
    });

    it("Unpartitioned Queue with sessions: errors after close() on senderClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        TestClientType.UnpartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSender(
        getSenderClosedErrorMsg(senderClient.entityPath, ClientType.QueueClient, true)
      );
      await testCreateSender(getClientClosedErrorMsg(senderClient.entityPath));
    });
  });

  describe("Errors after close() on receiverClient", function(): void {
    const entityToClose = "receiverClient";

    it("Unpartitioned Queue: errors after close() on receiverClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueue,
        TestClientType.UnpartitionedQueue,
        entityToClose
      );

      await testReceiver(
        getReceiverClosedErrorMsg(receiverClient.entityPath, ClientType.QueueClient, true)
      );
      await testReceiverClient(getClientClosedErrorMsg(receiverClient.entityPath));
    });

    it("Unpartitioned Queue with sessions: errors after close() on receiverClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        TestClientType.UnpartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSessionReceiver(
        getReceiverClosedErrorMsg(
          receiverClient.entityPath,
          ClientType.QueueClient,
          true,
          TestMessage.sessionId
        )
      );
      await testReceiverClient(getClientClosedErrorMsg(receiverClient.entityPath), true);
    });
  });

  describe("Errors after close() on sender", function(): void {
    const entityToClose = "sender";

    it("Unpartitioned Queue: errors after close() on sender", async function(): Promise<void> {
      await beforeEachTest(
        TestClientType.UnpartitionedQueue,
        TestClientType.UnpartitionedQueue,
        entityToClose
      );

      await testSender(
        getSenderClosedErrorMsg(senderClient.entityPath, ClientType.QueueClient, false)
      );
    });

    it("Unpartitioned Queue with sessions: errors after close() on sender", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        TestClientType.UnpartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSender(
        getSenderClosedErrorMsg(senderClient.entityPath, ClientType.QueueClient, false)
      );
    });
  });

  describe("Errors after close() on receiver", function(): void {
    const entityToClose = "receiver";

    it("Unpartitioned Queue: errors after close() on receiver", async function(): Promise<void> {
      await beforeEachTest(
        TestClientType.UnpartitionedQueue,
        TestClientType.UnpartitionedQueue,
        entityToClose
      );

      await testReceiver(
        getReceiverClosedErrorMsg(receiverClient.entityPath, ClientType.QueueClient, false)
      );
      await testAllDispositions();
    });

    it("Unpartitioned Queue with sessions: errors after close() on receiver", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueueWithSessions,
        TestClientType.UnpartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSessionReceiver(
        getReceiverClosedErrorMsg(
          receiverClient.entityPath,
          ClientType.QueueClient,
          false,
          TestMessage.sessionId
        )
      );
      await testAllDispositions();
    });
  });

  describe("Errors when creating second sender/receiver with first not closed", function(): void {
    it("Open sender exists on QueueClient", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue, "");

      await testCreateSender(
        getOpenSenderErrorMsg(ClientType.QueueClient, senderClient.entityPath)
      );
    });

    it("Open receiver exists on QueueClient", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue, "");

      await testCreateReceiver(
        getOpenReceiverErrorMsg(ClientType.QueueClient, receiverClient.entityPath)
      );
    });

    it("Open receiver exists for session on QueueClient", async function(): Promise<void> {
      await beforeEachTest(
        TestClientType.PartitionedQueueWithSessions,
        TestClientType.PartitionedQueueWithSessions,
        "",
        true
      );

      await testCreateReceiver(
        getOpenReceiverErrorMsg(
          ClientType.QueueClient,
          receiverClient.entityPath,
          TestMessage.sessionId
        ),
        true
      );
    });
  });
});
