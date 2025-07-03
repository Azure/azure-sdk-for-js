// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { Host } from "../../models/models.js";
import { HostsGetOptionalParams, HostsListOptionalParams } from "../../api/hosts/options.js";
import { get, list } from "../../api/hosts/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Hosts operations. */
export interface HostsOperations {
  /** Get a Host */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    hostId: string,
    options?: HostsGetOptionalParams,
  ) => Promise<Host>;
  /** List Host resources by Cluster */
  list: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    options?: HostsListOptionalParams,
  ) => PagedAsyncIterableIterator<Host>;
}

function _getHosts(context: AzureVMwareSolutionAPIContext) {
  return {
    get: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      hostId: string,
      options?: HostsGetOptionalParams,
    ) =>
      get(context, apiVersion, resourceGroupName, privateCloudName, clusterName, hostId, options),
    list: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      options?: HostsListOptionalParams,
    ) => list(context, apiVersion, resourceGroupName, privateCloudName, clusterName, options),
  };
}

export function _getHostsOperations(context: AzureVMwareSolutionAPIContext): HostsOperations {
  return {
    ..._getHosts(context),
  };
}
