// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByServer,
  createOrUpdate,
  get,
} from "../../api/serverBlobAuditingPolicies/operations.js";
import type {
  ServerBlobAuditingPoliciesListByServerOptionalParams,
  ServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ServerBlobAuditingPoliciesGetOptionalParams,
} from "../../api/serverBlobAuditingPolicies/options.js";
import type { ServerBlobAuditingPolicy } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerBlobAuditingPolicies operations. */
export interface ServerBlobAuditingPoliciesOperations {
  /** Lists auditing settings of a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerBlobAuditingPoliciesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ServerBlobAuditingPolicy>;
  /** Creates or updates a server's blob auditing policy. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerBlobAuditingPolicy,
    options?: ServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerBlobAuditingPolicy>, ServerBlobAuditingPolicy>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerBlobAuditingPolicy,
    options?: ServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ServerBlobAuditingPolicy>, ServerBlobAuditingPolicy>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    parameters: ServerBlobAuditingPolicy,
    options?: ServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ServerBlobAuditingPolicy>;
  /** Gets a server's blob auditing policy. */
  get: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerBlobAuditingPoliciesGetOptionalParams,
  ) => Promise<ServerBlobAuditingPolicy>;
}

function _getServerBlobAuditingPolicies(context: SqlManagementContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerBlobAuditingPoliciesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerBlobAuditingPolicy,
      options?: ServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serverName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerBlobAuditingPolicy,
      options?: ServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(context, resourceGroupName, serverName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      parameters: ServerBlobAuditingPolicy,
      options?: ServerBlobAuditingPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(context, resourceGroupName, serverName, parameters, options);
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerBlobAuditingPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, options),
  };
}

export function _getServerBlobAuditingPoliciesOperations(
  context: SqlManagementContext,
): ServerBlobAuditingPoliciesOperations {
  return {
    ..._getServerBlobAuditingPolicies(context),
  };
}
