// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  KeyVaultConnectionsGetParameters,
  KeyVaultConnectionsCreateOrReplaceParameters,
  KeyVaultConnectionsDeleteParameters,
  KeyVaultConnectionsListParameters,
  ClassificationRulesGetParameters,
  ClassificationRulesCreateOrReplaceParameters,
  ClassificationRulesDeleteParameters,
  ClassificationRulesListParameters,
  ClassificationRulesListVersionsByRuleNameParameters,
  ClassificationRulesTagClassificationVersionParameters,
  CredentialGetParameters,
  CredentialCreateOrReplaceParameters,
  CredentialDeleteParameters,
  CredentialListParameters,
  DataSourcesCreateOrReplaceParameters,
  DataSourcesGetParameters,
  DataSourcesDeleteParameters,
  DataSourcesListParameters,
  FiltersGetParameters,
  FiltersCreateOrReplaceParameters,
  IntegrationRuntimesListByAccountParameters,
  IntegrationRuntimesGetParameters,
  IntegrationRuntimesDeleteParameters,
  IntegrationRuntimesCreateOrReplaceParameters,
  IntegrationRuntimesStatusParameters,
  IntegrationRuntimesListAuthKeysParameters,
  IntegrationRuntimesRegenerateAuthKeyParameters,
  IntegrationRuntimesDisableInteractiveQueryParameters,
  IntegrationRuntimesEnableInteractiveQueryParameters,
  ManagedVirtualNetworksListByAccountParameters,
  ManagedVirtualNetworksGetParameters,
  ManagedVirtualNetworksCreateOrReplaceParameters,
  ManagedPrivateEndpointsListByAccountParameters,
  ManagedPrivateEndpointsGetParameters,
  ManagedPrivateEndpointsDeleteParameters,
  ManagedPrivateEndpointsCreateOrReplaceParameters,
  ScansCreateOrReplaceParameters,
  ScansGetParameters,
  ScansDeleteParameters,
  ScansListByDataSourceParameters,
  ScanResultGetScanStatusParameters,
  ScanResultRunScanParameters,
  ScanResultCancelScanParameters,
  ScanResultListScanHistoryParameters,
  ScanRulesetsGetParameters,
  ScanRulesetsCreateOrReplaceParameters,
  ScanRulesetsDeleteParameters,
  ScanRulesetsListParameters,
  SystemScanRulesetsListParameters,
  SystemScanRulesetsGetParameters,
  SystemScanRulesetsGetByVersionParameters,
  SystemScanRulesetsGetLatestParameters,
  SystemScanRulesetsListVersionsByDataSourceParameters,
  TriggersGetParameters,
  TriggersCreateOrReplaceParameters,
  TriggersDeleteParameters,
  TriggersEnableParameters,
  TriggersDisableParameters,
} from "./parameters.js";
import type {
  KeyVaultConnectionsGet200Response,
  KeyVaultConnectionsGetDefaultResponse,
  KeyVaultConnectionsCreateOrReplace200Response,
  KeyVaultConnectionsCreateOrReplace201Response,
  KeyVaultConnectionsCreateOrReplaceDefaultResponse,
  KeyVaultConnectionsDelete204Response,
  KeyVaultConnectionsDeleteDefaultResponse,
  KeyVaultConnectionsList200Response,
  KeyVaultConnectionsListDefaultResponse,
  ClassificationRulesGet200Response,
  ClassificationRulesGetDefaultResponse,
  ClassificationRulesCreateOrReplace200Response,
  ClassificationRulesCreateOrReplace201Response,
  ClassificationRulesCreateOrReplaceDefaultResponse,
  ClassificationRulesDelete204Response,
  ClassificationRulesDeleteDefaultResponse,
  ClassificationRulesList200Response,
  ClassificationRulesListDefaultResponse,
  ClassificationRulesListVersionsByRuleName200Response,
  ClassificationRulesListVersionsByRuleNameDefaultResponse,
  ClassificationRulesTagClassificationVersion202Response,
  ClassificationRulesTagClassificationVersionDefaultResponse,
  CredentialGet200Response,
  CredentialGetDefaultResponse,
  CredentialCreateOrReplace200Response,
  CredentialCreateOrReplace201Response,
  CredentialCreateOrReplaceDefaultResponse,
  CredentialDelete204Response,
  CredentialDeleteDefaultResponse,
  CredentialList200Response,
  CredentialListDefaultResponse,
  DataSourcesCreateOrReplace200Response,
  DataSourcesCreateOrReplace201Response,
  DataSourcesCreateOrReplaceDefaultResponse,
  DataSourcesGet200Response,
  DataSourcesGetDefaultResponse,
  DataSourcesDelete204Response,
  DataSourcesDeleteDefaultResponse,
  DataSourcesList200Response,
  DataSourcesListDefaultResponse,
  FiltersGet200Response,
  FiltersGetDefaultResponse,
  FiltersCreateOrReplace200Response,
  FiltersCreateOrReplace201Response,
  FiltersCreateOrReplaceDefaultResponse,
  IntegrationRuntimesListByAccount200Response,
  IntegrationRuntimesListByAccountDefaultResponse,
  IntegrationRuntimesGet200Response,
  IntegrationRuntimesGetDefaultResponse,
  IntegrationRuntimesDelete204Response,
  IntegrationRuntimesDeleteDefaultResponse,
  IntegrationRuntimesCreateOrReplace200Response,
  IntegrationRuntimesCreateOrReplace201Response,
  IntegrationRuntimesCreateOrReplaceDefaultResponse,
  IntegrationRuntimesStatus200Response,
  IntegrationRuntimesStatusDefaultResponse,
  IntegrationRuntimesListAuthKeys200Response,
  IntegrationRuntimesListAuthKeysDefaultResponse,
  IntegrationRuntimesRegenerateAuthKey200Response,
  IntegrationRuntimesRegenerateAuthKeyDefaultResponse,
  IntegrationRuntimesDisableInteractiveQuery202Response,
  IntegrationRuntimesDisableInteractiveQueryDefaultResponse,
  IntegrationRuntimesEnableInteractiveQuery202Response,
  IntegrationRuntimesEnableInteractiveQueryDefaultResponse,
  ManagedVirtualNetworksListByAccount200Response,
  ManagedVirtualNetworksListByAccountDefaultResponse,
  ManagedVirtualNetworksGet200Response,
  ManagedVirtualNetworksGetDefaultResponse,
  ManagedVirtualNetworksCreateOrReplace200Response,
  ManagedVirtualNetworksCreateOrReplace201Response,
  ManagedVirtualNetworksCreateOrReplaceDefaultResponse,
  ManagedPrivateEndpointsListByAccount200Response,
  ManagedPrivateEndpointsListByAccountDefaultResponse,
  ManagedPrivateEndpointsGet200Response,
  ManagedPrivateEndpointsGetDefaultResponse,
  ManagedPrivateEndpointsDelete204Response,
  ManagedPrivateEndpointsDeleteDefaultResponse,
  ManagedPrivateEndpointsCreateOrReplace200Response,
  ManagedPrivateEndpointsCreateOrReplace201Response,
  ManagedPrivateEndpointsCreateOrReplaceDefaultResponse,
  ScansCreateOrReplace200Response,
  ScansCreateOrReplace201Response,
  ScansCreateOrReplaceDefaultResponse,
  ScansGet200Response,
  ScansGetDefaultResponse,
  ScansDelete204Response,
  ScansDeleteDefaultResponse,
  ScansListByDataSource200Response,
  ScansListByDataSourceDefaultResponse,
  ScanResultGetScanStatus200Response,
  ScanResultGetScanStatusDefaultResponse,
  ScanResultRunScan202Response,
  ScanResultRunScanDefaultResponse,
  ScanResultCancelScan202Response,
  ScanResultCancelScanDefaultResponse,
  ScanResultListScanHistory200Response,
  ScanResultListScanHistoryDefaultResponse,
  ScanRulesetsGet200Response,
  ScanRulesetsGetDefaultResponse,
  ScanRulesetsCreateOrReplace200Response,
  ScanRulesetsCreateOrReplace201Response,
  ScanRulesetsCreateOrReplaceDefaultResponse,
  ScanRulesetsDelete204Response,
  ScanRulesetsDeleteDefaultResponse,
  ScanRulesetsList200Response,
  ScanRulesetsListDefaultResponse,
  SystemScanRulesetsList200Response,
  SystemScanRulesetsListDefaultResponse,
  SystemScanRulesetsGet200Response,
  SystemScanRulesetsGetDefaultResponse,
  SystemScanRulesetsGetByVersion200Response,
  SystemScanRulesetsGetByVersionDefaultResponse,
  SystemScanRulesetsGetLatest200Response,
  SystemScanRulesetsGetLatestDefaultResponse,
  SystemScanRulesetsListVersionsByDataSource200Response,
  SystemScanRulesetsListVersionsByDataSourceDefaultResponse,
  TriggersGet200Response,
  TriggersGetDefaultResponse,
  TriggersCreateOrReplace200Response,
  TriggersCreateOrReplace201Response,
  TriggersCreateOrReplaceDefaultResponse,
  TriggersDelete204Response,
  TriggersDeleteDefaultResponse,
  TriggersEnable200Response,
  TriggersEnableDefaultResponse,
  TriggersDisable200Response,
  TriggersDisableDefaultResponse,
} from "./responses.js";
import type { Client, StreamableMethod } from "@azure-rest/core-client";

export interface KeyVaultConnectionsGet {
  /** Gets an Azure Key Vault connection. */
  get(
    options?: KeyVaultConnectionsGetParameters,
  ): StreamableMethod<KeyVaultConnectionsGet200Response | KeyVaultConnectionsGetDefaultResponse>;
  /** Creates or replaces a connection to Azure Key Vault. */
  put(
    options: KeyVaultConnectionsCreateOrReplaceParameters,
  ): StreamableMethod<
    | KeyVaultConnectionsCreateOrReplace200Response
    | KeyVaultConnectionsCreateOrReplace201Response
    | KeyVaultConnectionsCreateOrReplaceDefaultResponse
  >;
  /** Deletes an Azure Key Vault connection associated with the account. */
  delete(
    options?: KeyVaultConnectionsDeleteParameters,
  ): StreamableMethod<
    KeyVaultConnectionsDelete204Response | KeyVaultConnectionsDeleteDefaultResponse
  >;
}

export interface KeyVaultConnectionsList {
  /** Lists Azure Key Vaults in an account. */
  get(
    options?: KeyVaultConnectionsListParameters,
  ): StreamableMethod<KeyVaultConnectionsList200Response | KeyVaultConnectionsListDefaultResponse>;
}

export interface ClassificationRulesGet {
  /** Gets a classification rule. */
  get(
    options?: ClassificationRulesGetParameters,
  ): StreamableMethod<ClassificationRulesGet200Response | ClassificationRulesGetDefaultResponse>;
  /** Creates or replaces a classification rule. */
  put(
    options: ClassificationRulesCreateOrReplaceParameters,
  ): StreamableMethod<
    | ClassificationRulesCreateOrReplace200Response
    | ClassificationRulesCreateOrReplace201Response
    | ClassificationRulesCreateOrReplaceDefaultResponse
  >;
  /** Deletes a classification rule. */
  delete(
    options?: ClassificationRulesDeleteParameters,
  ): StreamableMethod<
    ClassificationRulesDelete204Response | ClassificationRulesDeleteDefaultResponse
  >;
}

export interface ClassificationRulesList {
  /** Lists classification rules in Account. */
  get(
    options?: ClassificationRulesListParameters,
  ): StreamableMethod<ClassificationRulesList200Response | ClassificationRulesListDefaultResponse>;
}

export interface ClassificationRulesListVersionsByRuleName {
  /** Lists the rule versions of a classification rule. */
  get(
    options?: ClassificationRulesListVersionsByRuleNameParameters,
  ): StreamableMethod<
    | ClassificationRulesListVersionsByRuleName200Response
    | ClassificationRulesListVersionsByRuleNameDefaultResponse
  >;
}

export interface ClassificationRulesTagClassificationVersion {
  /** Sets classification action on a specific classification rule version. */
  post(
    options: ClassificationRulesTagClassificationVersionParameters,
  ): StreamableMethod<
    | ClassificationRulesTagClassificationVersion202Response
    | ClassificationRulesTagClassificationVersionDefaultResponse
  >;
}

export interface CredentialGet {
  /** Gets credential information. */
  get(
    options?: CredentialGetParameters,
  ): StreamableMethod<CredentialGet200Response | CredentialGetDefaultResponse>;
  /** Creates or replaces an instance of a credential. */
  put(
    options: CredentialCreateOrReplaceParameters,
  ): StreamableMethod<
    | CredentialCreateOrReplace200Response
    | CredentialCreateOrReplace201Response
    | CredentialCreateOrReplaceDefaultResponse
  >;
  /** Deletes a credential associated with the account. */
  delete(
    options?: CredentialDeleteParameters,
  ): StreamableMethod<CredentialDelete204Response | CredentialDeleteDefaultResponse>;
}

export interface CredentialList {
  /** Lists credentials in account. */
  get(
    options?: CredentialListParameters,
  ): StreamableMethod<CredentialList200Response | CredentialListDefaultResponse>;
}

export interface DataSourcesCreateOrReplace {
  /** Creates or replaces a data source. */
  put(
    options: DataSourcesCreateOrReplaceParameters,
  ): StreamableMethod<
    | DataSourcesCreateOrReplace200Response
    | DataSourcesCreateOrReplace201Response
    | DataSourcesCreateOrReplaceDefaultResponse
  >;
  /** Gets a data source. */
  get(
    options?: DataSourcesGetParameters,
  ): StreamableMethod<DataSourcesGet200Response | DataSourcesGetDefaultResponse>;
  /** Deletes a data source. */
  delete(
    options?: DataSourcesDeleteParameters,
  ): StreamableMethod<DataSourcesDelete204Response | DataSourcesDeleteDefaultResponse>;
}

export interface DataSourcesList {
  /** Lists data sources in Data catalog. */
  get(
    options?: DataSourcesListParameters,
  ): StreamableMethod<DataSourcesList200Response | DataSourcesListDefaultResponse>;
}

export interface FiltersGet {
  /** Gets a filter. */
  get(
    options?: FiltersGetParameters,
  ): StreamableMethod<FiltersGet200Response | FiltersGetDefaultResponse>;
  /** Creates or replaces a filter. */
  put(
    options: FiltersCreateOrReplaceParameters,
  ): StreamableMethod<
    | FiltersCreateOrReplace200Response
    | FiltersCreateOrReplace201Response
    | FiltersCreateOrReplaceDefaultResponse
  >;
}

export interface IntegrationRuntimesListByAccount {
  /** Lists integration runtimes in an account. */
  get(
    options?: IntegrationRuntimesListByAccountParameters,
  ): StreamableMethod<
    IntegrationRuntimesListByAccount200Response | IntegrationRuntimesListByAccountDefaultResponse
  >;
}

export interface IntegrationRuntimesGet {
  /** Gets an integration runtime. */
  get(
    options?: IntegrationRuntimesGetParameters,
  ): StreamableMethod<IntegrationRuntimesGet200Response | IntegrationRuntimesGetDefaultResponse>;
  /** Deletes an integration runtime. */
  delete(
    options?: IntegrationRuntimesDeleteParameters,
  ): StreamableMethod<
    IntegrationRuntimesDelete204Response | IntegrationRuntimesDeleteDefaultResponse
  >;
  /** Creates or replaces an instance of integration runtime. */
  put(
    options: IntegrationRuntimesCreateOrReplaceParameters,
  ): StreamableMethod<
    | IntegrationRuntimesCreateOrReplace200Response
    | IntegrationRuntimesCreateOrReplace201Response
    | IntegrationRuntimesCreateOrReplaceDefaultResponse
  >;
}

export interface IntegrationRuntimesStatus {
  /** Gets detailed status information for an integration runtime. */
  get(
    options?: IntegrationRuntimesStatusParameters,
  ): StreamableMethod<
    IntegrationRuntimesStatus200Response | IntegrationRuntimesStatusDefaultResponse
  >;
}

export interface IntegrationRuntimesListAuthKeys {
  /** Retrieves the authentication keys for an integration runtime. */
  post(
    options?: IntegrationRuntimesListAuthKeysParameters,
  ): StreamableMethod<
    IntegrationRuntimesListAuthKeys200Response | IntegrationRuntimesListAuthKeysDefaultResponse
  >;
}

export interface IntegrationRuntimesRegenerateAuthKey {
  /** Regenerates the authentication key for an integration runtime. */
  post(
    options: IntegrationRuntimesRegenerateAuthKeyParameters,
  ): StreamableMethod<
    | IntegrationRuntimesRegenerateAuthKey200Response
    | IntegrationRuntimesRegenerateAuthKeyDefaultResponse
  >;
}

export interface IntegrationRuntimesDisableInteractiveQuery {
  /** Disables interactive querying. */
  post(
    options?: IntegrationRuntimesDisableInteractiveQueryParameters,
  ): StreamableMethod<
    | IntegrationRuntimesDisableInteractiveQuery202Response
    | IntegrationRuntimesDisableInteractiveQueryDefaultResponse
  >;
}

export interface IntegrationRuntimesEnableInteractiveQuery {
  /** Enables interactive querying. */
  post(
    options: IntegrationRuntimesEnableInteractiveQueryParameters,
  ): StreamableMethod<
    | IntegrationRuntimesEnableInteractiveQuery202Response
    | IntegrationRuntimesEnableInteractiveQueryDefaultResponse
  >;
}

export interface ManagedVirtualNetworksListByAccount {
  /** Lists managed virtual networks in an account. */
  get(
    options?: ManagedVirtualNetworksListByAccountParameters,
  ): StreamableMethod<
    | ManagedVirtualNetworksListByAccount200Response
    | ManagedVirtualNetworksListByAccountDefaultResponse
  >;
}

export interface ManagedVirtualNetworksGet {
  /** Gets a managed virtual network. */
  get(
    options?: ManagedVirtualNetworksGetParameters,
  ): StreamableMethod<
    ManagedVirtualNetworksGet200Response | ManagedVirtualNetworksGetDefaultResponse
  >;
  /** Creates or replaces a managed virtual network. */
  put(
    options: ManagedVirtualNetworksCreateOrReplaceParameters,
  ): StreamableMethod<
    | ManagedVirtualNetworksCreateOrReplace200Response
    | ManagedVirtualNetworksCreateOrReplace201Response
    | ManagedVirtualNetworksCreateOrReplaceDefaultResponse
  >;
}

export interface ManagedPrivateEndpointsListByAccount {
  /** Lists managed private endpoints under a managed virtual network. */
  get(
    options?: ManagedPrivateEndpointsListByAccountParameters,
  ): StreamableMethod<
    | ManagedPrivateEndpointsListByAccount200Response
    | ManagedPrivateEndpointsListByAccountDefaultResponse
  >;
}

export interface ManagedPrivateEndpointsGet {
  /** Gets a managed private endpoint. */
  get(
    options?: ManagedPrivateEndpointsGetParameters,
  ): StreamableMethod<
    ManagedPrivateEndpointsGet200Response | ManagedPrivateEndpointsGetDefaultResponse
  >;
  /** Deletes a managed private endpoint. */
  delete(
    options?: ManagedPrivateEndpointsDeleteParameters,
  ): StreamableMethod<
    ManagedPrivateEndpointsDelete204Response | ManagedPrivateEndpointsDeleteDefaultResponse
  >;
  /** Creates or replaces a managed private endpoint. */
  put(
    options: ManagedPrivateEndpointsCreateOrReplaceParameters,
  ): StreamableMethod<
    | ManagedPrivateEndpointsCreateOrReplace200Response
    | ManagedPrivateEndpointsCreateOrReplace201Response
    | ManagedPrivateEndpointsCreateOrReplaceDefaultResponse
  >;
}

export interface ScansCreateOrReplace {
  /** Creates or replaces an instance of a scan. */
  put(
    options: ScansCreateOrReplaceParameters,
  ): StreamableMethod<
    | ScansCreateOrReplace200Response
    | ScansCreateOrReplace201Response
    | ScansCreateOrReplaceDefaultResponse
  >;
  /** Gets a scan information. */
  get(
    options?: ScansGetParameters,
  ): StreamableMethod<ScansGet200Response | ScansGetDefaultResponse>;
  /** Deletes the scan associated with the data source. */
  delete(
    options?: ScansDeleteParameters,
  ): StreamableMethod<ScansDelete204Response | ScansDeleteDefaultResponse>;
}

export interface ScansListByDataSource {
  /** Lists scans in data source. */
  get(
    options?: ScansListByDataSourceParameters,
  ): StreamableMethod<ScansListByDataSource200Response | ScansListByDataSourceDefaultResponse>;
}

export interface ScanResultGetScanStatus {
  /** Gets the status of the scan run with ingestion details. */
  get(
    options?: ScanResultGetScanStatusParameters,
  ): StreamableMethod<ScanResultGetScanStatus200Response | ScanResultGetScanStatusDefaultResponse>;
}

export interface ScanResultRunScan {
  /** Runs the scan */
  post(
    options: ScanResultRunScanParameters,
  ): StreamableMethod<ScanResultRunScan202Response | ScanResultRunScanDefaultResponse>;
}

export interface ScanResultCancelScan {
  /** Cancels a scan. */
  post(
    options?: ScanResultCancelScanParameters,
  ): StreamableMethod<ScanResultCancelScan202Response | ScanResultCancelScanDefaultResponse>;
}

export interface ScanResultListScanHistory {
  /** Lists the scan history of a scan. */
  get(
    options?: ScanResultListScanHistoryParameters,
  ): StreamableMethod<
    ScanResultListScanHistory200Response | ScanResultListScanHistoryDefaultResponse
  >;
}

export interface ScanRulesetsGet {
  /** Gets a scan ruleset. */
  get(
    options?: ScanRulesetsGetParameters,
  ): StreamableMethod<ScanRulesetsGet200Response | ScanRulesetsGetDefaultResponse>;
  /** Creates or replaces a scan ruleset. */
  put(
    options: ScanRulesetsCreateOrReplaceParameters,
  ): StreamableMethod<
    | ScanRulesetsCreateOrReplace200Response
    | ScanRulesetsCreateOrReplace201Response
    | ScanRulesetsCreateOrReplaceDefaultResponse
  >;
  /** Deletes a scan ruleset. */
  delete(
    options?: ScanRulesetsDeleteParameters,
  ): StreamableMethod<ScanRulesetsDelete204Response | ScanRulesetsDeleteDefaultResponse>;
}

export interface ScanRulesetsList {
  /** Lists scan rulesets in data catalog. */
  get(
    options?: ScanRulesetsListParameters,
  ): StreamableMethod<ScanRulesetsList200Response | ScanRulesetsListDefaultResponse>;
}

export interface SystemScanRulesetsList {
  /** Lists all system scan rulesets for an account. */
  get(
    options?: SystemScanRulesetsListParameters,
  ): StreamableMethod<SystemScanRulesetsList200Response | SystemScanRulesetsListDefaultResponse>;
}

export interface SystemScanRulesetsGet {
  /** Gets a system scan ruleset for a data source. */
  get(
    options?: SystemScanRulesetsGetParameters,
  ): StreamableMethod<SystemScanRulesetsGet200Response | SystemScanRulesetsGetDefaultResponse>;
}

export interface SystemScanRulesetsGetByVersion {
  /** Gets a scan ruleset by version. */
  get(
    options?: SystemScanRulesetsGetByVersionParameters,
  ): StreamableMethod<
    SystemScanRulesetsGetByVersion200Response | SystemScanRulesetsGetByVersionDefaultResponse
  >;
}

export interface SystemScanRulesetsGetLatest {
  /** Gets the latest version of a system scan ruleset. */
  get(
    options?: SystemScanRulesetsGetLatestParameters,
  ): StreamableMethod<
    SystemScanRulesetsGetLatest200Response | SystemScanRulesetsGetLatestDefaultResponse
  >;
}

export interface SystemScanRulesetsListVersionsByDataSource {
  /** Lists system scan ruleset versions in data catalog. */
  get(
    options?: SystemScanRulesetsListVersionsByDataSourceParameters,
  ): StreamableMethod<
    | SystemScanRulesetsListVersionsByDataSource200Response
    | SystemScanRulesetsListVersionsByDataSourceDefaultResponse
  >;
}

export interface TriggersGet {
  /** Gets trigger information. */
  get(
    options?: TriggersGetParameters,
  ): StreamableMethod<TriggersGet200Response | TriggersGetDefaultResponse>;
  /** Creates or replaces an instance of a trigger. */
  put(
    options: TriggersCreateOrReplaceParameters,
  ): StreamableMethod<
    | TriggersCreateOrReplace200Response
    | TriggersCreateOrReplace201Response
    | TriggersCreateOrReplaceDefaultResponse
  >;
  /** Deletes the trigger associated with the scan. */
  delete(
    options?: TriggersDeleteParameters,
  ): StreamableMethod<TriggersDelete204Response | TriggersDeleteDefaultResponse>;
}

export interface TriggersEnable {
  /** Enables a trigger. */
  post(
    options?: TriggersEnableParameters,
  ): StreamableMethod<TriggersEnable200Response | TriggersEnableDefaultResponse>;
}

export interface TriggersDisable {
  /** Disables a trigger. */
  post(
    options?: TriggersDisableParameters,
  ): StreamableMethod<TriggersDisable200Response | TriggersDisableDefaultResponse>;
}

export interface Routes {
  /** Resource for '/azureKeyVaults/\{azureKeyVaultName\}' has methods for the following verbs: get, put, delete */
  (path: "/azureKeyVaults/{azureKeyVaultName}", azureKeyVaultName: string): KeyVaultConnectionsGet;
  /** Resource for '/azureKeyVaults' has methods for the following verbs: get */
  (path: "/azureKeyVaults"): KeyVaultConnectionsList;
  /** Resource for '/classificationrules/\{classificationRuleName\}' has methods for the following verbs: get, put, delete */
  (
    path: "/classificationrules/{classificationRuleName}",
    classificationRuleName: string,
  ): ClassificationRulesGet;
  /** Resource for '/classificationrules' has methods for the following verbs: get */
  (path: "/classificationrules"): ClassificationRulesList;
  /** Resource for '/classificationrules/\{classificationRuleName\}/versions' has methods for the following verbs: get */
  (
    path: "/classificationrules/{classificationRuleName}/versions",
    classificationRuleName: string,
  ): ClassificationRulesListVersionsByRuleName;
  /** Resource for '/classificationrules/\{classificationRuleName\}/versions/\{classificationRuleVersion\}:tag' has methods for the following verbs: post */
  (
    path: "/classificationrules/{classificationRuleName}/versions/{classificationRuleVersion}:tag",
    classificationRuleName: string,
    classificationRuleVersion: number,
  ): ClassificationRulesTagClassificationVersion;
  /** Resource for '/credentials/\{credentialName\}' has methods for the following verbs: get, put, delete */
  (path: "/credentials/{credentialName}", credentialName: string): CredentialGet;
  /** Resource for '/credentials' has methods for the following verbs: get */
  (path: "/credentials"): CredentialList;
  /** Resource for '/datasources/\{dataSourceName\}' has methods for the following verbs: put, get, delete */
  (path: "/datasources/{dataSourceName}", dataSourceName: string): DataSourcesCreateOrReplace;
  /** Resource for '/datasources' has methods for the following verbs: get */
  (path: "/datasources"): DataSourcesList;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/filters/custom' has methods for the following verbs: get, put */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/filters/custom",
    dataSourceName: string,
    scanName: string,
  ): FiltersGet;
  /** Resource for '/integrationruntimes' has methods for the following verbs: get */
  (path: "/integrationruntimes"): IntegrationRuntimesListByAccount;
  /** Resource for '/integrationruntimes/\{integrationRuntimeName\}' has methods for the following verbs: get, delete, put */
  (
    path: "/integrationruntimes/{integrationRuntimeName}",
    integrationRuntimeName: string,
  ): IntegrationRuntimesGet;
  /** Resource for '/integrationruntimes/\{integrationRuntimeName\}/status' has methods for the following verbs: get */
  (
    path: "/integrationruntimes/{integrationRuntimeName}/status",
    integrationRuntimeName: string,
  ): IntegrationRuntimesStatus;
  /** Resource for '/integrationruntimes/\{integrationRuntimeName\}:listAuthKeys' has methods for the following verbs: post */
  (
    path: "/integrationruntimes/{integrationRuntimeName}:listAuthKeys",
    integrationRuntimeName: string,
  ): IntegrationRuntimesListAuthKeys;
  /** Resource for '/integrationruntimes/\{integrationRuntimeName\}:regenerateAuthKey' has methods for the following verbs: post */
  (
    path: "/integrationruntimes/{integrationRuntimeName}:regenerateAuthKey",
    integrationRuntimeName: string,
  ): IntegrationRuntimesRegenerateAuthKey;
  /** Resource for '/integrationruntimes/\{integrationRuntimeName\}:disableInteractiveQuery' has methods for the following verbs: post */
  (
    path: "/integrationruntimes/{integrationRuntimeName}:disableInteractiveQuery",
    integrationRuntimeName: string,
  ): IntegrationRuntimesDisableInteractiveQuery;
  /** Resource for '/integrationruntimes/\{integrationRuntimeName\}:enableInteractiveQuery' has methods for the following verbs: post */
  (
    path: "/integrationruntimes/{integrationRuntimeName}:enableInteractiveQuery",
    integrationRuntimeName: string,
  ): IntegrationRuntimesEnableInteractiveQuery;
  /** Resource for '/managedvirtualnetworks' has methods for the following verbs: get */
  (path: "/managedvirtualnetworks"): ManagedVirtualNetworksListByAccount;
  /** Resource for '/managedvirtualnetworks/\{managedVirtualNetworkName\}' has methods for the following verbs: get, put */
  (
    path: "/managedvirtualnetworks/{managedVirtualNetworkName}",
    managedVirtualNetworkName: "defaultv2",
  ): ManagedVirtualNetworksGet;
  /** Resource for '/managedvirtualnetworks/\{managedVirtualNetworkName\}/managedprivateendpoints' has methods for the following verbs: get */
  (
    path: "/managedvirtualnetworks/{managedVirtualNetworkName}/managedprivateendpoints",
    managedVirtualNetworkName: "defaultv2",
  ): ManagedPrivateEndpointsListByAccount;
  /** Resource for '/managedvirtualnetworks/\{managedVirtualNetworkName\}/managedprivateendpoints/\{managedPrivateEndpointName\}' has methods for the following verbs: get, delete, put */
  (
    path: "/managedvirtualnetworks/{managedVirtualNetworkName}/managedprivateendpoints/{managedPrivateEndpointName}",
    managedVirtualNetworkName: "defaultv2",
    managedPrivateEndpointName: string,
  ): ManagedPrivateEndpointsGet;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}' has methods for the following verbs: put, get, delete */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}",
    dataSourceName: string,
    scanName: string,
  ): ScansCreateOrReplace;
  /** Resource for '/datasources/\{dataSourceName\}/scans' has methods for the following verbs: get */
  (path: "/datasources/{dataSourceName}/scans", dataSourceName: string): ScansListByDataSource;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/runs/\{runId\}' has methods for the following verbs: get */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/runs/{runId}",
    dataSourceName: string,
    scanName: string,
    runId: string,
  ): ScanResultGetScanStatus;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}:run' has methods for the following verbs: post */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}:run",
    dataSourceName: string,
    scanName: string,
  ): ScanResultRunScan;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/runs/\{runId\}:cancel' has methods for the following verbs: post */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/runs/{runId}:cancel",
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
  (path: "/scanrulesets"): ScanRulesetsList;
  /** Resource for '/systemScanRulesets' has methods for the following verbs: get */
  (path: "/systemScanRulesets"): SystemScanRulesetsList;
  /** Resource for '/systemScanRulesets/datasources/\{dataSourceType\}' has methods for the following verbs: get */
  (
    path: "/systemScanRulesets/datasources/{dataSourceType}",
    dataSourceType:
      | "None"
      | "Fabric"
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
      | "ArcEnabledSqlServer"
      | "AmazonPostgreSql"
      | "AzurePostgreSql"
      | "Databricks"
      | "SqlServerDatabase"
      | "AzureSqlDatabaseManagedInstance"
      | "AzureSqlDataWarehouse"
      | "AzureMySql"
      | "Hdfs"
      | "TableauServer"
      | "AzureStorage"
      | "Teradata"
      | "Oracle"
      | "PostgreSql"
      | "AmazonRedShift"
      | "DatabricksHms"
      | "SapS4Hana"
      | "SapEcc"
      | "Snowflake"
      | "PowerBI"
      | "Trident"
      | "Dataverse"
      | "DatabricksUnityCatalog",
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
  ): TriggersGet;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/triggers/default:enable' has methods for the following verbs: post */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/triggers/default:enable",
    dataSourceName: string,
    scanName: string,
  ): TriggersEnable;
  /** Resource for '/datasources/\{dataSourceName\}/scans/\{scanName\}/triggers/default:disable' has methods for the following verbs: post */
  (
    path: "/datasources/{dataSourceName}/scans/{scanName}/triggers/default:disable",
    dataSourceName: string,
    scanName: string,
  ): TriggersDisable;
}

export type PurviewScanningRestClient = Client & {
  path: Routes;
};
