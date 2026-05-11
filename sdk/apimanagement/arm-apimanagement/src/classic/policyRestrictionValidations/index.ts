// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementContext } from "../../api/apiManagementContext.js";
import { byService } from "../../api/policyRestrictionValidations/operations.js";
import { PolicyRestrictionValidationsByServiceOptionalParams } from "../../api/policyRestrictionValidations/options.js";
import { OperationResultContract } from "../../models/models.js";
import { SimplePollerLike, getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PolicyRestrictionValidations operations. */
export interface PolicyRestrictionValidationsOperations {
  /** Validate all policies of API Management services. */
  byService: (
    resourceGroupName: string,
    serviceName: string,
    options?: PolicyRestrictionValidationsByServiceOptionalParams,
  ) => PollerLike<OperationState<OperationResultContract>, OperationResultContract>;
  /** @deprecated use byService instead */
  beginByService: (
    resourceGroupName: string,
    serviceName: string,
    options?: PolicyRestrictionValidationsByServiceOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<OperationResultContract>, OperationResultContract>>;
  /** @deprecated use byService instead */
  beginByServiceAndWait: (
    resourceGroupName: string,
    serviceName: string,
    options?: PolicyRestrictionValidationsByServiceOptionalParams,
  ) => Promise<OperationResultContract>;
}

function _getPolicyRestrictionValidations(context: ApiManagementContext) {
  return {
    byService: (
      resourceGroupName: string,
      serviceName: string,
      options?: PolicyRestrictionValidationsByServiceOptionalParams,
    ) => byService(context, resourceGroupName, serviceName, options),
    beginByService: async (
      resourceGroupName: string,
      serviceName: string,
      options?: PolicyRestrictionValidationsByServiceOptionalParams,
    ) => {
      const poller = byService(context, resourceGroupName, serviceName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginByServiceAndWait: async (
      resourceGroupName: string,
      serviceName: string,
      options?: PolicyRestrictionValidationsByServiceOptionalParams,
    ) => {
      return await byService(context, resourceGroupName, serviceName, options);
    },
  };
}

export function _getPolicyRestrictionValidationsOperations(
  context: ApiManagementContext,
): PolicyRestrictionValidationsOperations {
  return {
    ..._getPolicyRestrictionValidations(context),
  };
}
