// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import type { TagsObject, FirstPartyServiceTag } from "../../models/microsoft/network/models.js";
import {
  tagsObjectSerializer,
  firstPartyServiceTagSerializer,
  firstPartyServiceTagDeserializer,
} from "../../models/microsoft/network/models.js";
import type { _FirstPartyServiceTagListResult } from "../../models/models.js";
import { _firstPartyServiceTagListResultDeserializer } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  FirstPartyServiceTagsListAllOptionalParams,
  FirstPartyServiceTagsListOptionalParams,
  FirstPartyServiceTagsDeleteOptionalParams,
  FirstPartyServiceTagsUpdateTagsOptionalParams,
  FirstPartyServiceTagsCreateOrUpdateOptionalParams,
  FirstPartyServiceTagsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listAllSend(
  context: Client,
  options: FirstPartyServiceTagsListAllOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Network/firstPartyServiceTags{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2025-09-01",
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
): Promise<_FirstPartyServiceTagListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _firstPartyServiceTagListResultDeserializer(result.body);
}

/** Gets all the first party service tags in a subscription. */
export function listAll(
  context: Client,
  options: FirstPartyServiceTagsListAllOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FirstPartyServiceTag> {
  return buildPagedAsyncIterator(
    context,
    () => _listAllSend(context, options),
    _listAllDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-09-01" },
  );
}

export function _listSend(
  context: Client,
  resourceGroupName: string,
  options: FirstPartyServiceTagsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firstPartyServiceTags{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2025-09-01",
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
): Promise<_FirstPartyServiceTagListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _firstPartyServiceTagListResultDeserializer(result.body);
}

/** Gets all the first party service tags in a resource group. */
export function list(
  context: Client,
  resourceGroupName: string,
  options: FirstPartyServiceTagsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<FirstPartyServiceTag> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, resourceGroupName, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2025-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  firstPartyServiceTagName: string,
  options: FirstPartyServiceTagsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firstPartyServiceTags/{firstPartyServiceTagName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firstPartyServiceTagName: firstPartyServiceTagName,
      "api%2Dversion": "2025-09-01",
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

/** Deletes the specified first party service tag. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  firstPartyServiceTagName: string,
  options: FirstPartyServiceTagsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, firstPartyServiceTagName, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  firstPartyServiceTagName: string,
  parameters: TagsObject,
  options: FirstPartyServiceTagsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firstPartyServiceTags/{firstPartyServiceTagName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firstPartyServiceTagName: firstPartyServiceTagName,
      "api%2Dversion": "2025-09-01",
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
): Promise<FirstPartyServiceTag> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return firstPartyServiceTagDeserializer(result.body);
}

/** Updates a first party service tag tags. */
export function updateTags(
  context: Client,
  resourceGroupName: string,
  firstPartyServiceTagName: string,
  parameters: TagsObject,
  options: FirstPartyServiceTagsUpdateTagsOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FirstPartyServiceTag>, FirstPartyServiceTag> {
  return getLongRunningPoller(context, _updateTagsDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateTagsSend(context, resourceGroupName, firstPartyServiceTagName, parameters, options),
    resourceLocationConfig: "location",
    apiVersion: "2025-09-01",
  }) as PollerLike<OperationState<FirstPartyServiceTag>, FirstPartyServiceTag>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  firstPartyServiceTagName: string,
  parameters: FirstPartyServiceTag,
  options: FirstPartyServiceTagsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firstPartyServiceTags/{firstPartyServiceTagName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firstPartyServiceTagName: firstPartyServiceTagName,
      "api%2Dversion": "2025-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: firstPartyServiceTagSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<FirstPartyServiceTag> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return firstPartyServiceTagDeserializer(result.body);
}

/** Creates or updates a first party service tag. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  firstPartyServiceTagName: string,
  parameters: FirstPartyServiceTag,
  options: FirstPartyServiceTagsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<FirstPartyServiceTag>, FirstPartyServiceTag> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        firstPartyServiceTagName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: "2025-09-01",
  }) as PollerLike<OperationState<FirstPartyServiceTag>, FirstPartyServiceTag>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  firstPartyServiceTagName: string,
  options: FirstPartyServiceTagsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Network/firstPartyServiceTags/{firstPartyServiceTagName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      firstPartyServiceTagName: firstPartyServiceTagName,
      "api%2Dversion": "2025-09-01",
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
): Promise<FirstPartyServiceTag> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return firstPartyServiceTagDeserializer(result.body);
}

/** Gets the specified first party service tag. */
export async function get(
  context: Client,
  resourceGroupName: string,
  firstPartyServiceTagName: string,
  options: FirstPartyServiceTagsGetOptionalParams = { requestOptions: {} },
): Promise<FirstPartyServiceTag> {
  const result = await _getSend(context, resourceGroupName, firstPartyServiceTagName, options);
  return _getDeserialize(result);
}
