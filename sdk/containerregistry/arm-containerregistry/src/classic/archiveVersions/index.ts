// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerRegistryManagementContext } from "../../api/containerRegistryManagementContext.js";
import { list, $delete, create, get } from "../../api/archiveVersions/operations.js";
import type {
  ArchiveVersionsListOptionalParams,
  ArchiveVersionsDeleteOptionalParams,
  ArchiveVersionsCreateOptionalParams,
  ArchiveVersionsGetOptionalParams,
} from "../../api/archiveVersions/options.js";
import type { ArchiveVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ArchiveVersions operations. */
export interface ArchiveVersionsOperations {
  /** Lists all archive versions for the specified container registry, repository type and archive name. */
  list: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    options?: ArchiveVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ArchiveVersion>;
  /** Deletes a archive version from a container registry. */
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
    archiveVersionName: string,
    options?: ArchiveVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    archiveVersionName: string,
    options?: ArchiveVersionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    archiveVersionName: string,
    options?: ArchiveVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates a archive version for a container registry with the specified parameters. */
  create: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    archiveVersionName: string,
    options?: ArchiveVersionsCreateOptionalParams,
  ) => PollerLike<OperationState<ArchiveVersion>, ArchiveVersion>;
  /** @deprecated use create instead */
  beginCreate: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    archiveVersionName: string,
    options?: ArchiveVersionsCreateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ArchiveVersion>, ArchiveVersion>>;
  /** @deprecated use create instead */
  beginCreateAndWait: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    archiveVersionName: string,
    options?: ArchiveVersionsCreateOptionalParams,
  ) => Promise<ArchiveVersion>;
  /** Gets the properties of the archive version. */
  get: (
    resourceGroupName: string,
    registryName: string,
    packageType: string,
    archiveName: string,
    archiveVersionName: string,
    options?: ArchiveVersionsGetOptionalParams,
  ) => Promise<ArchiveVersion>;
}

function _getArchiveVersions(context: ContainerRegistryManagementContext) {
  return {
    list: (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      options?: ArchiveVersionsListOptionalParams,
    ) => list(context, resourceGroupName, registryName, packageType, archiveName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      archiveVersionName: string,
      options?: ArchiveVersionsDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        archiveVersionName,
        options,
      ),
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      archiveVersionName: string,
      options?: ArchiveVersionsDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        archiveVersionName,
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
      archiveVersionName: string,
      options?: ArchiveVersionsDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        archiveVersionName,
        options,
      );
    },
    create: (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      archiveVersionName: string,
      options?: ArchiveVersionsCreateOptionalParams,
    ) =>
      create(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        archiveVersionName,
        options,
      ),
    beginCreate: async (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      archiveVersionName: string,
      options?: ArchiveVersionsCreateOptionalParams,
    ) => {
      const poller = create(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        archiveVersionName,
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
      archiveVersionName: string,
      options?: ArchiveVersionsCreateOptionalParams,
    ) => {
      return await create(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        archiveVersionName,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      registryName: string,
      packageType: string,
      archiveName: string,
      archiveVersionName: string,
      options?: ArchiveVersionsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        registryName,
        packageType,
        archiveName,
        archiveVersionName,
        options,
      ),
  };
}

export function _getArchiveVersionsOperations(
  context: ContainerRegistryManagementContext,
): ArchiveVersionsOperations {
  return {
    ..._getArchiveVersions(context),
  };
}
