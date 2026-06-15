// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GuestConfigurationContext } from "../../api/guestConfigurationContext.js";
import {
  listRGList,
  listSubscriptionList,
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/guestConfigurationAssignments/operations.js";
import {
  GuestConfigurationAssignmentsListRGListOptionalParams,
  GuestConfigurationAssignmentsListSubscriptionListOptionalParams,
  GuestConfigurationAssignmentsListOptionalParams,
  GuestConfigurationAssignmentsDeleteOptionalParams,
  GuestConfigurationAssignmentsCreateOrUpdateOptionalParams,
  GuestConfigurationAssignmentsGetOptionalParams,
} from "../../api/guestConfigurationAssignments/options.js";
import { GuestConfigurationAssignment } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GuestConfigurationAssignments operations. */
export interface GuestConfigurationAssignmentsOperations {
  /** List all guest configuration assignments for a resource group. */
  listRGList: (
    resourceGroupName: string,
    options?: GuestConfigurationAssignmentsListRGListOptionalParams,
  ) => PagedAsyncIterableIterator<GuestConfigurationAssignment>;
  /** List all guest configuration assignments for a subscription. */
  listSubscriptionList: (
    options?: GuestConfigurationAssignmentsListSubscriptionListOptionalParams,
  ) => PagedAsyncIterableIterator<GuestConfigurationAssignment>;
  /** List all guest configuration assignments for a virtual machine. */
  list: (
    resourceGroupName: string,
    vmName: string,
    options?: GuestConfigurationAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<GuestConfigurationAssignment>;
  /** Delete a guest configuration assignment */
  delete: (
    resourceGroupName: string,
    guestConfigurationAssignmentName: string,
    vmName: string,
    options?: GuestConfigurationAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates an association between a VM and guest configuration */
  createOrUpdate: (
    guestConfigurationAssignmentName: string,
    resourceGroupName: string,
    vmName: string,
    parameters: GuestConfigurationAssignment,
    options?: GuestConfigurationAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<GuestConfigurationAssignment>;
  /** Get information about a guest configuration assignment */
  get: (
    resourceGroupName: string,
    guestConfigurationAssignmentName: string,
    vmName: string,
    options?: GuestConfigurationAssignmentsGetOptionalParams,
  ) => Promise<GuestConfigurationAssignment>;
}

function _getGuestConfigurationAssignments(context: GuestConfigurationContext) {
  return {
    listRGList: (
      resourceGroupName: string,
      options?: GuestConfigurationAssignmentsListRGListOptionalParams,
    ) => listRGList(context, resourceGroupName, options),
    listSubscriptionList: (
      options?: GuestConfigurationAssignmentsListSubscriptionListOptionalParams,
    ) => listSubscriptionList(context, options),
    list: (
      resourceGroupName: string,
      vmName: string,
      options?: GuestConfigurationAssignmentsListOptionalParams,
    ) => list(context, resourceGroupName, vmName, options),
    delete: (
      resourceGroupName: string,
      guestConfigurationAssignmentName: string,
      vmName: string,
      options?: GuestConfigurationAssignmentsDeleteOptionalParams,
    ) => $delete(context, resourceGroupName, guestConfigurationAssignmentName, vmName, options),
    createOrUpdate: (
      guestConfigurationAssignmentName: string,
      resourceGroupName: string,
      vmName: string,
      parameters: GuestConfigurationAssignment,
      options?: GuestConfigurationAssignmentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        guestConfigurationAssignmentName,
        resourceGroupName,
        vmName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      guestConfigurationAssignmentName: string,
      vmName: string,
      options?: GuestConfigurationAssignmentsGetOptionalParams,
    ) => get(context, resourceGroupName, guestConfigurationAssignmentName, vmName, options),
  };
}

export function _getGuestConfigurationAssignmentsOperations(
  context: GuestConfigurationContext,
): GuestConfigurationAssignmentsOperations {
  return {
    ..._getGuestConfigurationAssignments(context),
  };
}
