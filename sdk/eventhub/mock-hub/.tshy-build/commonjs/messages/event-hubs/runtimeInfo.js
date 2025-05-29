"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.isHubRuntimeInfo = isHubRuntimeInfo;
exports.generateHubRuntimeInfoResponse = generateHubRuntimeInfoResponse;
const tslib_1 = require("tslib");
const rhea_1 = tslib_1.__importDefault(require("rhea"));
/**
 * Checks whether the provided message is requesting the EventHub's runtime info.
 * @param entityPath - The path the client sent the request to.
 * Expected to be `$management` if the message is requesting runtime info.
 * @param message - The message sent by the client.
 */
function isHubRuntimeInfo(entityPath, message) {
    if (entityPath !== "$management") {
        return false;
    }
    const properties = message.application_properties;
    if (!properties) {
        return false;
    }
    if (properties.operation !== "READ" || properties.type !== "com.microsoft:eventhub") {
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
 * Generates a message containing the EventHub's runtime info.
 */
function generateHubRuntimeInfoResponse({ correlationId, partitions, targetLinkName, createdOn, eventHubName, }) {
    return {
        to: targetLinkName,
        correlation_id: correlationId,
        application_properties: { operation: "READ", "status-code": rhea_1.default.types.wrap_int(200) },
        body: {
            name: eventHubName,
            type: "com.microsoft:eventhub",
            created_at: createdOn,
            partition_count: partitions.length,
            partition_ids: rhea_1.default.types.wrap_array(partitions, 0xa1, undefined),
        },
    };
}
//# sourceMappingURL=runtimeInfo.js.map