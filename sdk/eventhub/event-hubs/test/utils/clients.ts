// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CheckpointStore, SubscriptionEventHandlers, EventPosition } from "@azure/event-hubs";
import {
  EventHubConsumerClient,
  type EventHubConsumerClientOptions,
  EventHubProducerClient,
  type EventHubClientOptions,
  type TokenCredential,
  EventHubBufferedProducerClient,
  type EventHubBufferedProducerClientOptions,
  earliestEventPosition,
} from "@azure/event-hubs";
import { createTestCredential } from "@azure-tools/test-credential";
import type { NamedKeyCredential, SASCredential } from "@azure/core-auth";
import { assert } from "./chai.js";
import type { ConnectionContext } from "$internal/connectionContext.js";
import { createConnectionContext } from "$internal/connectionContext.js";
import type { FullEventProcessorOptions } from "$internal/eventProcessor.js";
import { EventProcessor } from "$internal/eventProcessor.js";
import { InMemoryCheckpointStore } from "$internal/inMemoryCheckpointStore.js";
import { UnbalancedLoadBalancingStrategy } from "$internal/loadBalancerStrategies/unbalancedStrategy.js";
import type { PartitionReceiver } from "$internal/partitionReceiver.js";
import { createReceiver as _createReceiver } from "$internal/partitionReceiver.js";
import { randomUUID } from "@azure/core-util";
import type { PartitionReceiverOptions } from "$internal/models/private.js";
import { getConsumerGroupName, getEventhubName, getFullyQualifiedNamespace } from "./vars.js";

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
