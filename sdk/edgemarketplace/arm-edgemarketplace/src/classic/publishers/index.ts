// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { EdgeMarketplaceContext } from "../../api/edgeMarketplaceContext.js";
import { listBySubscription, list, get } from "../../api/publishers/operations.js";
import type {
  PublishersListBySubscriptionOptionalParams,
  PublishersListOptionalParams,
  PublishersGetOptionalParams,
} from "../../api/publishers/options.js";
import type { Publisher } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Publishers operations. */
export interface PublishersOperations {
  /** List Publisher resources by subscription ID */
  listBySubscription: (
    options?: PublishersListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Publisher>;
  /** List Publisher resources by parent */
  list: (
    resourceUri: string,
    options?: PublishersListOptionalParams,
  ) => PagedAsyncIterableIterator<Publisher>;
  /** Get a Publisher */
  get: (
    resourceUri: string,
    publisherName: string,
    options?: PublishersGetOptionalParams,
  ) => Promise<Publisher>;
}

function _getPublishers(context: EdgeMarketplaceContext) {
  return {
    listBySubscription: (options?: PublishersListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceUri: string, options?: PublishersListOptionalParams) =>
      list(context, resourceUri, options),
    get: (resourceUri: string, publisherName: string, options?: PublishersGetOptionalParams) =>
      get(context, resourceUri, publisherName, options),
  };
}

export function _getPublishersOperations(context: EdgeMarketplaceContext): PublishersOperations {
  return {
    ..._getPublishers(context),
  };
}
