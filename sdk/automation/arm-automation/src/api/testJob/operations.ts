// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AutomationContext as Client } from "../index.js";
import type { TestJobCreateParameters, TestJob } from "../../models/models.js";
import {
  errorResponseDeserializer,
  testJobCreateParametersSerializer,
  testJobDeserializer,
} from "../../models/models.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  TestJobSuspendOptionalParams,
  TestJobStopOptionalParams,
  TestJobResumeOptionalParams,
  TestJobGetOptionalParams,
  TestJobCreateOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";

export function _suspendSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: TestJobSuspendOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob/suspend{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runbookName: runbookName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
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

/** Suspend the test job. */
export async function suspend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: TestJobSuspendOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _suspendSend(
    context,
    resourceGroupName,
    automationAccountName,
    runbookName,
    options,
  );
  return _suspendDeserialize(result);
}

export function _stopSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: TestJobStopOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob/stop{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runbookName: runbookName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
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

/** Stop the test job. */
export async function stop(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: TestJobStopOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _stopSend(
    context,
    resourceGroupName,
    automationAccountName,
    runbookName,
    options,
  );
  return _stopDeserialize(result);
}

export function _resumeSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: TestJobResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob/resume{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runbookName: runbookName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({ ...operationOptionsToRequestParameters(options) });
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

/** Resume the test job. */
export async function resume(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: TestJobResumeOptionalParams = { requestOptions: {} },
): Promise<void> {
  const result = await _resumeSend(
    context,
    resourceGroupName,
    automationAccountName,
    runbookName,
    options,
  );
  return _resumeDeserialize(result);
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: TestJobGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runbookName: runbookName,
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<TestJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return testJobDeserializer(result.body);
}

/** Retrieve the test job for the specified runbook. */
export async function get(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  options: TestJobGetOptionalParams = { requestOptions: {} },
): Promise<TestJob> {
  const result = await _getSend(
    context,
    resourceGroupName,
    automationAccountName,
    runbookName,
    options,
  );
  return _getDeserialize(result);
}

export function _createSend(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  parameters: TestJobCreateParameters,
  options: TestJobCreateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.Automation/automationAccounts/{automationAccountName}/runbooks/{runbookName}/draft/testJob{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      automationAccountName: automationAccountName,
      runbookName: runbookName,
      "api%2Dversion": context.apiVersion ?? "2024-10-23",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: testJobCreateParametersSerializer(parameters),
  });
}

export async function _createDeserialize(result: PathUncheckedResponse): Promise<TestJob> {
  const expectedStatuses = ["201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return testJobDeserializer(result.body);
}

/** Create a test job of the runbook. */
export async function create(
  context: Client,
  resourceGroupName: string,
  automationAccountName: string,
  runbookName: string,
  parameters: TestJobCreateParameters,
  options: TestJobCreateOptionalParams = { requestOptions: {} },
): Promise<TestJob> {
  const result = await _createSend(
    context,
    resourceGroupName,
    automationAccountName,
    runbookName,
    parameters,
    options,
  );
  return _createDeserialize(result);
}
