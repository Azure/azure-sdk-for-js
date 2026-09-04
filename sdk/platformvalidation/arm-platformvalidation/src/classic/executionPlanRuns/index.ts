// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationContext } from "../../api/platformValidationContext.js";
import {
  listByExecutionPlan,
  $delete,
  createOrUpdate,
  get,
} from "../../api/executionPlanRuns/operations.js";
import {
  ExecutionPlanRunsListByExecutionPlanOptionalParams,
  ExecutionPlanRunsDeleteOptionalParams,
  ExecutionPlanRunsCreateOrUpdateOptionalParams,
  ExecutionPlanRunsGetOptionalParams,
} from "../../api/executionPlanRuns/options.js";
import { ExecutionPlanRun } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ExecutionPlanRuns operations. */
export interface ExecutionPlanRunsOperations {
  /** List Validation test execution plan runs for an execution plan */
  listByExecutionPlan: (
    resourceGroupName: string,
    cloudValidationName: string,
    validationExecutionPlanName: string,
    options?: ExecutionPlanRunsListByExecutionPlanOptionalParams,
  ) => PagedAsyncIterableIterator<ExecutionPlanRun>;
  /** Delete a validation test execution plan run resource */
  delete: (
    resourceGroupName: string,
    cloudValidationName: string,
    validationExecutionPlanName: string,
    executionPlanRunName: string,
    options?: ExecutionPlanRunsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a validation test execution plan */
  createOrUpdate: (
    resourceGroupName: string,
    cloudValidationName: string,
    validationExecutionPlanName: string,
    executionPlanRunName: string,
    resource: ExecutionPlanRun,
    options?: ExecutionPlanRunsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExecutionPlanRun>, ExecutionPlanRun>;
  /** Get a Validation test execution plan run details */
  get: (
    resourceGroupName: string,
    cloudValidationName: string,
    validationExecutionPlanName: string,
    executionPlanRunName: string,
    options?: ExecutionPlanRunsGetOptionalParams,
  ) => Promise<ExecutionPlanRun>;
}

function _getExecutionPlanRuns(context: PlatformValidationContext) {
  return {
    listByExecutionPlan: (
      resourceGroupName: string,
      cloudValidationName: string,
      validationExecutionPlanName: string,
      options?: ExecutionPlanRunsListByExecutionPlanOptionalParams,
    ) =>
      listByExecutionPlan(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        options,
      ),
    delete: (
      resourceGroupName: string,
      cloudValidationName: string,
      validationExecutionPlanName: string,
      executionPlanRunName: string,
      options?: ExecutionPlanRunsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        executionPlanRunName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      cloudValidationName: string,
      validationExecutionPlanName: string,
      executionPlanRunName: string,
      resource: ExecutionPlanRun,
      options?: ExecutionPlanRunsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        executionPlanRunName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      cloudValidationName: string,
      validationExecutionPlanName: string,
      executionPlanRunName: string,
      options?: ExecutionPlanRunsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        executionPlanRunName,
        options,
      ),
  };
}

export function _getExecutionPlanRunsOperations(
  context: PlatformValidationContext,
): ExecutionPlanRunsOperations {
  return {
    ..._getExecutionPlanRuns(context),
  };
}
