## API Report File for "@azure/event-hubs"

```ts

// ======================================== Event Hub Client  ======================================


// Main EventHubClient class
export class EventHubClient {
    constructor(connectionString: string, options?: EventHubClientOptions);
    constructor(host: string, entityPath: string, tokenProvider: TokenProvider, options?: EventHubClientOptions);
    constructor(
        host: string, 
        entityPath: string, 
        credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials, 
        options?: EventHubClientOptions
        );
    static createFromConnectionString(connectionString: string, entityPath?: string, options?: EventHubClientOptions): EventHubClient;

    close(): Promise<void>;

    createSender(options?: SenderOptions): Sender;
    createReceiver(partitionId: string, options?: ReceiverOptions): Receiver;

    getProperties(cancellationToken?: Aborter): Promise<EventHubProperties>;
    getPartitionIds(cancellationToken?: Aborter): Promise<Array<string>>;
    getPartitionProperties(partitionId: string, cancellationToken?: Aborter): Promise<PartitionProperties>;

    readonly eventHubName: string;
}

// Options to pass when creating EventHubClient
export interface EventHubClientOptions {
    dataTransformer?: DataTransformer;
    userAgent?: string;
    webSocket?: WebSocketImpl;
    webSocketConstructorOptions?: any;
    retryOptions?: RetryOptions;
}

// Retry options passed to client, sender and receiver
// Will have maxRetryInterval and isExponential once we support exponential retries
export interface RetryOptions {
    retryCount?: number;
    retryInterval?: number; // milliseconds
}

// ======================================== Sending related API starts ======================================

// Options passed to createSender()
export interface SenderOptions {
    partitionId?: string;
    retryOptions?: RetryOptions;
}

// Each sender holds an AMQP sender link
export class Sender {
    close(): Promise<void>;
    send(data: EventData[], options?: BatchingOptions): Promise<void>;

    readonly isClosed: boolean;
}

// Event Data to be sent
export interface EventData {
    body: any;
    properties?: {
        [key: string]: any;
    };
}

// Options to control how to batch. May include more when we support smart batching
export interface BatchingOptions {
    batchLabel?: string | null;
    cancellationToken?: Aborter;
}

// ======================================== Sending related API ends ======================================

// ======================================== Receiving related API starts ======================================

// Options passed to createReceiver()
export interface ReceiverOptions {
    consumerGroup?: string;
    eventPosition?: EventPosition;
    exclusiveReceiverPriority?: number;
    retryOptions?: RetryOptions;
}

// Options to create async iterator for events
export interface EventIteratorOptions {
    cancellationToken?: Aborter;
    prefetchCount?: number;
}

// Each receiver holds an AMQP receiver link dedicated to 1 partition
export class Receiver {
    close(): Promise<void>;
    getAsyncIterator(options?: EventIteratorOptions): AsyncIterableIterator<ReceivedEventData>;
    isReceivingMessages(): boolean;
    receive(onMessage: OnMessage, onError: OnError, cancellationToken?: Aborter): ReceiveHandler;
    receiveBatch(maxMessageCount: number, maxWaitTimeInSeconds?: number, cancellationToken?: Aborter): 

    readonly consumerGroup: string | undefined;
    readonly exclusiveReceiverPriority: number | undefined;
    readonly isClosed: boolean;
    readonly partitionId: string;
}



// Position in the stream, used to determine where to start a receiver from
export class EventPosition {
    constructor(options?: EventPositionOptions);

    static fromEnqueuedTime(enqueuedTime: Date | number): EventPosition;
    static fromFirstAvailableEvent(): EventPosition;
    static fromNewEventsOnly(): EventPosition;
    static fromOffset(offset: string, isInclusive?: boolean): EventPosition;
    static fromSequenceNumber(sequenceNumber: number, isInclusive?: boolean): EventPosition;
   
    static readonly endOfStream: string;
    static readonly startOfStream: string;

    enqueuedTime?: Date | number;
    isInclusive: boolean;
    offset?: string;
    sequenceNumber?: number;
}

// Event received from the service
export interface ReceivedEventData {
    body: any;
    enqueuedTimeUtc?: Date;
    offset?: string;
    partitionKey?: string | null;
    properties?: {
        [key: string]: any;
    };
    sequenceNumber?: number;
}

// Signature for error callback in streaming receiver
export type OnError = (error: MessagingError | Error) => void;

// Signature for event data callback in streaming receiver
export type OnMessage = (eventData: ReceivedEventData) => void;

// Handler returned by streaming receiver used for stopping it.
export class ReceiveHandler {
    readonly consumerGroup: string | undefined;
    readonly isReceiverOpen: boolean;
    readonly partitionId: string | number | undefined;
    stop(): Promise<void>;
}


// ======================================== Receiving related API ends ======================================



// @public
export interface EventHubProperties {
    createdAt: Date;
    partitionIds: string[];
    path: string;
}


// @public
export interface PartitionProperties {
    beginningSequenceNumber: number;
    eventHubPath: string;
    id: string;
    lastEnqueuedOffset: string;
    lastEnqueuedSequenceNumber: number;
    lastEnqueuedTimeUtc: Date;
}

```
