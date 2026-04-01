// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext as Client } from "../index.js";
import type {
  IntegrationRuntimeResource,
  EnableInteractiveQueryRequest,
} from "../../models/models.js";
import {
  integrationRuntimeResourceDeserializer,
  enableInteractiveQueryRequestSerializer,
  errorResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  IntegrationRuntimeDisableInteractiveQueryOptionalParams,
  IntegrationRuntimeEnableInteractiveQueryOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _disableInteractiveQuerySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimeDisableInteractiveQueryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/disableInteractiveQuery{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { accept: "application/json", ...options.requestOptions?.headers },
  });
}

export async function _disableInteractiveQueryDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeResourceDeserializer(result.body);
}

/** Disable interactive authoring of Managed Virtual Network integration runtime. */
export function disableInteractiveQuery(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  options: IntegrationRuntimeDisableInteractiveQueryOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IntegrationRuntimeResource>, IntegrationRuntimeResource> {
  return getLongRunningPoller(context, _disableInteractiveQueryDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _disableInteractiveQuerySend(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2018-06-01",
  }) as PollerLike<OperationState<IntegrationRuntimeResource>, IntegrationRuntimeResource>;
}

export function _enableInteractiveQuerySend(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  enableInteractiveQueryRequest: EnableInteractiveQueryRequest,
  options: IntegrationRuntimeEnableInteractiveQueryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DataFactory/factories/{factoryName}/integrationRuntimes/{integrationRuntimeName}/enableInteractiveQuery{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      factoryName: factoryName,
      integrationRuntimeName: integrationRuntimeName,
      "api%2Dversion": context.apiVersion ?? "2018-06-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: enableInteractiveQueryRequestSerializer(enableInteractiveQueryRequest),
  });
}

export async function _enableInteractiveQueryDeserialize(
  result: PathUncheckedResponse,
): Promise<IntegrationRuntimeResource> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return integrationRuntimeResourceDeserializer(result.body);
}

/** Enable interactive authoring of Managed Virtual Network integration runtime. */
export function enableInteractiveQuery(
  context: Client,
  resourceGroupName: string,
  factoryName: string,
  integrationRuntimeName: string,
  enableInteractiveQueryRequest: EnableInteractiveQueryRequest,
  options: IntegrationRuntimeEnableInteractiveQueryOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<IntegrationRuntimeResource>, IntegrationRuntimeResource> {
  return getLongRunningPoller(context, _enableInteractiveQueryDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _enableInteractiveQuerySend(
        context,
        resourceGroupName,
        factoryName,
        integrationRuntimeName,
        enableInteractiveQueryRequest,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2018-06-01",
  }) as PollerLike<OperationState<IntegrationRuntimeResource>, IntegrationRuntimeResource>;
}
