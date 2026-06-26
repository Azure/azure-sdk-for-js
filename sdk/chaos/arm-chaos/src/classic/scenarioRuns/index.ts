// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { cancel, listAll, get } from "../../api/scenarioRuns/operations.js";
import {
  ScenarioRunsCancelOptionalParams,
  ScenarioRunsListAllOptionalParams,
  ScenarioRunsGetOptionalParams,
} from "../../api/scenarioRuns/options.js";
import { ScenarioRun } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ScenarioRuns operations. */
export interface ScenarioRunsOperations {
  /** Cancel the currently running scenario execution. */
  cancel: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    runId: string,
    options?: ScenarioRunsCancelOptionalParams,
  ) => PollerLike<OperationState<ScenarioRun>, ScenarioRun>;
  /** Get a list of scenario runs. */
  listAll: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    options?: ScenarioRunsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<ScenarioRun>;
  /**
   * Get a scenario run.
   *
   * This endpoint is also the polling target for ScenarioConfigurations.execute
   * and ScenarioRuns.cancel (final-state-via: location). While the run is in
   * progress the service returns 202 with a Location header pointing back to
   * this URL; clients must keep polling until they receive 200, which carries
   * the final ScenarioRun body.
   */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    runId: string,
    options?: ScenarioRunsGetOptionalParams,
  ) => Promise<ScenarioRun>;
}

function _getScenarioRuns(context: ChaosManagementContext) {
  return {
    cancel: (
      resourceGroupName: string,
      workspaceName: string,
      scenarioName: string,
      runId: string,
      options?: ScenarioRunsCancelOptionalParams,
    ) => cancel(context, resourceGroupName, workspaceName, scenarioName, runId, options),
    listAll: (
      resourceGroupName: string,
      workspaceName: string,
      scenarioName: string,
      options?: ScenarioRunsListAllOptionalParams,
    ) => listAll(context, resourceGroupName, workspaceName, scenarioName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      scenarioName: string,
      runId: string,
      options?: ScenarioRunsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, scenarioName, runId, options),
  };
}

export function _getScenarioRunsOperations(
  context: ChaosManagementContext,
): ScenarioRunsOperations {
  return {
    ..._getScenarioRuns(context),
  };
}
