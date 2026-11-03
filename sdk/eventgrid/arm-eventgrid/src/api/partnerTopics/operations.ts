// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext as Client } from "../index.js";
import type {
  PartnerTopic,
  PartnerTopicUpdateParameters,
  _PartnerTopicsListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  partnerTopicSerializer,
  partnerTopicDeserializer,
  partnerTopicUpdateParametersSerializer,
  _partnerTopicsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PartnerTopicsDeactivateOptionalParams,
  PartnerTopicsActivateOptionalParams,
  PartnerTopicsListBySubscriptionOptionalParams,
  PartnerTopicsListByResourceGroupOptionalParams,
  PartnerTopicsDeleteOptionalParams,
  PartnerTopicsUpdateOptionalParams,
  PartnerTopicsCreateOrUpdateOptionalParams,
  PartnerTopicsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _deactivateSend(
  context: Client,
  resourceGroupName: string,
  partnerTopicName: string,
  options: PartnerTopicsDeactivateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/deactivate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerTopicName: partnerTopicName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _deactivateDeserialize(result: PathUncheckedResponse): Promise<PartnerTopic> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerTopicDeserializer(result.body);
}

/** Deactivate specific partner topic. */
export async function deactivate(
  context: Client,
  resourceGroupName: string,
  partnerTopicName: string,
  options: PartnerTopicsDeactivateOptionalParams = { requestOptions: {} },
): Promise<PartnerTopic> {
  const result = await _deactivateSend(context, resourceGroupName, partnerTopicName, options);
  return _deactivateDeserialize(result);
}

export function _activateSend(
  context: Client,
  resourceGroupName: string,
  partnerTopicName: string,
  options: PartnerTopicsActivateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}/activate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerTopicName: partnerTopicName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _activateDeserialize(result: PathUncheckedResponse): Promise<PartnerTopic> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerTopicDeserializer(result.body);
}

/** Activate a newly created partner topic. */
export async function activate(
  context: Client,
  resourceGroupName: string,
  partnerTopicName: string,
  options: PartnerTopicsActivateOptionalParams = { requestOptions: {} },
): Promise<PartnerTopic> {
  const result = await _activateSend(context, resourceGroupName, partnerTopicName, options);
  return _activateDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: PartnerTopicsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/partnerTopics{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
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
): Promise<_PartnerTopicsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _partnerTopicsListResultDeserializer(result.body);
}

/** List all the partner topics under an Azure subscription. */
export function listBySubscription(
  context: Client,
  options: PartnerTopicsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PartnerTopic> {
  return buildPagedAsyncIterator(
    context,
    () => _listBySubscriptionSend(context, options),
    _listBySubscriptionDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: PartnerTopicsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics{?api%2Dversion,%24filter,%24top}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
      "%24filter": options?.filter,
      "%24top": options?.top,
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
): Promise<_PartnerTopicsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _partnerTopicsListResultDeserializer(result.body);
}

/** List all the partner topics under a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PartnerTopicsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PartnerTopic> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-15-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  partnerTopicName: string,
  options: PartnerTopicsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerTopicName: partnerTopicName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Delete existing partner topic. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  partnerTopicName: string,
  options: PartnerTopicsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, partnerTopicName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  partnerTopicName: string,
  partnerTopicUpdateParameters: PartnerTopicUpdateParameters,
  options: PartnerTopicsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerTopicName: partnerTopicName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: partnerTopicUpdateParametersSerializer(partnerTopicUpdateParameters),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<PartnerTopic> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerTopicDeserializer(result.body);
}

/** Asynchronously updates a partner topic with the specified parameters. */
export async function update(
  context: Client,
  resourceGroupName: string,
  partnerTopicName: string,
  partnerTopicUpdateParameters: PartnerTopicUpdateParameters,
  options: PartnerTopicsUpdateOptionalParams = { requestOptions: {} },
): Promise<PartnerTopic> {
  const result = await _updateSend(
    context,
    resourceGroupName,
    partnerTopicName,
    partnerTopicUpdateParameters,
    options,
  );
  return _updateDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  partnerTopicName: string,
  partnerTopicInfo: PartnerTopic,
  options: PartnerTopicsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerTopicName: partnerTopicName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: partnerTopicSerializer(partnerTopicInfo),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PartnerTopic> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerTopicDeserializer(result.body);
}

/** Asynchronously creates a new partner topic with the specified parameters. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  partnerTopicName: string,
  partnerTopicInfo: PartnerTopic,
  options: PartnerTopicsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<PartnerTopic> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    partnerTopicName,
    partnerTopicInfo,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  partnerTopicName: string,
  options: PartnerTopicsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerTopics/{partnerTopicName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      partnerTopicName: partnerTopicName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<PartnerTopic> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerTopicDeserializer(result.body);
}

/** Get properties of a partner topic. */
export async function get(
  context: Client,
  resourceGroupName: string,
  partnerTopicName: string,
  options: PartnerTopicsGetOptionalParams = { requestOptions: {} },
): Promise<PartnerTopic> {
  const result = await _getSend(context, resourceGroupName, partnerTopicName, options);
  return _getDeserialize(result);
}
