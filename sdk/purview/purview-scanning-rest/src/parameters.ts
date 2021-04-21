// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AzureKeyVault,
  ClassificationRule,
  ClassificationAction,
  DataSource,
  Filter,
  Scan,
  ScanLevelType,
  ScanRuleset,
  DataSourceType,
  Trigger,
} from "./models";

export type AzureKeyVaultsGetAzureKeyVaultParameters = RequestParameters;

export interface AzureKeyVaultsCreateAzureKeyVaultBodyParam {
  body: AzureKeyVault;
}

export type AzureKeyVaultsCreateAzureKeyVaultParameters = RequestParameters &
  AzureKeyVaultsCreateAzureKeyVaultBodyParam;
export type AzureKeyVaultsDeleteAzureKeyVaultParameters = RequestParameters;
export type AzureKeyVaultsListByAccountParameters = RequestParameters;
export type ClassificationRulesGetParameters = RequestParameters;

export interface ClassificationRulesCreateOrUpdateBodyParam {
  body?: ClassificationRule;
}

export type ClassificationRulesCreateOrUpdateParameters = RequestParameters &
  ClassificationRulesCreateOrUpdateBodyParam;
export type ClassificationRulesDeleteParameters = RequestParameters;
export type ClassificationRulesListAllParameters = RequestParameters;
export type ClassificationRulesListVersionsByClassificationRuleNameParameters = RequestParameters;

export interface ClassificationRulesTagClassificationVersionQueryParamProperties {
  action: ClassificationAction;
}

export interface ClassificationRulesTagClassificationVersionQueryParam {
  queryParameters: ClassificationRulesTagClassificationVersionQueryParamProperties;
}

export type ClassificationRulesTagClassificationVersionParameters = RequestParameters &
  ClassificationRulesTagClassificationVersionQueryParam;

export interface DataSourcesCreateOrUpdateBodyParam {
  body?: DataSource;
}

export type DataSourcesCreateOrUpdateParameters = RequestParameters &
  DataSourcesCreateOrUpdateBodyParam;
export type DataSourcesGetParameters = RequestParameters;
export type DataSourcesDeleteParameters = RequestParameters;
export type DataSourcesListByAccountParameters = RequestParameters;
export type DataSourcesListChildrenByCollectionParameters = RequestParameters;
export type DataSourceListUnparentedDataSourcesByAccountParameters = RequestParameters;
export type FiltersGetParameters = RequestParameters;

export interface FiltersCreateOrUpdateBodyParam {
  body?: Filter;
}

export type FiltersCreateOrUpdateParameters = RequestParameters & FiltersCreateOrUpdateBodyParam;

export interface ScansCreateOrUpdateBodyParam {
  body: Scan;
}

export type ScansCreateOrUpdateParameters = RequestParameters & ScansCreateOrUpdateBodyParam;
export type ScansGetParameters = RequestParameters;
export type ScansDeleteParameters = RequestParameters;
export type ScansListByDataSourceParameters = RequestParameters;

export interface ScansRunScanQueryParamProperties {
  scanLevel?: ScanLevelType;
}

export interface ScansRunScanQueryParam {
  queryParameters?: ScansRunScanQueryParamProperties;
}

export type ScansRunScanParameters = RequestParameters & ScansRunScanQueryParam;
export type ScansCancelScanParameters = RequestParameters;
export type ScansListScanHistoryParameters = RequestParameters;
export type ScanRulesetsGetParameters = RequestParameters;

export interface ScanRulesetsCreateOrUpdateBodyParam {
  body?: ScanRuleset;
}

export type ScanRulesetsCreateOrUpdateParameters = RequestParameters &
  ScanRulesetsCreateOrUpdateBodyParam;
export type ScanRulesetsDeleteParameters = RequestParameters;
export type ScanRulesetsListAllParameters = RequestParameters;
export type SystemScanRulesetsListAllParameters = RequestParameters;
export type SystemScanRulesetsGetParameters = RequestParameters;

export interface SystemScanRulesetsGetByVersionQueryParamProperties {
  dataSourceType?: DataSourceType;
}

export interface SystemScanRulesetsGetByVersionQueryParam {
  queryParameters?: SystemScanRulesetsGetByVersionQueryParamProperties;
}

export type SystemScanRulesetsGetByVersionParameters = RequestParameters &
  SystemScanRulesetsGetByVersionQueryParam;

export interface SystemScanRulesetsGetLatestQueryParamProperties {
  dataSourceType?: DataSourceType;
}

export interface SystemScanRulesetsGetLatestQueryParam {
  queryParameters?: SystemScanRulesetsGetLatestQueryParamProperties;
}

export type SystemScanRulesetsGetLatestParameters = RequestParameters &
  SystemScanRulesetsGetLatestQueryParam;

export interface SystemScanRulesetsListVersionsByDataSourceQueryParamProperties {
  dataSourceType?: DataSourceType;
}

export interface SystemScanRulesetsListVersionsByDataSourceQueryParam {
  queryParameters?: SystemScanRulesetsListVersionsByDataSourceQueryParamProperties;
}

export type SystemScanRulesetsListVersionsByDataSourceParameters = RequestParameters &
  SystemScanRulesetsListVersionsByDataSourceQueryParam;
export type TriggersGetTriggerParameters = RequestParameters;

export interface TriggersCreateTriggerBodyParam {
  body: Trigger;
}

export type TriggersCreateTriggerParameters = RequestParameters & TriggersCreateTriggerBodyParam;
export type TriggersDeleteTriggerParameters = RequestParameters;
