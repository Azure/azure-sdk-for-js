// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GuestConfigurationContext } from "../../api/guestConfigurationContext.js";
import { get, list } from "../../api/guestConfigurationAssignmentReports/operations.js";
import type {
  GuestConfigurationAssignmentReportsGetOptionalParams,
  GuestConfigurationAssignmentReportsListOptionalParams,
} from "../../api/guestConfigurationAssignmentReports/options.js";
import type {
  _GuestConfigurationAssignmentReportList,
  GuestConfigurationAssignmentReport,
} from "../../models/models.js";

/** Interface representing a GuestConfigurationAssignmentReports operations. */
export interface GuestConfigurationAssignmentReportsOperations {
  /** Get a report for the guest configuration assignment, by reportId. */
  get: (
    resourceGroupName: string,
    vmName: string,
    guestConfigurationAssignmentName: string,
    reportId: string,
    options?: GuestConfigurationAssignmentReportsGetOptionalParams,
  ) => Promise<GuestConfigurationAssignmentReport>;
  /** List all reports for the guest configuration assignment, latest report first. */
  list: (
    resourceGroupName: string,
    vmName: string,
    guestConfigurationAssignmentName: string,
    options?: GuestConfigurationAssignmentReportsListOptionalParams,
  ) => Promise<_GuestConfigurationAssignmentReportList>;
}

function _getGuestConfigurationAssignmentReports(context: GuestConfigurationContext) {
  return {
    get: (
      resourceGroupName: string,
      vmName: string,
      guestConfigurationAssignmentName: string,
      reportId: string,
      options?: GuestConfigurationAssignmentReportsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, vmName, guestConfigurationAssignmentName, reportId, options),
    list: (
      resourceGroupName: string,
      vmName: string,
      guestConfigurationAssignmentName: string,
      options?: GuestConfigurationAssignmentReportsListOptionalParams,
    ) => list(context, resourceGroupName, vmName, guestConfigurationAssignmentName, options),
  };
}

export function _getGuestConfigurationAssignmentReportsOperations(
  context: GuestConfigurationContext,
): GuestConfigurationAssignmentReportsOperations {
  return {
    ..._getGuestConfigurationAssignmentReports(context),
  };
}
