// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByDatabaseAdvisor,
  update,
  get,
} from "../../api/databaseRecommendedActions/operations.js";
import type {
  DatabaseRecommendedActionsListByDatabaseAdvisorOptionalParams,
  DatabaseRecommendedActionsUpdateOptionalParams,
  DatabaseRecommendedActionsGetOptionalParams,
} from "../../api/databaseRecommendedActions/options.js";
import type { RecommendedAction } from "../../models/models.js";

/** Interface representing a DatabaseRecommendedActions operations. */
export interface DatabaseRecommendedActionsOperations {
  /** Gets list of Database Recommended Actions. */
  listByDatabaseAdvisor: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    advisorName: string,
    options?: DatabaseRecommendedActionsListByDatabaseAdvisorOptionalParams,
  ) => Promise<RecommendedAction[]>;
  /** Updates a database recommended action. */
  update: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    advisorName: string,
    recommendedActionName: string,
    parameters: RecommendedAction,
    options?: DatabaseRecommendedActionsUpdateOptionalParams,
  ) => Promise<RecommendedAction>;
  /** Gets a database recommended action. */
  get: (
    resourceGroupName: string,
    serverName: string,
    databaseName: string,
    advisorName: string,
    recommendedActionName: string,
    options?: DatabaseRecommendedActionsGetOptionalParams,
  ) => Promise<RecommendedAction>;
}

function _getDatabaseRecommendedActions(context: SqlContext) {
  return {
    listByDatabaseAdvisor: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      advisorName: string,
      options?: DatabaseRecommendedActionsListByDatabaseAdvisorOptionalParams,
    ) =>
      listByDatabaseAdvisor(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        advisorName,
        options,
      ),
    update: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      advisorName: string,
      recommendedActionName: string,
      parameters: RecommendedAction,
      options?: DatabaseRecommendedActionsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        advisorName,
        recommendedActionName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serverName: string,
      databaseName: string,
      advisorName: string,
      recommendedActionName: string,
      options?: DatabaseRecommendedActionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serverName,
        databaseName,
        advisorName,
        recommendedActionName,
        options,
      ),
  };
}

export function _getDatabaseRecommendedActionsOperations(
  context: SqlContext,
): DatabaseRecommendedActionsOperations {
  return {
    ..._getDatabaseRecommendedActions(context),
  };
}
