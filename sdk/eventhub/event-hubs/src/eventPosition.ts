// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Constants, ErrorNameConditionMapper, translate } from "@azure/core-amqp";
import { isDefined, objectHasProperty } from "./util/typeGuards";

/**
 * Represents the position of an event in an Event Hub partition, typically used when calling the `subscribe()`
 * method on an `EventHubConsumerClient` to specify the position in the partition to begin receiving events from.
 *
 * To get an EventPosition representing the start or end of the stream, use the constants
 * `earliestEventPosition` and `latestEventPosition` respectively.
 *
 */
export interface EventPosition {
  /**
   * The offset of the event identified by this position.
   * Expected to be undefined if the position is just created from a sequence number or an enqueued time.
   *
   * The offset is the relative position for an event in the context of the partition.
   * The offset should not be considered a stable value.
   * The same offset may refer to a different event as events reach the age limit for
   * retention and are no longer visible within the partition.
   */
  offset?: number | "@latest";
  /**
   * Indicates if the specified offset is inclusive of the event which it identifies.
   * This information is only relevent if the event position was identified by an offset or sequence number.
   * Default value: `false`.
   */
  isInclusive?: boolean;
  /**
   * The enqueued time in UTC of the event identified by this position.
   * When provided as a number this value is the number of milliseconds since the Unix Epoch.
   * Expected to be undefined if the position is just created from a sequence number or an offset.
   */
  enqueuedOn?: Date | number;

  /**
   * The sequence number of the event identified by this position.
   * Expected to be undefined if the position is just created from an offset or enqueued time.
   */
  sequenceNumber?: number;
}

/**
 * @internal
 * Gets the expression to be set as the filter clause when creating the receiver
 * @returns filterExpression
 */
export function getEventPositionFilter(eventPosition: EventPosition): string {
  let result;
  // order of preference
  if (isDefined(eventPosition.offset)) {
    result = eventPosition.isInclusive
      ? `${Constants.offsetAnnotation} >= '${eventPosition.offset}'`
      : `${Constants.offsetAnnotation} > '${eventPosition.offset}'`;
  } else if (isDefined(eventPosition.sequenceNumber)) {
    result = eventPosition.isInclusive
      ? `${Constants.sequenceNumberAnnotation} >= '${eventPosition.sequenceNumber}'`
      : `${Constants.sequenceNumberAnnotation} > '${eventPosition.sequenceNumber}'`;
  } else if (isDefined(eventPosition.enqueuedOn)) {
    const time =
      eventPosition.enqueuedOn instanceof Date
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
export function isLatestPosition(eventPosition: EventPosition): boolean {
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
export const earliestEventPosition: EventPosition = {
  offset: -1,
};

/**
 * Gets the `EventPosition` corresponding to the end of the partition.
 * Pass this position to the `EventHubConsumerClient.subscribe()` method to begin receiving events from the
 * event that is enqueued right after the method call.
 * @returns EventPosition
 */
export const latestEventPosition: EventPosition = {
  offset: "@latest",
};

/**
 * @internal
 */
export function validateEventPositions(
  position: EventPosition | { [partitionId: string]: EventPosition }
): void {
  if (!isDefined(position)) {
    return;
  }

  const keys = Object.keys(position);

  if (!keys.length) {
    throw new TypeError(
      "Invalid value for EventPosition found. Pass an object with either of offset, sequenceNumber or enqueuedOn properties set."
    );
  }

  if (isEventPosition(position)) {
    validateEventPosition(position);
    return;
  }

  const positions = position as { [partitionId: string]: EventPosition };
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
export function isEventPosition(position: unknown): position is EventPosition {
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

function validateEventPosition(position: EventPosition): void {
  if (!isDefined(position)) {
    return;
  }
  const offsetPresent = isDefined(position.offset);
  const sequenceNumberPresent = isDefined(position.sequenceNumber);
  const enqueuedOnPresent = isDefined(position.enqueuedOn);

  if (
    (offsetPresent && sequenceNumberPresent) ||
    (offsetPresent && enqueuedOnPresent) ||
    (enqueuedOnPresent && sequenceNumberPresent)
  ) {
    throw new TypeError(
      "Invalid value for EventPosition found. Set only one of offset, sequenceNumber or enqueuedOn properties."
    );
  }

  if (!offsetPresent && !enqueuedOnPresent && !sequenceNumberPresent) {
    throw new TypeError(
      "Invalid value for EventPosition found. Pass an object with either of offset, sequenceNumber or enqueuedOn properties set."
    );
  }
}
