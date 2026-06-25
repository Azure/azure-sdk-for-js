// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { WebPubSubManagementContext } from "../../api/webPubSubManagementContext.js";
import { list } from "../../api/usages/operations.js";
import { UsagesListOptionalParams } from "../../api/usages/options.js";
import { SignalRServiceUsage } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Usages operations. */
export interface UsagesOperations {
  /** List resource usage quotas by location. */
  list: (
    location: string,
    options?: UsagesListOptionalParams,
  ) => PagedAsyncIterableIterator<SignalRServiceUsage>;
}

function _getUsages(context: WebPubSubManagementContext) {
  return {
    list: (location: string, options?: UsagesListOptionalParams) =>
      list(context, location, options),
  };
}

export function _getUsagesOperations(context: WebPubSubManagementContext): UsagesOperations {
  return {
    ..._getUsages(context),
  };
}
