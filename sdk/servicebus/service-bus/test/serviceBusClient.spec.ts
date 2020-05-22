// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import Long from "long";
import { MessagingError, ServiceBusClient, Receiver, SessionReceiver } from "../src";
import { Sender } from "../src/sender";
import { getReceiverClosedErrorMsg } from "../src/util/errors";
import { TestClientType, TestMessage, isMessagingError, checkWithTimeout } from "./utils/testUtils";
import {
  DispositionType,
  ReceivedMessageWithLock,
  ServiceBusMessage
} from "../src/serviceBusMessage";

const should = chai.should();
chai.use(chaiAsPromised);

import { getEnvVars, isNode } from "../test/utils/envVarUtils";
import * as dotenv from "dotenv";
dotenv.config();

// import { EnvironmentCredential } from "@azure/identity";
import {
  createServiceBusClientForTests,
  ServiceBusClientForTests,
  EntityName,
  testPeekMsgsLength
} from "./utils/testutils2";

describe("Create ServiceBusClient", function(): void {
  let sbClient: ServiceBusClient;

  afterEach(async () => {
    await sbClient.close();
  });

  it("hostname gets populated from the connection string", function(): void {
    sbClient = new ServiceBusClient(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
    );
    sbClient.should.be.an.instanceof(ServiceBusClient);
    should.equal(
      sbClient.fullyQualifiedNamespace,
      "a",
      "Name of the namespace is different than expected"
    );
  });

  // it("Creates clients after coercing name to string", function(): void {
  //   sbClient = new ServiceBusClient(
  //     "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
  //   );
  //   const queueClient = sbClient.createQueueClient(1 as any);
  //   should.equal(queueClient.entityPath, "1");

  //   const topicClient = sbClient.createTopicClient(1 as any);
  //   should.equal(topicClient.entityPath, "1");

  //   const subscriptionClient = sbClient.createSubscriptionClient(1 as any, 2 as any);
  //   should.equal(subscriptionClient.entityPath, "1/Subscriptions/2");
  // });
});

describe("Random scheme in the endpoint from connection string", function(): void {
  let sbClient: ServiceBusClientForTests;
  let sbClientWithRelaxedEndPoint: ServiceBusClient;
  let entities: EntityName;
  let sender: Sender;
  let receiver: Receiver<ReceivedMessageWithLock>;

  async function beforeEachTest(testClientType: TestClientType) {
    sbClient = createServiceBusClientForTests();
    entities = await sbClient.test.createTestEntities(testClientType);
    await sbClient.close();
    sbClientWithRelaxedEndPoint = new ServiceBusClient(
      getEnvVars().SERVICEBUS_CONNECTION_STRING.replace("sb://", "CheeseBurger://")
    );
    sender = await sbClientWithRelaxedEndPoint.createSender(entities.queue!);
    receiver = !entities.usesSessions
      ? sbClientWithRelaxedEndPoint.createReceiver(entities.queue!, "peekLock")
      : await sbClientWithRelaxedEndPoint.createSessionReceiver(entities.queue!, "peekLock", {
          sessionId: TestMessage.sessionId
        });
  }

  afterEach(async () => {
    await sbClient.test.after();
    await sender.close();
    await receiver.close();
    await sbClientWithRelaxedEndPoint.close();
  });

  async function sendReceiveMsg(testMessages: ServiceBusMessage): Promise<void> {
    await sender.send(testMessages);
    await testPeekMsgsLength(receiver, 1);

    const msgs = await receiver.receiveBatch(1);

    should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
    should.equal(msgs.length, 1, "Unexpected number of messages");
    should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
    should.equal(msgs[0].messageId, testMessages.messageId, "MessageId is different than expected");
    should.equal(msgs[0].deliveryCount, 0, "DeliveryCount is different than expected");
    await msgs[0].complete();

    await testPeekMsgsLength(receiver, 0);
  }

  it("Partitioned Queue: send and receive message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await sendReceiveMsg(TestMessage.getSample());
  });

  it("Unpartitioned Queue With Sessions: send and receive message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await sendReceiveMsg(TestMessage.getSessionSample());
  });
});

describe("Errors with non existing Namespace", function(): void {
  let sbClient: ServiceBusClient;
  let errorWasThrown: boolean;
  beforeEach(() => {
    sbClient = new ServiceBusClient(
      "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=some-queue"
    );
    errorWasThrown = false;
  });
  afterEach(() => {
    return sbClient.close();
  });

  const testError = (err: Error | MessagingError): void => {
    if (!isMessagingError(err)) {
      should.equal(true, false, "Error expected to be instance of MessagingError");
    } else {
      if (isNode) {
        should.equal(
          err.code === "ENOTFOUND" || err.code === "EAI_AGAIN",
          true,
          `Error code ${err.code} is different than expected`
        );
      } else {
        should.equal(
          err.code,
          "ServiceCommunicationError",
          "Error code is different than expected"
        );
      }

      errorWasThrown = true;
    }
  };

  it("throws error when create a sender for a non existing namespace", async function(): Promise<
    void
  > {
    try {
      await sbClient.createSender("some-queue");
      should.fail("Should have thrown");
    } catch (err) {
      testError(err);
    }

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receiving batch data to a non existing namespace", async function(): Promise<
    void
  > {
    const receiver = sbClient.createReceiver("some-queue", "peekLock");
    await receiver.receiveBatch(10).catch(testError);

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receiving streaming data from a non existing namespace", async function(): Promise<
    void
  > {
    const receiver = sbClient.createReceiver("some-queue", "peekLock");
    receiver.subscribe({
      async processMessage() {
        throw "processMessage should not have been called when receive call is made from a non existing namespace";
      },
      async processError(err) {
        testError(err);
      }
    });

    should.equal(
      await checkWithTimeout(() => errorWasThrown === true, 10, 3000),
      true,
      "Error thrown flag must be true"
    );
    await receiver.close();
  });
});

describe("Errors with non existing Queue/Topic/Subscription", async function(): Promise<void> {
  let sbClient: ServiceBusClientForTests;
  let errorWasThrown: boolean;
  beforeEach(() => {
    sbClient = createServiceBusClientForTests();
    errorWasThrown = false;
  });
  afterEach(async () => {
    await sbClient.test.afterEach();
    await sbClient.test.after();
  });

  const testError = (err: Error | MessagingError, entityPath: string): void => {
    if (!isMessagingError(err)) {
      should.equal(true, false, "Error expected to be instance of MessagingError");
    } else {
      should.equal(
        err.code,
        "MessagingEntityNotFoundError",
        "Error code is different than expected"
      );
      should.equal(
        // TODO - update this check once sbClient has a `name` property
        // err.message.includes(`The messaging entity '<insert-endpoint-here>${entityPath}' could not be found.`),
        err.message.includes(`${entityPath}' could not be found.`),
        true
      );
      errorWasThrown = true;
    }
  };

  it("throws error when opening a sender to a non-existent queue", async function(): Promise<void> {
    await sbClient.createSender("some-name").catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receiving batch data from a non existing queue", async function(): Promise<
    void
  > {
    const receiver = sbClient.createReceiver("some-name", "peekLock");
    await receiver.receiveBatch(1).catch((err) => testError(err, "some-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receiving batch data from a non existing subscription", async function(): Promise<
    void
  > {
    const receiver = sbClient.createReceiver(
      "some-topic-name",
      "some-subscription-name",
      "peekLock"
    );
    await receiver
      .receiveBatch(1)
      .catch((err) => testError(err, "some-topic-name/Subscriptions/some-subscription-name"));

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error when receiving streaming data from a non existing queue", async function(): Promise<
    void
  > {
    const receiver = sbClient.createReceiver("some-name", "peekLock");
    receiver.subscribe({
      async processMessage() {
        throw "processMessage should not have been called when receive call is made from a non existing namespace";
      },
      async processError(err) {
        testError(err, "some-name");
      }
    });

    should.equal(
      await checkWithTimeout(() => errorWasThrown === true, 10, 3000),
      true,
      "Error thrown flag must be true"
    );
    await receiver.close();
  });

  it("throws error when receiving streaming data from a non existing subscription", async function(): Promise<
    void
  > {
    const receiver = sbClient.createReceiver(
      "some-topic-name",
      "some-subscription-name",
      "peekLock"
    );
    receiver.subscribe({
      async processMessage() {
        throw "processMessage should not have been called when receive call is made from a non existing namespace";
      },
      async processError(err) {
        testError(err, "some-topic-name/Subscriptions/some-subscription-name");
      }
    });

    should.equal(
      await checkWithTimeout(() => errorWasThrown === true, 10, 3000),
      true,
      "Error thrown flag must be true"
    );
    await receiver.close();
  });
});

describe("Test ServiceBusClient creation", function(): void {
  let errorWasThrown: boolean = false;

  const env = getEnvVars();
  const serviceBusEndpoint = (env.SERVICEBUS_CONNECTION_STRING.match(
    "Endpoint=sb://((.*).servicebus.windows.net)"
  ) || "")[1];

  // /**
  //  * Utility to create EnvironmentCredential using `@azure/identity`
  //  */
  // function getDefaultTokenCredential() {
  //   should.exist(
  //     env[EnvVarNames.AZURE_CLIENT_ID],
  //     "define AZURE_CLIENT_ID in your environment before running integration tests."
  //   );
  //   should.exist(
  //     env[EnvVarNames.AZURE_TENANT_ID],
  //     "define AZURE_TENANT_ID in your environment before running integration tests."
  //   );
  //   should.exist(
  //     env[EnvVarNames.AZURE_CLIENT_SECRET],
  //     "define AZURE_CLIENT_SECRET in your environment before running integration tests."
  //   );
  //   should.exist(
  //     env[EnvVarNames.SERVICEBUS_CONNECTION_STRING],
  //     "define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
  //   );
  //   return new EnvironmentCredential();
  // }

  it("throws error for invalid tokenCredentials", async function(): Promise<void> {
    try {
      new ServiceBusClient(serviceBusEndpoint, [] as any);
    } catch (err) {
      errorWasThrown = true;
      should.equal(
        err.message,
        "Connection string malformed: each part of the connection string must have an `=` assignment.",
        // "'credentials' is a required parameter and must be an implementation of TokenCredential when using host based constructor overload.",
        "ErrorMessage is different than expected"
      );
    }
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  it("throws error for undefined tokenCredentials", async function(): Promise<void> {
    try {
      new ServiceBusClient(serviceBusEndpoint, undefined as any);
    } catch (err) {
      errorWasThrown = true;
      should.equal(
        err.message,
        "Connection string malformed: each part of the connection string must have an `=` assignment.",
        // "'credentials' is a required parameter and must be an implementation of TokenCredential when using host based constructor overload.",
        "ErrorMessage is different than expected"
      );
    }
    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  });

  // if (isNode) {
  //   it("Coerces input to string for host in credential based constructor", async function(): Promise<
  //     void
  //   > {
  //     const tokenCreds = getDefaultTokenCredential();
  //     sbClient = new ServiceBusClient(123 as any, tokenCreds);
  //     should.equal(sbClient.name, "sb://123/", "Name of the namespace is different than expected");
  //   });

  //   it("sends a message to the ServiceBus entity", async function(): Promise<void> {
  //     const tokenCreds = getDefaultTokenCredential();

  //     const serviceBusClient = createServiceBusClientForTests();
  //     const entities = await serviceBusClient.test.createTestEntities(
  //       TestClientType.UnpartitionedQueue
  //     );
  //     await serviceBusClient.close();

  //     const sbClient = new ServiceBusClient(serviceBusEndpoint, tokenCreds);
  //     sbClient.should.be.an.instanceof(ServiceBusClient);

  //     const sender = sbClient.createSender(entities.queue!);
  //     const receiver = await sbClient.createReceiver(entities.queue!, "peekLock");
  //     const testMessages = TestMessage.getSample();
  //     await sender.send(testMessages);
  //     const msgs = await receiver.receiveBatch(1);

  //     should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
  //     should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
  //     should.equal(msgs.length, 1, "Unexpected number of messages");
  //     await sbClient.close();
  //   });
  // }
});

describe("Errors after close()", function(): void {
  let sbClient: ServiceBusClientForTests;
  let sender: Sender;
  let receiver: Receiver<ReceivedMessageWithLock>;
  let receivedMessage: ReceivedMessageWithLock;
  let entityName: EntityName;
  // let subscriptionClient: SubscriptionRuleManager;

  afterEach(async () => {
    await sbClient.test.afterEach();
    await sbClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType, entityToClose: string): Promise<void> {
    sbClient = createServiceBusClientForTests();
    entityName = await sbClient.test.createTestEntities(entityType);

    sender = sbClient.test.addToCleanup(
      await sbClient.createSender(entityName.queue ?? entityName.topic!)
    );
    receiver = await sbClient.test.getPeekLockReceiver(entityName);

    // Normal send/receive
    const testMessage = entityName.usesSessions
      ? TestMessage.getSessionSample()
      : TestMessage.getSample();
    await sender.send(testMessage);
    const receivedMsgs = await receiver.receiveBatch(1, { maxWaitTimeInMs: 5000 });
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages received");
    receivedMessage = receivedMsgs[0];

    // subscriptionClient = sbClient.test.addToCleanup(
    //   sbClient.getSubscriptionRuleManager(entityName.topic!, entityName.subscription!)
    // );

    // close(), so that we can then test the resulting error.
    switch (entityToClose) {
      case "namespace":
        await sbClient.close();
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
    // TODO - add test for renewing message lock
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

    let errorCreateBatch: string = "";
    await sender.createBatch().catch((err) => {
      errorCreateBatch = err.message;
    });
    should.equal(errorCreateBatch, expectedErrorMsg, "Expected error not thrown for createBatch()");

    let errorSendBatch: string = "";
    await sender.send(1 as any).catch((err) => {
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
    await sender.cancelScheduledMessage(Long.ZERO).catch((err) => {
      errorCancelMsg = err.message;
    });
    should.equal(
      errorCancelMsg,
      expectedErrorMsg,
      "Expected error not thrown for cancelScheduledMessage()"
    );

    let errorCancelMsgs: string = "";
    await sender.cancelScheduledMessages([Long.ZERO]).catch((err) => {
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
      await sbClient.createSender(entityName.queue ?? entityName.topic!);
    } catch (err) {
      errorNewSender = err.message;
    }
    should.equal(errorNewSender, expectedErrorMsg, "Expected error not thrown for createSender()");
  }

  /**
   * Tests that each feature of the receiver throws expected error
   */
  async function testReceiver(expectedErrorMsg: string): Promise<void> {
    should.equal(receiver.isClosed, true, "Receiver is not marked as closed.");

    let errorReceiveBatch: string = "";
    await receiver.receiveBatch(1, { maxWaitTimeInMs: 1000 }).catch((err) => {
      errorReceiveBatch = err.message;
    });
    should.equal(
      errorReceiveBatch,
      expectedErrorMsg,
      "Expected error not thrown for receiveMessages()"
    );

    let errorReceiveStream: string = "";
    try {
      receiver.subscribe({
        async processMessage() {},
        async processError(e) {
          console.log(e);
        }
      });
    } catch (err) {
      errorReceiveStream = err.message;
    }
    should.equal(
      errorReceiveStream,
      expectedErrorMsg,
      "Expected error not thrown for registerMessageHandler()"
    );

    let errorDeferredMsg: string = "";
    await receiver.receiveDeferredMessage(Long.ZERO).catch((err) => {
      errorDeferredMsg = err.message;
    });
    should.equal(
      errorDeferredMsg,
      expectedErrorMsg,
      "Expected error not thrown for receiveDeferredMessage()"
    );

    let errorDeferredMsgs: string = "";
    await receiver.receiveDeferredMessage(Long.ZERO).catch((err) => {
      errorDeferredMsgs = err.message;
    });
    should.equal(
      errorDeferredMsgs,
      expectedErrorMsg,
      "Expected error not thrown for receiveDeferredMessages()"
    );

    // TODO - closing the receiver doesn't matter for peek
    // let errorPeek: string = "";
    // await receiver.diagnostics.peek().catch((err) => {
    //   errorPeek = err.message;
    // });
    // should.equal(
    //   errorPeek,
    //   expectedErrorMsg,
    //   "Expected error not thrown for peek() from receiver"
    // );

    // let errorPeekBySequence: string = "";
    // await receiver.diagnostics.peekBySequenceNumber(Long.ZERO).catch((err) => {
    //   errorPeekBySequence = err.message;
    // });
    // should.equal(
    //   errorPeekBySequence,
    //   expectedErrorMsg,
    //   "Expected error not thrown for peekBySequenceNumber() from receiver"
    // );

    // if (!entityName.usesSessions) {
    //   let errorRenewLock: string = "";
    //   await (<InternalReceiver>receiver).renewMessageLock("randomLockToken").catch((err) => {
    //     errorRenewLock = err.message;
    //   });
    //   should.equal(errorRenewLock, expectedErrorMsg, "Expected error not thrown for renewLock()");
    // }
  }

  /**
   * Tests creating new receiver throws expected error
   */
  async function testCreateReceiver(expectedErrorMsg: string): Promise<void> {
    let errorNewReceiver: string = "";
    try {
      receiver = await sbClient.test.getPeekLockReceiver(entityName);
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
    await testReceiver(expectedErrorMsg);
    const sessionReceiver = receiver as SessionReceiver<ReceivedMessageWithLock>;

    let errorPeek: string = "";
    await sessionReceiver.browseMessages().catch((err) => {
      errorPeek = err.message;
    });
    should.equal(
      errorPeek,
      expectedErrorMsg,
      "Expected error not thrown for peek() from sessionReceiver"
    );

    let errorPeekBySequence: string = "";
    await sessionReceiver.browseMessages({ fromSequenceNumber: Long.ZERO }).catch((err) => {
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

  // /**
  //  * Tests that each feature of the topic filters throws expected error
  //  */
  // async function testRules(expectedErrorMsg: string): Promise<void> {
  //   let errorAddRule: string = "";
  //   try {
  //     await subscriptionClient.addRule("myRule", true);
  //   } catch (error) {
  //     errorAddRule = error.message;
  //   }
  //   should.equal(errorAddRule, expectedErrorMsg, "Expected error not thrown for addRule()");

  //   let errorRemoveRule: string = "";
  //   try {
  //     await subscriptionClient.removeRule("myRule");
  //   } catch (err) {
  //     errorRemoveRule = err.message;
  //   }
  //   should.equal(errorRemoveRule, expectedErrorMsg, "Expected error not thrown for removeRule()");

  //   let errorGetRules: string = "";
  //   try {
  //     await subscriptionClient.getRules();
  //   } catch (err) {
  //     errorGetRules = err.message;
  //   }
  //   should.equal(errorGetRules, expectedErrorMsg, "Expected error not thrown for getRule()");
  // }

  describe("Errors after close() on namespace", function(): void {
    const entityToClose = "namespace";
    const expectedErrorMsg = "The underlying AMQP connection is closed.";

    it("Unpartitioned Queue: errors after close() on namespace", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue, entityToClose);

      await testSender(expectedErrorMsg);
      await testCreateSender(expectedErrorMsg);
      await testReceiver(expectedErrorMsg);
      await testCreateReceiver(expectedErrorMsg);
    });

    it("Unpartitioned Queue with sessions: errors after close() on namespace", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions, entityToClose);

      await testSender(expectedErrorMsg);
      await testCreateSender(expectedErrorMsg);
      await testSessionReceiver(expectedErrorMsg);
      await testCreateReceiver(expectedErrorMsg);
    });

    it("Unpartitioned Topic/Subscription: errors after close() on namespace", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscription, entityToClose);
      await testSender(expectedErrorMsg);
      await testCreateSender(expectedErrorMsg);
      await testReceiver(expectedErrorMsg);
      await testCreateReceiver(expectedErrorMsg);
      // await testRules(expectedErrorMsg);
    });

    it("Unpartitioned Topic/Subscription with sessions: errors after close() on namespace", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions, entityToClose);

      await testSender(expectedErrorMsg);
      await testCreateSender(expectedErrorMsg);
      await testSessionReceiver(expectedErrorMsg);
      await testCreateReceiver(expectedErrorMsg);
      // await testRules(expectedErrorMsg);
    });
  });

  // describe("Errors after close() on sender", function(): void {
  //   const entityToClose = "sender";

  //   it("Unpartitioned Queue: errors after close() on sender", async function(): Promise<
  //     void
  //   > {
  //     await beforeEachTest(TestClientType.UnpartitionedQueue, entityToClose);

  //     await testSender(
  //       getSenderClosedErrorMsg(sender.entityPath, ClientType.QueueClient, true)
  //     );
  //     await testCreateSender(getClientClosedErrorMsg(sender.entityPath));
  //   });

  //   it("Unpartitioned Topic: errors after close() on sender", async function(): Promise<
  //     void
  //   > {
  //     await beforeEachTest(
  //       TestClientType.UnpartitionedTopic,
  //       TestClientType.UnpartitionedSubscription,
  //       entityToClose
  //     );

  //     await testSender(
  //       getSenderClosedErrorMsg(sender.entityPath, ClientType.TopicClient, true)
  //     );
  //     await testCreateSender(getClientClosedErrorMsg(sender.entityPath));
  //   });
  // });

  describe("Errors after close() on receiver", function(): void {
    const entityToClose = "receiver";

    it("Unpartitioned Queue: errors after close() on receiver", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue, entityToClose);

      await testReceiver(getReceiverClosedErrorMsg(receiver.entityPath, false));
    });

    it("Unpartitioned Queue with sessions: errors after close() on receiver", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions, entityToClose);

      await testReceiver(
        getReceiverClosedErrorMsg(receiver.entityPath, false, TestMessage.sessionId)
      );
    });

    it("Unpartitioned Topic/Subscription: errors after close() on receiver", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscription, entityToClose);

      await testReceiver(getReceiverClosedErrorMsg(receiver.entityPath, false));
      // TODO - rules are independent of receiver
      // await testRules(getClientClosedErrorMsg(receiver.entityPath));
    });

    it("Unpartitioned Topic/Subscription with sessions: errors after close() on receiver", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedSubscriptionWithSessions, entityToClose);

      await testSessionReceiver(
        getReceiverClosedErrorMsg(receiver.entityPath, false, TestMessage.sessionId)
      );
      // TODO - rules are independent of receiver
      // await testRules(getClientClosedErrorMsg(receiver.entityPath));
    });
  });

  // TODO - getOpenSenderErrorMsg doesn't exist, make that exist and update the test
  // describe("Errors after close() on sender", function(): void {
  //   const entityToClose = "sender";

  //   it("Unpartitioned Queue: errors after close() on sender", async function(): Promise<
  //     void
  //   > {
  //     await beforeEachTest(TestClientType.UnpartitionedQueue, entityToClose);

  //     await testSender(
  //       getSenderClosedErrorMsg(sender.entityPath, ClientType.QueueClient, false)
  //     );
  //   });
  // });

  describe("Errors after close() on receiver", function(): void {
    const entityToClose = "receiver";

    it("Unpartitioned Queue with sessions: errors after close() on receiver", async function(): Promise<
      void
    > {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions, entityToClose);

      await testSessionReceiver(
        getReceiverClosedErrorMsg(receiver.entityPath, false, TestMessage.sessionId)
      );
      await testAllDispositions();
    });
  });

  // TODO - getOpenSenderErrorMsg doesn't exist, make that exist and update the tests
  // describe("Errors when creating second sender/receiver with first not closed", function(): void {
  //   it("Open sender exists on QueueClient", async function(): Promise<void> {
  //     await beforeEachTest(TestClientType.PartitionedQueue, "");

  //     await testCreateSender(
  //       getOpenSenderErrorMsg(ClientType.QueueClient, sender.entityPath)
  //     );
  //   });

  //   it("Open sender exists on TopicClient", async function(): Promise<void> {
  //     await beforeEachTest(
  //       TestClientType.PartitionedTopic,
  //       TestClientType.PartitionedSubscription,
  //       ""
  //     );

  //     await testCreateSender(getOpenSenderErrorMsg("TopicClient", sender.entityPath));
  //   });

  // it("Open receiver exists on QueueClient", async function(): Promise<void> {
  //   await beforeEachTest(TestClientType.PartitionedQueue, "");

  //   await testCreateReceiver(
  //     getOpenReceiverErrorMsg(ClientType.QueueClient, receiver.entityPath)
  //   );
  // });

  //   it("Open receiver exists on SubscriptionClient", async function(): Promise<void> {
  //     await beforeEachTest(
  //       TestClientType.PartitionedTopic,
  //       TestClientType.PartitionedSubscription,
  //       ""
  //     );

  //     await testCreateReceiver(
  //       getOpenReceiverErrorMsg(ClientType.SubscriptionClient, receiver.entityPath)
  //     );
  //   });

  //   it("Open receiver exists for session on QueueClient", async function(): Promise<
  //     void
  //   > {
  //     await beforeEachTest(
  //       TestClientType.PartitionedQueueWithSessions,
  //       TestClientType.PartitionedQueueWithSessions,
  //       "",
  //       true
  //     );

  //     await testCreateReceiver(
  //       getOpenReceiverErrorMsg(
  //         ClientType.QueueClient,
  //         receiver.entityPath,
  //         TestMessage.sessionId
  //       ),
  //       true
  //     );
  //   });

  //   it("Open receiver exists for session on SubscriptionClient", async function(): Promise<void> {
  //     await beforeEachTest(
  //       TestClientType.PartitionedTopicWithSessions,
  //       TestClientType.PartitionedSubscriptionWithSessions,
  //       "",
  //       true
  //     );

  //     await testCreateReceiver(
  //       getOpenReceiverErrorMsg(
  //         ClientType.SubscriptionClient,
  //         receiver.entityPath,
  //         TestMessage.sessionId
  //       ),
  //       true
  //     );
  //   });
  // });
});

describe("entityPath on sender and receiver", async () => {
  const sbClient = createServiceBusClientForTests();
  afterEach(async () => {
    await sbClient.test.afterEach();
  });
  after(async () => {
    await sbClient.test.after();
  });
  it("UnpartitionedQueue", async () => {
    const entityName = await sbClient.test.createTestEntities(TestClientType.UnpartitionedQueue);
    const sender = sbClient.test.addToCleanup(await sbClient.createSender(entityName.queue!));
    const receiver = sbClient.test.addToCleanup(
      sbClient.createReceiver(entityName.queue!, "receiveAndDelete")
    );
    const deadLetterReceiver = sbClient.test.addToCleanup(
      sbClient.createDeadLetterReceiver(entityName.queue!, "receiveAndDelete")
    );
    should.equal(sender.entityPath, entityName.queue, "Entity path on the sender did not match!");
    should.equal(
      receiver.entityPath,
      entityName.queue,
      "Entity path on the receiver did not match!"
    );
    should.equal(
      deadLetterReceiver.entityPath,
      `${entityName.queue}/$DeadLetterQueue`,
      "Entity path on the deadLetterReceiver did not match!"
    );
  });

  it("PartitionedSubscriptionWithSessions", async () => {
    const entityName = await sbClient.test.createTestEntities(
      TestClientType.PartitionedSubscriptionWithSessions
    );
    const sender = sbClient.test.addToCleanup(await sbClient.createSender(entityName.topic!));
    const receiver = sbClient.test.addToCleanup(
      await sbClient.createSessionReceiver(
        entityName.topic!,
        entityName.subscription!,
        "receiveAndDelete",
        { sessionId: TestMessage.sessionId }
      )
    );
    const deadLetterReceiver = sbClient.test.addToCleanup(
      sbClient.createDeadLetterReceiver(
        entityName.topic!,
        entityName.subscription!,
        "receiveAndDelete"
      )
    );
    should.equal(sender.entityPath, entityName.topic, "Entity path on the sender did not match!");
    should.equal(
      receiver.entityPath,
      `${entityName.topic}/Subscriptions/${entityName.subscription}`,
      "Entity path on the receiver did not match!"
    );
    should.equal(
      deadLetterReceiver.entityPath,
      `${entityName.topic}/Subscriptions/${entityName.subscription}/$DeadLetterQueue`,
      "Entity path on the deadLetterReceiver did not match!"
    );
  });
});
