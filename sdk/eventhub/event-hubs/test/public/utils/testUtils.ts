// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assertEnvironmentVariable, setEnvironmentVariables } from "@azure-tools/test-recorder";
import {
  EventHubConsumerClient,
  EventHubProducerClient,
  EventPosition,
  TokenCredential,
} from "../../../src";
import { TestTracer, resetTracer, setTracer } from "@azure-tools/test-utils";
import { delay } from "@azure/core-amqp";
import { loggerForTest } from "./logHelpers";
import {
  CreateTestCredentialOptions,
  NoOpCredential,
  createBrowserRelayCredential,
} from "@azure-tools/test-credential";
import { isBrowser } from "@azure/core-util";
import {
  AzureCliCredential,
  AzureDeveloperCliCredential,
  AzurePowerShellCredential,
  ChainedTokenCredential,
} from "@azure/identity";

export enum EnvVarKeys {
  EVENTHUB_FQDN = "EVENTHUB_FQDN",
  EVENTHUB_NAME = "EVENTHUB_NAME",
  TEST_TARGET = "TEST_TARGET",

  EVENTHUB_CONNECTION_STRING = "EVENTHUB_CONNECTION_STRING",
}

export function getEnvVarValue(name: string): string | undefined {
  try {
    return assertEnvironmentVariable(name);
  } catch {
    return undefined;
  }
}

export function isMock(): boolean {
  return ["mock", undefined].includes(getEnvVarValue(EnvVarKeys.TEST_TARGET));
}

export function getEnvVars(): Omit<{ [key in EnvVarKeys]: string }, EnvVarKeys.TEST_TARGET> {
  if (isMock()) {
    setEnvironmentVariables({
      [EnvVarKeys.EVENTHUB_FQDN]: "localhost",
      [EnvVarKeys.EVENTHUB_NAME]: "mock-hub",
      [EnvVarKeys.EVENTHUB_CONNECTION_STRING]: `Endpoint=sb://localhost/;SharedAccessKeyName=Foo;SharedAccessKey=Bar`,
    });
  }

  return {
    [EnvVarKeys.EVENTHUB_FQDN]: assertEnvironmentVariable(EnvVarKeys.EVENTHUB_FQDN),
    [EnvVarKeys.EVENTHUB_NAME]: assertEnvironmentVariable(EnvVarKeys.EVENTHUB_NAME),
    [EnvVarKeys.EVENTHUB_CONNECTION_STRING]: assertEnvironmentVariable(
      EnvVarKeys.EVENTHUB_CONNECTION_STRING,
    ),
  };
}

export function createTestCredential(
  tokenCredentialOptions: CreateTestCredentialOptions = {},
): TokenCredential {
  if (isMock()) {
    return new NoOpCredential();
  } else if (isBrowser) {
    return createBrowserRelayCredential(tokenCredentialOptions);
  } else {
    const { browserRelayServerUrl: _, ...dacOptions } = tokenCredentialOptions;
    return new ChainedTokenCredential(
      new AzurePowerShellCredential(dacOptions),
      new AzureCliCredential(dacOptions),
      new AzureDeveloperCliCredential(dacOptions),
    );
  }
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
    `Waited way too long for ${args.name}: ${args.errorMessageFn ? args.errorMessageFn() : ""}`,
  );
}

export async function getStartingPositionsForTests(
  client: Pick<
    EventHubConsumerClient | EventHubProducerClient,
    "getPartitionProperties" | "getEventHubProperties"
  >,
): Promise<{ [partitionId: string]: EventPosition }> {
  const eventHubProperties = await client.getEventHubProperties();

  const startingPositions: { [partitionId: string]: EventPosition } = {};

  for (const partitionId of eventHubProperties.partitionIds) {
    startingPositions[partitionId] = {
      sequenceNumber: (await client.getPartitionProperties(partitionId)).lastEnqueuedSequenceNumber,
    };
  }

  return startingPositions;
}

export function setTracerForTest<T extends TestTracer>(
  tracer?: T,
): { tracer: T; resetTracer: () => void } {
  tracer = tracer ?? (new TestTracer() as T);
  setTracer(tracer);

  return {
    tracer,
    resetTracer,
  };
}
