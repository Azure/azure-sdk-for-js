// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CognitiveServicesManagementContext } from "../../api/cognitiveServicesManagementContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/attachedAksClusters/operations.js";
import type {
  AttachedAksClustersListOptionalParams,
  AttachedAksClustersDeleteOptionalParams,
  AttachedAksClustersCreateOrUpdateOptionalParams,
  AttachedAksClustersGetOptionalParams,
} from "../../api/attachedAksClusters/options.js";
import type { AttachedAksCluster, AttachedAksClusterListItem } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AttachedAksClusters operations. */
export interface AttachedAksClustersOperations {
  /**
   * Lists lightweight AKS attachment summaries for the account.
   * Use GET on an individual attachment to retrieve its full status and bindings.
   */
  list: (
    resourceGroupName: string,
    accountName: string,
    options?: AttachedAksClustersListOptionalParams,
  ) => PagedAsyncIterableIterator<AttachedAksClusterListItem>;
  /**
   * Detaches an AKS cluster while retaining the physical AKS and AI Manager
   * resources. A 202 response contains the current attachment; poll GET until
   * the attachment is no longer found. A 204 response indicates that the
   * attachment has been removed or did not exist.
   */
  delete: (
    resourceGroupName: string,
    accountName: string,
    attachedAksClusterName: string,
    options?: AttachedAksClustersDeleteOptionalParams,
  ) => Promise<AttachedAksCluster | void>;
  /**
   * Attaches an existing AKS cluster to the account, or updates its attachment.
   * A 202 response contains the current attachment; poll GET and inspect
   * properties.status.stage for progress. A 200 response also contains the
   * current attachment state and does not by itself guarantee workload readiness.
   */
  createOrUpdate: (
    resourceGroupName: string,
    accountName: string,
    attachedAksClusterName: string,
    resource: AttachedAksCluster,
    options?: AttachedAksClustersCreateOrUpdateOptionalParams,
  ) => Promise<AttachedAksCluster>;
  /** Gets an AKS attachment and its current provisioning and health status. */
  get: (
    resourceGroupName: string,
    accountName: string,
    attachedAksClusterName: string,
    options?: AttachedAksClustersGetOptionalParams,
  ) => Promise<AttachedAksCluster>;
}

function _getAttachedAksClusters(context: CognitiveServicesManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      accountName: string,
      options?: AttachedAksClustersListOptionalParams,
    ) => list(context, resourceGroupName, accountName, options),
    delete: (
      resourceGroupName: string,
      accountName: string,
      attachedAksClusterName: string,
      options?: AttachedAksClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, accountName, attachedAksClusterName, options),
    createOrUpdate: (
      resourceGroupName: string,
      accountName: string,
      attachedAksClusterName: string,
      resource: AttachedAksCluster,
      options?: AttachedAksClustersCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        accountName,
        attachedAksClusterName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      accountName: string,
      attachedAksClusterName: string,
      options?: AttachedAksClustersGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, attachedAksClusterName, options),
  };
}

export function _getAttachedAksClustersOperations(
  context: CognitiveServicesManagementContext,
): AttachedAksClustersOperations {
  return {
    ..._getAttachedAksClusters(context),
  };
}
