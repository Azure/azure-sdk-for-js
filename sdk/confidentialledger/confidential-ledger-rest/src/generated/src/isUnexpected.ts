// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetConstitution200Response,
  GetConstitutiondefaultResponse,
  ListConsortiumMembers200Response,
  ListConsortiumMembersdefaultResponse,
  GetEnclaveQuotes200Response,
  GetEnclaveQuotesdefaultResponse,
  ListCollections200Response,
  ListCollectionsdefaultResponse,
  ListLedgerEntries200Response,
  ListLedgerEntriesdefaultResponse,
  CreateLedgerEntry200Response,
  CreateLedgerEntrydefaultResponse,
  GetLedgerEntry200Response,
  GetLedgerEntrydefaultResponse,
  GetReceipt200Response,
  GetReceiptdefaultResponse,
  GetTransactionStatus200Response,
  GetTransactionStatusdefaultResponse,
  GetCurrentLedgerEntry200Response,
  GetCurrentLedgerEntrydefaultResponse,
  DeleteUser204Response,
  DeleteUserdefaultResponse,
  GetUser200Response,
  GetUserdefaultResponse,
  CreateOrUpdateUser200Response,
  CreateOrUpdateUserdefaultResponse
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
  response: GetConstitution200Response | GetConstitutiondefaultResponse
): response is GetConstitutiondefaultResponse;
export function isUnexpected(
  response:
    | ListConsortiumMembers200Response
    | ListConsortiumMembersdefaultResponse
): response is ListConsortiumMembersdefaultResponse;
export function isUnexpected(
  response: GetEnclaveQuotes200Response | GetEnclaveQuotesdefaultResponse
): response is GetEnclaveQuotesdefaultResponse;
export function isUnexpected(
  response: ListCollections200Response | ListCollectionsdefaultResponse
): response is ListCollectionsdefaultResponse;
export function isUnexpected(
  response: ListLedgerEntries200Response | ListLedgerEntriesdefaultResponse
): response is ListLedgerEntriesdefaultResponse;
export function isUnexpected(
  response: CreateLedgerEntry200Response | CreateLedgerEntrydefaultResponse
): response is CreateLedgerEntrydefaultResponse;
export function isUnexpected(
  response: GetLedgerEntry200Response | GetLedgerEntrydefaultResponse
): response is GetLedgerEntrydefaultResponse;
export function isUnexpected(
  response: GetReceipt200Response | GetReceiptdefaultResponse
): response is GetReceiptdefaultResponse;
export function isUnexpected(
  response:
    | GetTransactionStatus200Response
    | GetTransactionStatusdefaultResponse
): response is GetTransactionStatusdefaultResponse;
export function isUnexpected(
  response:
    | GetCurrentLedgerEntry200Response
    | GetCurrentLedgerEntrydefaultResponse
): response is GetCurrentLedgerEntrydefaultResponse;
export function isUnexpected(
  response: DeleteUser204Response | DeleteUserdefaultResponse
): response is DeleteUserdefaultResponse;
export function isUnexpected(
  response: GetUser200Response | GetUserdefaultResponse
): response is GetUserdefaultResponse;
export function isUnexpected(
  response: CreateOrUpdateUser200Response | CreateOrUpdateUserdefaultResponse
): response is CreateOrUpdateUserdefaultResponse;
export function isUnexpected(
  response:
    | GetConstitution200Response
    | GetConstitutiondefaultResponse
    | ListConsortiumMembers200Response
    | ListConsortiumMembersdefaultResponse
    | GetEnclaveQuotes200Response
    | GetEnclaveQuotesdefaultResponse
    | ListCollections200Response
    | ListCollectionsdefaultResponse
    | ListLedgerEntries200Response
    | ListLedgerEntriesdefaultResponse
    | CreateLedgerEntry200Response
    | CreateLedgerEntrydefaultResponse
    | GetLedgerEntry200Response
    | GetLedgerEntrydefaultResponse
    | GetReceipt200Response
    | GetReceiptdefaultResponse
    | GetTransactionStatus200Response
    | GetTransactionStatusdefaultResponse
    | GetCurrentLedgerEntry200Response
    | GetCurrentLedgerEntrydefaultResponse
    | DeleteUser204Response
    | DeleteUserdefaultResponse
    | GetUser200Response
    | GetUserdefaultResponse
    | CreateOrUpdateUser200Response
    | CreateOrUpdateUserdefaultResponse
): response is
  | GetConstitutiondefaultResponse
  | ListConsortiumMembersdefaultResponse
  | GetEnclaveQuotesdefaultResponse
  | ListCollectionsdefaultResponse
  | ListLedgerEntriesdefaultResponse
  | CreateLedgerEntrydefaultResponse
  | GetLedgerEntrydefaultResponse
  | GetReceiptdefaultResponse
  | GetTransactionStatusdefaultResponse
  | GetCurrentLedgerEntrydefaultResponse
  | DeleteUserdefaultResponse
  | GetUserdefaultResponse
  | CreateOrUpdateUserdefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(path: string): string[] {
  const pathParts = path.split("/");

  // Iterate the responseMap to find a match
  for (const [key, value] of Object.entries(responseMap)) {
    // Extracting the path from the map key which is in format
    // GET /path/foo
    const candidatePath = getPathFromMapKey(key);
    // Get each part of the url path
    const candidateParts = candidatePath.split("/");

    // If the candidate and actual paths don't match in size
    // we move on to the next candidate path
    if (
      candidateParts.length === pathParts.length &&
      hasParametrizedPath(key)
    ) {
      // track if we have found a match to return the values found.
      let found = true;
      for (let i = 0; i < candidateParts.length; i++) {
        if (
          candidateParts[i].startsWith("{") &&
          candidateParts[i].endsWith("}")
        ) {
          // If the current part of the candidate is a "template" part
          // it is a match with the actual path part on hand
          // skip as the parameterized part can match anything
          continue;
        }

        // If the candidate part is not a template and
        // the parts don't match mark the candidate as not found
        // to move on with the next candidate path.
        if (candidateParts[i] !== pathParts[i]) {
          found = false;
          break;
        }
      }

      // We finished evaluating the current candidate parts
      // if all parts matched we return the success values form
      // the path mapping.
      if (found) {
        return value;
      }
    }
  }

  // No match was found, return an empty array.
  return [];
}

function hasParametrizedPath(path: string): boolean {
  return path.includes("/{");
}

function getPathFromMapKey(mapKey: string): string {
  const pathStart = mapKey.indexOf("/");
  return mapKey.slice(pathStart);
}
