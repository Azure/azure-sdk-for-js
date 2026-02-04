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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use generateCredentials instead */
  beginGenerateCredentials: (
    resourceGroupName: string,
    registryName: string,
    generateCredentialsParameters: GenerateCredentialsParameters,
    options?: RegistriesGenerateCredentialsOptionalParams,
  ) => Promise<
    SimplePollerLike<OperationState<GenerateCredentialsResult>, GenerateCredentialsResult>
  >;
  /** @deprecated use generateCredentials instead */
  beginGenerateCredentialsAndWait: (
    resourceGroupName: string,
    registryName: string,
    generateCredentialsParameters: GenerateCredentialsParameters,
    options?: RegistriesGenerateCredentialsOptionalParams,
  ) => Promise<GenerateCredentialsResult>;
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
  /** @deprecated use importImage instead */
  beginImportImage: (
    resourceGroupName: string,
    registryName: string,
    parameters: ImportImageParameters,
    options?: RegistriesImportImageOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use importImage instead */
  beginImportImageAndWait: (
    resourceGroupName: string,
    registryName: string,
    parameters: ImportImageParameters,
    options?: RegistriesImportImageOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistriesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    options?: RegistriesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a container registry with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    registryUpdateParameters: RegistryUpdateParameters,
    options?: RegistriesUpdateOptionalParams,
  ) => PollerLike<OperationState<Registry>, Registry>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    registryName: string,
    registryUpdateParameters: RegistryUpdateParameters,
    options?: RegistriesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Registry>, Registry>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    registryUpdateParameters: RegistryUpdateParameters,
    options?: RegistriesUpdateOptionalParams,
  ) => Promise<Registry>;
  /** Creates a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    registry: Registry,
    options?: RegistriesCreateOptionalParams,
  ) => PollerLike<OperationState<Registry>, Registry>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    registryName: string,
    registry: Registry,
    options?: RegistriesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Registry>, Registry>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    registryName: string,
    registry: Registry,
    options?: RegistriesCreateOptionalParams,
  ) => Promise<Registry>;
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
    beginGenerateCredentials: async (
      resourceGroupName: string,
      registryName: string,
      generateCredentialsParameters: GenerateCredentialsParameters,
      options?: RegistriesGenerateCredentialsOptionalParams,
    ) => {
      const poller = generateCredentials(
        context,
        resourceGroupName,
        registryName,
        generateCredentialsParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginGenerateCredentialsAndWait: async (
      resourceGroupName: string,
      registryName: string,
      generateCredentialsParameters: GenerateCredentialsParameters,
      options?: RegistriesGenerateCredentialsOptionalParams,
    ) => {
      return await generateCredentials(
        context,
        resourceGroupName,
        registryName,
        generateCredentialsParameters,
        options,
      );
    },
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
    beginImportImage: async (
      resourceGroupName: string,
      registryName: string,
      parameters: ImportImageParameters,
      options?: RegistriesImportImageOptionalParams,
    ) => {
      const poller = importImage(context, resourceGroupName, registryName, parameters, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginImportImageAndWait: async (
      resourceGroupName: string,
      registryName: string,
      parameters: ImportImageParameters,
      options?: RegistriesImportImageOptionalParams,
    ) => {
      return await importImage(context, resourceGroupName, registryName, parameters, options);
    },
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
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      options?: RegistriesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, registryName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      options?: RegistriesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, registryName, options);
    },
    update: (
      resourceGroupName: string,
      registryName: string,
      registryUpdateParameters: RegistryUpdateParameters,
      options?: RegistriesUpdateOptionalParams,
    ) => update(context, resourceGroupName, registryName, registryUpdateParameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      registryName: string,
      registryUpdateParameters: RegistryUpdateParameters,
      options?: RegistriesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        registryName,
        registryUpdateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      registryUpdateParameters: RegistryUpdateParameters,
      options?: RegistriesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        registryName,
        registryUpdateParameters,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      registryName: string,
      registry: Registry,
      options?: RegistriesCreateOptionalParams,
    ) => create(context, resourceGroupName, registryName, registry, options),
    beginCreate: async (
      resourceGroupName: string,
      registryName: string,
      registry: Registry,
      options?: RegistriesCreateOptionalParams,
    ) => {
      const poller = create(context, resourceGroupName, registryName, registry, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      registry: Registry,
      options?: RegistriesCreateOptionalParams,
    ) => {
      return await create(context, resourceGroupName, registryName, registry, options);
    },
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
