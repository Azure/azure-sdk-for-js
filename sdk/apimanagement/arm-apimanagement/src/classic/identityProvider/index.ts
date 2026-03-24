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
} from "../../api/identityProvider/operations.js";
import type {
  IdentityProviderListSecretsOptionalParams,
  IdentityProviderListByServiceOptionalParams,
  IdentityProviderDeleteOptionalParams,
  IdentityProviderUpdateOptionalParams,
  IdentityProviderCreateOrUpdateOptionalParams,
  IdentityProviderGetEntityTagOptionalParams,
  IdentityProviderGetOptionalParams,
} from "../../api/identityProvider/options.js";
import type {
  IdentityProviderContract,
  IdentityProviderType,
  IdentityProviderCreateContract,
  IdentityProviderUpdateParameters,
  ClientSecretContract,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a IdentityProvider operations. */
export interface IdentityProviderOperations {
  /** Gets the client secret details of the Identity Provider. */
  listSecrets: (
    resourceGroupName: string,
    serviceName: string,
    identityProviderName: IdentityProviderType,
    options?: IdentityProviderListSecretsOptionalParams,
  ) => Promise<ClientSecretContract>;
  /** Lists a collection of Identity Provider configured in the specified service instance. */
  listByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: IdentityProviderListByServiceOptionalParams,
  ) => PagedAsyncIterableIterator<IdentityProviderContract>;
  /** Deletes the specified identity provider configuration. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceName: string,
    identityProviderName: IdentityProviderType,
    ifMatch: string,
    options?: IdentityProviderDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an existing IdentityProvider configuration. */
  update: (
    resourceGroupName: string,
    serviceName: string,
    identityProviderName: IdentityProviderType,
    ifMatch: string,
    parameters: IdentityProviderUpdateParameters,
    options?: IdentityProviderUpdateOptionalParams,
  ) => Promise<IdentityProviderContract>;
  /** Creates or Updates the IdentityProvider configuration. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceName: string,
    identityProviderName: IdentityProviderType,
    parameters: IdentityProviderCreateContract,
    options?: IdentityProviderCreateOrUpdateOptionalParams,
  ) => Promise<IdentityProviderContract>;
  /** Gets the entity state (Etag) version of the identityProvider specified by its identifier. */
  getEntityTag: (
    resourceGroupName: string,
    serviceName: string,
    identityProviderName: IdentityProviderType,
    options?: IdentityProviderGetEntityTagOptionalParams,
  ) => Promise<void>;
  /** Gets the configuration details of the identity Provider configured in specified service instance. */
  get: (
    resourceGroupName: string,
    serviceName: string,
    identityProviderName: IdentityProviderType,
    options?: IdentityProviderGetOptionalParams,
  ) => Promise<IdentityProviderContract>;
}

function _getIdentityProvider(context: ApiManagementContext) {
  return {
    listSecrets: (
      resourceGroupName: string,
      serviceName: string,
      identityProviderName: IdentityProviderType,
      options?: IdentityProviderListSecretsOptionalParams,
    ) => listSecrets(context, resourceGroupName, serviceName, identityProviderName, options),
    listByService: (
      resourceGroupName: string,
      serviceName: string,
      options?: IdentityProviderListByServiceOptionalParams,
    ) => listByService(context, resourceGroupName, serviceName, options),
    delete: (
      resourceGroupName: string,
      serviceName: string,
      identityProviderName: IdentityProviderType,
      ifMatch: string,
      options?: IdentityProviderDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceName, identityProviderName, ifMatch, options),
    update: (
      resourceGroupName: string,
      serviceName: string,
      identityProviderName: IdentityProviderType,
      ifMatch: string,
      parameters: IdentityProviderUpdateParameters,
      options?: IdentityProviderUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        serviceName,
        identityProviderName,
        ifMatch,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      serviceName: string,
      identityProviderName: IdentityProviderType,
      parameters: IdentityProviderCreateContract,
      options?: IdentityProviderCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        serviceName,
        identityProviderName,
        parameters,
        options,
      ),
    getEntityTag: (
      resourceGroupName: string,
      serviceName: string,
      identityProviderName: IdentityProviderType,
      options?: IdentityProviderGetEntityTagOptionalParams,
    ) => getEntityTag(context, resourceGroupName, serviceName, identityProviderName, options),
    get: (
      resourceGroupName: string,
      serviceName: string,
      identityProviderName: IdentityProviderType,
      options?: IdentityProviderGetOptionalParams,
    ) => get(context, resourceGroupName, serviceName, identityProviderName, options),
  };
}

export function _getIdentityProviderOperations(
  context: ApiManagementContext,
): IdentityProviderOperations {
  return {
    ..._getIdentityProvider(context),
  };
}
