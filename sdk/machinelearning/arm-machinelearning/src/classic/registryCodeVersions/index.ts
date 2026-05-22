// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  createOrGetStartPendingUpload,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/registryCodeVersions/operations.js";
import {
  RegistryCodeVersionsCreateOrGetStartPendingUploadOptionalParams,
  RegistryCodeVersionsListOptionalParams,
  RegistryCodeVersionsDeleteOptionalParams,
  RegistryCodeVersionsCreateOrUpdateOptionalParams,
  RegistryCodeVersionsGetOptionalParams,
} from "../../api/registryCodeVersions/options.js";
import {
  CodeVersion,
  PendingUploadRequestDto,
  PendingUploadResponseDto,
} from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RegistryCodeVersions operations. */
export interface RegistryCodeVersionsOperations {
  /** Generate a storage location and credential for the client to upload a code asset to. */
  createOrGetStartPendingUpload: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    version: string,
    body: PendingUploadRequestDto,
    options?: RegistryCodeVersionsCreateOrGetStartPendingUploadOptionalParams,
  ) => Promise<PendingUploadResponseDto>;
  /** List versions. */
  list: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    options?: RegistryCodeVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<CodeVersion>;
  /** Delete version. */
  delete: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    version: string,
    options?: RegistryCodeVersionsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    version: string,
    body: CodeVersion,
    options?: RegistryCodeVersionsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CodeVersion>, CodeVersion>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    registryName: string,
    codeName: string,
    version: string,
    options?: RegistryCodeVersionsGetOptionalParams,
  ) => Promise<CodeVersion>;
}

function _getRegistryCodeVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    createOrGetStartPendingUpload: (
      resourceGroupName: string,
      registryName: string,
      codeName: string,
      version: string,
      body: PendingUploadRequestDto,
      options?: RegistryCodeVersionsCreateOrGetStartPendingUploadOptionalParams,
    ) =>
      createOrGetStartPendingUpload(
        context,
        resourceGroupName,
        registryName,
        codeName,
        version,
        body,
        options,
      ),
    list: (
      resourceGroupName: string,
      registryName: string,
      codeName: string,
      options?: RegistryCodeVersionsListOptionalParams,
    ) => list(context, resourceGroupName, registryName, codeName, options),
    delete: (
      resourceGroupName: string,
      registryName: string,
      codeName: string,
      version: string,
      options?: RegistryCodeVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, registryName, codeName, version, options),
    createOrUpdate: (
      resourceGroupName: string,
      registryName: string,
      codeName: string,
      version: string,
      body: CodeVersion,
      options?: RegistryCodeVersionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, registryName, codeName, version, body, options),
    get: (
      resourceGroupName: string,
      registryName: string,
      codeName: string,
      version: string,
      options?: RegistryCodeVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, registryName, codeName, version, options),
  };
}

export function _getRegistryCodeVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): RegistryCodeVersionsOperations {
  return {
    ..._getRegistryCodeVersions(context),
  };
}
