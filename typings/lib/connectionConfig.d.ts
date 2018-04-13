export interface ConnectionConfig {
    /**
     * @property {string} endpoint - The service bus endpoint "sb://<yournamespace>.servicebus.windows.net/".
     */
    endpoint: string;
    /**
     * @property {string} host - The host "<yournamespace>.servicebus.windows.net".
     */
    host: string;
    /**
     * @property {string} connectionString - The connection string.
     */
    connectionString: string;
    /**
     * @property {string} entityPath - The name/path of the entity (hub name) to which the connection needs to happen.
     */
    entityPath?: string;
    /**
     * @property {string} sharedAccessKeyName - The name of the access key.
     */
    sharedAccessKeyName: string;
    /**
     * @property {string} sharedAccessKey - The secret value of the access key.
     */
    sharedAccessKey: string;
}
export declare namespace ConnectionConfig {
    /**
     * Creates the connection config.
     * @param {string} connectionString - The event hub connection string
     * @param {string} [path]           - The name/path of the entity (hub name) to which the connection needs to happen
     */
    function create(connectionString: string, path?: string): ConnectionConfig;
    /**
     * Validates the properties of connection config.
     * @param {ConnectionConfig} config The connection config to be validated.
     */
    function validate(config: ConnectionConfig): void;
}
