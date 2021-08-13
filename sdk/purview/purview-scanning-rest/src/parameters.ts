// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { RequestParameters } from "@azure-rest/core-client";
import {
  AzureKeyVault,
  ClassificationRule,
  DataSource,
  Filter,
  Scan,
  ScanRuleset,
  Trigger,
} from "./models";

export type KeyVaultConnectionsGetParameters = RequestParameters;

export interface KeyVaultConnectionsCreateBodyParam {
  body: AzureKeyVault;
}

export type KeyVaultConnectionsCreateParameters = KeyVaultConnectionsCreateBodyParam &
  RequestParameters;
export type KeyVaultConnectionsDeleteParameters = RequestParameters;
export type KeyVaultConnectionsListAllParameters = RequestParameters;
export type ClassificationRulesGetParameters = RequestParameters;

export interface ClassificationRulesCreateOrUpdateBodyParam {
  body?: ClassificationRule;
}

export type ClassificationRulesCreateOrUpdateParameters = ClassificationRulesCreateOrUpdateBodyParam &
  RequestParameters;
export type ClassificationRulesDeleteParameters = RequestParameters;
export type ClassificationRulesListAllParameters = RequestParameters;
export type ClassificationRulesListVersionsByClassificationRuleNameParameters = RequestParameters;

export interface ClassificationRulesTagClassificationVersionQueryParamProperties {
  action: "Keep" | "Delete";
}

export interface ClassificationRulesTagClassificationVersionQueryParam {
  queryParameters: ClassificationRulesTagClassificationVersionQueryParamProperties;
}

export type ClassificationRulesTagClassificationVersionParameters = ClassificationRulesTagClassificationVersionQueryParam &
  RequestParameters;

export interface DataSourcesCreateOrUpdateBodyParam {
  body?: DataSource;
}

export type DataSourcesCreateOrUpdateParameters = DataSourcesCreateOrUpdateBodyParam &
  RequestParameters;
export type DataSourcesGetParameters = RequestParameters;
export type DataSourcesDeleteParameters = RequestParameters;
export type DataSourcesListAllParameters = RequestParameters;
export type FiltersGetParameters = RequestParameters;

export interface FiltersCreateOrUpdateBodyParam {
  body?: Filter;
}

export type FiltersCreateOrUpdateParameters = FiltersCreateOrUpdateBodyParam & RequestParameters;

export interface ScansCreateOrUpdateBodyParam {
  body: Scan;
}

export type ScansCreateOrUpdateParameters = ScansCreateOrUpdateBodyParam & RequestParameters;
export type ScansGetParameters = RequestParameters;
export type ScansDeleteParameters = RequestParameters;
export type ScansListByDataSourceParameters = RequestParameters;

export interface ScanResultRunScanQueryParamProperties {
  scanLevel?: "Full" | "Incremental";
}

export interface ScanResultRunScanQueryParam {
  queryParameters?: ScanResultRunScanQueryParamProperties;
}

export type ScanResultRunScanParameters = ScanResultRunScanQueryParam & RequestParameters;
export type ScanResultCancelScanParameters = RequestParameters;
export type ScanResultListScanHistoryParameters = RequestParameters;
export type ScanRulesetsGetParameters = RequestParameters;

export interface ScanRulesetsCreateOrUpdateBodyParam {
  body?: ScanRuleset;
}

export type ScanRulesetsCreateOrUpdateParameters = ScanRulesetsCreateOrUpdateBodyParam &
  RequestParameters;
export type ScanRulesetsDeleteParameters = RequestParameters;
export type ScanRulesetsListAllParameters = RequestParameters;
export type SystemScanRulesetsListAllParameters = RequestParameters;
export type SystemScanRulesetsGetParameters = RequestParameters;

export interface SystemScanRulesetsGetByVersionQueryParamProperties {
  dataSourceType?:
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
    | "PowerBI";
}

export interface SystemScanRulesetsGetByVersionQueryParam {
  queryParameters?: SystemScanRulesetsGetByVersionQueryParamProperties;
}

export type SystemScanRulesetsGetByVersionParameters = SystemScanRulesetsGetByVersionQueryParam &
  RequestParameters;

export interface SystemScanRulesetsGetLatestQueryParamProperties {
  dataSourceType?:
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
    | "PowerBI";
}

export interface SystemScanRulesetsGetLatestQueryParam {
  queryParameters?: SystemScanRulesetsGetLatestQueryParamProperties;
}

export type SystemScanRulesetsGetLatestParameters = SystemScanRulesetsGetLatestQueryParam &
  RequestParameters;

export interface SystemScanRulesetsListVersionsByDataSourceQueryParamProperties {
  dataSourceType?:
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
    | "PowerBI";
}

export interface SystemScanRulesetsListVersionsByDataSourceQueryParam {
  queryParameters?: SystemScanRulesetsListVersionsByDataSourceQueryParamProperties;
}

export type SystemScanRulesetsListVersionsByDataSourceParameters = SystemScanRulesetsListVersionsByDataSourceQueryParam &
  RequestParameters;
export type TriggersGetTriggerParameters = RequestParameters;

export interface TriggersCreateTriggerBodyParam {
  body: Trigger;
}

export type TriggersCreateTriggerParameters = TriggersCreateTriggerBodyParam & RequestParameters;
export type TriggersDeleteTriggerParameters = RequestParameters;
