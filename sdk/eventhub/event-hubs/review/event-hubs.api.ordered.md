## API Report File for "@azure/event-hubs"

```ts

// ======================================== Event Hub Client  ======================================


// Main EventHubClient class
export class EventHubClient {
    constructor(host: string, entityPath: string, options?: ClientOptions); // Waiting for Azure identity
    constructor(host: string, entityPath: string, tokenProvider: TokenProvider, options?: ClientOptions);
    constructor(
        host: string, 
        entityPath: string, 
        credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials, 
        options?: ClientOptions
        );
    static createFromConnectionString(connectionString: string, entityPath?: string, options?: ClientOptions): EventHubClient;

    close(): Promise<void>;

    createSender(): Sender;
    createReceiver(partitionId: string, options?: ReceiveOptions): Receiver;

    getHubInformation(options?: RequestOptions): Promise<HubInformation>;
    getPartitionIds(options?: RequestOptions): Promise<Array<string>>;
    getPartitionInformation(partitionId: string, options?: RequestOptions): Promise<PartitionInformation>;

    readonly hubPath: string;
}

// Options to pass when creating EventHubClient
export interface ClientOptions {
    dataTransformer?: DataTransformer;
    logLevel?: LogLevel;
    userAgent?: string;
    webSocket?: WebSocketImpl;
    webSocketConstructorOptions?: any;
}

// Various log levels that can be set at client or sender/receiver or metadata calls
export enum LogLevel {
    None = 0,
    Error = 1,
    Warning = 2
    Info = 3,
    Verbose = 4
}

// Options to pass to sender/receiver or metadata calls
export interface RequestOptions {
    cancellationToken?: Aborter;
    logLevel?: LogLevel;
    retryOptions?: RetryOptions;
    timeoutInSeconds?: number;
}

// Flat list of retry options to support linear. Will change when supporting exponential after Preview 1
export interface RetryOptions {
    delayBetweenRetriesInSeconds?: number;
    retryCount?: number;
}

// ======================================== Sending related API starts ======================================

// Each sender holds an AMQP sender link
export class Sender {
    close(): Promise<void>;
    send(data: EventData[], options?: BatchingOptions): Promise<void>;
    send(data: EventData[], partitionId: string, options?: BatchingOptions): Promise<void>;

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

// Each receiver holds an AMQP receiver link dedicated to 1 partition
export class Receiver {
    close(): Promise<void>;
    getEventIterator(partitionId: string, batchSize: number, maxWaitTimeInSeconds: number, cancellationToken?: Aborter): AsyncIterableIterator<ReceivedEventData[]>;
    isReceivingMessages(): boolean;
    receive(partitionId: string, onMessage: OnMessage, onError: OnError, cancellationToken?: Aborter): ReceiveHandler;

    readonly consumerGroup: string | undefined;
    readonly epoch: number | undefined;
    readonly isClosed: boolean;
    readonly lastEnqueuedInfo: LastEnqueuedInfo | undefined;
    readonly partitionId: string;
}

// Options to control the AMQP receiver link
export interface ReceiveOptions extends RequestOptions {
    consumerGroup?: string;
    enableReceiverRuntimeMetric?: boolean;
    epoch?: number;
    eventPosition?: EventPosition;
}

// Position in the stream, used to determine where to start a receiver from
export class EventPosition {
    static fromEnqueuedTime(enqueuedTime: Date | number): EventPosition;
    static fromFirstAvailable(): EventPosition;
    static fromLastAvailable(): EventPosition;
    static fromOffset(offset: string, isInclusive?: boolean): EventPosition;
    static fromSequenceNumber(sequenceNumber: number, isInclusive?: boolean): EventPosition;
   
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
    readonly isRunning: boolean;
    stop(): Promise<void>;
}

// Info on the last enqueued data on the partition
export interface LastEnqueuedInfo {
    lastEnqueuedOffset?: string;
    lastEnqueuedSequenceNumber?: number;
    lastEnqueuedTimeUtc?: Date;
    retrievalTime?: Date;
}

// ======================================== Receiving related API ends ======================================



// @public
export interface HubInformation {
    createdAt: Date;
    partitionCount: number;
    partitionIds: string[];
    path: string;
}


// @public
export interface PartitionInformation {
    beginningSequenceNumber: number;
    hubPath: string;
    lastEnqueuedOffset: string;
    lastEnqueuedSequenceNumber: number;
    lastEnqueuedTimeUtc: Date;
    partitionId: string;
}

```
