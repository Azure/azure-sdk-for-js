// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { NetAppManagementContext } from "../../api/netAppManagementContext.js";
import { clearSuspects, list, get } from "../../api/ransomwareReports/operations.js";
import type {
  RansomwareReportsClearSuspectsOptionalParams,
  RansomwareReportsListOptionalParams,
  RansomwareReportsGetOptionalParams,
} from "../../api/ransomwareReports/options.js";
import type { RansomwareReport, RansomwareSuspectsClearRequest } from "../../models/models.js";
import type { PagedAsyncIterableIterator } from "../../static-helpers/pagingHelpers.js";
import type { PollerLike, OperationState } from "@azure/core-lro";

/** Interface representing a RansomwareReports operations. */
export interface RansomwareReportsOperations {
  /**
   * "Clear ransomware suspects for the given Advanced Ransomware Protection report. You should evaluate the report to determine whether the activity is acceptable (false positive) or whether an attack seems malicious.
   * ARP creates snapshots named Anti_ransomware_backup when it detects a potential ransomware threat. You can use one of these ARP snapshots or another snapshot of your volume to restore data",
   */
  clearSuspects: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    ransomwareReportName: string,
    body: RansomwareSuspectsClearRequest,
    options?: RansomwareReportsClearSuspectsOptionalParams,
  ) => PollerLike<OperationState<void>, void>;
  /**
   * List all ransomware reports for the volume
   * Returns a list of the Advanced Ransomware Protection (ARP) reports for the volume.
   * ARP reports are created with a list of suspected files when it detects any combination of high data entropy, abnormal volume activity with data encryption, and unusual file extensions.
   * ARP creates snapshots named Anti_ransomware_backup when it detects a potential ransomware threat. You can use one of these ARP snapshots or another snapshot of your volume to restore data"
   */
  list: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    options?: RansomwareReportsListOptionalParams,
  ) => PagedAsyncIterableIterator<RansomwareReport>;
  /**
   * Get details of the specified ransomware report (ARP)
   * ARP reports are created with a list of suspected files when it detects any combination of high data entropy, abnormal volume activity with data encryption, and unusual file extensions.
   * ARP creates snapshots named Anti_ransomware_backup when it detects a potential ransomware threat. You can use one of these ARP snapshots or another snapshot of your volume to restore data.
   */
  get: (
    resourceGroupName: string,
    accountName: string,
    poolName: string,
    volumeName: string,
    ransomwareReportName: string,
    options?: RansomwareReportsGetOptionalParams,
  ) => Promise<RansomwareReport>;
}

function _getRansomwareReports(context: NetAppManagementContext) {
  return {
    clearSuspects: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      ransomwareReportName: string,
      body: RansomwareSuspectsClearRequest,
      options?: RansomwareReportsClearSuspectsOptionalParams,
    ) =>
      clearSuspects(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        ransomwareReportName,
        body,
        options,
      ),
    list: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      options?: RansomwareReportsListOptionalParams,
    ) => list(context, resourceGroupName, accountName, poolName, volumeName, options),
    get: (
      resourceGroupName: string,
      accountName: string,
      poolName: string,
      volumeName: string,
      ransomwareReportName: string,
      options?: RansomwareReportsGetOptionalParams,
    ) =>
      get(
        context,
        resourceGroupName,
        accountName,
        poolName,
        volumeName,
        ransomwareReportName,
        options,
      ),
  };
}

export function _getRansomwareReportsOperations(
  context: NetAppManagementContext,
): RansomwareReportsOperations {
  return {
    ..._getRansomwareReports(context),
  };
}
