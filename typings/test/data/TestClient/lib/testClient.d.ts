import * as msRest from '../../../../lib/msRest';
/**
 * @class
 * Initializes a new instance of the TestClient class.
 * @constructor
 *
 * @param {string} [baseUri] - The base URI of the service.
 *
 * @param {object} [options] - The parameter options
 *
 * @param {Array} [options.filters] - Filters to be added to the request pipeline
 *
 * @param {object} [options.requestOptions] - Options for the underlying request object
 * {@link https://github.com/request/request#requestoptions-callback Options doc}
 *
 * @param {bool} [options.noRetryPolicy] - If set to true, turn off default retry policy
 */
declare class TestClient extends msRest.ServiceClient {
    baseUri?: string;
    acceptLanguage?: string;
    models?: any;
    serializer: msRest.Serializer;
    constructor(baseUri: string, options?: msRest.ServiceClientOptions);
}
export { TestClient };
