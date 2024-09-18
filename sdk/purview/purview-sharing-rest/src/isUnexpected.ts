// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  ReceivedSharesGetReceivedShare200Response,
  ReceivedSharesGetReceivedShareDefaultResponse,
  ReceivedSharesCreateOrReplace200Response,
  ReceivedSharesCreateOrReplace201Response,
  ReceivedSharesCreateOrReplaceDefaultResponse,
  ReceivedSharesDeleteReceivedShare202Response,
  ReceivedSharesDeleteReceivedShareDefaultResponse,
  ReceivedSharesGetAllAttachedReceivedShares200Response,
  ReceivedSharesGetAllAttachedReceivedSharesDefaultResponse,
  ReceivedSharesGetAllDetachedReceivedShares200Response,
  ReceivedSharesGetAllDetachedReceivedSharesDefaultResponse,
  ReceivedSharesActivateTenantEmailRegistration200Response,
  ReceivedSharesActivateTenantEmailRegistrationDefaultResponse,
  ReceivedSharesRegisterTenantEmailRegistration200Response,
  ReceivedSharesRegisterTenantEmailRegistrationDefaultResponse,
  SentSharesGetAllSentShares200Response,
  SentSharesGetAllSentSharesDefaultResponse,
  SentSharesGetSentShare200Response,
  SentSharesGetSentShareDefaultResponse,
  SentSharesCreateOrReplace200Response,
  SentSharesCreateOrReplace201Response,
  SentSharesCreateOrReplaceDefaultResponse,
  SentSharesDeleteSentShare202Response,
  SentSharesDeleteSentShareDefaultResponse,
  SentSharesGetAllSentShareInvitations200Response,
  SentSharesGetAllSentShareInvitationsDefaultResponse,
  SentSharesGetSentShareInvitation200Response,
  SentSharesGetSentShareInvitationDefaultResponse,
  SentSharesCreateSentShareInvitation201Response,
  SentSharesCreateSentShareInvitationDefaultResponse,
  SentSharesDeleteSentShareInvitation202Response,
  SentSharesDeleteSentShareInvitationDefaultResponse,
  SentSharesNotifyUserSentShareInvitation200Response,
  SentSharesNotifyUserSentShareInvitationDefaultResponse,
  ShareResourcesGetAllShareResources200Response,
  ShareResourcesGetAllShareResourcesDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /receivedShares/{receivedShareId}": ["200"],
  "PUT /receivedShares/{receivedShareId}": ["200", "201"],
  "DELETE /receivedShares/{receivedShareId}": ["202"],
  "GET /receivedShares/attached": ["200"],
  "GET /receivedShares/detached": ["200"],
  "POST /emails:activate": ["200"],
  "POST /emails:register": ["200"],
  "GET /sentShares": ["200"],
  "GET /sentShares/{sentShareId}": ["200"],
  "PUT /sentShares/{sentShareId}": ["200", "201"],
  "DELETE /sentShares/{sentShareId}": ["202"],
  "GET /sentShares/{sentShareId}/sentShareInvitations": ["200"],
  "GET /sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}": ["200"],
  "PUT /sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}": ["201"],
  "DELETE /sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}": ["202"],
  "POST /sentShares/{sentShareId}/sentShareInvitations/{sentShareInvitationId}:notify": ["200"],
  "GET /shareResources": ["200"],
};

export function isUnexpected(
  response:
    | ReceivedSharesGetReceivedShare200Response
    | ReceivedSharesGetReceivedShareDefaultResponse,
): response is ReceivedSharesGetReceivedShareDefaultResponse;
export function isUnexpected(
  response:
    | ReceivedSharesCreateOrReplace200Response
    | ReceivedSharesCreateOrReplace201Response
    | ReceivedSharesCreateOrReplaceDefaultResponse,
): response is ReceivedSharesCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response:
    | ReceivedSharesDeleteReceivedShare202Response
    | ReceivedSharesDeleteReceivedShareDefaultResponse,
): response is ReceivedSharesDeleteReceivedShareDefaultResponse;
export function isUnexpected(
  response:
    | ReceivedSharesGetAllAttachedReceivedShares200Response
    | ReceivedSharesGetAllAttachedReceivedSharesDefaultResponse,
): response is ReceivedSharesGetAllAttachedReceivedSharesDefaultResponse;
export function isUnexpected(
  response:
    | ReceivedSharesGetAllDetachedReceivedShares200Response
    | ReceivedSharesGetAllDetachedReceivedSharesDefaultResponse,
): response is ReceivedSharesGetAllDetachedReceivedSharesDefaultResponse;
export function isUnexpected(
  response:
    | ReceivedSharesActivateTenantEmailRegistration200Response
    | ReceivedSharesActivateTenantEmailRegistrationDefaultResponse,
): response is ReceivedSharesActivateTenantEmailRegistrationDefaultResponse;
export function isUnexpected(
  response:
    | ReceivedSharesRegisterTenantEmailRegistration200Response
    | ReceivedSharesRegisterTenantEmailRegistrationDefaultResponse,
): response is ReceivedSharesRegisterTenantEmailRegistrationDefaultResponse;
export function isUnexpected(
  response: SentSharesGetAllSentShares200Response | SentSharesGetAllSentSharesDefaultResponse,
): response is SentSharesGetAllSentSharesDefaultResponse;
export function isUnexpected(
  response: SentSharesGetSentShare200Response | SentSharesGetSentShareDefaultResponse,
): response is SentSharesGetSentShareDefaultResponse;
export function isUnexpected(
  response:
    | SentSharesCreateOrReplace200Response
    | SentSharesCreateOrReplace201Response
    | SentSharesCreateOrReplaceDefaultResponse,
): response is SentSharesCreateOrReplaceDefaultResponse;
export function isUnexpected(
  response: SentSharesDeleteSentShare202Response | SentSharesDeleteSentShareDefaultResponse,
): response is SentSharesDeleteSentShareDefaultResponse;
export function isUnexpected(
  response:
    | SentSharesGetAllSentShareInvitations200Response
    | SentSharesGetAllSentShareInvitationsDefaultResponse,
): response is SentSharesGetAllSentShareInvitationsDefaultResponse;
export function isUnexpected(
  response:
    | SentSharesGetSentShareInvitation200Response
    | SentSharesGetSentShareInvitationDefaultResponse,
): response is SentSharesGetSentShareInvitationDefaultResponse;
export function isUnexpected(
  response:
    | SentSharesCreateSentShareInvitation201Response
    | SentSharesCreateSentShareInvitationDefaultResponse,
): response is SentSharesCreateSentShareInvitationDefaultResponse;
export function isUnexpected(
  response:
    | SentSharesDeleteSentShareInvitation202Response
    | SentSharesDeleteSentShareInvitationDefaultResponse,
): response is SentSharesDeleteSentShareInvitationDefaultResponse;
export function isUnexpected(
  response:
    | SentSharesNotifyUserSentShareInvitation200Response
    | SentSharesNotifyUserSentShareInvitationDefaultResponse,
): response is SentSharesNotifyUserSentShareInvitationDefaultResponse;
export function isUnexpected(
  response:
    | ShareResourcesGetAllShareResources200Response
    | ShareResourcesGetAllShareResourcesDefaultResponse,
): response is ShareResourcesGetAllShareResourcesDefaultResponse;
export function isUnexpected(
  response:
    | ReceivedSharesGetReceivedShare200Response
    | ReceivedSharesGetReceivedShareDefaultResponse
    | ReceivedSharesCreateOrReplace200Response
    | ReceivedSharesCreateOrReplace201Response
    | ReceivedSharesCreateOrReplaceDefaultResponse
    | ReceivedSharesDeleteReceivedShare202Response
    | ReceivedSharesDeleteReceivedShareDefaultResponse
    | ReceivedSharesGetAllAttachedReceivedShares200Response
    | ReceivedSharesGetAllAttachedReceivedSharesDefaultResponse
    | ReceivedSharesGetAllDetachedReceivedShares200Response
    | ReceivedSharesGetAllDetachedReceivedSharesDefaultResponse
    | ReceivedSharesActivateTenantEmailRegistration200Response
    | ReceivedSharesActivateTenantEmailRegistrationDefaultResponse
    | ReceivedSharesRegisterTenantEmailRegistration200Response
    | ReceivedSharesRegisterTenantEmailRegistrationDefaultResponse
    | SentSharesGetAllSentShares200Response
    | SentSharesGetAllSentSharesDefaultResponse
    | SentSharesGetSentShare200Response
    | SentSharesGetSentShareDefaultResponse
    | SentSharesCreateOrReplace200Response
    | SentSharesCreateOrReplace201Response
    | SentSharesCreateOrReplaceDefaultResponse
    | SentSharesDeleteSentShare202Response
    | SentSharesDeleteSentShareDefaultResponse
    | SentSharesGetAllSentShareInvitations200Response
    | SentSharesGetAllSentShareInvitationsDefaultResponse
    | SentSharesGetSentShareInvitation200Response
    | SentSharesGetSentShareInvitationDefaultResponse
    | SentSharesCreateSentShareInvitation201Response
    | SentSharesCreateSentShareInvitationDefaultResponse
    | SentSharesDeleteSentShareInvitation202Response
    | SentSharesDeleteSentShareInvitationDefaultResponse
    | SentSharesNotifyUserSentShareInvitation200Response
    | SentSharesNotifyUserSentShareInvitationDefaultResponse
    | ShareResourcesGetAllShareResources200Response
    | ShareResourcesGetAllShareResourcesDefaultResponse,
): response is
  | ReceivedSharesGetReceivedShareDefaultResponse
  | ReceivedSharesCreateOrReplaceDefaultResponse
  | ReceivedSharesDeleteReceivedShareDefaultResponse
  | ReceivedSharesGetAllAttachedReceivedSharesDefaultResponse
  | ReceivedSharesGetAllDetachedReceivedSharesDefaultResponse
  | ReceivedSharesActivateTenantEmailRegistrationDefaultResponse
  | ReceivedSharesRegisterTenantEmailRegistrationDefaultResponse
  | SentSharesGetAllSentSharesDefaultResponse
  | SentSharesGetSentShareDefaultResponse
  | SentSharesCreateOrReplaceDefaultResponse
  | SentSharesDeleteSentShareDefaultResponse
  | SentSharesGetAllSentShareInvitationsDefaultResponse
  | SentSharesGetSentShareInvitationDefaultResponse
  | SentSharesCreateSentShareInvitationDefaultResponse
  | SentSharesDeleteSentShareInvitationDefaultResponse
  | SentSharesNotifyUserSentShareInvitationDefaultResponse
  | ShareResourcesGetAllShareResourcesDefaultResponse {
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
