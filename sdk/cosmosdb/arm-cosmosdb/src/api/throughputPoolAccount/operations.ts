// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CosmosDBManagementContext as Client } from "../index.js";
import type { ThroughputPoolAccountResource } from "../../models/models.js";
import {
  errorResponseDeserializer,
  throughputPoolAccountResourceSerializer,
  throughputPoolAccountResourceDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ThroughputPoolAccountDeleteOptionalParams,
  ThroughputPoolAccountCreateOptionalParams,
  ThroughputPoolAccountGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  throughputPoolName: string,
  throughputPoolAccountName: string,
  options: ThroughputPoolAccountDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/throughputPools/{throughputPoolName}/throughputPoolAccounts/{throughputPoolAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      throughputPoolName: throughputPoolName,
      throughputPoolAccountName: throughputPoolAccountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Removes an existing Azure Cosmos DB database account from a throughput pool. */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  throughputPoolName: string,
  throughputPoolAccountName: string,
  options: ThroughputPoolAccountDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        throughputPoolName,
        throughputPoolAccountName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  throughputPoolName: string,
  throughputPoolAccountName: string,
  body: ThroughputPoolAccountResource,
  options: ThroughputPoolAccountCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/throughputPools/{throughputPoolName}/throughputPoolAccounts/{throughputPoolAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      throughputPoolName: throughputPoolName,
      throughputPoolAccountName: throughputPoolAccountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: throughputPoolAccountResourceSerializer(body),
  });
}

export async function _createDeserialize(
  result: PathUncheckedResponse,
): Promise<ThroughputPoolAccountResource> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return throughputPoolAccountResourceDeserializer(result.body);
}

/** Creates or updates an Azure Cosmos DB ThroughputPool account. The "Update" method is preferred when performing updates on an account. */
export function create(
  context: Client,
  resourceGroupName: string,
  throughputPoolName: string,
  throughputPoolAccountName: string,
  body: ThroughputPoolAccountResource,
  options: ThroughputPoolAccountCreateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ThroughputPoolAccountResource>, ThroughputPoolAccountResource> {
  return getLongRunningPoller(context, _createDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createSend(
        context,
        resourceGroupName,
        throughputPoolName,
        throughputPoolAccountName,
        body,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2025-11-01-preview",
  }) as PollerLike<OperationState<ThroughputPoolAccountResource>, ThroughputPoolAccountResource>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  throughputPoolName: string,
  throughputPoolAccountName: string,
  options: ThroughputPoolAccountGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.DocumentDB/throughputPools/{throughputPoolName}/throughputPoolAccounts/{throughputPoolAccountName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      throughputPoolName: throughputPoolName,
      throughputPoolAccountName: throughputPoolAccountName,
      "api%2Dversion": context.apiVersion ?? "2025-11-01-preview",
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

export async function _getDeserialize(
  result: PathUncheckedResponse,
): Promise<ThroughputPoolAccountResource> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return throughputPoolAccountResourceDeserializer(result.body);
}

/** Retrieves the properties of an existing Azure Cosmos DB Throughput Pool */
export async function get(
  context: Client,
  resourceGroupName: string,
  throughputPoolName: string,
  throughputPoolAccountName: string,
  options: ThroughputPoolAccountGetOptionalParams = { requestOptions: {} },
): Promise<ThroughputPoolAccountResource> {
  const result = await _getSend(
    context,
    resourceGroupName,
    throughputPoolName,
    throughputPoolAccountName,
    options,
  );
  return _getDeserialize(result);
}
