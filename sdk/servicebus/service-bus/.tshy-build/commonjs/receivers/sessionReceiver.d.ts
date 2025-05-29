import type { ConnectionContext } from "../connectionContext.js";
import type { MessageHandlers, ReceiveMessagesOptions, ServiceBusReceivedMessage } from "../index.js";
import type { PeekMessagesOptions, GetMessageIteratorOptions, SubscribeOptions, DeleteMessagesOptions, PurgeMessagesOptions } from "../models.js";
import type { MessageSession } from "../session/messageSession.js";
import type { ServiceBusReceiver } from "./receiver.js";
import type Long from "long";
import type { DeadLetterOptions } from "../serviceBusMessage.js";
import type { RetryOptions } from "@azure/core-amqp";
import type { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs.js";
/**
 *A receiver that handles sessions, including renewing the session lock.
 */
export interface ServiceBusSessionReceiver extends ServiceBusReceiver {
    /**
     * The session ID.
     */
    readonly sessionId: string;
    /**
     * The time in UTC until which the session is locked.
     * Every time `renewSessionLock()` is called, this time gets updated to current time plus the lock
     * duration as specified during the Queue/Subscription creation.
     *
     * Will return undefined until a AMQP receiver link has been successfully set up for the session.
     *
     * @readonly
     */
    readonly sessionLockedUntilUtc: Date;
    /**
     * Streams messages to message handlers.
     * @param handlers - A handler that gets called for messages and errors.
     * @param options - Options for subscribe.
     * @returns An object that can be closed, sending any remaining messages to `handlers` and
     * stopping new messages from arriving.
     */
    subscribe(handlers: MessageHandlers, options?: SubscribeOptions): {
        /**
         * Causes the subscriber to stop receiving new messages.
         */
        close(): Promise<void>;
    };
    /**
     * Renews the lock on the session.
     */
    renewSessionLock(options?: OperationOptionsBase): Promise<Date>;
    /**
     * Gets the state of the Session. For more on session states, see
     * {@link https://learn.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state | Session State}
     * @param options - Options bag to pass an abort signal or tracing options.
     * @returns The state of that session
     * @throws Error if the underlying connection or receiver is closed.
     * @throws `ServiceBusError` if the service returns an error while retrieving session state.
     */
    getSessionState(options?: OperationOptionsBase): Promise<any>;
    /**
     * Sets the state on the Session. For more on session states, see
     * {@link https://learn.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state | Session State}
     * @param state - The state that needs to be set.
     * @param options - Options bag to pass an abort signal or tracing options.
     * @throws Error if the underlying connection or receiver is closed.
     * @throws `ServiceBusError` if the service returns an error while setting the session state.
     *
     */
    setSessionState(state: any, options?: OperationOptionsBase): Promise<void>;
}
/**
 * @internal
 */
export declare class ServiceBusSessionReceiverImpl implements ServiceBusSessionReceiver {
    private _messageSession;
    private _context;
    entityPath: string;
    receiveMode: "peekLock" | "receiveAndDelete";
    private _skipParsingBodyAsJson;
    private _skipConvertingDate;
    private _retryOptions;
    sessionId: string;
    identifier: string;
    /**
     * Denotes if close() was called on this receiver
     */
    private _isClosed;
    private get logPrefix();
    /**
     * @internal
     * @throws Error if the underlying connection is closed.
     * @throws Error if an open receiver is already existing for given sessionId.
     */
    constructor(_messageSession: MessageSession, _context: ConnectionContext, entityPath: string, receiveMode: "peekLock" | "receiveAndDelete", _skipParsingBodyAsJson: boolean, _skipConvertingDate: boolean, _retryOptions?: RetryOptions);
    private _throwIfReceiverOrConnectionClosed;
    private _throwIfAlreadyReceiving;
    get isClosed(): boolean;
    /**
     * The time in UTC until which the session is locked.
     * Every time `renewSessionLock()` is called, this time gets updated to current time plus the lock
     * duration as specified during the Queue/Subscription creation.
     *
     * When the lock on the session expires
     * - The current receiver can no longer be used to receive more messages.
     * Create a new receiver using `ServiceBusClient.acceptSession()` or `ServiceBusClient.acceptNextSession()`.
     * - Messages that were received in `peekLock` mode with this receiver but not yet settled
     * will land back in the Queue/Subscription with their delivery count incremented.
     *
     * @readonly
     */
    get sessionLockedUntilUtc(): Date;
    /**
     * Renews the lock on the session for the duration as specified during the Queue/Subscription
     * creation. You can check the `sessionLockedUntilUtc` property for the time when the lock expires.
     *
     * When the lock on the session expires
     * - The current receiver can no longer be used to receive mode messages.
     * Create a new receiver using `ServiceBusClient.acceptSession()` or `ServiceBusClient.acceptNextSession()`.
     * - Messages that were received in `peekLock` mode with this receiver but not yet settled
     * will land back in the Queue/Subscription with their delivery count incremented.
     *
     * @param options - Options bag to pass an abort signal or tracing options.
     * @returns New lock token expiry date and time in UTC format.
     * @throws Error if the underlying connection or receiver is closed.
     * @throws `ServiceBusError` if the service returns an error while renewing session lock.
     */
    renewSessionLock(options?: OperationOptionsBase): Promise<Date>;
    /**
     * Sets the state on the Session. For more on session states, see
     * {@link https://learn.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state | Session State}
     * @param state - The state that needs to be set.
     * @param options - Options bag to pass an abort signal or tracing options.
     * @throws Error if the underlying connection or receiver is closed.
     * @throws `ServiceBusError` if the service returns an error while setting the session state.
     */
    setSessionState(state: unknown, options?: OperationOptionsBase): Promise<void>;
    /**
     * Gets the state of the Session. For more on session states, see
     * {@link https://learn.microsoft.com/azure/service-bus-messaging/message-sessions#message-session-state | Session State}
     * @param options - Options bag to pass an abort signal or tracing options.
     * @returns The state of that session
     * @throws Error if the underlying connection or receiver is closed.
     * @throws `ServiceBusError` if the service returns an error while retrieving session state.
     */
    getSessionState(options?: OperationOptionsBase): Promise<any>;
    peekMessages(maxMessageCount: number, options?: PeekMessagesOptions): Promise<ServiceBusReceivedMessage[]>;
    receiveDeferredMessages(sequenceNumbers: Long | Long[], options?: OperationOptionsBase): Promise<ServiceBusReceivedMessage[]>;
    deleteMessages(options: DeleteMessagesOptions): Promise<number>;
    purgeMessages(options?: PurgeMessagesOptions): Promise<number>;
    receiveMessages(maxMessageCount: number, options?: ReceiveMessagesOptions): Promise<ServiceBusReceivedMessage[]>;
    subscribe(handlers: MessageHandlers, options?: SubscribeOptions): {
        close(): Promise<void>;
    };
    /**
     * Registers handlers to deal with the incoming stream of messages over an AMQP receiver link
     * from a Queue/Subscription.
     * To stop receiving messages, call `close()` on the SessionReceiver.
     *
     * Throws an error if there is another receive operation in progress on the same receiver. If you
     * are not sure whether there is another receive operation running, check the `isReceivingMessages`
     * property on the receiver.
     *
     * @param onMessage - Handler for processing each incoming message.
     * @param onError - Handler for any error that occurs while receiving or processing messages.
     * @param options - Options to control whether messages should be automatically completed
     * or if the lock on the session should be automatically renewed. You can control the
     * maximum number of messages that should be concurrently processed. You can
     * also provide a timeout in milliseconds to denote the amount of time to wait for a new message
     * before closing the receiver.
     *
     * @throws Error if the underlying connection or receiver is closed.
     * @throws Error if the receiver is already in state of receiving messages.
     * @throws `ServiceBusError` if the service returns an error while receiving messages. These are bubbled up to be handled by user provided `onError` handler.
     */
    private _registerMessageHandler;
    getMessageIterator(options?: GetMessageIteratorOptions): AsyncIterableIterator<ServiceBusReceivedMessage>;
    completeMessage(message: ServiceBusReceivedMessage): Promise<void>;
    abandonMessage(message: ServiceBusReceivedMessage, propertiesToModify?: {
        [key: string]: number | boolean | string | Date | null;
    }): Promise<void>;
    deferMessage(message: ServiceBusReceivedMessage, propertiesToModify?: {
        [key: string]: number | boolean | string | Date | null;
    }): Promise<void>;
    deadLetterMessage(message: ServiceBusReceivedMessage, options?: DeadLetterOptions & {
        [key: string]: number | boolean | string | Date | null;
    }): Promise<void>;
    renewMessageLock(): Promise<Date>;
    close(): Promise<void>;
    /**
     * Indicates whether the receiver is currently receiving messages or not.
     * When this returns true, new `registerMessageHandler()` or `receiveMessages()` calls cannot be made.
     */
    private _isReceivingMessages;
}
//# sourceMappingURL=sessionReceiver.d.ts.map