// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GuestConfigurationContext } from "../../api/guestConfigurationContext.js";
import {
  list,
  $delete,
  createOrUpdate,
  get,
} from "../../api/guestConfigurationHcrpAssignments/operations.js";
import type {
  GuestConfigurationHcrpAssignmentsListOptionalParams,
  GuestConfigurationHcrpAssignmentsDeleteOptionalParams,
  GuestConfigurationHcrpAssignmentsCreateOrUpdateOptionalParams,
  GuestConfigurationHcrpAssignmentsGetOptionalParams,
} from "../../api/guestConfigurationHcrpAssignments/options.js";
import type { GuestConfigurationAssignment } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GuestConfigurationHcrpAssignments operations. */
export interface GuestConfigurationHcrpAssignmentsOperations {
  /** List all guest configuration assignments for an ARC machine. */
  list: (
    resourceGroupName: string,
    machineName: string,
    options?: GuestConfigurationHcrpAssignmentsListOptionalParams,
  ) => PagedAsyncIterableIterator<GuestConfigurationAssignment>;
  /** Delete a guest configuration assignment */
  /**
   *  @fixme delete is a reserved word that cannot be used as an operation name.
   *         Please add @clientName("clientName") or @clientName("<JS-Specific-Name>", "javascript")
   *         to the operation to override the generated name.
   */
  delete: (
    resourceGroupName: string,
    machineName: string,
    guestConfigurationAssignmentName: string,
    options?: GuestConfigurationHcrpAssignmentsDeleteOptionalParams,
  ) => Promise<void>;
  /** Creates an association between a ARC machine and guest configuration */
  createOrUpdate: (
    resourceGroupName: string,
    machineName: string,
    guestConfigurationAssignmentName: string,
    parameters: GuestConfigurationAssignment,
    options?: GuestConfigurationHcrpAssignmentsCreateOrUpdateOptionalParams,
  ) => Promise<GuestConfigurationAssignment>;
  /** Get information about a guest configuration assignment */
  get: (
    resourceGroupName: string,
    machineName: string,
    guestConfigurationAssignmentName: string,
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
      machineName: string,
      guestConfigurationAssignmentName: string,
      options?: GuestConfigurationHcrpAssignmentsDeleteOptionalParams,
    ) =>
      $delete(context, resourceGroupName, machineName, guestConfigurationAssignmentName, options),
    createOrUpdate: (
      resourceGroupName: string,
      machineName: string,
      guestConfigurationAssignmentName: string,
      parameters: GuestConfigurationAssignment,
      options?: GuestConfigurationHcrpAssignmentsCreateOrUpdateOptionalParams,
    ) =>
      createOrUpdate(
        context,
        resourceGroupName,
        machineName,
        guestConfigurationAssignmentName,
        parameters,
        options,
      ),
    get: (
      resourceGroupName: string,
      machineName: string,
      guestConfigurationAssignmentName: string,
      options?: GuestConfigurationHcrpAssignmentsGetOptionalParams,
    ) => get(context, resourceGroupName, machineName, guestConfigurationAssignmentName, options),
  };
}

export function _getGuestConfigurationHcrpAssignmentsOperations(
  context: GuestConfigurationContext,
): GuestConfigurationHcrpAssignmentsOperations {
  return {
    ..._getGuestConfigurationHcrpAssignments(context),
  };
}
