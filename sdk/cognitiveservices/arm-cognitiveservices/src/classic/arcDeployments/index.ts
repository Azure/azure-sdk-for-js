// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, update, createOrUpdate, get } from "../../api/arcDeployments/operations.js";
import type {
  ArcDeploymentsListOptionalParams,
  ArcDeploymentsDeleteOptionalParams,
  ArcDeploymentsUpdateOptionalParams,
  ArcDeploymentsCreateOrUpdateOptionalParams,
  ArcDeploymentsGetOptionalParams,
} from "../../api/arcDeployments/options.js";
import type { ArcDeployment, ArcDeploymentUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ArcDeployments operations. */
export interface ArcDeploymentsOperations {
  /** Gets the Arc deployments associated with the Cognitive Services account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: ArcDeploymentsListOptionalParams,
  ) => PagedAsyncIterableIterator<ArcDeployment>;
  /** Deletes the specified Arc deployment associated with the Cognitive Services account. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: ArcDeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: ArcDeploymentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: ArcDeploymentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the specified Arc deployment associated with the Cognitive Services account. */
  update: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    properties: ArcDeploymentUpdate,
    options?: ArcDeploymentsUpdateOptionalParams,
  ) => PollerLike<OperationState<ArcDeployment>, ArcDeployment>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    properties: ArcDeploymentUpdate,
    options?: ArcDeploymentsUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ArcDeployment>, ArcDeployment>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    properties: ArcDeploymentUpdate,
    options?: ArcDeploymentsUpdateOptionalParams,
  ) => Promise<ArcDeployment>;
  /** Creates or updates an Arc deployment associated with the Cognitive Services account. */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    resource: ArcDeployment,
    options?: ArcDeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ArcDeployment>, ArcDeployment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    resource: ArcDeployment,
    options?: ArcDeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ArcDeployment>, ArcDeployment>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    resource: ArcDeployment,
    options?: ArcDeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<ArcDeployment>;
  /** Gets the specified Arc deployment associated with the Cognitive Services account. */
  get: (
    resourceGroupName: string,
    accountName: string,
    deploymentName: string,
    options?: ArcDeploymentsGetOptionalParams,
  ) => Promise<ArcDeployment>;
}

function _getArcDeployments(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: ArcDeploymentsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: ArcDeploymentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, deploymentName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: ArcDeploymentsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, accountName, deploymentName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      options?: ArcDeploymentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, deploymentName, options);
    },
    update: (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      properties: ArcDeploymentUpdate,
      options?: ArcDeploymentsUpdateOptionalParams,
    ) => update(context, resourceGroupName, accountName, deploymentName, properties, options),
    beginUpdate: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      properties: ArcDeploymentUpdate,
      options?: ArcDeploymentsUpdateOptionalParams,
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
      properties: ArcDeploymentUpdate,
      options?: ArcDeploymentsUpdateOptionalParams,
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
      resource: ArcDeployment,
      options?: ArcDeploymentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, accountName, deploymentName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      deploymentName: string,
      resource: ArcDeployment,
      options?: ArcDeploymentsCreateOrUpdateOptionalParams,
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
      resource: ArcDeployment,
      options?: ArcDeploymentsCreateOrUpdateOptionalParams,
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
      options?: ArcDeploymentsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, deploymentName, options),
  };
}

export function _getArcDeploymentsOperations(
  context: CognitiveServicesManagementContext,
): ArcDeploymentsOperations {
  return {
    ..._getArcDeployments(context),
  };
}
