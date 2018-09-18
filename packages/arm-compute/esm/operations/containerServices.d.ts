import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a ContainerServices. */
export declare class ContainerServices {
    private readonly client;
    /**
     * Create a ContainerServices.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * @summary Gets a list of container services in the specified subscription.
     *
     * Gets a list of container services in the specified subscription. The operation returns
     * properties of each container service including state, orchestrator, number of masters and
     * agents, and FQDNs of masters and agents.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(): Promise<Models.ContainerServicesListResponse>;
    list(options: msRest.RequestOptionsBase): Promise<Models.ContainerServicesListResponse>;
    list(callback: msRest.ServiceCallback<Models.ContainerServiceListResult>): void;
    list(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ContainerServiceListResult>): void;
    /**
     * @summary Creates or updates a container service.
     *
     * Creates or updates a container service with the specified configuration of orchestrator,
     * masters, and agents.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} containerServiceName The name of the container service in the specified
     * subscription and resource group.
     *
     * @param {ContainerService} parameters Parameters supplied to the Create or Update a Container
     * Service operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createOrUpdate(resourceGroupName: string, containerServiceName: string, parameters: Models.ContainerService, options?: msRest.RequestOptionsBase): Promise<Models.ContainerServicesCreateOrUpdateResponse>;
    /**
     * @summary Gets the properties of the specified container service.
     *
     * Gets the properties of the specified container service in the specified subscription and
     * resource group. The operation returns the properties including state, orchestrator, number of
     * masters and agents, and FQDNs of masters and agents.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} containerServiceName The name of the container service in the specified
     * subscription and resource group.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(resourceGroupName: string, containerServiceName: string): Promise<Models.ContainerServicesGetResponse>;
    get(resourceGroupName: string, containerServiceName: string, options: msRest.RequestOptionsBase): Promise<Models.ContainerServicesGetResponse>;
    get(resourceGroupName: string, containerServiceName: string, callback: msRest.ServiceCallback<Models.ContainerService>): void;
    get(resourceGroupName: string, containerServiceName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ContainerService>): void;
    /**
     * @summary Deletes the specified container service.
     *
     * Deletes the specified container service in the specified subscription and resource group. The
     * operation does not delete other resources created as part of creating a container service,
     * including storage accounts, VMs, and availability sets. All the other resources created with the
     * container service are part of the same resource group and can be deleted individually.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} containerServiceName The name of the container service in the specified
     * subscription and resource group.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethod(resourceGroupName: string, containerServiceName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * @summary Gets a list of container services in the specified resource group.
     *
     * Gets a list of container services in the specified subscription and resource group. The
     * operation returns properties of each container service including state, orchestrator, number of
     * masters and agents, and FQDNs of masters and agents.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listByResourceGroup(resourceGroupName: string): Promise<Models.ContainerServicesListByResourceGroupResponse>;
    listByResourceGroup(resourceGroupName: string, options: msRest.RequestOptionsBase): Promise<Models.ContainerServicesListByResourceGroupResponse>;
    listByResourceGroup(resourceGroupName: string, callback: msRest.ServiceCallback<Models.ContainerServiceListResult>): void;
    listByResourceGroup(resourceGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ContainerServiceListResult>): void;
    /**
     * @summary Creates or updates a container service.
     *
     * Creates or updates a container service with the specified configuration of orchestrator,
     * masters, and agents.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} containerServiceName The name of the container service in the specified
     * subscription and resource group.
     *
     * @param {ContainerService} parameters Parameters supplied to the Create or Update a Container
     * Service operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginCreateOrUpdate(resourceGroupName: string, containerServiceName: string, parameters: Models.ContainerService, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * @summary Deletes the specified container service.
     *
     * Deletes the specified container service in the specified subscription and resource group. The
     * operation does not delete other resources created as part of creating a container service,
     * including storage accounts, VMs, and availability sets. All the other resources created with the
     * container service are part of the same resource group and can be deleted individually.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} containerServiceName The name of the container service in the specified
     * subscription and resource group.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeleteMethod(resourceGroupName: string, containerServiceName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * @summary Gets a list of container services in the specified subscription.
     *
     * Gets a list of container services in the specified subscription. The operation returns
     * properties of each container service including state, orchestrator, number of masters and
     * agents, and FQDNs of masters and agents.
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
    listNext(nextPageLink: string): Promise<Models.ContainerServicesListNextResponse>;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.ContainerServicesListNextResponse>;
    listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ContainerServiceListResult>): void;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ContainerServiceListResult>): void;
    /**
     * @summary Gets a list of container services in the specified resource group.
     *
     * Gets a list of container services in the specified subscription and resource group. The
     * operation returns properties of each container service including state, orchestrator, number of
     * masters and agents, and FQDNs of masters and agents.
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
    listByResourceGroupNext(nextPageLink: string): Promise<Models.ContainerServicesListByResourceGroupNextResponse>;
    listByResourceGroupNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.ContainerServicesListByResourceGroupNextResponse>;
    listByResourceGroupNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ContainerServiceListResult>): void;
    listByResourceGroupNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ContainerServiceListResult>): void;
}
//# sourceMappingURL=containerServices.d.ts.map