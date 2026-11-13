// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext as Client } from "../index.js";
import type {
  CloudResource,
  CloudResourceUpdate,
  _CloudResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  cloudResourceSerializer,
  cloudResourceDeserializer,
  cloudResourceUpdateSerializer,
  _cloudResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  CloudResourcesListByResourceGroupOptionalParams,
  CloudResourcesGetOptionalParams,
  CloudResourcesDeleteOptionalParams,
  CloudResourcesUpdateOptionalParams,
  CloudResourcesCreateOrUpdateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  options: CloudResourcesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/cloudResources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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
): Promise<_CloudResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _cloudResourceListResultDeserializer(result.body);
}

/** List cloud resources by resource group */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  options: CloudResourcesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<CloudResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, cloudName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-09-01" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  cloudResourceName: string,
  options: CloudResourcesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/cloudResources/{cloudResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      cloudResourceName: cloudResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<CloudResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return cloudResourceDeserializer(result.body);
}

/** Get a cloud resource */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  cloudResourceName: string,
  options: CloudResourcesGetOptionalParams = { requestOptions: {} },
): Promise<CloudResource> {
  const result = await _getSend(context, resourceGroupName, cloudName, cloudResourceName, options);
  return _getDeserialize(result);
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  cloudResourceName: string,
  options: CloudResourcesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/cloudResources/{cloudResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      cloudResourceName: cloudResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a cloud resource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  cloudResourceName: string,
  options: CloudResourcesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, cloudName, cloudResourceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  cloudResourceName: string,
  properties: CloudResourceUpdate,
  options: CloudResourcesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/cloudResources/{cloudResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      cloudResourceName: cloudResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: cloudResourceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<CloudResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return cloudResourceDeserializer(result.body);
}

/** Update a cloud resource */
export async function update(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  cloudResourceName: string,
  properties: CloudResourceUpdate,
  options: CloudResourcesUpdateOptionalParams = { requestOptions: {} },
): Promise<CloudResource> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    cloudName,
    cloudResourceName,
    properties,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  cloudResourceName: string,
  resource: CloudResource,
  options: CloudResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Anyscale.Platform/clouds/{cloudName}/cloudResources/{cloudResourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudName: cloudName,
      cloudResourceName: cloudResourceName,
      "api%2Dversion": context.apiVersion ?? "2026-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: cloudResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<CloudResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return cloudResourceDeserializer(result.body);
}

/** Create or update a cloud resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  cloudName: string,
  cloudResourceName: string,
  resource: CloudResource,
  options: CloudResourcesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<CloudResource>, CloudResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        cloudName,
        cloudResourceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-09-01",
  }) as PollerLike<OperationState<CloudResource>, CloudResource>;
}
