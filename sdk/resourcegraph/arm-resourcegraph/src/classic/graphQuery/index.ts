// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ResourceGraphContext } from "../../api/resourceGraphContext.js";
import {
  listBySubscription,
  list,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/graphQuery/operations.js";
import type {
  GraphQueryListBySubscriptionOptionalParams,
  GraphQueryListOptionalParams,
  GraphQueryDeleteOptionalParams,
  GraphQueryUpdateOptionalParams,
  GraphQueryCreateOrUpdateOptionalParams,
  GraphQueryGetOptionalParams,
} from "../../api/graphQuery/options.js";
import type {
  GraphQueryResource,
  GraphQueryUpdateParameters,
} from "../../models/graphQueryApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GraphQuery operations. */
export interface GraphQueryOperations {
  /** Get all graph queries defined within a specified subscription. */
  listBySubscription: (
    options?: GraphQueryListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<GraphQueryResource>;
  /** Get all graph queries defined within a specified subscription and resource group. */
  list: (
    resourceGroupName: string,
    options?: GraphQueryListOptionalParams,
  ) => PagedAsyncIterableIterator<GraphQueryResource>;
  /** Delete a graph query. */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    options?: GraphQueryDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a graph query that has already been added. */
  update: (
    resourceGroupName: string,
    resourceName: string,
    body: GraphQueryUpdateParameters,
    options?: GraphQueryUpdateOptionalParams,
  ) => Promise<GraphQueryResource>;
  /** Create a new graph query. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    properties: GraphQueryResource,
    options?: GraphQueryCreateOrUpdateOptionalParams,
  ) => Promise<GraphQueryResource>;
  /** Get a single graph query by its resourceName. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    options?: GraphQueryGetOptionalParams,
  ) => Promise<GraphQueryResource>;
}

function _getGraphQuery(context: ResourceGraphContext) {
  return {
    listBySubscription: (options?: GraphQueryListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    list: (resourceGroupName: string, options?: GraphQueryListOptionalParams) =>
      list(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      options?: GraphQueryDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, resourceName, options),
    update: (
      resourceGroupName: string,
      resourceName: string,
      body: GraphQueryUpdateParameters,
      options?: GraphQueryUpdateOptionalParams,
    ) => update(context, resourceGroupName, resourceName, body, options),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      properties: GraphQueryResource,
      options?: GraphQueryCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, resourceName, properties, options),
    get: (resourceGroupName: string, resourceName: string, options?: GraphQueryGetOptionalParams) =>
      get(context, resourceGroupName, resourceName, options),
  };
}

export function _getGraphQueryOperations(context: ResourceGraphContext): GraphQueryOperations {
  return {
    ..._getGraphQuery(context),
  };
}
