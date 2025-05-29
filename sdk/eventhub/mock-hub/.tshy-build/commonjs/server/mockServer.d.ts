import rhea from "rhea";
import { EventEmitter } from "events";
export interface MockServerOptions {
    /**
     * The port number the server should listen on.
     * If not specified, an open port will be chosen at random.
     */
    port?: number;
    /**
     * The maximum message size to allow on `Sender` and `Receiver` links.
     * Defaults to 1 MB.
     */
    maxMessageSize?: number;
    /**
     * Specifies the idle timeout in milliseconds.
     * Defaults to 240000.
     */
    idleTimeOut?: number;
    tlsOptions?: {
        /**
         * Optionally override the trusted CA certificates.
         * Default is to trust the well-known CAs curated by Mozilla.
         * Mozilla's CAs are completely replaced when CAs are explicitly specified using this option.
         */
        ca?: string | string[] | Buffer | Buffer[];
        /**
         * Cert chains in PEM format.
         * One cert chain should be provided per private key.
         *  Each cert chain should consist of the PEM formatted certificate for a provided private key,
         *  followed by the PEM formatted intermediate certificates (if any), in order,
         *  and not including the root CA (the root CA must be pre-known to the peer, see ca).
         */
        cert?: string | string[] | Buffer | Buffer[];
        /**
         * Private keys in PEM format.
         * PEM allows the option of private keys being encrypted.
         * Encrypted keys will be decrypted with options.passphrase.
         */
        key?: string | string[] | Buffer | Buffer[];
        /**
         * PFX or PKCS12 encoded private key and certificate chain.
         * pfx is an alternative to providing key and cert individually.
         */
        pfx?: string | string[] | Buffer | Buffer[];
        /**
         * Shared passphrase used for a single private key and/or a PFX.
         */
        passphrase?: string;
    };
}
export interface ReceiverOpenEvent {
    entityPath: string;
    receiver: rhea.Receiver;
    context: rhea.EventContext;
}
export interface ReceiverCloseEvent {
    entityPath: string;
    receiver: rhea.Receiver;
    context: rhea.EventContext;
}
export interface SenderOpenEvent {
    entityPath: string;
    sender: rhea.Sender;
    context: rhea.EventContext;
}
export interface SenderCloseEvent {
    entityPath: string;
    sender: rhea.Sender;
    context: rhea.EventContext;
}
export interface ConnectionOpenEvent {
    context: rhea.EventContext;
}
export interface ConnectionCloseEvent {
    error?: Error | rhea.ConnectionError;
    context: rhea.EventContext;
}
export interface OnMessagesEvent {
    messages: Array<rhea.Message & {
        body?: Buffer;
    }>;
    entityPath: string;
    sendMessage: (message: rhea.Message) => void;
    context: rhea.EventContext;
}
/**
 * A Mock AMQP server.
 *
 * This class is meant to make it easier for a mock service
 * to interact with incoming messages and link notifications.
 */
export declare class MockServer extends EventEmitter {
    private _container;
    private _listener?;
    private _options;
    constructor(options?: MockServerOptions);
    /**
     * The port number the server is listening on.
     * Returns `-1` if the server is not currently listening.
     */
    get port(): number;
    /**
     * Starts the server.
     */
    start(): Promise<void>;
    emit(type: "receiverOpen", event: ReceiverOpenEvent): boolean;
    emit(type: "senderOpen", event: SenderOpenEvent): boolean;
    emit(type: "connectionOpen", event: ConnectionOpenEvent): boolean;
    emit(type: "onMessages", event: OnMessagesEvent): boolean;
    emit(type: "receiverClose", event: ReceiverCloseEvent): boolean;
    emit(type: "senderClose", event: SenderCloseEvent): boolean;
    emit(type: "connectionClose", event: ConnectionCloseEvent): boolean;
    /**
     * Add new "receiverOpen" event listener.
     * This event indicates when the remote peer has created a `Sender`
     * and the server creates a `Receiver` link in response.
     * @param type - "receiverOpen"
     * @param listener -
     */
    on(type: "receiverOpen", listener: (event: ReceiverOpenEvent) => void): this;
    /**
     * Add new "receiverClose" event listener.
     * This event indicates when the remote peer has closed a `Sender`
     * and the server closes a `Receiver` link in response.
     * @param type - "receiverClose"
     * @param listener -
     */
    on(type: "receiverClose", listener: (event: ReceiverCloseEvent) => void): this;
    /**
     * Add new "connectionOpen" event listener.
     * This event indicates when the remote peer has created a connection to the server.
     * @param type - "connectionOpen"
     * @param listener -
     */
    on(type: "connectionOpen", listener: (event: ConnectionOpenEvent) => void): this;
    /**
     * Add new "senderOpen" event listener.
     * This event indicates when the remote peer has created a `Receiver`
     * and the server creates a `Sender` link in response.
     * @param type - "senderOpen"
     * @param listener -
     */
    on(type: "senderOpen", listener: (event: SenderOpenEvent) => void): this;
    /**
     * Add new "senderClose" event listener.
     * This event indicates when the remote peer has closed a `Receiver`
     * and the server closes a `Sender` link in response.
     * @param type - "senderClose"
     * @param listener -
     */
    on(type: "senderClose", listener: (event: SenderCloseEvent) => void): this;
    /**
     * Add new "connectionClose" event listener.
     * This event indicates when the remote peer has closed a connection to the server.
     * @param type - "connectionClose"
     * @param listener -
     */
    on(type: "connectionClose", listener: (event: ConnectionCloseEvent) => void): this;
    /**
     * Add new "onMessage" event listener.
     * This event indicates when the server has received a message from a remote peer.
     * Messages are received over a `Receiver` link.
     * @param type - "connectionClose"
     * @param listener -
     */
    on(type: "onMessages", listener: (event: OnMessagesEvent) => void): this;
    /**
     * Closes the server.
     */
    stop(): Promise<void>;
    private _setupDefaultListeners;
    private _normalizeIncomingMessage;
    private _handleMessage;
    private _sendMessage;
}
//# sourceMappingURL=mockServer.d.ts.map