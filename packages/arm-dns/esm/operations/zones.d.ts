import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import { DnsManagementClientContext } from "../dnsManagementClientContext";
/** Class representing a Zones. */
export declare class Zones {
    private readonly client;
    /**
     * Create a Zones.
     * @param {DnsManagementClientContext} client Reference to the service client.
     */
    constructor(client: DnsManagementClientContext);
    /**
     * Creates or updates a DNS zone. Does not modify DNS records within the zone.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} zoneName The name of the DNS zone (without a terminating dot).
     *
     * @param {Zone} parameters Parameters supplied to the CreateOrUpdate operation.
     *
     * @param {ZonesCreateOrUpdateOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createOrUpdate(resourceGroupName: string, zoneName: string, parameters: Models.Zone): Promise<Models.ZonesCreateOrUpdateResponse>;
    createOrUpdate(resourceGroupName: string, zoneName: string, parameters: Models.Zone, options: Models.ZonesCreateOrUpdateOptionalParams): Promise<Models.ZonesCreateOrUpdateResponse>;
    createOrUpdate(resourceGroupName: string, zoneName: string, parameters: Models.Zone, callback: msRest.ServiceCallback<Models.Zone>): void;
    createOrUpdate(resourceGroupName: string, zoneName: string, parameters: Models.Zone, options: Models.ZonesCreateOrUpdateOptionalParams, callback: msRest.ServiceCallback<Models.Zone>): void;
    /**
     * Deletes a DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation
     * cannot be undone.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} zoneName The name of the DNS zone (without a terminating dot).
     *
     * @param {ZonesDeleteMethodOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethod(resourceGroupName: string, zoneName: string, options?: Models.ZonesDeleteMethodOptionalParams): Promise<msRest.RestResponse>;
    /**
     * Gets a DNS zone. Retrieves the zone properties, but not the record sets within the zone.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} zoneName The name of the DNS zone (without a terminating dot).
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(resourceGroupName: string, zoneName: string): Promise<Models.ZonesGetResponse>;
    get(resourceGroupName: string, zoneName: string, options: msRest.RequestOptionsBase): Promise<Models.ZonesGetResponse>;
    get(resourceGroupName: string, zoneName: string, callback: msRest.ServiceCallback<Models.Zone>): void;
    get(resourceGroupName: string, zoneName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Zone>): void;
    /**
     * Updates a DNS zone. Does not modify DNS records within the zone.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} zoneName The name of the DNS zone (without a terminating dot).
     *
     * @param {ZoneUpdate} parameters Parameters supplied to the Update operation.
     *
     * @param {ZonesUpdateOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    update(resourceGroupName: string, zoneName: string, parameters: Models.ZoneUpdate): Promise<Models.ZonesUpdateResponse>;
    update(resourceGroupName: string, zoneName: string, parameters: Models.ZoneUpdate, options: Models.ZonesUpdateOptionalParams): Promise<Models.ZonesUpdateResponse>;
    update(resourceGroupName: string, zoneName: string, parameters: Models.ZoneUpdate, callback: msRest.ServiceCallback<Models.Zone>): void;
    update(resourceGroupName: string, zoneName: string, parameters: Models.ZoneUpdate, options: Models.ZonesUpdateOptionalParams, callback: msRest.ServiceCallback<Models.Zone>): void;
    /**
     * Lists the DNS zones within a resource group.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {ZonesListByResourceGroupOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    listByResourceGroup(resourceGroupName: string): Promise<Models.ZonesListByResourceGroupResponse>;
    listByResourceGroup(resourceGroupName: string, options: Models.ZonesListByResourceGroupOptionalParams): Promise<Models.ZonesListByResourceGroupResponse>;
    listByResourceGroup(resourceGroupName: string, callback: msRest.ServiceCallback<Models.ZoneListResult>): void;
    listByResourceGroup(resourceGroupName: string, options: Models.ZonesListByResourceGroupOptionalParams, callback: msRest.ServiceCallback<Models.ZoneListResult>): void;
    /**
     * Lists the DNS zones in all resource groups in a subscription.
     *
     * @param {ZonesListOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(): Promise<Models.ZonesListResponse>;
    list(options: Models.ZonesListOptionalParams): Promise<Models.ZonesListResponse>;
    list(callback: msRest.ServiceCallback<Models.ZoneListResult>): void;
    list(options: Models.ZonesListOptionalParams, callback: msRest.ServiceCallback<Models.ZoneListResult>): void;
    /**
     * Deletes a DNS zone. WARNING: All DNS records in the zone will also be deleted. This operation
     * cannot be undone.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} zoneName The name of the DNS zone (without a terminating dot).
     *
     * @param {ZonesBeginDeleteMethodOptionalParams} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeleteMethod(resourceGroupName: string, zoneName: string, options?: Models.ZonesBeginDeleteMethodOptionalParams): Promise<msRestAzure.LROPoller>;
    /**
     * Lists the DNS zones within a resource group.
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
    listByResourceGroupNext(nextPageLink: string): Promise<Models.ZonesListByResourceGroupNextResponse>;
    listByResourceGroupNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.ZonesListByResourceGroupNextResponse>;
    listByResourceGroupNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ZoneListResult>): void;
    listByResourceGroupNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ZoneListResult>): void;
    /**
     * Lists the DNS zones in all resource groups in a subscription.
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
    listNext(nextPageLink: string): Promise<Models.ZonesListNextResponse>;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.ZonesListNextResponse>;
    listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.ZoneListResult>): void;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.ZoneListResult>): void;
}
//# sourceMappingURL=zones.d.ts.map