// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  getSharedAccessToken,
  generateSsoUrl,
  listByService,
  $delete,
  update,
  createOrUpdate,
  getEntityTag,
  get,
} from "../../api/user/operations.js";
import type {
  UserGetSharedAccessTokenOptionalParams,
  UserGenerateSsoUrlOptionalParams,
  UserListByServiceOptionalParams,
  UserDeleteOptionalParams,
  UserUpdateOptionalParams,
  UserCreateOrUpdateOptionalParams,
  UserGetEntityTagOptionalParams,
  UserGetOptionalParams,
} from "../../api/user/options.js";
import type {
  UserContract,
  UserCreateParameters,
  UserUpdateParameters,
  GenerateSsoUrlResult,
  UserTokenParameters,
  UserTokenResult,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a User operations. */
export interface UserOperations {
  /** Gets the Shared Access Authorization Token for the User. */
  getSharedAccessToken: (
    resourceGroupName: string,
    serviceName: string,
    userId: string,
    parameters: UserTokenParameters,
    options?: UserGetSharedAccessTokenOptionalParams,
  ) => Promise<UserTokenResult>;
  /** Retrieves a redirection URL containing an authentication token for signing a given user into the developer portal. */
  generateSsoUrl: (
    resourceGroupName: string,
    serviceName: string,
    userId: string,
    options?: UserGenerateSsoUrlOptionalParams,
  ) => Promise<GenerateSsoUrlResult>;
  /** Lists a collection of registered users in the specified service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: UserListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<UserContract>;
  /** Deletes specific user. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    userId: string,
    ifMatch: string,
    options?: UserDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the details of the user specified by its identifier. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    userId: string,
    ifMatch: string,
    parameters: UserUpdateParameters,
    options?: UserUpdateOptionalParams,
  ) => Promise<UserContract>;
  /** Creates or Updates a user. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    userId: string,
    parameters: UserCreateParameters,
    options?: UserCreateOrUpdateOptionalParams,
  ) => Promise<UserContract>;
  /** Gets the entity state (Etag) version of the user specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    userId: string,
    options?: UserGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the details of the user specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    userId: string,
    options?: UserGetOptionalParams,
  ) => Promise<UserContract>;
}

function _getUser(context: ApiManagementContext) {
  return {
    getSharedAccessToken: (
      resourceGroupName: string,
      serviceName: string,
      userId: string,
      parameters: UserTokenParameters,
      options?: UserGetSharedAccessTokenOptionalParams,
    ) => getSharedAccessToken(context, resourceGroupName, serviceName, userId, parameters, options),
    generateSsoUrl: (
      resourceGroupName: string,
      serviceName: string,
      userId: string,
      options?: UserGenerateSsoUrlOptionalParams,
    ) => generateSsoUrl(context, resourceGroupName, serviceName, userId, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: UserListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      userId: string,
      ifMatch: string,
      options?: UserDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, userId, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      userId: string,
      ifMatch: string,
      parameters: UserUpdateParameters,
      options?: UserUpdateOptionalParams,
    ) => update(context, resourceGroupName, serviceName, userId, ifMatch, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      userId: string,
      parameters: UserCreateParameters,
      options?: UserCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceName, userId, parameters, options),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      userId: string,
      options?: UserGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, userId, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      userId: string,
      options?: UserGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, userId, options),
  };
}

export function _getUserOperations(context: ApiManagementContext): UserOperations {
  return {
    ..._getUser(context),
  };
}
