// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMapsManagementContext } from "../../api/azureMapsManagementContext.js";
import { listOperations } from "../../api/maps/operations.js";
import type { MapsListOperationsOptionalParams } from "../../api/maps/options.js";
import type { Operation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Maps operations. */
export interface MapsOperations {
  /** List operations available for the Maps Resource Provider */
  listOperations: (
    options?: MapsListOperationsOptionalParams,
  ) => PagedAsyncIterableIterator<Operation>;
}

function _getMaps(context: AzureMapsManagementContext) {
  return {
    listOperations: (options?: MapsListOperationsOptionalParams) =>
      listOperations(context, options),
  };
}

export function _getMapsOperations(context: AzureMapsManagementContext): MapsOperations {
  return {
    ..._getMaps(context),
  };
}
