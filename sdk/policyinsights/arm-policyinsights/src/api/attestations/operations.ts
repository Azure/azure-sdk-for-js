// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext as Client } from "../index.js";
import type { Attestation, _AttestationListResult } from "../../models/policyInsightsApi/models.js";
import {
  errorResponseDeserializer,
  attestationSerializer,
  attestationDeserializer,
  _attestationListResultDeserializer,
} from "../../models/policyInsightsApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  AttestationsListForResourceOptionalParams,
  AttestationsDeleteAtResourceOptionalParams,
  AttestationsCreateOrUpdateAtResourceOptionalParams,
  AttestationsGetAtResourceOptionalParams,
  AttestationsListForResourceGroupOptionalParams,
  AttestationsDeleteAtResourceGroupOptionalParams,
  AttestationsCreateOrUpdateAtResourceGroupOptionalParams,
  AttestationsGetAtResourceGroupOptionalParams,
  AttestationsListForSubscriptionOptionalParams,
  AttestationsDeleteAtSubscriptionOptionalParams,
  AttestationsCreateOrUpdateAtSubscriptionOptionalParams,
  AttestationsGetAtSubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listForResourceSend(
  context: Client,
  resourceId: string,
  options: AttestationsListForResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/attestations{?api%2Dversion,%24top,%24filter}",
    {
      resourceId: resourceId,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24filter": options?.queryOptions?.filter,
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

export async function _listForResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<_AttestationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _attestationListResultDeserializer(result.body);
}

/** Gets all attestations for a resource. */
export function listForResource(
  context: Client,
  resourceId: string,
  options: AttestationsListForResourceOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Attestation> {
  return buildPagedAsyncIterator(
    context,
    () => _listForResourceSend(context, resourceId, options),
    _listForResourceDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01" },
  );
}

export function _deleteAtResourceSend(
  context: Client,
  resourceId: string,
  attestationName: string,
  options: AttestationsDeleteAtResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/attestations/{attestationName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      attestationName: attestationName,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAtResourceDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an existing attestation at individual resource scope. */
export async function deleteAtResource(
  context: Client,
  resourceId: string,
  attestationName: string,
  options: AttestationsDeleteAtResourceOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAtResourceSend(context, resourceId, attestationName, options);
  return _deleteAtResourceDeserialize(result);
}

export function _createOrUpdateAtResourceSend(
  context: Client,
  resourceId: string,
  attestationName: string,
  parameters: Attestation,
  options: AttestationsCreateOrUpdateAtResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/attestations/{attestationName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      attestationName: attestationName,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: attestationSerializer(parameters),
  });
}

export async function _createOrUpdateAtResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<Attestation> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return attestationDeserializer(result.body);
}

/** Creates or updates an attestation at resource scope. */
export function createOrUpdateAtResource(
  context: Client,
  resourceId: string,
  attestationName: string,
  parameters: Attestation,
  options: AttestationsCreateOrUpdateAtResourceOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Attestation>, Attestation> {
  return getLongRunningPoller(
    context,
    _createOrUpdateAtResourceDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateAtResourceSend(context, resourceId, attestationName, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: "2024-10-01",
    },
  ) as PollerLike<OperationState<Attestation>, Attestation>;
}

export function _getAtResourceSend(
  context: Client,
  resourceId: string,
  attestationName: string,
  options: AttestationsGetAtResourceOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+resourceId}/providers/Microsoft.PolicyInsights/attestations/{attestationName}{?api%2Dversion}",
    {
      resourceId: resourceId,
      attestationName: attestationName,
      "api%2Dversion": "2024-10-01",
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

export async function _getAtResourceDeserialize(
  result: PathUncheckedResponse,
): Promise<Attestation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return attestationDeserializer(result.body);
}

/** Gets an existing attestation at resource scope. */
export async function getAtResource(
  context: Client,
  resourceId: string,
  attestationName: string,
  options: AttestationsGetAtResourceOptionalParams = { requestOptions: {} },
): Promise<Attestation> {
  const result = await _getAtResourceSend(context, resourceId, attestationName, options);
  return _getAtResourceDeserialize(result);
}

export function _listForResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  options: AttestationsListForResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/attestations{?api%2Dversion,%24top,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24filter": options?.queryOptions?.filter,
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

export async function _listForResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<_AttestationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _attestationListResultDeserializer(result.body);
}

/** Gets all attestations for the resource group. */
export function listForResourceGroup(
  context: Client,
  resourceGroupName: string,
  options: AttestationsListForResourceGroupOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Attestation> {
  return buildPagedAsyncIterator(
    context,
    () => _listForResourceGroupSend(context, resourceGroupName, options),
    _listForResourceGroupDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01" },
  );
}

export function _deleteAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  attestationName: string,
  options: AttestationsDeleteAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/attestations/{attestationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      attestationName: attestationName,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAtResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an existing attestation at resource group scope. */
export async function deleteAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  attestationName: string,
  options: AttestationsDeleteAtResourceGroupOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAtResourceGroupSend(
    context,
    resourceGroupName,
    attestationName,
    options,
  );
  return _deleteAtResourceGroupDeserialize(result);
}

export function _createOrUpdateAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  attestationName: string,
  parameters: Attestation,
  options: AttestationsCreateOrUpdateAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/attestations/{attestationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      attestationName: attestationName,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: attestationSerializer(parameters),
  });
}

export async function _createOrUpdateAtResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<Attestation> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return attestationDeserializer(result.body);
}

/** Creates or updates an attestation at resource group scope. */
export function createOrUpdateAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  attestationName: string,
  parameters: Attestation,
  options: AttestationsCreateOrUpdateAtResourceGroupOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Attestation>, Attestation> {
  return getLongRunningPoller(
    context,
    _createOrUpdateAtResourceGroupDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateAtResourceGroupSend(
          context,
          resourceGroupName,
          attestationName,
          parameters,
          options,
        ),
      resourceLocationConfig: "location",
      apiVersion: "2024-10-01",
    },
  ) as PollerLike<OperationState<Attestation>, Attestation>;
}

export function _getAtResourceGroupSend(
  context: Client,
  resourceGroupName: string,
  attestationName: string,
  options: AttestationsGetAtResourceGroupOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PolicyInsights/attestations/{attestationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      attestationName: attestationName,
      "api%2Dversion": "2024-10-01",
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

export async function _getAtResourceGroupDeserialize(
  result: PathUncheckedResponse,
): Promise<Attestation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return attestationDeserializer(result.body);
}

/** Gets an existing attestation at resource group scope. */
export async function getAtResourceGroup(
  context: Client,
  resourceGroupName: string,
  attestationName: string,
  options: AttestationsGetAtResourceGroupOptionalParams = { requestOptions: {} },
): Promise<Attestation> {
  const result = await _getAtResourceGroupSend(
    context,
    resourceGroupName,
    attestationName,
    options,
  );
  return _getAtResourceGroupDeserialize(result);
}

export function _listForSubscriptionSend(
  context: Client,
  options: AttestationsListForSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/attestations{?api%2Dversion,%24top,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": "2024-10-01",
      "%24top": options?.queryOptions?.top,
      "%24filter": options?.queryOptions?.filter,
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

export async function _listForSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<_AttestationListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _attestationListResultDeserializer(result.body);
}

/** Gets all attestations for the subscription. */
export function listForSubscription(
  context: Client,
  options: AttestationsListForSubscriptionOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Attestation> {
  return buildPagedAsyncIterator(
    context,
    () => _listForSubscriptionSend(context, options),
    _listForSubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: "2024-10-01" },
  );
}

export function _deleteAtSubscriptionSend(
  context: Client,
  attestationName: string,
  options: AttestationsDeleteAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/attestations/{attestationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      attestationName: attestationName,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _deleteAtSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Deletes an existing attestation at subscription scope. */
export async function deleteAtSubscription(
  context: Client,
  attestationName: string,
  options: AttestationsDeleteAtSubscriptionOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _deleteAtSubscriptionSend(context, attestationName, options);
  return _deleteAtSubscriptionDeserialize(result);
}

export function _createOrUpdateAtSubscriptionSend(
  context: Client,
  attestationName: string,
  parameters: Attestation,
  options: AttestationsCreateOrUpdateAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/attestations/{attestationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      attestationName: attestationName,
      "api%2Dversion": "2024-10-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: attestationSerializer(parameters),
  });
}

export async function _createOrUpdateAtSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<Attestation> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return attestationDeserializer(result.body);
}

/** Creates or updates an attestation at subscription scope. */
export function createOrUpdateAtSubscription(
  context: Client,
  attestationName: string,
  parameters: Attestation,
  options: AttestationsCreateOrUpdateAtSubscriptionOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<Attestation>, Attestation> {
  return getLongRunningPoller(
    context,
    _createOrUpdateAtSubscriptionDeserialize,
    ["200", "201", "202"],
    {
      updateIntervalInMs: options?.updateIntervalInMs,
      abortSignal: options?.abortSignal,
      getInitialResponse: () =>
        _createOrUpdateAtSubscriptionSend(context, attestationName, parameters, options),
      resourceLocationConfig: "location",
      apiVersion: "2024-10-01",
    },
  ) as PollerLike<OperationState<Attestation>, Attestation>;
}

export function _getAtSubscriptionSend(
  context: Client,
  attestationName: string,
  options: AttestationsGetAtSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.PolicyInsights/attestations/{attestationName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      attestationName: attestationName,
      "api%2Dversion": "2024-10-01",
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

export async function _getAtSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<Attestation> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return attestationDeserializer(result.body);
}

/** Gets an existing attestation at subscription scope. */
export async function getAtSubscription(
  context: Client,
  attestationName: string,
  options: AttestationsGetAtSubscriptionOptionalParams = { requestOptions: {} },
): Promise<Attestation> {
  const result = await _getAtSubscriptionSend(context, attestationName, options);
  return _getAtSubscriptionDeserialize(result);
}
