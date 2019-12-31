// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { translate, Constants, ErrorNameConditionMapper } from "@azure/core-amqp";

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
   * @property The enqueued time of the event identified by this position.
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
 * @ignore
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

export function isEarliestEventPosition(eventPosition: EventPosition): boolean {
  if (eventPosition.offset === -1) {
    return true;
  }

  return false;
}

/**
 * Gets the `EventPosition` corresponding to the location of the the first event present in the partition.
 * Use this position to begin receiving from the first event that was enqueued in the partition
 * which has not expired due to the retention policy.
 */
export const earliestEventPosition: EventPosition = {
  offset: -1
}


/**
 * Gets the `EventPosition` corresponding to the end of the partition, where no more events are currently enqueued.
 * Use this position to begin receiving from the next event to be enqueued in the partion after an ``EventHubConsumer``
 * is created with this position.
 * @returns EventPosition
 */
export const latestEventPosition: EventPosition = {
  offset: "@latest"
}

/**
 * @ignore
 * @internal
 */
export function validateEventPosition(position: EventPosition) {
  
  const offsetPresent = position.offset != undefined;
  const sequenceNumberPresent = position.sequenceNumber != undefined;
  const enqueuedOnPresent = position.enqueuedOn != undefined;

  if ((offsetPresent && sequenceNumberPresent) || (offsetPresent && enqueuedOnPresent) || (enqueuedOnPresent && sequenceNumberPresent)) {
    throw new TypeError(`${position} is an invalid value for EventPosition. Set only one of offset, sequenceNumber or enqueuedOn properties.`);
  }

  const validOffset = (typeof position.offset === "number" && position.offset >= -1) || position.offset === latestEventPosition.offset;
  if (offsetPresent && !validOffset) {
    throw new TypeError(`${position.offset} is an invalid value for the offset property in EventPosition. Valid values are numbers >= -1 or the string "@latest".`);
  }

  const validSequenceNumber = typeof position.sequenceNumber === "number" && position.sequenceNumber >= -1;
  if (sequenceNumberPresent && !validSequenceNumber) {
    throw new TypeError(`${position.sequenceNumber} is an invalid value for the sequenceNumber property in EventPosition. Valid values are numbers >= -1.`);
  }

  const validEnqueuedOn = typeof position.enqueuedOn === "number" || position.enqueuedOn instanceof Date;
  if (enqueuedOnPresent && !validEnqueuedOn) {
    throw new TypeError(`${position.enqueuedOn} is an invalid value for the enqueuedOn property in EventPosition. Valid values are of type number or instance of Date class.`);
  }

}