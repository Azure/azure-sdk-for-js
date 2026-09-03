// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  OperationalInsightsManagementContext,
  OperationalInsightsManagementClientOptionalParams,
  createOperationalInsightsManagement,
} from "./api/index.js";
import {
  AvailableServiceTiersOperations,
  _getAvailableServiceTiersOperations,
} from "./classic/availableServiceTiers/index.js";
import { ClustersOperations, _getClustersOperations } from "./classic/clusters/index.js";
import { DataExportsOperations, _getDataExportsOperations } from "./classic/dataExports/index.js";
import { DataSourcesOperations, _getDataSourcesOperations } from "./classic/dataSources/index.js";
import {
  DeletedWorkspacesOperations,
  _getDeletedWorkspacesOperations,
} from "./classic/deletedWorkspaces/index.js";
import { GatewaysOperations, _getGatewaysOperations } from "./classic/gateways/index.js";
import {
  IntelligencePacksOperations,
  _getIntelligencePacksOperations,
} from "./classic/intelligencePacks/index.js";
import {
  LinkedServicesOperations,
  _getLinkedServicesOperations,
} from "./classic/linkedServices/index.js";
import {
  LinkedStorageAccountsOperations,
  _getLinkedStorageAccountsOperations,
} from "./classic/linkedStorageAccounts/index.js";
import {
  ManagementGroupsOperations,
  _getManagementGroupsOperations,
} from "./classic/managementGroups/index.js";
import {
  OperationStatusesOperations,
  _getOperationStatusesOperations,
} from "./classic/operationStatuses/index.js";
import { OperationsOperations, _getOperationsOperations } from "./classic/operations/index.js";
import { QueriesOperations, _getQueriesOperations } from "./classic/queries/index.js";
import { QueryPacksOperations, _getQueryPacksOperations } from "./classic/queryPacks/index.js";
import {
  SavedSearchesOperations,
  _getSavedSearchesOperations,
} from "./classic/savedSearches/index.js";
import { SchemaOperations, _getSchemaOperations } from "./classic/schema/index.js";
import { SharedKeysOperations, _getSharedKeysOperations } from "./classic/sharedKeys/index.js";
import {
  StorageInsightConfigsOperations,
  _getStorageInsightConfigsOperations,
} from "./classic/storageInsightConfigs/index.js";
import { SummaryLogsOperations, _getSummaryLogsOperations } from "./classic/summaryLogs/index.js";
import { TablesOperations, _getTablesOperations } from "./classic/tables/index.js";
import { UsagesOperations, _getUsagesOperations } from "./classic/usages/index.js";
import {
  WorkspacePurgeOperations,
  _getWorkspacePurgeOperations,
} from "./classic/workspacePurge/index.js";
import { WorkspacesOperations, _getWorkspacesOperations } from "./classic/workspaces/index.js";
import { TokenCredential } from "@azure/core-auth";
import { Pipeline } from "@azure/core-rest-pipeline";

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
  /** Provides NSP operations for working with Log Analytics. */
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
    const prefixFromOptions = options?.userAgentOptions?.userAgentPrefix;
    const userAgentPrefix = prefixFromOptions
      ? `${prefixFromOptions} azsdk-js-client`
      : `azsdk-js-client`;
    this._client = createOperationalInsightsManagement(credential, subscriptionId ?? "", {
      ...options,
      userAgentOptions: { userAgentPrefix },
    });
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
