// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  listByAuthorization,
  $delete,
  createOrUpdate,
  get,
} from "../../api/authorizationAccessPolicy/operations.js";
import type {
  AuthorizationAccessPolicyListByAuthorizationOptionalParams,
  AuthorizationAccessPolicyDeleteOptionalParams,
  AuthorizationAccessPolicyCreateOrUpdateOptionalParams,
  AuthorizationAccessPolicyGetOptionalParams,
} from "../../api/authorizationAccessPolicy/options.js";
import type { AuthorizationAccessPolicyContract } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a AuthorizationAccessPolicy operations. */
export interface AuthorizationAccessPolicyOperations {
  /** Lists a collection of authorization access policy defined within a authorization. */
  listByAuthorization: (
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    authorizationId: string,
    options?: AuthorizationAccessPolicyListByAuthorizationOptionalParams,
  ) => PagedAsyncIterableIterator<AuthorizationAccessPolicyContract>;
  /** Deletes specific access policy from the Authorization. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    authorizationId: string,
    authorizationAccessPolicyId: string,
    ifMatch: string,
    options?: AuthorizationAccessPolicyDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates Authorization Access Policy. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    authorizationId: string,
    authorizationAccessPolicyId: string,
    parameters: AuthorizationAccessPolicyContract,
    options?: AuthorizationAccessPolicyCreateOrUpdateOptionalParams,
  ) => Promise<AuthorizationAccessPolicyContract>;
  /** Gets the details of the authorization access policy specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    authorizationId: string,
    authorizationAccessPolicyId: string,
    options?: AuthorizationAccessPolicyGetOptionalParams,
  ) => Promise<AuthorizationAccessPolicyContract>;
}

function _getAuthorizationAccessPolicy(context: ApiManagementContext) {
  return {
    listByAuthorization: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      authorizationId: string,
      options?: AuthorizationAccessPolicyListByAuthorizationOptionalParams,
    ) =>
      listByAuthorization(
        context,
        resourceGroupName,
        serviceName,
        authorizationProviderId,
        authorizationId,
        options,
      ),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      authorizationId: string,
      authorizationAccessPolicyId: string,
      ifMatch: string,
      options?: AuthorizationAccessPolicyDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        authorizationProviderId,
        authorizationId,
        authorizationAccessPolicyId,
        ifMatch,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      authorizationId: string,
      authorizationAccessPolicyId: string,
      parameters: AuthorizationAccessPolicyContract,
      options?: AuthorizationAccessPolicyCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        authorizationProviderId,
        authorizationId,
        authorizationAccessPolicyId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      authorizationId: string,
      authorizationAccessPolicyId: string,
      options?: AuthorizationAccessPolicyGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serviceName,
        authorizationProviderId,
        authorizationId,
        authorizationAccessPolicyId,
        options,
      ),
  };
}

export function _getAuthorizationAccessPolicyOperations(
  context: ApiManagementContext,
): AuthorizationAccessPolicyOperations {
  return {
    ..._getAuthorizationAccessPolicy(context),
  };
}
