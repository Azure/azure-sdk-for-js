// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkSecurityManagementContext as Client } from "../index.js";
import type {
  NeuroShieldProtectedResource,
  _NeuroShieldProtectedResourceListResult,
  NeuroShieldInventoryUploadRequestResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  neuroShieldProtectedResourceSerializer,
  neuroShieldProtectedResourceDeserializer,
  _neuroShieldProtectedResourceListResultDeserializer,
  neuroShieldInventoryUploadRequestResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  NeuroShieldProtectedResourcesTriggerInventoryUploadOptionalParams,
  NeuroShieldProtectedResourcesListOptionalParams,
  NeuroShieldProtectedResourcesDeleteOptionalParams,
  NeuroShieldProtectedResourcesCreateOrUpdateOptionalParams,
  NeuroShieldProtectedResourcesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _triggerInventoryUploadSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  options: NeuroShieldProtectedResourcesTriggerInventoryUploadOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/protectedResources/{protectedResourceName}/triggerInventoryUpload{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      protectedResourceName: protectedResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _triggerInventoryUploadDeserialize(
  result: PathUncheckedResponse,
): Promise<NeuroShieldInventoryUploadRequestResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return neuroShieldInventoryUploadRequestResultDeserializer(result.body);
}

/** Requests a fresh inventory upload from the Neuron agents associated with a protected resource. */
export async function triggerInventoryUpload(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  options: NeuroShieldProtectedResourcesTriggerInventoryUploadOptionalParams = {
    requestOptions: {},
  },
): Promise<NeuroShieldInventoryUploadRequestResult> {
  const result = await _triggerInventoryUploadSend(
    context,
    resourceGroupName,
    neuroShieldName,
    protectedResourceName,
    options,
  );
  return _triggerInventoryUploadDeserialize(result);
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  options: NeuroShieldProtectedResourcesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/protectedResources{?api%2Dversion,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_NeuroShieldProtectedResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _neuroShieldProtectedResourceListResultDeserializer(result.body);
}

/** Lists all protected resources under a NeuroShield resource. */
export function list(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  options: NeuroShieldProtectedResourcesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<NeuroShieldProtectedResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, neuroShieldName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-10-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  options: NeuroShieldProtectedResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/protectedResources/{protectedResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      protectedResourceName: protectedResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a protected resource under a NeuroShield resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  options: NeuroShieldProtectedResourcesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, neuroShieldName, protectedResourceName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  resource: NeuroShieldProtectedResource,
  options: NeuroShieldProtectedResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/protectedResources/{protectedResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      protectedResourceName: protectedResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: neuroShieldProtectedResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<NeuroShieldProtectedResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return neuroShieldProtectedResourceDeserializer(result.body);
}

/** Creates or updates a protected resource under a NeuroShield resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  resource: NeuroShieldProtectedResource,
  options: NeuroShieldProtectedResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<NeuroShieldProtectedResource>, NeuroShieldProtectedResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        neuroShieldName,
        protectedResourceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-10-01-preview",
  }) as PollerLike<OperationState<NeuroShieldProtectedResource>, NeuroShieldProtectedResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  options: NeuroShieldProtectedResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkSecurity/neuroShields/{neuroShieldName}/protectedResources/{protectedResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      neuroShieldName: neuroShieldName,
      protectedResourceName: protectedResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-10-01-preview",
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
): Promise<NeuroShieldProtectedResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return neuroShieldProtectedResourceDeserializer(result.body);
}

/** Gets a protected resource under a NeuroShield resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  neuroShieldName: string,
  protectedResourceName: string,
  options: NeuroShieldProtectedResourcesGetOptionalParams = { requestOptions: {} },
): Promise<NeuroShieldProtectedResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    neuroShieldName,
    protectedResourceName,
    options,
  );
  return _getDeserialize(result);
}
