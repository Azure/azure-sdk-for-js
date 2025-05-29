import type { AbortSignalLike } from "@azure/abort-controller";
import type { Connection, EventContext, Receiver, ReceiverOptions, ReqResLink, Message as RheaMessage, Sender, SenderOptions, Session } from "rhea-promise";
/**
 * Describes the options that can be specified while sending a request.
 */
export interface SendRequestOptions {
    /**
     * Cancels the operation.
     */
    abortSignal?: AbortSignalLike;
    /**
     * Max time to wait for the operation to complete.
     * Default: `60000 milliseconds`.
     */
    timeoutInMs?: number;
    /**
     * Name of the request being performed.
     */
    requestName?: string;
}
/**
 * @internal
 */
export interface DeferredPromiseWithCallback {
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
    /**
     * To be called before resolving or rejecting the deferred promise
     */
    cleanupBeforeResolveOrReject: () => void;
}
/**
 * Describes an amqp request(sender)-response(receiver) link that is created over an amqp session.
 */
export declare class RequestResponseLink implements ReqResLink {
    session: Session;
    sender: Sender;
    receiver: Receiver;
    /**
     * @param session - The amqp session.
     * @param sender - The amqp sender link.
     * @param receiver - The amqp receiver link.
     */
    constructor(session: Session, sender: Sender, receiver: Receiver);
    /**
     * Maintains a map of responses that
     * are being actively returned. It acts as a store for correlating the responses received for
     * the send requests.
     */
    private _responsesMap;
    /**
     * Provides the underlying amqp connection object.
     * @returns Connection.
     */
    get connection(): Connection;
    /**
     * Indicates whether the session and the sender and receiver links are all open or closed.
     * @returns boolean - `true` - `open`, `false` - `closed`.
     */
    isOpen(): boolean;
    /**
     * Sends the given request message and returns the received response. If the operation is not
     * completed in the provided timeout in milliseconds `default: 60000`, then `OperationTimeoutError` is thrown.
     *
     * @param request - The AMQP (request) message.
     * @param options - Options that can be provided while sending a request.
     * @returns Promise<Message> The AMQP (response) message.
     */
    sendRequest(request: RheaMessage, options?: SendRequestOptions): Promise<RheaMessage>;
    /**
     * Closes the sender, receiver link and the underlying session.
     * @returns Promise<void>
     */
    close(): Promise<void>;
    /**
     * Removes the sender, receiver link and it's underlying session.
     * @returns void
     */
    remove(): void;
    /**
     * Creates an amqp request/response link.
     *
     * @param connection - The amqp connection.
     * @param senderOptions - Options that must be provided to create the sender link.
     * @param receiverOptions - Options that must be provided to create the receiver link.
     * @param createOptions - Optional parameters that can be used to affect this method's behavior.
     *    For example, `abortSignal` can be passed to allow cancelling an in-progress `create` invocation.
     * @returns Promise<RequestResponseLink>
     */
    static create(connection: Connection, senderOptions: SenderOptions, receiverOptions: ReceiverOptions, createOptions?: {
        abortSignal?: AbortSignalLike;
    }): Promise<RequestResponseLink>;
}
/**
 * @internal
 *
 * Type used in getCodeDescriptionAndError to get the normalized info from the responses emitted by EventHubs and ServiceBus.
 */
type NormalizedInfo = {
    statusCode: number;
    statusDescription: string;
    errorCondition: string;
};
/**
 * @internal
 *
 * Handle different variations of property names in responses emitted by EventHubs and ServiceBus.
 */
export declare const getCodeDescriptionAndError: (props?: {
    [key: string]: string | number | undefined;
}) => NormalizedInfo;
/**
 * This is used as the onMessage handler for the "message" event on the receiver.
 *
 * (This is inspired from the message settlement sequence in service-bus SDK which
 * relies on a single listener for settled event for all the messages.)
 * The sequence is as follows:
 * 1. User calls `await RequestResponseLink.sendRequest()`
 * 2. This creates a `Promise` that gets stored in the _responsesMap
 * 3. When the service acknowledges the response, this method gets called for that request.
 * 4. We resolve() the promise from the _responsesMap with the message.
 * 5. User's code after the sendRequest continues.
 *
 * @internal
 */
export declare function onMessageReceived(context: Pick<EventContext, "message">, connectionId: string, responsesMap: Map<string, DeferredPromiseWithCallback>): void;
export {};
//# sourceMappingURL=requestResponseLink.d.ts.map