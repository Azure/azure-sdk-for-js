// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { list } from "../../api/capabilitiesByServer/operations.js";
import type { CapabilitiesByServerListOptionalParams } from "../../api/capabilitiesByServer/options.js";
import type { Capability } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CapabilitiesByServer operations. */
export interface CapabilitiesByServerOperations {
  /** Lists the capabilities available for a given server. */
  list: (
    resourceGroupName: string,
    serverName: string,
    options?: CapabilitiesByServerListOptionalParams,
  ) => PagedAsyncIterableIterator<Capability>;
}

function _getCapabilitiesByServer(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    list: (
      resourceGroupName: string,
      serverName: string,
      options?: CapabilitiesByServerListOptionalParams,
    ) => list(context, resourceGroupName, serverName, options),
  };
}

export function _getCapabilitiesByServerOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): CapabilitiesByServerOperations {
  return {
    ..._getCapabilitiesByServer(context),
  };
}
