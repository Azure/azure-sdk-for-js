// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { ExpressRouteAuthorization } from "../../models/models.js";
import {
  AuthorizationsDeleteOptionalParams,
  AuthorizationsCreateOrUpdateOptionalParams,
  AuthorizationsGetOptionalParams,
  AuthorizationsListOptionalParams,
} from "../../api/authorizations/options.js";
import { $delete, createOrUpdate, get, list } from "../../api/authorizations/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Authorizations operations. */
export interface AuthorizationsOperations {
  /** Delete a ExpressRouteAuthorization */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    privateCloudName: string,
    authorizationName: string,
    options?: AuthorizationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a ExpressRouteAuthorization */
  createOrUpdate: (
    resourceGroupName: string,
    privateCloudName: string,
    authorizationName: string,
    authorization: ExpressRouteAuthorization,
    options?: AuthorizationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpressRouteAuthorization>, ExpressRouteAuthorization>;
  /** Get a ExpressRouteAuthorization */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    authorizationName: string,
    options?: AuthorizationsGetOptionalParams,
  ) => Promise<ExpressRouteAuthorization>;
  /** List ExpressRouteAuthorization resources by PrivateCloud */
  list: (
    resourceGroupName: string,
    privateCloudName: string,
    options?: AuthorizationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteAuthorization>;
}

function _getAuthorizations(context: AzureVMwareSolutionAPIContext) {
  return {
    delete: (
      resourceGroupName: string,
      privateCloudName: string,
      authorizationName: string,
      options?: AuthorizationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, privateCloudName, authorizationName, options),
    createOrUpdate: (
      resourceGroupName: string,
      privateCloudName: string,
      authorizationName: string,
      authorization: ExpressRouteAuthorization,
      options?: AuthorizationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateCloudName,
        authorizationName,
        authorization,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      authorizationName: string,
      options?: AuthorizationsGetOptionalParams,
    ) => get(context, resourceGroupName, privateCloudName, authorizationName, options),
    list: (
      resourceGroupName: string,
      privateCloudName: string,
      options?: AuthorizationsListOptionalParams,
    ) => list(context, resourceGroupName, privateCloudName, options),
  };
}

export function _getAuthorizationsOperations(
  context: AzureVMwareSolutionAPIContext,
): AuthorizationsOperations {
  return {
    ..._getAuthorizations(context),
  };
}
