import type { AmqpError, Receiver as RheaPromiseReceiver, Session } from "rhea-promise";
import { ServiceBusMessageImpl } from "../serviceBusMessage.js";
import type { ReceiveOptions } from "./messageReceiver.js";
import { MessageReceiver } from "./messageReceiver.js";
import type { ConnectionContext } from "../connectionContext.js";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { OperationOptionsBase } from "../modelsToBeSharedWithEventHubs.js";
import type { ReceiveMode } from "../models.js";
/**
 * Describes the batching receiver where the user can receive a specified number of messages for
 * a predefined time.
 * @internal
 */
export declare class BatchingReceiver extends MessageReceiver {
    /**
     * Instantiate a new BatchingReceiver.
     *
     * @param identifier - name to identify this receiver.
     * @param connectionContext - The client entity context.
     * @param options - Options for how you'd like to connect.
     */
    constructor(identifier: string, connectionContext: ConnectionContext, entityPath: string, options: ReceiveOptions);
    private _batchingReceiverLite;
    get isReceivingMessages(): boolean;
    /**
     * To be called when connection is disconnected to gracefully close ongoing receive request.
     * @param connectionError - The connection error if any.
     */
    onDetached(connectionError?: AmqpError | Error): Promise<void>;
    /**
     * Receives a batch of messages from a ServiceBus Queue/Topic.
     * @param maxMessageCount - The maximum number of messages to receive.
     * In Peeklock mode, this number is capped at 2047 due to constraints of the underlying buffer.
     * @param maxWaitTimeInMs - The total wait time in milliseconds until which the receiver will attempt to receive specified number of messages.
     * @param maxTimeAfterFirstMessageInMs - The total amount of time to wait after the first message
     * has been received. Defaults to 1 second.
     * If this time elapses before the `maxMessageCount` is reached, then messages collected till then will be returned to the user.
     * @returns A promise that resolves with an array of Message objects.
     */
    receive(maxMessageCount: number, maxWaitTimeInMs: number, maxTimeAfterFirstMessageInMs: number, options: OperationOptionsBase): Promise<ServiceBusMessageImpl[]>;
    static create(clientId: string, context: ConnectionContext, entityPath: string, options: ReceiveOptions): BatchingReceiver;
    protected removeLinkFromContext(): void;
}
/**
 * Gets a function that returns the smaller of the two timeouts,
 * taking into account elapsed time from when getRemainingWaitTimeInMsFn
 * was called.
 *
 * @param maxWaitTimeInMs - Maximum time to wait for the first message
 * @param maxTimeAfterFirstMessageInMs - Maximum time to wait after the first message before completing the receive.
 *
 * @internal
 */
export declare function getRemainingWaitTimeInMsFn(maxWaitTimeInMs: number, maxTimeAfterFirstMessageInMs: number): () => number;
/**
 * Useful interface that mimics EventEmitter without requiring us to actually
 * import the events definition (which is annoying with browsers).
 *
 * @internal
 */
type EventEmitterLike<T extends RheaPromiseReceiver | Session> = Pick<T, "once" | "removeListener" | "on">;
/**
 * The bare minimum needed to receive messages for batched
 * message receiving.
 *
 * @internal
 */
export type MinimalReceiver = Pick<RheaPromiseReceiver, "name" | "isOpen" | "credit" | "addCredit" | "drain" | "drainCredit" | "close"> & EventEmitterLike<RheaPromiseReceiver> & {
    session: EventEmitterLike<Session>;
} & {
    connection: {
        id: string;
    };
};
/**
 * @internal
 */
interface ReceiveMessageArgs extends OperationOptionsBase {
    maxMessageCount: number;
    maxWaitTimeInMs: number;
    maxTimeAfterFirstMessageInMs: number;
}
/**
 * The internals of a batching receiver minus anything that would require us to hold onto a client entity context
 * or a receiver on a permanent basis.
 *
 * Usable with both session and non-session receivers.
 *
 * @internal
 */
export declare class BatchingReceiverLite {
    private _connectionContext;
    entityPath: string;
    private _getCurrentReceiver;
    private _receiveMode;
    private _drainTimeoutInMs;
    constructor(_connectionContext: ConnectionContext, entityPath: string, _getCurrentReceiver: (abortSignal?: AbortSignalLike) => Promise<MinimalReceiver | undefined>, _receiveMode: ReceiveMode, _skipParsingBodyAsJson: boolean, _skipConvertingDate: boolean);
    private _createServiceBusMessage;
    private _getRemainingWaitTimeInMsFn;
    private _closeHandler;
    private _finalAction;
    isReceivingMessages: boolean;
    /**
     * Receives a set of messages,
     *
     * @internal
     * @hidden
     */
    receiveMessages(args: ReceiveMessageArgs): Promise<ServiceBusMessageImpl[]>;
    /**
     * Closes the receiver (optionally with an error), cancelling any current operations.
     *
     * @param connectionError - An optional error (rhea doesn't always deliver one for certain disconnection events)
     */
    terminate(connectionError?: Error | AmqpError): void;
    private tryDrainReceiver;
    private _receiveMessagesImpl;
}
export {};
//# sourceMappingURL=batchingReceiver.d.ts.map