// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationContext } from "../../api/platformValidationContext.js";
import { listByExecutionPlanRun, get } from "../../api/validationTestRuns/operations.js";
import {
  ValidationTestRunsListByExecutionPlanRunOptionalParams,
  ValidationTestRunsGetOptionalParams,
} from "../../api/validationTestRuns/options.js";
import { ValidationTestRun } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ValidationTestRuns operations. */
export interface ValidationTestRunsOperations {
  /** List validation test runs for an execution plan run */
  listByExecutionPlanRun: (
    resourceGroupName: string,
    cloudValidationName: string,
    validationExecutionPlanName: string,
    executionPlanRunName: string,
    options?: ValidationTestRunsListByExecutionPlanRunOptionalParams,
  ) => PagedAsyncIterableIterator<ValidationTestRun>;
  /** Get a validation test run details */
  get: (
    resourceGroupName: string,
    cloudValidationName: string,
    validationExecutionPlanName: string,
    executionPlanRunName: string,
    validationTestRunName: string,
    options?: ValidationTestRunsGetOptionalParams,
  ) => Promise<ValidationTestRun>;
}

function _getValidationTestRuns(context: PlatformValidationContext) {
  return {
    listByExecutionPlanRun: (
      resourceGroupName: string,
      cloudValidationName: string,
      validationExecutionPlanName: string,
      executionPlanRunName: string,
      options?: ValidationTestRunsListByExecutionPlanRunOptionalParams,
    ) =>
      listByExecutionPlanRun(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        executionPlanRunName,
        options,
      ),
    get: (
      resourceGroupName: string,
      cloudValidationName: string,
      validationExecutionPlanName: string,
      executionPlanRunName: string,
      validationTestRunName: string,
      options?: ValidationTestRunsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        executionPlanRunName,
        validationTestRunName,
        options,
      ),
  };
}

export function _getValidationTestRunsOperations(
  context: PlatformValidationContext,
): ValidationTestRunsOperations {
  return {
    ..._getValidationTestRuns(context),
  };
}
