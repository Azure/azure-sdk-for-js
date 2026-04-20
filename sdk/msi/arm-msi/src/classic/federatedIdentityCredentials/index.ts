// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ManagedServiceIdentityContext } from "../../api/managedServiceIdentityContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/federatedIdentityCredentials/operations.js";
import type {
  FederatedIdentityCredentialsListOptionalParams,
  FederatedIdentityCredentialsDeleteOptionalParams,
  FederatedIdentityCredentialsCreateOrUpdateOptionalParams,
  FederatedIdentityCredentialsGetOptionalParams,
} from "../../api/federatedIdentityCredentials/options.js";
import type { FederatedIdentityCredential } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a FederatedIdentityCredentials operations. */
export interface FederatedIdentityCredentialsOperations {
  /** Lists all the federated identity credentials under the specified user assigned identity. */
  list: (
    resourceGroupName: string,
    resourceName: string,
    options?: FederatedIdentityCredentialsListOptionalParams,
  ) => PagedAsyncIterableIterator<FederatedIdentityCredential>;
  /** Deletes the federated identity credential. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    resourceName: string,
    federatedIdentityCredentialResourceName: string,
    options?: FederatedIdentityCredentialsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update a federated identity credential under the specified user assigned identity. */
  createOrUpdate: (
    resourceGroupName: string,
    resourceName: string,
    federatedIdentityCredentialResourceName: string,
    parameters: FederatedIdentityCredential,
    options?: FederatedIdentityCredentialsCreateOrUpdateOptionalParams,
  ) => Promise<FederatedIdentityCredential>;
  /** Gets the federated identity credential. */
  get: (
    resourceGroupName: string,
    resourceName: string,
    federatedIdentityCredentialResourceName: string,
    options?: FederatedIdentityCredentialsGetOptionalParams,
  ) => Promise<FederatedIdentityCredential>;
}

function _getFederatedIdentityCredentials(context: ManagedServiceIdentityContext) {
  return {
    list: (
      resourceGroupName: string,
      resourceName: string,
      options?: FederatedIdentityCredentialsListOptionalParams,
    ) => list(context, resourceGroupName, resourceName, options),
    delete: (
      resourceGroupName: string,
      resourceName: string,
      federatedIdentityCredentialResourceName: string,
      options?: FederatedIdentityCredentialsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        resourceName,
        federatedIdentityCredentialResourceName,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      resourceName: string,
      federatedIdentityCredentialResourceName: string,
      parameters: FederatedIdentityCredential,
      options?: FederatedIdentityCredentialsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        resourceName,
        federatedIdentityCredentialResourceName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      resourceName: string,
      federatedIdentityCredentialResourceName: string,
      options?: FederatedIdentityCredentialsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        resourceName,
        federatedIdentityCredentialResourceName,
        options,
      ),
  };
}

export function _getFederatedIdentityCredentialsOperations(
  context: ManagedServiceIdentityContext,
): FederatedIdentityCredentialsOperations {
  return {
    ..._getFederatedIdentityCredentials(context),
  };
}
