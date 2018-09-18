import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a UsageOperations. */
export declare class UsageOperations {
    private readonly client;
    /**
     * Create a UsageOperations.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Gets, for the specified location, the current compute resource usage information as well as the
     * limits for compute resources under the subscription.
     *
     * @param {string} location The location for which resource usage is queried.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(location: string): Promise<Models.UsageListResponse>;
    list(location: string, options: msRest.RequestOptionsBase): Promise<Models.UsageListResponse>;
    list(location: string, callback: msRest.ServiceCallback<Models.ListUsagesResult>): void;
    list(location: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ListUsagesResult>): void;
    /**
     * Gets, for the specified location, the current compute resource usage information as well as the
     * limits for compute resources under the subscription.
     *
     * @param {string} nextPageLink The NextLink from the previous successful call to List operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listNext(nextPageLink: string): Promise<Models.UsageListNextResponse>;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.UsageListNextResponse>;
    listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ListUsagesResult>): void;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ListUsagesResult>): void;
}
//# sourceMappingURL=usageOperations.d.ts.map