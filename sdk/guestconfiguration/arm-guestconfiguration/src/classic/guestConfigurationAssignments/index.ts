// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GuestConfigurationContext } from "../../api/guestConfigurationContext.js";
import {
  rGList,
  subscriptionList,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/guestConfigurationAssignments/operations.js";
import type {
  GuestConfigurationAssignmentsRGListOptionalParams,
  GuestConfigurationAssignmentsSubscriptionListOptionalParams,
  GuestConfigurationAssignmentsListOptionalParams,
  GuestConfigurationAssignmentsDeleteOptionalParams,
  GuestConfigurationAssignmentsCreateOrUpdateOptionalParams,
  GuestConfigurationAssignmentsGetOptionalParams,
} from "../../api/guestConfigurationAssignments/options.js";
import type { GuestConfigurationAssignment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GuestConfigurationAssignments operations. */
export interface GuestConfigurationAssignmentsOperations {
  /** List all guest configuration assignments for a resource group. */
  rGList: (
    resourceGroupName: string,
    options?: GuestConfigurationAssignmentsRGListOptionalParams,
  ) => PagedAsyncIterableIterator<GuestConfigurationAssignment>;
  /** List all guest configuration assignments for a subscription. */
  subscriptionList: (
    options?: GuestConfigurationAssignmentsSubscriptionListOptionalParams,
  ) => PagedAsyncIterableIterator<GuestConfigurationAssignment>;
  /** List all guest configuration assignments for a virtual machine. */
  list: (
    resourceGroupName: string,
    vmName: string,
    options?: GuestConfigurationAssignmentsListOptionalParams,
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
    options?: GuestConfigurationAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates an association between a VM and guest configuration */
  createOrUpdate: (
    resourceGroupName: string,
    vmName: string,
    guestConfigurationAssignmentName: string,
    parameters: GuestConfigurationAssignment,
    options?: GuestConfigurationAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<GuestConfigurationAssignment>;
  /** Get information about a guest configuration assignment */
  get: (
    resourceGroupName: string,
    vmName: string,
    guestConfigurationAssignmentName: string,
    options?: GuestConfigurationAssignmentsGetOptionalParams,
  ) => Promise<GuestConfigurationAssignment>;
}

function _getGuestConfigurationAssignments(context: GuestConfigurationContext) {
  return {
    rGList: (
      resourceGroupName: string,
      options?: GuestConfigurationAssignmentsRGListOptionalParams,
    ) => rGList(context, resourceGroupName, options),
    subscriptionList: (options?: GuestConfigurationAssignmentsSubscriptionListOptionalParams) =>
      subscriptionList(context, options),
    list: (
      resourceGroupName: string,
      vmName: string,
      options?: GuestConfigurationAssignmentsListOptionalParams,
    ) => list(context, resourceGroupName, vmName, options),
    delete: (
      resourceGroupName: string,
      vmName: string,
      guestConfigurationAssignmentName: string,
      options?: GuestConfigurationAssignmentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, vmName, guestConfigurationAssignmentName, options),
    createOrUpdate: (
      resourceGroupName: string,
      vmName: string,
      guestConfigurationAssignmentName: string,
      parameters: GuestConfigurationAssignment,
      options?: GuestConfigurationAssignmentsCreateOrUpdateOptionalParams,
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
      options?: GuestConfigurationAssignmentsGetOptionalParams,
    ) => get(context, resourceGroupName, vmName, guestConfigurationAssignmentName, options),
  };
}

export function _getGuestConfigurationAssignmentsOperations(
  context: GuestConfigurationContext,
): GuestConfigurationAssignmentsOperations {
  return {
    ..._getGuestConfigurationAssignments(context),
  };
}
