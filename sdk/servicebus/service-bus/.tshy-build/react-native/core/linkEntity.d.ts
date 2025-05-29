import type { RequestResponseLink } from "@azure/core-amqp";
import type { ConnectionContext } from "../connectionContext.js";
import type { AwaitableSender, AwaitableSenderOptions, Receiver, ReceiverOptions, SenderOptions } from "rhea-promise";
import type { AbortSignalLike } from "@azure/abort-controller";
import type { ServiceBusLogger } from "../log.js";
/**
 * @internal
 * Options passed to the constructor of LinkEntity
 */
export interface LinkEntityOptions {
    /**
     * The client entity address in one of the following forms:
     */
    address?: string;
    /**
     * The client entity token audience in one of the following forms:
     */
    audience?: string;
}
/**
 * A simple grouping of the sender and receiver options. Only used
 * with the ManagementClient today.
 *
 * @internal
 */
export interface RequestResponseLinkOptions {
    senderOptions: SenderOptions;
    receiverOptions: ReceiverOptions;
    name?: string;
}
/**
 * @internal
 */
export type NonSessionReceiverType = "batching" | "streaming";
/**
 * @internal
 */
export type ReceiverType = NonSessionReceiverType | "session";
/**
 * @internal
 */
type LinkOptionsT<LinkT extends Receiver | AwaitableSender | RequestResponseLink> = LinkT extends Receiver ? ReceiverOptions : LinkT extends AwaitableSender ? AwaitableSenderOptions : LinkT extends RequestResponseLink ? RequestResponseLinkOptions : never;
/**
 * @internal
 */
type LinkTypeT<LinkT extends Receiver | AwaitableSender | RequestResponseLink> = LinkT extends Receiver ? ReceiverType : LinkT extends AwaitableSender ? "sender" : LinkT extends RequestResponseLink ? "mgmt" : never;
/**
 * @internal
 * Describes the base class for entities like MessageSender, MessageReceiver and Management client.
 */
export declare abstract class LinkEntity<LinkT extends Receiver | AwaitableSender | RequestResponseLink> {
    readonly baseName: string;
    readonly entityPath: string;
    private _linkType;
    private _logger;
    /**
     * The unique name for the entity in the format:
     * `${name of the entity}-${guid}`.
     */
    name: string;
    /**
     * The client entity address in one of the following forms:
     *
     * **Sender**
     * - `"<queue-name>"`.
     * - `"<topic-name>"`.
     *
     * **Receiver**
     * - `"<queue-name>"`.
     * - `"<topic-name>"`.
     *
     * **ManagementClient**
     * -`"$management"`.
     */
    address: string;
    /**
     * The client entity token audience in one of the following forms:
     *
     * **Sender**
     * - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
     * - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
     *
     * **Receiver**
     * - `"sb://<yournamespace>.servicebus.windows.net/<queue-name>"`
     * - `"sb://<yournamespace>.servicebus.windows.net/<topic-name>"`
     *
     * **ManagementClient**
     * - `"sb://<your-namespace>.servicebus.windows.net/<queue-name>/$management"`.
     * - `"sb://<your-namespace>.servicebus.windows.net/<topic-name>/$management"`.
     */
    audience: string;
    /**
     * Provides relevant information about the amqp connection,
     * cbs and $management sessions, token provider, sender and receivers.
     */
    protected _context: ConnectionContext;
    /**
     * The token renewal timer that keeps track of when
     * the Client Entity is due for token renewal.
     */
    private _tokenRenewalTimer?;
    /**
     * Indicates token timeout
     */
    protected _tokenTimeout?: number;
    /**
     * The actual rhea link (of type Receiver or AwaitableSender) or RequestResponseLink
     */
    private _link?;
    /**
     * The log prefix for any log messages.
     */
    private _logPrefix;
    get logPrefix(): string;
    /**
     * Indicates that close() has been called on this link and
     * that it should not be allowed to reopen.
     */
    private _wasClosedPermanently;
    /**
     * A lock that ensures that opening and closing this
     * link properly cooperate.
     */
    private _openLock;
    /**
     * Creates a new ClientEntity instance.
     * @param baseName - The base name to use for the link. A unique ID will be appended to this.
     * @param entityPath - The entity path (ex: 'your-queue')
     * @param context - The connection context.
     * @param options - Options that can be provided while creating the LinkEntity.
     */
    constructor(baseName: string, entityPath: string, context: ConnectionContext, _linkType: LinkTypeT<LinkT>, _logger: ServiceBusLogger, options?: LinkEntityOptions);
    /**
     * Determines whether the AMQP link is open. If open then returns true else returns false.
     */
    isOpen(): boolean;
    /**
     * Initializes this LinkEntity, setting this._link with the result of  `createRheaLink`, which
     * is implemented by child classes.
     *
     * @returns A Promise that resolves when the link has been properly initialized
     * @throws `AbortError` if the link has been closed via 'close'
     */
    initLink(options: LinkOptionsT<LinkT>, abortSignal?: AbortSignalLike): Promise<void>;
    private _initLinkImpl;
    /**
     * Clears token renewal for current link, removes current LinkEntity instance from cache,
     * and closes the underlying AMQP link.
     * Once closed, this instance of LinkEntity is not meant to be re-used.
     */
    close(): Promise<void>;
    /**
     * NOTE: This method should be implemented by any child classes to actually create the underlying
     * Rhea link (AwaitableSender or Receiver or RequestResponseLink)
     *
     */
    protected abstract createRheaLink(_options: LinkOptionsT<LinkT>): Promise<LinkT>;
    /**
     * Clears this link from context's link cache.
     */
    protected abstract removeLinkFromContext(): void;
    /**
     * Closes the internally held rhea link, stops the token renewal timer and sets
     * the this._link field to undefined.
     */
    protected closeLink(): Promise<void>;
    private closeLinkImpl;
    /**
     * Provides the current type of the ClientEntity.
     * @returns The entity type.
     */
    private get _type();
    protected get wasClosedPermanently(): boolean;
    protected get link(): LinkT | undefined;
    /**
     * Negotiates the cbs claim for the ClientEntity.
     * @param setTokenRenewal - Set the token renewal timer. Default false.
     */
    private _negotiateClaim;
    /**
     * Checks to see if the connection is in a "reopening" state. If it is
     * we need to _not_ use it otherwise we'll trigger some race conditions
     * within rhea (for instance, errors about _process not being defined).
     */
    private checkIfConnectionReady;
    /**
     * Ensures that the token is renewed within the predefined renewal margin.
     */
    private _ensureTokenRenewal;
}
export {};
//# sourceMappingURL=linkEntity.d.ts.map