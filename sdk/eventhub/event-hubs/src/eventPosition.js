// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { Constants, ErrorNameConditionMapper, translate } from "@azure/core-amqp";
import { isDefined, objectHasProperty } from "@azure/core-util";
/**
 * @internal
 * Gets the expression to be set as the filter clause when creating the receiver
 * @returns filterExpression
 */
export function getEventPositionFilter(eventPosition) {
    let result;
    // order of preference
    if (isDefined(eventPosition.offset)) {
        result = eventPosition.isInclusive
            ? `${Constants.offsetAnnotation} >= '${eventPosition.offset}'`
            : `${Constants.offsetAnnotation} > '${eventPosition.offset}'`;
    }
    else if (isDefined(eventPosition.sequenceNumber)) {
        result = eventPosition.isInclusive
            ? `${Constants.sequenceNumberAnnotation} >= '${eventPosition.sequenceNumber}'`
            : `${Constants.sequenceNumberAnnotation} > '${eventPosition.sequenceNumber}'`;
    }
    else if (isDefined(eventPosition.enqueuedOn)) {
        const time = eventPosition.enqueuedOn instanceof Date
            ? eventPosition.enqueuedOn.getTime()
            : eventPosition.enqueuedOn;
        result = `${Constants.enqueuedTimeAnnotation} > '${time}'`;
    }
    if (!result) {
        throw translate({
            condition: ErrorNameConditionMapper.ArgumentError,
            description: "No starting position was set in the EventPosition.",
        });
    }
    return result;
}
/**
 * @internal
 */
export function isLatestPosition(eventPosition) {
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
export const earliestEventPosition = {
    offset: "-1",
};
/**
 * Gets the `EventPosition` corresponding to the end of the partition.
 * Pass this position to the `EventHubConsumerClient.subscribe()` method to begin receiving events from the
 * event that is enqueued right after the method call.
 * @returns EventPosition
 */
export const latestEventPosition = {
    offset: "@latest",
};
/**
 * @internal
 */
export function validateEventPositions(position) {
    if (!isDefined(position)) {
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
export function isEventPosition(position) {
    if (!position) {
        return false;
    }
    if (objectHasProperty(position, "offset") && isDefined(position.offset)) {
        return true;
    }
    if (objectHasProperty(position, "sequenceNumber") && isDefined(position.sequenceNumber)) {
        return true;
    }
    if (objectHasProperty(position, "enqueuedOn") && isDefined(position.enqueuedOn)) {
        return true;
    }
    return false;
}
function validateEventPosition(position) {
    if (!isDefined(position)) {
        return;
    }
    const offsetPresent = isDefined(position.offset);
    const sequenceNumberPresent = isDefined(position.sequenceNumber);
    const enqueuedOnPresent = isDefined(position.enqueuedOn);
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