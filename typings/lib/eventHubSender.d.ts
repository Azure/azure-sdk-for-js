import * as rheaPromise from "./rhea-promise";
import { EventData } from "./eventData";
import { ConnectionContext } from "./connectionContext";
/**
 * Instantiates a new sender from the AMQP `Sender`. Used by `EventHubClient`.
 *
 * @param {any} session - The amqp session on which the amqp sender link was created.
 * @param {any} sender - The amqp sender link.
 * @constructor
 */
export declare class EventHubSender {
    /**
     * @property {string} [name] The unique EventHub Sender name (mostly a guid).
     */
    name: string;
    /**
     * @property {string} [partitionId] The partitionId to which the sender wants to send the EventData.
     */
    partitionId?: string | number;
    /**
     * @property {string} address The EventHub Sender address in one of the following forms:
     * - "<hubName>"
     * - "<hubName>/Partitions/<partitionId>".
     */
    address: string;
    /**
     * @property {string} audience The EventHub Sender token audience in one of the following forms:
     * - "sb://<yournamespace>.servicebus.windows.net/<hubName>"
     * - "sb://<yournamespace>.servicebus.windows.net/<hubName>/Partitions/<partitionId>".
     */
    audience: string;
    readonly senderLock: string;
    /**
     * @property {ConnectionContext} _context Provides relevant information about the amqp connection,
     * cbs and $management sessions, token provider, sender and receivers.
     * @private
     */
    private _context;
    /**
     * @property {any} [_sender] The AMQP sender link.
     * @private
     */
    private _sender?;
    /**
     * @property {any} [_session] The AMQP sender session.
     * @private
     */
    private _session?;
    /**
     * @property {NodeJS.Timer} _tokenRenewalTimer The token renewal timer that keeps track of when
     * the EventHub Sender is due for token renewal.
     * @private
     */
    private _tokenRenewalTimer?;
    /**
     * Creates a new EventHubSender instance.
     * @constructor
     * @param {EventHubClient} client The EventHub client.
     * @param {string|number} [partitionId] The EventHub partition id to which the sender
     * wants to send the event data.
     */
    constructor(context: ConnectionContext, partitionId?: string | number, name?: string);
    /**
     * Sends the given message, with the given options on this link
     *
     * @method send
     * @param {any} data Message to send.  Will be sent as UTF8-encoded JSON string.
     * @returns {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
     */
    send(data: EventData): Promise<rheaPromise.Delivery>;
    /**
     * Send a batch of EventData to the EventHub. The "message_annotations",
     * "application_properties" and "properties" of the first message will be set as that
     * of the envelope (batch message).
     * @param {Array<EventData>} datas  An array of EventData objects to be sent in a Batch message.
     * @return {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
     */
    sendBatch(datas: EventData[]): Promise<rheaPromise.Delivery>;
    /**
     * "Unlink" this sender, closing the link and resolving when that operation is complete.
     * Leaves the underlying connection open.
     * @method close
     * @return {Promise<void>} Promise<void>
     */
    close(): Promise<void>;
    private _createSenderOptions();
    /**
     * Tries to send the message to EventHub if there is enough credit to send them
     * and the circular buffer has available space to settle the message after sending them.
     *
     * We have implemented a synchronous send over here in the sense that we shall be waiting
     * for the message to be accepted or rejected and accordingly resolve or reject the promise.
     *
     * @param message The message to be sent to EventHub.
     * @return {Promise<rheaPromise.Delivery>} Promise<rheaPromise.Delivery>
     */
    private _trySend(message, tag?, format?);
    /**
     * Determines whether the AMQP sender link is open. If open then returns true else returns false.
     * @private
     *
     * @return {boolean} boolean
     */
    private _isOpen();
    /**
     * Initializes the sender session on the connection.
     * @returns {Promise<void>}
     */
    private _init();
    /**
     * Negotiates the cbs claim for the EventHub Sender.
     * @private
     * @param {boolean} [setTokenRenewal] Set the token renewal timer. Default false.
     * @return {Promise<void>} Promise<void>
     */
    private _negotiateClaim(setTokenRenewal?);
    /**
     * Ensures that the token is renewed within the predefined renewal margin.
     * @private
     * @returns {void}
     */
    private _ensureTokenRenewal();
    /**
     * Creates a new sender to the given event hub, and optionally to a given partition if it is
     * not present in the context or returns the one present in the context.
     * @static
     * @param {(string|number)} [partitionId] Partition ID to which it will send event data.
     * @returns {Promise<EventHubSender>}
     */
    static create(context: ConnectionContext, partitionId?: string | number): EventHubSender;
}
