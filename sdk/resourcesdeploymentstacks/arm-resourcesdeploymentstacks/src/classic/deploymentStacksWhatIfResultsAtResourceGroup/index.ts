// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeploymentStacksContext } from "../../api/deploymentStacksContext.js";
import {
  whatIf,
  $delete,
  createOrUpdate,
  list,
  get,
} from "../../api/deploymentStacksWhatIfResultsAtResourceGroup/operations.js";
import type {
  DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOptionalParams,
  DeploymentStacksWhatIfResultsAtResourceGroupDeleteOptionalParams,
  DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOptionalParams,
  DeploymentStacksWhatIfResultsAtResourceGroupListOptionalParams,
  DeploymentStacksWhatIfResultsAtResourceGroupGetOptionalParams,
} from "../../api/deploymentStacksWhatIfResultsAtResourceGroup/options.js";
import type { DeploymentStacksWhatIfResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeploymentStacksWhatIfResultsAtResourceGroup operations. */
export interface DeploymentStacksWhatIfResultsAtResourceGroupOperations {
  /** Returns property-level changes that will be made by the deployment if executed. */
  whatIf: (
    resourceGroupName: string,
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOptionalParams,
  ) => PollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>;
  /** @deprecated use whatIf instead */
  beginWhatIf: (
    resourceGroupName: string,
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>
  >;
  /** @deprecated use whatIf instead */
  beginWhatIfAndWait: (
    resourceGroupName: string,
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOptionalParams,
  ) => Promise<DeploymentStacksWhatIfResult>;
  /** Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtResourceGroupDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Deployment stack at the specified scope. */
  createOrUpdate: (
    resourceGroupName: string,
    deploymentStacksWhatIfResultName: string,
    resource: DeploymentStacksWhatIfResult,
    options?: DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    deploymentStacksWhatIfResultName: string,
    resource: DeploymentStacksWhatIfResult,
    options?: DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    deploymentStacksWhatIfResultName: string,
    resource: DeploymentStacksWhatIfResult,
    options?: DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOptionalParams,
  ) => Promise<DeploymentStacksWhatIfResult>;
  /** Lists Deployment stacks at the specified scope. */
  list: (
    resourceGroupName: string,
    options?: DeploymentStacksWhatIfResultsAtResourceGroupListOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentStacksWhatIfResult>;
  /** Gets the Deployment stack with the given name. */
  get: (
    resourceGroupName: string,
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtResourceGroupGetOptionalParams,
  ) => Promise<DeploymentStacksWhatIfResult>;
}

function _getDeploymentStacksWhatIfResultsAtResourceGroup(context: DeploymentStacksContext) {
  return {
    whatIf: (
      resourceGroupName: string,
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOptionalParams,
    ) => whatIf(context, resourceGroupName, deploymentStacksWhatIfResultName, options),
    beginWhatIf: async (
      resourceGroupName: string,
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOptionalParams,
    ) => {
      const poller = whatIf(context, resourceGroupName, deploymentStacksWhatIfResultName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginWhatIfAndWait: async (
      resourceGroupName: string,
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtResourceGroupWhatIfOptionalParams,
    ) => {
      return await whatIf(context, resourceGroupName, deploymentStacksWhatIfResultName, options);
    },
    delete: (
      resourceGroupName: string,
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtResourceGroupDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, deploymentStacksWhatIfResultName, options),
    createOrUpdate: (
      resourceGroupName: string,
      deploymentStacksWhatIfResultName: string,
      resource: DeploymentStacksWhatIfResult,
      options?: DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        deploymentStacksWhatIfResultName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      deploymentStacksWhatIfResultName: string,
      resource: DeploymentStacksWhatIfResult,
      options?: DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        deploymentStacksWhatIfResultName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      deploymentStacksWhatIfResultName: string,
      resource: DeploymentStacksWhatIfResult,
      options?: DeploymentStacksWhatIfResultsAtResourceGroupCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        deploymentStacksWhatIfResultName,
        resource,
        options,
      );
    },
    list: (
      resourceGroupName: string,
      options?: DeploymentStacksWhatIfResultsAtResourceGroupListOptionalParams,
    ) => list(context, resourceGroupName, options),
    get: (
      resourceGroupName: string,
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtResourceGroupGetOptionalParams,
    ) => get(context, resourceGroupName, deploymentStacksWhatIfResultName, options),
  };
}

export function _getDeploymentStacksWhatIfResultsAtResourceGroupOperations(
  context: DeploymentStacksContext,
): DeploymentStacksWhatIfResultsAtResourceGroupOperations {
  return {
    ..._getDeploymentStacksWhatIfResultsAtResourceGroup(context),
  };
}
