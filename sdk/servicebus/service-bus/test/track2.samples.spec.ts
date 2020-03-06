// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  ReceivedMessage,
  ContextWithSettlement as ContextWithSettlementMethods
} from "../src/models";
import { NonSessionReceiver, SessionReceiver } from "../src/serviceBusReceiverClient";
import { delay, SendableMessageInfo, ServiceBusClient } from "../src";
import { EnvVarNames, getEnvVars } from "./utils/envVarUtils";
import { EntityNames } from "./utils/testUtils";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { getEntityNameFromConnectionString } from "../src/constructorHelpers";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe("track2", () => {
  describe("Sample scenarios", () => {
    let closeables: { close(): Promise<void> }[];
    const connectionString = getEnvVars()[EnvVarNames.SERVICEBUS_CONNECTION_STRING]!;
    let serviceBusClient: ServiceBusClient;

    before(async () => {
      assert.ok(
        connectionString,
        `${EnvVarNames.SERVICEBUS_CONNECTION_STRING} needs to be set in the environment`
      );

      serviceBusClient = new ServiceBusClient(connectionString);

      const nonSessionPurges = [
        EntityNames.QUEUE_NAME_NO_PARTITION,
        {
          topic: EntityNames.TOPIC_NAME_NO_PARTITION,
          subscription: EntityNames.SUBSCRIPTION_NAME_NO_PARTITION
        }
      ].map((auth) => purge(auth));

      const sessionPurge = purge(EntityNames.QUEUE_NAME_NO_PARTITION_SESSION, "my-session");
      await Promise.all([...nonSessionPurges, sessionPurge]);
    });

    after(async () => {
      await serviceBusClient.close();
    });

    beforeEach(() => {
      closeables = [];
    });

    afterEach(async () => {
      return Promise.all(closeables.map((closable) => closable.close()));
    });

    it("Queue, peek/lock", async () => {
      const receiverClient = serviceBusClient.createReceiver(
        EntityNames.QUEUE_NAME_NO_PARTITION,
        "peekLock"
      );

      closeables.push(receiverClient);

      await sendSampleMessage(EntityNames.QUEUE_NAME_NO_PARTITION, "Queue, peek/lock");

      const errors: string[] = [];
      const receivedBodies: string[] = [];

      receiverClient.subscribe({
        async processMessage(
          message: ReceivedMessage,
          context: ContextWithSettlementMethods
        ): Promise<void> {
          await context.complete(message);
          receivedBodies.push(message.body);
        },
        async processError(err: Error): Promise<void> {
          errors.push(err.message);
        }
      });

      await waitAndValidate("Queue, peek/lock", receivedBodies, errors, receiverClient);
    });

    it("Queue, receive and delete, receiveBatch", async () => {
      const receiver = serviceBusClient.createReceiver(
        EntityNames.QUEUE_NAME_NO_PARTITION,
        "receiveAndDelete"
      );

      closeables.push(receiver);

      await sendSampleMessage(
        EntityNames.QUEUE_NAME_NO_PARTITION,
        "Queue, peek/lock, receiveBatch"
      );

      const receivedBodies: string[] = [];

      // TODO: it might be nice to preserve the ability to just iterate
      // directly off the result.
      const { messages } = await receiver.receiveBatch(1, 5);

      for (const message of await messages) {
        receivedBodies.push(message.body);
      }

      // TODO: this isn't the greatest re-use...
      await waitAndValidate("Queue, peek/lock, receiveBatch", receivedBodies, [], receiver);
    });

    it("Queue, peek/lock, iterate messages", async () => {
      const receiverClient = serviceBusClient.createReceiver(
        EntityNames.QUEUE_NAME_NO_PARTITION,
        "peekLock"
      );

      await sendSampleMessage(
        EntityNames.QUEUE_NAME_NO_PARTITION,
        "Queue, peek/lock, iterate messages"
      );

      closeables.push(receiverClient);

      // etc...
      // receiverClient.getRules();
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      // TODO: error handling? Does the iterate just terminate?
      for await (const { message, context } of receiverClient.getMessageIterator()) {
        if (message == null) {
          // user has the option of handling "no messages arrived by the maximum wait time"
          console.log(`No message arrived within our max wait time`);
          continue;
        }

        try {
          await context.complete(message);
          receivedBodies.push(message.body);
          break;
        } catch (err) {
          await context.abandon(message);
          throw err;
        }
      }

      await waitAndValidate(
        "Queue, peek/lock, iterate messages",
        receivedBodies,
        errors,
        receiverClient
      );
    });

    it("Queue, receive and delete", async () => {
      const receiver = serviceBusClient.createReceiver(
        EntityNames.QUEUE_NAME_NO_PARTITION,
        "receiveAndDelete"
      );

      closeables.push(receiver);

      await sendSampleMessage(EntityNames.QUEUE_NAME_NO_PARTITION, "Queue, receiveAndDelete");

      const errors: string[] = [];
      const receivedBodies: string[] = [];

      receiver.subscribe({
        async processMessage(message: ReceivedMessage, context: {}): Promise<void> {
          receivedBodies.push(message.body);
        },
        async processError(err: Error): Promise<void> {
          errors.push(err.message);
        }
      });

      await waitAndValidate("Queue, receiveAndDelete", receivedBodies, errors, receiver);
    });

    it("Queue, receive and delete, iterate messages", async () => {
      const receiver = serviceBusClient.createReceiver(
        EntityNames.QUEUE_NAME_NO_PARTITION,
        "receiveAndDelete"
      );

      await sendSampleMessage(
        EntityNames.QUEUE_NAME_NO_PARTITION,
        "Queue, peek/lock, iterate messages"
      );

      closeables.push(receiver);

      // etc...
      // receiverClient.getRules();
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      // TODO: error handling? Does the iterate just terminate?
      for await (const { message, context } of receiver.getMessageIterator()) {
        assert.notOk((context as any).complete);

        if (message == null) {
          // user has the option of handling "no messages arrived by the maximum wait time"
          console.log(`No message arrived within our max wait time`);
          continue;
        }

        try {
          receivedBodies.push(message.body);
          break;
        } catch (err) {
          throw err;
        }
      }

      await waitAndValidate("Queue, peek/lock, iterate messages", receivedBodies, errors, receiver);
    });

    it("Queue, peek/lock, iterate messages", async () => {
      const receiver = serviceBusClient.createReceiver(
        EntityNames.QUEUE_NAME_NO_PARTITION,
        "peekLock"
      );
      closeables.push(receiver);

      await sendSampleMessage(
        EntityNames.QUEUE_NAME_NO_PARTITION,
        "Queue, peek/lock, iterate messages"
      );

      // etc...
      // receiverClient.getRules();
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      // TODO: error handling? Does the iterate just terminate?
      for await (const { message, context } of receiver.getMessageIterator()) {
        if (message == null) {
          // user has the option of handling "no messages arrived by the maximum wait time"
          console.log(`No message arrived within our max wait time`);
          continue;
        }

        try {
          await context.complete(message);
          receivedBodies.push(message.body);
          break;
        } catch (err) {
          await context.abandon(message);
          throw err;
        }
      }

      await waitAndValidate("Queue, peek/lock, iterate messages", receivedBodies, errors, receiver);
    });

    it("Subscription, peek/lock", async () => {
      const receiverClient = serviceBusClient.createReceiver(
        EntityNames.TOPIC_NAME_NO_PARTITION,
        EntityNames.SUBSCRIPTION_NAME_NO_PARTITION,
        "peekLock"
      );

      closeables.push(receiverClient);
      await sendSampleMessage(EntityNames.TOPIC_NAME_NO_PARTITION, "Subscription, peek/lock");

      // etc...
      // receiverClient.getRules();
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      receiverClient.subscribe({
        async processMessage(
          message: ReceivedMessage,
          context: ContextWithSettlementMethods
        ): Promise<void> {
          await context.complete(message);
          receivedBodies.push(message.body);
        },
        async processError(err: Error): Promise<void> {
          errors.push(err.message);
        }
      });

      await waitAndValidate("Subscription, peek/lock", receivedBodies, errors, receiverClient);
    });

    it("Subscription, receive and delete", async () => {
      const receiverClient = serviceBusClient.createReceiver(
        EntityNames.TOPIC_NAME_NO_PARTITION,
        EntityNames.SUBSCRIPTION_NAME_NO_PARTITION,
        "receiveAndDelete"
      );

      await sendSampleMessage(
        EntityNames.TOPIC_NAME_NO_PARTITION,
        "Subscription, receive and delete"
      );

      closeables.push(receiverClient);

      // etc...
      // receiverClient.getRules();
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      receiverClient.subscribe({
        async processMessage(message: ReceivedMessage, context: {}): Promise<void> {
          receivedBodies.push(message.body);
        },
        async processError(err: Error): Promise<void> {
          errors.push(err.message);
        }
      });

      await waitAndValidate(
        "Subscription, receive and delete",
        receivedBodies,
        errors,
        receiverClient
      );
    });

    it("Subscription, peek/lock, iterate messages", async () => {
      const receiverClient = serviceBusClient.createReceiver(
        EntityNames.TOPIC_NAME_NO_PARTITION,
        EntityNames.SUBSCRIPTION_NAME_NO_PARTITION,
        "peekLock"
      );

      closeables.push(receiverClient);

      await sendSampleMessage(
        EntityNames.TOPIC_NAME_NO_PARTITION,
        "Subscription, peek/lock, iterate messages"
      );

      // etc...
      // receiverClient.getRules();
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      // TODO: error handling? Does the iterate just terminate?
      for await (const { message, context } of receiverClient.getMessageIterator()) {
        if (message == null) {
          // user has the option of handling "no messages arrived by the maximum wait time"
          console.log(`No message arrived within our max wait time`);
          continue;
        }

        try {
          await context.complete(message);
          receivedBodies.push(message.body);
          break;
        } catch (err) {
          await context.abandon(message);
          throw err;
        }
      }

      await waitAndValidate(
        "Subscription, peek/lock, iterate messages",
        receivedBodies,
        errors,
        receiverClient
      );
    });

    it("Subscription, receive and delete, iterate messages", async () => {
      const receiver = serviceBusClient.createReceiver(
        EntityNames.TOPIC_NAME_NO_PARTITION,
        EntityNames.SUBSCRIPTION_NAME_NO_PARTITION,
        "receiveAndDelete"
      );

      closeables.push(receiver);

      await sendSampleMessage(
        EntityNames.TOPIC_NAME_NO_PARTITION,
        "Subscription, receive and delete, iterate messages"
      );

      // etc...
      // receiverClient.getRules();
      const errors: string[] = [];
      const receivedBodies: string[] = [];

      // TODO: error handling? Does the iterate just terminate?
      for await (const { message, context } of receiver.getMessageIterator()) {
        assert.notOk((context as any).complete);

        if (message == null) {
          // user has the option of handling "no messages arrived by the maximum wait time"
          console.log(`No message arrived within our max wait time`);
          continue;
        }

        try {
          receivedBodies.push(message.body);
          break;
        } catch (err) {
          throw err;
        }
      }

      await waitAndValidate(
        "Subscription, receive and delete, iterate messages",
        receivedBodies,
        errors,
        receiver
      );
    });

    it("Queue, receive and delete, sessions", async () => {
      const receiver = serviceBusClient.createSessionReceiver(
        EntityNames.QUEUE_NAME_NO_PARTITION_SESSION,
        "receiveAndDelete",
        "my-session"
      );

      closeables.push(receiver);

      sendSampleMessage(
        EntityNames.QUEUE_NAME_NO_PARTITION_SESSION,
        "Queue, receive and delete, sessions",
        "my-session"
      );

      // note that this method is now available - only shows up in auto-complete
      // if you construct this object with a session.
      await receiver.renewSessionLock();

      const errors: string[] = [];
      const receivedBodies: string[] = [];

      receiver.subscribe({
        async processMessage(message: ReceivedMessage, context: {}): Promise<void> {
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

    it("Queue, peek/lock, sessions", async () => {
      const receiver = serviceBusClient.createSessionReceiver(
        EntityNames.QUEUE_NAME_NO_PARTITION_SESSION,
        "peekLock",
        "my-session"
      );

      closeables.push(receiver);

      sendSampleMessage(
        EntityNames.QUEUE_NAME_NO_PARTITION_SESSION,
        "Queue, peek/lock, sessions",
        "my-session"
      );

      // note that this method is now available - only shows up in auto-complete
      // if you construct this object with a session.
      await receiver.renewSessionLock();

      const errors: string[] = [];
      const receivedBodies: string[] = [];

      receiver.subscribe({
        async processMessage(message: ReceivedMessage, context: {}): Promise<void> {
          receivedBodies.push(message.body);
        },
        async processError(err: Error): Promise<void> {
          errors.push(err.message);
        }
      });

      await waitAndValidate("Queue, peek/lock, sessions", receivedBodies, errors, receiver);
    });

    async function purge(
      entity: string | { topic: string; subscription: string },
      sessionId?: string
    ): Promise<void> {
      let receiver: NonSessionReceiver<"receiveAndDelete"> | SessionReceiver<"receiveAndDelete">;

      if (sessionId) {
        if (typeof entity === "string") {
          receiver = serviceBusClient.createSessionReceiver(
            entity,
            "receiveAndDelete",
            sessionId ?? ""
          );
        } else {
          receiver = serviceBusClient.createSessionReceiver(
            entity.topic,
            entity.subscription,
            "receiveAndDelete",
            sessionId ?? ""
          );
        }
      } else {
        if (typeof entity === "string") {
          receiver = serviceBusClient.createReceiver(entity, "receiveAndDelete");
        } else {
          receiver = serviceBusClient.createReceiver(
            entity.topic,
            entity.subscription,
            "receiveAndDelete"
          );
        }
      }

      while (true) {
        const { messages } = await receiver.receiveBatch(10, 1);

        if (messages.length === 0) {
          break;
        }
      }

      await receiver.close();
    }

    async function sendSampleMessage(entityName: string, body: string, sessionId?: string) {
      const sender = serviceBusClient.createSender(entityName);

      try {
        const message: SendableMessageInfo = {
          body
        };

        if (sessionId) {
          message.sessionId = sessionId;
        }

        await sender.send(message);
      } finally {
        await sender.close();
      }
    }
  });

  describe("ConstructorHelpers", () => {
    const entityConnectionString =
      "Endpoint=sb://host/;SharedAccessKeyName=queueall;SharedAccessKey=thesharedkey=;EntityPath=myentity";

    const serviceBusConnectionString =
      "Endpoint=sb://host/;SharedAccessKeyName=queueall;SharedAccessKey=thesharedkey=";

    it("getEntityNameFromConnectionString", () => {
      assert.equal("myentity", getEntityNameFromConnectionString(entityConnectionString));
      assert.throws(() => getEntityNameFromConnectionString(serviceBusConnectionString));
    });
  });
});

interface Diagnostics {
  peek(maxMessageCount?: number): Promise<ReceivedMessage[]>;
  peekBySequenceNumber(
    fromSequenceNumber: Long,
    maxMessageCount?: number
  ): Promise<ReceivedMessage[]>;
}

async function waitAndValidate(
  expectedMessage: string,
  receivedBodies: string[],
  errors: string[],
  receiverClient: { diagnostics: Diagnostics }
) {
  const maxChecks = 20;
  let numChecks = 0;

  while (receivedBodies.length === 0 && errors.length === 0) {
    if (++numChecks >= maxChecks) {
      throw new Error("Messages/errors never arrived.");
    }
    await delay(500);
  }

  const remainingMessages = (await receiverClient.diagnostics.peek(1)).map((m) => m.body);
  assert.isEmpty(errors);
  assert.isEmpty(remainingMessages);
  assert.deepEqual([expectedMessage], receivedBodies);
}
