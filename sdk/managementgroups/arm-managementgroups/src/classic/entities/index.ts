// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagementGroupsAPIContext } from "../../api/managementGroupsAPIContext.js";
import { list } from "../../api/entities/operations.js";
import type { EntitiesListOptionalParams } from "../../api/entities/options.js";
import type { EntityInfo } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Entities operations. */
export interface EntitiesOperations {
  /** List all entities (Management Groups, Subscriptions, etc.) for the authenticated user. */
  list: (options?: EntitiesListOptionalParams) => PagedAsyncIterableIterator<EntityInfo>;
}

function _getEntities(context: ManagementGroupsAPIContext) {
  return {
    list: (options?: EntitiesListOptionalParams) => list(context, options),
  };
}

export function _getEntitiesOperations(context: ManagementGroupsAPIContext): EntitiesOperations {
  return {
    ..._getEntities(context),
  };
}
