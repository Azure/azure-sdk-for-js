// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { GuestConfigurationContext } from "../../api/guestConfigurationContext.js";
import { get, list } from "../../api/guestConfigurationHcrpAssignmentReports/operations.js";
import type {
  GuestConfigurationHcrpAssignmentReportsGetOptionalParams,
  GuestConfigurationHcrpAssignmentReportsListOptionalParams,
} from "../../api/guestConfigurationHcrpAssignmentReports/options.js";
import type {
  _GuestConfigurationAssignmentReportList,
  GuestConfigurationAssignmentReport,
} from "../../models/models.js";

/** Interface representing a GuestConfigurationHcrpAssignmentReports operations. */
export interface GuestConfigurationHcrpAssignmentReportsOperations {
  /** Get a report for the guest configuration assignment, by reportId. */
  get: (
    resourceGroupName: string,
    machineName: string,
    guestConfigurationAssignmentName: string,
    reportId: string,
    options?: GuestConfigurationHcrpAssignmentReportsGetOptionalParams,
  ) => Promise<GuestConfigurationAssignmentReport>;
  /** List all reports for the guest configuration assignment, latest report first. */
  list: (
    resourceGroupName: string,
    machineName: string,
    guestConfigurationAssignmentName: string,
    options?: GuestConfigurationHcrpAssignmentReportsListOptionalParams,
  ) => Promise<_GuestConfigurationAssignmentReportList>;
}

function _getGuestConfigurationHcrpAssignmentReports(context: GuestConfigurationContext) {
  return {
    get: (
      resourceGroupName: string,
      machineName: string,
      guestConfigurationAssignmentName: string,
      reportId: string,
      options?: GuestConfigurationHcrpAssignmentReportsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        machineName,
        guestConfigurationAssignmentName,
        reportId,
        options,
      ),
    list: (
      resourceGroupName: string,
      machineName: string,
      guestConfigurationAssignmentName: string,
      options?: GuestConfigurationHcrpAssignmentReportsListOptionalParams,
    ) => list(context, resourceGroupName, machineName, guestConfigurationAssignmentName, options),
  };
}

export function _getGuestConfigurationHcrpAssignmentReportsOperations(
  context: GuestConfigurationContext,
): GuestConfigurationHcrpAssignmentReportsOperations {
  return {
    ..._getGuestConfigurationHcrpAssignmentReports(context),
  };
}
