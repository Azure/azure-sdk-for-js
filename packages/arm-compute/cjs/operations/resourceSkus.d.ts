import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a ResourceSkus. */
export declare class ResourceSkus {
    private readonly client;
    /**
     * Create a ResourceSkus.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Gets the list of Microsoft.Compute SKUs available for your Subscription.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(): Promise<Models.ResourceSkusListResponse>;
    list(options: msRest.RequestOptionsBase): Promise<Models.ResourceSkusListResponse>;
    list(callback: msRest.ServiceCallback<Models.ResourceSkusResult>): void;
    list(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ResourceSkusResult>): void;
    /**
     * Gets the list of Microsoft.Compute SKUs available for your Subscription.
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
    listNext(nextPageLink: string): Promise<Models.ResourceSkusListNextResponse>;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.ResourceSkusListNextResponse>;
    listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ResourceSkusResult>): void;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ResourceSkusResult>): void;
}
//# sourceMappingURL=resourceSkus.d.ts.map