// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import { list, $delete, update, create, get } from "../../api/archives/operations.js";
import type {
  ArchivesListOptionalParams,
  ArchivesDeleteOptionalParams,
  ArchivesUpdateOptionalParams,
  ArchivesCreateOptionalParams,
  ArchivesGetOptionalParams,
} from "../../api/archives/options.js";
import type { Archive, ArchiveUpdateParameters } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Archives operations. */
export interface ArchivesOperations {
  /** Lists all archives for the specified container registry and package type. */
  list: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    options?: ArchivesListOptionalParams,
  ) => PagedAsyncIterableIterator<Archive>;
  /** Deletes a archive from a container registry. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    options?: ArchivesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    options?: ArchivesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    options?: ArchivesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a archive for a container registry with the specified parameters. */
  update: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    archiveUpdateParameters: ArchiveUpdateParameters,
    options?: ArchivesUpdateOptionalParams,
  ) => Promise<Archive>;
  /** Creates a archive for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    archiveCreateParameters: Archive,
    options?: ArchivesCreateOptionalParams,
  ) => PollerLike<OperationState<Archive>, Archive>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    archiveCreateParameters: Archive,
    options?: ArchivesCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<Archive>, Archive>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    archiveCreateParameters: Archive,
    options?: ArchivesCreateOptionalParams,
  ) => Promise<Archive>;
  /** Gets the properties of the archive. */
  get: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    options?: ArchivesGetOptionalParams,
  ) => Promise<Archive>;
}

function _getArchives(context: ContainerRegistryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      options?: ArchivesListOptionalParams,
    ) => list(context, resourceGroupName, registryName, packageType, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      options?: ArchivesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, packageType, archiveName, options),
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      options?: ArchivesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      options?: ArchivesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      archiveUpdateParameters: ArchiveUpdateParameters,
      options?: ArchivesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        archiveUpdateParameters,
        options,
      ),
    create: (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      archiveCreateParameters: Archive,
      options?: ArchivesCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        archiveCreateParameters,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      archiveCreateParameters: Archive,
      options?: ArchivesCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        archiveCreateParameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      archiveCreateParameters: Archive,
      options?: ArchivesCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        archiveCreateParameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      options?: ArchivesGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, packageType, archiveName, options),
  };
}

export function _getArchivesOperations(
  context: ContainerRegistryManagementContext,
): ArchivesOperations {
  return {
    ..._getArchives(context),
  };
}
