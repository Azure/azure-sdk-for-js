// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { MySQLManagementFlexibleServerContext } from "../../api/mySQLManagementFlexibleServerContext.js";
import {
  listByServer,
  $delete,
  createOrUpdate,
  get,
} from "../../api/azureADAdministrators/operations.js";
import type {
  AzureADAdministratorsListByServerOptionalParams,
  AzureADAdministratorsDeleteOptionalParams,
  AzureADAdministratorsCreateOrUpdateOptionalParams,
  AzureADAdministratorsGetOptionalParams,
} from "../../api/azureADAdministrators/options.js";
import type { AzureADAdministrator, AdministratorName } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AzureADAdministrators operations. */
export interface AzureADAdministratorsOperations {
  /** List all the AAD administrators in a given server. */
  listByServer: (
    resourceGroupName: string,
    serverName: string,
    options?: AzureADAdministratorsListByServerOptionalParams,
  ) => PagedAsyncIterableIterator<AzureADAdministrator>;
  /** Deletes an Azure AD Administrator. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    options?: AzureADAdministratorsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Creates or updates an existing Azure Active Directory administrator. */
  createOrUpdate: (
    resourceGroupName: string,
    serverName: string,
    administratorName: AdministratorName,
    parameters: AzureADAdministrator,
    options?: AzureADAdministratorsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AzureADAdministrator>, AzureADAdministrator>;
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
