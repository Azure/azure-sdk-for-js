// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationContext as Client } from "../index.js";
import {
  errorResponseDeserializer,
  ValidationTestRun,
  validationTestRunDeserializer,
  _ValidationTestRunListResult,
  _validationTestRunListResultDeserializer,
} from "../../models/models.js";
import {
  PagedAsyncIterableIterator,
  buildPagedAsyncIterator,
} from "../../static-helpers/pagingHelpers.js";
import { expandUrlTemplate } from "../../static-helpers/urlTemplate.js";
import {
  ValidationTestRunsListByExecutionPlanRunOptionalParams,
  ValidationTestRunsGetOptionalParams,
} from "./options.js";
import {
  StreamableMethod,
  PathUncheckedResponse,
  createRestError,
  operationOptionsToRequestParameters,
} from "@azure-rest/core-client";

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
      apiVersion: context.apiVersion ?? "2026-08-01-preview",
    },
  );
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
