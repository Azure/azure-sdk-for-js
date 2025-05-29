"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEventPosition = getEventPosition;
/**
 * Returns an `EventPosition` given an amqp source filter.
 */
function getEventPosition(filter) {
    const [fullType, operator, value] = filter.split(" ");
    const normalizedValue = value.replace(/'/g, "");
    if (operator !== ">" && operator !== ">=") {
        throw new Error(`Invalid event position`);
    }
    if (fullType === "amqp.annotation.x-opt-offset") {
        return {
            type: "offset",
            operator,
            value: normalizedValue === "@latest" ? normalizedValue : parseInt(normalizedValue, 10),
        };
    }
    else if (fullType === "amqp.annotation.x-opt-sequence-number") {
        return {
            type: "sequenceNumber",
            operator,
            value: parseInt(normalizedValue, 10),
        };
    }
    else if (fullType === "amqp.annotation.x-opt-enqueued-time") {
        return {
            type: "enqueuedTime",
            operator,
            value: parseInt(normalizedValue, 10),
        };
    }
    throw new Error(`Invalid event position`);
}
//# sourceMappingURL=eventPosition.js.map