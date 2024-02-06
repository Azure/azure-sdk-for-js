// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
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
} from "./parameters";
import {
  KeyVaultConnectionsGet200Response,
  KeyVaultConnectionsGetdefaultResponse,
  KeyVaultConnectionsCreate200Response,
  KeyVaultConnectionsCreatedefaultResponse,
  KeyVaultConnectionsDelete200Response,
  KeyVaultConnectionsDelete204Response,
  KeyVaultConnectionsDeletedefaultResponse,
  KeyVaultConnectionsListAll200Response,
  KeyVaultConnectionsListAlldefaultResponse,
  ClassificationRulesGet200Response,
  ClassificationRulesGetdefaultResponse,
  ClassificationRulesCreateOrUpdate200Response,
  ClassificationRulesCreateOrUpdate201Response,
  ClassificationRulesCreateOrUpdatedefaultResponse,
  ClassificationRulesDelete200Response,
  ClassificationRulesDelete204Response,
  ClassificationRulesDeletedefaultResponse,
  ClassificationRulesListAll200Response,
  ClassificationRulesListAlldefaultResponse,
  ClassificationRulesListVersionsByClassificationRuleName200Response,
  ClassificationRulesListVersionsByClassificationRuleNamedefaultResponse,
  ClassificationRulesTagClassificationVersion202Response,
  ClassificationRulesTagClassificationVersiondefaultResponse,
  DataSourcesCreateOrUpdate200Response,
  DataSourcesCreateOrUpdate201Response,
  DataSourcesCreateOrUpdatedefaultResponse,
  DataSourcesGet200Response,
  DataSourcesGetdefaultResponse,
  DataSourcesDelete200Response,
  DataSourcesDelete204Response,
  DataSourcesDeletedefaultResponse,
  DataSourcesListAll200Response,
  DataSourcesListAlldefaultResponse,
  FiltersGet200Response,
  FiltersGetdefaultResponse,
  FiltersCreateOrUpdate200Response,
  FiltersCreateOrUpdate201Response,
  FiltersCreateOrUpdatedefaultResponse,
  ScansCreateOrUpdate200Response,
  ScansCreateOrUpdate201Response,
  ScansCreateOrUpdatedefaultResponse,
  ScansGet200Response,
  ScansGetdefaultResponse,
  ScansDelete200Response,
  ScansDelete204Response,
  ScansDeletedefaultResponse,
  ScansListByDataSource200Response,
  ScansListByDataSourcedefaultResponse,
  ScanResultRunScan202Response,
  ScanResultRunScandefaultResponse,
  ScanResultCancelScan202Response,
  ScanResultCancelScandefaultResponse,
  ScanResultListScanHistory200Response,
  ScanResultListScanHistorydefaultResponse,
  ScanRulesetsGet200Response,
  ScanRulesetsGetdefaultResponse,
  ScanRulesetsCreateOrUpdate200Response,
  ScanRulesetsCreateOrUpdate201Response,
  ScanRulesetsCreateOrUpdatedefaultResponse,
  ScanRulesetsDelete200Response,
  ScanRulesetsDelete204Response,
  ScanRulesetsDeletedefaultResponse,
  ScanRulesetsListAll200Response,
  ScanRulesetsListAlldefaultResponse,
  SystemScanRulesetsListAll200Response,
  SystemScanRulesetsListAlldefaultResponse,
  SystemScanRulesetsGet200Response,
  SystemScanRulesetsGetdefaultResponse,
  SystemScanRulesetsGetByVersion200Response,
  SystemScanRulesetsGetByVersiondefaultResponse,
  SystemScanRulesetsGetLatest200Response,
  SystemScanRulesetsGetLatestdefaultResponse,
  SystemScanRulesetsListVersionsByDataSource200Response,
  SystemScanRulesetsListVersionsByDataSourcedefaultResponse,
  TriggersGetTrigger200Response,
  TriggersGetTriggerdefaultResponse,
  TriggersCreateTrigger200Response,
  TriggersCreateTrigger201Response,
  TriggersCreateTriggerdefaultResponse,
  TriggersDeleteTrigger200Response,
  TriggersDeleteTrigger204Response,
  TriggersDeleteTriggerdefaultResponse,
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { TokenCredential } from "@azure/core-auth";

export interface KeyVaultConnectionsGet {
  /** Gets key vault information */
  get(
    options?: KeyVaultConnectionsGetParameters
  ): Promise<KeyVaultConnectionsGet200Response | KeyVaultConnectionsGetdefaultResponse>;
  /** Creates an instance of a key vault connection */
  put(
    options: KeyVaultConnectionsCreateParameters
  ): Promise<KeyVaultConnectionsCreate200Response | KeyVaultConnectionsCreatedefaultResponse>;
  /** Deletes the key vault connection associated with the account */
  delete(
    options?: KeyVaultConnectionsDeleteParameters
  ): Promise<
    | KeyVaultConnectionsDelete200Response
    | KeyVaultConnectionsDelete204Response
    | KeyVaultConnectionsDeletedefaultResponse
  >;
}

export interface KeyVaultConnectionsListAll {
  /** List key vault connections in account */
  get(
    options?: KeyVaultConnectionsListAllParameters
  ): Promise<KeyVaultConnectionsListAll200Response | KeyVaultConnectionsListAlldefaultResponse>;
}

export interface ClassificationRulesGet {
  /** Get a classification rule */
  get(
    options?: ClassificationRulesGetParameters
  ): Promise<ClassificationRulesGet200Response | ClassificationRulesGetdefaultResponse>;
  /** Creates or Updates a classification rule */
  put(
    options?: ClassificationRulesCreateOrUpdateParameters
  ): Promise<
    | ClassificationRulesCreateOrUpdate200Response
    | ClassificationRulesCreateOrUpdate201Response
    | ClassificationRulesCreateOrUpdatedefaultResponse
  >;
  /** Deletes a classification rule */
  delete(
    options?: ClassificationRulesDeleteParameters
  ): Promise<
    | ClassificationRulesDelete200Response
    | ClassificationRulesDelete204Response
    | ClassificationRulesDeletedefaultResponse
  >;
}

export interface ClassificationRulesListAll {
  /** List classification rules in Account */
  get(
    options?: ClassificationRulesListAllParameters
  ): Promise<ClassificationRulesListAll200Response | ClassificationRulesListAlldefaultResponse>;
}

export interface ClassificationRulesListVersionsByClassificationRuleName {
  /** Lists the rule versions of a classification rule */
  get(
    options?: ClassificationRulesListVersionsByClassificationRuleNameParameters
  ): Promise<
    | ClassificationRulesListVersionsByClassificationRuleName200Response
    | ClassificationRulesListVersionsByClassificationRuleNamedefaultResponse
  >;
}

export interface ClassificationRulesTagClassificationVersion {
  /** Sets Classification Action on a specific classification rule version. */
  post(
    options: ClassificationRulesTagClassificationVersionParameters
  ): Promise<
    | ClassificationRulesTagClassificationVersion202Response
    | ClassificationRulesTagClassificationVersiondefaultResponse
  >;
}

export interface DataSourcesCreateOrUpdate {
  /** Creates or Updates a data source */
  put(
    options?: DataSourcesCreateOrUpdateParameters
  ): Promise<
    | DataSourcesCreateOrUpdate200Response
    | DataSourcesCreateOrUpdate201Response
    | DataSourcesCreateOrUpdatedefaultResponse
  >;
  /** Get a data source */
  get(
    options?: DataSourcesGetParameters
  ): Promise<DataSourcesGet200Response | DataSourcesGetdefaultResponse>;
  /** Deletes a data source */
  delete(
    options?: DataSourcesDeleteParameters
  ): Promise<
    DataSourcesDelete200Response | DataSourcesDelete204Response | DataSourcesDeletedefaultResponse
  >;
}

export interface DataSourcesListAll {
  /** List data sources in Data catalog */
  get(
    options?: DataSourcesListAllParameters
  ): Promise<DataSourcesListAll200Response | DataSourcesListAlldefaultResponse>;
}

export interface FiltersGet {
  /** Get a filter */
  get(options?: FiltersGetParameters): Promise<FiltersGet200Response | FiltersGetdefaultResponse>;
  /** Creates or updates a filter */
  put(
    options?: FiltersCreateOrUpdateParameters
  ): Promise<
    | FiltersCreateOrUpdate200Response
    | FiltersCreateOrUpdate201Response
    | FiltersCreateOrUpdatedefaultResponse
  >;
}

export interface ScansCreateOrUpdate {
  /** Creates an instance of a scan */
  put(
    options: ScansCreateOrUpdateParameters
  ): Promise<
    | ScansCreateOrUpdate200Response
    | ScansCreateOrUpdate201Response
    | ScansCreateOrUpdatedefaultResponse
  >;
  /** Gets a scan information */
  get(options?: ScansGetParameters): Promise<ScansGet200Response | ScansGetdefaultResponse>;
  /** Deletes the scan associated with the data source */
  delete(
    options?: ScansDeleteParameters
  ): Promise<ScansDelete200Response | ScansDelete204Response | ScansDeletedefaultResponse>;
}

export interface ScansListByDataSource {
  /** List scans in data source */
  get(
    options?: ScansListByDataSourceParameters
  ): Promise<ScansListByDataSource200Response | ScansListByDataSourcedefaultResponse>;
}

export interface ScanResultRunScan {
  /** Runs the scan */
  put(
    options?: ScanResultRunScanParameters
  ): Promise<ScanResultRunScan202Response | ScanResultRunScandefaultResponse>;
}

export interface ScanResultCancelScan {
  /** Cancels a scan */
  post(
    options?: ScanResultCancelScanParameters
  ): Promise<ScanResultCancelScan202Response | ScanResultCancelScandefaultResponse>;
}

export interface ScanResultListScanHistory {
  /** Lists the scan history of a scan */
  get(
    options?: ScanResultListScanHistoryParameters
  ): Promise<ScanResultListScanHistory200Response | ScanResultListScanHistorydefaultResponse>;
}

export interface ScanRulesetsGet {
  /** Get a scan ruleset */
  get(
    options?: ScanRulesetsGetParameters
  ): Promise<ScanRulesetsGet200Response | ScanRulesetsGetdefaultResponse>;
  /** Creates or Updates a scan ruleset */
  put(
    options?: ScanRulesetsCreateOrUpdateParameters
  ): Promise<
    | ScanRulesetsCreateOrUpdate200Response
    | ScanRulesetsCreateOrUpdate201Response
    | ScanRulesetsCreateOrUpdatedefaultResponse
  >;
  /** Deletes a scan ruleset */
  delete(
    options?: ScanRulesetsDeleteParameters
  ): Promise<
    | ScanRulesetsDelete200Response
    | ScanRulesetsDelete204Response
    | ScanRulesetsDeletedefaultResponse
  >;
}

export interface ScanRulesetsListAll {
  /** List scan rulesets in Data catalog */
  get(
    options?: ScanRulesetsListAllParameters
  ): Promise<ScanRulesetsListAll200Response | ScanRulesetsListAlldefaultResponse>;
}

export interface SystemScanRulesetsListAll {
  /** List all system scan rulesets for an account */
  get(
    options?: SystemScanRulesetsListAllParameters
  ): Promise<SystemScanRulesetsListAll200Response | SystemScanRulesetsListAlldefaultResponse>;
}

export interface SystemScanRulesetsGet {
  /** Get a system scan ruleset for a data source */
  get(
    options?: SystemScanRulesetsGetParameters
  ): Promise<SystemScanRulesetsGet200Response | SystemScanRulesetsGetdefaultResponse>;
}

export interface SystemScanRulesetsGetByVersion {
  /** Get a scan ruleset by version */
  get(
    options?: SystemScanRulesetsGetByVersionParameters
  ): Promise<
    SystemScanRulesetsGetByVersion200Response | SystemScanRulesetsGetByVersiondefaultResponse
  >;
}

export interface SystemScanRulesetsGetLatest {
  /** Get the latest version of a system scan ruleset */
  get(
    options?: SystemScanRulesetsGetLatestParameters
  ): Promise<SystemScanRulesetsGetLatest200Response | SystemScanRulesetsGetLatestdefaultResponse>;
}

export interface SystemScanRulesetsListVersionsByDataSource {
  /** List system scan ruleset versions in Data catalog */
  get(
    options?: SystemScanRulesetsListVersionsByDataSourceParameters
  ): Promise<
    | SystemScanRulesetsListVersionsByDataSource200Response
    | SystemScanRulesetsListVersionsByDataSourcedefaultResponse
  >;
}

export interface TriggersGetTrigger {
  /** Gets trigger information */
  get(
    options?: TriggersGetTriggerParameters
  ): Promise<TriggersGetTrigger200Response | TriggersGetTriggerdefaultResponse>;
  /** Creates an instance of a trigger */
  put(
    options: TriggersCreateTriggerParameters
  ): Promise<
    | TriggersCreateTrigger200Response
    | TriggersCreateTrigger201Response
    | TriggersCreateTriggerdefaultResponse
  >;
  /** Deletes the trigger associated with the scan */
  delete(
    options?: TriggersDeleteTriggerParameters
  ): Promise<
    | TriggersDeleteTrigger200Response
    | TriggersDeleteTrigger204Response
    | TriggersDeleteTriggerdefaultResponse
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
    classificationRuleName: string
  ): ClassificationRulesGet;
  /** Resource for '/classificationrules' has methods for the following verbs: get */
  (path: "/classificationrules"): ClassificationRulesListAll;
  /** Resource for '/classificationrules/\{classificationRuleName\}/versions' has methods for the following verbs: get */
  (
    path: "/classificationrules/{classificationRuleName}/versions",
    classificationRuleName: string
  ): ClassificationRulesListVersionsByClassificationRuleName;
  /** Resource for '/classificationrules/\{classificationRuleName\}/versions/\{classificationRuleVersion\}/:tag' has methods for the following verbs: post */
  (
    path: "/classificationrules/{classificationRuleName}/versions/{classificationRuleVersion}/:tag",
    classificationRuleName: string,
    classificationRuleVersion: string
  ): ClassificationRulesTagClassificationVersion;
  /** Resource for '/datasources/\{dataSourceName\}' has methods for the following verbs: put, get, delete */
  (path: "/datasources/{dataSourceName}", dataSourceName: string): DataSourcesCreateOrUpdate;
  /** Resource for '/datasources' has methods for the following verbs: get */
  (path: "/datasources"): DataSourcesListAll;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/filters/custom' has methods for the following verbs: get, put */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/filters/custom",
    dataSourceName: string,
    scanName: string
  ): FiltersGet;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}",
    dataSourceName: string,
    scanName: string
  ): ScansCreateOrUpdate;
  /** Resource for '/datasources/\{dataSourceName\}/scans' has methods for the following verbs: get */
  (path: "/datasources/{dataSourceName}/scans", dataSourceName: string): ScansListByDataSource;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/runs/\{runId\}' has methods for the following verbs: put */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/runs/{runId}",
    dataSourceName: string,
    scanName: string,
    runId: string
  ): ScanResultRunScan;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/runs/\{runId\}/:cancel' has methods for the following verbs: post */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/runs/{runId}/:cancel",
    dataSourceName: string,
    scanName: string,
    runId: string
  ): ScanResultCancelScan;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/runs' has methods for the following verbs: get */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/runs",
    dataSourceName: string,
    scanName: string
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
    dataSourceType: string
  ): SystemScanRulesetsGet;
  /** Resource for '/systemScanRulesets/versions/\{version\}' has methods for the following verbs: get */
  (path: "/systemScanRulesets/versions/{version}", version: string): SystemScanRulesetsGetByVersion;
  /** Resource for '/systemScanRulesets/versions/latest' has methods for the following verbs: get */
  (path: "/systemScanRulesets/versions/latest"): SystemScanRulesetsGetLatest;
  /** Resource for '/systemScanRulesets/versions' has methods for the following verbs: get */
  (path: "/systemScanRulesets/versions"): SystemScanRulesetsListVersionsByDataSource;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/triggers/default' has methods for the following verbs: get, put, delete */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/triggers/default",
    dataSourceName: string,
    scanName: string
  ): TriggersGetTrigger;
}

export type PurviewScanningRestClient = Client & {
  path: Routes;
};

export default function PurviewScanning(
  Endpoint: string,
  credentials: TokenCredential,
  options: ClientOptions = {}
): PurviewScanningRestClient {
  const baseUrl = options.baseUrl ?? `${Endpoint}`;
  options.apiVersion = options.apiVersion ?? "2018-12-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://purview.azure.net/.default"],
    },
  };

  return getClient(baseUrl, credentials, options) as PurviewScanningRestClient;
}
