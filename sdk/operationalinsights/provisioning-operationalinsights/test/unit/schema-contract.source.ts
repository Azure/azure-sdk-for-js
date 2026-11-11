// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/*
 * Scenario: schema contract source probes for @azure/provisioning-operationalinsights.
 * provisioning API: @azure/provisioning-operationalinsights root types namespace.
 * Source contracts: exact-version Microsoft Learn/Bicep reference.
 * Typecheck command: pnpm run typecheck
 */

import type {
  DataSourceProps,
  SavedSearchProps,
  WorkspaceProps,
} from "@azure/provisioning-operationalinsights";
import type {
  ClusterPropertiesInput,
  ClusterReplicationPropertiesInput,
  ClusterSkuInput,
  ColumnInput,
  DataExportPropertiesInput,
  DestinationInput,
  DestinationMetaDataInput,
  KeyVaultPropertiesInput,
  LinkedServicePropertiesInput,
  LinkedStorageAccountsPropertiesInput,
  LogAnalyticsQueryPackQueryPropertiesInput,
  LogAnalyticsQueryPackQueryPropertiesRelatedInput,
  ManagedServiceIdentityInput,
  RestoredLogsInput,
  RuleDefinitionInput,
  SavedSearchPropertiesInput,
  SchemaInput,
  SearchResultsInput,
  StorageAccountInput,
  SummaryLogsPropertiesInput,
  TablePropertiesInput,
  TagInput,
  WorkspaceCappingInput,
  WorkspaceFeaturesInput,
  WorkspacePropertiesInput,
  WorkspaceReplicationPropertiesInput,
  WorkspaceSkuInput,
} from "@azure/provisioning-operationalinsights/types";

// Bicep baseline: Microsoft.OperationalInsights/workspaces.etag is optional and writable.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces?pivots=deployment-language-bicep
export const workspaceWithEtagFromBicep: WorkspaceProps = {
  etag: "string",
  location: "westus",
};

// Bicep baseline: Microsoft.OperationalInsights/workspaces/dataSources.etag is optional and writable.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/datasources?pivots=deployment-language-bicep
export const dataSourceWithEtagFromBicep: DataSourceProps = {
  etag: "string",
  kind: "GenericDataSource",
  properties: {},
};

// Bicep baseline: Microsoft.OperationalInsights/workspaces/savedSearches.etag is optional and writable.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/savedsearches?pivots=deployment-language-bicep
export const savedSearchWithEtagFromBicep: SavedSearchProps = {
  etag: "*",
  properties: {
    category: "string",
    displayName: "string",
    query: "string",
  },
};

// Accepted Bicep contract: Microsoft.OperationalInsights/clusters -> ClusterPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/clusters?pivots=deployment-language-bicep
export const clusterPropertiesClusters6c0a789e9c05983997c6FromBicep: ClusterPropertiesInput = {
  associatedWorkspaces: [],
  billingType: "Cluster",
  isAvailabilityZonesEnabled: true,
  isDoubleEncryptionEnabled: true,
};

// Accepted Bicep contract: Microsoft.OperationalInsights/clusters -> ClusterReplicationPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/clusters?pivots=deployment-language-bicep
export const clusterReplicationPropertiesClusters6c0a789e9c27b0ffb4abFromBicep: ClusterReplicationPropertiesInput =
  {
    enabled: true,
    isAvailabilityZonesEnabled: true,
    location: "string",
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/clusters -> ClusterSkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/clusters?pivots=deployment-language-bicep
export const clusterSkuClusters6c0a789e9cc8d889e0b2FromBicep: ClusterSkuInput = {
  capacity: 0,
  name: "CapacityReservation",
};

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/tables -> ColumnInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/tables?pivots=deployment-language-bicep
export const columnWorkspacesTablesf944d3b71b971bc1b433FromBicep: ColumnInput = {
  dataTypeHint: "armPath",
  description: "string",
  displayName: "string",
  name: "string",
  type: "boolean",
};

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/dataExports -> DataExportPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/dataexports?pivots=deployment-language-bicep
export const dataExportPropertiesWorkspacesDataexportsa2c75a397bd97bdd8caaFromBicep: DataExportPropertiesInput =
  {
    createdDate: "string",
    dataExportId: "string",
    enable: true,
    lastModifiedDate: "string",
    tableNames: [],
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/dataExports -> DestinationInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/dataexports?pivots=deployment-language-bicep
export const destinationWorkspacesDataexportsa2c75a397b5531452939FromBicep: DestinationInput = {
  resourceId: "string",
};

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/dataExports -> DestinationMetaDataInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/dataexports?pivots=deployment-language-bicep
export const destinationMetaDataWorkspacesDataexportsa2c75a397bdfa6f7dfbdFromBicep: DestinationMetaDataInput =
  {
    eventHubName: "string",
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/linkedServices -> LinkedServicePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/linkedservices?pivots=deployment-language-bicep
export const linkedServicePropertiesWorkspacesLinkedservicesb5c3baf50d3b4e7a951fFromBicep: LinkedServicePropertiesInput =
  {
    resourceId: "string",
    writeAccessResourceId: "string",
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/linkedStorageAccounts -> LinkedStorageAccountsPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/linkedstorageaccounts?pivots=deployment-language-bicep
export const linkedStorageAccountsPropertiesWorkspacesLinkedstorageaccountsf0881b4bb15800dd2511FromBicep: LinkedStorageAccountsPropertiesInput =
  {
    storageAccountIds: [],
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/queryPacks/queries -> LogAnalyticsQueryPackQueryPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/querypacks/queries?pivots=deployment-language-bicep
export const logAnalyticsQueryPackQueryPropertiesQuerypacksQueries450510997e1267236b72FromBicep: LogAnalyticsQueryPackQueryPropertiesInput =
  {
    body: "string",
    description: "string",
    displayName: "string",
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/queryPacks/queries -> LogAnalyticsQueryPackQueryPropertiesRelatedInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/querypacks/queries?pivots=deployment-language-bicep
export const logAnalyticsQueryPackQueryPropertiesRelatedQuerypacksQueries450510997e7341807f87FromBicep: LogAnalyticsQueryPackQueryPropertiesRelatedInput =
  {
    categories: [],
    resourceTypes: [],
    solutions: [],
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/clusters -> ManagedServiceIdentityInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/clusters?pivots=deployment-language-bicep
export const managedServiceIdentityClusters6c0a789e9ce902289f08FromBicep: ManagedServiceIdentityInput =
  {
    type: "None",
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/tables -> RestoredLogsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/tables?pivots=deployment-language-bicep
export const restoredLogsWorkspacesTablesf944d3b71b5e0dceb8b0FromBicep: RestoredLogsInput = {
  sourceTable: "string",
};

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/summaryLogs -> RuleDefinitionInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/summarylogs?pivots=deployment-language-bicep
export const ruleDefinitionWorkspacesSummarylogsab969ab418e6e631de72FromBicep: RuleDefinitionInput =
  {
    binDelay: 0,
    binSize: 0,
    destinationTable: "string",
    query: "string",
    timeSelector: "TimeGenerated",
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/savedSearches -> SavedSearchPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/savedsearches?pivots=deployment-language-bicep
export const savedSearchPropertiesWorkspacesSavedsearchesa48607d01757a05fc394FromBicep: SavedSearchPropertiesInput =
  {
    category: "string",
    displayName: "string",
    functionAlias: "string",
    functionParameters: "string",
    query: "string",
    tags: [],
    version: 0,
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/tables -> SchemaInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/tables?pivots=deployment-language-bicep
export const schemaWorkspacesTablesf944d3b71b018921a228FromBicep: SchemaInput = {
  columns: [],
  description: "string",
  displayName: "string",
  name: "string",
};

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/tables -> SearchResultsInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/tables?pivots=deployment-language-bicep
export const searchResultsWorkspacesTablesf944d3b71b5394212623FromBicep: SearchResultsInput = {
  description: "string",
  limit: 0,
  query: "string",
};

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/storageInsightConfigs -> StorageAccountInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/storageinsightconfigs?pivots=deployment-language-bicep
export const storageAccountWorkspacesStorageinsightconfigs7af53abbaaba8ff1acdfFromBicep: StorageAccountInput =
  {
    id: "string",
    key: "string",
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/summaryLogs -> SummaryLogsPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/summarylogs?pivots=deployment-language-bicep
export const summaryLogsPropertiesWorkspacesSummarylogsab969ab418da11d3e3fdFromBicep: SummaryLogsPropertiesInput =
  {
    description: "string",
    displayName: "string",
    ruleType: "User",
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/tables -> TablePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/tables?pivots=deployment-language-bicep
export const tablePropertiesWorkspacesTablesf944d3b71b4b793cf73fFromBicep: TablePropertiesInput = {
  plan: "Analytics",
  retentionInDays: 0,
  totalRetentionInDays: 0,
};

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces/savedSearches -> TagInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces/savedsearches?pivots=deployment-language-bicep
export const tagWorkspacesSavedsearchesa48607d017f1bcac6462FromBicep: TagInput = {
  name: "string",
  value: "string",
};

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces -> WorkspaceCappingInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces?pivots=deployment-language-bicep
export const workspaceCappingWorkspacesb77e794578ca5ec5e166FromBicep: WorkspaceCappingInput = {
  dailyQuotaGb: 0,
};

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces -> WorkspaceFeaturesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces?pivots=deployment-language-bicep
export const workspaceFeaturesWorkspacesb77e79457831488b785eFromBicep: WorkspaceFeaturesInput = {
  clusterResourceId: "string",
  disableLocalAuth: true,
  enableDataExport: true,
  enableLogAccessUsingOnlyResourcePermissions: true,
  immediatePurgeDataOn30Days: true,
};

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces -> WorkspacePropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces?pivots=deployment-language-bicep
export const workspacePropertiesWorkspacesb77e794578cd386744b7FromBicep: WorkspacePropertiesInput =
  {
    defaultDataCollectionRuleResourceId: "string",
    forceCmkForQuery: true,
    publicNetworkAccessForIngestion: "Disabled",
    publicNetworkAccessForQuery: "Disabled",
    retentionInDays: 0,
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces -> WorkspaceReplicationPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces?pivots=deployment-language-bicep
export const workspaceReplicationPropertiesWorkspacesb77e7945785ceb8725fdFromBicep: WorkspaceReplicationPropertiesInput =
  {
    enabled: true,
    location: "string",
  };

// Accepted Bicep contract: Microsoft.OperationalInsights/workspaces -> WorkspaceSkuInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/workspaces?pivots=deployment-language-bicep
export const workspaceSkuWorkspacesb77e79457830aeb52230FromBicep: WorkspaceSkuInput = {
  capacityReservationLevel: 0,
  name: "CapacityReservation",
};

// Accepted Bicep contract: Microsoft.OperationalInsights/clusters -> KeyVaultPropertiesInput.
// Source: https://learn.microsoft.com/en-us/azure/templates/microsoft.operationalinsights/2025-07-01/clusters?pivots=deployment-language-bicep
export const keyVaultPropertiesClusters6c0a789e9cc83a64c327FromBicep: KeyVaultPropertiesInput = {
  keyName: "string",
  keyRsaSize: 0,
  keyVaultUri: "string",
  keyVersion: "string",
};
