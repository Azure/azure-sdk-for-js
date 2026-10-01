// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext as Client } from "../index.js";
import type {
  PreparedImageSpecification,
  PreparedImageSpecificationPatch,
  _PreparedImageSpecificationListResult,
  PreparedImageSpecificationVersion,
  _PreparedImageSpecificationVersionListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  preparedImageSpecificationSerializer,
  preparedImageSpecificationDeserializer,
  preparedImageSpecificationPatchSerializer,
  _preparedImageSpecificationListResultDeserializer,
  preparedImageSpecificationVersionDeserializer,
  _preparedImageSpecificationVersionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PreparedImageSpecificationsListVersionsOptionalParams,
  PreparedImageSpecificationsGetVersionOptionalParams,
  PreparedImageSpecificationsListBySubscriptionOptionalParams,
  PreparedImageSpecificationsListByResourceGroupOptionalParams,
  PreparedImageSpecificationsDeleteVersionOptionalParams,
  PreparedImageSpecificationsDeleteOptionalParams,
  PreparedImageSpecificationsUpdateOptionalParams,
  PreparedImageSpecificationsCreateOrUpdateOptionalParams,
  PreparedImageSpecificationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listVersionsSend(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  options: PreparedImageSpecificationsListVersionsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/preparedImageSpecifications/{preparedImageSpecificationName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      preparedImageSpecificationName: preparedImageSpecificationName,
      "api%2Dversion": context.apiVersion ?? "2026-02-02-preview",
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

export async function _listVersionsDeserialize(
  result: PathUncheckedResponse,
): Promise<_PreparedImageSpecificationVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _preparedImageSpecificationVersionListResultDeserializer(result.body);
}
/** List all versions of a prepared image specification. */
export function listVersions(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  options: PreparedImageSpecificationsListVersionsOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PreparedImageSpecificationVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listVersionsSend(context, resourceGroupName, preparedImageSpecificationName, options),
    _listVersionsDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-02-preview",
    },
  );
}

export function _getVersionSend(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  version: string,
  options: PreparedImageSpecificationsGetVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/preparedImageSpecifications/{preparedImageSpecificationName}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      preparedImageSpecificationName: preparedImageSpecificationName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2026-02-02-preview",
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

export async function _getVersionDeserialize(
  result: PathUncheckedResponse,
): Promise<PreparedImageSpecificationVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return preparedImageSpecificationVersionDeserializer(result.body);
}
/** Get a prepared image specification at a particular version. */
export async function getVersion(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  version: string,
  options: PreparedImageSpecificationsGetVersionOptionalParams = { requestOptions: {} },
): Promise<PreparedImageSpecificationVersion> {
  const result = await _getVersionSend(
    context,
    resourceGroupName,
    preparedImageSpecificationName,
    version,
    options,
  );
  return _getVersionDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: PreparedImageSpecificationsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ContainerService/preparedImageSpecifications{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-02-preview",
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

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_PreparedImageSpecificationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _preparedImageSpecificationListResultDeserializer(result.body);
}
/** List the prepared image specifications in a subscription at the latest version. */
export function listBySubscription(
  context: Client,
  options: PreparedImageSpecificationsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PreparedImageSpecification> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-02-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PreparedImageSpecificationsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/preparedImageSpecifications{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-02-02-preview",
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PreparedImageSpecificationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _preparedImageSpecificationListResultDeserializer(result.body);
}
/** List the prepared image specifications in a resource group at the latest version. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PreparedImageSpecificationsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PreparedImageSpecification> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-02-preview",
    },
  );
}

export function _deleteVersionSend(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  version: string,
  options: PreparedImageSpecificationsDeleteVersionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/preparedImageSpecifications/{preparedImageSpecificationName}/versions/{version}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      preparedImageSpecificationName: preparedImageSpecificationName,
      version: version,
      "api%2Dversion": context.apiVersion ?? "2026-02-02-preview",
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

export async function _deleteVersionDeserialize(result: PathUncheckedResponse): Promise<void> {
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
/** Delete a prepared image specification version. This operation will be blocked if the prepared image specification version is in use. */
export function deleteVersion(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  version: string,
  options: PreparedImageSpecificationsDeleteVersionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deleteVersionDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deleteVersionSend(
        context,
        resourceGroupName,
        preparedImageSpecificationName,
        version,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  options: PreparedImageSpecificationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/preparedImageSpecifications/{preparedImageSpecificationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      preparedImageSpecificationName: preparedImageSpecificationName,
      "api%2Dversion": context.apiVersion ?? "2026-02-02-preview",
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
/** Delete a prepared image specification. This operation will be blocked if the resource is in use. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  options: PreparedImageSpecificationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, preparedImageSpecificationName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-02-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  properties: PreparedImageSpecificationPatch,
  options: PreparedImageSpecificationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/preparedImageSpecifications/{preparedImageSpecificationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      preparedImageSpecificationName: preparedImageSpecificationName,
      "api%2Dversion": context.apiVersion ?? "2026-02-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.ifMatch !== undefined ? { "if-match": options?.ifMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: preparedImageSpecificationPatchSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<PreparedImageSpecification> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return preparedImageSpecificationDeserializer(result.body);
}
/** Update the tags of a prepared image specification. */
export async function update(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  properties: PreparedImageSpecificationPatch,
  options: PreparedImageSpecificationsUpdateOptionalParams = { requestOptions: {} },
): Promise<PreparedImageSpecification> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    preparedImageSpecificationName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  resource: PreparedImageSpecification,
  options: PreparedImageSpecificationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/preparedImageSpecifications/{preparedImageSpecificationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      preparedImageSpecificationName: preparedImageSpecificationName,
      "api%2Dversion": context.apiVersion ?? "2026-02-02-preview",
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
      ...(options?.ifNoneMatch !== undefined ? { "if-none-match": options?.ifNoneMatch } : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: preparedImageSpecificationSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PreparedImageSpecification> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return preparedImageSpecificationDeserializer(result.body);
}
/** Create or update a prepared image specification resource with a client-provided version. Created versions are immutable; provide a different properties.version value to create a new version. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  resource: PreparedImageSpecification,
  options: PreparedImageSpecificationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PreparedImageSpecification>, PreparedImageSpecification> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        preparedImageSpecificationName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-02-preview",
  }) as PollerLike<OperationState<PreparedImageSpecification>, PreparedImageSpecification>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  options: PreparedImageSpecificationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ContainerService/preparedImageSpecifications/{preparedImageSpecificationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      preparedImageSpecificationName: preparedImageSpecificationName,
      "api%2Dversion": context.apiVersion ?? "2026-02-02-preview",
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
): Promise<PreparedImageSpecification> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return preparedImageSpecificationDeserializer(result.body);
}
/** Get a prepared image specification at the latest version. */
export async function get(
  context: Client,
  resourceGroupName: string,
  preparedImageSpecificationName: string,
  options: PreparedImageSpecificationsGetOptionalParams = { requestOptions: {} },
): Promise<PreparedImageSpecification> {
  const result = await _getSend(
    context,
    resourceGroupName,
    preparedImageSpecificationName,
    options,
  );
  return _getDeserialize(result);
}
