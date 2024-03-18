// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import {
  OperationsList200Response,
  OperationsListDefaultResponse,
  DataProductsCatalogsGet200Response,
  DataProductsCatalogsGetDefaultResponse,
  DataProductsCatalogsListByResourceGroup200Response,
  DataProductsCatalogsListByResourceGroupDefaultResponse,
  DataProductsCatalogsListBySubscription200Response,
  DataProductsCatalogsListBySubscriptionDefaultResponse,
  DataTypesCreate200Response,
  DataTypesCreate201Response,
  DataTypesCreateLogicalResponse,
  DataTypesCreateDefaultResponse,
  DataTypesGet200Response,
  DataTypesGetDefaultResponse,
  DataTypesUpdate200Response,
  DataTypesUpdate202Response,
  DataTypesUpdateLogicalResponse,
  DataTypesUpdateDefaultResponse,
  DataTypesDeleteOperation202Response,
  DataTypesDeleteOperation204Response,
  DataTypesDeleteLogicalResponse,
  DataTypesDeleteOperationDefaultResponse,
  DataTypesDeleteData202Response,
  DataTypesDeleteData204Response,
  DataTypesDeleteDataLogicalResponse,
  DataTypesDeleteDataDefaultResponse,
  DataTypesGenerateStorageContainerSasToken200Response,
  DataTypesGenerateStorageContainerSasTokenDefaultResponse,
  DataTypesListByDataProduct200Response,
  DataTypesListByDataProductDefaultResponse,
  DataProductsCreate200Response,
  DataProductsCreate201Response,
  DataProductsCreateLogicalResponse,
  DataProductsCreateDefaultResponse,
  DataProductsGet200Response,
  DataProductsGetDefaultResponse,
  DataProductsUpdate200Response,
  DataProductsUpdate202Response,
  DataProductsUpdateLogicalResponse,
  DataProductsUpdateDefaultResponse,
  DataProductsDeleteOperation202Response,
  DataProductsDeleteOperation204Response,
  DataProductsDeleteLogicalResponse,
  DataProductsDeleteOperationDefaultResponse,
  DataProductsGenerateStorageAccountSasToken200Response,
  DataProductsGenerateStorageAccountSasTokenDefaultResponse,
  DataProductsRotateKey204Response,
  DataProductsRotateKeyDefaultResponse,
  DataProductsAddUserRole200Response,
  DataProductsAddUserRoleDefaultResponse,
  DataProductsRemoveUserRole204Response,
  DataProductsRemoveUserRoleDefaultResponse,
  DataProductsListRolesAssignments200Response,
  DataProductsListRolesAssignmentsDefaultResponse,
  DataProductsListByResourceGroup200Response,
  DataProductsListByResourceGroupDefaultResponse,
  DataProductsListBySubscription200Response,
  DataProductsListBySubscriptionDefaultResponse,
} from "./responses.js";

const responseMap: Record<string, string[]> = {
  "GET /providers/Microsoft.NetworkAnalytics/operations": ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProductsCatalogs/default":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProductsCatalogs":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.NetworkAnalytics/dataProductsCatalogs":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}":
    ["200", "201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}":
    ["200", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}":
    ["202", "204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}/deleteData":
    ["202", "204"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}/deleteData":
    ["200", "202", "204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes/{dataTypeName}/generateStorageContainerSasToken":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/dataTypes":
    ["200"],
  "PUT /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}":
    ["200", "201"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}":
    ["200"],
  "PATCH /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}":
    ["200", "202"],
  "DELETE /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}":
    ["202", "204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/generateStorageAccountSasToken":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/rotateKey":
    ["204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/addUserRole":
    ["200"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/removeUserRole":
    ["204"],
  "POST /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts/{dataProductName}/listRolesAssignments":
    ["200"],
  "GET /subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkAnalytics/dataProducts":
    ["200"],
  "GET /subscriptions/{subscriptionId}/providers/Microsoft.NetworkAnalytics/dataProducts":
    ["200"],
};

export function isUnexpected(
  response: OperationsList200Response | OperationsListDefaultResponse,
): response is OperationsListDefaultResponse;
export function isUnexpected(
  response:
    | DataProductsCatalogsGet200Response
    | DataProductsCatalogsGetDefaultResponse,
): response is DataProductsCatalogsGetDefaultResponse;
export function isUnexpected(
  response:
    | DataProductsCatalogsListByResourceGroup200Response
    | DataProductsCatalogsListByResourceGroupDefaultResponse,
): response is DataProductsCatalogsListByResourceGroupDefaultResponse;
export function isUnexpected(
  response:
    | DataProductsCatalogsListBySubscription200Response
    | DataProductsCatalogsListBySubscriptionDefaultResponse,
): response is DataProductsCatalogsListBySubscriptionDefaultResponse;
export function isUnexpected(
  response:
    | DataTypesCreate200Response
    | DataTypesCreate201Response
    | DataTypesCreateLogicalResponse
    | DataTypesCreateDefaultResponse,
): response is DataTypesCreateDefaultResponse;
export function isUnexpected(
  response: DataTypesGet200Response | DataTypesGetDefaultResponse,
): response is DataTypesGetDefaultResponse;
export function isUnexpected(
  response:
    | DataTypesUpdate200Response
    | DataTypesUpdate202Response
    | DataTypesUpdateLogicalResponse
    | DataTypesUpdateDefaultResponse,
): response is DataTypesUpdateDefaultResponse;
export function isUnexpected(
  response:
    | DataTypesDeleteOperation202Response
    | DataTypesDeleteOperation204Response
    | DataTypesDeleteLogicalResponse
    | DataTypesDeleteOperationDefaultResponse,
): response is DataTypesDeleteOperationDefaultResponse;
export function isUnexpected(
  response:
    | DataTypesDeleteData202Response
    | DataTypesDeleteData204Response
    | DataTypesDeleteDataLogicalResponse
    | DataTypesDeleteDataDefaultResponse,
): response is DataTypesDeleteDataDefaultResponse;
export function isUnexpected(
  response:
    | DataTypesGenerateStorageContainerSasToken200Response
    | DataTypesGenerateStorageContainerSasTokenDefaultResponse,
): response is DataTypesGenerateStorageContainerSasTokenDefaultResponse;
export function isUnexpected(
  response:
    | DataTypesListByDataProduct200Response
    | DataTypesListByDataProductDefaultResponse,
): response is DataTypesListByDataProductDefaultResponse;
export function isUnexpected(
  response:
    | DataProductsCreate200Response
    | DataProductsCreate201Response
    | DataProductsCreateLogicalResponse
    | DataProductsCreateDefaultResponse,
): response is DataProductsCreateDefaultResponse;
export function isUnexpected(
  response: DataProductsGet200Response | DataProductsGetDefaultResponse,
): response is DataProductsGetDefaultResponse;
export function isUnexpected(
  response:
    | DataProductsUpdate200Response
    | DataProductsUpdate202Response
    | DataProductsUpdateLogicalResponse
    | DataProductsUpdateDefaultResponse,
): response is DataProductsUpdateDefaultResponse;
export function isUnexpected(
  response:
    | DataProductsDeleteOperation202Response
    | DataProductsDeleteOperation204Response
    | DataProductsDeleteLogicalResponse
    | DataProductsDeleteOperationDefaultResponse,
): response is DataProductsDeleteOperationDefaultResponse;
export function isUnexpected(
  response:
    | DataProductsGenerateStorageAccountSasToken200Response
    | DataProductsGenerateStorageAccountSasTokenDefaultResponse,
): response is DataProductsGenerateStorageAccountSasTokenDefaultResponse;
export function isUnexpected(
  response:
    | DataProductsRotateKey204Response
    | DataProductsRotateKeyDefaultResponse,
): response is DataProductsRotateKeyDefaultResponse;
export function isUnexpected(
  response:
    | DataProductsAddUserRole200Response
    | DataProductsAddUserRoleDefaultResponse,
): response is DataProductsAddUserRoleDefaultResponse;
export function isUnexpected(
  response:
    | DataProductsRemoveUserRole204Response
    | DataProductsRemoveUserRoleDefaultResponse,
): response is DataProductsRemoveUserRoleDefaultResponse;
export function isUnexpected(
  response:
    | DataProductsListRolesAssignments200Response
    | DataProductsListRolesAssignmentsDefaultResponse,
): response is DataProductsListRolesAssignmentsDefaultResponse;
export function isUnexpected(
  response:
    | DataProductsListByResourceGroup200Response
    | DataProductsListByResourceGroupDefaultResponse,
): response is DataProductsListByResourceGroupDefaultResponse;
export function isUnexpected(
  response:
    | DataProductsListBySubscription200Response
    | DataProductsListBySubscriptionDefaultResponse,
): response is DataProductsListBySubscriptionDefaultResponse;
export function isUnexpected(
  response:
    | OperationsList200Response
    | OperationsListDefaultResponse
    | DataProductsCatalogsGet200Response
    | DataProductsCatalogsGetDefaultResponse
    | DataProductsCatalogsListByResourceGroup200Response
    | DataProductsCatalogsListByResourceGroupDefaultResponse
    | DataProductsCatalogsListBySubscription200Response
    | DataProductsCatalogsListBySubscriptionDefaultResponse
    | DataTypesCreate200Response
    | DataTypesCreate201Response
    | DataTypesCreateLogicalResponse
    | DataTypesCreateDefaultResponse
    | DataTypesGet200Response
    | DataTypesGetDefaultResponse
    | DataTypesUpdate200Response
    | DataTypesUpdate202Response
    | DataTypesUpdateLogicalResponse
    | DataTypesUpdateDefaultResponse
    | DataTypesDeleteOperation202Response
    | DataTypesDeleteOperation204Response
    | DataTypesDeleteLogicalResponse
    | DataTypesDeleteOperationDefaultResponse
    | DataTypesDeleteData202Response
    | DataTypesDeleteData204Response
    | DataTypesDeleteDataLogicalResponse
    | DataTypesDeleteDataDefaultResponse
    | DataTypesGenerateStorageContainerSasToken200Response
    | DataTypesGenerateStorageContainerSasTokenDefaultResponse
    | DataTypesListByDataProduct200Response
    | DataTypesListByDataProductDefaultResponse
    | DataProductsCreate200Response
    | DataProductsCreate201Response
    | DataProductsCreateLogicalResponse
    | DataProductsCreateDefaultResponse
    | DataProductsGet200Response
    | DataProductsGetDefaultResponse
    | DataProductsUpdate200Response
    | DataProductsUpdate202Response
    | DataProductsUpdateLogicalResponse
    | DataProductsUpdateDefaultResponse
    | DataProductsDeleteOperation202Response
    | DataProductsDeleteOperation204Response
    | DataProductsDeleteLogicalResponse
    | DataProductsDeleteOperationDefaultResponse
    | DataProductsGenerateStorageAccountSasToken200Response
    | DataProductsGenerateStorageAccountSasTokenDefaultResponse
    | DataProductsRotateKey204Response
    | DataProductsRotateKeyDefaultResponse
    | DataProductsAddUserRole200Response
    | DataProductsAddUserRoleDefaultResponse
    | DataProductsRemoveUserRole204Response
    | DataProductsRemoveUserRoleDefaultResponse
    | DataProductsListRolesAssignments200Response
    | DataProductsListRolesAssignmentsDefaultResponse
    | DataProductsListByResourceGroup200Response
    | DataProductsListByResourceGroupDefaultResponse
    | DataProductsListBySubscription200Response
    | DataProductsListBySubscriptionDefaultResponse,
): response is
  | OperationsListDefaultResponse
  | DataProductsCatalogsGetDefaultResponse
  | DataProductsCatalogsListByResourceGroupDefaultResponse
  | DataProductsCatalogsListBySubscriptionDefaultResponse
  | DataTypesCreateDefaultResponse
  | DataTypesGetDefaultResponse
  | DataTypesUpdateDefaultResponse
  | DataTypesDeleteOperationDefaultResponse
  | DataTypesDeleteDataDefaultResponse
  | DataTypesGenerateStorageContainerSasTokenDefaultResponse
  | DataTypesListByDataProductDefaultResponse
  | DataProductsCreateDefaultResponse
  | DataProductsGetDefaultResponse
  | DataProductsUpdateDefaultResponse
  | DataProductsDeleteOperationDefaultResponse
  | DataProductsGenerateStorageAccountSasTokenDefaultResponse
  | DataProductsRotateKeyDefaultResponse
  | DataProductsAddUserRoleDefaultResponse
  | DataProductsRemoveUserRoleDefaultResponse
  | DataProductsListRolesAssignmentsDefaultResponse
  | DataProductsListByResourceGroupDefaultResponse
  | DataProductsListBySubscriptionDefaultResponse {
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
