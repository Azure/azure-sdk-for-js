// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ErrorResponseModel,
  AzureKeyVault,
  AzureKeyVaultList,
  ClassificationRule,
  ClassificationRuleList,
  OperationResponse,
  DataSource,
  DataSourceList,
  Filter,
  FilterList,
  ScanHistoryList,
  Scan,
  ScanList,
  ScanRuleset,
  ScanRulesetList,
  SystemScanRulesetList,
  SystemScanRuleset,
  SystemScanRulesetSetting,
  SystemScanRulesetSettingList,
  Trigger,
  TriggerList,
} from "./models";
import { HttpResponse } from "@azure-rest/core-client";

/** Check if azure key vault information exists */
export interface AzureKeyVaultsHead200Response extends HttpResponse {
  status: "200";
}

/** Check if azure key vault information exists */
export interface AzureKeyVaultsHeaddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Gets azureKeyVault information */
export interface AzureKeyVaultsGetAzureKeyVault200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVault;
}

/** Gets azureKeyVault information */
export interface AzureKeyVaultsGetAzureKeyVaultdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Creates an instance of a azureKeyVault */
export interface AzureKeyVaultsCreateAzureKeyVault200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVault;
}

/** Creates an instance of a azureKeyVault */
export interface AzureKeyVaultsCreateAzureKeyVaultdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Deletes the azureKeyVault associated with the account */
export interface AzureKeyVaultsDeleteAzureKeyVault200Response extends HttpResponse {
  status: "200";
}

/** Deletes the azureKeyVault associated with the account */
export interface AzureKeyVaultsDeleteAzureKeyVaultdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List azureKeyVaults in account */
export interface AzureKeyVaultsListByAccount200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVaultList;
}

/** List azureKeyVaults in account */
export interface AzureKeyVaultsListByAccountdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Cook and return bloom filter */
export interface BloomFilterCook200Response extends HttpResponse {
  status: "200";
}

/** Cook and return bloom filter */
export interface BloomFilterCookdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Check if a classification rule exists */
export interface ClassificationRulesHead200Response extends HttpResponse {
  status: "200";
}

/** Check if a classification rule exists */
export interface ClassificationRulesHeaddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Get a classification rule */
export interface ClassificationRulesGet200Response extends HttpResponse {
  status: "200";
  body: ClassificationRule;
}

/** Get a classification rule */
export interface ClassificationRulesGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Creates or Updates a classification rule */
export interface ClassificationRulesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ClassificationRule;
}

/** Creates or Updates a classification rule */
export interface ClassificationRulesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ClassificationRule;
}

/** Creates or Updates a classification rule */
export interface ClassificationRulesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Deletes a classification rule */
export interface ClassificationRulesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a classification rule */
export interface ClassificationRulesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a classification rule */
export interface ClassificationRulesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a classification rule */
export interface ClassificationRulesDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List classification rules in Account */
export interface ClassificationRulesListAll200Response extends HttpResponse {
  status: "200";
  body: ClassificationRuleList;
}

/** List classification rules in Account */
export interface ClassificationRulesListAlldefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Lists the rule versions of a classification rule */
export interface ClassificationRulesListVersionsByClassificationRuleName200Response
  extends HttpResponse {
  status: "200";
  body: ClassificationRuleList;
}

/** Lists the rule versions of a classification rule */
export interface ClassificationRulesListVersionsByClassificationRuleNamedefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Sets Classification Action on a specific classification rule version. */
export interface ClassificationRulesSetClassificationActionForVersion200Response
  extends HttpResponse {
  status: "200";
  body: OperationResponse;
}

/** Sets Classification Action on a specific classification rule version. */
export interface ClassificationRulesSetClassificationActionForVersion202Response
  extends HttpResponse {
  status: "202";
  body: OperationResponse;
}

/** Sets Classification Action on a specific classification rule version. */
export interface ClassificationRulesSetClassificationActionForVersiondefaultResponse
  extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Creates or Updates a data source */
export interface DataSourcesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DataSource;
}

/** Creates or Updates a data source */
export interface DataSourcesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DataSource;
}

/** Creates or Updates a data source */
export interface DataSourcesCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Check if a data source exists */
export interface DataSourcesHead200Response extends HttpResponse {
  status: "200";
}

/** Check if a data source exists */
export interface DataSourcesHeaddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Get a data source */
export interface DataSourcesGet200Response extends HttpResponse {
  status: "200";
  body: DataSource;
}

/** Get a data source */
export interface DataSourcesGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Deletes a data source */
export interface DataSourcesDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a data source */
export interface DataSourcesDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a data source */
export interface DataSourcesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a data source */
export interface DataSourcesDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List data sources in Data catalog */
export interface DataSourcesListByAccount200Response extends HttpResponse {
  status: "200";
  body: DataSourceList;
}

/** List data sources in Data catalog */
export interface DataSourcesListByAccountdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Lists the children of the collection. */
export interface DataSourcesListChildrenByCollection200Response extends HttpResponse {
  status: "200";
  body: DataSourceList;
}

/** Lists the children of the collection. */
export interface DataSourcesListChildrenByCollectiondefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Lists the data sources in the account that do not belong to any collection. */
export interface DataSourceListUnparentedDataSourcesByAccount200Response extends HttpResponse {
  status: "200";
  body: DataSourceList;
}

/** Lists the data sources in the account that do not belong to any collection. */
export interface DataSourceListUnparentedDataSourcesByAccountdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Check if a filter exists */
export interface FiltersHead200Response extends HttpResponse {
  status: "200";
}

/** Check if a filter exists */
export interface FiltersHeaddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Get a filter */
export interface FiltersGet200Response extends HttpResponse {
  status: "200";
  body: Filter;
}

/** Get a filter */
export interface FiltersGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Creates or updates a filter */
export interface FiltersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Filter;
}

/** Creates or updates a filter */
export interface FiltersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Filter;
}

/** Creates or updates a filter */
export interface FiltersCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Deletes a filter */
export interface FiltersDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a filter */
export interface FiltersDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a filter */
export interface FiltersDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a filter */
export interface FiltersDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List filters in Scan */
export interface FiltersListByScan200Response extends HttpResponse {
  status: "200";
  body: FilterList;
}

/** List filters in Scan */
export interface FiltersListByScandefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Runs the scan */
export interface ScansRun200Response extends HttpResponse {
  status: "200";
  body: OperationResponse;
}

/** Runs the scan */
export interface ScansRun202Response extends HttpResponse {
  status: "202";
  body: OperationResponse;
}

/** Runs the scan */
export interface ScansRundefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Cancels a scan */
export interface ScansCancel202Response extends HttpResponse {
  status: "202";
  body: OperationResponse;
}

/** Cancels a scan */
export interface ScansCanceldefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Lists the scan history of a scan */
export interface ScansListHistory200Response extends HttpResponse {
  status: "200";
  body: ScanHistoryList;
}

/** Lists the scan history of a scan */
export interface ScansListHistorydefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Lists the scan history of a scan */
export interface ScansListHistoryPost200Response extends HttpResponse {
  status: "200";
  body: ScanHistoryList;
}

/** Lists the scan history of a scan */
export interface ScansListHistoryPostdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Creates an instance of a scan */
export interface ScansCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: Scan;
}

/** Creates an instance of a scan */
export interface ScansCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: Scan;
}

/** Creates an instance of a scan */
export interface ScansCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Check if a scan exists */
export interface ScansHead200Response extends HttpResponse {
  status: "200";
}

/** Check if a scan exists */
export interface ScansHeaddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Gets a scan information */
export interface ScansGet200Response extends HttpResponse {
  status: "200";
  body: Scan;
}

/** Gets a scan information */
export interface ScansGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Deletes the scan associated with the data source */
export interface ScansDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes the scan associated with the data source */
export interface ScansDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes the scan associated with the data source */
export interface ScansDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the scan associated with the data source */
export interface ScansDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List scans in data source */
export interface ScansListByDataSource200Response extends HttpResponse {
  status: "200";
  body: ScanList;
}

/** List scans in data source */
export interface ScansListByDataSourcedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Check if a scan ruleset exists */
export interface ScanRulesetsHead200Response extends HttpResponse {
  status: "200";
}

/** Check if a scan ruleset exists */
export interface ScanRulesetsHeaddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Get a scan ruleset */
export interface ScanRulesetsGet200Response extends HttpResponse {
  status: "200";
  body: ScanRuleset;
}

/** Get a scan ruleset */
export interface ScanRulesetsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Creates or Updates a scan ruleset */
export interface ScanRulesetsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ScanRuleset;
}

/** Creates or Updates a scan ruleset */
export interface ScanRulesetsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ScanRuleset;
}

/** Creates or Updates a scan ruleset */
export interface ScanRulesetsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Deletes a scan ruleset */
export interface ScanRulesetsDelete200Response extends HttpResponse {
  status: "200";
}

/** Deletes a scan ruleset */
export interface ScanRulesetsDelete202Response extends HttpResponse {
  status: "202";
}

/** Deletes a scan ruleset */
export interface ScanRulesetsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a scan ruleset */
export interface ScanRulesetsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List scan rulesets in Data catalog */
export interface ScanRulesetsListAll200Response extends HttpResponse {
  status: "200";
  body: ScanRulesetList;
}

/** List scan rulesets in Data catalog */
export interface ScanRulesetsListAlldefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List all system scan rulesets for an account */
export interface SystemScanRulesetsListAll200Response extends HttpResponse {
  status: "200";
  body: SystemScanRulesetList;
}

/** List all system scan rulesets for an account */
export interface SystemScanRulesetsListAlldefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Get a system scan ruleset for a data source */
export interface SystemScanRulesetsGet200Response extends HttpResponse {
  status: "200";
  body: SystemScanRuleset;
}

/** Get a system scan ruleset for a data source */
export interface SystemScanRulesetsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Get a scan ruleset by version */
export interface SystemScanRulesetsGetByVersion200Response extends HttpResponse {
  status: "200";
  body: SystemScanRuleset;
}

/** Get a scan ruleset by version */
export interface SystemScanRulesetsGetByVersiondefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Get the latest version of a system scan ruleset */
export interface SystemScanRulesetsGetLatest200Response extends HttpResponse {
  status: "200";
  body: SystemScanRuleset;
}

/** Get the latest version of a system scan ruleset */
export interface SystemScanRulesetsGetLatestdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List system scan ruleset versions in Data catalog */
export interface SystemScanRulesetsListVersionsByDataSource200Response extends HttpResponse {
  status: "200";
  body: SystemScanRulesetList;
}

/** List system scan ruleset versions in Data catalog */
export interface SystemScanRulesetsListVersionsByDataSourcedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Get a system scan ruleset settings for a data source */
export interface SystemScanRulesetSettingsGet200Response extends HttpResponse {
  status: "200";
  body: SystemScanRulesetSetting;
}

/** Get a system scan ruleset settings for a data source */
export interface SystemScanRulesetSettingsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List system scan ruleset settings for an account */
export interface SystemScanRulesetSettingsListAll200Response extends HttpResponse {
  status: "200";
  body: SystemScanRulesetSettingList;
}

/** List system scan ruleset settings for an account */
export interface SystemScanRulesetSettingsListAlldefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Creates or Updates a system scan ruleset account settings */
export interface SystemScanRulesetSettingsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: SystemScanRulesetSetting;
}

/** Creates or Updates a system scan ruleset account settings */
export interface SystemScanRulesetSettingsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: SystemScanRulesetSetting;
}

/** Creates or Updates a system scan ruleset account settings */
export interface SystemScanRulesetSettingsCreateOrUpdatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Check if a trigger exists */
export interface TriggersHead200Response extends HttpResponse {
  status: "200";
}

/** Check if a trigger exists */
export interface TriggersHeaddefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Gets trigger information */
export interface TriggersGetTrigger200Response extends HttpResponse {
  status: "200";
  body: Trigger;
}

/** Gets trigger information */
export interface TriggersGetTriggerdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Creates an instance of a trigger */
export interface TriggersCreateTrigger200Response extends HttpResponse {
  status: "200";
  body: Trigger;
}

/** Creates an instance of a trigger */
export interface TriggersCreateTrigger201Response extends HttpResponse {
  status: "201";
  body: Trigger;
}

/** Creates an instance of a trigger */
export interface TriggersCreateTriggerdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Deletes the trigger associated with the scan */
export interface TriggersDeleteTrigger200Response extends HttpResponse {
  status: "200";
}

/** Deletes the trigger associated with the scan */
export interface TriggersDeleteTrigger202Response extends HttpResponse {
  status: "202";
}

/** Deletes the trigger associated with the scan */
export interface TriggersDeleteTrigger204Response extends HttpResponse {
  status: "204";
}

/** Deletes the trigger associated with the scan */
export interface TriggersDeleteTriggerdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List triggers in Scan */
export interface TriggersListByScan200Response extends HttpResponse {
  status: "200";
  body: TriggerList;
}

/** List triggers in Scan */
export interface TriggersListByScandefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}
