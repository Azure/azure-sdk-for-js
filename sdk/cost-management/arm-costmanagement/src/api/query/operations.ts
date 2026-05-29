// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CostManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  QueryDefinition,
  queryDefinitionSerializer,
  QueryResult,
  queryResultDeserializer,
  ExternalCloudProviderType,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  QueryUsageByExternalCloudProviderTypeOptionalParams,
  QueryUsageOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _usageByExternalCloudProviderTypeSend(
  context: Client,
  externalCloudProviderType: ExternalCloudProviderType,
  externalCloudProviderId: string,
  parameters: QueryDefinition,
  options: QueryUsageByExternalCloudProviderTypeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.CostManagement/{externalCloudProviderType}/{externalCloudProviderId}/query{?api%2Dversion}",
    {
      externalCloudProviderType: externalCloudProviderType,
      externalCloudProviderId: externalCloudProviderId,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: queryDefinitionSerializer(parameters),
  });
}

export async function _usageByExternalCloudProviderTypeDeserialize(
  result: PathUncheckedResponse,
): Promise<QueryResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return queryResultDeserializer(result.body);
}

/** Query the usage data for external cloud provider type defined. */
export async function usageByExternalCloudProviderType(
  context: Client,
  externalCloudProviderType: ExternalCloudProviderType,
  externalCloudProviderId: string,
  parameters: QueryDefinition,
  options: QueryUsageByExternalCloudProviderTypeOptionalParams = { requestOptions: {} },
): Promise<QueryResult> {
  const result = await _usageByExternalCloudProviderTypeSend(
    context,
    externalCloudProviderType,
    externalCloudProviderId,
    parameters,
    options,
  );
  return _usageByExternalCloudProviderTypeDeserialize(result);
}

export function _usageSend(
  context: Client,
  scope: string,
  parameters: QueryDefinition,
  options: QueryUsageOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/{+scope}/providers/Microsoft.CostManagement/query{?api%2Dversion}",
    {
      scope: scope,
      "api%2Dversion": context.apiVersion ?? "2025-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: queryDefinitionSerializer(parameters),
  });
}

export async function _usageDeserialize(result: PathUncheckedResponse): Promise<QueryResult> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return queryResultDeserializer(result.body);
}

/** Query the usage data for scope defined. */
export async function usage(
  context: Client,
  scope: string,
  parameters: QueryDefinition,
  options: QueryUsageOptionalParams = { requestOptions: {} },
): Promise<QueryResult> {
  const result = await _usageSend(context, scope, parameters, options);
  return _usageDeserialize(result);
}
