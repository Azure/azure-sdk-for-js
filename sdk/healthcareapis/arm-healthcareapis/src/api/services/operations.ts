// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HealthcareApisManagementContext as Client } from "../index.js";
import type {
  ServicesDescription,
  ServicesPatchDescription,
  _ServicesDescriptionListResult,
  CheckNameAvailabilityParameters,
  ServicesNameAvailabilityInfo,
} from "../../models/models.js";
import {
  errorDetailsDeserializer,
  servicesDescriptionSerializer,
  servicesDescriptionDeserializer,
  servicesPatchDescriptionSerializer,
  _servicesDescriptionListResultDeserializer,
  checkNameAvailabilityParametersSerializer,
  servicesNameAvailabilityInfoDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ServicesCheckNameAvailabilityOptionalParams,
  ServicesListOptionalParams,
  ServicesListByResourceGroupOptionalParams,
  ServicesDeleteOptionalParams,
  ServicesUpdateOptionalParams,
  ServicesCreateOrUpdateOptionalParams,
  ServicesGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _checkNameAvailabilitySend(
  context: Client,
  checkNameAvailabilityInputs: CheckNameAvailabilityParameters,
  options: ServicesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HealthcareApis/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityParametersSerializer(checkNameAvailabilityInputs),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<ServicesNameAvailabilityInfo> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return servicesNameAvailabilityInfoDeserializer(result.body);
}

/** Check if a service instance name is available. */
export async function checkNameAvailability(
  context: Client,
  checkNameAvailabilityInputs: CheckNameAvailabilityParameters,
  options: ServicesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<ServicesNameAvailabilityInfo> {
  const result = await _checkNameAvailabilitySend(context, checkNameAvailabilityInputs, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listSend(
  context: Client,
  options: ServicesListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HealthcareApis/services{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
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
): Promise<_ServicesDescriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _servicesDescriptionListResultDeserializer(result.body);
}

/** Get all the service instances in a subscription. */
export function list(
  context: Client,
  options: ServicesListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServicesDescription> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-04-01-preview",
    },
  );
}

export function _listByResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: ServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/services{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
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
): Promise<_ServicesDescriptionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return _servicesDescriptionListResultDeserializer(result.body);
}

/** Get all the service instances in a resource group. */
export function listByResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: ServicesListByResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ServicesDescription> {
  return buildPagedAsyncIterator(
    context,
    () => _listByResourceGroupSend(context, resourceGroupName, options),
    _listByResourceGroupDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-04-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ServicesDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/services/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
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
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a service instance. */
export function $delete(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ServicesDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, resourceGroupName, resourceName, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _updateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  servicePatchDescription: ServicesPatchDescription,
  options: ServicesUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/services/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).patch({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: servicesPatchDescriptionSerializer(servicePatchDescription),
  });
}

export async function _updateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServicesDescription> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return servicesDescriptionDeserializer(result.body);
}

/** Update the metadata of a service instance. */
export function update(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  servicePatchDescription: ServicesPatchDescription,
  options: ServicesUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServicesDescription>, ServicesDescription> {
  return getLongRunningPoller(context, _updateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _updateSend(context, resourceGroupName, resourceName, servicePatchDescription, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<ServicesDescription>, ServicesDescription>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  serviceDescription: ServicesDescription,
  options: ServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/services/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: servicesDescriptionSerializer(serviceDescription),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ServicesDescription> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return servicesDescriptionDeserializer(result.body);
}

/** Create or update the metadata of a service instance. */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  serviceDescription: ServicesDescription,
  options: ServicesCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ServicesDescription>, ServicesDescription> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, resourceGroupName, resourceName, serviceDescription, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-04-01-preview",
  }) as PollerLike<OperationState<ServicesDescription>, ServicesDescription>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ServicesGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.HealthcareApis/services/{resourceName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      resourceName: resourceName,
      "api%2Dversion": context.apiVersion ?? "2025-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ServicesDescription> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorDetailsDeserializer(result.body);
    }

    throw error;
  }

  return servicesDescriptionDeserializer(result.body);
}

/** Get the metadata of a service instance. */
export async function get(
  context: Client,
  resourceGroupName: string,
  resourceName: string,
  options: ServicesGetOptionalParams = { requestOptions: {} },
): Promise<ServicesDescription> {
  const result = await _getSend(context, resourceGroupName, resourceName, options);
  return _getDeserialize(result);
}
