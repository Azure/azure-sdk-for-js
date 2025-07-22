// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  GetKeys200Response,
  GetKeysDefaultResponse,
  CheckKeys200Response,
  CheckKeysDefaultResponse,
  GetKeyValues200Response,
  GetKeyValuesDefaultResponse,
  CheckKeyValues200Response,
  CheckKeyValuesDefaultResponse,
  GetKeyValue200Response,
  GetKeyValueDefaultResponse,
  PutKeyValue200Response,
  PutKeyValueDefaultResponse,
  DeleteKeyValue200Response,
  DeleteKeyValue204Response,
  DeleteKeyValueDefaultResponse,
  CheckKeyValue200Response,
  CheckKeyValueDefaultResponse,
  GetSnapshots200Response,
  GetSnapshotsDefaultResponse,
  CheckSnapshots200Response,
  CheckSnapshotsDefaultResponse,
  GetSnapshot200Response,
  GetSnapshotDefaultResponse,
  CreateSnapshot201Response,
  CreateSnapshotLogicalResponse,
  CreateSnapshotDefaultResponse,
  UpdateSnapshot200Response,
  UpdateSnapshotDefaultResponse,
  CheckSnapshot200Response,
  CheckSnapshotDefaultResponse,
  GetOperationDetails200Response,
  GetOperationDetailsDefaultResponse,
  GetLabels200Response,
  GetLabelsDefaultResponse,
  CheckLabels200Response,
  CheckLabelsDefaultResponse,
  PutLock200Response,
  PutLockDefaultResponse,
  DeleteLock200Response,
  DeleteLockDefaultResponse,
  GetRevisions200Response,
  GetRevisionsDefaultResponse,
  CheckRevisions200Response,
  CheckRevisionsDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /keys": ["200"],
  "HEAD /keys": ["200"],
  "GET /kv": ["200"],
  "HEAD /kv": ["200"],
  "GET /kv/{key}": ["200"],
  "PUT /kv/{key}": ["200"],
  "DELETE /kv/{key}": ["200", "204"],
  "HEAD /kv/{key}": ["200"],
  "GET /snapshots": ["200"],
  "HEAD /snapshots": ["200"],
  "GET /snapshots/{name}": ["200"],
  "PUT /snapshots/{name}": ["201"],
  "PATCH /snapshots/{name}": ["200"],
  "HEAD /snapshots/{name}": ["200"],
  "GET /operations": ["200"],
  "GET /labels": ["200"],
  "HEAD /labels": ["200"],
  "PUT /locks/{key}": ["200"],
  "DELETE /locks/{key}": ["200"],
  "GET /revisions": ["200"],
  "HEAD /revisions": ["200"],
};

export function isUnexpected(
  response: GetKeys200Response | GetKeysDefaultResponse,
): response is GetKeysDefaultResponse;
export function isUnexpected(
  response: CheckKeys200Response | CheckKeysDefaultResponse,
): response is CheckKeysDefaultResponse;
export function isUnexpected(
  response: GetKeyValues200Response | GetKeyValuesDefaultResponse,
): response is GetKeyValuesDefaultResponse;
export function isUnexpected(
  response: CheckKeyValues200Response | CheckKeyValuesDefaultResponse,
): response is CheckKeyValuesDefaultResponse;
export function isUnexpected(
  response: GetKeyValue200Response | GetKeyValueDefaultResponse,
): response is GetKeyValueDefaultResponse;
export function isUnexpected(
  response: PutKeyValue200Response | PutKeyValueDefaultResponse,
): response is PutKeyValueDefaultResponse;
export function isUnexpected(
  response:
    | DeleteKeyValue200Response
    | DeleteKeyValue204Response
    | DeleteKeyValueDefaultResponse,
): response is DeleteKeyValueDefaultResponse;
export function isUnexpected(
  response: CheckKeyValue200Response | CheckKeyValueDefaultResponse,
): response is CheckKeyValueDefaultResponse;
export function isUnexpected(
  response: GetSnapshots200Response | GetSnapshotsDefaultResponse,
): response is GetSnapshotsDefaultResponse;
export function isUnexpected(
  response: CheckSnapshots200Response | CheckSnapshotsDefaultResponse,
): response is CheckSnapshotsDefaultResponse;
export function isUnexpected(
  response: GetSnapshot200Response | GetSnapshotDefaultResponse,
): response is GetSnapshotDefaultResponse;
export function isUnexpected(
  response:
    | CreateSnapshot201Response
    | CreateSnapshotLogicalResponse
    | CreateSnapshotDefaultResponse,
): response is CreateSnapshotDefaultResponse;
export function isUnexpected(
  response: UpdateSnapshot200Response | UpdateSnapshotDefaultResponse,
): response is UpdateSnapshotDefaultResponse;
export function isUnexpected(
  response: CheckSnapshot200Response | CheckSnapshotDefaultResponse,
): response is CheckSnapshotDefaultResponse;
export function isUnexpected(
  response: GetOperationDetails200Response | GetOperationDetailsDefaultResponse,
): response is GetOperationDetailsDefaultResponse;
export function isUnexpected(
  response: GetLabels200Response | GetLabelsDefaultResponse,
): response is GetLabelsDefaultResponse;
export function isUnexpected(
  response: CheckLabels200Response | CheckLabelsDefaultResponse,
): response is CheckLabelsDefaultResponse;
export function isUnexpected(
  response: PutLock200Response | PutLockDefaultResponse,
): response is PutLockDefaultResponse;
export function isUnexpected(
  response: DeleteLock200Response | DeleteLockDefaultResponse,
): response is DeleteLockDefaultResponse;
export function isUnexpected(
  response: GetRevisions200Response | GetRevisionsDefaultResponse,
): response is GetRevisionsDefaultResponse;
export function isUnexpected(
  response: CheckRevisions200Response | CheckRevisionsDefaultResponse,
): response is CheckRevisionsDefaultResponse;
export function isUnexpected(
  response:
    | GetKeys200Response
    | GetKeysDefaultResponse
    | CheckKeys200Response
    | CheckKeysDefaultResponse
    | GetKeyValues200Response
    | GetKeyValuesDefaultResponse
    | CheckKeyValues200Response
    | CheckKeyValuesDefaultResponse
    | GetKeyValue200Response
    | GetKeyValueDefaultResponse
    | PutKeyValue200Response
    | PutKeyValueDefaultResponse
    | DeleteKeyValue200Response
    | DeleteKeyValue204Response
    | DeleteKeyValueDefaultResponse
    | CheckKeyValue200Response
    | CheckKeyValueDefaultResponse
    | GetSnapshots200Response
    | GetSnapshotsDefaultResponse
    | CheckSnapshots200Response
    | CheckSnapshotsDefaultResponse
    | GetSnapshot200Response
    | GetSnapshotDefaultResponse
    | CreateSnapshot201Response
    | CreateSnapshotLogicalResponse
    | CreateSnapshotDefaultResponse
    | UpdateSnapshot200Response
    | UpdateSnapshotDefaultResponse
    | CheckSnapshot200Response
    | CheckSnapshotDefaultResponse
    | GetOperationDetails200Response
    | GetOperationDetailsDefaultResponse
    | GetLabels200Response
    | GetLabelsDefaultResponse
    | CheckLabels200Response
    | CheckLabelsDefaultResponse
    | PutLock200Response
    | PutLockDefaultResponse
    | DeleteLock200Response
    | DeleteLockDefaultResponse
    | GetRevisions200Response
    | GetRevisionsDefaultResponse
    | CheckRevisions200Response
    | CheckRevisionsDefaultResponse,
): response is
  | GetKeysDefaultResponse
  | CheckKeysDefaultResponse
  | GetKeyValuesDefaultResponse
  | CheckKeyValuesDefaultResponse
  | GetKeyValueDefaultResponse
  | PutKeyValueDefaultResponse
  | DeleteKeyValueDefaultResponse
  | CheckKeyValueDefaultResponse
  | GetSnapshotsDefaultResponse
  | CheckSnapshotsDefaultResponse
  | GetSnapshotDefaultResponse
  | CreateSnapshotDefaultResponse
  | UpdateSnapshotDefaultResponse
  | CheckSnapshotDefaultResponse
  | GetOperationDetailsDefaultResponse
  | GetLabelsDefaultResponse
  | CheckLabelsDefaultResponse
  | PutLockDefaultResponse
  | DeleteLockDefaultResponse
  | GetRevisionsDefaultResponse
  | CheckRevisionsDefaultResponse {
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
          `${candidateParts[i]?.slice(start, end)}`,
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
