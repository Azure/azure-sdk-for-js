// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { StorageMoverContext as Client } from "../index.js";
import type { JobRun, _JobRunList } from "../../models/models.js";
import {
  errorResponseDeserializer,
  jobRunDeserializer,
  _jobRunListDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type { JobRunsListOptionalParams, JobRunsGetOptionalParams } from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  options: JobRunsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}/jobRuns{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      projectName: projectName,
      jobDefinitionName: jobDefinitionName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listDeserialize(result: PathUncheckedResponse): Promise<_JobRunList> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return _jobRunListDeserializer(result.body);
}

/** Lists all Job Runs in a Job Definition. */
export function list(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  options: JobRunsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobRun> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listSend(
        context,
        resourceGroupName,
        storageMoverName,
        projectName,
        jobDefinitionName,
        options,
      ),
    _listDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  jobRunName: string,
  options: JobRunsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.StorageMover/storageMovers/{storageMoverName}/projects/{projectName}/jobDefinitions/{jobDefinitionName}/jobRuns/{jobRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      storageMoverName: storageMoverName,
      projectName: projectName,
      jobDefinitionName: jobDefinitionName,
      jobRunName: jobRunName,
      "api%2Dversion": context.apiVersion,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<JobRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    error.details = errorResponseDeserializer(result.body);
    throw error;
  }

  return jobRunDeserializer(result.body);
}

/** Gets a Job Run resource. */
export async function get(
  context: Client,
  resourceGroupName: string,
  storageMoverName: string,
  projectName: string,
  jobDefinitionName: string,
  jobRunName: string,
  options: JobRunsGetOptionalParams = { requestOptions: {} },
): Promise<JobRun> {
  const result = await _getSend(
    context,
    resourceGroupName,
    storageMoverName,
    projectName,
    jobDefinitionName,
    jobRunName,
    options,
  );
  return _getDeserialize(result);
}
