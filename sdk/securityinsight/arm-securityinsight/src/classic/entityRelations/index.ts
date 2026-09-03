// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { getRelation } from "../../api/entityRelations/operations.js";
import type { EntityRelationsGetRelationOptionalParams } from "../../api/entityRelations/options.js";
import type { Relation } from "../../models/models.js";

/** Interface representing a EntityRelations operations. */
export interface EntityRelationsOperations {
  /** Gets an entity relation. */
  getRelation: (
    resourceGroupName: string,
    workspaceName: string,
    entityId: string,
    relationName: string,
    options?: EntityRelationsGetRelationOptionalParams,
  ) => Promise<Relation>;
}

function _getEntityRelations(context: SecurityInsightsContext) {
  return {
    getRelation: (
      resourceGroupName: string,
      workspaceName: string,
      entityId: string,
      relationName: string,
      options?: EntityRelationsGetRelationOptionalParams,
    ) => getRelation(context, resourceGroupName, workspaceName, entityId, relationName, options),
  };
}

export function _getEntityRelationsOperations(
  context: SecurityInsightsContext,
): EntityRelationsOperations {
  return {
    ..._getEntityRelations(context),
  };
}
