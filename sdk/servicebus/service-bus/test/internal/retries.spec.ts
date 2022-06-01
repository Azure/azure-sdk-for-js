// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const should = chai.should();
import { TestClientType, TestMessage } from "../public/utils/testUtils";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
} from "../public/utils/testutils2";
import { ServiceBusSender, ServiceBusSenderImpl } from "../../src/sender";
import { MessagingError } from "@azure/core-amqp";
import Long from "long";
import { BatchingReceiver } from "../../src/core/batchingReceiver";
import {
  ServiceBusSessionReceiverImpl,
  ServiceBusSessionReceiver,
} from "../../src/receivers/sessionReceiver";
import { ServiceBusReceiver, ServiceBusReceiverImpl } from "../../src/receivers/receiver";

describe("Retries - ManagementClient", () => {
  let sender: ServiceBusSender;
  let receiver: ServiceBusReceiver | ServiceBusSessionReceiver;
  let serviceBusClient: ServiceBusClientForTests;
  const defaultMaxRetries = 2;
  let numberOfTimesManagementClientInvoked: number;

  before(() => {
    serviceBusClient = createServiceBusClientForTests({
      retryOptions: {
        // Defaults
        timeoutInMs: 10000,
        maxRetries: defaultMaxRetries,
        retryDelayInMs: 0,
      },
    });
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);
  }

  async function afterEachTest(): Promise<void> {
    await sender.close();
    await receiver.close();
  }

  function mockManagementClientToThrowError(): void {
    const fakeFunction = async function (): Promise<never> {
      numberOfTimesManagementClientInvoked++;
      throw new MessagingError("Hello there, I'm an error");
    };
    const senderMgmtClient = serviceBusClient["_connectionContext"].getManagementClient(
      sender.entityPath
    );
    const receiverMgmtClient = serviceBusClient["_connectionContext"].getManagementClient(
      receiver.entityPath
    );

    senderMgmtClient["_makeManagementRequest"] = fakeFunction;
    receiverMgmtClient["_makeManagementRequest"] = fakeFunction;
  }

  async function mockManagementClientAndVerifyRetries(func: () => Promise<void>): Promise<void> {
    mockManagementClientToThrowError();
    let errorThrown = false;
    try {
      await func();
    } catch (error: any) {
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

  describe("Sender Retries", function (): void {
    beforeEach(async () => {
      numberOfTimesManagementClientInvoked = 0;
    });

    afterEach(async () => {
      await afterEachTest();
    });

    it("Unpartitioned Queue: scheduleMessages", async function (): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueue);
      await mockManagementClientAndVerifyRetries(async () => {
        await sender.scheduleMessages([TestMessage.getSample()], new Date());
      });
    });

    it("Unpartitioned Queue with Sessions: scheduleMessages", async function (): Promise<void> {
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      await mockManagementClientAndVerifyRetries(async () => {
        await sender.cancelScheduledMessages([new Long(0)]);
      });
    });
  });

  describe("Receiver Retries", function (): void {
    beforeEach(async () => {
      numberOfTimesManagementClientInvoked = 0;
      await beforeEachTest(TestClientType.UnpartitionedQueue);
    });

    afterEach(async () => {
      await afterEachTest();
    });

    it("Unpartitioned Queue: receiveDeferredMessage", async function (): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await receiver.receiveDeferredMessages(new Long(0));
      });
    });

    it("Unpartitioned Queue: peek", async function (): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await receiver.peekMessages(1);
      });
    });

    it("Unpartitioned Queue: peekBySequenceNumber", async function (): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await receiver.peekMessages(1, { fromSequenceNumber: new Long(0) });
      });
    });
  });

  describe("Session Receiver Retries", () => {
    let sessionReceiver: ServiceBusSessionReceiver;
    beforeEach(async () => {
      numberOfTimesManagementClientInvoked = 0;
      await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
      sessionReceiver = receiver as ServiceBusSessionReceiver;
    });
    afterEach(async () => {
      await afterEachTest();
    });

    it("Unpartitioned Queue with Sessions: peek", async function (): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await sessionReceiver.peekMessages(1);
      });
    });

    it("Unpartitioned Queue with Sessions: peekBySequenceNumber", async function (): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await sessionReceiver.peekMessages(1, { fromSequenceNumber: new Long(0) });
      });
    });

    it("Unpartitioned Queue with Sessions: receiveDeferredMessage", async function (): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await sessionReceiver.receiveDeferredMessages(new Long(0));
      });
    });

    it("Unpartitioned Queue with Sessions: renewSessionLock", async function (): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await sessionReceiver.renewSessionLock();
      });
    });

    it("Unpartitioned Queue with Sessions: setState", async function (): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await sessionReceiver.setSessionState("random-state");
      });
    });

    it("Unpartitioned Queue with Sessions: getState", async function (): Promise<void> {
      await mockManagementClientAndVerifyRetries(async () => {
        await sessionReceiver.getSessionState();
      });
    });
  });
});

describe("Retries - MessageSender", () => {
  let sender: ServiceBusSender;
  let serviceBusClient: ServiceBusClientForTests;
  const defaultMaxRetries = 2;
  let numberOfTimesInitInvoked: number;

  before(() => {
    serviceBusClient = createServiceBusClientForTests({
      retryOptions: {
        timeoutInMs: 10000,
        maxRetries: defaultMaxRetries,
        retryDelayInMs: 0,
      },
    });
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);

    sender = serviceBusClient.test.addToCleanup(
      serviceBusClient.createSender(entityNames.queue ?? entityNames.topic!)
    );
  }

  async function afterEachTest(): Promise<void> {
    await sender.close();
  }

  function mockInitToThrowError(): void {
    const fakeFunction = function (): Promise<void> {
      numberOfTimesInitInvoked++;
      throw new MessagingError("Hello there, I'm an error");
    };

    (sender as ServiceBusSenderImpl)["_sender"]["isOpen"] = () => false;
    (sender as ServiceBusSenderImpl)["_sender"]["open"] = fakeFunction;
  }

  async function mockInitAndVerifyRetries(func: () => Promise<void>): Promise<void> {
    mockInitToThrowError();
    let errorThrown = false;
    try {
      await func();
    } catch (error: any) {
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

  it("Unpartitioned Queue: send", async function (): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockInitAndVerifyRetries(async () => {
      await sender.sendMessages(TestMessage.getSample());
    });
  });

  it("Unpartitioned Queue: createBatch", async function (): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockInitAndVerifyRetries(async () => {
      await sender.createMessageBatch();
    });
  });

  it("Unpartitioned Queue: sendBatch", async function (): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockInitAndVerifyRetries(async () => {
      const batch = await sender.createMessageBatch();
      batch.tryAddMessage({
        body: "hello",
      });
      await sender.sendMessages(batch);
    });
  });

  it("Unpartitioned Queue with Sessions: send", async function (): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockInitAndVerifyRetries(async () => {
      await sender.sendMessages(TestMessage.getSample());
    });
  });

  it("Unpartitioned Queue with Sessions: createBatch", async function (): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockInitAndVerifyRetries(async () => {
      await sender.createMessageBatch();
    });
  });

  it("Unpartitioned Queue with Sessions: sendBatch", async function (): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockInitAndVerifyRetries(async () => {
      const batch = await sender.createMessageBatch();
      batch.tryAddMessage({
        body: "hello",
      });
      await sender.sendMessages(batch);
    });
  });
});

describe("Retries - Receive methods", () => {
  let receiver: ServiceBusReceiver;
  let serviceBusClient: ServiceBusClientForTests;
  const defaultMaxRetries = 2;
  let numberOfTimesTried: number;

  before(() => {
    serviceBusClient = createServiceBusClientForTests({
      retryOptions: {
        // Defaults
        timeoutInMs: 10000,
        maxRetries: defaultMaxRetries,
        retryDelayInMs: 0,
      },
    });
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  async function beforeEachTest(entityType: TestClientType): Promise<void> {
    const entityNames = await serviceBusClient.test.createTestEntities(entityType);
    receiver = await serviceBusClient.test.createPeekLockReceiver(entityNames);
  }

  async function afterEachTest(): Promise<void> {
    await receiver.close();
  }

  function mockBatchingReceiveToThrowError(): void {
    const fakeFunction = async function (): Promise<never> {
      numberOfTimesTried++;
      throw new MessagingError("Hello there, I'm an error");
    };

    if (receiver instanceof ServiceBusSessionReceiverImpl) {
      // Mocking `_messageSession.receiveMessages()` to throw the error and fail
      (receiver as ServiceBusSessionReceiverImpl)["_messageSession"].receiveMessages = fakeFunction;
    } else {
      // Mocking batchingReceiver.receive to throw the error and fail
      const batchingReceiver = BatchingReceiver.create(
        (receiver as any)._context,
        "dummyEntityPath",
        {
          lockRenewer: undefined,
          receiveMode: "peekLock",
          skipParsingBodyAsJson: false,
        }
      );
      batchingReceiver.isOpen = () => true;
      batchingReceiver.receive = fakeFunction;
      (receiver as ServiceBusReceiverImpl)["_batchingReceiver"] = batchingReceiver;
    }
  }

  async function mockReceiveAndVerifyRetries(func: () => Promise<void>): Promise<void> {
    mockBatchingReceiveToThrowError();
    let errorThrown = false;
    try {
      await func();
    } catch (error: any) {
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

  it("Unpartitioned Queue: receiveBatch", async function (): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockReceiveAndVerifyRetries(async () => {
      await receiver.receiveMessages(1);
    });
  });

  it("Unpartitioned Queue with Sessions: receiveBatch", async function (): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await mockReceiveAndVerifyRetries(async () => {
      await receiver.receiveMessages(1);
    });
  });

  it("Unpartitioned Queue: MessageIterator", async function (): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await mockReceiveAndVerifyRetries(async () => {
      await receiver.getMessageIterator().next();
    });
  });

  it("Unpartitioned Queue with Sessions: MessageIterator", async function (): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueueWithSessions);
    await mockReceiveAndVerifyRetries(async () => {
      await receiver.getMessageIterator().next();
    });
  });
});
