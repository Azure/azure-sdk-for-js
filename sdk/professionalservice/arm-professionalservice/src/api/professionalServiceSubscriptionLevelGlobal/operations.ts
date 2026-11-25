// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ProfessionalServiceContext as Client } from "../index.js";
import type {
  ProfessionalServiceResource,
  _ProfessionalServiceResourceListResult,
  ResourceValidationResult,
  CheckNameAvailabilityRequest,
  CheckNameAvailabilityResponse,
  ProfessionalServicePurchaseValidationRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _professionalServiceResourceListResultDeserializer,
  resourceValidationResultDeserializer,
  checkNameAvailabilityRequestSerializer,
  checkNameAvailabilityResponseDeserializer,
  professionalServicePurchaseValidationRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams,
  ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseOptionalParams,
  ProfessionalServiceSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams,
  ProfessionalServiceSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _validatePurchaseBySubscriptionSend(
  context: Client,
  body: ProfessionalServicePurchaseValidationRequest,
  options: ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProfessionalService/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: professionalServicePurchaseValidationRequestSerializer(body),
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

/** Validates a proposed Professional Service purchase at subscription scope before a resource group is selected. */
export async function validatePurchaseBySubscription(
  context: Client,
  body: ProfessionalServicePurchaseValidationRequest,
  options: ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseBySubscriptionOptionalParams = {
    requestOptions: {},
  },
): Promise<ResourceValidationResult> {
  const result = await _validatePurchaseBySubscriptionSend(context, body, options);
  return _validatePurchaseBySubscriptionDeserialize(result);
}

export function _validatePurchaseSend(
  context: Client,
  resourceGroupName: string,
  body: ProfessionalServicePurchaseValidationRequest,
  options: ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.ProfessionalService/validate{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
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
    body: professionalServicePurchaseValidationRequestSerializer(body),
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

/** Validates a proposed Professional Service purchase within a resource group without creating the resource. */
export async function validatePurchase(
  context: Client,
  resourceGroupName: string,
  body: ProfessionalServicePurchaseValidationRequest,
  options: ProfessionalServiceSubscriptionLevelGlobalValidatePurchaseOptionalParams = {
    requestOptions: {},
  },
): Promise<ResourceValidationResult> {
  const result = await _validatePurchaseSend(context, resourceGroupName, body, options);
  return _validatePurchaseDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  body: CheckNameAvailabilityRequest,
  options: ProfessionalServiceSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProfessionalService/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

/** Checks whether a proposed Professional Service resource name is available. */
export async function checkNameAvailability(
  context: Client,
  body: CheckNameAvailabilityRequest,
  options: ProfessionalServiceSubscriptionLevelGlobalCheckNameAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<CheckNameAvailabilityResponse> {
  const result = await _checkNameAvailabilitySend(context, body, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listByAzureSubscriptionSend(
  context: Client,
  options: ProfessionalServiceSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.ProfessionalService/resources{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _listByAzureSubscriptionDeserialize(
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

/** Lists all Professional Service resources within an Azure subscription. */
export function listByAzureSubscription(
  context: Client,
  options: ProfessionalServiceSubscriptionLevelGlobalListByAzureSubscriptionOptionalParams = {
    requestOptions: {},
  },
): PagedAsyncIterableIterator<ProfessionalServiceResource> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAzureSubscriptionSend(context, options),
    _listByAzureSubscriptionDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2026-05-01" },
  );
}
