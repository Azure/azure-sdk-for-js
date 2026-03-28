// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetworkManagementContext } from "../../api/networkManagementContext.js";
import {
  list,
  listByResourceGroup,
  $delete,
  updateTags,
  createOrUpdate,
  get,
} from "../../api/serviceEndpointPolicies/operations.js";
import type {
  ServiceEndpointPoliciesListOptionalParams,
  ServiceEndpointPoliciesListByResourceGroupOptionalParams,
  ServiceEndpointPoliciesDeleteOptionalParams,
  ServiceEndpointPoliciesUpdateTagsOptionalParams,
  ServiceEndpointPoliciesCreateOrUpdateOptionalParams,
  ServiceEndpointPoliciesGetOptionalParams,
} from "../../api/serviceEndpointPolicies/options.js";
import type { ServiceEndpointPolicy, TagsObject } from "../../models/microsoft/network/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { SimplePollerLike } from "../../static-helpers/simplePollerHelpers.js";
import { getSimplePoller } from "../../static-helpers/simplePollerHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ServiceEndpointPolicies operations. */
export interface ServiceEndpointPoliciesOperations {
  /** Gets all the service endpoint policies in a subscription. */
  list: (
    options?: ServiceEndpointPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceEndpointPolicy>;
  /** Gets all service endpoint Policies in a resource group. */
  listByResourceGroup: (
    resourceGroupName: string,
    options?: ServiceEndpointPoliciesListByResourceGroupOptionalParams,
  ) => PagedAsyncIterableIterator<ServiceEndpointPolicy>;
  /** Deletes the specified service endpoint policy. */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    options?: ServiceEndpointPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** @deprecated use delete instead */
  beginDelete: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    options?: ServiceEndpointPoliciesDeleteOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<void>, void>>;
  /** @deprecated use delete instead */
  beginDeleteAndWait: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    options?: ServiceEndpointPoliciesDeleteOptionalParams,
  ) => Promise<void>;
  /** Updates tags of a service endpoint policy. */
  updateTags: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    parameters: TagsObject,
    options?: ServiceEndpointPoliciesUpdateTagsOptionalParams,
  ) => Promise<ServiceEndpointPolicy>;
  /** Creates or updates a service Endpoint Policies. */
  createOrUpdate: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    parameters: ServiceEndpointPolicy,
    options?: ServiceEndpointPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ServiceEndpointPolicy>, ServiceEndpointPolicy>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdate: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    parameters: ServiceEndpointPolicy,
    options?: ServiceEndpointPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<SimplePollerLike<OperationState<ServiceEndpointPolicy>, ServiceEndpointPolicy>>;
  /** @deprecated use createOrUpdate instead */
  beginCreateOrUpdateAndWait: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    parameters: ServiceEndpointPolicy,
    options?: ServiceEndpointPoliciesCreateOrUpdateOptionalParams,
  ) => Promise<ServiceEndpointPolicy>;
  /** Gets the specified service Endpoint Policies in a specified resource group. */
  get: (
    resourceGroupName: string,
    serviceEndpointPolicyName: string,
    options?: ServiceEndpointPoliciesGetOptionalParams,
  ) => Promise<ServiceEndpointPolicy>;
}

function _getServiceEndpointPolicies(context: NetworkManagementContext) {
  return {
    list: (options?: ServiceEndpointPoliciesListOptionalParams) => list(context, options),
    listByResourceGroup: (
      resourceGroupName: string,
      options?: ServiceEndpointPoliciesListByResourceGroupOptionalParams,
    ) => listByResourceGroup(context, resourceGroupName, options),
    delete: (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      options?: ServiceEndpointPoliciesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, serviceEndpointPolicyName, options),
    beginDelete: async (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      options?: ServiceEndpointPoliciesDeleteOptionalParams,
    ) => {
      const poller = $delete(context, resourceGroupName, serviceEndpointPolicyName, options);
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginDeleteAndWait: async (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      options?: ServiceEndpointPoliciesDeleteOptionalParams,
    ) => {
      return await $delete(context, resourceGroupName, serviceEndpointPolicyName, options);
    },
    updateTags: (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      parameters: TagsObject,
      options?: ServiceEndpointPoliciesUpdateTagsOptionalParams,
    ) => updateTags(context, resourceGroupName, serviceEndpointPolicyName, parameters, options),
    createOrUpdate: (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      parameters: ServiceEndpointPolicy,
      options?: ServiceEndpointPoliciesCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, serviceEndpointPolicyName, parameters, options),
    beginCreateOrUpdate: async (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      parameters: ServiceEndpointPolicy,
      options?: ServiceEndpointPoliciesCreateOrUpdateOptionalParams,
    ) => {
      const poller = createOrUpdate(
        context,
        resourceGroupName,
        serviceEndpointPolicyName,
        parameters,
        options,
      );
      await poller.submitted();
      return getSimplePoller(poller);
    },
    beginCreateOrUpdateAndWait: async (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      parameters: ServiceEndpointPolicy,
      options?: ServiceEndpointPoliciesCreateOrUpdateOptionalParams,
    ) => {
      return await createOrUpdate(
        context,
        resourceGroupName,
        serviceEndpointPolicyName,
        parameters,
        options,
      );
    },
    get: (
      resourceGroupName: string,
      serviceEndpointPolicyName: string,
      options?: ServiceEndpointPoliciesGetOptionalParams,
    ) => get(context, resourceGroupName, serviceEndpointPolicyName, options),
  };
}

export function _getServiceEndpointPoliciesOperations(
  context: NetworkManagementContext,
): ServiceEndpointPoliciesOperations {
  return {
    ..._getServiceEndpointPolicies(context),
  };
}
