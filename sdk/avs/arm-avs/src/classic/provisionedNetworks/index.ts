// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { get, list } from "../../api/provisionedNetworks/operations.js";
import type {
  ProvisionedNetworksGetOptionalParams,
  ProvisionedNetworksListOptionalParams,
} from "../../api/provisionedNetworks/options.js";
import type { ProvisionedNetwork } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ProvisionedNetworks operations. */
export interface ProvisionedNetworksOperations {
  /** Get a ProvisionedNetwork */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    provisionedNetworkName: string,
    options?: ProvisionedNetworksGetOptionalParams,
  ) => Promise<ProvisionedNetwork>;
  /** List ProvisionedNetwork resources by PrivateCloud */
  list: (
    resourceGroupName: string,
    privateCloudName: string,
    options?: ProvisionedNetworksListOptionalParams,
  ) => PagedAsyncIterableIterator<ProvisionedNetwork>;
}

function _getProvisionedNetworks(context: AzureVMwareSolutionAPIContext) {
  return {
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      provisionedNetworkName: string,
      options?: ProvisionedNetworksGetOptionalParams,
    ) => get(context, resourceGroupName, privateCloudName, provisionedNetworkName, options),
    list: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: ProvisionedNetworksListOptionalParams,
    ) => list(context, resourceGroupName, privateCloudName, options),
  };
}

export function _getProvisionedNetworksOperations(
  context: AzureVMwareSolutionAPIContext,
): ProvisionedNetworksOperations {
  return {
    ..._getProvisionedNetworks(context),
  };
}
