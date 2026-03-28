// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { getSyncState, validate, save, deploy } from "../../api/tenantConfiguration/operations.js";
import type {
  TenantConfigurationGetSyncStateOptionalParams,
  TenantConfigurationValidateOptionalParams,
  TenantConfigurationSaveOptionalParams,
  TenantConfigurationDeployOptionalParams,
} from "../../api/tenantConfiguration/options.js";
import type {
  OperationResultContract,
  DeployConfigurationParameters,
  SaveConfigurationParameter,
  TenantConfigurationSyncStateContract,
  ConfigurationIdName,
} from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a TenantConfiguration operations. */
export interface TenantConfigurationOperations {
  /** Gets the status of the most recent synchronization between the configuration database and the Git repository. */
  getSyncState: (
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    options?: TenantConfigurationGetSyncStateOptionalParams,
  ) => Promise<TenantConfigurationSyncStateContract>;
  /** This operation validates the changes in the specified Git branch. This is a long running operation and could take several minutes to complete. */
  validate: (
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: DeployConfigurationParameters,
    options?: TenantConfigurationValidateOptionalParams,
  ) => PollerLike<OperationState<OperationResultContract>, OperationResultContract>;
  /** This operation creates a commit with the current configuration snapshot to the specified branch in the repository. This is a long running operation and could take several minutes to complete. */
  save: (
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: SaveConfigurationParameter,
    options?: TenantConfigurationSaveOptionalParams,
  ) => PollerLike<OperationState<OperationResultContract>, OperationResultContract>;
  /** This operation applies changes from the specified Git branch to the configuration database. This is a long running operation and could take several minutes to complete. */
  deploy: (
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: DeployConfigurationParameters,
    options?: TenantConfigurationDeployOptionalParams,
  ) => PollerLike<OperationState<OperationResultContract>, OperationResultContract>;
}

function _getTenantConfiguration(context: ApiManagementContext) {
  return {
    getSyncState: (
      resourceGroupName: string,
      serviceName: string,
      configurationName: ConfigurationIdName,
      options?: TenantConfigurationGetSyncStateOptionalParams,
    ) => getSyncState(context, resourceGroupName, serviceName, configurationName, options),
    validate: (
      resourceGroupName: string,
      serviceName: string,
      configurationName: ConfigurationIdName,
      parameters: DeployConfigurationParameters,
      options?: TenantConfigurationValidateOptionalParams,
    ) => validate(context, resourceGroupName, serviceName, configurationName, parameters, options),
    save: (
      resourceGroupName: string,
      serviceName: string,
      configurationName: ConfigurationIdName,
      parameters: SaveConfigurationParameter,
      options?: TenantConfigurationSaveOptionalParams,
    ) => save(context, resourceGroupName, serviceName, configurationName, parameters, options),
    deploy: (
      resourceGroupName: string,
      serviceName: string,
      configurationName: ConfigurationIdName,
      parameters: DeployConfigurationParameters,
      options?: TenantConfigurationDeployOptionalParams,
    ) => deploy(context, resourceGroupName, serviceName, configurationName, parameters, options),
  };
}

export function _getTenantConfigurationOperations(
  context: ApiManagementContext,
): TenantConfigurationOperations {
  return {
    ..._getTenantConfiguration(context),
  };
}
