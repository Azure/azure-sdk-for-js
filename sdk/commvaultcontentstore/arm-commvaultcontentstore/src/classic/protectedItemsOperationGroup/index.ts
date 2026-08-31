// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContentStoreContext } from "../../api/contentStoreContext.js";
import { countByProtectionGroups } from "../../api/protectedItemsOperationGroup/operations.js";
import type { ProtectedItemsOperationGroupCountByProtectionGroupsOptionalParams } from "../../api/protectedItemsOperationGroup/options.js";
import type {
  CountProtectedItemsRequest,
  CountProtectedItemsResponse,
} from "../../models/models.js";

/** Interface representing a ProtectedItemsOperationGroup operations. */
export interface ProtectedItemsOperationGroupOperations {
  /** Gets the count of protected items for provided CCA resource IDs across subscriptions. */
  countByProtectionGroups: (
    body: CountProtectedItemsRequest,
    options?: ProtectedItemsOperationGroupCountByProtectionGroupsOptionalParams,
  ) => Promise<CountProtectedItemsResponse>;
}

function _getProtectedItemsOperationGroup(context: ContentStoreContext) {
  return {
    countByProtectionGroups: (
      body: CountProtectedItemsRequest,
      options?: ProtectedItemsOperationGroupCountByProtectionGroupsOptionalParams,
    ) => countByProtectionGroups(context, body, options),
  };
}

export function _getProtectedItemsOperationGroupOperations(
  context: ContentStoreContext,
): ProtectedItemsOperationGroupOperations {
  return {
    ..._getProtectedItemsOperationGroup(context),
  };
}
