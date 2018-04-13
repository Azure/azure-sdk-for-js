import { TokenInfo } from "./auth/token";
/**
 * @class CbsClient
 * Describes the EventHub Cbs client that talks to the $cbs endopint over AMQP connection.
 */
export declare class CbsClient {
    /**
     * @property {string} endpoint CBS endpoint - "$cbs"
     */
    readonly endpoint: string;
    /**
     * @property {string} replyTo CBS replyTo - The reciever link name that the service should reply to.
     */
    readonly replyTo: string;
    /**
     * @property {string} cbsLock The unqiue lock name per $cbs session per connection that is used to
     * acquire the lock for establishing a cbs session if one does not exist for an aqmp connection.
     */
    readonly cbsLock: string;
    /**
     * CBS sender, receiver on the same session.
     */
    private _cbsSenderReceiverLink?;
    /**
     * Creates a singleton instance of the CBS session if it hasn't been initialized previously on the given connection.
     * @param {any} connection The AMQP connection object on which the CBS session needs to be initialized.
     */
    init(connection: any): Promise<void>;
    /**
     * Negotiates the CBS claim with the EventHub Service.
     * @param {string} audience The audience for which the token is requested.
     * @param {any} connection The underlying AMQP connection.
     * @param {TokenInfo} tokenObject The token object that needs to be sent in the put-token request.
     * @return {Promise<any>} Returns a Promise that resolves when $cbs authentication is successful
     * and rejects when an error occurs during $cbs authentication.
     */
    negotiateClaim(audience: string, connection: any, tokenObject: TokenInfo): Promise<any>;
    /**
     * Closes the AMQP cbs session to the Event Hub for this client,
     * returning a promise that will be resolved when disconnection is completed.
     * @return {Promise<void>}
     */
    close(): Promise<void>;
}
