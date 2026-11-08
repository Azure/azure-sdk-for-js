// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { $delete, list, createOrUpdate, get } from "../../api/adapterDeployments/operations.js";
import type {
  AdapterDeploymentsDeleteOptionalParams,
  AdapterDeploymentsListOptionalParams,
  AdapterDeploymentsCreateOrUpdateOptionalParams,
  AdapterDeploymentsGetOptionalParams,
} from "../../api/adapterDeployments/options.js";
import type { AdapterDeployment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AdapterDeployments operations. */
export interface AdapterDeploymentsOperations {
  /** Drains requests and deletes an adapter deployment and its serving snapshot. */
  delete: (
    resourceGroupName: string,
    accountName: string,
    adapterDeploymentName: string,
    options?: AdapterDeploymentsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    accountName: string,
    adapterDeploymentName: string,
    options?: AdapterDeploymentsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    accountName: string,
    adapterDeploymentName: string,
    options?: AdapterDeploymentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Lists adapter deployments associated with the Cognitive Services account. */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: AdapterDeploymentsListOptionalParams,
  ) => PagedAsyncIterableIterator<AdapterDeployment>;
  /**
   * Creates an adapter deployment or re-targets it to another compatible
   * managed compute deployment. The source model ID is immutable.
   * Returns 201 for a new adapter or 200 for an existing adapter, including retries.
   * Either response may require polling while provisioning is in progress.
   * After polling completes, retrieve the final resource from the original resource URL.
   * Omit conditional headers to allow either creation or update.
   * To create only when absent, send If-None-Match: *.
   * To update only a matching version, send If-Match with the ETag returned by GET.
   * Conditional requests, including retries, return 412 if the precondition is not met.
   */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    adapterDeploymentName: string,
    resource: AdapterDeployment,
    options?: AdapterDeploymentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AdapterDeployment>, AdapterDeployment>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    adapterDeploymentName: string,
    resource: AdapterDeployment,
    options?: AdapterDeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AdapterDeployment>, AdapterDeployment>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    accountName: string,
    adapterDeploymentName: string,
    resource: AdapterDeployment,
    options?: AdapterDeploymentsCreateOrUpdateOptionalParams,
  ) => Promise<AdapterDeployment>;
  /** Gets an adapter deployment by name. */
  get: (
    resourceGroupName: string,
    accountName: string,
    adapterDeploymentName: string,
    options?: AdapterDeploymentsGetOptionalParams,
  ) => Promise<AdapterDeployment>;
}

function _getAdapterDeployments(context: CognitiveServicesManagementContext) {
  return {
    delete: (
      resourceGroupName: string,
      accountName: string,
      adapterDeploymentName: string,
      options?: AdapterDeploymentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, adapterDeploymentName, options),
    beginDelete: async (
      resourceGroupName: string,
      accountName: string,
      adapterDeploymentName: string,
      options?: AdapterDeploymentsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        accountName,
        adapterDeploymentName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      accountName: string,
      adapterDeploymentName: string,
      options?: AdapterDeploymentsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, accountName, adapterDeploymentName, options);
    },
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: AdapterDeploymentsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      adapterDeploymentName: string,
      resource: AdapterDeployment,
      options?: AdapterDeploymentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        adapterDeploymentName,
        resource,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      accountName: string,
      adapterDeploymentName: string,
      resource: AdapterDeployment,
      options?: AdapterDeploymentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        adapterDeploymentName,
        resource,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      accountName: string,
      adapterDeploymentName: string,
      resource: AdapterDeployment,
      options?: AdapterDeploymentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        adapterDeploymentName,
        resource,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      accountName: string,
      adapterDeploymentName: string,
      options?: AdapterDeploymentsGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, adapterDeploymentName, options),
  };
}

export function _getAdapterDeploymentsOperations(
  context: CognitiveServicesManagementContext,
): AdapterDeploymentsOperations {
  return {
    ..._getAdapterDeployments(context),
  };
}
