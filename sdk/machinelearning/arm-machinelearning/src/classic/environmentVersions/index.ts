// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  publish,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/environmentVersions/operations.js";
import type {
  EnvironmentVersionsPublishOptionalParams,
  EnvironmentVersionsListOptionalParams,
  EnvironmentVersionsDeleteOptionalParams,
  EnvironmentVersionsCreateOrUpdateOptionalParams,
  EnvironmentVersionsGetOptionalParams,
} from "../../api/environmentVersions/options.js";
import type { DestinationAsset, EnvironmentVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a EnvironmentVersions operations. */
export interface EnvironmentVersionsOperations {
  /** Publish version asset into registry. */
  publish: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: DestinationAsset,
    options?: EnvironmentVersionsPublishOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use publish instead */
  beginPublish: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: DestinationAsset,
    options?: EnvironmentVersionsPublishOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use publish instead */
  beginPublishAndWait: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: DestinationAsset,
    options?: EnvironmentVersionsPublishOptionalParams,
  ) => Promise<void>;
  /** List versions. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: EnvironmentVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<EnvironmentVersion>;
  /** Delete version. */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: EnvironmentVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates or updates an EnvironmentVersion. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: EnvironmentVersion,
    options?: EnvironmentVersionsCreateOrUpdateOptionalParams,
  ) => Promise<EnvironmentVersion>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: EnvironmentVersionsGetOptionalParams,
  ) => Promise<EnvironmentVersion>;
}

function _getEnvironmentVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    publish: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: DestinationAsset,
      options?: EnvironmentVersionsPublishOptionalParams,
    ) => publish(context, resourceGroupName, workspaceName, name, version, body, options),
    beginPublish: async (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: DestinationAsset,
      options?: EnvironmentVersionsPublishOptionalParams,
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
      options?: EnvironmentVersionsPublishOptionalParams,
    ) => {
      return await publish(context, resourceGroupName, workspaceName, name, version, body, options);
    },
    list: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: EnvironmentVersionsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, name, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: EnvironmentVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, version, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: EnvironmentVersion,
      options?: EnvironmentVersionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, version, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: EnvironmentVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, version, options),
  };
}

export function _getEnvironmentVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): EnvironmentVersionsOperations {
  return {
    ..._getEnvironmentVersions(context),
  };
}
