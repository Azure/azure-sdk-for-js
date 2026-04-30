// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataFactoryManagementContext } from "../../api/dataFactoryManagementContext.js";
import {
  listByFactory,
  $delete,
  createOrUpdate,
  get,
} from "../../api/credentialOperations/operations.js";
import {
  CredentialOperationsListByFactoryOptionalParams,
  CredentialOperationsDeleteOptionalParams,
  CredentialOperationsCreateOrUpdateOptionalParams,
  CredentialOperationsGetOptionalParams,
} from "../../api/credentialOperations/options.js";
import { CredentialResource } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a CredentialOperations operations. */
export interface CredentialOperationsOperations {
  /** List credentials. */
  listByFactory: (
    resourceGroupName: string,
    factoryName: string,
    options?: CredentialOperationsListByFactoryOptionalParams,
  ) => PagedAsyncIterableIterator<CredentialResource>;
  /** Deletes a credential. */
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
