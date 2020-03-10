// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  delay,
  ReceiveMode,
  ServiceBusReceiverClient,
  ServiceBusSenderClient,
  ReceivedMessage,
  ContextWithSettlement
} from "../src";
import { getAlreadyReceivingErrorMsg } from "../src/util/errors";
import {
  checkWithTimeout,
  TestClientType,
  getSenderReceiverClients,
  purge,
  TestMessage,
  EntityNames,
  ReceiverClientTypeForUser,
  ReceiverClientTypeForUserT
} from "./utils/testUtils";
import { StreamingReceiver } from "../src/core/streamingReceiver";

import { AccessToken, parseConnectionString, TokenCredential } from "@azure/core-amqp";
import { getEnvVars, EnvVarNames } from "./utils/envVarUtils";
import { EnvironmentCredential } from "@azure/identity";
import { DispositionType } from "../src/serviceBusMessage";

const should = chai.should();
chai.use(chaiAsPromised);

async function testPeekMsgsLength(
  client: ReceiverClientTypeForUser,
  expectedPeekLength: number
): Promise<void> {
  const peekedMsgs = await client.diagnostics.peek(expectedPeekLength + 1);
  should.equal(
    peekedMsgs.length,
    expectedPeekLength,
    "Unexpected number of msgs found when peeking"
  );
}

let senderClient: ServiceBusSenderClient;
let receiverClient: ReceiverClientTypeForUserT<"peekLock">;
let deadLetterClient: ReceiverClientTypeForUserT<"peekLock">;
let errorWasThrown: boolean;
let unexpectedError: Error | undefined;
const maxDeliveryCount = 10;

async function processError(err: Error): Promise<void> {
  if (err) {
    unexpectedError = err;
  }
}

async function beforeEachTest(
  testClientType: TestClientType,
  receiveMode?: "peekLock" | "receiveAndDelete"
): Promise<void> {
  if (!receiveMode) {
    receiveMode = "peekLock";
  }
  const clients = await getSenderReceiverClients(testClientType, receiveMode);
  senderClient = clients.senderClient;
  receiverClient = clients.receiverClient;

  deadLetterClient = new ServiceBusReceiverClient(
    {
      connectionString: getEnvVars().SERVICEBUS_CONNECTION_STRING,
      queueName: receiverClient.getDeadLetterPath()
    },
    "peekLock"
  );

  await purge(receiverClient);
  await purge(deadLetterClient);
  const peekedMsgs = await receiverClient.diagnostics.peek();

  const receiverEntityType = receiverClient.entityType;
  if (peekedMsgs.length) {
    chai.assert.fail(`Please use an empty ${receiverEntityType} for integration testing`);
  }
  const peekedDeadMsgs = await deadLetterClient.diagnostics.peek();
  if (peekedDeadMsgs.length) {
    chai.assert.fail(
      `Please use an empty dead letter ${receiverEntityType} for integration testing`
    );
  }

  errorWasThrown = false;
  unexpectedError = undefined;
}

async function afterEachTest(): Promise<void> {
  await senderClient.close();
  await receiverClient.close();
}

describe("Streaming - Misc Tests", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testAutoComplete(): Promise<void> {
    const testMessage = TestMessage.getSample();
    await senderClient.send(testMessage);

    const receivedMsgs: ReceivedMessage[] = [];
    receiverClient.subscribe({
      async processMessage(msg: ReceivedMessage) {
        receivedMsgs.push(msg);
        should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
        should.equal(msg.messageId, testMessage.messageId, "MessageId is different than expected");

        return Promise.resolve();
      },
      processError
    });

    const msgsCheck = await checkWithTimeout(
      () => receivedMsgs.length === 1 && receivedMsgs[0].delivery.remote_settled === true
    );

    should.equal(
      msgsCheck,
      true,
      receivedMsgs.length !== 1
        ? `Expected 1, received ${receivedMsgs.length} messages`
        : "Message didnt get auto-completed in time"
    );

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: AutoComplete removes the message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testAutoComplete();
  });

  it("Partitioned Subscription: AutoComplete removes the message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testAutoComplete();
  });

  it("UnPartitioned Queue: AutoComplete removes the message #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testAutoComplete();
  });

  it("UnPartitioned Subscription: AutoComplete removes the message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testAutoComplete();
  });

  async function testManualComplete(): Promise<void> {
    const testMessage = TestMessage.getSample();
    await senderClient.send(testMessage);

    const receivedMsgs: ReceivedMessage[] = [];
    let contextToSettle: ContextWithSettlement;
    receiverClient.subscribe(
      {
        async processMessage(msg: ReceivedMessage, context: ContextWithSettlement) {
          receivedMsgs.push(msg);
          contextToSettle = context;
          should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
          should.equal(
            msg.messageId,
            testMessage.messageId,
            "MessageId is different than expected"
          );
          return Promise.resolve();
        },
        processError
      },
      { autoComplete: false }
    );

    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);

    should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages`);
    await testPeekMsgsLength(receiverClient, 1);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");

    await contextToSettle!.complete(receivedMsgs[0]);

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: Disabled autoComplete, no manual complete retains the message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testManualComplete();
  });

  it("Partitioned Subscription: Disabled autoComplete, no manual complete retains the message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testManualComplete();
  });

  it("UnPartitioned Queue: Disabled autoComplete, no manual complete retains the message #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testManualComplete();
  });

  it("UnPartitioned Subscription: Disabled autoComplete, no manual complete retains the message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testManualComplete();
  });

  it("onDetached should forward error messages if it fails to retry", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue);
    let streamingReceiver: StreamingReceiver | undefined;
    try {
      let actualError: Error | undefined;
      streamingReceiver = await StreamingReceiver.create(
        (receiverClient as any)._receiver._context,
        {
          receiveMode: ReceiveMode.peekLock
        }
      );

      streamingReceiver.receive(
        async () => {},
        (err) => {
          actualError = err;
        }
      );

      // overwrite _init to throw a non-retryable error.
      // this will be called by onDetached
      (streamingReceiver as any)._init = async () => {
        const error = new Error("Expected test error!");
        // prevent retry from translating error.
        (error as any).translated = true;
        throw error;
      };

      // call detached directly
      await streamingReceiver.onDetached();

      should.equal(
        actualError!.message,
        "Expected test error!",
        "Did not see the expected error in user-provided error handler."
      );
    } finally {
      if (streamingReceiver) {
        await streamingReceiver.close();
      }
    }
  });
});

describe("Streaming - Complete message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testComplete(autoComplete: boolean): Promise<void> {
    const testMessage = TestMessage.getSample();
    await senderClient.send(testMessage);

    const receivedMsgs: ReceivedMessage[] = [];
    receiverClient.subscribe(
      {
        async processMessage(msg: ReceivedMessage, context: ContextWithSettlement) {
          should.equal(msg.body, testMessage.body, "MessageBody is different than expected");
          should.equal(
            msg.messageId,
            testMessage.messageId,
            "MessageId is different than expected"
          );
          await context.complete(msg);
          receivedMsgs.push(msg);
        },
        processError
      },
      { autoComplete }
    );

    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
    should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages`);

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    await testPeekMsgsLength(receiverClient, 0);
  }
  it("Partitioned Queue: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testComplete(false);
  });

  it("Partitioned Subscription: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testComplete(false);
  });

  it("UnPartitioned Queue: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testComplete(false);
  });

  it("UnPartitioned Subscription: complete() removes message", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testComplete(false);
  });

  it("Partitioned Queue with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testComplete(true);
  });

  it("Partitioned Subscription with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testComplete(true);
  });

  it("UnPartitioned Queue with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testComplete(true);
  });

  it("UnPartitioned Subscription with autoComplete: complete() removes message", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testComplete(true);
  });
});

describe("Streaming - Abandon message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testMultipleAbandons(): Promise<void> {
    const testMessage = TestMessage.getSample();
    await senderClient.send(testMessage);

    let checkDeliveryCount = 0;

    receiverClient.subscribe(
      {
        async processMessage(msg: ReceivedMessage, context: ContextWithSettlement) {
          should.equal(
            msg.deliveryCount,
            checkDeliveryCount,
            "DeliveryCount is different than expected"
          );
          await context.abandon(msg);
          checkDeliveryCount++;
        },
        processError
      },
      { autoComplete: false }
    );

    const deliveryCountFlag = await checkWithTimeout(() => checkDeliveryCount === maxDeliveryCount);
    should.equal(deliveryCountFlag, true, "DeliveryCount is different than expected");

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    await testPeekMsgsLength(receiverClient, 0); // No messages in the queue

    const deadLetterMsgsBatch = await deadLetterClient.receiveBatch(1);
    const deadLetterMsgs = deadLetterMsgsBatch.messages;
    should.equal(Array.isArray(deadLetterMsgs), true, "`ReceivedMessages` is not an array");
    should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgs[0].deliveryCount,
      maxDeliveryCount,
      "DeliveryCount is different than expected"
    );
    should.equal(
      deadLetterMsgs[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );

    await deadLetterMsgsBatch.context.complete(deadLetterMsgs[0]);

    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: Multiple abandons until maxDeliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testMultipleAbandons();
  });

  it("Partitioned Subscription: Multiple abandons until maxDeliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testMultipleAbandons();
  });

  it("Unpartitioned Queue: Multiple abandons until maxDeliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testMultipleAbandons();
  });

  it("Unpartitioned Subscription: Multiple abandons until maxDeliveryCount", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testMultipleAbandons();
  });
});

describe("Streaming - Defer message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDefer(testClientType: TestClientType, autoComplete: boolean): Promise<void> {
    const testMessage = TestMessage.getSample();
    await senderClient.send(testMessage);
    let sequenceNum: any = 0;

    receiverClient.subscribe(
      {
        async processMessage(msg: ReceivedMessage, context: ContextWithSettlement) {
          await context.defer(msg);
          sequenceNum = msg.sequenceNumber;
        },
        processError
      },
      { autoComplete }
    );
    const sequenceNumCheck = await checkWithTimeout(() => sequenceNum !== 0);
    should.equal(
      sequenceNumCheck,
      true,
      "Either the message is not received or observed an unexpected SequenceNumber."
    );

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    const deferredMsgs = await receiverClient.receiveDeferredMessages([sequenceNum]);
    if (!deferredMsgs) {
      throw "No message received for sequence number";
    }

    should.equal(deferredMsgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(
      deferredMsgs[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );
    should.equal(deferredMsgs[0].deliveryCount, 1, "DeliveryCount is different than expected");

    await deferredMsgs[0].complete();
    await testPeekMsgsLength(receiverClient, 0);
  }

  it("Partitioned Queue: defer() moves message to deferred queue", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testDefer(TestClientType.PartitionedQueue, false);
  });

  it("Partitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testDefer(TestClientType.PartitionedSubscription, false);
  });

  it("UnPartitioned Queue: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testDefer(TestClientType.UnpartitionedQueue, false);
  });

  it("UnPartitioned Subscription: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testDefer(TestClientType.UnpartitionedSubscription, false);
  });

  it("Partitioned Queue with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testDefer(TestClientType.PartitionedQueue, true);
  });

  it("Partitioned Subscription with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testDefer(TestClientType.PartitionedSubscription, true);
  });

  it("UnPartitioned Queue with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testDefer(TestClientType.UnpartitionedQueue, true);
  });

  it("UnPartitioned Subscription with autoComplete: defer() moves message to deferred queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testDefer(TestClientType.UnpartitionedSubscription, true);
  });
});

describe("Streaming - Deadletter message", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testDeadletter(autoComplete: boolean): Promise<void> {
    const testMessage = TestMessage.getSample();
    await senderClient.send(testMessage);

    const receivedMsgs: ReceivedMessage[] = [];

    receiverClient.subscribe(
      {
        async processMessage(msg: ReceivedMessage, context: ContextWithSettlement) {
          await context.deadLetter(msg);
          receivedMsgs.push(msg);
        },
        processError
      },
      { autoComplete }
    );
    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);
    should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages`);

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");

    await testPeekMsgsLength(receiverClient, 0);

    const deadLetterMsgsBatch = await deadLetterClient.receiveBatch(1);
    const deadLetterMsgs = deadLetterMsgsBatch.messages;
    should.equal(Array.isArray(deadLetterMsgs), true, "`ReceivedMessages` is not an array");
    should.equal(deadLetterMsgs.length, 1, "Unexpected number of messages");
    should.equal(
      deadLetterMsgs[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );

    await deadLetterMsgsBatch.context.complete(deadLetterMsgs[0]);
    await testPeekMsgsLength(deadLetterClient, 0);
  }

  it("Partitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testDeadletter(false);
  });

  it("Partitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testDeadletter(false);
  });

  it("UnPartitioned Queue: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testDeadletter(false);
  });

  it("UnPartitioned Subscription: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testDeadletter(false);
  });

  it("Partitioned Queue with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testDeadletter(true);
  });

  it("Partitioned Subscription with autoComplete: deadLetter() moves message to deadletter", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testDeadletter(true);
  });

  it("UnPartitioned Queue with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testDeadletter(true);
  });

  it("UnPartitioned Subscription with autoComplete: deadLetter() moves message to deadletter queue", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testDeadletter(true);
  });
});

describe("Streaming - Multiple Receiver Operations", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testMultipleReceiveCalls(): Promise<void> {
    let errorMessage;
    const expectedErrorMessage = getAlreadyReceivingErrorMsg(receiverClient.entityPath);

    receiverClient.subscribe({
      async processMessage(msg: ReceivedMessage, context: ContextWithSettlement) {
        await context.complete(msg);
      },
      processError
    });
    await delay(5000);
    try {
      receiverClient.subscribe({
        async processMessage(msg: ReceivedMessage, context: ContextWithSettlement) {
          return Promise.resolve();
        },
        processError
      });
    } catch (err) {
      errorMessage = err && err.message;
    }
    should.equal(
      errorMessage,
      expectedErrorMessage,
      "Unexpected error message for registerMessageHandler"
    );
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    errorMessage = "";
    try {
      await receiverClient.receiveBatch(1);
    } catch (err) {
      errorMessage = err && err.message;
    }
    should.equal(
      errorMessage,
      expectedErrorMessage,
      "Unexpected error message for receiveMessages"
    );
  }

  it("UnPartitioned Queue: Second receive operation should fail if the first streaming receiver is not stopped #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testMultipleReceiveCalls();
  });
});

describe("Streaming - Settle an already Settled message throws error", () => {
  afterEach(async () => {
    await afterEachTest();
  });

  const testError = (err: Error, operation: DispositionType): void => {
    should.equal(
      err.message,
      `Failed to ${operation} the message as this message is already settled.`,
      "ErrorMessage is different than expected"
    );
    errorWasThrown = true;
  };

  async function testSettlement(operation: DispositionType): Promise<void> {
    const testMessage = TestMessage.getSample();
    await senderClient.send(testMessage);
    const receivedMsgs: ReceivedMessage[] = [];
    let contextToSettle: ContextWithSettlement;
    receiverClient.subscribe({
      async processMessage(msg: ReceivedMessage, context: ContextWithSettlement) {
        receivedMsgs.push(msg);
        contextToSettle = context;
        return Promise.resolve();
      },
      processError
    });

    const msgsCheck = await checkWithTimeout(
      () => receivedMsgs.length === 1 && receivedMsgs[0].delivery.remote_settled === true
    );
    should.equal(
      msgsCheck,
      true,
      receivedMsgs.length !== 1
        ? `Expected 1, received ${receivedMsgs.length} messages`
        : "Message didnt get auto-completed in time"
    );

    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);

    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
    should.equal(receivedMsgs[0].body, testMessage.body, "MessageBody is different than expected");
    should.equal(
      receivedMsgs[0].messageId,
      testMessage.messageId,
      "MessageId is different than expected"
    );

    await testPeekMsgsLength(receiverClient, 0);

    if (operation === DispositionType.complete) {
      await contextToSettle!.complete(receivedMsgs[0]).catch((err) => testError(err, operation));
    } else if (operation === DispositionType.abandon) {
      await contextToSettle!.abandon(receivedMsgs[0]).catch((err) => testError(err, operation));
    } else if (operation === DispositionType.deadletter) {
      await contextToSettle!.deadLetter(receivedMsgs[0]).catch((err) => testError(err, operation));
    } else if (operation === DispositionType.defer) {
      await contextToSettle!.defer(receivedMsgs[0]).catch((err) => testError(err, operation));
    }

    should.equal(errorWasThrown, true, "Error thrown flag must be true");
  }

  it("UnPartitioned Queue: complete() throws error #RunInBrowser", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.complete);
  });

  it("UnPartitioned Subscription: complete() throws error", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testSettlement(DispositionType.complete);
  });

  it("UnPartitioned Queue: abandon() throws error #RunInBrowser", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.abandon);
  });

  it("UnPartitioned Subscription: abandon() throws error", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testSettlement(DispositionType.abandon);
  });

  it("UnPartitioned Queue: defer() throws error #RunInBrowser", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.defer);
  });

  it("UnPartitioned Subscription: defer() throws error", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testSettlement(DispositionType.defer);
  });

  it("UnPartitioned Queue: deadLetter() throws error #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testSettlement(DispositionType.deadletter);
  });

  it("UnPartitioned Subscription: deadLetter() throws error", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testSettlement(DispositionType.deadletter);
  });
});

describe("Streaming - User Error", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testUserError(): Promise<void> {
    await senderClient.send(TestMessage.getSample());
    const errorMessage = "Will we see this error message?";

    const receivedMsgs: ReceivedMessage[] = [];
    receiverClient.subscribe({
      async processMessage(msg: ReceivedMessage, context: ContextWithSettlement) {
        await context.complete(msg);
        receivedMsgs.push(msg);
        throw new Error(errorMessage);
      },
      processError
    });

    const msgsCheck = await checkWithTimeout(() => receivedMsgs.length === 1);

    should.equal(msgsCheck, true, `Expected 1, received ${receivedMsgs.length} messages.`);
    should.equal(
      !!(receiverClient as any)._receiver._context.streamingReceiver,
      true,
      "Expected streaming receiver not to be cached."
    );

    should.equal(
      unexpectedError && unexpectedError.message,
      errorMessage,
      "User error did not surface."
    );
    should.equal(receivedMsgs.length, 1, "Unexpected number of messages");
  }

  it("UnPartitioned Queue: onError handler is called for user error #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testUserError();
  });
});

describe("Streaming - Failed init should not cache receiver", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  class TestTokenCredential extends EnvironmentCredential implements TokenCredential {
    private firstCall = true;
    static errorMessage = "This is a faulty token provider.";
    constructor() {
      super();
    }

    async getToken(audience: string): Promise<AccessToken | null> {
      if (this.firstCall) {
        this.firstCall = false;
        throw new Error(TestTokenCredential.errorMessage);
      }
      return super.getToken(audience);
    }
  }

  it("UnPartitioned Queue: Receiver is not cached when not initialized", async function(): Promise<
    void
  > {
    const env: any = getEnvVars();

    // Send a message using service bus client created with connection string
    let clients = await getSenderReceiverClients(TestClientType.UnpartitionedQueue, "peekLock");
    senderClient = clients.senderClient;
    receiverClient = clients.receiverClient;
    await senderClient.send(TestMessage.getSample());
    await senderClient.close();
    await receiverClient.close();

    // Receive using service bus client created with faulty token provider
    const connectionObject: {
      Endpoint: string;
      SharedAccessKeyName: string;
      SharedAccessKey: string;
    } = parseConnectionString(env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]);
    const tokenProvider = new TestTokenCredential();
    receiverClient = new ServiceBusReceiverClient(
      {
        host: connectionObject.Endpoint.substr(5),
        tokenCredential: tokenProvider,
        queueName: EntityNames.QUEUE_NAME_NO_PARTITION
      },
      "peekLock"
    );

    let actualError: Error;
    receiverClient.subscribe({
      async processMessage(msg: ReceivedMessage) {
        throw new Error("No messages should have been received with faulty token provider");
      },
      async processError(err) {
        actualError = err;
      }
    });

    // Check for expected error and that receiver was not cached
    const errCheck = await checkWithTimeout(() => !!actualError === true);
    should.equal(errCheck, true, "Expected error to be thrown, but no error found.");
    should.equal(
      actualError!.message,
      TestTokenCredential.errorMessage,
      "Expected error from token provider, but unexpected error found."
    );
    should.equal(
      !!(clients.receiverClient as any)._context.streamingReceiver,
      false,
      "Expected Streaming receiver to not be cached"
    );
  });
});

describe("Streaming - maxConcurrentCalls", function(): void {
  afterEach(async () => {
    await afterEachTest();
  });

  async function testConcurrency(maxConcurrentCalls?: number): Promise<void> {
    const testMessages = [TestMessage.getSample(), TestMessage.getSample()];
    await senderClient.sendBatch(testMessages);

    const settledMsgs: ReceivedMessage[] = [];
    const receivedMsgs: ReceivedMessage[] = [];

    receiverClient.subscribe(
      {
        async processMessage(msg: ReceivedMessage, context: ContextWithSettlement) {
          if (receivedMsgs.length === 1) {
            if ((!maxConcurrentCalls || maxConcurrentCalls === 1) && settledMsgs.length === 0) {
              throw new Error(
                "onMessage for the second message should not have been called before the first message got settled"
              );
            }
          } else {
            if (maxConcurrentCalls && maxConcurrentCalls > 1 && settledMsgs.length !== 0) {
              throw new Error(
                "onMessage for the second message should have been called before the first message got settled"
              );
            }
          }

          receivedMsgs.push(msg);
          await delay(2000);
          await context.complete(msg);
          settledMsgs.push(msg);
        },
        processError
      },
      maxConcurrentCalls ? { maxConcurrentCalls } : {}
    );

    await checkWithTimeout(() => settledMsgs.length === 2);
    should.equal(unexpectedError, undefined, unexpectedError && unexpectedError.message);
    should.equal(settledMsgs.length, 2, `Expected 2, received ${settledMsgs.length} messages.`);
  }

  it("Partitioned Queue: no maxConcurrentCalls passed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testConcurrency();
  });

  it("Partitioned Queue: pass 1 for maxConcurrentCalls", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testConcurrency(1);
  });

  it("Partitioned Queue: pass 2 for maxConcurrentCalls", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedQueue);
    await testConcurrency(2);
  });

  it("Unpartitioned Queue: no maxConcurrentCalls passed #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testConcurrency();
  });

  it("Unpartitioned Queue: pass 1 for maxConcurrentCalls #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testConcurrency(1);
  });

  it("Unpartitioned Queue: pass 2 for maxConcurrentCalls #RunInBrowser", async function(): Promise<
    void
  > {
    await beforeEachTest(TestClientType.UnpartitionedQueue);
    await testConcurrency(2);
  });

  it("Partitioned Subscription: no maxConcurrentCalls passed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testConcurrency();
  });

  it("Partitioned Queue: pass 1 for maxConcurrentCalls", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testConcurrency(1);
  });

  it("Partitioned Queue: pass 2 for maxConcurrentCalls", async function(): Promise<void> {
    await beforeEachTest(TestClientType.PartitionedSubscription);
    await testConcurrency(2);
  });

  it("Unpartitioned Subscription: no maxConcurrentCalls passed", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testConcurrency();
  });

  it("Unpartitioned Subscription: pass 1 for maxConcurrentCalls", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testConcurrency(1);
  });

  it("Unpartitioned Subscription: pass 2 for maxConcurrentCalls", async function(): Promise<void> {
    await beforeEachTest(TestClientType.UnpartitionedSubscription);
    await testConcurrency(2);
  });
});
// #RevisitCommentedTestsAfterTheSingleClientAPI
// Receiver can't be closed separately with the current API
// Roll this back once the top level client is implemented
// describe("Streaming - Not receive messages after receiver is closed", function(): void {
//   afterEach(async () => {
//     await afterEachTest();
//   });

//   async function testReceiveMessages(): Promise<void> {
//     const totalNumOfMessages = 5;
//     let num = 1;
//     const messages = [];
//     while (num <= totalNumOfMessages) {
//       const message = {
//         messageId: num,
//         body: "test",
//         label: `${num}`,
//         partitionKey: "dummy" // Ensures all messages go to same parition to make peek work reliably
//       };
//       num++;
//       messages.push(message);
//     }
//     await senderClient.sendBatch(messages);

//     const receivedMsgs: ReceivedMessage[] = [];

//     receiverClient.subscribe(
//       {
//         async processMessage(brokeredMessage: ReceivedMessage, context: ContextWithSettlement) {
//           receivedMsgs.push(brokeredMessage);
//           await context.complete(brokeredMessage);
//         },
//         processError
//       },
//       {
//         autoComplete: false
//       }
//     );

//     await delay(5000);
//     should.equal(
//       receivedMsgs.length,
//       0,
//       `Expected 0 messages, but received ${receivedMsgs.length}`
//     );
//     await testPeekMsgsLength(receiverClient, totalNumOfMessages);
//   }

//   it("UnPartitioned Queue: Not receive messages after receiver is closed #RunInBrowser", async function(): Promise<
//     void
//   > {
//     await beforeEachTest(TestClientType.UnpartitionedQueue);
//     await testReceiveMessages();
//   });

//   it("UnPartitioned Queue: (Receive And Delete mode) Not receive messages after receiver is closed #RunInBrowser", async function(): Promise<
//     void
//   > {
//     await beforeEachTest(TestClientType.UnpartitionedQueue, "receiveAndDelete");
//     await testReceiveMessages();
//   });
// });
