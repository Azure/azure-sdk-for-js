import type { RetryOptions } from "@azure/core-amqp";
import type { AccessToken } from "@azure/core-auth";
import type { ConnectionContext } from "./connectionContext.js";
import type { OperationOptions } from "./util/operationOptions.js";
/**
 * Describes the runtime information of an Event Hub.
 */
export interface EventHubProperties {
    /**
     * The name of the event hub.
     */
    name: string;
    /**
     * The date and time the hub was created in UTC.
     */
    createdOn: Date;
    /**
     * The slice of string partition identifiers.
     */
    partitionIds: string[];
    /**
     * Whether the hub has geographical disaster recovery enabled.
     */
    isGeoDrEnabled: boolean;
}
/**
 * Describes the runtime information of an EventHub Partition.
 */
export interface PartitionProperties {
    /**
     * The name of the Event Hub.
     */
    eventHubName: string;
    /**
     * Identifier of the partition within the Event Hub.
     */
    partitionId: string;
    /**
     * The starting sequence number of the partition's message log.
     */
    beginningSequenceNumber: number;
    /**
     * The last sequence number of the partition's message log.
     */
    lastEnqueuedSequenceNumber: number;
    /**
     * The offset of the last enqueued message in the partition's message log.
     */
    lastEnqueuedOffset: string;
    /**
     * The time of the last enqueued message in the partition's message log in UTC.
     */
    lastEnqueuedOnUtc: Date;
    /**
     * Indicates whether the partition is empty.
     */
    isEmpty: boolean;
}
/**
 * @internal
 */
export interface ManagementClientOptions {
    address?: string;
    audience?: string;
}
/**
 * @internal
 * Describes the EventHubs Management Client that talks
 * to the $management endpoint over AMQP connection.
 */
export declare class ManagementClient {
    readonly managementLock: string;
    /**
     * The name/path of the entity (hub name) for which the management
     * request needs to be made.
     */
    private readonly entityPath;
    /**
     * The reply to Guid for the management client.
     */
    private readonly replyTo;
    /**
     * $management sender, receiver on the same session.
     */
    private _mgmtReqResLink?;
    /**
     * The address in the following form:
     * `"$management"`.
     */
    private readonly address;
    /**
     * The token audience in the following form:
     * `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/$management"`.
     */
    private readonly audience;
    /**
     * Provides relevant information about the amqp connection,
     * cbs and $management sessions, token provider, sender and receivers.
     */
    private readonly _context;
    /**
     * The authentication loop that keeps the token refreshed.
     */
    private authLoop?;
    private readonly logger;
    /**
     * Instantiates the management client.
     * @param context - The connection context.
     * @param address - The address for the management endpoint. For IotHub it will be
     * `/messages/events/$management`.
     */
    constructor(context: ConnectionContext, { address, audience }?: ManagementClientOptions);
    /**
     * Gets the security token for the management application properties.
     * @internal
     */
    getSecurityToken(): Promise<AccessToken | null>;
    /**
     * Provides the eventhub runtime information.
     */
    getEventHubProperties(options?: OperationOptions & {
        retryOptions?: RetryOptions;
    }): Promise<EventHubProperties>;
    /**
     * Provides information about the specified partition.
     * @param partitionId - Partition ID for which partition information is required.
     */
    getPartitionProperties(partitionId: string, options?: OperationOptions & {
        retryOptions?: RetryOptions;
    }): Promise<PartitionProperties>;
    /**
     * Closes the AMQP management session to the Event Hub for this client,
     * returning a promise that will be resolved when disconnection is completed.
     */
    close(): Promise<void>;
    private _init;
    /**
     * Helper method to make the management request
     * @param request - The AMQP message to send
     * @param options - The options to use when sending a request over a $management link
     */
    private _makeManagementRequest;
    private _isMgmtRequestResponseLinkOpen;
}
//# sourceMappingURL=managementClient.d.ts.map