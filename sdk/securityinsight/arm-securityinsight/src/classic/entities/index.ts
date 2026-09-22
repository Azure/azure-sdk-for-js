// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityInsightsContext } from "../../api/securityInsightsContext.js";
import {
  getInsights,
  queries,
  expand,
  runPlaybook,
  list,
  get,
} from "../../api/entities/operations.js";
import type {
  EntitiesGetInsightsOptionalParams,
  EntitiesQueriesOptionalParams,
  EntitiesExpandOptionalParams,
  EntitiesRunPlaybookOptionalParams,
  EntitiesListOptionalParams,
  EntitiesGetOptionalParams,
} from "../../api/entities/options.js";
import type {
  EntityUnion,
  EntityExpandParameters,
  EntityExpandResponse,
  EntityQueryItemUnion,
  EntityGetInsightsParameters,
  EntityGetInsightsResponse,
  EntityItemQueryKind,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Entities operations. */
export interface EntitiesOperations {
  /** Execute Insights for an entity. */
  getInsights: (
    resourceGroupName: string,
    workspaceName: string,
    entityId: string,
    parameters: EntityGetInsightsParameters,
    options?: EntitiesGetInsightsOptionalParams,
  ) => Promise<EntityGetInsightsResponse>;
  /** Get Insights and Activities for an entity. */
  queries: (
    resourceGroupName: string,
    workspaceName: string,
    entityId: string,
    kind: EntityItemQueryKind,
    options?: EntitiesQueriesOptionalParams,
  ) => PagedAsyncIterableIterator<EntityQueryItemUnion>;
  /** Expands an entity. */
  expand: (
    resourceGroupName: string,
    workspaceName: string,
    entityId: string,
    parameters: EntityExpandParameters,
    options?: EntitiesExpandOptionalParams,
  ) => Promise<EntityExpandResponse>;
  /** Triggers playbook on a specific entity. */
  runPlaybook: (
    resourceGroupName: string,
    workspaceName: string,
    entityIdentifier: string,
    options?: EntitiesRunPlaybookOptionalParams,
  ) => Promise<void>;
  /** Gets all entities. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    options?: EntitiesListOptionalParams,
  ) => PagedAsyncIterableIterator<EntityUnion>;
  /** Gets an entity. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    entityId: string,
    options?: EntitiesGetOptionalParams,
  ) => Promise<EntityUnion>;
}

function _getEntities(context: SecurityInsightsContext) {
  return {
    getInsights: (
      resourceGroupName: string,
      workspaceName: string,
      entityId: string,
      parameters: EntityGetInsightsParameters,
      options?: EntitiesGetInsightsOptionalParams,
    ) => getInsights(context, resourceGroupName, workspaceName, entityId, parameters, options),
    queries: (
      resourceGroupName: string,
      workspaceName: string,
      entityId: string,
      kind: EntityItemQueryKind,
      options?: EntitiesQueriesOptionalParams,
    ) => queries(context, resourceGroupName, workspaceName, entityId, kind, options),
    expand: (
      resourceGroupName: string,
      workspaceName: string,
      entityId: string,
      parameters: EntityExpandParameters,
      options?: EntitiesExpandOptionalParams,
    ) => expand(context, resourceGroupName, workspaceName, entityId, parameters, options),
    runPlaybook: (
      resourceGroupName: string,
      workspaceName: string,
      entityIdentifier: string,
      options?: EntitiesRunPlaybookOptionalParams,
    ) => runPlaybook(context, resourceGroupName, workspaceName, entityIdentifier, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      options?: EntitiesListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      entityId: string,
      options?: EntitiesGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, entityId, options),
  };
}

export function _getEntitiesOperations(context: SecurityInsightsContext): EntitiesOperations {
  return {
    ..._getEntities(context),
  };
}
