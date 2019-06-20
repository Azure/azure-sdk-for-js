// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { translate, Constants, ErrorNameConditionMapper } from "@azure/core-amqp";

/**
 * Describes the options that can be set while creating an EventPosition.
 * @internal
 * @interface EventPositionOptions
 */
export interface EventPositionOptions {
  /**
   * @property The offset of the event at the position. It can be undefined
   * if the position is just created from a sequence number or an enqueued time.
   */
  offset?: string;
  /**
   * @property Indicates if the current event at the specified offset is
   * included or not. It is only applicable if offset is set. Default value: false.
   */
  isInclusive?: boolean;
  /**
   * @property The enqueued time of the event at the position. It can be undefined
   * if the position is just created from a sequence number or an offset.
   */
  enqueuedTime?: Date | number;

  /**
   * @property The sequence number of the event at the position. It can be undefined
   * if the position is just created from an enqueued time or an offset.
   */
  sequenceNumber?: number;
}

/**
 * Represents options can be set during the creation of a event hub receiver.
 * Defines a position of an @link~EventData in the event hub partition.
 * @class EventPosition
 */
export class EventPosition {
  /**
   * @property The offset from which events would be received: `"-1"`.
   * @static
   * @readonly
   */
  private static readonly startOfStream: string = "-1";

  /**
   * @property The offset from which events would be received: `"@latest"`.
   * @static
   * @readonly
   */
  private static readonly endOfStream: string = "@latest";
  /**
   * @property The offset of the event at the position. It can be undefined
   * if the position is just created from a sequence number or an enqueued time.
   */
  offset?: string;
  /**
   * @property Indicates if the current event at the specified offset is
   * included or not. It is only applicable if offset is set. Default value: false.
   */
  isInclusive: boolean = false;
  /**
   * @property The enqueued time of the event at the position. It can be undefined
   * if the position is just created from a sequence number or an offset.
   */
  enqueuedTime?: Date | number;

  /**
   * @property The sequence number of the event at the position. It can be undefined
   * if the position is just created from an enqueued time or an offset.
   */
  sequenceNumber?: number;

  /**
   * @constructor
   * @internal
   * @param options
   */
  constructor(options?: EventPositionOptions) {
    if (options) {
      this.offset = options.offset;
      this.enqueuedTime = options.enqueuedTime;
      this.sequenceNumber = options.sequenceNumber;
      this.isInclusive = options.isInclusive || false;
    }
  }

  /**
   * Creates a position at the given offset.
   * @param offset The offset of the data relative to the Event Hub partition stream.
   * The offset is a marker or identifier for an event within the Event Hubs stream.
   * The identifier is unique within a partition of the Event Hubs stream.
   * @param isInclusive If true, the specified event is included;
   * otherwise the next event is returned. Default: false.
   * @returns EventPosition
   */
  static fromOffset(offset: string, isInclusive?: boolean): EventPosition {
    if (offset == undefined) {
      throw new Error('Missing parameter "offset"');
    }
    return new EventPosition({ offset: String(offset), isInclusive: isInclusive });
  }

  /**
   * Creates a position at the given sequence number.
   * @param sequenceNumber The logical sequence number of the event within the partition stream of the Event Hub.
   * @param isInclusive If true, the specified event is included;
   * otherwise the next event is returned. Default false.
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
   * Creates a position at the given enqueued time.
   * @param enqueuedTime The enqueue time. This value represents the actual time of enqueuing the message.
   * @returns EventPosition
   */
  static fromEnqueuedTime(enqueuedTime: Date | number): EventPosition {
    if (enqueuedTime == undefined) {
      throw new Error('Missing parameter "enqueuedTime"');
    }
    return new EventPosition({ enqueuedTime: enqueuedTime });
  }

  /**
   * Returns the position for the start of a stream. Provide this position in receiver creation to
   * start receiving from the first available event in the partition.
   * @returns EventPosition
   */

  static earliest(): EventPosition {
    return EventPosition.fromOffset(EventPosition.startOfStream);
  }

  /**
   * Returns the position for the end of a stream. Provide this position in receiver creation to
   * start receiving from the next available event in the partition after the receiver is created.
   * @returns EventPosition
   */

  static latest(): EventPosition {
    return EventPosition.fromOffset(EventPosition.endOfStream);
  }
}

/**
 * @internal
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
  } else if (eventPosition.enqueuedTime != undefined) {
    const time =
      eventPosition.enqueuedTime instanceof Date ? eventPosition.enqueuedTime.getTime() : eventPosition.enqueuedTime;
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
