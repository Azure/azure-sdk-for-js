export type EventPosition = EnqueuedTimeEventPosition | OffsetEventPosition | SequenceNumberEventPosition;
export interface BaseEventPosition {
    type: string;
    operator: ">" | ">=";
    value: string | number;
}
export interface OffsetEventPosition extends BaseEventPosition {
    type: "offset";
    value: number | "@latest";
}
export interface SequenceNumberEventPosition extends BaseEventPosition {
    type: "sequenceNumber";
    value: number;
}
export interface EnqueuedTimeEventPosition extends BaseEventPosition {
    type: "enqueuedTime";
    value: number;
}
/**
 * Returns an `EventPosition` given an amqp source filter.
 */
export declare function getEventPosition(filter: string): EventPosition;
//# sourceMappingURL=eventPosition.d.ts.map