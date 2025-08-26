// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ContainerServiceFleetContext } from "../../api/containerServiceFleetContext.js";
import { AutoUpgradeProfile } from "../../models/models.js";
import {
  AutoUpgradeProfilesListByFleetOptionalParams,
  AutoUpgradeProfilesDeleteOptionalParams,
  AutoUpgradeProfilesCreateOrUpdateOptionalParams,
  AutoUpgradeProfilesGetOptionalParams,
} from "../../api/autoUpgradeProfiles/options.js";
import {
  listByFleet,
  $delete,
  createOrUpdate,
  get,
} from "../../api/autoUpgradeProfiles/operations.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a AutoUpgradeProfiles operations. */
export interface AutoUpgradeProfilesOperations {
  /** List AutoUpgradeProfile resources by Fleet */
  listByFleet: (
    resourceGroupName: string,
    fleetName: string,
    options?: AutoUpgradeProfilesListByFleetOptionalParams,
  ) => PagedAsyncIterableIterator<AutoUpgradeProfile>;
  /** Delete a AutoUpgradeProfile */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    fleetName: string,
    autoUpgradeProfileName: string,
    options?: AutoUpgradeProfilesDeleteOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /** Create a AutoUpgradeProfile */
  createOrUpdate: (
    resourceGroupName: string,
    fleetName: string,
    autoUpgradeProfileName: string,
    resource: AutoUpgradeProfile,
    options?: AutoUpgradeProfilesCreateOrUpdateOptionalParams,
  ) => PollerLike<OperationState<AutoUpgradeProfile>, AutoUpgradeProfile>;
  /** Get a AutoUpgradeProfile */
  get: (
    resourceGroupName: string,
    fleetName: string,
    autoUpgradeProfileName: string,
    options?: AutoUpgradeProfilesGetOptionalParams,
  ) => Promise<AutoUpgradeProfile>;
}

function _getAutoUpgradeProfiles(context: ContainerServiceFleetContext) {
  return {
    listByFleet: (
      resourceGroupName: string,
      fleetName: string,
      options?: AutoUpgradeProfilesListByFleetOptionalParams,
    ) => listByFleet(context, resourceGroupName, fleetName, options),
    delete: (
      resourceGroupName: string,
      fleetName: string,
      autoUpgradeProfileName: string,
      options?: AutoUpgradeProfilesDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, fleetName, autoUpgradeProfileName, options),
    createOrUpdate: (
      resourceGroupName: string,
      fleetName: string,
      autoUpgradeProfileName: string,
      resource: AutoUpgradeProfile,
      options?: AutoUpgradeProfilesCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        fleetName,
        autoUpgradeProfileName,
        resource,
        options,
      ),
    get: (
      resourceGroupName: string,
      fleetName: string,
      autoUpgradeProfileName: string,
      options?: AutoUpgradeProfilesGetOptionalParams,
    ) => get(context, resourceGroupName, fleetName, autoUpgradeProfileName, options),
  };
}

export function _getAutoUpgradeProfilesOperations(
  context: ContainerServiceFleetContext,
): AutoUpgradeProfilesOperations {
  return {
    ..._getAutoUpgradeProfiles(context),
  };
}
