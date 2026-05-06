// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import { list, $delete, createOrUpdate, get } from "../../api/entityQueries/operations.js";
import {
  EntityQueriesListOptionalParams,
  EntityQueriesDeleteOptionalParams,
  EntityQueriesCreateOrUpdateOptionalParams,
  EntityQueriesGetOptionalParams,
} from "../../api/entityQueries/options.js";
import { EntityQueryUnion, CustomEntityQueryUnion } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EntityQueries operations. */
export interface EntityQueriesOperations {
  /** Gets all entity queries. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: EntityQueriesListOptionalParams,
  ) => PagedAsyncIterableIterator<EntityQueryUnion>;
  /** Delete the entity query. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    entityQueryId: string,
    options?: EntityQueriesDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates the entity query. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    entityQueryId: string,
    entityQuery: CustomEntityQueryUnion,
    options?: EntityQueriesCreateOrUpdateOptionalParams,
  ) => Promise<EntityQueryUnion>;
  /** Gets an entity query. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    entityQueryId: string,
    options?: EntityQueriesGetOptionalParams,
  ) => Promise<EntityQueryUnion>;
}

function _getEntityQueries(context: SecurityInsightsContext) {
  return {
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: EntityQueriesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      entityQueryId: string,
      options?: EntityQueriesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, entityQueryId, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      entityQueryId: string,
      entityQuery: CustomEntityQueryUnion,
      options?: EntityQueriesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        workspaceName,
        entityQueryId,
        entityQuery,
        options,
      ),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      entityQueryId: string,
      options?: EntityQueriesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, entityQueryId, options),
  };
}

export function _getEntityQueriesOperations(
  context: SecurityInsightsContext,
): EntityQueriesOperations {
  return {
    ..._getEntityQueries(context),
  };
}
