// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  DeviceRegistryManagementContext as Client,
  SchemaRegistriesCreateOrReplaceOptionalParams,
  SchemaRegistriesDeleteOptionalParams,
  SchemaRegistriesGetOptionalParams,
  SchemaRegistriesListByResourceGroupOptionalParams,
  SchemaRegistriesListBySubscriptionOptionalParams,
  SchemaRegistriesUpdateOptionalParams,
} from "../index.js";
import {
  SchemaRegistry,
  schemaRegistrySerializer,
  schemaRegistryDeserializer,
  SchemaRegistryUpdate,
  schemaRegistryUpdateSerializer,
  _SchemaRegistryListResult,
  _schemaRegistryListResultDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _schemaRegistriesGetSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  options: SchemaRegistriesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}",
      subscriptionId,
      resourceGroupName,
      schemaRegistryName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _schemaRegistriesGetDeserialize(
  result: PathUncheckedResponse,
): Promise<SchemaRegistry> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return schemaRegistryDeserializer(result.body);
}

/** Get a SchemaRegistry */
export async function schemaRegistriesGet(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  options: SchemaRegistriesGetOptionalParams = { requestOptions: {} },
): Promise<SchemaRegistry> {
  const result = await _schemaRegistriesGetSend(
    context,
    subscriptionId,
    resourceGroupName,
    schemaRegistryName,
    options,
  );
  return _schemaRegistriesGetDeserialize(result);
}

export function _schemaRegistriesCreateOrReplaceSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  resource: SchemaRegistry,
  options: SchemaRegistriesCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}",
      subscriptionId,
      resourceGroupName,
      schemaRegistryName,
    )
    .put({
      ...operationOptionsToRequestParameters(options),
      body: schemaRegistrySerializer(resource),
    });
}

export async function _schemaRegistriesCreateOrReplaceDeserialize(
  result: PathUncheckedResponse,
): Promise<SchemaRegistry> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return schemaRegistryDeserializer(result.body);
}

/** Create a SchemaRegistry */
export function schemaRegistriesCreateOrReplace(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  resource: SchemaRegistry,
  options: SchemaRegistriesCreateOrReplaceOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<SchemaRegistry>, SchemaRegistry> {
  return getLongRunningPoller(
    context,
    _schemaRegistriesCreateOrReplaceDeserialize,
    ["200", "201"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _schemaRegistriesCreateOrReplaceSend(
          context,
          subscriptionId,
          resourceGroupName,
          schemaRegistryName,
          resource,
          options,
        ),
      resourceLocationConfig: "azure-async-operation",
    },
  ) as PollerLike<OperationState<SchemaRegistry>, SchemaRegistry>;
}

export function _schemaRegistriesUpdateSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  properties: SchemaRegistryUpdate,
  options: SchemaRegistriesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}",
      subscriptionId,
      resourceGroupName,
      schemaRegistryName,
    )
    .patch({
      ...operationOptionsToRequestParameters(options),
      body: schemaRegistryUpdateSerializer(properties),
    });
}

export async function _schemaRegistriesUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SchemaRegistry> {
  const expectedStatuses = ["200", "202"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return schemaRegistryDeserializer(result.body);
}

/** Update a SchemaRegistry */
export function schemaRegistriesUpdate(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  properties: SchemaRegistryUpdate,
  options: SchemaRegistriesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SchemaRegistry>, SchemaRegistry> {
  return getLongRunningPoller(context, _schemaRegistriesUpdateDeserialize, ["200", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _schemaRegistriesUpdateSend(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        properties,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<SchemaRegistry>, SchemaRegistry>;
}

export function _schemaRegistriesDeleteSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  options: SchemaRegistriesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries/{schemaRegistryName}",
      subscriptionId,
      resourceGroupName,
      schemaRegistryName,
    )
    .delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _schemaRegistriesDeleteDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return;
}

/** Delete a SchemaRegistry */
export function schemaRegistriesDelete(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  schemaRegistryName: string,
  options: SchemaRegistriesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _schemaRegistriesDeleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _schemaRegistriesDeleteSend(
        context,
        subscriptionId,
        resourceGroupName,
        schemaRegistryName,
        options,
      ),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<void>, void>;
}

export function _schemaRegistriesListByResourceGroupSend(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: SchemaRegistriesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DeviceRegistry/schemaRegistries",
      subscriptionId,
      resourceGroupName,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _schemaRegistriesListByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_SchemaRegistryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _schemaRegistryListResultDeserializer(result.body);
}

/** List SchemaRegistry resources by resource group */
export function schemaRegistriesListByResourceGroup(
  context: Client,
  subscriptionId: string,
  resourceGroupName: string,
  options: SchemaRegistriesListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SchemaRegistry> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _schemaRegistriesListByResourceGroupSend(context, subscriptionId, resourceGroupName, options),
    _schemaRegistriesListByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _schemaRegistriesListBySubscriptionSend(
  context: Client,
  subscriptionId: string,
  options: SchemaRegistriesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  return context
    .path(
      "/subscriptions/{subscriptionId}/providers/Microsoft.DeviceRegistry/schemaRegistries",
      subscriptionId,
    )
    .get({ ...operationOptionsToRequestParameters(options) });
}

export async function _schemaRegistriesListBySubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_SchemaRegistryListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    throw createRestError(result);
  }

  return _schemaRegistryListResultDeserializer(result.body);
}

/** List SchemaRegistry resources by subscription ID */
export function schemaRegistriesListBySubscription(
  context: Client,
  subscriptionId: string,
  options: SchemaRegistriesListBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SchemaRegistry> {
  return buildPagedAsyncIterator(
    context,
    () => _schemaRegistriesListBySubscriptionSend(context, subscriptionId, options),
    _schemaRegistriesListBySubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}
