// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  GetConstitution200Response,
  GetConstitutionDefaultResponse,
  ListConsortiumMembers200Response,
  ListConsortiumMembersDefaultResponse,
  GetEnclaveQuotes200Response,
  GetEnclaveQuotesDefaultResponse,
  ListCollections200Response,
  ListCollectionsDefaultResponse,
  ListLedgerEntries200Response,
  ListLedgerEntriesDefaultResponse,
  CreateLedgerEntry200Response,
  CreateLedgerEntryDefaultResponse,
  GetLedgerEntry200Response,
  GetLedgerEntryDefaultResponse,
  GetReceipt200Response,
  GetReceiptDefaultResponse,
  GetTransactionStatus200Response,
  GetTransactionStatusDefaultResponse,
  GetCurrentLedgerEntry200Response,
  GetCurrentLedgerEntryDefaultResponse,
  DeleteUser204Response,
  DeleteUserDefaultResponse,
  GetUser200Response,
  GetUserDefaultResponse,
  CreateOrUpdateUser200Response,
  CreateOrUpdateUserDefaultResponse
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /app/governance/constitution": ["200"],
  "GET /app/governance/members": ["200"],
  "GET /app/enclaveQuotes": ["200"],
  "GET /app/collections": ["200"],
  "GET /app/transactions": ["200"],
  "POST /app/transactions": ["200"],
  "GET /app/transactions/{transactionId}": ["200"],
  "GET /app/transactions/{transactionId}/receipt": ["200"],
  "GET /app/transactions/{transactionId}/status": ["200"],
  "GET /app/transactions/current": ["200"],
  "DELETE /app/users/{userId}": ["204"],
  "GET /app/users/{userId}": ["200"],
  "PATCH /app/users/{userId}": ["200"]
};

export function isUnexpected(
  response: GetConstitution200Response | GetConstitutionDefaultResponse
): response is GetConstitutionDefaultResponse;
export function isUnexpected(
  response:
    | ListConsortiumMembers200Response
    | ListConsortiumMembersDefaultResponse
): response is ListConsortiumMembersDefaultResponse;
export function isUnexpected(
  response: GetEnclaveQuotes200Response | GetEnclaveQuotesDefaultResponse
): response is GetEnclaveQuotesDefaultResponse;
export function isUnexpected(
  response: ListCollections200Response | ListCollectionsDefaultResponse
): response is ListCollectionsDefaultResponse;
export function isUnexpected(
  response: ListLedgerEntries200Response | ListLedgerEntriesDefaultResponse
): response is ListLedgerEntriesDefaultResponse;
export function isUnexpected(
  response: CreateLedgerEntry200Response | CreateLedgerEntryDefaultResponse
): response is CreateLedgerEntryDefaultResponse;
export function isUnexpected(
  response: GetLedgerEntry200Response | GetLedgerEntryDefaultResponse
): response is GetLedgerEntryDefaultResponse;
export function isUnexpected(
  response: GetReceipt200Response | GetReceiptDefaultResponse
): response is GetReceiptDefaultResponse;
export function isUnexpected(
  response:
    | GetTransactionStatus200Response
    | GetTransactionStatusDefaultResponse
): response is GetTransactionStatusDefaultResponse;
export function isUnexpected(
  response:
    | GetCurrentLedgerEntry200Response
    | GetCurrentLedgerEntryDefaultResponse
): response is GetCurrentLedgerEntryDefaultResponse;
export function isUnexpected(
  response: DeleteUser204Response | DeleteUserDefaultResponse
): response is DeleteUserDefaultResponse;
export function isUnexpected(
  response: GetUser200Response | GetUserDefaultResponse
): response is GetUserDefaultResponse;
export function isUnexpected(
  response: CreateOrUpdateUser200Response | CreateOrUpdateUserDefaultResponse
): response is CreateOrUpdateUserDefaultResponse;
export function isUnexpected(
  response:
    | GetConstitution200Response
    | GetConstitutionDefaultResponse
    | ListConsortiumMembers200Response
    | ListConsortiumMembersDefaultResponse
    | GetEnclaveQuotes200Response
    | GetEnclaveQuotesDefaultResponse
    | ListCollections200Response
    | ListCollectionsDefaultResponse
    | ListLedgerEntries200Response
    | ListLedgerEntriesDefaultResponse
    | CreateLedgerEntry200Response
    | CreateLedgerEntryDefaultResponse
    | GetLedgerEntry200Response
    | GetLedgerEntryDefaultResponse
    | GetReceipt200Response
    | GetReceiptDefaultResponse
    | GetTransactionStatus200Response
    | GetTransactionStatusDefaultResponse
    | GetCurrentLedgerEntry200Response
    | GetCurrentLedgerEntryDefaultResponse
    | DeleteUser204Response
    | DeleteUserDefaultResponse
    | GetUser200Response
    | GetUserDefaultResponse
    | CreateOrUpdateUser200Response
    | CreateOrUpdateUserDefaultResponse
): response is
  | GetConstitutionDefaultResponse
  | ListConsortiumMembersDefaultResponse
  | GetEnclaveQuotesDefaultResponse
  | ListCollectionsDefaultResponse
  | ListLedgerEntriesDefaultResponse
  | CreateLedgerEntryDefaultResponse
  | GetLedgerEntryDefaultResponse
  | GetReceiptDefaultResponse
  | GetTransactionStatusDefaultResponse
  | GetCurrentLedgerEntryDefaultResponse
  | DeleteUserDefaultResponse
  | GetUserDefaultResponse
  | CreateOrUpdateUserDefaultResponse {
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
