import { ReceiverOptions, SenderOptions, OnAmqpEvent } from "./rhea-promise";
import { ConnectionContext } from "./connectionContext";
import { AmqpMessage } from ".";
export interface RequestResponseLink {
    sender: any;
    receiver: any;
    session: any;
}
export interface ReceiverLink {
    receiver: any;
    session: any;
}
export interface SenderLink {
    sender: any;
    session: any;
}
export interface LinkOptions {
    connection: any;
}
export interface ReceiverLinkOptions extends LinkOptions {
    onMessage: OnAmqpEvent;
    onError: OnAmqpEvent;
    receiverOptions: ReceiverOptions;
}
export declare function createRequestResponseLink(connection: any, senderOptions: SenderOptions, receiverOptions: ReceiverOptions): Promise<RequestResponseLink>;
export declare function createReceiverLink(connection: any, receiverOptions: ReceiverOptions): Promise<ReceiverLink>;
export declare function createReceiverLinkWithHandlers(options: ReceiverLinkOptions): Promise<ReceiverLink>;
export declare function createSenderLink(connection: any, senderOptions: SenderOptions): Promise<SenderLink>;
export declare function sendRequest(connection: any, link: RequestResponseLink, request: AmqpMessage, timeoutInSeconds?: number): Promise<any>;
/**
 * Opens the AMQP connection to the Event Hub for this client, returning a promise
 * that will be resolved when the connection is completed.
 *
 * @param {ConnectionContext} context The connection context.
 * @param {boolean} [useSaslPlain]   True for using sasl plain mode for authentication, false otherwise.
 * @returns {Promise<void>}
 */
export declare function open(context: ConnectionContext, useSaslPlain?: boolean): Promise<void>;
