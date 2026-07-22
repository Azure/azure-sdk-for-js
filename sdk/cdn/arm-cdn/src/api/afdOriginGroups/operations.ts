// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "../index.js";
import type {
  _UsagesListResult,
  Usage,
  AFDOriginGroup,
  AFDOriginGroupUpdateParameters,
  _AFDOriginGroupListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _usagesListResultDeserializer,
  afdOriginGroupSerializer,
  afdOriginGroupDeserializer,
  afdOriginGroupUpdateParametersSerializer,
  _afdOriginGroupListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AFDOriginGroupsListResourceUsageOptionalParams,
  AFDOriginGroupsListByProfileOptionalParams,
  AFDOriginGroupsDeleteOptionalParams,
  AFDOriginGroupsUpdateOptionalParams,
  AFDOriginGroupsCreateOptionalParams,
  AFDOriginGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listResourceUsageSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  options: AFDOriginGroupsListResourceUsageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}/usages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      originGroupName: originGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _listResourceUsageDeserialize(
  result: PathUncheckedResponse,
): Promise<_UsagesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _usagesListResultDeserializer(result.body);
}

/** Checks the quota and actual usage of endpoints under the given Azure Front Door profile. */
export function listResourceUsage(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  options: AFDOriginGroupsListResourceUsageOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Usage> {
  return buildPagedAsyncIterator(
    context,
    () => _listResourceUsageSend(context, resourceGroupName, profileName, originGroupName, options),
    _listResourceUsageDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _listByProfileSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: AFDOriginGroupsListByProfileOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _listByProfileDeserialize(
  result: PathUncheckedResponse,
): Promise<_AFDOriginGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _afdOriginGroupListResultDeserializer(result.body);
}

/** Lists all of the existing origin groups within a profile. */
export function listByProfile(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  options: AFDOriginGroupsListByProfileOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<AFDOriginGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProfileSend(context, resourceGroupName, profileName, options),
    _listByProfileDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-12-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  options: AFDOriginGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      originGroupName: originGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an existing origin group within a profile. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  options: AFDOriginGroupsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, profileName, originGroupName, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  originGroupUpdateProperties: AFDOriginGroupUpdateParameters,
  options: AFDOriginGroupsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      originGroupName: originGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: afdOriginGroupUpdateParametersSerializer(originGroupUpdateProperties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<AFDOriginGroup> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return afdOriginGroupDeserializer(result.body);
}

/** Updates an existing origin group within a profile. */
export function update(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  originGroupUpdateProperties: AFDOriginGroupUpdateParameters,
  options: AFDOriginGroupsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AFDOriginGroup>, AFDOriginGroup> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(
        context,
        resourceGroupName,
        profileName,
        originGroupName,
        originGroupUpdateProperties,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<AFDOriginGroup>, AFDOriginGroup>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  originGroup: AFDOriginGroup,
  options: AFDOriginGroupsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      originGroupName: originGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: afdOriginGroupSerializer(originGroup),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<AFDOriginGroup> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return afdOriginGroupDeserializer(result.body);
}

/** Creates a new origin group within the specified profile. */
export function create(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  originGroup: AFDOriginGroup,
  options: AFDOriginGroupsCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AFDOriginGroup>, AFDOriginGroup> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(context, resourceGroupName, profileName, originGroupName, originGroup, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-12-01",
  }) as PollerLike<OperationState<AFDOriginGroup>, AFDOriginGroup>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  options: AFDOriginGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/profiles/{profileName}/originGroups/{originGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      profileName: profileName,
      originGroupName: originGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<AFDOriginGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return afdOriginGroupDeserializer(result.body);
}

/** Gets an existing origin group within a profile. */
export async function get(
  context: Client,
  resourceGroupName: string,
  profileName: string,
  originGroupName: string,
  options: AFDOriginGroupsGetOptionalParams = { requestOptions: {} },
): Promise<AFDOriginGroup> {
  const result = await _getSend(context, resourceGroupName, profileName, originGroupName, options);
  return _getDeserialize(result);
}
