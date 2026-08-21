// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformValidationContext as Client } from "../index.js";
import type { ValidationTestRun, _ValidationTestRunListResult } from "../../models/models.js";
import {
  errorResponseDeserializer,
  validationTestRunSerializer,
  validationTestRunDeserializer,
  _validationTestRunListResultDeserializer,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { buildPagedAsyncIterator } from "../../static-helpers/pagingHelpers.js";
import { getLongRunningPoller } from "../../static-helpers/pollingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import type {
  ValidationTestRunsListByExecutionPlanRunOptionalParams,
  ValidationTestRunsDeleteOptionalParams,
  ValidationTestRunsCreateOrUpdateOptionalParams,
  ValidationTestRunsGetOptionalParams,
} from "./options.js";
import type { StreamableMethod, PathUncheckedResponse } from "@azure-rest/core-client";
import { createRestError, operationOptionsToRequestParameters } from "@azure-rest/core-client";
import type { PollerLike, OperationState } from "@azure/core-lro";

export function _listByExecutionPlanRunSend(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  options: ValidationTestRunsListByExecutionPlanRunOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PlatformValidation/cloudValidations/{cloudValidationName}/validationExecutionPlans/{validationExecutionPlanName}/executionPlanRuns/{executionPlanRunName}/validationTestRuns{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudValidationName: cloudValidationName,
      validationExecutionPlanName: validationExecutionPlanName,
      executionPlanRunName: executionPlanRunName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _listByExecutionPlanRunDeserialize(
  result: PathUncheckedResponse,
): Promise<_ValidationTestRunListResult> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return _validationTestRunListResultDeserializer(result.body);
}

/** List validation test runs for an execution plan run */
export function listByExecutionPlanRun(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  options: ValidationTestRunsListByExecutionPlanRunOptionalParams = { requestOptions: {} },
): PagedAsyncIterableIterator<ValidationTestRun> {
  return buildPagedAsyncIterator(
    context,
    () =>
      _listByExecutionPlanRunSend(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        executionPlanRunName,
        options,
      ),
    _listByExecutionPlanRunDeserialize,
    ["200"],
    {
      itemName: "value",
      nextLinkName: "nextLink",
      apiVersion: context.apiVersion ?? "2026-07-01-preview",
    },
  );
}

export function _$deleteSend(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  validationTestRunName: string,
  options: ValidationTestRunsDeleteOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PlatformValidation/cloudValidations/{cloudValidationName}/validationExecutionPlans/{validationExecutionPlanName}/executionPlanRuns/{executionPlanRunName}/validationTestRuns/{validationTestRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudValidationName: cloudValidationName,
      validationExecutionPlanName: validationExecutionPlanName,
      executionPlanRunName: executionPlanRunName,
      validationTestRunName: validationTestRunName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

/** Delete a validation test run */
export function $delete(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  validationTestRunName: string,
  options: ValidationTestRunsDeleteOptionalParams = { requestOptions: {} },
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
        validationTestRunName,
        options,
      ),
    resourceLocationConfig: "location",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<void>, void>;
}

export function _createOrUpdateSend(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  validationTestRunName: string,
  resource: ValidationTestRun,
  options: ValidationTestRunsCreateOrUpdateOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PlatformValidation/cloudValidations/{cloudValidationName}/validationExecutionPlans/{validationExecutionPlanName}/executionPlanRuns/{executionPlanRunName}/validationTestRuns/{validationTestRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudValidationName: cloudValidationName,
      validationExecutionPlanName: validationExecutionPlanName,
      executionPlanRunName: executionPlanRunName,
      validationTestRunName: validationTestRunName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
    },
    {
      allowReserved: options?.requestOptions?.skipUrlEncoding,
    },
  );
  return context.path(path).put({
    ...operationOptionsToRequestParameters(options),
    contentType: "application/json",
    headers: { accept: "application/json", ...options.requestOptions?.headers },
    body: validationTestRunSerializer(resource),
  });
}

export async function _createOrUpdateDeserialize(
  result: PathUncheckedResponse,
): Promise<ValidationTestRun> {
  const expectedStatuses = ["200", "201", "202"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return validationTestRunDeserializer(result.body);
}

/** Create or update a validation test run */
export function createOrUpdate(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  validationTestRunName: string,
  resource: ValidationTestRun,
  options: ValidationTestRunsCreateOrUpdateOptionalParams = { requestOptions: {} },
): PollerLike<OperationState<ValidationTestRun>, ValidationTestRun> {
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
        validationTestRunName,
        resource,
        options,
      ),
    resourceLocationConfig: "azure-async-operation",
    apiVersion: context.apiVersion ?? "2026-07-01-preview",
  }) as PollerLike<OperationState<ValidationTestRun>, ValidationTestRun>;
}

export function _getSend(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  validationTestRunName: string,
  options: ValidationTestRunsGetOptionalParams = { requestOptions: {} },
): StreamableMethod {
  const path = expandUrlTemplate(
    "/subscriptions/{subscriptionId}/resourceGroups/{resourceGroupName}/providers/Microsoft.PlatformValidation/cloudValidations/{cloudValidationName}/validationExecutionPlans/{validationExecutionPlanName}/executionPlanRuns/{executionPlanRunName}/validationTestRuns/{validationTestRunName}{?api%2Dversion}",
    {
      subscriptionId: context.subscriptionId,
      resourceGroupName: resourceGroupName,
      cloudValidationName: cloudValidationName,
      validationExecutionPlanName: validationExecutionPlanName,
      executionPlanRunName: executionPlanRunName,
      validationTestRunName: validationTestRunName,
      "api%2Dversion": context.apiVersion ?? "2026-07-01-preview",
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

export async function _getDeserialize(result: PathUncheckedResponse): Promise<ValidationTestRun> {
  const expectedStatuses = ["200"];
  if (!expectedStatuses.includes(result.status)) {
    const error = createRestError(result);
    if (result.body) {
      error.details = errorResponseDeserializer(result.body);
    }

    throw error;
  }

  return validationTestRunDeserializer(result.body);
}

/** Get a validation test run details */
export async function get(
  context: Client,
  resourceGroupName: string,
  cloudValidationName: string,
  validationExecutionPlanName: string,
  executionPlanRunName: string,
  validationTestRunName: string,
  options: ValidationTestRunsGetOptionalParams = { requestOptions: {} },
): Promise<ValidationTestRun> {
  const result = await _getSend(
    context,
    resourceGroupName,
    cloudValidationName,
    validationExecutionPlanName,
    executionPlanRunName,
    validationTestRunName,
    options,
  );
  return _getDeserialize(result);
}
