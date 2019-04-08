// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
import dotenv from "dotenv";
dotenv.config();
chai.use(chaiAsPromised);
import {
  ApplicationTokenCredentials,
  loginWithServicePrincipalSecret
} from "@azure/ms-rest-nodeauth";
const aadServiceBusAudience = "https://servicebus.azure.net/";
import {
  ServiceBusClient,
  delay,
  QueueClient,
  TopicClient,
  SubscriptionClient,
  Sender,
  Receiver,
  SessionReceiver,
  ReceiveMode
} from "../src";
import { getSenderReceiverClients, ClientType, TestMessage, getEnvVars } from "./testUtils";
import long from "long";
import {
  getOpenSenderErrorMsg,
  getOpenReceiverErrorMsg,
  getClientClosedErrorMsg,
  getSenderClosedErrorMsg,
  getReceiverClosedErrorMsg
} from "../src/util/utils";

function testFalsyValues(testFn: Function): void {
  [undefined, "", 0].forEach(function(value: string | number | undefined): void {
    testFn(value);
  });
}

describe("Create Namespace", function(): void {
  it("throws error when there is no connection string", function(): void {
    testFalsyValues(function(value: any): void {
      const test = function(): void {
        ServiceBusClient.createFromConnectionString(value);
      };
      test.should.throw(
        Error,
        "'connectionString' is a required parameter and must be of type: 'string'."
      );
    });
  });

  it("creates an Namespace from a connection string", function(): void {
    const namespace = ServiceBusClient.createFromConnectionString(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
    namespace.should.be.an.instanceof(ServiceBusClient);
    should.equal(namespace.name, "sb://a/", "Name of the namespace is different than expected");
  });
});

describe("Clients with no name", function(): void {
  let namespace: ServiceBusClient;
  beforeEach(() => {
    namespace = ServiceBusClient.createFromConnectionString(
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
    if (!process.env.SERVICEBUS_CONNECTION_STRING) {
      throw "define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests.";
    }
    namespace = ServiceBusClient.createFromConnectionString(
      process.env.SERVICEBUS_CONNECTION_STRING
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

describe("Test createFromAadTokenCredentials", function(): void {
  let namespace: ServiceBusClient;
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

  async function testCreateFromAadTokenCredentials(host: string, tokenCreds: any): Promise<void> {
    const testMessages = TestMessage.getSample();
    namespace = ServiceBusClient.createFromAadTokenCredentials(host, tokenCreds);
    namespace.should.be.an.instanceof(ServiceBusClient);
    const clients = await getSenderReceiverClients(
      namespace,
      ClientType.UnpartitionedQueue,
      ClientType.UnpartitionedQueue
    );

    const sender = clients.senderClient.createSender();
    const receiver = await clients.receiverClient.createReceiver(ReceiveMode.peekLock);
    await sender.send(testMessages);
    const msgs = await receiver.receiveMessages(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
    should.equal(msgs.length, 1, "Unexpected number of messages");
  }

  it("throws error for an invalid host", async function(): Promise<void> {
    const env = getEnvVars();
    tokenCreds = await loginWithServicePrincipalSecret(
      env.clientId,
      env.clientSecret,
      env.tenantId,
      {
        tokenAudience: aadServiceBusAudience
      }
    );
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
    const env = getEnvVars();
    tokenCreds = await loginWithServicePrincipalSecret(
      env.clientId,
      env.clientSecret,
      env.tenantId,
      {
        tokenAudience: aadServiceBusAudience
      }
    );
    await testCreateFromAadTokenCredentials(serviceBusEndpoint, tokenCreds);
    await namespace.close();
  });
});

describe("Errors after close()", function(): void {
  let namespace: ServiceBusClient;
  let senderClient: QueueClient | TopicClient;
  let receiverClient: QueueClient | SubscriptionClient;
  let sender: Sender;
  let receiver: Receiver | SessionReceiver;

  afterEach(() => {
    return namespace.close();
  });

  async function beforeEachTest(
    senderType: ClientType,
    receiverType: ClientType,
    entityToClose: string,
    useSessions?: boolean
  ): Promise<void> {
    if (!process.env.SERVICEBUS_CONNECTION_STRING) {
      throw new Error(
        "Define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
      );
    }

    namespace = ServiceBusClient.createFromConnectionString(
      process.env.SERVICEBUS_CONNECTION_STRING
    );

    const clients = await getSenderReceiverClients(namespace, senderType, receiverType);
    senderClient = clients.senderClient;
    receiverClient = clients.receiverClient;

    // await purge(receiverClient, useSessions ? TestMessage.sessionId : undefined);
    // const peekedMsgs = await receiverClient.peek();
    // const receiverEntityType = receiverClient instanceof QueueClient ? "queue" : "topic";
    // if (peekedMsgs.length) {
    //   chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
    // }

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
    await receivedMsgs[0].complete();

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
   * Tests that each feature of the sender throws expected error
   */
  async function testSender(expectedErrorMsg: string): Promise<void> {
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

    it("Partitioned Queue: errors after close() on namespace", async function(): Promise<void> {
      await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue, entityToClose);

      await testSender(expectedErrorMsg);
      await testCreateSender(expectedErrorMsg);
      await testReceiver(expectedErrorMsg);
      await testReceiverClient(expectedErrorMsg);
    });

    it("Partitioned Queue with sessions: errors after close() on namespace", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedQueueWithSessions,
        ClientType.PartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSender(expectedErrorMsg);
      await testCreateSender(expectedErrorMsg);
      await testSessionReceiver(expectedErrorMsg);
      await testReceiverClient(expectedErrorMsg, true);
    });

    it("Partitioned Topic/Subscription: errors after close() on namespace", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedTopic,
        ClientType.PartitionedSubscription,
        entityToClose
      );

      await testSender(expectedErrorMsg);
      await testCreateSender(expectedErrorMsg);
      await testReceiver(expectedErrorMsg);
      await testReceiverClient(expectedErrorMsg);
      await testRules(expectedErrorMsg);
    });

    it("Partitioned Topic/Subscription with sessions: errors after close() on namespace", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedTopicWithSessions,
        ClientType.PartitionedSubscriptionWithSessions,
        entityToClose,
        true
      );

      await testSender(expectedErrorMsg);
      await testCreateSender(expectedErrorMsg);
      await testSessionReceiver(expectedErrorMsg);
      await testReceiverClient(expectedErrorMsg, true);
      await testRules(expectedErrorMsg);
    });

    it("Unpartitioned Queue: errors after close() on namespace", async function(): Promise<void> {
      await beforeEachTest(
        ClientType.UnpartitionedQueue,
        ClientType.UnpartitionedQueue,
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
        ClientType.UnpartitionedQueueWithSessions,
        ClientType.UnpartitionedQueueWithSessions,
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
        ClientType.UnpartitionedTopic,
        ClientType.UnpartitionedSubscription,
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
        ClientType.UnpartitionedTopicWithSessions,
        ClientType.UnpartitionedSubscriptionWithSessions,
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
      await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue, entityToClose);

      let errorCreateQueueClient: string = "";
      try {
        namespace.createQueueClient("random-name");
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
        namespace.createTopicClient("random-name");
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
        namespace.createSubscriptionClient("random-name", "random-name");
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

    it("Partitioned Queue: errors after close() on senderClient", async function(): Promise<void> {
      await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue, entityToClose);

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "QueueClient"));
      await testCreateSender(getClientClosedErrorMsg(senderClient.entityPath));
    });

    it("Partitioned Queue with sessions: errors after close() on senderClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedQueueWithSessions,
        ClientType.PartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "QueueClient"));
      await testCreateSender(getClientClosedErrorMsg(senderClient.entityPath));
    });

    it("Partitioned Topic/Subscription: errors after close() on senderClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedTopic,
        ClientType.PartitionedSubscription,
        entityToClose
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "SubscriptionClient"));
      await testCreateSender(getClientClosedErrorMsg(senderClient.entityPath));
    });

    it("Partitioned Topic/Subscription with sessions: errors after close() on senderClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedTopicWithSessions,
        ClientType.PartitionedSubscriptionWithSessions,
        entityToClose,
        true
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "SubscriptionClient"));
      await testCreateSender(getClientClosedErrorMsg(senderClient.entityPath));
    });

    it("Unpartitioned Queue: errors after close() on senderClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedQueue,
        ClientType.UnpartitionedQueue,
        entityToClose
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "QueueClient"));
      await testCreateSender(getClientClosedErrorMsg(senderClient.entityPath));
    });

    it("Unpartitioned Queue with sessions: errors after close() on senderClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedQueueWithSessions,
        ClientType.UnpartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "QueueClient"));
      await testCreateSender(getClientClosedErrorMsg(senderClient.entityPath));
    });

    it("Unpartitioned Topic/Subscription: errors after close() on senderClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedTopic,
        ClientType.UnpartitionedSubscription,
        entityToClose
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "SubscriptionClient"));
      await testCreateSender(getClientClosedErrorMsg(senderClient.entityPath));
    });

    it("Unpartitioned Topic/Subscription with sessions: errors after close() on senderClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedTopicWithSessions,
        ClientType.UnpartitionedSubscriptionWithSessions,
        entityToClose,
        true
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "SubscriptionClient"));
      await testCreateSender(getClientClosedErrorMsg(senderClient.entityPath));
    });
  });

  describe("Errors after close() on receiverClient", function(): void {
    const entityToClose = "receiverClient";

    it("Partitioned Queue: errors after close() on receiverClient", async function(): Promise<
      void
    > {
      await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue, entityToClose);

      await testReceiver(getReceiverClosedErrorMsg(receiverClient.entityPath, "QueueClient"));
      await testReceiverClient(getClientClosedErrorMsg(receiverClient.entityPath));
    });

    it("Partitioned Queue with sessions: errors after close() on receiverClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedQueueWithSessions,
        ClientType.PartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSessionReceiver(
        getReceiverClosedErrorMsg(receiverClient.entityPath, "QueueClient", TestMessage.sessionId)
      );
      await testReceiverClient(getClientClosedErrorMsg(receiverClient.entityPath), true);
    });

    it("Partitioned Topic/Subscription: errors after close() on receiverClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedTopic,
        ClientType.PartitionedSubscription,
        entityToClose
      );

      await testReceiver(
        getReceiverClosedErrorMsg(receiverClient.entityPath, "SubscriptionClient")
      );
      await testReceiverClient(getClientClosedErrorMsg(receiverClient.entityPath));
      await testRules(getClientClosedErrorMsg(receiverClient.entityPath));
    });

    it("Partitioned Topic/Subscription with sessions: errors after close() on receiverClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedTopicWithSessions,
        ClientType.PartitionedSubscriptionWithSessions,
        entityToClose,
        true
      );

      await testSessionReceiver(
        getReceiverClosedErrorMsg(
          receiverClient.entityPath,
          "SubscriptionClient",
          TestMessage.sessionId
        )
      );
      await testReceiverClient(getClientClosedErrorMsg(receiverClient.entityPath), true);
      await testRules(getClientClosedErrorMsg(receiverClient.entityPath));
    });

    it("Unpartitioned Queue: errors after close() on receiverClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedQueue,
        ClientType.UnpartitionedQueue,
        entityToClose
      );

      await testReceiver(getReceiverClosedErrorMsg(receiverClient.entityPath, "QueueClient"));
      await testReceiverClient(getClientClosedErrorMsg(receiverClient.entityPath));
    });

    it("Unpartitioned Queue with sessions: errors after close() on receiverClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedQueueWithSessions,
        ClientType.UnpartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSessionReceiver(
        getReceiverClosedErrorMsg(receiverClient.entityPath, "QueueClient", TestMessage.sessionId)
      );
      await testReceiverClient(getClientClosedErrorMsg(receiverClient.entityPath), true);
    });

    it("Unpartitioned Topic/Subscription: errors after close() on receiverClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedTopic,
        ClientType.UnpartitionedSubscription,
        entityToClose
      );

      await testReceiver(
        getReceiverClosedErrorMsg(receiverClient.entityPath, "SubscriptionClient")
      );
      await testReceiverClient(getClientClosedErrorMsg(receiverClient.entityPath));
      await testRules(getClientClosedErrorMsg(receiverClient.entityPath));
    });

    it("Unpartitioned Topic/Subscription with sessions: errors after close() on receiverClient", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedTopicWithSessions,
        ClientType.UnpartitionedSubscriptionWithSessions,
        entityToClose,
        true
      );

      await testSessionReceiver(
        getReceiverClosedErrorMsg(
          receiverClient.entityPath,
          "SubscriptionClient",
          TestMessage.sessionId
        )
      );
      await testReceiverClient(getClientClosedErrorMsg(receiverClient.entityPath), true);
      await testRules(getClientClosedErrorMsg(receiverClient.entityPath));
    });
  });

  describe("Errors after close() on sender", function(): void {
    const entityToClose = "sender";

    it("Partitioned Queue: errors after close() on sender", async function(): Promise<void> {
      await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue, entityToClose);

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "QueueClient"));
    });

    it("Partitioned Queue with sessions: errors after close() on sender", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedQueueWithSessions,
        ClientType.PartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "QueueClient"));
    });

    it("Partitioned Topic/Subscription: errors after close() on sender", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedTopic,
        ClientType.PartitionedSubscription,
        entityToClose
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "SubscriptionClient"));
    });

    it("Partitioned Topic/Subscription with sessions: errors after close() on sender", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedTopicWithSessions,
        ClientType.PartitionedSubscriptionWithSessions,
        entityToClose,
        true
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "SubscriptionClient"));
    });

    it("Unpartitioned Queue: errors after close() on sender", async function(): Promise<void> {
      await beforeEachTest(
        ClientType.UnpartitionedQueue,
        ClientType.UnpartitionedQueue,
        entityToClose
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "QueueClient"));
    });

    it("Unpartitioned Queue with sessions: errors after close() on sender", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedQueueWithSessions,
        ClientType.UnpartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "QueueClient"));
    });

    it("Unpartitioned Topic/Subscription: errors after close() on sender", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedTopic,
        ClientType.UnpartitionedSubscription,
        entityToClose
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "SubscriptionClient"));
    });

    it("Unpartitioned Topic/Subscription with sessions: errors after close() on sender", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedTopicWithSessions,
        ClientType.UnpartitionedSubscriptionWithSessions,
        entityToClose,
        true
      );

      await testSender(getSenderClosedErrorMsg(senderClient.entityPath, "SubscriptionClient"));
    });
  });

  describe("Errors after close() on receiver", function(): void {
    const entityToClose = "receiver";

    it("Partitioned Queue: errors after close() on receiver", async function(): Promise<void> {
      await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue, entityToClose);

      await testReceiver(getReceiverClosedErrorMsg(receiverClient.entityPath, "QueueClient"));
    });

    it("Partitioned Queue with sessions: errors after close() on receiver", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedQueueWithSessions,
        ClientType.PartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSessionReceiver(
        getReceiverClosedErrorMsg(receiverClient.entityPath, "QueueClient", TestMessage.sessionId)
      );
    });

    it("Partitioned Topic/Subscription: errors after close() on receiver", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedTopic,
        ClientType.PartitionedSubscription,
        entityToClose
      );

      await testReceiver(
        getReceiverClosedErrorMsg(receiverClient.entityPath, "SubscriptionClient")
      );
    });

    it("Partitioned Topic/Subscription with sessions: errors after close() on receiver", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.PartitionedTopicWithSessions,
        ClientType.PartitionedSubscriptionWithSessions,
        entityToClose,
        true
      );

      await testSessionReceiver(
        getReceiverClosedErrorMsg(
          receiverClient.entityPath,
          "SubscriptionClient",
          TestMessage.sessionId
        )
      );
    });

    it("Unpartitioned Queue: errors after close() on receiver", async function(): Promise<void> {
      await beforeEachTest(
        ClientType.UnpartitionedQueue,
        ClientType.UnpartitionedQueue,
        entityToClose
      );

      await testReceiver(getReceiverClosedErrorMsg(receiverClient.entityPath, "QueueClient"));
    });

    it("Unpartitioned Queue with sessions: errors after close() on receiver", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedQueueWithSessions,
        ClientType.UnpartitionedQueueWithSessions,
        entityToClose,
        true
      );

      await testSessionReceiver(
        getReceiverClosedErrorMsg(receiverClient.entityPath, "QueueClient", TestMessage.sessionId)
      );
    });

    it("Unpartitioned Topic/Subscription: errors after close() on receiver", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedTopic,
        ClientType.UnpartitionedSubscription,
        entityToClose
      );

      await testReceiver(
        getReceiverClosedErrorMsg(receiverClient.entityPath, "SubscriptionClient")
      );
    });

    it("Unpartitioned Topic/Subscription with sessions: errors after close() on receiver", async function(): Promise<
      void
    > {
      await beforeEachTest(
        ClientType.UnpartitionedTopicWithSessions,
        ClientType.UnpartitionedSubscriptionWithSessions,
        entityToClose,
        true
      );

      await testSessionReceiver(
        getReceiverClosedErrorMsg(
          receiverClient.entityPath,
          "SubscriptionClient",
          TestMessage.sessionId
        )
      );
    });
  });

  describe("Errors when creating second sender/receiver with first not closed", function(): void {
    it("Open sender exists on QueueClient", async function(): Promise<void> {
      await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue, "");

      await testCreateSender(getOpenSenderErrorMsg("QueueClient", senderClient.entityPath));
    });

    it("Open sender exists on TopicClient", async function(): Promise<void> {
      await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription, "");

      await testCreateSender(getOpenSenderErrorMsg("TopicClient", senderClient.entityPath));
    });

    it("Open receiver exists on QueueClient", async function(): Promise<void> {
      await beforeEachTest(ClientType.PartitionedQueue, ClientType.PartitionedQueue, "");

      await testCreateReceiver(getOpenReceiverErrorMsg("QueueClient", receiverClient.entityPath));
    });

    it("Open receiver exists on SubscriptionClient", async function(): Promise<void> {
      await beforeEachTest(ClientType.PartitionedTopic, ClientType.PartitionedSubscription, "");

      await testCreateReceiver(
        getOpenReceiverErrorMsg("SubscriptionClient", receiverClient.entityPath)
      );
    });

    it("Open receiver exists for session on QueueClient", async function(): Promise<void> {
      await beforeEachTest(
        ClientType.PartitionedQueueWithSessions,
        ClientType.PartitionedQueueWithSessions,
        "",
        true
      );

      await testCreateReceiver(
        getOpenReceiverErrorMsg("QueueClient", receiverClient.entityPath, TestMessage.sessionId),
        true
      );
    });

    it("Open receiver exists on SubscriptionClient", async function(): Promise<void> {
      await beforeEachTest(
        ClientType.PartitionedTopicWithSessions,
        ClientType.PartitionedSubscriptionWithSessions,
        "",
        true
      );

      await testCreateReceiver(
        getOpenReceiverErrorMsg(
          "SubscriptionClient",
          receiverClient.entityPath,
          TestMessage.sessionId
        ),
        true
      );
    });
  });
});
