import * as coreClient from "@azure/core-client";
import * as coreAuth from "@azure/core-auth";
import { QueryPacks, Queries, DataExports, DataSources, IntelligencePacks, LinkedServices, LinkedStorageAccounts, ManagementGroups, OperationStatuses, SharedKeysOperations, Usages, StorageInsightConfigs, SavedSearches, AvailableServiceTiers, Gateways, SchemaOperations, WorkspacePurge, Clusters, Operations, Workspaces, DeletedWorkspaces, Tables } from "./operationsInterfaces/index.js";
import { OperationalInsightsManagementClientOptionalParams } from "./models/index.js";
export declare class OperationalInsightsManagementClient extends coreClient.ServiceClient {
    $host: string;
    subscriptionId: string;
    /**
     * Initializes a new instance of the OperationalInsightsManagementClient class.
     * @param credentials Subscription credentials which uniquely identify client subscription.
     * @param subscriptionId The ID of the target subscription.
     * @param options The parameter options
     */
    constructor(credentials: coreAuth.TokenCredential, subscriptionId: string, options?: OperationalInsightsManagementClientOptionalParams);
    queryPacks: QueryPacks;
    queries: Queries;
    dataExports: DataExports;
    dataSources: DataSources;
    intelligencePacks: IntelligencePacks;
    linkedServices: LinkedServices;
    linkedStorageAccounts: LinkedStorageAccounts;
    managementGroups: ManagementGroups;
    operationStatuses: OperationStatuses;
    sharedKeysOperations: SharedKeysOperations;
    usages: Usages;
    storageInsightConfigs: StorageInsightConfigs;
    savedSearches: SavedSearches;
    availableServiceTiers: AvailableServiceTiers;
    gateways: Gateways;
    schemaOperations: SchemaOperations;
    workspacePurge: WorkspacePurge;
    clusters: Clusters;
    operations: Operations;
    workspaces: Workspaces;
    deletedWorkspaces: DeletedWorkspaces;
    tables: Tables;
}
//# sourceMappingURL=operationalInsightsManagementClient.d.ts.map