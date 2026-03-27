// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext as Client } from "./index.js";
import type {
  SkuAvailabilityListResult,
  DomainAvailability,
  CalculateModelCapacityResult,
} from "../models/models.js";
import {
  skuAvailabilityListResultDeserializer,
  errorResponseDeserializer,
  domainAvailabilityDeserializer,
  deploymentModelSerializer,
  modelCapacityCalculatorWorkloadArraySerializer,
  calculateModelCapacityResultDeserializer,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import type {
  CalculateModelCapacityOptionalParams,
  CheckDomainAvailabilityOptionalParams,
  CheckSkuAvailabilityOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _calculateModelCapacitySend(
  context: Client,
  options: CalculateModelCapacityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/calculateModelCapacity{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      model: !options?.model ? options?.model : deploymentModelSerializer(options?.model),
      skuName: options?.skuName,
      workloads: !options?.workloads
        ? options?.workloads
        : modelCapacityCalculatorWorkloadArraySerializer(options?.workloads),
    },
  });
}

export async function _calculateModelCapacityDeserialize(
  result: PathUncheckedResponse,
): Promise<CalculateModelCapacityResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return calculateModelCapacityResultDeserializer(result.body);
}

/** Model capacity calculator. */
export async function calculateModelCapacity(
  context: Client,
  options: CalculateModelCapacityOptionalParams = { requestOptions: {} },
): Promise<CalculateModelCapacityResult> {
  const result = await _calculateModelCapacitySend(context, options);
  return _calculateModelCapacityDeserialize(result);
}

export function _checkDomainAvailabilitySend(
  context: Client,
  subdomainName: string,
  typeParam: string,
  options: CheckDomainAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/checkDomainAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: { subdomainName: subdomainName, type: typeParam, kind: options?.kind },
  });
}

export async function _checkDomainAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<DomainAvailability> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return domainAvailabilityDeserializer(result.body);
}

/** Check whether a domain is available. */
export async function checkDomainAvailability(
  context: Client,
  subdomainName: string,
  typeParam: string,
  options: CheckDomainAvailabilityOptionalParams = { requestOptions: {} },
): Promise<DomainAvailability> {
  const result = await _checkDomainAvailabilitySend(context, subdomainName, typeParam, options);
  return _checkDomainAvailabilityDeserialize(result);
}

export function _checkSkuAvailabilitySend(
  context: Client,
  location: string,
  skus: string[],
  typeParam: string,
  kind: string,
  options: CheckSkuAvailabilityOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.CognitiveServices/locations/{location}/checkSkuAvailability{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      location: location,
      "api%2Dversion": context.apiVersion ?? "2026-01-15-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: {
      skus: skus.map((p: any) => {
        return p;
      }),
      kind: kind,
      type: typeParam,
    },
  });
}

export async function _checkSkuAvailabilityDeserialize(
  result: PathUncheckedResponse,
): Promise<SkuAvailabilityListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return skuAvailabilityListResultDeserializer(result.body);
}

/** Check available SKUs. */
export async function checkSkuAvailability(
  context: Client,
  location: string,
  skus: string[],
  typeParam: string,
  kind: string,
  options: CheckSkuAvailabilityOptionalParams = { requestOptions: {} },
): Promise<SkuAvailabilityListResult> {
  const result = await _checkSkuAvailabilitySend(context, location, skus, typeParam, kind, options);
  return _checkSkuAvailabilityDeserialize(result);
}
