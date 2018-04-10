/**
 * Describes the options that can be set while creating an EventPosition.
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
export declare class EventPosition {
    static readonly startOfStream: string;
    static readonly endOfStream: string;
    /**
     * @property {string} [offset] The offset of the event at the position. It can be undefined
     * if the position is just created from a sequence number or an enqueued time.
     */
    offset?: string;
    /**
     * @property {boolean} isInclusive Indicates if the current event at the specified offset is
     * included or not. It is only applicable if offset is set. Default value: false.
     */
    isInclusive: boolean;
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
    constructor(options?: EventPositionOptions);
    /**
     * Gets the expression (filter clause) that needs to be set on the source.
     * @return {string} filterExpression
     */
    getExpression(): string;
    /**
     * Creates a position at the given offset.
     * @param {string} offset The offset of the data relative to the Event Hub partition stream.
     * The offset is a marker or identifier for an event within the Event Hubs stream.
     * The identifier is unique within a partition of the Event Hubs stream.
     * @param {boolean} isInclusive If true, the specified event is included;
     * otherwise the next event is returned. Default: false.
     * @return {EventPosition} EventPosition
     */
    static fromOffset(offset: string, isInclusive?: boolean): EventPosition;
    /**
     * Creates a position at the given sequence number.
     * @param {number} sequenceNumber The logical sequence number of the event within the partition stream of the Event Hub.
     * @param {boolean} isInclusive If true, the specified event is included;
     * otherwise the next event is returned. Default false.
     * @return {EventPosition} EventPosition
     */
    static fromSequenceNumber(sequenceNumber: number, isInclusive?: boolean): EventPosition;
    /**
     * Creates a position at the given enqueued time.
     * @param {Date | number} enqueuedTime The enqueue time. This value represents the actual time of enqueuing the message.
     * @param {boolean} isInclusive If true, the specified event is included; otherwise the next event is returned.
     * @return {EventPosition} EventPosition
     */
    static fromEnqueuedTime(enqueuedTime: Date | number): EventPosition;
    /**
     * Creates a position based on the given custom filter.
     * @param {string} customFilter The cutom filter expression that needs to be applied on the receiver. This should be used
     * only when one of the other methods `fromOffset()`, `fromSequenceNumber()`, `fromEnqueuedTime()` is not applicable for
     * your scenario.
     */
    static withCustomFilter(customFilter: string): EventPosition;
    /**
     * Returns the position for the start of a stream. Provide this position in receiver creation to
     * start receiving from the first available event in the partition.
     * @return {EventPosition} EventPosition
     */
    static fromStart(): EventPosition;
    /**
     * Returns the position for the end of a stream. Provide this position in receiver creation to
     * start receiving from the next available event in the partition after the receiver is created.
     * @return {EventPosition} EventPosition
     */
    static fromEnd(): EventPosition;
}
