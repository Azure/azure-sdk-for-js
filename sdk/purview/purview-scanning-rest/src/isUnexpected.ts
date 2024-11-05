// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  KeyVaultConnectionsGet200Response,
  KeyVaultConnectionsGetDefaultResponse,
  KeyVaultConnectionsCreate200Response,
  KeyVaultConnectionsCreateDefaultResponse,
  KeyVaultConnectionsDelete200Response,
  KeyVaultConnectionsDelete204Response,
  KeyVaultConnectionsDeleteDefaultResponse,
  KeyVaultConnectionsListAll200Response,
  KeyVaultConnectionsListAllDefaultResponse,
  ClassificationRulesGet200Response,
  ClassificationRulesGetDefaultResponse,
  ClassificationRulesCreateOrUpdate200Response,
  ClassificationRulesCreateOrUpdate201Response,
  ClassificationRulesCreateOrUpdateDefaultResponse,
  ClassificationRulesDelete200Response,
  ClassificationRulesDelete204Response,
  ClassificationRulesDeleteDefaultResponse,
  ClassificationRulesListAll200Response,
  ClassificationRulesListAllDefaultResponse,
  ClassificationRulesListVersionsByClassificationRuleName200Response,
  ClassificationRulesListVersionsByClassificationRuleNameDefaultResponse,
  ClassificationRulesTagClassificationVersion202Response,
  ClassificationRulesTagClassificationVersionDefaultResponse,
  DataSourcesCreateOrUpdate200Response,
  DataSourcesCreateOrUpdate201Response,
  DataSourcesCreateOrUpdateDefaultResponse,
  DataSourcesGet200Response,
  DataSourcesGetDefaultResponse,
  DataSourcesDelete200Response,
  DataSourcesDelete204Response,
  DataSourcesDeleteDefaultResponse,
  DataSourcesListAll200Response,
  DataSourcesListAllDefaultResponse,
  FiltersGet200Response,
  FiltersGetDefaultResponse,
  FiltersCreateOrUpdate200Response,
  FiltersCreateOrUpdate201Response,
  FiltersCreateOrUpdateDefaultResponse,
  ScansCreateOrUpdate200Response,
  ScansCreateOrUpdate201Response,
  ScansCreateOrUpdateDefaultResponse,
  ScansGet200Response,
  ScansGetDefaultResponse,
  ScansDelete200Response,
  ScansDelete204Response,
  ScansDeleteDefaultResponse,
  ScansListByDataSource200Response,
  ScansListByDataSourceDefaultResponse,
  ScanResultRunScan202Response,
  ScanResultRunScanDefaultResponse,
  ScanResultCancelScan202Response,
  ScanResultCancelScanDefaultResponse,
  ScanResultListScanHistory200Response,
  ScanResultListScanHistoryDefaultResponse,
  ScanRulesetsGet200Response,
  ScanRulesetsGetDefaultResponse,
  ScanRulesetsCreateOrUpdate200Response,
  ScanRulesetsCreateOrUpdate201Response,
  ScanRulesetsCreateOrUpdateDefaultResponse,
  ScanRulesetsDelete200Response,
  ScanRulesetsDelete204Response,
  ScanRulesetsDeleteDefaultResponse,
  ScanRulesetsListAll200Response,
  ScanRulesetsListAllDefaultResponse,
  SystemScanRulesetsListAll200Response,
  SystemScanRulesetsListAllDefaultResponse,
  SystemScanRulesetsGet200Response,
  SystemScanRulesetsGetDefaultResponse,
  SystemScanRulesetsGetByVersion200Response,
  SystemScanRulesetsGetByVersionDefaultResponse,
  SystemScanRulesetsGetLatest200Response,
  SystemScanRulesetsGetLatestDefaultResponse,
  SystemScanRulesetsListVersionsByDataSource200Response,
  SystemScanRulesetsListVersionsByDataSourceDefaultResponse,
  TriggersGetTrigger200Response,
  TriggersGetTriggerDefaultResponse,
  TriggersCreateTrigger200Response,
  TriggersCreateTrigger201Response,
  TriggersCreateTriggerDefaultResponse,
  TriggersDeleteTrigger200Response,
  TriggersDeleteTrigger204Response,
  TriggersDeleteTriggerDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /azureKeyVaults/{keyVaultName}": ["200"],
  "PUT /azureKeyVaults/{keyVaultName}": ["200"],
  "DELETE /azureKeyVaults/{keyVaultName}": ["200", "204"],
  "GET /azureKeyVaults": ["200"],
  "GET /classificationrules/{classificationRuleName}": ["200"],
  "PUT /classificationrules/{classificationRuleName}": ["200", "201"],
  "DELETE /classificationrules/{classificationRuleName}": ["200", "204"],
  "GET /classificationrules": ["200"],
  "GET /classificationrules/{classificationRuleName}/versions": ["200"],
  "POST /classificationrules/{classificationRuleName}/versions/{classificationRuleVersion}/:tag": [
    "202",
  ],
  "PUT /datasources/{dataSourceName}": ["200", "201"],
  "GET /datasources/{dataSourceName}": ["200"],
  "DELETE /datasources/{dataSourceName}": ["200", "204"],
  "GET /datasources": ["200"],
  "GET /datasources/{dataSourceName}/scans/{scanName}/filters/custom": ["200"],
  "PUT /datasources/{dataSourceName}/scans/{scanName}/filters/custom": ["200", "201"],
  "PUT /datasources/{dataSourceName}/scans/{scanName}": ["200", "201"],
  "GET /datasources/{dataSourceName}/scans/{scanName}": ["200"],
  "DELETE /datasources/{dataSourceName}/scans/{scanName}": ["200", "204"],
  "GET /datasources/{dataSourceName}/scans": ["200"],
  "PUT /datasources/{dataSourceName}/scans/{scanName}/runs/{runId}": ["202"],
  "POST /datasources/{dataSourceName}/scans/{scanName}/runs/{runId}/:cancel": ["202"],
  "GET /datasources/{dataSourceName}/scans/{scanName}/runs": ["200"],
  "GET /scanrulesets/{scanRulesetName}": ["200"],
  "PUT /scanrulesets/{scanRulesetName}": ["200", "201"],
  "DELETE /scanrulesets/{scanRulesetName}": ["200", "204"],
  "GET /scanrulesets": ["200"],
  "GET /systemScanRulesets": ["200"],
  "GET /systemScanRulesets/datasources/{dataSourceType}": ["200"],
  "GET /systemScanRulesets/versions/{version}": ["200"],
  "GET /systemScanRulesets/versions/latest": ["200"],
  "GET /systemScanRulesets/versions": ["200"],
  "GET /datasources/{dataSourceName}/scans/{scanName}/triggers/default": ["200"],
  "PUT /datasources/{dataSourceName}/scans/{scanName}/triggers/default": ["200", "201"],
  "DELETE /datasources/{dataSourceName}/scans/{scanName}/triggers/default": ["200", "204"],
};

export function isUnexpected(
  response: KeyVaultConnectionsGet200Response | KeyVaultConnectionsGetDefaultResponse,
): response is KeyVaultConnectionsGetDefaultResponse;
export function isUnexpected(
  response: KeyVaultConnectionsCreate200Response | KeyVaultConnectionsCreateDefaultResponse,
): response is KeyVaultConnectionsCreateDefaultResponse;
export function isUnexpected(
  response:
    | KeyVaultConnectionsDelete200Response
    | KeyVaultConnectionsDelete204Response
    | KeyVaultConnectionsDeleteDefaultResponse,
): response is KeyVaultConnectionsDeleteDefaultResponse;
export function isUnexpected(
  response: KeyVaultConnectionsListAll200Response | KeyVaultConnectionsListAllDefaultResponse,
): response is KeyVaultConnectionsListAllDefaultResponse;
export function isUnexpected(
  response: ClassificationRulesGet200Response | ClassificationRulesGetDefaultResponse,
): response is ClassificationRulesGetDefaultResponse;
export function isUnexpected(
  response:
    | ClassificationRulesCreateOrUpdate200Response
    | ClassificationRulesCreateOrUpdate201Response
    | ClassificationRulesCreateOrUpdateDefaultResponse,
): response is ClassificationRulesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | ClassificationRulesDelete200Response
    | ClassificationRulesDelete204Response
    | ClassificationRulesDeleteDefaultResponse,
): response is ClassificationRulesDeleteDefaultResponse;
export function isUnexpected(
  response: ClassificationRulesListAll200Response | ClassificationRulesListAllDefaultResponse,
): response is ClassificationRulesListAllDefaultResponse;
export function isUnexpected(
  response:
    | ClassificationRulesListVersionsByClassificationRuleName200Response
    | ClassificationRulesListVersionsByClassificationRuleNameDefaultResponse,
): response is ClassificationRulesListVersionsByClassificationRuleNameDefaultResponse;
export function isUnexpected(
  response:
    | ClassificationRulesTagClassificationVersion202Response
    | ClassificationRulesTagClassificationVersionDefaultResponse,
): response is ClassificationRulesTagClassificationVersionDefaultResponse;
export function isUnexpected(
  response:
    | DataSourcesCreateOrUpdate200Response
    | DataSourcesCreateOrUpdate201Response
    | DataSourcesCreateOrUpdateDefaultResponse,
): response is DataSourcesCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: DataSourcesGet200Response | DataSourcesGetDefaultResponse,
): response is DataSourcesGetDefaultResponse;
export function isUnexpected(
  response:
    | DataSourcesDelete200Response
    | DataSourcesDelete204Response
    | DataSourcesDeleteDefaultResponse,
): response is DataSourcesDeleteDefaultResponse;
export function isUnexpected(
  response: DataSourcesListAll200Response | DataSourcesListAllDefaultResponse,
): response is DataSourcesListAllDefaultResponse;
export function isUnexpected(
  response: FiltersGet200Response | FiltersGetDefaultResponse,
): response is FiltersGetDefaultResponse;
export function isUnexpected(
  response:
    | FiltersCreateOrUpdate200Response
    | FiltersCreateOrUpdate201Response
    | FiltersCreateOrUpdateDefaultResponse,
): response is FiltersCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | ScansCreateOrUpdate200Response
    | ScansCreateOrUpdate201Response
    | ScansCreateOrUpdateDefaultResponse,
): response is ScansCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response: ScansGet200Response | ScansGetDefaultResponse,
): response is ScansGetDefaultResponse;
export function isUnexpected(
  response: ScansDelete200Response | ScansDelete204Response | ScansDeleteDefaultResponse,
): response is ScansDeleteDefaultResponse;
export function isUnexpected(
  response: ScansListByDataSource200Response | ScansListByDataSourceDefaultResponse,
): response is ScansListByDataSourceDefaultResponse;
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
    | ScanRulesetsCreateOrUpdate200Response
    | ScanRulesetsCreateOrUpdate201Response
    | ScanRulesetsCreateOrUpdateDefaultResponse,
): response is ScanRulesetsCreateOrUpdateDefaultResponse;
export function isUnexpected(
  response:
    | ScanRulesetsDelete200Response
    | ScanRulesetsDelete204Response
    | ScanRulesetsDeleteDefaultResponse,
): response is ScanRulesetsDeleteDefaultResponse;
export function isUnexpected(
  response: ScanRulesetsListAll200Response | ScanRulesetsListAllDefaultResponse,
): response is ScanRulesetsListAllDefaultResponse;
export function isUnexpected(
  response: SystemScanRulesetsListAll200Response | SystemScanRulesetsListAllDefaultResponse,
): response is SystemScanRulesetsListAllDefaultResponse;
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
  response: TriggersGetTrigger200Response | TriggersGetTriggerDefaultResponse,
): response is TriggersGetTriggerDefaultResponse;
export function isUnexpected(
  response:
    | TriggersCreateTrigger200Response
    | TriggersCreateTrigger201Response
    | TriggersCreateTriggerDefaultResponse,
): response is TriggersCreateTriggerDefaultResponse;
export function isUnexpected(
  response:
    | TriggersDeleteTrigger200Response
    | TriggersDeleteTrigger204Response
    | TriggersDeleteTriggerDefaultResponse,
): response is TriggersDeleteTriggerDefaultResponse;
export function isUnexpected(
  response:
    | KeyVaultConnectionsGet200Response
    | KeyVaultConnectionsGetDefaultResponse
    | KeyVaultConnectionsCreate200Response
    | KeyVaultConnectionsCreateDefaultResponse
    | KeyVaultConnectionsDelete200Response
    | KeyVaultConnectionsDelete204Response
    | KeyVaultConnectionsDeleteDefaultResponse
    | KeyVaultConnectionsListAll200Response
    | KeyVaultConnectionsListAllDefaultResponse
    | ClassificationRulesGet200Response
    | ClassificationRulesGetDefaultResponse
    | ClassificationRulesCreateOrUpdate200Response
    | ClassificationRulesCreateOrUpdate201Response
    | ClassificationRulesCreateOrUpdateDefaultResponse
    | ClassificationRulesDelete200Response
    | ClassificationRulesDelete204Response
    | ClassificationRulesDeleteDefaultResponse
    | ClassificationRulesListAll200Response
    | ClassificationRulesListAllDefaultResponse
    | ClassificationRulesListVersionsByClassificationRuleName200Response
    | ClassificationRulesListVersionsByClassificationRuleNameDefaultResponse
    | ClassificationRulesTagClassificationVersion202Response
    | ClassificationRulesTagClassificationVersionDefaultResponse
    | DataSourcesCreateOrUpdate200Response
    | DataSourcesCreateOrUpdate201Response
    | DataSourcesCreateOrUpdateDefaultResponse
    | DataSourcesGet200Response
    | DataSourcesGetDefaultResponse
    | DataSourcesDelete200Response
    | DataSourcesDelete204Response
    | DataSourcesDeleteDefaultResponse
    | DataSourcesListAll200Response
    | DataSourcesListAllDefaultResponse
    | FiltersGet200Response
    | FiltersGetDefaultResponse
    | FiltersCreateOrUpdate200Response
    | FiltersCreateOrUpdate201Response
    | FiltersCreateOrUpdateDefaultResponse
    | ScansCreateOrUpdate200Response
    | ScansCreateOrUpdate201Response
    | ScansCreateOrUpdateDefaultResponse
    | ScansGet200Response
    | ScansGetDefaultResponse
    | ScansDelete200Response
    | ScansDelete204Response
    | ScansDeleteDefaultResponse
    | ScansListByDataSource200Response
    | ScansListByDataSourceDefaultResponse
    | ScanResultRunScan202Response
    | ScanResultRunScanDefaultResponse
    | ScanResultCancelScan202Response
    | ScanResultCancelScanDefaultResponse
    | ScanResultListScanHistory200Response
    | ScanResultListScanHistoryDefaultResponse
    | ScanRulesetsGet200Response
    | ScanRulesetsGetDefaultResponse
    | ScanRulesetsCreateOrUpdate200Response
    | ScanRulesetsCreateOrUpdate201Response
    | ScanRulesetsCreateOrUpdateDefaultResponse
    | ScanRulesetsDelete200Response
    | ScanRulesetsDelete204Response
    | ScanRulesetsDeleteDefaultResponse
    | ScanRulesetsListAll200Response
    | ScanRulesetsListAllDefaultResponse
    | SystemScanRulesetsListAll200Response
    | SystemScanRulesetsListAllDefaultResponse
    | SystemScanRulesetsGet200Response
    | SystemScanRulesetsGetDefaultResponse
    | SystemScanRulesetsGetByVersion200Response
    | SystemScanRulesetsGetByVersionDefaultResponse
    | SystemScanRulesetsGetLatest200Response
    | SystemScanRulesetsGetLatestDefaultResponse
    | SystemScanRulesetsListVersionsByDataSource200Response
    | SystemScanRulesetsListVersionsByDataSourceDefaultResponse
    | TriggersGetTrigger200Response
    | TriggersGetTriggerDefaultResponse
    | TriggersCreateTrigger200Response
    | TriggersCreateTrigger201Response
    | TriggersCreateTriggerDefaultResponse
    | TriggersDeleteTrigger200Response
    | TriggersDeleteTrigger204Response
    | TriggersDeleteTriggerDefaultResponse,
): response is
  | KeyVaultConnectionsGetDefaultResponse
  | KeyVaultConnectionsCreateDefaultResponse
  | KeyVaultConnectionsDeleteDefaultResponse
  | KeyVaultConnectionsListAllDefaultResponse
  | ClassificationRulesGetDefaultResponse
  | ClassificationRulesCreateOrUpdateDefaultResponse
  | ClassificationRulesDeleteDefaultResponse
  | ClassificationRulesListAllDefaultResponse
  | ClassificationRulesListVersionsByClassificationRuleNameDefaultResponse
  | ClassificationRulesTagClassificationVersionDefaultResponse
  | DataSourcesCreateOrUpdateDefaultResponse
  | DataSourcesGetDefaultResponse
  | DataSourcesDeleteDefaultResponse
  | DataSourcesListAllDefaultResponse
  | FiltersGetDefaultResponse
  | FiltersCreateOrUpdateDefaultResponse
  | ScansCreateOrUpdateDefaultResponse
  | ScansGetDefaultResponse
  | ScansDeleteDefaultResponse
  | ScansListByDataSourceDefaultResponse
  | ScanResultRunScanDefaultResponse
  | ScanResultCancelScanDefaultResponse
  | ScanResultListScanHistoryDefaultResponse
  | ScanRulesetsGetDefaultResponse
  | ScanRulesetsCreateOrUpdateDefaultResponse
  | ScanRulesetsDeleteDefaultResponse
  | ScanRulesetsListAllDefaultResponse
  | SystemScanRulesetsListAllDefaultResponse
  | SystemScanRulesetsGetDefaultResponse
  | SystemScanRulesetsGetByVersionDefaultResponse
  | SystemScanRulesetsGetLatestDefaultResponse
  | SystemScanRulesetsListVersionsByDataSourceDefaultResponse
  | TriggersGetTriggerDefaultResponse
  | TriggersCreateTriggerDefaultResponse
  | TriggersDeleteTriggerDefaultResponse {
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
