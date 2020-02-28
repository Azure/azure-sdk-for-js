import {
  SessionConnections,
  Message,
  ContextWithSettlement as ContextWithSettlementMethods,
  UselessEmptyContextThatMaybeShouldBeRemoved
} from "../src/track2/models";
import { env } from "process";
import { ServiceBusReceiverClient } from "../src/track2/serviceBusReceiverClient";
import { ServiceBusSenderClient, delay } from "../src";
import { EnvVarNames } from "./utils/envVarUtils";
import { EntityNames } from "./utils/testUtils";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe.only("Samples scenarios for track 2", () => {
  let senderClient: ServiceBusSenderClient | undefined;
  let closeables: { close(): Promise<void> }[];
  const connectionString = env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]!;

  before(() => {
    assert.ok(
      connectionString,
      `${EnvVarNames.SERVICEBUS_CONNECTION_STRING} needs to be set in the environment`
    );
  });

  beforeEach(() => {
    closeables = [];
  });

  afterEach(async () => {
    if (senderClient != null) {
      closeables.push(senderClient);
      senderClient = undefined;
    }

    await Promise.all(closeables.map((closable) => closable.close()));
  });

  it.only("Queue, peek/lock", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        queueName: EntityNames.QUEUE_NAME_NO_PARTITION
      },
      "peekLock"
    );

    closeables.push(receiverClient);

    senderClient = new ServiceBusSenderClient(
      connectionString,
      EntityNames.QUEUE_NAME_NO_PARTITION
    );

    await sendSampleMessage("Queue, peek/lock");

    const errors: string[] = [];
    const receivedBodies: string[] = [];

    receiverClient.streamMessages({
      async processMessage(message: Message, context: ContextWithSettlementMethods): Promise<void> {
        await context.complete(message);
        receivedBodies.push(message.body);
      },
      async processError(err: Error): Promise<void> {
        errors.push(err.message);
      }
    });

    await waitAndValidate(
      "Queue, peek/lock",
      receivedBodies,
      errors,
      receiverClient);
  });

  it.only("Queue, peek/lock, iterate messages", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        queueName: EntityNames.QUEUE_NAME_NO_PARTITION,
      },
      "peekLock"
    );

    senderClient = new ServiceBusSenderClient(
      connectionString,
      EntityNames.QUEUE_NAME_NO_PARTITION
    );

    await sendSampleMessage("Queue, peek/lock, iterate messages");

    closeables.push(receiverClient);

    // etc...
    // receiverClient.getRules();
    const errors: string[] = [];
    const receivedBodies: string[] = [];

    // TODO: error handling? Does the iterate just terminate?
    for await (const { message, context } of receiverClient.iterateMessages()) {
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
      receiverClient);
  });

  it.only("Queue, receive and delete", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        queueName: EntityNames.QUEUE_NAME_NO_PARTITION
      },
      "receiveAndDelete"
    );

    closeables.push(receiverClient);

    senderClient = new ServiceBusSenderClient(
      connectionString,
      EntityNames.QUEUE_NAME_NO_PARTITION
    );

    await sendSampleMessage("Queue, receiveAndDelete");

    const errors: string[] = [];
    const receivedBodies: string[] = [];

    receiverClient.streamMessages({
      async processMessage(message: Message, context: {}): Promise<void> {
        receivedBodies.push(message.body);
      },
      async processError(err: Error): Promise<void> {
        errors.push(err.message);
      }
    });

    await waitAndValidate(
      "Queue, receiveAndDelete",
      receivedBodies,
      errors,
      receiverClient);
  });

  it.only("Queue, receive and delete, iterate messages", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        queueName: EntityNames.QUEUE_NAME_NO_PARTITION,
      },
      "receiveAndDelete"
    );

    senderClient = new ServiceBusSenderClient(
      connectionString,
      EntityNames.QUEUE_NAME_NO_PARTITION
    );

    await sendSampleMessage("Queue, peek/lock, iterate messages");

    closeables.push(receiverClient);

    // etc...
    // receiverClient.getRules();
    const errors: string[] = [];
    const receivedBodies: string[] = [];

    // TODO: error handling? Does the iterate just terminate?
    for await (const { message, context } of receiverClient.iterateMessages()) {
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
      "Queue, peek/lock, iterate messages",
      receivedBodies,
      errors,
      receiverClient);
  });

  it.only("Queue, peek/lock, iterate messages", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        queueName: EntityNames.QUEUE_NAME_NO_PARTITION,
      },
      "peekLock"
    );

    senderClient = new ServiceBusSenderClient(
      connectionString,
      EntityNames.QUEUE_NAME_NO_PARTITION
    );

    await sendSampleMessage("Queue, peek/lock, iterate messages");

    closeables.push(receiverClient);

    // etc...
    // receiverClient.getRules();
    const errors: string[] = [];
    const receivedBodies: string[] = [];

    // TODO: error handling? Does the iterate just terminate?
    for await (const { message, context } of receiverClient.iterateMessages()) {
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
      receiverClient);
  });

  it.only("Subscription, peek/lock", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        topicName: EntityNames.TOPIC_NAME_NO_PARTITION,
        subscriptionName: EntityNames.SUBSCRIPTION_NAME_NO_PARTITION
      },
      "peekLock"
    );

    senderClient = new ServiceBusSenderClient(
      connectionString,
      EntityNames.TOPIC_NAME_NO_PARTITION
    );

    await sendSampleMessage("Subscription, peek/lock");

    closeables.push(receiverClient);

    // etc...
    // receiverClient.getRules();
    const errors: string[] = [];
    const receivedBodies: string[] = [];

    receiverClient.streamMessages({
      async processMessage(message: Message, context: ContextWithSettlementMethods): Promise<void> {
        await context.complete(message);
        receivedBodies.push(message.body);
      },
      async processError(err: Error): Promise<void> {
        errors.push(err.message);
      }
    });

    await waitAndValidate(
      "Subscription, peek/lock",
      receivedBodies,
      errors,
      receiverClient);
  });

  it.only("Subscription, receive and delete", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        topicName: EntityNames.TOPIC_NAME_NO_PARTITION,
        subscriptionName: EntityNames.SUBSCRIPTION_NAME_NO_PARTITION
      },
      "receiveAndDelete"
    );

    senderClient = new ServiceBusSenderClient(
      connectionString,
      EntityNames.TOPIC_NAME_NO_PARTITION
    );

    await sendSampleMessage("Subscription, receive and delete");

    closeables.push(receiverClient);

    // etc...
    // receiverClient.getRules();
    const errors: string[] = [];
    const receivedBodies: string[] = [];

    receiverClient.streamMessages({
      async processMessage(message: Message, context: {}): Promise<void> {
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
      receiverClient);
  });

  it.only("Subscription, peek/lock, iterate messages", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        topicName: EntityNames.TOPIC_NAME_NO_PARTITION,
        subscriptionName: EntityNames.SUBSCRIPTION_NAME_NO_PARTITION
      },
      "peekLock"
    );

    senderClient = new ServiceBusSenderClient(
      connectionString,
      EntityNames.TOPIC_NAME_NO_PARTITION
    );

    await sendSampleMessage("Subscription, peek/lock, iterate messages");

    closeables.push(receiverClient);

    // etc...
    // receiverClient.getRules();
    const errors: string[] = [];
    const receivedBodies: string[] = [];

    // TODO: error handling? Does the iterate just terminate?
    for await (const { message, context } of receiverClient.iterateMessages()) {
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
      receiverClient);
  });

  it.only("Subscription, receive and delete, iterate messages", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        topicName: EntityNames.TOPIC_NAME_NO_PARTITION,
        subscriptionName: EntityNames.SUBSCRIPTION_NAME_NO_PARTITION
      },
      "receiveAndDelete"
    );

    senderClient = new ServiceBusSenderClient(
      connectionString,
      EntityNames.TOPIC_NAME_NO_PARTITION
    );

    await sendSampleMessage("Subscription, receive and delete, iterate messages");

    closeables.push(receiverClient);

    // etc...
    // receiverClient.getRules();
    const errors: string[] = [];
    const receivedBodies: string[] = [];

    // TODO: error handling? Does the iterate just terminate?
    for await (const { message, context } of receiverClient.iterateMessages()) {
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
      receiverClient);
  });

  it("receiveMessagesUsingReceiveAndDeleteAndSessions", async () => {
    const log = (...args: any[]) =>
      console.log(`receiveMessagesUsingReceiveAndDeleteAndSessions:`, ...args);
    log(`Listening, receiveAndDelete for queue with session ID \`helloworld\``);
    const sessionConnections = new SessionConnections();

    const receiverClient = new ServiceBusReceiverClient(
      { queueConnectionString: env[`queue.withSessions.connectionString`]! },
      "receiveAndDelete",
      {
        id: "helloworld",
        // the thinking is that users will (unlike queues or topics) open up
        // lots of individual sessions, so keeping track of and sharing connections
        // is a way to prevent a possible port/connection explosion.
        connections: sessionConnections
      }
    );

    // note that this method is now available - only shows up in auto-complete
    // if you construct this object with a session.
    await receiverClient.renewSessionLock();

    receiverClient.streamMessages({
      async processMessage(
        message: Message,
        context: UselessEmptyContextThatMaybeShouldBeRemoved
      ): Promise<void> {
        // process message here - it's basically a ServiceBusMessage minus any settlement related methods
        log(message.body);
      },
      async processError(err: Error): Promise<void> {
        log(`Error thrown: ${err}`);
      }
    });
  });

  async function sendSampleMessage(body: string) {
    if (senderClient == null) {
      throw new Error("Can't send a sample message w/o a client");
    }

    await senderClient.send({
      body
    });
  }
});

interface Diagnostics {
  peek(maxMessageCount?: number): Promise<Message[]>;
  peekBySequenceNumber(fromSequenceNumber: Long, maxMessageCount?: number): Promise<Message[]>;
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
