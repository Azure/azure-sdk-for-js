// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ComputeLimitContext } from "../../api/computeLimitContext.js";
import { listBySubscriptionLocationResource, get } from "../../api/vmFamilies/operations.js";
import type {
  VmFamiliesListBySubscriptionLocationResourceOptionalParams,
  VmFamiliesGetOptionalParams,
} from "../../api/vmFamilies/options.js";
import type { VmFamily } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a VmFamilies operations. */
export interface VmFamiliesOperations {
  /** Lists all VM families for the subscription at the specified location. */
  listBySubscriptionLocationResource: (
    location: string,
    options?: VmFamiliesListBySubscriptionLocationResourceOptionalParams,
  ) => PagedAsyncIterableIterator<VmFamily>;
  /** Gets the properties of a VM family. */
  get: (
    location: string,
    vmFamilyName: string,
    options?: VmFamiliesGetOptionalParams,
  ) => Promise<VmFamily>;
}

function _getVmFamilies(context: ComputeLimitContext) {
  return {
    listBySubscriptionLocationResource: (
      location: string,
      options?: VmFamiliesListBySubscriptionLocationResourceOptionalParams,
    ) => listBySubscriptionLocationResource(context, location, options),
    get: (location: string, vmFamilyName: string, options?: VmFamiliesGetOptionalParams) =>
      get(context, location, vmFamilyName, options),
  };
}

export function _getVmFamiliesOperations(context: ComputeLimitContext): VmFamiliesOperations {
  return {
    ..._getVmFamilies(context),
  };
}
