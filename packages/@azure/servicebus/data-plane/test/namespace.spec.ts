// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import { ApplicationTokenCredentials, loginWithServicePrincipalSecret } from "ms-rest-azure";
const aadServiceBusAudience = "https://servicebus.azure.net/";
import {
  Namespace,
  delay,
  QueueClient,
  TopicClient,
  SubscriptionClient,
  Sender,
  Receiver,
  SessionReceiver
} from "../lib";
import { getSenderReceiverClients, ClientType, TestMessage, purge, getEnvVars } from "./testUtils";
import long from "long";

function testFalsyValues(testFn: Function): void {
  [undefined, "", 0].forEach(function(value: string | number | undefined): void {
    testFn(value);
  });
}

describe("Create Namespace", function(): void {
  it("throws error when there is no connection string", function(): void {
    testFalsyValues(function(value: any): void {
      const test = function(): void {
        Namespace.createFromConnectionString(value);
      };
      test.should.throw(
        Error,
        "'connectionString' is a required parameter and must be of type: 'string'."
      );
    });
  });

  it("creates an Namespace from a connection string", function(): void {
    const namespace = Namespace.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
    namespace.should.be.an.instanceof(Namespace);
    should.equal(namespace.name, "sb://a/", "Name of the namespace is different than expected");
  });
});

describe("Clients with no name", function(): void {
  let namespace: Namespace;
  beforeEach(() => {
    namespace = Namespace.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
  });
  afterEach(() => {
    return namespace.close();
  });

  it("throws error when creating queue client with no name", function(): void {
    testFalsyValues(function(value: any): void {
      const test = function(): void {
        namespace.createQueueClient(value);
      };
      test.should.throw(Error, "'queueName' is a required parameter and must be of type 'string'.");
    });
  });

  it("throws error when creating topic client with no name", function(): void {
    testFalsyValues(function(value: any): void {
      const test = function(): void {
        namespace.createTopicClient(value);
      };
      test.should.throw(Error, "'topicName' is a required parameter and must be of type 'string'.");
    });
  });

  it("throws error when creating subscription client with no topic name", function(): void {
    testFalsyValues(function(value: any): void {
      const test = function(): void {
        namespace.createSubscriptionClient(value, "some-name");
      };
      test.should.throw(Error, "'topicName' is a required parameter and must be of type 'string'.");
    });
  });

  it("throws error when creating subscription client with no subscription name", function(): void {
    testFalsyValues(function(value: any): void {
      const test = function(): void {
        namespace.createSubscriptionClient("some-name", value);
      };
      test.should.throw(
        Error,
        "'subscriptionName' is a required parameter and must be of type 'string'."
      );
    });
  });
});

describe("Errors with non existing Namespace", function(): void {
  let namespace: Namespace;
  let errorWasThrown: boolean;
  beforeEach(() => {
    namespace = Namespace.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
    errorWasThrown = false;
  });
  afterEach(() => {
    return namespace.close();
  });

  const testError = (err: Error) => {
    should.equal(err.name, "ServiceCommunicationError", "ErrorName is different than expected");
    should.equal(
      err.message,
      "getaddrinfo ENOTFOUND a a:5671",
      "ErrorMessage is different than expected"
    );
    errorWasThrown = true;
  };

  it("throws error when sending data via a queueClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending data via a topicClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createTopicClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending batch data via a queueClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch(testError);
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending batch data via a topicClient to a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createTopicClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving batch data via a queueClient from a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    await client
      .getReceiver()
      .receiveBatch(10)
      .catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving batch data via a subscriptionClient from a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createSubscriptionClient("some-topic-name", "some-subscription-name");
    await client
      .getReceiver()
      .receiveBatch(10)
      .catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving streaming data via a queueClient from a non existing namespace", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    const onMessage = async () => {
      throw "onMessage should not have been called when receive call is made from a non existing namespace";
    };

    client.getReceiver().receive(onMessage, testError);

    await delay(3000);
    await client.close();
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });
});

describe("Errors with non existing Queue/Topic/Subscription", async function(): Promise<void> {
  let namespace: Namespace;
  let errorWasThrown: boolean;
  beforeEach(() => {
    if (!process.env.SERVICEBUS_CONNECTION_STRING) {
      throw "define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests.";
    }
    namespace = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);
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
      .getSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending data to a non existing topic", async function(): Promise<void> {
    const client = namespace.createTopicClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending batch data to a non existing queue", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when sending batch data to a non existing topic", async function(): Promise<
    void
  > {
    const client = namespace.createTopicClient("some-name");
    await client
      .getSender()
      .send({ body: "hello" })
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receiving batch data from a non existing queue", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    await client
      .getReceiver()
      .receiveBatch(1)
      .catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receiving batch data from a non existing subscription", async function(): Promise<
    void
  > {
    const client = namespace.createSubscriptionClient("some-topic-name", "some-subscription-name");
    await client
      .getReceiver()
      .receiveBatch(1)
      .catch((err) => testError(err, "some-topic-name/Subscriptions/some-subscription-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving streaming data from a non existing queue", async function(): Promise<
    void
  > {
    const client = namespace.createQueueClient("some-name");
    const onMessage = async () => {
      throw "onMessage should not have been called when receive call is made from a non existing namespace";
    };
    client.getReceiver().receive(onMessage, (err) => testError(err, "some-name"));

    await delay(3000);
    await client.close();
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receving streaming data from a non existing subscription", async function(): Promise<
    void
  > {
    const client = namespace.createSubscriptionClient("some-topic-name", "some-subscription-name");
    const onMessage = async () => {
      throw "onMessage should not have been called when receive call is made from a non existing namespace";
    };
    client
      .getReceiver()
      .receive(onMessage, (err) =>
        testError(err, "some-topic-name/Subscriptions/some-subscription-name")
      );

    await delay(3000);
    await client.close();
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });
});

describe("Test createFromAadTokenCredentials", function(): void {
  let namespace: Namespace;
  let tokenCreds: ApplicationTokenCredentials;
  let errorWasThrown: boolean = false;
  if (!process.env.SERVICEBUS_CONNECTION_STRING) {
    throw new Error(
      "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
    );
  }
  const serviceBusEndpoint = (process.env.SERVICEBUS_CONNECTION_STRING.match(
    "Endpoint=sb://((.*).servicebus.windows.net)"
  ) || "")[1];
  const env = getEnvVars();

  async function testCreateFromAadTokenCredentials(host: string, tokenCreds: any): Promise<void> {
    const testMessages = TestMessage.getSample();
    namespace = Namespace.createFromAadTokenCredentials(host, tokenCreds);
    namespace.should.be.an.instanceof(Namespace);
    const clients = await getSenderReceiverClients(
      namespace,
      ClientType.UnpartitionedQueue,
      ClientType.UnpartitionedQueue
    );

    const sender = clients.senderClient.getSender();
    const receiver = clients.receiverClient.getReceiver();
    await sender.send(testMessages);
    const msgs = await receiver.receiveBatch(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
    should.equal(msgs.length, 1, "Unexpected number of messages");
  }

  it("throws error for an invalid host", async function(): Promise<void> {
    tokenCreds = await loginWithServicePrincipalSecret(env.clientId, env.secret, env.tenantId, {
      tokenAudience: aadServiceBusAudience
    });
    await testCreateFromAadTokenCredentials("", tokenCreds).catch((err) => {
      errorWasThrown = true;
      should.equal(
        err.message,
        "'host' is a required parameter and must be of type: 'string'.",
        "ErrorMessage is different than expected"
      );
    });
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
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

  it("sends a message to the ServiceBus entity", async function(): Promise<void> {
    tokenCreds = await loginWithServicePrincipalSecret(env.clientId, env.secret, env.tenantId, {
      tokenAudience: aadServiceBusAudience
    });
    await testCreateFromAadTokenCredentials(serviceBusEndpoint, tokenCreds);
    await namespace.close();
  });
});

describe("Errors after namespace.close()", function(): void {
  const expectedErrorMsg = "The underlying AMQP connection is closed.";

  let namespace: Namespace;
  let senderClient: QueueClient | TopicClient;
  let receiverClient: QueueClient | SubscriptionClient;
  let sender: Sender;
  let receiver: Receiver | SessionReceiver;

  async function beforeEachTest(
    senderType: ClientType,
    receiverType: ClientType,
    useSessions?: boolean
  ): Promise<void> {
    if (!process.env.SERVICEBUS_CONNECTION_STRING) {
      throw new Error(
        "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
      );
    }

    namespace = Namespace.createFromConnectionString(process.env.SERVICEBUS_CONNECTION_STRING);

    const clients = await getSenderReceiverClients(namespace, senderType, receiverType);
    senderClient = clients.senderClient;
    receiverClient = clients.receiverClient;

    await purge(receiverClient, useSessions ? TestMessage.sessionId : undefined);
    const peekedMsgs = await receiverClient.peek();
    const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
    if (peekedMsgs.length) {
      chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
    }

    sender = senderClient.getSender();
    receiver = useSessions
      ? await receiverClient.getSessionReceiver({
          sessionId: TestMessage.sessionId
        })
      : receiverClient.getReceiver();

    // Normal send/receive
    const testMessage = useSessions ? TestMessage.getSessionSample() : TestMessage.getSample();
    await sender.send(testMessage);
    const receivedMsgs = await receiver.receiveBatch(1, 3);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages received");
    await receivedMsgs[0].complete();

    // Close namespace, so that we can then test the InvalidOperationError error.
    await namespace.close();
  }

  /**
   * Tests that each feature of the sender client throws expected error
   */
  async function testSender(): Promise<void> {
    const testMessage = TestMessage.getSample();
    let errorSend = false;
    await sender.send(testMessage).catch((err) => {
      errorSend = err && err.message === expectedErrorMsg;
    });
    should.equal(errorSend, true, "InvalidOperationError not thrown for send()");

    let errorSendBatch = false;
    await sender.sendBatch([testMessage]).catch((err) => {
      errorSendBatch = err && err.message === expectedErrorMsg;
    });
    should.equal(errorSendBatch, true, "InvalidOperationError not thrown for sendBatch()");

    let errorScheduleMsg = false;
    await sender.scheduleMessage(new Date(Date.now() + 30000), testMessage).catch((err) => {
      errorScheduleMsg = err && err.message === expectedErrorMsg;
    });
    should.equal(errorScheduleMsg, true, "InvalidOperationError not thrown for scheduleMessage()");

    let errorScheduleMsgs = false;
    await sender.scheduleMessages(new Date(Date.now() + 30000), [testMessage]).catch((err) => {
      errorScheduleMsgs = err && err.message === expectedErrorMsg;
    });
    should.equal(
      errorScheduleMsgs,
      true,
      "InvalidOperationError not thrown for scheduleMessages()"
    );

    let errorCancelMsg = false;
    await sender.cancelScheduledMessage(long.ZERO).catch((err) => {
      errorCancelMsg = err && err.message === expectedErrorMsg;
    });
    should.equal(
      errorCancelMsg,
      true,
      "InvalidOperationError not thrown for cancelScheduledMessage()"
    );

    let errorCancelMsgs = false;
    await sender.cancelScheduledMessages([long.ZERO]).catch((err) => {
      errorCancelMsgs = err && err.message === expectedErrorMsg;
    });
    should.equal(
      errorCancelMsgs,
      true,
      "InvalidOperationError not thrown for cancelScheduledMessages()"
    );

    let errorNewSender = false;
    try {
      senderClient.getSender();
    } catch (err) {
      errorNewSender = err && err.message === expectedErrorMsg;
    }
    should.equal(errorNewSender, true, "InvalidOperationError not thrown for getSender()");
  }

  /**
   * Tests that each feature of the receiver client throws expected error
   */
  async function testReceiver(useSessions?: boolean): Promise<void> {
    let errorPeek = false;
    await receiverClient.peek().catch((err) => {
      errorPeek = err && err.message === expectedErrorMsg;
    });
    should.equal(
      errorPeek,
      true,
      "InvalidOperationError not thrown for peek() from receiverClient"
    );

    let errorPeekBySequence = false;
    await receiverClient.peekBySequenceNumber(long.ZERO).catch((err) => {
      errorPeekBySequence = err && err.message === expectedErrorMsg;
    });
    should.equal(
      errorPeekBySequence,
      true,
      "InvalidOperationError not thrown for peekBySequenceNumber() from receiverClient"
    );

    let errorReceiveBatch = false;
    await receiver.receiveBatch(1, 1).catch((err) => {
      errorReceiveBatch = err && err.message === expectedErrorMsg;
    });
    should.equal(errorReceiveBatch, true, "InvalidOperationError not thrown for receiveBatch()");

    let errorReceiveStream = false;
    try {
      receiver.receive(() => Promise.resolve(), (e) => console.log(e));
    } catch (err) {
      errorReceiveStream = err && err.message === expectedErrorMsg;
    }
    should.equal(errorReceiveStream, true, "InvalidOperationError not thrown for receive()");

    let errorDeferredMsg = false;
    await receiver.receiveDeferredMessage(long.ZERO).catch((err) => {
      errorDeferredMsg = err && err.message === expectedErrorMsg;
    });
    should.equal(
      errorDeferredMsg,
      true,
      "InvalidOperationError not thrown for receiveDeferredMessage()"
    );

    let errorDeferredMsgs = false;
    await receiver.receiveDeferredMessage(long.ZERO).catch((err) => {
      errorDeferredMsgs = err && err.message === expectedErrorMsg;
    });
    should.equal(
      errorDeferredMsgs,
      true,
      "InvalidOperationError not thrown for receiveDeferredMessages()"
    );

    let errorRenewLock = false;
    await receiver.renewLock("randomLockToken").catch((err) => {
      errorRenewLock = err && err.message === expectedErrorMsg;
    });
    should.equal(errorRenewLock, true, "InvalidOperationError not thrown for renewLock()");

    let errorNewReceiver = false;
    try {
      useSessions
        ? await receiverClient.getSessionReceiver({
            sessionId: TestMessage.sessionId
          })
        : receiverClient.getReceiver();
    } catch (err) {
      errorNewReceiver = err && err.message === expectedErrorMsg;
    }
    should.equal(errorNewReceiver, true, "InvalidOperationError not thrown for getReceiver()");
  }

  /**
   * Tests that each feature of the receiver client with sessions throws expected error
   */
  async function testSessionReceiver(): Promise<void> {
    await testReceiver(true);
    const sessionReceiver = receiver as SessionReceiver;

    let errorPeek = false;
    await sessionReceiver.peek().catch((err) => {
      errorPeek = err && err.message === expectedErrorMsg;
    });
    should.equal(
      errorPeek,
      true,
      "InvalidOperationError not thrown for peek() from sessionReceiver"
    );

    let errorPeekBySequence = false;
    await sessionReceiver.peekBySequenceNumber(long.ZERO).catch((err) => {
      errorPeekBySequence = err && err.message === expectedErrorMsg;
    });
    should.equal(
      errorPeekBySequence,
      true,
      "InvalidOperationError not thrown for peekBySequenceNumber() from sessionReceiver"
    );

    let errorGetState = false;
    await sessionReceiver.getState().catch((err) => {
      errorGetState = err && err.message === expectedErrorMsg;
    });
    should.equal(errorGetState, true, "InvalidOperationError not thrown for getState()");

    let errorSetState = false;
    await sessionReceiver.setState("state!!").catch((err) => {
      errorSetState = err && err.message === expectedErrorMsg;
    });
    should.equal(errorSetState, true, "InvalidOperationError not thrown for setState()");
  }

  /**
   * Tests that each feature of the topic filters throws expected error
   */
  async function testRules(): Promise<void> {
    const subscriptionClient = receiverClient as SubscriptionClient;

    let errorAddRule = false;
    await subscriptionClient.addRule("myRule", true).catch((err) => {
      errorAddRule = err && err.message === expectedErrorMsg;
    });
    should.equal(errorAddRule, true, "InvalidOperationError not thrown for addRule()");

    let errorRemoveRule = false;
    await subscriptionClient.removeRule("myRule").catch((err) => {
      errorRemoveRule = err && err.message === expectedErrorMsg;
    });
    should.equal(errorRemoveRule, true, "InvalidOperationError not thrown for removeRule()");

    let errorGetRules = false;
    await subscriptionClient.getRules().catch((err) => {
      errorGetRules = err && err.message === expectedErrorMsg;
    });
    should.equal(errorGetRules, true, "InvalidOperationError not thrown for getRule()");
  }

  it("Partitioned Queue: errors after namespace.close()", async function(): Promise<void> {
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);

    await testSender();

    await testReceiver();
  });

  it("Partitioned Queue with sessions: errors after namespace.close()", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedQueueWithSessions,
      ClientType.PartitionedQueueWithSessions,
      true
    );

    await testSender();

    await testSessionReceiver();
  });

  it("Partitioned Topic/Subscription: errors after namespace.close()", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription);

    await testSender();

    await testReceiver();

    await testRules();
  });

  it("Partitioned Topic/Subscription with sessions: errors after namespace.close()", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.PartitionedTopicWithSessions,
      ClientType.PartitionedSubscriptionWithSessions,
      true
    );

    await testSender();

    await testReceiver();

    await testSessionReceiver();
  });

  it("Unpartitioned Queue: errors after namespace.close()", async function(): Promise<void> {
    await beforeEachTest(ClientType.UnpartitionedQueue, ClientType.UnpartitionedQueue);

    await testSender();

    await testReceiver();
  });

  it("Unpartitioned Queue with sessions: errors after namespace.close()", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedQueueWithSessions,
      ClientType.UnpartitionedQueueWithSessions,
      true
    );

    await testSender();

    await testSessionReceiver();
  });

  it("Unpartitioned Topic/Subscription: errors after namespace.close()", async function(): Promise<
    void
  > {
    await beforeEachTest(ClientType.UnpartitionedTopic, ClientType.UnpartitionedSubscription);

    await testSender();

    await testReceiver();

    await testRules();
  });

  it("Unpartitioned Topic/Subscription with sessions: errors after namespace.close()", async function(): Promise<
    void
  > {
    await beforeEachTest(
      ClientType.UnpartitionedTopicWithSessions,
      ClientType.UnpartitionedSubscriptionWithSessions,
      true
    );

    await testSender();

    await testReceiver();

    await testSessionReceiver();
  });

  it("Create Queue/Topic/Subscription clients throws error after namespace.close()", async function(): Promise<
    void
  > {
    // beforeEachTest() can be run for any entity type, we need it only to ensure that the
    // connection is indeed opened
    await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue);

    let errorCreateQueueClient = false;
    try {
      namespace.createQueueClient("random-name");
    } catch (err) {
      errorCreateQueueClient = err && err.message === expectedErrorMsg;
    }
    should.equal(
      errorCreateQueueClient,
      true,
      "InvalidOperationError not thrown for createQueueClient()"
    );

    let errorCreateTopicClient = false;
    try {
      namespace.createTopicClient("random-name");
    } catch (err) {
      errorCreateTopicClient = err && err.message === expectedErrorMsg;
    }
    should.equal(
      errorCreateTopicClient,
      true,
      "InvalidOperationError not thrown for createTopicClient()"
    );

    let errorCreateSubscriptionClient = false;
    try {
      namespace.createSubscriptionClient("random-name", "random-name");
    } catch (err) {
      errorCreateSubscriptionClient = err && err.message === expectedErrorMsg;
    }
    should.equal(
      errorCreateSubscriptionClient,
      true,
      "InvalidOperationError not thrown for createubscriptionClient()"
    );
  });
});
