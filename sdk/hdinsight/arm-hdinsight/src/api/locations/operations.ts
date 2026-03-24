// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HDInsightManagementContext as Client } from "../index.js";
import type {
  AsyncOperationResult,
  CapabilitiesResult,
  UsagesListResult,
  BillingResponseListResult,
  NameAvailabilityCheckRequestParameters,
  NameAvailabilityCheckResult,
  ClusterCreateRequestValidationParameters,
  ClusterCreateValidationResult,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  asyncOperationResultDeserializer,
  capabilitiesResultDeserializer,
  usagesListResultDeserializer,
  billingResponseListResultDeserializer,
  nameAvailabilityCheckRequestParametersSerializer,
  nameAvailabilityCheckResultDeserializer,
  clusterCreateRequestValidationParametersSerializer,
  clusterCreateValidationResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  LocationsValidateClusterCreateRequestOptionalParams,
  LocationsCheckNameAvailabilityOptionalParams,
  LocationsGetAzureAsyncOperationStatusOptionalParams,
  LocationsListBillingSpecsOptionalParams,
  LocationsListUsagesOptionalParams,
  LocationsGetCapabilitiesOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _validateClusterCreateRequestSend(
  context: Client,
  location: string,
  parameters: ClusterCreateRequestValidationParameters,
  options: LocationsValidateClusterCreateRequestOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HDInsight/locations/{location}/validateCreateRequest{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: clusterCreateRequestValidationParametersSerializer(parameters),
  });
}

export async function _validateClusterCreateRequestDeserialize(
  result: PathUncheckedResponse,
): Promise<ClusterCreateValidationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return clusterCreateValidationResultDeserializer(result.body);
}

/** Validate the cluster create request spec is valid or not. */
export async function validateClusterCreateRequest(
  context: Client,
  location: string,
  parameters: ClusterCreateRequestValidationParameters,
  options: LocationsValidateClusterCreateRequestOptionalParams = { requestOptions: {} },
): Promise<ClusterCreateValidationResult> {
  const result = await _validateClusterCreateRequestSend(context, location, parameters, options);
  return _validateClusterCreateRequestDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  location: string,
  parameters: NameAvailabilityCheckRequestParameters,
  options: LocationsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HDInsight/locations/{location}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: nameAvailabilityCheckRequestParametersSerializer(parameters),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<NameAvailabilityCheckResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return nameAvailabilityCheckResultDeserializer(result.body);
}

/** Check the cluster name is available or not. */
export async function checkNameAvailability(
  context: Client,
  location: string,
  parameters: NameAvailabilityCheckRequestParameters,
  options: LocationsCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<NameAvailabilityCheckResult> {
  const result = await _checkNameAvailabilitySend(context, location, parameters, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _getAzureAsyncOperationStatusSend(
  context: Client,
  location: string,
  operationId: string,
  options: LocationsGetAzureAsyncOperationStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HDInsight/locations/{location}/azureasyncoperations/{operationId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      operationId: operationId,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
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

export async function _getAzureAsyncOperationStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<AsyncOperationResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return asyncOperationResultDeserializer(result.body);
}

/** Get the async operation status. */
export async function getAzureAsyncOperationStatus(
  context: Client,
  location: string,
  operationId: string,
  options: LocationsGetAzureAsyncOperationStatusOptionalParams = { requestOptions: {} },
): Promise<AsyncOperationResult> {
  const result = await _getAzureAsyncOperationStatusSend(context, location, operationId, options);
  return _getAzureAsyncOperationStatusDeserialize(result);
}

export function _listBillingSpecsSend(
  context: Client,
  location: string,
  options: LocationsListBillingSpecsOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HDInsight/locations/{location}/billingSpecs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
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

export async function _listBillingSpecsDeserialize(
  result: PathUncheckedResponse,
): Promise<BillingResponseListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return billingResponseListResultDeserializer(result.body);
}

/** Lists the billingSpecs for the specified subscription and location. */
export async function listBillingSpecs(
  context: Client,
  location: string,
  options: LocationsListBillingSpecsOptionalParams = { requestOptions: {} },
): Promise<BillingResponseListResult> {
  const result = await _listBillingSpecsSend(context, location, options);
  return _listBillingSpecsDeserialize(result);
}

export function _listUsagesSend(
  context: Client,
  location: string,
  options: LocationsListUsagesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HDInsight/locations/{location}/usages{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
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

export async function _listUsagesDeserialize(
  result: PathUncheckedResponse,
): Promise<UsagesListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return usagesListResultDeserializer(result.body);
}

/** Lists the usages for the specified location. */
export async function listUsages(
  context: Client,
  location: string,
  options: LocationsListUsagesOptionalParams = { requestOptions: {} },
): Promise<UsagesListResult> {
  const result = await _listUsagesSend(context, location, options);
  return _listUsagesDeserialize(result);
}

export function _getCapabilitiesSend(
  context: Client,
  location: string,
  options: LocationsGetCapabilitiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.HDInsight/locations/{location}/capabilities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-01-15-preview",
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

export async function _getCapabilitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<CapabilitiesResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return capabilitiesResultDeserializer(result.body);
}

/** Gets the capabilities for the specified location. */
export async function getCapabilities(
  context: Client,
  location: string,
  options: LocationsGetCapabilitiesOptionalParams = { requestOptions: {} },
): Promise<CapabilitiesResult> {
  const result = await _getCapabilitiesSend(context, location, options);
  return _getCapabilitiesDeserialize(result);
}
