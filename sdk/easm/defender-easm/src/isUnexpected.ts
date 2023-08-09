// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  ListAssetResource200Response,
  ListAssetResourceDefaultResponse,
  UpdateAssets200Response,
  UpdateAssetsDefaultResponse,
  GetAssetResource200Response,
  GetAssetResourceDefaultResponse,
  ListDataConnection200Response,
  ListDataConnectionDefaultResponse,
  ValidateDataConnection200Response,
  ValidateDataConnectionDefaultResponse,
  GetDataConnection200Response,
  GetDataConnectionDefaultResponse,
  PutDataConnection200Response,
  PutDataConnectionDefaultResponse,
  DeleteDataConnection204Response,
  DeleteDataConnectionDefaultResponse,
  ListDiscoGroup200Response,
  ListDiscoGroupDefaultResponse,
  ValidateDiscoGroup200Response,
  ValidateDiscoGroupDefaultResponse,
  GetDiscoGroup200Response,
  GetDiscoGroupDefaultResponse,
  PutDiscoGroup200Response,
  PutDiscoGroupDefaultResponse,
  RunDiscoGroup204Response,
  RunDiscoGroupDefaultResponse,
  ListRuns200Response,
  ListRunsDefaultResponse,
  ListDiscoTemplate200Response,
  ListDiscoTemplateDefaultResponse,
  GetDiscoTemplate200Response,
  GetDiscoTemplateDefaultResponse,
  GetBillableReports200Response,
  GetBillableReportsDefaultResponse,
  GetSnapshotReports200Response,
  GetSnapshotReportsDefaultResponse,
  GetSummaryReports200Response,
  GetSummaryReportsDefaultResponse,
  ListSavedFilter200Response,
  ListSavedFilterDefaultResponse,
  GetSavedFilter200Response,
  GetSavedFilterDefaultResponse,
  PutSavedFilter200Response,
  PutSavedFilterDefaultResponse,
  DeleteSavedFilter204Response,
  DeleteSavedFilterDefaultResponse,
  ListTask200Response,
  ListTaskDefaultResponse,
  GetTask200Response,
  GetTaskDefaultResponse,
  CancelTask200Response,
  CancelTaskDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /assets": ["200"],
  "POST /assets": ["200"],
  "GET /assets/{assetId}": ["200"],
  "GET /dataConnections": ["200"],
  "POST /dataConnections:validate": ["200"],
  "GET /dataConnections/{dataConnectionName}": ["200"],
  "PUT /dataConnections/{dataConnectionName}": ["200"],
  "DELETE /dataConnections/{dataConnectionName}": ["204"],
  "GET /discoGroups": ["200"],
  "POST /discoGroups:validate": ["200"],
  "GET /discoGroups/{groupName}": ["200"],
  "PUT /discoGroups/{groupName}": ["200"],
  "POST /discoGroups/{groupName}:run": ["204"],
  "GET /discoGroups/{groupName}/runs": ["200"],
  "GET /discoTemplates": ["200"],
  "GET /discoTemplates/{templateId}": ["200"],
  "POST /reports/assets:getBillable": ["200"],
  "POST /reports/assets:getSnapshot": ["200"],
  "POST /reports/assets:getSummary": ["200"],
  "GET /savedFilters": ["200"],
  "GET /savedFilters/{filterName}": ["200"],
  "PUT /savedFilters/{filterName}": ["200"],
  "DELETE /savedFilters/{filterName}": ["204"],
  "GET /tasks": ["200"],
  "GET /tasks/{taskId}": ["200"],
  "POST /tasks/{taskId}:cancel": ["200"],
};

export function isUnexpected(
  response: ListAssetResource200Response | ListAssetResourceDefaultResponse
): response is ListAssetResourceDefaultResponse;
export function isUnexpected(
  response: UpdateAssets200Response | UpdateAssetsDefaultResponse
): response is UpdateAssetsDefaultResponse;
export function isUnexpected(
  response: GetAssetResource200Response | GetAssetResourceDefaultResponse
): response is GetAssetResourceDefaultResponse;
export function isUnexpected(
  response: ListDataConnection200Response | ListDataConnectionDefaultResponse
): response is ListDataConnectionDefaultResponse;
export function isUnexpected(
  response:
    | ValidateDataConnection200Response
    | ValidateDataConnectionDefaultResponse
): response is ValidateDataConnectionDefaultResponse;
export function isUnexpected(
  response: GetDataConnection200Response | GetDataConnectionDefaultResponse
): response is GetDataConnectionDefaultResponse;
export function isUnexpected(
  response: PutDataConnection200Response | PutDataConnectionDefaultResponse
): response is PutDataConnectionDefaultResponse;
export function isUnexpected(
  response:
    | DeleteDataConnection204Response
    | DeleteDataConnectionDefaultResponse
): response is DeleteDataConnectionDefaultResponse;
export function isUnexpected(
  response: ListDiscoGroup200Response | ListDiscoGroupDefaultResponse
): response is ListDiscoGroupDefaultResponse;
export function isUnexpected(
  response: ValidateDiscoGroup200Response | ValidateDiscoGroupDefaultResponse
): response is ValidateDiscoGroupDefaultResponse;
export function isUnexpected(
  response: GetDiscoGroup200Response | GetDiscoGroupDefaultResponse
): response is GetDiscoGroupDefaultResponse;
export function isUnexpected(
  response: PutDiscoGroup200Response | PutDiscoGroupDefaultResponse
): response is PutDiscoGroupDefaultResponse;
export function isUnexpected(
  response: RunDiscoGroup204Response | RunDiscoGroupDefaultResponse
): response is RunDiscoGroupDefaultResponse;
export function isUnexpected(
  response: ListRuns200Response | ListRunsDefaultResponse
): response is ListRunsDefaultResponse;
export function isUnexpected(
  response: ListDiscoTemplate200Response | ListDiscoTemplateDefaultResponse
): response is ListDiscoTemplateDefaultResponse;
export function isUnexpected(
  response: GetDiscoTemplate200Response | GetDiscoTemplateDefaultResponse
): response is GetDiscoTemplateDefaultResponse;
export function isUnexpected(
  response: GetBillableReports200Response | GetBillableReportsDefaultResponse
): response is GetBillableReportsDefaultResponse;
export function isUnexpected(
  response: GetSnapshotReports200Response | GetSnapshotReportsDefaultResponse
): response is GetSnapshotReportsDefaultResponse;
export function isUnexpected(
  response: GetSummaryReports200Response | GetSummaryReportsDefaultResponse
): response is GetSummaryReportsDefaultResponse;
export function isUnexpected(
  response: ListSavedFilter200Response | ListSavedFilterDefaultResponse
): response is ListSavedFilterDefaultResponse;
export function isUnexpected(
  response: GetSavedFilter200Response | GetSavedFilterDefaultResponse
): response is GetSavedFilterDefaultResponse;
export function isUnexpected(
  response: PutSavedFilter200Response | PutSavedFilterDefaultResponse
): response is PutSavedFilterDefaultResponse;
export function isUnexpected(
  response: DeleteSavedFilter204Response | DeleteSavedFilterDefaultResponse
): response is DeleteSavedFilterDefaultResponse;
export function isUnexpected(
  response: ListTask200Response | ListTaskDefaultResponse
): response is ListTaskDefaultResponse;
export function isUnexpected(
  response: GetTask200Response | GetTaskDefaultResponse
): response is GetTaskDefaultResponse;
export function isUnexpected(
  response: CancelTask200Response | CancelTaskDefaultResponse
): response is CancelTaskDefaultResponse;
export function isUnexpected(
  response:
    | ListAssetResource200Response
    | ListAssetResourceDefaultResponse
    | UpdateAssets200Response
    | UpdateAssetsDefaultResponse
    | GetAssetResource200Response
    | GetAssetResourceDefaultResponse
    | ListDataConnection200Response
    | ListDataConnectionDefaultResponse
    | ValidateDataConnection200Response
    | ValidateDataConnectionDefaultResponse
    | GetDataConnection200Response
    | GetDataConnectionDefaultResponse
    | PutDataConnection200Response
    | PutDataConnectionDefaultResponse
    | DeleteDataConnection204Response
    | DeleteDataConnectionDefaultResponse
    | ListDiscoGroup200Response
    | ListDiscoGroupDefaultResponse
    | ValidateDiscoGroup200Response
    | ValidateDiscoGroupDefaultResponse
    | GetDiscoGroup200Response
    | GetDiscoGroupDefaultResponse
    | PutDiscoGroup200Response
    | PutDiscoGroupDefaultResponse
    | RunDiscoGroup204Response
    | RunDiscoGroupDefaultResponse
    | ListRuns200Response
    | ListRunsDefaultResponse
    | ListDiscoTemplate200Response
    | ListDiscoTemplateDefaultResponse
    | GetDiscoTemplate200Response
    | GetDiscoTemplateDefaultResponse
    | GetBillableReports200Response
    | GetBillableReportsDefaultResponse
    | GetSnapshotReports200Response
    | GetSnapshotReportsDefaultResponse
    | GetSummaryReports200Response
    | GetSummaryReportsDefaultResponse
    | ListSavedFilter200Response
    | ListSavedFilterDefaultResponse
    | GetSavedFilter200Response
    | GetSavedFilterDefaultResponse
    | PutSavedFilter200Response
    | PutSavedFilterDefaultResponse
    | DeleteSavedFilter204Response
    | DeleteSavedFilterDefaultResponse
    | ListTask200Response
    | ListTaskDefaultResponse
    | GetTask200Response
    | GetTaskDefaultResponse
    | CancelTask200Response
    | CancelTaskDefaultResponse
): response is
  | ListAssetResourceDefaultResponse
  | UpdateAssetsDefaultResponse
  | GetAssetResourceDefaultResponse
  | ListDataConnectionDefaultResponse
  | ValidateDataConnectionDefaultResponse
  | GetDataConnectionDefaultResponse
  | PutDataConnectionDefaultResponse
  | DeleteDataConnectionDefaultResponse
  | ListDiscoGroupDefaultResponse
  | ValidateDiscoGroupDefaultResponse
  | GetDiscoGroupDefaultResponse
  | PutDiscoGroupDefaultResponse
  | RunDiscoGroupDefaultResponse
  | ListRunsDefaultResponse
  | ListDiscoTemplateDefaultResponse
  | GetDiscoTemplateDefaultResponse
  | GetBillableReportsDefaultResponse
  | GetSnapshotReportsDefaultResponse
  | GetSummaryReportsDefaultResponse
  | ListSavedFilterDefaultResponse
  | GetSavedFilterDefaultResponse
  | PutSavedFilterDefaultResponse
  | DeleteSavedFilterDefaultResponse
  | ListTaskDefaultResponse
  | GetTaskDefaultResponse
  | CancelTaskDefaultResponse {
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
    for (
      let i = candidateParts.length - 1, j = pathParts.length - 1;
      i >= 1 && j >= 1;
      i--, j--
    ) {
      if (
        candidateParts[i]?.startsWith("{") &&
        candidateParts[i]?.indexOf("}") !== -1
      ) {
        const start = candidateParts[i]!.indexOf("}") + 1,
          end = candidateParts[i]?.length;
        // If the current part of the candidate is a "template" part
        // Try to use the suffix of pattern to match the path
        // {guid} ==> $
        // {guid}:export ==> :export$
        const isMatched = new RegExp(
          `${candidateParts[i]?.slice(start, end)}`
        ).test(pathParts[j] || "");

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
