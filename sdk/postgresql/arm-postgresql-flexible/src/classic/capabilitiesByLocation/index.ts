// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { list } from "../../api/capabilitiesByLocation/operations.js";
import type { CapabilitiesByLocationListOptionalParams } from "../../api/capabilitiesByLocation/options.js";
import type { Capability } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CapabilitiesByLocation operations. */
export interface CapabilitiesByLocationOperations {
  /** Lists the capabilities available in a given location for a specific subscription. */
  list: (
    locationName: string,
    options?: CapabilitiesByLocationListOptionalParams,
  ) => PagedAsyncIterableIterator<Capability>;
}

function _getCapabilitiesByLocation(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    list: (locationName: string, options?: CapabilitiesByLocationListOptionalParams) =>
      list(context, locationName, options),
  };
}

export function _getCapabilitiesByLocationOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): CapabilitiesByLocationOperations {
  return {
    ..._getCapabilitiesByLocation(context),
  };
}
