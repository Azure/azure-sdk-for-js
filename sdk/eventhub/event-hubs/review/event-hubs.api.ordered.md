## API Report File for "@azure/event-hubs"

```ts

// ======================================== Event Hub Client  ======================================


// @public
export class EventHubClient {
    constructor(host: string, entityPath: string, tokenProvider: TokenProvider, options?: ClientOptions);
    constructor(host: string, entityPath: string, credentials: ApplicationTokenCredentials | UserTokenCredentials | DeviceTokenCredentials | MSITokenCredentials, options?: ClientOptions);

    close(): Promise<void>;

    static createFromConnectionString(connectionString: string, entityPath?: string, options?: ClientOptions): EventHubClient;
    static createFromIotHubConnectionString(iothubConnectionString: string, options?: ClientOptions): Promise<EventHubClient>;

    createSender(): Sender;
    createReceiver(partitionId: string, options?: ReceiveOptions): Receiver;

    getHubInformation(options?: RequestOptions): Promise<HubInformation>;
    getPartitionIds(options?: RequestOptions): Promise<Array<string>>;
    getPartitionInformation(partitionId: string, options?: RequestOptions): Promise<PartitionInformation>;

    readonly hubPath: string;
}

// @public
export interface ClientOptions {
    dataTransformer?: DataTransformer;
    logLevel?: LogLevel;
    userAgent?: string;
    webSocket?: WebSocketImpl;
    webSocketConstructorOptions?: any;
}

// @public
export enum LogLevel {
    Error = 1,
    Info = 3,
    None = 0,
    Verbose = 4,
    Warning = 2
}

// @public
export interface RequestOptions {
    cancellationToken?: Aborter;
    logLevel?: LogLevel;
    retryOptions?: RetryOptions;
    timeoutInSeconds?: number;
}

// @public
export interface RetryOptions {
    delayBetweenRetriesInSeconds?: number;
    retryCount?: number;
}

// ======================================== Sending related API starts ======================================

// @public
export class Sender {
    close(): Promise<void>;
    send(data: EventData[], options?: BatchingOptions): Promise<void>;
    send(data: EventData[], partitionId: string, options?: BatchingOptions): Promise<void>;

    readonly isClosed: boolean;
}

// @public
export interface EventData {
    body: any;
    properties?: {
        [key: string]: any;
    };
}

// @public
export interface BatchingOptions {
    batchLabel?: string | null;
    cancellationToken?: Aborter;
    partitionId?: string;
}

// ======================================== Sending related API ends ======================================

// ======================================== Receiving related API starts ======================================

// @public
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

// @public
export interface ReceiveOptions extends RequestOptions {
    consumerGroup?: string;
    enableReceiverRuntimeMetric?: boolean;
    epoch?: number;
    eventPosition?: EventPosition;
}

// @public
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

// @public
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

// @public
export type OnError = (error: MessagingError | Error) => void;

// @public
export type OnMessage = (eventData: ReceivedEventData) => void;

// @public
export class ReceiveHandler {
    readonly isRunning: boolean;
    stop(): Promise<void>;
}

// @public
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
