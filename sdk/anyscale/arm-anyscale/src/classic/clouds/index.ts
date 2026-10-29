// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext } from "../../api/platformContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/clouds/operations.js";
import type {
  CloudsListBySubscriptionOptionalParams,
  CloudsListByResourceGroupOptionalParams,
  CloudsDeleteOptionalParams,
  CloudsUpdateOptionalParams,
  CloudsCreateOrUpdateOptionalParams,
  CloudsGetOptionalParams,
} from "../../api/clouds/options.js";
import type { Cloud, CloudUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a Clouds operations. */
export interface CloudsOperations {
  /** List cloud resources by subscription */
  listBySubscription: (
    options?: CloudsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<Cloud>;
  /** List cloud resources by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CloudsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<Cloud>;
  /** Delete a cloud resource */
  delete: (
    resourceGroupName: string,
    cloudName: string,
    options?: CloudsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a cloud resource */
  update: (
    resourceGroupName: string,
    cloudName: string,
    properties: CloudUpdate,
    options?: CloudsUpdateOptionalParams,
  ) => Promise<Cloud>;
  /** Create or update a cloud resource */
  createOrUpdate: (
    resourceGroupName: string,
    cloudName: string,
    resource: Cloud,
    options?: CloudsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<Cloud>, Cloud>;
  /** Get a cloud resource */
  get: (
    resourceGroupName: string,
    cloudName: string,
    options?: CloudsGetOptionalParams,
  ) => Promise<Cloud>;
}

function _getClouds(context: PlatformContext) {
  return {
    listBySubscription: (options?: CloudsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CloudsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (resourceGroupName: string, cloudName: string, options?: CloudsDeleteOptionalParams) =>
      $delete(context, resourceGroupName, cloudName, options),
    update: (
      resourceGroupName: string,
      cloudName: string,
      properties: CloudUpdate,
      options?: CloudsUpdateOptionalParams,
    ) => update(context, resourceGroupName, cloudName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudName: string,
      resource: Cloud,
      options?: CloudsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, cloudName, resource, options),
    get: (resourceGroupName: string, cloudName: string, options?: CloudsGetOptionalParams) =>
      get(context, resourceGroupName, cloudName, options),
  };
}

export function _getCloudsOperations(context: PlatformContext): CloudsOperations {
  return {
    ..._getClouds(context),
  };
}
