// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeploymentStacksContext } from "../../api/deploymentStacksContext.js";
import {
  whatIf,
  $delete,
  createOrUpdate,
  list,
  get,
} from "../../api/deploymentStacksWhatIfResultsAtSubscription/operations.js";
import type {
  DeploymentStacksWhatIfResultsAtSubscriptionWhatIfOptionalParams,
  DeploymentStacksWhatIfResultsAtSubscriptionDeleteOptionalParams,
  DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateOptionalParams,
  DeploymentStacksWhatIfResultsAtSubscriptionListOptionalParams,
  DeploymentStacksWhatIfResultsAtSubscriptionGetOptionalParams,
} from "../../api/deploymentStacksWhatIfResultsAtSubscription/options.js";
import type { DeploymentStacksWhatIfResult } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DeploymentStacksWhatIfResultsAtSubscription operations. */
export interface DeploymentStacksWhatIfResultsAtSubscriptionOperations {
  /** Returns property-level changes that will be made by the deployment if executed. */
  whatIf: (
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtSubscriptionWhatIfOptionalParams,
  ) => PollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>;
  /** @deprecated use whatIf instead */
  beginWhatIf: (
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtSubscriptionWhatIfOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>
  >;
  /** @deprecated use whatIf instead */
  beginWhatIfAndWait: (
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtSubscriptionWhatIfOptionalParams,
  ) => Promise<DeploymentStacksWhatIfResult>;
  /** Deletes a Deployment stack by name at the specified scope. When operation completes, status code 200 returned without content. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtSubscriptionDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a Deployment stack at the specified scope. */
  createOrUpdate: (
    deploymentStacksWhatIfResultName: string,
    resource: DeploymentStacksWhatIfResult,
    options?: DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    deploymentStacksWhatIfResultName: string,
    resource: DeploymentStacksWhatIfResult,
    options?: DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<DeploymentStacksWhatIfResult>, DeploymentStacksWhatIfResult>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    deploymentStacksWhatIfResultName: string,
    resource: DeploymentStacksWhatIfResult,
    options?: DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateOptionalParams,
  ) => Promise<DeploymentStacksWhatIfResult>;
  /** Lists Deployment stacks at the specified scope. */
  list: (
    options?: DeploymentStacksWhatIfResultsAtSubscriptionListOptionalParams,
  ) => PagedAsyncIterableIterator<DeploymentStacksWhatIfResult>;
  /** Gets the Deployment stack with the given name. */
  get: (
    deploymentStacksWhatIfResultName: string,
    options?: DeploymentStacksWhatIfResultsAtSubscriptionGetOptionalParams,
  ) => Promise<DeploymentStacksWhatIfResult>;
}

function _getDeploymentStacksWhatIfResultsAtSubscription(context: DeploymentStacksContext) {
  return {
    whatIf: (
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtSubscriptionWhatIfOptionalParams,
    ) => whatIf(context, deploymentStacksWhatIfResultName, options),
    beginWhatIf: async (
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtSubscriptionWhatIfOptionalParams,
    ) => {
      const poller = whatIf(context, deploymentStacksWhatIfResultName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginWhatIfAndWait: async (
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtSubscriptionWhatIfOptionalParams,
    ) => {
      return await whatIf(context, deploymentStacksWhatIfResultName, options);
    },
    delete: (
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtSubscriptionDeleteOptionalParams,
    ) => $delete(context, deploymentStacksWhatIfResultName, options),
    createOrUpdate: (
      deploymentStacksWhatIfResultName: string,
      resource: DeploymentStacksWhatIfResult,
      options?: DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, deploymentStacksWhatIfResultName, resource, options),
    beginCreateOrUpdate: async (
      deploymentStacksWhatIfResultName: string,
      resource: DeploymentStacksWhatIfResult,
      options?: DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, deploymentStacksWhatIfResultName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      deploymentStacksWhatIfResultName: string,
      resource: DeploymentStacksWhatIfResult,
      options?: DeploymentStacksWhatIfResultsAtSubscriptionCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, deploymentStacksWhatIfResultName, resource, options);
    },
    list: (options?: DeploymentStacksWhatIfResultsAtSubscriptionListOptionalParams) =>
      list(context, options),
    get: (
      deploymentStacksWhatIfResultName: string,
      options?: DeploymentStacksWhatIfResultsAtSubscriptionGetOptionalParams,
    ) => get(context, deploymentStacksWhatIfResultName, options),
  };
}

export function _getDeploymentStacksWhatIfResultsAtSubscriptionOperations(
  context: DeploymentStacksContext,
): DeploymentStacksWhatIfResultsAtSubscriptionOperations {
  return {
    ..._getDeploymentStacksWhatIfResultsAtSubscription(context),
  };
}
