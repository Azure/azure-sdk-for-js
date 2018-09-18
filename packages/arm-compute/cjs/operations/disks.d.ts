import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a Disks. */
export declare class Disks {
    private readonly client;
    /**
     * Create a Disks.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Creates or updates a disk.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} diskName The name of the managed disk that is being created. The name can't be
     * changed after the disk is created. Supported characters for the name are a-z, A-Z, 0-9 and _.
     * The maximum name length is 80 characters.
     *
     * @param {Disk} disk Disk object supplied in the body of the Put disk operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createOrUpdate(resourceGroupName: string, diskName: string, disk: Models.Disk, options?: msRest.RequestOptionsBase): Promise<Models.DisksCreateOrUpdateResponse>;
    /**
     * Updates (patches) a disk.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} diskName The name of the managed disk that is being created. The name can't be
     * changed after the disk is created. Supported characters for the name are a-z, A-Z, 0-9 and _.
     * The maximum name length is 80 characters.
     *
     * @param {DiskUpdate} disk Disk object supplied in the body of the Patch disk operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    update(resourceGroupName: string, diskName: string, disk: Models.DiskUpdate, options?: msRest.RequestOptionsBase): Promise<Models.DisksUpdateResponse>;
    /**
     * Gets information about a disk.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} diskName The name of the managed disk that is being created. The name can't be
     * changed after the disk is created. Supported characters for the name are a-z, A-Z, 0-9 and _.
     * The maximum name length is 80 characters.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(resourceGroupName: string, diskName: string): Promise<Models.DisksGetResponse>;
    get(resourceGroupName: string, diskName: string, options: msRest.RequestOptionsBase): Promise<Models.DisksGetResponse>;
    get(resourceGroupName: string, diskName: string, callback: msRest.ServiceCallback<Models.Disk>): void;
    get(resourceGroupName: string, diskName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Disk>): void;
    /**
     * Deletes a disk.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} diskName The name of the managed disk that is being created. The name can't be
     * changed after the disk is created. Supported characters for the name are a-z, A-Z, 0-9 and _.
     * The maximum name length is 80 characters.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethod(resourceGroupName: string, diskName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Lists all the disks under a resource group.
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
    listByResourceGroup(resourceGroupName: string): Promise<Models.DisksListByResourceGroupResponse>;
    listByResourceGroup(resourceGroupName: string, options: msRest.RequestOptionsBase): Promise<Models.DisksListByResourceGroupResponse>;
    listByResourceGroup(resourceGroupName: string, callback: msRest.ServiceCallback<Models.DiskList>): void;
    listByResourceGroup(resourceGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DiskList>): void;
    /**
     * Lists all the disks under a subscription.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(): Promise<Models.DisksListResponse>;
    list(options: msRest.RequestOptionsBase): Promise<Models.DisksListResponse>;
    list(callback: msRest.ServiceCallback<Models.DiskList>): void;
    list(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DiskList>): void;
    /**
     * Grants access to a disk.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} diskName The name of the managed disk that is being created. The name can't be
     * changed after the disk is created. Supported characters for the name are a-z, A-Z, 0-9 and _.
     * The maximum name length is 80 characters.
     *
     * @param {GrantAccessData} grantAccessData Access data object supplied in the body of the get disk
     * access operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    grantAccess(resourceGroupName: string, diskName: string, grantAccessData: Models.GrantAccessData, options?: msRest.RequestOptionsBase): Promise<Models.DisksGrantAccessResponse>;
    /**
     * Revokes access to a disk.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} diskName The name of the managed disk that is being created. The name can't be
     * changed after the disk is created. Supported characters for the name are a-z, A-Z, 0-9 and _.
     * The maximum name length is 80 characters.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    revokeAccess(resourceGroupName: string, diskName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Creates or updates a disk.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} diskName The name of the managed disk that is being created. The name can't be
     * changed after the disk is created. Supported characters for the name are a-z, A-Z, 0-9 and _.
     * The maximum name length is 80 characters.
     *
     * @param {Disk} disk Disk object supplied in the body of the Put disk operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginCreateOrUpdate(resourceGroupName: string, diskName: string, disk: Models.Disk, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Updates (patches) a disk.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} diskName The name of the managed disk that is being created. The name can't be
     * changed after the disk is created. Supported characters for the name are a-z, A-Z, 0-9 and _.
     * The maximum name length is 80 characters.
     *
     * @param {DiskUpdate} disk Disk object supplied in the body of the Patch disk operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginUpdate(resourceGroupName: string, diskName: string, disk: Models.DiskUpdate, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Deletes a disk.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} diskName The name of the managed disk that is being created. The name can't be
     * changed after the disk is created. Supported characters for the name are a-z, A-Z, 0-9 and _.
     * The maximum name length is 80 characters.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeleteMethod(resourceGroupName: string, diskName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Grants access to a disk.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} diskName The name of the managed disk that is being created. The name can't be
     * changed after the disk is created. Supported characters for the name are a-z, A-Z, 0-9 and _.
     * The maximum name length is 80 characters.
     *
     * @param {GrantAccessData} grantAccessData Access data object supplied in the body of the get disk
     * access operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginGrantAccess(resourceGroupName: string, diskName: string, grantAccessData: Models.GrantAccessData, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Revokes access to a disk.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} diskName The name of the managed disk that is being created. The name can't be
     * changed after the disk is created. Supported characters for the name are a-z, A-Z, 0-9 and _.
     * The maximum name length is 80 characters.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginRevokeAccess(resourceGroupName: string, diskName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Lists all the disks under a resource group.
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
    listByResourceGroupNext(nextPageLink: string): Promise<Models.DisksListByResourceGroupNextResponse>;
    listByResourceGroupNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.DisksListByResourceGroupNextResponse>;
    listByResourceGroupNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.DiskList>): void;
    listByResourceGroupNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DiskList>): void;
    /**
     * Lists all the disks under a subscription.
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
    listNext(nextPageLink: string): Promise<Models.DisksListNextResponse>;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.DisksListNextResponse>;
    listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.DiskList>): void;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.DiskList>): void;
}
//# sourceMappingURL=disks.d.ts.map