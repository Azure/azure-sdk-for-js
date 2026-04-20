// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MonitorContext as Client } from "../index.js";
import type { MicrosoftPrivateLinkScopesScopedResource } from "../../models/microsoft/privateLinkScopes/models.js";
import {
  microsoftPrivateLinkScopesScopedResourceSerializer,
  microsoftPrivateLinkScopesScopedResourceDeserializer,
} from "../../models/microsoft/privateLinkScopes/models.js";
import type { _ScopedResourceListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  _scopedResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PrivateLinkScopedResourcesListByPrivateLinkScopeOptionalParams,
  PrivateLinkScopedResourcesDeleteOptionalParams,
  PrivateLinkScopedResourcesCreateOrUpdateOptionalParams,
  PrivateLinkScopedResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByPrivateLinkScopeSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: PrivateLinkScopedResourcesListByPrivateLinkScopeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/scopedResources{?api%2Dversion,kind}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      "api%2Dversion": "2023-06-01-preview",
      kind: options?.kind,
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
): Promise<_ScopedResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _scopedResourceListResultDeserializer(result.body);
}

/** Gets all scoped resources on a private link scope. */
export function listByPrivateLinkScope(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  options: PrivateLinkScopedResourcesListByPrivateLinkScopeOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<MicrosoftPrivateLinkScopesScopedResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByPrivateLinkScopeSend(context, resourceGroupName, scopeName, options),
    _listByPrivateLinkScopeDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2023-06-01-preview" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  name: string,
  options: PrivateLinkScopedResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/scopedResources/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      name: name,
      "api%2Dversion": "2023-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "202", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes an Azure monitor scoped resource with a given name. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  name: string,
  options: PrivateLinkScopedResourcesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, scopeName, name, options),
    resourceLocationConfig: "location",
    apiVersion: "2023-06-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  name: string,
  parameters: MicrosoftPrivateLinkScopesScopedResource,
  options: PrivateLinkScopedResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/scopedResources/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      name: name,
      "api%2Dversion": "2023-06-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: microsoftPrivateLinkScopesScopedResourceSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftPrivateLinkScopesScopedResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftPrivateLinkScopesScopedResourceDeserializer(result.body);
}

/** Add an Azure monitor scoped resource in the private link scope. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  name: string,
  parameters: MicrosoftPrivateLinkScopesScopedResource,
  options: PrivateLinkScopedResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<MicrosoftPrivateLinkScopesScopedResource>,
  MicrosoftPrivateLinkScopesScopedResource
> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, scopeName, name, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2023-06-01-preview",
  }) as PollerLike<
    OperationState<MicrosoftPrivateLinkScopesScopedResource>,
    MicrosoftPrivateLinkScopesScopedResource
  >;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  name: string,
  options: PrivateLinkScopedResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourcegroups/{resourceGroupName}/providers/Microsoft.Insights/privateLinkScopes/{scopeName}/scopedResources/{name}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      scopeName: scopeName,
      name: name,
      "api%2Dversion": "2023-06-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<MicrosoftPrivateLinkScopesScopedResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return microsoftPrivateLinkScopesScopedResourceDeserializer(result.body);
}

/** Gets a scoped resource in a private link scope. */
export async function get(
  context: Client,
  resourceGroupName: string,
  scopeName: string,
  name: string,
  options: PrivateLinkScopedResourcesGetOptionalParams = { requestOptions: {} },
): Promise<MicrosoftPrivateLinkScopesScopedResource> {
  const result = await _getSend(context, resourceGroupName, scopeName, name, options);
  return _getDeserialize(result);
}
