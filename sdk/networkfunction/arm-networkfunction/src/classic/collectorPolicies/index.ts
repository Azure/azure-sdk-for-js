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
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
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
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    collectorPolicyName: string,
    options?: CollectorPoliciesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    collectorPolicyName: string,
    options?: CollectorPoliciesDeleteOptionalParams,
  ) => Promise<void>;
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
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    collectorPolicyName: string,
    parameters: CollectorPolicy,
    options?: CollectorPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<CollectorPolicy>, CollectorPolicy>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    azureTrafficCollectorName: string,
    collectorPolicyName: string,
    parameters: CollectorPolicy,
    options?: CollectorPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<CollectorPolicy>;
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
    beginDelete: async (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      collectorPolicyName: string,
      options?: CollectorPoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(
        context,
        resourceGroupName,
        azureTrafficCollectorName,
        collectorPolicyName,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      collectorPolicyName: string,
      options?: CollectorPoliciesDeleteOptionalParams,
    ) => {
      return await $delete(
        context,
        resourceGroupName,
        azureTrafficCollectorName,
        collectorPolicyName,
        options,
      );
    },
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
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      collectorPolicyName: string,
      parameters: CollectorPolicy,
      options?: CollectorPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        azureTrafficCollectorName,
        collectorPolicyName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      azureTrafficCollectorName: string,
      collectorPolicyName: string,
      parameters: CollectorPolicy,
      options?: CollectorPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        azureTrafficCollectorName,
        collectorPolicyName,
        parameters,
        options,
      );
    },
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
