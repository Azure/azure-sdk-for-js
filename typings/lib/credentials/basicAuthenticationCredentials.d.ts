import { WebResource } from "../webResource";
import { ServiceClientCredentials } from "./serviceClientCredentials";
/**
 * Creates a new BasicAuthenticationCredentials object.
 *
 * @constructor
 * @param {string} userName                 User name.
 * @param {string} password                 Password.
 * @param {string} [authorizationScheme]    The authorization scheme.
 */
export declare class BasicAuthenticationCredentials implements ServiceClientCredentials {
    userName: string;
    password: string;
    authorizationScheme: string;
    constructor(userName: string, password: string, authorizationScheme?: string);
    /**
     * Signs a request with the Authentication header.
     *
     * @param {WebResource} The WebResource to be signed.
     * @returns {Promise<WebResource>} - The signed request object.
     */
    signRequest(webResource: WebResource): Promise<WebResource>;
}
