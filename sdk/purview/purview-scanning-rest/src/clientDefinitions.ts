// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  KeyVaultConnectionsGetParameters,
  KeyVaultConnectionsCreateParameters,
  KeyVaultConnectionsDeleteParameters,
  KeyVaultConnectionsListAllParameters,
  ClassificationRulesGetParameters,
  ClassificationRulesCreateOrUpdateParameters,
  ClassificationRulesDeleteParameters,
  ClassificationRulesListAllParameters,
  ClassificationRulesListVersionsByClassificationRuleNameParameters,
  ClassificationRulesTagClassificationVersionParameters,
  DataSourcesCreateOrUpdateParameters,
  DataSourcesGetParameters,
  DataSourcesDeleteParameters,
  DataSourcesListAllParameters,
  FiltersGetParameters,
  FiltersCreateOrUpdateParameters,
  ScansCreateOrUpdateParameters,
  ScansGetParameters,
  ScansDeleteParameters,
  ScansListByDataSourceParameters,
  ScanResultRunScanParameters,
  ScanResultCancelScanParameters,
  ScanResultListScanHistoryParameters,
  ScanRulesetsGetParameters,
  ScanRulesetsCreateOrUpdateParameters,
  ScanRulesetsDeleteParameters,
  ScanRulesetsListAllParameters,
  SystemScanRulesetsListAllParameters,
  SystemScanRulesetsGetParameters,
  SystemScanRulesetsGetByVersionParameters,
  SystemScanRulesetsGetLatestParameters,
  SystemScanRulesetsListVersionsByDataSourceParameters,
  TriggersGetTriggerParameters,
  TriggersCreateTriggerParameters,
  TriggersDeleteTriggerParameters,
} from "./parameters.js";
import type {
  KeyVaultConnectionsGet200Response,
  KeyVaultConnectionsGetDefaultResponse,
  KeyVaultConnectionsCreate200Response,
  KeyVaultConnectionsCreateDefaultResponse,
  KeyVaultConnectionsDelete200Response,
  KeyVaultConnectionsDelete204Response,
  KeyVaultConnectionsDeleteDefaultResponse,
  KeyVaultConnectionsListAll200Response,
  KeyVaultConnectionsListAllDefaultResponse,
  ClassificationRulesGet200Response,
  ClassificationRulesGetDefaultResponse,
  ClassificationRulesCreateOrUpdate200Response,
  ClassificationRulesCreateOrUpdate201Response,
  ClassificationRulesCreateOrUpdateDefaultResponse,
  ClassificationRulesDelete200Response,
  ClassificationRulesDelete204Response,
  ClassificationRulesDeleteDefaultResponse,
  ClassificationRulesListAll200Response,
  ClassificationRulesListAllDefaultResponse,
  ClassificationRulesListVersionsByClassificationRuleName200Response,
  ClassificationRulesListVersionsByClassificationRuleNameDefaultResponse,
  ClassificationRulesTagClassificationVersion202Response,
  ClassificationRulesTagClassificationVersionDefaultResponse,
  DataSourcesCreateOrUpdate200Response,
  DataSourcesCreateOrUpdate201Response,
  DataSourcesCreateOrUpdateDefaultResponse,
  DataSourcesGet200Response,
  DataSourcesGetDefaultResponse,
  DataSourcesDelete200Response,
  DataSourcesDelete204Response,
  DataSourcesDeleteDefaultResponse,
  DataSourcesListAll200Response,
  DataSourcesListAllDefaultResponse,
  FiltersGet200Response,
  FiltersGetDefaultResponse,
  FiltersCreateOrUpdate200Response,
  FiltersCreateOrUpdate201Response,
  FiltersCreateOrUpdateDefaultResponse,
  ScansCreateOrUpdate200Response,
  ScansCreateOrUpdate201Response,
  ScansCreateOrUpdateDefaultResponse,
  ScansGet200Response,
  ScansGetDefaultResponse,
  ScansDelete200Response,
  ScansDelete204Response,
  ScansDeleteDefaultResponse,
  ScansListByDataSource200Response,
  ScansListByDataSourceDefaultResponse,
  ScanResultRunScan202Response,
  ScanResultRunScanDefaultResponse,
  ScanResultCancelScan202Response,
  ScanResultCancelScanDefaultResponse,
  ScanResultListScanHistory200Response,
  ScanResultListScanHistoryDefaultResponse,
  ScanRulesetsGet200Response,
  ScanRulesetsGetDefaultResponse,
  ScanRulesetsCreateOrUpdate200Response,
  ScanRulesetsCreateOrUpdate201Response,
  ScanRulesetsCreateOrUpdateDefaultResponse,
  ScanRulesetsDelete200Response,
  ScanRulesetsDelete204Response,
  ScanRulesetsDeleteDefaultResponse,
  ScanRulesetsListAll200Response,
  ScanRulesetsListAllDefaultResponse,
  SystemScanRulesetsListAll200Response,
  SystemScanRulesetsListAllDefaultResponse,
  SystemScanRulesetsGet200Response,
  SystemScanRulesetsGetDefaultResponse,
  SystemScanRulesetsGetByVersion200Response,
  SystemScanRulesetsGetByVersionDefaultResponse,
  SystemScanRulesetsGetLatest200Response,
  SystemScanRulesetsGetLatestDefaultResponse,
  SystemScanRulesetsListVersionsByDataSource200Response,
  SystemScanRulesetsListVersionsByDataSourceDefaultResponse,
  TriggersGetTrigger200Response,
  TriggersGetTriggerDefaultResponse,
  TriggersCreateTrigger200Response,
  TriggersCreateTrigger201Response,
  TriggersCreateTriggerDefaultResponse,
  TriggersDeleteTrigger200Response,
  TriggersDeleteTrigger204Response,
  TriggersDeleteTriggerDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface KeyVaultConnectionsGet {
  /** Gets key vault information */
  get(
    options?: KeyVaultConnectionsGetParameters,
  ): StreamableMethod<KeyVaultConnectionsGet200Response | KeyVaultConnectionsGetDefaultResponse>;
  /** Creates an instance of a key vault connection */
  put(
    options: KeyVaultConnectionsCreateParameters,
  ): StreamableMethod<
    KeyVaultConnectionsCreate200Response | KeyVaultConnectionsCreateDefaultResponse
  >;
  /** Deletes the key vault connection associated with the account */
  delete(
    options?: KeyVaultConnectionsDeleteParameters,
  ): StreamableMethod<
    | KeyVaultConnectionsDelete200Response
    | KeyVaultConnectionsDelete204Response
    | KeyVaultConnectionsDeleteDefaultResponse
  >;
}

export interface KeyVaultConnectionsListAll {
  /** List key vault connections in account */
  get(
    options?: KeyVaultConnectionsListAllParameters,
  ): StreamableMethod<
    KeyVaultConnectionsListAll200Response | KeyVaultConnectionsListAllDefaultResponse
  >;
}

export interface ClassificationRulesGet {
  /** Get a classification rule */
  get(
    options?: ClassificationRulesGetParameters,
  ): StreamableMethod<ClassificationRulesGet200Response | ClassificationRulesGetDefaultResponse>;
  /** Creates or Updates a classification rule */
  put(
    options?: ClassificationRulesCreateOrUpdateParameters,
  ): StreamableMethod<
    | ClassificationRulesCreateOrUpdate200Response
    | ClassificationRulesCreateOrUpdate201Response
    | ClassificationRulesCreateOrUpdateDefaultResponse
  >;
  /** Deletes a classification rule */
  delete(
    options?: ClassificationRulesDeleteParameters,
  ): StreamableMethod<
    | ClassificationRulesDelete200Response
    | ClassificationRulesDelete204Response
    | ClassificationRulesDeleteDefaultResponse
  >;
}

export interface ClassificationRulesListAll {
  /** List classification rules in Account */
  get(
    options?: ClassificationRulesListAllParameters,
  ): StreamableMethod<
    ClassificationRulesListAll200Response | ClassificationRulesListAllDefaultResponse
  >;
}

export interface ClassificationRulesListVersionsByClassificationRuleName {
  /** Lists the rule versions of a classification rule */
  get(
    options?: ClassificationRulesListVersionsByClassificationRuleNameParameters,
  ): StreamableMethod<
    | ClassificationRulesListVersionsByClassificationRuleName200Response
    | ClassificationRulesListVersionsByClassificationRuleNameDefaultResponse
  >;
}

export interface ClassificationRulesTagClassificationVersion {
  /** Sets Classification Action on a specific classification rule version. */
  post(
    options: ClassificationRulesTagClassificationVersionParameters,
  ): StreamableMethod<
    | ClassificationRulesTagClassificationVersion202Response
    | ClassificationRulesTagClassificationVersionDefaultResponse
  >;
}

export interface DataSourcesCreateOrUpdate {
  /** Creates or Updates a data source */
  put(
    options?: DataSourcesCreateOrUpdateParameters,
  ): StreamableMethod<
    | DataSourcesCreateOrUpdate200Response
    | DataSourcesCreateOrUpdate201Response
    | DataSourcesCreateOrUpdateDefaultResponse
  >;
  /** Get a data source */
  get(
    options?: DataSourcesGetParameters,
  ): StreamableMethod<DataSourcesGet200Response | DataSourcesGetDefaultResponse>;
  /** Deletes a data source */
  delete(
    options?: DataSourcesDeleteParameters,
  ): StreamableMethod<
    DataSourcesDelete200Response | DataSourcesDelete204Response | DataSourcesDeleteDefaultResponse
  >;
}

export interface DataSourcesListAll {
  /** List data sources in Data catalog */
  get(
    options?: DataSourcesListAllParameters,
  ): StreamableMethod<DataSourcesListAll200Response | DataSourcesListAllDefaultResponse>;
}

export interface FiltersGet {
  /** Get a filter */
  get(
    options?: FiltersGetParameters,
  ): StreamableMethod<FiltersGet200Response | FiltersGetDefaultResponse>;
  /** Creates or updates a filter */
  put(
    options?: FiltersCreateOrUpdateParameters,
  ): StreamableMethod<
    | FiltersCreateOrUpdate200Response
    | FiltersCreateOrUpdate201Response
    | FiltersCreateOrUpdateDefaultResponse
  >;
}

export interface ScansCreateOrUpdate {
  /** Creates an instance of a scan */
  put(
    options: ScansCreateOrUpdateParameters,
  ): StreamableMethod<
    | ScansCreateOrUpdate200Response
    | ScansCreateOrUpdate201Response
    | ScansCreateOrUpdateDefaultResponse
  >;
  /** Gets a scan information */
  get(
    options?: ScansGetParameters,
  ): StreamableMethod<ScansGet200Response | ScansGetDefaultResponse>;
  /** Deletes the scan associated with the data source */
  delete(
    options?: ScansDeleteParameters,
  ): StreamableMethod<ScansDelete200Response | ScansDelete204Response | ScansDeleteDefaultResponse>;
}

export interface ScansListByDataSource {
  /** List scans in data source */
  get(
    options?: ScansListByDataSourceParameters,
  ): StreamableMethod<ScansListByDataSource200Response | ScansListByDataSourceDefaultResponse>;
}

export interface ScanResultRunScan {
  /** Runs the scan */
  put(
    options?: ScanResultRunScanParameters,
  ): StreamableMethod<ScanResultRunScan202Response | ScanResultRunScanDefaultResponse>;
}

export interface ScanResultCancelScan {
  /** Cancels a scan */
  post(
    options?: ScanResultCancelScanParameters,
  ): StreamableMethod<ScanResultCancelScan202Response | ScanResultCancelScanDefaultResponse>;
}

export interface ScanResultListScanHistory {
  /** Lists the scan history of a scan */
  get(
    options?: ScanResultListScanHistoryParameters,
  ): StreamableMethod<
    ScanResultListScanHistory200Response | ScanResultListScanHistoryDefaultResponse
  >;
}

export interface ScanRulesetsGet {
  /** Get a scan ruleset */
  get(
    options?: ScanRulesetsGetParameters,
  ): StreamableMethod<ScanRulesetsGet200Response | ScanRulesetsGetDefaultResponse>;
  /** Creates or Updates a scan ruleset */
  put(
    options?: ScanRulesetsCreateOrUpdateParameters,
  ): StreamableMethod<
    | ScanRulesetsCreateOrUpdate200Response
    | ScanRulesetsCreateOrUpdate201Response
    | ScanRulesetsCreateOrUpdateDefaultResponse
  >;
  /** Deletes a scan ruleset */
  delete(
    options?: ScanRulesetsDeleteParameters,
  ): StreamableMethod<
    | ScanRulesetsDelete200Response
    | ScanRulesetsDelete204Response
    | ScanRulesetsDeleteDefaultResponse
  >;
}

export interface ScanRulesetsListAll {
  /** List scan rulesets in Data catalog */
  get(
    options?: ScanRulesetsListAllParameters,
  ): StreamableMethod<ScanRulesetsListAll200Response | ScanRulesetsListAllDefaultResponse>;
}

export interface SystemScanRulesetsListAll {
  /** List all system scan rulesets for an account */
  get(
    options?: SystemScanRulesetsListAllParameters,
  ): StreamableMethod<
    SystemScanRulesetsListAll200Response | SystemScanRulesetsListAllDefaultResponse
  >;
}

export interface SystemScanRulesetsGet {
  /** Get a system scan ruleset for a data source */
  get(
    options?: SystemScanRulesetsGetParameters,
  ): StreamableMethod<SystemScanRulesetsGet200Response | SystemScanRulesetsGetDefaultResponse>;
}

export interface SystemScanRulesetsGetByVersion {
  /** Get a scan ruleset by version */
  get(
    options?: SystemScanRulesetsGetByVersionParameters,
  ): StreamableMethod<
    SystemScanRulesetsGetByVersion200Response | SystemScanRulesetsGetByVersionDefaultResponse
  >;
}

export interface SystemScanRulesetsGetLatest {
  /** Get the latest version of a system scan ruleset */
  get(
    options?: SystemScanRulesetsGetLatestParameters,
  ): StreamableMethod<
    SystemScanRulesetsGetLatest200Response | SystemScanRulesetsGetLatestDefaultResponse
  >;
}

export interface SystemScanRulesetsListVersionsByDataSource {
  /** List system scan ruleset versions in Data catalog */
  get(
    options?: SystemScanRulesetsListVersionsByDataSourceParameters,
  ): StreamableMethod<
    | SystemScanRulesetsListVersionsByDataSource200Response
    | SystemScanRulesetsListVersionsByDataSourceDefaultResponse
  >;
}

export interface TriggersGetTrigger {
  /** Gets trigger information */
  get(
    options?: TriggersGetTriggerParameters,
  ): StreamableMethod<TriggersGetTrigger200Response | TriggersGetTriggerDefaultResponse>;
  /** Creates an instance of a trigger */
  put(
    options: TriggersCreateTriggerParameters,
  ): StreamableMethod<
    | TriggersCreateTrigger200Response
    | TriggersCreateTrigger201Response
    | TriggersCreateTriggerDefaultResponse
  >;
  /** Deletes the trigger associated with the scan */
  delete(
    options?: TriggersDeleteTriggerParameters,
  ): StreamableMethod<
    | TriggersDeleteTrigger200Response
    | TriggersDeleteTrigger204Response
    | TriggersDeleteTriggerDefaultResponse
  >;
}

export interface Routes {
  /** Resource for '/azureKeyVaults/\{keyVaultName\}' has methods for the following verbs: get, put, delete */
  (path: "/azureKeyVaults/{keyVaultName}", keyVaultName: string): KeyVaultConnectionsGet;
  /** Resource for '/azureKeyVaults' has methods for the following verbs: get */
  (path: "/azureKeyVaults"): KeyVaultConnectionsListAll;
  /** Resource for '/classificationrules/\{classificationRuleName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/classificationrules/{classificationRuleName}",
    classificationRuleName: string,
  ): ClassificationRulesGet;
  /** Resource for '/classificationrules' has methods for the following verbs: get */
  (path: "/classificationrules"): ClassificationRulesListAll;
  /** Resource for '/classificationrules/\{classificationRuleName\}/versions' has methods for the following verbs: get */
  (
    path: "/classificationrules/{classificationRuleName}/versions",
    classificationRuleName: string,
  ): ClassificationRulesListVersionsByClassificationRuleName;
  /** Resource for '/classificationrules/\{classificationRuleName\}/versions/\{classificationRuleVersion\}/:tag' has methods for the following verbs: post */
  (
    path: "/classificationrules/{classificationRuleName}/versions/{classificationRuleVersion}/:tag",
    classificationRuleName: string,
    classificationRuleVersion: number,
  ): ClassificationRulesTagClassificationVersion;
  /** Resource for '/datasources/\{dataSourceName\}' has methods for the following verbs: put, get, delete */
  (path: "/datasources/{dataSourceName}", dataSourceName: string): DataSourcesCreateOrUpdate;
  /** Resource for '/datasources' has methods for the following verbs: get */
  (path: "/datasources"): DataSourcesListAll;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/filters/custom' has methods for the following verbs: get, put */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/filters/custom",
    dataSourceName: string,
    scanName: string,
  ): FiltersGet;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}",
    dataSourceName: string,
    scanName: string,
  ): ScansCreateOrUpdate;
  /** Resource for '/datasources/\{dataSourceName\}/scans' has methods for the following verbs: get */
  (path: "/datasources/{dataSourceName}/scans", dataSourceName: string): ScansListByDataSource;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/runs/\{runId\}' has methods for the following verbs: put */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/runs/{runId}",
    dataSourceName: string,
    scanName: string,
    runId: string,
  ): ScanResultRunScan;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/runs/\{runId\}/:cancel' has methods for the following verbs: post */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/runs/{runId}/:cancel",
    dataSourceName: string,
    scanName: string,
    runId: string,
  ): ScanResultCancelScan;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/runs' has methods for the following verbs: get */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/runs",
    dataSourceName: string,
    scanName: string,
  ): ScanResultListScanHistory;
  /** Resource for '/scanrulesets/\{scanRulesetName\}' has methods for the following verbs: get, put, delete */
  (path: "/scanrulesets/{scanRulesetName}", scanRulesetName: string): ScanRulesetsGet;
  /** Resource for '/scanrulesets' has methods for the following verbs: get */
  (path: "/scanrulesets"): ScanRulesetsListAll;
  /** Resource for '/systemScanRulesets' has methods for the following verbs: get */
  (path: "/systemScanRulesets"): SystemScanRulesetsListAll;
  /** Resource for '/systemScanRulesets/datasources/\{dataSourceType\}' has methods for the following verbs: get */
  (
    path: "/systemScanRulesets/datasources/{dataSourceType}",
    dataSourceType:
      | "None"
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
      | "AmazonPostgreSql"
      | "AzurePostgreSql"
      | "SqlServerDatabase"
      | "AzureSqlDatabaseManagedInstance"
      | "AzureSqlDataWarehouse"
      | "AzureMySql"
      | "AzureStorage"
      | "Teradata"
      | "Oracle"
      | "SapS4Hana"
      | "SapEcc"
      | "PowerBI",
  ): SystemScanRulesetsGet;
  /** Resource for '/systemScanRulesets/versions/\{version\}' has methods for the following verbs: get */
  (path: "/systemScanRulesets/versions/{version}", version: number): SystemScanRulesetsGetByVersion;
  /** Resource for '/systemScanRulesets/versions/latest' has methods for the following verbs: get */
  (path: "/systemScanRulesets/versions/latest"): SystemScanRulesetsGetLatest;
  /** Resource for '/systemScanRulesets/versions' has methods for the following verbs: get */
  (path: "/systemScanRulesets/versions"): SystemScanRulesetsListVersionsByDataSource;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/triggers/default' has methods for the following verbs: get, put, delete */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/triggers/default",
    dataSourceName: string,
    scanName: string,
  ): TriggersGetTrigger;
}

export type PurviewScanningClient = Client & {
  path: Routes;
};
