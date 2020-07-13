// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import Long from "long";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { TestClientType, TestMessage } from "./utils/testUtils";
import { ServiceBusClientForTests, createServiceBusClientForTests } from "./utils/testutils2";
import { Receiver } from "../src/receivers/receiver";
import { Sender } from "../src/sender";
import { SessionReceiver } from "../src/receivers/sessionReceiver";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";

describe("invalid parameters", () => {
  let serviceBusClient: ServiceBusClientForTests;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  describe("Invalid parameters in Sender/ReceiverClients for PartitionedQueue", function(): void {
    let receiver: Receiver<ReceivedMessageWithLock>;

    // Since, the below tests never actually make use of any AMQP links, there is no need to create
    // new sender/receiver clients before each test. Doing it once for each describe block.
    before(async () => {
      const entityNames = await serviceBusClient.test.createTestEntities(
        TestClientType.PartitionedQueue
      );

      receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);
    });

    after(async () => {
      await serviceBusClient.test.afterEach();
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
  });

  describe("Invalid parameters in Sender/ReceiverClients for PartitionedSubscription", function(): void {
    let subscriptionReceiverClient: Receiver<ReceivedMessageWithLock>;
  
    // Since, the below tests never actually make use of any AMQP links, there is no need to create
    // new sender/receiver clients before each test. Doing it once for each describe block.
    before(async () => {
      const entityNames = await serviceBusClient.test.createTestEntities(
        TestClientType.PartitionedSubscription
      );

      subscriptionReceiverClient = await serviceBusClient.test.getPeekLockReceiver(entityNames);
    });

    after(() => {
      return serviceBusClient.test.afterEach();
    });

    it("Peek: Invalid maxMessageCount for Subscription", async function(): Promise<void> {
      const browsedMessages = await subscriptionReceiverClient.peekMessages(-100);
      should.equal(browsedMessages.length, 0);
    });

    it("Peek: Wrong type maxMessageCount for Subscription", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        // @ts-expect-error
        await subscriptionReceiverClient.peekMessages("somestring");
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "maxMessageCount" should be of type "number"`
      );
    });

    it("PeekBySequenceNumber: Invalid maxMessageCount for Subscription", async function(): Promise<
      void
    > {
      const browsedMessages = await subscriptionReceiverClient.peekMessages(-100, {
        fromSequenceNumber: Long.ZERO
      });
      should.equal(browsedMessages.length, 0);
    });

    it("PeekBySequenceNumber: Wrong type maxMessageCount for Subscription", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        // @ts-expect-error
        await subscriptionReceiverClient.peekMessages("somestring", {
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

    it("PeekBySequenceNumber: Wrong type fromSequenceNumber for Subscription", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await subscriptionReceiverClient.peekMessages(1, {
          fromSequenceNumber: "somestring" as any
        });
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "fromSequenceNumber" should be of type "Long"`
      );
    });
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

    it("SessionReceiver: Missing ReceiveMode", async function(): Promise<void> {
      let errorCaught: string = "";
      try {
        const { queue } = serviceBusClient.test.getTestEntities(
          TestClientType.PartitionedQueueWithSessions
        );

        await serviceBusClient.createSessionReceiver(queue!, undefined as any, {
          sessionId: TestMessage.sessionId
        });
      } catch (error) {
        errorCaught = error.message;
      }
      should.equal(
        errorCaught,
        "Invalid receiveMode provided",
        "Did not throw error if created a client with invalid receiveMode."
      );
    });

    it("SessionReceiver: Throws error if created a client with invalid receiveMode", async function(): Promise<
      void
    > {
      let errorCaught: string = "";
      try {
        const { queue } = serviceBusClient.test.getTestEntities(
          TestClientType.PartitionedQueueWithSessions
        );

        await serviceBusClient.createSessionReceiver(queue!, 123 as any, {
          sessionId: TestMessage.sessionId
        });
      } catch (error) {
        errorCaught = error.message;
      }
      should.equal(
        errorCaught,
        "Invalid receiveMode provided",
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
    let sender: Sender;
    let receiver: Receiver<ReceivedMessageWithLock>;

    // Since, the below tests never actually make use of any AMQP links, there is no need to create
    // new sender/receiver clients before each test. Doing it once for each describe block.
    before(async () => {
      const entityNames = await serviceBusClient.test.createTestEntities(
        TestClientType.PartitionedQueueWithSessions
      );

      sender = serviceBusClient.test.addToCleanup(
        serviceBusClient.createSender(entityNames.queue!)
      );

      receiver = await serviceBusClient.test.getPeekLockReceiver(entityNames);

      await sender.sendMessages(TestMessage.getSessionSample());
    });

    after(async () => {
      return serviceBusClient.test.afterEach();
    });

    it("Receiver: Missing ReceiveMode", async function(): Promise<void> {
      let errorCaught: string = "";
      try {
        const { queue } = serviceBusClient.test.getTestEntities(
          TestClientType.PartitionedQueueWithSessions
        );

        await serviceBusClient.createReceiver(queue!, undefined as any);
      } catch (error) {
        errorCaught = error.message;
      }
      should.equal(
        errorCaught,
        "Invalid receiveMode provided",
        "Did not throw error if created a client with invalid receiveMode."
      );
    });

    it("Receiver: Invalid ReceiveMode", async function(): Promise<void> {
      let errorCaught: string = "";
      try {
        const { queue } = serviceBusClient.test.getTestEntities(
          TestClientType.PartitionedQueueWithSessions
        );

        await serviceBusClient.createReceiver(queue!, 123 as any);
      } catch (error) {
        errorCaught = error.message;
      }
      should.equal(
        errorCaught,
        "Invalid receiveMode provided",
        "Did not throw error if created a client with invalid receiveMode."
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
    let sender: Sender;

    // Since, the below tests never actually make use of any AMQP links, there is no need to create
    // new sender/receiver clients before each test. Doing it once for each describe block.
    before(async () => {
      const { queue } = await serviceBusClient.test.createTestEntities(
        TestClientType.PartitionedQueue
      );

      // const clients = await getSenderReceiverClients(TestClientType.PartitionedQueue, "peekLock");
      sender = serviceBusClient.test.addToCleanup(serviceBusClient.createSender(queue!));
    });

    after(() => {
      return serviceBusClient.test.afterEach();
    });

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
