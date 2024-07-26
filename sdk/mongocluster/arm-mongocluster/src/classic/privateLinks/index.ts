// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { DocumentDBContext } from "../../api/mongoClusterManagementContext.js";
import { PrivateLinkResource } from "../../models/models.js";
import { privateLinksList } from "../../api/privateLinks/index.js";
import { PagedAsyncIterableIterator } from "../../models/pagingTypes.js";
import { PrivateLinksListOptionalParams } from "../../models/options.js";

/** Interface representing a PrivateLinks operations. */
export interface PrivateLinksOperations {
  /** list private links on the given resource */
  list: (
    resourceGroupName: string,
    mongoClusterName: string,
    options?: PrivateLinksListOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
}

export function getPrivateLinks(context: DocumentDBContext, subscriptionId: string) {
  return {
    list: (
      resourceGroupName: string,
      mongoClusterName: string,
      options?: PrivateLinksListOptionalParams,
    ) => privateLinksList(context, subscriptionId, resourceGroupName, mongoClusterName, options),
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
