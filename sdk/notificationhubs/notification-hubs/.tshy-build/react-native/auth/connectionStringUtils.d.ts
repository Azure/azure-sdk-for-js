import { SasTokenCredential } from "./sasTokenCredential.js";
/**
 * Defines an object with possible properties defined in T.
 */
export type ParsedOutput<T> = {
    [P in keyof T]: T[P];
};
/**
 * The set of properties that comprise a Notification Hubs connection string.
 */
export interface NotificationHubsConnectionStringProperties {
    /**
     * The value for "Endpoint" in the connection string.
     */
    endpoint: string;
    /**
     * The value for "SharedAccessKey" in the connection string. This along with the "SharedAccessKeyName"
     * in the connection string is used to generate a SharedAccessSignature which can be used authorize
     * the connection to the service.
     */
    sharedAccessKey: string;
    /**
     * The value for "SharedAccessKeyName" in the connection string. This along with the "SharedAccessKey"
     * in the connection string is used to generate a SharedAccessSignature which can be used authorize
     * the connection to the service.
     */
    sharedAccessKeyName: string;
}
/**
 * Creates a SasTokenCredential from a shared access key and shared access key name.
 * @param sharedAccessKey - The shared access key value.
 * @param sharedAccessKeyName - The shared access key name.
 * @returns A SasTokenCredential with the given shared access token information.
 */
export declare function createTokenCredentialFromConnection(sharedAccessKey: string, sharedAccessKeyName: string): SasTokenCredential;
/**
 * Parses given connection string into the different properties applicable to Azure Service Bus.
 * The properties are useful to then construct a ServiceBusClient.
 * @param connectionString - The connection string associated with the Shared Access Policy created
 * for the Service Bus namespace, queue or topic.
 */
export declare function parseNotificationHubsConnectionString(connectionString: string): NotificationHubsConnectionStringProperties;
//# sourceMappingURL=connectionStringUtils.d.ts.map