// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { GuestConfigurationContext } from "../../api/guestConfigurationContext.js";
import { get, list } from "../../api/guestConfigurationAssignmentReports/operations.js";
import {
  GuestConfigurationAssignmentReportsGetOptionalParams,
  GuestConfigurationAssignmentReportsListOptionalParams,
} from "../../api/guestConfigurationAssignmentReports/options.js";
import {
  GuestConfigurationAssignmentReportList,
  GuestConfigurationAssignmentReport,
} from "../../models/models.js";

/** Interface representing a GuestConfigurationAssignmentReports operations. */
export interface GuestConfigurationAssignmentReportsOperations {
  /** Get a report for the guest configuration assignment, by reportId. */
  get: (
    resourceGroupName: string,
    guestConfigurationAssignmentName: string,
    reportId: string,
    vmName: string,
    options?: GuestConfigurationAssignmentReportsGetOptionalParams,
  ) => Promise<GuestConfigurationAssignmentReport>;
  /** List all reports for the guest configuration assignment, latest report first. */
  list: (
    resourceGroupName: string,
    guestConfigurationAssignmentName: string,
    vmName: string,
    options?: GuestConfigurationAssignmentReportsListOptionalParams,
  ) => Promise<GuestConfigurationAssignmentReportList>;
}

function _getGuestConfigurationAssignmentReports(context: GuestConfigurationContext) {
  return {
    get: (
      resourceGroupName: string,
      guestConfigurationAssignmentName: string,
      reportId: string,
      vmName: string,
      options?: GuestConfigurationAssignmentReportsGetOptionalParams,
    ) =>
      get(context, resourceGroupName, guestConfigurationAssignmentName, reportId, vmName, options),
    list: (
      resourceGroupName: string,
      guestConfigurationAssignmentName: string,
      vmName: string,
      options?: GuestConfigurationAssignmentReportsListOptionalParams,
    ) => list(context, resourceGroupName, guestConfigurationAssignmentName, vmName, options),
  };
}

export function _getGuestConfigurationAssignmentReportsOperations(
  context: GuestConfigurationContext,
): GuestConfigurationAssignmentReportsOperations {
  return {
    ..._getGuestConfigurationAssignmentReports(context),
  };
}
