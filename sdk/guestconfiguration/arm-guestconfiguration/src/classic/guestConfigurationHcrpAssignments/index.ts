// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GuestConfigurationContext } from "../../api/guestConfigurationContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/guestConfigurationHcrpAssignments/operations.js";
import {
  GuestConfigurationHcrpAssignmentsListOptionalParams,
  GuestConfigurationHcrpAssignmentsDeleteOptionalParams,
  GuestConfigurationHcrpAssignmentsCreateOrUpdateOptionalParams,
  GuestConfigurationHcrpAssignmentsGetOptionalParams,
} from "../../api/guestConfigurationHcrpAssignments/options.js";
import { GuestConfigurationAssignment } from "../../models/models.js";
import { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GuestConfigurationHcrpAssignments operations. */
export interface GuestConfigurationHcrpAssignmentsOperations {
  /** List all guest configuration assignments for an ARC machine. */
  list: (
    resourceGroupName: string,
    machineName: string,
    options?: GuestConfigurationHcrpAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<GuestConfigurationAssignment>;
  /** Delete a guest configuration assignment */
  delete: (
    resourceGroupName: string,
    guestConfigurationAssignmentName: string,
    machineName: string,
    options?: GuestConfigurationHcrpAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates an association between a ARC machine and guest configuration */
  createOrUpdate: (
    guestConfigurationAssignmentName: string,
    resourceGroupName: string,
    machineName: string,
    parameters: GuestConfigurationAssignment,
    options?: GuestConfigurationHcrpAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<GuestConfigurationAssignment>;
  /** Get information about a guest configuration assignment */
  get: (
    resourceGroupName: string,
    guestConfigurationAssignmentName: string,
    machineName: string,
    options?: GuestConfigurationHcrpAssignmentsGetOptionalParams,
  ) => Promise<GuestConfigurationAssignment>;
}

function _getGuestConfigurationHcrpAssignments(context: GuestConfigurationContext) {
  return {
    list: (
      resourceGroupName: string,
      machineName: string,
      options?: GuestConfigurationHcrpAssignmentsListOptionalParams,
    ) => list(context, resourceGroupName, machineName, options),
    delete: (
      resourceGroupName: string,
      guestConfigurationAssignmentName: string,
      machineName: string,
      options?: GuestConfigurationHcrpAssignmentsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, guestConfigurationAssignmentName, machineName, options),
    createOrUpdate: (
      guestConfigurationAssignmentName: string,
      resourceGroupName: string,
      machineName: string,
      parameters: GuestConfigurationAssignment,
      options?: GuestConfigurationHcrpAssignmentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        guestConfigurationAssignmentName,
        resourceGroupName,
        machineName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      guestConfigurationAssignmentName: string,
      machineName: string,
      options?: GuestConfigurationHcrpAssignmentsGetOptionalParams,
    ) => get(context, resourceGroupName, guestConfigurationAssignmentName, machineName, options),
  };
}

export function _getGuestConfigurationHcrpAssignmentsOperations(
  context: GuestConfigurationContext,
): GuestConfigurationHcrpAssignmentsOperations {
  return {
    ..._getGuestConfigurationHcrpAssignments(context),
  };
}
