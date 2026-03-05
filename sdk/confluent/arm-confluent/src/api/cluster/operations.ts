// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ConfluentManagementContext as Client } from "../index.js";
import type { SCClusterRecord } from "../../models/models.js";
import {
  resourceProviderDefaultErrorResponseDeserializer,
  scClusterRecordSerializer,
  scClusterRecordDeserializer,
  errorResponseDeserializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ClusterDeleteOptionalParams,
  ClusterCreateOrUpdateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  options: ClusterDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      clusterId: clusterId,
      "api%2Dversion": context.apiVersion ?? "2025-08-18-preview",
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

/** Delete confluent cluster by id */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export function $delete(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  options: ClusterDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(context, resourceGroupName, organizationName, environmentId, clusterId, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2025-08-18-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  options: ClusterCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Confluent/organizations/{organizationName}/environments/{environmentId}/clusters/{clusterId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      organizationName: organizationName,
      environmentId: environmentId,
      clusterId: clusterId,
      "api%2Dversion": context.apiVersion ?? "2025-08-18-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: !options["body"] ? options["body"] : scClusterRecordSerializer(options["body"]),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<SCClusterRecord> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = resourceProviderDefaultErrorResponseDeserializer(result.body);

    throw error;
  }

  return scClusterRecordDeserializer(result.body);
}

/** Create confluent clusters */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  organizationName: string,
  environmentId: string,
  clusterId: string,
  options: ClusterCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<SCClusterRecord> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    organizationName,
    environmentId,
    clusterId,
    options,
  );
  return _createOrUpdateDeserialize(result);
}
