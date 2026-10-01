// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PowerPlatformContext } from "../../api/powerPlatformContext.js";
import {
  listBySubscription,
  listByResourceGroup,
  $delete,
  update,
  createOrUpdate,
  get,
} from "../../api/enterprisePolicies/operations.js";
import type {
  EnterprisePoliciesListBySubscriptionOptionalParams,
  EnterprisePoliciesListByResourceGroupOptionalParams,
  EnterprisePoliciesDeleteOptionalParams,
  EnterprisePoliciesUpdateOptionalParams,
  EnterprisePoliciesCreateOrUpdateOptionalParams,
  EnterprisePoliciesGetOptionalParams,
} from "../../api/enterprisePolicies/options.js";
import type { EnterprisePolicy, PatchEnterprisePolicy } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a EnterprisePolicies operations. */
export interface EnterprisePoliciesOperations {
  /** Retrieve a list of EnterprisePolicies within a subscription */
  listBySubscription: (
    options?: EnterprisePoliciesListBySubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<EnterprisePolicy>;
  /** Retrieve a list of EnterprisePolicies within a given resource group */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: EnterprisePoliciesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<EnterprisePolicy>;
  /** Delete an EnterprisePolicy */
  delete: (
    resourceGroupName: string,
    enterprisePolicyName: string,
    options?: EnterprisePoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates an EnterprisePolicy */
  update: (
    enterprisePolicyName: string,
    resourceGroupName: string,
    parameters: PatchEnterprisePolicy,
    options?: EnterprisePoliciesUpdateOptionalParams,
  ) => Promise<EnterprisePolicy>;
  /** Creates an EnterprisePolicy */
  createOrUpdate: (
    enterprisePolicyName: string,
    resourceGroupName: string,
    parameters: EnterprisePolicy,
    options?: EnterprisePoliciesCreateOrUpdateOptionalParams,
  ) => Promise<EnterprisePolicy>;
  /** Get information about an EnterprisePolicy */
  get: (
    enterprisePolicyName: string,
    resourceGroupName: string,
    options?: EnterprisePoliciesGetOptionalParams,
  ) => Promise<EnterprisePolicy>;
}

function _getEnterprisePolicies(context: PowerPlatformContext) {
  return {
    listBySubscription: (options?: EnterprisePoliciesListBySubscriptionOptionalParams) =>
      listBySubscription(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: EnterprisePoliciesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      enterprisePolicyName: string,
      options?: EnterprisePoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, enterprisePolicyName, options),
    update: (
      enterprisePolicyName: string,
      resourceGroupName: string,
      parameters: PatchEnterprisePolicy,
      options?: EnterprisePoliciesUpdateOptionalParams,
    ) => update(context, enterprisePolicyName, resourceGroupName, parameters, options),
    createOrUpdate: (
      enterprisePolicyName: string,
      resourceGroupName: string,
      parameters: EnterprisePolicy,
      options?: EnterprisePoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, enterprisePolicyName, resourceGroupName, parameters, options),
    get: (
      enterprisePolicyName: string,
      resourceGroupName: string,
      options?: EnterprisePoliciesGetOptionalParams,
    ) => get(context, enterprisePolicyName, resourceGroupName, options),
  };
}

export function _getEnterprisePoliciesOperations(
  context: PowerPlatformContext,
): EnterprisePoliciesOperations {
  return {
    ..._getEnterprisePolicies(context),
  };
}
