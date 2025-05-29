import type { MockServerOptions } from "../server/mockServer.js";
export interface IMockEventHub {
    readonly partitionIds: string[];
    readonly consumerGroups: Set<string>;
    readonly port: number;
    start: () => Promise<void>;
    stop: () => Promise<void>;
}
export interface MockEventHubOptions extends MockServerOptions {
    /**
     * The number of partitions for the Event Hub.
     * Defaults to 2.
     */
    partitionCount?: number;
    /**
     * The name of the Event Hub.
     */
    name: string;
    /**
     * The consumer groups available for receiving.
     * `$default` is always available.
     */
    consumerGroups?: string[];
    /**
     * The amount of time in ms to wait while the connection is
     * inactive before force closing the connection.
     */
    connectionInactivityTimeoutInMs?: number;
}
/**
 * `MockEventHub` represents a mock EventHubs service.
 *
 * It stores events in memory and does not perform any auth verification.
 */
export declare class MockEventHub implements IMockEventHub {
    /**
     * When the EventHub was 'created'.
     */
    private _createdOn;
    /**
     * The name of the Event Hub.
     */
    private _name;
    /**
     * The number of partitions the Event Hub supports.
     */
    private _partitionCount;
    /**
     * Any additional consumer groups (beyond `$default`) the Event Hub supports.
     */
    private _consumerGroups;
    /**
     * The underlying AMQP server used to communicate to clients.
     */
    private _mockServer;
    /**
     * The `MessageStore` that stores messages sent by clients to the Event Hub.
     */
    private _messageStore;
    /**
     * This provides convenient access to a `Sender`'s `StreamingPartitionSender`
     * so that we can stop it when a `Sender` is closed.
     */
    private _streamingPartitionSenderMap;
    private _connectionInactivityTimeoutInMs;
    private _connections;
    private _clearableTimeouts;
    /**
     * This provides a way to find all the partition senders for a combination
     * of `consumerGroup` and `partitionId`.
     *
     * This is needed to support `ownerLevel` (epoch).
     */
    private _consumerGroupPartitionSenderMap;
    /**
     * The Event Hub's partition ids.
     */
    get partitionIds(): string[];
    /**
     * The full Set of consumer groups the Event Hub supports.
     */
    get consumerGroups(): Set<string>;
    /**
     * The port number the service is listening on.
     * Returns `-1` if the service is not currently listening.
     */
    get port(): number;
    /**
     * Instantiates a `MockEventHub` using the provided options.
     * @param options - The options to instantiate the MockEventHub with.
     */
    constructor(options: MockEventHubOptions);
    private _handleConnectionInactivity;
    /**
     * The event handler for when the service creates a `Receiver` link.
     *
     * This is done in response to the client opening a `Sender` link.
     * @param event -
     */
    private _handleReceiverOpen;
    /**
     * The event handler for when the service creates a `Sender` link.
     *
     * This is done in response to the client opening a `Receiver` link.
     * @param event -
     */
    private _handleSenderOpen;
    /**
     * The event handler for when the service closes a `Sender` link.
     *
     * This is done in response to the client closing a `Receiver` link,
     * or the service closing the `Sender` link.
     * @param event -
     */
    private _handleSenderClose;
    /**
     * The event handler for when the service closes a connection.
     *
     * This is done when a client explicitly closes or is disconnected.
     * @param event -
     */
    private _handleConnectionClose;
    /**
     * The event handler for when the service receives a message.
     *
     * Messages are not automatically accepted/rejected.
     * @param event -
     */
    private _handleOnMessages;
    /**
     * Handles responding to CBS messages.
     * @param event -
     */
    private _handleCbsMessage;
    /**
     * Handles responding to Management READ EventHubs messages.
     * @param event -
     */
    private _handleHubRuntimeInfoMessage;
    /**
     * Handles responding to Management READ Partition messages.
     * @param event -
     */
    private _handlePartitionInfoMessage;
    /**
     * Handles storing and accepting/rejecting messages sent from a client to a partition.
     * @param event -
     * @param partitionId -
     */
    private _handleReceivedMessage;
    /**
     * Gets the Sender's `ownerLevel`, if it has one.
     * @param sender -
     */
    private _getSenderOwnerLevel;
    /**
     * Stores the partition sender based on its consumerGroup and partitionId.
     *
     * Note: Partition senders are used to send messages to a client receiver that
     * is listening on a consumerGroup/partitionId combination.
     * @param consumerGroup -
     * @param partitionId -
     * @param sender -
     */
    private _storePartitionSender;
    /**
     * Removes the partition sender based on its consumerGroup and partitionId.
     *
     * @param consumerGroup -
     * @param partitionId -
     * @param sender -
     */
    private _deletePartitionSender;
    /**
     * Checks if the `Sender` is allowed to be created based on its `ownerLevel`
     * compared to other `Sender`s that exist on the same consumerGroup/partitionId.
     *
     * Returns `true` is the sender is allowed to be created, `false` otherwise.
     *
     * If the `Sender` is allowed to be created and does have an `ownerLevel`,
     * any existing `Sender`s with the same consumerGroup/partitionId will be closed.
     * @param consumerGroup -
     * @param partitionId -
     * @param sender -
     */
    private _handleSenderOwnerLevel;
    /**
     * Stores a message in the `MessageStore`.
     *
     * If a `partitionId` is not provided, a partition will be assigned
     * either based on the `partitionKey` if it is available, or at random.
     * @param message -
     * @param partitionId -
     */
    private _storeMessage;
    /**
     * A very hacky 'hash' function to calculate a `partitionId` from a `partitionKey`.
     * @param partitionKey -
     */
    private _partitionIdFromKey;
    /**
     * Validates whether the partition sender can be created.
     *
     * @param entityComponents -
     * @param sender -
     * @param context -
     */
    private _handlePartitionSenderOpenValidation;
    /**
     * Starts the service.
     */
    start(): Promise<void>;
    /**
     * Stops the service.
     */
    stop(): Promise<void>;
    private _parseReceiverPartitionEntityPath;
    private _parseSenderPartitionEntityPath;
    private isValidCbsAuth;
    private _isReceiverPartitionEntityPath;
    private _isSenderPartitionEntityPath;
}
//# sourceMappingURL=eventHubs.d.ts.map