// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EventGridManagementContext as Client } from "../index.js";
import type {
  PartnerConfiguration,
  Partner,
  PartnerConfigurationUpdateParameters,
  _PartnerConfigurationsListResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  partnerConfigurationSerializer,
  partnerConfigurationDeserializer,
  partnerSerializer,
  partnerConfigurationUpdateParametersSerializer,
  _partnerConfigurationsListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  PartnerConfigurationsUnauthorizePartnerOptionalParams,
  PartnerConfigurationsAuthorizePartnerOptionalParams,
  PartnerConfigurationsListBySubscriptionOptionalParams,
  PartnerConfigurationsListByResourceGroupOptionalParams,
  PartnerConfigurationsDeleteOptionalParams,
  PartnerConfigurationsUpdateOptionalParams,
  PartnerConfigurationsCreateOrUpdateOptionalParams,
  PartnerConfigurationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _unauthorizePartnerSend(
  context: Client,
  resourceGroupName: string,
  partnerInfo: Partner,
  options: PartnerConfigurationsUnauthorizePartnerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default/unauthorizePartner{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: partnerSerializer(partnerInfo),
  });
}

export async function _unauthorizePartnerDeserialize(
  result: PathUncheckedResponse,
): Promise<PartnerConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerConfigurationDeserializer(result.body);
}

/** Unauthorize a single partner either by partner registration immutable Id or by partner name. */
export async function unauthorizePartner(
  context: Client,
  resourceGroupName: string,
  partnerInfo: Partner,
  options: PartnerConfigurationsUnauthorizePartnerOptionalParams = { requestOptions: {} },
): Promise<PartnerConfiguration> {
  const result = await _unauthorizePartnerSend(context, resourceGroupName, partnerInfo, options);
  return _unauthorizePartnerDeserialize(result);
}

export function _authorizePartnerSend(
  context: Client,
  resourceGroupName: string,
  partnerInfo: Partner,
  options: PartnerConfigurationsAuthorizePartnerOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default/authorizePartner{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-07-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: partnerSerializer(partnerInfo),
  });
}

export async function _authorizePartnerDeserialize(
  result: PathUncheckedResponse,
): Promise<PartnerConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerConfigurationDeserializer(result.body);
}

/** Authorize a single partner either by partner registration immutable Id or by partner name. */
export async function authorizePartner(
  context: Client,
  resourceGroupName: string,
  partnerInfo: Partner,
  options: PartnerConfigurationsAuthorizePartnerOptionalParams = { requestOptions: {} },
): Promise<PartnerConfiguration> {
  const result = await _authorizePartnerSend(context, resourceGroupName, partnerInfo, options);
  return _authorizePartnerDeserialize(result);
}

export function _listBySubscriptionSend(
  context: Client,
  options: PartnerConfigurationsListBySubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.EventGrid/partnerConfigurations{?api%2Dversion,%24filter,%24top}",
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
): Promise<_PartnerConfigurationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _partnerConfigurationsListResultDeserializer(result.body);
}

/** List all the partner configurations under an Azure subscription. */
export function listBySubscription(
  context: Client,
  options: PartnerConfigurationsListBySubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PartnerConfiguration> {
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
  options: PartnerConfigurationsListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _listByResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_PartnerConfigurationsListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _partnerConfigurationsListResultDeserializer(result.body);
}

/** List all the partner configurations under a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: PartnerConfigurationsListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<PartnerConfiguration> {
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
  options: PartnerConfigurationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

/** Delete existing partner configuration. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  options: PartnerConfigurationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["200", "202", "204"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  partnerConfigurationUpdateParameters: PartnerConfigurationUpdateParameters,
  options: PartnerConfigurationsUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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
    body: partnerConfigurationUpdateParametersSerializer(partnerConfigurationUpdateParameters),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<PartnerConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerConfigurationDeserializer(result.body);
}

/** Synchronously updates a partner configuration with the specified parameters. */
export function update(
  context: Client,
  resourceGroupName: string,
  partnerConfigurationUpdateParameters: PartnerConfigurationUpdateParameters,
  options: PartnerConfigurationsUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PartnerConfiguration>, PartnerConfiguration> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, partnerConfigurationUpdateParameters, options),
    resourceLocationConfig: "original-uri",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<PartnerConfiguration>, PartnerConfiguration>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  partnerConfigurationInfo: PartnerConfiguration,
  options: PartnerConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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
    body: partnerConfigurationSerializer(partnerConfigurationInfo),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<PartnerConfiguration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerConfigurationDeserializer(result.body);
}

/** Synchronously creates or updates a partner configuration with the specified parameters. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  partnerConfigurationInfo: PartnerConfiguration,
  options: PartnerConfigurationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<PartnerConfiguration>, PartnerConfiguration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, partnerConfigurationInfo, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-07-15-preview",
  }) as PollerLike<OperationState<PartnerConfiguration>, PartnerConfiguration>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  options: PartnerConfigurationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.EventGrid/partnerConfigurations/default{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<PartnerConfiguration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return partnerConfigurationDeserializer(result.body);
}

/** Get properties of a partner configuration. */
export async function get(
  context: Client,
  resourceGroupName: string,
  options: PartnerConfigurationsGetOptionalParams = { requestOptions: {} },
): Promise<PartnerConfiguration> {
  const result = await _getSend(context, resourceGroupName, options);
  return _getDeserialize(result);
}
