// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformValidationContext } from "../../api/platformValidationContext.js";
import {
  listByExecutionPlanRun,
  $delete,
  createOrUpdate,
  get,
} from "../../api/validationTestRuns/operations.js";
import type {
  ValidationTestRunsListByExecutionPlanRunOptionalParams,
  ValidationTestRunsDeleteOptionalParams,
  ValidationTestRunsCreateOrUpdateOptionalParams,
  ValidationTestRunsGetOptionalParams,
} from "../../api/validationTestRuns/options.js";
import type { ValidationTestRun } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

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
  /** Delete a validation test run */
  delete: (
    resourceGroupName: string,
    cloudValidationName: string,
    validationExecutionPlanName: string,
    executionPlanRunName: string,
    validationTestRunName: string,
    options?: ValidationTestRunsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a validation test run */
  createOrUpdate: (
    resourceGroupName: string,
    cloudValidationName: string,
    validationExecutionPlanName: string,
    executionPlanRunName: string,
    validationTestRunName: string,
    resource: ValidationTestRun,
    options?: ValidationTestRunsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ValidationTestRun>, ValidationTestRun>;
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
    delete: (
      resourceGroupName: string,
      cloudValidationName: string,
      validationExecutionPlanName: string,
      executionPlanRunName: string,
      validationTestRunName: string,
      options?: ValidationTestRunsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        executionPlanRunName,
        validationTestRunName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      cloudValidationName: string,
      validationExecutionPlanName: string,
      executionPlanRunName: string,
      validationTestRunName: string,
      resource: ValidationTestRun,
      options?: ValidationTestRunsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        executionPlanRunName,
        validationTestRunName,
        resource,
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
