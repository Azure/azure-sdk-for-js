// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetContext } from "../../api/containerServiceFleetContext.js";
import {
  apply,
  listByFleet,
  $delete,
  createOrUpdate,
  get,
} from "../../api/clusterMeshProfiles/operations.js";
import {
  ClusterMeshProfilesApplyOptionalParams,
  ClusterMeshProfilesListByFleetOptionalParams,
  ClusterMeshProfilesDeleteOptionalParams,
  ClusterMeshProfilesCreateOrUpdateOptionalParams,
  ClusterMeshProfilesGetOptionalParams,
} from "../../api/clusterMeshProfiles/options.js";
import { ClusterMeshProfile } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a ClusterMeshProfiles operations. */
export interface ClusterMeshProfilesOperations {
  /** Applies the cluster mesh profile to selected fleet members. */
  apply: (
    resourceGroupName: string,
    fleetName: string,
    clusterMeshProfileName: string,
    options?: ClusterMeshProfilesApplyOptionalParams,
  ) => PollerLike<OperationState<ClusterMeshProfile>, ClusterMeshProfile>;
  /** List ClusterMeshProfile resources by Fleet */
  listByFleet: (
    resourceGroupName: string,
    fleetName: string,
    options?: ClusterMeshProfilesListByFleetOptionalParams,
  ) => PagedAsyncIterableIterator<ClusterMeshProfile>;
  /** Delete a ClusterMeshProfile */
  delete: (
    resourceGroupName: string,
    fleetName: string,
    clusterMeshProfileName: string,
    options?: ClusterMeshProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a ClusterMeshProfile */
  createOrUpdate: (
    resourceGroupName: string,
    fleetName: string,
    clusterMeshProfileName: string,
    resource: ClusterMeshProfile,
    options?: ClusterMeshProfilesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<ClusterMeshProfile>, ClusterMeshProfile>;
  /** Get a ClusterMeshProfile */
  get: (
    resourceGroupName: string,
    fleetName: string,
    clusterMeshProfileName: string,
    options?: ClusterMeshProfilesGetOptionalParams,
  ) => Promise<ClusterMeshProfile>;
}

function _getClusterMeshProfiles(context: ContainerServiceFleetContext) {
  return {
    apply: (
      resourceGroupName: string,
      fleetName: string,
      clusterMeshProfileName: string,
      options?: ClusterMeshProfilesApplyOptionalParams,
    ) => apply(context, resourceGroupName, fleetName, clusterMeshProfileName, options),
    listByFleet: (
      resourceGroupName: string,
      fleetName: string,
      options?: ClusterMeshProfilesListByFleetOptionalParams,
    ) => listByFleet(context, resourceGroupName, fleetName, options),
    delete: (
      resourceGroupName: string,
      fleetName: string,
      clusterMeshProfileName: string,
      options?: ClusterMeshProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, fleetName, clusterMeshProfileName, options),
    createOrUpdate: (
      resourceGroupName: string,
      fleetName: string,
      clusterMeshProfileName: string,
      resource: ClusterMeshProfile,
      options?: ClusterMeshProfilesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        fleetName,
        clusterMeshProfileName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      fleetName: string,
      clusterMeshProfileName: string,
      options?: ClusterMeshProfilesGetOptionalParams,
    ) => get(context, resourceGroupName, fleetName, clusterMeshProfileName, options),
  };
}

export function _getClusterMeshProfilesOperations(
  context: ContainerServiceFleetContext,
): ClusterMeshProfilesOperations {
  return {
    ..._getClusterMeshProfiles(context),
  };
}
