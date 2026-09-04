// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlatformValidationContext } from "../../api/platformValidationContext.js";
import {
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/validationExecutionPlans/operations.js";
import {
  ValidationExecutionPlansListByResourceGroupOptionalParams,
  ValidationExecutionPlansDeleteOptionalParams,
  ValidationExecutionPlansUpdateOptionalParams,
  ValidationExecutionPlansCreateOrUpdateOptionalParams,
  ValidationExecutionPlansGetOptionalParams,
} from "../../api/validationExecutionPlans/options.js";
import { ValidationExecutionPlan, ValidationExecutionPlanUpdate } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ValidationExecutionPlans operations. */
export interface ValidationExecutionPlansOperations {
  /** List validation test execution plans by resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    cloudValidationName: string,
    options?: ValidationExecutionPlansListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ValidationExecutionPlan>;
  /** Delete a validation test execution plan */
  delete: (
    resourceGroupName: string,
    cloudValidationName: string,
    validationExecutionPlanName: string,
    options?: ValidationExecutionPlansDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a validation test execution plan */
  update: (
    resourceGroupName: string,
    cloudValidationName: string,
    validationExecutionPlanName: string,
    properties: ValidationExecutionPlanUpdate,
    options?: ValidationExecutionPlansUpdateOptionalParams,
  ) => PollerLike<OperationState<ValidationExecutionPlan>, ValidationExecutionPlan>;
  /** Create or update a validation test execution plan */
  createOrUpdate: (
    resourceGroupName: string,
    cloudValidationName: string,
    validationExecutionPlanName: string,
    resource: ValidationExecutionPlan,
    options?: ValidationExecutionPlansCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ValidationExecutionPlan>, ValidationExecutionPlan>;
  /** Get a validation test execution plan */
  get: (
    resourceGroupName: string,
    cloudValidationName: string,
    validationExecutionPlanName: string,
    options?: ValidationExecutionPlansGetOptionalParams,
  ) => Promise<ValidationExecutionPlan>;
}

function _getValidationExecutionPlans(context: PlatformValidationContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      cloudValidationName: string,
      options?: ValidationExecutionPlansListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, cloudValidationName, options),
    delete: (
      resourceGroupName: string,
      cloudValidationName: string,
      validationExecutionPlanName: string,
      options?: ValidationExecutionPlansDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        options,
      ),
    update: (
      resourceGroupName: string,
      cloudValidationName: string,
      validationExecutionPlanName: string,
      properties: ValidationExecutionPlanUpdate,
      options?: ValidationExecutionPlansUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        properties,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      cloudValidationName: string,
      validationExecutionPlanName: string,
      resource: ValidationExecutionPlan,
      options?: ValidationExecutionPlansCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        cloudValidationName,
        validationExecutionPlanName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      cloudValidationName: string,
      validationExecutionPlanName: string,
      options?: ValidationExecutionPlansGetOptionalParams,
    ) => get(context, resourceGroupName, cloudValidationName, validationExecutionPlanName, options),
  };
}

export function _getValidationExecutionPlansOperations(
  context: PlatformValidationContext,
): ValidationExecutionPlansOperations {
  return {
    ..._getValidationExecutionPlans(context),
  };
}
