import { ConnectionConfig } from "@azure/core-amqp";
/**
 * Describes the connection config object that is created after parsing an EventHub connection
 * string. It also provides some convenience methods for getting the address and audience for
 * different entities.
 * @internal
 */
export interface EventHubConnectionConfig extends ConnectionConfig {
    /**
     * The name/path of the entity (event hub name) to which the
     * connection needs to happen.
     */
    entityPath: string;
    /**
     * Provides the EventHub Sender address in one of the following forms based on the input:
     * - `"<hubName>"`
     * - `"<hubName>/Partitions/<partitionId>"`
     *
     * @param partitionId - The partitionId in the EventHub to which messages will be sent.
     */
    getSenderAddress(partitionId?: string | number): string;
    /**
     * Provides the EventHub Sender audience in one of the following forms based on the input:
     * - `"sb://<yournamespace>.servicebus.windows.net/<hubName>"`
     * - `"sb://<yournamespace>.servicebus.windows.net/<hubName>/Partitions/<partitionId>"`
     *
     * @param partitionId - The partitionId in the EventHub to which messages will be sent.
     */
    getSenderAudience(partitionId?: string | number): string;
    /**
     * Provides the EventHub Receiver address:
     * - `"<hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`
     *
     * @param partitionId - The partitionId in the EventHub from which messages will be received.
     * @param consumergroup - The consumergroup in the EventHub from which the messages will
     * be received. Default: `$default`.
     */
    getReceiverAddress(partitionId: string | number, consumergroup?: string): string;
    /**
     * Provides the EventHub Receiver audience.
     * - `"sb://<your-namespace>.servicebus.windows.net/<hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`
     *
     * @param partitionId - The partitionId in the EventHub from which messages will be received.
     * @param consumergroup - The consumergroup in the EventHub from which the messages will
     * be received. Default: `$default`.
     */
    getReceiverAudience(partitionId: string | number, consumergroup?: string): string;
    /**
     * Provides the EventHub Management address.
     * - `"<hub-name>/$management"`
     */
    getManagementAddress(): string;
    /**
     * Provides the EventHub Management audience.
     * - `"sb://<your-namespace>.servicebus.windows.net/<hub-name>/$management"`
     */
    getManagementAudience(): string;
}
/**
 * Describes the connection config object that is created after parsing an EventHub connection
 * string. It also provides some convenience methods for getting the address and audience for
 * different entities.
 * @internal
 */
export declare const EventHubConnectionConfig: {
    /**
     * Creates the connection config.
     * @param connectionString - The connection string for a given service like
     * EventHub/ServiceBus.
     * @param path - The name/path of the entity (hub name) to which the
     * connection needs to happen. This will override the EntityPath in the connectionString
     * if present.
     * @returns EventHubConnectionConfig
     */
    create(connectionString: string, path?: string): EventHubConnectionConfig;
    /**
     * Creates an EventHubConnectionConfig from the provided base ConnectionConfig.
     * @param config - The base connection config from which the EventHubConnectionConfig needs to be
     * created.
     * @returns EventHubConnectionConfig
     */
    createFromConnectionConfig(config: ConnectionConfig): EventHubConnectionConfig;
    /**
     * Updates the provided EventHubConnectionConfig to use the custom endpoint address.
     * @param config - An existing connection configuration to be updated.
     * @param customEndpointAddress - The custom endpoint address to use.
     */
    setCustomEndpointAddress(config: EventHubConnectionConfig, customEndpointAddress: string): void;
    /**
     * Validates the properties of connection config.
     * @param config - The connection config to be validated.
     * @returns void
     */
    validate(config: EventHubConnectionConfig): void;
};
//# sourceMappingURL=eventhubConnectionConfig.d.ts.map