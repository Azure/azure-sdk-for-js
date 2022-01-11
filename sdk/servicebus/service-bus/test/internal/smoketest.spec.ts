// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ServiceBusReceivedMessage,
  ServiceBusReceiver,
  ServiceBusMessage,
  delay,
  ProcessErrorArgs,
  ServiceBusSender,
} from "../../src";
import { TestClientType } from "../public/utils/testUtils";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { getEntityNameFromConnectionString } from "../../src/constructorHelpers";
import {
  ServiceBusClientForTests,
  createServiceBusClientForTests,
} from "../public/utils/testutils2";
chai.use(chaiAsPromised);
const assert = chai.assert;

/**
 * A basic suite that exercises most of the core functionality.
 */
describe("Smoke tests", () => {
  let serviceBusClient: ServiceBusClientForTests;

  before(async () => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  describe("queues (no sessions)", async () => {
    let queueName: string;
    let sender: ServiceBusSender;

    before(async () => {
      const { queue } = await serviceBusClient.test.createTestEntities(
        TestClientType.UnpartitionedQueue
      );
      queueName = queue!;
    });

    beforeEach(async () => {
      sender = serviceBusClient.test.addToCleanup(serviceBusClient.createSender(queueName));
    });

    afterEach(async () => {
      return serviceBusClient.test.afterEach();
    });

    it("Queue, peek/lock", async () => {
      const receiver = serviceBusClient.test.addToCleanup(
        serviceBusClient.createReceiver(queueName)
      );

      await sendSampleMessage(sender, "Queue, peek/lock", undefined, "single");

      const errors: string[] = [];
      const receivedBodies: string[] = [];

      receiver.subscribe({
        async processMessage(message: ServiceBusReceivedMessage): Promise<void> {
          await receiver.completeMessage(message);
          receivedBodies.push(message.body);
        },
        async processError(args: ProcessErrorArgs): Promise<void> {
          errors.push(args.error.message);
        },
      });

      await waitAndValidate("Queue, peek/lock", receivedBodies, errors, receiver);
    });

    it("Queue, peek/lock, receiveBatch", async () => {
      const receiver = serviceBusClient.test.addToCleanup(
        serviceBusClient.createReceiver(queueName, { receiveMode: "receiveAndDelete" })
      );

      await sendSampleMessage(sender, "Queue, peek/lock, receiveBatch", undefined, "array");

      const receivedBodies: string[] = [];

      for (const message of await receiver.receiveMessages(1, { maxWaitTimeInMs: 5000 })) {
        receivedBodies.push(message.body);
      }

      // TODO: this isn't the greatest re-use...
      await waitAndValidate("Queue, peek/lock, receiveBatch", receivedBodies, [], receiver);
    });

    it("Queue, peek/lock, iterate messages", async () => {
      const receiver = serviceBusClient.test.addToCleanup(
        serviceBusClient.createReceiver(queueName)
      );

      await sendSampleMessage(sender, "Queue, peek/lock, iterate messages", undefined, "batch");

      // etc...
      // receiver.getRules();
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      // TODO: error handling? Does the iterate just terminate?
      for await (const message of receiver.getMessageIterator()) {
        if (message == null) {
          // user has the option of handling "no messages arrived by the maximum wait time"
          console.log(`No message arrived within our max wait time`);
          continue;
        }

        try {
          await receiver.completeMessage(message);
          receivedBodies.push(message.body);
          break;
        } catch (err) {
          await receiver.abandonMessage(message);
          throw err;
        }
      }

      await waitAndValidate("Queue, peek/lock, iterate messages", receivedBodies, errors, receiver);
    });

    it("Queue, receive and delete", async () => {
      const receiver = serviceBusClient.test.addToCleanup(
        serviceBusClient.createReceiver(queueName, { receiveMode: "receiveAndDelete" })
      );

      await sendSampleMessage(sender, "Queue, receiveAndDelete");

      const errors: string[] = [];
      const receivedBodies: string[] = [];

      receiver.subscribe({
        async processMessage(message: ServiceBusReceivedMessage): Promise<void> {
          receivedBodies.push(message.body);
        },
        async processError(args: ProcessErrorArgs): Promise<void> {
          errors.push(args.error.message);
        },
      });

      await waitAndValidate("Queue, receiveAndDelete", receivedBodies, errors, receiver);
    });

    it("Queue, receive and delete, iterate messages", async () => {
      const receiver = serviceBusClient.test.addToCleanup(
        serviceBusClient.createReceiver(queueName, { receiveMode: "receiveAndDelete" })
      );

      await sendSampleMessage(sender, "Queue, receive and delete, iterate messages");

      // etc...
      // receiver.getRules();
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      // TODO: error handling? Does the iterate just terminate?
      for await (const message of receiver.getMessageIterator()) {
        // TODO: temporary - ultimately this method should throw an error if they manage
        // to call it on a receiveAndDelete receiver.
        // message.complete()
        if (message == null) {
          // user has the option of handling "no messages arrived by the maximum wait time"
          console.log(`No message arrived within our max wait time`);
          continue;
        }

        receivedBodies.push(message.body);
        break;
      }

      await waitAndValidate(
        "Queue, receive and delete, iterate messages",
        receivedBodies,
        errors,
        receiver
      );
    });
  });

  describe("subscriptions (no sessions)", () => {
    let sender: ServiceBusSender;
    let topic: string;
    let subscription: string;

    before(async () => {
      const entity = await serviceBusClient.test.createTestEntities(
        TestClientType.UnpartitionedSubscription
      );

      topic = entity.topic!;
      subscription = entity.subscription!;
    });

    beforeEach(async () => {
      sender = serviceBusClient.test.addToCleanup(serviceBusClient.createSender(topic));
    });

    afterEach(async () => {
      return serviceBusClient.test.afterEach();
    });

    it("Subscription, peek/lock", async () => {
      const receiver = serviceBusClient.test.addToCleanup(
        serviceBusClient.createReceiver(topic, subscription)
      );

      await sendSampleMessage(sender, "Subscription, peek/lock");

      // etc...
      // receiver.getRules();
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      receiver.subscribe({
        async processMessage(message: ServiceBusReceivedMessage): Promise<void> {
          await receiver.completeMessage(message);
          receivedBodies.push(message.body);
        },
        async processError(args: ProcessErrorArgs): Promise<void> {
          errors.push(args.error.message);
        },
      });

      await waitAndValidate("Subscription, peek/lock", receivedBodies, errors, receiver);
    });

    it("Subscription, receive and delete", async () => {
      const receiver = serviceBusClient.test.addToCleanup(
        serviceBusClient.createReceiver(topic, subscription, { receiveMode: "receiveAndDelete" })
      );

      await sendSampleMessage(sender, "Subscription, receive and delete");

      // etc...
      // receiver.getRules();
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      receiver.subscribe({
        async processMessage(message: ServiceBusReceivedMessage): Promise<void> {
          receivedBodies.push(message.body);
        },
        async processError(args: ProcessErrorArgs): Promise<void> {
          errors.push(args.error.message);
        },
      });

      await waitAndValidate("Subscription, receive and delete", receivedBodies, errors, receiver);
    });

    it("Subscription, peek/lock, iterate messages", async () => {
      const receiver = serviceBusClient.test.addToCleanup(
        serviceBusClient.createReceiver(topic, subscription)
      );

      await sendSampleMessage(sender, "Subscription, peek/lock, iterate messages");

      // etc...
      // receiver.getRules();
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      // TODO: error handling? Does the iterate just terminate?
      for await (const message of receiver.getMessageIterator()) {
        if (message == null) {
          // user has the option of handling "no messages arrived by the maximum wait time"
          console.log(`No message arrived within our max wait time`);
          continue;
        }

        try {
          await receiver.completeMessage(message);
          receivedBodies.push(message.body);
          break;
        } catch (err) {
          await receiver.abandonMessage(message);
          throw err;
        }
      }

      await waitAndValidate(
        "Subscription, peek/lock, iterate messages",
        receivedBodies,
        errors,
        receiver
      );
    });

    it("Subscription, receive and delete, iterate messages", async () => {
      const receiver = serviceBusClient.test.addToCleanup(
        serviceBusClient.createReceiver(topic, subscription, { receiveMode: "receiveAndDelete" })
      );

      await sendSampleMessage(sender, "Subscription, receive and delete, iterate messages");

      // etc...
      // receiver.getRules();
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      // TODO: error handling? Does the iterate just terminate?
      for await (const message of receiver.getMessageIterator()) {
        if (message == null) {
          // user has the option of handling "no messages arrived by the maximum wait time"
          console.log(`No message arrived within our max wait time`);
          continue;
        }

        receivedBodies.push(message.body);
        break;
      }

      await waitAndValidate(
        "Subscription, receive and delete, iterate messages",
        receivedBodies,
        errors,
        receiver
      );
    });
  });

  describe("queues (with sessions)", () => {
    let sender: ServiceBusSender;
    let queue: string;

    before(async () => {
      const entities = await serviceBusClient.test.createTestEntities(
        TestClientType.UnpartitionedQueueWithSessions
      );
      queue = entities.queue!;
      sender = serviceBusClient.test.addToCleanup(serviceBusClient.createSender(queue));
    });

    it("Queue, next unlocked session, sessions", async () => {
      const sessionId = Date.now().toString();

      // important to send before we create the receiver so it gets handed back to
      // us by service bus when we're round-robining available sessions.
      await sendSampleMessage(sender, "Queue, next unlocked session, sessions", sessionId);

      const receiver = serviceBusClient.test.addToCleanup(
        await serviceBusClient.acceptNextSession(queue, { receiveMode: "receiveAndDelete" })
      );

      // this queue was freshly created so we are the first session (and thus the first session to get picked
      // up by the "get next available" logic).
      assert.equal(receiver.sessionId, sessionId);

      const errors: string[] = [];
      const receivedBodies: string[] = [];

      receiver.subscribe({
        async processMessage(message: ServiceBusReceivedMessage): Promise<void> {
          receivedBodies.push(message.body);
        },
        async processError(args: ProcessErrorArgs): Promise<void> {
          errors.push(args.error.message);
        },
      });

      await waitAndValidate(
        "Queue, next unlocked session, sessions",
        receivedBodies,
        errors,
        receiver
      );
    });

    it("Queue, receive and delete, sessions", async () => {
      const sessionId = Date.now().toString();
      const receiver = serviceBusClient.test.addToCleanup(
        await serviceBusClient.acceptSession(queue, sessionId, {
          receiveMode: "receiveAndDelete",
        })
      );

      assert.equal(receiver.sessionId, sessionId);

      await sendSampleMessage(sender, "Queue, receive and delete, sessions", sessionId);

      // note that this method is now available - only shows up in auto-complete
      // if you construct this object with a session.
      await receiver.renewSessionLock();

      const errors: string[] = [];
      const receivedBodies: string[] = [];

      receiver.subscribe({
        async processMessage(message: ServiceBusReceivedMessage): Promise<void> {
          receivedBodies.push(message.body);
        },
        async processError(args: ProcessErrorArgs): Promise<void> {
          errors.push(args.error.message);
        },
      });

      await waitAndValidate(
        "Queue, receive and delete, sessions",
        receivedBodies,
        errors,
        receiver
      );
    });

    it("Queue, peek/lock, sessions using an iterator", async () => {
      const sessionId = Date.now().toString();

      const receiver = serviceBusClient.test.addToCleanup(
        await serviceBusClient.acceptSession(queue, sessionId)
      );

      await sendSampleMessage(sender, "Queue, peek/lock, sessions", sessionId);

      // note that this method is now available - only shows up in auto-complete
      // if you construct this object with a session.
      await receiver.renewSessionLock();

      const errors: string[] = [];
      const receivedBodies: string[] = [];

      for await (const message of receiver.getMessageIterator()) {
        receivedBodies.push(message.body);
        await receiver.completeMessage(message);
        break;
      }

      await waitAndValidate("Queue, peek/lock, sessions", receivedBodies, errors, receiver);
    });
  });

  async function sendSampleMessage(
    sender: ServiceBusSender,
    body: string,
    sessionId?: string,
    method: "single" | "array" | "batch" = "single"
  ): Promise<void> {
    const message: ServiceBusMessage = {
      body,
    };

    if (sessionId) {
      message.sessionId = sessionId;
    }

    switch (method) {
      case "single": {
        await sender.sendMessages(message);
        break;
      }
      case "array": {
        await sender.sendMessages([message]);
        break;
      }
      case "batch": {
        const batch = await sender.createMessageBatch();
        assert.isTrue(batch.tryAddMessage(message));
        await sender.sendMessages(batch);
        break;
      }
    }
  }
});

describe("ConstructorHelpers for track 2", () => {
  const entityConnectionString =
    "Endpoint=sb://host/;SharedAccessKeyName=queueall;SharedAccessKey=thesharedkey=;EntityPath=myentity";

  const serviceBusConnectionString =
    "Endpoint=sb://host/;SharedAccessKeyName=queueall;SharedAccessKey=thesharedkey=";

  it("getEntityNameFromConnectionString", () => {
    assert.equal("myentity", getEntityNameFromConnectionString(entityConnectionString));
    assert.throws(() => getEntityNameFromConnectionString(serviceBusConnectionString));
  });
});

async function waitAndValidate(
  expectedMessage: string,
  receivedBodies: string[],
  errors: string[],
  receiver: ServiceBusReceiver
): Promise<void> {
  const maxChecks = 20;
  let numChecks = 0;

  while (receivedBodies.length === 0 && errors.length === 0) {
    if (++numChecks >= maxChecks) {
      throw new Error("Messages/errors never arrived.");
    }
    await delay(500);
  }

  const remainingMessages = (await receiver.peekMessages(1)).map((m) => m.body);
  assert.isEmpty(errors);
  assert.isEmpty(remainingMessages);
  assert.deepEqual([expectedMessage], receivedBodies);
}
