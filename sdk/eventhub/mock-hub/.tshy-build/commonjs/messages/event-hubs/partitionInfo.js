"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPartitionInfo = isPartitionInfo;
exports.generatePartitionInfoResponse = generatePartitionInfoResponse;
exports.generateBadPartitionInfoResponse = generateBadPartitionInfoResponse;
const tslib_1 = require("tslib");
const rhea_1 = tslib_1.__importDefault(require("rhea"));
/**
 * Checks whether the provided message is requesting the partition info from the Event Hub.
 * @param entityPath - The path the client sent the request to.
 * Expected to be `$management` if the message is requesting runtime info.
 * @param message - The message sent by the client.
 */
function isPartitionInfo(entityPath, message) {
    if (entityPath !== "$management") {
        return false;
    }
    const properties = message.application_properties;
    if (!properties) {
        return false;
    }
    if (properties.operation !== "READ" ||
        properties.type !== "com.microsoft:partition" ||
        typeof properties.partition !== "string") {
        return false;
    }
    if (!message.body) {
        return true;
    }
    try {
        const body = JSON.parse(message.body);
        if (Array.isArray(body) && !body.length) {
            return true;
        }
    }
    catch (err) {
        return false;
    }
    return false;
}
/**
 * Generates a message containing the EventHub's specified partition info.
 */
function generatePartitionInfoResponse({ eventHubName, correlationId, targetLinkName, beginningSequenceNumber, lastEnqueuedSequenceNumber, lastEnqueuedOffset, lastEnqueuedTimeUtc, isPartitionEmpty, partitionId, }) {
    return {
        to: targetLinkName,
        correlation_id: correlationId,
        application_properties: { operation: "READ", "status-code": rhea_1.default.types.wrap_int(200) },
        body: {
            name: eventHubName,
            type: "com.microsoft:partition",
            begin_sequence_number: rhea_1.default.types.wrap_long(beginningSequenceNumber),
            last_enqueued_sequence_number: rhea_1.default.types.wrap_long(lastEnqueuedSequenceNumber),
            last_enqueued_offset: lastEnqueuedOffset,
            last_enqueued_time_utc: lastEnqueuedTimeUtc,
            is_partition_empty: isPartitionEmpty,
            partition: partitionId,
        },
    };
}
function generateBadPartitionInfoResponse({ correlationId, targetLinkName, }) {
    return {
        to: targetLinkName,
        correlation_id: correlationId,
        application_properties: {
            operation: "READ",
            "status-code": 400,
            "error-condition": "com.microsoft:argument-out-of-range",
            "status-description": "The specified partition is invalid for an EventHub partition sender or receiver.",
        },
        body: undefined,
    };
}
//# sourceMappingURL=partitionInfo.js.map