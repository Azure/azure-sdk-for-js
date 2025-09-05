// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GuestConfigurationContext } from "../../api/guestConfigurationContext.js";
import {
  get,
  list,
} from "../../api/guestConfigurationConnectedVMwarevSphereAssignmentsReports/operations.js";
import type {
  GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGetOptionalParams,
  GuestConfigurationConnectedVMwarevSphereAssignmentsReportsListOptionalParams,
} from "../../api/guestConfigurationConnectedVMwarevSphereAssignmentsReports/options.js";
import type {
  _GuestConfigurationAssignmentReportList,
  GuestConfigurationAssignmentReport,
} from "../../models/models.js";

/** Interface representing a GuestConfigurationConnectedVMwarevSphereAssignmentsReports operations. */
export interface GuestConfigurationConnectedVMwarevSphereAssignmentsReportsOperations {
  /** Get a report for the guest configuration assignment, by reportId. */
  get: (
    resourceGroupName: string,
    vmName: string,
    guestConfigurationAssignmentName: string,
    reportId: string,
    options?: GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGetOptionalParams,
  ) => Promise<GuestConfigurationAssignmentReport>;
  /** List all reports for the guest configuration assignment, latest report first. */
  list: (
    resourceGroupName: string,
    vmName: string,
    guestConfigurationAssignmentName: string,
    options?: GuestConfigurationConnectedVMwarevSphereAssignmentsReportsListOptionalParams,
  ) => Promise<_GuestConfigurationAssignmentReportList>;
}

function _getGuestConfigurationConnectedVMwarevSphereAssignmentsReports(
  context: GuestConfigurationContext,
) {
  return {
    get: (
      resourceGroupName: string,
      vmName: string,
      guestConfigurationAssignmentName: string,
      reportId: string,
      options?: GuestConfigurationConnectedVMwarevSphereAssignmentsReportsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, vmName, guestConfigurationAssignmentName, reportId, options),
    list: (
      resourceGroupName: string,
      vmName: string,
      guestConfigurationAssignmentName: string,
      options?: GuestConfigurationConnectedVMwarevSphereAssignmentsReportsListOptionalParams,
    ) => list(context, resourceGroupName, vmName, guestConfigurationAssignmentName, options),
  };
}

export function _getGuestConfigurationConnectedVMwarevSphereAssignmentsReportsOperations(
  context: GuestConfigurationContext,
): GuestConfigurationConnectedVMwarevSphereAssignmentsReportsOperations {
  return {
    ..._getGuestConfigurationConnectedVMwarevSphereAssignmentsReports(context),
  };
}
