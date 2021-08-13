// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpResponse } from "@azure-rest/core-client";
import {
  AzureKeyVault,
  ErrorResponseModel,
  AzureKeyVaultList,
  ClassificationRule,
  ClassificationRuleList,
  OperationResponse,
  DataSource,
  DataSourceList,
  Filter,
  Scan,
  ScanList,
  ScanHistoryList,
  ScanRuleset,
  ScanRulesetList,
  SystemScanRulesetList,
  SystemScanRuleset,
  Trigger,
} from "./models";

/** Gets key vault information */
export interface KeyVaultConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVault;
}

/** Gets key vault information */
export interface KeyVaultConnectionsGetdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Creates an instance of a key vault connection */
export interface KeyVaultConnectionsCreate200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVault;
}

/** Creates an instance of a key vault connection */
export interface KeyVaultConnectionsCreatedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Deletes the key vault connection associated with the account */
export interface KeyVaultConnectionsDelete200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVault;
}

/** Deletes the key vault connection associated with the account */
export interface KeyVaultConnectionsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes the key vault connection associated with the account */
export interface KeyVaultConnectionsDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List key vault connections in account */
export interface KeyVaultConnectionsListAll200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVaultList;
}

/** List key vault connections in account */
export interface KeyVaultConnectionsListAlldefaultResponse extends HttpResponse {
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
  body: ClassificationRule;
}

/** Deletes a classification rule */
export interface ClassificationRulesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
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
export interface ClassificationRulesTagClassificationVersion202Response extends HttpResponse {
  status: "202";
  body: OperationResponse;
}

/** Sets Classification Action on a specific classification rule version. */
export interface ClassificationRulesTagClassificationVersiondefaultResponse extends HttpResponse {
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
  body: DataSource;
}

/** Deletes a data source */
export interface DataSourcesDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes a data source */
export interface DataSourcesDeletedefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** List data sources in Data catalog */
export interface DataSourcesListAll200Response extends HttpResponse {
  status: "200";
  body: DataSourceList;
}

/** List data sources in Data catalog */
export interface DataSourcesListAlldefaultResponse extends HttpResponse {
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
  body: Scan;
}

/** Deletes the scan associated with the data source */
export interface ScansDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
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

/** Runs the scan */
export interface ScanResultRunScan202Response extends HttpResponse {
  status: "202";
  body: OperationResponse;
}

/** Runs the scan */
export interface ScanResultRunScandefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Cancels a scan */
export interface ScanResultCancelScan202Response extends HttpResponse {
  status: "202";
  body: OperationResponse;
}

/** Cancels a scan */
export interface ScanResultCancelScandefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}

/** Lists the scan history of a scan */
export interface ScanResultListScanHistory200Response extends HttpResponse {
  status: "200";
  body: ScanHistoryList;
}

/** Lists the scan history of a scan */
export interface ScanResultListScanHistorydefaultResponse extends HttpResponse {
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
  body: ScanRuleset;
}

/** Deletes a scan ruleset */
export interface ScanRulesetsDelete204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
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
  body: Trigger;
}

/** Deletes the trigger associated with the scan */
export interface TriggersDeleteTrigger204Response extends HttpResponse {
  status: "204";
  body: Record<string, unknown>;
}

/** Deletes the trigger associated with the scan */
export interface TriggersDeleteTriggerdefaultResponse extends HttpResponse {
  status: "500";
  body: ErrorResponseModel;
}
