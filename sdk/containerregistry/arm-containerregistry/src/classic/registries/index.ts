// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import {
  listPrivateLinkResources,
  getPrivateLinkResource,
  checkNameAvailability,
  generateCredentials,
  regenerateCredential,
  listCredentials,
  listUsages,
  importImage,
  list,
  listByResourceGroup,
  $delete,
  update,
  create,
  get,
} from "../../api/registries/operations.js";
import type {
  RegistriesListPrivateLinkResourcesOptionalParams,
  RegistriesGetPrivateLinkResourceOptionalParams,
  RegistriesCheckNameAvailabilityOptionalParams,
  RegistriesGenerateCredentialsOptionalParams,
  RegistriesRegenerateCredentialOptionalParams,
  RegistriesListCredentialsOptionalParams,
  RegistriesListUsagesOptionalParams,
  RegistriesImportImageOptionalParams,
  RegistriesListOptionalParams,
  RegistriesListByResourceGroupOptionalParams,
  RegistriesDeleteOptionalParams,
  RegistriesUpdateOptionalParams,
  RegistriesCreateOptionalParams,
  RegistriesGetOptionalParams,
} from "../../api/registries/options.js";
import type {
  Registry,
  RegistryUpdateParameters,
  ImportImageParameters,
  RegistryUsageListResult,
  RegistryListCredentialsResult,
  RegenerateCredentialParameters,
  GenerateCredentialsParameters,
  GenerateCredentialsResult,
  RegistryNameCheckRequest,
  RegistryNameStatus,
  PrivateLinkResource,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Registries operations. */
export interface RegistriesOperations {
  /** Lists the private link resources for a container registry. */
  listPrivateLinkResources: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistriesListPrivateLinkResourcesOptionalParams,
  ) => PagedAsyncIterableIterator<PrivateLinkResource>;
  /** Gets a private link resource by a specified group name for a container registry. */
  getPrivateLinkResource: (
    resourceGroupName: string,
    registryName: string,
    groupName: string,
    options?: RegistriesGetPrivateLinkResourceOptionalParams,
  ) => Promise<PrivateLinkResource>;
  /** Checks whether the container registry name is available for use. The name must contain only alphanumeric characters, be globally unique, and between 5 and 50 characters in length. */
  checkNameAvailability: (
    registryNameCheckRequest: RegistryNameCheckRequest,
    options?: RegistriesCheckNameAvailabilityOptionalParams,
  ) => Promise<RegistryNameStatus>;
  /** Generate keys for a token of a specified container registry. */
  generateCredentials: (
    resourceGroupName: string,
    registryName: string,
    generateCredentialsParameters: GenerateCredentialsParameters,
    options?: RegistriesGenerateCredentialsOptionalParams,
  ) => PollerLike<OperationState<GenerateCredentialsResult>, GenerateCredentialsResult>;
  /** Regenerates one of the login credentials for the specified container registry. */
  regenerateCredential: (
    resourceGroupName: string,
    registryName: string,
    regenerateCredentialParameters: RegenerateCredentialParameters,
    options?: RegistriesRegenerateCredentialOptionalParams,
  ) => Promise<RegistryListCredentialsResult>;
  /** Lists the login credentials for the specified container registry. */
  listCredentials: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistriesListCredentialsOptionalParams,
  ) => Promise<RegistryListCredentialsResult>;
  /** Gets the quota usages for the specified container registry. */
  listUsages: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistriesListUsagesOptionalParams,
  ) => Promise<RegistryUsageListResult>;
  /** Copies an image to this container registry from the specified container registry. */
  importImage: (
    resourceGroupName: string,
    registryName: string,
    parameters: ImportImageParameters,
    options?: RegistriesImportImageOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Lists all the container registries under the specified subscription. */
  list: (options?: RegistriesListOptionalParams) => PagedAsyncIterableIterator<Registry>;
  /** Lists all the container registries under the specified resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: RegistriesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Registry>;
  /** Deletes a container registry. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistriesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a container registry with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    registryUpdateParameters: RegistryUpdateParameters,
    options?: RegistriesUpdateOptionalParams,
  ) => PollerLike<OperationState<Registry>, Registry>;
  /** Creates a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    registry: Registry,
    options?: RegistriesCreateOptionalParams,
  ) => PollerLike<OperationState<Registry>, Registry>;
  /** Gets the properties of the specified container registry. */
  get: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistriesGetOptionalParams,
  ) => Promise<Registry>;
}

function _getRegistries(context: ContainerRegistryManagementContext) {
  return {
    listPrivateLinkResources: (
      resourceGroupName: string,
      registryName: string,
      options?: RegistriesListPrivateLinkResourcesOptionalParams,
    ) => listPrivateLinkResources(context, resourceGroupName, registryName, options),
    getPrivateLinkResource: (
      resourceGroupName: string,
      registryName: string,
      groupName: string,
      options?: RegistriesGetPrivateLinkResourceOptionalParams,
    ) => getPrivateLinkResource(context, resourceGroupName, registryName, groupName, options),
    checkNameAvailability: (
      registryNameCheckRequest: RegistryNameCheckRequest,
      options?: RegistriesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, registryNameCheckRequest, options),
    generateCredentials: (
      resourceGroupName: string,
      registryName: string,
      generateCredentialsParameters: GenerateCredentialsParameters,
      options?: RegistriesGenerateCredentialsOptionalParams,
    ) =>
      generateCredentials(
        context,
        resourceGroupName,
        registryName,
        generateCredentialsParameters,
        options,
      ),
    regenerateCredential: (
      resourceGroupName: string,
      registryName: string,
      regenerateCredentialParameters: RegenerateCredentialParameters,
      options?: RegistriesRegenerateCredentialOptionalParams,
    ) =>
      regenerateCredential(
        context,
        resourceGroupName,
        registryName,
        regenerateCredentialParameters,
        options,
      ),
    listCredentials: (
      resourceGroupName: string,
      registryName: string,
      options?: RegistriesListCredentialsOptionalParams,
    ) => listCredentials(context, resourceGroupName, registryName, options),
    listUsages: (
      resourceGroupName: string,
      registryName: string,
      options?: RegistriesListUsagesOptionalParams,
    ) => listUsages(context, resourceGroupName, registryName, options),
    importImage: (
      resourceGroupName: string,
      registryName: string,
      parameters: ImportImageParameters,
      options?: RegistriesImportImageOptionalParams,
    ) => importImage(context, resourceGroupName, registryName, parameters, options),
    list: (options?: RegistriesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: RegistriesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      options?: RegistriesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, options),
    update: (
      resourceGroupName: string,
      registryName: string,
      registryUpdateParameters: RegistryUpdateParameters,
      options?: RegistriesUpdateOptionalParams,
    ) => update(context, resourceGroupName, registryName, registryUpdateParameters, options),
    create: (
      resourceGroupName: string,
      registryName: string,
      registry: Registry,
      options?: RegistriesCreateOptionalParams,
    ) => create(context, resourceGroupName, registryName, registry, options),
    get: (resourceGroupName: string, registryName: string, options?: RegistriesGetOptionalParams) =>
      get(context, resourceGroupName, registryName, options),
  };
}

export function _getRegistriesOperations(
  context: ContainerRegistryManagementContext,
): RegistriesOperations {
  return {
    ..._getRegistries(context),
  };
}
