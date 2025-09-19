// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MicrosoftElasticContext as Client } from "../index.js";
import type {
  ElasticMonitorResource,
  UserApiKeyResponse,
  ElasticOrganizationToAzureSubscriptionMappingResponse,
} from "../../models/models.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  errorResponseDeserializer,
  elasticMonitorResourceDeserializer,
  resubscribePropertiesSerializer,
  userEmailIdSerializer,
  userApiKeyResponseDeserializer,
  elasticOrganizationToAzureSubscriptionMappingResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  OrganizationsGetElasticToAzureSubscriptionMappingOptionalParams,
  OrganizationsGetApiKeyOptionalParams,
  OrganizationsResubscribeOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _getElasticToAzureSubscriptionMappingSend(
  context: Client,
  options: OrganizationsGetElasticToAzureSubscriptionMappingOptionalParams = {
    requestOptions: {},
  },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Elastic/getElasticOrganizationToAzureSubscriptionMapping{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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

export async function _getElasticToAzureSubscriptionMappingDeserialize(
  result: PathUncheckedResponse,
): Promise<ElasticOrganizationToAzureSubscriptionMappingResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return elasticOrganizationToAzureSubscriptionMappingResponseDeserializer(result.body);
}

/**
 * >;
 *   /**
 * Retrieve mapping details between the Elastic Organization and Azure Subscription for the logged-in user.
 */
export async function getElasticToAzureSubscriptionMapping(
  context: Client,
  options: OrganizationsGetElasticToAzureSubscriptionMappingOptionalParams = {
    requestOptions: {},
  },
): Promise<ElasticOrganizationToAzureSubscriptionMappingResponse> {
  const result = await _getElasticToAzureSubscriptionMappingSend(context, options);
  return _getElasticToAzureSubscriptionMappingDeserialize(result);
}

export function _getApiKeySend(
  context: Client,
  options: OrganizationsGetApiKeyOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.Elastic/getOrganizationApiKey{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
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
    body: !options["body"] ? options["body"] : userEmailIdSerializer(options["body"]),
  });
}

export async function _getApiKeyDeserialize(
  result: PathUncheckedResponse,
): Promise<UserApiKeyResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);
    throw error;
  }

  return userApiKeyResponseDeserializer(result.body);
}

/** Fetch the User API Key from the internal database, if it was generated and stored during the creation of the Elasticsearch Organization. */
export async function getApiKey(
  context: Client,
  options: OrganizationsGetApiKeyOptionalParams = { requestOptions: {} },
): Promise<UserApiKeyResponse> {
  const result = await _getApiKeySend(context, options);
  return _getApiKeyDeserialize(result);
}

export function _resubscribeSend(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: OrganizationsResubscribeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Elastic/monitors/{monitorName}/resubscribe{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      monitorName: monitorName,
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
    body: !options["body"] ? options["body"] : resubscribePropertiesSerializer(options["body"]),
  });
}

export async function _resubscribeDeserialize(
  result: PathUncheckedResponse,
): Promise<ElasticMonitorResource> {
  const expectedStatuses = ["202", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return elasticMonitorResourceDeserializer(result.body);
}

/** Resubscribe the Elasticsearch Organization. */
export function resubscribe(
  context: Client,
  resourceGroupName: string,
  monitorName: string,
  options: OrganizationsResubscribeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ElasticMonitorResource>, ElasticMonitorResource> {
  return getLongRunningPoller(context, _resubscribeDeserialize, ["202", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () => _resubscribeSend(context, resourceGroupName, monitorName, options),
    resourceLocationConfig: "location",
  }) as PollerLike<OperationState<ElasticMonitorResource>, ElasticMonitorResource>;
}
