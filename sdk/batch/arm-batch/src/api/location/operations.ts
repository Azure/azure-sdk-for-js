// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchManagementContext as Client } from "../index.js";
import type {
  BatchLocationQuota,
  _SupportedSkusResult,
  SupportedSku,
  CheckNameAvailabilityParameters,
  CheckNameAvailabilityResult,
} from "../../models/models.js";
import {
  cloudErrorDeserializer,
  batchLocationQuotaDeserializer,
  _supportedSkusResultDeserializer,
  checkNameAvailabilityParametersSerializer,
  checkNameAvailabilityResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LocationCheckNameAvailabilityOptionalParams,
  LocationListSupportedVirtualMachineSkusOptionalParams,
  LocationGetQuotasOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _checkNameAvailabilitySend(
  context: Client,
  locationName: string,
  parameters: CheckNameAvailabilityParameters,
  options: LocationCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Batch/locations/{locationName}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityParametersSerializer(parameters),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return checkNameAvailabilityResultDeserializer(result.body);
}

/** Checks whether the Batch account name is available in the specified region. */
export async function checkNameAvailability(
  context: Client,
  locationName: string,
  parameters: CheckNameAvailabilityParameters,
  options: LocationCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResult> {
  const result = await _checkNameAvailabilitySend(context, locationName, parameters, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _listSupportedVirtualMachineSkusSend(
  context: Client,
  locationName: string,
  options: LocationListSupportedVirtualMachineSkusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Batch/locations/{locationName}/virtualMachineSkus{?api%2Dversion,maxresults,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
      maxresults: options?.maxresults,
      "%24filter": options?.filter,
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

export async function _listSupportedVirtualMachineSkusDeserialize(
  result: PathUncheckedResponse,
): Promise<_SupportedSkusResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return _supportedSkusResultDeserializer(result.body);
}

/** Gets the list of Batch supported Virtual Machine VM sizes available at the given location. */
export function listSupportedVirtualMachineSkus(
  context: Client,
  locationName: string,
  options: LocationListSupportedVirtualMachineSkusOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<SupportedSku> {
  return buildPagedAsyncIterator(
    context,
    () => _listSupportedVirtualMachineSkusSend(context, locationName, options),
    _listSupportedVirtualMachineSkusDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-06-01" },
  );
}

export function _getQuotasSend(
  context: Client,
  locationName: string,
  options: LocationGetQuotasOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Batch/locations/{locationName}/quotas{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      locationName: locationName,
      "api%2Dversion": context.apiVersion ?? "2025-06-01",
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

export async function _getQuotasDeserialize(
  result: PathUncheckedResponse,
): Promise<BatchLocationQuota> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = cloudErrorDeserializer(result.body);
    throw error;
  }

  return batchLocationQuotaDeserializer(result.body);
}

/** Gets the Batch service quotas for the specified subscription at the given location. */
export async function getQuotas(
  context: Client,
  locationName: string,
  options: LocationGetQuotasOptionalParams = { requestOptions: {} },
): Promise<BatchLocationQuota> {
  const result = await _getQuotasSend(context, locationName, options);
  return _getQuotasDeserialize(result);
}
