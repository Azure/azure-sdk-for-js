import { WebResource } from "../webResource";
import { ServiceClientCredentials } from "./serviceClientCredentials";
/**
 * @interface ApiKeyCredentialOptions
 * Describes the options to be provided while creating an instance of ApiKeyCredentials
 */
export interface ApiKeyCredentialOptions {
    /**
     * @property {object} [inHeader]  A key value pair of the header parameters that need to be applied to the request.
     */
    inHeader?: {
        [x: string]: any;
    };
    /**
     * @property {object} [inQuery]   A key value pair of the query parameters that need to be applied to the request.
     */
    inQuery?: {
        [x: string]: any;
    };
}
/**
 * Authenticates to a service using an API key.
 */
export declare class ApiKeyCredentials implements ServiceClientCredentials {
    private readonly inHeader?;
    private readonly inQuery?;
    /**
     * @constructor
     * @param {object} options   Specifies the options to be provided for auth. Either header or query needs to be provided.
     * @param {object} [inHeader]  A key value pair of the header parameters that need to be applied to the request.
     * @param {object} [inQuery]   A key value pair of the query parameters that need to be applied to the request.
     */
    constructor(options: ApiKeyCredentialOptions);
    /**
     * Signs a request with the values provided in the inHeader and inQuery parameter.
     *
     * @param {WebResource} The WebResource to be signed.
     * @returns {Promise<WebResource>} - The signed request object.
     */
    signRequest(webResource: WebResource): Promise<WebResource>;
}
