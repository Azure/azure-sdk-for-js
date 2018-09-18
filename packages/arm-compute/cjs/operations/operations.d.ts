import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a Operations. */
export declare class Operations {
    private readonly client;
    /**
     * Create a Operations.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Gets a list of compute operations.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(): Promise<Models.OperationsListResponse>;
    list(options: msRest.RequestOptionsBase): Promise<Models.OperationsListResponse>;
    list(callback: msRest.ServiceCallback<Models.ComputeOperationListResult>): void;
    list(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ComputeOperationListResult>): void;
}
//# sourceMappingURL=operations.d.ts.map