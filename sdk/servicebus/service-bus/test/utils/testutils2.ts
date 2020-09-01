// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// Anything we expect to be available to users should come from this import
// as a simple sanity check that we've exported things properly.
import {
  CreateSessionReceiverOptions,
  ServiceBusClient,
  ServiceBusReceiver,
  ServiceBusSessionReceiver
} from "../../src";

import { TestClientType, TestMessage } from "./testUtils";
import { EnvVarNames, getEnvVars } from "./envVarUtils";
import * as dotenv from "dotenv";
import {
  recreateQueue,
  recreateSubscription,
  recreateTopic,
  verifyMessageCount
} from "./managementUtils";
import { ServiceBusClientOptions } from "../../src";
import chai from "chai";
import {
  ReceivedMessage,
  ReceivedMessageWithLock,
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
  const name = testClientType;
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

export async function drainAllMessages(receiver: ServiceBusReceiver<{}>): Promise<void> {
  while (true) {
    const messages = await receiver.receiveMessages(10, { maxWaitTimeInMs: 1000 });

    if (messages.length === 0) {
      break;
    }
  }

  await receiver.close();
}

/**
 * Returns a TestClientType for either a Queue or a Subscription
 * @param useSessions
 */
export function getRandomTestClientType(): TestClientType {
  const allTestClientTypes = [
    TestClientType.PartitionedQueue,
    TestClientType.PartitionedSubscription,
    TestClientType.UnpartitionedQueue,
    TestClientType.UnpartitionedSubscription,
    TestClientType.PartitionedQueueWithSessions,
    TestClientType.PartitionedSubscriptionWithSessions,
    TestClientType.UnpartitionedQueueWithSessions,
    TestClientType.UnpartitionedSubscriptionWithSessions
  ];

  const index = Math.floor(Math.random() * allTestClientTypes.length);
  return allTestClientTypes[index];
}

/**
 * Returns a TestClientType for either a Queue or a Subscription with no
 * sessions enabled
 */
export function getRandomTestClientTypeWithNoSessions(): TestClientType {
  const noSessionTestClientTypes = [
    TestClientType.PartitionedQueue,
    TestClientType.PartitionedSubscription,
    TestClientType.UnpartitionedQueue,
    TestClientType.UnpartitionedSubscription
  ];

  const index = Math.floor(Math.random() * noSessionTestClientTypes.length);
  return noSessionTestClientTypes[index];
}

/**
 * Returns a TestClientType for either a Queue or a Subscription with
 * sessions enabled
 */
export function getRandomTestClientTypeWithSessions(): TestClientType {
  const withSessionTestClientTypes = [
    TestClientType.PartitionedQueueWithSessions,
    TestClientType.PartitionedSubscriptionWithSessions,
    TestClientType.UnpartitionedQueueWithSessions,
    TestClientType.UnpartitionedSubscriptionWithSessions
  ];

  const index = Math.floor(Math.random() * withSessionTestClientTypes.length);
  return withSessionTestClientTypes[index];
}

export type EntityName = ReturnType<typeof getEntityNames>;

/**
 * A ServiceBusClient with an additional `test` property with useful methods
 * to create receivers and cleanup resources.
 */
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
    let receiver: ServiceBusReceiver<ReceivedMessage> | ServiceBusSessionReceiver<ReceivedMessage>;
    let receivedMsgs: ReceivedMessage[];
    if (!useSessions) {
      receiver = await this.getReceiveAndDeleteReceiver({
        queue: entityNames.queue,
        topic: entityNames.topic,
        subscription: entityNames.subscription,
        usesSessions: false
      });
      receivedMsgs = await receiver.receiveMessages(sentMessages.length, {
        // maxWaitTime is set same as numberOfMessages being received
        maxWaitTimeInMs: sentMessages.length * 1000
      });
      await receiver.close();
    } else {
      // From the sentMessages array, creating a set of all the `session-id`s
      const setOfSessionIds: Set<string> = new Set();
      // numOfMsgsWithSessionId - To keep track of number of messages sent per session in the sent messages
      const numOfMsgsWithSessionId: { [sessionId: string]: number } = {};
      sentMessages.forEach((msg) => {
        setOfSessionIds.add(msg.sessionId!);
        numOfMsgsWithSessionId[msg.sessionId!] = numOfMsgsWithSessionId[msg.sessionId!]
          ? numOfMsgsWithSessionId[msg.sessionId!] + 1
          : 1;
      });
      // for-loop to receive messages from those `session-id`s
      for (const id of setOfSessionIds) {
        receiver = await this.getReceiveAndDeleteReceiver({
          queue: entityNames.queue,
          topic: entityNames.topic,
          subscription: entityNames.subscription,
          usesSessions: true,
          sessionId: id
        });
        const msgs = await receiver.receiveMessages(numOfMsgsWithSessionId[id], {
          // Since we know the exact number of messages to be received per session-id,
          //   a higher `maxWaitTimeInMs` is not a problem
          maxWaitTimeInMs: 5000 * numOfMsgsWithSessionId[id]
        });
        should.equal(
          msgs.length,
          numOfMsgsWithSessionId[id],
          `Unexpected number of messages received with session-id - "${id}".`
        );
        receivedMsgs = !receivedMsgs! ? msgs : receivedMsgs!.concat(msgs);
        await receiver.close();
      }
    }
    should.equal(
      receivedMsgs!.length,
      sentMessages.length,
      "Unexpected number of messages received."
    );
    receivedMsgs!.forEach((receivedMessage) => {
      sentMessages = sentMessages.filter((sentMessage) => {
        try {
          TestMessage.checkMessageContents(sentMessage, receivedMessage, useSessions);
          return true;
        } catch (err) {
          return false;
        }
      });
    });
    should.equal(sentMessages.length, 0, "Unexpected messages received.");
    // Relying on Atom mgmt client for the message count verification instead of the `testPeekMsgsLength`
    // because creating the session receivers might encounter timeouts or
    // "MessagingError: No unlocked sessions were available" when there are no available sessions
    await verifyMessageCount(0, entityNames.queue, entityNames.topic, entityNames.subscription);
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
   * NOTE: the underlying receiver may be a `ServiceBusSessionReceiverImpl`. It will target `TestMessage.sessionId`.
   *
   * The receiver created by this method will be cleaned up by `afterEach()`
   */
  async getPeekLockReceiver(
    entityNames: Omit<ReturnType<typeof getEntityNames>, "isPartitioned">
  ): Promise<ServiceBusReceiver<ReceivedMessageWithLock>> {
    try {
      // if you're creating a receiver this way then you'll just use the default
      // session ID for your receiver.
      // if you want to get more specific use the `getPeekLockSessionReceiver` method
      // instead.
      return await this.getSessionPeekLockReceiver(entityNames, {
        sessionId: TestMessage.sessionId
      });
    } catch (err) {
      if (!(err instanceof TypeError)) {
        throw err;
      }
    }

    return this.addToCleanup(
      entityNames.queue
        ? this._serviceBusClient.createReceiver(entityNames.queue)
        : this._serviceBusClient.createReceiver(entityNames.topic!, entityNames.subscription!)
    );
  }

  async getSessionPeekLockReceiver(
    entityNames: Omit<ReturnType<typeof getEntityNames>, "isPartitioned">,
    getSessionReceiverOptions?: CreateSessionReceiverOptions<"peekLock">
  ): Promise<ServiceBusSessionReceiver<ReceivedMessageWithLock>> {
    if (!entityNames.usesSessions) {
      throw new TypeError(
        "Not a session-full entity - can't create a session receiver type for it"
      );
    }

    return this.addToCleanup(
      entityNames.queue
        ? await this._serviceBusClient.createSessionReceiver(
            entityNames.queue,
            getSessionReceiverOptions
          )
        : await this._serviceBusClient.createSessionReceiver(
            entityNames.topic!,
            entityNames.subscription!,
            getSessionReceiverOptions
          )
    );
  }

  /**
   * Gets a receiveAndDelete receiver for the specified `TestClientType`
   * NOTE: the underlying receiver may be a `ServiceBusSessionReceiverImpl`.
   * For sessions, if the sessionId is not provided, SessionReceiver returned from this method is meant only for the default sessionId: `TestMessage.sessionId`
   *
   * The receiver created by this method will be cleaned up by `afterEach()`
   */
  async getReceiveAndDeleteReceiver(
    entityNames: Omit<ReturnType<typeof getEntityNames>, "isPartitioned"> & {
      sessionId?: string | undefined;
    }
  ): Promise<ServiceBusReceiver<ReceivedMessage>> {
    // TODO: we should generate a random ID here - there's no harm in
    // creating as many sessions as we wish. Some tests will need to change.
    const sessionId = entityNames.sessionId ?? TestMessage.sessionId;

    if (entityNames.usesSessions) {
      return this.addToCleanup(
        entityNames.queue
          ? await this._serviceBusClient.createSessionReceiver(entityNames.queue, {
              sessionId,
              receiveMode: "receiveAndDelete"
            })
          : await this._serviceBusClient.createSessionReceiver(
              entityNames.topic!,
              entityNames.subscription!,
              {
                sessionId,
                receiveMode: "receiveAndDelete"
              }
            )
      );
    } else {
      return this.addToCleanup(
        entityNames.queue
          ? this._serviceBusClient.createReceiver(entityNames.queue, {
              receiveMode: "receiveAndDelete"
            })
          : this._serviceBusClient.createReceiver(entityNames.topic!, entityNames.subscription!, {
              receiveMode: "receiveAndDelete"
            })
      );
    }
  }

  createDeadLetterReceiver(
    entityNames: ReturnType<typeof getEntityNames>
  ): ServiceBusReceiver<ReceivedMessageWithLock> {
    return this.addToCleanup(
      entityNames.queue
        ? this._serviceBusClient.createDeadLetterReceiver(entityNames.queue)
        : this._serviceBusClient.createDeadLetterReceiver(
            entityNames.topic!,
            entityNames.subscription!
          )
    );
  }

  async createSender(entityNames: Omit<ReturnType<typeof getEntityNames>, "isPartitioned">) {
    return this.addToCleanup(
      entityNames.queue
        ? this._serviceBusClient.createSender(entityNames.queue)
        : this._serviceBusClient.createSender(entityNames.topic!)
    );
  }

  private _closeables: { close(): Promise<void> }[] = [];
  private _testClientEntities: Map<TestClientType, ReturnType<typeof getEntityNames>> = new Map();
}

async function purgeForTestClientType(
  serviceBusClient: ServiceBusClient,
  testClientType: TestClientType
): Promise<void> {
  let receiver:
    | ServiceBusReceiver<ReceivedMessage>
    | ServiceBusSessionReceiver<ReceivedMessage>
    | undefined;
  const entityPaths = getEntityNames(testClientType);
  let deadLetterReceiver: ServiceBusReceiver<ReceivedMessage>;

  if (entityPaths.queue) {
    receiver = serviceBusClient.createReceiver(entityPaths.queue, "receiveAndDelete");
    deadLetterReceiver = serviceBusClient.createDeadLetterReceiver(entityPaths.queue, {
      receiveMode: "receiveAndDelete"
    });
  } else if (entityPaths.topic && entityPaths.subscription) {
    receiver = serviceBusClient.createReceiver(entityPaths.topic, entityPaths.subscription, {
      receiveMode: "receiveAndDelete"
    });
    deadLetterReceiver = serviceBusClient.createDeadLetterReceiver(
      entityPaths.topic,
      entityPaths.subscription,
      { receiveMode: "receiveAndDelete" }
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

export async function drainReceiveAndDeleteReceiver(
  receiver: ServiceBusReceiver<{}>
): Promise<void> {
  try {
    while (true) {
      const messages = await receiver.receiveMessages(10, { maxWaitTimeInMs: 1000 });

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
      `No service bus connection string defined in ${EnvVarNames.SERVICEBUS_CONNECTION_STRING}. If you're in a unit test you should not be depending on the deployed environment!`
    );
  }

  return env[EnvVarNames.SERVICEBUS_CONNECTION_STRING];
}

export async function testPeekMsgsLength(
  peekableReceiver: ServiceBusReceiver<ReceivedMessage>,
  expectedPeekLength: number
): Promise<void> {
  const peekedMsgs = await peekableReceiver.peekMessages(expectedPeekLength + 1);

  should.equal(
    peekedMsgs.length,
    expectedPeekLength,
    "Unexpected number of msgs found when peeking"
  );
}
