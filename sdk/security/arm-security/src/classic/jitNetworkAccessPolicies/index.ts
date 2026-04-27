// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { SecurityCenterContext } from "../../api/securityCenterContext.js";
import {
  listByResourceGroup,
  list,
  initiate,
  listByRegion,
  listByResourceGroupAndRegion,
  $delete,
  createOrUpdate,
  get,
} from "../../api/jitNetworkAccessPolicies/operations.js";
import type {
  JitNetworkAccessPoliciesListByResourceGroupOptionalParams,
  JitNetworkAccessPoliciesListOptionalParams,
  JitNetworkAccessPoliciesInitiateOptionalParams,
  JitNetworkAccessPoliciesListByRegionOptionalParams,
  JitNetworkAccessPoliciesListByResourceGroupAndRegionOptionalParams,
  JitNetworkAccessPoliciesDeleteOptionalParams,
  JitNetworkAccessPoliciesCreateOrUpdateOptionalParams,
  JitNetworkAccessPoliciesGetOptionalParams,
} from "../../api/jitNetworkAccessPolicies/options.js";
import type {
  JitNetworkAccessPolicy,
  JitNetworkAccessRequest,
  JitNetworkAccessPolicyInitiateRequest,
} from "../../models/securitySolutionsAPI/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a JitNetworkAccessPolicies operations. */
export interface JitNetworkAccessPoliciesOperations {
  /** Policies for protecting resources using Just-in-Time access control for the subscription, location */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: JitNetworkAccessPoliciesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<JitNetworkAccessPolicy>;
  /** Policies for protecting resources using Just-in-Time access control. */
  list: (
    options?: JitNetworkAccessPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<JitNetworkAccessPolicy>;
  /** Initiate a JIT access from a specific Just-in-Time policy configuration. */
  initiate: (
    resourceGroupName: string,
    ascLocation: string,
    jitNetworkAccessPolicyName: string,
    body: JitNetworkAccessPolicyInitiateRequest,
    options?: JitNetworkAccessPoliciesInitiateOptionalParams,
  ) => Promise<JitNetworkAccessRequest>;
  /** Policies for protecting resources using Just-in-Time access control for the subscription, location */
  listByRegion: (
    ascLocation: string,
    options?: JitNetworkAccessPoliciesListByRegionOptionalParams,
  ) => PagedAsyncIterableIterator<JitNetworkAccessPolicy>;
  /** Policies for protecting resources using Just-in-Time access control for the subscription, location */
  listByResourceGroupAndRegion: (
    resourceGroupName: string,
    ascLocation: string,
    options?: JitNetworkAccessPoliciesListByResourceGroupAndRegionOptionalParams,
  ) => PagedAsyncIterableIterator<JitNetworkAccessPolicy>;
  /** Delete a Just-in-Time access control policy. */
  delete: (
    resourceGroupName: string,
    ascLocation: string,
    jitNetworkAccessPolicyName: string,
    options?: JitNetworkAccessPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Create a policy for protecting resources using Just-in-Time access control */
  createOrUpdate: (
    resourceGroupName: string,
    ascLocation: string,
    jitNetworkAccessPolicyName: string,
    body: JitNetworkAccessPolicy,
    options?: JitNetworkAccessPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<JitNetworkAccessPolicy>;
  /** Policies for protecting resources using Just-in-Time access control for the subscription, location */
  get: (
    resourceGroupName: string,
    ascLocation: string,
    jitNetworkAccessPolicyName: string,
    options?: JitNetworkAccessPoliciesGetOptionalParams,
  ) => Promise<JitNetworkAccessPolicy>;
}

function _getJitNetworkAccessPolicies(context: SecurityCenterContext) {
  return {
    listByResourceGroup: (
      resourceGroupName: string,
      options?: JitNetworkAccessPoliciesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    list: (options?: JitNetworkAccessPoliciesListOptionalParams) => list(context, options),
    initiate: (
      resourceGroupName: string,
      ascLocation: string,
      jitNetworkAccessPolicyName: string,
      body: JitNetworkAccessPolicyInitiateRequest,
      options?: JitNetworkAccessPoliciesInitiateOptionalParams,
    ) =>
      initiate(context, resourceGroupName, ascLocation, jitNetworkAccessPolicyName, body, options),
    listByRegion: (
      ascLocation: string,
      options?: JitNetworkAccessPoliciesListByRegionOptionalParams,
    ) => listByRegion(context, ascLocation, options),
    listByResourceGroupAndRegion: (
      resourceGroupName: string,
      ascLocation: string,
      options?: JitNetworkAccessPoliciesListByResourceGroupAndRegionOptionalParams,
    ) => listByResourceGroupAndRegion(context, resourceGroupName, ascLocation, options),
    delete: (
      resourceGroupName: string,
      ascLocation: string,
      jitNetworkAccessPolicyName: string,
      options?: JitNetworkAccessPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, ascLocation, jitNetworkAccessPolicyName, options),
    createOrUpdate: (
      resourceGroupName: string,
      ascLocation: string,
      jitNetworkAccessPolicyName: string,
      body: JitNetworkAccessPolicy,
      options?: JitNetworkAccessPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        ascLocation,
        jitNetworkAccessPolicyName,
        body,
        options,
      ),
    get: (
      resourceGroupName: string,
      ascLocation: string,
      jitNetworkAccessPolicyName: string,
      options?: JitNetworkAccessPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, ascLocation, jitNetworkAccessPolicyName, options),
  };
}

export function _getJitNetworkAccessPoliciesOperations(
  context: SecurityCenterContext,
): JitNetworkAccessPoliciesOperations {
  return {
    ..._getJitNetworkAccessPolicies(context),
  };
}
