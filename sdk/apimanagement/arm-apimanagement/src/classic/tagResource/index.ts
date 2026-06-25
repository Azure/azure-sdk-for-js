// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import { listByService } from "../../api/tagResource/operations.js";
import { TagResourceListByServiceOptionalParams } from "../../api/tagResource/options.js";
import { TagResourceContract } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

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
