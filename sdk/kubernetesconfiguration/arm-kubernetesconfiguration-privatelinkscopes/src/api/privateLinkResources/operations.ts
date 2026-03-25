// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PrivateLinkScopesContext as Client } from "../index.js";
import type { PrivateLinkResource, PrivateLinkResourceListResult } from "../../models/models.js";
import {
  privateLinkResourceDeserializer,
  errorResponseDeserializer,
  privateLinkResourceListResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateLinkResourcesListByPrivateLinkScopeOptionalParams,
  PrivateLinkResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByPrivateLinkScopeSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: PrivateLinkResourcesListByPrivateLinkScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KubernetesConfiguration/privateLinkScopes/{scopeName}/privateLinkResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
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

export async function _listByPrivateLinkScopeDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateLinkResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateLinkResourceListResultDeserializer(result.body);
}

/** Gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope. */
export async function listByPrivateLinkScope(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: PrivateLinkResourcesListByPrivateLinkScopeOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResourceListResult> {
  const result = await _listByPrivateLinkScopeSend(context, resourceGroupName, scopeName, options);
  return _listByPrivateLinkScopeDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  groupName: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.KubernetesConfiguration/privateLinkScopes/{scopeName}/privateLinkResources/{groupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      groupName: groupName,
      "api%2Dversion": context.apiVersion ?? "2024-11-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PrivateLinkResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return privateLinkResourceDeserializer(result.body);
}

/** Gets the private link resources that need to be created for a Azure Monitor PrivateLinkScope. */
export async function get(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  groupName: string,
  options: PrivateLinkResourcesGetOptionalParams = { requestOptions: {} },
): Promise<PrivateLinkResource> {
  const result = await _getSend(context, resourceGroupName, scopeName, groupName, options);
  return _getDeserialize(result);
}
