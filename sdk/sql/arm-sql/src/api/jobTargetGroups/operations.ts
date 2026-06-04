// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  JobTargetGroup,
  jobTargetGroupSerializer,
  jobTargetGroupDeserializer,
  _JobTargetGroupListResult,
  _jobTargetGroupListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  JobTargetGroupsListByAgentOptionalParams,
  JobTargetGroupsDeleteOptionalParams,
  JobTargetGroupsCreateOrUpdateOptionalParams,
  JobTargetGroupsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _listByAgentSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  options: JobTargetGroupsListByAgentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/targetGroups{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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

export async function _listByAgentDeserialize(
  result: PathUncheckedResponse,
): Promise<_JobTargetGroupListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _jobTargetGroupListResultDeserializer(result.body);
}

/** Gets all target groups in an agent. */
export function listByAgent(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  options: JobTargetGroupsListByAgentOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobTargetGroup> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAgentSend(context, resourceGroupName, serverName, jobAgentName, options),
    _listByAgentDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2025-01-01" },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  targetGroupName: string,
  options: JobTargetGroupsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/targetGroups/{targetGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      targetGroupName: targetGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200", "204"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return;
}

/** Deletes a target group. */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  targetGroupName: string,
  options: JobTargetGroupsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    targetGroupName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  targetGroupName: string,
  parameters: JobTargetGroup,
  options: JobTargetGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/targetGroups/{targetGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      targetGroupName: targetGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: jobTargetGroupSerializer(parameters),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<JobTargetGroup> {
  const expectedStatuses = ["200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return jobTargetGroupDeserializer(result.body);
}

/** Creates or updates a target group. */
export async function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  targetGroupName: string,
  parameters: JobTargetGroup,
  options: JobTargetGroupsCreateOrUpdateOptionalParams = { requestOptions: {} },
): Promise<JobTargetGroup> {
  const result = await _createOrUpdateSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    targetGroupName,
    parameters,
    options,
  );
  return _createOrUpdateDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  targetGroupName: string,
  options: JobTargetGroupsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/targetGroups/{targetGroupName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      targetGroupName: targetGroupName,
      "api%2Dversion": context.apiVersion ?? "2025-01-01",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<JobTargetGroup> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return jobTargetGroupDeserializer(result.body);
}

/** Gets a target group. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  targetGroupName: string,
  options: JobTargetGroupsGetOptionalParams = { requestOptions: {} },
): Promise<JobTargetGroup> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    targetGroupName,
    options,
  );
  return _getDeserialize(result);
}
