// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureVMwareSolutionAPIContext } from "../../api/azureVMwareSolutionAPIContext.js";
import { PlacementPolicy, PlacementPolicyUpdate } from "../../models/models.js";
import {
  PlacementPoliciesDeleteOptionalParams,
  PlacementPoliciesUpdateOptionalParams,
  PlacementPoliciesCreateOrUpdateOptionalParams,
  PlacementPoliciesGetOptionalParams,
  PlacementPoliciesListOptionalParams,
} from "../../api/placementPolicies/options.js";
import {
  $delete,
  update,
  createOrUpdate,
  get,
  list,
} from "../../api/placementPolicies/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a PlacementPolicies operations. */
export interface PlacementPoliciesOperations {
  /** Delete a PlacementPolicy */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    placementPolicyName: string,
    options?: PlacementPoliciesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Update a PlacementPolicy */
  update: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    placementPolicyName: string,
    placementPolicyUpdate: PlacementPolicyUpdate,
    options?: PlacementPoliciesUpdateOptionalParams,
  ) => PollerLike<OperationState<PlacementPolicy>, PlacementPolicy>;
  /** Create a PlacementPolicy */
  createOrUpdate: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    placementPolicyName: string,
    placementPolicy: PlacementPolicy,
    options?: PlacementPoliciesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<PlacementPolicy>, PlacementPolicy>;
  /** Get a PlacementPolicy */
  get: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    placementPolicyName: string,
    options?: PlacementPoliciesGetOptionalParams,
  ) => Promise<PlacementPolicy>;
  /** List PlacementPolicy resources by Cluster */
  list: (
    resourceGroupName: string,
    privateCloudName: string,
    clusterName: string,
    options?: PlacementPoliciesListOptionalParams,
  ) => PagedAsyncIterableIterator<PlacementPolicy>;
}

function _getPlacementPolicies(context: AzureVMwareSolutionAPIContext) {
  return {
    delete: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      placementPolicyName: string,
      options?: PlacementPoliciesDeleteOptionalParams,
    ) =>
      $delete(
        context,
        resourceGroupName,
        privateCloudName,
        clusterName,
        placementPolicyName,
        options,
      ),
    update: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      placementPolicyName: string,
      placementPolicyUpdate: PlacementPolicyUpdate,
      options?: PlacementPoliciesUpdateOptionalParams,
    ) =>
      update(
        context,
        resourceGroupName,
        privateCloudName,
        clusterName,
        placementPolicyName,
        placementPolicyUpdate,
        options,
      ),
    createOrUpdate: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      placementPolicyName: string,
      placementPolicy: PlacementPolicy,
      options?: PlacementPoliciesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        privateCloudName,
        clusterName,
        placementPolicyName,
        placementPolicy,
        options,
      ),
    get: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      placementPolicyName: string,
      options?: PlacementPoliciesGetOptionalParams,
    ) =>
      get(context, resourceGroupName, privateCloudName, clusterName, placementPolicyName, options),
    list: (
      resourceGroupName: string,
      privateCloudName: string,
      clusterName: string,
      options?: PlacementPoliciesListOptionalParams,
    ) => list(context, resourceGroupName, privateCloudName, clusterName, options),
  };
}

export function _getPlacementPoliciesOperations(
  context: AzureVMwareSolutionAPIContext,
): PlacementPoliciesOperations {
  return {
    ..._getPlacementPolicies(context),
  };
}
