// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  AzureKeyVaultsHeadParameters,
  AzureKeyVaultsGetAzureKeyVaultParameters,
  AzureKeyVaultsCreateAzureKeyVaultParameters,
  AzureKeyVaultsDeleteAzureKeyVaultParameters,
  AzureKeyVaultsListByAccountParameters,
  BloomFilterCookParameters,
  ClassificationRulesHeadParameters,
  ClassificationRulesGetParameters,
  ClassificationRulesCreateOrUpdateParameters,
  ClassificationRulesDeleteParameters,
  ClassificationRulesListAllParameters,
  ClassificationRulesListVersionsByClassificationRuleNameParameters,
  ClassificationRulesSetClassificationActionForVersionParameters,
  DataSourcesCreateOrUpdateParameters,
  DataSourcesHeadParameters,
  DataSourcesGetParameters,
  DataSourcesDeleteParameters,
  DataSourcesListByAccountParameters,
  DataSourcesListChildrenByCollectionParameters,
  DataSourceListUnparentedDataSourcesByAccountParameters,
  FiltersHeadParameters,
  FiltersGetParameters,
  FiltersCreateOrUpdateParameters,
  FiltersDeleteParameters,
  FiltersListByScanParameters,
  ScansRunParameters,
  ScansCancelParameters,
  ScansListHistoryParameters,
  ScansListHistoryPostParameters,
  ScansCreateOrUpdateParameters,
  ScansHeadParameters,
  ScansGetParameters,
  ScansDeleteParameters,
  ScansListByDataSourceParameters,
  ScanRulesetsHeadParameters,
  ScanRulesetsGetParameters,
  ScanRulesetsCreateOrUpdateParameters,
  ScanRulesetsDeleteParameters,
  ScanRulesetsListAllParameters,
  SystemScanRulesetsListAllParameters,
  SystemScanRulesetsGetParameters,
  SystemScanRulesetsGetByVersionParameters,
  SystemScanRulesetsGetLatestParameters,
  SystemScanRulesetsListVersionsByDataSourceParameters,
  SystemScanRulesetSettingsGetParameters,
  SystemScanRulesetSettingsListAllParameters,
  SystemScanRulesetSettingsCreateOrUpdateParameters,
  TriggersHeadParameters,
  TriggersGetTriggerParameters,
  TriggersCreateTriggerParameters,
  TriggersDeleteTriggerParameters,
  TriggersListByScanParameters,
} from "./parameters";
import {
  AzureKeyVaultsHead200Response,
  AzureKeyVaultsHeaddefaultResponse,
  AzureKeyVaultsGetAzureKeyVault200Response,
  AzureKeyVaultsGetAzureKeyVaultdefaultResponse,
  AzureKeyVaultsCreateAzureKeyVault200Response,
  AzureKeyVaultsCreateAzureKeyVaultdefaultResponse,
  AzureKeyVaultsDeleteAzureKeyVault200Response,
  AzureKeyVaultsDeleteAzureKeyVaultdefaultResponse,
  AzureKeyVaultsListByAccount200Response,
  AzureKeyVaultsListByAccountdefaultResponse,
  BloomFilterCook200Response,
  BloomFilterCookdefaultResponse,
  ClassificationRulesHead200Response,
  ClassificationRulesHeaddefaultResponse,
  ClassificationRulesGet200Response,
  ClassificationRulesGetdefaultResponse,
  ClassificationRulesCreateOrUpdate200Response,
  ClassificationRulesCreateOrUpdate201Response,
  ClassificationRulesCreateOrUpdatedefaultResponse,
  ClassificationRulesDelete200Response,
  ClassificationRulesDelete202Response,
  ClassificationRulesDelete204Response,
  ClassificationRulesDeletedefaultResponse,
  ClassificationRulesListAll200Response,
  ClassificationRulesListAlldefaultResponse,
  ClassificationRulesListVersionsByClassificationRuleName200Response,
  ClassificationRulesListVersionsByClassificationRuleNamedefaultResponse,
  ClassificationRulesSetClassificationActionForVersion200Response,
  ClassificationRulesSetClassificationActionForVersion202Response,
  ClassificationRulesSetClassificationActionForVersiondefaultResponse,
  DataSourcesCreateOrUpdate200Response,
  DataSourcesCreateOrUpdate201Response,
  DataSourcesCreateOrUpdatedefaultResponse,
  DataSourcesHead200Response,
  DataSourcesHeaddefaultResponse,
  DataSourcesGet200Response,
  DataSourcesGetdefaultResponse,
  DataSourcesDelete200Response,
  DataSourcesDelete202Response,
  DataSourcesDelete204Response,
  DataSourcesDeletedefaultResponse,
  DataSourcesListByAccount200Response,
  DataSourcesListByAccountdefaultResponse,
  DataSourcesListChildrenByCollection200Response,
  DataSourcesListChildrenByCollectiondefaultResponse,
  DataSourceListUnparentedDataSourcesByAccount200Response,
  DataSourceListUnparentedDataSourcesByAccountdefaultResponse,
  FiltersHead200Response,
  FiltersHeaddefaultResponse,
  FiltersGet200Response,
  FiltersGetdefaultResponse,
  FiltersCreateOrUpdate200Response,
  FiltersCreateOrUpdate201Response,
  FiltersCreateOrUpdatedefaultResponse,
  FiltersDelete200Response,
  FiltersDelete202Response,
  FiltersDelete204Response,
  FiltersDeletedefaultResponse,
  FiltersListByScan200Response,
  FiltersListByScandefaultResponse,
  ScansRun200Response,
  ScansRun202Response,
  ScansRundefaultResponse,
  ScansCancel202Response,
  ScansCanceldefaultResponse,
  ScansListHistory200Response,
  ScansListHistorydefaultResponse,
  ScansListHistoryPost200Response,
  ScansListHistoryPostdefaultResponse,
  ScansCreateOrUpdate200Response,
  ScansCreateOrUpdate201Response,
  ScansCreateOrUpdatedefaultResponse,
  ScansHead200Response,
  ScansHeaddefaultResponse,
  ScansGet200Response,
  ScansGetdefaultResponse,
  ScansDelete200Response,
  ScansDelete202Response,
  ScansDelete204Response,
  ScansDeletedefaultResponse,
  ScansListByDataSource200Response,
  ScansListByDataSourcedefaultResponse,
  ScanRulesetsHead200Response,
  ScanRulesetsHeaddefaultResponse,
  ScanRulesetsGet200Response,
  ScanRulesetsGetdefaultResponse,
  ScanRulesetsCreateOrUpdate200Response,
  ScanRulesetsCreateOrUpdate201Response,
  ScanRulesetsCreateOrUpdatedefaultResponse,
  ScanRulesetsDelete200Response,
  ScanRulesetsDelete202Response,
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
  SystemScanRulesetSettingsGet200Response,
  SystemScanRulesetSettingsGetdefaultResponse,
  SystemScanRulesetSettingsListAll200Response,
  SystemScanRulesetSettingsListAlldefaultResponse,
  SystemScanRulesetSettingsCreateOrUpdate200Response,
  SystemScanRulesetSettingsCreateOrUpdate201Response,
  SystemScanRulesetSettingsCreateOrUpdatedefaultResponse,
  TriggersHead200Response,
  TriggersHeaddefaultResponse,
  TriggersGetTrigger200Response,
  TriggersGetTriggerdefaultResponse,
  TriggersCreateTrigger200Response,
  TriggersCreateTrigger201Response,
  TriggersCreateTriggerdefaultResponse,
  TriggersDeleteTrigger200Response,
  TriggersDeleteTrigger202Response,
  TriggersDeleteTrigger204Response,
  TriggersDeleteTriggerdefaultResponse,
  TriggersListByScan200Response,
  TriggersListByScandefaultResponse,
} from "./responses";
import { getClient, ClientOptions, Client } from "@azure-rest/core-client";
import { KeyCredential, TokenCredential } from "@azure/core-auth";

export interface AzureKeyVaultsDeleteAzureKeyVault {
  /** Check if azure key vault information exists */
  head(
    options?: AzureKeyVaultsHeadParameters
  ): Promise<AzureKeyVaultsHead200Response | AzureKeyVaultsHeaddefaultResponse>;
  /** Gets azureKeyVault information */
  get(
    options?: AzureKeyVaultsGetAzureKeyVaultParameters
  ): Promise<
    AzureKeyVaultsGetAzureKeyVault200Response | AzureKeyVaultsGetAzureKeyVaultdefaultResponse
  >;
  /** Creates an instance of a azureKeyVault */
  put(
    options: AzureKeyVaultsCreateAzureKeyVaultParameters
  ): Promise<
    AzureKeyVaultsCreateAzureKeyVault200Response | AzureKeyVaultsCreateAzureKeyVaultdefaultResponse
  >;
  /** Deletes the azureKeyVault associated with the account */
  delete(
    options?: AzureKeyVaultsDeleteAzureKeyVaultParameters
  ): Promise<
    AzureKeyVaultsDeleteAzureKeyVault200Response | AzureKeyVaultsDeleteAzureKeyVaultdefaultResponse
  >;
}

export interface AzureKeyVaultsListByAccount {
  /** List azureKeyVaults in account */
  get(
    options?: AzureKeyVaultsListByAccountParameters
  ): Promise<AzureKeyVaultsListByAccount200Response | AzureKeyVaultsListByAccountdefaultResponse>;
}

export interface BloomFilterCook {
  /** Cook and return bloom filter */
  put(
    options: BloomFilterCookParameters
  ): Promise<BloomFilterCook200Response | BloomFilterCookdefaultResponse>;
}

export interface ClassificationRulesDelete {
  /** Check if a classification rule exists */
  head(
    options?: ClassificationRulesHeadParameters
  ): Promise<ClassificationRulesHead200Response | ClassificationRulesHeaddefaultResponse>;
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
    | ClassificationRulesDelete202Response
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

export interface ClassificationRulesSetClassificationActionForVersion {
  /** Sets Classification Action on a specific classification rule version. */
  post(
    options: ClassificationRulesSetClassificationActionForVersionParameters
  ): Promise<
    | ClassificationRulesSetClassificationActionForVersion200Response
    | ClassificationRulesSetClassificationActionForVersion202Response
    | ClassificationRulesSetClassificationActionForVersiondefaultResponse
  >;
}

export interface DataSourcesDelete {
  /** Creates or Updates a data source */
  put(
    options?: DataSourcesCreateOrUpdateParameters
  ): Promise<
    | DataSourcesCreateOrUpdate200Response
    | DataSourcesCreateOrUpdate201Response
    | DataSourcesCreateOrUpdatedefaultResponse
  >;
  /** Check if a data source exists */
  head(
    options?: DataSourcesHeadParameters
  ): Promise<DataSourcesHead200Response | DataSourcesHeaddefaultResponse>;
  /** Get a data source */
  get(
    options?: DataSourcesGetParameters
  ): Promise<DataSourcesGet200Response | DataSourcesGetdefaultResponse>;
  /** Deletes a data source */
  delete(
    options?: DataSourcesDeleteParameters
  ): Promise<
    | DataSourcesDelete200Response
    | DataSourcesDelete202Response
    | DataSourcesDelete204Response
    | DataSourcesDeletedefaultResponse
  >;
}

export interface DataSourcesListByAccount {
  /** List data sources in Data catalog */
  get(
    options?: DataSourcesListByAccountParameters
  ): Promise<DataSourcesListByAccount200Response | DataSourcesListByAccountdefaultResponse>;
}

export interface DataSourcesListChildrenByCollection {
  /** Lists the children of the collection. */
  get(
    options?: DataSourcesListChildrenByCollectionParameters
  ): Promise<
    | DataSourcesListChildrenByCollection200Response
    | DataSourcesListChildrenByCollectiondefaultResponse
  >;
}

export interface DataSourceListUnparentedDataSourcesByAccount {
  /** Lists the data sources in the account that do not belong to any collection. */
  get(
    options?: DataSourceListUnparentedDataSourcesByAccountParameters
  ): Promise<
    | DataSourceListUnparentedDataSourcesByAccount200Response
    | DataSourceListUnparentedDataSourcesByAccountdefaultResponse
  >;
}

export interface FiltersDelete {
  /** Check if a filter exists */
  head(
    options?: FiltersHeadParameters
  ): Promise<FiltersHead200Response | FiltersHeaddefaultResponse>;
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
  /** Deletes a filter */
  delete(
    options?: FiltersDeleteParameters
  ): Promise<
    | FiltersDelete200Response
    | FiltersDelete202Response
    | FiltersDelete204Response
    | FiltersDeletedefaultResponse
  >;
}

export interface FiltersListByScan {
  /** List filters in Scan */
  get(
    options?: FiltersListByScanParameters
  ): Promise<FiltersListByScan200Response | FiltersListByScandefaultResponse>;
}

export interface ScansRun {
  /** Runs the scan */
  post(
    options?: ScansRunParameters
  ): Promise<ScansRun200Response | ScansRun202Response | ScansRundefaultResponse>;
}

export interface ScansCancel {
  /** Cancels a scan */
  post(
    options: ScansCancelParameters
  ): Promise<ScansCancel202Response | ScansCanceldefaultResponse>;
}

export interface ScansListHistoryPost {
  /** Lists the scan history of a scan */
  get(
    options?: ScansListHistoryParameters
  ): Promise<ScansListHistory200Response | ScansListHistorydefaultResponse>;
  /** Lists the scan history of a scan */
  post(
    options?: ScansListHistoryPostParameters
  ): Promise<ScansListHistoryPost200Response | ScansListHistoryPostdefaultResponse>;
}

export interface ScansDelete {
  /** Creates an instance of a scan */
  put(
    options: ScansCreateOrUpdateParameters
  ): Promise<
    | ScansCreateOrUpdate200Response
    | ScansCreateOrUpdate201Response
    | ScansCreateOrUpdatedefaultResponse
  >;
  /** Check if a scan exists */
  head(options?: ScansHeadParameters): Promise<ScansHead200Response | ScansHeaddefaultResponse>;
  /** Gets a scan information */
  get(options?: ScansGetParameters): Promise<ScansGet200Response | ScansGetdefaultResponse>;
  /** Deletes the scan associated with the data source */
  delete(
    options?: ScansDeleteParameters
  ): Promise<
    | ScansDelete200Response
    | ScansDelete202Response
    | ScansDelete204Response
    | ScansDeletedefaultResponse
  >;
}

export interface ScansListByDataSource {
  /** List scans in data source */
  get(
    options?: ScansListByDataSourceParameters
  ): Promise<ScansListByDataSource200Response | ScansListByDataSourcedefaultResponse>;
}

export interface ScanRulesetsDelete {
  /** Check if a scan ruleset exists */
  head(
    options?: ScanRulesetsHeadParameters
  ): Promise<ScanRulesetsHead200Response | ScanRulesetsHeaddefaultResponse>;
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
    | ScanRulesetsDelete202Response
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

export interface SystemScanRulesetSettingsGet {
  /** Get a system scan ruleset settings for a data source */
  get(
    options?: SystemScanRulesetSettingsGetParameters
  ): Promise<SystemScanRulesetSettingsGet200Response | SystemScanRulesetSettingsGetdefaultResponse>;
}

export interface SystemScanRulesetSettingsCreateOrUpdate {
  /** List system scan ruleset settings for an account */
  get(
    options?: SystemScanRulesetSettingsListAllParameters
  ): Promise<
    SystemScanRulesetSettingsListAll200Response | SystemScanRulesetSettingsListAlldefaultResponse
  >;
  /** Creates or Updates a system scan ruleset account settings */
  put(
    options?: SystemScanRulesetSettingsCreateOrUpdateParameters
  ): Promise<
    | SystemScanRulesetSettingsCreateOrUpdate200Response
    | SystemScanRulesetSettingsCreateOrUpdate201Response
    | SystemScanRulesetSettingsCreateOrUpdatedefaultResponse
  >;
}

export interface TriggersDeleteTrigger {
  /** Check if a trigger exists */
  head(
    options?: TriggersHeadParameters
  ): Promise<TriggersHead200Response | TriggersHeaddefaultResponse>;
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
    | TriggersDeleteTrigger202Response
    | TriggersDeleteTrigger204Response
    | TriggersDeleteTriggerdefaultResponse
  >;
}

export interface TriggersListByScan {
  /** List triggers in Scan */
  get(
    options?: TriggersListByScanParameters
  ): Promise<TriggersListByScan200Response | TriggersListByScandefaultResponse>;
}

export interface Routes {
  /** Resource for '/azureKeyVaults/\{azureKeyVaultName\}' has methods for the following verbs: head, get, put, delete */
  (
    path: "/azureKeyVaults/{azureKeyVaultName}",
    azureKeyVaultName: string
  ): AzureKeyVaultsDeleteAzureKeyVault;
  /** Resource for '/azureKeyVaults' has methods for the following verbs: get */
  (path: "/azureKeyVaults"): AzureKeyVaultsListByAccount;
  /** Resource for '/cookbloomfilter' has methods for the following verbs: put */
  (path: "/cookbloomfilter"): BloomFilterCook;
  /** Resource for '/classificationrules/\{classificationRuleName\}' has methods for the following verbs: head, get, put, delete */
  (
    path: "/classificationrules/{classificationRuleName}",
    classificationRuleName: string
  ): ClassificationRulesDelete;
  /** Resource for '/classificationrules' has methods for the following verbs: get */
  (path: "/classificationrules"): ClassificationRulesListAll;
  /** Resource for '/classificationrules/\{classificationRuleName\}/versions' has methods for the following verbs: get */
  (
    path: "/classificationrules/{classificationRuleName}/versions",
    classificationRuleName: string
  ): ClassificationRulesListVersionsByClassificationRuleName;
  /** Resource for '/classificationrules/\{classificationRuleName\}/versions/\{classificationRuleVersion\}/setclassificationaction' has methods for the following verbs: post */
  (
    path: "/classificationrules/{classificationRuleName}/versions/{classificationRuleVersion}/setclassificationaction",
    classificationRuleName: string,
    classificationRuleVersion: string
  ): ClassificationRulesSetClassificationActionForVersion;
  /** Resource for '/datasources/\{dataSourceName\}' has methods for the following verbs: put, head, get, delete */
  (path: "/datasources/{dataSourceName}", dataSourceName: string): DataSourcesDelete;
  /** Resource for '/datasources' has methods for the following verbs: get */
  (path: "/datasources"): DataSourcesListByAccount;
  /** Resource for '/datasources/\{dataSourceName\}/listChildren' has methods for the following verbs: get */
  (
    path: "/datasources/{dataSourceName}/listChildren",
    dataSourceName: string
  ): DataSourcesListChildrenByCollection;
  /** Resource for '/listUnparentedDataSources' has methods for the following verbs: get */
  (path: "/listUnparentedDataSources"): DataSourceListUnparentedDataSourcesByAccount;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/filters/custom' has methods for the following verbs: head, get, put, delete */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/filters/custom",
    dataSourceName: string,
    scanName: string
  ): FiltersDelete;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/filters' has methods for the following verbs: get */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/filters",
    dataSourceName: string,
    scanName: string
  ): FiltersListByScan;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/run' has methods for the following verbs: post */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/run",
    dataSourceName: string,
    scanName: string
  ): ScansRun;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/cancel' has methods for the following verbs: post */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/cancel",
    dataSourceName: string,
    scanName: string
  ): ScansCancel;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/listHistory' has methods for the following verbs: get, post */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/listHistory",
    dataSourceName: string,
    scanName: string
  ): ScansListHistoryPost;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}' has methods for the following verbs: put, head, get, delete */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}",
    dataSourceName: string,
    scanName: string
  ): ScansDelete;
  /** Resource for '/datasources/\{dataSourceName\}/scans' has methods for the following verbs: get */
  (path: "/datasources/{dataSourceName}/scans", dataSourceName: string): ScansListByDataSource;
  /** Resource for '/scanrulesets/\{scanRulesetName\}' has methods for the following verbs: head, get, put, delete */
  (path: "/scanrulesets/{scanRulesetName}", scanRulesetName: string): ScanRulesetsDelete;
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
  /** Resource for '/systemScanRulesets/settings/datasources/\{dataSourceType\}' has methods for the following verbs: get */
  (
    path: "/systemScanRulesets/settings/datasources/{dataSourceType}",
    dataSourceType: string
  ): SystemScanRulesetSettingsGet;
  /** Resource for '/systemScanRulesets/settings' has methods for the following verbs: get, put */
  (path: "/systemScanRulesets/settings"): SystemScanRulesetSettingsCreateOrUpdate;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/triggers/\{triggerName\}' has methods for the following verbs: head, get, put, delete */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/triggers/{triggerName}",
    dataSourceName: string,
    scanName: string,
    triggerName: string
  ): TriggersDeleteTrigger;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/triggers' has methods for the following verbs: get */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/triggers",
    dataSourceName: string,
    scanName: string
  ): TriggersListByScan;
}

export type PurviewScanningClient = Client & {
  path: Routes;
};

export interface PurviewScanningFactory {
  (Endpoint: string, credentials: TokenCredential | KeyCredential, options?: ClientOptions): void;
}

export default function PurviewScanning(
  Endpoint: string,
  credentials: TokenCredential | KeyCredential,
  options: ClientOptions = {}
): PurviewScanningClient {
  const baseUrl = options.baseUrl ?? `${Endpoint}`;
  options.apiVersion = options.apiVersion ?? "2018-12-01-preview";
  options = {
    ...options,
    credentials: {
      scopes: ["https://purview.azure.net/.default"],
    },
  };

  return getClient(baseUrl, credentials, options) as PurviewScanningClient;
}
