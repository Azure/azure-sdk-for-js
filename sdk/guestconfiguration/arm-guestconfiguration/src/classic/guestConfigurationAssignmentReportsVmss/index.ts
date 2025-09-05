// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GuestConfigurationContext } from "../../api/guestConfigurationContext.js";
import { get, list } from "../../api/guestConfigurationAssignmentReportsVmss/operations.js";
import type {
  GuestConfigurationAssignmentReportsVmssGetOptionalParams,
  GuestConfigurationAssignmentReportsVmssListOptionalParams,
} from "../../api/guestConfigurationAssignmentReportsVmss/options.js";
import type { GuestConfigurationAssignmentReport } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";

/** Interface representing a GuestConfigurationAssignmentReportsVmss operations. */
export interface GuestConfigurationAssignmentReportsVmssOperations {
  /** Get a report for the VMSS guest configuration assignment, by reportId. */
  get: (
    resourceGroupName: string,
    vmssName: string,
    name: string,
    id: string,
    options?: GuestConfigurationAssignmentReportsVmssGetOptionalParams,
  ) => Promise<GuestConfigurationAssignmentReport>;
  /** List all reports for the VMSS guest configuration assignment, latest report first. */
  list: (
    resourceGroupName: string,
    vmssName: string,
    name: string,
    options?: GuestConfigurationAssignmentReportsVmssListOptionalParams,
  ) => PagedAsyncIterableIterator<GuestConfigurationAssignmentReport>;
}

function _getGuestConfigurationAssignmentReportsVmss(context: GuestConfigurationContext) {
  return {
    get: (
      resourceGroupName: string,
      vmssName: string,
      name: string,
      id: string,
      options?: GuestConfigurationAssignmentReportsVmssGetOptionalParams,
    ) => get(context, resourceGroupName, vmssName, name, id, options),
    list: (
      resourceGroupName: string,
      vmssName: string,
      name: string,
      options?: GuestConfigurationAssignmentReportsVmssListOptionalParams,
    ) => list(context, resourceGroupName, vmssName, name, options),
  };
}

export function _getGuestConfigurationAssignmentReportsVmssOperations(
  context: GuestConfigurationContext,
): GuestConfigurationAssignmentReportsVmssOperations {
  return {
    ..._getGuestConfigurationAssignmentReportsVmss(context),
  };
}
