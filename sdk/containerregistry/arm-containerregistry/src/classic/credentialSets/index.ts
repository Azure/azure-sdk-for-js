// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import { list, $delete, update, create, get } from "../../api/credentialSets/operations.js";
import type {
  CredentialSetsListOptionalParams,
  CredentialSetsDeleteOptionalParams,
  CredentialSetsUpdateOptionalParams,
  CredentialSetsCreateOptionalParams,
  CredentialSetsGetOptionalParams,
} from "../../api/credentialSets/options.js";
import type { CredentialSet, CredentialSetUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CredentialSets operations. */
export interface CredentialSetsOperations {
  /** Lists all credential set resources for the specified container registry. */
  list: (
    resourceGroupName: string,
    registryName: string,
    options?: CredentialSetsListOptionalParams,
  ) => PagedAsyncIterableIterator<CredentialSet>;
  /** Deletes a credential set from a container registry. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    credentialSetName: string,
    options?: CredentialSetsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a credential set for a container registry with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    credentialSetName: string,
    credentialSetUpdateParameters: CredentialSetUpdateParameters,
    options?: CredentialSetsUpdateOptionalParams,
  ) => PollerLike<OperationState<CredentialSet>, CredentialSet>;
  /** Creates a credential set for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    credentialSetName: string,
    credentialSetCreateParameters: CredentialSet,
    options?: CredentialSetsCreateOptionalParams,
  ) => PollerLike<OperationState<CredentialSet>, CredentialSet>;
  /** Gets the properties of the specified credential set resource. */
  get: (
    resourceGroupName: string,
    registryName: string,
    credentialSetName: string,
    options?: CredentialSetsGetOptionalParams,
  ) => Promise<CredentialSet>;
}

function _getCredentialSets(context: ContainerRegistryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      options?: CredentialSetsListOptionalParams,
    ) => list(context, resourceGroupName, registryName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      credentialSetName: string,
      options?: CredentialSetsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, credentialSetName, options),
    update: (
      resourceGroupName: string,
      registryName: string,
      credentialSetName: string,
      credentialSetUpdateParameters: CredentialSetUpdateParameters,
      options?: CredentialSetsUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        registryName,
        credentialSetName,
        credentialSetUpdateParameters,
        options,
      ),
    create: (
      resourceGroupName: string,
      registryName: string,
      credentialSetName: string,
      credentialSetCreateParameters: CredentialSet,
      options?: CredentialSetsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        registryName,
        credentialSetName,
        credentialSetCreateParameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      registryName: string,
      credentialSetName: string,
      options?: CredentialSetsGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, credentialSetName, options),
  };
}

export function _getCredentialSetsOperations(
  context: ContainerRegistryManagementContext,
): CredentialSetsOperations {
  return {
    ..._getCredentialSets(context),
  };
}
