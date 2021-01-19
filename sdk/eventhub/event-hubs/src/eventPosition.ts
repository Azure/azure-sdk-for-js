// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Constants, ErrorNameConditionMapper, translate } from "@azure/core-amqp";

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
   * @property The offset of the event identified by this position.
   * Expected to be undefined if the position is just created from a sequence number or an enqueued time.
   *
   * The offset is the relative position for an event in the context of the partition.
   * The offset should not be considered a stable value.
   * The same offset may refer to a different event as events reach the age limit for
   * retention and are no longer visible within the partition.
   */
  offset?: number | "@latest";
  /**
   * @property Indicates if the specified offset is inclusive of the event which it identifies.
   * This information is only relevent if the event position was identified by an offset or sequence number.
   * Default value: `false`.
   */
  isInclusive?: boolean;
  /**
   * @property The enqueued time in UTC of the event identified by this position.
   * When provided as a number this value is the number of milliseconds since the Unix Epoch.
   * Expected to be undefined if the position is just created from a sequence number or an offset.
   */
  enqueuedOn?: Date | number;

  /**
   * @property The sequence number of the event identified by this position.
   * Expected to be undefined if the position is just created from an offset or enqueued time.
   */
  sequenceNumber?: number;
}

/**
 * @internal
 * @hidden
 * Gets the expression to be set as the filter clause when creating the receiver
 * @return {string} filterExpression
 */
export function getEventPositionFilter(eventPosition: EventPosition): string {
  let result;
  // order of preference
  if (eventPosition.offset != undefined) {
    result = eventPosition.isInclusive
      ? `${Constants.offsetAnnotation} >= '${eventPosition.offset}'`
      : `${Constants.offsetAnnotation} > '${eventPosition.offset}'`;
  } else if (eventPosition.sequenceNumber != undefined) {
    result = eventPosition.isInclusive
      ? `${Constants.sequenceNumberAnnotation} >= '${eventPosition.sequenceNumber}'`
      : `${Constants.sequenceNumberAnnotation} > '${eventPosition.sequenceNumber}'`;
  } else if (eventPosition.enqueuedOn != undefined) {
    const time =
      eventPosition.enqueuedOn instanceof Date
        ? eventPosition.enqueuedOn.getTime()
        : eventPosition.enqueuedOn;
    result = `${Constants.enqueuedTimeAnnotation} > '${time}'`;
  }

  if (!result) {
    throw translate({
      condition: ErrorNameConditionMapper.ArgumentError,
      description: "No starting position was set in the EventPosition."
    });
  }
  return result;
}

/**
 * @internal
 * @hidden
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
  offset: -1
};

/**
 * Gets the `EventPosition` corresponding to the end of the partition.
 * Pass this position to the `EventHubConsumerClient.subscribe()` method to begin receiving events from the
 * event that is enqueued right after the method call.
 * @returns EventPosition
 */
export const latestEventPosition: EventPosition = {
  offset: "@latest"
};

/**
 * @hidden
 * @internal
 */
export function validateEventPositions(
  position: EventPosition | { [partitionId: string]: EventPosition }
): void {
  if (position == undefined) {
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
 * @param position
 * @hidden
 * @internal
 */
export function isEventPosition(position: any): position is EventPosition {
  if (!position) {
    return false;
  }

  if (position.offset != undefined) {
    return true;
  }

  if (position.sequenceNumber != undefined) {
    return true;
  }

  if (position.enqueuedOn != undefined) {
    return true;
  }

  return false;
}

function validateEventPosition(position: EventPosition): void {
  if (position == undefined) {
    return;
  }
  const offsetPresent = position.offset != undefined;
  const sequenceNumberPresent = position.sequenceNumber != undefined;
  const enqueuedOnPresent = position.enqueuedOn != undefined;

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
