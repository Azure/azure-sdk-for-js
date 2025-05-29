"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.PENDING_PUBLISH_SEQ_NUM_SYMBOL = exports.geoReplication = exports.receiverIdPropertyName = exports.idempotentProducerAmqpPropertyNames = exports.packageJsonInfo = void 0;
/**
 * @internal
 */
exports.packageJsonInfo = {
    name: "@azure/event-hubs",
    version: "6.0.1",
};
/**
 * @internal
 */
exports.idempotentProducerAmqpPropertyNames = {
    capability: "com.microsoft:idempotent-producer",
    epoch: "com.microsoft:producer-epoch",
    producerId: "com.microsoft:producer-id",
    producerSequenceNumber: "com.microsoft:producer-sequence-number",
};
/** @internal */
exports.receiverIdPropertyName = "com.microsoft:receiver-name";
/** @internal */
exports.geoReplication = "com.microsoft:georeplication";
/**
 * @internal
 */
exports.PENDING_PUBLISH_SEQ_NUM_SYMBOL = Symbol.for("@azure/event-hubs.pendingPublishSequenceNumber");
//# sourceMappingURL=constants.js.map