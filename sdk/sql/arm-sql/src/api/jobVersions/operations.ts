// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext as Client } from "../index.js";
import type { JobVersion, _JobVersionListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  jobVersionDeserializer,
  _jobVersionListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  JobVersionsListByJobOptionalParams,
  JobVersionsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByJobSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  options: JobVersionsListByJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/versions{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _listByJobDeserialize(
  result: PathUncheckedResponse,
): Promise<_JobVersionListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return _jobVersionListResultDeserializer(result.body);
}

/** Gets all versions of a job. */
export function listByJob(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  options: JobVersionsListByJobOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobVersion> {
  return buildPagedAsyncIterator(
    context,
    () => _listByJobSend(context, resourceGroupName, serverName, jobAgentName, jobName, options),
    _listByJobDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2025-02-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobVersion: number,
  options: JobVersionsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Sql/servers/{serverName}/jobAgents/{jobAgentName}/jobs/{jobName}/versions/{jobVersion}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      serverName: serverName,
      jobAgentName: jobAgentName,
      jobName: jobName,
      jobVersion: jobVersion,
      "api%2Dversion": context.apiVersion ?? "2025-02-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<JobVersion> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);

    throw error;
  }

  return jobVersionDeserializer(result.body);
}

/** Gets a job version. */
export async function get(
  context: Client,
  resourceGroupName: string,
  serverName: string,
  jobAgentName: string,
  jobName: string,
  jobVersion: number,
  options: JobVersionsGetOptionalParams = { requestOptions: {} },
): Promise<JobVersion> {
  const result = await _getSend(
    context,
    resourceGroupName,
    serverName,
    jobAgentName,
    jobName,
    jobVersion,
    options,
  );
  return _getDeserialize(result);
}
