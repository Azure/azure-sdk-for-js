import { BaseFilter } from "./baseFilter";
import { HttpOperationResponse } from "../httpOperationResponse";
import { WebResource } from "../webResource";
export declare class RPRegistrationFilter extends BaseFilter {
    constructor(retryTimeout?: number);
    after(operationResponse: HttpOperationResponse): Promise<HttpOperationResponse>;
    /**
     * Reuses the headers of the original request and url (if specified).
     * @param {WebResource} originalRequest The original request
     * @param {boolean} reuseUrlToo Should the url from the original request be reused as well. Default false.
     * @returns {object} reqOptions - A new request object with desired headers.
     */
    getRequestEssentials(originalRequest: WebResource, reuseUrlToo?: boolean): any;
    /**
     * Validates the error code and message associated with 409 response status code. If it matches to that of
     * RP not registered then it returns the name of the RP else returns undefined.
     * @param {string} body - The response body received after making the original request.
     * @returns {string} result The name of the RP if condition is satisfied else undefined.
     */
    checkRPNotRegisteredError(body: string): string;
    /**
     * Extracts the first part of the URL, just after subscription:
     * https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
     * @param {string} url - The original request url
     * @returns {string} urlPrefix The url prefix as explained above.
     */
    extractSubscriptionUrl(url: string): string;
    /**
     * Registers the given provider.
     * @param {string} urlPrefix - https://management.azure.com/subscriptions/00000000-0000-0000-0000-000000000000/
     * @param {string} provider - The provider name to be registered.
     * @param {object} originalRequest - The original request sent by the user that returned a 409 response
     * with a message that the provider is not registered.
     * @param {registrationCallback} callback - The callback that handles the RP registration
     */
    registerRP(urlPrefix: string, provider: string, originalRequest: WebResource): Promise<boolean>;
    /**
     * Polls the registration status of the provider that was registered. Polling happens at an interval of 30 seconds.
     * Polling will happen till the registrationState property of the response body is "Registered".
     * @param {string} url - The request url for polling
     * @param {object} originalRequest - The original request sent by the user that returned a 409 response
     * with a message that the provider is not registered.
     * @returns {Promise<boolean>} promise - True if RP Registration is successful.
     */
    getRegistrationStatus(url: string, originalRequest: WebResource): Promise<boolean>;
}
