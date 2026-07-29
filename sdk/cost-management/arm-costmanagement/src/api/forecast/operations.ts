// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CostManagementContext as Client } from "../index.js";
import type {
  ForecastDefinition,
  ForecastResult,
  ExternalCloudProviderType,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  forecastDefinitionSerializer,
  forecastResultDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ForecastExternalCloudProviderUsageOptionalParams,
  ForecastUsageOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _externalCloudProviderUsageSend(
  context: Client,
  externalCloudProviderType: ExternalCloudProviderType,
  externalCloudProviderId: string,
  parameters: ForecastDefinition,
  options: ForecastExternalCloudProviderUsageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/{externalCloudProviderType}/{externalCloudProviderId}/forecast{?api%2Dversion,%24filter}",
    {
      externalCloudProviderType: externalCloudProviderType,
      externalCloudProviderId: externalCloudProviderId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: forecastDefinitionSerializer(parameters),
  });
}

export async function _externalCloudProviderUsageDeserialize(
  result: PathUncheckedResponse,
): Promise<ForecastResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return forecastResultDeserializer(result.body);
}

/** Lists the forecast charges for external cloud provider type defined. */
export async function externalCloudProviderUsage(
  context: Client,
  externalCloudProviderType: ExternalCloudProviderType,
  externalCloudProviderId: string,
  parameters: ForecastDefinition,
  options: ForecastExternalCloudProviderUsageOptionalParams = { requestOptions: {} },
): Promise<ForecastResult> {
  const result = await _externalCloudProviderUsageSend(
    context,
    externalCloudProviderType,
    externalCloudProviderId,
    parameters,
    options,
  );
  return _externalCloudProviderUsageDeserialize(result);
}

export function _usageSend(
  context: Client,
  scope: string,
  parameters: ForecastDefinition,
  options: ForecastUsageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/forecast{?api%2Dversion,%24filter}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: forecastDefinitionSerializer(parameters),
  });
}

export async function _usageDeserialize(
  result: PathUncheckedResponse,
): Promise<ForecastResult | undefined> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return result.body ? forecastResultDeserializer(result.body) : undefined;
}

/** Lists the forecast charges for scope defined. */
export async function usage(
  context: Client,
  scope: string,
  parameters: ForecastDefinition,
  options: ForecastUsageOptionalParams = { requestOptions: {} },
): Promise<ForecastResult | undefined> {
  const result = await _usageSend(context, scope, parameters, options);
  return _usageDeserialize(result);
}
