import {
  ConfidentialLedgerListCollections200Response,
  ConfidentialLedgerListCollectionsDefaultResponse,
  ConfidentialLedgerGetEnclaveQuotes200Response,
  ConfidentialLedgerGetEnclaveQuotesDefaultResponse,
  ConfidentialLedgerGetConstitution200Response,
  ConfidentialLedgerGetConstitutionDefaultResponse,
  ConfidentialLedgerGetConsortiumMembers200Response,
  ConfidentialLedgerGetConsortiumMembersDefaultResponse,
  ConfidentialLedgerListLedgerEntries200Response,
  ConfidentialLedgerListLedgerEntriesDefaultResponse,
  ConfidentialLedgerCreateLedgerEntry201Response,
  ConfidentialLedgerCreateLedgerEntryDefaultResponse,
  ConfidentialLedgerGetLedgerEntry200Response,
  ConfidentialLedgerGetLedgerEntryDefaultResponse,
  ConfidentialLedgerGetReceipt200Response,
  ConfidentialLedgerGetReceiptDefaultResponse,
  ConfidentialLedgerGetTransactionStatus200Response,
  ConfidentialLedgerGetTransactionStatusDefaultResponse,
  ConfidentialLedgerGetCurrentLedgerEntry200Response,
  ConfidentialLedgerGetCurrentLedgerEntryDefaultResponse,
  ConfidentialLedgerDeleteUser204Response,
  ConfidentialLedgerDeleteUserDefaultResponse,
  ConfidentialLedgerGetUser200Response,
  ConfidentialLedgerGetUserDefaultResponse,
  ConfidentialLedgerCreateOrUpdateUser200Response,
  ConfidentialLedgerCreateOrUpdateUser201Response,
  ConfidentialLedgerCreateOrUpdateUserDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /app/collections": ["200"],
  "GET /app/enclaveQuotes": ["200"],
  "GET /app/governance/constitution": ["200"],
  "GET /app/governance/members": ["200"],
  "GET /app/transactions": ["200"],
  "POST /app/transactions": ["201"],
  "GET /app/transactions/{transactionId}": ["200"],
  "GET /app/transactions/{transactionId}/receipt": ["200"],
  "GET /app/transactions/{transactionId}/status": ["200"],
  "GET /app/transactions:getCurrentLedgerEntry": ["200"],
  "DELETE /app/users/{userId}": ["204"],
  "GET /app/users/{userId}": ["200"],
  "PATCH /app/users/{userId}": ["200", "201"],
};

export function isUnexpected(
  response:
    | ConfidentialLedgerListCollections200Response
    | ConfidentialLedgerListCollectionsDefaultResponse
): response is ConfidentialLedgerListCollectionsDefaultResponse;
export function isUnexpected(
  response:
    | ConfidentialLedgerGetEnclaveQuotes200Response
    | ConfidentialLedgerGetEnclaveQuotesDefaultResponse
): response is ConfidentialLedgerGetEnclaveQuotesDefaultResponse;
export function isUnexpected(
  response:
    | ConfidentialLedgerGetConstitution200Response
    | ConfidentialLedgerGetConstitutionDefaultResponse
): response is ConfidentialLedgerGetConstitutionDefaultResponse;
export function isUnexpected(
  response:
    | ConfidentialLedgerGetConsortiumMembers200Response
    | ConfidentialLedgerGetConsortiumMembersDefaultResponse
): response is ConfidentialLedgerGetConsortiumMembersDefaultResponse;
export function isUnexpected(
  response:
    | ConfidentialLedgerListLedgerEntries200Response
    | ConfidentialLedgerListLedgerEntriesDefaultResponse
): response is ConfidentialLedgerListLedgerEntriesDefaultResponse;
export function isUnexpected(
  response:
    | ConfidentialLedgerCreateLedgerEntry201Response
    | ConfidentialLedgerCreateLedgerEntryDefaultResponse
): response is ConfidentialLedgerCreateLedgerEntryDefaultResponse;
export function isUnexpected(
  response:
    | ConfidentialLedgerGetLedgerEntry200Response
    | ConfidentialLedgerGetLedgerEntryDefaultResponse
): response is ConfidentialLedgerGetLedgerEntryDefaultResponse;
export function isUnexpected(
  response:
    | ConfidentialLedgerGetReceipt200Response
    | ConfidentialLedgerGetReceiptDefaultResponse
): response is ConfidentialLedgerGetReceiptDefaultResponse;
export function isUnexpected(
  response:
    | ConfidentialLedgerGetTransactionStatus200Response
    | ConfidentialLedgerGetTransactionStatusDefaultResponse
): response is ConfidentialLedgerGetTransactionStatusDefaultResponse;
export function isUnexpected(
  response:
    | ConfidentialLedgerGetCurrentLedgerEntry200Response
    | ConfidentialLedgerGetCurrentLedgerEntryDefaultResponse
): response is ConfidentialLedgerGetCurrentLedgerEntryDefaultResponse;
export function isUnexpected(
  response:
    | ConfidentialLedgerDeleteUser204Response
    | ConfidentialLedgerDeleteUserDefaultResponse
): response is ConfidentialLedgerDeleteUserDefaultResponse;
export function isUnexpected(
  response:
    | ConfidentialLedgerGetUser200Response
    | ConfidentialLedgerGetUserDefaultResponse
): response is ConfidentialLedgerGetUserDefaultResponse;
export function isUnexpected(
  response:
    | ConfidentialLedgerCreateOrUpdateUser200Response
    | ConfidentialLedgerCreateOrUpdateUser201Response
    | ConfidentialLedgerCreateOrUpdateUserDefaultResponse
): response is ConfidentialLedgerCreateOrUpdateUserDefaultResponse;
export function isUnexpected(
  response:
    | ConfidentialLedgerListCollections200Response
    | ConfidentialLedgerListCollectionsDefaultResponse
    | ConfidentialLedgerGetEnclaveQuotes200Response
    | ConfidentialLedgerGetEnclaveQuotesDefaultResponse
    | ConfidentialLedgerGetConstitution200Response
    | ConfidentialLedgerGetConstitutionDefaultResponse
    | ConfidentialLedgerGetConsortiumMembers200Response
    | ConfidentialLedgerGetConsortiumMembersDefaultResponse
    | ConfidentialLedgerListLedgerEntries200Response
    | ConfidentialLedgerListLedgerEntriesDefaultResponse
    | ConfidentialLedgerCreateLedgerEntry201Response
    | ConfidentialLedgerCreateLedgerEntryDefaultResponse
    | ConfidentialLedgerGetLedgerEntry200Response
    | ConfidentialLedgerGetLedgerEntryDefaultResponse
    | ConfidentialLedgerGetReceipt200Response
    | ConfidentialLedgerGetReceiptDefaultResponse
    | ConfidentialLedgerGetTransactionStatus200Response
    | ConfidentialLedgerGetTransactionStatusDefaultResponse
    | ConfidentialLedgerGetCurrentLedgerEntry200Response
    | ConfidentialLedgerGetCurrentLedgerEntryDefaultResponse
    | ConfidentialLedgerDeleteUser204Response
    | ConfidentialLedgerDeleteUserDefaultResponse
    | ConfidentialLedgerGetUser200Response
    | ConfidentialLedgerGetUserDefaultResponse
    | ConfidentialLedgerCreateOrUpdateUser200Response
    | ConfidentialLedgerCreateOrUpdateUser201Response
    | ConfidentialLedgerCreateOrUpdateUserDefaultResponse
): response is
  | ConfidentialLedgerListCollectionsDefaultResponse
  | ConfidentialLedgerGetEnclaveQuotesDefaultResponse
  | ConfidentialLedgerGetConstitutionDefaultResponse
  | ConfidentialLedgerGetConsortiumMembersDefaultResponse
  | ConfidentialLedgerListLedgerEntriesDefaultResponse
  | ConfidentialLedgerCreateLedgerEntryDefaultResponse
  | ConfidentialLedgerGetLedgerEntryDefaultResponse
  | ConfidentialLedgerGetReceiptDefaultResponse
  | ConfidentialLedgerGetTransactionStatusDefaultResponse
  | ConfidentialLedgerGetCurrentLedgerEntryDefaultResponse
  | ConfidentialLedgerDeleteUserDefaultResponse
  | ConfidentialLedgerGetUserDefaultResponse
  | ConfidentialLedgerCreateOrUpdateUserDefaultResponse {
  const lroOriginal = response.headers["x-ms-original-url"];
  const url = new URL(lroOriginal ?? response.request.url);
  const method = response.request.method;
  let pathDetails = responseMap[`${method} ${url.pathname}`];
  if (!pathDetails) {
    pathDetails = geParametrizedPathSuccess(method, url.pathname);
  }
  return !pathDetails.includes(response.status);
}

function geParametrizedPathSuccess(method: string, path: string): string[] {
  const pathParts = path.split("/");

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
          candidateParts[i]?.startsWith("{") &&
          candidateParts[i]?.endsWith("}")
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
