// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GuestConfigurationContext } from "../../api/guestConfigurationContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/guestConfigurationAssignmentsVmss/operations.js";
import {
  GuestConfigurationAssignmentsVmssListOptionalParams,
  GuestConfigurationAssignmentsVmssDeleteOptionalParams,
  GuestConfigurationAssignmentsVmssCreateOrUpdateOptionalParams,
  GuestConfigurationAssignmentsVmssGetOptionalParams,
} from "../../api/guestConfigurationAssignmentsVmss/options.js";
import { GuestConfigurationAssignment } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GuestConfigurationAssignmentsVmss operations. */
export interface GuestConfigurationAssignmentsVmssOperations {
  /** List all guest configuration assignments for VMSS. */
  list: (
    resourceGroupName: string,
    vmssName: string,
    options?: GuestConfigurationAssignmentsVmssListOptionalParams,
  ) => PagedAsyncIterableIterator<GuestConfigurationAssignment>;
  /** Delete a guest configuration assignment for VMSS */
  delete: (
    resourceGroupName: string,
    vmssName: string,
    name: string,
    options?: GuestConfigurationAssignmentsVmssDeleteOptionalParams,
  ) => Promise<GuestConfigurationAssignment>;
  /** Creates an association between a VMSS and guest configuration */
  createOrUpdate: (
    resourceGroupName: string,
    vmssName: string,
    name: string,
    parameters: GuestConfigurationAssignment,
    options?: GuestConfigurationAssignmentsVmssCreateOrUpdateOptionalParams,
  ) => Promise<GuestConfigurationAssignment>;
  /** Get information about a guest configuration assignment for VMSS */
  get: (
    resourceGroupName: string,
    vmssName: string,
    name: string,
    options?: GuestConfigurationAssignmentsVmssGetOptionalParams,
  ) => Promise<GuestConfigurationAssignment>;
}

function _getGuestConfigurationAssignmentsVmss(context: GuestConfigurationContext) {
  return {
    list: (
      resourceGroupName: string,
      vmssName: string,
      options?: GuestConfigurationAssignmentsVmssListOptionalParams,
    ) => list(context, resourceGroupName, vmssName, options),
    delete: (
      resourceGroupName: string,
      vmssName: string,
      name: string,
      options?: GuestConfigurationAssignmentsVmssDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmssName, name, options),
    createOrUpdate: (
      resourceGroupName: string,
      vmssName: string,
      name: string,
      parameters: GuestConfigurationAssignment,
      options?: GuestConfigurationAssignmentsVmssCreateOrUpdateOptionalParams,
    ) => createOrUpdate(context, resourceGroupName, vmssName, name, parameters, options),
    get: (
      resourceGroupName: string,
      vmssName: string,
      name: string,
      options?: GuestConfigurationAssignmentsVmssGetOptionalParams,
    ) => get(context, resourceGroupName, vmssName, name, options),
  };
}

export function _getGuestConfigurationAssignmentsVmssOperations(
  context: GuestConfigurationContext,
): GuestConfigurationAssignmentsVmssOperations {
  return {
    ..._getGuestConfigurationAssignmentsVmss(context),
  };
}
