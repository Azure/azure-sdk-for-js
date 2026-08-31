// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { CdnManagementContext } from "../../api/cdnManagementContext.js";
import { list } from "../../api/edgeNodes/operations.js";
import type { EdgeNodesListOptionalParams } from "../../api/edgeNodes/options.js";
import type { EdgeNode } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EdgeNodes operations. */
export interface EdgeNodesOperations {
  /** Edgenodes are the global Point of Presence (POP) locations used to deliver CDN content to end users. */
  list: (options?: EdgeNodesListOptionalParams) => PagedAsyncIterableIterator<EdgeNode>;
}

function _getEdgeNodes(context: CdnManagementContext) {
  return {
    list: (options?: EdgeNodesListOptionalParams) => list(context, options),
  };
}

export function _getEdgeNodesOperations(context: CdnManagementContext): EdgeNodesOperations {
  return {
    ..._getEdgeNodes(context),
  };
}
