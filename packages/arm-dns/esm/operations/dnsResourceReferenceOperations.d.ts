import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { DnsManagementClientContext } from "../dnsManagementClientContext";
/** Class representing a DnsResourceReferenceOperations. */
export declare class DnsResourceReferenceOperations {
    private readonly client;
    /**
     * Create a DnsResourceReferenceOperations.
     * @param {DnsManagementClientContext} client Reference to the service client.
     */
    constructor(client: DnsManagementClientContext);
    /**
     * Returns the DNS records specified by the referencing targetResourceIds.
     *
     * @param {DnsResourceReferenceRequest} parameters Properties for dns resource reference request.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    getByTargetResources(parameters: Models.DnsResourceReferenceRequest): Promise<Models.DnsResourceReferenceGetByTargetResourcesResponse>;
    getByTargetResources(parameters: Models.DnsResourceReferenceRequest, options: msRest.RequestOptionsBase): Promise<Models.DnsResourceReferenceGetByTargetResourcesResponse>;
    getByTargetResources(parameters: Models.DnsResourceReferenceRequest, callback: msRest.ServiceCallback<Models.DnsResourceReferenceResult>): void;
    getByTargetResources(parameters: Models.DnsResourceReferenceRequest, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DnsResourceReferenceResult>): void;
}
//# sourceMappingURL=dnsResourceReferenceOperations.d.ts.map