// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MissionContext as Client } from "../index.js";
import type {
  DedicatedHubResource,
  DedicatedHubPatchModel,
  _DedicatedHubResourceListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  dedicatedHubResourceSerializer,
  dedicatedHubResourceDeserializer,
  dedicatedHubPatchModelSerializer,
  _dedicatedHubResourceListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DedicatedHubListBySubscriptionOptionalParams,
  DedicatedHubListByCommunityResourceOptionalParams,
  DedicatedHubDeleteOptionalParams,
  DedicatedHubUpdateOptionalParams,
  DedicatedHubCreateOrUpdateOptionalParams,
  DedicatedHubGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  communityName: string,
  options: DedicatedHubListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Mission/communities/{communityName}/dedicatedHubs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      communityName: communityName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<_DedicatedHubResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _dedicatedHubResourceListResultDeserializer(result.body);
}
/** List DedicatedHubResource resources by subscription ID */
export function listBySubscription(
  context: Client,
  communityName: string,
  options: DedicatedHubListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DedicatedHubResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, communityName, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _listByCommunityResourceSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  options: DedicatedHubListByCommunityResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/dedicatedHubs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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

export async function _listByCommunityResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_DedicatedHubResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _dedicatedHubResourceListResultDeserializer(result.body);
}
/** List DedicatedHubResource resources by CommunityResource */
export function listByCommunityResource(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  options: DedicatedHubListByCommunityResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DedicatedHubResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByCommunityResourceSend(context, resourceGroupName, communityName, options),
    _listByCommunityResourceDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-03-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  dedicatedHubName: string,
  options: DedicatedHubDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/dedicatedHubs/{dedicatedHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      dedicatedHubName: dedicatedHubName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
/** Delete a DedicatedHubResource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  dedicatedHubName: string,
  options: DedicatedHubDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, communityName, dedicatedHubName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  dedicatedHubName: string,
  properties: DedicatedHubPatchModel,
  options: DedicatedHubUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/dedicatedHubs/{dedicatedHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      dedicatedHubName: dedicatedHubName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dedicatedHubPatchModelSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<DedicatedHubResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dedicatedHubResourceDeserializer(result.body);
}
/** Update a DedicatedHubResource */
export function update(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  dedicatedHubName: string,
  properties: DedicatedHubPatchModel,
  options: DedicatedHubUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DedicatedHubResource>, DedicatedHubResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, communityName, dedicatedHubName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<DedicatedHubResource>, DedicatedHubResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  dedicatedHubName: string,
  resource: DedicatedHubResource,
  options: DedicatedHubCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/dedicatedHubs/{dedicatedHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      dedicatedHubName: dedicatedHubName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: dedicatedHubResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DedicatedHubResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dedicatedHubResourceDeserializer(result.body);
}
/** Create a DedicatedHubResource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  dedicatedHubName: string,
  resource: DedicatedHubResource,
  options: DedicatedHubCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DedicatedHubResource>, DedicatedHubResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        communityName,
        dedicatedHubName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-03-01-preview",
  }) as PollerLike<OperationState<DedicatedHubResource>, DedicatedHubResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  dedicatedHubName: string,
  options: DedicatedHubGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Mission/communities/{communityName}/dedicatedHubs/{dedicatedHubName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      communityName: communityName,
      dedicatedHubName: dedicatedHubName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01-preview",
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
): Promise<DedicatedHubResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return dedicatedHubResourceDeserializer(result.body);
}
/** Get a DedicatedHubResource */
export async function get(
  context: Client,
  resourceGroupName: string,
  communityName: string,
  dedicatedHubName: string,
  options: DedicatedHubGetOptionalParams = { requestOptions: {} },
): Promise<DedicatedHubResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    communityName,
    dedicatedHubName,
    options,
  );
  return _getDeserialize(result);
}
