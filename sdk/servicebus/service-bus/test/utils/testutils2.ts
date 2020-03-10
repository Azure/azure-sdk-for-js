// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { TestClientType } from "./testUtils";
import { getEnvVars, EnvVarNames } from "./envVarUtils";
import * as dotenv from "dotenv";
import { recreateQueue, recreateTopic, recreateSubscription } from "./managementUtils";

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

export function connectionString() {
  if (!!env[EnvVarNames.SERVICEBUS_CONNECTION_STRING]) {
    throw new Error(
      `No service bus connection string defined in ${EnvVarNames.SERVICEBUS_CONNECTION_STRING}`
    );
  }

  return env[EnvVarNames.SERVICEBUS_CONNECTION_STRING];
}

export async function createEntities(testClientType: TestClientType) {
  const { queue, topic, subscription, isPartitioned, usesSessions } = getRelatedEntities(
    testClientType
  );

  if (queue) {
    await recreateQueue(queue, {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true,
      enablePartitioning: isPartitioned,
      requiresSession: usesSessions
    });
  }

  if (topic) {
    await recreateTopic(topic, {
      enablePartitioning: isPartitioned,
      enableBatchedOperations: true
    });
  }

  if (topic && subscription) {
    await recreateSubscription(topic, subscription, {
      lockDuration: defaultLockDuration,
      enableBatchedOperations: true,
      requiresSession: usesSessions
    });
  }
}
