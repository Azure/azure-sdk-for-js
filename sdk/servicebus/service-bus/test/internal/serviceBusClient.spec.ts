// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { EnvironmentCredential } from "@azure/identity";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import * as dotenv from "dotenv";
import { Constants as CoreAmqpConstants } from "@azure/core-amqp";
import Long from "long";
import {
  isServiceBusError,
  ProcessErrorArgs,
  ServiceBusClient,
  ServiceBusError,
  ServiceBusSessionReceiver,
  ServiceBusSender,
} from "../../src";
import { DispositionType, ServiceBusReceivedMessage } from "../../src/serviceBusMessage";
import { getReceiverClosedErrorMsg, getSenderClosedErrorMsg } from "../../src/util/errors";
import { EnvVarNames, getEnvVars } from "../public/utils/envVarUtils";
import { isNode } from "@azure/core-util";
import { checkWithTimeout, TestClientType, TestMessage } from "../public/utils/testUtils";
import {
  createServiceBusClientForTests,
  EntityName,
  ServiceBusClientForTests,
  testPeekMsgsLength,
  getRandomTestClientTypeWithSessions,
  getRandomTestClientTypeWithNoSessions,
} from "../public/utils/testutils2";
import { ServiceBusReceiver, ServiceBusReceiverImpl } from "../../src/receivers/receiver";

const should = chai.should();
chai.use(chaiAsPromised);

dotenv.config();

const noSessionTestClientType = getRandomTestClientTypeWithNoSessions();
const withSessionTestClientType = getRandomTestClientTypeWithSessions();

describe("ServiceBusClient live tests", () => {
  describe("Create ServiceBusClient", function (): void {
    it("hostname gets populated from the connection string", function (): void {
      const sbClient = new ServiceBusClient(
        "Endpoint=sb://a;SharedAccessKeyName=b;SharedAccessKey=c;EntityPath=d"
      );
      sbClient.should.be.an.instanceof(ServiceBusClient);
      should.equal(
        sbClient.fullyQualifiedNamespace,
        "a",
        "Name of the namespace is different than expected"
      );
    });
  });

  describe("Random scheme in the endpoint from connection string", function (): void {
    it(noSessionTestClientType + ": send and receive message", async function (): Promise<void> {
      // Create a test client to get the entity types
      const sbClient = createServiceBusClientForTests();
      const entities = await sbClient.test.createTestEntities(noSessionTestClientType);
      await sbClient.close();

      // Create a sb client, sender, receiver with relaxed endpoint
      const sbClientWithRelaxedEndPoint = new ServiceBusClient(
        getEnvVars().SERVICEBUS_CONNECTION_STRING.replace("sb://", "CheeseBurger://")
      );
      const sender = sbClientWithRelaxedEndPoint.createSender(entities.queue || entities.topic!);
      const receiver = entities.queue
        ? sbClientWithRelaxedEndPoint.createReceiver(entities.queue)
        : sbClientWithRelaxedEndPoint.createReceiver(entities.topic!, entities.subscription!);

      try {
        // Send and receive messages
        const testMessages = entities.usesSessions
          ? TestMessage.getSessionSample()
          : TestMessage.getSample();
        await sender.sendMessages(testMessages);
        await testPeekMsgsLength(receiver, 1);

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
        await receiver.completeMessage(msgs[0]);

        await testPeekMsgsLength(receiver, 0);
      } finally {
        // Clean up
        await sbClient.test.after();
        await sender.close();
        await receiver.close();
        await sbClientWithRelaxedEndPoint.close();
      }
    });

    it.skip(
      noSessionTestClientType + ":can omit message body when peeking",
      async function (): Promise<void> {
        // Create a test client to get the entity types
        const sbClient = createServiceBusClientForTests();
        const entities = await sbClient.test.createTestEntities(noSessionTestClientType);
        await sbClient.close();

        // Create a sb client, sender, receiver with relaxed endpoint
        const sbClientWithRelaxedEndPoint = new ServiceBusClient(
          getEnvVars().SERVICEBUS_CONNECTION_STRING.replace("sb://", "CheeseBurger://")
        );
        const sender = sbClientWithRelaxedEndPoint.createSender(entities.queue || entities.topic!);
        const receiver = entities.queue
          ? sbClientWithRelaxedEndPoint.createReceiver(entities.queue)
          : sbClientWithRelaxedEndPoint.createReceiver(entities.topic!, entities.subscription!);
        try {
          // Send and receive messages
          const testMessages = entities.usesSessions
            ? TestMessage.getSessionSample()
            : TestMessage.getSample();
          await sender.sendMessages(testMessages);

          let peekedMsgs = await receiver.peekMessages(2, {
            omitMessageBody: true,
            fromSequenceNumber: Long.ZERO,
          });
          should.equal(peekedMsgs.length, 1, "expecting one peeked message 1");
          should.not.exist(peekedMsgs[0].body);
          should.exist(
            peekedMsgs[0]._rawAmqpMessage.deliveryAnnotations,
            "expecting deliveryAnnotations"
          );
          const omittedSize = Number(
            peekedMsgs[0]._rawAmqpMessage.deliveryAnnotations!["omitted-message-body-size"]
          );
          should.equal(omittedSize > 0, true);

          peekedMsgs = await receiver.peekMessages(2, {
            omitMessageBody: false,
            fromSequenceNumber: Long.ZERO,
          });
          should.equal(peekedMsgs.length, 1, "expecting one peeked message 2");
          should.exist(peekedMsgs[0].body);
          should.exist(
            peekedMsgs[0]._rawAmqpMessage.deliveryAnnotations,
            "expecting deliveryAnnotations"
          );
          should.not.exist(
            peekedMsgs[0]._rawAmqpMessage.deliveryAnnotations!["omitted-message-body-size"],
            "Not expecting omitted-message-body-size"
          );

          peekedMsgs = await receiver.peekMessages(2, { fromSequenceNumber: Long.ZERO });
          should.equal(peekedMsgs.length, 1, "expecting one peeked message 3");
          should.exist(peekedMsgs[0].body);
          should.exist(
            peekedMsgs[0]._rawAmqpMessage.deliveryAnnotations,
            "expecting deliveryAnnotations"
          );
          should.not.exist(
            peekedMsgs[0]._rawAmqpMessage.deliveryAnnotations!["omitted-message-body-size"],
            "Not expecting omitted-message-body-size"
          );

          await receiver.receiveMessages(2);
          await testPeekMsgsLength(receiver, 0);
        } finally {
          // Clean up
          await sbClient.test.after();
          await sender.close();
          await receiver.close();
          await sbClientWithRelaxedEndPoint.close();
        }
      }
    );
  });

  describe("Errors with non existing Namespace", function (): void {
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

    const testError = (err: Error | ServiceBusError): void => {
      if (!isServiceBusError(err)) {
        should.equal(true, false, "Error expected to be instance of ServiceBusError");
      } else {
        if (isNode) {
          should.equal(
            err.code === "GeneralError",
            true,
            `Error code ${err.code} is different than expected`
          );
        } else {
          should.equal(
            err.code,
            "ServiceCommunicationProblem",
            "Error code is different than expected"
          );
        }

        errorWasThrown = true;
      }
    };

    it("throws error when receiving batch data to a non existing namespace", async function (): Promise<void> {
      const receiver = sbClient.createReceiver("some-queue");

      await receiver.receiveMessages(10).catch(testError);

      should.equal(errorWasThrown, true, "Error thrown flag must be true");
    });

    it("throws error when receiving streaming data from a non existing namespace", async function (): Promise<void> {
      const receiver = sbClient.createReceiver("some-queue");
      reduceRetries(receiver);

      try {
        receiver.subscribe({
          async processMessage() {
            throw "processMessage should not have been called when receive call is made from a non existing namespace";
          },
          async processError(args) {
            const actual: Omit<ProcessErrorArgs, "error"> = {
              errorSource: args.errorSource,
              entityPath: args.entityPath,
              fullyQualifiedNamespace: args.fullyQualifiedNamespace,
            };

            actual.should.deep.equal({
              errorSource: "receive",
              entityPath: receiver.entityPath,
              fullyQualifiedNamespace: sbClient.fullyQualifiedNamespace,
            } as Omit<ProcessErrorArgs, "error">);

            testError(args.error);
          },
        });

        should.equal(
          await checkWithTimeout(() => errorWasThrown === true, 10, 3000),
          true,
          "Error thrown flag must be true"
        );
      } finally {
        await receiver.close();
      }
    });
  });

  describe("Errors with non existing Queue/Topic/Subscription", async function (): Promise<void> {
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

    const testError = (err: Error | ServiceBusError, entityPath?: string): void => {
      if (!isServiceBusError(err)) {
        should.equal(true, false, "Error expected to be instance of ServiceBusError");
      } else {
        should.equal(err.code, "MessagingEntityNotFound", "Error code is different than expected");
        if (entityPath) {
          should.equal(
            err.message.includes(
              `The messaging entity 'sb://${sbClient.fullyQualifiedNamespace}/${entityPath}' could not be found.`
            ),
            true,
            `Expecting error message to contain "The messaging entity 'sb://${sbClient.fullyQualifiedNamespace}/${entityPath}' could not be found." but got ${err.message}`
          );
        }
        errorWasThrown = true;
      }
    };

    it("throws error when receiving batch data from a non existing queue", async function (): Promise<void> {
      const receiver = sbClient.createReceiver("some-name");
      await receiver.receiveMessages(1).catch((err) => testError(err, "some-name"));

      should.equal(errorWasThrown, true, "Error thrown flag must be true");
    });

    it("throws error when receiving batch data from a non existing topic", async function (): Promise<void> {
      const receiver = sbClient.createReceiver("some-topic-name", "some-subscription-name");
      await receiver
        .receiveMessages(1)
        .catch((err) => testError(err, "some-topic-name/Subscriptions/some-subscription-name"));

      should.equal(errorWasThrown, true, "Error thrown flag must be true");
    });

    it("throws error when receiving batch data from a non existing subscription", async function (): Promise<void> {
      const entityNames = await sbClient.test.createTestEntities(TestClientType.PartitionedTopic);
      if (!entityNames.topic) {
        throw new Error("Expecting valid topic name");
      }
      const receiver = sbClient.createReceiver(entityNames.topic, "some-subscription-name");
      await receiver.receiveMessages(1).catch((err) => {
        testError(err);
        console.log(err.message);
        const namespace = sbClient.fullyQualifiedNamespace.split(".")[0];
        const entityPattern = `The messaging entity '${namespace}:topic:${entityNames.topic}.*|some-subscription-name`;
        should.equal(
          new RegExp(entityPattern).test(err.message),
          true,
          `Expect error message to contain pattern "${entityPattern}" but got ${err.message}`
        );
      });

      should.equal(errorWasThrown, true, "Error thrown flag must be true");
    });

    it("throws error when receiving streaming data from a non existing queue", async function (): Promise<void> {
      const receiver = sbClient.createReceiver("some-name");
      reduceRetries(receiver);

      receiver.subscribe({
        async processMessage() {
          throw "processMessage should not have been called when receive call is made from a non existing namespace";
        },
        async processError(args) {
          const actual: Omit<ProcessErrorArgs, "error"> = {
            errorSource: args.errorSource,
            entityPath: args.entityPath,
            fullyQualifiedNamespace: args.fullyQualifiedNamespace,
          };

          actual.should.deep.equal({
            errorSource: "receive",
            entityPath: receiver.entityPath,
            fullyQualifiedNamespace: sbClient.fullyQualifiedNamespace,
          } as Omit<ProcessErrorArgs, "error">);

          testError(args.error, "some-name");
        },
      });

      should.equal(
        await checkWithTimeout(() => errorWasThrown === true, 10, 5000),
        true,
        "Error thrown flag must be true"
      );
      await receiver.close();
    });

    it("throws error when receiving streaming data from a non existing topic", async function (): Promise<void> {
      const receiver = sbClient.createReceiver(
        "some-topic-name",
        "some-subscription-name"
      ) as ServiceBusReceiverImpl;
      reduceRetries(receiver);

      receiver.subscribe({
        async processMessage() {
          throw "processMessage should not have been called when subscribing to a non existing topic";
        },
        async processError(args) {
          const expected: Omit<ProcessErrorArgs, "error"> = {
            errorSource: args.errorSource,
            entityPath: args.entityPath,
            fullyQualifiedNamespace: args.fullyQualifiedNamespace,
          };

          expected.should.deep.equal({
            errorSource: "receive",
            entityPath: receiver.entityPath,
            fullyQualifiedNamespace: sbClient.fullyQualifiedNamespace,
          } as Omit<ProcessErrorArgs, "error">);

          testError(args.error, "some-topic-name/Subscriptions/some-subscription-name");
        },
      });

      should.equal(
        await checkWithTimeout(
          () => errorWasThrown === true,
          1000,
          CoreAmqpConstants.defaultOperationTimeoutInMs * 2 // arbitrary, just don't want it to be too short.
        ),
        true,
        "Error thrown flag must be true"
      );

      await receiver.close();
    });

    it("throws error when receiving streaming data from a non existing subscription", async function (): Promise<void> {
      const entityNames = await sbClient.test.createTestEntities(TestClientType.PartitionedTopic);
      if (!entityNames.topic) {
        throw new Error("Expecting valid topic name");
      }
      const receiver = sbClient.createReceiver(
        entityNames.topic,
        "some-subscription-name"
      ) as ServiceBusReceiverImpl;
      reduceRetries(receiver);

      receiver.subscribe({
        async processMessage() {
          throw "processMessage should not have been called when receive call when subscribing to a non existing subscription";
        },
        async processError(args) {
          const expected: Omit<ProcessErrorArgs, "error"> = {
            errorSource: args.errorSource,
            entityPath: args.entityPath,
            fullyQualifiedNamespace: args.fullyQualifiedNamespace,
          };

          expected.should.deep.equal({
            errorSource: "receive",
            entityPath: receiver.entityPath,
            fullyQualifiedNamespace: sbClient.fullyQualifiedNamespace,
          } as Omit<ProcessErrorArgs, "error">);

          testError(args.error);
          const namespace = sbClient.fullyQualifiedNamespace.split(".")[0];
          const entityPattern = `The messaging entity '${namespace}:topic:${entityNames.topic}.*|some-subscription-name`;
          should.equal(
            new RegExp(entityPattern).test(args.error.message),
            true,
            `Expect error message to contain pattern "${entityPattern}" but got ${args.error.message}`
          );
        },
      });

      should.equal(
        await checkWithTimeout(
          () => errorWasThrown === true,
          1000,
          CoreAmqpConstants.defaultOperationTimeoutInMs * 2 // arbitrary, just don't want it to be too short.
        ),
        true,
        "Error thrown flag must be true"
      );

      await receiver.close();
    });
  });

  describe("Test ServiceBusClient with TokenCredentials", function (): void {
    let errorWasThrown: boolean = false;

    const env = getEnvVars();
    const serviceBusEndpoint = (env.SERVICEBUS_CONNECTION_STRING.match(
      "Endpoint=sb://((.*).servicebus.(windows.net|usgovcloudapi.net|chinacloudapi.cn))"
    ) || "")[1];

    /**
     * Utility to create EnvironmentCredential using `@azure/identity`
     */
    function getDefaultTokenCredential(): EnvironmentCredential {
      should.exist(
        env[EnvVarNames.AZURE_CLIENT_ID],
        "define AZURE_CLIENT_ID in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarNames.AZURE_TENANT_ID],
        "define AZURE_TENANT_ID in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarNames.AZURE_CLIENT_SECRET],
        "define AZURE_CLIENT_SECRET in your environment before running integration tests."
      );
      should.exist(
        env[EnvVarNames.SERVICEBUS_CONNECTION_STRING],
        "define SERVICEBUS_CONNECTION_STRING in your environment before running integration tests."
      );
      return new EnvironmentCredential();
    }

    it("throws error for invalid tokenCredentials", async function (): Promise<void> {
      try {
        new ServiceBusClient(serviceBusEndpoint, [] as any);
      } catch (err: any) {
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

    it("throws error for undefined tokenCredentials", async function (): Promise<void> {
      try {
        new ServiceBusClient(serviceBusEndpoint, undefined as any);
      } catch (err: any) {
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

    if (isNode) {
      it("throws error for invalid host name", async function (): Promise<void> {
        try {
          new ServiceBusClient(123 as any, getDefaultTokenCredential());
        } catch (error: any) {
          errorWasThrown = true;
          should.equal(
            error.message,
            "`host` parameter is not a string",
            "ErrorMessage is different than expected"
          );
        }
        should.equal(errorWasThrown, true, "Error thrown flag must be true");
      });

      it(
        noSessionTestClientType + ": sends a message to the ServiceBus entity",
        async function (): Promise<void> {
          const tokenCreds = getDefaultTokenCredential();

          const serviceBusClient = createServiceBusClientForTests();
          const entities = await serviceBusClient.test.createTestEntities(noSessionTestClientType);
          await serviceBusClient.close();

          const sbClient = new ServiceBusClient(serviceBusEndpoint, tokenCreds);
          try {
            const sender = sbClient.createSender(entities.queue || entities.topic!);
            const receiver = entities.queue
              ? sbClient.createReceiver(entities.queue!)
              : sbClient.createReceiver(entities.topic!, entities.subscription!);

            const testMessages = TestMessage.getSample();
            await sender.sendMessages(testMessages);
            const msgs = await receiver.receiveMessages(1);

            should.equal(Array.isArray(msgs), true, "`ReceivedMessages` is not an array");
            should.equal(msgs[0].body, testMessages.body, "MessageBody is different than expected");
            should.equal(msgs.length, 1, "Unexpected number of messages");
            should.equal(msgs[0].state, "active");
          } finally {
            await sbClient.close();
          }
        }
      );
    }
  });

  describe("Errors after close()", function (): void {
    let sbClient: ServiceBusClientForTests;
    let sender: ServiceBusSender;
    let receiver: ServiceBusReceiver;
    let receivedMessage: ServiceBusReceivedMessage;
    let entityName: EntityName;

    afterEach(async () => {
      await sbClient.test.afterEach();
      await sbClient.test.after();
    });

    async function beforeEachTest(
      entityType: TestClientType,
      entityToClose: string
    ): Promise<void> {
      sbClient = createServiceBusClientForTests();
      entityName = await sbClient.test.createTestEntities(entityType);

      sender = sbClient.test.addToCleanup(
        sbClient.createSender(entityName.queue ?? entityName.topic!)
      );
      receiver = await sbClient.test.createPeekLockReceiver(entityName);

      // Normal send/receive
      const testMessage = entityName.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      await sender.sendMessages(testMessage);
      const receivedMsgs = await receiver.receiveMessages(1, { maxWaitTimeInMs: 5000 });
      should.equal(receivedMsgs.length, 1, "Unexpected number of messages received");
      receivedMessage = receivedMsgs[0];

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
     * Tests the error from settling a message after the receiver is closed - only valid for sessions.
     * For non-sessions, managementLink allows backup message settlement even after the receiver is closed.
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
            await receiver.completeMessage(receivedMessage);
            break;
          case DispositionType.abandon:
            await receiver.abandonMessage(receivedMessage);
            break;
          case DispositionType.defer:
            await receiver.deferMessage(receivedMessage);
            break;
          case DispositionType.deadletter:
            await receiver.deadLetterMessage(receivedMessage);
            break;

          default:
            break;
        }
      } catch (error: any) {
        caughtError = error;
      }

      const expectedErrorMsg = getReceiverClosedErrorMsg(
        receiver.entityPath,
        receivedMessage.sessionId
      );
      should.equal(caughtError && caughtError.message, expectedErrorMsg);
    }

    /**
     * Tests that each feature of the sender throws expected error
     */
    async function testSender(expectedErrorMsg: string): Promise<void> {
      should.equal(sender.isClosed, true, "Sender is not marked as closed.");

      const testMessage = TestMessage.getSample();
      let errorSend: string = "";
      await sender.sendMessages(testMessage).catch((err) => {
        errorSend = err.message;
      });
      should.equal(errorSend, expectedErrorMsg, "Expected error not thrown for sendMessages()");

      let errorCreateBatch: string = "";
      await sender.createMessageBatch().catch((err) => {
        errorCreateBatch = err.message;
      });
      should.equal(
        errorCreateBatch,
        expectedErrorMsg,
        "Expected error not thrown for createBatch()"
      );

      let errorSendBatch: string = "";
      await sender.sendMessages(1 as any).catch((err) => {
        errorSendBatch = err.message;
      });
      should.equal(errorSendBatch, expectedErrorMsg, "Expected error not thrown for sendBatch()");

      let errorScheduleMsgs: string = "";
      await sender.scheduleMessages([testMessage], new Date(Date.now() + 30000)).catch((err) => {
        errorScheduleMsgs = err.message;
      });
      should.equal(
        errorScheduleMsgs,
        expectedErrorMsg,
        "Expected error not thrown for scheduleMessages()"
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
        sbClient.createSender(entityName.queue ?? entityName.topic!);
      } catch (err: any) {
        errorNewSender = err.message;
      }
      should.equal(
        errorNewSender,
        expectedErrorMsg,
        "Expected error not thrown for createSender()"
      );
    }

    /**
     * Tests that each feature of the receiver throws expected error
     */
    async function testReceiver(expectedErrorMsg: string): Promise<void> {
      should.equal(receiver.isClosed, true, "Receiver is not marked as closed.");

      let errorReceiveBatch: string = "";
      await receiver.receiveMessages(1, { maxWaitTimeInMs: 1000 }).catch((err) => {
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
          async processMessage() {
            /** Nothing to do here */
          },
          async processError(e) {
            console.log(e);
          },
        });
      } catch (err: any) {
        errorReceiveStream = err.message;
      }
      should.equal(
        errorReceiveStream,
        expectedErrorMsg,
        "Expected error not thrown for registerMessageHandler()"
      );

      let errorDeferredMsgs: string = "";
      await receiver.receiveDeferredMessages(Long.ZERO).catch((err) => {
        errorDeferredMsgs = err.message;
      });
      should.equal(
        errorDeferredMsgs,
        expectedErrorMsg,
        "Expected error not thrown for receiveDeferredMessages()"
      );

      let errorPeek: string = "";
      await receiver.peekMessages(1).catch((err) => {
        errorPeek = err.message;
      });
      should.equal(
        errorPeek,
        expectedErrorMsg,
        "Expected error not thrown for peekMessages() from receiver"
      );
    }

    /**
     * Tests creating new receiver throws expected error
     */
    async function testCreateReceiver(expectedErrorMsg: string): Promise<void> {
      let errorNewReceiver: string = "";
      try {
        receiver = await sbClient.test.createPeekLockReceiver(entityName);
      } catch (err: any) {
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
      const sessionReceiver = receiver as ServiceBusSessionReceiver;

      let errorPeek: string = "";
      await sessionReceiver.peekMessages(1).catch((err) => {
        errorPeek = err.message;
      });
      should.equal(
        errorPeek,
        expectedErrorMsg,
        "Expected error not thrown for peek() from sessionReceiver"
      );

      let errorPeekBySequence: string = "";
      await sessionReceiver.peekMessages(1, { fromSequenceNumber: Long.ZERO }).catch((err) => {
        errorPeekBySequence = err.message;
      });
      should.equal(
        errorPeekBySequence,
        expectedErrorMsg,
        "Expected error not thrown for peekBySequenceNumber() from sessionReceiver"
      );

      let errorGetState: string = "";
      await sessionReceiver.getSessionState().catch((err) => {
        errorGetState = err.message;
      });
      should.equal(
        errorGetState,
        expectedErrorMsg,
        "Expected error not thrown for getSessionState()"
      );

      let errorSetState: string = "";
      await sessionReceiver.setSessionState("state!!").catch((err) => {
        errorSetState = err.message;
      });
      should.equal(
        errorSetState,
        expectedErrorMsg,
        "Expected error not thrown for setSessionState()"
      );
    }

    describe("Errors after close() on namespace", function (): void {
      const entityToClose = "namespace";
      const expectedErrorMsg = "The underlying AMQP connection is closed.";

      it(
        noSessionTestClientType + ": errors after close() on namespace",
        async function (): Promise<void> {
          await beforeEachTest(noSessionTestClientType, entityToClose);

          await testSender(expectedErrorMsg);
          await testCreateSender(expectedErrorMsg);
          await testReceiver(expectedErrorMsg);
          await testCreateReceiver(expectedErrorMsg);
        }
      );

      it(
        withSessionTestClientType + ": errors after close() on namespace",
        async function (): Promise<void> {
          await beforeEachTest(withSessionTestClientType, entityToClose);

          await testSender(expectedErrorMsg);
          await testCreateSender(expectedErrorMsg);
          await testSessionReceiver(expectedErrorMsg);
          await testCreateReceiver(expectedErrorMsg);
        }
      );
    });

    describe("Errors after close() on receiver", function (): void {
      const entityToClose = "receiver";

      it(
        noSessionTestClientType + ": errors after close() on receiver",
        async function (): Promise<void> {
          await beforeEachTest(noSessionTestClientType, entityToClose);

          await testReceiver(getReceiverClosedErrorMsg(receiver.entityPath));

          await testAllDispositions();
        }
      );

      it(
        withSessionTestClientType + ": errors after close() on receiver",
        async function (): Promise<void> {
          await beforeEachTest(withSessionTestClientType, entityToClose);

          await testReceiver(getReceiverClosedErrorMsg(receiver.entityPath, TestMessage.sessionId));

          await testAllDispositions();
        }
      );
    });

    describe("Errors after close() on sender", function (): void {
      const entityToClose = "sender";

      it(
        noSessionTestClientType + ": errors after close() on sender",
        async function (): Promise<void> {
          await beforeEachTest(noSessionTestClientType, entityToClose);
          await testSender(getSenderClosedErrorMsg(sender.entityPath));
        }
      );
    });
  });

  describe("entityPath on sender and receiver", async () => {
    let sbClient: ServiceBusClientForTests;

    before(() => {
      sbClient = createServiceBusClientForTests();
    });

    afterEach(async () => {
      await sbClient.test.afterEach();
    });
    after(async () => {
      await sbClient.test.after();
    });

    it("Entity Path on Sender", () => {
      const dummyQueueOrTopicName = "dummy";
      const sender = sbClient.createSender(dummyQueueOrTopicName);
      should.equal(
        sender.entityPath,
        dummyQueueOrTopicName,
        "Entity path on the sender did not match!"
      );
    });

    it("Entity Path on Queue Receiver", () => {
      const dummyQueueName = "dummy";
      const receiver = sbClient.createReceiver(dummyQueueName);
      should.equal(
        receiver.entityPath,
        dummyQueueName,
        "Entity path on the receiver for queue did not match!"
      );
    });

    it("Entity Path on Queue deadletter Receiver", () => {
      const dummyQueueName = "dummy";
      const receiver = sbClient.createReceiver(dummyQueueName, { subQueueType: "deadLetter" });
      should.equal(
        receiver.entityPath,
        `${dummyQueueName}/$DeadLetterQueue`,
        "Entity path on the receiver for queue did not match!"
      );
    });

    it("Entity Path on Subscription Receiver", () => {
      const dummyTopicName = "dummyTopicName";
      const dummySubscriptionName = "dummySubscriptionName";
      const receiver = sbClient.createReceiver(dummyTopicName, dummySubscriptionName);
      should.equal(
        receiver.entityPath,
        `${dummyTopicName}/Subscriptions/${dummySubscriptionName}`,
        "Entity path on the receiver for subscription did not match!"
      );
    });

    it("Entity Path on Subscription deadletter Receiver", () => {
      const dummyTopicName = "dummyTopicName";
      const dummySubscriptionName = "dummySubscriptionName";
      const receiver = sbClient.createReceiver(dummyTopicName, dummySubscriptionName, {
        subQueueType: "deadLetter",
      });
      should.equal(
        receiver.entityPath,
        `${dummyTopicName}/Subscriptions/${dummySubscriptionName}/$DeadLetterQueue`,
        "Entity path on the receiver for subscription did not match!"
      );
    });

    it(withSessionTestClientType + ": EntityPath on Session Receiver", async () => {
      const entityName = await sbClient.test.createTestEntities(withSessionTestClientType);

      const receiver = await sbClient.test.createPeekLockReceiver(entityName);
      const expectedEntityPath = entityName.queue
        ? entityName.queue
        : `${entityName.topic}/Subscriptions/${entityName.subscription}`;
      should.equal(
        receiver.entityPath,
        expectedEntityPath,
        "Entity path on the session receiver for did not match!"
      );
    });
  });
});

function reduceRetries(receiver: ServiceBusReceiver): void {
  // for some tests the important thing is just to run a single retry cycle (and then report)
  // the error. This reduces everything so we run a short retry cycle.
  //
  // There are other tests that ensure that the retry cycle does work properly.
  (receiver as ServiceBusReceiverImpl)["_retryOptions"] = {
    ...(receiver as ServiceBusReceiverImpl)["_retryOptions"],
    maxRetries: 0,
    timeoutInMs: 0,
    maxRetryDelayInMs: 0,
    retryDelayInMs: 0,
  };
}
