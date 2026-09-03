// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService } from "../../api/tagResource/operations.js";
import type { TagResourceListByServiceOptionalParams } from "../../api/tagResource/options.js";
import type { TagResourceContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a TagResource operations. */
export interface TagResourceOperations {
  /** Lists a collection of resources associated with tags. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: TagResourceListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<TagResourceContract>;
}

function _getTagResource(context: ApiManagementContext) {
  return {
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: TagResourceListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
  };
}

export function _getTagResourceOperations(context: ApiManagementContext): TagResourceOperations {
  return {
    ..._getTagResource(context),
  };
}
