// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ServiceFabricManagedClustersManagementContext } from "../../api/serviceFabricManagedClustersManagementContext.js";
import { list, get } from "../../api/managedUnsupportedVMSizes/operations.js";
import type {
  ManagedUnsupportedVMSizesListOptionalParams,
  ManagedUnsupportedVMSizesGetOptionalParams,
} from "../../api/managedUnsupportedVMSizes/options.js";
import type { ManagedVMSize } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ManagedUnsupportedVMSizes operations. */
export interface ManagedUnsupportedVMSizesOperations {
  /** Get the lists of unsupported vm sizes for Service Fabric Managed Clusters. */
  list: (
    location: string,
    options?: ManagedUnsupportedVMSizesListOptionalParams,
  ) => PagedAsyncIterableIterator<ManagedVMSize>;
  /** Get unsupported vm size for Service Fabric Managed Clusters. */
  get: (
    location: string,
    vmSize: string,
    options?: ManagedUnsupportedVMSizesGetOptionalParams,
  ) => Promise<ManagedVMSize>;
}

function _getManagedUnsupportedVMSizes(context: ServiceFabricManagedClustersManagementContext) {
  return {
    list: (location: string, options?: ManagedUnsupportedVMSizesListOptionalParams) =>
      list(context, location, options),
    get: (location: string, vmSize: string, options?: ManagedUnsupportedVMSizesGetOptionalParams) =>
      get(context, location, vmSize, options),
  };
}

export function _getManagedUnsupportedVMSizesOperations(
  context: ServiceFabricManagedClustersManagementContext,
): ManagedUnsupportedVMSizesOperations {
  return {
    ..._getManagedUnsupportedVMSizes(context),
  };
}
