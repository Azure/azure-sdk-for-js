// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AzureKeyVault,
  ClassificationRule,
  ClassificationRuleVersionAction,
  DataSource,
  Filter,
  ScanRunProperties,
  CancelScanRequest,
  Scan,
  ScanRuleset,
  Enum12,
  Enum13,
  Enum14,
  SystemScanRulesetSetting,
  Trigger,
} from "./models";

export type AzureKeyVaultsHeadParameters = RequestParameters;
export type AzureKeyVaultsGetAzureKeyVaultParameters = RequestParameters;

export interface AzureKeyVaultsCreateAzureKeyVaultBodyParam {
  body: AzureKeyVault;
}

export type AzureKeyVaultsCreateAzureKeyVaultParameters = RequestParameters &
  AzureKeyVaultsCreateAzureKeyVaultBodyParam;
export type AzureKeyVaultsDeleteAzureKeyVaultParameters = RequestParameters;

export interface AzureKeyVaultsListByAccountQueryParamProperties {
  $skipToken?: string;
}

export interface AzureKeyVaultsListByAccountQueryParam {
  queryParameters?: AzureKeyVaultsListByAccountQueryParamProperties;
}

export type AzureKeyVaultsListByAccountParameters = RequestParameters &
  AzureKeyVaultsListByAccountQueryParam;

export interface BloomFilterCookQueryParamProperties {
  lineCount: number;
  sourceFileName: string;
}

export interface BloomFilterCookQueryParam {
  queryParameters: BloomFilterCookQueryParamProperties;
}

export interface BloomFilterCookBodyParam {
  body: string;
}

export type BloomFilterCookParameters = RequestParameters &
  BloomFilterCookQueryParam &
  BloomFilterCookBodyParam;
export type ClassificationRulesHeadParameters = RequestParameters;
export type ClassificationRulesGetParameters = RequestParameters;

export interface ClassificationRulesCreateOrUpdateBodyParam {
  body?: ClassificationRule;
}

export type ClassificationRulesCreateOrUpdateParameters = RequestParameters &
  ClassificationRulesCreateOrUpdateBodyParam;
export type ClassificationRulesDeleteParameters = RequestParameters;

export interface ClassificationRulesListAllQueryParamProperties {
  $skipToken?: string;
}

export interface ClassificationRulesListAllQueryParam {
  queryParameters?: ClassificationRulesListAllQueryParamProperties;
}

export type ClassificationRulesListAllParameters = RequestParameters &
  ClassificationRulesListAllQueryParam;

export interface ClassificationRulesListVersionsByClassificationRuleNameQueryParamProperties {
  $skipToken?: string;
}

export interface ClassificationRulesListVersionsByClassificationRuleNameQueryParam {
  queryParameters?: ClassificationRulesListVersionsByClassificationRuleNameQueryParamProperties;
}

export type ClassificationRulesListVersionsByClassificationRuleNameParameters = RequestParameters &
  ClassificationRulesListVersionsByClassificationRuleNameQueryParam;

export interface ClassificationRulesSetClassificationActionForVersionBodyParam {
  body: ClassificationRuleVersionAction;
}

export type ClassificationRulesSetClassificationActionForVersionParameters = RequestParameters &
  ClassificationRulesSetClassificationActionForVersionBodyParam;

export interface DataSourcesCreateOrUpdateBodyParam {
  body?: DataSource;
}

export type DataSourcesCreateOrUpdateParameters = RequestParameters &
  DataSourcesCreateOrUpdateBodyParam;
export type DataSourcesHeadParameters = RequestParameters;
export type DataSourcesGetParameters = RequestParameters;
export type DataSourcesDeleteParameters = RequestParameters;

export interface DataSourcesListByAccountQueryParamProperties {
  $skipToken?: string;
  $scope?: string;
}

export interface DataSourcesListByAccountQueryParam {
  queryParameters?: DataSourcesListByAccountQueryParamProperties;
}

export type DataSourcesListByAccountParameters = RequestParameters &
  DataSourcesListByAccountQueryParam;

export interface DataSourcesListChildrenByCollectionQueryParamProperties {
  $skipToken?: string;
}

export interface DataSourcesListChildrenByCollectionQueryParam {
  queryParameters?: DataSourcesListChildrenByCollectionQueryParamProperties;
}

export type DataSourcesListChildrenByCollectionParameters = RequestParameters &
  DataSourcesListChildrenByCollectionQueryParam;

export interface DataSourceListUnparentedDataSourcesByAccountQueryParamProperties {
  $skipToken?: string;
}

export interface DataSourceListUnparentedDataSourcesByAccountQueryParam {
  queryParameters?: DataSourceListUnparentedDataSourcesByAccountQueryParamProperties;
}

export type DataSourceListUnparentedDataSourcesByAccountParameters = RequestParameters &
  DataSourceListUnparentedDataSourcesByAccountQueryParam;
export type FiltersHeadParameters = RequestParameters;
export type FiltersGetParameters = RequestParameters;

export interface FiltersCreateOrUpdateBodyParam {
  body?: Filter;
}

export type FiltersCreateOrUpdateParameters = RequestParameters & FiltersCreateOrUpdateBodyParam;
export type FiltersDeleteParameters = RequestParameters;

export interface FiltersListByScanQueryParamProperties {
  $skipToken?: string;
}

export interface FiltersListByScanQueryParam {
  queryParameters?: FiltersListByScanQueryParamProperties;
}

export type FiltersListByScanParameters = RequestParameters & FiltersListByScanQueryParam;

export interface ScansRunBodyParam {
  body?: ScanRunProperties;
}

export type ScansRunParameters = RequestParameters & ScansRunBodyParam;

export interface ScansCancelBodyParam {
  body: CancelScanRequest;
}

export type ScansCancelParameters = RequestParameters & ScansCancelBodyParam;

export interface ScansListHistoryQueryParamProperties {
  $skipToken?: string;
}

export interface ScansListHistoryQueryParam {
  queryParameters?: ScansListHistoryQueryParamProperties;
}

export type ScansListHistoryParameters = RequestParameters & ScansListHistoryQueryParam;

export interface ScansListHistoryPostQueryParamProperties {
  $skipToken?: string;
}

export interface ScansListHistoryPostQueryParam {
  queryParameters?: ScansListHistoryPostQueryParamProperties;
}

export type ScansListHistoryPostParameters = RequestParameters & ScansListHistoryPostQueryParam;

export interface ScansCreateOrUpdateBodyParam {
  body: Scan;
}

export type ScansCreateOrUpdateParameters = RequestParameters & ScansCreateOrUpdateBodyParam;
export type ScansHeadParameters = RequestParameters;
export type ScansGetParameters = RequestParameters;
export type ScansDeleteParameters = RequestParameters;

export interface ScansListByDataSourceQueryParamProperties {
  $skipToken?: string;
  $scope?: string;
}

export interface ScansListByDataSourceQueryParam {
  queryParameters?: ScansListByDataSourceQueryParamProperties;
}

export type ScansListByDataSourceParameters = RequestParameters & ScansListByDataSourceQueryParam;
export type ScanRulesetsHeadParameters = RequestParameters;
export type ScanRulesetsGetParameters = RequestParameters;

export interface ScanRulesetsCreateOrUpdateBodyParam {
  body?: ScanRuleset;
}

export type ScanRulesetsCreateOrUpdateParameters = RequestParameters &
  ScanRulesetsCreateOrUpdateBodyParam;
export type ScanRulesetsDeleteParameters = RequestParameters;

export interface ScanRulesetsListAllQueryParamProperties {
  $skipToken?: string;
}

export interface ScanRulesetsListAllQueryParam {
  queryParameters?: ScanRulesetsListAllQueryParamProperties;
}

export type ScanRulesetsListAllParameters = RequestParameters & ScanRulesetsListAllQueryParam;

export interface SystemScanRulesetsListAllQueryParamProperties {
  $skipToken?: string;
}

export interface SystemScanRulesetsListAllQueryParam {
  queryParameters?: SystemScanRulesetsListAllQueryParamProperties;
}

export type SystemScanRulesetsListAllParameters = RequestParameters &
  SystemScanRulesetsListAllQueryParam;
export type SystemScanRulesetsGetParameters = RequestParameters;

export interface SystemScanRulesetsGetByVersionQueryParamProperties {
  dataSourceType?: Enum12;
}

export interface SystemScanRulesetsGetByVersionQueryParam {
  queryParameters?: SystemScanRulesetsGetByVersionQueryParamProperties;
}

export type SystemScanRulesetsGetByVersionParameters = RequestParameters &
  SystemScanRulesetsGetByVersionQueryParam;

export interface SystemScanRulesetsGetLatestQueryParamProperties {
  dataSourceType?: Enum13;
}

export interface SystemScanRulesetsGetLatestQueryParam {
  queryParameters?: SystemScanRulesetsGetLatestQueryParamProperties;
}

export type SystemScanRulesetsGetLatestParameters = RequestParameters &
  SystemScanRulesetsGetLatestQueryParam;

export interface SystemScanRulesetsListVersionsByDataSourceQueryParamProperties {
  dataSourceType?: Enum14;
  $skipToken?: string;
}

export interface SystemScanRulesetsListVersionsByDataSourceQueryParam {
  queryParameters?: SystemScanRulesetsListVersionsByDataSourceQueryParamProperties;
}

export type SystemScanRulesetsListVersionsByDataSourceParameters = RequestParameters &
  SystemScanRulesetsListVersionsByDataSourceQueryParam;
export type SystemScanRulesetSettingsGetParameters = RequestParameters;

export interface SystemScanRulesetSettingsListAllQueryParamProperties {
  $skipToken?: string;
}

export interface SystemScanRulesetSettingsListAllQueryParam {
  queryParameters?: SystemScanRulesetSettingsListAllQueryParamProperties;
}

export type SystemScanRulesetSettingsListAllParameters = RequestParameters &
  SystemScanRulesetSettingsListAllQueryParam;

export interface SystemScanRulesetSettingsCreateOrUpdateBodyParam {
  body?: SystemScanRulesetSetting;
}

export type SystemScanRulesetSettingsCreateOrUpdateParameters = RequestParameters &
  SystemScanRulesetSettingsCreateOrUpdateBodyParam;
export type TriggersHeadParameters = RequestParameters;
export type TriggersGetTriggerParameters = RequestParameters;

export interface TriggersCreateTriggerBodyParam {
  body: Trigger;
}

export type TriggersCreateTriggerParameters = RequestParameters & TriggersCreateTriggerBodyParam;
export type TriggersDeleteTriggerParameters = RequestParameters;

export interface TriggersListByScanQueryParamProperties {
  $skipToken?: string;
}

export interface TriggersListByScanQueryParam {
  queryParameters?: TriggersListByScanQueryParamProperties;
}

export type TriggersListByScanParameters = RequestParameters & TriggersListByScanQueryParam;
