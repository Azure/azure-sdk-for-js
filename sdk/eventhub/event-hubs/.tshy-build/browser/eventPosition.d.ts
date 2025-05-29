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
    offset?: string | "@latest";
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
export declare function getEventPositionFilter(eventPosition: EventPosition): string;
/**
 * @internal
 */
export declare function isLatestPosition(eventPosition: EventPosition): boolean;
/**
 * Gets the `EventPosition` corresponding to the location of the the first event present in the partition.
 * Pass this position to the `EventHubConsumerClient.subscribe()` method to begin receiving events from the
 * first event in the partition which has not expired due to the retention policy.
 */
export declare const earliestEventPosition: EventPosition;
/**
 * Gets the `EventPosition` corresponding to the end of the partition.
 * Pass this position to the `EventHubConsumerClient.subscribe()` method to begin receiving events from the
 * event that is enqueued right after the method call.
 * @returns EventPosition
 */
export declare const latestEventPosition: EventPosition;
/**
 * @internal
 */
export declare function validateEventPositions(position: EventPosition | {
    [partitionId: string]: EventPosition;
}): void;
/**
 * Determines whether a position is an EventPosition.
 * Does not validate that the position is allowed.
 * @internal
 */
export declare function isEventPosition(position: unknown): position is EventPosition;
//# sourceMappingURL=eventPosition.d.ts.map