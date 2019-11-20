// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { translate, Constants, ErrorNameConditionMapper } from "@azure/core-amqp";

/**
 * Describes the options that can be set while creating an EventPosition.
 * @internal
 * @ignore
 * @interface EventPositionOptions
 */
export interface EventPositionOptions {
  /**
   * @property The offset of the event at the position. It can be undefined
   * if the position is just created from a sequence number or an enqueued time.
   */
  offset?: number | "@latest";
  /**
   * @property Indicates if the current event at the specified offset is
   * included or not. It is only applicable if offset is set. Default value: false.
   */
  isInclusive?: boolean;
  /**
   * @property The enqueued time of the event at the position. It can be undefined
   * if the position is just created from a sequence number or an offset.
   */
  enqueuedOn?: Date | number;

  /**
   * @property The sequence number of the event at the position. It can be undefined
   * if the position is just created from an enqueued time or an offset.
   */
  sequenceNumber?: number;
}

/**
 * Represents the position of an event in an Event Hub partition, typically used in the creation of
 * an `EventHubConsumer` to specify the position in the partition to begin receiving events from.
 *
 * Make use of the below static helpers to create an instance of `EventPosition`
 * - `fromOffset()`
 * - `fromSequenceNumber()`
 * - `fromEnqueuedTime()`
 * - `earliest()`
 * - `latest()`
 * @class
 */
export class EventPosition {
  /**
   * @property The token that represents the beginning event in the stream of a partition: `-1`.
   * @static
   * @readonly
   * @ignore
   */
  private static readonly startOfStream: number = -1;

  /**
   * @property The token that represents the last event in the stream of a partition: `"@latest"`.
   * @static
   * @readonly
   * @ignore
   */
  private static readonly endOfStream = "@latest";
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
  isInclusive: boolean = false;
  /**
   * @property The enqueued time of the event identified by this position.
   * Expected to be undefined if the position is just created from a sequence number or an offset.
   */
  enqueuedOn?: Date | number;

  /**
   * @property The sequence number of the event identified by this poistion.
   * Expected to be undefined if the position is just created from an offset or enqueued time.
   */
  sequenceNumber?: number;

  /**
   * Instead of constructing an event position using `new Event Position()`, make use of the below static helpers
   * - `fromOffset()`
   * - `fromSequenceNumber()`
   * - `fromEnqueuedTime()`
   * - `earliest()`
   * - `latest()`
   *
   * @constructor
   * @internal
   * @ignore
   * @param options
   */
  constructor(options?: EventPositionOptions) {
    if (options) {
      this.offset = options.offset;
      this.enqueuedOn = options.enqueuedOn;
      this.sequenceNumber = options.sequenceNumber;
      this.isInclusive = options.isInclusive || false;
    }
  }

  /**
   * Gets an instance of `EventPosition` corresponding to the event in the partition at the provided offset.
   *
   * @param offset The offset of an event with respect to its relative position in the partition.
   * @param isInclusive If true, the specified event is included;
   * otherwise the next event is returned.
   * Default: `false`.
   * @returns EventPosition
   */
  static fromOffset(offset: number): EventPosition {
    if (typeof offset !== "number" && typeof offset !== "string") {
      throw new Error(`Invalid offset "${offset}" provided to "fromOffset" method.`);
    }
    return new EventPosition({ offset: offset });
  }

  /**
   * Gets an instance of `EventPosition` corresponding to the event in the partition having a specified sequence number associated with it.
   *
   * @param sequenceNumber The sequence number assigned to an event when it was enqueued in the partition.
   * @param isInclusive If true, event with the `sequenceNumber` is included;
   * otherwise the next event in sequence will be received.
   * Default `false`.
   * @returns EventPosition
   */
  static fromSequenceNumber(sequenceNumber: number, isInclusive?: boolean): EventPosition {
    if (sequenceNumber == undefined) {
      throw new Error('Missing parameter "sequenceNumber"');
    }
    if (typeof sequenceNumber !== "number") {
      throw new Error('The parameter "sequenceNumber" should be of type "number"');
    }
    return new EventPosition({ sequenceNumber: sequenceNumber, isInclusive: isInclusive });
  }

  /**
   * Gets an instance of `EventPosition` corresponding to a specific date and time within the partition to begin seeking an event;
   * the event enqueued after the requested `enqueuedTime` will become the current position.
   *
   * @param enqueuedOn The date and time, in UTC, from which the next available event should be chosen.
   * @returns EventPosition
   */
  static fromEnqueuedTime(enqueuedOn: Date | number): EventPosition {
    if (typeof enqueuedOn !== "number" && !(enqueuedOn instanceof Date)) {
      throw new Error(
        `Invalid enqueuedTime "${enqueuedOn}" provided to "fromEnqueuedTime" method.`
      );
    }
    return new EventPosition({ enqueuedOn: enqueuedOn });
  }

  /**
   * Gets an instance of `EventPosition` corresponding to the location of the the first event present in the partition.
   * Use this position to begin receiving from the first event that was enqueued in the partition
   * which has not expired due to the retention policy.
   * @returns EventPosition
   */

  static earliest(): EventPosition {
    return EventPosition.fromOffset(EventPosition.startOfStream);
  }

  /**
   * Gets an instance of `EventPosition` corresponding to the end of the partition, where no more events are currently enqueued.
   * Use this position to begin receiving from the next event to be enqueued in the partion after an ``EventHubConsumer``
   * is created with this position.
   * @returns EventPosition
   */

  static latest(): EventPosition {
    return new EventPosition({ offset: EventPosition.endOfStream });
  }
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
