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
  /** Create a DeploymentSetting */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    deploymentSettingsName: string,
    resource: DeploymentSetting,
    options?: DeploymentSettingsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DeploymentSetting>, DeploymentSetting>;
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
