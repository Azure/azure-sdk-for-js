import { ConnectionConfig } from ".";
import { EventHubReceiver } from "./eventHubReceiver";
import { EventHubSender } from "./eventHubSender";
import { TokenProvider } from "./auth/token";
import { ManagementClient } from "./managementClient";
import { CbsClient } from "./cbs";
/**
 * @interface ConnectionContext
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenProvider, senders, receivers, etc. about the EventHub client.
 */
export interface ConnectionContext {
    /**
     * @property {ConnectionConfig} config The EventHub connection config that is created after parsing the connection string.
     */
    readonly config: ConnectionConfig;
    /**
     * @property {any} [connection] The underlying AMQP connection.
     */
    connection?: any;
    /**
     * @property {string} [connectionId] The amqp connection id that uniquely identifies the connection within a process.
     */
    connectionId?: string;
    /**
     * @property {TokenProvider} tokenProvider The TokenProvider to be used for getting tokens for authentication for the EventHub client.
     */
    readonly tokenProvider: TokenProvider;
    /**
     * @property {Dictionary<EventHubReceiver<} receivers A dictionary of the EventHub Receivers associated with this client.
     */
    receivers: {
        [x: string]: EventHubReceiver;
    };
    /**
     * @property {Dictionary<EventHubSender>} senders A dictionary of the EventHub Senders associated with this client.
     */
    senders: {
        [x: string]: EventHubSender;
    };
    /**
     * @property {ManagementClient} managementSession A reference to the management session ($management endpoint) on
     * the underlying amqp connection for the EventHub Client.
     */
    readonly managementSession: ManagementClient;
    /**
     * @property {CbsClient} cbsSession A reference to the cbs session ($cbs endpoint) on the underlying
     * the amqp connection for the EventHub Client.
     */
    readonly cbsSession: CbsClient;
    /**
     * @property {string} connectionLock The unqiue lock name per connection that is used to acquire the lock
     * for establishing an aqmp connection per client if one does not exist.
     */
    readonly connectionLock: string;
    /**
     * @property {string} negotiateClaimLock The unqiue lock name per connection that is used to acquire the lock
     * for negotiating cbs claim by an entity on that connection.
     */
    readonly negotiateClaimLock: string;
}
export declare namespace ConnectionContext {
    /**
     * @property {string} userAgent The user agent string for the event hub client. Constant value: "/js-event-hubs".
     */
    const userAgent: string;
    function create(config: ConnectionConfig, tokenProvider?: TokenProvider): ConnectionContext;
}
