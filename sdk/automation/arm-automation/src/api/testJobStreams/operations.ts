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
  TestJobStreamsListByTestJobOptionalParams,
  TestJobStreamsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _listByTestJobSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: TestJobStreamsListByTestJobOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob/streams{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runbookName: runbookName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
      "%24filter": options?.filter,
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

export async function _listByTestJobDeserialize(
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

/** Retrieve a list of test job streams identified by runbook name. */
export function listByTestJob(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: TestJobStreamsListByTestJobOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobStream> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByTestJobSend(context, resourceGroupName, automationAccountName, runbookName, options),
    _listByTestJobDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  jobStreamId: string,
  options: TestJobStreamsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob/streams/{jobStreamId}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runbookName: runbookName,
      jobStreamId: jobStreamId,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
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

/** Retrieve a test job stream of the test job identified by runbook name and stream id. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  jobStreamId: string,
  options: TestJobStreamsGetOptionalParams = { requestOptions: {} },
): Promise<JobStream> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    runbookName,
    jobStreamId,
    options,
  );
  return _getDeserialize(result);
}
