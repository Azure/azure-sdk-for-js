// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PostgreSQLManagementFlexibleServerContext } from "../../api/postgreSQLManagementFlexibleServerContext.js";
import { createOrUpdate, get, list } from "../../api/dbAgents/operations.js";
import type {
  DbAgentsCreateOrUpdateOptionalParams,
  DbAgentsGetOptionalParams,
  DbAgentsListOptionalParams,
} from "../../api/dbAgents/options.js";
import type { DbAgent, DbAgentForUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a DbAgents operations. */
export interface DbAgentsOperations {
  /** Enables or disables the database agent for a flexible server. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    resource: DbAgentForUpdate,
    options?: DbAgentsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DbAgent>, DbAgent>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    resource: DbAgentForUpdate,
    options?: DbAgentsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DbAgent>, DbAgent>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    resource: DbAgentForUpdate,
    options?: DbAgentsCreateOrUpdateOptionalParams,
  ) => Promise<DbAgent>;
  /** Gets the database agent configuration for a flexible server. */
  get: (
    resourceGroupName: string,
    serverName: string,
    options?: DbAgentsGetOptionalParams,
  ) => Promise<DbAgent>;
  /** Lists the database agent configuration for a flexible server. */
  list: (
    resourceGroupName: string,
    serverName: string,
    options?: DbAgentsListOptionalParams,
  ) => PagedAsyncIterableIterator<DbAgent>;
}

function _getDbAgents(context: PostgreSQLManagementFlexibleServerContext) {
  return {
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      resource: DbAgentForUpdate,
      options?: DbAgentsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, resource, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      resource: DbAgentForUpdate,
      options?: DbAgentsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, serverName, resource, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      resource: DbAgentForUpdate,
      options?: DbAgentsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, serverName, resource, options);
    },
    get: (resourceGroupName: string, serverName: string, options?: DbAgentsGetOptionalParams) =>
      get(context, resourceGroupName, serverName, options),
    list: (resourceGroupName: string, serverName: string, options?: DbAgentsListOptionalParams) =>
      list(context, resourceGroupName, serverName, options),
  };
}

export function _getDbAgentsOperations(
  context: PostgreSQLManagementFlexibleServerContext,
): DbAgentsOperations {
  return {
    ..._getDbAgents(context),
  };
}
