// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { translate, Constants, ErrorNameConditionMapper } from "./amqp-common";

/**
 * Describes the options that can be set while creating an EventPosition.
 * @ignore
 * @interface EventPositionOptions
 */
export interface EventPositionOptions {
  /**
   * @property {string} [offset] The offset of the event at the position. It can be undefined
   * if the position is just created from a sequence number or an enqueued time.
   */
  offset?: string;
  /**
   * @property {boolean} isInclusive Indicates if the current event at the specified offset is
   * included or not. It is only applicable if offset is set. Default value: false.
   */
  isInclusive?: boolean;
  /**
   * @property {Date|number} [enqueuedTime] The enqueued time of the event at the position. It can be undefined
   * if the position is just created from a sequence number or an offset.
   */
  enqueuedTime?: Date | number;

  /**
   * @property {number} [sequenceNumber] The sequence number of the event at the position. It can be undefined
   * if the position is just created from an enqueued time or an offset.
   */
  sequenceNumber?: number;

  /**
   * @property {string} [customFilter] The custom filter expression that needs to be set on the receiver.
   */
  customFilter?: string;
}

/**
 * Represents options can be set during the creation of a event hub receiver.
 * Defines a position of an @link~EventData in the event hub partition.
 * @class EventPosition
 */
export class EventPosition {
  /**
   * @property {string} startOfStream The offset from which events would be received: `"-1"`.
   * @static
   * @readonly
   */
  static readonly startOfStream: string = "-1";
  /**
   * @property {string} endOfStream The offset from which events would be received: `"@latest"`.
   * @static
   * @readonly
   */
  static readonly endOfStream: string = "@latest";
  /**
   * @property {string} [offset] The offset of the event at the position. It can be undefined
   * if the position is just created from a sequence number or an enqueued time.
   */
  offset?: string;
  /**
   * @property {boolean} isInclusive Indicates if the current event at the specified offset is
   * included or not. It is only applicable if offset is set. Default value: false.
   */
  isInclusive: boolean = false;
  /**
   * @property {Date|number} [enqueuedTime] The enqueued time of the event at the position. It can be undefined
   * if the position is just created from a sequence number or an offset.
   */
  enqueuedTime?: Date | number;

  /**
   * @property {number} [sequenceNumber] The sequence number of the event at the position. It can be undefined
   * if the position is just created from an enqueued time or an offset.
   */
  sequenceNumber?: number;

  /**
   * @property {string} [customFilter] The custom filter expression that needs to be set on the receiver.
   */
  customFilter?: string;

  constructor(options?: EventPositionOptions) {
    if (options) {
      this.offset = options.offset;
      this.enqueuedTime = options.enqueuedTime;
      this.sequenceNumber = options.sequenceNumber;
      this.isInclusive = options.isInclusive || false;
      this.customFilter = options.customFilter;
    }
  }

  /**
   * Gets the expression (filter clause) that needs to be set on the source.
   * @return {string} filterExpression
   */
  getExpression(): string {
    let result;
    // order of preference
    if (this.offset) {
      result = this.isInclusive ?
        `${Constants.offsetAnnotation} >= '${this.offset}'` :
        `${Constants.offsetAnnotation} > '${this.offset}'`;
    } else if (this.sequenceNumber) {
      result = this.isInclusive ?
        `${Constants.sequenceNumberAnnotation} >= '${this.sequenceNumber}'` :
        `${Constants.sequenceNumberAnnotation} > '${this.sequenceNumber}'`;
    } else if (this.enqueuedTime) {
      const time = (this.enqueuedTime instanceof Date) ? this.enqueuedTime.getTime() : this.enqueuedTime;
      result = `${Constants.enqueuedTimeAnnotation} > '${time}'`;
    } else if (this.customFilter) {
      result = this.customFilter;
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
   * Creates a position at the given offset.
   * @param {string} offset The offset of the data relative to the Event Hub partition stream.
   * The offset is a marker or identifier for an event within the Event Hubs stream.
   * The identifier is unique within a partition of the Event Hubs stream.
   * @param {boolean} isInclusive If true, the specified event is included;
   * otherwise the next event is returned. Default: false.
   * @return {EventPosition} EventPosition
   */
  static fromOffset(offset: string, isInclusive?: boolean): EventPosition {
    return new EventPosition({ offset: offset, isInclusive: isInclusive });
  }

  /**
   * Creates a position at the given sequence number.
   * @param {number} sequenceNumber The logical sequence number of the event within the partition stream of the Event Hub.
   * @param {boolean} isInclusive If true, the specified event is included;
   * otherwise the next event is returned. Default false.
   * @return {EventPosition} EventPosition
   */
  static fromSequenceNumber(sequenceNumber: number, isInclusive?: boolean): EventPosition {
    return new EventPosition({ sequenceNumber: sequenceNumber, isInclusive: isInclusive });
  }

  /**
   * Creates a position at the given enqueued time.
   * @param {Date | number} enqueuedTime The enqueue time. This value represents the actual time of enqueuing the message.
   * @param {boolean} isInclusive If true, the specified event is included; otherwise the next event is returned.
   * @return {EventPosition} EventPosition
   */
  static fromEnqueuedTime(enqueuedTime: Date | number): EventPosition {
    return new EventPosition({ enqueuedTime: enqueuedTime });
  }

  /**
   * Creates a position based on the given custom filter.
   * @param {string} customFilter The cutom filter expression that needs to be applied on the receiver. This should be used
   * only when one of the other methods `fromOffset()`, `fromSequenceNumber()`, `fromEnqueuedTime()` is not applicable for
   * your scenario.
   */
  static withCustomFilter(customFilter: string): EventPosition {
    return new EventPosition({ customFilter: customFilter });
  }

  /**
   * Returns the position for the start of a stream. Provide this position in receiver creation to
   * start receiving from the first available event in the partition.
   * @return {EventPosition} EventPosition
   */
  static fromStart(): EventPosition {
    return EventPosition.fromOffset(EventPosition.startOfStream);
  }

  /**
   * Returns the position for the end of a stream. Provide this position in receiver creation to
   * start receiving from the next available event in the partition after the receiver is created.
   * @return {EventPosition} EventPosition
   */
  static fromEnd(): EventPosition {
    return EventPosition.fromOffset(EventPosition.endOfStream);
  }
}
