import type { ConnectionConfig, SasTokenProvider } from "@azure/core-amqp";
import { ConnectionContextBase } from "@azure/core-amqp";
import type { TokenCredential } from "@azure/core-auth";
import type { ServiceBusClientOptions } from "./constructorHelpers.js";
import type { MessageSender } from "./core/messageSender.js";
import type { MessageSession } from "./session/messageSession.js";
import type { MessageReceiver } from "./core/messageReceiver.js";
import { ManagementClient } from "./core/managementClient.js";
/**
 * @internal
 * Provides contextual information like the underlying amqp connection, cbs session, management session,
 * tokenCredential, senders, receivers, etc. about the ServiceBus client.
 */
export interface ConnectionContext extends ConnectionContextBase {
    /**
     * The credential to be used for Authentication.
     * Default value: SasTokenProvider.
     */
    tokenCredential: SasTokenProvider | TokenCredential;
    /**
     * A map of active Service Bus Senders with sender name as key.
     */
    senders: {
        [name: string]: MessageSender;
    };
    /**
     * A map of active Service Bus receivers for non session enabled queues/subscriptions
     * with receiver name as key.
     */
    messageReceivers: {
        [name: string]: MessageReceiver;
    };
    /**
     * A map of active Service Bus receivers for session enabled queues/subscriptions
     * with receiver name as key.
     */
    messageSessions: {
        [name: string]: MessageSession;
    };
    /**
     * A map of ManagementClient instances for operations over the $management link
     * with key as the entity path.
     */
    managementClients: {
        [name: string]: ManagementClient;
    };
    /**
     * Function returning a promise that resolves once the connectionContext is ready to open an AMQP link.
     * ConnectionContext will be ready to open an AMQP link when:
     * - The AMQP connection is already open on both sides.
     * - The AMQP connection has been closed or disconnected. In this case, a new AMQP connection is expected
     * to be created first.
     * An AMQP link cannot be opened if the AMQP connection
     * is in the process of closing or disconnecting.
     */
    readyToOpenLink(): Promise<void>;
    /**
     * Fetches the receiver from the cache in ConnectionContext based on the receiverName given.
     * Useful for when a message needs to be settled or have its lock renewed.
     *
     * TODO: Track the right receiver on the message instead of the ConnectionContext to remove
     * the need for this helper.
     */
    getReceiverFromCache(receiverName: string, sessionId?: string): MessageReceiver | MessageSession | undefined;
    /**
     * Gets the management client for given entity path from the cache
     * Creates one if none exists in the cache
     */
    getManagementClient(entityPath: string): ManagementClient;
    /**
     * Indicates whether the connection is in the process of closing.
     * When this returns `true`, a `disconnected` event will be received
     * after the connection is closed.
     */
    isConnectionClosing(): boolean;
}
/**
 * Describes the members on the ConnectionContext that are only
 * used by it internally.
 * @hidden
 * @internal
 */
export interface ConnectionContextInternalMembers extends ConnectionContext {
    /**
     * Resolves once the context's connection emits a `disconnected` event.
     */
    waitForDisconnectedEvent(): Promise<void>;
    /**
     * Resolves once the connection has finished being reset.
     * Connections are reset as part of reacting to a `disconnected` event.
     */
    waitForConnectionReset(): Promise<void>;
}
/**
 * @internal
 */
export declare namespace ConnectionContext {
    function create(config: ConnectionConfig, tokenCredential: SasTokenProvider | TokenCredential, options?: ServiceBusClientOptions): ConnectionContext;
    /**
     * Closes the AMQP connection created by this ServiceBusClient along with AMQP links for
     * sender/receivers created by the queue/topic/subscription clients created by this
     * ServiceBusClient.
     * Once closed,
     * - the clients created by this ServiceBusClient cannot be used to send/receive messages anymore.
     * - this ServiceBusClient cannot be used to create any new queues/topics/subscriptions clients.
     */
    function close(context: ConnectionContext): Promise<void>;
}
//# sourceMappingURL=connectionContext.d.ts.map