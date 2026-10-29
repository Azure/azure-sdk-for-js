// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformContext } from "../../api/platformContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/computeConfigs/operations.js";
import type {
  ComputeConfigsListByResourceGroupOptionalParams,
  ComputeConfigsDeleteOptionalParams,
  ComputeConfigsUpdateOptionalParams,
  ComputeConfigsCreateOrUpdateOptionalParams,
  ComputeConfigsGetOptionalParams,
} from "../../api/computeConfigs/options.js";
import type { ComputeConfig, ComputeConfigUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ComputeConfigs operations. */
export interface ComputeConfigsOperations {
  /** Lists compute configs in a cloud. */
  listByResourceGroup: (
    resourceGroupName: string,
    cloudName: string,
    options?: ComputeConfigsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ComputeConfig>;
  /** Deletes a compute config. */
  delete: (
    resourceGroupName: string,
    cloudName: string,
    computeConfigName: string,
    options?: ComputeConfigsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates a compute config. */
  update: (
    resourceGroupName: string,
    cloudName: string,
    computeConfigName: string,
    properties: ComputeConfigUpdate,
    options?: ComputeConfigsUpdateOptionalParams,
  ) => Promise<ComputeConfig>;
  /** Creates or updates a compute config. */
  createOrUpdate: (
    resourceGroupName: string,
    cloudName: string,
    computeConfigName: string,
    resource: ComputeConfig,
    options?: ComputeConfigsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ComputeConfig>, ComputeConfig>;
  /** Gets a compute config. */
  get: (
    resourceGroupName: string,
    cloudName: string,
    computeConfigName: string,
    options?: ComputeConfigsGetOptionalParams,
  ) => Promise<ComputeConfig>;
}

function _getComputeConfigs(context: PlatformContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      cloudName: string,
      options?: ComputeConfigsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, cloudName, options),
    delete: (
      resourceGroupName: string,
      cloudName: string,
      computeConfigName: string,
      options?: ComputeConfigsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudName, computeConfigName, options),
    update: (
      resourceGroupName: string,
      cloudName: string,
      computeConfigName: string,
      properties: ComputeConfigUpdate,
      options?: ComputeConfigsUpdateOptionalParams,
    ) => update(context, resourceGroupName, cloudName, computeConfigName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudName: string,
      computeConfigName: string,
      resource: ComputeConfig,
      options?: ComputeConfigsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(context, resourceGroupName, cloudName, computeConfigName, resource, options),
    get: (
      resourceGroupName: string,
      cloudName: string,
      computeConfigName: string,
      options?: ComputeConfigsGetOptionalParams,
    ) => get(context, resourceGroupName, cloudName, computeConfigName, options),
  };
}

export function _getComputeConfigsOperations(context: PlatformContext): ComputeConfigsOperations {
  return {
    ..._getComputeConfigs(context),
  };
}
