// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { update, get, list } from "../../api/hosts/operations.js";
import type {
  HostsUpdateOptionalParams,
  HostsGetOptionalParams,
  HostsListOptionalParams,
} from "../../api/hosts/options.js";
import type { Host, HostUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Hosts operations. */
export interface HostsOperations {
  /** Update a Host */
  update: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    hostId: string,
    properties: HostUpdate,
    options?: HostsUpdateOptionalParams,
  ) => Promise<Host>;
  /** Get a Host */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    hostId: string,
    options?: HostsGetOptionalParams,
  ) => Promise<Host>;
  /** List Host resources by Cluster */
  list: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    options?: HostsListOptionalParams,
  ) => PagedAsyncIterableIterator<Host>;
}

function _getHosts(context: AzureVMwareSolutionAPIContext) {
  return {
    update: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      hostId: string,
      properties: HostUpdate,
      options?: HostsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        privateCloudName,
        clusterName,
        hostId,
        properties,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      hostId: string,
      options?: HostsGetOptionalParams,
    ) => get(context, resourceGroupName, privateCloudName, clusterName, hostId, options),
    list: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      options?: HostsListOptionalParams,
    ) => list(context, resourceGroupName, privateCloudName, clusterName, options),
  };
}

export function _getHostsOperations(context: AzureVMwareSolutionAPIContext): HostsOperations {
  return {
    ..._getHosts(context),
  };
}
