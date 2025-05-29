import { Connection } from "rhea-promise";
import { CbsClient } from "./cbs.js";
import { ConnectionConfig } from "./connectionConfig/connectionConfig.js";
/**
 * Provides contextual information like the underlying amqp connection, cbs session, tokenProvider,
 * Connection config, data transformer, etc.
 */
export interface ConnectionContextBase {
    /**
     * The EventHub connection config that is created after
     * parsing the connection string.
     */
    readonly config: ConnectionConfig;
    /**
     * The unique lock name per connection that is used to
     * acquire the lock for establishing an amqp connection per client if one does not exist.
     */
    connectionLock: string;
    /**
     * The unique lock name per connection that is used to
     * acquire the lock for negotiating cbs claim by an entity on that connection.
     */
    negotiateClaimLock: string;
    /**
     * The underlying AMQP connection.
     */
    connection: Connection;
    /**
     * The amqp connection id that uniquely identifies the
     * connection within a process.
     */
    connectionId: string;
    /**
     * Indicates whether the close() method was
     * called on the connection object.
     */
    wasConnectionCloseCalled: boolean;
    /**
     * A reference to the cbs session ($cbs endpoint) on the
     * underlying AMQP connection for the EventHub Client.
     */
    cbsSession: CbsClient;
    /**
     * Updates the context to use a new underlying AMQP connection and new cbs session.
     */
    refreshConnection: () => void;
}
/**
 * Defines the properties that need to be set while establishing the AMQP connection.
 */
export interface ConnectionProperties {
    /**
     * The name of the product that will be populated as the AMQP
     * connection property. Example: "MSJSClient".
     */
    product: string;
    /**
     * The version of the package/sdk that is making the AMQP connection.
     */
    version: string;
    /**
     * The userAgent that needs to be set as the AMQP connection
     * property. Example: `"/js-service-bus"` or `"/js-event-hubs,/js-event-processor-host=1.0.0"`.
     */
    userAgent: string;
}
/**
 * Describes the parameters that can be provided to create the base connection context.
 */
export interface CreateConnectionContextBaseParameters {
    /**
     * The connection config that is created by parsing the
     * connection string.
     */
    config: ConnectionConfig;
    /**
     * Properties to be provided while creating
     * the AMQP connection.
     */
    connectionProperties: ConnectionProperties;
    /**
     * Determines whether entity path should be a part of
     * the connection config. If `true` it must be present, `false` otherwise. Default value false.
     */
    isEntityPathRequired?: boolean;
    /**
     * The duration in which the promise should
     * complete (resolve/reject). If it is not completed, then the Promise will be rejected after
     * timeout occurs. Default: `60000 milliseconds`.
     */
    operationTimeoutInMs?: number;
}
export declare const ConnectionContextBase: {
    /**
     * Creates the base connection context.
     * @param parameters - Parameters to be provided to create
     * the base connection context.
     */
    create(parameters: CreateConnectionContextBaseParameters): ConnectionContextBase;
};
//# sourceMappingURL=ConnectionContextBase.d.ts.map