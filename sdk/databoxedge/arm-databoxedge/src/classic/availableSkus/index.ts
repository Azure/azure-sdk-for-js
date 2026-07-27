// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataBoxEdgeManagementContext } from "../../api/dataBoxEdgeManagementContext.js";
import { list } from "../../api/availableSkus/operations.js";
import type { AvailableSkusListOptionalParams } from "../../api/availableSkus/options.js";
import type { DataBoxEdgeSku } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AvailableSkus operations. */
export interface AvailableSkusOperations {
  /** List all the available Skus and information related to them. */
  list: (options?: AvailableSkusListOptionalParams) => PagedAsyncIterableIterator<DataBoxEdgeSku>;
}

function _getAvailableSkus(context: DataBoxEdgeManagementContext) {
  return {
    list: (options?: AvailableSkusListOptionalParams) => list(context, options),
  };
}

export function _getAvailableSkusOperations(
  context: DataBoxEdgeManagementContext,
): AvailableSkusOperations {
  return {
    ..._getAvailableSkus(context),
  };
}
