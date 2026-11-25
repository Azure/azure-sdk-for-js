// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProfessionalServiceContext as Client } from "../index.js";
import type {
  ProfessionalServiceResource,
  ProfessionalServiceResourceUpdate,
  _ProfessionalServiceResourceListResult,
  UnsubscribeOptions,
  ResourceValidationResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  professionalServiceResourceSerializer,
  professionalServiceResourceDeserializer,
  professionalServiceResourceUpdateSerializer,
  _professionalServiceResourceListResultDeserializer,
  unsubscribeOptionsSerializer,
  resourceValidationResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProfessionalServiceSubscriptionLevelValidateUpdateOptionalParams,
  ProfessionalServiceSubscriptionLevelUnsubscribeOptionalParams,
  ProfessionalServiceSubscriptionLevelListByResourceGroupOptionalParams,
  ProfessionalServiceSubscriptionLevelDeleteOptionalParams,
  ProfessionalServiceSubscriptionLevelUpdateOptionalParams,
  ProfessionalServiceSubscriptionLevelCreateOrUpdateOptionalParams,
  ProfessionalServiceSubscriptionLevelGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _validateUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: ProfessionalServiceResourceUpdate,
  options: ProfessionalServiceSubscriptionLevelValidateUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProfessionalService/resources/{resourceName}/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: professionalServiceResourceUpdateSerializer(body),
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

/** Validates a proposed update to an existing Professional Service resource without modifying the resource. */
export async function validateUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: ProfessionalServiceResourceUpdate,
  options: ProfessionalServiceSubscriptionLevelValidateUpdateOptionalParams = {
    requestOptions: {},
  },
): Promise<ResourceValidationResult> {
  const result = await _validateUpdateSend(context, resourceGroupName, resourceName, body, options);
  return _validateUpdateDeserialize(result);
}

export function _unsubscribeSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: UnsubscribeOptions,
  options: ProfessionalServiceSubscriptionLevelUnsubscribeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProfessionalService/resources/{resourceName}/unsubscribe{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
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
): Promise<ProfessionalServiceResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return professionalServiceResourceDeserializer(result.body);
}

/** Unsubscribes from a Professional Service subscription, optionally providing a reason and feedback. The resource remains in Azure but the subscription is cancelled. */
export function unsubscribe(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  body: UnsubscribeOptions,
  options: ProfessionalServiceSubscriptionLevelUnsubscribeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProfessionalServiceResource>, ProfessionalServiceResource> {
  return getLongRunningPoller(context, _unsubscribeDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _unsubscribeSend(context, resourceGroupName, resourceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01",
  }) as PollerLike<OperationState<ProfessionalServiceResource>, ProfessionalServiceResource>;
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ProfessionalServiceSubscriptionLevelListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProfessionalService/resources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
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
): Promise<_ProfessionalServiceResourceListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _professionalServiceResourceListResultDeserializer(result.body);
}

/** Lists all Professional Service resources within a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ProfessionalServiceSubscriptionLevelListByResourceGroupOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ProfessionalServiceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-05-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ProfessionalServiceSubscriptionLevelDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProfessionalService/resources/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
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

/** Deletes a Professional Service resource. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ProfessionalServiceSubscriptionLevelDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, resourceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  properties: ProfessionalServiceResourceUpdate,
  options: ProfessionalServiceSubscriptionLevelUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProfessionalService/resources/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: professionalServiceResourceUpdateSerializer(properties),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProfessionalServiceResource> {
  const expectedStatuses = ["200", "202", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return professionalServiceResourceDeserializer(result.body);
}

/** Updates mutable properties or tags on an existing Professional Service resource. */
export function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  properties: ProfessionalServiceResourceUpdate,
  options: ProfessionalServiceSubscriptionLevelUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProfessionalServiceResource>, ProfessionalServiceResource> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "202", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, resourceName, properties, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-05-01",
  }) as PollerLike<OperationState<ProfessionalServiceResource>, ProfessionalServiceResource>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  resource: ProfessionalServiceResource,
  options: ProfessionalServiceSubscriptionLevelCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProfessionalService/resources/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: professionalServiceResourceSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProfessionalServiceResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return professionalServiceResourceDeserializer(result.body);
}

/** Creates or updates a Professional Service resource. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  resource: ProfessionalServiceResource,
  options: ProfessionalServiceSubscriptionLevelCreateOrUpdateOptionalParams = {
    requestOptions: {},
  },
): PollerLike<OperationState<ProfessionalServiceResource>, ProfessionalServiceResource> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, resourceName, resource, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-05-01",
  }) as PollerLike<OperationState<ProfessionalServiceResource>, ProfessionalServiceResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ProfessionalServiceSubscriptionLevelGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProfessionalService/resources/{resourceName}{?api%2Dversion,%24expandCustomerData}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2026-05-01",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ProfessionalServiceResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return professionalServiceResourceDeserializer(result.body);
}

/** Gets a Professional Service resource by its name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ProfessionalServiceSubscriptionLevelGetOptionalParams = { requestOptions: {} },
): Promise<ProfessionalServiceResource> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}
