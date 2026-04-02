// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import {
  resume,
  pause,
  listSkus,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/deployments/operations.js";
import type {
  DeploymentsResumeOptionalParams,
  DeploymentsPauseOptionalParams,
  DeploymentsListSkusOptionalParams,
  DeploymentsListOptionalParams,
  DeploymentsDeleteOptionalParams,
  DeploymentsUpdateOptionalParams,
  DeploymentsCreateOrUpdateOptionalParams,
  DeploymentsGetOptionalParams,
} from "../../api/deployments/options.js";
import type { Deployment, PatchResourceTagsAndSku, SkuResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Deployments operations. */
export interface DeploymentsOperations {
  /** Resumes inferencing on a previously paused deployment by setting the deploymentState to 'Running' (see #/definitions/DeploymentProperties/properties/deploymentState). This operation is idempotent and can be safely called on already running deployments. */
  resume: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: DeploymentsResumeOptionalParams,
  ) => Promise<Deployment>;
  /** Pauses inferencing on a deployment by setting the deploymentState to 'Paused' (see #/definitions/DeploymentProperties/properties/deploymentState). Only Standard, DataZoneStandard, and GlobalStandard SKUs support this operation. Inference requests to the paused deployment endpoint will receive HTTP 423 (Locked). This operation is idempotent. */
  pause: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: DeploymentsPauseOptionalParams,
  ) => Promise<Deployment>;
  /** Lists the specified deployments skus associated with the Cognitive Services account. */
  listSkus: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: DeploymentsListSkusOptionalParams,
  ) => PagedAsyncIterableIterator<SkuResource>;
  /** Gets the deployments associated with the Cognitive Services account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: DeploymentsListOptionalParams,
  ) => PagedAsyncIterableIterator<Deployment>;
  /** Deletes the specified deployment associated with the Cognitive Services account. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: DeploymentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Update specified deployments associated with the Cognitive Services account. */
  update: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    deployment: PatchResourceTagsAndSku,
    options?: DeploymentsUpdateOptionalParams,
  ) => PollerLike<OperationState<Deployment>, Deployment>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    deployment: PatchResourceTagsAndSku,
    options?: DeploymentsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Deployment>, Deployment>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    deployment: PatchResourceTagsAndSku,
    options?: DeploymentsUpdateOptionalParams,
  ) => Promise<Deployment>;
  /** Update the state of specified deployments associated with the Cognitive Services account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    deployment: Deployment,
    options?: DeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Deployment>, Deployment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    deployment: Deployment,
    options?: DeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Deployment>, Deployment>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    deployment: Deployment,
    options?: DeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<Deployment>;
  /** Gets the specified deployments associated with the Cognitive Services account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: DeploymentsGetOptionalParams,
  ) => Promise<Deployment>;
}

function _getDeployments(context: CognitiveServicesManagementContext) {
  return {
    resume: (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: DeploymentsResumeOptionalParams,
    ) => resume(context, resourceGroupName, accountName, deploymentName, options),
    pause: (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: DeploymentsPauseOptionalParams,
    ) => pause(context, resourceGroupName, accountName, deploymentName, options),
    listSkus: (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: DeploymentsListSkusOptionalParams,
    ) => listSkus(context, resourceGroupName, accountName, deploymentName, options),
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: DeploymentsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: DeploymentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, deploymentName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: DeploymentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, deploymentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: DeploymentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, deploymentName, options);
    },
    update: (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      deployment: PatchResourceTagsAndSku,
      options?: DeploymentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, deploymentName, deployment, options),
    beginUpdate: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      deployment: PatchResourceTagsAndSku,
      options?: DeploymentsUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        accountName,
        deploymentName,
        deployment,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      deployment: PatchResourceTagsAndSku,
      options?: DeploymentsUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        accountName,
        deploymentName,
        deployment,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      deployment: Deployment,
      options?: DeploymentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, accountName, deploymentName, deployment, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      deployment: Deployment,
      options?: DeploymentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        deploymentName,
        deployment,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      deployment: Deployment,
      options?: DeploymentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        deploymentName,
        deployment,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: DeploymentsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, deploymentName, options),
  };
}

export function _getDeploymentsOperations(
  context: CognitiveServicesManagementContext,
): DeploymentsOperations {
  return {
    ..._getDeployments(context),
  };
}
