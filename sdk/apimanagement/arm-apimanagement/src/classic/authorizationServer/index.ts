// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listSecrets,
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/authorizationServer/operations.js";
import type {
  AuthorizationServerListSecretsOptionalParams,
  AuthorizationServerListByServiceOptionalParams,
  AuthorizationServerDeleteOptionalParams,
  AuthorizationServerUpdateOptionalParams,
  AuthorizationServerCreateOrUpdateOptionalParams,
  AuthorizationServerGetEntityTagOptionalParams,
  AuthorizationServerGetOptionalParams,
} from "../../api/authorizationServer/options.js";
import type {
  AuthorizationServerContract,
  AuthorizationServerUpdateContract,
  AuthorizationServerSecretsContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AuthorizationServer operations. */
export interface AuthorizationServerOperations {
  /** Gets the client secret details of the authorization server. */
  listSecrets: (
    resourceGroupName: string,
    serviceName: string,
    authsid: string,
    options?: AuthorizationServerListSecretsOptionalParams,
  ) => Promise<AuthorizationServerSecretsContract>;
  /** Lists a collection of authorization servers defined within a service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: AuthorizationServerListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<AuthorizationServerContract>;
  /** Deletes specific authorization server instance. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    authsid: string,
    ifMatch: string,
    options?: AuthorizationServerDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates the details of the authorization server specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    authsid: string,
    ifMatch: string,
    parameters: AuthorizationServerUpdateContract,
    options?: AuthorizationServerUpdateOptionalParams,
  ) => Promise<AuthorizationServerContract>;
  /** Creates new authorization server or updates an existing authorization server. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    authsid: string,
    parameters: AuthorizationServerContract,
    options?: AuthorizationServerCreateOrUpdateOptionalParams,
  ) => Promise<AuthorizationServerContract>;
  /** Gets the entity state (Etag) version of the authorizationServer specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    authsid: string,
    options?: AuthorizationServerGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the authorization server specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    authsid: string,
    options?: AuthorizationServerGetOptionalParams,
  ) => Promise<AuthorizationServerContract>;
}

function _getAuthorizationServer(context: ApiManagementContext) {
  return {
    listSecrets: (
      resourceGroupName: string,
      serviceName: string,
      authsid: string,
      options?: AuthorizationServerListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, serviceName, authsid, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: AuthorizationServerListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      authsid: string,
      ifMatch: string,
      options?: AuthorizationServerDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, authsid, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      authsid: string,
      ifMatch: string,
      parameters: AuthorizationServerUpdateContract,
      options?: AuthorizationServerUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, authsid, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      authsid: string,
      parameters: AuthorizationServerContract,
      options?: AuthorizationServerCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, authsid, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      authsid: string,
      options?: AuthorizationServerGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, authsid, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      authsid: string,
      options?: AuthorizationServerGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, authsid, options),
  };
}

export function _getAuthorizationServerOperations(
  context: ApiManagementContext,
): AuthorizationServerOperations {
  return {
    ..._getAuthorizationServer(context),
  };
}
