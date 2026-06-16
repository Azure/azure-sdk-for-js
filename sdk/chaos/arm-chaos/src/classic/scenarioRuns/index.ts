// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { cancel, listAll, get } from "../../api/scenarioRuns/operations.js";
import type {
  ScenarioRunsCancelOptionalParams,
  ScenarioRunsListAllOptionalParams,
  ScenarioRunsGetOptionalParams,
} from "../../api/scenarioRuns/options.js";
import type { ScenarioRun } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ScenarioRuns operations. */
export interface ScenarioRunsOperations {
  /** Cancel the currently running scenario execution. */
  cancel: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    runId: string,
    options?: ScenarioRunsCancelOptionalParams,
  ) => Promise<void>;
  /** Get a list of scenario runs. */
  listAll: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    options?: ScenarioRunsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<ScenarioRun>;
  /** Get a scenario run. */
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
