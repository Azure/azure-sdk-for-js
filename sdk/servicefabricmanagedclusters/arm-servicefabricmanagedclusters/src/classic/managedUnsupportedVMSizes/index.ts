// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceFabricContext } from "../../api/serviceFabricContext.js";
import { ManagedVMSize } from "../../models/models.js";
import {
  ManagedUnsupportedVMSizesListOptionalParams,
  ManagedUnsupportedVMSizesGetOptionalParams,
} from "../../api/managedUnsupportedVMSizes/options.js";
import { list, get } from "../../api/managedUnsupportedVMSizes/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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

function _getManagedUnsupportedVMSizes(context: ServiceFabricContext) {
  return {
    list: (location: string, options?: ManagedUnsupportedVMSizesListOptionalParams) =>
      list(context, location, options),
    get: (location: string, vmSize: string, options?: ManagedUnsupportedVMSizesGetOptionalParams) =>
      get(context, location, vmSize, options),
  };
}

export function _getManagedUnsupportedVMSizesOperations(
  context: ServiceFabricContext,
): ManagedUnsupportedVMSizesOperations {
  return {
    ..._getManagedUnsupportedVMSizes(context),
  };
}
