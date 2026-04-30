// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeploymentStacksContext } from "../../api/deploymentStacksContext.js";
import {
  whatIf,
  $delete,
  createOrUpdate,
  list,
  get,
} from "../../api/deploymentStacksWhatIfResultsAtManagementGroup/operations.js";
import type {
  DeploymentStacksWhatIfResultsAtManagementGroupWhatIfOptionalParams,
  DeploymentStacksWhatIfResultsAtManagementGroupDeleteOptionalParams,
  DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateOptionalParams,
  DeploymentStacksWhatIfResultsAtManagementGroupListOptionalParams,
  DeploymentStacksWhatIfResultsAtManagementGroupGetOptionalParams,
} from "../../api/deploymentStacksWhatIfResultsAtManagementGroup/options.js";
import type { DeploymentStacksWhatIfResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeploymentStacksWhatIfResultsAtManagementGroup operations. */
export interface DeploymentStacksWhatIfResultsAtManagementGroupOperations {
  /** Returns property-level changes that will be made by the deployment if executed. */
  whatIf: (
    managementGroupId: string,
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtManagementGroupWhatIfOptionalParams,
  ) => PollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>;
  /** @deprecated use whatIf instead */
  beginWhatIf: (
    managementGroupId: string,
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtManagementGroupWhatIfOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>
  >;
  /** @deprecated use whatIf instead */
  beginWhatIfAndWait: (
    managementGroupId: string,
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtManagementGroupWhatIfOptionalParams,
  ) => Promise<DeploymentStacksWhatIfResult>;
  /** Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    managementGroupId: string,
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtManagementGroupDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Deployment stack at the specified scope. */
  createOrUpdate: (
    managementGroupId: string,
    deploymentStacksWhatIfResultName: string,
    resource: DeploymentStacksWhatIfResult,
    options?: DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    managementGroupId: string,
    deploymentStacksWhatIfResultName: string,
    resource: DeploymentStacksWhatIfResult,
    options?: DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    managementGroupId: string,
    deploymentStacksWhatIfResultName: string,
    resource: DeploymentStacksWhatIfResult,
    options?: DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateOptionalParams,
  ) => Promise<DeploymentStacksWhatIfResult>;
  /** Lists Deployment stacks at the specified scope. */
  list: (
    managementGroupId: string,
    options?: DeploymentStacksWhatIfResultsAtManagementGroupListOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentStacksWhatIfResult>;
  /** Gets the Deployment stack with the given name. */
  get: (
    managementGroupId: string,
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtManagementGroupGetOptionalParams,
  ) => Promise<DeploymentStacksWhatIfResult>;
}

function _getDeploymentStacksWhatIfResultsAtManagementGroup(context: DeploymentStacksContext) {
  return {
    whatIf: (
      managementGroupId: string,
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtManagementGroupWhatIfOptionalParams,
    ) => whatIf(context, managementGroupId, deploymentStacksWhatIfResultName, options),
    beginWhatIf: async (
      managementGroupId: string,
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtManagementGroupWhatIfOptionalParams,
    ) => {
      const poller = whatIf(context, managementGroupId, deploymentStacksWhatIfResultName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginWhatIfAndWait: async (
      managementGroupId: string,
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtManagementGroupWhatIfOptionalParams,
    ) => {
      return await whatIf(context, managementGroupId, deploymentStacksWhatIfResultName, options);
    },
    delete: (
      managementGroupId: string,
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtManagementGroupDeleteOptionalParams,
    ) => $delete(context, managementGroupId, deploymentStacksWhatIfResultName, options),
    createOrUpdate: (
      managementGroupId: string,
      deploymentStacksWhatIfResultName: string,
      resource: DeploymentStacksWhatIfResult,
      options?: DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        managementGroupId,
        deploymentStacksWhatIfResultName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      managementGroupId: string,
      deploymentStacksWhatIfResultName: string,
      resource: DeploymentStacksWhatIfResult,
      options?: DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        managementGroupId,
        deploymentStacksWhatIfResultName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      managementGroupId: string,
      deploymentStacksWhatIfResultName: string,
      resource: DeploymentStacksWhatIfResult,
      options?: DeploymentStacksWhatIfResultsAtManagementGroupCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        managementGroupId,
        deploymentStacksWhatIfResultName,
        resource,
        options,
      );
    },
    list: (
      managementGroupId: string,
      options?: DeploymentStacksWhatIfResultsAtManagementGroupListOptionalParams,
    ) => list(context, managementGroupId, options),
    get: (
      managementGroupId: string,
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtManagementGroupGetOptionalParams,
    ) => get(context, managementGroupId, deploymentStacksWhatIfResultName, options),
  };
}

export function _getDeploymentStacksWhatIfResultsAtManagementGroupOperations(
  context: DeploymentStacksContext,
): DeploymentStacksWhatIfResultsAtManagementGroupOperations {
  return {
    ..._getDeploymentStacksWhatIfResultsAtManagementGroup(context),
  };
}
