// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ApiManagementContext } from "../../api/apiManagementContext.js";
import { byService } from "../../api/policyRestrictionValidations/operations.js";
import type { PolicyRestrictionValidationsByServiceOptionalParams } from "../../api/policyRestrictionValidations/options.js";
import type { OperationResultContract } from "../../models/models.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PolicyRestrictionValidations operations. */
export interface PolicyRestrictionValidationsOperations {
  /** Validate all policies of API Management services. */
  byService: (
    resourceGroupName: string,
    serviceName: string,
    options?: PolicyRestrictionValidationsByServiceOptionalParams,
  ) => PollerLike<OperationState<OperationResultContract>, OperationResultContract>;
}

function _getPolicyRestrictionValidations(context: ApiManagementContext) {
  return {
    byService: (
      resourceGroupName: string,
      serviceName: string,
      options?: PolicyRestrictionValidationsByServiceOptionalParams,
    ) => byService(context, resourceGroupName, serviceName, options),
  };
}

export function _getPolicyRestrictionValidationsOperations(
  context: ApiManagementContext,
): PolicyRestrictionValidationsOperations {
  return {
    ..._getPolicyRestrictionValidations(context),
  };
}
