// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GuestConfigurationContext } from "../../api/guestConfigurationContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/guestConfigurationConnectedVMwarevSphereAssignments/operations.js";
import type {
  GuestConfigurationConnectedVMwarevSphereAssignmentsListOptionalParams,
  GuestConfigurationConnectedVMwarevSphereAssignmentsDeleteOptionalParams,
  GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateOptionalParams,
  GuestConfigurationConnectedVMwarevSphereAssignmentsGetOptionalParams,
} from "../../api/guestConfigurationConnectedVMwarevSphereAssignments/options.js";
import type { GuestConfigurationAssignment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GuestConfigurationConnectedVMwarevSphereAssignments operations. */
export interface GuestConfigurationConnectedVMwarevSphereAssignmentsOperations {
  /** List all guest configuration assignments for an ARC machine. */
  list: (
    resourceGroupName: string,
    vmName: string,
    options?: GuestConfigurationConnectedVMwarevSphereAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<GuestConfigurationAssignment>;
  /** Delete a guest configuration assignment */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    vmName: string,
    guestConfigurationAssignmentName: string,
    options?: GuestConfigurationConnectedVMwarevSphereAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates an association between a Connected VM Sphere machine and guest configuration */
  createOrUpdate: (
    resourceGroupName: string,
    vmName: string,
    guestConfigurationAssignmentName: string,
    parameters: GuestConfigurationAssignment,
    options?: GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<GuestConfigurationAssignment>;
  /** Get information about a guest configuration assignment */
  get: (
    resourceGroupName: string,
    vmName: string,
    guestConfigurationAssignmentName: string,
    options?: GuestConfigurationConnectedVMwarevSphereAssignmentsGetOptionalParams,
  ) => Promise<GuestConfigurationAssignment>;
}

function _getGuestConfigurationConnectedVMwarevSphereAssignments(
  context: GuestConfigurationContext,
) {
  return {
    list: (
      resourceGroupName: string,
      vmName: string,
      options?: GuestConfigurationConnectedVMwarevSphereAssignmentsListOptionalParams,
    ) => list(context, resourceGroupName, vmName, options),
    delete: (
      resourceGroupName: string,
      vmName: string,
      guestConfigurationAssignmentName: string,
      options?: GuestConfigurationConnectedVMwarevSphereAssignmentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmName, guestConfigurationAssignmentName, options),
    createOrUpdate: (
      resourceGroupName: string,
      vmName: string,
      guestConfigurationAssignmentName: string,
      parameters: GuestConfigurationAssignment,
      options?: GuestConfigurationConnectedVMwarevSphereAssignmentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        vmName,
        guestConfigurationAssignmentName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      vmName: string,
      guestConfigurationAssignmentName: string,
      options?: GuestConfigurationConnectedVMwarevSphereAssignmentsGetOptionalParams,
    ) => get(context, resourceGroupName, vmName, guestConfigurationAssignmentName, options),
  };
}

export function _getGuestConfigurationConnectedVMwarevSphereAssignmentsOperations(
  context: GuestConfigurationContext,
): GuestConfigurationConnectedVMwarevSphereAssignmentsOperations {
  return {
    ..._getGuestConfigurationConnectedVMwarevSphereAssignments(context),
  };
}
