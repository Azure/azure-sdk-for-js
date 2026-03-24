// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  refreshSecret,
  listByService,
  $delete,
  createOrUpdate,
  get,
} from "../../api/authorizationProvider/operations.js";
import type {
  AuthorizationProviderRefreshSecretOptionalParams,
  AuthorizationProviderListByServiceOptionalParams,
  AuthorizationProviderDeleteOptionalParams,
  AuthorizationProviderCreateOrUpdateOptionalParams,
  AuthorizationProviderGetOptionalParams,
} from "../../api/authorizationProvider/options.js";
import type { AuthorizationProviderContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AuthorizationProvider operations. */
export interface AuthorizationProviderOperations {
  /** Refreshes the Key Vault reference secret for the specified authorization provider. */
  refreshSecret: (
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    options?: AuthorizationProviderRefreshSecretOptionalParams,
  ) => Promise<AuthorizationProviderContract>;
  /** Lists a collection of authorization providers defined within a service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: AuthorizationProviderListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<AuthorizationProviderContract>;
  /** Deletes specific authorization provider from the API Management service instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    ifMatch: string,
    options?: AuthorizationProviderDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates authorization provider. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    parameters: AuthorizationProviderContract,
    options?: AuthorizationProviderCreateOrUpdateOptionalParams,
  ) => Promise<AuthorizationProviderContract>;
  /** Gets the details of the authorization provider specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    options?: AuthorizationProviderGetOptionalParams,
  ) => Promise<AuthorizationProviderContract>;
}

function _getAuthorizationProvider(context: ApiManagementContext) {
  return {
    refreshSecret: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      options?: AuthorizationProviderRefreshSecretOptionalParams,
    ) => refreshSecret(context, resourceGroupName, serviceName, authorizationProviderId, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: AuthorizationProviderListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      ifMatch: string,
      options?: AuthorizationProviderDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, serviceName, authorizationProviderId, ifMatch, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      parameters: AuthorizationProviderContract,
      options?: AuthorizationProviderCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        authorizationProviderId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      options?: AuthorizationProviderGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, authorizationProviderId, options),
  };
}

export function _getAuthorizationProviderOperations(
  context: ApiManagementContext,
): AuthorizationProviderOperations {
  return {
    ..._getAuthorizationProvider(context),
  };
}
