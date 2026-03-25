// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureRedHatOpenShiftContext } from "../../api/azureRedHatOpenShiftContext.js";
import {
  listCredentials,
  listAdminCredentials,
  list,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/openShiftClusters/operations.js";
import type {
  OpenShiftClustersListCredentialsOptionalParams,
  OpenShiftClustersListAdminCredentialsOptionalParams,
  OpenShiftClustersListOptionalParams,
  OpenShiftClustersListByResourceGroupOptionalParams,
  OpenShiftClustersDeleteOptionalParams,
  OpenShiftClustersUpdateOptionalParams,
  OpenShiftClustersCreateOrUpdateOptionalParams,
  OpenShiftClustersGetOptionalParams,
} from "../../api/openShiftClusters/options.js";
import type {
  OpenShiftCluster,
  OpenShiftClusterUpdate,
  OpenShiftClusterAdminKubeconfig,
  OpenShiftClusterCredentials,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a OpenShiftClusters operations. */
export interface OpenShiftClustersOperations {
  /** The operation returns the credentials. */
  listCredentials: (
    resourceGroupName: string,
    resourceName: string,
    options?: OpenShiftClustersListCredentialsOptionalParams,
  ) => Promise<OpenShiftClusterCredentials>;
  /** The operation returns the admin kubeconfig. */
  listAdminCredentials: (
    resourceGroupName: string,
    resourceName: string,
    options?: OpenShiftClustersListAdminCredentialsOptionalParams,
  ) => Promise<OpenShiftClusterAdminKubeconfig>;
  /** The operation returns properties of each OpenShift cluster. */
  list: (
    options?: OpenShiftClustersListOptionalParams,
  ) => PagedAsyncIterableIterator<OpenShiftCluster>;
  /** The operation returns properties of each OpenShift cluster. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: OpenShiftClustersListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<OpenShiftCluster>;
  /** The operation returns nothing. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: OpenShiftClustersDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    resourceName: string,
    options?: OpenShiftClustersDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    resourceName: string,
    options?: OpenShiftClustersDeleteOptionalParams,
  ) => Promise<void>;
  /** The operation returns properties of a OpenShift cluster. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    parameters: OpenShiftClusterUpdate,
    options?: OpenShiftClustersUpdateOptionalParams,
  ) => PollerLike<OperationState<OpenShiftCluster>, OpenShiftCluster>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    resourceName: string,
    parameters: OpenShiftClusterUpdate,
    options?: OpenShiftClustersUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OpenShiftCluster>, OpenShiftCluster>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    parameters: OpenShiftClusterUpdate,
    options?: OpenShiftClustersUpdateOptionalParams,
  ) => Promise<OpenShiftCluster>;
  /** The operation returns properties of a OpenShift cluster. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    parameters: OpenShiftCluster,
    options?: OpenShiftClustersCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<OpenShiftCluster>, OpenShiftCluster>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    parameters: OpenShiftCluster,
    options?: OpenShiftClustersCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OpenShiftCluster>, OpenShiftCluster>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    resourceName: string,
    parameters: OpenShiftCluster,
    options?: OpenShiftClustersCreateOrUpdateOptionalParams,
  ) => Promise<OpenShiftCluster>;
  /** The operation returns properties of a OpenShift cluster. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: OpenShiftClustersGetOptionalParams,
  ) => Promise<OpenShiftCluster>;
}

function _getOpenShiftClusters(context: AzureRedHatOpenShiftContext) {
  return {
    listCredentials: (
      resourceGroupName: string,
      resourceName: string,
      options?: OpenShiftClustersListCredentialsOptionalParams,
    ) => listCredentials(context, resourceGroupName, resourceName, options),
    listAdminCredentials: (
      resourceGroupName: string,
      resourceName: string,
      options?: OpenShiftClustersListAdminCredentialsOptionalParams,
    ) => listAdminCredentials(context, resourceGroupName, resourceName, options),
    list: (options?: OpenShiftClustersListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: OpenShiftClustersListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: OpenShiftClustersDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    beginDelete: async (
      resourceGroupName: string,
      resourceName: string,
      options?: OpenShiftClustersDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, resourceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      options?: OpenShiftClustersDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, resourceName, options);
    },
    update: (
      resourceGroupName: string,
      resourceName: string,
      parameters: OpenShiftClusterUpdate,
      options?: OpenShiftClustersUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: OpenShiftClusterUpdate,
      options?: OpenShiftClustersUpdateOptionalParams,
    ) => {
      const poller = update(context, resourceGroupName, resourceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: OpenShiftClusterUpdate,
      options?: OpenShiftClustersUpdateOptionalParams,
    ) => {
      return await update(context, resourceGroupName, resourceName, parameters, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      parameters: OpenShiftCluster,
      options?: OpenShiftClustersCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: OpenShiftCluster,
      options?: OpenShiftClustersCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, resourceName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      resourceName: string,
      parameters: OpenShiftCluster,
      options?: OpenShiftClustersCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, resourceName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      resourceName: string,
      options?: OpenShiftClustersGetOptionalParams,
    ) => get(context, resourceGroupName, resourceName, options),
  };
}

export function _getOpenShiftClustersOperations(
  context: AzureRedHatOpenShiftContext,
): OpenShiftClustersOperations {
  return {
    ..._getOpenShiftClusters(context),
  };
}
