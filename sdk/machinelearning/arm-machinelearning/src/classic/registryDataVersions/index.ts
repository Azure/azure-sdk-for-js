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
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    version: string,
    options?: RegistryDataVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    name: string,
    version: string,
    body: DataVersionBase,
    options?: RegistryDataVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<DataVersionBase>, DataVersionBase>;
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
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      name: string,
      version: string,
      body: DataVersionBase,
      options?: RegistryDataVersionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, name, version, body, options),
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
