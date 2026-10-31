// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByServer,
  createOrUpdate,
  get,
} from "../../api/serverConnectionPolicies/operations.js";
import type {
  ServerConnectionPoliciesListByServerOptionalParams,
  ServerConnectionPoliciesCreateOrUpdateOptionalParams,
  ServerConnectionPoliciesGetOptionalParams,
} from "../../api/serverConnectionPolicies/options.js";
import type { ServerConnectionPolicy, ConnectionPolicyName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerConnectionPolicies operations. */
export interface ServerConnectionPoliciesOperations {
  /** Lists connection policy */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerConnectionPoliciesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ServerConnectionPolicy>;
  /** Updates a server connection policy */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    connectionPolicyName: ConnectionPolicyName,
    parameters: ServerConnectionPolicy,
    options?: ServerConnectionPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerConnectionPolicy>, ServerConnectionPolicy>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    connectionPolicyName: ConnectionPolicyName,
    parameters: ServerConnectionPolicy,
    options?: ServerConnectionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServerConnectionPolicy>, ServerConnectionPolicy>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    connectionPolicyName: ConnectionPolicyName,
    parameters: ServerConnectionPolicy,
    options?: ServerConnectionPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ServerConnectionPolicy>;
  /** Gets a server connection policy */
  get: (
    resourceGroupName: string,
    serverName: string,
    connectionPolicyName: ConnectionPolicyName,
    options?: ServerConnectionPoliciesGetOptionalParams,
  ) => Promise<ServerConnectionPolicy>;
}

function _getServerConnectionPolicies(context: SqlManagementContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerConnectionPoliciesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      connectionPolicyName: ConnectionPolicyName,
      parameters: ServerConnectionPolicy,
      options?: ServerConnectionPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        connectionPolicyName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      connectionPolicyName: ConnectionPolicyName,
      parameters: ServerConnectionPolicy,
      options?: ServerConnectionPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        connectionPolicyName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      connectionPolicyName: ConnectionPolicyName,
      parameters: ServerConnectionPolicy,
      options?: ServerConnectionPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        connectionPolicyName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      connectionPolicyName: ConnectionPolicyName,
      options?: ServerConnectionPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, connectionPolicyName, options),
  };
}

export function _getServerConnectionPoliciesOperations(
  context: SqlManagementContext,
): ServerConnectionPoliciesOperations {
  return {
    ..._getServerConnectionPolicies(context),
  };
}
