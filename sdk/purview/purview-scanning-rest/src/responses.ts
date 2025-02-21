// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RawHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpResponse } from "@azure-rest/core-client";
import type {
  AzureKeyVaultOutput,
  ErrorResponseModelOutput,
  AzureKeyVaultListOutput,
  ClassificationRuleOutput,
  ClassificationRuleListOutput,
  OperationResponseOutput,
  CredentialOutput,
  CredentialListOutput,
  DataSourceOutput,
  DataSourceListOutput,
  FilterOutput,
  IntegrationRuntimeListOutput,
  IntegrationRuntimeOutput,
  IntegrationRuntimeStatusOutput,
  IntegrationRuntimeAuthKeysOutput,
  ManagedVirtualNetworkListOutput,
  ManagedVirtualNetworkOutput,
  ManagedPrivateEndpointListOutput,
  ManagedPrivateEndpointOutput,
  ScanOutput,
  ScanListOutput,
  ScanResultWithIngestionOutput,
  ScanHistoryListWithIngestionOutput,
  ScanRulesetOutput,
  ScanRulesetListOutput,
  SystemScanRulesetListOutput,
  SystemScanRulesetOutput,
  TriggerOutput,
} from "./outputModels.js";

/** Gets an Azure Key Vault connection. */
export interface KeyVaultConnectionsGet200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVaultOutput;
}

export interface KeyVaultConnectionsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets an Azure Key Vault connection. */
export interface KeyVaultConnectionsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & KeyVaultConnectionsGetDefaultHeaders;
}

/** Creates or replaces a connection to Azure Key Vault. */
export interface KeyVaultConnectionsCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVaultOutput;
}

/** Creates or replaces a connection to Azure Key Vault. */
export interface KeyVaultConnectionsCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: AzureKeyVaultOutput;
}

export interface KeyVaultConnectionsCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Creates or replaces a connection to Azure Key Vault. */
export interface KeyVaultConnectionsCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & KeyVaultConnectionsCreateOrReplaceDefaultHeaders;
}

/** Deletes an Azure Key Vault connection associated with the account. */
export interface KeyVaultConnectionsDelete204Response extends HttpResponse {
  status: "204";
}

export interface KeyVaultConnectionsDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Deletes an Azure Key Vault connection associated with the account. */
export interface KeyVaultConnectionsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & KeyVaultConnectionsDeleteDefaultHeaders;
}

/** Lists Azure Key Vaults in an account. */
export interface KeyVaultConnectionsList200Response extends HttpResponse {
  status: "200";
  body: AzureKeyVaultListOutput;
}

export interface KeyVaultConnectionsListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Lists Azure Key Vaults in an account. */
export interface KeyVaultConnectionsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & KeyVaultConnectionsListDefaultHeaders;
}

/** Gets a classification rule. */
export interface ClassificationRulesGet200Response extends HttpResponse {
  status: "200";
  body: ClassificationRuleOutput;
}

export interface ClassificationRulesGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets a classification rule. */
export interface ClassificationRulesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ClassificationRulesGetDefaultHeaders;
}

/** Creates or replaces a classification rule. */
export interface ClassificationRulesCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: ClassificationRuleOutput;
}

/** Creates or replaces a classification rule. */
export interface ClassificationRulesCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: ClassificationRuleOutput;
}

export interface ClassificationRulesCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Creates or replaces a classification rule. */
export interface ClassificationRulesCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ClassificationRulesCreateOrReplaceDefaultHeaders;
}

/** Deletes a classification rule. */
export interface ClassificationRulesDelete204Response extends HttpResponse {
  status: "204";
}

export interface ClassificationRulesDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Deletes a classification rule. */
export interface ClassificationRulesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ClassificationRulesDeleteDefaultHeaders;
}

/** Lists classification rules in Account. */
export interface ClassificationRulesList200Response extends HttpResponse {
  status: "200";
  body: ClassificationRuleListOutput;
}

export interface ClassificationRulesListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Lists classification rules in Account. */
export interface ClassificationRulesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ClassificationRulesListDefaultHeaders;
}

/** Lists the rule versions of a classification rule. */
export interface ClassificationRulesListVersionsByRuleName200Response extends HttpResponse {
  status: "200";
  body: ClassificationRuleListOutput;
}

export interface ClassificationRulesListVersionsByRuleNameDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Lists the rule versions of a classification rule. */
export interface ClassificationRulesListVersionsByRuleNameDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ClassificationRulesListVersionsByRuleNameDefaultHeaders;
}

export interface ClassificationRulesTagClassificationVersion202Headers {
  /** Response header for long running operation. */
  "operation-location"?: string;
}

/** Sets classification action on a specific classification rule version. */
export interface ClassificationRulesTagClassificationVersion202Response extends HttpResponse {
  status: "202";
  body: OperationResponseOutput;
  headers: RawHttpHeaders & ClassificationRulesTagClassificationVersion202Headers;
}

export interface ClassificationRulesTagClassificationVersionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Sets classification action on a specific classification rule version. */
export interface ClassificationRulesTagClassificationVersionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ClassificationRulesTagClassificationVersionDefaultHeaders;
}

/** Gets credential information. */
export interface CredentialGet200Response extends HttpResponse {
  status: "200";
  body: CredentialOutput;
}

export interface CredentialGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets credential information. */
export interface CredentialGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & CredentialGetDefaultHeaders;
}

/** Creates or replaces an instance of a credential. */
export interface CredentialCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: CredentialOutput;
}

/** Creates or replaces an instance of a credential. */
export interface CredentialCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: CredentialOutput;
}

export interface CredentialCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Creates or replaces an instance of a credential. */
export interface CredentialCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & CredentialCreateOrReplaceDefaultHeaders;
}

/** Deletes a credential associated with the account. */
export interface CredentialDelete204Response extends HttpResponse {
  status: "204";
}

export interface CredentialDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Deletes a credential associated with the account. */
export interface CredentialDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & CredentialDeleteDefaultHeaders;
}

/** Lists credentials in account. */
export interface CredentialList200Response extends HttpResponse {
  status: "200";
  body: CredentialListOutput;
}

export interface CredentialListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Lists credentials in account. */
export interface CredentialListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & CredentialListDefaultHeaders;
}

/** Creates or replaces a data source. */
export interface DataSourcesCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: DataSourceOutput;
}

/** Creates or replaces a data source. */
export interface DataSourcesCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: DataSourceOutput;
}

export interface DataSourcesCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Creates or replaces a data source. */
export interface DataSourcesCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & DataSourcesCreateOrReplaceDefaultHeaders;
}

/** Gets a data source. */
export interface DataSourcesGet200Response extends HttpResponse {
  status: "200";
  body: DataSourceOutput;
}

export interface DataSourcesGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets a data source. */
export interface DataSourcesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & DataSourcesGetDefaultHeaders;
}

/** Deletes a data source. */
export interface DataSourcesDelete204Response extends HttpResponse {
  status: "204";
}

export interface DataSourcesDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Deletes a data source. */
export interface DataSourcesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & DataSourcesDeleteDefaultHeaders;
}

/** Lists data sources in Data catalog. */
export interface DataSourcesList200Response extends HttpResponse {
  status: "200";
  body: DataSourceListOutput;
}

export interface DataSourcesListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Lists data sources in Data catalog. */
export interface DataSourcesListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & DataSourcesListDefaultHeaders;
}

/** Gets a filter. */
export interface FiltersGet200Response extends HttpResponse {
  status: "200";
  body: FilterOutput;
}

export interface FiltersGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets a filter. */
export interface FiltersGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & FiltersGetDefaultHeaders;
}

/** Creates or replaces a filter. */
export interface FiltersCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: FilterOutput;
}

/** Creates or replaces a filter. */
export interface FiltersCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: FilterOutput;
}

export interface FiltersCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Creates or replaces a filter. */
export interface FiltersCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & FiltersCreateOrReplaceDefaultHeaders;
}

/** Lists integration runtimes in an account. */
export interface IntegrationRuntimesListByAccount200Response extends HttpResponse {
  status: "200";
  body: IntegrationRuntimeListOutput;
}

export interface IntegrationRuntimesListByAccountDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Lists integration runtimes in an account. */
export interface IntegrationRuntimesListByAccountDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & IntegrationRuntimesListByAccountDefaultHeaders;
}

/** Gets an integration runtime. */
export interface IntegrationRuntimesGet200Response extends HttpResponse {
  status: "200";
  body: IntegrationRuntimeOutput;
}

export interface IntegrationRuntimesGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets an integration runtime. */
export interface IntegrationRuntimesGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & IntegrationRuntimesGetDefaultHeaders;
}

/** Deletes an integration runtime. */
export interface IntegrationRuntimesDelete204Response extends HttpResponse {
  status: "204";
}

export interface IntegrationRuntimesDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Deletes an integration runtime. */
export interface IntegrationRuntimesDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & IntegrationRuntimesDeleteDefaultHeaders;
}

/** Creates or replaces an instance of integration runtime. */
export interface IntegrationRuntimesCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: IntegrationRuntimeOutput;
}

/** Creates or replaces an instance of integration runtime. */
export interface IntegrationRuntimesCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: IntegrationRuntimeOutput;
}

export interface IntegrationRuntimesCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Creates or replaces an instance of integration runtime. */
export interface IntegrationRuntimesCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & IntegrationRuntimesCreateOrReplaceDefaultHeaders;
}

/** Gets detailed status information for an integration runtime. */
export interface IntegrationRuntimesStatus200Response extends HttpResponse {
  status: "200";
  body: IntegrationRuntimeStatusOutput;
}

export interface IntegrationRuntimesStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets detailed status information for an integration runtime. */
export interface IntegrationRuntimesStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & IntegrationRuntimesStatusDefaultHeaders;
}

/** Retrieves the authentication keys for an integration runtime. */
export interface IntegrationRuntimesListAuthKeys200Response extends HttpResponse {
  status: "200";
  body: IntegrationRuntimeAuthKeysOutput;
}

export interface IntegrationRuntimesListAuthKeysDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Retrieves the authentication keys for an integration runtime. */
export interface IntegrationRuntimesListAuthKeysDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & IntegrationRuntimesListAuthKeysDefaultHeaders;
}

/** Regenerates the authentication key for an integration runtime. */
export interface IntegrationRuntimesRegenerateAuthKey200Response extends HttpResponse {
  status: "200";
  body: IntegrationRuntimeAuthKeysOutput;
}

export interface IntegrationRuntimesRegenerateAuthKeyDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Regenerates the authentication key for an integration runtime. */
export interface IntegrationRuntimesRegenerateAuthKeyDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & IntegrationRuntimesRegenerateAuthKeyDefaultHeaders;
}

export interface IntegrationRuntimesDisableInteractiveQuery202Headers {
  /** Response header for long running operation. */
  "operation-location"?: string;
}

/** Disables interactive querying. */
export interface IntegrationRuntimesDisableInteractiveQuery202Response extends HttpResponse {
  status: "202";
  body: OperationResponseOutput;
  headers: RawHttpHeaders & IntegrationRuntimesDisableInteractiveQuery202Headers;
}

export interface IntegrationRuntimesDisableInteractiveQueryDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Disables interactive querying. */
export interface IntegrationRuntimesDisableInteractiveQueryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & IntegrationRuntimesDisableInteractiveQueryDefaultHeaders;
}

export interface IntegrationRuntimesEnableInteractiveQuery202Headers {
  /** Response header for long running operation. */
  "operation-location"?: string;
}

/** Enables interactive querying. */
export interface IntegrationRuntimesEnableInteractiveQuery202Response extends HttpResponse {
  status: "202";
  body: OperationResponseOutput;
  headers: RawHttpHeaders & IntegrationRuntimesEnableInteractiveQuery202Headers;
}

export interface IntegrationRuntimesEnableInteractiveQueryDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Enables interactive querying. */
export interface IntegrationRuntimesEnableInteractiveQueryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & IntegrationRuntimesEnableInteractiveQueryDefaultHeaders;
}

/** Lists managed virtual networks in an account. */
export interface ManagedVirtualNetworksListByAccount200Response extends HttpResponse {
  status: "200";
  body: ManagedVirtualNetworkListOutput;
}

export interface ManagedVirtualNetworksListByAccountDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Lists managed virtual networks in an account. */
export interface ManagedVirtualNetworksListByAccountDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ManagedVirtualNetworksListByAccountDefaultHeaders;
}

/** Gets a managed virtual network. */
export interface ManagedVirtualNetworksGet200Response extends HttpResponse {
  status: "200";
  body: ManagedVirtualNetworkOutput;
}

export interface ManagedVirtualNetworksGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets a managed virtual network. */
export interface ManagedVirtualNetworksGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ManagedVirtualNetworksGetDefaultHeaders;
}

/** Creates or replaces a managed virtual network. */
export interface ManagedVirtualNetworksCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: ManagedVirtualNetworkOutput;
}

/** Creates or replaces a managed virtual network. */
export interface ManagedVirtualNetworksCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: ManagedVirtualNetworkOutput;
}

export interface ManagedVirtualNetworksCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Creates or replaces a managed virtual network. */
export interface ManagedVirtualNetworksCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ManagedVirtualNetworksCreateOrReplaceDefaultHeaders;
}

/** Lists managed private endpoints under a managed virtual network. */
export interface ManagedPrivateEndpointsListByAccount200Response extends HttpResponse {
  status: "200";
  body: ManagedPrivateEndpointListOutput;
}

export interface ManagedPrivateEndpointsListByAccountDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Lists managed private endpoints under a managed virtual network. */
export interface ManagedPrivateEndpointsListByAccountDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ManagedPrivateEndpointsListByAccountDefaultHeaders;
}

/** Gets a managed private endpoint. */
export interface ManagedPrivateEndpointsGet200Response extends HttpResponse {
  status: "200";
  body: ManagedPrivateEndpointOutput;
}

export interface ManagedPrivateEndpointsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets a managed private endpoint. */
export interface ManagedPrivateEndpointsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ManagedPrivateEndpointsGetDefaultHeaders;
}

/** Deletes a managed private endpoint. */
export interface ManagedPrivateEndpointsDelete204Response extends HttpResponse {
  status: "204";
}

export interface ManagedPrivateEndpointsDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Deletes a managed private endpoint. */
export interface ManagedPrivateEndpointsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ManagedPrivateEndpointsDeleteDefaultHeaders;
}

/** Creates or replaces a managed private endpoint. */
export interface ManagedPrivateEndpointsCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: ManagedPrivateEndpointOutput;
}

/** Creates or replaces a managed private endpoint. */
export interface ManagedPrivateEndpointsCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: ManagedPrivateEndpointOutput;
}

export interface ManagedPrivateEndpointsCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Creates or replaces a managed private endpoint. */
export interface ManagedPrivateEndpointsCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ManagedPrivateEndpointsCreateOrReplaceDefaultHeaders;
}

/** Creates or replaces an instance of a scan. */
export interface ScansCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: ScanOutput;
}

/** Creates or replaces an instance of a scan. */
export interface ScansCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: ScanOutput;
}

export interface ScansCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Creates or replaces an instance of a scan. */
export interface ScansCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ScansCreateOrReplaceDefaultHeaders;
}

/** Gets a scan information. */
export interface ScansGet200Response extends HttpResponse {
  status: "200";
  body: ScanOutput;
}

export interface ScansGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets a scan information. */
export interface ScansGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ScansGetDefaultHeaders;
}

/** Deletes the scan associated with the data source. */
export interface ScansDelete204Response extends HttpResponse {
  status: "204";
}

export interface ScansDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Deletes the scan associated with the data source. */
export interface ScansDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ScansDeleteDefaultHeaders;
}

/** Lists scans in data source. */
export interface ScansListByDataSource200Response extends HttpResponse {
  status: "200";
  body: ScanListOutput;
}

export interface ScansListByDataSourceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Lists scans in data source. */
export interface ScansListByDataSourceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ScansListByDataSourceDefaultHeaders;
}

/** Gets the status of the scan run with ingestion details. */
export interface ScanResultGetScanStatus200Response extends HttpResponse {
  status: "200";
  body: ScanResultWithIngestionOutput;
}

export interface ScanResultGetScanStatusDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets the status of the scan run with ingestion details. */
export interface ScanResultGetScanStatusDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ScanResultGetScanStatusDefaultHeaders;
}

export interface ScanResultRunScan202Headers {
  /** Response header for long running operation. */
  "operation-location"?: string;
}

/** Runs the scan */
export interface ScanResultRunScan202Response extends HttpResponse {
  status: "202";
  body: ScanResultWithIngestionOutput;
  headers: RawHttpHeaders & ScanResultRunScan202Headers;
}

/** Runs the scan */
export interface ScanResultRunScanDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
}

export interface ScanResultCancelScan202Headers {
  /** Response header for long running operation. */
  "operation-location"?: string;
}

/** Cancels a scan. */
export interface ScanResultCancelScan202Response extends HttpResponse {
  status: "202";
  body: OperationResponseOutput;
  headers: RawHttpHeaders & ScanResultCancelScan202Headers;
}

export interface ScanResultCancelScanDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Cancels a scan. */
export interface ScanResultCancelScanDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ScanResultCancelScanDefaultHeaders;
}

/** Lists the scan history of a scan. */
export interface ScanResultListScanHistory200Response extends HttpResponse {
  status: "200";
  body: ScanHistoryListWithIngestionOutput;
}

export interface ScanResultListScanHistoryDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Lists the scan history of a scan. */
export interface ScanResultListScanHistoryDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ScanResultListScanHistoryDefaultHeaders;
}

/** Gets a scan ruleset. */
export interface ScanRulesetsGet200Response extends HttpResponse {
  status: "200";
  body: ScanRulesetOutput;
}

export interface ScanRulesetsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets a scan ruleset. */
export interface ScanRulesetsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ScanRulesetsGetDefaultHeaders;
}

/** Creates or replaces a scan ruleset. */
export interface ScanRulesetsCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: ScanRulesetOutput;
}

/** Creates or replaces a scan ruleset. */
export interface ScanRulesetsCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: ScanRulesetOutput;
}

export interface ScanRulesetsCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Creates or replaces a scan ruleset. */
export interface ScanRulesetsCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ScanRulesetsCreateOrReplaceDefaultHeaders;
}

/** Deletes a scan ruleset. */
export interface ScanRulesetsDelete204Response extends HttpResponse {
  status: "204";
}

export interface ScanRulesetsDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Deletes a scan ruleset. */
export interface ScanRulesetsDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ScanRulesetsDeleteDefaultHeaders;
}

/** Lists scan rulesets in data catalog. */
export interface ScanRulesetsList200Response extends HttpResponse {
  status: "200";
  body: ScanRulesetListOutput;
}

export interface ScanRulesetsListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Lists scan rulesets in data catalog. */
export interface ScanRulesetsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & ScanRulesetsListDefaultHeaders;
}

/** Lists all system scan rulesets for an account. */
export interface SystemScanRulesetsList200Response extends HttpResponse {
  status: "200";
  body: SystemScanRulesetListOutput;
}

export interface SystemScanRulesetsListDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Lists all system scan rulesets for an account. */
export interface SystemScanRulesetsListDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & SystemScanRulesetsListDefaultHeaders;
}

/** Gets a system scan ruleset for a data source. */
export interface SystemScanRulesetsGet200Response extends HttpResponse {
  status: "200";
  body: SystemScanRulesetOutput;
}

export interface SystemScanRulesetsGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets a system scan ruleset for a data source. */
export interface SystemScanRulesetsGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & SystemScanRulesetsGetDefaultHeaders;
}

/** Gets a scan ruleset by version. */
export interface SystemScanRulesetsGetByVersion200Response extends HttpResponse {
  status: "200";
  body: SystemScanRulesetOutput;
}

export interface SystemScanRulesetsGetByVersionDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets a scan ruleset by version. */
export interface SystemScanRulesetsGetByVersionDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & SystemScanRulesetsGetByVersionDefaultHeaders;
}

/** Gets the latest version of a system scan ruleset. */
export interface SystemScanRulesetsGetLatest200Response extends HttpResponse {
  status: "200";
  body: SystemScanRulesetOutput;
}

export interface SystemScanRulesetsGetLatestDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets the latest version of a system scan ruleset. */
export interface SystemScanRulesetsGetLatestDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & SystemScanRulesetsGetLatestDefaultHeaders;
}

/** Lists system scan ruleset versions in data catalog. */
export interface SystemScanRulesetsListVersionsByDataSource200Response extends HttpResponse {
  status: "200";
  body: SystemScanRulesetListOutput;
}

export interface SystemScanRulesetsListVersionsByDataSourceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Lists system scan ruleset versions in data catalog. */
export interface SystemScanRulesetsListVersionsByDataSourceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & SystemScanRulesetsListVersionsByDataSourceDefaultHeaders;
}

/** Gets trigger information. */
export interface TriggersGet200Response extends HttpResponse {
  status: "200";
  body: TriggerOutput;
}

export interface TriggersGetDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Gets trigger information. */
export interface TriggersGetDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & TriggersGetDefaultHeaders;
}

/** Creates or replaces an instance of a trigger. */
export interface TriggersCreateOrReplace200Response extends HttpResponse {
  status: "200";
  body: TriggerOutput;
}

/** Creates or replaces an instance of a trigger. */
export interface TriggersCreateOrReplace201Response extends HttpResponse {
  status: "201";
  body: TriggerOutput;
}

export interface TriggersCreateOrReplaceDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Creates or replaces an instance of a trigger. */
export interface TriggersCreateOrReplaceDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & TriggersCreateOrReplaceDefaultHeaders;
}

/** Deletes the trigger associated with the scan. */
export interface TriggersDelete204Response extends HttpResponse {
  status: "204";
}

export interface TriggersDeleteDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Deletes the trigger associated with the scan. */
export interface TriggersDeleteDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & TriggersDeleteDefaultHeaders;
}

/** Enables a trigger. */
export interface TriggersEnable200Response extends HttpResponse {
  status: "200";
  body: TriggerOutput;
}

export interface TriggersEnableDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Enables a trigger. */
export interface TriggersEnableDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & TriggersEnableDefaultHeaders;
}

/** Disables a trigger. */
export interface TriggersDisable200Response extends HttpResponse {
  status: "200";
  body: TriggerOutput;
}

export interface TriggersDisableDefaultHeaders {
  /** String error code indicating what went wrong. */
  "x-ms-error-code"?: string;
}

/** Disables a trigger. */
export interface TriggersDisableDefaultResponse extends HttpResponse {
  status: string;
  body: ErrorResponseModelOutput;
  headers: RawHttpHeaders & TriggersDisableDefaultHeaders;
}
