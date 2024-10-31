// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { HttpResponse } from "@azure-rest/core-client";
import {
  AzureKeyVaultOutput,
  ErrorResponseModelOutput,
  AzureKeyVaultListOutput,
  ClassificationRuleOutput,
  ClassificationRuleListOutput,
  OperationResponseOutput,
  DataSourceOutput,
  DataSourceListOutput,
  FilterOutput,
  ScanOutput,
  ScanListOutput,
  ScanHistoryListOutput,
  ScanRulesetOutput,
  ScanRulesetListOutput,
  SystemScanRulesetListOutput,
  SystemScanRulesetOutput,
  TriggerOutput,
} from "./outputModels";

/** Gets key vault information */
export interface KeyVaultConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVaultOutput;
}

/** Gets key vault information */
export interface KeyVaultConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Creates an instance of a key vault connection */
export interface KeyVaultConnectionsCreate200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVaultOutput;
}

/** Creates an instance of a key vault connection */
export interface KeyVaultConnectionsCreateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Deletes the key vault connection associated with the account */
export interface KeyVaultConnectionsDelete200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVaultOutput;
}

/** Deletes the key vault connection associated with the account */
export interface KeyVaultConnectionsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the key vault connection associated with the account */
export interface KeyVaultConnectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** List key vault connections in account */
export interface KeyVaultConnectionsListAll200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVaultListOutput;
}

/** List key vault connections in account */
export interface KeyVaultConnectionsListAllDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Get a classification rule */
export interface ClassificationRulesGet200Response extends HttpResponse {
  status: "200";
  body: ClassificationRuleOutput;
}

/** Get a classification rule */
export interface ClassificationRulesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Creates or Updates a classification rule */
export interface ClassificationRulesCreateOrUpdate200Response
  extends HttpResponse {
  status: "200";
  body: ClassificationRuleOutput;
}

/** Creates or Updates a classification rule */
export interface ClassificationRulesCreateOrUpdate201Response
  extends HttpResponse {
  status: "201";
  body: ClassificationRuleOutput;
}

/** Creates or Updates a classification rule */
export interface ClassificationRulesCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Deletes a classification rule */
export interface ClassificationRulesDelete200Response extends HttpResponse {
  status: "200";
  body: ClassificationRuleOutput;
}

/** Deletes a classification rule */
export interface ClassificationRulesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a classification rule */
export interface ClassificationRulesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** List classification rules in Account */
export interface ClassificationRulesListAll200Response extends HttpResponse {
  status: "200";
  body: ClassificationRuleListOutput;
}

/** List classification rules in Account */
export interface ClassificationRulesListAllDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Lists the rule versions of a classification rule */
export interface ClassificationRulesListVersionsByClassificationRuleName200Response
  extends HttpResponse {
  status: "200";
  body: ClassificationRuleListOutput;
}

/** Lists the rule versions of a classification rule */
export interface ClassificationRulesListVersionsByClassificationRuleNameDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Sets Classification Action on a specific classification rule version. */
export interface ClassificationRulesTagClassificationVersion202Response
  extends HttpResponse {
  status: "202";
  body: OperationResponseOutput;
}

/** Sets Classification Action on a specific classification rule version. */
export interface ClassificationRulesTagClassificationVersionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Creates or Updates a data source */
export interface DataSourcesCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: DataSourceOutput;
}

/** Creates or Updates a data source */
export interface DataSourcesCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: DataSourceOutput;
}

/** Creates or Updates a data source */
export interface DataSourcesCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Get a data source */
export interface DataSourcesGet200Response extends HttpResponse {
  status: "200";
  body: DataSourceOutput;
}

/** Get a data source */
export interface DataSourcesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Deletes a data source */
export interface DataSourcesDelete200Response extends HttpResponse {
  status: "200";
  body: DataSourceOutput;
}

/** Deletes a data source */
export interface DataSourcesDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a data source */
export interface DataSourcesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** List data sources in Data catalog */
export interface DataSourcesListAll200Response extends HttpResponse {
  status: "200";
  body: DataSourceListOutput;
}

/** List data sources in Data catalog */
export interface DataSourcesListAllDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Get a filter */
export interface FiltersGet200Response extends HttpResponse {
  status: "200";
  body: FilterOutput;
}

/** Get a filter */
export interface FiltersGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Creates or updates a filter */
export interface FiltersCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: FilterOutput;
}

/** Creates or updates a filter */
export interface FiltersCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: FilterOutput;
}

/** Creates or updates a filter */
export interface FiltersCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Creates an instance of a scan */
export interface ScansCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ScanOutput;
}

/** Creates an instance of a scan */
export interface ScansCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ScanOutput;
}

/** Creates an instance of a scan */
export interface ScansCreateOrUpdateDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Gets a scan information */
export interface ScansGet200Response extends HttpResponse {
  status: "200";
  body: ScanOutput;
}

/** Gets a scan information */
export interface ScansGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Deletes the scan associated with the data source */
export interface ScansDelete200Response extends HttpResponse {
  status: "200";
  body: ScanOutput;
}

/** Deletes the scan associated with the data source */
export interface ScansDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes the scan associated with the data source */
export interface ScansDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** List scans in data source */
export interface ScansListByDataSource200Response extends HttpResponse {
  status: "200";
  body: ScanListOutput;
}

/** List scans in data source */
export interface ScansListByDataSourceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Runs the scan */
export interface ScanResultRunScan202Response extends HttpResponse {
  status: "202";
  body: OperationResponseOutput;
}

/** Runs the scan */
export interface ScanResultRunScanDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Cancels a scan */
export interface ScanResultCancelScan202Response extends HttpResponse {
  status: "202";
  body: OperationResponseOutput;
}

/** Cancels a scan */
export interface ScanResultCancelScanDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Lists the scan history of a scan */
export interface ScanResultListScanHistory200Response extends HttpResponse {
  status: "200";
  body: ScanHistoryListOutput;
}

/** Lists the scan history of a scan */
export interface ScanResultListScanHistoryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Get a scan ruleset */
export interface ScanRulesetsGet200Response extends HttpResponse {
  status: "200";
  body: ScanRulesetOutput;
}

/** Get a scan ruleset */
export interface ScanRulesetsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Creates or Updates a scan ruleset */
export interface ScanRulesetsCreateOrUpdate200Response extends HttpResponse {
  status: "200";
  body: ScanRulesetOutput;
}

/** Creates or Updates a scan ruleset */
export interface ScanRulesetsCreateOrUpdate201Response extends HttpResponse {
  status: "201";
  body: ScanRulesetOutput;
}

/** Creates or Updates a scan ruleset */
export interface ScanRulesetsCreateOrUpdateDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Deletes a scan ruleset */
export interface ScanRulesetsDelete200Response extends HttpResponse {
  status: "200";
  body: ScanRulesetOutput;
}

/** Deletes a scan ruleset */
export interface ScanRulesetsDelete204Response extends HttpResponse {
  status: "204";
}

/** Deletes a scan ruleset */
export interface ScanRulesetsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** List scan rulesets in Data catalog */
export interface ScanRulesetsListAll200Response extends HttpResponse {
  status: "200";
  body: ScanRulesetListOutput;
}

/** List scan rulesets in Data catalog */
export interface ScanRulesetsListAllDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** List all system scan rulesets for an account */
export interface SystemScanRulesetsListAll200Response extends HttpResponse {
  status: "200";
  body: SystemScanRulesetListOutput;
}

/** List all system scan rulesets for an account */
export interface SystemScanRulesetsListAllDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Get a system scan ruleset for a data source */
export interface SystemScanRulesetsGet200Response extends HttpResponse {
  status: "200";
  body: SystemScanRulesetOutput;
}

/** Get a system scan ruleset for a data source */
export interface SystemScanRulesetsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Get a scan ruleset by version */
export interface SystemScanRulesetsGetByVersion200Response
  extends HttpResponse {
  status: "200";
  body: SystemScanRulesetOutput;
}

/** Get a scan ruleset by version */
export interface SystemScanRulesetsGetByVersionDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Get the latest version of a system scan ruleset */
export interface SystemScanRulesetsGetLatest200Response extends HttpResponse {
  status: "200";
  body: SystemScanRulesetOutput;
}

/** Get the latest version of a system scan ruleset */
export interface SystemScanRulesetsGetLatestDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** List system scan ruleset versions in Data catalog */
export interface SystemScanRulesetsListVersionsByDataSource200Response
  extends HttpResponse {
  status: "200";
  body: SystemScanRulesetListOutput;
}

/** List system scan ruleset versions in Data catalog */
export interface SystemScanRulesetsListVersionsByDataSourceDefaultResponse
  extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Gets trigger information */
export interface TriggersGetTrigger200Response extends HttpResponse {
  status: "200";
  body: TriggerOutput;
}

/** Gets trigger information */
export interface TriggersGetTriggerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Creates an instance of a trigger */
export interface TriggersCreateTrigger200Response extends HttpResponse {
  status: "200";
  body: TriggerOutput;
}

/** Creates an instance of a trigger */
export interface TriggersCreateTrigger201Response extends HttpResponse {
  status: "201";
  body: TriggerOutput;
}

/** Creates an instance of a trigger */
export interface TriggersCreateTriggerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

/** Deletes the trigger associated with the scan */
export interface TriggersDeleteTrigger200Response extends HttpResponse {
  status: "200";
  body: TriggerOutput;
}

/** Deletes the trigger associated with the scan */
export interface TriggersDeleteTrigger204Response extends HttpResponse {
  status: "204";
}

/** Deletes the trigger associated with the scan */
export interface TriggersDeleteTriggerDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}
