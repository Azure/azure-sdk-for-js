// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { ContainerServiceFleetContext } from "../../api/containerServiceFleetContext.js";
import {
  apply,
  listByFleet,
  $delete,
  createOrUpdate,
  get,
} from "../../api/identityBindingProfiles/operations.js";
import type {
  IdentityBindingProfilesApplyOptionalParams,
  IdentityBindingProfilesListByFleetOptionalParams,
  IdentityBindingProfilesDeleteOptionalParams,
  IdentityBindingProfilesCreateOrUpdateOptionalParams,
  IdentityBindingProfilesGetOptionalParams,
} from "../../api/identityBindingProfiles/options.js";
import type { IdentityBindingProfile } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a IdentityBindingProfiles operations. */
export interface IdentityBindingProfilesOperations {
  /** Applies the identity binding profile to the selected fleet members, creating, updating or deleting the corresponding managedClusters/identityBindings resources. */
  apply: (
    resourceGroupName: string,
    fleetName: string,
    identityBindingProfileName: string,
    options?: IdentityBindingProfilesApplyOptionalParams,
  ) => PollerLike<OperationState<IdentityBindingProfile>, IdentityBindingProfile>;
  /** List IdentityBindingProfile resources by Fleet */
  listByFleet: (
    resourceGroupName: string,
    fleetName: string,
    options?: IdentityBindingProfilesListByFleetOptionalParams,
  ) => PagedAsyncIterableIterator<IdentityBindingProfile>;
  /** Delete a IdentityBindingProfile */
  delete: (
    resourceGroupName: string,
    fleetName: string,
    identityBindingProfileName: string,
    options?: IdentityBindingProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a IdentityBindingProfile */
  createOrUpdate: (
    resourceGroupName: string,
    fleetName: string,
    identityBindingProfileName: string,
    resource: IdentityBindingProfile,
    options?: IdentityBindingProfilesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<IdentityBindingProfile>, IdentityBindingProfile>;
  /** Get a IdentityBindingProfile */
  get: (
    resourceGroupName: string,
    fleetName: string,
    identityBindingProfileName: string,
    options?: IdentityBindingProfilesGetOptionalParams,
  ) => Promise<IdentityBindingProfile>;
}

function _getIdentityBindingProfiles(context: ContainerServiceFleetContext) {
  return {
    apply: (
      resourceGroupName: string,
      fleetName: string,
      identityBindingProfileName: string,
      options?: IdentityBindingProfilesApplyOptionalParams,
    ) => apply(context, resourceGroupName, fleetName, identityBindingProfileName, options),
    listByFleet: (
      resourceGroupName: string,
      fleetName: string,
      options?: IdentityBindingProfilesListByFleetOptionalParams,
    ) => listByFleet(context, resourceGroupName, fleetName, options),
    delete: (
      resourceGroupName: string,
      fleetName: string,
      identityBindingProfileName: string,
      options?: IdentityBindingProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, fleetName, identityBindingProfileName, options),
    createOrUpdate: (
      resourceGroupName: string,
      fleetName: string,
      identityBindingProfileName: string,
      resource: IdentityBindingProfile,
      options?: IdentityBindingProfilesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        fleetName,
        identityBindingProfileName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      fleetName: string,
      identityBindingProfileName: string,
      options?: IdentityBindingProfilesGetOptionalParams,
    ) => get(context, resourceGroupName, fleetName, identityBindingProfileName, options),
  };
}

export function _getIdentityBindingProfilesOperations(
  context: ContainerServiceFleetContext,
): IdentityBindingProfilesOperations {
  return {
    ..._getIdentityBindingProfiles(context),
  };
}
