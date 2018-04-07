export interface EventHubRuntimeInformation {
    /**
     * @property {string} path - The name of the event hub.
     */
    path: string;
    /**
     * @property {Date} createdAt - The date and time the hub was created in UTC.
     */
    createdAt: Date;
    /**
     * @property {number} partitionCount - The number of partitions in the event hub.
     */
    partitionCount: number;
    /**
     * @property {string[]} partitionIds - The slice of string partition identifiers.
     */
    partitionIds: string[];
    /**
     * @property {string} type - The type of entity.
     */
    type: "com.microsoft:eventhub";
}
export interface EventHubPartitionRuntimeInformation {
    /**
     * @property {string} hubPath - The name of the eventhub.
     */
    hubPath: string;
    /**
     * @property {string} partitionId - Identifier of the partition within the eventhub.
     */
    partitionId: string;
    /**
     * @property {number} beginningSequenceNumber - The starting sequence number of the partition's message log.
     */
    beginningSequenceNumber: number;
    /**
     * @property {number} lastSequenceNumber - The last sequence number of the partition's message log.
     */
    lastSequenceNumber: number;
    /**
     * @property {string} lastEnqueuedOffset - The offset of the last enqueued message in the partition's message log.
     */
    lastEnqueuedOffset: string;
    /**
     * @property {Date} lastEnqueuedTimeUtc - The time of the last enqueued message in the partition's message log in UTC.
     */
    lastEnqueuedTimeUtc: Date;
    /**
     * @property {string} type - The type of entity.
     */
    type: "com.microsoft:partition";
}
/**
 * @class ManagementClient
 * Descibes the EventHubs Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
export declare class ManagementClient {
    entityPath: string;
    readonly managementLock: string;
    /**
     * $management sender, receiver on the same session.
     */
    private _mgmgtReqResLink?;
    /**
     * @constructor
     * Instantiates the management client.
     * @param entityPath - The name/path of the entity (hub name) for which the management request needs to be made.
     */
    constructor(entityPath: string);
    /**
     * Provides the eventhub runtime information.
     * @method getHubRuntimeInformation
     * @param {Connection} connection - The established amqp connection
     * @returns {Promise<EventHubRuntimeInformation>}
     */
    getHubRuntimeInformation(connection: any): Promise<EventHubRuntimeInformation>;
    /**
     * Provides an array of partitionIds.
     * @method getPartitionIds
     * @param {Connection} connection - The established amqp connection
     * @returns {Promise<Array<string>>}
     */
    getPartitionIds(connection: any): Promise<Array<string>>;
    /**
     * Provides information about the specified partition.
     * @method getPartitionInformation
     * @param {Connection} connection - The established amqp connection
     * @param {(string|number)} partitionId Partition ID for which partition information is required.
     */
    getPartitionInformation(connection: any, partitionId: string | number): Promise<EventHubPartitionRuntimeInformation>;
    /**
     * Closes the AMQP management session to the Event Hub for this client,
     * returning a promise that will be resolved when disconnection is completed.
     * @return {Promise<void>}
     */
    close(): Promise<void>;
    private _init(connection, endpoint, replyTo);
    /**
     * @private
     * Helper method to make the management request
     * @param {Connection} connection - The established amqp connection
     * @param {string} type - The type of entity requested for. Valid values are "eventhub", "partition"
     * @param {string | number} [partitionId] - The partitionId. Required only when type is "partition".
     */
    private _makeManagementRequest(connection, type, partitionId?);
}
