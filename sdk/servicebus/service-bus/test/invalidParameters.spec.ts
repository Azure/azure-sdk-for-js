// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import Long from "long";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { TestClientType, TestMessage } from "./utils/testUtils";
import { ServiceBusClientForTests, createServiceBusClientForTests } from "./utils/testutils2";
import { Sender } from "../src/sender";
import { SessionReceiver } from "../src/receivers/sessionReceiver";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";
import { ServiceBusClient } from "../src";

describe("invalid parameters", () => {
  let serviceBusClient: ServiceBusClientForTests;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  describe("Invalid parameters in SessionReceiver", function(): void {
    let sender: Sender;
    let receiver: SessionReceiver<ReceivedMessageWithLock>;

    // Since, the below tests never actually make use of any AMQP links, there is no need to create
    // new sender/receiver clients before each test. Doing it once for each describe block.
    before(async () => {
      const entityNames = await serviceBusClient.test.createTestEntities(
        TestClientType.PartitionedQueueWithSessions
      );

      sender = serviceBusClient.test.addToCleanup(
        serviceBusClient.createSender(entityNames.queue!)
      );

      receiver = await serviceBusClient.test.getSessionPeekLockReceiver(entityNames, {
        sessionId: TestMessage.sessionId
      });

      await sender.sendMessages(TestMessage.getSessionSample());
    });

    after(() => {
      return serviceBusClient.test.afterEach();
    });

    it("SessionReceiver: Throws error if created a client with invalid receiveMode", async function(): Promise<
      void
    > {
      let errorCaught: string = "";
      try {
        const { queue } = serviceBusClient.test.getTestEntities(
          TestClientType.PartitionedQueueWithSessions
        );

        await serviceBusClient.createSessionReceiver(queue!, {
          sessionId: TestMessage.sessionId,
          receiveMode: 123 as any
        });
      } catch (error) {
        errorCaught = error.message;
      }
      should.equal(
        errorCaught,
        "Unable to parse the arguments\nTypeError: Invalid receiveMode provided",
        "Did not throw error if created a client with invalid receiveMode."
      );
    });

    it("Peek: Invalid maxMessageCount in SessionReceiver", async function(): Promise<void> {
      const peekedMessages = await receiver.peekMessages(-100);
      should.equal(peekedMessages.length, 0);
    });

    it("Peek: Wrong type maxMessageCount in SessionReceiver", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        // @ts-expect-error
        await receiver.peekMessages("somestring");
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "maxMessageCount" should be of type "number"`
      );
    });

    it("PeekBySequenceNumber: Invalid maxMessageCount in SessionReceiver", async function(): Promise<
      void
    > {
      const peekedMessages = await receiver.peekMessages(-100, {
        fromSequenceNumber: Long.ZERO
      });
      should.equal(peekedMessages.length, 0);
    });

    it("PeekBySequenceNumber: Wrong type maxMessageCount in SessionReceiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        // @ts-expect-error
        await receiver.peekMessages("somestring", {
          fromSequenceNumber: Long.ZERO
        });
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "maxMessageCount" should be of type "number"`
      );
    });

    it("PeekBySequenceNumber: Wrong type sequenceNumber in SessionReceiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.peekMessages(1, { fromSequenceNumber: "somestring" as any });
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "fromSequenceNumber" should be of type "Long"`
      );
    });

    it("RegisterMessageHandler: Missing onMessage in SessionReceiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.subscribe(undefined as any, undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Invalid "MessageHandlers" provided.`);
    });

    it("RegisterMessageHandler: Wrong type for onMessage in SessionReceiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.subscribe("somestring" as any, "somethingelse" as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Invalid "MessageHandlers" provided.`);
    });

    it("ReceiveDeferredMessages: Wrong type sequenceNumber in SessionReceiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessages("somestring" as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "sequenceNumbers" should be of type "Long"`
      );
    });

    it("ReceiveDeferredMessages: Missing sequenceNumber in SessionReceiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessages(undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumbers"`);
    });

    it("ReceiveDeferredMessages: Wrong type sequenceNumber array in SessionReceiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessages(["somestring"] as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "sequenceNumbers" should be an array of type "Long"`
      );
    });
  });

  describe("Invalid parameters in Receiver", function(): void {
    const mockConnectionString =
      "Endpoint=sb://test/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=test";
    const sbClient = new ServiceBusClient(mockConnectionString);
    const receiver = sbClient.createReceiver("dummyQueue");

    it("Receiver: Invalid ReceiveMode", async function(): Promise<void> {
      let errorCaught: string = "";
      try {
        // @ts-expect-error
        sbClient.createReceiver("dummyQueue", { receiveMode: 123 });
      } catch (error) {
        errorCaught = error.message;
      }
      should.equal(
        errorCaught,
        "Unable to parse the arguments\nTypeError: Invalid receiveMode provided",
        "Did not throw error if created a client with invalid receiveMode."
      );
    });

    it("Peek: Invalid maxMessageCount for Queue", async function(): Promise<void> {
      const peekedMessages = await receiver.peekMessages(-100);
      should.equal(peekedMessages.length, 0);
    });

    it("Peek: Wrong type maxMessageCount for Queue", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        // @ts-expect-error
        await receiver.peekMessages("somestring");
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "maxMessageCount" should be of type "number"`
      );
    });

    it("PeekBySequenceNumber: Invalid maxMessageCount for Queue", async function(): Promise<void> {
      const peekedMessages = await receiver.peekMessages(-100, {
        fromSequenceNumber: Long.ZERO
      });
      should.equal(peekedMessages.length, 0);
    });

    it("PeekBySequenceNumber: Wrong type maxMessageCount for Queue", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        // @ts-expect-error
        await receiver.peekMessages("somestring", {
          fromSequenceNumber: Long.ZERO
        });
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "maxMessageCount" should be of type "number"`
      );
    });

    it("PeekBySequenceNumber: Wrong type fromSequenceNumber for Queue", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.peekMessages(1, { fromSequenceNumber: "somestring" as any });
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "fromSequenceNumber" should be of type "Long"`
      );
    });

    it("RegisterMessageHandler: Missing onMessage in Receiver", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await receiver.subscribe(undefined as any, undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Invalid "MessageHandlers" provided.`);
    });

    it("RegisterMessageHandler: Wrong type for onMessage in Receiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.subscribe("somestring" as any, "somethingelse" as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Invalid "MessageHandlers" provided.`);
    });

    it("ReceiveDeferredMessages: Wrong type sequenceNumber in Receiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessages("somestring" as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "sequenceNumbers" should be of type "Long"`
      );
    });

    it("ReceiveDeferredMessages: Missing sequenceNumber in Receiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessages(undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumbers"`);
    });

    it("ReceiveDeferredMessages: Wrong type sequenceNumber array in Receiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessages(["somestring"] as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "sequenceNumbers" should be an array of type "Long"`
      );
    });
  });

  describe("Invalid parameters in Sender", function(): void {
    const mockConnectionString =
      "Endpoint=sb://test/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=test";
    const sbClient = new ServiceBusClient(mockConnectionString);
    const sender = sbClient.createSender("dummyQueue");

    it("ScheduledMessages: Missing date in Sender", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await sender.scheduleMessages(undefined as any, undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `Missing parameter "scheduledEnqueueTimeUtc"`
      );
    });

    it("ScheduledMessages: Missing messages in Sender", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await sender.scheduleMessages(new Date(), undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Missing parameter "messages"`);
    });

    it("CancelScheduledMessages: Wrong type sequenceNumber in Sender", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await sender.cancelScheduledMessages("somestring" as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "sequenceNumbers" should be of type "Long"`
      );
    });

    it("CancelScheduledMessages: Missing sequenceNumbers in Sender", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await sender.cancelScheduledMessages(undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumbers"`);
    });

    it("CancelScheduledMessages: Wrong type sequenceNumbers array in Sender", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await sender.cancelScheduledMessages(["somestring"] as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "sequenceNumbers" should be an array of type "Long"`
      );
    });
  });
});
