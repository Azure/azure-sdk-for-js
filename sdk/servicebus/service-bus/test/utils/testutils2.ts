// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { TestClientType } from "./testUtils";
import { getEnvVars, EnvVarNames } from "./envVarUtils";
import * as dotenv from "dotenv";
import { recreateQueue, recreateTopic, recreateSubscription } from "./managementUtils";
import { SessionReceiver } from "../../src/receivers/sessionReceiver";
import { Receiver } from "../../src/receivers/receiver";
import { ServiceBusClient } from "../../src/serviceBusClient";
import { ServiceBusClientOptions } from "../../src";

dotenv.config();
const env = getEnvVars();

const defaultLockDuration = "PT30S"; // 30 seconds in ISO 8601 FORMAT - equivalent to "P0Y0M0DT0H0M30S"

function getRelatedEntities(
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
): Promise<ReturnType<typeof getRelatedEntities>> {
  const relatedEntities = getRelatedEntities(testClientType);

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
    const messages = await receiver.receiveBatch(10, 1);

    if (messages.messages.length === 0) {
      break;
    }
  }

  await receiver.close();
}

export interface ServiceBusClientForTests extends ServiceBusClient {
  test: {
    addToCleanup<T extends { close(): Promise<void> }>(v: T): T;
    afterEach(): Promise<void>;
    after(): Promise<void>;
    purgeForClientType(...testClientType: TestClientType[]): Promise<void>;
    createTestEntities(
      testClientType: TestClientType
    ): Promise<ReturnType<typeof getRelatedEntities>>;
  };
}

async function purgeForTestClientType(
  serviceBusClient: ServiceBusClient,
  testClientType: TestClientType
): Promise<void> {
  let receiver: Receiver<{}> | SessionReceiver<{}> | undefined;
  let entityPaths = getRelatedEntities(testClientType);

  if (entityPaths.queue) {
    receiver = serviceBusClient.getReceiver(entityPaths.queue, "receiveAndDelete");
  } else if (entityPaths.topic && entityPaths.subscription) {
    receiver = serviceBusClient.getReceiver(
      entityPaths.topic,
      entityPaths.subscription,
      "receiveAndDelete"
    );
  }

  if (receiver == null) {
    throw new Error(`Unsupported TestClientType for purge: ${testClientType}`);
  }

  await Promise.all([
    drainReceiveAndDeleteReceiver(receiver),
    drainReceiveAndDeleteReceiver(
      serviceBusClient.getReceiver(receiver.getDeadLetterPath(), "receiveAndDelete")
    )
  ]);
}

export function createServiceBusClientForTests(
  options?: ServiceBusClientOptions
): ServiceBusClientForTests {
  const serviceBusClient = new ServiceBusClient(
    connectionString(),
    options
  ) as ServiceBusClientForTests;

  const closeables: { close(): Promise<void> }[] = [];
  const testClientEntities: Map<TestClientType, ReturnType<typeof getRelatedEntities>> = new Map();

  serviceBusClient.test = {
    addToCleanup<T extends { close(): Promise<void> }>(v: T): T {
      closeables.push(v);
      return v;
    },
    async afterEach(): Promise<void> {
      const closePromises = closeables.map((c) => c.close());
      closeables.length = 0;
      await Promise.all(closePromises);
    },
    async after(): Promise<void> {
      // TODO: purge any of the dynamically created entities created in `createTestEntities`
      await serviceBusClient.close();
    },
    async purgeForClientType(...testClientTypes: TestClientType[]): Promise<void> {
      await Promise.all(
        testClientTypes.map((tct) => purgeForTestClientType(serviceBusClient, tct))
      );
    },
    async createTestEntities(
      testClientType: TestClientType
    ): Promise<ReturnType<typeof getRelatedEntities>> {
      // TODO: for now these aren't randomly named. This is prep so we can
      // do that soon.
      let entityValues = testClientEntities.get(testClientType);

      if (entityValues == null) {
        entityValues = await createTestEntities(testClientType);
        testClientEntities.set(testClientType, entityValues);
      }

      return entityValues;
    }
  };

  return serviceBusClient;
}

export async function drainReceiveAndDeleteReceiver(receiver: Receiver<{}>): Promise<void> {
  try {
    while (true) {
      const messages = await receiver.receiveBatch(10, 1);

      if (messages.messages.length === 0) {
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
