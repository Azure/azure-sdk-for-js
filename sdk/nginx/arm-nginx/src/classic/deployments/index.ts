// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NginxManagementContext } from "../../api/nginxManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/deployments/operations.js";
import type {
  DeploymentsListOptionalParams,
  DeploymentsListByResourceGroupOptionalParams,
  DeploymentsDeleteOptionalParams,
  DeploymentsUpdateOptionalParams,
  DeploymentsCreateOrUpdateOptionalParams,
  DeploymentsGetOptionalParams,
} from "../../api/deployments/options.js";
import type { NginxDeployment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Deployments operations. */
export interface DeploymentsOperations {
  /** List the NGINX deployments resources */
  list: (options?: DeploymentsListOptionalParams) => PagedAsyncIterableIterator<NginxDeployment>;
  /** List all NGINX deployments under the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: DeploymentsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NginxDeployment>;
  /** Delete the NGINX deployment resource */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the NGINX deployment */
  update: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsUpdateOptionalParams,
  ) => PollerLike<OperationState<NginxDeployment>, NginxDeployment>;
  /** Create or update the NGINX deployment */
  createOrUpdate: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NginxDeployment>, NginxDeployment>;
  /** Get the NGINX deployment */
  get: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsGetOptionalParams,
  ) => Promise<NginxDeployment>;
}

function _getDeployments(context: NginxManagementContext) {
  return {
    list: (options?: DeploymentsListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: DeploymentsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, deploymentName, options),
    update: (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, deploymentName, options),
    createOrUpdate: (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, deploymentName, options),
    get: (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsGetOptionalParams,
    ) => get(context, resourceGroupName, deploymentName, options),
  };
}

export function _getDeploymentsOperations(context: NginxManagementContext): DeploymentsOperations {
  return {
    ..._getDeployments(context),
  };
}
