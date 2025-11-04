// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RedisManagementContext } from "../../api/redisManagementContext.js";
import { list, $delete, create, get } from "../../api/linkedServer/operations.js";
import type {
  LinkedServerListOptionalParams,
  LinkedServerDeleteOptionalParams,
  LinkedServerCreateOptionalParams,
  LinkedServerGetOptionalParams,
} from "../../api/linkedServer/options.js";
import type {
  RedisLinkedServerWithProperties,
  RedisLinkedServerCreateParameters,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a LinkedServer operations. */
export interface LinkedServerOperations {
  /** Gets the list of linked servers associated with this redis cache (requires Premium SKU). */
  list: (
    resourceGroupName: string,
    name: string,
    options?: LinkedServerListOptionalParams,
  ) => PagedAsyncIterableIterator<RedisLinkedServerWithProperties>;
  /** Deletes the linked server from a redis cache (requires Premium SKU). */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    name: string,
    linkedServerName: string,
    options?: LinkedServerDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Adds a linked server to the Redis cache (requires Premium SKU). */
  create: (
    resourceGroupName: string,
    name: string,
    linkedServerName: string,
    parameters: RedisLinkedServerCreateParameters,
    options?: LinkedServerCreateOptionalParams,
  ) => PollerLike<OperationState<RedisLinkedServerWithProperties>, RedisLinkedServerWithProperties>;
  /** Gets the detailed information about a linked server of a redis cache (requires Premium SKU). */
  get: (
    resourceGroupName: string,
    name: string,
    linkedServerName: string,
    options?: LinkedServerGetOptionalParams,
  ) => Promise<RedisLinkedServerWithProperties>;
}

function _getLinkedServer(context: RedisManagementContext) {
  return {
    list: (resourceGroupName: string, name: string, options?: LinkedServerListOptionalParams) =>
      list(context, resourceGroupName, name, options),
    delete: (
      resourceGroupName: string,
      name: string,
      linkedServerName: string,
      options?: LinkedServerDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, name, linkedServerName, options),
    create: (
      resourceGroupName: string,
      name: string,
      linkedServerName: string,
      parameters: RedisLinkedServerCreateParameters,
      options?: LinkedServerCreateOptionalParams,
    ) => create(context, resourceGroupName, name, linkedServerName, parameters, options),
    get: (
      resourceGroupName: string,
      name: string,
      linkedServerName: string,
      options?: LinkedServerGetOptionalParams,
    ) => get(context, resourceGroupName, name, linkedServerName, options),
  };
}

export function _getLinkedServerOperations(
  context: RedisManagementContext,
): LinkedServerOperations {
  return {
    ..._getLinkedServer(context),
  };
}
