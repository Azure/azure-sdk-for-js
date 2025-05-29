import type { RetryOptions } from "@azure/core-amqp";
import type { AmqpError, OnAmqpEvent, Receiver, ReceiverOptions } from "rhea-promise";
import type { ConnectionContext } from "../connectionContext.js";
import { LinkEntity } from "../core/linkEntity.js";
import type { DispositionStatusOptions } from "../core/managementClient.js";
import type { OnAmqpEventAsPromise, OnError, OnMessage } from "../core/messageReceiver.js";
import { DispositionType, ServiceBusMessageImpl } from "../serviceBusMessage.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import { ReceiverHelper } from "../core/receiverHelper.js";
import type { ServiceBusSessionReceiverOptions, ReceiveMode, SubscribeOptions } from "../models.js";
import type { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs.js";
/**
 * Describes the options that need to be provided while creating a message session receiver link.
 * @internal
 */
export interface CreateMessageSessionReceiverLinkOptions {
    onClose: OnAmqpEventAsPromise;
    onSessionClose: OnAmqpEventAsPromise;
    onError: OnAmqpEvent;
    onSessionError: OnAmqpEvent;
    onSettled: OnAmqpEvent;
    sessionId?: string;
}
/**
 * @internal
 * Describes all the options that can be set while instantiating a MessageSession object.
 */
export type MessageSessionOptions = Pick<ServiceBusSessionReceiverOptions, "maxAutoLockRenewalDurationInMs" | "abortSignal"> & {
    receiveMode?: ReceiveMode;
    retryOptions: RetryOptions | undefined;
    skipParsingBodyAsJson: boolean;
    skipConvertingDate: boolean;
};
/**
 * @internal
 * Describes the receiver for a Message Session.
 */
export declare class MessageSession extends LinkEntity<Receiver> {
    identifier: string;
    private _providedSessionId;
    /**
     * Provides the duration until which the session is locked.
     */
    sessionLockedUntilUtc: Date;
    /**
     * The sessionId for the message session. Empty string is valid sessionId.
     */
    sessionId: string;
    /**
     * The maximum number of concurrent sessions that the
     * client should initiate.
     * - **Default**: `1`.
     */
    maxConcurrentSessions?: number;
    /**
     * The maximum number of messages that should be
     * processed concurrently in a session while in streaming mode. Once this limit has been reached,
     * more messages will not be received until the user's message handler has completed processing current message.
     * - **Default**: `1` (message in a session at a time).
     */
    maxConcurrentCalls: number;
    /**
     * The mode in which messages should be received.
     * Default: ReceiveMode.peekLock
     */
    receiveMode: ReceiveMode;
    /**
     * Indicates whether `Message.complete()` should be called
     * automatically after the message processing is complete while receiving messages with handlers.
     * Default: false.
     */
    autoComplete: boolean;
    /**
     * The maximum duration within which the
     * lock will be renewed automatically. This value should be greater than the longest message
     * lock duration; for example, the `lockDuration` property on the received message.
     *
     * Default: `300 * 1000` (5 minutes);
     */
    maxAutoRenewDurationInMs: number;
    /**
     * Should lock renewal happen automatically.
     */
    autoRenewLock: boolean;
    /**
     * Denotes if we are currently receiving messages
     */
    get isReceivingMessages(): boolean;
    private _batchingReceiverLite;
    private _isReceivingMessagesForSubscriber;
    /**
     * Maintains a map of deliveries that
     * are being actively disposed. It acts as a store for correlating the responses received for
     * active dispositions.
     */
    private _deliveryDispositionMap;
    /**
     * The message handler provided by the user that will
     * be wrapped inside _onAmqpMessage.
     */
    private _onMessage;
    /**
     * The error handler provided by the user that will be wrapped
     * inside _onAmqpError.
     */
    private _onError?;
    /**
     * If the user provided error handler is present then it will
     * notify the user's error handler about the error.
     */
    private _notifyError;
    /**
     * The message handler that will be set as the handler on the
     * underlying rhea receiver for the "receiver_close" event.
     */
    private _onAmqpClose;
    /**
     * The message handler that will be set as the handler on
     * the underlying rhea receiver's session for the "session_error" event.
     */
    private _onSessionError;
    /**
     * The message handler that will be set as the handler on
     * the underlying rhea receiver's session for the "session_close" event.
     */
    private _onSessionClose;
    /**
     * The message handler that will be set as the handler on the
     * underlying rhea receiver for the "receiver_error" event.
     */
    private _onAmqpError;
    /**
     * The message handler that will be set as the handler on the
     * underlying rhea receiver for the "settled" event.
     */
    private _onSettled;
    /**
     * The session lock renewal timer that keeps
     * track of when the MessageSession is due for session lock renewal.
     */
    private _sessionLockRenewalTimer?;
    private _totalAutoLockRenewDuration;
    /**
     * Whether to prevent the client from running JSON.parse() on the message body when receiving the message.
     */
    private skipParsingBodyAsJson;
    /**
     * Whether to skip converting Date type on properties of message annotations
     * or application properties into numbers when receiving the message. By
     * default, properties of Date type is converted into UNIX epoch number for
     * compatibility.
     */
    private skipConvertingDate;
    get receiverHelper(): ReceiverHelper;
    private _receiverHelper;
    /**
     * Ensures that the session lock is renewed before it expires. The lock will not be renewed for
     * more than the configured totalAutoLockRenewDuration.
     */
    private _ensureSessionLockRenewal;
    protected createRheaLink(options: ReceiverOptions, _abortSignal?: AbortSignalLike): Promise<Receiver>;
    /**
     * Creates a new AMQP receiver under a new AMQP session.
     */
    private _init;
    /**
     * Creates the options that need to be specified while creating an AMQP receiver link.
     */
    private _createMessageSessionOptions;
    private _retryOptions;
    private _lastSBError;
    private _intermediateLink;
    /**
     * Constructs a MessageSession instance which lets you receive messages as batches
     * or via callbacks using subscribe.
     *
     * @param _providedSessionId - The sessionId provided by the user. This can be the
     * name of a session ID to open (empty string is also valid) or it can be undefined,
     * to indicate we want the next unlocked non-empty session.
     */
    constructor(identifier: string, connectionContext: ConnectionContext, entityPath: string, _providedSessionId: string | undefined, options: MessageSessionOptions);
    /**
     * Closes the underlying AMQP receiver link.
     */
    close(error?: Error | AmqpError): Promise<void>;
    /**
     * Determines whether the AMQP receiver link is open. If open then returns true else returns false.
     */
    isOpen(): boolean;
    /**
     * Registers handlers to deal with the incoming stream of messages over an AMQP receiver link
     * from a Queue/Subscription.
     * To stop receiving messages, call `close()` on the SessionReceiver or set the property
     * `newMessageWaitTimeoutInMs` in the options to provide a timeout.
     *
     * @param onMessage - Handler for processing each incoming message.
     * @param onError - Handler for any error that occurs while receiving or processing messages.
     * @param options - Options to control whether messages should be automatically completed. You can
     * also provide a timeout in milliseconds to denote the amount of time to wait for a new message
     * before closing the receiver.
     */
    subscribe(onMessage: OnMessage, onError: OnError, options: SubscribeOptions): void;
    private _subscribeImpl;
    private processCreditError;
    /**
     * Returns a batch of messages based on given count and timeout over an AMQP receiver link
     * from a Queue/Subscription.
     *
     * @param maxMessageCount - The maximum number of messages to receive from Queue/Subscription.
     * @param maxWaitTimeInMs - The total wait time in milliseconds until which the receiver will attempt to receive specified number of messages.
     * If this time elapses before the `maxMessageCount` is reached, then messages collected till then will be returned to the user.
     * @returns A promise that resolves with an array of Message objects.
     */
    receiveMessages(maxMessageCount: number, maxWaitTimeInMs: number, maxTimeAfterFirstMessageInMs: number, options: OperationOptionsBase): Promise<ServiceBusMessageImpl[]>;
    /**
     * To be called when connection is disconnected to gracefully close ongoing receive request.
     * @param connectionError - The connection error if any.
     */
    onDetached(connectionError: AmqpError | Error): Promise<void>;
    /**
     * Settles the message with the specified disposition.
     * @param message - The ServiceBus Message that needs to be settled.
     * @param operation - The disposition type.
     * @param options - Optional parameters that can be provided while disposing the message.
     */
    settleMessage(message: ServiceBusMessageImpl, operation: DispositionType, options: DispositionStatusOptions): Promise<any>;
    /**
     * Creates a new instance of the MessageSession based on the provided parameters.
     * @param identifier - name to identify the message session
     * @param context - The client entity context
     * @param options - Options that can be provided while creating the MessageSession.
     */
    static create(identifier: string, context: ConnectionContext, entityPath: string, sessionId: string | undefined, options: MessageSessionOptions): Promise<MessageSession>;
    protected removeLinkFromContext(): void;
}
//# sourceMappingURL=messageSession.d.ts.map