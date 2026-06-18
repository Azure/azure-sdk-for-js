// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { RecoveryServicesContext as Client } from "../index.js";
import {
  cloudErrorDeserializer,
  CheckNameAvailabilityParameters,
  checkNameAvailabilityParametersSerializer,
  CheckNameAvailabilityResult,
  checkNameAvailabilityResultDeserializer,
  ResourceCapabilities,
  resourceCapabilitiesSerializer,
  CapabilitiesResponse,
  capabilitiesResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  RecoveryServicesCapabilitiesOptionalParams,
  RecoveryServicesCheckNameAvailabilityOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _capabilitiesSend(
  context: Client,
  location: string,
  input: ResourceCapabilities,
  options: RecoveryServicesCapabilitiesOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.RecoveryServices/locations/{location}/capabilities{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: resourceCapabilitiesSerializer(input),
    });
}

export async function _capabilitiesDeserialize(
  result: PathUncheckedResponse,
): Promise<CapabilitiesResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return capabilitiesResponseDeserializer(result.body);
}

/** API to get details about capabilities provided by Microsoft.RecoveryServices RP */
export async function capabilities(
  context: Client,
  location: string,
  input: ResourceCapabilities,
  options: RecoveryServicesCapabilitiesOptionalParams = { requestOptions: {} },
): Promise<CapabilitiesResponse> {
  const result = await _capabilitiesSend(context, location, input, options);
  return _capabilitiesDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  location: string,
  input: CheckNameAvailabilityParameters,
  options: RecoveryServicesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.RecoveryServices/locations/{location}/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2025-08-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      contentType: "application/json",
      headers: { accept: "application/json", ...options.requestOptions?.headers },
      body: checkNameAvailabilityParametersSerializer(input),
    });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = cloudErrorDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityResultDeserializer(result.body);
}

/**
 * API to check for resource name availability.
 * A name is available if no other resource exists that has the same SubscriptionId, Resource Name and Type
 * or if one or more such resources exist, each of these must be GC'd and their time of deletion be more than 24 Hours Ago
 */
export async function checkNameAvailability(
  context: Client,
  resourceGroupName: string,
  location: string,
  input: CheckNameAvailabilityParameters,
  options: RecoveryServicesCheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityResult> {
  const result = await _checkNameAvailabilitySend(
    context,
    resourceGroupName,
    location,
    input,
    options,
  );
  return _checkNameAvailabilityDeserialize(result);
}
