"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.
Object.defineProperty(exports, "__esModule", { value: true });
const Constants = require("./util/constants");
const errors_1 = require("./errors");
const _1 = require(".");
/**
 * Represents options can be set during the creation of a event hub receiver.
 * Defines a position of an @link~EventData in the event hub partition.
 * @class EventPosition
 */
class EventPosition {
    constructor(options) {
        /**
         * @property {boolean} isInclusive Indicates if the current event at the specified offset is
         * included or not. It is only applicable if offset is set. Default value: false.
         */
        this.isInclusive = false;
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
    getExpression() {
        let result;
        // order of preference
        if (this.offset) {
            result = this.isInclusive ?
                `${Constants.offsetAnnotation} >= '${this.offset}'` :
                `${Constants.offsetAnnotation} > '${this.offset}'`;
        }
        else if (this.sequenceNumber) {
            result = this.isInclusive ?
                `${Constants.sequenceNumberAnnotation} >= '${this.sequenceNumber}'` :
                `${Constants.sequenceNumberAnnotation} > '${this.sequenceNumber}'`;
        }
        else if (this.enqueuedTime) {
            const time = (this.enqueuedTime instanceof Date) ? this.enqueuedTime.getTime() : this.enqueuedTime;
            result = `${Constants.enqueuedTimeAnnotation} > '${time}'`;
        }
        else if (this.customFilter) {
            result = this.customFilter;
        }
        if (!result) {
            throw errors_1.translate({ condition: _1.ErrorNameConditionMapper.ArgumentError, description: "No starting position was set in the EventPosition." });
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
    static fromOffset(offset, isInclusive) {
        return new EventPosition({ offset: offset, isInclusive: isInclusive });
    }
    /**
     * Creates a position at the given sequence number.
     * @param {number} sequenceNumber The logical sequence number of the event within the partition stream of the Event Hub.
     * @param {boolean} isInclusive If true, the specified event is included;
     * otherwise the next event is returned. Default false.
     * @return {EventPosition} EventPosition
     */
    static fromSequenceNumber(sequenceNumber, isInclusive) {
        return new EventPosition({ sequenceNumber: sequenceNumber, isInclusive: isInclusive });
    }
    /**
     * Creates a position at the given enqueued time.
     * @param {Date | number} enqueuedTime The enqueue time. This value represents the actual time of enqueuing the message.
     * @param {boolean} isInclusive If true, the specified event is included; otherwise the next event is returned.
     * @return {EventPosition} EventPosition
     */
    static fromEnqueuedTime(enqueuedTime) {
        return new EventPosition({ enqueuedTime: enqueuedTime });
    }
    /**
     * Creates a position based on the given custom filter.
     * @param {string} customFilter The cutom filter expression that needs to be applied on the receiver. This should be used
     * only when one of the other methods `fromOffset()`, `fromSequenceNumber()`, `fromEnqueuedTime()` is not applicable for
     * your scenario.
     */
    static withCustomFilter(customFilter) {
        return new EventPosition({ customFilter: customFilter });
    }
    /**
     * Returns the position for the start of a stream. Provide this position in receiver creation to
     * start receiving from the first available event in the partition.
     * @return {EventPosition} EventPosition
     */
    static fromStart() {
        return EventPosition.fromOffset(EventPosition.startOfStream);
    }
    /**
     * Returns the position for the end of a stream. Provide this position in receiver creation to
     * start receiving from the next available event in the partition after the receiver is created.
     * @return {EventPosition} EventPosition
     */
    static fromEnd() {
        return EventPosition.fromOffset(EventPosition.endOfStream);
    }
}
EventPosition.startOfStream = "-1";
EventPosition.endOfStream = "@latest";
exports.EventPosition = EventPosition;
//# sourceMappingURL=eventPosition.js.map