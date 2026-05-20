// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ChaosManagementContext } from "../../api/chaosManagementContext.js";
import {
  fixResourcePermissions,
  validate,
  execute,
  listAll,
  $delete,
  createOrUpdate,
  get,
} from "../../api/scenarioConfigurations/operations.js";
import type {
  ScenarioConfigurationsFixResourcePermissionsOptionalParams,
  ScenarioConfigurationsValidateOptionalParams,
  ScenarioConfigurationsExecuteOptionalParams,
  ScenarioConfigurationsListAllOptionalParams,
  ScenarioConfigurationsDeleteOptionalParams,
  ScenarioConfigurationsCreateOrUpdateOptionalParams,
  ScenarioConfigurationsGetOptionalParams,
} from "../../api/scenarioConfigurations/options.js";
import type { ScenarioConfiguration, Validation, PermissionsFix } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ScenarioConfigurations operations. */
export interface ScenarioConfigurationsOperations {
  /** Fixes resource permissions for the given scenario configuration. */
  fixResourcePermissions: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    scenarioConfigurationName: string,
    options?: ScenarioConfigurationsFixResourcePermissionsOptionalParams,
  ) => PollerLike<OperationState<PermissionsFix>, PermissionsFix>;
  /** Validate the given scenario configuration. */
  validate: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    scenarioConfigurationName: string,
    options?: ScenarioConfigurationsValidateOptionalParams,
  ) => PollerLike<OperationState<Validation>, Validation>;
  /** Execute the scenario execution with the given scenario configuration. */
  execute: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    scenarioConfigurationName: string,
    options?: ScenarioConfigurationsExecuteOptionalParams,
  ) => Promise<void>;
  /** Get a list of scenario definitions. */
  listAll: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    options?: ScenarioConfigurationsListAllOptionalParams,
  ) => PagedAsyncIterableIterator<ScenarioConfiguration>;
  /** Delete a scenario definition. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    scenarioConfigurationName: string,
    options?: ScenarioConfigurationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update a scenario definition. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    scenarioConfigurationName: string,
    resource: ScenarioConfiguration,
    options?: ScenarioConfigurationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ScenarioConfiguration>, ScenarioConfiguration>;
  /** Get a scenario definition. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    scenarioName: string,
    scenarioConfigurationName: string,
    options?: ScenarioConfigurationsGetOptionalParams,
  ) => Promise<ScenarioConfiguration>;
}

function _getScenarioConfigurations(context: ChaosManagementContext) {
  return {
    fixResourcePermissions: (
      resourceGroupName: string,
      workspaceName: string,
      scenarioName: string,
      scenarioConfigurationName: string,
      options?: ScenarioConfigurationsFixResourcePermissionsOptionalParams,
    ) =>
      fixResourcePermissions(
        context,
        resourceGroupName,
        workspaceName,
        scenarioName,
        scenarioConfigurationName,
        options,
      ),
    validate: (
      resourceGroupName: string,
      workspaceName: string,
      scenarioName: string,
      scenarioConfigurationName: string,
      options?: ScenarioConfigurationsValidateOptionalParams,
    ) =>
      validate(
        context,
        resourceGroupName,
        workspaceName,
        scenarioName,
        scenarioConfigurationName,
        options,
      ),
    execute: (
      resourceGroupName: string,
      workspaceName: string,
      scenarioName: string,
      scenarioConfigurationName: string,
      options?: ScenarioConfigurationsExecuteOptionalParams,
    ) =>
      execute(
        context,
        resourceGroupName,
        workspaceName,
        scenarioName,
        scenarioConfigurationName,
        options,
      ),
    listAll: (
      resourceGroupName: string,
      workspaceName: string,
      scenarioName: string,
      options?: ScenarioConfigurationsListAllOptionalParams,
    ) => listAll(context, resourceGroupName, workspaceName, scenarioName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      scenarioName: string,
      scenarioConfigurationName: string,
      options?: ScenarioConfigurationsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        workspaceName,
        scenarioName,
        scenarioConfigurationName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      scenarioName: string,
      scenarioConfigurationName: string,
      resource: ScenarioConfiguration,
      options?: ScenarioConfigurationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        scenarioName,
        scenarioConfigurationName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      scenarioName: string,
      scenarioConfigurationName: string,
      options?: ScenarioConfigurationsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        workspaceName,
        scenarioName,
        scenarioConfigurationName,
        options,
      ),
  };
}

export function _getScenarioConfigurationsOperations(
  context: ChaosManagementContext,
): ScenarioConfigurationsOperations {
  return {
    ..._getScenarioConfigurations(context),
  };
}
