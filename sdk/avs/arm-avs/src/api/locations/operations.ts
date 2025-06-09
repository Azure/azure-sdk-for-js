// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  skuSerializer,
  Trial,
  trialDeserializer,
  Quota,
  quotaDeserializer,
} from "../../models/models.js";
import {
  LocationsCheckQuotaAvailabilityOptionalParams,
  LocationsCheckTrialAvailabilityOptionalParams,
} from "./options.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _checkQuotaAvailabilitySend(
  context: Client,
  location: string,
  options: LocationsCheckQuotaAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AVS/locations/{location}/checkQuotaAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _checkQuotaAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<Quota> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return quotaDeserializer(result.body);
}

/** Return quota for subscription by region */
export async function checkQuotaAvailability(
  context: Client,
  location: string,
  options: LocationsCheckQuotaAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<Quota> {
  const result = await _checkQuotaAvailabilitySend(context, location, options);
  return _checkQuotaAvailabilityDeserialize(result);
}

export function _checkTrialAvailabilitySend(
  context: Client,
  location: string,
  options: LocationsCheckTrialAvailabilityOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.AVS/locations/{location}/checkTrialAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: !options["sku"] ? options["sku"] : skuSerializer(options["sku"]),
  });
}

export async function _checkTrialAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<Trial> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return trialDeserializer(result.body);
}

/** Return trial status for subscription by region */
export async function checkTrialAvailability(
  context: Client,
  location: string,
  options: LocationsCheckTrialAvailabilityOptionalParams = {
    requestOptions: {},
  },
): Promise<Trial> {
  const result = await _checkTrialAvailabilitySend(context, location, options);
  return _checkTrialAvailabilityDeserialize(result);
}
