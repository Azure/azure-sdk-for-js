// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

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
import { Sender } from "../src/sender";
import { MessagingError } from "@azure/core-amqp";
import Long from "long";
import { RetryOptions } from "@azure/core-http";

describe("Retries - ManagementClient", () => {
  let senderClient: Sender;
  let receiverClient: Receiver<ReceivedMessageWithLock> | SessionReceiver<ReceivedMessageWithLock>;
  let serviceBusClient: ServiceBusClientForTests;
  let subscriptionRuleManager: SubscriptionRuleManager;
  let defaultMaxRetries = 2;
  let numberOfTimesManagementClientInvoked: number;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(
    entityType: TestClientType,
    retryOptions?: RetryOptions
  ): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);

    senderClient = serviceBusClient.test.addToCleanup(
      serviceBusClient.getSender(entityNames.queue ?? entityNames.topic!, {
        retryOptions: retryOptions || {
          timeoutInMs: 10000,
          maxRetries: defaultMaxRetries,
          retryDelayInMs: 0
        }
      })
    );
    receiverClient = serviceBusClient.test.getPeekLockReceiver(entityNames, {
      retryOptions: retryOptions || {
        timeoutInMs: 10000,
        maxRetries: defaultMaxRetries,
        retryDelayInMs: 0
      }
    });
    subscriptionRuleManager = serviceBusClient.test.addToCleanup(
      serviceBusClient.getSubscriptionRuleManager(entityNames.topic!, entityNames.subscription!)
    );
    subscriptionRuleManager;
  }

  async function afterEachTest(): Promise<void> {
    await senderClient.close();
    await receiverClient.close();
  }

  function mockManagementClientToThrowError() {
    const fakeFunction = async function() {
      numberOfTimesManagementClientInvoked++;
      throw new MessagingError("Hello there, I'm an error");
    };
    (senderClient as any)._context.managementClient._acquireLockAndSendRequest = fakeFunction;
    (receiverClient as any)._context.managementClient._acquireLockAndSendRequest = fakeFunction;
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

    it("Unpartitioned Queue: scheduleMessage #RunInBrowser", async function(): Promise<void> {
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

    it("Unpartitioned Queue with Sessions: scheduleMessage #RunInBrowser", async function(): Promise<
      void
    > {
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

    it("Unpartitioned Queue: receiveDeferredMessage #RunInBrowser", async function(): Promise<
      void
    > {
      await mockManagementClientAndVerifyRetries(async () => {
        await receiverClient.receiveDeferredMessage(new Long(0));
      });
    });

    it("Unpartitioned Queue: peek #RunInBrowser", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await receiverClient.diagnostics.peek(1);
      });
    });

    it("Unpartitioned Queue: peekBySequenceNumber #RunInBrowser", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await receiverClient.diagnostics.peekBySequenceNumber(new Long(0));
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
        await sessionReceiver.diagnostics.peek(1);
      });
    });

    it("Unpartitioned Queue with Sessions: peekBySequenceNumber", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await sessionReceiver.diagnostics.peekBySequenceNumber(new Long(0));
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
});

describe("Retries - MessageSender", () => {
  let senderClient: Sender;
  let serviceBusClient: ServiceBusClientForTests;
  let defaultMaxRetries = 2;
  let numberOfTimesInitInvoked: number;

  before(() => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(
    entityType: TestClientType,
    retryOptions?: RetryOptions
  ): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);

    senderClient = serviceBusClient.test.addToCleanup(
      serviceBusClient.getSender(entityNames.queue ?? entityNames.topic!, {
        retryOptions: retryOptions || {
          timeoutInMs: 10000,
          maxRetries: defaultMaxRetries,
          retryDelayInMs: 0
        }
      })
    );
  }

  async function afterEachTest(): Promise<void> {
    await senderClient.close();
  }

  function mockInitToThrowError() {
    const fakeFunction = async function() {
      numberOfTimesInitInvoked++;
      throw new MessagingError("Hello there, I'm an error");
    };
    (senderClient as any)._sender._negotiateClaim = fakeFunction;
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

  it("Unpartitioned Queue: send #RunInBrowser", async function(): Promise<void> {
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
      await senderClient.sendBatch(1 as any);
    });
  });

  it("Unpartitioned Queue with Sessions: send #RunInBrowser", async function(): Promise<void> {
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
      await senderClient.sendBatch(1 as any);
    });
  });
});
