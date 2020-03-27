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
import { TestClientType } from "./utils/testUtils";
import { ServiceBusClientForTests, createServiceBusClientForTests } from "./utils/testutils2";
import { Sender } from "../src/sender";
import { MessagingError } from "@azure/core-amqp";
import Long from "long";
import { RetryOptions } from "@azure/core-http";

describe("Retries", () => {
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
      serviceBusClient.getSender(entityNames.queue ?? entityNames.topic!)
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
  }

  function mockManagementClientToThrowError() {
    (receiverClient as any)._context.managementClient._acquireLockAndSendRequest = async function() {
      numberOfTimesManagementClientInvoked++;
      console.log(numberOfTimesManagementClientInvoked);
      throw new MessagingError("Hello there, I'm an error");
    };
  }

  async function mockManagementClientAndVerifyRetries(func: Function) {
    mockManagementClientToThrowError();
    let errorThrown = false;
    try {
      await func();
    } catch (error) {
      errorThrown = true;
      console.log(error.message);
      should.equal(error.message, "Hello there, I'm an error", "Unexpected error thrown");
      should.equal(
        numberOfTimesManagementClientInvoked,
        defaultMaxRetries + 1,
        "Unexpected number of retries"
      );
    }
    should.equal(errorThrown, true, "Error was not thrown");
  }

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

    it("Unpartitioned Queue with Sessions: peek", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await receiverClient.diagnostics.peek(1);
      });
    });

    it("Unpartitioned Queue with Sessions: peekBySequenceNumber", async function(): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await receiverClient.diagnostics.peekBySequenceNumber(new Long(0));
      });
    });

    it("Unpartitioned Queue with Sessions: receiveDeferredMessage", async function(): Promise<
      void
    > {
      await mockManagementClientAndVerifyRetries(async () => {
        await receiverClient.receiveDeferredMessage(new Long(0));
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
