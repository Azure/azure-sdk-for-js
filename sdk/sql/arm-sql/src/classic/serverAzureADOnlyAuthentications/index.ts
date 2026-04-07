// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlContext } from "../../api/sqlContext.js";
import {
  listByServer,
  $delete,
  createOrUpdate,
  get,
} from "../../api/serverAzureADOnlyAuthentications/operations.js";
import type {
  ServerAzureADOnlyAuthenticationsListByServerOptionalParams,
  ServerAzureADOnlyAuthenticationsDeleteOptionalParams,
  ServerAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
  ServerAzureADOnlyAuthenticationsGetOptionalParams,
} from "../../api/serverAzureADOnlyAuthentications/options.js";
import type { AuthenticationName, ServerAzureADOnlyAuthentication } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerAzureADOnlyAuthentications operations. */
export interface ServerAzureADOnlyAuthenticationsOperations {
  /** Gets a list of server Azure Active Directory only authentications. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerAzureADOnlyAuthenticationsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ServerAzureADOnlyAuthentication>;
  /** Deletes an existing server Active Directory only authentication property. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    authenticationName: AuthenticationName,
    options?: ServerAzureADOnlyAuthenticationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    authenticationName: AuthenticationName,
    options?: ServerAzureADOnlyAuthenticationsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    authenticationName: AuthenticationName,
    options?: ServerAzureADOnlyAuthenticationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Sets Server Active Directory only authentication property or updates an existing server Active Directory only authentication property. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    authenticationName: AuthenticationName,
    parameters: ServerAzureADOnlyAuthentication,
    options?: ServerAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerAzureADOnlyAuthentication>, ServerAzureADOnlyAuthentication>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    authenticationName: AuthenticationName,
    parameters: ServerAzureADOnlyAuthentication,
    options?: ServerAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<
      OperationState<ServerAzureADOnlyAuthentication>,
      ServerAzureADOnlyAuthentication
    >
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    authenticationName: AuthenticationName,
    parameters: ServerAzureADOnlyAuthentication,
    options?: ServerAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
  ) => Promise<ServerAzureADOnlyAuthentication>;
  /** Gets a specific Azure Active Directory only authentication property. */
  get: (
    resourceGroupName: string,
    serverName: string,
    authenticationName: AuthenticationName,
    options?: ServerAzureADOnlyAuthenticationsGetOptionalParams,
  ) => Promise<ServerAzureADOnlyAuthentication>;
}

function _getServerAzureADOnlyAuthentications(context: SqlContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerAzureADOnlyAuthenticationsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      authenticationName: AuthenticationName,
      options?: ServerAzureADOnlyAuthenticationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, authenticationName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      authenticationName: AuthenticationName,
      options?: ServerAzureADOnlyAuthenticationsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, authenticationName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      authenticationName: AuthenticationName,
      options?: ServerAzureADOnlyAuthenticationsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, authenticationName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      authenticationName: AuthenticationName,
      parameters: ServerAzureADOnlyAuthentication,
      options?: ServerAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        authenticationName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      authenticationName: AuthenticationName,
      parameters: ServerAzureADOnlyAuthentication,
      options?: ServerAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        authenticationName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      authenticationName: AuthenticationName,
      parameters: ServerAzureADOnlyAuthentication,
      options?: ServerAzureADOnlyAuthenticationsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        authenticationName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      authenticationName: AuthenticationName,
      options?: ServerAzureADOnlyAuthenticationsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, authenticationName, options),
  };
}

export function _getServerAzureADOnlyAuthenticationsOperations(
  context: SqlContext,
): ServerAzureADOnlyAuthenticationsOperations {
  return {
    ..._getServerAzureADOnlyAuthentications(context),
  };
}
