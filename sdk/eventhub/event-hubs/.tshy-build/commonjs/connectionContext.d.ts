import type { Dictionary } from "rhea-promise";
import type { SasTokenProvider } from "@azure/core-amqp";
import { ConnectionContextBase } from "@azure/core-amqp";
import { ManagementClient } from "./managementClient.js";
import type { NamedKeyCredential, SASCredential, TokenCredential } from "@azure/core-auth";
import type { EventHubClientOptions } from "./models/public.js";
import { EventHubConnectionConfig } from "./eventhubConnectionConfig.js";
import type { PartitionReceiver } from "./partitionReceiver.js";
import type { EventHubSender } from "./eventHubSender.js";
import type { AbortSignalLike } from "@azure/abort-controller";
/**
 * @internal
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenProvider, senders, receivers, etc. about the EventHub client.
 */
export interface ConnectionContext extends ConnectionContextBase {
    /**
     * The EventHub connection config that is created after
     * parsing the connection string.
     */
    readonly config: EventHubConnectionConfig;
    /**
     * The credential to be used for Authentication.
     * Default value: SasTokenProvider.
     */
    tokenCredential: SasTokenProvider | TokenCredential;
    /**
     * Indicates whether the close() method was
     * called on theconnection object.
     */
    wasConnectionCloseCalled: boolean;
    /**
     * A dictionary of the EventHub Receivers associated with this client.
     */
    receivers: Dictionary<PartitionReceiver>;
    /**
     * A dictionary of the EventHub Senders associated with this client.
     */
    senders: Dictionary<EventHubSender>;
    /**
     * A reference to the management session ($management endpoint) on
     * the underlying amqp connection for the EventHub Client.
     */
    managementSession?: ManagementClient;
    /**
     * Function returning a promise that resolves once the connectionContext is ready to open an AMQP link.
     * ConnectionContext will be ready to open an AMQP link when:
     * - The AMQP connection is already open on both sides.
     * - The AMQP connection has been closed or disconnected. In this case, a new AMQP connection is expected
     * to be created first.
     * An AMQP link cannot be opened if the AMQP connection
     * is in the process of closing or disconnecting.
     */
    readyToOpenLink(options?: {
        abortSignal?: AbortSignalLike;
    }): Promise<void>;
    /**
     * Closes all AMQP links, sessions and connection.
     */
    close(): Promise<void>;
}
/**
 * Describes the members on the ConnectionContext that are only
 * used by it internally.
 * @internal
 */
export interface ConnectionContextInternalMembers extends ConnectionContext {
    /**
     * Indicates whether the connection is in the process of closing.
     * When this returns `true`, a `disconnected` event will be received
     * after the connection is closed.
     *
     */
    isConnectionClosing(): boolean;
    /**
     * Resolves once the context's connection emits a `disconnected` event.
     */
    waitForDisconnectedEvent(options?: {
        abortSignal?: AbortSignalLike;
    }): Promise<void>;
    /**
     * Resolves once the connection has finished being reset.
     * Connections are reset as part of reacting to a `disconnected` event.
     */
    waitForConnectionReset(): Promise<void>;
}
/**
 * @internal
 */
export interface ConnectionContextOptions extends EventHubClientOptions {
    managementSessionAddress?: string;
    managementSessionAudience?: string;
}
/**
 * @internal
 */
export declare namespace ConnectionContext {
    function getUserAgent(options: ConnectionContextOptions): string;
    function create(config: EventHubConnectionConfig, tokenCredential: SasTokenProvider | TokenCredential, options?: ConnectionContextOptions): ConnectionContext;
}
/**
 * Helper method to create a ConnectionContext from the input passed to either
 * EventHubProducerClient or EventHubConsumerClient constructors
 *
 * @internal
 */
export declare function createConnectionContext(hostOrConnectionString: string, eventHubNameOrOptions?: string | EventHubClientOptions, credentialOrOptions?: TokenCredential | NamedKeyCredential | SASCredential | EventHubClientOptions, options?: EventHubClientOptions): ConnectionContext;
//# sourceMappingURL=connectionContext.d.ts.map