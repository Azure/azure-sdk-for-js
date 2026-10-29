// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext } from "../../api/platformContext.js";
import {
  listByResourceGroup,
  get,
  $delete,
  update,
  createOrUpdate,
} from "../../api/cloudResources/operations.js";
import type {
  CloudResourcesListByResourceGroupOptionalParams,
  CloudResourcesGetOptionalParams,
  CloudResourcesDeleteOptionalParams,
  CloudResourcesUpdateOptionalParams,
  CloudResourcesCreateOrUpdateOptionalParams,
} from "../../api/cloudResources/options.js";
import type { CloudResource, CloudResourceUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CloudResources operations. */
export interface CloudResourcesOperations {
  /** List cloud resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    cloudName: string,
    options?: CloudResourcesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CloudResource>;
  /** Get a cloud resource */
  get: (
    resourceGroupName: string,
    cloudName: string,
    cloudResourceName: string,
    options?: CloudResourcesGetOptionalParams,
  ) => Promise<CloudResource>;
  /** Delete a cloud resource */
  delete: (
    resourceGroupName: string,
    cloudName: string,
    cloudResourceName: string,
    options?: CloudResourcesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a cloud resource */
  update: (
    resourceGroupName: string,
    cloudName: string,
    cloudResourceName: string,
    properties: CloudResourceUpdate,
    options?: CloudResourcesUpdateOptionalParams,
  ) => Promise<CloudResource>;
  /** Create or update a cloud resource */
  createOrUpdate: (
    resourceGroupName: string,
    cloudName: string,
    cloudResourceName: string,
    resource: CloudResource,
    options?: CloudResourcesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CloudResource>, CloudResource>;
}

function _getCloudResources(context: PlatformContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      cloudName: string,
      options?: CloudResourcesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, cloudName, options),
    get: (
      resourceGroupName: string,
      cloudName: string,
      cloudResourceName: string,
      options?: CloudResourcesGetOptionalParams,
    ) => get(context, resourceGroupName, cloudName, cloudResourceName, options),
    delete: (
      resourceGroupName: string,
      cloudName: string,
      cloudResourceName: string,
      options?: CloudResourcesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudName, cloudResourceName, options),
    update: (
      resourceGroupName: string,
      cloudName: string,
      cloudResourceName: string,
      properties: CloudResourceUpdate,
      options?: CloudResourcesUpdateOptionalParams,
    ) => update(context, resourceGroupName, cloudName, cloudResourceName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudName: string,
      cloudResourceName: string,
      resource: CloudResource,
      options?: CloudResourcesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, cloudName, cloudResourceName, resource, options),
  };
}

export function _getCloudResourcesOperations(context: PlatformContext): CloudResourcesOperations {
  return {
    ..._getCloudResources(context),
  };
}
