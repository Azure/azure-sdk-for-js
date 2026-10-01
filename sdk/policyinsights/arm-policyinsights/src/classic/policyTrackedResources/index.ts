// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { PolicyInsightsContext } from "../../api/policyInsightsContext.js";
import {
  listQueryResultsForResource,
  listQueryResultsForResourceGroup,
  listQueryResultsForSubscription,
  listQueryResultsForManagementGroup,
} from "../../api/policyTrackedResources/operations.js";
import type {
  PolicyTrackedResourcesListQueryResultsForResourceOptionalParams,
  PolicyTrackedResourcesListQueryResultsForResourceGroupOptionalParams,
  PolicyTrackedResourcesListQueryResultsForSubscriptionOptionalParams,
  PolicyTrackedResourcesListQueryResultsForManagementGroupOptionalParams,
} from "../../api/policyTrackedResources/options.js";
import type {
  PolicyTrackedResource,
  PolicyTrackedResourcesResourceType,
} from "../../models/policyTrackedResourcesApi/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a PolicyTrackedResources operations. */
export interface PolicyTrackedResourcesOperations {
  /** Queries policy tracked resources under the resource. */
  listQueryResultsForResource: (
    resourceId: string,
    policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
    options?: PolicyTrackedResourcesListQueryResultsForResourceOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyTrackedResource>;
  /** Queries policy tracked resources under the resource group. */
  listQueryResultsForResourceGroup: (
    resourceGroupName: string,
    policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
    options?: PolicyTrackedResourcesListQueryResultsForResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyTrackedResource>;
  /** Queries policy tracked resources under the subscription. */
  listQueryResultsForSubscription: (
    policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
    options?: PolicyTrackedResourcesListQueryResultsForSubscriptionOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyTrackedResource>;
  /** Queries policy tracked resources under the management group. */
  listQueryResultsForManagementGroup: (
    managementGroupName: string,
    policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
    options?: PolicyTrackedResourcesListQueryResultsForManagementGroupOptionalParams,
  ) => PagedAsyncIterableIterator<PolicyTrackedResource>;
}

function _getPolicyTrackedResources(context: PolicyInsightsContext) {
  return {
    listQueryResultsForResource: (
      resourceId: string,
      policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
      options?: PolicyTrackedResourcesListQueryResultsForResourceOptionalParams,
    ) => listQueryResultsForResource(context, resourceId, policyTrackedResourcesResource, options),
    listQueryResultsForResourceGroup: (
      resourceGroupName: string,
      policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
      options?: PolicyTrackedResourcesListQueryResultsForResourceGroupOptionalParams,
    ) =>
      listQueryResultsForResourceGroup(
        context,
        resourceGroupName,
        policyTrackedResourcesResource,
        options,
      ),
    listQueryResultsForSubscription: (
      policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
      options?: PolicyTrackedResourcesListQueryResultsForSubscriptionOptionalParams,
    ) => listQueryResultsForSubscription(context, policyTrackedResourcesResource, options),
    listQueryResultsForManagementGroup: (
      managementGroupName: string,
      policyTrackedResourcesResource: PolicyTrackedResourcesResourceType,
      options?: PolicyTrackedResourcesListQueryResultsForManagementGroupOptionalParams,
    ) =>
      listQueryResultsForManagementGroup(
        context,
        managementGroupName,
        policyTrackedResourcesResource,
        options,
      ),
  };
}

export function _getPolicyTrackedResourcesOperations(
  context: PolicyInsightsContext,
): PolicyTrackedResourcesOperations {
  return {
    ..._getPolicyTrackedResources(context),
  };
}
