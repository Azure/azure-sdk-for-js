// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SaaSContext as Client } from "../index.js";
import type {
  SaasResource,
  SaasResourceUpdate,
  _SaasResourceListResult,
  AccessTokenResult,
  UnsubscribeOptions,
  ResourceValidationResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  saasResourceSerializer,
  saasResourceDeserializer,
  saasResourceUpdateSerializer,
  _saasResourceListResultDeserializer,
  accessTokenResultDeserializer,
  unsubscribeOptionsSerializer,
  resourceValidationResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SaasSubscriptionLevelValidateUpdateOptionalParams,
  SaasSubscriptionLevelUnsubscribeOptionalParams,
  SaasSubscriptionLevelListAccessTokenOptionalParams,
  SaasSubscriptionLevelListByResourceGroupOptionalParams,
  SaasSubscriptionLevelDeleteOptionalParams,
  SaasSubscriptionLevelUpdateOptionalParams,
  SaasSubscriptionLevelCreateOrUpdateOptionalParams,
  SaasSubscriptionLevelGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _validateUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: SaasResourceUpdate,
  options: SaasSubscriptionLevelValidateUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SaaS/resources/{resourceName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: saasResourceUpdateSerializer(body),
  });
}

export async function _validateUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceValidationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return resourceValidationResultDeserializer(result.body);
}

/** Validates a proposed update to an existing SaaS resource without modifying the resource. */
export async function validateUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: SaasResourceUpdate,
  options: SaasSubscriptionLevelValidateUpdateOptionalParams = { requestOptions: {} },
): Promise<ResourceValidationResult> {
  const result = await _validateUpdateSend(context, resourceGroupName, resourceName, body, options);
  return _validateUpdateDeserialize(result);
}

export function _unsubscribeSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: UnsubscribeOptions,
  options: SaasSubscriptionLevelUnsubscribeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SaaS/resources/{resourceName}/unsubscribe{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: unsubscribeOptionsSerializer(body),
  });
}

export async function _unsubscribeDeserialize(
  result: PathUncheckedResponse,
): Promise<SaasResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return saasResourceDeserializer(result.body);
}

/** Unsubscribes from a SaaS subscription, optionally providing a reason and feedback. The resource remains in Azure but the subscription is cancelled. */
export function unsubscribe(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: UnsubscribeOptions,
  options: SaasSubscriptionLevelUnsubscribeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SaasResource>, SaasResource> {
  return getLongRunningPoller(context, _unsubscribeDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _unsubscribeSend(context, resourceGroupName, resourceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01",
  }) as PollerLike<OperationState<SaasResource>, SaasResource>;
}

export function _listAccessTokenSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SaasSubscriptionLevelListAccessTokenOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SaaS/resources/{resourceName}/listAccessToken{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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

export async function _listAccessTokenDeserialize(
  result: PathUncheckedResponse,
): Promise<AccessTokenResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return accessTokenResultDeserializer(result.body);
}

/** Generates a publisher access token for a SaaS resource. */
export async function listAccessToken(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SaasSubscriptionLevelListAccessTokenOptionalParams = { requestOptions: {} },
): Promise<AccessTokenResult> {
  const result = await _listAccessTokenSend(context, resourceGroupName, resourceName, options);
  return _listAccessTokenDeserialize(result);
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: SaasSubscriptionLevelListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SaaS/resources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
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
): Promise<_SaasResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _saasResourceListResultDeserializer(result.body);
}

/** Lists all SaaS resources within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: SaasSubscriptionLevelListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SaasResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-04-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SaasSubscriptionLevelDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SaaS/resources/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes a SaaS resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SaasSubscriptionLevelDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, resourceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  properties: SaasResourceUpdate,
  options: SaasSubscriptionLevelUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SaaS/resources/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: saasResourceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(result: PathUncheckedResponse): Promise<SaasResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return saasResourceDeserializer(result.body);
}

/** Updates mutable properties or tags on an existing SaaS resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  properties: SaasResourceUpdate,
  options: SaasSubscriptionLevelUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SaasResource>, SaasResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, resourceName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01",
  }) as PollerLike<OperationState<SaasResource>, SaasResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  resource: SaasResource,
  options: SaasSubscriptionLevelCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SaaS/resources/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: saasResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SaasResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return saasResourceDeserializer(result.body);
}

/** Creates or updates a SaaS resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  resource: SaasResource,
  options: SaasSubscriptionLevelCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<SaasResource>, SaasResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, resourceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-04-01",
  }) as PollerLike<OperationState<SaasResource>, SaasResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SaasSubscriptionLevelGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SaaS/resources/{resourceName}{?api%2Dversion,%24expandCustomerData}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01",
      "%24expandCustomerData": options?.expandCustomerData,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<SaasResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return saasResourceDeserializer(result.body);
}

/** Gets a SaaS resource by its name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: SaasSubscriptionLevelGetOptionalParams = { requestOptions: {} },
): Promise<SaasResource> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}
