// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerAppsAPIContext as Client } from "./index.js";
import {
  defaultErrorResponseDeserializer,
  JobExecution,
  jobExecutionDeserializer,
  GetCustomDomainVerificationIdResponse,
} from "../models/models.js";
import { expandUrlTemplate } from "../static-helpers/urlTemplate.js";
import {
  JobExecutionOptionalParams,
  GetCustomDomainVerificationIdOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

export function _jobExecutionSend(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  jobExecutionName: string,
  options: JobExecutionOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.App/jobs/{jobName}/executions/{jobExecutionName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      jobName: jobName,
      jobExecutionName: jobExecutionName,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .get({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "application/json", ...options.requestOptions?.headers },
    });
}

export async function _jobExecutionDeserialize(
  result: PathUncheckedResponse,
): Promise<JobExecution> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return jobExecutionDeserializer(result.body);
}

/** Get details of a single job execution */
export async function jobExecution(
  context: Client,
  resourceGroupName: string,
  jobName: string,
  jobExecutionName: string,
  options: JobExecutionOptionalParams = { requestOptions: {} },
): Promise<JobExecution> {
  const result = await _jobExecutionSend(
    context,
    resourceGroupName,
    jobName,
    jobExecutionName,
    options,
  );
  return _jobExecutionDeserialize(result);
}

export function _getCustomDomainVerificationIdSend(
  context: Client,
  options: GetCustomDomainVerificationIdOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/providers/Microsoft.App/getCustomDomainVerificationId{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      "api%2Dversion": context.apiVersion ?? "2025-10-02-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context
    .path(path)
    .post({
      ...operationOptionsToRequestParameters(options),
      headers: { accept: "text/plain", ...options.requestOptions?.headers },
    });
}

export async function _getCustomDomainVerificationIdDeserialize(
  result: PathUncheckedResponse,
): Promise<GetCustomDomainVerificationIdResponse> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = defaultErrorResponseDeserializer(result.body);
    }

    throw error;
  }

  return { body: result.body };
}

/** Get the verification id of a subscription used for verifying custom domains */
export async function getCustomDomainVerificationId(
  context: Client,
  options: GetCustomDomainVerificationIdOptionalParams = { requestOptions: {} },
): Promise<GetCustomDomainVerificationIdResponse> {
  const result = await _getCustomDomainVerificationIdSend(context, options);
  return _getCustomDomainVerificationIdDeserialize(result);
}
