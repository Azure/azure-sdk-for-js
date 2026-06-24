// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  ListAssetResource200Response,
  ListAssetResourceDefaultResponse,
  UpdateAssets200Response,
  UpdateAssetsDefaultResponse,
  GetAssetResource200Response,
  GetAssetResourceDefaultResponse,
  GetAssetsExport200Response,
  GetAssetsExportDefaultResponse,
  GetObservations200Response,
  GetObservationsDefaultResponse,
  GetDeltaDetails200Response,
  GetDeltaDetailsDefaultResponse,
  GetDeltaSummary200Response,
  GetDeltaSummaryDefaultResponse,
  ListDataConnection200Response,
  ListDataConnectionDefaultResponse,
  ValidateDataConnection200Response,
  ValidateDataConnectionDefaultResponse,
  GetDataConnection200Response,
  GetDataConnectionDefaultResponse,
  CreateOrReplaceDataConnection200Response,
  CreateOrReplaceDataConnectionDefaultResponse,
  DeleteDataConnection204Response,
  DeleteDataConnectionDefaultResponse,
  ListDiscoGroup200Response,
  ListDiscoGroupDefaultResponse,
  ValidateDiscoGroup200Response,
  ValidateDiscoGroupDefaultResponse,
  GetDiscoGroup200Response,
  GetDiscoGroupDefaultResponse,
  CreateOrReplaceDiscoGroup200Response,
  CreateOrReplaceDiscoGroupDefaultResponse,
  DeleteDiscoGroup204Response,
  DeleteDiscoGroupDefaultResponse,
  RunDiscoGroup204Response,
  RunDiscoGroupDefaultResponse,
  ListRuns200Response,
  ListRunsDefaultResponse,
  GetAssetChainSummary200Response,
  GetAssetChainSummaryDefaultResponse,
  DismissAssetChain200Response,
  DismissAssetChainDefaultResponse,
  ListDiscoTemplate200Response,
  ListDiscoTemplateDefaultResponse,
  GetDiscoTemplate200Response,
  GetDiscoTemplateDefaultResponse,
  GetBillable200Response,
  GetBillableDefaultResponse,
  GetSnapshot200Response,
  GetSnapshotDefaultResponse,
  GetSummary200Response,
  GetSummaryDefaultResponse,
  GetSnapshotExport200Response,
  GetSnapshotExportDefaultResponse,
  ListSavedFilter200Response,
  ListSavedFilterDefaultResponse,
  GetSavedFilter200Response,
  GetSavedFilterDefaultResponse,
  CreateOrReplaceSavedFilter200Response,
  CreateOrReplaceSavedFilterDefaultResponse,
  DeleteSavedFilter204Response,
  DeleteSavedFilterDefaultResponse,
  ListTask200Response,
  ListTaskDefaultResponse,
  GetTask200Response,
  GetTaskDefaultResponse,
  CancelTask200Response,
  CancelTaskDefaultResponse,
  RunTask200Response,
  RunTaskDefaultResponse,
  DownloadTask200Response,
  DownloadTaskDefaultResponse,
  GetCisaCves200Response,
  GetCisaCvesDefaultResponse,
  GetCisaCve200Response,
  GetCisaCveDefaultResponse,
  ListPolicy200Response,
  ListPolicyDefaultResponse,
  GetPolicy200Response,
  GetPolicyDefaultResponse,
  CreateOrReplacePolicy200Response,
  CreateOrReplacePolicyDefaultResponse,
  DeletePolicy204Response,
  DeletePolicyDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /assets": ["200"],
  "POST /assets": ["200"],
  "GET /assets/{assetId}": ["200"],
  "POST /assets:export": ["200"],
  "POST /assets/{assetId}:getObservations": ["200"],
  "POST /assets:getDeltaDetails": ["200"],
  "POST /assets:getDeltaSummary": ["200"],
  "GET /dataConnections": ["200"],
  "POST /dataConnections:validate": ["200"],
  "GET /dataConnections/{dataConnectionName}": ["200"],
  "PUT /dataConnections/{dataConnectionName}": ["200"],
  "DELETE /dataConnections/{dataConnectionName}": ["204"],
  "GET /discoGroups": ["200"],
  "POST /discoGroups:validate": ["200"],
  "GET /discoGroups/{groupName}": ["200"],
  "PUT /discoGroups/{groupName}": ["200"],
  "DELETE /discoGroups/{groupName}": ["204"],
  "POST /discoGroups/{groupName}:run": ["204"],
  "GET /discoGroups/{groupName}/runs": ["200"],
  "POST /discoGroups:getAssetChainSummary": ["200"],
  "POST /discoGroups:dismissAssetChain": ["200"],
  "GET /discoTemplates": ["200"],
  "GET /discoTemplates/{templateId}": ["200"],
  "POST /reports/assets:getBillable": ["200"],
  "POST /reports/assets:getSnapshot": ["200"],
  "POST /reports/assets:getSummary": ["200"],
  "POST /reports/assets:getSnapshotExport": ["200"],
  "GET /savedFilters": ["200"],
  "GET /savedFilters/{filterName}": ["200"],
  "PUT /savedFilters/{filterName}": ["200"],
  "DELETE /savedFilters/{filterName}": ["204"],
  "GET /tasks": ["200"],
  "GET /tasks/{taskId}": ["200"],
  "POST /tasks/{taskId}:cancel": ["200"],
  "POST /tasks/{taskId}:run": ["200"],
  "POST /tasks/{taskId}:download": ["200"],
  "GET /cisaCves": ["200"],
  "GET /cisaCves/{cveId}": ["200"],
  "GET /policies": ["200"],
  "GET /policies/{policyName}": ["200"],
  "PUT /policies/{policyName}": ["200"],
  "DELETE /policies/{policyName}": ["204"],
};

export function isUnexpected(
  response: ListAssetResource200Response | ListAssetResourceDefaultResponse,
): response is ListAssetResourceDefaultResponse;
export function isUnexpected(
  response: UpdateAssets200Response | UpdateAssetsDefaultResponse,
): response is UpdateAssetsDefaultResponse;
export function isUnexpected(
  response: GetAssetResource200Response | GetAssetResourceDefaultResponse,
): response is GetAssetResourceDefaultResponse;
export function isUnexpected(
  response: GetAssetsExport200Response | GetAssetsExportDefaultResponse,
): response is GetAssetsExportDefaultResponse;
export function isUnexpected(
  response: GetObservations200Response | GetObservationsDefaultResponse,
): response is GetObservationsDefaultResponse;
export function isUnexpected(
  response: GetDeltaDetails200Response | GetDeltaDetailsDefaultResponse,
): response is GetDeltaDetailsDefaultResponse;
export function isUnexpected(
  response: GetDeltaSummary200Response | GetDeltaSummaryDefaultResponse,
): response is GetDeltaSummaryDefaultResponse;
export function isUnexpected(
  response: ListDataConnection200Response | ListDataConnectionDefaultResponse,
): response is ListDataConnectionDefaultResponse;
export function isUnexpected(
  response: ValidateDataConnection200Response | ValidateDataConnectionDefaultResponse,
): response is ValidateDataConnectionDefaultResponse;
export function isUnexpected(
  response: GetDataConnection200Response | GetDataConnectionDefaultResponse,
): response is GetDataConnectionDefaultResponse;
export function isUnexpected(
  response: CreateOrReplaceDataConnection200Response | CreateOrReplaceDataConnectionDefaultResponse,
): response is CreateOrReplaceDataConnectionDefaultResponse;
export function isUnexpected(
  response: DeleteDataConnection204Response | DeleteDataConnectionDefaultResponse,
): response is DeleteDataConnectionDefaultResponse;
export function isUnexpected(
  response: ListDiscoGroup200Response | ListDiscoGroupDefaultResponse,
): response is ListDiscoGroupDefaultResponse;
export function isUnexpected(
  response: ValidateDiscoGroup200Response | ValidateDiscoGroupDefaultResponse,
): response is ValidateDiscoGroupDefaultResponse;
export function isUnexpected(
  response: GetDiscoGroup200Response | GetDiscoGroupDefaultResponse,
): response is GetDiscoGroupDefaultResponse;
export function isUnexpected(
  response: CreateOrReplaceDiscoGroup200Response | CreateOrReplaceDiscoGroupDefaultResponse,
): response is CreateOrReplaceDiscoGroupDefaultResponse;
export function isUnexpected(
  response: DeleteDiscoGroup204Response | DeleteDiscoGroupDefaultResponse,
): response is DeleteDiscoGroupDefaultResponse;
export function isUnexpected(
  response: RunDiscoGroup204Response | RunDiscoGroupDefaultResponse,
): response is RunDiscoGroupDefaultResponse;
export function isUnexpected(
  response: ListRuns200Response | ListRunsDefaultResponse,
): response is ListRunsDefaultResponse;
export function isUnexpected(
  response: GetAssetChainSummary200Response | GetAssetChainSummaryDefaultResponse,
): response is GetAssetChainSummaryDefaultResponse;
export function isUnexpected(
  response: DismissAssetChain200Response | DismissAssetChainDefaultResponse,
): response is DismissAssetChainDefaultResponse;
export function isUnexpected(
  response: ListDiscoTemplate200Response | ListDiscoTemplateDefaultResponse,
): response is ListDiscoTemplateDefaultResponse;
export function isUnexpected(
  response: GetDiscoTemplate200Response | GetDiscoTemplateDefaultResponse,
): response is GetDiscoTemplateDefaultResponse;
export function isUnexpected(
  response: GetBillable200Response | GetBillableDefaultResponse,
): response is GetBillableDefaultResponse;
export function isUnexpected(
  response: GetSnapshot200Response | GetSnapshotDefaultResponse,
): response is GetSnapshotDefaultResponse;
export function isUnexpected(
  response: GetSummary200Response | GetSummaryDefaultResponse,
): response is GetSummaryDefaultResponse;
export function isUnexpected(
  response: GetSnapshotExport200Response | GetSnapshotExportDefaultResponse,
): response is GetSnapshotExportDefaultResponse;
export function isUnexpected(
  response: ListSavedFilter200Response | ListSavedFilterDefaultResponse,
): response is ListSavedFilterDefaultResponse;
export function isUnexpected(
  response: GetSavedFilter200Response | GetSavedFilterDefaultResponse,
): response is GetSavedFilterDefaultResponse;
export function isUnexpected(
  response: CreateOrReplaceSavedFilter200Response | CreateOrReplaceSavedFilterDefaultResponse,
): response is CreateOrReplaceSavedFilterDefaultResponse;
export function isUnexpected(
  response: DeleteSavedFilter204Response | DeleteSavedFilterDefaultResponse,
): response is DeleteSavedFilterDefaultResponse;
export function isUnexpected(
  response: ListTask200Response | ListTaskDefaultResponse,
): response is ListTaskDefaultResponse;
export function isUnexpected(
  response: GetTask200Response | GetTaskDefaultResponse,
): response is GetTaskDefaultResponse;
export function isUnexpected(
  response: CancelTask200Response | CancelTaskDefaultResponse,
): response is CancelTaskDefaultResponse;
export function isUnexpected(
  response: RunTask200Response | RunTaskDefaultResponse,
): response is RunTaskDefaultResponse;
export function isUnexpected(
  response: DownloadTask200Response | DownloadTaskDefaultResponse,
): response is DownloadTaskDefaultResponse;
export function isUnexpected(
  response: GetCisaCves200Response | GetCisaCvesDefaultResponse,
): response is GetCisaCvesDefaultResponse;
export function isUnexpected(
  response: GetCisaCve200Response | GetCisaCveDefaultResponse,
): response is GetCisaCveDefaultResponse;
export function isUnexpected(
  response: ListPolicy200Response | ListPolicyDefaultResponse,
): response is ListPolicyDefaultResponse;
export function isUnexpected(
  response: GetPolicy200Response | GetPolicyDefaultResponse,
): response is GetPolicyDefaultResponse;
export function isUnexpected(
  response: CreateOrReplacePolicy200Response | CreateOrReplacePolicyDefaultResponse,
): response is CreateOrReplacePolicyDefaultResponse;
export function isUnexpected(
  response: DeletePolicy204Response | DeletePolicyDefaultResponse,
): response is DeletePolicyDefaultResponse;
export function isUnexpected(
  response:
    | ListAssetResource200Response
    | ListAssetResourceDefaultResponse
    | UpdateAssets200Response
    | UpdateAssetsDefaultResponse
    | GetAssetResource200Response
    | GetAssetResourceDefaultResponse
    | GetAssetsExport200Response
    | GetAssetsExportDefaultResponse
    | GetObservations200Response
    | GetObservationsDefaultResponse
    | GetDeltaDetails200Response
    | GetDeltaDetailsDefaultResponse
    | GetDeltaSummary200Response
    | GetDeltaSummaryDefaultResponse
    | ListDataConnection200Response
    | ListDataConnectionDefaultResponse
    | ValidateDataConnection200Response
    | ValidateDataConnectionDefaultResponse
    | GetDataConnection200Response
    | GetDataConnectionDefaultResponse
    | CreateOrReplaceDataConnection200Response
    | CreateOrReplaceDataConnectionDefaultResponse
    | DeleteDataConnection204Response
    | DeleteDataConnectionDefaultResponse
    | ListDiscoGroup200Response
    | ListDiscoGroupDefaultResponse
    | ValidateDiscoGroup200Response
    | ValidateDiscoGroupDefaultResponse
    | GetDiscoGroup200Response
    | GetDiscoGroupDefaultResponse
    | CreateOrReplaceDiscoGroup200Response
    | CreateOrReplaceDiscoGroupDefaultResponse
    | DeleteDiscoGroup204Response
    | DeleteDiscoGroupDefaultResponse
    | RunDiscoGroup204Response
    | RunDiscoGroupDefaultResponse
    | ListRuns200Response
    | ListRunsDefaultResponse
    | GetAssetChainSummary200Response
    | GetAssetChainSummaryDefaultResponse
    | DismissAssetChain200Response
    | DismissAssetChainDefaultResponse
    | ListDiscoTemplate200Response
    | ListDiscoTemplateDefaultResponse
    | GetDiscoTemplate200Response
    | GetDiscoTemplateDefaultResponse
    | GetBillable200Response
    | GetBillableDefaultResponse
    | GetSnapshot200Response
    | GetSnapshotDefaultResponse
    | GetSummary200Response
    | GetSummaryDefaultResponse
    | GetSnapshotExport200Response
    | GetSnapshotExportDefaultResponse
    | ListSavedFilter200Response
    | ListSavedFilterDefaultResponse
    | GetSavedFilter200Response
    | GetSavedFilterDefaultResponse
    | CreateOrReplaceSavedFilter200Response
    | CreateOrReplaceSavedFilterDefaultResponse
    | DeleteSavedFilter204Response
    | DeleteSavedFilterDefaultResponse
    | ListTask200Response
    | ListTaskDefaultResponse
    | GetTask200Response
    | GetTaskDefaultResponse
    | CancelTask200Response
    | CancelTaskDefaultResponse
    | RunTask200Response
    | RunTaskDefaultResponse
    | DownloadTask200Response
    | DownloadTaskDefaultResponse
    | GetCisaCves200Response
    | GetCisaCvesDefaultResponse
    | GetCisaCve200Response
    | GetCisaCveDefaultResponse
    | ListPolicy200Response
    | ListPolicyDefaultResponse
    | GetPolicy200Response
    | GetPolicyDefaultResponse
    | CreateOrReplacePolicy200Response
    | CreateOrReplacePolicyDefaultResponse
    | DeletePolicy204Response
    | DeletePolicyDefaultResponse,
): response is
  | ListAssetResourceDefaultResponse
  | UpdateAssetsDefaultResponse
  | GetAssetResourceDefaultResponse
  | GetAssetsExportDefaultResponse
  | GetObservationsDefaultResponse
  | GetDeltaDetailsDefaultResponse
  | GetDeltaSummaryDefaultResponse
  | ListDataConnectionDefaultResponse
  | ValidateDataConnectionDefaultResponse
  | GetDataConnectionDefaultResponse
  | CreateOrReplaceDataConnectionDefaultResponse
  | DeleteDataConnectionDefaultResponse
  | ListDiscoGroupDefaultResponse
  | ValidateDiscoGroupDefaultResponse
  | GetDiscoGroupDefaultResponse
  | CreateOrReplaceDiscoGroupDefaultResponse
  | DeleteDiscoGroupDefaultResponse
  | RunDiscoGroupDefaultResponse
  | ListRunsDefaultResponse
  | GetAssetChainSummaryDefaultResponse
  | DismissAssetChainDefaultResponse
  | ListDiscoTemplateDefaultResponse
  | GetDiscoTemplateDefaultResponse
  | GetBillableDefaultResponse
  | GetSnapshotDefaultResponse
  | GetSummaryDefaultResponse
  | GetSnapshotExportDefaultResponse
  | ListSavedFilterDefaultResponse
  | GetSavedFilterDefaultResponse
  | CreateOrReplaceSavedFilterDefaultResponse
  | DeleteSavedFilterDefaultResponse
  | ListTaskDefaultResponse
  | GetTaskDefaultResponse
  | CancelTaskDefaultResponse
  | RunTaskDefaultResponse
  | DownloadTaskDefaultResponse
  | GetCisaCvesDefaultResponse
  | GetCisaCveDefaultResponse
  | ListPolicyDefaultResponse
  | GetPolicyDefaultResponse
  | CreateOrReplacePolicyDefaultResponse
  | DeletePolicyDefaultResponse {
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
