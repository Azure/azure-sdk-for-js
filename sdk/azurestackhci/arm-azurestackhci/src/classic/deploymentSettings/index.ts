// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import {
  listByClusters,
  $delete,
  createOrUpdate,
  get,
} from "../../api/deploymentSettings/operations.js";
import type {
  DeploymentSettingsListByClustersOptionalParams,
  DeploymentSettingsDeleteOptionalParams,
  DeploymentSettingsCreateOrUpdateOptionalParams,
  DeploymentSettingsGetOptionalParams,
} from "../../api/deploymentSettings/options.js";
import type { DeploymentSetting } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeploymentSettings operations. */
export interface DeploymentSettingsOperations {
  /** List DeploymentSetting resources by Clusters */
  listByClusters: (
    resourceGroupName: string,
    clusterName: string,
    options?: DeploymentSettingsListByClustersOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentSetting>;
  /** Delete a DeploymentSetting */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    deploymentSettingsName: string,
    options?: DeploymentSettingsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    deploymentSettingsName: string,
    options?: DeploymentSettingsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    deploymentSettingsName: string,
    options?: DeploymentSettingsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a DeploymentSetting */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    deploymentSettingsName: string,
    resource: DeploymentSetting,
    options?: DeploymentSettingsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DeploymentSetting>, DeploymentSetting>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    deploymentSettingsName: string,
    resource: DeploymentSetting,
    options?: DeploymentSettingsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DeploymentSetting>, DeploymentSetting>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    deploymentSettingsName: string,
    resource: DeploymentSetting,
    options?: DeploymentSettingsCreateOrUpdateOptionalParams,
  ) => Promise<DeploymentSetting>;
  /** Get a DeploymentSetting */
  get: (
    resourceGroupName: string,
    clusterName: string,
    deploymentSettingsName: string,
    options?: DeploymentSettingsGetOptionalParams,
  ) => Promise<DeploymentSetting>;
}

function _getDeploymentSettings(context: AzureStackHCIContext) {
  return {
    listByClusters: (
      resourceGroupName: string,
      clusterName: string,
      options?: DeploymentSettingsListByClustersOptionalParams,
    ) => listByClusters(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      deploymentSettingsName: string,
      options?: DeploymentSettingsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, deploymentSettingsName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      deploymentSettingsName: string,
      options?: DeploymentSettingsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        deploymentSettingsName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      deploymentSettingsName: string,
      options?: DeploymentSettingsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        deploymentSettingsName,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      deploymentSettingsName: string,
      resource: DeploymentSetting,
      options?: DeploymentSettingsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        deploymentSettingsName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      deploymentSettingsName: string,
      resource: DeploymentSetting,
      options?: DeploymentSettingsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        deploymentSettingsName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      deploymentSettingsName: string,
      resource: DeploymentSetting,
      options?: DeploymentSettingsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        deploymentSettingsName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      deploymentSettingsName: string,
      options?: DeploymentSettingsGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, deploymentSettingsName, options),
  };
}

export function _getDeploymentSettingsOperations(
  context: AzureStackHCIContext,
): DeploymentSettingsOperations {
  return {
    ..._getDeploymentSettings(context),
  };
}
