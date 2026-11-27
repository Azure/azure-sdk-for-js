// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SaaSContext as Client } from "../index.js";
import type {
  SaasResource,
  _SaasResourceListResult,
  ResourceValidationResult,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  SaasPurchaseValidationRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _saasResourceListResultDeserializer,
  resourceValidationResultDeserializer,
  checkNameAvailabilityRequestSerializer,
  checkNameAvailabilityResponseDeserializer,
  saasPurchaseValidationRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  SaasSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams,
  SaasSubscriptionLevelGlobalValidatePurchaseOptionalParams,
  SaasSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams,
  SaasSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _validatePurchaseBySubscriptionSend(
  context: Client,
  body: SaasPurchaseValidationRequest,
  options: SaasSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.SaaS/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: saasPurchaseValidationRequestSerializer(body),
  });
}

export async function _validatePurchaseBySubscriptionDeserialize(
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

/** Validates a proposed SaaS purchase at subscription scope before a resource group is selected. */
export async function validatePurchaseBySubscription(
  context: Client,
  body: SaasPurchaseValidationRequest,
  options: SaasSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): Promise<ResourceValidationResult> {
  const result = await _validatePurchaseBySubscriptionSend(context, body, options);
  return _validatePurchaseBySubscriptionDeserialize(result);
}

export function _validatePurchaseSend(
  context: Client,
  resourceGroupName: string,
  body: SaasPurchaseValidationRequest,
  options: SaasSubscriptionLevelGlobalValidatePurchaseOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.SaaS/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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
    body: saasPurchaseValidationRequestSerializer(body),
  });
}

export async function _validatePurchaseDeserialize(
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

/** Validates a proposed SaaS purchase within a resource group without creating the resource. */
export async function validatePurchase(
  context: Client,
  resourceGroupName: string,
  body: SaasPurchaseValidationRequest,
  options: SaasSubscriptionLevelGlobalValidatePurchaseOptionalParams = { requestOptions: {} },
): Promise<ResourceValidationResult> {
  const result = await _validatePurchaseSend(context, resourceGroupName, body, options);
  return _validatePurchaseDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  body: CheckNameAvailabilityRequest,
  options: SaasSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.SaaS/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: checkNameAvailabilityRequestSerializer(body),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityResponseDeserializer(result.body);
}

/** Checks whether a proposed SaaS resource name is available. */
export async function checkNameAvailability(
  context: Client,
  body: CheckNameAvailabilityRequest,
  options: SaasSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _checkNameAvailabilitySend(context, body, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listByAzureSubscriptionSend(
  context: Client,
  options: SaasSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.SaaS/resources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listByAzureSubscriptionDeserialize(
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

/** Lists all SaaS resources within an Azure subscription. */
export function listByAzureSubscription(
  context: Client,
  options: SaasSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<SaasResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAzureSubscriptionSend(context, options),
    _listByAzureSubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-04-01" },
  );
}
