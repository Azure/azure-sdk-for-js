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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update the NGINX deployment */
  update: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsUpdateOptionalParams,
  ) => PollerLike<OperationState<NginxDeployment>, NginxDeployment>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NginxDeployment>, NginxDeployment>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsUpdateOptionalParams,
  ) => Promise<NginxDeployment>;
  /** Create or update the NGINX deployment */
  createOrUpdate: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NginxDeployment>, NginxDeployment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<NginxDeployment>, NginxDeployment>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    deploymentName: string,
    options?: DeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<NginxDeployment>;
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
    beginDelete: async (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, deploymentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, deploymentName, options);
    },
    update: (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, deploymentName, options),
    beginUpdate: async (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, deploymentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, deploymentName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, deploymentName, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, deploymentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      deploymentName: string,
      options?: DeploymentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, deploymentName, options);
    },
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
