import type { OnAmqpEventAsPromise, ReceiveOptions } from "./messageReceiver.js";
import { MessageReceiver } from "./messageReceiver.js";
import type { ConnectionContext } from "../connectionContext.js";
import type { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs.js";
import type { AmqpError } from "rhea-promise";
import type { InternalMessageHandlers, MessageHandlers, SubscribeOptions } from "../models.js";
/**
 * @internal
 */
export interface StreamingReceiverInitArgs extends ReceiveOptions, Pick<OperationOptionsBase, "abortSignal"> {
    messageHandlers: MessageHandlers;
}
/**
 * @internal
 * Describes the streaming receiver where the user can receive the message
 * by providing handler functions.
 */
export declare class StreamingReceiver extends MessageReceiver {
    /**
     * The maximum number of messages that should be
     * processed concurrently while in streaming mode. Once this limit has been reached, more
     * messages will not be received until the user's message handler has completed processing current message.
     * Default: 1
     */
    maxConcurrentCalls: number;
    /**
     * Indicates whether the receiver is already actively
     * running `onDetached`.
     * This is expected to be true while the receiver attempts
     * to bring its link back up due to a retryable issue.
     */
    private _isDetaching;
    /**
     *Retry policy options that determine the mode, number of retries, retry interval etc.
     */
    private _retryOptions;
    private _receiverHelper;
    /**
     * The user's message handlers, wrapped so any thrown exceptions are properly logged
     * or forwarded to the user's processError handler.
     */
    private _messageHandlers;
    /**
     * The subscribe(options) passed when the subscribe call originally happened. Stored
     * so _subscribeImpl() can re-use them later if we have to restart our subscription
     * when detach/reattaching.
     */
    private _subscribeOptions;
    /**
     * Used so we can stub out retry in tests.
     */
    private _retryForeverFn;
    /**
     * The message handler that will be set as the handler on the
     * underlying rhea receiver for the "receiver_close" event.
     */
    private _onAmqpClose;
    /**
     * The message handler that will be set as the handler on
     * the underlying rhea receiver's session for the "session_close" event.
     */
    private _onSessionClose;
    /**
     * The message handler that will be set as the handler on
     * the underlying rhea receiver's session for the "session_error" event.
     */
    private _onSessionError;
    /**
     * The message handler that will be set as the handler on the
     * underlying rhea receiver for the "receiver_error" event.
     */
    private _onAmqpError;
    /**
     * The message handler that will be set as the handler on the
     * underlying rhea receiver for the "message" event.
     */
    protected _onAmqpMessage: OnAmqpEventAsPromise;
    /**
     * Whether we are currently subscribed (or subscribing) for receiving messages.
     * (this is irrespective of receiver state, etc... - it's just a simple flag to prevent
     * multiple subscribe() calls from happening on this instance)
     */
    get isSubscribeActive(): boolean;
    /**
     * Instantiate a new Streaming receiver for receiving messages with handlers.
     *
     * @param identifier - the name used to identifier the receiver
     * @param connectionContext - The client entity context.
     * @param options - Options for how you'd like to connect.
     */
    constructor(identifier: string, connectionContext: ConnectionContext, entityPath: string, options: ReceiveOptions);
    private _reportInternalError;
    private _getHandlers;
    stopReceivingMessages(): Promise<void>;
    close(): Promise<void>;
    private _subscribeCallPromise;
    /**
     * Starts the receiver by establishing an AMQP session and an AMQP receiver link on the session.
     *
     * Any errors thrown by this function will also be sent to the messageHandlers.processError function
     * _and_ thrown, ultimately from this method.
     *
     * NOTE: This function retries _infinitely_ until success! It is completely up to the user to break
     * out of this retry cycle otherwise by:
     * 1. closing the receiver
     * 2. Calling `close` on the subscription instance they received when they initially called subscribe().
     * 3. aborting the abortSignal they passed in when calling subscribe (this also applies to initialization calls in onDetach)
     *
     * @param onMessage - The message handler to receive servicebus messages.
     * @param onError - The error handler to receive an error that occurs while receivin messages.
     */
    subscribe(messageHandlers: InternalMessageHandlers, subscribeOptions: SubscribeOptions | undefined): Promise<void>;
    /**
     * Wraps the individual message handlers with tracing and proper error handling
     * and assigns them to `this._messageHandlers`
     *
     * @param userHandlers - The user's message handlers
     * @param operationOptions - The subscribe(options)
     */
    private _setMessageHandlers;
    /**
     * Subscribes using the already assigned `this._messageHandlers` and `this._subscribeOptions`
     *
     * @returns A promise that will resolve when a link is created and we successfully add credits to it.
     */
    private _subscribeImpl;
    /**
     * Initializes the link and adds credits. If any of these operations fail any created link will
     * be closed.
     *
     * @param caller - The caller which dictates whether or not we create a new name for our created link.
     * @param catchAndReportError - A function and reports an error but does not throw it.
     */
    private _initAndAddCreditOperation;
    /**
     * Will reconnect the receiver link if necessary.
     * @param receiverError - The receiver error or connection error, if any.
     */
    onDetached(receiverError?: AmqpError | Error): Promise<void>;
    protected removeLinkFromContext(): void;
}
//# sourceMappingURL=streamingReceiver.d.ts.map