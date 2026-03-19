// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureTrafficCollectorContext as Client } from "../index.js";
import type { AzureTrafficCollector, TagsObject } from "../../models/models.js";
import {
  azureTrafficCollectorSerializer,
  azureTrafficCollectorDeserializer,
  cloudErrorDeserializer,
  tagsObjectSerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AzureTrafficCollectorsDeleteOptionalParams,
  AzureTrafficCollectorsUpdateTagsOptionalParams,
  AzureTrafficCollectorsCreateOrUpdateOptionalParams,
  AzureTrafficCollectorsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  options: AzureTrafficCollectorsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureTrafficCollectorName: azureTrafficCollectorName,
      "api%2Dversion": context.apiVersion ?? "2022-11-01",
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
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a specified Azure Traffic Collector resource. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  options: AzureTrafficCollectorsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, azureTrafficCollectorName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2022-11-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateTagsSend(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  parameters: TagsObject,
  options: AzureTrafficCollectorsUpdateTagsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureTrafficCollectorName: azureTrafficCollectorName,
      "api%2Dversion": context.apiVersion ?? "2022-11-01",
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
): Promise<AzureTrafficCollector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return azureTrafficCollectorDeserializer(result.body);
}

/** Updates the specified Azure Traffic Collector tags. */
export async function updateTags(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  parameters: TagsObject,
  options: AzureTrafficCollectorsUpdateTagsOptionalParams = { requestOptions: {} },
): Promise<AzureTrafficCollector> {
  const result = await _updateTagsSend(
    context,
    resourceGroupName,
    azureTrafficCollectorName,
    parameters,
    options,
  );
  return _updateTagsDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  parameters: AzureTrafficCollector,
  options: AzureTrafficCollectorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureTrafficCollectorName: azureTrafficCollectorName,
      "api%2Dversion": context.apiVersion ?? "2022-11-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: azureTrafficCollectorSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<AzureTrafficCollector> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return azureTrafficCollectorDeserializer(result.body);
}

/** Creates or updates a Azure Traffic Collector resource */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  parameters: AzureTrafficCollector,
  options: AzureTrafficCollectorsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<AzureTrafficCollector>, AzureTrafficCollector> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        azureTrafficCollectorName,
        parameters,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2022-11-01",
  }) as PollerLike<OperationState<AzureTrafficCollector>, AzureTrafficCollector>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  options: AzureTrafficCollectorsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.NetworkFunction/azureTrafficCollectors/{azureTrafficCollectorName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      azureTrafficCollectorName: azureTrafficCollectorName,
      "api%2Dversion": context.apiVersion ?? "2022-11-01",
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
): Promise<AzureTrafficCollector> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);

    throw error;
  }

  return azureTrafficCollectorDeserializer(result.body);
}

/** Gets the specified Azure Traffic Collector in a specified resource group */
export async function get(
  context: Client,
  resourceGroupName: string,
  azureTrafficCollectorName: string,
  options: AzureTrafficCollectorsGetOptionalParams = { requestOptions: {} },
): Promise<AzureTrafficCollector> {
  const result = await _getSend(context, resourceGroupName, azureTrafficCollectorName, options);
  return _getDeserialize(result);
}
