// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type { JobStream, _JobStreamListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  jobStreamDeserializer,
  _jobStreamListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  JobStreamOperationsListByJobOptionalParams,
  JobStreamOperationsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByJobSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobStreamOperationsListByJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}/streams{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
      "%24filter": options?.filter,
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { clientrequestid: options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _listByJobDeserialize(
  result: PathUncheckedResponse,
): Promise<_JobStreamListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _jobStreamListResultDeserializer(result.body);
}

/** Retrieve a list of jobs streams identified by job name. */
export function listByJob(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobStreamOperationsListByJobOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobStream> {
  return buildPagedAsyncIterator(
    context,
    () => _listByJobSend(context, resourceGroupName, automationAccountName, jobName, options),
    _listByJobDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  jobStreamId: string,
  options: JobStreamOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}/streams/{jobStreamId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      jobName: jobName,
      jobStreamId: jobStreamId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).get({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { clientrequestid: options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getDeserialize(result: PathUncheckedResponse): Promise<JobStream> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return jobStreamDeserializer(result.body);
}

/** Retrieve the job stream identified by job stream id. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  jobStreamId: string,
  options: JobStreamOperationsGetOptionalParams = { requestOptions: {} },
): Promise<JobStream> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    jobName,
    jobStreamId,
    options,
  );
  return _getDeserialize(result);
}
