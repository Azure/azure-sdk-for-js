// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RequestParameters } from "@azure-rest/core-client";
import type {
  AzureKeyVault,
  ClassificationRule,
  Credential,
  DataSource,
  Filter,
  IntegrationRuntime,
  IntegrationRuntimeRegenerateKeyParameters,
  EnableInteractiveQueryForIntegrationRuntimeRequest,
  ManagedVirtualNetwork,
  ManagedPrivateEndpoint,
  Scan,
  ScanRuleset,
  Trigger,
} from "./models.js";

export type KeyVaultConnectionsGetParameters = RequestParameters;

export interface KeyVaultConnectionsCreateOrReplaceBodyParam {
  /** The Azure Key Vault connection definition. */
  body: AzureKeyVault;
}

export interface KeyVaultConnectionsCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type KeyVaultConnectionsCreateOrReplaceParameters =
  KeyVaultConnectionsCreateOrReplaceMediaTypesParam &
    KeyVaultConnectionsCreateOrReplaceBodyParam &
    RequestParameters;
export type KeyVaultConnectionsDeleteParameters = RequestParameters;
export type KeyVaultConnectionsListParameters = RequestParameters;
export type ClassificationRulesGetParameters = RequestParameters;

export interface ClassificationRulesCreateOrReplaceBodyParam {
  /** The classification rule definition. */
  body: ClassificationRule;
}

export interface ClassificationRulesCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ClassificationRulesCreateOrReplaceParameters =
  ClassificationRulesCreateOrReplaceMediaTypesParam &
    ClassificationRulesCreateOrReplaceBodyParam &
    RequestParameters;
export type ClassificationRulesDeleteParameters = RequestParameters;
export type ClassificationRulesListParameters = RequestParameters;
export type ClassificationRulesListVersionsByRuleNameParameters = RequestParameters;

export interface ClassificationRulesTagClassificationVersionQueryParamProperties {
  /** The action of classification rule. */
  action: "Keep" | "Delete";
}

export interface ClassificationRulesTagClassificationVersionQueryParam {
  queryParameters: ClassificationRulesTagClassificationVersionQueryParamProperties;
}

export type ClassificationRulesTagClassificationVersionParameters =
  ClassificationRulesTagClassificationVersionQueryParam & RequestParameters;
export type CredentialGetParameters = RequestParameters;

export interface CredentialCreateOrReplaceBodyParam {
  /** The credential definition. */
  body: Credential;
}

export interface CredentialCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type CredentialCreateOrReplaceParameters = CredentialCreateOrReplaceMediaTypesParam &
  CredentialCreateOrReplaceBodyParam &
  RequestParameters;
export type CredentialDeleteParameters = RequestParameters;
export type CredentialListParameters = RequestParameters;

export interface DataSourcesCreateOrReplaceBodyParam {
  /** The data source definition. */
  body: DataSource;
}

export interface DataSourcesCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type DataSourcesCreateOrReplaceParameters = DataSourcesCreateOrReplaceMediaTypesParam &
  DataSourcesCreateOrReplaceBodyParam &
  RequestParameters;
export type DataSourcesGetParameters = RequestParameters;
export type DataSourcesDeleteParameters = RequestParameters;
export type DataSourcesListParameters = RequestParameters;
export type FiltersGetParameters = RequestParameters;

export interface FiltersCreateOrReplaceBodyParam {
  /** The filter definition. */
  body: Filter;
}

export interface FiltersCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type FiltersCreateOrReplaceParameters = FiltersCreateOrReplaceMediaTypesParam &
  FiltersCreateOrReplaceBodyParam &
  RequestParameters;
export type IntegrationRuntimesListByAccountParameters = RequestParameters;
export type IntegrationRuntimesGetParameters = RequestParameters;
export type IntegrationRuntimesDeleteParameters = RequestParameters;

export interface IntegrationRuntimesCreateOrReplaceBodyParam {
  /** The integration runtime definition. */
  body: IntegrationRuntime;
}

export interface IntegrationRuntimesCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type IntegrationRuntimesCreateOrReplaceParameters =
  IntegrationRuntimesCreateOrReplaceMediaTypesParam &
    IntegrationRuntimesCreateOrReplaceBodyParam &
    RequestParameters;
export type IntegrationRuntimesStatusParameters = RequestParameters;
export type IntegrationRuntimesListAuthKeysParameters = RequestParameters;

export interface IntegrationRuntimesRegenerateAuthKeyBodyParam {
  /** The request of regenerating authentication key of an integration runtime. */
  body: IntegrationRuntimeRegenerateKeyParameters;
}

export interface IntegrationRuntimesRegenerateAuthKeyMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type IntegrationRuntimesRegenerateAuthKeyParameters =
  IntegrationRuntimesRegenerateAuthKeyMediaTypesParam &
    IntegrationRuntimesRegenerateAuthKeyBodyParam &
    RequestParameters;
export type IntegrationRuntimesDisableInteractiveQueryParameters = RequestParameters;

export interface IntegrationRuntimesEnableInteractiveQueryBodyParam {
  /** The request of enabling interactive query for integration runtime. */
  body: EnableInteractiveQueryForIntegrationRuntimeRequest;
}

export interface IntegrationRuntimesEnableInteractiveQueryMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type IntegrationRuntimesEnableInteractiveQueryParameters =
  IntegrationRuntimesEnableInteractiveQueryMediaTypesParam &
    IntegrationRuntimesEnableInteractiveQueryBodyParam &
    RequestParameters;
export type ManagedVirtualNetworksListByAccountParameters = RequestParameters;
export type ManagedVirtualNetworksGetParameters = RequestParameters;

export interface ManagedVirtualNetworksCreateOrReplaceBodyParam {
  /** The managed virtual network resource definition. */
  body: ManagedVirtualNetwork;
}

export interface ManagedVirtualNetworksCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagedVirtualNetworksCreateOrReplaceParameters =
  ManagedVirtualNetworksCreateOrReplaceMediaTypesParam &
    ManagedVirtualNetworksCreateOrReplaceBodyParam &
    RequestParameters;
export type ManagedPrivateEndpointsListByAccountParameters = RequestParameters;
export type ManagedPrivateEndpointsGetParameters = RequestParameters;
export type ManagedPrivateEndpointsDeleteParameters = RequestParameters;

export interface ManagedPrivateEndpointsCreateOrReplaceBodyParam {
  /** The managed private endpoint resource definition. */
  body: ManagedPrivateEndpoint;
}

export interface ManagedPrivateEndpointsCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ManagedPrivateEndpointsCreateOrReplaceParameters =
  ManagedPrivateEndpointsCreateOrReplaceMediaTypesParam &
    ManagedPrivateEndpointsCreateOrReplaceBodyParam &
    RequestParameters;

export interface ScansCreateOrReplaceBodyParam {
  /** The scan definition. */
  body: Scan;
}

export interface ScansCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ScansCreateOrReplaceParameters = ScansCreateOrReplaceMediaTypesParam &
  ScansCreateOrReplaceBodyParam &
  RequestParameters;
export type ScansGetParameters = RequestParameters;
export type ScansDeleteParameters = RequestParameters;
export type ScansListByDataSourceParameters = RequestParameters;
export type ScanResultGetScanStatusParameters = RequestParameters;

export interface ScanResultRunScanQueryParamProperties {
  /** The scan run id. */
  runId: string;
  /** The scan level. */
  scanLevel?: "Full" | "Incremental";
}

export interface ScanResultRunScanQueryParam {
  queryParameters: ScanResultRunScanQueryParamProperties;
}

export type ScanResultRunScanParameters = ScanResultRunScanQueryParam & RequestParameters;
export type ScanResultCancelScanParameters = RequestParameters;
export type ScanResultListScanHistoryParameters = RequestParameters;
export type ScanRulesetsGetParameters = RequestParameters;

export interface ScanRulesetsCreateOrReplaceBodyParam {
  /** The scan rule set definition. */
  body: ScanRuleset;
}

export interface ScanRulesetsCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type ScanRulesetsCreateOrReplaceParameters = ScanRulesetsCreateOrReplaceMediaTypesParam &
  ScanRulesetsCreateOrReplaceBodyParam &
  RequestParameters;
export type ScanRulesetsDeleteParameters = RequestParameters;
export type ScanRulesetsListParameters = RequestParameters;
export type SystemScanRulesetsListParameters = RequestParameters;
export type SystemScanRulesetsGetParameters = RequestParameters;

export interface SystemScanRulesetsGetByVersionQueryParamProperties {
  /** The data source type. */
  dataSourceType?:
    | "None"
    | "Fabric"
    | "AzureSubscription"
    | "AzureResourceGroup"
    | "AzureSynapseWorkspace"
    | "AzureSynapse"
    | "AdlsGen1"
    | "AdlsGen2"
    | "AmazonAccount"
    | "AmazonS3"
    | "AmazonSql"
    | "AzureCosmosDb"
    | "AzureDataExplorer"
    | "AzureFileService"
    | "AzureSqlDatabase"
    | "ArcEnabledSqlServer"
    | "AmazonPostgreSql"
    | "AzurePostgreSql"
    | "Databricks"
    | "SqlServerDatabase"
    | "AzureSqlDatabaseManagedInstance"
    | "AzureSqlDataWarehouse"
    | "AzureMySql"
    | "Hdfs"
    | "TableauServer"
    | "AzureStorage"
    | "Teradata"
    | "Oracle"
    | "PostgreSql"
    | "AmazonRedShift"
    | "DatabricksHms"
    | "SapS4Hana"
    | "SapEcc"
    | "Snowflake"
    | "PowerBI"
    | "Trident"
    | "Dataverse"
    | "DatabricksUnityCatalog";
}

export interface SystemScanRulesetsGetByVersionQueryParam {
  queryParameters?: SystemScanRulesetsGetByVersionQueryParamProperties;
}

export type SystemScanRulesetsGetByVersionParameters = SystemScanRulesetsGetByVersionQueryParam &
  RequestParameters;

export interface SystemScanRulesetsGetLatestQueryParamProperties {
  /** The data source type. */
  dataSourceType?:
    | "None"
    | "Fabric"
    | "AzureSubscription"
    | "AzureResourceGroup"
    | "AzureSynapseWorkspace"
    | "AzureSynapse"
    | "AdlsGen1"
    | "AdlsGen2"
    | "AmazonAccount"
    | "AmazonS3"
    | "AmazonSql"
    | "AzureCosmosDb"
    | "AzureDataExplorer"
    | "AzureFileService"
    | "AzureSqlDatabase"
    | "ArcEnabledSqlServer"
    | "AmazonPostgreSql"
    | "AzurePostgreSql"
    | "Databricks"
    | "SqlServerDatabase"
    | "AzureSqlDatabaseManagedInstance"
    | "AzureSqlDataWarehouse"
    | "AzureMySql"
    | "Hdfs"
    | "TableauServer"
    | "AzureStorage"
    | "Teradata"
    | "Oracle"
    | "PostgreSql"
    | "AmazonRedShift"
    | "DatabricksHms"
    | "SapS4Hana"
    | "SapEcc"
    | "Snowflake"
    | "PowerBI"
    | "Trident"
    | "Dataverse"
    | "DatabricksUnityCatalog";
}

export interface SystemScanRulesetsGetLatestQueryParam {
  queryParameters?: SystemScanRulesetsGetLatestQueryParamProperties;
}

export type SystemScanRulesetsGetLatestParameters = SystemScanRulesetsGetLatestQueryParam &
  RequestParameters;

export interface SystemScanRulesetsListVersionsByDataSourceQueryParamProperties {
  /** The data source type. */
  dataSourceType?:
    | "None"
    | "Fabric"
    | "AzureSubscription"
    | "AzureResourceGroup"
    | "AzureSynapseWorkspace"
    | "AzureSynapse"
    | "AdlsGen1"
    | "AdlsGen2"
    | "AmazonAccount"
    | "AmazonS3"
    | "AmazonSql"
    | "AzureCosmosDb"
    | "AzureDataExplorer"
    | "AzureFileService"
    | "AzureSqlDatabase"
    | "ArcEnabledSqlServer"
    | "AmazonPostgreSql"
    | "AzurePostgreSql"
    | "Databricks"
    | "SqlServerDatabase"
    | "AzureSqlDatabaseManagedInstance"
    | "AzureSqlDataWarehouse"
    | "AzureMySql"
    | "Hdfs"
    | "TableauServer"
    | "AzureStorage"
    | "Teradata"
    | "Oracle"
    | "PostgreSql"
    | "AmazonRedShift"
    | "DatabricksHms"
    | "SapS4Hana"
    | "SapEcc"
    | "Snowflake"
    | "PowerBI"
    | "Trident"
    | "Dataverse"
    | "DatabricksUnityCatalog";
}

export interface SystemScanRulesetsListVersionsByDataSourceQueryParam {
  queryParameters?: SystemScanRulesetsListVersionsByDataSourceQueryParamProperties;
}

export type SystemScanRulesetsListVersionsByDataSourceParameters =
  SystemScanRulesetsListVersionsByDataSourceQueryParam & RequestParameters;
export type TriggersGetParameters = RequestParameters;

export interface TriggersCreateOrReplaceBodyParam {
  /** The trigger definition. */
  body: Trigger;
}

export interface TriggersCreateOrReplaceMediaTypesParam {
  /** Request content type */
  contentType?: "application/json";
}

export type TriggersCreateOrReplaceParameters = TriggersCreateOrReplaceMediaTypesParam &
  TriggersCreateOrReplaceBodyParam &
  RequestParameters;
export type TriggersDeleteParameters = RequestParameters;
export type TriggersEnableParameters = RequestParameters;
export type TriggersDisableParameters = RequestParameters;
