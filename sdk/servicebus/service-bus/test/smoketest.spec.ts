// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { ReceivedMessage, Receiver, ServiceBusMessage, delay } from "../src";
import { TestClientType } from "./utils/testUtils";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { getEntityNameFromConnectionString } from "../src/constructorHelpers";
import { ServiceBusClientForTests, createServiceBusClientForTests } from "./utils/testutils2";
import { Sender } from "../src/sender";
import { ReceivedMessageWithLock } from "../src/serviceBusMessage";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe("Sample scenarios for track 2", () => {
  let serviceBusClient: ServiceBusClientForTests;

  before(async () => {
    serviceBusClient = createServiceBusClientForTests();
  });

  after(() => {
    return serviceBusClient.test.after();
  });

  describe("queues (no sessions)", async () => {
    let queueName: string;
    let sender: Sender;

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
        async processMessage(message: ReceivedMessageWithLock): Promise<void> {
          await message.complete();
          receivedBodies.push(message.body);
        },
        async processError(err: Error): Promise<void> {
          errors.push(err.message);
        }
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
          await message.complete();
          receivedBodies.push(message.body);
          break;
        } catch (err) {
          await message.abandon();
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
        async processMessage(message: ReceivedMessage): Promise<void> {
          receivedBodies.push(message.body);
        },
        async processError(err: Error): Promise<void> {
          errors.push(err.message);
        }
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
    let sender: Sender;
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
        async processMessage(message: ReceivedMessageWithLock): Promise<void> {
          await message.complete();
          receivedBodies.push(message.body);
        },
        async processError(err: Error): Promise<void> {
          errors.push(err.message);
        }
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
        async processMessage(message: ReceivedMessage): Promise<void> {
          receivedBodies.push(message.body);
        },
        async processError(err: Error): Promise<void> {
          errors.push(err.message);
        }
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
          await message.complete();
          receivedBodies.push(message.body);
          break;
        } catch (err) {
          await message.abandon();
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
    let sender: Sender;
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
        await serviceBusClient.createSessionReceiver(queue, { receiveMode: "receiveAndDelete" })
      );

      // this queue was freshly created so we are the first session (and thus the first session to get picked
      // up by the "get next available" logic).
      assert.equal(receiver.sessionId, sessionId);

      const errors: string[] = [];
      const receivedBodies: string[] = [];

      receiver.subscribe({
        async processMessage(message: ReceivedMessage): Promise<void> {
          receivedBodies.push(message.body);
        },
        async processError(err: Error): Promise<void> {
          errors.push(err.message);
        }
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
        await serviceBusClient.createSessionReceiver(queue, {
          sessionId,
          receiveMode: "receiveAndDelete"
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
        async processMessage(message: ReceivedMessage): Promise<void> {
          receivedBodies.push(message.body);
        },
        async processError(err: Error): Promise<void> {
          errors.push(err.message);
        }
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
        await serviceBusClient.createSessionReceiver(queue, { sessionId })
      );

      await sendSampleMessage(sender, "Queue, peek/lock, sessions", sessionId);

      // note that this method is now available - only shows up in auto-complete
      // if you construct this object with a session.
      await receiver.renewSessionLock();

      const errors: string[] = [];
      const receivedBodies: string[] = [];

      for await (const message of receiver.getMessageIterator()) {
        receivedBodies.push(message.body);
        await message.complete();
        break;
      }

      await waitAndValidate("Queue, peek/lock, sessions", receivedBodies, errors, receiver);
    });
  });

  async function sendSampleMessage(
    sender: Sender,
    body: string,
    sessionId?: string,
    method: "single" | "array" | "batch" = "single"
  ): Promise<void> {
    const message: ServiceBusMessage = {
      body
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
        const batch = await sender.createBatch();
        assert.isTrue(batch.tryAdd(message));
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
  receiver: Receiver<ReceivedMessage>
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
