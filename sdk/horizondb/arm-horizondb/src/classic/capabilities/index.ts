// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { HorizonDbContext } from "../../api/horizonDbContext.js";
import { list, get } from "../../api/capabilities/operations.js";
import type {
  CapabilitiesListOptionalParams,
  CapabilitiesGetOptionalParams,
} from "../../api/capabilities/options.js";
import type { Capability } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Capabilities operations. */
export interface CapabilitiesOperations {
  /** Lists the singleton HorizonDB capability catalog entry available to a subscription in a specific region. The result contains one item. */
  list: (
    location: string,
    options?: CapabilitiesListOptionalParams,
  ) => PagedAsyncIterableIterator<Capability>;
  /** Gets the singleton HorizonDB capability catalog entry available to a subscription in a specific region. */
  get: (location: string, options?: CapabilitiesGetOptionalParams) => Promise<Capability>;
}

function _getCapabilities(context: HorizonDbContext) {
  return {
    list: (location: string, options?: CapabilitiesListOptionalParams) =>
      list(context, location, options),
    get: (location: string, options?: CapabilitiesGetOptionalParams) =>
      get(context, location, options),
  };
}

export function _getCapabilitiesOperations(context: HorizonDbContext): CapabilitiesOperations {
  return {
    ..._getCapabilities(context),
  };
}
