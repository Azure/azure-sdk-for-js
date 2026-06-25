// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ComputeManagementContext as Client } from "../index.js";
import { cloudErrorDeserializer } from "../../models/common/models.js";
import {
  InterconnectBlock,
  interconnectBlockSerializer,
  interconnectBlockDeserializer,
  InterconnectBlockUpdate,
  interconnectBlockUpdateSerializer,
  _InterconnectBlockListResult,
  _interconnectBlockListResultDeserializer,
} from "../../models/compute/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  InterconnectBlocksListBySubscriptionOptionalParams,
  InterconnectBlocksListByResourceGroupOptionalParams,
  InterconnectBlocksDeleteOptionalParams,
  InterconnectBlocksUpdateOptionalParams,
  InterconnectBlocksCreateOrUpdateOptionalParams,
  InterconnectBlocksGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listBySubscriptionSend(
  context: Client,
  options: InterconnectBlocksListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Compute/interconnectBlocks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_InterconnectBlockListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _interconnectBlockListResultDeserializer(result.body);
}

/** Lists all of the Interconnect Blocks in the subscription. Use the nextLink property in the response to get the next page of Interconnect Blocks. */
export function listBySubscription(
  context: Client,
  options: InterconnectBlocksListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InterconnectBlock> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-03-01" },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: InterconnectBlocksListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/interconnectBlocks{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_InterconnectBlockListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return _interconnectBlockListResultDeserializer(result.body);
}

/** Lists all of the Interconnect Blocks in the specified resource group. Use the nextLink property in the response to get the next page of Interconnect Blocks. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: InterconnectBlocksListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<InterconnectBlock> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2026-03-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  interconnectBlockName: string,
  options: InterconnectBlocksDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/interconnectBlocks/{interconnectBlockName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      interconnectBlockName: interconnectBlockName,
      "api%2Dversion": "2026-03-01",
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

/** Deletes an Interconnect Block. The operation is only allowed when there are no virtual machines or VMSS VM instances associated with the Interconnect Block. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  interconnectBlockName: string,
  options: InterconnectBlocksDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, interconnectBlockName, options),
    resourceLocationConfig: "location",
    apiVersion: "2026-03-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  interconnectBlockName: string,
  properties: InterconnectBlockUpdate,
  options: InterconnectBlocksUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/interconnectBlocks/{interconnectBlockName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      interconnectBlockName: interconnectBlockName,
      "api%2Dversion": "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .patch({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: interconnectBlockUpdateSerializer(properties),
    });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<InterconnectBlock> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return interconnectBlockDeserializer(result.body);
}

/** Updates an Interconnect Block. When updating an Interconnect Block, only tags and sku.capacity may be modified. */
export function update(
  context: Client,
  resourceGroupName: string,
  interconnectBlockName: string,
  properties: InterconnectBlockUpdate,
  options: InterconnectBlocksUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InterconnectBlock>, InterconnectBlock> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, interconnectBlockName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: "2026-03-01",
  }) as PollerLike<OperationState<InterconnectBlock>, InterconnectBlock>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  interconnectBlockName: string,
  resource: InterconnectBlock,
  options: InterconnectBlocksCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/interconnectBlocks/{interconnectBlockName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      interconnectBlockName: interconnectBlockName,
      "api%2Dversion": "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .put({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: interconnectBlockSerializer(resource),
    });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<InterconnectBlock> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return interconnectBlockDeserializer(result.body);
}

/** Creates or updates an Interconnect Block. When updating an Interconnect Block, only tags and sku.capacity may be modified. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  interconnectBlockName: string,
  resource: InterconnectBlock,
  options: InterconnectBlocksCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<InterconnectBlock>, InterconnectBlock> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, interconnectBlockName, resource, options),
    resourceLocationConfig: "location",
    apiVersion: "2026-03-01",
  }) as PollerLike<OperationState<InterconnectBlock>, InterconnectBlock>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  interconnectBlockName: string,
  options: InterconnectBlocksGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Compute/interconnectBlocks/{interconnectBlockName}{?api%2Dversion,%24expand}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      interconnectBlockName: interconnectBlockName,
      "api%2Dversion": "2026-03-01",
      "%24expand": options?.expand,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<InterconnectBlock> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return interconnectBlockDeserializer(result.body);
}

/** Retrieves information about an Interconnect Block. */
export async function get(
  context: Client,
  resourceGroupName: string,
  interconnectBlockName: string,
  options: InterconnectBlocksGetOptionalParams = { requestOptions: {} },
): Promise<InterconnectBlock> {
  const result = await _getSend(context, resourceGroupName, interconnectBlockName, options);
  return _getDeserialize(result);
}
