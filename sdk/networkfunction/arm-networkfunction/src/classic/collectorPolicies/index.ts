// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AzureTrafficCollectorContext } from "../../api/azureTrafficCollectorContext.js";
import {
  list,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/collectorPolicies/operations.js";
import type {
  CollectorPoliciesListOptionalParams,
  CollectorPoliciesDeleteOptionalParams,
  CollectorPoliciesUpdateTagsOptionalParams,
  CollectorPoliciesCreateOrUpdateOptionalParams,
  CollectorPoliciesGetOptionalParams,
} from "../../api/collectorPolicies/options.js";
import type { TagsObject, CollectorPolicy } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a CollectorPolicies operations. */
export interface CollectorPoliciesOperations {
  /** Return list of Collector policies in a Azure Traffic Collector */
  list: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    options?: CollectorPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<CollectorPolicy>;
  /** Deletes a specified Collector Policy resource. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    collectorPolicyName: string,
    options?: CollectorPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Updates the specified Collector Policy tags. */
  updateTags: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    collectorPolicyName: string,
    parameters: TagsObject,
    options?: CollectorPoliciesUpdateTagsOptionalParams,
  ) => Promise<CollectorPolicy>;
  /** Creates or updates a Collector Policy resource */
  createOrUpdate: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    collectorPolicyName: string,
    parameters: CollectorPolicy,
    options?: CollectorPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<CollectorPolicy>, CollectorPolicy>;
  /** Gets the collector policy in a specified Traffic Collector */
  get: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    collectorPolicyName: string,
    options?: CollectorPoliciesGetOptionalParams,
  ) => Promise<CollectorPolicy>;
}

function _getCollectorPolicies(context: AzureTrafficCollectorContext) {
  return {
    list: (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      options?: CollectorPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, azureTrafficCollectorName, options),
    delete: (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      collectorPolicyName: string,
      options?: CollectorPoliciesDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, azureTrafficCollectorName, collectorPolicyName, options),
    updateTags: (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      collectorPolicyName: string,
      parameters: TagsObject,
      options?: CollectorPoliciesUpdateTagsOptionalParams,
    ) =>
      updateTags(
        context,
        resourceGroupName,
        azureTrafficCollectorName,
        collectorPolicyName,
        parameters,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      collectorPolicyName: string,
      parameters: CollectorPolicy,
      options?: CollectorPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        azureTrafficCollectorName,
        collectorPolicyName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      collectorPolicyName: string,
      options?: CollectorPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, azureTrafficCollectorName, collectorPolicyName, options),
  };
}

export function _getCollectorPoliciesOperations(
  context: AzureTrafficCollectorContext,
): CollectorPoliciesOperations {
  return {
    ..._getCollectorPolicies(context),
  };
}
