// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PlatformValidationContext } from "../../api/platformValidationContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/cloudValidations/operations.js";
import type {
  CloudValidationsListBySubscriptionOptionalParams,
  CloudValidationsListByResourceGroupOptionalParams,
  CloudValidationsDeleteOptionalParams,
  CloudValidationsUpdateOptionalParams,
  CloudValidationsCreateOrUpdateOptionalParams,
  CloudValidationsGetOptionalParams,
} from "../../api/cloudValidations/options.js";
import type { CloudValidation, CloudValidationUpdate } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CloudValidations operations. */
export interface CloudValidationsOperations {
  /** List cloud validations by subscription */
  listBySubscription: (
    options?: CloudValidationsListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<CloudValidation>;
  /** List cloud validations by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: CloudValidationsListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<CloudValidation>;
  /** Delete a cloud validation */
  delete: (
    resourceGroupName: string,
    cloudValidationName: string,
    options?: CloudValidationsDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a cloud validation */
  update: (
    resourceGroupName: string,
    cloudValidationName: string,
    properties: CloudValidationUpdate,
    options?: CloudValidationsUpdateOptionalParams,
  ) => PollerLike<OperationState<CloudValidation>, CloudValidation>;
  /** Create or update a cloud validation */
  createOrUpdate: (
    resourceGroupName: string,
    cloudValidationName: string,
    resource: CloudValidation,
    options?: CloudValidationsCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CloudValidation>, CloudValidation>;
  /** Get a cloud validation */
  get: (
    resourceGroupName: string,
    cloudValidationName: string,
    options?: CloudValidationsGetOptionalParams,
  ) => Promise<CloudValidation>;
}

function _getCloudValidations(context: PlatformValidationContext) {
  return {
    listBySubscription: (options?: CloudValidationsListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: CloudValidationsListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      cloudValidationName: string,
      options?: CloudValidationsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, cloudValidationName, options),
    update: (
      resourceGroupName: string,
      cloudValidationName: string,
      properties: CloudValidationUpdate,
      options?: CloudValidationsUpdateOptionalParams,
    ) => update(context, resourceGroupName, cloudValidationName, properties, options),
    createOrUpdate: (
      resourceGroupName: string,
      cloudValidationName: string,
      resource: CloudValidation,
      options?: CloudValidationsCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, cloudValidationName, resource, options),
    get: (
      resourceGroupName: string,
      cloudValidationName: string,
      options?: CloudValidationsGetOptionalParams,
    ) => get(context, resourceGroupName, cloudValidationName, options),
  };
}

export function _getCloudValidationsOperations(
  context: PlatformValidationContext,
): CloudValidationsOperations {
  return {
    ..._getCloudValidations(context),
  };
}
