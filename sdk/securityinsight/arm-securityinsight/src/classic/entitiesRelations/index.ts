// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list } from "../../api/entitiesRelations/operations.js";
import type { EntitiesRelationsListOptionalParams } from "../../api/entitiesRelations/options.js";
import type { Relation } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EntitiesRelations operations. */
export interface EntitiesRelationsOperations {
  /** Gets all relations of an entity. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    entityId: string,
    options?: EntitiesRelationsListOptionalParams,
  ) => PagedAsyncIterableIterator<Relation>;
}

function _getEntitiesRelations(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      entityId: string,
      options?: EntitiesRelationsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, entityId, options),
  };
}

export function _getEntitiesRelationsOperations(
  context: SecurityInsightsContext,
): EntitiesRelationsOperations {
  return {
    ..._getEntitiesRelations(context),
  };
}
