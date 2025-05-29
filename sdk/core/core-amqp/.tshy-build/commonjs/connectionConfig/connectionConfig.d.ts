import type { WebSocketImpl } from "rhea-promise";
/**
 * Describes the options that can be provided while creating a connection config.
 */
export interface ConnectionConfigOptions {
    /**
     * Indicates whether the entity path is required in the
     * connection config.
     */
    isEntityPathRequired?: boolean;
}
/**
 * Describes the connection config object that is created after parsing an EventHub or ServiceBus
 * connection string.
 */
export interface ConnectionConfig {
    /**
     * The service bus endpoint
     * "sb://<yournamespace>.servicebus.windows.net/".
     */
    endpoint: string;
    /**
     * The DNS hostname or IP address of the service.
     * Typically of the form "<yournamespace>.servicebus.windows.net" unless connecting
     * to the service through an intermediary.
     */
    host: string;
    /**
     * The fully qualified name of the host to connect to.
     * This field can be used by AMQP proxies to determine the correct back-end service to
     * connect the client to.
     * Typically of the form "<yournamespace>.servicebus.windows.net".
     */
    amqpHostname?: string;
    /**
     * The port number.
     */
    port?: number;
    /**
     * The connection string.
     */
    connectionString: string;
    /**
     * The name/path of the entity (hub/queue/topic name) to which the
     * connection needs to happen.
     */
    entityPath?: string;
    /**
     * The name of the access key.
     */
    sharedAccessKeyName: string;
    /**
     * The secret value of the access key.
     */
    sharedAccessKey: string;
    /**
     * The WebSocket constructor used to create an AMQP connection
     * over a WebSocket. In browsers, the built-in WebSocket will be  used by default. In Node, a
     * TCP socket will be used if a WebSocket constructor is not provided.
     */
    webSocket?: WebSocketImpl;
    /**
     * The path for the endpoint that accepts an AMQP
     * connection over WebSockets.
     */
    webSocketEndpointPath?: string;
    /**
     * Options to be passed to the WebSocket constructor
     */
    webSocketConstructorOptions?: any;
    /**
     * This should be true only if the connection string contains the slug ";UseDevelopmentEmulator=true"
     * and the endpoint is a loopback address.
     */
    useDevelopmentEmulator?: boolean;
}
/**
 * Describes the ConnectionConfig module
 */
export declare const ConnectionConfig: {
    /**
     * Creates the connection config.
     * @param connectionString - The connection string for a given service like
     * EventHub/ServiceBus.
     * @param path - The name/path of the entity (hub name) to which the
     * connection needs to happen. This will override the EntityPath in the connectionString
     * if present.
     * @returns ConnectionConfig
     */
    create(connectionString: string, path?: string): ConnectionConfig;
    /**
     * Validates the properties of connection config.
     * @param config - The connection config to be validated.
     * @returns void
     */
    validate(config: ConnectionConfig, options?: ConnectionConfigOptions): void;
};
/**
 * @internal
 */
export declare function isSharedAccessSignature(connectionString: string): boolean;
//# sourceMappingURL=connectionConfig.d.ts.map