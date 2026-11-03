// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  createOrGetStartPendingUpload,
  publish,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/codeVersions/operations.js";
import type {
  CodeVersionsCreateOrGetStartPendingUploadOptionalParams,
  CodeVersionsPublishOptionalParams,
  CodeVersionsListOptionalParams,
  CodeVersionsDeleteOptionalParams,
  CodeVersionsCreateOrUpdateOptionalParams,
  CodeVersionsGetOptionalParams,
} from "../../api/codeVersions/options.js";
import type {
  CodeVersion,
  DestinationAsset,
  PendingUploadRequestDto,
  PendingUploadResponseDto,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CodeVersions operations. */
export interface CodeVersionsOperations {
  /** Generate a storage location and credential for the client to upload a code asset to. */
  createOrGetStartPendingUpload: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: PendingUploadRequestDto,
    options?: CodeVersionsCreateOrGetStartPendingUploadOptionalParams,
  ) => Promise<PendingUploadResponseDto>;
  /** Publish version asset into registry. */
  publish: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: DestinationAsset,
    options?: CodeVersionsPublishOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use publish instead */
  beginPublish: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: DestinationAsset,
    options?: CodeVersionsPublishOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use publish instead */
  beginPublishAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: DestinationAsset,
    options?: CodeVersionsPublishOptionalParams,
  ) => Promise<void>;
  /** List versions. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: CodeVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<CodeVersion>;
  /** Delete version. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: CodeVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: CodeVersion,
    options?: CodeVersionsCreateOrUpdateOptionalParams,
  ) => Promise<CodeVersion>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: CodeVersionsGetOptionalParams,
  ) => Promise<CodeVersion>;
}

function _getCodeVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    createOrGetStartPendingUpload: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: PendingUploadRequestDto,
      options?: CodeVersionsCreateOrGetStartPendingUploadOptionalParams,
    ) =>
      createOrGetStartPendingUpload(
        context,
        resourceGroupName,
        workspaceName,
        name,
        version,
        body,
        options,
      ),
    publish: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: DestinationAsset,
      options?: CodeVersionsPublishOptionalParams,
    ) => publish(context, resourceGroupName, workspaceName, name, version, body, options),
    beginPublish: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: DestinationAsset,
      options?: CodeVersionsPublishOptionalParams,
    ) => {
      const poller = publish(
        context,
        resourceGroupName,
        workspaceName,
        name,
        version,
        body,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginPublishAndWait: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: DestinationAsset,
      options?: CodeVersionsPublishOptionalParams,
    ) => {
      return await publish(context, resourceGroupName, workspaceName, name, version, body, options);
    },
    list: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: CodeVersionsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, name, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: CodeVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, version, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: CodeVersion,
      options?: CodeVersionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, version, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: CodeVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, version, options),
  };
}

export function _getCodeVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): CodeVersionsOperations {
  return {
    ..._getCodeVersions(context),
  };
}
