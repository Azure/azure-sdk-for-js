// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  OperationalInsightsManagementContext,
  OperationalInsightsManagementClientOptionalParams,
} from "./api/index.js";
import { createOperationalInsightsManagement } from "./api/index.js";
import type { AvailableServiceTiersOperations } from "./classic/availableServiceTiers/index.js";
import { _getAvailableServiceTiersOperations } from "./classic/availableServiceTiers/index.js";
import type { ClustersOperations } from "./classic/clusters/index.js";
import { _getClustersOperations } from "./classic/clusters/index.js";
import type { DataExportsOperations } from "./classic/dataExports/index.js";
import { _getDataExportsOperations } from "./classic/dataExports/index.js";
import type { DataSourcesOperations } from "./classic/dataSources/index.js";
import { _getDataSourcesOperations } from "./classic/dataSources/index.js";
import type { DeletedWorkspacesOperations } from "./classic/deletedWorkspaces/index.js";
import { _getDeletedWorkspacesOperations } from "./classic/deletedWorkspaces/index.js";
import type { GatewaysOperations } from "./classic/gateways/index.js";
import { _getGatewaysOperations } from "./classic/gateways/index.js";
import type { IntelligencePacksOperations } from "./classic/intelligencePacks/index.js";
import { _getIntelligencePacksOperations } from "./classic/intelligencePacks/index.js";
import type { LinkedServicesOperations } from "./classic/linkedServices/index.js";
import { _getLinkedServicesOperations } from "./classic/linkedServices/index.js";
import type { LinkedStorageAccountsOperations } from "./classic/linkedStorageAccounts/index.js";
import { _getLinkedStorageAccountsOperations } from "./classic/linkedStorageAccounts/index.js";
import type { ManagementGroupsOperations } from "./classic/managementGroups/index.js";
import { _getManagementGroupsOperations } from "./classic/managementGroups/index.js";
import type { OperationStatusesOperations } from "./classic/operationStatuses/index.js";
import { _getOperationStatusesOperations } from "./classic/operationStatuses/index.js";
import type { OperationsOperations } from "./classic/operations/index.js";
import { _getOperationsOperations } from "./classic/operations/index.js";
import type { QueriesOperations } from "./classic/queries/index.js";
import { _getQueriesOperations } from "./classic/queries/index.js";
import type { QueryPacksOperations } from "./classic/queryPacks/index.js";
import { _getQueryPacksOperations } from "./classic/queryPacks/index.js";
import type { SavedSearchesOperations } from "./classic/savedSearches/index.js";
import { _getSavedSearchesOperations } from "./classic/savedSearches/index.js";
import type { SchemaOperations } from "./classic/schema/index.js";
import { _getSchemaOperations } from "./classic/schema/index.js";
import type { SharedKeysOperations } from "./classic/sharedKeys/index.js";
import { _getSharedKeysOperations } from "./classic/sharedKeys/index.js";
import type { StorageInsightConfigsOperations } from "./classic/storageInsightConfigs/index.js";
import { _getStorageInsightConfigsOperations } from "./classic/storageInsightConfigs/index.js";
import type { SummaryLogsOperations } from "./classic/summaryLogs/index.js";
import { _getSummaryLogsOperations } from "./classic/summaryLogs/index.js";
import type { TablesOperations } from "./classic/tables/index.js";
import { _getTablesOperations } from "./classic/tables/index.js";
import type { UsagesOperations } from "./classic/usages/index.js";
import { _getUsagesOperations } from "./classic/usages/index.js";
import type { WorkspacePurgeOperations } from "./classic/workspacePurge/index.js";
import { _getWorkspacePurgeOperations } from "./classic/workspacePurge/index.js";
import type { WorkspacesOperations } from "./classic/workspaces/index.js";
import { _getWorkspacesOperations } from "./classic/workspaces/index.js";
import type { TokenCredential } from "@azure/core-auth";
import type { Pipeline } from "@azure/core-rest-pipeline";

export type { OperationalInsightsManagementClientOptionalParams } from "./api/operationalInsightsManagementContext.js";

export class OperationalInsightsManagementClient {
  private _client: OperationalInsightsManagementContext;
  /** The pipeline used by this client to make requests */
  public readonly pipeline: Pipeline;

  constructor(
    credential: TokenCredential,
    options?: OperationalInsightsManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionId: string,
    options?: OperationalInsightsManagementClientOptionalParams,
  );
  constructor(
    credential: TokenCredential,
    subscriptionIdOrOptions?: string | OperationalInsightsManagementClientOptionalParams,
    options?: OperationalInsightsManagementClientOptionalParams,
  ) {
    let subscriptionId: string | undefined;

    if (typeof subscriptionIdOrOptions === "string") {
      subscriptionId = subscriptionIdOrOptions;
    } else if (typeof subscriptionIdOrOptions === "object") {
      options = subscriptionIdOrOptions;
    }

    options = options ?? {};
    this._client = createOperationalInsightsManagement(credential, subscriptionId ?? "", options);
    this.pipeline = this._client.pipeline;
    this.deletedWorkspaces = _getDeletedWorkspacesOperations(this._client);
    this.operationStatuses = _getOperationStatusesOperations(this._client);
    this.summaryLogs = _getSummaryLogsOperations(this._client);
    this.storageInsightConfigs = _getStorageInsightConfigsOperations(this._client);
    this.queryPacks = _getQueryPacksOperations(this._client);
    this.queries = _getQueriesOperations(this._client);
    this.linkedStorageAccounts = _getLinkedStorageAccountsOperations(this._client);
    this.workspacePurge = _getWorkspacePurgeOperations(this._client);
    this.usages = _getUsagesOperations(this._client);
    this.sharedKeys = _getSharedKeysOperations(this._client);
    this.schema = _getSchemaOperations(this._client);
    this.managementGroups = _getManagementGroupsOperations(this._client);
    this.intelligencePacks = _getIntelligencePacksOperations(this._client);
    this.gateways = _getGatewaysOperations(this._client);
    this.availableServiceTiers = _getAvailableServiceTiersOperations(this._client);
    this.tables = _getTablesOperations(this._client);
    this.savedSearches = _getSavedSearchesOperations(this._client);
    this.linkedServices = _getLinkedServicesOperations(this._client);
    this.dataSources = _getDataSourcesOperations(this._client);
    this.workspaces = _getWorkspacesOperations(this._client);
    this.dataExports = _getDataExportsOperations(this._client);
    this.clusters = _getClustersOperations(this._client);
    this.operations = _getOperationsOperations(this._client);
  }

  /** The operation groups for deletedWorkspaces */
  public readonly deletedWorkspaces: DeletedWorkspacesOperations;
  /** The operation groups for operationStatuses */
  public readonly operationStatuses: OperationStatusesOperations;
  /** The operation groups for summaryLogs */
  public readonly summaryLogs: SummaryLogsOperations;
  /** The operation groups for storageInsightConfigs */
  public readonly storageInsightConfigs: StorageInsightConfigsOperations;
  /** The operation groups for queryPacks */
  public readonly queryPacks: QueryPacksOperations;
  /** The operation groups for queries */
  public readonly queries: QueriesOperations;
  /** The operation groups for linkedStorageAccounts */
  public readonly linkedStorageAccounts: LinkedStorageAccountsOperations;
  /** The operation groups for workspacePurge */
  public readonly workspacePurge: WorkspacePurgeOperations;
  /** The operation groups for usages */
  public readonly usages: UsagesOperations;
  /** The operation groups for sharedKeys */
  public readonly sharedKeys: SharedKeysOperations;
  /** The operation groups for schema */
  public readonly schema: SchemaOperations;
  /** The operation groups for managementGroups */
  public readonly managementGroups: ManagementGroupsOperations;
  /** The operation groups for intelligencePacks */
  public readonly intelligencePacks: IntelligencePacksOperations;
  /** The operation groups for gateways */
  public readonly gateways: GatewaysOperations;
  /** The operation groups for availableServiceTiers */
  public readonly availableServiceTiers: AvailableServiceTiersOperations;
  /** The operation groups for tables */
  public readonly tables: TablesOperations;
  /** The operation groups for savedSearches */
  public readonly savedSearches: SavedSearchesOperations;
  /** The operation groups for linkedServices */
  public readonly linkedServices: LinkedServicesOperations;
  /** The operation groups for dataSources */
  public readonly dataSources: DataSourcesOperations;
  /** The operation groups for workspaces */
  public readonly workspaces: WorkspacesOperations;
  /** The operation groups for dataExports */
  public readonly dataExports: DataExportsOperations;
  /** The operation groups for clusters */
  public readonly clusters: ClustersOperations;
  /** The operation groups for operations */
  public readonly operations: OperationsOperations;
}
