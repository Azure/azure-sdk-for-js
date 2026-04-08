// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SqlManagementContext } from "../../api/sqlManagementContext.js";
import {
  listByServer,
  $delete,
  createOrUpdate,
  get,
} from "../../api/serverAzureADAdministrators/operations.js";
import type {
  ServerAzureADAdministratorsListByServerOptionalParams,
  ServerAzureADAdministratorsDeleteOptionalParams,
  ServerAzureADAdministratorsCreateOrUpdateOptionalParams,
  ServerAzureADAdministratorsGetOptionalParams,
} from "../../api/serverAzureADAdministrators/options.js";
import type { AdministratorName, ServerAzureADAdministrator } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServerAzureADAdministrators operations. */
export interface ServerAzureADAdministratorsOperations {
  /** Gets a list of Azure Active Directory administrators in a server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: ServerAzureADAdministratorsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<ServerAzureADAdministrator>;
  /** Deletes the Azure Active Directory administrator with the given name. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    options?: ServerAzureADAdministratorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    options?: ServerAzureADAdministratorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    options?: ServerAzureADAdministratorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an existing Azure Active Directory administrator. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    parameters: ServerAzureADAdministrator,
    options?: ServerAzureADAdministratorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServerAzureADAdministrator>, ServerAzureADAdministrator>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    parameters: ServerAzureADAdministrator,
    options?: ServerAzureADAdministratorsCreateOrUpdateOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<ServerAzureADAdministrator>, ServerAzureADAdministrator>
  >;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    parameters: ServerAzureADAdministrator,
    options?: ServerAzureADAdministratorsCreateOrUpdateOptionalParams,
  ) => Promise<ServerAzureADAdministrator>;
  /** Gets a Azure Active Directory administrator. */
  get: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    options?: ServerAzureADAdministratorsGetOptionalParams,
  ) => Promise<ServerAzureADAdministrator>;
}

function _getServerAzureADAdministrators(context: SqlManagementContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: ServerAzureADAdministratorsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      administratorName: AdministratorName,
      options?: ServerAzureADAdministratorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, administratorName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      administratorName: AdministratorName,
      options?: ServerAzureADAdministratorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, administratorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      administratorName: AdministratorName,
      options?: ServerAzureADAdministratorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, administratorName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      administratorName: AdministratorName,
      parameters: ServerAzureADAdministrator,
      options?: ServerAzureADAdministratorsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        administratorName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serverName: string,
      administratorName: AdministratorName,
      parameters: ServerAzureADAdministrator,
      options?: ServerAzureADAdministratorsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        administratorName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serverName: string,
      administratorName: AdministratorName,
      parameters: ServerAzureADAdministrator,
      options?: ServerAzureADAdministratorsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serverName,
        administratorName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serverName: string,
      administratorName: AdministratorName,
      options?: ServerAzureADAdministratorsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, administratorName, options),
  };
}

export function _getServerAzureADAdministratorsOperations(
  context: SqlManagementContext,
): ServerAzureADAdministratorsOperations {
  return {
    ..._getServerAzureADAdministrators(context),
  };
}
