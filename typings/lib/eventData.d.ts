export interface Dictionary<T> {
    [key: string]: T;
}
export interface EventData {
    body: any;
    enqueuedTimeUtc?: Date;
    partitionKey?: string | null;
    offset?: string;
    sequenceNumber?: number;
    annotations?: AmqpMessageAnnotations;
    properties?: Dictionary<any>;
    applicationProperties?: Dictionary<any>;
    lastSequenceNumber?: number;
    lastEnqueuedOffset?: string;
    lastEnqueuedTime?: Date;
    retrievalTime?: Date;
    _raw_amqp_mesage?: AmqpMessage;
}
export interface AmqpMessageAnnotations {
    "x-opt-partition-key"?: string | null;
    "x-opt-sequence-number"?: number;
    "x-opt-enqueued-time"?: number;
    "x-opt-offset"?: string;
    [x: string]: any;
}
export interface AmqpMessage {
    body: any;
    message_annotations?: AmqpMessageAnnotations;
    properties?: Dictionary<any>;
    application_properties?: Dictionary<any>;
    delivery_annotations?: {
        last_enqueued_offset?: string;
        last_enqueued_sequence_number?: number;
        last_enqueued_time_utc?: number;
        runtime_info_retrieval_time_utc?: number;
        [x: string]: any;
    };
}
export declare namespace EventData {
    function fromAmqpMessage(msg: AmqpMessage): EventData;
    function toAmqpMessage(data: EventData): AmqpMessage;
}
