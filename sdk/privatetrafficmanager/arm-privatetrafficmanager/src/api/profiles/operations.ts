// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkContext as Client } from "../index.js";
import type {
  PrivateTrafficManagerProfile,
  PrivateTrafficManagerProfileUpdate,
  _PrivateTrafficManagerProfileListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  privateTrafficManagerProfileSerializer,
  privateTrafficManagerProfileDeserializer,
  privateTrafficManagerProfileUpdateSerializer,
  _privateTrafficManagerProfileListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProfilesListBySubscriptionOptionalParams,
  ProfilesListByResourceGroupOptionalParams,
  ProfilesUpdateOptionalParams,
  ProfilesDeleteOptionalParams,
  ProfilesCreateOrUpdateOptionalParams,
  ProfilesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: ProfilesListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/privateTrafficManagerProfiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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
): Promise<_PrivateTrafficManagerProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _privateTrafficManagerProfileListResultDeserializer(result.body);
}

/** Lists all Private Traffic Manager profiles within a subscription. */
export function listBySubscription(
  context: Client,
  options: ProfilesListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateTrafficManagerProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-09-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ProfilesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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
): Promise<_PrivateTrafficManagerProfileListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _privateTrafficManagerProfileListResultDeserializer(result.body);
}

/** Lists all Private Traffic Manager profiles within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ProfilesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PrivateTrafficManagerProfile> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-02-09-preview",
    },
  );
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  properties: PrivateTrafficManagerProfileUpdate,
  options: ProfilesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles/{privateTrafficManagerProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateTrafficManagerProfileName: privateTrafficManagerProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateTrafficManagerProfileUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateTrafficManagerProfile> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateTrafficManagerProfileDeserializer(result.body);
}

/** Updates a Traffic Manager profile. */
export function update(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  properties: PrivateTrafficManagerProfileUpdate,
  options: ProfilesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrivateTrafficManagerProfile>, PrivateTrafficManagerProfile> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-09-preview",
  }) as PollerLike<OperationState<PrivateTrafficManagerProfile>, PrivateTrafficManagerProfile>;
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  options: ProfilesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles/{privateTrafficManagerProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateTrafficManagerProfileName: privateTrafficManagerProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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

/** Deletes a Private Traffic Manager profile. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  options: ProfilesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, privateTrafficManagerProfileName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-02-09-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  resource: PrivateTrafficManagerProfile,
  options: ProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles/{privateTrafficManagerProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateTrafficManagerProfileName: privateTrafficManagerProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: privateTrafficManagerProfileSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PrivateTrafficManagerProfile> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateTrafficManagerProfileDeserializer(result.body);
}

/** Create or update a Private Traffic Manager profile. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  resource: PrivateTrafficManagerProfile,
  options: ProfilesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PrivateTrafficManagerProfile>, PrivateTrafficManagerProfile> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        privateTrafficManagerProfileName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-02-09-preview",
  }) as PollerLike<OperationState<PrivateTrafficManagerProfile>, PrivateTrafficManagerProfile>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  options: ProfilesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/privateTrafficManagerProfiles/{privateTrafficManagerProfileName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      privateTrafficManagerProfileName: privateTrafficManagerProfileName,
      "api%2Dversion": context.apiVersion ?? "2026-02-09-preview",
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
): Promise<PrivateTrafficManagerProfile> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return privateTrafficManagerProfileDeserializer(result.body);
}

/** Gets a Private Traffic Manager profile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  privateTrafficManagerProfileName: string,
  options: ProfilesGetOptionalParams = { requestOptions: {} },
): Promise<PrivateTrafficManagerProfile> {
  const result = await _getSend(
    context,
    resourceGroupName,
    privateTrafficManagerProfileName,
    options,
  );
  return _getDeserialize(result);
}
