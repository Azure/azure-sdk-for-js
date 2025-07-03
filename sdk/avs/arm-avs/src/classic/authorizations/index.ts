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
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    authorizationName: string,
    options?: AuthorizationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a ExpressRouteAuthorization */
  createOrUpdate: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    authorizationName: string,
    authorization: ExpressRouteAuthorization,
    options?: AuthorizationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ExpressRouteAuthorization>, ExpressRouteAuthorization>;
  /** Get a ExpressRouteAuthorization */
  get: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    authorizationName: string,
    options?: AuthorizationsGetOptionalParams,
  ) => Promise<ExpressRouteAuthorization>;
  /** List ExpressRouteAuthorization resources by PrivateCloud */
  list: (
    apiVersion: string,
    resourceGroupName: string,
    privateCloudName: string,
    options?: AuthorizationsListOptionalParams,
  ) => PagedAsyncIterableIterator<ExpressRouteAuthorization>;
}

function _getAuthorizations(context: AzureVMwareSolutionAPIContext) {
  return {
    delete: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      authorizationName: string,
      options?: AuthorizationsDeleteOptionalParams,
    ) =>
      $delete(context, apiVersion, resourceGroupName, privateCloudName, authorizationName, options),
    createOrUpdate: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      authorizationName: string,
      authorization: ExpressRouteAuthorization,
      options?: AuthorizationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        apiVersion,
        resourceGroupName,
        privateCloudName,
        authorizationName,
        authorization,
        options,
      ),
    get: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      authorizationName: string,
      options?: AuthorizationsGetOptionalParams,
    ) => get(context, apiVersion, resourceGroupName, privateCloudName, authorizationName, options),
    list: (
      apiVersion: string,
      resourceGroupName: string,
      privateCloudName: string,
      options?: AuthorizationsListOptionalParams,
    ) => list(context, apiVersion, resourceGroupName, privateCloudName, options),
  };
}

export function _getAuthorizationsOperations(
  context: AzureVMwareSolutionAPIContext,
): AuthorizationsOperations {
  return {
    ..._getAuthorizations(context),
  };
}
