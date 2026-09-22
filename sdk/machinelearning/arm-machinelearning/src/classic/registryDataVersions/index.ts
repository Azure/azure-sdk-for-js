// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  createOrGetStartPendingUpload,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/registryDataVersions/operations.js";
import type {
  RegistryDataVersionsCreateOrGetStartPendingUploadOptionalParams,
  RegistryDataVersionsListOptionalParams,
  RegistryDataVersionsDeleteOptionalParams,
  RegistryDataVersionsCreateOrUpdateOptionalParams,
  RegistryDataVersionsGetOptionalParams,
} from "../../api/registryDataVersions/options.js";
import type {
  PendingUploadRequestDto,
  PendingUploadResponseDto,
  DataVersionBase,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegistryDataVersions operations. */
export interface RegistryDataVersionsOperations {
  /** Generate a storage location and credential for the client to upload a data asset to. */
  createOrGetStartPendingUpload: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    version: string,
    body: PendingUploadRequestDto,
    options?: RegistryDataVersionsCreateOrGetStartPendingUploadOptionalParams,
  ) => Promise<PendingUploadResponseDto>;
  /** List data versions in the data container */
  list: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    options?: RegistryDataVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<DataVersionBase>;
  /** Delete version. */
  delete: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    version: string,
    options?: RegistryDataVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    version: string,
    options?: RegistryDataVersionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    version: string,
    options?: RegistryDataVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    version: string,
    body: DataVersionBase,
    options?: RegistryDataVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataVersionBase>, DataVersionBase>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    version: string,
    body: DataVersionBase,
    options?: RegistryDataVersionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<DataVersionBase>, DataVersionBase>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    version: string,
    body: DataVersionBase,
    options?: RegistryDataVersionsCreateOrUpdateOptionalParams,
  ) => Promise<DataVersionBase>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    version: string,
    options?: RegistryDataVersionsGetOptionalParams,
  ) => Promise<DataVersionBase>;
}

function _getRegistryDataVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    createOrGetStartPendingUpload: (
      resourceGroupName: string,
      registryName: string,
      name: string,
      version: string,
      body: PendingUploadRequestDto,
      options?: RegistryDataVersionsCreateOrGetStartPendingUploadOptionalParams,
    ) =>
      createOrGetStartPendingUpload(
        context,
        resourceGroupName,
        registryName,
        name,
        version,
        body,
        options,
      ),
    list: (
      resourceGroupName: string,
      registryName: string,
      name: string,
      options?: RegistryDataVersionsListOptionalParams,
    ) => list(context, resourceGroupName, registryName, name, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      name: string,
      version: string,
      options?: RegistryDataVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, name, version, options),
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      name: string,
      version: string,
      options?: RegistryDataVersionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, registryName, name, version, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      name: string,
      version: string,
      options?: RegistryDataVersionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, registryName, name, version, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      name: string,
      version: string,
      body: DataVersionBase,
      options?: RegistryDataVersionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, name, version, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      registryName: string,
      name: string,
      version: string,
      body: DataVersionBase,
      options?: RegistryDataVersionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        name,
        version,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      registryName: string,
      name: string,
      version: string,
      body: DataVersionBase,
      options?: RegistryDataVersionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        name,
        version,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      registryName: string,
      name: string,
      version: string,
      options?: RegistryDataVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, name, version, options),
  };
}

export function _getRegistryDataVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): RegistryDataVersionsOperations {
  return {
    ..._getRegistryDataVersions(context),
  };
}
