// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type { IdentityBinding, _IdentityBindingListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  identityBindingSerializer,
  identityBindingDeserializer,
  _identityBindingListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IdentityBindingsListByManagedClusterOptionalParams,
  IdentityBindingsDeleteOptionalParams,
  IdentityBindingsCreateOrUpdateOptionalParams,
  IdentityBindingsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByManagedClusterSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IdentityBindingsListByManagedClusterOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/identityBindings{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _listByManagedClusterDeserialize(
  result: PathUncheckedResponse,
): Promise<_IdentityBindingListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _identityBindingListResultDeserializer(result.body);
}

/** Gets a list of identity bindings in the specified managed cluster. */
export function listByManagedCluster(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: IdentityBindingsListByManagedClusterOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<IdentityBinding> {
  return buildPagedAsyncIterator(
    context,
    () => _listByManagedClusterSend(context, resourceGroupName, resourceName, options),
    _listByManagedClusterDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-10-02-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  identityBindingName: string,
  options: IdentityBindingsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/identityBindings/{identityBindingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      identityBindingName: identityBindingName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return;
}

/** Deletes an identity binding in the specified managed cluster. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  identityBindingName: string,
  options: IdentityBindingsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, resourceName, identityBindingName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  identityBindingName: string,
  parameters: IdentityBinding,
  options: IdentityBindingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/identityBindings/{identityBindingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      identityBindingName: identityBindingName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: identityBindingSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<IdentityBinding> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return identityBindingDeserializer(result.body);
}

/** Creates or updates an identity binding in the specified managed cluster. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  identityBindingName: string,
  parameters: IdentityBinding,
  options: IdentityBindingsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IdentityBinding>, IdentityBinding> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        resourceName,
        identityBindingName,
        parameters,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-10-02-preview",
  }) as PollerLike<OperationState<IdentityBinding>, IdentityBinding>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  identityBindingName: string,
  options: IdentityBindingsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/managedClusters/{resourceName}/identityBindings/{identityBindingName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      identityBindingName: identityBindingName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<IdentityBinding> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return identityBindingDeserializer(result.body);
}

/** Gets the specified Identity Binding. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  identityBindingName: string,
  options: IdentityBindingsGetOptionalParams = { requestOptions: {} },
): Promise<IdentityBinding> {
  const result = await _getSend(
    context,
    resourceGroupName,
    resourceName,
    identityBindingName,
    options,
  );
  return _getDeserialize(result);
}
