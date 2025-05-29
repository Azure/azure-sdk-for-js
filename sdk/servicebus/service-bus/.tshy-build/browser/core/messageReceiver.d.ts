import type { MessagingError, RetryOptions } from "@azure/core-amqp";
import type { AmqpError, EventContext, OnAmqpEvent, Receiver, ReceiverOptions } from "rhea-promise";
import type { ReceiverType } from "./linkEntity.js";
import { LinkEntity } from "./linkEntity.js";
import type { ConnectionContext } from "../connectionContext.js";
import type { ServiceBusMessageImpl } from "../serviceBusMessage.js";
import { DispositionType } from "../serviceBusMessage.js";
import type { ProcessErrorArgs, ReceiveMode, SubscribeOptions } from "../models.js";
import type { DispositionStatusOptions } from "./managementClient.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { DeferredPromiseAndTimer, ReceiverHandlers } from "./shared.js";
import type { LockRenewer } from "./autoLockRenewer.js";
/**
 * @internal
 */
export interface OnAmqpEventAsPromise extends OnAmqpEvent {
    (context: EventContext): Promise<void>;
}
/**
 * @internal
 */
export interface ReceiveOptions extends SubscribeOptions {
    /**
     * The mode in which messages should be received.
     */
    receiveMode: ReceiveMode;
    /**
     * Retry policy options that determine the mode, number of retries, retry interval etc.
     */
    retryOptions?: RetryOptions;
    /**
     * A LockAutoRenewer that will automatically renew locks based on user specified interval.
     * This will be set if the user has chosen peekLock mode _and_ they've set a positive
     * maxAutoRenewLockDurationInMs value when they created their receiver.
     */
    lockRenewer: LockRenewer | undefined;
    /**
     * Option to disable the client from running JSON.parse() on the message body when receiving the message.
     * Not applicable if the message was sent with AMQP body type value or sequence. Use this option when you
     * prefer to work directly with the bytes present in the message body than have the client attempt to parse it.
     */
    skipParsingBodyAsJson: boolean;
    /**
     * Whether to skip converting Date type on properties of message annotations
     * or application properties into numbers when receiving the message. By
     * default, properties of Date type is converted into UNIX epoch number for
     * compatibility.
     */
    skipConvertingDate: boolean;
}
/**
 * Describes the signature of the message handler passed to `registerMessageHandler` method.
 * @internal
 */
export interface OnMessage {
    /**
     * Handler for processing each incoming message.
     */
    (message: ServiceBusMessageImpl): Promise<void>;
}
/**
 * Describes the signature of the error handler passed to `registerMessageHandler` method.
 *
 * @internal
 */
export interface OnError {
    /**
     * Handler for any error that occurs while receiving or processing messages.
     *
     * NOTE: if this signature changes make sure you reflect those same changes in the
     * `OnErrorNoContext` definition below.
     */
    (args: ProcessErrorArgs): Promise<void>;
}
/**
 * An onError method but without the context property. Used when wrapping OnError
 * with an implicit ProcessErrorContext. Used by LockRenewer.
 *
 * @internal
 */
export interface OnErrorNoContext {
    (error: MessagingError | Error): void;
}
/**
 * @internal
 * Describes the MessageReceiver that will receive messages from ServiceBus.
 */
export declare abstract class MessageReceiver extends LinkEntity<Receiver> {
    identifier: string;
    /**
     * The type of receiver: "batching" or "streaming".
     */
    receiverType: ReceiverType;
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
     * Maintains a map of deliveries that
     * are being actively disposed. It acts as a store for correlating the responses received for
     * active dispositions.
     */
    protected _deliveryDispositionMap: Map<number, DeferredPromiseAndTimer>;
    /**
     * A lock renewer that handles message lock auto-renewal. This is undefined unless the user
     * has activated autolock renewal via ReceiveOptions. A single auto lock renewer is shared
     * for all links for a `ServiceBusReceiver` instance.
     */
    protected _lockRenewer: LockRenewer | undefined;
    constructor(identifier: string, context: ConnectionContext, entityPath: string, receiverType: ReceiverType, options: Omit<ReceiveOptions, "maxConcurrentCalls">);
    /**
     * Creates the options that need to be specified while creating an AMQP receiver link.
     */
    protected _createReceiverOptions(useNewName: boolean, handlers: ReceiverHandlers): ReceiverOptions;
    /**
     * Creates a new AMQP receiver under a new AMQP session.
     */
    protected _init(options: ReceiverOptions, abortSignal?: AbortSignalLike): Promise<void>;
    protected createRheaLink(options: ReceiverOptions, _abortSignal?: AbortSignalLike): Promise<Receiver>;
    /**
     * React to receiver being detached due to given error.
     * You may want to set up retries to recover the broken link and/or report error to user.
     * @param error - The error accompanying the receiver/session error or connection disconnected events
     */
    abstract onDetached(error?: AmqpError | Error): Promise<void>;
    /**
     * Clears lock renewal timers on all active messages, clears token remewal for current receiver,
     * removes current MessageReceiver instance from cache, and closes the underlying AMQP receiver.
     * @returns Promise<void>.
     */
    close(): Promise<void>;
    /**
     * Settles the message with the specified disposition.
     * @param message - The ServiceBus Message that needs to be settled.
     * @param operation - The disposition type.
     * @param options - Optional parameters that can be provided while disposing the message.
     */
    settleMessage(message: ServiceBusMessageImpl, operation: DispositionType, options: DispositionStatusOptions): Promise<any>;
}
//# sourceMappingURL=messageReceiver.d.ts.map