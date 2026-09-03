// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { DeviceRegistryManagementContext } from "../../api/deviceRegistryManagementContext.js";
import {
  synchronize,
  listByResourceGroup,
  update,
  $delete,
  createOrUpdate,
  get,
} from "../../api/credentials/operations.js";
import type {
  CredentialsSynchronizeOptionalParams,
  CredentialsListByResourceGroupOptionalParams,
  CredentialsUpdateOptionalParams,
  CredentialsDeleteOptionalParams,
  CredentialsCreateOrUpdateOptionalParams,
  CredentialsGetOptionalParams,
} from "../../api/credentials/options.js";
import type { Credential, CredentialUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Credentials operations. */
export interface CredentialsOperations {
  /** A long-running resource action. */
  synchronize: (
    resourceGroupName: string,
    namespaceName: string,
    options?: CredentialsSynchronizeOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List Credential resources by Namespace */
  listByResourceGroup: (
    resourceGroupName: string,
    namespaceName: string,
    options?: CredentialsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Credential>;
  /** Update a Credential */
  update: (
    resourceGroupName: string,
    namespaceName: string,
    properties: CredentialUpdate,
    options?: CredentialsUpdateOptionalParams,
  ) => PollerLike<OperationState<Credential>, Credential>;
  /** Delete a Credential */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    namespaceName: string,
    options?: CredentialsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a Credential */
  createOrUpdate: (
    resourceGroupName: string,
    namespaceName: string,
    resource: Credential,
    options?: CredentialsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Credential>, Credential>;
  /** Get a Credential */
  get: (
    resourceGroupName: string,
    namespaceName: string,
    options?: CredentialsGetOptionalParams,
  ) => Promise<Credential>;
}

function _getCredentials(context: DeviceRegistryManagementContext) {
  return {
    synchronize: (
      resourceGroupName: string,
      namespaceName: string,
      options?: CredentialsSynchronizeOptionalParams,
    ) => synchronize(context, resourceGroupName, namespaceName, options),
    listByResourceGroup: (
      resourceGroupName: string,
      namespaceName: string,
      options?: CredentialsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, namespaceName, options),
    update: (
      resourceGroupName: string,
      namespaceName: string,
      properties: CredentialUpdate,
      options?: CredentialsUpdateOptionalParams,
    ) => update(context, resourceGroupName, namespaceName, properties, options),
    delete: (
      resourceGroupName: string,
      namespaceName: string,
      options?: CredentialsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, namespaceName, options),
    createOrUpdate: (
      resourceGroupName: string,
      namespaceName: string,
      resource: Credential,
      options?: CredentialsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, namespaceName, resource, options),
    get: (
      resourceGroupName: string,
      namespaceName: string,
      options?: CredentialsGetOptionalParams,
    ) => get(context, resourceGroupName, namespaceName, options),
  };
}

export function _getCredentialsOperations(
  context: DeviceRegistryManagementContext,
): CredentialsOperations {
  return {
    ..._getCredentials(context),
  };
}
