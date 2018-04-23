/// <reference types="node" />
import { AmqpMessage } from "..";
/**
 * Establishes an amqp connection.
 * @param {ConnectionOptions} [options] Options to be provided for establishing an amqp connection.
 * @return {Promise<Connection>} Promise<Connection>
 * - **Resolves** the promise with the Connection object when rhea emits the "connection_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "connection_close" event while trying
 * to establish an amqp connection.
 */
export declare function connect(options?: ConnectionOptions): Promise<any>;
/**
 * Closes the amqp connection.
 * @param {Connection} connection The amqp connection that needs to be closed.
 * @return {Promise<void>} Promise<void>
 * - **Resolves** the promise when rhea emits the "connection_close" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "connection_error" event while trying
 * to close an amqp connection.
 */
export declare function closeConnection(connection: any): Promise<void>;
/**
 * Creates an amqp session on the provided amqp connection.
 * @param {Connection} connection The amqp connection object
 * @return {Promise<Session>} Promise<Session>
 * - **Resolves** the promise with the Session object when rhea emits the "session_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "session_close" event while trying
 * to create an amqp session.
 */
export declare function createSession(connection: any): Promise<any>;
/**
 * Closes the amqp session.
 * @param {Session} session The amqp session that needs to be closed.
 * @return {Promise<void>} Promise<void>
 * - **Resolves** the promise when rhea emits the "session_close" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "session_error" event while trying
 * to close an amqp session.
 */
export declare function closeSession(session: any): Promise<void>;
/**
 * Creates an amqp sender on the provided amqp session.
 * @param {Session} session The amqp session object on which the sender link needs to be established.
 * @param {SenderOptions} [options] Options that can be provided while creating an amqp sender.
 * @return {Promise<Sender>} Promise<Sender>
 * - **Resolves** the promise with the Sender object when rhea emits the "sender_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "sender_close" event while trying
 * to create an amqp sender.
 */
export declare function createSender(session: any, options?: SenderOptions): Promise<any>;
/**
 * Creates an amqp sender on the provided amqp session.
 * @param {Session} session The amqp session object on which the sender link needs to be established.
 * @param {OnAmqpEvent} onError The event handler for the "error" event for the sender.
 * @param {SenderOptions} [options] Options that can be provided while creating an amqp sender.
 * @return {Promise<Sender>} Promise<Sender>
 * - **Resolves** the promise with the Sender object when rhea emits the "sender_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "sender_close" event while trying
 * to create an amqp sender.
 */
export declare function createSenderWithHandlers(session: any, onError: OnAmqpEvent, options?: SenderOptions): Promise<any>;
/**
 * Closes the amqp sender.
 * @param {Sender} sender The amqp sender that needs to be closed.
 * @return {Promise<void>} Promise<void>
 * - **Resolves** the promise when rhea emits the "sender_close" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the
 * "sender_error" event while trying to close an amqp sender.
 */
export declare function closeSender(sender: any): Promise<void>;
/**
 * Creates an amqp receiver on the provided amqp session. This method should be used when you will be
 * sending a request and waiting for a response from the service. For example: This method is useful
 * while creating request/response links for $management or $cbs endpoint.
 * @param {Session} session The amqp session object on which the receiver link needs to be established.
 * @param {ReceiverOptions} [options] Options that can be provided while creating an amqp receiver.
 * @return {Promise<Receiver>} Promise<Receiver>
 * - **Resolves** the promise with the Receiver object when rhea emits the "receiver_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "receiver_close" event while trying
 * to create an amqp receiver.
 */
export declare function createReceiver(session: any, options?: ReceiverOptions): Promise<any>;
/**
 * Creates an amqp receiver with provided message and error event handlers on the provided amqp session.
 * This method should be used when you want to ensure that no messages are lost. For example: This method
 * is useful for creating EventHub Receivers where you want to start receiving ASAP.
 * @param {Session} session The amqp session object on which the receiver link needs to be established.
 * @param {OnAmqpEvent} onMessage The event handler for the "message" event for the receiver.
 * @param {OnAmqpEvent} onError The event handler for the "error" event for the receiver.
 * @param {ReceiverOptions} [options] Options that can be provided while creating an amqp receiver.
 * @return {Promise<Receiver>} Promise<Receiver>
 * - **Resolves** the promise with the Receiver object when rhea emits the "receiver_open" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the "receiver_close" event while trying
 * to create an amqp receiver.
 */
export declare function createReceiverWithHandlers(session: any, onMessage: OnAmqpEvent, onError: OnAmqpEvent, options?: ReceiverOptions): Promise<any>;
/**
 * Closes the amqp receiver.
 * @param {Receiver} receiver The amqp receiver that needs to be closed.
 * @return {Promise<void>} Promise<void>
 * - **Resolves** the promise when rhea emits the "receiver_close" event.
 * - **Rejects** the promise with an AmqpError when rhea emits the
 * "receiver_error" event while trying to close an amqp receiver.
 */
export declare function closeReceiver(receiver: any): Promise<void>;
/**
 * Describes the signature of the event handler for any event emitted by rhea.
 * @type OnAmqpEvent
 * @param {Context} context The rhea context.
 */
export declare type OnAmqpEvent = (context: Context) => void;
/**
 * Defines the common set of properties that are applicable for a connection, session and a link (sender, receiver).
 * @interface EntityOptions
 */
export interface EntityOptions {
    /**
     * @property {any} [desired_capabilities] Extension capabilities the sender can use if the receiver supports them.
     */
    desired_capabilities?: any;
    /**
     * @property {any} [offered_capabilities] Extension capabilities the sender supports.
     */
    offered_capabilities?: any;
    /**
     * @property {object} [properties] Properties of the entity (connection, session, link) contain a set of fields
     * intended to provide more information about the entity.
     */
    properties?: {
        [x: string]: any;
    };
}
/**
 * Defines the options that can be provided while creating a connection.
 * @interface ConnectionOptions
 * @extends EntityOptions
 */
export interface ConnectionOptions extends EntityOptions {
    /**
     * @property {string} username - The username.
     */
    username: string;
    /**
     * @property {string} host - The host to connect to.
     */
    host: string;
    /**
     * @property {string} hostname - The hostname to connect to.
     */
    hostname: string;
    /**
     * @property {number} port - The port number (5671 or 5672) at which to connect to.
     */
    port: number;
    /**
     * @property {string} [transport] - The transport option.
     */
    transport?: "tls" | "ssl" | "tcp";
    /**
     * @property {string} [container_id] The id of the source container. If not provided then
     * this will a guid string.
     */
    container_id?: string;
    /**
     * @property {string} [id] A unqiue name for the connection. If not provided then this will be
     * a string in the following format: "connection-<counter>".
     */
    id?: string;
    /**
     * @property {boolean} [reconnect] if true (default), the library will automatically attempt to
     * reconnect if disconnected.
     * - if false, automatic reconnect will be disabled
     * - if it is a numeric value, it is interpreted as the delay between
     * reconnect attempts (in milliseconds)
     */
    reconnect?: boolean;
    /**
     * @property {number} [reconnect_limit] maximum number of reconnect attempts.
     * Applicable only when reconnect is true.
     */
    reconnect_limit?: number;
    /**
     * @property {number} [initial_reconnect_delay] - Time to wait in milliseconds before
     * attempting to reconnect. Applicable only when reconnect is true or a number is
     * provided for reconnect.
     */
    initial_reconnect_delay?: number;
    /**
     * @property {number} [max_reconnect_delay] - Maximum reconnect delay in milliseconds
     * before attempting to reconnect. Applicable only when reconnect is true.
     */
    max_reconnect_delay?: number;
    /**
     * @property {string} [password] - The secret key to be used while establishing the connection.
     */
    password?: string;
    /**
     * @property {number} [max_frame_size] The largest frame size that the sending peer
     * is able to accept on this connection. Default: 4294967295
     */
    max_frame_size?: number;
    /**
     * @property {number} [idle_time_out] The largest frame size that the sending
     * peer is able to accept on this connection.
     */
    idle_time_out?: number;
    /**
     * @property {number} [channel_max] The highest channel number that can be used on the connection.
     */
    channel_max?: number;
    /**
     * @property {string[]} [outgoing_locales] A list of the locales that the peer supports
     * for sending informational text.
     */
    outgoing_locales?: string[];
    /**
     * @property {string[]} [incoming_locales] A list of locales that the sending peer
     * permits for incoming informational text. This list is ordered in decreasing level of preference.
     */
    incoming_locales?: string[];
}
/**
 * Defines the common set of options that can be provided while creating a link (sender, receiver).
 * @interface LinkOptions
 * @extends EntityOptions
 */
export interface LinkOptions extends EntityOptions {
    /**
     * @property {string} [name] The name of the link.
     * This should be unique for the container.
     * If not specified a unqiue name is generated.
     */
    name?: string;
    /**
     * @property {number} [snd_settle_mode] it specifies the sender settle mode with following possibile values:
     * - 0 - "unsettled" - The sender will send all deliveries initially unsettled to the receiver.
     * - 1 - "settled" - The sender will send all deliveries settled to the receiver.
     * - 2 - "mixed" - (default) The sender MAY send a mixture of settled and unsettled deliveries to the receiver.
     */
    snd_settle_mode?: 0 | 1 | 2;
    /**
     * @property {number} [rcv_settle_mode] it specifies the receiver settle mode with following possibile values:
     * - 0 - "first" - The receiver will spontaneously settle all incoming transfers.
     * - 1 - "second" - The receiver will only settle after sending the disposition to the sender and receiving a
     * disposition indicating settlement of the delivery from the sender.
     */
    rcv_settle_mode?: 0 | 1;
    /**
     * @property {number} [max_message_size] The maximum message size supported by the link endpoint.
     */
    max_message_size?: number;
}
/**
 * Defines the options that can be provided while creating the source/target for a Sender or Receiver (link).
 * @interface TerminusOptions
 */
export interface TerminusOptions {
    /**
     * @property {string} [address] - The AMQP address as target for this terminus.
     */
    address: string;
    /**
     * @property {object} [filter] - The filters to be added for the terminus.
     */
    filter?: {
        [x: string]: any;
    };
    /**
     * @property {boolean} [durable] - It specifies a request for the receiving peer
     * to dynamically create a node at the target/source. Default: false.
     */
    dynamic?: boolean;
    /**
     * @property {string} [expiry_policy] - The expiry policy of the terminus. Default value "session-end".
     */
    expiry_policy?: string;
    /**
     * @property {number} [durable] It specifies what state of the terminus will be retained durably:
     *  - the state of durable messages (unsettled_state value),
     *  - only existence and configuration of the terminus (configuration value), or
     *  - no state at all (none value);
     */
    durable?: number;
}
/**
 * Defines the options that can be set while creating the Receiver (link).
 * @interface ReceiverOptions
 * @extends LinkOptions
 */
export interface ReceiverOptions extends LinkOptions {
    /**
     * @property {object} [credit_window]  A "prefetch" window controlling the flow of messages over
     * this receiver. Defaults to 1000 if not specified. A value of 0 can be used to
     * turn of automatic flow control and manage it directly.
     */
    credit_window?: number;
    /**
     * @property {boolean} [autoaccept] Whether received messages should be automatically accepted. Defaults to true.
     */
    autoaccept?: boolean;
    /**
     * @property {object} source  The source from which messages are received.
     */
    source: TerminusOptions;
    /**
     * @property {object} [target]  The target of a receiving link is the local identifier
     */
    target?: TerminusOptions;
}
/**
 * Defines the options that can be set while creating the Sender (link).
 * @interface SenderOptions
 * @extends LinkOptions
 */
export interface SenderOptions extends LinkOptions {
    /**
     * @property {boolean} [autosettle] Whether sent messages should be automatically settled once the peer settles them. Defaults to true.
     */
    autosettle?: boolean;
    /**
     * @property {object} target  - The target to which messages are sent
     */
    target: TerminusOptions;
    /**
     * @property {object} [source]  The source of a sending link is the local identifier
     */
    source?: TerminusOptions;
}
/**
 * Defines the AMQP Connection context. This context is provided when you add an
 * event handler to any of the objects created by rhea.
 * @interface Context
 */
export interface Context {
    /**
     * @property {Connection} connection The amqp connection.
     */
    connection: any;
    /**
     * @property {Container} container The amqp container
     */
    container: any;
    /**
     * @property {Delivery} [delivery] The amqp delivery that is received after sending a message.
     */
    delivery?: Delivery;
    /**
     * @property {AmqpMessage} [message] The amqp message that is received in the message event
     * handler when rhea emits a message event on a receiver.
     */
    message?: AmqpMessage;
    /**
     * @property {Receiver} [receiver] The amqp receiver link that was created on the amqp connection.
     */
    receiver?: any;
    /**
     * @property {Session} session The amqp session link that was created on the amqp connection.
     */
    session: any;
    /**
     * @property {Sender} [sender] The amqp sender link that was created on the amqp connection.
     */
    sender?: any;
}
/**
 * Defines the amqp error object.
 * @interface AmqpError
 */
export interface AmqpError {
    /**
     * @property {string} [condition] Describes the error condition.
     */
    condition?: string;
    /**
     * @property {string} [description] Describes any supplementary information that is not indicated the error condition.
     */
    description?: string;
    /**
     * @property {any} [info] Describes the information about the error condition.
     */
    info?: any;
    /**
     * @property {any[]} [value] Describes the associated amqp value types.
     */
    value?: any[];
}
/**
 * Defines a mapping for Http like response status codes for different status-code values provided by an AMQP broker.
 * @enum AmqpResponseStatusCode
 */
export declare enum AmqpResponseStatusCode {
    Continue = 100,
    SwitchingProtocols = 101,
    OK = 200,
    Created = 201,
    Accepted = 202,
    NonAuthoritativeInformation = 203,
    NoContent = 204,
    ResetContent = 205,
    PartialContent = 206,
    Ambiguous = 300,
    MultipleChoices = 300,
    Moved = 301,
    MovedPermanently = 301,
    Found = 302,
    Redirect = 302,
    RedirectMethod = 303,
    SeeOther = 303,
    NotModified = 304,
    UseProxy = 305,
    Unused = 306,
    RedirectKeepVerb = 307,
    TemporaryRedirect = 307,
    BadRequest = 400,
    Unauthorized = 401,
    PaymentRequired = 402,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllowed = 405,
    NotAcceptable = 406,
    ProxyAuthenticationRequired = 407,
    RequestTimeout = 408,
    Conflict = 409,
    Gone = 410,
    LengthRequired = 411,
    PreconditionFailed = 412,
    RequestEntityTooLarge = 413,
    RequestUriTooLong = 414,
    UnsupportedMediaType = 415,
    RequestedRangeNotSatisfiable = 416,
    ExpectationFailed = 417,
    UpgradeRequired = 426,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504,
    HttpVersionNotSupported = 505,
}
/**
 * Defines the Delivery frame that is received whenever a message/request is sent to the Broker.
 * @interface Delivery
 */
export interface Delivery {
    data: Buffer[];
    format: number;
    id: number;
    tag: Buffer;
    link: any;
    remote_settled: boolean;
    sent: boolean;
    settled: boolean;
    state?: any;
    remote_state?: any;
    update(settled: boolean, state?: any): void;
}
