// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type {
  _JobListResultV2,
  JobCollectionItem,
  Job,
  JobCreateParameters,
  JobOperationsGetRunbookContentResponse,
  JobOperationsGetOutputResponse,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  _jobListResultV2Deserializer,
  jobDeserializer,
  jobCreateParametersSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  JobOperationsResumeOptionalParams,
  JobOperationsStopOptionalParams,
  JobOperationsSuspendOptionalParams,
  JobOperationsGetRunbookContentOptionalParams,
  JobOperationsGetOutputOptionalParams,
  JobOperationsCreateOptionalParams,
  JobOperationsGetOptionalParams,
  JobOperationsListByAutomationAccountOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _resumeSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobOperationsResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}/resume{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { clientrequestid: options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _resumeDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Resume the job identified by jobName. */
export async function resume(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobOperationsResumeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resumeSend(
    context,
    resourceGroupName,
    automationAccountName,
    jobName,
    options,
  );
  return _resumeDeserialize(result);
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobOperationsStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { clientrequestid: options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _stopDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Stop the job identified by jobName. */
export async function stop(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobOperationsStopOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSend(
    context,
    resourceGroupName,
    automationAccountName,
    jobName,
    options,
  );
  return _stopDeserialize(result);
}

export function _suspendSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobOperationsSuspendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}/suspend{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { clientrequestid: options?.clientRequestId }
        : {}),
      ...options.requestOptions?.headers,
    },
  });
}

export async function _suspendDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Suspend the job identified by job name. */
export async function suspend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobOperationsSuspendOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _suspendSend(
    context,
    resourceGroupName,
    automationAccountName,
    jobName,
    options,
  );
  return _suspendDeserialize(result);
}

export function _getRunbookContentSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobOperationsGetRunbookContentOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}/runbookContent{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      jobName: jobName,
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
      accept: "text/powershell",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getRunbookContentDeserialize(
  result: PathUncheckedResponse,
): Promise<JobOperationsGetRunbookContentResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { body: result.body };
}

/** Retrieve the runbook content of the job identified by job name. */
export async function getRunbookContent(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobOperationsGetRunbookContentOptionalParams = { requestOptions: {} },
): Promise<JobOperationsGetRunbookContentResponse> {
  const result = await _getRunbookContentSend(
    context,
    resourceGroupName,
    automationAccountName,
    jobName,
    options,
  );
  return _getRunbookContentDeserialize(result);
}

export function _getOutputSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobOperationsGetOutputOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}/output{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      jobName: jobName,
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
      accept: "text/plain",
      ...options.requestOptions?.headers,
    },
  });
}

export async function _getOutputDeserialize(
  result: PathUncheckedResponse,
): Promise<JobOperationsGetOutputResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { body: result.body };
}

/** Retrieve the job output identified by job name. */
export async function getOutput(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobOperationsGetOutputOptionalParams = { requestOptions: {} },
): Promise<JobOperationsGetOutputResponse> {
  const result = await _getOutputSend(
    context,
    resourceGroupName,
    automationAccountName,
    jobName,
    options,
  );
  return _getOutputDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  parameters: JobCreateParameters,
  options: JobOperationsCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      jobName: jobName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: {
      ...(options?.clientRequestId !== undefined
        ? { clientrequestid: options?.clientRequestId }
        : {}),
      accept: "application/json",
      ...options.requestOptions?.headers,
    },
    body: jobCreateParametersSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return jobDeserializer(result.body);
}

/** Create a job of the runbook. */
export async function create(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  parameters: JobCreateParameters,
  options: JobOperationsCreateOptionalParams = { requestOptions: {} },
): Promise<Job> {
  const result = await _createSend(
    context,
    resourceGroupName,
    automationAccountName,
    jobName,
    parameters,
    options,
  );
  return _createDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobOperationsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs/{jobName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      jobName: jobName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<Job> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return jobDeserializer(result.body);
}

/** Retrieve the job identified by job name. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  jobName: string,
  options: JobOperationsGetOptionalParams = { requestOptions: {} },
): Promise<Job> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    jobName,
    options,
  );
  return _getDeserialize(result);
}

export function _listByAutomationAccountSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: JobOperationsListByAutomationAccountOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/jobs{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
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

export async function _listByAutomationAccountDeserialize(
  result: PathUncheckedResponse,
): Promise<_JobListResultV2> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _jobListResultV2Deserializer(result.body);
}

/** Retrieve a list of jobs. */
export function listByAutomationAccount(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  options: JobOperationsListByAutomationAccountOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<JobCollectionItem> {
  return buildPagedAsyncIterator(
    context,
    () => _listByAutomationAccountSend(context, resourceGroupName, automationAccountName, options),
    _listByAutomationAccountDeserialize,
    ["200"],
    { itemName: "value", nextLinkName: "nextLink", apiVersion: context.apiVersion ?? "2024-10-23" },
  );
}
