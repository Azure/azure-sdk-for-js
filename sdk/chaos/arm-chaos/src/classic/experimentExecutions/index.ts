// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { ExperimentExecution, ExperimentExecutionDetails } from "../../models/models.js";
import {
  ExperimentExecutionsGetExecutionDetailsOptionalParams,
  ExperimentExecutionsListAllExecutionsOptionalParams,
  ExperimentExecutionsGetExecutionOptionalParams,
} from "../../api/experimentExecutions/options.js";
import {
  getExecutionDetails,
  listAllExecutions,
  getExecution,
} from "../../api/experimentExecutions/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ExperimentExecutions operations. */
export interface ExperimentExecutionsOperations {
  /** Execution details of an experiment resource. */
  getExecutionDetails: (
    resourceGroupName: string,
    experimentName: string,
    executionId: string,
    options?: ExperimentExecutionsGetExecutionDetailsOptionalParams,
  ) => Promise<ExperimentExecutionDetails>;
  /** Get a list of executions of an Experiment resource. */
  listAllExecutions: (
    resourceGroupName: string,
    experimentName: string,
    options?: ExperimentExecutionsListAllExecutionsOptionalParams,
  ) => PagedAsyncIterableIterator<ExperimentExecution>;
  /** Get an execution of an Experiment resource. */
  getExecution: (
    resourceGroupName: string,
    experimentName: string,
    executionId: string,
    options?: ExperimentExecutionsGetExecutionOptionalParams,
  ) => Promise<ExperimentExecution>;
}

function _getExperimentExecutions(context: ChaosManagementContext) {
  return {
    getExecutionDetails: (
      resourceGroupName: string,
      experimentName: string,
      executionId: string,
      options?: ExperimentExecutionsGetExecutionDetailsOptionalParams,
    ) => getExecutionDetails(context, resourceGroupName, experimentName, executionId, options),
    listAllExecutions: (
      resourceGroupName: string,
      experimentName: string,
      options?: ExperimentExecutionsListAllExecutionsOptionalParams,
    ) => listAllExecutions(context, resourceGroupName, experimentName, options),
    getExecution: (
      resourceGroupName: string,
      experimentName: string,
      executionId: string,
      options?: ExperimentExecutionsGetExecutionOptionalParams,
    ) => getExecution(context, resourceGroupName, experimentName, executionId, options),
  };
}

export function _getExperimentExecutionsOperations(
  context: ChaosManagementContext,
): ExperimentExecutionsOperations {
  return {
    ..._getExperimentExecutions(context),
  };
}
