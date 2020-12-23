// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as dotenv from "dotenv";
import { loggerForTest } from "./logHelpers";
import { delay } from "@azure/core-amqp";
import { EventHubConsumerClient } from "../../src/eventHubConsumerClient";
import { EventHubProducerClient } from "../../src/eventHubProducerClient";
import { EventPosition } from "../../src/eventPosition";
import { NoOpTracer, TestTracer, setTracer } from "@azure/core-tracing";

dotenv.config();

declare const window: any;

export const isNode =
  !!process && !!process.version && !!process.versions && !!process.versions.node;

export enum EnvVarKeys {
  EVENTHUB_CONNECTION_STRING = "EVENTHUB_CONNECTION_STRING",
  EVENTHUB_NAME = "EVENTHUB_NAME",
  AZURE_TENANT_ID = "AZURE_TENANT_ID",
  AZURE_CLIENT_ID = "AZURE_CLIENT_ID",
  AZURE_CLIENT_SECRET = "AZURE_CLIENT_SECRET"
}

function getEnvVarValue(name: string): string | undefined {
  if (isNode) {
    return process.env[name];
  } else {
    return window.__env__[name];
  }
}

export function getEnvVars(): { [key in EnvVarKeys]: any } {
  return {
    [EnvVarKeys.EVENTHUB_CONNECTION_STRING]: getEnvVarValue(EnvVarKeys.EVENTHUB_CONNECTION_STRING),
    [EnvVarKeys.EVENTHUB_NAME]: getEnvVarValue(EnvVarKeys.EVENTHUB_NAME),
    [EnvVarKeys.AZURE_TENANT_ID]: getEnvVarValue(EnvVarKeys.AZURE_TENANT_ID),
    [EnvVarKeys.AZURE_CLIENT_ID]: getEnvVarValue(EnvVarKeys.AZURE_CLIENT_ID),
    [EnvVarKeys.AZURE_CLIENT_SECRET]: getEnvVarValue(EnvVarKeys.AZURE_CLIENT_SECRET)
  };
}

export async function loopUntil(args: {
  name: string;
  timeBetweenRunsMs: number;
  maxTimes: number;
  until: () => Promise<boolean>;
  errorMessageFn?: () => string;
}): Promise<void> {
  for (let i = 0; i < args.maxTimes + 1; ++i) {
    const finished = await args.until();

    if (finished) {
      return;
    }

    loggerForTest(`[${args.name}: delaying for ${args.timeBetweenRunsMs}ms]`);
    await delay(args.timeBetweenRunsMs);
  }

  throw new Error(
    `Waited way too long for ${args.name}: ${args.errorMessageFn ? args.errorMessageFn() : ""}`
  );
}

export async function getStartingPositionsForTests(
  client: Pick<
    EventHubConsumerClient | EventHubProducerClient,
    "getPartitionProperties" | "getEventHubProperties"
  >
): Promise<{ [partitionId: string]: EventPosition }> {
  const eventHubProperties = await client.getEventHubProperties();

  const startingPositions: { [partitionId: string]: EventPosition } = {};

  for (const partitionId of eventHubProperties.partitionIds) {
    startingPositions[partitionId] = {
      sequenceNumber: (await client.getPartitionProperties(partitionId)).lastEnqueuedSequenceNumber
    };
  }

  return startingPositions;
}

export function setTracerForTest<T extends TestTracer>(
  tracer?: T
): { tracer: T; resetTracer: () => void } {
  tracer = tracer ?? (new TestTracer() as T);
  setTracer(tracer);

  return {
    tracer,
    resetTracer: () => setTracer(new NoOpTracer())
  };
}
