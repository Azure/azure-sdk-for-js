// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
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
} from "../src";
import {
  getClientClosedErrorMsg,
  getOpenReceiverErrorMsg,
  getOpenSenderErrorMsg,
  getReceiverClosedErrorMsg,
  getSenderClosedErrorMsg
} from "../src/util/errors";
import {
  TestClientType,
  getSenderReceiverClients,
  purge,
  TestMessage,
  getServiceBusClient
} from "./utils/testUtils";
import { ClientType } from "../src/client";
import { DispositionType } from "../src/serviceBusMessage";
import { getEnvVars, isNode } from "./utils/envVarUtils";
import { getTokenCredentialsFromAAD } from "./utils/aadUtils";

const should = chai.should();
chai.use(chaiAsPromised);

describe("Create ServiceBusClient and Queue/Topic/Subscription Clients #RunInBrowser", function(): void {
  let sbClient: ServiceBusClient;

  afterEach(async () => {
    if (sbClient) {
      await sbClient.close();
    }
  });

  it("Creates an Namespace from a connection string", function(): void {
    sbClient = ServiceBusClient.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
    sbClient.should.be.an.instanceof(ServiceBusClient);
    should.equal(sbClient.name, "sb://a/", "Name of the namespace is different than expected");
  });

  it("Creates clients after coercing name to string", function(): void {
    sbClient = ServiceBusClient.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
    const queueClient = sbClient.createQueueClient(1 as any);
    should.equal(queueClient.entityPath, "1");

    const topicClient = sbClient.createTopicClient(1 as any);
    should.equal(topicClient.entityPath, "1");

    const subscriptionClient = sbClient.createSubscriptionClient(1 as any, 2 as any);
    should.equal(subscriptionClient.entityPath, "1/Subscriptions/2");
  });

  it("Missing tokenProvider in createFromTokenProvider", function(): void {
    let caughtError: Error | undefined;
    try {
      sbClient = ServiceBusClient.createFromTokenProvider("somestring", undefined as any);
    } catch (error) {
      caughtError = error;
    }
    should.equal(caughtError && caughtError.name, "TypeError");
    should.equal(caughtError && caughtError.message, `Missing parameter "tokenProvider"`);
  });

  it("Coerces input to string for host in createFromTokenProvider", function(): void {
    sbClient = ServiceBusClient.createFromTokenProvider(123 as any, {} as any);
    should.equal(sbClient.name, "sb://123/", "Name of the namespace is different than expected");
  });
});

describe("Errors with non existing Namespace #RunInBrowser", function(): void {
  let sbClient: ServiceBusClient;
  let errorWasThrown: boolean;
  beforeEach(() => {
    sbClient = ServiceBusClient.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
    errorWasThrown = false;
  });
  afterEach(() => {
    return sbClient.close();
  });

  const testError = (err: Error): void => {
    should.equal(err.name, "ServiceCommunicationError", "ErrorName is different than expected");
    errorWasThrown = true;
  };

  it("throws error when sending data via a queueClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = sbClient.createQueueClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending data via a topicClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = sbClient.createTopicClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending batch data via a queueClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = sbClient.createQueueClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch(testError);
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending batch data via a topicClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = sbClient.createTopicClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving batch data via a queueClient from a non existing namespace", async function(): Promise<
    void
  > {
    const client = sbClient.createQueueClient("some-name");
    const receiver = await client.createReceiver(ReceiveMode.peekLock);
    await receiver.receiveMessages(10).catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving batch data via a subscriptionClient from a non existing namespace", async function(): Promise<
    void
  > {
    const client = sbClient.createSubscriptionClient("some-topic-name", "some-subscription-name");
    const receiver = await client.createReceiver(ReceiveMode.peekLock);
    await receiver.receiveMessages(10).catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving streaming data via a queueClient from a non existing namespace", async function(): Promise<
    void
  > {
    const client = sbClient.createQueueClient("some-name");
    const onMessage = async (): Promise<never> => {
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
  let sbClient: ServiceBusClient;
  let errorWasThrown: boolean;
  beforeEach(() => {
    sbClient = getServiceBusClient();
    errorWasThrown = false;
  });
  afterEach(() => {
    return sbClient.close();
  });

  const testError = (err: Error, entityPath: string): void => {
    should.equal(err.name, "MessagingEntityNotFoundError", "ErrorName is different than expected");
    should.equal(
      err.message.startsWith(
        `The messaging entity '${sbClient.name}${entityPath}' could not be found.`
      ),
      true
    );
    errorWasThrown = true;
  };

  it("throws error when sending data to a non existing queue #RunInBrowser", async function(): Promise<
    void
  > {
    const client = sbClient.createQueueClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending data to a non existing topic", async function(): Promise<void> {
    const client = sbClient.createTopicClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending batch data to a non existing queue #RunInBrowser", async function(): Promise<
    void
  > {
    const client = sbClient.createQueueClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending batch data to a non existing topic", async function(): Promise<
    void
  > {
    const client = sbClient.createTopicClient("some-name");
    await client
      .createSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receiving batch data from a non existing queue #RunInBrowser", async function(): Promise<
    void
  > {
    const client = sbClient.createQueueClient("some-name");
    const receiver = await client.createReceiver(ReceiveMode.peekLock);
    await receiver.receiveMessages(1).catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receiving batch data from a non existing subscription", async function(): Promise<
    void
  > {
    const client = sbClient.createSubscriptionClient("some-topic-name", "some-subscription-name");
    const receiver = await client.createReceiver(ReceiveMode.peekLock);
    await receiver
      .receiveMessages(1)
      .catch((err) => testError(err, "some-topic-name/Subscriptions/some-subscription-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving streaming data from a non existing queue #RunInBrowser", async function(): Promise<
    void
  > {
    const client = sbClient.createQueueClient("some-name");
    const receiver = await client.createReceiver(ReceiveMode.peekLock);
    const onMessage = async (): Promise<never> => {
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
    const client = sbClient.createSubscriptionClient("some-topic-name", "some-subscription-name");
    const receiver = await client.createReceiver(ReceiveMode.peekLock);
    const onMessage = async (): Promise<never> => {
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

describe("Test createFromAadTokenCredentials", function(): void {
  let sbClient: ServiceBusClient;
  let errorWasThrown: boolean = false;

  const env = getEnvVars();
  const serviceBusEndpoint = (env.SERVICEBUS_CONNECTION_STRING.match(
    "Endpoint=sb://((.*).servicebus.windows.net)"
  ) || "")[1];

  async function testCreateFromAadTokenCredentials(host: string, tokenCreds: any): Promise<void> {
    const testMessages = TestMessage.getSample();
    sbClient = ServiceBusClient.createFromAadTokenCredentials(host, tokenCreds);
    sbClient.should.be.an.instanceof(ServiceBusClient);
    const clients = await getSenderReceiverClients(
      sbClient,
      TestClientType.UnpartitionedQueue,
      TestClientType.UnpartitionedQueue
    );

    const sender = clients.senderClient.createSender();
    const receiver = await clients.receiverClient.createReceiver(ReceiveMode.peekLock);
    await sender.send(testMessages);
    const msgs = await receiver.receiveMessages(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
    should.equal(msgs.length, 1, "Unexpected number of messages");
  }

  it("throws error when using `CreateFromAadTokenCredentials` in browser #RunInBrowser", async function(): Promise<
    void
  > {
    // We use the `!isNode` check here to ensure this test is run only in browser only
    // as by default all tests run in Node
    if (!isNode) {
      const credentials: any = {};
      await testCreateFromAadTokenCredentials(serviceBusEndpoint, credentials).catch((err) => {
        errorWasThrown = true;
        should.equal(
          err.message,
          "`createFromAadTokenCredentials` cannot be used to create ServiceBusClient as AAD support is not present in browser."
        );
      });
      should.equal(errorWasThrown, true, "Error thrown flag must be true");
    }
  });

  it("throws error for invalid tokenCredentials", async function(): Promise<void> {
    await testCreateFromAadTokenCredentials(serviceBusEndpoint, "").catch((err) => {
      errorWasThrown = true;
      should.equal(
        err.message,
        "'credentials' is a required parameter and must be an instance of ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials.",
        "ErrorMessage is different than expected"
      );
    });
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("Coerces input to string for host in createFromAadTokenCredentials", async function(): Promise<
    void
  > {
    const tokenCreds = await getTokenCredentialsFromAAD();
    sbClient = ServiceBusClient.createFromAadTokenCredentials(123 as any, tokenCreds);
    should.equal(sbClient.name, "sb://123/", "Name of the namespace is different than expected");
  });

  it("sends a message to the ServiceBus entity", async function(): Promise<void> {
    const tokenCreds = await getTokenCredentialsFromAAD();
    await testCreateFromAadTokenCredentials(serviceBusEndpoint, tokenCreds);
    await sbClient.close();
  });
});

describe("Errors after close()", function(): void {
  let sbClient: ServiceBusClient;
  let senderClient: QueueClient | TopicClient;
  let receiverClient: QueueClient | SubscriptionClient;
  let sender: Sender;
  let receiver: Receiver | SessionReceiver;
  let receivedMessage: ServiceBusMessage;

  afterEach(() => {
    return sbClient.close();
  });

  async function beforeEachTest(
    senderType: TestClientType,
    receiverType: TestClientType,
    entityToClose: string,
    useSessions?: boolean
  ): Promise<void> {
    sbClient = getServiceBusClient();
    const clients = await getSenderReceiverClients(sbClient, senderType, receiverType);
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
        await sbClient.close();
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

    const expectedErrorMsg =
      `Failed to ${operation} the message as the AMQP link with which the message was ` +
      `received is no longer alive.`;
    should.equal(caughtError && caughtError.message, expectedErrorMsg);
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
      receiver.registerMessageHandler(
        () => Promise.resolve(),
        (e) => console.log(e)
      );
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

  /**
   * Tests that each feature of the topic filters throws expected error
   */
  async function testRules(expectedErrorMsg: string): Promise<void> {
    const subscriptionClient = receiverClient as SubscriptionClient;

    let errorAddRule: string = "";
    await subscriptionClient.addRule("myRule", true).catch((err) => {
      errorAddRule = err.message;
    });
    should.equal(errorAddRule, expectedErrorMsg, "Expected error not thrown for addRule()");

    let errorRemoveRule: string = "";
    await subscriptionClient.removeRule("myRule").catch((err) => {
      errorRemoveRule = err.message;
    });
    should.equal(errorRemoveRule, expectedErrorMsg, "Expected error not thrown for removeRule()");

    let errorGetRules: string = "";
    await subscriptionClient.getRules().catch((err) => {
      errorGetRules = err.message;
    });
    should.equal(errorGetRules, expectedErrorMsg, "Expected error not thrown for getRule()");
  }

  describe("Errors after close() on namespace", function(): void {
    const entityToClose = "namespace";
    const expectedErrorMsg = "The underlying AMQP connection is closed.";

    it("Unpartitioned Queue: errors after close() on namespace #RunInBrowser", async function(): Promise<
      void
    > {
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

    it("Unpartitioned Queue with sessions: errors after close() on namespace #RunInBrowser", async function(): Promise<
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

    it("Unpartitioned Topic/Subscription: errors after close() on namespace", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedTopic,
        TestClientType.UnpartitionedSubscription,
        entityToClose
      );

      await testSender(expectedErrorMsg);
      await testCreateSender(expectedErrorMsg);
      await testReceiver(expectedErrorMsg);
      await testReceiverClient(expectedErrorMsg);
      await testRules(expectedErrorMsg);
    });

    it("Unpartitioned Topic/Subscription with sessions: errors after close() on namespace", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedTopicWithSessions,
        TestClientType.UnpartitionedSubscriptionWithSessions,
        entityToClose,
        true
      );

      await testSender(expectedErrorMsg);
      await testCreateSender(expectedErrorMsg);
      await testSessionReceiver(expectedErrorMsg);
      await testReceiverClient(expectedErrorMsg, true);
      await testRules(expectedErrorMsg);
    });

    it("Create Queue/Topic/Subscription clients throws error after namespace.close()", async function(): Promise<
      void
    > {
      // beforeEachTest() can be run for any entity type, we need it only to ensure that the
      // connection is indeed opened
      await beforeEachTest(
        TestClientType.PartitionedQueue,
        TestClientType.PartitionedQueue,
        entityToClose
      );

      let errorCreateQueueClient: string = "";
      try {
        sbClient.createQueueClient("random-name");
      } catch (err) {
        errorCreateQueueClient = err.message;
      }
      should.equal(
        errorCreateQueueClient,
        expectedErrorMsg,
        "Expected error not thrown for createQueueClient()"
      );

      let errorCreateTopicClient: string = "";
      try {
        sbClient.createTopicClient("random-name");
      } catch (err) {
        errorCreateTopicClient = err.message;
      }
      should.equal(
        errorCreateTopicClient,
        expectedErrorMsg,
        "Expected error not thrown for createTopicClient()"
      );

      let errorCreateSubscriptionClient: string = "";
      try {
        sbClient.createSubscriptionClient("random-name", "random-name");
      } catch (err) {
        errorCreateSubscriptionClient = err.message;
      }
      should.equal(
        errorCreateSubscriptionClient,
        expectedErrorMsg,
        "Expected error not thrown for createubscriptionClient()"
      );
    });
  });

  describe("Errors after close() on senderClient", function(): void {
    const entityToClose = "senderClient";

    it("Unpartitioned Queue: errors after close() on senderClient #RunInBrowser", async function(): Promise<
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

    it("Unpartitioned Topic: errors after close() on senderClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedTopic,
        TestClientType.UnpartitionedSubscription,
        entityToClose
      );

      await testSender(
        getSenderClosedErrorMsg(senderClient.entityPath, ClientType.TopicClient, true)
      );
      await testCreateSender(getClientClosedErrorMsg(senderClient.entityPath));
    });
  });

  describe("Errors after close() on receiverClient", function(): void {
    const entityToClose = "receiverClient";

    it("Unpartitioned Queue: errors after close() on receiverClient #RunInBrowser", async function(): Promise<
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

    it("Unpartitioned Queue with sessions: errors after close() on receiverClient #RunInBrowser", async function(): Promise<
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

    it("Unpartitioned Topic/Subscription: errors after close() on receiverClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedTopic,
        TestClientType.UnpartitionedSubscription,
        entityToClose
      );

      await testReceiver(
        getReceiverClosedErrorMsg(receiverClient.entityPath, ClientType.SubscriptionClient, true)
      );
      await testReceiverClient(getClientClosedErrorMsg(receiverClient.entityPath));
      await testRules(getClientClosedErrorMsg(receiverClient.entityPath));
    });

    it("Unpartitioned Topic/Subscription with sessions: errors after close() on receiverClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedTopicWithSessions,
        TestClientType.UnpartitionedSubscriptionWithSessions,
        entityToClose,
        true
      );

      await testSessionReceiver(
        getReceiverClosedErrorMsg(
          receiverClient.entityPath,
          ClientType.SubscriptionClient,
          true,
          TestMessage.sessionId
        )
      );
      await testReceiverClient(getClientClosedErrorMsg(receiverClient.entityPath), true);
      await testRules(getClientClosedErrorMsg(receiverClient.entityPath));
    });
  });

  describe("Errors after close() on sender", function(): void {
    const entityToClose = "sender";

    it("Unpartitioned Queue: errors after close() on sender #RunInBrowser", async function(): Promise<
      void
    > {
      await beforeEachTest(
        TestClientType.UnpartitionedQueue,
        TestClientType.UnpartitionedQueue,
        entityToClose
      );

      await testSender(
        getSenderClosedErrorMsg(senderClient.entityPath, ClientType.QueueClient, false)
      );
    });
  });

  describe("Errors after close() on receiver", function(): void {
    const entityToClose = "receiver";

    it("Unpartitioned Queue with sessions: errors after close() on receiver #RunInBrowser", async function(): Promise<
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

    it("Open sender exists on TopicClient", async function(): Promise<void> {
      await beforeEachTest(
        TestClientType.PartitionedTopic,
        TestClientType.PartitionedSubscription,
        ""
      );

      await testCreateSender(getOpenSenderErrorMsg("TopicClient", senderClient.entityPath));
    });

    it("Open receiver exists on QueueClient #RunInBrowser", async function(): Promise<void> {
      await beforeEachTest(TestClientType.PartitionedQueue, TestClientType.PartitionedQueue, "");

      await testCreateReceiver(
        getOpenReceiverErrorMsg(ClientType.QueueClient, receiverClient.entityPath)
      );
    });

    it("Open receiver exists on SubscriptionClient", async function(): Promise<void> {
      await beforeEachTest(
        TestClientType.PartitionedTopic,
        TestClientType.PartitionedSubscription,
        ""
      );

      await testCreateReceiver(
        getOpenReceiverErrorMsg(ClientType.SubscriptionClient, receiverClient.entityPath)
      );
    });

    it("Open receiver exists for session on QueueClient #RunInBrowser", async function(): Promise<
      void
    > {
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

    it("Open receiver exists for session on SubscriptionClient", async function(): Promise<void> {
      await beforeEachTest(
        TestClientType.PartitionedTopicWithSessions,
        TestClientType.PartitionedSubscriptionWithSessions,
        "",
        true
      );

      await testCreateReceiver(
        getOpenReceiverErrorMsg(
          ClientType.SubscriptionClient,
          receiverClient.entityPath,
          TestMessage.sessionId
        ),
        true
      );
    });
  });
});
