import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a VirtualMachineSizes. */
export declare class VirtualMachineSizes {
    private readonly client;
    /**
     * Create a VirtualMachineSizes.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * This API is deprecated. Use [Resources
     * Skus](https://docs.microsoft.com/en-us/rest/api/compute/resourceskus/list)
     *
     * @param {string} location The location upon which virtual-machine-sizes is queried.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(location: string): Promise<Models.VirtualMachineSizesListResponse>;
    list(location: string, options: msRest.RequestOptionsBase): Promise<Models.VirtualMachineSizesListResponse>;
    list(location: string, callback: msRest.ServiceCallback<Models.VirtualMachineSizeListResult>): void;
    list(location: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineSizeListResult>): void;
}
//# sourceMappingURL=virtualMachineSizes.d.ts.map