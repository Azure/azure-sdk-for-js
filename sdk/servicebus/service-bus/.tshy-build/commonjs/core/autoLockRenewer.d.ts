import type { ConnectionContext } from "../connectionContext.js";
import type { ServiceBusMessageImpl } from "../serviceBusMessage.js";
import type { LinkEntity } from "./linkEntity.js";
import type { OnErrorNoContext } from "./messageReceiver.js";
/**
 * @internal
 */
export type RenewableMessageProperties = Readonly<Pick<ServiceBusMessageImpl, "lockToken" | "messageId">> & Pick<ServiceBusMessageImpl, "lockedUntilUtc">;
/**
 * @internal
 */
type MinimalLink = Pick<LinkEntity<any>, "name" | "logPrefix" | "entityPath">;
/**
 * Tracks locks for messages, renewing until a configurable duration.
 *
 * @internal
 */
export declare class LockRenewer {
    private _context;
    private _maxAutoRenewDurationInMs;
    /**
     * A map of link names to individual maps for each
     * link that map a message ID to its auto-renewal timer.
     */
    private _messageRenewLockTimers;
    private _calculateRenewAfterDuration;
    constructor(_context: Pick<ConnectionContext, "getManagementClient">, _maxAutoRenewDurationInMs: number);
    /**
     * Creates an AutoLockRenewer.
     *
     * @param linkEntity - Your link entity instance (probably 'this')
     * @param context - The connection context for your link entity (probably 'this._context')
     * @param options - The ReceiveOptions passed through to your message receiver.
     * @returns if the lock mode is peek lock (or if is unspecified, thus defaulting to peekLock)
     * and the options.maxAutoLockRenewalDurationInMs is greater than 0..Otherwise, returns undefined.
     */
    static create(context: Pick<ConnectionContext, "getManagementClient">, maxAutoRenewLockDurationInMs: number, receiveMode: "peekLock" | "receiveAndDelete"): LockRenewer | undefined;
    /**
     * Cancels all pending lock renewals for messages on given link and removes all entries from our internal cache.
     */
    stopAll(linkEntity: MinimalLink): void;
    /**
     * Stops lock renewal for a single message.
     *
     * @param bMessage - The message whose lock renewal we will stop.
     */
    stop(linkEntity: MinimalLink, bMessage: RenewableMessageProperties): void;
    /**
     * Starts lock renewal for a single message.
     *
     * @param bMessage - The message whose lock renewal we will start.
     */
    start(linkEntity: MinimalLink, bMessage: RenewableMessageProperties, onError: OnErrorNoContext): void;
    private _getOrCreateMapForLink;
    private _stopAndRemoveById;
}
export {};
//# sourceMappingURL=autoLockRenewer.d.ts.map