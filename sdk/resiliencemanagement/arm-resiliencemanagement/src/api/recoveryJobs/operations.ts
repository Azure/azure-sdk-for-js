// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureResilienceManagementContext as Client } from "../index.js";
import type {
  ArmResponseErrorResponse,
  RecoveryJob,
  _RecoveryJobListResult,
  RecoveryActionRequest,
} from "../../models/models.js";
import {
  errorResponseDeserializer,
  armResponseErrorResponseDeserializer,
  recoveryJobDeserializer,
  _recoveryJobListResultDeserializer,
  recoveryActionRequestSerializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  RecoveryJobsRetryOptionalParams,
  RecoveryJobsResumeOptionalParams,
  RecoveryJobsCancelOptionalParams,
  RecoveryJobsListOptionalParams,
  RecoveryJobsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _retrySend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  recoveryJobName: string,
  options: RecoveryJobsRetryOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryJobs/{recoveryJobName}/retry{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      recoveryJobName: recoveryJobName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    headers: { "operation-id": operationId, ...options.requestOptions?.headers },
  });
}

export async function _retryDeserialize(
  result: PathUncheckedResponse,
): Promise<ArmResponseErrorResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 200) {
      if (result.body) {
        error.details = errorResponseDeserializer(result.body);
      }
    } else {
      if (result.body) {
        error.details = errorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return armResponseErrorResponseDeserializer(result.body);
}

/** This action retries the ongoing recovery orchestration job for resources that failed in previous attempts. */
export function retry(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  recoveryJobName: string,
  options: RecoveryJobsRetryOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse> {
  return getLongRunningPoller(context, _retryDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _retrySend(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        recoveryJobName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>;
}

export function _resumeSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  recoveryJobName: string,
  body: RecoveryActionRequest,
  options: RecoveryJobsResumeOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryJobs/{recoveryJobName}/resume{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      recoveryJobName: recoveryJobName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { "operation-id": operationId, ...options.requestOptions?.headers },
    body: recoveryActionRequestSerializer(body),
  });
}

export async function _resumeDeserialize(
  result: PathUncheckedResponse,
): Promise<ArmResponseErrorResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 200) {
      if (result.body) {
        error.details = errorResponseDeserializer(result.body);
      }
    } else {
      if (result.body) {
        error.details = errorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return armResponseErrorResponseDeserializer(result.body);
}

/** This action resumes the ongoing recovery orchestration job that was paused for required user intervention. */
export function resume(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  recoveryJobName: string,
  body: RecoveryActionRequest,
  options: RecoveryJobsResumeOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse> {
  return getLongRunningPoller(context, _resumeDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _resumeSend(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        recoveryJobName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>;
}

export function _cancelSend(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  recoveryJobName: string,
  body: RecoveryActionRequest,
  options: RecoveryJobsCancelOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryJobs/{recoveryJobName}/cancel{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      recoveryJobName: recoveryJobName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).post({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { "operation-id": operationId, ...options.requestOptions?.headers },
    body: recoveryActionRequestSerializer(body),
  });
}

export async function _cancelDeserialize(
  result: PathUncheckedResponse,
): Promise<ArmResponseErrorResponse> {
  const expectedStatuses = ["202", "200", "201"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    const statusCode = Number.parseInt(result.status);
    if (statusCode === 200) {
      if (result.body) {
        error.details = errorResponseDeserializer(result.body);
      }
    } else {
      if (result.body) {
        error.details = errorResponseDeserializer(result.body);
      }
    }
    throw error;
  }

  return armResponseErrorResponseDeserializer(result.body);
}

/** This action attempts to cancel the ongoing recovery orchestration job. */
export function cancel(
  context: Client,
  serviceGroupName: string,
  operationId: string,
  recoveryPlanName: string,
  recoveryJobName: string,
  body: RecoveryActionRequest,
  options: RecoveryJobsCancelOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse> {
  return getLongRunningPoller(context, _cancelDeserialize, ["202", "200", "201"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _cancelSend(
        context,
        serviceGroupName,
        operationId,
        recoveryPlanName,
        recoveryJobName,
        body,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-04-01-preview",
  }) as PollerLike<OperationState<ArmResponseErrorResponse>, ArmResponseErrorResponse>;
}

export function _listSend(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  options: RecoveryJobsListOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryJobs{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _listDeserialize(
  result: PathUncheckedResponse,
): Promise<_RecoveryJobListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _recoveryJobListResultDeserializer(result.body);
}

/** List RecoveryJob resources by RecoveryPlan */
export function list(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  options: RecoveryJobsListOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<RecoveryJob> {
  return buildPagedAsyncIterator(
    context,
    () => _listSend(context, serviceGroupName, recoveryPlanName, options),
    _listDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-04-01-preview",
    },
  );
}

export function _getSend(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  recoveryJobName: string,
  options: RecoveryJobsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/providers/Microsoft.Management/serviceGroups/{serviceGroupName}/providers/Microsoft.AzureResilienceManagement/recoveryPlans/{recoveryPlanName}/recoveryJobs/{recoveryJobName}{?api%2Dversion}",
    {
      serviceGroupName: serviceGroupName,
      recoveryPlanName: recoveryPlanName,
      recoveryJobName: recoveryJobName,
      "api%2Dversion": context.apiVersion ?? "2026-04-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<RecoveryJob> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return recoveryJobDeserializer(result.body);
}

/** Get a RecoveryJob */
export async function get(
  context: Client,
  serviceGroupName: string,
  recoveryPlanName: string,
  recoveryJobName: string,
  options: RecoveryJobsGetOptionalParams = { requestOptions: {} },
): Promise<RecoveryJob> {
  const result = await _getSend(
    context,
    serviceGroupName,
    recoveryPlanName,
    recoveryJobName,
    options,
  );
  return _getDeserialize(result);
}
