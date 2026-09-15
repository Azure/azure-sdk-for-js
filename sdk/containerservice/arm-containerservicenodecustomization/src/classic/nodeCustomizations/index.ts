// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceContext } from "../../api/containerServiceContext.js";
import {
  listVersions,
  getVersion,
  listBySubscription,
  listByResourceGroup,
  deleteVersion,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/nodeCustomizations/operations.js";
import type {
  NodeCustomizationsListVersionsOptionalParams,
  NodeCustomizationsGetVersionOptionalParams,
  NodeCustomizationsListBySubscriptionOptionalParams,
  NodeCustomizationsListByResourceGroupOptionalParams,
  NodeCustomizationsDeleteVersionOptionalParams,
  NodeCustomizationsDeleteOptionalParams,
  NodeCustomizationsUpdateOptionalParams,
  NodeCustomizationsCreateOrUpdateOptionalParams,
  NodeCustomizationsGetOptionalParams,
} from "../../api/nodeCustomizations/options.js";
import type {
  NodeCustomization,
  NodeCustomizationUpdate,
  NodeCustomizationVersion,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a NodeCustomizations operations. */
export interface NodeCustomizationsOperations {
  /** Deprecated: List all versions of a node customization. Use Prepared Image Specification APIs instead. */
  listVersions: (
    resourceGroupName: string,
    nodeCustomizationName: string,
    options?: NodeCustomizationsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<NodeCustomizationVersion>;
  /** Deprecated: Get a node customization at a particular version. Use Prepared Image Specification APIs instead. */
  getVersion: (
    resourceGroupName: string,
    nodeCustomizationName: string,
    version: string,
    options?: NodeCustomizationsGetVersionOptionalParams,
  ) => Promise<NodeCustomizationVersion>;
  /** Deprecated: List the node customizations in a subscription at the latest version. Use Prepared Image Specification APIs instead. */
  listBySubscription: (
    options?: NodeCustomizationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<NodeCustomization>;
  /** Deprecated: List the node customizations in a resource group at the latest version. Use Prepared Image Specification APIs instead. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: NodeCustomizationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<NodeCustomization>;
  /** Deprecated: Delete a node customization version. This operation will be blocked if the node customization version is in use. Use Prepared Image Specification APIs instead. */
  deleteVersion: (
    resourceGroupName: string,
    nodeCustomizationName: string,
    version: string,
    options?: NodeCustomizationsDeleteVersionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Deprecated: Delete a node customization. This operation will be blocked if the resource is in use. Use Prepared Image Specification APIs instead. */
  delete: (
    resourceGroupName: string,
    nodeCustomizationName: string,
    options?: NodeCustomizationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Deprecated: Update a node customization. Use Prepared Image Specification APIs instead. */
  update: (
    resourceGroupName: string,
    nodeCustomizationName: string,
    properties: NodeCustomizationUpdate,
    options?: NodeCustomizationsUpdateOptionalParams,
  ) => PollerLike<OperationState<NodeCustomization>, NodeCustomization>;
  /** Deprecated: Create or update a node customization resource. This will create a new version. Use Prepared Image Specification APIs instead. */
  createOrUpdate: (
    resourceGroupName: string,
    nodeCustomizationName: string,
    resource: NodeCustomization,
    options?: NodeCustomizationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<NodeCustomization>, NodeCustomization>;
  /** Deprecated: Get a node customization at the latest version. Use Prepared Image Specification APIs instead. */
  get: (
    resourceGroupName: string,
    nodeCustomizationName: string,
    options?: NodeCustomizationsGetOptionalParams,
  ) => Promise<NodeCustomization>;
}

function _getNodeCustomizations(context: ContainerServiceContext) {
  return {
    listVersions: (
      resourceGroupName: string,
      nodeCustomizationName: string,
      options?: NodeCustomizationsListVersionsOptionalParams,
    ) => listVersions(context, resourceGroupName, nodeCustomizationName, options),
    getVersion: (
      resourceGroupName: string,
      nodeCustomizationName: string,
      version: string,
      options?: NodeCustomizationsGetVersionOptionalParams,
    ) => getVersion(context, resourceGroupName, nodeCustomizationName, version, options),
    listBySubscription: (options?: NodeCustomizationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: NodeCustomizationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    deleteVersion: (
      resourceGroupName: string,
      nodeCustomizationName: string,
      version: string,
      options?: NodeCustomizationsDeleteVersionOptionalParams,
    ) => deleteVersion(context, resourceGroupName, nodeCustomizationName, version, options),
    delete: (
      resourceGroupName: string,
      nodeCustomizationName: string,
      options?: NodeCustomizationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, nodeCustomizationName, options),
    update: (
      resourceGroupName: string,
      nodeCustomizationName: string,
      properties: NodeCustomizationUpdate,
      options?: NodeCustomizationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, nodeCustomizationName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      nodeCustomizationName: string,
      resource: NodeCustomization,
      options?: NodeCustomizationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, nodeCustomizationName, resource, options),
    get: (
      resourceGroupName: string,
      nodeCustomizationName: string,
      options?: NodeCustomizationsGetOptionalParams,
    ) => get(context, resourceGroupName, nodeCustomizationName, options),
  };
}

export function _getNodeCustomizationsOperations(
  context: ContainerServiceContext,
): NodeCustomizationsOperations {
  return {
    ..._getNodeCustomizations(context),
  };
}
