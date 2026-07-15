// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { KustoManagementContext } from "../../api/kustoManagementContext.js";
import {
  checkNameAvailability,
  listByCluster,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/sandboxCustomImages/operations.js";
import type {
  SandboxCustomImagesCheckNameAvailabilityOptionalParams,
  SandboxCustomImagesListByClusterOptionalParams,
  SandboxCustomImagesDeleteOptionalParams,
  SandboxCustomImagesUpdateOptionalParams,
  SandboxCustomImagesCreateOrUpdateOptionalParams,
  SandboxCustomImagesGetOptionalParams,
} from "../../api/sandboxCustomImages/options.js";
import type {
  CheckNameResult,
  SandboxCustomImage,
  SandboxCustomImagesCheckNameRequest,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a SandboxCustomImages operations. */
export interface SandboxCustomImagesOperations {
  /** Checks that the sandbox custom image resource name is valid and is not already in use. */
  checkNameAvailability: (
    resourceGroupName: string,
    clusterName: string,
    resourceName: SandboxCustomImagesCheckNameRequest,
    options?: SandboxCustomImagesCheckNameAvailabilityOptionalParams,
  ) => Promise<CheckNameResult>;
  /** Returns the list of the existing sandbox custom images of the given Kusto cluster. */
  listByCluster: (
    resourceGroupName: string,
    clusterName: string,
    options?: SandboxCustomImagesListByClusterOptionalParams,
  ) => PagedAsyncIterableIterator<SandboxCustomImage>;
  /** Deletes a sandbox custom image. */
  delete: (
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    options?: SandboxCustomImagesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    options?: SandboxCustomImagesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    options?: SandboxCustomImagesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates a sandbox custom image. */
  update: (
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    parameters: SandboxCustomImage,
    options?: SandboxCustomImagesUpdateOptionalParams,
  ) => PollerLike<OperationState<SandboxCustomImage>, SandboxCustomImage>;
  /** @deprecated use update instead */
  beginUpdate: (
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    parameters: SandboxCustomImage,
    options?: SandboxCustomImagesUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SandboxCustomImage>, SandboxCustomImage>>;
  /** @deprecated use update instead */
  beginUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    parameters: SandboxCustomImage,
    options?: SandboxCustomImagesUpdateOptionalParams,
  ) => Promise<SandboxCustomImage>;
  /** Creates or updates a sandbox custom image. */
  createOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    parameters: SandboxCustomImage,
    options?: SandboxCustomImagesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<SandboxCustomImage>, SandboxCustomImage>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    parameters: SandboxCustomImage,
    options?: SandboxCustomImagesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<SandboxCustomImage>, SandboxCustomImage>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    parameters: SandboxCustomImage,
    options?: SandboxCustomImagesCreateOrUpdateOptionalParams,
  ) => Promise<SandboxCustomImage>;
  /** Returns a sandbox custom image */
  get: (
    resourceGroupName: string,
    clusterName: string,
    sandboxCustomImageName: string,
    options?: SandboxCustomImagesGetOptionalParams,
  ) => Promise<SandboxCustomImage>;
}

function _getSandboxCustomImages(context: KustoManagementContext) {
  return {
    checkNameAvailability: (
      resourceGroupName: string,
      clusterName: string,
      resourceName: SandboxCustomImagesCheckNameRequest,
      options?: SandboxCustomImagesCheckNameAvailabilityOptionalParams,
    ) => checkNameAvailability(context, resourceGroupName, clusterName, resourceName, options),
    listByCluster: (
      resourceGroupName: string,
      clusterName: string,
      options?: SandboxCustomImagesListByClusterOptionalParams,
    ) => listByCluster(context, resourceGroupName, clusterName, options),
    delete: (
      resourceGroupName: string,
      clusterName: string,
      sandboxCustomImageName: string,
      options?: SandboxCustomImagesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, clusterName, sandboxCustomImageName, options),
    beginDelete: async (
      resourceGroupName: string,
      clusterName: string,
      sandboxCustomImageName: string,
      options?: SandboxCustomImagesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        clusterName,
        sandboxCustomImageName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      sandboxCustomImageName: string,
      options?: SandboxCustomImagesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        clusterName,
        sandboxCustomImageName,
        options,
      );
    },
    update: (
      resourceGroupName: string,
      clusterName: string,
      sandboxCustomImageName: string,
      parameters: SandboxCustomImage,
      options?: SandboxCustomImagesUpdateOptionalParams,
    ) =>
      update(context, resourceGroupName, clusterName, sandboxCustomImageName, parameters, options),
    beginUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      sandboxCustomImageName: string,
      parameters: SandboxCustomImage,
      options?: SandboxCustomImagesUpdateOptionalParams,
    ) => {
      const poller = update(
        context,
        resourceGroupName,
        clusterName,
        sandboxCustomImageName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      sandboxCustomImageName: string,
      parameters: SandboxCustomImage,
      options?: SandboxCustomImagesUpdateOptionalParams,
    ) => {
      return await update(
        context,
        resourceGroupName,
        clusterName,
        sandboxCustomImageName,
        parameters,
        options,
      );
    },
    createOrUpdate: (
      resourceGroupName: string,
      clusterName: string,
      sandboxCustomImageName: string,
      parameters: SandboxCustomImage,
      options?: SandboxCustomImagesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        sandboxCustomImageName,
        parameters,
        options,
      ),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      clusterName: string,
      sandboxCustomImageName: string,
      parameters: SandboxCustomImage,
      options?: SandboxCustomImagesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        sandboxCustomImageName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      clusterName: string,
      sandboxCustomImageName: string,
      parameters: SandboxCustomImage,
      options?: SandboxCustomImagesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        clusterName,
        sandboxCustomImageName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      clusterName: string,
      sandboxCustomImageName: string,
      options?: SandboxCustomImagesGetOptionalParams,
    ) => get(context, resourceGroupName, clusterName, sandboxCustomImageName, options),
  };
}

export function _getSandboxCustomImagesOperations(
  context: KustoManagementContext,
): SandboxCustomImagesOperations {
  return {
    ..._getSandboxCustomImages(context),
  };
}
