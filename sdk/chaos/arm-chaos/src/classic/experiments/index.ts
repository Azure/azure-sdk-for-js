// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import {
  Experiment,
  ExperimentUpdate,
  ExperimentExecution,
  ExperimentExecutionDetails,
} from "../../models/models.js";
import {
  ExperimentsExecutionDetailsOptionalParams,
  ExperimentsListAllExecutionsOptionalParams,
  ExperimentsGetExecutionOptionalParams,
  ExperimentsStartOptionalParams,
  ExperimentsCancelOptionalParams,
  ExperimentsListAllOptionalParams,
  ExperimentsListOptionalParams,
  ExperimentsDeleteOptionalParams,
  ExperimentsUpdateOptionalParams,
  ExperimentsCreateOrUpdateOptionalParams,
  ExperimentsGetOptionalParams,
} from "../../api/experiments/options.js";
import {
  executionDetails,
  listAllExecutions,
  getExecution,
  start,
  cancel,
  listAll,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/experiments/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Experiments operations. */
export interface ExperimentsOperations {
  /** Execution details of an experiment resource. */
  executionDetails: (
    resourceGroupName: string,
    experimentName: string,
    executionId: string,
    options?: ExperimentsExecutionDetailsOptionalParams,
  ) => Promise<ExperimentExecutionDetails>;
  /** Get a list of executions of an Experiment resource. */
  listAllExecutions: (
    resourceGroupName: string,
    experimentName: string,
    options?: ExperimentsListAllExecutionsOptionalParams,
  ) => PagedAsyncIterableIterator<ExperimentExecution>;
  /** Get an execution of an Experiment resource. */
  getExecution: (
    resourceGroupName: string,
    experimentName: string,
    executionId: string,
    options?: ExperimentsGetExecutionOptionalParams,
  ) => Promise<ExperimentExecution>;
  /** Start a Experiment resource. */
  start: (
    resourceGroupName: string,
    experimentName: string,
    options?: ExperimentsStartOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Cancel a running Experiment resource. */
  cancel: (
    resourceGroupName: string,
    experimentName: string,
    options?: ExperimentsCancelOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Get a list of Experiment resources in a subscription. */
  listAll: (
    options?: ExperimentsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<Experiment>;
  /** Get a list of Experiment resources in a resource group. */
  list: (
    resourceGroupName: string,
    options?: ExperimentsListOptionalParams,
  ) => PagedAsyncIterableIterator<Experiment>;
  /** Delete a Experiment resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    experimentName: string,
    options?: ExperimentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** The operation to update an experiment. */
  update: (
    resourceGroupName: string,
    experimentName: string,
    properties: ExperimentUpdate,
    options?: ExperimentsUpdateOptionalParams,
  ) => PollerLike<OperationState<Experiment>, Experiment>;
  /** Create or update a Experiment resource. */
  createOrUpdate: (
    resourceGroupName: string,
    experimentName: string,
    resource: Experiment,
    options?: ExperimentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Experiment>, Experiment>;
  /** Get a Experiment resource. */
  get: (
    resourceGroupName: string,
    experimentName: string,
    options?: ExperimentsGetOptionalParams,
  ) => Promise<Experiment>;
}

function _getExperiments(context: ChaosManagementContext) {
  return {
    executionDetails: (
      resourceGroupName: string,
      experimentName: string,
      executionId: string,
      options?: ExperimentsExecutionDetailsOptionalParams,
    ) =>
      executionDetails(
        context,
        resourceGroupName,
        experimentName,
        executionId,
        options,
      ),
    listAllExecutions: (
      resourceGroupName: string,
      experimentName: string,
      options?: ExperimentsListAllExecutionsOptionalParams,
    ) => listAllExecutions(context, resourceGroupName, experimentName, options),
    getExecution: (
      resourceGroupName: string,
      experimentName: string,
      executionId: string,
      options?: ExperimentsGetExecutionOptionalParams,
    ) =>
      getExecution(
        context,
        resourceGroupName,
        experimentName,
        executionId,
        options,
      ),
    start: (
      resourceGroupName: string,
      experimentName: string,
      options?: ExperimentsStartOptionalParams,
    ) => start(context, resourceGroupName, experimentName, options),
    cancel: (
      resourceGroupName: string,
      experimentName: string,
      options?: ExperimentsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, experimentName, options),
    listAll: (options?: ExperimentsListAllOptionalParams) =>
      listAll(context, options),
    list: (
      resourceGroupName: string,
      options?: ExperimentsListOptionalParams,
    ) => list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      experimentName: string,
      options?: ExperimentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, experimentName, options),
    update: (
      resourceGroupName: string,
      experimentName: string,
      properties: ExperimentUpdate,
      options?: ExperimentsUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, experimentName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      experimentName: string,
      resource: Experiment,
      options?: ExperimentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        experimentName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      experimentName: string,
      options?: ExperimentsGetOptionalParams,
    ) => get(context, resourceGroupName, experimentName, options),
  };
}

export function _getExperimentsOperations(
  context: ChaosManagementContext,
): ExperimentsOperations {
  return {
    ..._getExperiments(context),
  };
}
