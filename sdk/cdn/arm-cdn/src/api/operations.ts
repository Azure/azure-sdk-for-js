// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext as Client } from "./index.js";
import type {
  CheckEndpointNameAvailabilityInput,
  CheckEndpointNameAvailabilityOutput,
  CheckNameAvailabilityInput,
  CheckNameAvailabilityOutput,
  ValidateProbeInput,
  ValidateProbeOutput,
} from "../models/models.js";
import {
  checkEndpointNameAvailabilityInputSerializer,
  checkEndpointNameAvailabilityOutputDeserializer,
  errorResponseDeserializer,
  checkNameAvailabilityInputSerializer,
  checkNameAvailabilityOutputDeserializer,
  validateProbeInputSerializer,
  validateProbeOutputDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  ValidateProbeOptionalParams,
  CheckNameAvailabilityWithSubscriptionOptionalParams,
  CheckNameAvailabilityOptionalParams,
  CheckEndpointNameAvailabilityOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _validateProbeSend(
  context: Client,
  validateProbeInput: ValidateProbeInput,
  options: ValidateProbeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Cdn/validateProbe{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: validateProbeInputSerializer(validateProbeInput),
  });
}

export async function _validateProbeDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidateProbeOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return validateProbeOutputDeserializer(result.body);
}

/** Check if the probe path is a valid path and the file can be accessed. Probe path is the path to a file hosted on the origin server to help accelerate the delivery of dynamic content via the CDN endpoint. This path is relative to the origin path specified in the endpoint configuration. */
export async function validateProbe(
  context: Client,
  validateProbeInput: ValidateProbeInput,
  options: ValidateProbeOptionalParams = { requestOptions: {} },
): Promise<ValidateProbeOutput> {
  const result = await _validateProbeSend(context, validateProbeInput, options);
  return _validateProbeDeserialize(result);
}

export function _checkNameAvailabilityWithSubscriptionSend(
  context: Client,
  checkNameAvailabilityInput: CheckNameAvailabilityInput,
  options: CheckNameAvailabilityWithSubscriptionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Cdn/checkNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityInputSerializer(checkNameAvailabilityInput),
  });
}

export async function _checkNameAvailabilityWithSubscriptionDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityOutputDeserializer(result.body);
}

/** Check the availability of a resource name. This is needed for resources where name is globally unique, such as a CDN endpoint. */
export async function checkNameAvailabilityWithSubscription(
  context: Client,
  checkNameAvailabilityInput: CheckNameAvailabilityInput,
  options: CheckNameAvailabilityWithSubscriptionOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityOutput> {
  const result = await _checkNameAvailabilityWithSubscriptionSend(
    context,
    checkNameAvailabilityInput,
    options,
  );
  return _checkNameAvailabilityWithSubscriptionDeserialize(result);
}

export function _checkNameAvailabilitySend(
  context: Client,
  checkNameAvailabilityInput: CheckNameAvailabilityInput,
  options: CheckNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Cdn/checkNameAvailability{?api%2Dversion}",
    {
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkNameAvailabilityInputSerializer(checkNameAvailabilityInput),
  });
}

export async function _checkNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckNameAvailabilityOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkNameAvailabilityOutputDeserializer(result.body);
}

/** Check the availability of a resource name. This is needed for resources where name is globally unique, such as a CDN endpoint. */
export async function checkNameAvailability(
  context: Client,
  checkNameAvailabilityInput: CheckNameAvailabilityInput,
  options: CheckNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckNameAvailabilityOutput> {
  const result = await _checkNameAvailabilitySend(context, checkNameAvailabilityInput, options);
  return _checkNameAvailabilityDeserialize(result);
}

export function _checkEndpointNameAvailabilitySend(
  context: Client,
  resourceGroupName: string,
  checkEndpointNameAvailabilityInput: CheckEndpointNameAvailabilityInput,
  options: CheckEndpointNameAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Cdn/checkEndpointNameAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-12-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: checkEndpointNameAvailabilityInputSerializer(checkEndpointNameAvailabilityInput),
  });
}

export async function _checkEndpointNameAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<CheckEndpointNameAvailabilityOutput> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return checkEndpointNameAvailabilityOutputDeserializer(result.body);
}

/** Check the availability of a resource name. This is needed for resources where name is globally unique, such as a afdx endpoint. */
export async function checkEndpointNameAvailability(
  context: Client,
  resourceGroupName: string,
  checkEndpointNameAvailabilityInput: CheckEndpointNameAvailabilityInput,
  options: CheckEndpointNameAvailabilityOptionalParams = { requestOptions: {} },
): Promise<CheckEndpointNameAvailabilityOutput> {
  const result = await _checkEndpointNameAvailabilitySend(
    context,
    resourceGroupName,
    checkEndpointNameAvailabilityInput,
    options,
  );
  return _checkEndpointNameAvailabilityDeserialize(result);
}
