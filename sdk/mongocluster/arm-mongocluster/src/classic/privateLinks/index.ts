// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MongoClusterManagementContext } from "../../api/mongoClusterManagementContext.js";
import { listByMongoCluster } from "../../api/privateLinks/operations.js";
import type { PrivateLinksListByMongoClusterOptionalParams } from "../../api/privateLinks/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinks operations. */
export interface PrivateLinksOperations {
  /** list private links on the given resource */
  listByMongoCluster: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: PrivateLinksListByMongoClusterOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

function _getPrivateLinks(context: MongoClusterManagementContext) {
  return {
    listByMongoCluster: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: PrivateLinksListByMongoClusterOptionalParams,
    ) => listByMongoCluster(context, resourceGroupName, mongoClusterName, options),
  };
}

export function _getPrivateLinksOperations(
  context: MongoClusterManagementContext,
): PrivateLinksOperations {
  return {
    ..._getPrivateLinks(context),
  };
}
