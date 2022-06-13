// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/**
 * @internal
 */
export const packageJsonInfo = {
  name: "@azure/event-hubs",
  version: "5.8.1",
};

/**
 * @internal
 */
export const idempotentProducerAmqpPropertyNames = {
  capability: "com.microsoft:idempotent-producer",
  epoch: "com.microsoft:producer-epoch",
  producerId: "com.microsoft:producer-id",
  producerSequenceNumber: "com.microsoft:producer-sequence-number",
} as const;

/**
 * @internal
 */
export const PENDING_PUBLISH_SEQ_NUM_SYMBOL = Symbol.for(
  "@azure/event-hubs.pendingPublishSequenceNumber"
);
