// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext as Client } from "../index.js";
import type { Job, _JobList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  jobDeserializer,
  _jobListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  WorkspaceManagerAssignmentJobsListOptionalParams,
  WorkspaceManagerAssignmentJobsDeleteOptionalParams,
  WorkspaceManagerAssignmentJobsGetOptionalParams,
  WorkspaceManagerAssignmentJobsCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerAssignmentName: string,
  options: WorkspaceManagerAssignmentJobsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/workspaceManagerAssignments/{workspaceManagerAssignmentName}/jobs{?api%2Dversion,%24orderby,%24top,%24skipToken}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      workspaceManagerAssignmentName: workspaceManagerAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
      "%24orderby": options?.orderby,
      "%24top": options?.top,
      "%24skipToken": options?.skipToken,
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

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_JobList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _jobListDeserializer(result.body);
}

/** Get all jobs for the specified workspace manager assignment */
export function list(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerAssignmentName: string,
  options: WorkspaceManagerAssignmentJobsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<Job> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(context, resourceGroupName, workspaceName, workspaceManagerAssignmentName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-07-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerAssignmentName: string,
  jobName: string,
  options: WorkspaceManagerAssignmentJobsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/workspaceManagerAssignments/{workspaceManagerAssignmentName}/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      workspaceManagerAssignmentName: workspaceManagerAssignmentName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

/** Deletes the specified job from the specified workspace manager assignment */
/**
 *  @fixme delete is a reserved word that cannot be used as an operation name.
 *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
 *         to the operation to override the generated name.
 */
export async function $delete(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerAssignmentName: string,
  jobName: string,
  options: WorkspaceManagerAssignmentJobsDeleteOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _$deleteSend(
    context,
    resourceGroupName,
    workspaceName,
    workspaceManagerAssignmentName,
    jobName,
    options,
  );
  return _$deleteDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerAssignmentName: string,
  jobName: string,
  options: WorkspaceManagerAssignmentJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/workspaceManagerAssignments/{workspaceManagerAssignmentName}/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      workspaceManagerAssignmentName: workspaceManagerAssignmentName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return jobDeserializer(result.body);
}

/** Gets a job */
export async function get(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerAssignmentName: string,
  jobName: string,
  options: WorkspaceManagerAssignmentJobsGetOptionalParams = { requestOptions: {} },
): Promise<Job> {
  const result = await _getSend(
    context,
    resourceGroupName,
    workspaceName,
    workspaceManagerAssignmentName,
    jobName,
    options,
  );
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerAssignmentName: string,
  options: WorkspaceManagerAssignmentJobsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.OperationalInsights/workspaces/{workspaceName}/providers/Microsoft.SecurityInsights/workspaceManagerAssignments/{workspaceManagerAssignmentName}/jobs{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      workspaceName: workspaceName,
      workspaceManagerAssignmentName: workspaceManagerAssignmentName,
      "api%2Dversion": context.apiVersion ?? "2025-07-01-preview",
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

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return jobDeserializer(result.body);
}

/** Create a job for the specified workspace manager assignment */
export async function create(
  context: Client,
  resourceGroupName: string,
  workspaceName: string,
  workspaceManagerAssignmentName: string,
  options: WorkspaceManagerAssignmentJobsCreateOptionalParams = { requestOptions: {} },
): Promise<Job> {
  const result = await _createSend(
    context,
    resourceGroupName,
    workspaceName,
    workspaceManagerAssignmentName,
    options,
  );
  return _createDeserialize(result);
}
