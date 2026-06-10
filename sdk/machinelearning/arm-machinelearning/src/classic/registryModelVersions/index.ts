// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  createOrGetStartPendingUpload,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/registryModelVersions/operations.js";
import type {
  RegistryModelVersionsCreateOrGetStartPendingUploadOptionalParams,
  RegistryModelVersionsListOptionalParams,
  RegistryModelVersionsDeleteOptionalParams,
  RegistryModelVersionsCreateOrUpdateOptionalParams,
  RegistryModelVersionsGetOptionalParams,
} from "../../api/registryModelVersions/options.js";
import type {
  PendingUploadRequestDto,
  PendingUploadResponseDto,
  ModelVersion,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegistryModelVersions operations. */
export interface RegistryModelVersionsOperations {
  /** Generate a storage location and credential for the client to upload a model asset to. */
  createOrGetStartPendingUpload: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    version: string,
    body: PendingUploadRequestDto,
    options?: RegistryModelVersionsCreateOrGetStartPendingUploadOptionalParams,
  ) => Promise<PendingUploadResponseDto>;
  /** List versions. */
  list: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    options?: RegistryModelVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ModelVersion>;
  /** Delete version. */
  delete: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    version: string,
    options?: RegistryModelVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    version: string,
    options?: RegistryModelVersionsDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    version: string,
    options?: RegistryModelVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    version: string,
    body: ModelVersion,
    options?: RegistryModelVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ModelVersion>, ModelVersion>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    version: string,
    body: ModelVersion,
    options?: RegistryModelVersionsCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ModelVersion>, ModelVersion>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    version: string,
    body: ModelVersion,
    options?: RegistryModelVersionsCreateOrUpdateOptionalParams,
  ) => Promise<ModelVersion>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    registryName: string,
    modelName: string,
    version: string,
    options?: RegistryModelVersionsGetOptionalParams,
  ) => Promise<ModelVersion>;
}

function _getRegistryModelVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    createOrGetStartPendingUpload: (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      version: string,
      body: PendingUploadRequestDto,
      options?: RegistryModelVersionsCreateOrGetStartPendingUploadOptionalParams,
    ) =>
      createOrGetStartPendingUpload(
        context,
        resourceGroupName,
        registryName,
        modelName,
        version,
        body,
        options,
      ),
    list: (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      options?: RegistryModelVersionsListOptionalParams,
    ) => list(context, resourceGroupName, registryName, modelName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      version: string,
      options?: RegistryModelVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, modelName, version, options),
    beginDelete: async (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      version: string,
      options?: RegistryModelVersionsDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, registryName, modelName, version, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      version: string,
      options?: RegistryModelVersionsDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, registryName, modelName, version, options);
    },
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      version: string,
      body: ModelVersion,
      options?: RegistryModelVersionsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, registryName, modelName, version, body, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      version: string,
      body: ModelVersion,
      options?: RegistryModelVersionsCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        modelName,
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
      modelName: string,
      version: string,
      body: ModelVersion,
      options?: RegistryModelVersionsCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        registryName,
        modelName,
        version,
        body,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      registryName: string,
      modelName: string,
      version: string,
      options?: RegistryModelVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, modelName, version, options),
  };
}

export function _getRegistryModelVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): RegistryModelVersionsOperations {
  return {
    ..._getRegistryModelVersions(context),
  };
}
