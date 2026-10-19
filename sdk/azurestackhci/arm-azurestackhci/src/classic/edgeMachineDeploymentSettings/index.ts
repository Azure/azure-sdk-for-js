// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  listByEdgeMachine,
  $delete,
  createOrUpdate,
  get,
} from "../../api/edgeMachineDeploymentSettings/operations.js";
import type {
  EdgeMachineDeploymentSettingsListByEdgeMachineOptionalParams,
  EdgeMachineDeploymentSettingsDeleteOptionalParams,
  EdgeMachineDeploymentSettingsCreateOrUpdateOptionalParams,
  EdgeMachineDeploymentSettingsGetOptionalParams,
} from "../../api/edgeMachineDeploymentSettings/options.js";
import type { EdgeMachineDeploymentSetting } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EdgeMachineDeploymentSettings operations. */
export interface EdgeMachineDeploymentSettingsOperations {
  /** List Edge Machine Deployment Setting resources by Edge Machine. */
  listByEdgeMachine: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachineDeploymentSettingsListByEdgeMachineOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachineDeploymentSetting>;
  /** Delete an Edge Machine Deployment Setting. */
  delete: (
    resourceGroupName: string,
    edgeMachineName: string,
    deploymentSettingName: string,
    options?: EdgeMachineDeploymentSettingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    edgeMachineName: string,
    deploymentSettingName: string,
    options?: EdgeMachineDeploymentSettingsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    deploymentSettingName: string,
    options?: EdgeMachineDeploymentSettingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update an Edge Machine Deployment Setting. */
  createOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    deploymentSettingName: string,
    resource: EdgeMachineDeploymentSetting,
    options?: EdgeMachineDeploymentSettingsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<EdgeMachineDeploymentSetting>, EdgeMachineDeploymentSetting>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    edgeMachineName: string,
    deploymentSettingName: string,
    resource: EdgeMachineDeploymentSetting,
    options?: EdgeMachineDeploymentSettingsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<EdgeMachineDeploymentSetting>, EdgeMachineDeploymentSetting>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    edgeMachineName: string,
    deploymentSettingName: string,
    resource: EdgeMachineDeploymentSetting,
    options?: EdgeMachineDeploymentSettingsCreateOrUpdateOptionalParams,
  ) => Promise<EdgeMachineDeploymentSetting>;
  /** Get an Edge Machine Deployment Setting. */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    deploymentSettingName: string,
    options?: EdgeMachineDeploymentSettingsGetOptionalParams,
  ) => Promise<EdgeMachineDeploymentSetting>;
}

function _getEdgeMachineDeploymentSettings(context: AzureStackHCIContext) {
  return {
    listByEdgeMachine: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachineDeploymentSettingsListByEdgeMachineOptionalParams,
    ) => listByEdgeMachine(context, resourceGroupName, edgeMachineName, options),
    delete: (
      resourceGroupName: string,
      edgeMachineName: string,
      deploymentSettingName: string,
      options?: EdgeMachineDeploymentSettingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, edgeMachineName, deploymentSettingName, options),
    beginDelete: async (
      resourceGroupName: string,
      edgeMachineName: string,
      deploymentSettingName: string,
      options?: EdgeMachineDeploymentSettingsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        edgeMachineName,
        deploymentSettingName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      deploymentSettingName: string,
      options?: EdgeMachineDeploymentSettingsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        edgeMachineName,
        deploymentSettingName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      edgeMachineName: string,
      deploymentSettingName: string,
      resource: EdgeMachineDeploymentSetting,
      options?: EdgeMachineDeploymentSettingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        deploymentSettingName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      edgeMachineName: string,
      deploymentSettingName: string,
      resource: EdgeMachineDeploymentSetting,
      options?: EdgeMachineDeploymentSettingsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        deploymentSettingName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      edgeMachineName: string,
      deploymentSettingName: string,
      resource: EdgeMachineDeploymentSetting,
      options?: EdgeMachineDeploymentSettingsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        edgeMachineName,
        deploymentSettingName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      deploymentSettingName: string,
      options?: EdgeMachineDeploymentSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, deploymentSettingName, options),
  };
}

export function _getEdgeMachineDeploymentSettingsOperations(
  context: AzureStackHCIContext,
): EdgeMachineDeploymentSettingsOperations {
  return {
    ..._getEdgeMachineDeploymentSettings(context),
  };
}
