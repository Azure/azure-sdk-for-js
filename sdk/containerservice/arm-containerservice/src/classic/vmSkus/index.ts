// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import { list } from "../../api/vmSkus/operations.js";
import type { VmSkusListOptionalParams } from "../../api/vmSkus/options.js";
import type { ResourceSku } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VmSkus operations. */
export interface VmSkusOperations {
  /** Gets the list of VM SKUs accepted by AKS when creating node pools in a specified location. AKS will perform a best effort approach to provision the requested VM SKUs, but availability is not guaranteed. */
  list: (
    location: string,
    options?: VmSkusListOptionalParams,
  ) => PagedAsyncIterableIterator<ResourceSku>;
}

function _getVmSkus(context: ContainerServiceContext) {
  return {
    list: (location: string, options?: VmSkusListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getVmSkusOperations(context: ContainerServiceContext): VmSkusOperations {
  return {
    ..._getVmSkus(context),
  };
}
