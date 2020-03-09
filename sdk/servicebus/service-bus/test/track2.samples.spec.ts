// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  SessionConnections,
  ReceivedMessage,
  ContextWithSettlement as ContextWithSettlementMethods,
  QueueAuth,
  SubscriptionAuth,
  isQueueAuth
} from "../src/models";
import {
  ServiceBusReceiverClient,
  NonSessionReceiver,
  SessionReceiver
} from "../src/serviceBusReceiverClient";
import { ServiceBusSenderClient, delay, SendableMessageInfo } from "../src";
import { EnvVarNames, getEnvVars } from "./utils/envVarUtils";
import { EntityNames } from "./utils/testUtils";
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import {
  createConnectionContext,
  getEntityNameFromConnectionString
} from "../src/constructorHelpers";
import { purge as utilsPurge } from "./utils/testUtils";
chai.use(chaiAsPromised);
const assert = chai.assert;

describe("Harsha ", () => {
  it("doubt test - peeking with sessions", async () => {
    const connectionString = getEnvVars()[EnvVarNames.SERVICEBUS_CONNECTION_STRING];

    // receiverClient.close();

    const senderClient = new ServiceBusSenderClient(connectionString, "new-queue");

    const message: SendableMessageInfo = {
      body: "hello 1",
      sessionId: "sessionId_1"
    };
    let receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        queueName: "new-queue"
      },
      "peekLock",
      { id: undefined }
    );
    // await utilsPurge(receiverClient);
    // let peekedMsgs = await receiverClient.diagnostics.peek();
    // console.log(peekedMsgs);

    await senderClient.send(message);
    await delay(5000);
    await utilsPurge(receiverClient);
    let peekedMsgs = await receiverClient.diagnostics.peek();
    console.log(peekedMsgs);
    await utilsPurge(receiverClient);
    peekedMsgs = await receiverClient.diagnostics.peek();
    console.log(peekedMsgs);
    await utilsPurge(receiverClient);
    peekedMsgs = await receiverClient.diagnostics.peek();
    console.log(peekedMsgs);
  });

  it("doubt test", async () => {
    const connectionString = getEnvVars()[EnvVarNames.SERVICEBUS_CONNECTION_STRING];

    // receiverClient.close();

    const senderClient = new ServiceBusSenderClient(connectionString, "new-queue");

    const message: SendableMessageInfo = {
      body: "hello 1"
    };

    message.sessionId = "sessionId_1";
    await senderClient.send(message);
    console.log("sent - 1st message");

    message.body = "hello 2";
    message.sessionId = "sessionId_2";
    await senderClient.send(message);
    console.log("sent - 2nd message");
    await senderClient.close();

    // let receiverClient = new ServiceBusReceiverClient(
    //   {
    //     connectionString: connectionString,
    //     queueName: "new-queue"
    //   },
    //   "receiveAndDelete",
    //   { id: undefined }
    // );
    // let batch = await receiverClient.receiveBatch(2);
    // let msgs = batch.messages;
    // console.log("received message -", msgs[0].body, msgs[0].sessionId);
    let receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        queueName: "new-queue"
      },
      "peekLock",
      { id: undefined }
    );
    let batch = await receiverClient.receiveBatch(2);
    let msgs = batch.messages;
    console.log("received message -", msgs[0].body, msgs[0].sessionId);
    await batch.context.complete(msgs[0]);
    await receiverClient.close();

    receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        queueName: "new-queue"
      },
      "peekLock",
      { id: undefined }
    );
    batch = await receiverClient.receiveBatch(2);
    msgs = batch.messages;
    console.log("received message -", msgs[0].body, msgs[0].sessionId);
    await batch.context.complete(msgs[0]);
    await receiverClient.close();
  });
});

describe("Sample scenarios for track 2", () => {
  let senderClient: ServiceBusSenderClient | undefined;
  let closeables: { close(): Promise<void> }[];
  const connectionString = getEnvVars()[EnvVarNames.SERVICEBUS_CONNECTION_STRING]!;

  before(async () => {
    assert.ok(
      connectionString,
      `${EnvVarNames.SERVICEBUS_CONNECTION_STRING} needs to be set in the environment`
    );

    const nonSessionPurges = [
      {
        connectionString: connectionString,
        queueName: EntityNames.QUEUE_NAME_NO_PARTITION
      },
      {
        connectionString: connectionString,
        topicName: EntityNames.TOPIC_NAME_NO_PARTITION,
        subscriptionName: EntityNames.SUBSCRIPTION_NAME_NO_PARTITION
      }
    ].map((auth) => purge(auth));

    const sessionPurge = purge(
      {
        connectionString: connectionString,
        queueName: EntityNames.QUEUE_NAME_NO_PARTITION_SESSION
      },
      "my-session"
    );

    await Promise.all([...nonSessionPurges, sessionPurge]);
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

  it("Queue, peek/lock", async () => {
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

  it("Queue, peek/lock, receiveBatch", async () => {
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

    await sendSampleMessage("Queue, peek/lock, receiveBatch");

    const receivedBodies: string[] = [];

    for (const message of (await receiverClient.receiveBatch(1, 5)).messages) {
      receivedBodies.push(message.body);
    }

    // TODO: this isn't the greatest re-use...
    await waitAndValidate("Queue, peek/lock, receiveBatch", receivedBodies, [], receiverClient);
  });

  it("Queue, peek/lock, iterate messages", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        queueName: EntityNames.QUEUE_NAME_NO_PARTITION
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
      receiverClient
    );
  });

  it("Queue, receive and delete", async () => {
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

    receiverClient.subscribe({
      async processMessage(message: ReceivedMessage, context: {}): Promise<void> {
        receivedBodies.push(message.body);
      },
      async processError(err: Error): Promise<void> {
        errors.push(err.message);
      }
    });

    await waitAndValidate("Queue, receiveAndDelete", receivedBodies, errors, receiverClient);
  });

  it("Queue, receive and delete, iterate messages", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        queueName: EntityNames.QUEUE_NAME_NO_PARTITION
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
      receiverClient
    );
  });

  it("Queue, peek/lock, iterate messages", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        queueName: EntityNames.QUEUE_NAME_NO_PARTITION
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
      receiverClient
    );
  });

  it("Subscription, peek/lock", async () => {
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
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        topicName: EntityNames.TOPIC_NAME_NO_PARTITION,
        subscriptionName: EntityNames.SUBSCRIPTION_NAME_NO_PARTITION
      },
      "peekLock"
    );

    closeables.push(receiverClient);

    senderClient = new ServiceBusSenderClient(
      connectionString,
      EntityNames.TOPIC_NAME_NO_PARTITION
    );

    await sendSampleMessage("Subscription, peek/lock, iterate messages");

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
      receiverClient
    );
  });

  it("Subscription, receive and delete, iterate messages", async () => {
    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        topicName: EntityNames.TOPIC_NAME_NO_PARTITION,
        subscriptionName: EntityNames.SUBSCRIPTION_NAME_NO_PARTITION
      },
      "receiveAndDelete"
    );

    closeables.push(receiverClient);

    senderClient = new ServiceBusSenderClient(
      connectionString,
      EntityNames.TOPIC_NAME_NO_PARTITION
    );

    await sendSampleMessage("Subscription, receive and delete, iterate messages");

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
      receiverClient
    );
  });

  it("Queue, receive and delete, sessions", async () => {
    const sessionConnections = new SessionConnections();

    const receiverClient = new ServiceBusReceiverClient(
      { connectionString, queueName: EntityNames.QUEUE_NAME_NO_PARTITION_SESSION },
      "receiveAndDelete",
      {
        id: "my-session",
        // the thinking is that users will (unlike queues or topics) open up
        // lots of individual sessions, so keeping track of and sharing connections
        // is a way to prevent a possible port/connection explosion.
        connections: sessionConnections
      }
    );

    closeables.push(receiverClient);

    senderClient = new ServiceBusSenderClient(
      connectionString,
      EntityNames.QUEUE_NAME_NO_PARTITION_SESSION
    );

    sendSampleMessage("Queue, receive and delete, sessions", "my-session");

    // note that this method is now available - only shows up in auto-complete
    // if you construct this object with a session.
    await receiverClient.renewSessionLock();

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
      "Queue, receive and delete, sessions",
      receivedBodies,
      errors,
      receiverClient
    );
  });

  it("Queue, peek/lock, sessions", async () => {
    const sessionConnections = new SessionConnections();

    const receiverClient = new ServiceBusReceiverClient(
      {
        connectionString: connectionString,
        queueName: EntityNames.QUEUE_NAME_NO_PARTITION_SESSION
      },
      "peekLock",
      {
        id: "my-session",
        // the thinking is that users will (unlike queues or topics) open up
        // lots of individual sessions, so keeping track of and sharing connections
        // is a way to prevent a possible port/connection explosion.
        connections: sessionConnections
      }
    );

    closeables.push(receiverClient);

    senderClient = new ServiceBusSenderClient(
      connectionString,
      EntityNames.QUEUE_NAME_NO_PARTITION_SESSION
    );

    sendSampleMessage("Queue, peek/lock, sessions", "my-session");

    // note that this method is now available - only shows up in auto-complete
    // if you construct this object with a session.
    await receiverClient.renewSessionLock();

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

    await waitAndValidate("Queue, peek/lock, sessions", receivedBodies, errors, receiverClient);
  });

  async function sendSampleMessage(body: string, sessionId?: string) {
    if (senderClient == null) {
      throw new Error("Can't send a sample message w/o a client");
    }

    const message: SendableMessageInfo = {
      body
    };

    if (sessionId) {
      message.sessionId = sessionId;
    }

    await senderClient.send(message);
  }
});

describe("ConstructorHelpers for track 2", () => {
  const entityConnectionString =
    "Endpoint=sb://host/;SharedAccessKeyName=queueall;SharedAccessKey=thesharedkey=;EntityPath=myentity";

  const serviceBusConnectionString =
    "Endpoint=sb://host/;SharedAccessKeyName=queueall;SharedAccessKey=thesharedkey=";

  const fakeTokenCredential = {
    getToken: async () => null,
    sentinel: "test token credential"
  };

  it("createConnectionContext for queues", () => {
    const queueAuths: QueueAuth[] = [
      { connectionString: entityConnectionString, queueName: "myentity" },
      { connectionString: serviceBusConnectionString, queueName: "myentity" },
      { queueConnectionString: entityConnectionString },
      { tokenCredential: fakeTokenCredential, host: "ahost", queueName: "myentity" }
    ];

    for (const queueAuth of queueAuths) {
      const contextAndEntityPath = createConnectionContext(queueAuth, {});
      assert.equal("myentity", contextAndEntityPath.entityPath);

      if ((queueAuth as any).tokenCredential) {
        assert.equal(
          "test token credential",
          (contextAndEntityPath.context.tokenCredential as any).sentinel
        );
      } else {
        assert.equal(
          "SharedKeyCredential",
          contextAndEntityPath.context.tokenCredential.constructor.name
        );
      }
    }
  });

  it("createConnectionContext for subscriptions", () => {
    const subscriptionAuths: SubscriptionAuth[] = [
      {
        connectionString: serviceBusConnectionString,
        topicName: "myentity",
        subscriptionName: "mysubscription"
      },
      { topicConnectionString: entityConnectionString, subscriptionName: "mysubscription" },
      {
        tokenCredential: fakeTokenCredential,
        host: "ahost",
        topicName: "myentity",
        subscriptionName: "mysubscription"
      }
    ];

    for (const subAuth of subscriptionAuths) {
      const contextAndEntityPath = createConnectionContext(subAuth, {});
      assert.equal("myentity/Subscriptions/mysubscription", contextAndEntityPath.entityPath);

      if ((subAuth as any).tokenCredential) {
        assert.equal(
          "test token credential",
          (contextAndEntityPath.context.tokenCredential as any).sentinel
        );
      } else {
        assert.equal(
          "SharedKeyCredential",
          contextAndEntityPath.context.tokenCredential.constructor.name
        );
      }
    }
  });

  const badAuths = [
    // missing required fields
    { connectionString: serviceBusConnectionString },
    { topicConnectionString: entityConnectionString },
    { tokenCredential: fakeTokenCredential } as any,

    // wrong types
    { connectionString: 4, topicName: "myentity", subscriptionName: "mysubscription" },
    {
      connectionString: serviceBusConnectionString,
      topicName: 4,
      subscriptionName: "mysubscription"
    },
    { connectionString: serviceBusConnectionString, topicName: "myentity", subscriptionName: 4 },
    { connectionString: "", topicName: "myentity", subscriptionName: "mysubscription" },
    {
      connectionString: serviceBusConnectionString,
      topicName: "",
      subscriptionName: "mysubscription"
    },
    { connectionString: serviceBusConnectionString, topicName: "myentity", subscriptionName: "" },
    { connectionString: 4, queueName: "myentity" },
    { connectionString: serviceBusConnectionString, queueName: 4 },
    { queueConnectionString: 4 },
    { queueConnectionString: "" },
    { topicConnectionString: 4, subscriptionName: "mysubscription" },
    { topicConnectionString: entityConnectionString, subscriptionName: 4 },
    { topicConnectionString: "", subscriptionName: "mysubscription" },
    { topicConnectionString: entityConnectionString, subscriptionName: "" },

    // no entity name present for entity connection string types
    {
      topicConnectionString:
        "Endpoint=sb://host/;SharedAccessKeyName=queueall;SharedAccessKey=thesharedkey=",
      subscriptionName: "mysubscription"
    },
    {
      queueConnectionString:
        "Endpoint=sb://host/;SharedAccessKeyName=queueall;SharedAccessKey=thesharedkey="
    }
  ];

  badAuths.forEach((badAuth) => {
    it(`createConnectionContext - bad auth ${JSON.stringify(badAuth)}`, () => {
      assert.throws(() => {
        createConnectionContext(badAuth, {});
      });
    });
  });

  it("getEntityNameFromConnectionString", () => {
    assert.equal("myentity", getEntityNameFromConnectionString(entityConnectionString));
    assert.throws(() => getEntityNameFromConnectionString(serviceBusConnectionString));
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

async function purge(auth: QueueAuth | SubscriptionAuth, sessionId?: string): Promise<void> {
  let receiverClient: NonSessionReceiver<"receiveAndDelete"> | SessionReceiver<"receiveAndDelete">;

  if (sessionId) {
    if (isQueueAuth(auth)) {
      receiverClient = new ServiceBusReceiverClient(auth, "receiveAndDelete", {
        id: sessionId,
        connections: new SessionConnections()
      });
    } else {
      receiverClient = new ServiceBusReceiverClient(auth, "receiveAndDelete", {
        id: sessionId,
        connections: new SessionConnections()
      });
    }
  } else {
    if (isQueueAuth(auth)) {
      receiverClient = new ServiceBusReceiverClient(auth, "receiveAndDelete");
    } else {
      receiverClient = new ServiceBusReceiverClient(auth, "receiveAndDelete");
    }
  }

  while (true) {
    const messages = await receiverClient.receiveBatch(10, 1);

    if (messages.messages.length === 0) {
      break;
    }
  }

  await receiverClient.close();
}
