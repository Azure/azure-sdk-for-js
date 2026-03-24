// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext as Client } from "../index.js";
import type {
  ResourceTypeRegistration,
  _ResourceTypeRegistrationArrayResponseWithContinuation,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  resourceTypeRegistrationSerializer,
  resourceTypeRegistrationDeserializer,
  _resourceTypeRegistrationArrayResponseWithContinuationDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ResourceTypeRegistrationsListByProviderRegistrationOptionalParams,
  ResourceTypeRegistrationsDeleteOptionalParams,
  ResourceTypeRegistrationsCreateOrUpdateOptionalParams,
  ResourceTypeRegistrationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByProviderRegistrationSend(
  context: Client,
  providerNamespace: string,
  options: ResourceTypeRegistrationsListByProviderRegistrationOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _listByProviderRegistrationDeserialize(
  result: PathUncheckedResponse,
): Promise<_ResourceTypeRegistrationArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _resourceTypeRegistrationArrayResponseWithContinuationDeserializer(result.body);
}

/** Gets the list of the resource types for the given provider. */
export function listByProviderRegistration(
  context: Client,
  providerNamespace: string,
  options: ResourceTypeRegistrationsListByProviderRegistrationOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ResourceTypeRegistration> {
  return buildPagedAsyncIterator(
    context,
    () => _listByProviderRegistrationSend(context, providerNamespace, options),
    _listByProviderRegistrationDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  options: ResourceTypeRegistrationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a resource type */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  options: ResourceTypeRegistrationsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _$deleteSend(context, providerNamespace, resourceType, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2024-09-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  properties: ResourceTypeRegistration,
  options: ResourceTypeRegistrationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: resourceTypeRegistrationSerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ResourceTypeRegistration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return resourceTypeRegistrationDeserializer(result.body);
}

/** Creates or updates a resource type. */
export function createOrUpdate(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  properties: ResourceTypeRegistration,
  options: ResourceTypeRegistrationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ResourceTypeRegistration>, ResourceTypeRegistration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(context, providerNamespace, resourceType, properties, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-09-01",
  }) as PollerLike<OperationState<ResourceTypeRegistration>, ResourceTypeRegistration>;
}

export function _getSend(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  options: ResourceTypeRegistrationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/resourcetypeRegistrations/{resourceType}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      resourceType: resourceType,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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
): Promise<ResourceTypeRegistration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return resourceTypeRegistrationDeserializer(result.body);
}

/** Gets a resource type details in the given subscription and provider. */
export async function get(
  context: Client,
  providerNamespace: string,
  resourceType: string,
  options: ResourceTypeRegistrationsGetOptionalParams = { requestOptions: {} },
): Promise<ResourceTypeRegistration> {
  const result = await _getSend(context, providerNamespace, resourceType, options);
  return _getDeserialize(result);
}
