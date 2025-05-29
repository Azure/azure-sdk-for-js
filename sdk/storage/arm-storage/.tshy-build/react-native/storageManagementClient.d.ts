import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
import { BlobServices, BlobContainers, FileServices, FileShares, QueueServices, Queue, Operations, Skus, StorageAccounts, DeletedAccounts, Usages, ManagementPolicies, BlobInventoryPolicies, PrivateEndpointConnections, PrivateLinkResources, ObjectReplicationPoliciesOperations, LocalUsersOperations, EncryptionScopes, TableServices, TableOperations, NetworkSecurityPerimeterConfigurations, StorageTaskAssignments, StorageTaskAssignmentsInstancesReport, StorageTaskAssignmentInstancesReport } from "./operationsInterfaces/index.js";
import { StorageManagementClientOptionalParams } from "./models/index.js";
export declare class StorageManagementClient extends coreClient.ServiceClient {
    $host: string;
    apiVersion: string;
    subscriptionId: string;
    /**
     * Initializes a new instance of the StorageManagementClient class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId The ID of the target subscription.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: StorageManagementClientOptionalParams);
    /** A function that adds a policy that sets the api-version (or equivalent) to reflect the library version. */
    private addCustomApiVersionPolicy;
    blobServices: BlobServices;
    blobContainers: BlobContainers;
    fileServices: FileServices;
    fileShares: FileShares;
    queueServices: QueueServices;
    queue: Queue;
    operations: Operations;
    skus: Skus;
    storageAccounts: StorageAccounts;
    deletedAccounts: DeletedAccounts;
    usages: Usages;
    managementPolicies: ManagementPolicies;
    blobInventoryPolicies: BlobInventoryPolicies;
    privateEndpointConnections: PrivateEndpointConnections;
    privateLinkResources: PrivateLinkResources;
    objectReplicationPoliciesOperations: ObjectReplicationPoliciesOperations;
    localUsersOperations: LocalUsersOperations;
    encryptionScopes: EncryptionScopes;
    tableServices: TableServices;
    tableOperations: TableOperations;
    networkSecurityPerimeterConfigurations: NetworkSecurityPerimeterConfigurations;
    storageTaskAssignments: StorageTaskAssignments;
    storageTaskAssignmentsInstancesReport: StorageTaskAssignmentsInstancesReport;
    storageTaskAssignmentInstancesReport: StorageTaskAssignmentInstancesReport;
}
//# sourceMappingURL=storageManagementClient.d.ts.map