// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIContext } from "../../api/azureStackHCIContext.js";
import { list, get } from "../../api/edgeMachineNetworkAdapters/operations.js";
import {
  EdgeMachineNetworkAdaptersListOptionalParams,
  EdgeMachineNetworkAdaptersGetOptionalParams,
} from "../../api/edgeMachineNetworkAdapters/options.js";
import { EdgeMachineNetworkAdapter } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EdgeMachineNetworkAdapters operations. */
export interface EdgeMachineNetworkAdaptersOperations {
  /** List all network adapters on an Edge Machine. */
  list: (
    resourceGroupName: string,
    edgeMachineName: string,
    options?: EdgeMachineNetworkAdaptersListOptionalParams,
  ) => PagedAsyncIterableIterator<EdgeMachineNetworkAdapter>;
  /** Get a specific network adapter on an Edge Machine. */
  get: (
    resourceGroupName: string,
    edgeMachineName: string,
    networkAdapterName: string,
    options?: EdgeMachineNetworkAdaptersGetOptionalParams,
  ) => Promise<EdgeMachineNetworkAdapter>;
}

function _getEdgeMachineNetworkAdapters(context: AzureStackHCIContext) {
  return {
    list: (
      resourceGroupName: string,
      edgeMachineName: string,
      options?: EdgeMachineNetworkAdaptersListOptionalParams,
    ) => list(context, resourceGroupName, edgeMachineName, options),
    get: (
      resourceGroupName: string,
      edgeMachineName: string,
      networkAdapterName: string,
      options?: EdgeMachineNetworkAdaptersGetOptionalParams,
    ) => get(context, resourceGroupName, edgeMachineName, networkAdapterName, options),
  };
}

export function _getEdgeMachineNetworkAdaptersOperations(
  context: AzureStackHCIContext,
): EdgeMachineNetworkAdaptersOperations {
  return {
    ..._getEdgeMachineNetworkAdapters(context),
  };
}
