// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByServer,
  createOrUpdate,
  get,
} from "../../api/serverSecurityAlertPolicies/operations.js";
import {
  ServerSecurityAlertPoliciesListByServerOptionalParams,
  ServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ServerSecurityAlertPoliciesGetOptionalParams,
} from "../../api/serverSecurityAlertPolicies/options.js";
import { SecurityAlertPolicyName, ServerSecurityAlertPolicy } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerSecurityAlertPolicies operations. */
export interface ServerSecurityAlertPoliciesOperations {
  /** Get the server's threat detection policies. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerSecurityAlertPoliciesListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ServerSecurityAlertPolicy>;
  /** Creates or updates a threat detection policy. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    parameters: ServerSecurityAlertPolicy,
    options?: ServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerSecurityAlertPolicy>, ServerSecurityAlertPolicy>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    parameters: ServerSecurityAlertPolicy,
    options?: ServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ServerSecurityAlertPolicy>, ServerSecurityAlertPolicy>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    parameters: ServerSecurityAlertPolicy,
    options?: ServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ServerSecurityAlertPolicy>;
  /** Get a server's security alert policy. */
  get: (
    resourceGroupName: string,
    serverName: string,
    securityAlertPolicyName: SecurityAlertPolicyName,
    options?: ServerSecurityAlertPoliciesGetOptionalParams,
  ) => Promise<ServerSecurityAlertPolicy>;
}

function _getServerSecurityAlertPolicies(context: SqlManagementContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerSecurityAlertPoliciesListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      securityAlertPolicyName: SecurityAlertPolicyName,
      parameters: ServerSecurityAlertPolicy,
      options?: ServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        securityAlertPolicyName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      securityAlertPolicyName: SecurityAlertPolicyName,
      parameters: ServerSecurityAlertPolicy,
      options?: ServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        securityAlertPolicyName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      securityAlertPolicyName: SecurityAlertPolicyName,
      parameters: ServerSecurityAlertPolicy,
      options?: ServerSecurityAlertPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        securityAlertPolicyName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      securityAlertPolicyName: SecurityAlertPolicyName,
      options?: ServerSecurityAlertPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, securityAlertPolicyName, options),
  };
}

export function _getServerSecurityAlertPoliciesOperations(
  context: SqlManagementContext,
): ServerSecurityAlertPoliciesOperations {
  return {
    ..._getServerSecurityAlertPolicies(context),
  };
}
