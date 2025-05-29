import type { AbortSignalLike } from "@azure/abort-controller";
import type { Connection } from "rhea-promise";
import type { TokenType } from "./auth/token.js";
/**
 * Describes the CBS Response.
 */
export interface CbsResponse {
    correlationId: string;
    statusCode: string;
    statusDescription: string;
}
/**
 * Describes the EventHub/ServiceBus Cbs client that talks to the $cbs endpoint over AMQP connection.
 */
export declare class CbsClient {
    /**
     * CBS endpoint - "$cbs"
     */
    readonly endpoint: string;
    /**
     * CBS replyTo - The receiver link name that the service should reply to.
     */
    readonly replyTo: string;
    /**
     * The unique lock name per $cbs session per connection that is used to
     * acquire the lock for establishing a cbs session if one does not exist for an amqp connection.
     */
    readonly cbsLock: string;
    /**
     * The unique lock name per connection that is used to
     * acquire the lock for establishing an amqp connection if one does not exist.
     */
    readonly connectionLock: string;
    /**
     * The AMQP connection.
     */
    connection: Connection;
    /**
     * CBS sender, receiver on the same session.
     */
    private _cbsSenderReceiverLink?;
    /**
     * @param connection - The AMQP connection.
     * @param connectionLock - A unique string (usually a guid) per connection.
     */
    constructor(connection: Connection, connectionLock: string);
    /**
     * Creates a singleton instance of the CBS session if it hasn't been initialized previously on
     * the given connection.
     * @param options - Optional parameters that can be used to affect this method's behavior.
     *    For example, `abortSignal` can be passed to allow cancelling an in-progress `init` invocation.
     * @returns Promise<void>.
     */
    init(options?: {
        abortSignal?: AbortSignalLike;
        timeoutInMs?: number;
    }): Promise<void>;
    /**
     * Negotiates the CBS claim with the EventHub/ServiceBus Service.
     * @param audience - The entity token audience for which the token is requested in one
     * of the following forms:
     *
     * - **ServiceBus**
     *    - **Sender**
     *        - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
     *        - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
     *
     *    - **Receiver**
     *         - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
     *         - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
     *
     *    - **ManagementClient**
     *         - `"sb://<your-namespace>.servicebus.windows.net/<queue-name>/$management"`.
     *         - `"sb://<your-namespace>.servicebus.windows.net/<topic-name>/$management"`.
     *
     * - **EventHubs**
     *     - **Sender**
     *          - `"sb://<yournamespace>.servicebus.windows.net/<hubName>"`
     *          - `"sb://<yournamespace>.servicebus.windows.net/<hubName>/Partitions/<partitionId>"`.
     *
     *     - **Receiver**
     *         - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/ConsumerGroups/<consumer-group-name>/Partitions/<partition-id>"`.
     *
     *     - **ManagementClient**
     *         - `"sb://<your-namespace>.servicebus.windows.net/<event-hub-name>/$management"`.
     * @param token - The token that needs to be sent in the put-token request.
     * @param tokenType - The type of token being used. For example, 'jwt' or 'servicebus.windows.net:sastoken'.
     * @param options - Optional parameters that can be used to affect this method's behavior.
     *    For example, `abortSignal` can be passed to allow cancelling an in-progress `negotiateClaim` invocation.
     * @returns A Promise that resolves when $cbs authentication is successful
     * and rejects when an error occurs during $cbs authentication.
     */
    negotiateClaim(audience: string, token: string, tokenType: TokenType, options?: {
        abortSignal?: AbortSignalLike;
        timeoutInMs?: number;
    }): Promise<CbsResponse>;
    /**
     * Closes the AMQP cbs session to the EventHub/ServiceBus for this client,
     * returning a promise that will be resolved when disconnection is completed.
     * @returns
     */
    close(): Promise<void>;
    /**
     * Removes the AMQP cbs session to the EventHub/ServiceBus for this client,
     * @returns void
     */
    remove(): void;
    /**
     * Indicates whether the cbs sender receiver link is open or closed.
     * @returns `true` open, `false` closed.
     */
    isOpen(): boolean;
    private _fromRheaMessageResponse;
}
//# sourceMappingURL=cbs.d.ts.map