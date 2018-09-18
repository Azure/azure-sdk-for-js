import * as msRest from "ms-rest-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a AvailabilitySets. */
export declare class AvailabilitySets {
    private readonly client;
    /**
     * Create a AvailabilitySets.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Create or update an availability set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} availabilitySetName The name of the availability set.
     *
     * @param {AvailabilitySet} parameters Parameters supplied to the Create Availability Set
     * operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createOrUpdate(resourceGroupName: string, availabilitySetName: string, parameters: Models.AvailabilitySet): Promise<Models.AvailabilitySetsCreateOrUpdateResponse>;
    createOrUpdate(resourceGroupName: string, availabilitySetName: string, parameters: Models.AvailabilitySet, options: msRest.RequestOptionsBase): Promise<Models.AvailabilitySetsCreateOrUpdateResponse>;
    createOrUpdate(resourceGroupName: string, availabilitySetName: string, parameters: Models.AvailabilitySet, callback: msRest.ServiceCallback<Models.AvailabilitySet>): void;
    createOrUpdate(resourceGroupName: string, availabilitySetName: string, parameters: Models.AvailabilitySet, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AvailabilitySet>): void;
    /**
     * Update an availability set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} availabilitySetName The name of the availability set.
     *
     * @param {AvailabilitySetUpdate} parameters Parameters supplied to the Update Availability Set
     * operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    update(resourceGroupName: string, availabilitySetName: string, parameters: Models.AvailabilitySetUpdate): Promise<Models.AvailabilitySetsUpdateResponse>;
    update(resourceGroupName: string, availabilitySetName: string, parameters: Models.AvailabilitySetUpdate, options: msRest.RequestOptionsBase): Promise<Models.AvailabilitySetsUpdateResponse>;
    update(resourceGroupName: string, availabilitySetName: string, parameters: Models.AvailabilitySetUpdate, callback: msRest.ServiceCallback<Models.AvailabilitySet>): void;
    update(resourceGroupName: string, availabilitySetName: string, parameters: Models.AvailabilitySetUpdate, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AvailabilitySet>): void;
    /**
     * Delete an availability set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} availabilitySetName The name of the availability set.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethod(resourceGroupName: string, availabilitySetName: string): Promise<msRest.RestResponse>;
    deleteMethod(resourceGroupName: string, availabilitySetName: string, options: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    deleteMethod(resourceGroupName: string, availabilitySetName: string, callback: msRest.ServiceCallback<void>): void;
    deleteMethod(resourceGroupName: string, availabilitySetName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<void>): void;
    /**
     * Retrieves information about an availability set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} availabilitySetName The name of the availability set.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(resourceGroupName: string, availabilitySetName: string): Promise<Models.AvailabilitySetsGetResponse>;
    get(resourceGroupName: string, availabilitySetName: string, options: msRest.RequestOptionsBase): Promise<Models.AvailabilitySetsGetResponse>;
    get(resourceGroupName: string, availabilitySetName: string, callback: msRest.ServiceCallback<Models.AvailabilitySet>): void;
    get(resourceGroupName: string, availabilitySetName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AvailabilitySet>): void;
    /**
     * Lists all availability sets in a subscription.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listBySubscription(): Promise<Models.AvailabilitySetsListBySubscriptionResponse>;
    listBySubscription(options: msRest.RequestOptionsBase): Promise<Models.AvailabilitySetsListBySubscriptionResponse>;
    listBySubscription(callback: msRest.ServiceCallback<Models.AvailabilitySetListResult>): void;
    listBySubscription(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AvailabilitySetListResult>): void;
    /**
     * Lists all availability sets in a resource group.
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
    list(resourceGroupName: string): Promise<Models.AvailabilitySetsListResponse>;
    list(resourceGroupName: string, options: msRest.RequestOptionsBase): Promise<Models.AvailabilitySetsListResponse>;
    list(resourceGroupName: string, callback: msRest.ServiceCallback<Models.AvailabilitySetListResult>): void;
    list(resourceGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AvailabilitySetListResult>): void;
    /**
     * Lists all available virtual machine sizes that can be used to create a new virtual machine in an
     * existing availability set.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} availabilitySetName The name of the availability set.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listAvailableSizes(resourceGroupName: string, availabilitySetName: string): Promise<Models.AvailabilitySetsListAvailableSizesResponse>;
    listAvailableSizes(resourceGroupName: string, availabilitySetName: string, options: msRest.RequestOptionsBase): Promise<Models.AvailabilitySetsListAvailableSizesResponse>;
    listAvailableSizes(resourceGroupName: string, availabilitySetName: string, callback: msRest.ServiceCallback<Models.VirtualMachineSizeListResult>): void;
    listAvailableSizes(resourceGroupName: string, availabilitySetName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.VirtualMachineSizeListResult>): void;
    /**
     * Lists all availability sets in a subscription.
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
    listBySubscriptionNext(nextPageLink: string): Promise<Models.AvailabilitySetsListBySubscriptionNextResponse>;
    listBySubscriptionNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.AvailabilitySetsListBySubscriptionNextResponse>;
    listBySubscriptionNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.AvailabilitySetListResult>): void;
    listBySubscriptionNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AvailabilitySetListResult>): void;
    /**
     * Lists all availability sets in a resource group.
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
    listNext(nextPageLink: string): Promise<Models.AvailabilitySetsListNextResponse>;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.AvailabilitySetsListNextResponse>;
    listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.AvailabilitySetListResult>): void;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.AvailabilitySetListResult>): void;
}
//# sourceMappingURL=availabilitySets.d.ts.map