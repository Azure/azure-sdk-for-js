// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ExecutionPlanRun,
  executionPlanRunSerializer,
  executionPlanRunDeserializer,
  _ExecutionPlanRunListResult,
  _executionPlanRunListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ExecutionPlanRunsListByExecutionPlanOptionalParams,
  ExecutionPlanRunsDeleteOptionalParams,
  ExecutionPlanRunsCreateOrUpdateOptionalParams,
  ExecutionPlanRunsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";
import { PollerLike, OperationState } from "@azure/core-lro";

export function _listByExecutionPlanSend(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  options: ExecutionPlanRunsListByExecutionPlanOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PlatformValidation/cloudValidations/{cloudValidationName}/validationExecutionPlans/{validationExecutionPlanName}/executionPlanRuns{?api%2Dversion,%24filter}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudValidationName: cloudValidationName,
      validationExecutionPlanName: validationExecutionPlanName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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

export async function _listByExecutionPlanDeserialize(
  result: PathUncheckedResponse,
): Promise<_ExecutionPlanRunListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _executionPlanRunListResultDeserializer(result.body);
}

/** List Validation test execution plan runs for an execution plan */
export function listByExecutionPlan(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  options: ExecutionPlanRunsListByExecutionPlanOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ExecutionPlanRun> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByExecutionPlanSend(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        options,
      ),
    _listByExecutionPlanDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  options: ExecutionPlanRunsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PlatformValidation/cloudValidations/{cloudValidationName}/validationExecutionPlans/{validationExecutionPlanName}/executionPlanRuns/{executionPlanRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudValidationName: cloudValidationName,
      validationExecutionPlanName: validationExecutionPlanName,
      executionPlanRunName: executionPlanRunName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).delete({ ...operationOptionsToRequestParameters(options) });
}

export async function _$deleteDeserialize(result: PathUncheckedResponse): Promise<void> {
  const expectedStatuses = ["202", "204", "200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return;
}

/** Delete a validation test execution plan run resource */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  options: ExecutionPlanRunsDeleteOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<void>, void> {
  return getLongRunningPoller(context, _$deleteDeserialize, ["202", "204", "200"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _$deleteSend(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        executionPlanRunName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-08-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  resource: ExecutionPlanRun,
  options: ExecutionPlanRunsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PlatformValidation/cloudValidations/{cloudValidationName}/validationExecutionPlans/{validationExecutionPlanName}/executionPlanRuns/{executionPlanRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudValidationName: cloudValidationName,
      validationExecutionPlanName: validationExecutionPlanName,
      executionPlanRunName: executionPlanRunName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: executionPlanRunSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ExecutionPlanRun> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return executionPlanRunDeserializer(result.body);
}

/** Create or update a validation test execution plan */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  resource: ExecutionPlanRun,
  options: ExecutionPlanRunsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ExecutionPlanRun>, ExecutionPlanRun> {
  return getLongRunningPoller(context, _createOrUpdateDeserialize, ["200", "201", "202"], {
    updateIntervalInMs: options?.updateIntervalInMs,
    abortSignal: options?.abortSignal,
    getInitialResponse: () =>
      _createOrUpdateSend(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        executionPlanRunName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-08-01-preview",
  }) as PollerLike<OperationState<ExecutionPlanRun>, ExecutionPlanRun>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  options: ExecutionPlanRunsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PlatformValidation/cloudValidations/{cloudValidationName}/validationExecutionPlans/{validationExecutionPlanName}/executionPlanRuns/{executionPlanRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudValidationName: cloudValidationName,
      validationExecutionPlanName: validationExecutionPlanName,
      executionPlanRunName: executionPlanRunName,
      "api%2Dversion": context.apiVersion ?? "2026-08-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ExecutionPlanRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return executionPlanRunDeserializer(result.body);
}

/** Get a Validation test execution plan run details */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  options: ExecutionPlanRunsGetOptionalParams = { requestOptions: {} },
): Promise<ExecutionPlanRun> {
  const result = await _getSend(
    context,
    resourceGroupName,
    cloudValidationName,
    validationExecutionPlanName,
    executionPlanRunName,
    options,
  );
  return _getDeserialize(result);
}
