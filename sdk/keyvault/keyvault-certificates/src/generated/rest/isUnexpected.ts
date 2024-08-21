// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  GetCertificates200Response,
  GetCertificatesDefaultResponse,
  DeleteCertificate200Response,
  DeleteCertificateDefaultResponse,
  SetCertificateContacts200Response,
  SetCertificateContactsDefaultResponse,
  GetCertificateContacts200Response,
  GetCertificateContactsDefaultResponse,
  DeleteCertificateContacts200Response,
  DeleteCertificateContactsDefaultResponse,
  GetCertificateIssuers200Response,
  GetCertificateIssuersDefaultResponse,
  SetCertificateIssuer200Response,
  SetCertificateIssuerDefaultResponse,
  UpdateCertificateIssuer200Response,
  UpdateCertificateIssuerDefaultResponse,
  GetCertificateIssuer200Response,
  GetCertificateIssuerDefaultResponse,
  DeleteCertificateIssuer200Response,
  DeleteCertificateIssuerDefaultResponse,
  CreateCertificate202Response,
  CreateCertificateDefaultResponse,
  ImportCertificate200Response,
  ImportCertificateDefaultResponse,
  GetCertificateVersions200Response,
  GetCertificateVersionsDefaultResponse,
  GetCertificatePolicy200Response,
  GetCertificatePolicyDefaultResponse,
  UpdateCertificatePolicy200Response,
  UpdateCertificatePolicyDefaultResponse,
  UpdateCertificate200Response,
  UpdateCertificateDefaultResponse,
  GetCertificate200Response,
  GetCertificateDefaultResponse,
  UpdateCertificateOperation200Response,
  UpdateCertificateOperationDefaultResponse,
  GetCertificateOperation200Response,
  GetCertificateOperationDefaultResponse,
  DeleteCertificateOperation200Response,
  DeleteCertificateOperationDefaultResponse,
  MergeCertificate201Response,
  MergeCertificateDefaultResponse,
  BackupCertificate200Response,
  BackupCertificateDefaultResponse,
  RestoreCertificate200Response,
  RestoreCertificateDefaultResponse,
  GetDeletedCertificates200Response,
  GetDeletedCertificatesDefaultResponse,
  GetDeletedCertificate200Response,
  GetDeletedCertificateDefaultResponse,
  PurgeDeletedCertificate204Response,
  PurgeDeletedCertificateDefaultResponse,
  RecoverDeletedCertificate200Response,
  RecoverDeletedCertificateDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /certificates": ["200"],
  "DELETE /certificates/{certificateName}": ["200"],
  "PUT /certificates/contacts": ["200"],
  "GET /certificates/contacts": ["200"],
  "DELETE /certificates/contacts": ["200"],
  "GET /certificates/issuers": ["200"],
  "PUT /certificates/issuers/{issuerName}": ["200"],
  "PATCH /certificates/issuers/{issuerName}": ["200"],
  "GET /certificates/issuers/{issuerName}": ["200"],
  "DELETE /certificates/issuers/{issuerName}": ["200"],
  "POST /certificates/{certificateName}/create": ["202"],
  "POST /certificates/{certificateName}/import": ["200"],
  "GET /certificates/{certificateName}/versions": ["200"],
  "GET /certificates/{certificateName}/policy": ["200"],
  "PATCH /certificates/{certificateName}/policy": ["200"],
  "PATCH /certificates/{certificateName}/{certificateVersion}": ["200"],
  "GET /certificates/{certificateName}/{certificateVersion}": ["200"],
  "PATCH /certificates/{certificateName}/pending": ["200"],
  "GET /certificates/{certificateName}/pending": ["200"],
  "DELETE /certificates/{certificateName}/pending": ["200"],
  "POST /certificates/{certificateName}/pending/merge": ["201"],
  "POST /certificates/{certificateName}/backup": ["200"],
  "POST /certificates/restore": ["200"],
  "GET /deletedcertificates": ["200"],
  "GET /deletedcertificates/{certificateName}": ["200"],
  "DELETE /deletedcertificates/{certificateName}": ["204"],
  "POST /deletedcertificates/{certificateName}/recover": ["200"],
};

export function isUnexpected(
  response: GetCertificates200Response | GetCertificatesDefaultResponse
): response is GetCertificatesDefaultResponse;
export function isUnexpected(
  response: DeleteCertificate200Response | DeleteCertificateDefaultResponse
): response is DeleteCertificateDefaultResponse;
export function isUnexpected(
  response: SetCertificateContacts200Response | SetCertificateContactsDefaultResponse
): response is SetCertificateContactsDefaultResponse;
export function isUnexpected(
  response: GetCertificateContacts200Response | GetCertificateContactsDefaultResponse
): response is GetCertificateContactsDefaultResponse;
export function isUnexpected(
  response: DeleteCertificateContacts200Response | DeleteCertificateContactsDefaultResponse
): response is DeleteCertificateContactsDefaultResponse;
export function isUnexpected(
  response: GetCertificateIssuers200Response | GetCertificateIssuersDefaultResponse
): response is GetCertificateIssuersDefaultResponse;
export function isUnexpected(
  response: SetCertificateIssuer200Response | SetCertificateIssuerDefaultResponse
): response is SetCertificateIssuerDefaultResponse;
export function isUnexpected(
  response: UpdateCertificateIssuer200Response | UpdateCertificateIssuerDefaultResponse
): response is UpdateCertificateIssuerDefaultResponse;
export function isUnexpected(
  response: GetCertificateIssuer200Response | GetCertificateIssuerDefaultResponse
): response is GetCertificateIssuerDefaultResponse;
export function isUnexpected(
  response: DeleteCertificateIssuer200Response | DeleteCertificateIssuerDefaultResponse
): response is DeleteCertificateIssuerDefaultResponse;
export function isUnexpected(
  response: CreateCertificate202Response | CreateCertificateDefaultResponse
): response is CreateCertificateDefaultResponse;
export function isUnexpected(
  response: ImportCertificate200Response | ImportCertificateDefaultResponse
): response is ImportCertificateDefaultResponse;
export function isUnexpected(
  response: GetCertificateVersions200Response | GetCertificateVersionsDefaultResponse
): response is GetCertificateVersionsDefaultResponse;
export function isUnexpected(
  response: GetCertificatePolicy200Response | GetCertificatePolicyDefaultResponse
): response is GetCertificatePolicyDefaultResponse;
export function isUnexpected(
  response: UpdateCertificatePolicy200Response | UpdateCertificatePolicyDefaultResponse
): response is UpdateCertificatePolicyDefaultResponse;
export function isUnexpected(
  response: UpdateCertificate200Response | UpdateCertificateDefaultResponse
): response is UpdateCertificateDefaultResponse;
export function isUnexpected(
  response: GetCertificate200Response | GetCertificateDefaultResponse
): response is GetCertificateDefaultResponse;
export function isUnexpected(
  response: UpdateCertificateOperation200Response | UpdateCertificateOperationDefaultResponse
): response is UpdateCertificateOperationDefaultResponse;
export function isUnexpected(
  response: GetCertificateOperation200Response | GetCertificateOperationDefaultResponse
): response is GetCertificateOperationDefaultResponse;
export function isUnexpected(
  response: DeleteCertificateOperation200Response | DeleteCertificateOperationDefaultResponse
): response is DeleteCertificateOperationDefaultResponse;
export function isUnexpected(
  response: MergeCertificate201Response | MergeCertificateDefaultResponse
): response is MergeCertificateDefaultResponse;
export function isUnexpected(
  response: BackupCertificate200Response | BackupCertificateDefaultResponse
): response is BackupCertificateDefaultResponse;
export function isUnexpected(
  response: RestoreCertificate200Response | RestoreCertificateDefaultResponse
): response is RestoreCertificateDefaultResponse;
export function isUnexpected(
  response: GetDeletedCertificates200Response | GetDeletedCertificatesDefaultResponse
): response is GetDeletedCertificatesDefaultResponse;
export function isUnexpected(
  response: GetDeletedCertificate200Response | GetDeletedCertificateDefaultResponse
): response is GetDeletedCertificateDefaultResponse;
export function isUnexpected(
  response: PurgeDeletedCertificate204Response | PurgeDeletedCertificateDefaultResponse
): response is PurgeDeletedCertificateDefaultResponse;
export function isUnexpected(
  response: RecoverDeletedCertificate200Response | RecoverDeletedCertificateDefaultResponse
): response is RecoverDeletedCertificateDefaultResponse;
export function isUnexpected(
  response:
    | GetCertificates200Response
    | GetCertificatesDefaultResponse
    | DeleteCertificate200Response
    | DeleteCertificateDefaultResponse
    | SetCertificateContacts200Response
    | SetCertificateContactsDefaultResponse
    | GetCertificateContacts200Response
    | GetCertificateContactsDefaultResponse
    | DeleteCertificateContacts200Response
    | DeleteCertificateContactsDefaultResponse
    | GetCertificateIssuers200Response
    | GetCertificateIssuersDefaultResponse
    | SetCertificateIssuer200Response
    | SetCertificateIssuerDefaultResponse
    | UpdateCertificateIssuer200Response
    | UpdateCertificateIssuerDefaultResponse
    | GetCertificateIssuer200Response
    | GetCertificateIssuerDefaultResponse
    | DeleteCertificateIssuer200Response
    | DeleteCertificateIssuerDefaultResponse
    | CreateCertificate202Response
    | CreateCertificateDefaultResponse
    | ImportCertificate200Response
    | ImportCertificateDefaultResponse
    | GetCertificateVersions200Response
    | GetCertificateVersionsDefaultResponse
    | GetCertificatePolicy200Response
    | GetCertificatePolicyDefaultResponse
    | UpdateCertificatePolicy200Response
    | UpdateCertificatePolicyDefaultResponse
    | UpdateCertificate200Response
    | UpdateCertificateDefaultResponse
    | GetCertificate200Response
    | GetCertificateDefaultResponse
    | UpdateCertificateOperation200Response
    | UpdateCertificateOperationDefaultResponse
    | GetCertificateOperation200Response
    | GetCertificateOperationDefaultResponse
    | DeleteCertificateOperation200Response
    | DeleteCertificateOperationDefaultResponse
    | MergeCertificate201Response
    | MergeCertificateDefaultResponse
    | BackupCertificate200Response
    | BackupCertificateDefaultResponse
    | RestoreCertificate200Response
    | RestoreCertificateDefaultResponse
    | GetDeletedCertificates200Response
    | GetDeletedCertificatesDefaultResponse
    | GetDeletedCertificate200Response
    | GetDeletedCertificateDefaultResponse
    | PurgeDeletedCertificate204Response
    | PurgeDeletedCertificateDefaultResponse
    | RecoverDeletedCertificate200Response
    | RecoverDeletedCertificateDefaultResponse
): response is
  | GetCertificatesDefaultResponse
  | DeleteCertificateDefaultResponse
  | SetCertificateContactsDefaultResponse
  | GetCertificateContactsDefaultResponse
  | DeleteCertificateContactsDefaultResponse
  | GetCertificateIssuersDefaultResponse
  | SetCertificateIssuerDefaultResponse
  | UpdateCertificateIssuerDefaultResponse
  | GetCertificateIssuerDefaultResponse
  | DeleteCertificateIssuerDefaultResponse
  | CreateCertificateDefaultResponse
  | ImportCertificateDefaultResponse
  | GetCertificateVersionsDefaultResponse
  | GetCertificatePolicyDefaultResponse
  | UpdateCertificatePolicyDefaultResponse
  | UpdateCertificateDefaultResponse
  | GetCertificateDefaultResponse
  | UpdateCertificateOperationDefaultResponse
  | GetCertificateOperationDefaultResponse
  | DeleteCertificateOperationDefaultResponse
  | MergeCertificateDefaultResponse
  | BackupCertificateDefaultResponse
  | RestoreCertificateDefaultResponse
  | GetDeletedCertificatesDefaultResponse
  | GetDeletedCertificateDefaultResponse
  | PurgeDeletedCertificateDefaultResponse
  | RecoverDeletedCertificateDefaultResponse {
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
          pathParts[j] || ""
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
