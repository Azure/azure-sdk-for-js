// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  EventHubConsumerClient,
  type EventHubConsumerClientOptions,
  EventHubProducerClient,
  type EventHubClientOptions,
  type TokenCredential,
  EventHubBufferedProducerClient,
  type EventHubBufferedProducerClientOptions,
  CheckpointStore,
  parseEventHubConnectionString,
  EventHubConnectionStringProperties,
  SubscriptionEventHandlers,
  EventPosition,
  earliestEventPosition,
} from "../../src/index.js";
import { createTestCredential } from "@azure-tools/test-credential";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { EnvVarKeys } from "./constants.js";
import * as MOCKS from "./constants.js";
import type { NamedKeyCredential, SASCredential } from "@azure/core-auth";
import { assert } from "./chai.js";
import { createSasTokenProvider } from "@azure/core-amqp";
import { ConnectionContext, createConnectionContext } from "../../src/connectionContext.js";
import { EventProcessor, FullEventProcessorOptions } from "../../src/eventProcessor.js";
import { InMemoryCheckpointStore } from "../../src/inMemoryCheckpointStore.js";
import { UnbalancedLoadBalancingStrategy } from "../../src/loadBalancerStrategies/unbalancedStrategy.js";
import {
  createReceiver as _createReceiver,
  PartitionReceiver,
} from "../../src/partitionReceiver.js";
import { randomUUID } from "@azure/core-util";
import { PartitionReceiverOptions } from "../../src/models/private.js";

function getEnvVarValue(name: string): string | undefined {
  try {
    return assertEnvironmentVariable(name);
  } catch {
    return undefined;
  }
}

export function isMock(): boolean {
  return [undefined, "mock"].includes(getEnvVarValue(EnvVarKeys.TEST_MODE));
}

function getEventhubName(): string {
  return isMock() ? MOCKS.EVENTHUB_NAME : assertEnvironmentVariable(EnvVarKeys.EVENTHUB_NAME);
}

function getFullyQualifiedNamespace(): string {
  return isMock() ? MOCKS.EVENTHUB_FQDN : assertEnvironmentVariable(EnvVarKeys.EVENTHUB_FQDN);
}

export function getConsumerGroupName(): string {
  return isMock()
    ? MOCKS.EVENTHUB_CONSUMER_GROUP_NAME
    : assertEnvironmentVariable(EnvVarKeys.EVENTHUB_CONSUMER_GROUP_NAME);
}

export function getConnectionStringWithKey(): string | undefined {
  return isMock()
    ? MOCKS.EVENTHUB_CONNECTION_STRING_WITH_KEY
    : getEnvVarValue(EnvVarKeys.EVENTHUB_CONNECTION_STRING);
}

export async function getSasTokenFromConnectionStringWithKey(
  connectionString: string,
): Promise<string> {
  const parsed = parseEventHubConnectionString(connectionString);
  const eventhubName = parsed.eventHubName ?? getEventhubName();
  if (!eventhubName) {
    throw new Error(
      "Entity path is missing from the connection string and is not available in the environment.",
    );
  }
  return (
    await createSasTokenProvider(
      parsed as Required<
        | Pick<EventHubConnectionStringProperties, "sharedAccessKey" | "sharedAccessKeyName">
        | Pick<EventHubConnectionStringProperties, "sharedAccessSignature">
      >,
    ).getToken(`${parsed.endpoint}${eventhubName}`)
  ).token;
}

export async function getConnectionStringWithSasTokenFromConnectionStringWithKey(
  connectionString: string,
): Promise<string> {
  const parsed = parseEventHubConnectionString(connectionString);
  const token = await getSasTokenFromConnectionStringWithKey(connectionString);
  return `Endpoint=${parsed.endpoint};SharedAccessSignature=${token}`;
}

export async function getConnectionStringWithSAS(): Promise<string | undefined> {
  if (isMock()) {
    return MOCKS.EVENTHUB_CONNECTION_STRING_WITH_SAS;
  }
  const connectionString = getEnvVarValue(EnvVarKeys.EVENTHUB_CONNECTION_STRING);
  return connectionString
    ? getConnectionStringWithSasTokenFromConnectionStringWithKey(connectionString)
    : undefined;
}

let clientId = 0;

export function createConsumer(
  inputOptions: {
    connectionString?: string;
    credential?: TokenCredential | NamedKeyCredential | SASCredential;
    eventhubName?: string;
    fqdn?: string;
    groupName?: string;
    checkPointStore?: CheckpointStore;
    options?: EventHubConsumerClientOptions;
  } = {},
): { consumer: EventHubConsumerClient; fqdn: string; eventhubName: string } {
  if (inputOptions.fqdn && inputOptions.connectionString) {
    assert.fail("Both FQDN and connection string shouldn't be provided.");
  }
  const {
    connectionString,
    credential = createTestCredential(),
    eventhubName = getEventhubName(),
    fqdn = getFullyQualifiedNamespace(),
    groupName = getConsumerGroupName(),
    checkPointStore,
    options = { identifier: `consumer${clientId++}` },
  } = inputOptions;
  return {
    consumer: !connectionString
      ? checkPointStore
        ? new EventHubConsumerClient(
            groupName,
            fqdn,
            eventhubName,
            credential,
            checkPointStore,
            options,
          )
        : new EventHubConsumerClient(groupName, fqdn, eventhubName, credential, options)
      : checkPointStore
        ? new EventHubConsumerClient(
            groupName,
            connectionString,
            eventhubName,
            checkPointStore,
            options,
          )
        : new EventHubConsumerClient(groupName, connectionString, eventhubName, options),
    fqdn,
    eventhubName,
  };
}

export function createProcessor(
  inputs: {
    groupName?: string;
    ctx?: ConnectionContext;
    handlers?: Partial<SubscriptionEventHandlers>;
    checkpointStore?: CheckpointStore;
    options?: Partial<FullEventProcessorOptions>;
  } = {},
): { processor: EventProcessor; groupName: string } {
  const {
    groupName = getConsumerGroupName(),
    ctx = createConsumer().consumer["_context"],
    handlers,
    checkpointStore = new InMemoryCheckpointStore(),
    options,
  } = inputs;
  const emptyHandlers = {
    processEvents: async () => {
      /* no-op */
    },
    processError: async () => {
      /* no-op */
    },
  };
  const processor = new EventProcessor(
    groupName,
    ctx,
    handlers?.processError && handlers.processEvents
      ? (handlers as SubscriptionEventHandlers)
      : {
          ...emptyHandlers,
          ...handlers,
        },
    checkpointStore,
    {
      maxBatchSize: 1,
      maxWaitTimeInSeconds: 1,
      ownerLevel: 0,
      loopIntervalInMs: 10000,
      loadBalancingStrategy: new UnbalancedLoadBalancingStrategy(),
      ...options,
    },
  );
  return { processor, groupName };
}

export function createReceiver(
  inputs: {
    groupName?: string;
    ctx?: ConnectionContext;
    consumerId?: string;
    partitionId?: string;
    eventPosition?: EventPosition;
    options?: PartitionReceiverOptions;
  } = {},
): { receiver: PartitionReceiver; groupName: string } {
  const {
    groupName = getConsumerGroupName(),
    ctx = createConsumer().consumer["_context"],
    consumerId = randomUUID(),
    partitionId = "0",
    eventPosition = earliestEventPosition,
    options,
  } = inputs;
  const receiver = _createReceiver(ctx, groupName, consumerId, partitionId, eventPosition, options);
  return { receiver, groupName };
}

export function createProducer(
  inputOptions: {
    connectionString?: string;
    credential?: TokenCredential | NamedKeyCredential | SASCredential;
    eventhubName?: string;
    fqdn?: string;
    enableIdempotentRetries?: boolean;
    options?: EventHubClientOptions;
  } = {},
): { producer: EventHubProducerClient; fqdn: string; eventhubName: string } {
  if (inputOptions.fqdn && inputOptions.connectionString) {
    assert.fail("Both FQDN and connection string shouldn't be provided.");
  }
  const {
    connectionString,
    credential = createTestCredential(),
    eventhubName = getEventhubName(),
    fqdn = getFullyQualifiedNamespace(),
    enableIdempotentRetries,
    options = { identifier: `producer${clientId++}` },
  } = inputOptions;
  const producer = !connectionString
    ? new EventHubProducerClient(fqdn, eventhubName, credential, options)
    : new EventHubProducerClient(connectionString, eventhubName, options);
  if (enableIdempotentRetries) {
    producer["_enableIdempotentRetries"] = true;
  }
  return {
    producer,
    fqdn,
    eventhubName,
  };
}

export function createBufferedProducer(
  inputOptions: {
    connectionString?: string;
    credential?: TokenCredential | NamedKeyCredential | SASCredential;
    eventhubName?: string;
    fqdn?: string;
    options?: EventHubBufferedProducerClientOptions;
  } = {},
): { producer: EventHubBufferedProducerClient; fqdn: string; eventhubName: string } {
  if (inputOptions.fqdn && inputOptions.connectionString) {
    assert.fail("Both FQDN and connection string shouldn't be provided.");
  }
  const {
    connectionString,
    credential = createTestCredential(),
    eventhubName = getEventhubName(),
    fqdn = getFullyQualifiedNamespace(),
    options = {
      onSendEventsErrorHandler: async (ctx) => {
        throw ctx.error;
      },
      identifier: `bufferedProducer${clientId++}`,
    },
  } = inputOptions;
  return {
    producer: !connectionString
      ? new EventHubBufferedProducerClient(fqdn, eventhubName, credential, options)
      : new EventHubBufferedProducerClient(connectionString, eventhubName, options),
    fqdn,
    eventhubName,
  };
}

export function createContext(
  inputOptions: {
    connectionString?: string;
    credential?: TokenCredential | NamedKeyCredential | SASCredential;
    eventhubName?: string;
    fqdn?: string;
    options?: EventHubClientOptions;
  } = {},
): { context: ConnectionContext; fqdn: string; eventhubName: string } {
  if (inputOptions.fqdn && inputOptions.connectionString) {
    assert.fail("Both FQDN and connection string shouldn't be provided.");
  }
  const {
    connectionString,
    credential = createTestCredential(),
    eventhubName = getEventhubName(),
    fqdn = getFullyQualifiedNamespace(),
    options = { identifier: `context${clientId++}` },
  } = inputOptions;
  return {
    context: !connectionString
      ? createConnectionContext(fqdn, eventhubName, credential, options)
      : createConnectionContext(connectionString, eventhubName, options),
    fqdn,
    eventhubName,
  };
}
