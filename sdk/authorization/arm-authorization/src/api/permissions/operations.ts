// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AuthorizationManagementContext as Client } from "../index.js";
import type {
  Permission,
  _PermissionGetResult,
} from "../../models/microsoft/roleDefinitions/models.js";
import { _permissionGetResultDeserializer } from "../../models/microsoft/roleDefinitions/models.js";
import { errorResponseDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PermissionsListForResourceOptionalParams,
  PermissionsListForResourceGroupOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listForResourceSend(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  options: PermissionsListForResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/{+resourceProviderNamespace}/{+parentResourcePath}/{+resourceType}/{resourceName}/providers/Microsoft.Authorization/permissions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceProviderNamespace: resourceProviderNamespace,
      parentResourcePath: parentResourcePath,
      resourceType: resourceType,
      resourceName: resourceName,
      "api%2Dversion": "2022-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listForResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_PermissionGetResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _permissionGetResultDeserializer(result.body);
}

/** Gets all permissions the caller has for a resource. */
export function listForResource(
  context: Client,
  resourceGroupName: string,
  resourceProviderNamespace: string,
  parentResourcePath: string,
  resourceType: string,
  resourceName: string,
  options: PermissionsListForResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Permission> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listForResourceSend(
        context,
        resourceGroupName,
        resourceProviderNamespace,
        parentResourcePath,
        resourceType,
        resourceName,
        options,
      ),
    _listForResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-05-01-preview" },
  );
}

export function _listForResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PermissionsListForResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Authorization/permissions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2022-05-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _listForResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PermissionGetResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _permissionGetResultDeserializer(result.body);
}

/** Gets all permissions the caller has for a resource group. */
export function listForResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PermissionsListForResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Permission> {
  return buildPagedAsyncIterator(
    context,
    () => _listForResourceGroupSend(context, resourceGroupName, options),
    _listForResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2022-05-01-preview" },
  );
}
