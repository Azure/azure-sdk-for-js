// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { TagsObject, DdosCustomPolicy } from "../../models/microsoft/network/models.js";
import {
  tagsObjectSerializer,
  ddosCustomPolicySerializer,
  ddosCustomPolicyDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _DdosCustomPolicyListResult } from "../../models/models.js";
import { _ddosCustomPolicyListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  DdosCustomPoliciesListAllOptionalParams,
  DdosCustomPoliciesListOptionalParams,
  DdosCustomPoliciesDeleteOptionalParams,
  DdosCustomPoliciesUpdateTagsOptionalParams,
  DdosCustomPoliciesCreateOrUpdateOptionalParams,
  DdosCustomPoliciesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listAllSend(
  context: Client,
  options: DdosCustomPoliciesListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/ddosCustomPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-07-01",
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

export async function _listAllDeserialize(
  result: PathUncheckedResponse,
): Promise<_DdosCustomPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _ddosCustomPolicyListResultDeserializer(result.body);
}

/** Gets all the DDoS custom policies in a subscription. */
export function listAll(
  context: Client,
  options: DdosCustomPoliciesListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DdosCustomPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-07-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: DdosCustomPoliciesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ddosCustomPolicies{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-07-01",
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
): Promise<_DdosCustomPolicyListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _ddosCustomPolicyListResultDeserializer(result.body);
}

/** Gets all the DDoS custom policies in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: DdosCustomPoliciesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<DdosCustomPolicy> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-07-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  ddosCustomPolicyName: string,
  options: DdosCustomPoliciesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ddosCustomPolicies/{ddosCustomPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ddosCustomPolicyName: ddosCustomPolicyName,
      "api%2Dversion": "2025-07-01",
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
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified DDoS custom policy. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  ddosCustomPolicyName: string,
  options: DdosCustomPoliciesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, ddosCustomPolicyName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-07-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  ddosCustomPolicyName: string,
  parameters: TagsObject,
  options: DdosCustomPoliciesUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ddosCustomPolicies/{ddosCustomPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ddosCustomPolicyName: ddosCustomPolicyName,
      "api%2Dversion": "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: tagsObjectSerializer(parameters),
  });
}

export async function _updateTagsDeserialize(
  result: PathUncheckedResponse,
): Promise<DdosCustomPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return ddosCustomPolicyDeserializer(result.body);
}

/** Update a DDoS custom policy tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  ddosCustomPolicyName: string,
  parameters: TagsObject,
  options: DdosCustomPoliciesUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<DdosCustomPolicy> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    ddosCustomPolicyName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  ddosCustomPolicyName: string,
  parameters: DdosCustomPolicy,
  options: DdosCustomPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ddosCustomPolicies/{ddosCustomPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ddosCustomPolicyName: ddosCustomPolicyName,
      "api%2Dversion": "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: ddosCustomPolicySerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DdosCustomPolicy> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return ddosCustomPolicyDeserializer(result.body);
}

/** Creates or updates a DDoS custom policy. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  ddosCustomPolicyName: string,
  parameters: DdosCustomPolicy,
  options: DdosCustomPoliciesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DdosCustomPolicy>, DdosCustomPolicy> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, ddosCustomPolicyName, parameters, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-07-01",
  }) as PollerLike<OperationState<DdosCustomPolicy>, DdosCustomPolicy>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  ddosCustomPolicyName: string,
  options: DdosCustomPoliciesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/ddosCustomPolicies/{ddosCustomPolicyName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      ddosCustomPolicyName: ddosCustomPolicyName,
      "api%2Dversion": "2025-07-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<DdosCustomPolicy> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return ddosCustomPolicyDeserializer(result.body);
}

/** Gets information about the specified DDoS custom policy. */
export async function get(
  context: Client,
  resourceGroupName: string,
  ddosCustomPolicyName: string,
  options: DdosCustomPoliciesGetOptionalParams = { requestOptions: {} },
): Promise<DdosCustomPolicy> {
  const result = await _getSend(context, resourceGroupName, ddosCustomPolicyName, options);
  return _getDeserialize(result);
}
