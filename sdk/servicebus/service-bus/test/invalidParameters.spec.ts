// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import Long from "long";
const should = chai.should();
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
import { TestMessage, TestClientType } from "./utils/testUtils";
import { ServiceBusClientForTests, createServiceBusClientForTests } from "./utils/testutils2";
import { Receiver } from "../src/receivers/receiver";
import { Sender } from "../src/sender";
import { SessionReceiver } from "../src/receivers/sessionReceiver";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";
import { SubscriptionRuleManager } from "../src/receivers/subscriptionRuleManager";

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

      receiver = serviceBusClient.test.getPeekLockReceiver(entityNames);
    });

    after(async () => {
      await serviceBusClient.test.afterEach();
    });

    it("Peek: Invalid maxMessageCount for Queue", async function(): Promise<void> {
      const browsedMessages = await receiver.browseMessages({ maxMessageCount: -100 });
      should.equal(browsedMessages.length, 0);
    });

    it("Peek: Wrong type maxMessageCount for Queue", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await receiver.browseMessages({ maxMessageCount: "somestring" as any });
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
      const browsedMessages = await receiver.browseMessages({
        fromSequenceNumber: Long.ZERO,
        maxMessageCount: -100
      });
      should.equal(browsedMessages.length, 0);
    });

    it("PeekBySequenceNumber: Wrong type maxMessageCount for Queue", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.browseMessages({
          fromSequenceNumber: Long.ZERO,
          maxMessageCount: "somestring" as any
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
        await receiver.browseMessages({ fromSequenceNumber: "somestring" as any });
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
    let subscriptionRuleManager: SubscriptionRuleManager;

    // Since, the below tests never actually make use of any AMQP links, there is no need to create
    // new sender/receiver clients before each test. Doing it once for each describe block.
    before(async () => {
      const entityNames = await serviceBusClient.test.createTestEntities(
        TestClientType.PartitionedSubscription
      );

      subscriptionReceiverClient = serviceBusClient.test.getPeekLockReceiver(entityNames);

      subscriptionRuleManager = serviceBusClient.test.addToCleanup(
        serviceBusClient.getSubscriptionRuleManager(entityNames.topic!, entityNames.subscription!)
      );
    });

    after(() => {
      return serviceBusClient.test.afterEach();
    });

    it("Peek: Invalid maxMessageCount for Subscription", async function(): Promise<void> {
      const browsedMessages = await subscriptionReceiverClient.browseMessages({
        maxMessageCount: -100
      });
      should.equal(browsedMessages.length, 0);
    });

    it("Peek: Wrong type maxMessageCount for Subscription", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await subscriptionReceiverClient.browseMessages({ maxMessageCount: "somestring" as any });
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
      const browsedMessages = await subscriptionReceiverClient.browseMessages({
        fromSequenceNumber: Long.ZERO,
        maxMessageCount: -100
      });
      should.equal(browsedMessages.length, 0);
    });

    it("PeekBySequenceNumber: Wrong type maxMessageCount for Subscription", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await subscriptionReceiverClient.browseMessages({
          fromSequenceNumber: Long.ZERO,
          maxMessageCount: "somestring" as any
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
        await subscriptionReceiverClient.browseMessages({
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

    it("AddRule: Missing ruleName", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await subscriptionRuleManager.addRule(undefined as any, undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Missing parameter "ruleName"`);
    });

    it("AddRule: Empty string as ruleName", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await subscriptionRuleManager.addRule("", false);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `Empty string not allowed in parameter "ruleName"`
      );
    });

    it("AddRule: Missing filter", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await subscriptionRuleManager.addRule("myrule", undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Missing parameter "filter"`);
    });

    it("AddRule: Invalid filter", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await subscriptionRuleManager.addRule("myrule", { random: "value" } as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "filter" should be either a boolean, string or implement the CorrelationFilter interface.`
      );
    });

    it("RemoveRule: Missing ruleName", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await subscriptionRuleManager.removeRule(undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Missing parameter "ruleName"`);
    });

    it("RemoveRule: Empty string as ruleName", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await subscriptionRuleManager.removeRule("");
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `Empty string not allowed in parameter "ruleName"`
      );
    });

    it("Add and Remove Rule: Coerce RuleName into string", async function(): Promise<void> {
      // Clean up existing rules
      let rules = await subscriptionRuleManager.getRules();
      await Promise.all(rules.map((rule) => subscriptionRuleManager.removeRule(rule.name)));

      // Add rule with number as name
      await subscriptionRuleManager.addRule(123 as any, true);
      rules = await subscriptionRuleManager.getRules();
      should.equal(
        rules.some((rule) => rule.name === "123"),
        true,
        "Added rule not found"
      );

      // Remove rule with number as name
      await subscriptionRuleManager.removeRule(123 as any);
      rules = await subscriptionRuleManager.getRules();
      should.equal(
        rules.some((rule) => rule.name === "123"),
        false,
        "Removed rule still found"
      );

      // Add default rule so that other tests are not affected
      await subscriptionRuleManager.addRule(subscriptionRuleManager.defaultRuleName, true);
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

      receiver = serviceBusClient.test.getSessionPeekLockReceiver(entityNames, {
        sessionId: TestMessage.sessionId
      });

      await sender.send(TestMessage.getSessionSample());
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
      const browsedMessages = await receiver.browseMessages({ maxMessageCount: -100 });
      should.equal(browsedMessages.length, 0);
    });

    it("Peek: Wrong type maxMessageCount in SessionReceiver", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await receiver.browseMessages({ maxMessageCount: "somestring" as any });
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
      const browsedMessages = await receiver.browseMessages({
        fromSequenceNumber: Long.ZERO,
        maxMessageCount: -100
      });
      should.equal(browsedMessages.length, 0);
    });

    it("PeekBySequenceNumber: Wrong type maxMessageCount in SessionReceiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.browseMessages({
          fromSequenceNumber: Long.ZERO,
          maxMessageCount: "somestring" as any
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
        await receiver.browseMessages({ fromSequenceNumber: "somestring" as any });
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

    it("ReceiveDeferredMessage: Wrong type sequenceNumber in SessionReceiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessage("somestring" as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "sequenceNumber" should be of type "Long"`
      );
    });

    it("ReceiveDeferredMessage: Missing sequenceNumber in SessionReceiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessage(undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumber"`);
    });

    it("ReceiveDeferredMessages: Wrong type sequenceNumbers in SessionReceiver", async function(): Promise<
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

    it("ReceiveDeferredMessages: Missing sequenceNumbers in SessionReceiver", async function(): Promise<
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

      receiver = serviceBusClient.test.getPeekLockReceiver(entityNames);

      await sender.send(TestMessage.getSessionSample());
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

    it("ReceiveDeferredMessage: Wrong type sequenceNumber in Receiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessage("somestring" as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "sequenceNumber" should be of type "Long"`
      );
    });

    it("ReceiveDeferredMessage: Missing sequenceNumber in Receiver", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await receiver.receiveDeferredMessage(undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumber"`);
    });

    it("ReceiveDeferredMessages: Wrong type sequenceNumbers in Receiver", async function(): Promise<
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

    it("ReceiveDeferredMessages: Missing sequenceNumbers in Receiver", async function(): Promise<
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
  });

  describe("Invalid parameters in Sender", function(): void {
    let sender: Sender;

    // Since, the below tests never actually make use of any AMQP links, there is no need to create
    // new sender/receiver clients before each test. Doing it once for each describe block.
    before(async () => {
      const { queue } = await serviceBusClient.test.createTestEntities(
        TestClientType.PartitionedQueue
      );

      //const clients = await getSenderReceiverClients(TestClientType.PartitionedQueue, "peekLock");
      sender = serviceBusClient.test.addToCleanup(serviceBusClient.createSender(queue!));
    });

    after(() => {
      return serviceBusClient.test.afterEach();
    });

    it("Send: Missing message in Sender", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await sender.send(undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `Missing parameter "message, messages or messageBatch"`
      );
    });

    it("Sendbatch: Missing messageBatch in Sender", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await sender.send(undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `Missing parameter "message, messages or messageBatch"`
      );
    });

    it("ScheduledMessage: Missing date in Sender", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await sender.scheduleMessage(undefined as any, undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `Missing parameter "scheduledEnqueueTimeUtc"`
      );
    });

    it("ScheduledMessage: Missing message in Sender", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await sender.scheduleMessage(new Date(), undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Missing parameter "message"`);
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

    it("CancelScheduledMessage: Wrong type sequenceNumber in Sender", async function(): Promise<
      void
    > {
      let caughtError: Error | undefined;
      try {
        await sender.cancelScheduledMessage("somestring" as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(
        caughtError && caughtError.message,
        `The parameter "sequenceNumber" should be of type "Long"`
      );
    });

    it("CancelScheduledMessage: Missing sequenceNumber in Sender", async function(): Promise<void> {
      let caughtError: Error | undefined;
      try {
        await sender.cancelScheduledMessage(undefined as any);
      } catch (error) {
        caughtError = error;
      }
      should.equal(caughtError && caughtError.name, "TypeError");
      should.equal(caughtError && caughtError.message, `Missing parameter "sequenceNumber"`);
    });

    it("CancelScheduledMessages: Wrong type sequenceNumbers in Sender", async function(): Promise<
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
  });
});
