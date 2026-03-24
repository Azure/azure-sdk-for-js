// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import {
  confirmConsentCode,
  listByAuthorizationProvider,
  $delete,
  createOrUpdate,
  get,
} from "../../api/authorization/operations.js";
import type {
  AuthorizationConfirmConsentCodeOptionalParams,
  AuthorizationListByAuthorizationProviderOptionalParams,
  AuthorizationDeleteOptionalParams,
  AuthorizationCreateOrUpdateOptionalParams,
  AuthorizationGetOptionalParams,
} from "../../api/authorization/options.js";
import type {
  AuthorizationContract,
  AuthorizationConfirmConsentCodeRequestContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a Authorization operations. */
export interface AuthorizationOperations {
  /** Confirm valid consent code to suppress Authorizations anti-phishing page. */
  confirmConsentCode: (
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    authorizationId: string,
    parameters: AuthorizationConfirmConsentCodeRequestContract,
    options?: AuthorizationConfirmConsentCodeOptionalParams,
  ) => Promise<void>;
  /** Lists a collection of authorization providers defined within a authorization provider. */
  listByAuthorizationProvider: (
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    options?: AuthorizationListByAuthorizationProviderOptionalParams,
  ) => PagedAsyncIterableIterator<AuthorizationContract>;
  /** Deletes specific Authorization from the Authorization provider. */
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
    ifMatch: string,
    options?: AuthorizationDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates authorization. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    authorizationId: string,
    parameters: AuthorizationContract,
    options?: AuthorizationCreateOrUpdateOptionalParams,
  ) => Promise<AuthorizationContract>;
  /** Gets the details of the authorization specified by its identifier. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    authorizationProviderId: string,
    authorizationId: string,
    options?: AuthorizationGetOptionalParams,
  ) => Promise<AuthorizationContract>;
}

function _getAuthorization(context: ApiManagementContext) {
  return {
    confirmConsentCode: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      authorizationId: string,
      parameters: AuthorizationConfirmConsentCodeRequestContract,
      options?: AuthorizationConfirmConsentCodeOptionalParams,
    ) =>
      confirmConsentCode(
        context,
        resourceGroupName,
        serviceName,
        authorizationProviderId,
        authorizationId,
        parameters,
        options,
      ),
    listByAuthorizationProvider: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      options?: AuthorizationListByAuthorizationProviderOptionalParams,
    ) =>
      listByAuthorizationProvider(
        context,
        resourceGroupName,
        serviceName,
        authorizationProviderId,
        options,
      ),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      authorizationId: string,
      ifMatch: string,
      options?: AuthorizationDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        serviceName,
        authorizationProviderId,
        authorizationId,
        ifMatch,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      authorizationId: string,
      parameters: AuthorizationContract,
      options?: AuthorizationCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        authorizationProviderId,
        authorizationId,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      serviceName: string,
      authorizationProviderId: string,
      authorizationId: string,
      options?: AuthorizationGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        serviceName,
        authorizationProviderId,
        authorizationId,
        options,
      ),
  };
}

export function _getAuthorizationOperations(
  context: ApiManagementContext,
): AuthorizationOperations {
  return {
    ..._getAuthorization(context),
  };
}
