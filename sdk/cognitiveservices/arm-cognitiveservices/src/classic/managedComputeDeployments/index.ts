// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import {
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/managedComputeDeployments/operations.js";
import {
  ManagedComputeDeploymentsListOptionalParams,
  ManagedComputeDeploymentsDeleteOptionalParams,
  ManagedComputeDeploymentsUpdateOptionalParams,
  ManagedComputeDeploymentsCreateOrUpdateOptionalParams,
  ManagedComputeDeploymentsGetOptionalParams,
} from "../../api/managedComputeDeployments/options.js";
import { ManagedComputeDeployment, PatchResourceSku } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ManagedComputeDeployments operations. */
export interface ManagedComputeDeploymentsOperations {
  /** Gets the managed compute deployments associated with the Cognitive Services account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: ManagedComputeDeploymentsListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedComputeDeployment>;
  /** Deletes the specified managed compute deployment associated with the Cognitive Services account. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: ManagedComputeDeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: ManagedComputeDeploymentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: ManagedComputeDeploymentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the specified managed compute deployment associated with the Cognitive Services account. */
  update: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    properties: PatchResourceSku,
    options?: ManagedComputeDeploymentsUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedComputeDeployment>, ManagedComputeDeployment>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    properties: PatchResourceSku,
    options?: ManagedComputeDeploymentsUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ManagedComputeDeployment>, ManagedComputeDeployment>
  >;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    properties: PatchResourceSku,
    options?: ManagedComputeDeploymentsUpdateOptionalParams,
  ) => Promise<ManagedComputeDeployment>;
  /** Creates or updates a managed compute deployment associated with the Cognitive Services account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    resource: ManagedComputeDeployment,
    options?: ManagedComputeDeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ManagedComputeDeployment>, ManagedComputeDeployment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    resource: ManagedComputeDeployment,
    options?: ManagedComputeDeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ManagedComputeDeployment>, ManagedComputeDeployment>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    resource: ManagedComputeDeployment,
    options?: ManagedComputeDeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<ManagedComputeDeployment>;
  /** Gets the specified managed compute deployment associated with the Cognitive Services account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: ManagedComputeDeploymentsGetOptionalParams,
  ) => Promise<ManagedComputeDeployment>;
}

function _getManagedComputeDeployments(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: ManagedComputeDeploymentsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: ManagedComputeDeploymentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, deploymentName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: ManagedComputeDeploymentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, deploymentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: ManagedComputeDeploymentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, deploymentName, options);
    },
    update: (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      properties: PatchResourceSku,
      options?: ManagedComputeDeploymentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, deploymentName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      properties: PatchResourceSku,
      options?: ManagedComputeDeploymentsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        accountName,
        deploymentName,
        properties,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      properties: PatchResourceSku,
      options?: ManagedComputeDeploymentsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        accountName,
        deploymentName,
        properties,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      resource: ManagedComputeDeployment,
      options?: ManagedComputeDeploymentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, deploymentName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      resource: ManagedComputeDeployment,
      options?: ManagedComputeDeploymentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        deploymentName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      resource: ManagedComputeDeployment,
      options?: ManagedComputeDeploymentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        deploymentName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: ManagedComputeDeploymentsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, deploymentName, options),
  };
}

export function _getManagedComputeDeploymentsOperations(
  context: CognitiveServicesManagementContext,
): ManagedComputeDeploymentsOperations {
  return {
    ..._getManagedComputeDeployments(context),
  };
}
