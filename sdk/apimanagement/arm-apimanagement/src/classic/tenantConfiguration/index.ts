// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import { getSyncState, validate, save, deploy } from "../../api/tenantConfiguration/operations.js";
import {
  TenantConfigurationGetSyncStateOptionalParams,
  TenantConfigurationValidateOptionalParams,
  TenantConfigurationSaveOptionalParams,
  TenantConfigurationDeployOptionalParams,
} from "../../api/tenantConfiguration/options.js";
import {
  OperationResultContract,
  DeployConfigurationParameters,
  SaveConfigurationParameter,
  TenantConfigurationSyncStateContract,
  ConfigurationIdName,
} from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

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
  /** @deprecated use validate instead */
  beginValidate: (
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: DeployConfigurationParameters,
    options?: TenantConfigurationValidateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationResultContract>, OperationResultContract>>;
  /** @deprecated use validate instead */
  beginValidateAndWait: (
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: DeployConfigurationParameters,
    options?: TenantConfigurationValidateOptionalParams,
  ) => Promise<OperationResultContract>;
  /** This operation creates a commit with the current configuration snapshot to the specified branch in the repository. This is a long running operation and could take several minutes to complete. */
  save: (
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: SaveConfigurationParameter,
    options?: TenantConfigurationSaveOptionalParams,
  ) => PollerLike<OperationState<OperationResultContract>, OperationResultContract>;
  /** @deprecated use save instead */
  beginSave: (
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: SaveConfigurationParameter,
    options?: TenantConfigurationSaveOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationResultContract>, OperationResultContract>>;
  /** @deprecated use save instead */
  beginSaveAndWait: (
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: SaveConfigurationParameter,
    options?: TenantConfigurationSaveOptionalParams,
  ) => Promise<OperationResultContract>;
  /** This operation applies changes from the specified Git branch to the configuration database. This is a long running operation and could take several minutes to complete. */
  deploy: (
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: DeployConfigurationParameters,
    options?: TenantConfigurationDeployOptionalParams,
  ) => PollerLike<OperationState<OperationResultContract>, OperationResultContract>;
  /** @deprecated use deploy instead */
  beginDeploy: (
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: DeployConfigurationParameters,
    options?: TenantConfigurationDeployOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationResultContract>, OperationResultContract>>;
  /** @deprecated use deploy instead */
  beginDeployAndWait: (
    resourceGroupName: string,
    serviceName: string,
    configurationName: ConfigurationIdName,
    parameters: DeployConfigurationParameters,
    options?: TenantConfigurationDeployOptionalParams,
  ) => Promise<OperationResultContract>;
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
    beginValidate: async (
      resourceGroupName: string,
      serviceName: string,
      configurationName: ConfigurationIdName,
      parameters: DeployConfigurationParameters,
      options?: TenantConfigurationValidateOptionalParams,
    ) => {
      const poller = validate(
        context,
        resourceGroupName,
        serviceName,
        configurationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginValidateAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      configurationName: ConfigurationIdName,
      parameters: DeployConfigurationParameters,
      options?: TenantConfigurationValidateOptionalParams,
    ) => {
      return await validate(
        context,
        resourceGroupName,
        serviceName,
        configurationName,
        parameters,
        options,
      );
    },
    save: (
      resourceGroupName: string,
      serviceName: string,
      configurationName: ConfigurationIdName,
      parameters: SaveConfigurationParameter,
      options?: TenantConfigurationSaveOptionalParams,
    ) => save(context, resourceGroupName, serviceName, configurationName, parameters, options),
    beginSave: async (
      resourceGroupName: string,
      serviceName: string,
      configurationName: ConfigurationIdName,
      parameters: SaveConfigurationParameter,
      options?: TenantConfigurationSaveOptionalParams,
    ) => {
      const poller = save(
        context,
        resourceGroupName,
        serviceName,
        configurationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginSaveAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      configurationName: ConfigurationIdName,
      parameters: SaveConfigurationParameter,
      options?: TenantConfigurationSaveOptionalParams,
    ) => {
      return await save(
        context,
        resourceGroupName,
        serviceName,
        configurationName,
        parameters,
        options,
      );
    },
    deploy: (
      resourceGroupName: string,
      serviceName: string,
      configurationName: ConfigurationIdName,
      parameters: DeployConfigurationParameters,
      options?: TenantConfigurationDeployOptionalParams,
    ) => deploy(context, resourceGroupName, serviceName, configurationName, parameters, options),
    beginDeploy: async (
      resourceGroupName: string,
      serviceName: string,
      configurationName: ConfigurationIdName,
      parameters: DeployConfigurationParameters,
      options?: TenantConfigurationDeployOptionalParams,
    ) => {
      const poller = deploy(
        context,
        resourceGroupName,
        serviceName,
        configurationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeployAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      configurationName: ConfigurationIdName,
      parameters: DeployConfigurationParameters,
      options?: TenantConfigurationDeployOptionalParams,
    ) => {
      return await deploy(
        context,
        resourceGroupName,
        serviceName,
        configurationName,
        parameters,
        options,
      );
    },
  };
}

export function _getTenantConfigurationOperations(
  context: ApiManagementContext,
): TenantConfigurationOperations {
  return {
    ..._getTenantConfiguration(context),
  };
}
