// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RelationshipsContext } from "../../api/relationshipsContext.js";
import {
  listByResourceGroup,
  listBySubscription,
} from "../../api/containsRelationships/operations.js";
import type {
  ContainsRelationshipsListByResourceGroupOptionalParams,
  ContainsRelationshipsListBySubscriptionOptionalParams,
} from "../../api/containsRelationships/options.js";
import type { ContainsRelationship } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a ContainsRelationships operations. */
export interface ContainsRelationshipsOperations {
  /** List ContainsRelationship resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ContainsRelationshipsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ContainsRelationship>;
  /** List ContainsRelationship resources by subscription ID */
  listBySubscription: (
    options?: ContainsRelationshipsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<ContainsRelationship>;
}
function _getContainsRelationships(context: RelationshipsContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ContainsRelationshipsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    listBySubscription: (options?: ContainsRelationshipsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
  };
}
export function _getContainsRelationshipsOperations(
  context: RelationshipsContext,
): ContainsRelationshipsOperations {
  return {
    ..._getContainsRelationships(context),
  };
}
