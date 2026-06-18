// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import { listAll, $delete, createOrUpdate, get } from "../../api/scenarios/operations.js";
import {
  ScenariosListAllOptionalParams,
  ScenariosDeleteOptionalParams,
  ScenariosCreateOrUpdateOptionalParams,
  ScenariosGetOptionalParams,
} from "../../api/scenarios/options.js";
import { Scenario } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Scenarios operations. */
export interface ScenariosOperations {
  /** Get a list of scenarios. */
  listAll: (
    resourceGroupName: string,
    workspaceName: string,
    options?: ScenariosListAllOptionalParams,
  ) => PagedAsyncIterableIterator<Scenario>;
  /** Delete a scenario. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    options?: ScenariosDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a scenario. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    resource: Scenario,
    options?: ScenariosCreateOrUpdateOptionalParams,
  ) => Promise<Scenario>;
  /** Get a scenario. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    options?: ScenariosGetOptionalParams,
  ) => Promise<Scenario>;
}

function _getScenarios(context: ChaosManagementContext) {
  return {
    listAll: (
      resourceGroupName: string,
      workspaceName: string,
      options?: ScenariosListAllOptionalParams,
    ) => listAll(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      scenarioName: string,
      options?: ScenariosDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, scenarioName, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      scenarioName: string,
      resource: Scenario,
      options?: ScenariosCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, scenarioName, resource, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      scenarioName: string,
      options?: ScenariosGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, scenarioName, options),
  };
}

export function _getScenariosOperations(context: ChaosManagementContext): ScenariosOperations {
  return {
    ..._getScenarios(context),
  };
}
