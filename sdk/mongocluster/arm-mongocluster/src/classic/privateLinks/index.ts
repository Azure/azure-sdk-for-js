// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentDBContext } from "../../api/mongoClusterManagementContext.js";
import { PrivateLinkResource } from "../../models/models.js";
import { privateLinksListByMongoCluster } from "../../api/privateLinks/index.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PrivateLinksListByMongoClusterOptionalParams } from "../../models/options.js";

/** Interface representing a PrivateLinks operations. */
export interface PrivateLinksOperations {
  /** list private links on the given resource */
  listByMongoCluster: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: PrivateLinksListByMongoClusterOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

export function getPrivateLinks(context: DocumentDBContext, subscriptionId: string) {
  return {
    listByMongoCluster: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: PrivateLinksListByMongoClusterOptionalParams,
    ) =>
      privateLinksListByMongoCluster(
        context,
        subscriptionId,
        resourceGroupName,
        mongoClusterName,
        options,
      ),
  };
}

export function getPrivateLinksOperations(
  context: DocumentDBContext,
  subscriptionId: string,
): PrivateLinksOperations {
  return {
    ...getPrivateLinks(context, subscriptionId),
  };
}
