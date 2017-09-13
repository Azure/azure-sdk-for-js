import { WebResource } from "../webResource";
import { ServiceClientCredentials } from "./serviceClientCredentials";
/**
 * Creates a new TokenCredentials object.
 *
 * @constructor
 * @param {string} token               The token.
 * @param {string} authorizationScheme The authorization scheme.
 */
export declare class TokenCredentials implements ServiceClientCredentials {
    token: string;
    authorizationScheme: string;
    constructor(token: string, authorizationScheme?: string);
    /**
     * Signs a request with the Authentication header.
     *
     * @param {WebResource} The WebResource to be signed.
     * @return {Promise<WebResource>} The signed request object.
     */
    signRequest(webResource: WebResource): Promise<WebResource>;
}
