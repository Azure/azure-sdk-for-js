// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type {
  TagsObject,
  InterconnectGroup,
  InterconnectGroupNodeAvailability,
} from "../../models/microsoft/network/models.js";
import {
  tagsObjectSerializer,
  interconnectGroupSerializer,
  interconnectGroupDeserializer,
  interconnectGroupNodeAvailabilityDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _InterconnectGroupListResult } from "../../models/models.js";
import { _interconnectGroupListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  InterconnectGroupsGetNodeAvailabilityOptionalParams,
  InterconnectGroupsListAllOptionalParams,
  InterconnectGroupsListOptionalParams,
  InterconnectGroupsDeleteOptionalParams,
  InterconnectGroupsUpdateTagsOptionalParams,
  InterconnectGroupsCreateOrUpdateOptionalParams,
  InterconnectGroupsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getNodeAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  interconnectGroupName: string,
  options: InterconnectGroupsGetNodeAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/interconnectGroups/{interconnectGroupName}/nodeAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      interconnectGroupName: interconnectGroupName,
      "api%2Dversion": "2025-07-01",
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

export async function _getNodeAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<InterconnectGroupNodeAvailability> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return interconnectGroupNodeAvailabilityDeserializer(result.body);
}

/** Gets node availability for all subgroups in the specified interconnect group. */
export function getNodeAvailability(
  context: Client,
  resourceGroupName: string,
  interconnectGroupName: string,
  options: InterconnectGroupsGetNodeAvailabilityOptionalParams = { requestOptions: {} },
): PollerLike<
  OperationState<InterconnectGroupNodeAvailability>,
  InterconnectGroupNodeAvailability
> {
  return getLongRunningPoller(context, _getNodeAvailabilityDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _getNodeAvailabilitySend(context, resourceGroupName, interconnectGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-07-01",
  }) as PollerLike<
    OperationState<InterconnectGroupNodeAvailability>,
    InterconnectGroupNodeAvailability
  >;
}

export function _listAllSend(
  context: Client,
  options: InterconnectGroupsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/interconnectGroups{?api%2Dversion}",
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
): Promise<_InterconnectGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _interconnectGroupListResultDeserializer(result.body);
}

/** Gets all interconnect groups in a subscription. */
export function listAll(
  context: Client,
  options: InterconnectGroupsListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InterconnectGroup> {
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
  options: InterconnectGroupsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/interconnectGroups{?api%2Dversion}",
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
): Promise<_InterconnectGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _interconnectGroupListResultDeserializer(result.body);
}

/** Gets all interconnect groups in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: InterconnectGroupsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InterconnectGroup> {
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
  interconnectGroupName: string,
  options: InterconnectGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/interconnectGroups/{interconnectGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      interconnectGroupName: interconnectGroupName,
      "api%2Dversion": "2025-07-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes the specified interconnect group. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  interconnectGroupName: string,
  options: InterconnectGroupsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, resourceGroupName, interconnectGroupName, options);
  return _$deleteDeserialize(result);
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  interconnectGroupName: string,
  parameters: TagsObject,
  options: InterconnectGroupsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/interconnectGroups/{interconnectGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      interconnectGroupName: interconnectGroupName,
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
): Promise<InterconnectGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return interconnectGroupDeserializer(result.body);
}

/** Updates interconnect group tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  interconnectGroupName: string,
  parameters: TagsObject,
  options: InterconnectGroupsUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<InterconnectGroup> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    interconnectGroupName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  interconnectGroupName: string,
  parameters: InterconnectGroup,
  options: InterconnectGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/interconnectGroups/{interconnectGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      interconnectGroupName: interconnectGroupName,
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
    body: interconnectGroupSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InterconnectGroup> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return interconnectGroupDeserializer(result.body);
}

/** Creates or updates an interconnect group. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  interconnectGroupName: string,
  parameters: InterconnectGroup,
  options: InterconnectGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<InterconnectGroup> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    interconnectGroupName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  interconnectGroupName: string,
  options: InterconnectGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/interconnectGroups/{interconnectGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      interconnectGroupName: interconnectGroupName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<InterconnectGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return interconnectGroupDeserializer(result.body);
}

/** Gets information about the specified interconnect group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  interconnectGroupName: string,
  options: InterconnectGroupsGetOptionalParams = { requestOptions: {} },
): Promise<InterconnectGroup> {
  const result = await _getSend(context, resourceGroupName, interconnectGroupName, options);
  return _getDeserialize(result);
}
