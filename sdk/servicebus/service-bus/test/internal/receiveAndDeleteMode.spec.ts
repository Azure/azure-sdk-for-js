// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
const should = chai.should();
const expect = chai.expect;
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import {
  ServiceBusReceivedMessage,
  ServiceBusMessage,
  ServiceBusReceiver,
  ProcessErrorArgs,
  ServiceBusSender,
} from "../../src";

import { TestClientType, TestMessage, checkWithTimeout } from "../public/utils/testUtils";

import { InvalidOperationInReceiveAndDeleteMode } from "../../src/util/errors";
import {
  EntityName,
  ServiceBusClientForTests,
  createServiceBusClientForTests,
  testPeekMsgsLength,
  getRandomTestClientTypeWithSessions,
  getRandomTestClientTypeWithNoSessions,
} from "../public/utils/testutils2";
import { DispositionType } from "../../src/serviceBusMessage";

let errorWasThrown: boolean;
const noSessionTestClientType = getRandomTestClientTypeWithNoSessions();
const withSessionTestClientType = getRandomTestClientTypeWithSessions();

describe("receive and delete", () => {
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

  async function beforeEachTest(
    entityType: TestClientType,
    receiveMode?: "peekLock" | "receiveAndDelete"
  ): Promise<EntityName> {
    entityName = await serviceBusClient.test.createTestEntities(entityType);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityName.queue ?? entityName.topic!)
    );
    if (receiveMode === "peekLock") {
      receiver = await serviceBusClient.test.createPeekLockReceiver(entityName);
    } else {
      receiver = await serviceBusClient.test.createReceiveAndDeleteReceiver(entityName);
    }

    errorWasThrown = false;
    return entityName;
  }

  function afterEachTest(): Promise<void> {
    return serviceBusClient.test.afterEach();
  }

  describe("Batch Receiver in ReceiveAndDelete mode", function (): void {
    afterEach(async () => {
      await afterEachTest();
    });

    async function sendReceiveMsg(testMessages: ServiceBusMessage): Promise<void> {
      await sender.sendMessages(testMessages);
      const msgs = await receiver.receiveMessages(1);

      should.equal(
        !msgs[0].lockToken,
        true,
        "Msgs in receiveAndDelete mode should not have locktoken! We use this assumption to differentiate between the two receive modes."
      );

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

    async function testNoSettlement(): Promise<void> {
      const testMessages = entityName.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      await sendReceiveMsg(testMessages);

      await testPeekMsgsLength(receiver, 0);
    }

    it(
      noSessionTestClientType + ": No settlement of the message removes message",
      async function (): Promise<void> {
        await beforeEachTest(noSessionTestClientType);
        await testNoSettlement();
      }
    );

    it(
      withSessionTestClientType + ": No settlement of the message removes message",
      async function (): Promise<void> {
        await beforeEachTest(withSessionTestClientType);
        await testNoSettlement();
      }
    );
  });

  describe("Streaming Receiver in ReceiveAndDelete mode", function (): void {
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
      const receivedMsgs: ServiceBusReceivedMessage[] = [];

      receiver.subscribe(
        {
          async processMessage(message: ServiceBusReceivedMessage): Promise<void> {
            receivedMsgs.push(message);
          },
          async processError(args: ProcessErrorArgs): Promise<void> {
            errors.push(args.error.message);
          },
        },
        { autoCompleteMessages: autoCompleteFlag }
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

    async function testNoSettlement(autoCompleteFlag: boolean): Promise<void> {
      const testMessages = entityName.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      await sendReceiveMsg(testMessages, autoCompleteFlag);

      await testPeekMsgsLength(receiver, 0);
    }

    it(
      noSessionTestClientType +
        ": With auto-complete enabled, no settlement of the message removes message",
      async function (): Promise<void> {
        await beforeEachTest(noSessionTestClientType);
        await testNoSettlement(true);
      }
    );

    it(
      withSessionTestClientType +
        ": With auto-complete enabled, no settlement of the message removes message",
      async function (): Promise<void> {
        await beforeEachTest(withSessionTestClientType);
        await testNoSettlement(true);
      }
    );

    it(
      noSessionTestClientType +
        ": With auto-complete disabled, no settlement of the message removes message",
      async function (): Promise<void> {
        await beforeEachTest(noSessionTestClientType);
        await testNoSettlement(false);
      }
    );

    it(
      withSessionTestClientType +
        ": With auto-complete disabled, no settlement of the message removes message",
      async function (): Promise<void> {
        await beforeEachTest(withSessionTestClientType);
        await testNoSettlement(false);
      }
    );
  });

  describe("Settlement with ReceiveAndDelete mode", () => {
    afterEach(async () => {
      await afterEachTest();
    });

    async function sendReceiveMsg(
      testMessages: ServiceBusMessage
    ): Promise<ServiceBusReceivedMessage> {
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

    const testError = (err: Error): void => {
      expect(err.message, "ErrorMessage is different than expected").equals(
        InvalidOperationInReceiveAndDeleteMode
      );
    };

    async function testSettlement(operation: DispositionType): Promise<void> {
      const testMessages = entityName.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      const msg = await sendReceiveMsg(testMessages);

      try {
        if (operation === DispositionType.complete) {
          await receiver.completeMessage(msg);
        } else if (operation === DispositionType.abandon) {
          await receiver.abandonMessage(msg);
        } else if (operation === DispositionType.deadletter) {
          await receiver.deadLetterMessage(msg);
        } else if (operation === DispositionType.defer) {
          await receiver.deferMessage(msg);
        }
      } catch (err) {
        errorWasThrown = true;
        testError(err);
      }

      should.equal(errorWasThrown, true, "Error thrown flag must be true");

      await testPeekMsgsLength(receiver, 0);
    }

    it(noSessionTestClientType + ": complete() throws error", async function (): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testSettlement(DispositionType.complete);
    });

    it(withSessionTestClientType + ": complete() throws error", async function (): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      await testSettlement(DispositionType.complete);
    });

    it(noSessionTestClientType + ": abandon() throws error", async function (): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testSettlement(DispositionType.abandon);
    });

    it(withSessionTestClientType + ": abandon() throws error", async function (): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      await testSettlement(DispositionType.abandon);
    });

    it(noSessionTestClientType + ": defer() throws error", async function (): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testSettlement(DispositionType.defer);
    });

    it(withSessionTestClientType + ": defer() throws error", async function (): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      await testSettlement(DispositionType.defer);
    });

    it(noSessionTestClientType + ": deadLetter() throws error", async function (): Promise<void> {
      await beforeEachTest(noSessionTestClientType);
      await testSettlement(DispositionType.deadletter);
    });

    it(withSessionTestClientType + ": deadLetter() throws error", async function (): Promise<void> {
      await beforeEachTest(withSessionTestClientType);
      await testSettlement(DispositionType.deadletter);
    });

    async function testRenewLock(): Promise<void> {
      const msg = await sendReceiveMsg(TestMessage.getSample());

      await receiver.renewMessageLock(msg).catch((err) => {
        should.equal(
          err.message,
          InvalidOperationInReceiveAndDeleteMode,
          "ErrorMessage is different than expected"
        );
        errorWasThrown = true;
      });

      should.equal(errorWasThrown, true, "Error thrown flag must be true");
    }

    it(
      noSessionTestClientType + ": Renew message lock throws error",
      async function (): Promise<void> {
        await beforeEachTest(noSessionTestClientType);
        await testRenewLock();
      }
    );
  });

  describe("Receive Deferred messages in ReceiveAndDelete mode", function (): void {
    let entityNames: EntityName;

    afterEach(async () => {
      await afterEachTest();
    });
    async function deferMessage(testClientType: TestClientType): Promise<Long> {
      entityNames = await beforeEachTest(testClientType, "peekLock");
      const testMessages = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
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

      await receiver.deferMessage(msgs[0]);
      return msgs[0].sequenceNumber!;
    }

    async function testDeferredMessage(
      testClientType: TestClientType
    ): Promise<ServiceBusReceivedMessage> {
      const sequenceNumber = await deferMessage(testClientType);
      await receiver.close();
      receiver = await serviceBusClient.test.createReceiveAndDeleteReceiver(entityNames);

      const [deferredMsg] = await receiver.receiveDeferredMessages(sequenceNumber);
      if (!deferredMsg) {
        throw `No message received for sequence number ${sequenceNumber}`;
      }

      should.equal(deferredMsg!.deliveryCount, 1, "DeliveryCount is different than expected");
      await testPeekMsgsLength(receiver, 0);

      return deferredMsg;
    }

    /*
    // The below are commented due to service bug described in https://github.com/Azure/azure-sdk-for-js/issues/2268
    it("Partitioned Queue: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await testDeferredMessage(TestClientType.PartitionedQueue);
    });

    it("Partitioned Subscription: No settlement of the message removes message", async function(): Promise<
      void
    > {
      await testDeferredMessage(TestClientType.PartitionedSubscription);
    });
    */

    it("Unpartitioned Queue: No settlement of the message removes message", async function (): Promise<void> {
      await testDeferredMessage(TestClientType.UnpartitionedQueue);
    });

    it("Unpartitioned Subscription: No settlement of the message removes message", async function (): Promise<void> {
      await testDeferredMessage(TestClientType.UnpartitionedSubscription);
    });

    it(
      withSessionTestClientType + ": No settlement of the message removes message",
      async function (): Promise<void> {
        await testDeferredMessage(withSessionTestClientType);
      }
    );
  });

  describe("Settlement of deferred msg in ReceiveAndDelete mode", () => {
    afterEach(async () => {
      await afterEachTest();
    });

    let entityNames: EntityName;

    async function testDeferredMessage(
      testClientType: TestClientType
    ): Promise<ServiceBusReceivedMessage> {
      entityNames = await beforeEachTest(testClientType, "peekLock");

      // send message
      const testMessage = entityNames.usesSessions
        ? TestMessage.getSessionSample()
        : TestMessage.getSample();
      await sender.sendMessages(testMessage);

      // receive and defer the message
      const [msg] = await receiver.receiveMessages(1);
      await receiver.deferMessage(msg);
      const sequenceNumber = msg.sequenceNumber!;
      await receiver.close();

      // Receive the deferred message in ReceiveAndDelete mode
      receiver = await serviceBusClient.test.createReceiveAndDeleteReceiver(entityNames);
      const [deferredMsg] = await receiver.receiveDeferredMessages(sequenceNumber);
      if (!deferredMsg) {
        throw `No message received for sequence number ${sequenceNumber}`;
      }

      return deferredMsg;
    }

    const testError = (err: Error): void => {
      expect(err.message, "ErrorMessage is different than expected").equals(
        InvalidOperationInReceiveAndDeleteMode
      );
    };

    async function testSettlement(
      testClienttype: TestClientType,
      operation: DispositionType
    ): Promise<void> {
      const deferredMsg = await testDeferredMessage(testClienttype);

      try {
        if (operation === DispositionType.complete) {
          await receiver.completeMessage(deferredMsg);
        } else if (operation === DispositionType.abandon) {
          await receiver.abandonMessage(deferredMsg);
        } else if (operation === DispositionType.deadletter) {
          await receiver.deadLetterMessage(deferredMsg);
        } else if (operation === DispositionType.defer) {
          await receiver.deferMessage(deferredMsg);
        }
      } catch (err) {
        errorWasThrown = true;
        testError(err);
      }

      should.equal(errorWasThrown, true, "Error thrown flag must be true");
    }

    it(noSessionTestClientType + ": complete() throws error", async function (): Promise<void> {
      await testSettlement(noSessionTestClientType, DispositionType.complete);
    });

    it(withSessionTestClientType + ": complete() throws error", async function (): Promise<void> {
      await testSettlement(withSessionTestClientType, DispositionType.complete);
    });

    it(noSessionTestClientType + ": abandon() throws error", async function (): Promise<void> {
      await testSettlement(noSessionTestClientType, DispositionType.abandon);
    });

    it(withSessionTestClientType + ": abandon() throws error", async function (): Promise<void> {
      await testSettlement(withSessionTestClientType, DispositionType.abandon);
    });

    it(noSessionTestClientType + ": defer() throws error", async function (): Promise<void> {
      await testSettlement(noSessionTestClientType, DispositionType.defer);
    });

    it(withSessionTestClientType + ": defer() throws error", async function (): Promise<void> {
      await testSettlement(withSessionTestClientType, DispositionType.defer);
    });

    it(noSessionTestClientType + ": deadLetter() throws error", async function (): Promise<void> {
      await testSettlement(noSessionTestClientType, DispositionType.deadletter);
    });

    it(withSessionTestClientType + ": deadLetter() throws error", async function (): Promise<void> {
      await testSettlement(withSessionTestClientType, DispositionType.deadletter);
    });

    async function testRenewLock(testClienttype: TestClientType): Promise<void> {
      const deferredMsg = await testDeferredMessage(testClienttype);

      await receiver.renewMessageLock(deferredMsg).catch((err) => {
        should.equal(
          err.message,
          InvalidOperationInReceiveAndDeleteMode,
          "ErrorMessage is different than expected"
        );
        errorWasThrown = true;
      });

      should.equal(errorWasThrown, true, "Error thrown flag must be true");
    }

    it(
      noSessionTestClientType + ": Renew message lock throws error",
      async function (): Promise<void> {
        await testRenewLock(noSessionTestClientType);
      }
    );
  });
});
