// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureMachineLearningServicesManagementContext } from "../../api/azureMachineLearningServicesManagementContext.js";
import {
  publish,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/componentVersions/operations.js";
import type {
  ComponentVersionsPublishOptionalParams,
  ComponentVersionsListOptionalParams,
  ComponentVersionsDeleteOptionalParams,
  ComponentVersionsCreateOrUpdateOptionalParams,
  ComponentVersionsGetOptionalParams,
} from "../../api/componentVersions/options.js";
import type { DestinationAsset, ComponentVersion } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ComponentVersions operations. */
export interface ComponentVersionsOperations {
  /** Publish version asset into registry. */
  publish: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: DestinationAsset,
    options?: ComponentVersionsPublishOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** List component versions. */
  list: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    options?: ComponentVersionsListOptionalParams,
  ) => PagedAsyncIterableIterator<ComponentVersion>;
  /** Delete version. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: ComponentVersionsDeleteOptionalParams,
  ) => Promise<void>;
  /** Create or update version. */
  createOrUpdate: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    body: ComponentVersion,
    options?: ComponentVersionsCreateOrUpdateOptionalParams,
  ) => Promise<ComponentVersion>;
  /** Get version. */
  get: (
    resourceGroupName: string,
    workspaceName: string,
    name: string,
    version: string,
    options?: ComponentVersionsGetOptionalParams,
  ) => Promise<ComponentVersion>;
}

function _getComponentVersions(context: AzureMachineLearningServicesManagementContext) {
  return {
    publish: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: DestinationAsset,
      options?: ComponentVersionsPublishOptionalParams,
    ) => publish(context, resourceGroupName, workspaceName, name, version, body, options),
    list: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      options?: ComponentVersionsListOptionalParams,
    ) => list(context, resourceGroupName, workspaceName, name, options),
    delete: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: ComponentVersionsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, workspaceName, name, version, options),
    createOrUpdate: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      body: ComponentVersion,
      options?: ComponentVersionsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, workspaceName, name, version, body, options),
    get: (
      resourceGroupName: string,
      workspaceName: string,
      name: string,
      version: string,
      options?: ComponentVersionsGetOptionalParams,
    ) => get(context, resourceGroupName, workspaceName, name, version, options),
  };
}

export function _getComponentVersionsOperations(
  context: AzureMachineLearningServicesManagementContext,
): ComponentVersionsOperations {
  return {
    ..._getComponentVersions(context),
  };
}
