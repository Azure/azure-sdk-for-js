// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// Anything we expect to be available to users should come from this import
// as a simple sanity check that we've exported things properly.
import { ServiceBusClient, SessionReceiver, Receiver, GetSessionReceiverOptions } from "../../src";

import { TestClientType, TestMessage } from "./testUtils";
import { getEnvVars, EnvVarNames } from "./envVarUtils";
import * as dotenv from "dotenv";
import { recreateQueue, recreateTopic, recreateSubscription } from "./managementUtils";
import { ServiceBusClientOptions } from "../../src";
import chai from "chai";
import {
  ReceivedMessageWithLock,
  ReceivedMessage,
  ServiceBusMessage
} from "../../src/serviceBusMessage";

dotenv.config();
const env = getEnvVars();
const should = chai.should();

const defaultLockDuration = "PT30S"; // 30 seconds in ISO 8601 FORMAT - equivalent to "P0Y0M0DT0H0M30S"

function getEntityNames(
  testClientType: TestClientType
): {
  queue?: string;
  topic?: string;
  subscription?: string;
  usesSessions: boolean;
  isPartitioned: boolean;
} {
  const name = TestClientType[testClientType];
  let prefix = "";
  let isPartitioned = false;

  if (name.indexOf("Partitioned") !== -1) {
    prefix = "partitioned-";
    isPartitioned = true;
  } else if (name.indexOf("Unpartitioned") !== -1) {
    prefix = "unpartitioned-";
  } else {
    // there are some topic/rule based ones that don't care.
    prefix = "unpartitioned-";
  }

  let suffix = "";
  let usesSessions = false;

  if (name.endsWith("WithSessions")) {
    suffix = "-sessions";
    usesSessions = true;
  }

  if (name.indexOf("Queue") !== -1) {
    return {
      queue: prefix + "queue" + suffix,
      usesSessions,
      isPartitioned
    };
  } else if (name.indexOf("Subscription") !== -1) {
    return {
      topic: prefix + "topic" + suffix,
      subscription: prefix + "topic-subscription" + suffix,
      usesSessions,
      isPartitioned
    };
  } else if (name.indexOf("Topic") !== -1) {
    return {
      topic: prefix + "topic" + suffix,
      usesSessions,
      isPartitioned
    };
  } else {
    throw new Error(`No idea what the entity type is for ${name}`);
  }
}

async function createTestEntities(
  testClientType: TestClientType
): Promise<ReturnType<typeof getEntityNames>> {
  const relatedEntities = getEntityNames(testClientType);

  if (relatedEntities.queue) {
    await recreateQueue(relatedEntities.queue, {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true,
      enablePartitioning: relatedEntities.isPartitioned,
      requiresSession: relatedEntities.usesSessions
    });
  }

  if (relatedEntities.topic) {
    await recreateTopic(relatedEntities.topic, {
      enablePartitioning: relatedEntities.isPartitioned,
      enableBatchedOperations: true
    });
  }

  if (relatedEntities.topic && relatedEntities.subscription) {
    await recreateSubscription(relatedEntities.topic, relatedEntities.subscription, {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true,
      requiresSession: relatedEntities.usesSessions
    });
  }

  return relatedEntities;
}

export async function drainAllMessages(receiver: Receiver<{}>): Promise<void> {
  while (true) {
    const messages = await receiver.receiveBatch(10, { maxWaitTimeSeconds: 1 });

    if (messages.length === 0) {
      break;
    }
  }

  await receiver.close();
}

export type EntityName = Omit<ReturnType<typeof getEntityNames>, "isPartitioned" | "usesSessions">;

export interface ServiceBusClientForTests extends ServiceBusClient {
  test: ServiceBusTestHelpers;
}

export class ServiceBusTestHelpers {
  constructor(private _serviceBusClient: ServiceBusClient) {}

  addToCleanup<T extends { close(): Promise<void> }>(v: T): T {
    this._closeables.push(v);
    return v;
  }

  async afterEach(): Promise<void> {
    const closePromises = this._closeables.map((c) => c.close());
    this._closeables.length = 0;
    await Promise.all(closePromises);
  }

  async verifyAndDeleteAllSentMessages(
    entityNames: EntityName,
    useSessions: boolean,
    sentMessages: ServiceBusMessage[]
  ): Promise<void> {
    let receiverClient: Receiver<ReceivedMessage> | SessionReceiver<ReceivedMessage>;
    let receivedMsgs: ReceivedMessage[];
    if (!useSessions) {
      receiverClient = this.getReceiveAndDeleteReceiver({
        queue: entityNames.queue,
        topic: entityNames.topic,
        subscription: entityNames.subscription,
        usesSessions: false
      });
      receivedMsgs = await receiverClient.receiveBatch(sentMessages.length, {
        // To Do - Maybe change the maxWaitTime
        // Currently set same as numberOfMessages being received
        maxWaitTimeSeconds: sentMessages.length
      });
      await receiverClient.close();
    } else {
      // From the sentMessages array, creating a set of all the `session-id`s
      const setOfSessionIds: Set<string> = new Set();
      // numOfMsgsWithSessionId - To keep track of number of messages sent per session in the sent messages
      let numOfMsgsWithSessionId: { [sessionId: string]: number } = {};
      sentMessages.forEach((msg) => {
        setOfSessionIds.add(msg.sessionId!);
        numOfMsgsWithSessionId[msg.sessionId!] = numOfMsgsWithSessionId[msg.sessionId!]
          ? numOfMsgsWithSessionId[msg.sessionId!] + 1
          : 1;
      });
      // for-loop to receive messages from those `session-id`s
      for (const id of setOfSessionIds) {
        receiverClient = this.getReceiveAndDeleteReceiver({
          queue: entityNames.queue,
          topic: entityNames.topic,
          subscription: entityNames.subscription,
          usesSessions: true,
          sessionId: id
        });
        const msgs = await receiverClient.receiveBatch(numOfMsgsWithSessionId[id], {
          // To Do - Maybe change the maxWaitTime
          // Currently set same as numberOfMessages being received
          maxWaitTimeSeconds: numOfMsgsWithSessionId[id]
        });
        receivedMsgs = !receivedMsgs! ? msgs : receivedMsgs!.concat(msgs);
        await receiverClient.close();
      }
    }
    should.equal(
      sentMessages.length,
      receivedMsgs!.length,
      "Unexpected number of messages received."
    );
    receivedMsgs!.forEach((receivedMessage) => {
      sentMessages = sentMessages.filter(
        (sentMessage) =>
          sentMessage.messageId !== receivedMessage.messageId &&
          sentMessage.body !== receivedMessage.body
        // To Do - Can check more properties here other than just messageId and body
      );
    });
    should.equal(sentMessages.length, 0, "Unexpected messages received.");
    // To Do - Maybe peek into the entity to make sure there are no messages left in the entity
  }

  async after(): Promise<void> {
    // TODO: purge any of the dynamically created entities created in `createTestEntities`
    await this._serviceBusClient.close();
  }

  async purgeForClientType(...testClientTypes: TestClientType[]): Promise<void> {
    await Promise.all(
      testClientTypes.map((tct) => purgeForTestClientType(this._serviceBusClient, tct))
    );
  }

  async createTestEntities(
    testClientType: TestClientType
  ): Promise<ReturnType<typeof getEntityNames>> {
    // TODO: for now these aren't randomly named. This is prep so we can
    // do that soon.
    let entityValues = this._testClientEntities.get(testClientType);

    if (entityValues == null) {
      entityValues = await createTestEntities(testClientType);
      this._testClientEntities.set(testClientType, entityValues);
    }

    return entityValues;
  }

  getTestEntities(testClientType: TestClientType): ReturnType<typeof getEntityNames> {
    const entityValues = this._testClientEntities.get(testClientType);

    if (entityValues == null) {
      throw new Error(`createTestEntities was never called for ${testClientType}`);
    }

    return entityValues;
  }

  /**
   * Gets a peek/lock receiver for the specified `TestClientType`
   * NOTE: the underlying receiver may be a `SessionReceiverImpl`. It will target `TestMessage.sessionId`.
   *
   * The receiver created by this method will be cleaned up by `afterEach()`
   */
  getPeekLockReceiver(
    entityNames: ReturnType<typeof getEntityNames>
  ): Receiver<ReceivedMessageWithLock> {
    try {
      // if you're creating a receiver this way then you'll just use the default
      // session ID for your receiver.
      // if you want to get more specific use the `getPeekLockSessionReceiver` method
      // instead.
      return this.getSessionPeekLockReceiver(entityNames, {
        sessionId: TestMessage.sessionId
      });
    } catch (err) {
      if (!(err instanceof TypeError)) {
        throw err;
      }
    }

    return this.addToCleanup(
      entityNames.queue
        ? this._serviceBusClient.getReceiver(entityNames.queue, "peekLock")
        : this._serviceBusClient.getReceiver(
            entityNames.topic!,
            entityNames.subscription!,
            "peekLock"
          )
    );
  }

  getSessionPeekLockReceiver(
    entityNames: ReturnType<typeof getEntityNames>,
    getSessionReceiverOptions?: GetSessionReceiverOptions
  ): SessionReceiver<ReceivedMessageWithLock> {
    if (!entityNames.usesSessions) {
      throw new TypeError(
        "Not a session-full entity - can't create a session receiver type for it"
      );
    }

    return this.addToCleanup(
      entityNames.queue
        ? this._serviceBusClient.getSessionReceiver(
            entityNames.queue,
            "peekLock",
            getSessionReceiverOptions
          )
        : this._serviceBusClient.getSessionReceiver(
            entityNames.topic!,
            entityNames.subscription!,
            "peekLock",
            getSessionReceiverOptions
          )
    );
  }

  /**
   * Gets a receiveAndDelete receiver for the specified `TestClientType`
   * NOTE: the underlying receiver may be a `SessionReceiverImpl`.
   * For sessions, if the sessionId is not provided, SessionReceiver returned from this method is meant only for the default sessionId: `TestMessage.sessionId`
   *
   * The receiver created by this method will be cleaned up by `afterEach()`
   */
  getReceiveAndDeleteReceiver(
    entityNames: Omit<ReturnType<typeof getEntityNames>, "isPartitioned"> & {
      sessionId?: string | undefined;
    }
  ): Receiver<ReceivedMessage> {
    // TODO: we should generate a random ID here - there's no harm in
    // creating as many sessions as we wish. Some tests will need to change.
    const sessionId = entityNames.sessionId ?? TestMessage.sessionId;

    if (entityNames.usesSessions) {
      return this.addToCleanup(
        entityNames.queue
          ? this._serviceBusClient.getSessionReceiver(entityNames.queue, "receiveAndDelete", {
              sessionId
            })
          : this._serviceBusClient.getSessionReceiver(
              entityNames.topic!,
              entityNames.subscription!,
              "receiveAndDelete",
              {
                sessionId
              }
            )
      );
    } else {
      return this.addToCleanup(
        entityNames.queue
          ? this._serviceBusClient.getReceiver(entityNames.queue, "receiveAndDelete")
          : this._serviceBusClient.getReceiver(
              entityNames.topic!,
              entityNames.subscription!,
              "receiveAndDelete"
            )
      );
    }
  }

  getDeadLetterReceiver(
    entityNames: ReturnType<typeof getEntityNames>
  ): Receiver<ReceivedMessageWithLock> {
    return this.addToCleanup(
      entityNames.queue
        ? this._serviceBusClient.getDeadLetterReceiver(entityNames.queue, "peekLock")
        : this._serviceBusClient.getDeadLetterReceiver(
            entityNames.topic!,
            entityNames.subscription!,
            "peekLock"
          )
    );
  }

  private _closeables: { close(): Promise<void> }[] = [];
  private _testClientEntities: Map<TestClientType, ReturnType<typeof getEntityNames>> = new Map();
}

async function purgeForTestClientType(
  serviceBusClient: ServiceBusClient,
  testClientType: TestClientType
): Promise<void> {
  let receiver: Receiver<ReceivedMessage> | SessionReceiver<ReceivedMessage> | undefined;
  let entityPaths = getEntityNames(testClientType);
  let deadLetterReceiver: Receiver<ReceivedMessage>;

  if (entityPaths.queue) {
    receiver = serviceBusClient.getReceiver(entityPaths.queue, "receiveAndDelete");
    deadLetterReceiver = serviceBusClient.getDeadLetterReceiver(
      entityPaths.queue,
      "receiveAndDelete"
    );
  } else if (entityPaths.topic && entityPaths.subscription) {
    receiver = serviceBusClient.getReceiver(
      entityPaths.topic,
      entityPaths.subscription,
      "receiveAndDelete"
    );
    deadLetterReceiver = serviceBusClient.getDeadLetterReceiver(
      entityPaths.topic,
      entityPaths.subscription,
      "receiveAndDelete"
    );
  } else {
    throw new Error(`Unsupported TestClientType for purge: ${testClientType}`);
  }

  await Promise.all([
    drainReceiveAndDeleteReceiver(receiver),
    drainReceiveAndDeleteReceiver(deadLetterReceiver)
  ]);
}

export function createServiceBusClientForTests(
  options?: ServiceBusClientOptions
): ServiceBusClientForTests {
  const serviceBusClient = new ServiceBusClient(
    connectionString(),
    options
  ) as ServiceBusClientForTests;

  serviceBusClient.test = new ServiceBusTestHelpers(serviceBusClient);
  return serviceBusClient;
}

export async function drainReceiveAndDeleteReceiver(receiver: Receiver<{}>): Promise<void> {
  try {
    while (true) {
      const messages = await receiver.receiveBatch(10, { maxWaitTimeSeconds: 1000 });

      if (messages.length === 0) {
        break;
      }
    }
  } finally {
    await receiver.close();
  }
}

function connectionString() {
  if (env[EnvVarNames.SERVICEBUS_CONNECTION_STRING] == null) {
    throw new Error(
      `No service bus connection string defined in ${EnvVarNames.SERVICEBUS_CONNECTION_STRING}`
    );
  }

  return env[EnvVarNames.SERVICEBUS_CONNECTION_STRING];
}

export async function testPeekMsgsLength(
  peekableReceiver: Pick<Receiver<{}>, "diagnostics">,
  expectedPeekLength: number
): Promise<void> {
  const peekedMsgs = await peekableReceiver.diagnostics.peek(expectedPeekLength + 1);

  should.equal(
    peekedMsgs.length,
    expectedPeekLength,
    "Unexpected number of msgs found when peeking"
  );
}
