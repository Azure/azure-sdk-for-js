// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import {
  listByServer,
  $delete,
  createOrUpdate,
  get,
} from "../../api/azureADAdministrators/operations.js";
import {
  AzureADAdministratorsListByServerOptionalParams,
  AzureADAdministratorsDeleteOptionalParams,
  AzureADAdministratorsCreateOrUpdateOptionalParams,
  AzureADAdministratorsGetOptionalParams,
} from "../../api/azureADAdministrators/options.js";
import { AzureADAdministrator, AdministratorName } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AzureADAdministrators operations. */
export interface AzureADAdministratorsOperations {
  /** List all the AAD administrators in a given server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: AzureADAdministratorsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<AzureADAdministrator>;
  /** Deletes an Azure AD Administrator. */
  delete: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    options?: AzureADAdministratorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    options?: AzureADAdministratorsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    options?: AzureADAdministratorsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an existing Azure Active Directory administrator. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    parameters: AzureADAdministrator,
    options?: AzureADAdministratorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AzureADAdministrator>, AzureADAdministrator>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    parameters: AzureADAdministrator,
    options?: AzureADAdministratorsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<AzureADAdministrator>, AzureADAdministrator>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    parameters: AzureADAdministrator,
    options?: AzureADAdministratorsCreateOrUpdateOptionalParams,
  ) => Promise<AzureADAdministrator>;
  /** Gets information about an azure ad administrator. */
  get: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    options?: AzureADAdministratorsGetOptionalParams,
  ) => Promise<AzureADAdministrator>;
}

function _getAzureADAdministrators(context: MySQLManagementFlexibleServerContext) {
  return {
    listByServer: (
      resourceGroupName: string,
      serverName: string,
      options?: AzureADAdministratorsListByServerOptionalParams,
    ) => listByServer(context, resourceGroupName, serverName, options),
    delete: (
      resourceGroupName: string,
      serverName: string,
      administratorName: AdministratorName,
      options?: AzureADAdministratorsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serverName, administratorName, options),
    beginDelete: async (
      resourceGroupName: string,
      serverName: string,
      administratorName: AdministratorName,
      options?: AzureADAdministratorsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serverName, administratorName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serverName: string,
      administratorName: AdministratorName,
      options?: AzureADAdministratorsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serverName, administratorName, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      serverName: string,
      administratorName: AdministratorName,
      parameters: AzureADAdministrator,
      options?: AzureADAdministratorsCreateOrUpdateOptionalParams,
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
      parameters: AzureADAdministrator,
      options?: AzureADAdministratorsCreateOrUpdateOptionalParams,
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
      parameters: AzureADAdministrator,
      options?: AzureADAdministratorsCreateOrUpdateOptionalParams,
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
      options?: AzureADAdministratorsGetOptionalParams,
    ) => get(context, resourceGroupName, serverName, administratorName, options),
  };
}

export function _getAzureADAdministratorsOperations(
  context: MySQLManagementFlexibleServerContext,
): AzureADAdministratorsOperations {
  return {
    ..._getAzureADAdministrators(context),
  };
}
