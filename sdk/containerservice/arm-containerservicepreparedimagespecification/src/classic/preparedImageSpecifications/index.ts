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
} from "../../api/preparedImageSpecifications/operations.js";
import type {
  PreparedImageSpecificationsListVersionsOptionalParams,
  PreparedImageSpecificationsGetVersionOptionalParams,
  PreparedImageSpecificationsListBySubscriptionOptionalParams,
  PreparedImageSpecificationsListByResourceGroupOptionalParams,
  PreparedImageSpecificationsDeleteVersionOptionalParams,
  PreparedImageSpecificationsDeleteOptionalParams,
  PreparedImageSpecificationsUpdateOptionalParams,
  PreparedImageSpecificationsCreateOrUpdateOptionalParams,
  PreparedImageSpecificationsGetOptionalParams,
} from "../../api/preparedImageSpecifications/options.js";
import type {
  PreparedImageSpecification,
  PreparedImageSpecificationPatch,
  PreparedImageSpecificationVersion,
} from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PreparedImageSpecifications operations. */
export interface PreparedImageSpecificationsOperations {
  /** List all versions of a prepared image specification. */
  listVersions: (
    resourceGroupName: string,
    preparedImageSpecificationName: string,
    options?: PreparedImageSpecificationsListVersionsOptionalParams,
  ) => PagedAsyncIterableIterator<PreparedImageSpecificationVersion>;
  /** Get a prepared image specification at a particular version. */
  getVersion: (
    resourceGroupName: string,
    preparedImageSpecificationName: string,
    version: string,
    options?: PreparedImageSpecificationsGetVersionOptionalParams,
  ) => Promise<PreparedImageSpecificationVersion>;
  /** List the prepared image specifications in a subscription at the latest version. */
  listBySubscription: (
    options?: PreparedImageSpecificationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PreparedImageSpecification>;
  /** List the prepared image specifications in a resource group at the latest version. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: PreparedImageSpecificationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PreparedImageSpecification>;
  /** Delete a prepared image specification version. This operation will be blocked if the prepared image specification version is in use. */
  deleteVersion: (
    resourceGroupName: string,
    preparedImageSpecificationName: string,
    version: string,
    options?: PreparedImageSpecificationsDeleteVersionOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Delete a prepared image specification. This operation will be blocked if the resource is in use. */
  delete: (
    resourceGroupName: string,
    preparedImageSpecificationName: string,
    options?: PreparedImageSpecificationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update the tags of a prepared image specification. */
  update: (
    resourceGroupName: string,
    preparedImageSpecificationName: string,
    properties: PreparedImageSpecificationPatch,
    options?: PreparedImageSpecificationsUpdateOptionalParams,
  ) => Promise<PreparedImageSpecification>;
  /** Create or update a prepared image specification resource with a client-provided version. Created versions are immutable; provide a different properties.version value to create a new version. */
  createOrUpdate: (
    resourceGroupName: string,
    preparedImageSpecificationName: string,
    resource: PreparedImageSpecification,
    options?: PreparedImageSpecificationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PreparedImageSpecification>, PreparedImageSpecification>;
  /** Get a prepared image specification at the latest version. */
  get: (
    resourceGroupName: string,
    preparedImageSpecificationName: string,
    options?: PreparedImageSpecificationsGetOptionalParams,
  ) => Promise<PreparedImageSpecification>;
}

function _getPreparedImageSpecifications(context: ContainerServiceContext) {
  return {
    listVersions: (
      resourceGroupName: string,
      preparedImageSpecificationName: string,
      options?: PreparedImageSpecificationsListVersionsOptionalParams,
    ) => listVersions(context, resourceGroupName, preparedImageSpecificationName, options),
    getVersion: (
      resourceGroupName: string,
      preparedImageSpecificationName: string,
      version: string,
      options?: PreparedImageSpecificationsGetVersionOptionalParams,
    ) => getVersion(context, resourceGroupName, preparedImageSpecificationName, version, options),
    listBySubscription: (options?: PreparedImageSpecificationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: PreparedImageSpecificationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    deleteVersion: (
      resourceGroupName: string,
      preparedImageSpecificationName: string,
      version: string,
      options?: PreparedImageSpecificationsDeleteVersionOptionalParams,
    ) =>
      deleteVersion(context, resourceGroupName, preparedImageSpecificationName, version, options),
    delete: (
      resourceGroupName: string,
      preparedImageSpecificationName: string,
      options?: PreparedImageSpecificationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, preparedImageSpecificationName, options),
    update: (
      resourceGroupName: string,
      preparedImageSpecificationName: string,
      properties: PreparedImageSpecificationPatch,
      options?: PreparedImageSpecificationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, preparedImageSpecificationName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      preparedImageSpecificationName: string,
      resource: PreparedImageSpecification,
      options?: PreparedImageSpecificationsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, preparedImageSpecificationName, resource, options),
    get: (
      resourceGroupName: string,
      preparedImageSpecificationName: string,
      options?: PreparedImageSpecificationsGetOptionalParams,
    ) => get(context, resourceGroupName, preparedImageSpecificationName, options),
  };
}

export function _getPreparedImageSpecificationsOperations(
  context: ContainerServiceContext,
): PreparedImageSpecificationsOperations {
  return {
    ..._getPreparedImageSpecifications(context),
  };
}
