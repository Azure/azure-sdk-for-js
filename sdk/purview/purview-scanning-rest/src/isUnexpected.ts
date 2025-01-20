// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

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

const responseMap: Record<string, string[]> = {
  "GET /azureKeyVaults/{azureKeyVaultName}": ["200"],
  "PUT /azureKeyVaults/{azureKeyVaultName}": ["200", "201"],
  "DELETE /azureKeyVaults/{azureKeyVaultName}": ["204"],
  "GET /azureKeyVaults": ["200"],
  "GET /classificationrules/{classificationRuleName}": ["200"],
  "PUT /classificationrules/{classificationRuleName}": ["200", "201"],
  "DELETE /classificationrules/{classificationRuleName}": ["204"],
  "GET /classificationrules": ["200"],
  "GET /classificationrules/{classificationRuleName}/versions": ["200"],
  "GET /classificationrules/{classificationRuleName}/versions/{classificationRuleVersion}:tag": [
    "202",
  ],
  "POST /classificationrules/{classificationRuleName}/versions/{classificationRuleVersion}:tag": [
    "202",
  ],
  "GET /credentials/{credentialName}": ["200"],
  "PUT /credentials/{credentialName}": ["200", "201"],
  "DELETE /credentials/{credentialName}": ["204"],
  "GET /credentials": ["200"],
  "PUT /datasources/{dataSourceName}": ["200", "201"],
  "GET /datasources/{dataSourceName}": ["200"],
  "DELETE /datasources/{dataSourceName}": ["204"],
  "GET /datasources": ["200"],
  "GET /datasources/{dataSourceName}/scans/{scanName}/filters/custom": ["200"],
  "PUT /datasources/{dataSourceName}/scans/{scanName}/filters/custom": ["200", "201"],
  "GET /integrationruntimes": ["200"],
  "GET /integrationruntimes/{integrationRuntimeName}": ["200"],
  "DELETE /integrationruntimes/{integrationRuntimeName}": ["204"],
  "PUT /integrationruntimes/{integrationRuntimeName}": ["200", "201"],
  "GET /integrationruntimes/{integrationRuntimeName}/status": ["200"],
  "POST /integrationruntimes/{integrationRuntimeName}:listAuthKeys": ["200"],
  "POST /integrationruntimes/{integrationRuntimeName}:regenerateAuthKey": ["200"],
  "GET /integrationruntimes/{integrationRuntimeName}:disableInteractiveQuery": ["202"],
  "POST /integrationruntimes/{integrationRuntimeName}:disableInteractiveQuery": ["202"],
  "GET /integrationruntimes/{integrationRuntimeName}:enableInteractiveQuery": ["202"],
  "POST /integrationruntimes/{integrationRuntimeName}:enableInteractiveQuery": ["202"],
  "GET /managedvirtualnetworks": ["200"],
  "GET /managedvirtualnetworks/{managedVirtualNetworkName}": ["200"],
  "PUT /managedvirtualnetworks/{managedVirtualNetworkName}": ["200", "201"],
  "GET /managedvirtualnetworks/{managedVirtualNetworkName}/managedprivateendpoints": ["200"],
  "GET /managedvirtualnetworks/{managedVirtualNetworkName}/managedprivateendpoints/{managedPrivateEndpointName}":
    ["200"],
  "DELETE /managedvirtualnetworks/{managedVirtualNetworkName}/managedprivateendpoints/{managedPrivateEndpointName}":
    ["204"],
  "PUT /managedvirtualnetworks/{managedVirtualNetworkName}/managedprivateendpoints/{managedPrivateEndpointName}":
    ["200", "201"],
  "PUT /datasources/{dataSourceName}/scans/{scanName}": ["200", "201"],
  "GET /datasources/{dataSourceName}/scans/{scanName}": ["200"],
  "DELETE /datasources/{dataSourceName}/scans/{scanName}": ["204"],
  "GET /datasources/{dataSourceName}/scans": ["200"],
  "GET /datasources/{dataSourceName}/scans/{scanName}/runs/{runId}": ["200"],
  "GET /datasources/{dataSourceName}/scans/{scanName}:run": ["202"],
  "POST /datasources/{dataSourceName}/scans/{scanName}:run": ["202"],
  "GET /datasources/{dataSourceName}/scans/{scanName}/runs/{runId}:cancel": ["202"],
  "POST /datasources/{dataSourceName}/scans/{scanName}/runs/{runId}:cancel": ["202"],
  "GET /datasources/{dataSourceName}/scans/{scanName}/runs": ["200"],
  "GET /scanrulesets/{scanRulesetName}": ["200"],
  "PUT /scanrulesets/{scanRulesetName}": ["200", "201"],
  "DELETE /scanrulesets/{scanRulesetName}": ["204"],
  "GET /scanrulesets": ["200"],
  "GET /systemScanRulesets": ["200"],
  "GET /systemScanRulesets/datasources/{dataSourceType}": ["200"],
  "GET /systemScanRulesets/versions/{version}": ["200"],
  "GET /systemScanRulesets/versions/latest": ["200"],
  "GET /systemScanRulesets/versions": ["200"],
  "GET /datasources/{dataSourceName}/scans/{scanName}/triggers/default": ["200"],
  "PUT /datasources/{dataSourceName}/scans/{scanName}/triggers/default": ["200", "201"],
  "DELETE /datasources/{dataSourceName}/scans/{scanName}/triggers/default": ["204"],
  "POST /datasources/{dataSourceName}/scans/{scanName}/triggers/default:enable": ["200"],
  "POST /datasources/{dataSourceName}/scans/{scanName}/triggers/default:disable": ["200"],
};

export function isUnexpected(
  response: KeyVaultConnectionsGet200Response | KeyVaultConnectionsGetDefaultResponse,
): response is KeyVaultConnectionsGetDefaultResponse;
export function isUnexpected(
  response:
    | KeyVaultConnectionsCreateOrReplace200Response
    | KeyVaultConnectionsCreateOrReplace201Response
    | KeyVaultConnectionsCreateOrReplaceDefaultResponse,
): response is KeyVaultConnectionsCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: KeyVaultConnectionsDelete204Response | KeyVaultConnectionsDeleteDefaultResponse,
): response is KeyVaultConnectionsDeleteDefaultResponse;
export function isUnexpected(
  response: KeyVaultConnectionsList200Response | KeyVaultConnectionsListDefaultResponse,
): response is KeyVaultConnectionsListDefaultResponse;
export function isUnexpected(
  response: ClassificationRulesGet200Response | ClassificationRulesGetDefaultResponse,
): response is ClassificationRulesGetDefaultResponse;
export function isUnexpected(
  response:
    | ClassificationRulesCreateOrReplace200Response
    | ClassificationRulesCreateOrReplace201Response
    | ClassificationRulesCreateOrReplaceDefaultResponse,
): response is ClassificationRulesCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: ClassificationRulesDelete204Response | ClassificationRulesDeleteDefaultResponse,
): response is ClassificationRulesDeleteDefaultResponse;
export function isUnexpected(
  response: ClassificationRulesList200Response | ClassificationRulesListDefaultResponse,
): response is ClassificationRulesListDefaultResponse;
export function isUnexpected(
  response:
    | ClassificationRulesListVersionsByRuleName200Response
    | ClassificationRulesListVersionsByRuleNameDefaultResponse,
): response is ClassificationRulesListVersionsByRuleNameDefaultResponse;
export function isUnexpected(
  response:
    | ClassificationRulesTagClassificationVersion202Response
    | ClassificationRulesTagClassificationVersionDefaultResponse,
): response is ClassificationRulesTagClassificationVersionDefaultResponse;
export function isUnexpected(
  response: CredentialGet200Response | CredentialGetDefaultResponse,
): response is CredentialGetDefaultResponse;
export function isUnexpected(
  response:
    | CredentialCreateOrReplace200Response
    | CredentialCreateOrReplace201Response
    | CredentialCreateOrReplaceDefaultResponse,
): response is CredentialCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: CredentialDelete204Response | CredentialDeleteDefaultResponse,
): response is CredentialDeleteDefaultResponse;
export function isUnexpected(
  response: CredentialList200Response | CredentialListDefaultResponse,
): response is CredentialListDefaultResponse;
export function isUnexpected(
  response:
    | DataSourcesCreateOrReplace200Response
    | DataSourcesCreateOrReplace201Response
    | DataSourcesCreateOrReplaceDefaultResponse,
): response is DataSourcesCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: DataSourcesGet200Response | DataSourcesGetDefaultResponse,
): response is DataSourcesGetDefaultResponse;
export function isUnexpected(
  response: DataSourcesDelete204Response | DataSourcesDeleteDefaultResponse,
): response is DataSourcesDeleteDefaultResponse;
export function isUnexpected(
  response: DataSourcesList200Response | DataSourcesListDefaultResponse,
): response is DataSourcesListDefaultResponse;
export function isUnexpected(
  response: FiltersGet200Response | FiltersGetDefaultResponse,
): response is FiltersGetDefaultResponse;
export function isUnexpected(
  response:
    | FiltersCreateOrReplace200Response
    | FiltersCreateOrReplace201Response
    | FiltersCreateOrReplaceDefaultResponse,
): response is FiltersCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | IntegrationRuntimesListByAccount200Response
    | IntegrationRuntimesListByAccountDefaultResponse,
): response is IntegrationRuntimesListByAccountDefaultResponse;
export function isUnexpected(
  response: IntegrationRuntimesGet200Response | IntegrationRuntimesGetDefaultResponse,
): response is IntegrationRuntimesGetDefaultResponse;
export function isUnexpected(
  response: IntegrationRuntimesDelete204Response | IntegrationRuntimesDeleteDefaultResponse,
): response is IntegrationRuntimesDeleteDefaultResponse;
export function isUnexpected(
  response:
    | IntegrationRuntimesCreateOrReplace200Response
    | IntegrationRuntimesCreateOrReplace201Response
    | IntegrationRuntimesCreateOrReplaceDefaultResponse,
): response is IntegrationRuntimesCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: IntegrationRuntimesStatus200Response | IntegrationRuntimesStatusDefaultResponse,
): response is IntegrationRuntimesStatusDefaultResponse;
export function isUnexpected(
  response:
    | IntegrationRuntimesListAuthKeys200Response
    | IntegrationRuntimesListAuthKeysDefaultResponse,
): response is IntegrationRuntimesListAuthKeysDefaultResponse;
export function isUnexpected(
  response:
    | IntegrationRuntimesRegenerateAuthKey200Response
    | IntegrationRuntimesRegenerateAuthKeyDefaultResponse,
): response is IntegrationRuntimesRegenerateAuthKeyDefaultResponse;
export function isUnexpected(
  response:
    | IntegrationRuntimesDisableInteractiveQuery202Response
    | IntegrationRuntimesDisableInteractiveQueryDefaultResponse,
): response is IntegrationRuntimesDisableInteractiveQueryDefaultResponse;
export function isUnexpected(
  response:
    | IntegrationRuntimesEnableInteractiveQuery202Response
    | IntegrationRuntimesEnableInteractiveQueryDefaultResponse,
): response is IntegrationRuntimesEnableInteractiveQueryDefaultResponse;
export function isUnexpected(
  response:
    | ManagedVirtualNetworksListByAccount200Response
    | ManagedVirtualNetworksListByAccountDefaultResponse,
): response is ManagedVirtualNetworksListByAccountDefaultResponse;
export function isUnexpected(
  response: ManagedVirtualNetworksGet200Response | ManagedVirtualNetworksGetDefaultResponse,
): response is ManagedVirtualNetworksGetDefaultResponse;
export function isUnexpected(
  response:
    | ManagedVirtualNetworksCreateOrReplace200Response
    | ManagedVirtualNetworksCreateOrReplace201Response
    | ManagedVirtualNetworksCreateOrReplaceDefaultResponse,
): response is ManagedVirtualNetworksCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | ManagedPrivateEndpointsListByAccount200Response
    | ManagedPrivateEndpointsListByAccountDefaultResponse,
): response is ManagedPrivateEndpointsListByAccountDefaultResponse;
export function isUnexpected(
  response: ManagedPrivateEndpointsGet200Response | ManagedPrivateEndpointsGetDefaultResponse,
): response is ManagedPrivateEndpointsGetDefaultResponse;
export function isUnexpected(
  response: ManagedPrivateEndpointsDelete204Response | ManagedPrivateEndpointsDeleteDefaultResponse,
): response is ManagedPrivateEndpointsDeleteDefaultResponse;
export function isUnexpected(
  response:
    | ManagedPrivateEndpointsCreateOrReplace200Response
    | ManagedPrivateEndpointsCreateOrReplace201Response
    | ManagedPrivateEndpointsCreateOrReplaceDefaultResponse,
): response is ManagedPrivateEndpointsCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | ScansCreateOrReplace200Response
    | ScansCreateOrReplace201Response
    | ScansCreateOrReplaceDefaultResponse,
): response is ScansCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: ScansGet200Response | ScansGetDefaultResponse,
): response is ScansGetDefaultResponse;
export function isUnexpected(
  response: ScansDelete204Response | ScansDeleteDefaultResponse,
): response is ScansDeleteDefaultResponse;
export function isUnexpected(
  response: ScansListByDataSource200Response | ScansListByDataSourceDefaultResponse,
): response is ScansListByDataSourceDefaultResponse;
export function isUnexpected(
  response: ScanResultGetScanStatus200Response | ScanResultGetScanStatusDefaultResponse,
): response is ScanResultGetScanStatusDefaultResponse;
export function isUnexpected(
  response: ScanResultRunScan202Response | ScanResultRunScanDefaultResponse,
): response is ScanResultRunScanDefaultResponse;
export function isUnexpected(
  response: ScanResultCancelScan202Response | ScanResultCancelScanDefaultResponse,
): response is ScanResultCancelScanDefaultResponse;
export function isUnexpected(
  response: ScanResultListScanHistory200Response | ScanResultListScanHistoryDefaultResponse,
): response is ScanResultListScanHistoryDefaultResponse;
export function isUnexpected(
  response: ScanRulesetsGet200Response | ScanRulesetsGetDefaultResponse,
): response is ScanRulesetsGetDefaultResponse;
export function isUnexpected(
  response:
    | ScanRulesetsCreateOrReplace200Response
    | ScanRulesetsCreateOrReplace201Response
    | ScanRulesetsCreateOrReplaceDefaultResponse,
): response is ScanRulesetsCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: ScanRulesetsDelete204Response | ScanRulesetsDeleteDefaultResponse,
): response is ScanRulesetsDeleteDefaultResponse;
export function isUnexpected(
  response: ScanRulesetsList200Response | ScanRulesetsListDefaultResponse,
): response is ScanRulesetsListDefaultResponse;
export function isUnexpected(
  response: SystemScanRulesetsList200Response | SystemScanRulesetsListDefaultResponse,
): response is SystemScanRulesetsListDefaultResponse;
export function isUnexpected(
  response: SystemScanRulesetsGet200Response | SystemScanRulesetsGetDefaultResponse,
): response is SystemScanRulesetsGetDefaultResponse;
export function isUnexpected(
  response:
    | SystemScanRulesetsGetByVersion200Response
    | SystemScanRulesetsGetByVersionDefaultResponse,
): response is SystemScanRulesetsGetByVersionDefaultResponse;
export function isUnexpected(
  response: SystemScanRulesetsGetLatest200Response | SystemScanRulesetsGetLatestDefaultResponse,
): response is SystemScanRulesetsGetLatestDefaultResponse;
export function isUnexpected(
  response:
    | SystemScanRulesetsListVersionsByDataSource200Response
    | SystemScanRulesetsListVersionsByDataSourceDefaultResponse,
): response is SystemScanRulesetsListVersionsByDataSourceDefaultResponse;
export function isUnexpected(
  response: TriggersGet200Response | TriggersGetDefaultResponse,
): response is TriggersGetDefaultResponse;
export function isUnexpected(
  response:
    | TriggersCreateOrReplace200Response
    | TriggersCreateOrReplace201Response
    | TriggersCreateOrReplaceDefaultResponse,
): response is TriggersCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: TriggersDelete204Response | TriggersDeleteDefaultResponse,
): response is TriggersDeleteDefaultResponse;
export function isUnexpected(
  response: TriggersEnable200Response | TriggersEnableDefaultResponse,
): response is TriggersEnableDefaultResponse;
export function isUnexpected(
  response: TriggersDisable200Response | TriggersDisableDefaultResponse,
): response is TriggersDisableDefaultResponse;
export function isUnexpected(
  response:
    | KeyVaultConnectionsGet200Response
    | KeyVaultConnectionsGetDefaultResponse
    | KeyVaultConnectionsCreateOrReplace200Response
    | KeyVaultConnectionsCreateOrReplace201Response
    | KeyVaultConnectionsCreateOrReplaceDefaultResponse
    | KeyVaultConnectionsDelete204Response
    | KeyVaultConnectionsDeleteDefaultResponse
    | KeyVaultConnectionsList200Response
    | KeyVaultConnectionsListDefaultResponse
    | ClassificationRulesGet200Response
    | ClassificationRulesGetDefaultResponse
    | ClassificationRulesCreateOrReplace200Response
    | ClassificationRulesCreateOrReplace201Response
    | ClassificationRulesCreateOrReplaceDefaultResponse
    | ClassificationRulesDelete204Response
    | ClassificationRulesDeleteDefaultResponse
    | ClassificationRulesList200Response
    | ClassificationRulesListDefaultResponse
    | ClassificationRulesListVersionsByRuleName200Response
    | ClassificationRulesListVersionsByRuleNameDefaultResponse
    | ClassificationRulesTagClassificationVersion202Response
    | ClassificationRulesTagClassificationVersionDefaultResponse
    | CredentialGet200Response
    | CredentialGetDefaultResponse
    | CredentialCreateOrReplace200Response
    | CredentialCreateOrReplace201Response
    | CredentialCreateOrReplaceDefaultResponse
    | CredentialDelete204Response
    | CredentialDeleteDefaultResponse
    | CredentialList200Response
    | CredentialListDefaultResponse
    | DataSourcesCreateOrReplace200Response
    | DataSourcesCreateOrReplace201Response
    | DataSourcesCreateOrReplaceDefaultResponse
    | DataSourcesGet200Response
    | DataSourcesGetDefaultResponse
    | DataSourcesDelete204Response
    | DataSourcesDeleteDefaultResponse
    | DataSourcesList200Response
    | DataSourcesListDefaultResponse
    | FiltersGet200Response
    | FiltersGetDefaultResponse
    | FiltersCreateOrReplace200Response
    | FiltersCreateOrReplace201Response
    | FiltersCreateOrReplaceDefaultResponse
    | IntegrationRuntimesListByAccount200Response
    | IntegrationRuntimesListByAccountDefaultResponse
    | IntegrationRuntimesGet200Response
    | IntegrationRuntimesGetDefaultResponse
    | IntegrationRuntimesDelete204Response
    | IntegrationRuntimesDeleteDefaultResponse
    | IntegrationRuntimesCreateOrReplace200Response
    | IntegrationRuntimesCreateOrReplace201Response
    | IntegrationRuntimesCreateOrReplaceDefaultResponse
    | IntegrationRuntimesStatus200Response
    | IntegrationRuntimesStatusDefaultResponse
    | IntegrationRuntimesListAuthKeys200Response
    | IntegrationRuntimesListAuthKeysDefaultResponse
    | IntegrationRuntimesRegenerateAuthKey200Response
    | IntegrationRuntimesRegenerateAuthKeyDefaultResponse
    | IntegrationRuntimesDisableInteractiveQuery202Response
    | IntegrationRuntimesDisableInteractiveQueryDefaultResponse
    | IntegrationRuntimesEnableInteractiveQuery202Response
    | IntegrationRuntimesEnableInteractiveQueryDefaultResponse
    | ManagedVirtualNetworksListByAccount200Response
    | ManagedVirtualNetworksListByAccountDefaultResponse
    | ManagedVirtualNetworksGet200Response
    | ManagedVirtualNetworksGetDefaultResponse
    | ManagedVirtualNetworksCreateOrReplace200Response
    | ManagedVirtualNetworksCreateOrReplace201Response
    | ManagedVirtualNetworksCreateOrReplaceDefaultResponse
    | ManagedPrivateEndpointsListByAccount200Response
    | ManagedPrivateEndpointsListByAccountDefaultResponse
    | ManagedPrivateEndpointsGet200Response
    | ManagedPrivateEndpointsGetDefaultResponse
    | ManagedPrivateEndpointsDelete204Response
    | ManagedPrivateEndpointsDeleteDefaultResponse
    | ManagedPrivateEndpointsCreateOrReplace200Response
    | ManagedPrivateEndpointsCreateOrReplace201Response
    | ManagedPrivateEndpointsCreateOrReplaceDefaultResponse
    | ScansCreateOrReplace200Response
    | ScansCreateOrReplace201Response
    | ScansCreateOrReplaceDefaultResponse
    | ScansGet200Response
    | ScansGetDefaultResponse
    | ScansDelete204Response
    | ScansDeleteDefaultResponse
    | ScansListByDataSource200Response
    | ScansListByDataSourceDefaultResponse
    | ScanResultGetScanStatus200Response
    | ScanResultGetScanStatusDefaultResponse
    | ScanResultRunScan202Response
    | ScanResultRunScanDefaultResponse
    | ScanResultCancelScan202Response
    | ScanResultCancelScanDefaultResponse
    | ScanResultListScanHistory200Response
    | ScanResultListScanHistoryDefaultResponse
    | ScanRulesetsGet200Response
    | ScanRulesetsGetDefaultResponse
    | ScanRulesetsCreateOrReplace200Response
    | ScanRulesetsCreateOrReplace201Response
    | ScanRulesetsCreateOrReplaceDefaultResponse
    | ScanRulesetsDelete204Response
    | ScanRulesetsDeleteDefaultResponse
    | ScanRulesetsList200Response
    | ScanRulesetsListDefaultResponse
    | SystemScanRulesetsList200Response
    | SystemScanRulesetsListDefaultResponse
    | SystemScanRulesetsGet200Response
    | SystemScanRulesetsGetDefaultResponse
    | SystemScanRulesetsGetByVersion200Response
    | SystemScanRulesetsGetByVersionDefaultResponse
    | SystemScanRulesetsGetLatest200Response
    | SystemScanRulesetsGetLatestDefaultResponse
    | SystemScanRulesetsListVersionsByDataSource200Response
    | SystemScanRulesetsListVersionsByDataSourceDefaultResponse
    | TriggersGet200Response
    | TriggersGetDefaultResponse
    | TriggersCreateOrReplace200Response
    | TriggersCreateOrReplace201Response
    | TriggersCreateOrReplaceDefaultResponse
    | TriggersDelete204Response
    | TriggersDeleteDefaultResponse
    | TriggersEnable200Response
    | TriggersEnableDefaultResponse
    | TriggersDisable200Response
    | TriggersDisableDefaultResponse,
): response is
  | KeyVaultConnectionsGetDefaultResponse
  | KeyVaultConnectionsCreateOrReplaceDefaultResponse
  | KeyVaultConnectionsDeleteDefaultResponse
  | KeyVaultConnectionsListDefaultResponse
  | ClassificationRulesGetDefaultResponse
  | ClassificationRulesCreateOrReplaceDefaultResponse
  | ClassificationRulesDeleteDefaultResponse
  | ClassificationRulesListDefaultResponse
  | ClassificationRulesListVersionsByRuleNameDefaultResponse
  | ClassificationRulesTagClassificationVersionDefaultResponse
  | CredentialGetDefaultResponse
  | CredentialCreateOrReplaceDefaultResponse
  | CredentialDeleteDefaultResponse
  | CredentialListDefaultResponse
  | DataSourcesCreateOrReplaceDefaultResponse
  | DataSourcesGetDefaultResponse
  | DataSourcesDeleteDefaultResponse
  | DataSourcesListDefaultResponse
  | FiltersGetDefaultResponse
  | FiltersCreateOrReplaceDefaultResponse
  | IntegrationRuntimesListByAccountDefaultResponse
  | IntegrationRuntimesGetDefaultResponse
  | IntegrationRuntimesDeleteDefaultResponse
  | IntegrationRuntimesCreateOrReplaceDefaultResponse
  | IntegrationRuntimesStatusDefaultResponse
  | IntegrationRuntimesListAuthKeysDefaultResponse
  | IntegrationRuntimesRegenerateAuthKeyDefaultResponse
  | IntegrationRuntimesDisableInteractiveQueryDefaultResponse
  | IntegrationRuntimesEnableInteractiveQueryDefaultResponse
  | ManagedVirtualNetworksListByAccountDefaultResponse
  | ManagedVirtualNetworksGetDefaultResponse
  | ManagedVirtualNetworksCreateOrReplaceDefaultResponse
  | ManagedPrivateEndpointsListByAccountDefaultResponse
  | ManagedPrivateEndpointsGetDefaultResponse
  | ManagedPrivateEndpointsDeleteDefaultResponse
  | ManagedPrivateEndpointsCreateOrReplaceDefaultResponse
  | ScansCreateOrReplaceDefaultResponse
  | ScansGetDefaultResponse
  | ScansDeleteDefaultResponse
  | ScansListByDataSourceDefaultResponse
  | ScanResultGetScanStatusDefaultResponse
  | ScanResultRunScanDefaultResponse
  | ScanResultCancelScanDefaultResponse
  | ScanResultListScanHistoryDefaultResponse
  | ScanRulesetsGetDefaultResponse
  | ScanRulesetsCreateOrReplaceDefaultResponse
  | ScanRulesetsDeleteDefaultResponse
  | ScanRulesetsListDefaultResponse
  | SystemScanRulesetsListDefaultResponse
  | SystemScanRulesetsGetDefaultResponse
  | SystemScanRulesetsGetByVersionDefaultResponse
  | SystemScanRulesetsGetLatestDefaultResponse
  | SystemScanRulesetsListVersionsByDataSourceDefaultResponse
  | TriggersGetDefaultResponse
  | TriggersCreateOrReplaceDefaultResponse
  | TriggersDeleteDefaultResponse
  | TriggersEnableDefaultResponse
  | TriggersDisableDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = getParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function getParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

  // Traverse list to match the longest candidate
  // matchedLen: the length of candidate path
  // matchedValue: the matched status code array
  let matchedLen = -1,
    matchedValue: string[] = [];

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    if (!key.startsWith(method)) {
      continue;
    }
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // track if we have found a match to return the values found.
    let found = true;
    for (let i = candidateParts.length - 1, j = pathParts.length - 1; i >= 1 && j >= 1; i--, j--) {
      if (candidateParts[i]?.startsWith("{") && candidateParts[i]?.indexOf("}") !== -1) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(`${candidateParts[i]?.slice(start, end)}`).test(
          pathParts[j] || "",
        );

        if (!isMatched) {
          found = false;
          break;
        }
        continue;
      }

      // If the candidate part is not a template and
      // the parts don't match mark the candidate as not found
      // to move on with the next candidate path.
      if (candidateParts[i] !== pathParts[j]) {
        found = false;
        break;
      }
    }

    // We finished evaluating the current candidate parts
    // Update the matched value if and only if we found the longer pattern
    if (found && candidatePath.length > matchedLen) {
      matchedLen = candidatePath.length;
      matchedValue = value;
    }
  }

  return matchedValue;
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
