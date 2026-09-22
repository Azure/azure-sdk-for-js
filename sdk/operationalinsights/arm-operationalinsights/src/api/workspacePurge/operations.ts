// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OperationalInsightsManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  WorkspacePurgeBody,
  workspacePurgeBodySerializer,
  WorkspacePurgeResponse,
  workspacePurgeResponseDeserializer,
  WorkspacePurgeStatusResponse,
  workspacePurgeStatusResponseDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  WorkspacePurgeGetPurgeStatusOptionalParams,
  WorkspacePurgePurgeOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

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
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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
    error.details = errorResponseDeserializer(result.body);

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
      "api%2Dversion": context.apiVersion ?? "2025-07-01",
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
    error.details = errorResponseDeserializer(result.body);

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
