// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AccountsGetAccountProperties200Response,
  AccountsGetAccountPropertiesDefaultResponse,
  AccountsUpdateAccountProperties200Response,
  AccountsUpdateAccountPropertiesDefaultResponse,
  AccountsGetAccessKeys200Response,
  AccountsGetAccessKeysDefaultResponse,
  AccountsRegenerateAccessKey200Response,
  AccountsRegenerateAccessKeyDefaultResponse,
  CollectionsGetCollection200Response,
  CollectionsGetCollectionDefaultResponse,
  CollectionsCreateOrUpdateCollection200Response,
  CollectionsCreateOrUpdateCollectionDefaultResponse,
  CollectionsDeleteCollection204Response,
  CollectionsDeleteCollectionDefaultResponse,
  CollectionsListCollections200Response,
  CollectionsListCollectionsDefaultResponse,
  CollectionsListChildCollectionNames200Response,
  CollectionsListChildCollectionNamesDefaultResponse,
  CollectionsGetCollectionPath200Response,
  CollectionsGetCollectionPathDefaultResponse,
  ResourceSetRulesGetResourceSetRule200Response,
  ResourceSetRulesGetResourceSetRuleDefaultResponse,
  ResourceSetRulesCreateOrUpdateResourceSetRule200Response,
  ResourceSetRulesCreateOrUpdateResourceSetRuleDefaultResponse,
  ResourceSetRulesDeleteResourceSetRule200Response,
  ResourceSetRulesDeleteResourceSetRule204Response,
  ResourceSetRulesDeleteResourceSetRuleDefaultResponse,
  ResourceSetRulesListResourceSetRules200Response,
  ResourceSetRulesListResourceSetRulesDefaultResponse,
} from "./responses";

const responseMap: Record<string, string[]> = {
  "GET /": ["200"],
  "PATCH /": ["200"],
  "POST /listkeys": ["200"],
  "POST /regeneratekeys": ["200"],
  "GET /collections/{collectionName}": ["200"],
  "PUT /collections/{collectionName}": ["200"],
  "DELETE /collections/{collectionName}": ["204"],
  "GET /collections": ["200"],
  "GET /collections/{collectionName}/getChildCollectionNames": ["200"],
  "GET /collections/{collectionName}/getCollectionPath": ["200"],
  "GET /resourceSetRuleConfigs/defaultResourceSetRuleConfig": ["200"],
  "PUT /resourceSetRuleConfigs/defaultResourceSetRuleConfig": ["200"],
  "DELETE /resourceSetRuleConfigs/defaultResourceSetRuleConfig": ["200", "204"],
  "GET /resourceSetRuleConfigs": ["200"],
};

export function isUnexpected(
  response:
    | AccountsGetAccountProperties200Response
    | AccountsGetAccountPropertiesDefaultResponse,
): response is AccountsGetAccountPropertiesDefaultResponse;
export function isUnexpected(
  response:
    | AccountsUpdateAccountProperties200Response
    | AccountsUpdateAccountPropertiesDefaultResponse,
): response is AccountsUpdateAccountPropertiesDefaultResponse;
export function isUnexpected(
  response:
    | AccountsGetAccessKeys200Response
    | AccountsGetAccessKeysDefaultResponse,
): response is AccountsGetAccessKeysDefaultResponse;
export function isUnexpected(
  response:
    | AccountsRegenerateAccessKey200Response
    | AccountsRegenerateAccessKeyDefaultResponse,
): response is AccountsRegenerateAccessKeyDefaultResponse;
export function isUnexpected(
  response:
    | CollectionsGetCollection200Response
    | CollectionsGetCollectionDefaultResponse,
): response is CollectionsGetCollectionDefaultResponse;
export function isUnexpected(
  response:
    | CollectionsCreateOrUpdateCollection200Response
    | CollectionsCreateOrUpdateCollectionDefaultResponse,
): response is CollectionsCreateOrUpdateCollectionDefaultResponse;
export function isUnexpected(
  response:
    | CollectionsDeleteCollection204Response
    | CollectionsDeleteCollectionDefaultResponse,
): response is CollectionsDeleteCollectionDefaultResponse;
export function isUnexpected(
  response:
    | CollectionsListCollections200Response
    | CollectionsListCollectionsDefaultResponse,
): response is CollectionsListCollectionsDefaultResponse;
export function isUnexpected(
  response:
    | CollectionsListChildCollectionNames200Response
    | CollectionsListChildCollectionNamesDefaultResponse,
): response is CollectionsListChildCollectionNamesDefaultResponse;
export function isUnexpected(
  response:
    | CollectionsGetCollectionPath200Response
    | CollectionsGetCollectionPathDefaultResponse,
): response is CollectionsGetCollectionPathDefaultResponse;
export function isUnexpected(
  response:
    | ResourceSetRulesGetResourceSetRule200Response
    | ResourceSetRulesGetResourceSetRuleDefaultResponse,
): response is ResourceSetRulesGetResourceSetRuleDefaultResponse;
export function isUnexpected(
  response:
    | ResourceSetRulesCreateOrUpdateResourceSetRule200Response
    | ResourceSetRulesCreateOrUpdateResourceSetRuleDefaultResponse,
): response is ResourceSetRulesCreateOrUpdateResourceSetRuleDefaultResponse;
export function isUnexpected(
  response:
    | ResourceSetRulesDeleteResourceSetRule200Response
    | ResourceSetRulesDeleteResourceSetRule204Response
    | ResourceSetRulesDeleteResourceSetRuleDefaultResponse,
): response is ResourceSetRulesDeleteResourceSetRuleDefaultResponse;
export function isUnexpected(
  response:
    | ResourceSetRulesListResourceSetRules200Response
    | ResourceSetRulesListResourceSetRulesDefaultResponse,
): response is ResourceSetRulesListResourceSetRulesDefaultResponse;
export function isUnexpected(
  response:
    | AccountsGetAccountProperties200Response
    | AccountsGetAccountPropertiesDefaultResponse
    | AccountsUpdateAccountProperties200Response
    | AccountsUpdateAccountPropertiesDefaultResponse
    | AccountsGetAccessKeys200Response
    | AccountsGetAccessKeysDefaultResponse
    | AccountsRegenerateAccessKey200Response
    | AccountsRegenerateAccessKeyDefaultResponse
    | CollectionsGetCollection200Response
    | CollectionsGetCollectionDefaultResponse
    | CollectionsCreateOrUpdateCollection200Response
    | CollectionsCreateOrUpdateCollectionDefaultResponse
    | CollectionsDeleteCollection204Response
    | CollectionsDeleteCollectionDefaultResponse
    | CollectionsListCollections200Response
    | CollectionsListCollectionsDefaultResponse
    | CollectionsListChildCollectionNames200Response
    | CollectionsListChildCollectionNamesDefaultResponse
    | CollectionsGetCollectionPath200Response
    | CollectionsGetCollectionPathDefaultResponse
    | ResourceSetRulesGetResourceSetRule200Response
    | ResourceSetRulesGetResourceSetRuleDefaultResponse
    | ResourceSetRulesCreateOrUpdateResourceSetRule200Response
    | ResourceSetRulesCreateOrUpdateResourceSetRuleDefaultResponse
    | ResourceSetRulesDeleteResourceSetRule200Response
    | ResourceSetRulesDeleteResourceSetRule204Response
    | ResourceSetRulesDeleteResourceSetRuleDefaultResponse
    | ResourceSetRulesListResourceSetRules200Response
    | ResourceSetRulesListResourceSetRulesDefaultResponse,
): response is
  | AccountsGetAccountPropertiesDefaultResponse
  | AccountsUpdateAccountPropertiesDefaultResponse
  | AccountsGetAccessKeysDefaultResponse
  | AccountsRegenerateAccessKeyDefaultResponse
  | CollectionsGetCollectionDefaultResponse
  | CollectionsCreateOrUpdateCollectionDefaultResponse
  | CollectionsDeleteCollectionDefaultResponse
  | CollectionsListCollectionsDefaultResponse
  | CollectionsListChildCollectionNamesDefaultResponse
  | CollectionsGetCollectionPathDefaultResponse
  | ResourceSetRulesGetResourceSetRuleDefaultResponse
  | ResourceSetRulesCreateOrUpdateResourceSetRuleDefaultResponse
  | ResourceSetRulesDeleteResourceSetRuleDefaultResponse
  | ResourceSetRulesListResourceSetRulesDefaultResponse {
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
