// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
/**
 * @internal
 */
export const packageJsonInfo = {
    name: "@azure/event-hubs",
    version: "6.0.3",
};
/**
 * @internal
 */
export const idempotentProducerAmqpPropertyNames = {
    capability: "com.microsoft:idempotent-producer",
    epoch: "com.microsoft:producer-epoch",
    producerId: "com.microsoft:producer-id",
    producerSequenceNumber: "com.microsoft:producer-sequence-number",
};
/** @internal */
export const receiverIdPropertyName = "com.microsoft:receiver-name";
/** @internal */
export const geoReplication = "com.microsoft:georeplication";
/**
 * @internal
 */
export const PENDING_PUBLISH_SEQ_NUM_SYMBOL = Symbol.for("@azure/event-hubs.pendingPublishSequenceNumber");
//# sourceMappingURL=constants.js.map