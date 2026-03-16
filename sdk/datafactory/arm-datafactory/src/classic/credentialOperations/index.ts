// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  listByFactory,
  $delete,
  createOrUpdate,
  get,
} from "../../api/credentialOperations/operations.js";
import type {
  CredentialOperationsListByFactoryOptionalParams,
  CredentialOperationsDeleteOptionalParams,
  CredentialOperationsCreateOrUpdateOptionalParams,
  CredentialOperationsGetOptionalParams,
} from "../../api/credentialOperations/options.js";
import type { CredentialResource } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CredentialOperations operations. */
export interface CredentialOperationsOperations {
  /** List credentials. */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: CredentialOperationsListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<CredentialResource>;
  /** Deletes a credential. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    factoryName: string,
    credentialName: string,
    options?: CredentialOperationsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates a credential. */
  createOrUpdate: (
    resourceGroupName: string,
    factoryName: string,
    credentialName: string,
    credential: CredentialResource,
    options?: CredentialOperationsCreateOrUpdateOptionalParams,
  ) => Promise<CredentialResource>;
  /** Gets a credential. */
  get: (
    resourceGroupName: string,
    factoryName: string,
    credentialName: string,
    options?: CredentialOperationsGetOptionalParams,
  ) => Promise<CredentialResource>;
}

function _getCredentialOperations(context: DataFactoryManagementContext) {
  return {
    listByFactory: (
      resourceGroupName: string,
      factoryName: string,
      options?: CredentialOperationsListByFactoryOptionalParams,
    ) => listByFactory(context, resourceGroupName, factoryName, options),
    delete: (
      resourceGroupName: string,
      factoryName: string,
      credentialName: string,
      options?: CredentialOperationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, factoryName, credentialName, options),
    createOrUpdate: (
      resourceGroupName: string,
      factoryName: string,
      credentialName: string,
      credential: CredentialResource,
      options?: CredentialOperationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, factoryName, credentialName, credential, options),
    get: (
      resourceGroupName: string,
      factoryName: string,
      credentialName: string,
      options?: CredentialOperationsGetOptionalParams,
    ) => get(context, resourceGroupName, factoryName, credentialName, options),
  };
}

export function _getCredentialOperationsOperations(
  context: DataFactoryManagementContext,
): CredentialOperationsOperations {
  return {
    ..._getCredentialOperations(context),
  };
}
