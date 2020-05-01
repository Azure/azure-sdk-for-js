// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const should = chai.should();
import {
  Receiver,
  ReceivedMessageWithLock,
  SubscriptionRuleManager,
  SessionReceiver
} from "../src";
import { TestClientType, TestMessage } from "./utils/testUtils";
import { ServiceBusClientForTests, createServiceBusClientForTests } from "./utils/testutils2";
import { Sender, SenderImpl } from "../src/sender";
import { MessagingError } from "@azure/core-amqp";
import Long from "long";
import { BatchingReceiver } from "../src/core/batchingReceiver";
import { delay } from "rhea-promise";

describe("Retries - ManagementClient", () => {
  let senderClient: Sender;
  let receiverClient: Receiver<ReceivedMessageWithLock> | SessionReceiver<ReceivedMessageWithLock>;
  let serviceBusClient: ServiceBusClientForTests;
  let subscriptionRuleManager: SubscriptionRuleManager;
  const defaultMaxRetries = 2;
  let numberOfTimesManagementClientInvoked: number;

  before(() => {
    serviceBusClient = createServiceBusClientForTests({
      retryOptions: {
        // Defaults
        timeoutInMs: 10000,
        maxRetries: defaultMaxRetries,
        retryDelayInMs: 0
      }
    });
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);

    senderClient = serviceBusClient.test.addToCleanup(
      await serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
    receiverClient = await serviceBusClient.test.getPeekLockReceiver(entityNames);
    subscriptionRuleManager = serviceBusClient.test.addToCleanup(
      serviceBusClient.getSubscriptionRuleManager(entityNames.topic!, entityNames.subscription!)
    );
  }

  async function afterEachTest(): Promise<void> {
    await senderClient.close();
    await receiverClient.close();
    await subscriptionRuleManager.close();
  }

  function mockManagementClientToThrowError() {
    const fakeFunction = async function() {
      numberOfTimesManagementClientInvoked++;
      throw new MessagingError("Hello there, I'm an error");
    };
    (senderClient as any)._context.managementClient._makeManagementRequest = fakeFunction;
    (receiverClient as any)._context.managementClient._makeManagementRequest = fakeFunction;
  }

  async function mockManagementClientAndVerifyRetries(func: Function) {
    mockManagementClientToThrowError();
    let errorThrown = false;
    try {
      await func();
    } catch (error) {
      errorThrown = true;
      should.equal(error.message, "Hello there, I'm an error", "Unexpected error thrown");
      should.equal(
        numberOfTimesManagementClientInvoked,
        defaultMaxRetries + 1,
        "Unexpected number of retries"
      );
    }
    should.equal(errorThrown, true, "Error was not thrown");
  }

  describe("Sender Retries", function(): void {
    beforeEach(async () => {
      numberOfTimesManagementClientInvoked = 0;
    });

    afterEach(async () => {
      await afterEachTest();
    });

    it("Unpartitioned Queue: scheduleMessage", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await mockManagementClientAndVerifyRetries(async () => {
        await senderClient.scheduleMessage(new Date(), TestMessage.getSample());
      });
    });

    it("Unpartitioned Queue: scheduleMessages", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await mockManagementClientAndVerifyRetries(async () => {
        await senderClient.scheduleMessages(new Date(), [TestMessage.getSample()]);
      });
    });

    it("Unpartitioned Queue with Sessions: scheduleMessage", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await mockManagementClientAndVerifyRetries(async () => {
        await senderClient.cancelScheduledMessage(new Long(0));
      });
    });

    it("Unpartitioned Queue with Sessions: scheduleMessages", async function(): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await mockManagementClientAndVerifyRetries(async () => {
        await senderClient.cancelScheduledMessages([new Long(0)]);
      });
    });
  });

  describe("Receiver Retries", function(): void {
    beforeEach(async () => {
      numberOfTimesManagementClientInvoked = 0;
      await beforeEachTest(TestClientType.UnpartitionedQueue);
    });

    afterEach(async () => {
      await afterEachTest();
    });

    it("Unpartitioned Queue: receiveDeferredMessage", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await receiverClient.receiveDeferredMessage(new Long(0));
      });
    });

    it("Unpartitioned Queue: peek", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await receiverClient.browseMessages();
      });
    });

    it("Unpartitioned Queue: peekBySequenceNumber", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await receiverClient.browseMessages({ fromSequenceNumber: new Long(0) });
      });
    });
  });

  describe("Session Receiver Retries", () => {
    let sessionReceiver: SessionReceiver<ReceivedMessageWithLock>;
    beforeEach(async () => {
      numberOfTimesManagementClientInvoked = 0;
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      sessionReceiver = receiverClient as SessionReceiver<ReceivedMessageWithLock>;
    });
    afterEach(async () => {
      await afterEachTest();
    });

    it("Unpartitioned Queue with Sessions: peek", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await sessionReceiver.browseMessages();
      });
    });

    it("Unpartitioned Queue with Sessions: peekBySequenceNumber", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await sessionReceiver.browseMessages({ fromSequenceNumber: new Long(0) });
      });
    });

    it("Unpartitioned Queue with Sessions: receiveDeferredMessage", async function(): Promise<
      void
    > {
      await mockManagementClientAndVerifyRetries(async () => {
        await sessionReceiver.receiveDeferredMessage(new Long(0));
      });
    });

    it("Unpartitioned Queue with Sessions: renewSessionLock", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await sessionReceiver.renewSessionLock();
      });
    });

    it("Unpartitioned Queue with Sessions: setState", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await sessionReceiver.setState("random-state");
      });
    });

    it("Unpartitioned Queue with Sessions: getState", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await sessionReceiver.getState();
      });
    });
  });

  describe("SubscriptionRuleManager Retries", function(): void {
    beforeEach(async () => {
      numberOfTimesManagementClientInvoked = 0;
      await beforeEachTest(TestClientType.UnpartitionedSubscription);
    });

    afterEach(async () => {
      await afterEachTest();
    });

    it("Unpartitioned Subscription: getRules", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await subscriptionRuleManager.getRules();
      });
    });

    it("Unpartitioned Subscription: addRule", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await subscriptionRuleManager.addRule("new-rule", "1=2");
      });
    });

    it("Unpartitioned Subscription: removeRule", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await subscriptionRuleManager.removeRule("new-rule");
      });
    });
  });
});

describe("Retries - MessageSender", () => {
  let senderClient: Sender;
  let serviceBusClient: ServiceBusClientForTests;
  const defaultMaxRetries = 2;
  let numberOfTimesInitInvoked: number;

  before(() => {
    serviceBusClient = createServiceBusClientForTests({
      retryOptions: {
        timeoutInMs: 10000,
        maxRetries: defaultMaxRetries,
        retryDelayInMs: 0
      }
    });
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);

    senderClient = serviceBusClient.test.addToCleanup(
      await serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
  }

  async function afterEachTest(): Promise<void> {
    await senderClient.close();
  }

  function mockInitToThrowError() {
    const fakeFunction = function() {
      numberOfTimesInitInvoked++;
      throw new MessagingError("Hello there, I'm an error");
    };

    (senderClient as SenderImpl)["_sender"]["isOpen"] = () => false;
    (senderClient as SenderImpl)["_sender"]["open"] = fakeFunction;
  }

  async function mockInitAndVerifyRetries(func: Function) {
    mockInitToThrowError();
    let errorThrown = false;
    try {
      await func();
    } catch (error) {
      errorThrown = true;
      should.equal(error.message, "Hello there, I'm an error", "Unexpected error thrown");
      should.equal(numberOfTimesInitInvoked, defaultMaxRetries + 1, "Unexpected number of retries");
    }
    should.equal(errorThrown, true, "Error was not thrown");
  }

  beforeEach(async () => {
    numberOfTimesInitInvoked = 0;
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Unpartitioned Queue: send", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockInitAndVerifyRetries(async () => {
      await senderClient.send(TestMessage.getSample());
    });
  });

  it("Unpartitioned Queue: createBatch", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockInitAndVerifyRetries(async () => {
      await senderClient.createBatch();
    });
  });

  it("Unpartitioned Queue: sendBatch", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockInitAndVerifyRetries(async () => {
      await senderClient.send(1 as any);
    });
  });

  it("Unpartitioned Queue with Sessions: send", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockInitAndVerifyRetries(async () => {
      await senderClient.send(TestMessage.getSample());
    });
  });

  it("Unpartitioned Queue with Sessions: createBatch", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockInitAndVerifyRetries(async () => {
      await senderClient.createBatch();
    });
  });

  it("Unpartitioned Queue with Sessions: sendBatch", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockInitAndVerifyRetries(async () => {
      await senderClient.send(1 as any);
    });
  });
});

describe("Retries - Receive methods", () => {
  let receiverClient: Receiver<ReceivedMessageWithLock>;
  let serviceBusClient: ServiceBusClientForTests;
  const defaultMaxRetries = 2;
  let numberOfTimesTried: number;

  before(() => {
    serviceBusClient = createServiceBusClientForTests({
      retryOptions: {
        // Defaults
        timeoutInMs: 10000,
        maxRetries: defaultMaxRetries,
        retryDelayInMs: 0
      }
    });
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);
    receiverClient = await serviceBusClient.test.getPeekLockReceiver(entityNames);
  }

  async function afterEachTest(): Promise<void> {
    await receiverClient.close();
  }

  function mockBatchingReceiveToThrowError() {
    const fakeFunction = async function() {
      numberOfTimesTried++;
      throw new MessagingError("Hello there, I'm an error");
    };
    // Mocking batchingReceiver.receive to throw the error and fail
    const batchingReceiver = BatchingReceiver.create((receiverClient as any)._context);
    batchingReceiver.isOpen = () => true;
    batchingReceiver.receive = fakeFunction;
    // Mocking session creation to throw the error and fail
    (receiverClient as any)._createMessageSessionIfDoesntExist = fakeFunction;
  }

  async function mockReceiveAndVerifyRetries(func: Function) {
    mockBatchingReceiveToThrowError();
    let errorThrown = false;
    try {
      await func();
    } catch (error) {
      errorThrown = true;
      should.equal(error.message, "Hello there, I'm an error", "Unexpected error thrown");
      should.equal(numberOfTimesTried, defaultMaxRetries + 1, "Unexpected number of retries");
    }
    should.equal(errorThrown, true, "Error was not thrown");
  }

  beforeEach(async () => {
    numberOfTimesTried = 0;
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Unpartitioned Queue: receiveBatch", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockReceiveAndVerifyRetries(async () => {
      await receiverClient.receiveBatch(1);
    });
  });

  it("Unpartitioned Queue with Sessions: receiveBatch", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await mockReceiveAndVerifyRetries(async () => {
      await receiverClient.receiveBatch(1);
    });
  });

  it("Unpartitioned Queue: MessageIterator", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockReceiveAndVerifyRetries(async () => {
      await receiverClient.getMessageIterator().next();
    });
  });

  it("Unpartitioned Queue with Sessions: MessageIterator", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await mockReceiveAndVerifyRetries(async () => {
      await receiverClient.getMessageIterator().next();
    });
  });
});

describe("Retries - onDetached", () => {
  let senderClient: Sender;
  let receiverClient: Receiver<ReceivedMessageWithLock> | SessionReceiver<ReceivedMessageWithLock>;
  let serviceBusClient: ServiceBusClientForTests;
  const defaultMaxRetries = 2;
  let numberOfTimesOnDetachedInvoked: number;

  before(() => {
    serviceBusClient = createServiceBusClientForTests({
      retryOptions: {
        // Defaults
        timeoutInMs: 10000,
        maxRetries: defaultMaxRetries,
        retryDelayInMs: 0
      }
    });
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);

    senderClient = serviceBusClient.test.addToCleanup(
      await serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
    receiverClient = await serviceBusClient.test.getPeekLockReceiver(entityNames);
  }

  async function afterEachTest(): Promise<void> {
    await senderClient.close();
    await receiverClient.close();
  }

  const fakeFunction = async function() {
    numberOfTimesOnDetachedInvoked++;
    throw new MessagingError("Hello there, I'm an error");
  };

  async function mockOnDetachedAndVerifyRetries(func: Function) {
    await func();
    // Cannot verify the error thrown because onDetached logs the error and doesn't throw
    should.equal(
      numberOfTimesOnDetachedInvoked,
      defaultMaxRetries + 1,
      "Unexpected number of retries"
    );
  }

  beforeEach(async () => {
    numberOfTimesOnDetachedInvoked = 0;
  });

  afterEach(async () => {
    await afterEachTest();
  });

  it("Unpartitioned Queue: streaming", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockOnDetachedAndVerifyRetries(async () => {
      receiverClient.subscribe({
        async processMessage() {},
        async processError() {}
      });
      await delay(2000);
      (receiverClient as any)._context.streamingReceiver._init = fakeFunction;
      await (receiverClient as any)._context.streamingReceiver.onDetached(
        new MessagingError("Hello there, I'm an error")
      );
    });
  });

  it("Unpartitioned Queue: sender", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockOnDetachedAndVerifyRetries(async () => {
      (senderClient as SenderImpl)["_sender"]["open"] = fakeFunction;

      await (senderClient as SenderImpl)["_sender"].onDetached(
        new MessagingError("Hello there, I'm an error")
      );
    });
  });
});
