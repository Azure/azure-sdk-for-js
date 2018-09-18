import * as msRest from "ms-rest-js";
import * as msRestAzure from "ms-rest-azure-js";
import * as Models from "../models";
import { ComputeManagementClientContext } from "../computeManagementClientContext";
/** Class representing a Snapshots. */
export declare class Snapshots {
    private readonly client;
    /**
     * Create a Snapshots.
     * @param {ComputeManagementClientContext} client Reference to the service client.
     */
    constructor(client: ComputeManagementClientContext);
    /**
     * Creates or updates a snapshot.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} snapshotName The name of the snapshot that is being created. The name can't be
     * changed after the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and
     * _. The max name length is 80 characters.
     *
     * @param {Snapshot} snapshot Snapshot object supplied in the body of the Put disk operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    createOrUpdate(resourceGroupName: string, snapshotName: string, snapshot: Models.Snapshot, options?: msRest.RequestOptionsBase): Promise<Models.SnapshotsCreateOrUpdateResponse>;
    /**
     * Updates (patches) a snapshot.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} snapshotName The name of the snapshot that is being created. The name can't be
     * changed after the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and
     * _. The max name length is 80 characters.
     *
     * @param {SnapshotUpdate} snapshot Snapshot object supplied in the body of the Patch snapshot
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
    update(resourceGroupName: string, snapshotName: string, snapshot: Models.SnapshotUpdate, options?: msRest.RequestOptionsBase): Promise<Models.SnapshotsUpdateResponse>;
    /**
     * Gets information about a snapshot.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} snapshotName The name of the snapshot that is being created. The name can't be
     * changed after the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and
     * _. The max name length is 80 characters.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    get(resourceGroupName: string, snapshotName: string): Promise<Models.SnapshotsGetResponse>;
    get(resourceGroupName: string, snapshotName: string, options: msRest.RequestOptionsBase): Promise<Models.SnapshotsGetResponse>;
    get(resourceGroupName: string, snapshotName: string, callback: msRest.ServiceCallback<Models.Snapshot>): void;
    get(resourceGroupName: string, snapshotName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.Snapshot>): void;
    /**
     * Deletes a snapshot.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} snapshotName The name of the snapshot that is being created. The name can't be
     * changed after the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and
     * _. The max name length is 80 characters.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    deleteMethod(resourceGroupName: string, snapshotName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Lists snapshots under a resource group.
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
    listByResourceGroup(resourceGroupName: string): Promise<Models.SnapshotsListByResourceGroupResponse>;
    listByResourceGroup(resourceGroupName: string, options: msRest.RequestOptionsBase): Promise<Models.SnapshotsListByResourceGroupResponse>;
    listByResourceGroup(resourceGroupName: string, callback: msRest.ServiceCallback<Models.SnapshotList>): void;
    listByResourceGroup(resourceGroupName: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SnapshotList>): void;
    /**
     * Lists snapshots under a subscription.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    list(): Promise<Models.SnapshotsListResponse>;
    list(options: msRest.RequestOptionsBase): Promise<Models.SnapshotsListResponse>;
    list(callback: msRest.ServiceCallback<Models.SnapshotList>): void;
    list(options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SnapshotList>): void;
    /**
     * Grants access to a snapshot.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} snapshotName The name of the snapshot that is being created. The name can't be
     * changed after the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and
     * _. The max name length is 80 characters.
     *
     * @param {GrantAccessData} grantAccessData Access data object supplied in the body of the get
     * snapshot access operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    grantAccess(resourceGroupName: string, snapshotName: string, grantAccessData: Models.GrantAccessData, options?: msRest.RequestOptionsBase): Promise<Models.SnapshotsGrantAccessResponse>;
    /**
     * Revokes access to a snapshot.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} snapshotName The name of the snapshot that is being created. The name can't be
     * changed after the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and
     * _. The max name length is 80 characters.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    revokeAccess(resourceGroupName: string, snapshotName: string, options?: msRest.RequestOptionsBase): Promise<msRest.RestResponse>;
    /**
     * Creates or updates a snapshot.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} snapshotName The name of the snapshot that is being created. The name can't be
     * changed after the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and
     * _. The max name length is 80 characters.
     *
     * @param {Snapshot} snapshot Snapshot object supplied in the body of the Put disk operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginCreateOrUpdate(resourceGroupName: string, snapshotName: string, snapshot: Models.Snapshot, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Updates (patches) a snapshot.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} snapshotName The name of the snapshot that is being created. The name can't be
     * changed after the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and
     * _. The max name length is 80 characters.
     *
     * @param {SnapshotUpdate} snapshot Snapshot object supplied in the body of the Patch snapshot
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
    beginUpdate(resourceGroupName: string, snapshotName: string, snapshot: Models.SnapshotUpdate, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Deletes a snapshot.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} snapshotName The name of the snapshot that is being created. The name can't be
     * changed after the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and
     * _. The max name length is 80 characters.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginDeleteMethod(resourceGroupName: string, snapshotName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Grants access to a snapshot.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} snapshotName The name of the snapshot that is being created. The name can't be
     * changed after the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and
     * _. The max name length is 80 characters.
     *
     * @param {GrantAccessData} grantAccessData Access data object supplied in the body of the get
     * snapshot access operation.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginGrantAccess(resourceGroupName: string, snapshotName: string, grantAccessData: Models.GrantAccessData, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Revokes access to a snapshot.
     *
     * @param {string} resourceGroupName The name of the resource group.
     *
     * @param {string} snapshotName The name of the snapshot that is being created. The name can't be
     * changed after the snapshot is created. Supported characters for the name are a-z, A-Z, 0-9 and
     * _. The max name length is 80 characters.
     *
     * @param {RequestOptionsBase} [options] Optional Parameters.
     *
     * @returns {Promise} A promise is returned
     *
     * @resolve {HttpOperationResponse} The deserialized result object.
     *
     * @reject {Error|ServiceError} The error object.
     */
    beginRevokeAccess(resourceGroupName: string, snapshotName: string, options?: msRest.RequestOptionsBase): Promise<msRestAzure.LROPoller>;
    /**
     * Lists snapshots under a resource group.
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
    listByResourceGroupNext(nextPageLink: string): Promise<Models.SnapshotsListByResourceGroupNextResponse>;
    listByResourceGroupNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.SnapshotsListByResourceGroupNextResponse>;
    listByResourceGroupNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.SnapshotList>): void;
    listByResourceGroupNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SnapshotList>): void;
    /**
     * Lists snapshots under a subscription.
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
    listNext(nextPageLink: string): Promise<Models.SnapshotsListNextResponse>;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase): Promise<Models.SnapshotsListNextResponse>;
    listNext(nextPageLink: string, callback: msRest.ServiceCallback<Models.SnapshotList>): void;
    listNext(nextPageLink: string, options: msRest.RequestOptionsBase, callback: msRest.ServiceCallback<Models.SnapshotList>): void;
}
//# sourceMappingURL=snapshots.d.ts.map