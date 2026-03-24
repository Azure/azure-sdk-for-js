// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProviderHubContext as Client } from "../index.js";
import type {
  ProviderRegistration,
  _ProviderRegistrationArrayResponseWithContinuation,
  ProviderRegistrationsGenerateOperationsResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  operationsDefinitionDeserializer,
  providerRegistrationSerializer,
  providerRegistrationDeserializer,
  _providerRegistrationArrayResponseWithContinuationDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProviderRegistrationsGenerateOperationsOptionalParams,
  ProviderRegistrationsListOptionalParams,
  ProviderRegistrationsDeleteOptionalParams,
  ProviderRegistrationsCreateOrUpdateOptionalParams,
  ProviderRegistrationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _generateOperationsSend(
  context: Client,
  providerNamespace: string,
  options: ProviderRegistrationsGenerateOperationsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}/generateOperations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
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

export async function _generateOperationsDeserialize(
  result: PathUncheckedResponse,
): Promise<ProviderRegistrationsGenerateOperationsResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return {
    body: result.body.map((p: any) => {
      return operationsDefinitionDeserializer(p);
    }),
  };
}

/** Generates the operations api for the given provider. */
export async function generateOperations(
  context: Client,
  providerNamespace: string,
  options: ProviderRegistrationsGenerateOperationsOptionalParams = { requestOptions: {} },
): Promise<ProviderRegistrationsGenerateOperationsResponse> {
  const result = await _generateOperationsSend(context, providerNamespace, options);
  return _generateOperationsDeserialize(result);
}

export function _listSend(
  context: Client,
  options: ProviderRegistrationsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_ProviderRegistrationArrayResponseWithContinuation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _providerRegistrationArrayResponseWithContinuationDeserializer(result.body);
}

/** Gets the list of the provider registrations in the subscription. */
export function list(
  context: Client,
  options: ProviderRegistrationsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ProviderRegistration> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, options),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-09-01" },
  );
}

export function _$deleteSend(
  context: Client,
  providerNamespace: string,
  options: ProviderRegistrationsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
      "api%2Dversion": context.apiVersion ?? "2024-09-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a provider registration. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  providerNamespace: string,
  options: ProviderRegistrationsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(context, providerNamespace, options);
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  providerNamespace: string,
  properties: ProviderRegistration,
  options: ProviderRegistrationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      providerNamespace: providerNamespace,
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
    body: providerRegistrationSerializer(properties),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ProviderRegistration> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return providerRegistrationDeserializer(result.body);
}

/** Creates or updates the provider registration. */
export function createOrUpdate(
  context: Client,
  providerNamespace: string,
  properties: ProviderRegistration,
  options: ProviderRegistrationsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ProviderRegistration>, ProviderRegistration> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _createOrUpdateSend(context, providerNamespace, properties, options),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2024-09-01",
  }) as PollerLike<OperationState<ProviderRegistration>, ProviderRegistration>;
}

export function _getSend(
  context: Client,
  providerNamespace: string,
  options: ProviderRegistrationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProviderHub/providerRegistrations/{providerNamespace}{?api%2Dversion}",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ProviderRegistration> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return providerRegistrationDeserializer(result.body);
}

/** Gets the provider registration details. */
export async function get(
  context: Client,
  providerNamespace: string,
  options: ProviderRegistrationsGetOptionalParams = { requestOptions: {} },
): Promise<ProviderRegistration> {
  const result = await _getSend(context, providerNamespace, options);
  return _getDeserialize(result);
}
