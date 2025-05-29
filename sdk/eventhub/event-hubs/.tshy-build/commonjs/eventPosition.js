"use strict";
// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
exports.latestEventPosition = exports.earliestEventPosition = void 0;
exports.getEventPositionFilter = getEventPositionFilter;
exports.isLatestPosition = isLatestPosition;
exports.validateEventPositions = validateEventPositions;
exports.isEventPosition = isEventPosition;
const core_amqp_1 = require("@azure/core-amqp");
const core_util_1 = require("@azure/core-util");
/**
 * @internal
 * Gets the expression to be set as the filter clause when creating the receiver
 * @returns filterExpression
 */
function getEventPositionFilter(eventPosition) {
    let result;
    // order of preference
    if ((0, core_util_1.isDefined)(eventPosition.offset)) {
        result = eventPosition.isInclusive
            ? `${core_amqp_1.Constants.offsetAnnotation} >= '${eventPosition.offset}'`
            : `${core_amqp_1.Constants.offsetAnnotation} > '${eventPosition.offset}'`;
    }
    else if ((0, core_util_1.isDefined)(eventPosition.sequenceNumber)) {
        result = eventPosition.isInclusive
            ? `${core_amqp_1.Constants.sequenceNumberAnnotation} >= '${eventPosition.sequenceNumber}'`
            : `${core_amqp_1.Constants.sequenceNumberAnnotation} > '${eventPosition.sequenceNumber}'`;
    }
    else if ((0, core_util_1.isDefined)(eventPosition.enqueuedOn)) {
        const time = eventPosition.enqueuedOn instanceof Date
            ? eventPosition.enqueuedOn.getTime()
            : eventPosition.enqueuedOn;
        result = `${core_amqp_1.Constants.enqueuedTimeAnnotation} > '${time}'`;
    }
    if (!result) {
        throw (0, core_amqp_1.translate)({
            condition: core_amqp_1.ErrorNameConditionMapper.ArgumentError,
            description: "No starting position was set in the EventPosition.",
        });
    }
    return result;
}
/**
 * @internal
 */
function isLatestPosition(eventPosition) {
    if (eventPosition.offset === "@latest") {
        return true;
    }
    return false;
}
/**
 * Gets the `EventPosition` corresponding to the location of the the first event present in the partition.
 * Pass this position to the `EventHubConsumerClient.subscribe()` method to begin receiving events from the
 * first event in the partition which has not expired due to the retention policy.
 */
exports.earliestEventPosition = {
    offset: "-1",
};
/**
 * Gets the `EventPosition` corresponding to the end of the partition.
 * Pass this position to the `EventHubConsumerClient.subscribe()` method to begin receiving events from the
 * event that is enqueued right after the method call.
 * @returns EventPosition
 */
exports.latestEventPosition = {
    offset: "@latest",
};
/**
 * @internal
 */
function validateEventPositions(position) {
    if (!(0, core_util_1.isDefined)(position)) {
        return;
    }
    const keys = Object.keys(position);
    if (!keys.length) {
        throw new TypeError("Invalid value for EventPosition found. Pass an object with either of offset, sequenceNumber or enqueuedOn properties set.");
    }
    if (isEventPosition(position)) {
        validateEventPosition(position);
        return;
    }
    const positions = position;
    for (let i = 0; i < keys.length; i++) {
        if (Object.prototype.hasOwnProperty.call(positions, keys[i])) {
            validateEventPosition(positions[keys[i]]);
        }
    }
}
/**
 * Determines whether a position is an EventPosition.
 * Does not validate that the position is allowed.
 * @internal
 */
function isEventPosition(position) {
    if (!position) {
        return false;
    }
    if ((0, core_util_1.objectHasProperty)(position, "offset") && (0, core_util_1.isDefined)(position.offset)) {
        return true;
    }
    if ((0, core_util_1.objectHasProperty)(position, "sequenceNumber") && (0, core_util_1.isDefined)(position.sequenceNumber)) {
        return true;
    }
    if ((0, core_util_1.objectHasProperty)(position, "enqueuedOn") && (0, core_util_1.isDefined)(position.enqueuedOn)) {
        return true;
    }
    return false;
}
function validateEventPosition(position) {
    if (!(0, core_util_1.isDefined)(position)) {
        return;
    }
    const offsetPresent = (0, core_util_1.isDefined)(position.offset);
    const sequenceNumberPresent = (0, core_util_1.isDefined)(position.sequenceNumber);
    const enqueuedOnPresent = (0, core_util_1.isDefined)(position.enqueuedOn);
    if ((offsetPresent && sequenceNumberPresent) ||
        (offsetPresent && enqueuedOnPresent) ||
        (enqueuedOnPresent && sequenceNumberPresent)) {
        throw new TypeError("Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties.");
    }
    if (!offsetPresent && !enqueuedOnPresent && !sequenceNumberPresent) {
        throw new TypeError("Invalid value for EventPosition found. Pass an object with either of offset, sequenceNumber or enqueuedOn properties set.");
    }
}
//# sourceMappingURL=eventPosition.js.map