// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { OperationalInsightsManagementContext as Client } from "../index.js";
import type {
  WorkspacePurgeBody,
  WorkspacePurgeResponse,
  WorkspacePurgeStatusResponse,
  WorkspacePurgeLakeDataBody,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  workspacePurgeBodySerializer,
  workspacePurgeResponseDeserializer,
  workspacePurgeStatusResponseDeserializer,
  workspacePurgeLakeDataBodySerializer,
} from "../../models/models.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspacePurgePurgeLakeDataOptionalParams,
  WorkspacePurgeGetPurgeStatusOptionalParams,
  WorkspacePurgePurgeOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _purgeLakeDataSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  body: WorkspacePurgeLakeDataBody,
  options: WorkspacePurgePurgeLakeDataOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/purgeLakeData{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    body: workspacePurgeLakeDataBodySerializer(body),
  });
}

export async function _purgeLakeDataDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}
/**
 * Purges data lake data in a Log Analytics workspace for a table over a specified time range.
 *
 * This operation deletes data lake data (Auxiliary tables, or Analytics tables mirrored to the data lake) for the specified table within the given time range. The operation is long-running; poll the URL returned in the Azure-AsyncOperation response header to track its status.
 */
export function purgeLakeData(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  body: WorkspacePurgeLakeDataBody,
  options: WorkspacePurgePurgeLakeDataOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _purgeLakeDataDeserialize, ["202", "204", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _purgeLakeDataSend(context, resourceGroupName, workspaceName, body, options),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-03-01",
  }) as PollerLike<OperationState<void>, void>;
}

export function _getPurgeStatusSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  purgeId: string,
  options: WorkspacePurgeGetPurgeStatusOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/operations/{purgeId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      purgeId: purgeId,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
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

export async function _getPurgeStatusDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkspacePurgeStatusResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workspacePurgeStatusResponseDeserializer(result.body);
}
/** Gets status of an ongoing purge operation. */
export async function getPurgeStatus(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  purgeId: string,
  options: WorkspacePurgeGetPurgeStatusOptionalParams = { requestOptions: {} },
): Promise<WorkspacePurgeStatusResponse> {
  const result = await _getPurgeStatusSend(
    context,
    resourceGroupName,
    workspaceName,
    purgeId,
    options,
  );
  return _getPurgeStatusDeserialize(result);
}

export function _purgeSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  body: WorkspacePurgeBody,
  options: WorkspacePurgePurgeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/purge{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      "api%2Dversion": context.apiVersion ?? "2026-03-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: workspacePurgeBodySerializer(body),
  });
}

export async function _purgeDeserialize(
  result: PathUncheckedResponse,
): Promise<WorkspacePurgeResponse> {
  const expectedStatuses = ["202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return workspacePurgeResponseDeserializer(result.body);
}
/**
 * Purges data in an Log Analytics workspace by a set of user-defined filters.
 *
 * In order to manage system resources, purge requests are throttled at 50 requests per hour. You should batch the execution of purge requests by sending a single command whose predicate includes all user identities that require purging. Use the in operator to specify multiple identities. You should run the query prior to using for a purge request to verify that the results are expected.
 * Log Analytics only supports purge operations required for compliance with GDPR. The Log Analytics product team reserves the right to reject requests for purge operations that are not for the purpose of GDPR compliance. In the event of a dispute, please create a support ticket
 */
export async function purge(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  body: WorkspacePurgeBody,
  options: WorkspacePurgePurgeOptionalParams = { requestOptions: {} },
): Promise<WorkspacePurgeResponse> {
  const result = await _purgeSend(context, resourceGroupName, workspaceName, body, options);
  return _purgeDeserialize(result);
}
