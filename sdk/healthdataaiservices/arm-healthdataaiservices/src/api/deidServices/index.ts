// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  HealthDataAIServicesContext as Client,
  DeidServicesCreateOptionalParams,
  DeidServicesDeleteOptionalParams,
  DeidServicesGetOptionalParams,
  DeidServicesListByResourceGroupOptionalParams,
  DeidServicesListBySubscriptionOptionalParams,
  DeidServicesUpdateOptionalParams,
} from "../index.js";
import {
  DeidService,
  deidServiceSerializer,
  deidServiceDeserializer,
  _DeidServiceListResult,
  _deidServiceListResultDeserializer,
  DeidUpdate,
  deidUpdateSerializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _deidServicesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: DeidServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _deidServicesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<DeidService> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deidServiceDeserializer(result.body);
}

/** Get a DeidService */
export async function deidServicesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: DeidServicesGetOptionalParams = { requestOptions: {} },
): Promise<DeidService> {
  const result = await _deidServicesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    deidServiceName,
    options,
  );
  return _deidServicesGetDeserialize(result);
}

export function _deidServicesListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: DeidServicesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _deidServicesListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeidServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _deidServiceListResultDeserializer(result.body);
}

/** List DeidService resources by resource group */
export function deidServicesListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: DeidServicesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DeidService> {
  return buildPagedAsyncIterator(
    context,
    () => _deidServicesListByResourceGroupSend(context, subscriptionId, resourceGroupName, options),
    _deidServicesListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deidServicesListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: DeidServicesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.HealthDataAIServices/deidServices",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _deidServicesListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_DeidServiceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _deidServiceListResultDeserializer(result.body);
}

/** List DeidService resources by subscription ID */
export function deidServicesListBySubscription(
  context: Client,
  subscriptionId: string,
  options: DeidServicesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<DeidService> {
  return buildPagedAsyncIterator(
    context,
    () => _deidServicesListBySubscriptionSend(context, subscriptionId, options),
    _deidServicesListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _deidServicesCreateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  resource: DeidService,
  options: DeidServicesCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: deidServiceSerializer(resource),
    });
}

export async function _deidServicesCreateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeidService> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deidServiceDeserializer(result.body);
}

/** Create a DeidService */
export function deidServicesCreate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  resource: DeidService,
  options: DeidServicesCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeidService>, DeidService> {
  return getLongRunningPoller(context, _deidServicesCreateDeserialize, ["200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deidServicesCreateSend(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
  }) as PollerLike<OperationState<DeidService>, DeidService>;
}

export function _deidServicesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  properties: DeidUpdate,
  options: DeidServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: deidUpdateSerializer(properties),
    });
}

export async function _deidServicesUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<DeidService> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return deidServiceDeserializer(result.body);
}

/** Update a DeidService */
export function deidServicesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  properties: DeidUpdate,
  options: DeidServicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<DeidService>, DeidService> {
  return getLongRunningPoller(context, _deidServicesUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deidServicesUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        deidServiceName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<DeidService>, DeidService>;
}

export function _deidServicesDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: DeidServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthDataAIServices/deidServices/{deidServiceName}",
      subscriptionId,
      resourceGroupName,
      deidServiceName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deidServicesDeleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a DeidService */
export function deidServicesDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  deidServiceName: string,
  options: DeidServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _deidServicesDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _deidServicesDeleteSend(context, subscriptionId, resourceGroupName, deidServiceName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}
