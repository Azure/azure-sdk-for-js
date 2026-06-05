// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { BatchManagementContext } from "../../api/batchManagementContext.js";
import { listByBatchAccount, get } from "../../api/privateLinkResource/operations.js";
import type {
  PrivateLinkResourceListByBatchAccountOptionalParams,
  PrivateLinkResourceGetOptionalParams,
} from "../../api/privateLinkResource/options.js";
import type { PrivateLinkResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PrivateLinkResource operations. */
export interface PrivateLinkResourceOperations {
  /** Lists all of the private link resources in the specified account. */
  listByBatchAccount: (
    resourceGroupName: string,
    accountName: string,
    options?: PrivateLinkResourceListByBatchAccountOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Gets information about the specified private link resource. */
  get: (
    resourceGroupName: string,
    accountName: string,
    privateLinkResourceName: string,
    options?: PrivateLinkResourceGetOptionalParams,
  ) => Promise<PrivateLinkResource>;
}

function _getPrivateLinkResource(context: BatchManagementContext) {
  return {
    listByBatchAccount: (
      resourceGroupName: string,
      accountName: string,
      options?: PrivateLinkResourceListByBatchAccountOptionalParams,
    ) => listByBatchAccount(context, resourceGroupName, accountName, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      privateLinkResourceName: string,
      options?: PrivateLinkResourceGetOptionalParams,
    ) => get(context, resourceGroupName, accountName, privateLinkResourceName, options),
  };
}

export function _getPrivateLinkResourceOperations(
  context: BatchManagementContext,
): PrivateLinkResourceOperations {
  return {
    ..._getPrivateLinkResource(context),
  };
}
